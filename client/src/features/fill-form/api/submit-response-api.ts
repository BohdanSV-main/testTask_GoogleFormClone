import { responseApi } from '@/entities/response';
import { graphqlRequest } from '@/shared/api';
import {
  SubmitResponseDocument,
  type SubmitResponseMutation,
  type SubmitResponseMutationVariables,
} from '@/shared/api/generated/graphql';

const submitResponseApi = responseApi.injectEndpoints({
  endpoints: (builder) => ({
    submitResponse: builder.mutation<string, SubmitResponseMutationVariables>({
      query: (variables) => graphqlRequest(SubmitResponseDocument, variables),
      transformResponse: (data: SubmitResponseMutation) => data.submitResponse.id,
      invalidatesTags: (_data, error, { formId }) =>
        error ? [] : [{ type: 'Response', id: formId }],
    }),
  }),
});
export const { useSubmitResponseMutation } = submitResponseApi;
