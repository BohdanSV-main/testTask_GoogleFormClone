import { fetchBaseQuery, type BaseQueryFn } from '@reduxjs/toolkit/query';
import { print, type DocumentNode } from 'graphql';
import type { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { graphqlUrl } from '@/shared/config';

export interface ApiError {
  kind: 'network' | 'graphql' | 'invalid-response';
}

interface GraphqlRequest {
  document: DocumentNode;
  variables?: Record<string, unknown>;
}

export function graphqlRequest<Data, Variables extends Record<string, unknown>>(
  document: TypedDocumentNode<Data, Variables>,
  variables: Variables,
): GraphqlRequest {
  return { document, variables };
}

const fetchGraphql = fetchBaseQuery({ baseUrl: graphqlUrl, timeout: 15_000 });

export const graphqlBaseQuery: BaseQueryFn<GraphqlRequest, unknown, ApiError> = async (
  { document, variables },
  api,
  extraOptions,
) => {
  const result = await fetchGraphql(
    { url: '', method: 'POST', body: { query: print(document), variables } },
    api,
    extraOptions,
  );

  if (result.error) {
    return { error: { kind: 'network' } };
  }

  const responseBody = result.data;

  if (!responseBody || typeof responseBody !== 'object') {
    return { error: { kind: 'invalid-response' } };
  }

  if (
    'errors' in responseBody &&
    Array.isArray(responseBody.errors) &&
    responseBody.errors.length
  ) {
    return { error: { kind: 'graphql' } };
  }

  if (!('data' in responseBody) || !responseBody.data || typeof responseBody.data !== 'object') {
    return { error: { kind: 'invalid-response' } };
  }

  return { data: responseBody.data };
};
