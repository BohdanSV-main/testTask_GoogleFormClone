import { baseApi, graphqlRequest } from '@/shared/api';
import {
  GetFormsDocument,
  GetFormDocument,
  type GetFormsQuery,
  type GetFormQuery,
} from '@/shared/api/generated/graphql';
import type { Form, FormSummary } from '../model/form';
import { toForm } from './form-mapper';

export const formApi = baseApi.enhanceEndpoints({ addTagTypes: ['Form'] }).injectEndpoints({
  endpoints: (builder) => ({
    getForms: builder.query<FormSummary[], void>({
      query: () => graphqlRequest(GetFormsDocument, {}),
      transformResponse: (data: GetFormsQuery) => data.forms,
      providesTags: [{ type: 'Form', id: 'LIST' }],
    }),
    getForm: builder.query<Form | null, string>({
      query: (id) => graphqlRequest(GetFormDocument, { id }),
      transformResponse: (data: GetFormQuery) => (data.form ? toForm(data.form) : null),
      providesTags: (_data, _error, id) => [{ type: 'Form', id }],
    }),
  }),
});

export const { useGetFormsQuery, useGetFormQuery } = formApi;
