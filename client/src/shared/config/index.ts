export const routes = {
  home: '/',
  createForm: '/forms/new',
  fillForm: (formId: string) => `/forms/${encodeURIComponent(formId)}/fill`,
  formResponses: (formId: string) => `/forms/${encodeURIComponent(formId)}/responses`,
};

export const graphqlUrl = import.meta.env.VITE_GRAPHQL_URL || 'http://localhost:4000/graphql';
