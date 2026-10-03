import { expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import { mockGraphql, renderWithApi } from '@/shared/lib/testing';
import { FormResponses } from './FormResponses';

it('reports a failed form query instead of saying the form is missing', async () => {
  mockGraphql(() => ({ errors: [{ message: 'Unavailable' }] }));
  renderWithApi(<FormResponses formId="f1" />);
  expect(await screen.findByRole('heading', { name: 'Не вдалося завантажити.' })).toBeVisible();
  expect(screen.queryByText('Цей аркуш загубився.')).not.toBeInTheDocument();
});
