import { describe, expect, it, vi } from 'vitest';
import type { BaseQueryApi } from '@reduxjs/toolkit/query';
import { parse } from 'graphql';
import { graphqlBaseQuery } from './graphql-base-query';

function executeQuery() {
  const controller = new AbortController();
  const api: BaseQueryApi = {
    signal: controller.signal,
    abort: () => controller.abort(),
    dispatch: vi.fn(),
    getState: () => ({}),
    extra: undefined,
    endpoint: 'test',
    type: 'query',
  };

  return graphqlBaseQuery({ document: parse('query Test { value }') }, api, {});
}

function mockResponse(body: unknown, status = 200) {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue(
      new Response(JSON.stringify(body), {
        status,
        headers: { 'Content-Type': 'application/json' },
      }),
    ),
  );
}

describe('GraphQL transport', () => {
  it('unwraps successful data', async () => {
    mockResponse({ data: { value: 42 } });
    expect(await executeQuery()).toEqual({ data: { value: 42 } });
  });
  it.each([
    { data: null, errors: [{ message: 'Unavailable' }] },
    { data: { value: 42 }, errors: [{ message: 'Partial failure' }] },
  ])('rejects GraphQL errors even with HTTP 200: %j', async (body) => {
    mockResponse(body);
    expect(await executeQuery()).toEqual({ error: { kind: 'graphql' } });
  });
  it.each([null, 'invalid', {}, { data: null }])('rejects invalid response %j', async (body) => {
    mockResponse(body);
    expect(await executeQuery()).toEqual({ error: { kind: 'invalid-response' } });
  });
  it('handles HTTP failures', async () => {
    mockResponse({ message: 'Service unavailable' }, 503);
    expect(await executeQuery()).toEqual({ error: { kind: 'network' } });
  });
  it('handles unavailable network', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('Failed to fetch')));
    expect(await executeQuery()).toEqual({ error: { kind: 'network' } });
  });
});
