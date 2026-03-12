import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
    GetFormsQuery,
    GetFormQuery,
    GetFormQueryVariables,
    GetResponsesQuery,
    GetResponsesQueryVariables,
    CreateFormMutation,
    CreateFormMutationVariables,
    SubmitResponseMutation,
    SubmitResponseMutationVariables,
} from "./generated/types";

const graphqlBaseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:4000/graphql",
    method: "POST",
    prepareHeaders: (headers) => {
        headers.set("Content-Type", "application/json");
        return headers;
    },
});

export const api = createApi({
    reducerPath: "api",
    baseQuery: graphqlBaseQuery,
    tagTypes: ["Form", "Response"],
    endpoints: (builder) => ({
        getForms: builder.query<GetFormsQuery, void>({
            query: () => ({
                url: "",
                body: {
                    query: `
            query GetForms {
              forms {
                id
                title
                description
                createdAt
              }
            }
          `,
                },
            }),
            transformResponse: (response: { data: GetFormsQuery }) =>
                response.data,
            providesTags: ["Form"],
        }),

        getForm: builder.query<GetFormQuery, GetFormQueryVariables>({
            query: (variables) => ({
                url: "",
                body: {
                    query: `
            query GetForm($id: ID!) {
              form(id: $id) {
                id
                title
                description
                createdAt
                questions {
                  id
                  title
                  type
                  required
                  options {
                    id
                    value
                  }
                }
              }
            }
          `,
                    variables,
                },
            }),
            transformResponse: (response: { data: GetFormQuery }) =>
                response.data,
            providesTags: ["Form"],
        }),

        getResponses: builder.query<
            GetResponsesQuery,
            GetResponsesQueryVariables
        >({
            query: (variables) => ({
                url: "",
                body: {
                    query: `
            query GetResponses($formId: ID!) {
              responses(formId: $formId) {
                id
                formId
                submittedAt
                answers {
                  questionId
                  value
                }
              }
            }
          `,
                    variables,
                },
            }),
            transformResponse: (response: { data: GetResponsesQuery }) =>
                response.data,
            providesTags: ["Response"],
        }),

        createForm: builder.mutation<
            CreateFormMutation,
            CreateFormMutationVariables
        >({
            query: (variables) => ({
                url: "",
                body: {
                    query: `
        mutation CreateForm($title: String!, $description: String, $questions: [QuestionInput!]) {
          createForm(title: $title, description: $description, questions: $questions) {
            id
            title
            description
            createdAt
          }
        }
      `,
                    variables,
                },
            }),
            transformResponse: (response: { data: CreateFormMutation }) =>
                response.data,
            invalidatesTags: ["Form"],
        }),

        submitResponse: builder.mutation<
            SubmitResponseMutation,
            SubmitResponseMutationVariables
        >({
            query: (variables) => ({
                url: "",
                body: {
                    query: `
        mutation SubmitResponse($formId: ID!, $answers: [AnswerInput!]!) {
          submitResponse(formId: $formId, answers: $answers) {
            id
            formId
            submittedAt
          }
        }
      `,
                    variables,
                },
            }),
            transformResponse: (response: { data: SubmitResponseMutation }) =>
                response.data,
            invalidatesTags: ["Response"],
        }),
    }),
});

export const {
    useGetFormsQuery,
    useGetFormQuery,
    useGetResponsesQuery,
    useCreateFormMutation,
    useSubmitResponseMutation,
} = api;
