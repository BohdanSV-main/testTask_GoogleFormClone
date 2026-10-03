import { describe, expect, it } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockGraphql, renderWithApi, type GraphqlOperation } from '@/shared/lib/testing';
import { FillForm } from './FillForm';

const form = {
  id: 'f1',
  title: 'Навчання',
  description: 'Розкажіть про себе',
  createdAt: '2026-10-02',
  questions: [{ id: 'q1', title: 'Як вас звати?', type: 'TEXT', required: true, options: null }],
};

describe('filling a form through the API', () => {
  it('validates, preserves answers after GraphQL failure, then retries successfully', async () => {
    const user = userEvent.setup();
    const submissions: GraphqlOperation[] = [];
    mockGraphql((operation) => {
      if (operation.query.includes('query GetForm')) {
        return { data: { form } };
      }

      submissions.push(operation);

      return submissions.length === 1
        ? { errors: [{ message: 'Server rejected response' }] }
        : { data: { submitResponse: { id: 'response-1' } } };
    });
    renderWithApi(<FillForm formId="f1" />);
    const input = await screen.findByLabelText('Ваша відповідь', { exact: false });
    await user.click(screen.getByRole('button', { name: 'Надіслати відповіді ↗' }));
    expect(await screen.findByText('Вкажіть відповідь на це питання.')).toBeVisible();
    expect(submissions).toHaveLength(0);
    await user.type(input, 'Олена');
    await user.click(screen.getByRole('button', { name: 'Надіслати відповіді ↗' }));
    expect(await screen.findByText(/Не вдалося надіслати відповіді/)).toBeVisible();
    expect(input).toHaveValue('Олена');
    expect(screen.queryByRole('heading', { name: 'Дякуємо за ваш час.' })).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Надіслати відповіді ↗' }));
    expect(await screen.findByRole('heading', { name: 'Дякуємо за ваш час.' })).toBeVisible();
    expect(submissions).toHaveLength(2);
    expect(submissions[1].variables).toEqual({
      formId: 'f1',
      answers: [{ questionId: 'q1', value: ['Олена'] }],
    });
  });
  it('distinguishes a missing form from a failed query', async () => {
    mockGraphql(() => ({ data: { form: null } }));
    renderWithApi(<FillForm formId="missing" />);
    expect(await screen.findByRole('heading', { name: 'Цей аркуш загубився.' })).toBeVisible();
  });
  it('offers retry after an API failure', async () => {
    let attempts = 0;
    mockGraphql(() =>
      ++attempts === 1 ? { errors: [{ message: 'Unavailable' }] } : { data: { form } },
    );
    renderWithApi(<FillForm formId="f1" />);
    const user = userEvent.setup();
    await user.click(await screen.findByRole('button', { name: 'Спробувати знову ↻' }));
    await waitFor(() => expect(screen.getByRole('heading', { name: 'Навчання' })).toBeVisible());
  });
});
