import { createApi } from '@reduxjs/toolkit/query/react';
import { graphqlBaseQuery } from './graphql-base-query';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: graphqlBaseQuery,
  endpoints: () => ({}),
});
