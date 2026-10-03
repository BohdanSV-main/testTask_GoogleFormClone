import { expect, it } from 'vitest';
import type { Form } from '@/entities/form';
import { resolveAnswers } from './resolve-answers';

it('resolves questions in form order, missing values, and timezone-free dates', () => {
  const form: Form = {
    id: 'f',
    title: '',
    description: '',
    createdAt: '',
    questions: [
      { id: 'q1', title: 'Name', type: 'TEXT', required: true },
      { id: 'q2', title: 'Date', type: 'DATE', required: false },
    ],
  };
  const result = resolveAnswers(form, {
    id: 'r',
    formId: 'f',
    submittedAt: '',
    answers: [{ questionId: 'q2', value: ['2026-10-03'] }],
  });
  expect(result).toEqual([
    { questionTitle: 'Name', values: [], allowsMultipleAnswers: false },
    { questionTitle: 'Date', values: ['03.10.2026'], allowsMultipleAnswers: false },
  ]);
});
