import { baseApi, graphqlRequest } from '@/shared/api';
import { GetResponsesDocument, type GetResponsesQuery } from '@/shared/api/generated/graphql';
import type { FormResponse } from '../model/response';

export const responseApi = baseApi.enhanceEndpoints({ addTagTypes: ['Response'] }).injectEndpoints({
  endpoints: (builder) => ({
    getResponses: builder.query<FormResponse[], string>({
      query: (formId) => graphqlRequest(GetResponsesDocument, { formId }),
      transformResponse: (data: GetResponsesQuery) => data.responses,
      providesTags: (_data, _error, formId) => [{ type: 'Response', id: formId }],
    }),
  }),
});

export const { useGetResponsesQuery } = responseApi;
