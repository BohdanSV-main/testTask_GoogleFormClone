import { formApi } from '@/entities/form';
import { graphqlRequest } from '@/shared/api';
import {
  CreateFormDocument,
  type CreateFormMutation,
  type CreateFormMutationVariables,
} from '@/shared/api/generated/graphql';

const createFormApi = formApi.injectEndpoints({
  endpoints: (builder) => ({
    createForm: builder.mutation<string, CreateFormMutationVariables>({
      query: (variables) => graphqlRequest(CreateFormDocument, variables),
      transformResponse: (data: CreateFormMutation) => data.createForm.id,
      invalidatesTags: (_data, error) => (error ? [] : [{ type: 'Form', id: 'LIST' }]),
    }),
  }),
});
export const { useCreateFormMutation } = createFormApi;
