import { expect, it } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockGraphql, renderWithApi, type GraphqlOperation } from '@/shared/lib/testing';
import { CreateForm } from './CreateForm';

it('validates the draft, keeps it after failure, and sends a typed payload', async () => {
  const user = userEvent.setup();
  const operations: GraphqlOperation[] = [];
  mockGraphql((operation) => {
    operations.push(operation);

    return { errors: [{ message: 'Unavailable' }] };
  });
  renderWithApi(<CreateForm />);
  await user.click(screen.getByRole('button', { name: 'Зберегти форму ↗' }));
  expect(await screen.findByText('Дайте формі назву.')).toBeVisible();
  expect(operations).toHaveLength(0);
  await user.type(screen.getByLabelText('Назва форми', { exact: false }), 'Курс');
  await user.type(screen.getByLabelText('Текст питання', { exact: false }), 'Ваше ім’я');
  await user.click(screen.getByRole('button', { name: 'Зберегти форму ↗' }));
  expect(await screen.findByText(/Не вдалося зберегти форму/)).toBeVisible();
  expect(screen.getByLabelText('Назва форми', { exact: false })).toHaveValue('Курс');
  await waitFor(() => expect(operations).toHaveLength(1));
  expect(operations[0].variables).toEqual({
    title: 'Курс',
    description: '',
    questions: [{ title: 'Ваше ім’я', required: false, type: 'TEXT' }],
  });
});
