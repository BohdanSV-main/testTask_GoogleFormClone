import type { ReactElement } from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { vi } from 'vitest';
import { baseApi } from '@/shared/api';

export function renderWithApi(element: ReactElement) {
  const store = configureStore({
    reducer: { [baseApi.reducerPath]: baseApi.reducer },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
  });

  return {
    ...render(
      <Provider store={store}>
        <MemoryRouter>{element}</MemoryRouter>
      </Provider>,
    ),
    store,
  };
}

export interface GraphqlOperation {
  query: string;
  variables: Record<string, unknown>;
}

export function mockGraphql(handler: (operation: GraphqlOperation) => unknown | Promise<unknown>) {
  const fetchMock = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
    const request = input instanceof Request ? input : new Request(input, init);
    const operation: GraphqlOperation = await request.json();
    const body = await handler(operation);

    return new Response(JSON.stringify(body), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  });
  vi.stubGlobal('fetch', fetchMock);

  return fetchMock;
}
