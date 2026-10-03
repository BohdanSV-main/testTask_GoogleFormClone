import { expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useGetFormsQuery } from '@/entities/form';
import { mockGraphql, renderWithApi } from '@/shared/lib/testing';
import { useCreateFormMutation } from './create-form-api';

function TestFormsCatalog() {
  const formsQuery = useGetFormsQuery();
  const [createForm] = useCreateFormMutation();

  return (
    <>
      <output aria-label="Form count">{formsQuery.data?.length ?? 0}</output>
      <button onClick={() => void createForm({ title: 'New' })}>Create</button>
    </>
  );
}

it('invalidates the active form list after successful creation', async () => {
  let isFormCreated = false;
  let formsRequestCount = 0;
  mockGraphql(({ query }) => {
    if (query.includes('query GetForms')) {
      formsRequestCount++;

      return {
        data: {
          forms: isFormCreated
            ? [{ id: 'f1', title: 'New', description: '', createdAt: '2026-10-03' }]
            : [],
        },
      };
    }

    isFormCreated = true;

    return { data: { createForm: { id: 'f1' } } };
  });
  renderWithApi(<TestFormsCatalog />);
  const user = userEvent.setup();
  await user.click(screen.getByRole('button', { name: 'Create' }));
  expect(await screen.findByText('1')).toBeVisible();
  expect(formsRequestCount).toBeGreaterThanOrEqual(2);
});
