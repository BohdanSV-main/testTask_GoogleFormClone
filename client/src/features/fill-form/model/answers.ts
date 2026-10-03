import type { Question } from '@/entities/form';
import type { Answer } from '@/entities/response';

export type Answers = Record<string, string[]>;

export type AnswerErrors = Record<string, string>;

export function toggleAnswer(values: string[], value: string, checked: boolean): string[] {
  return checked ? [...new Set([...values, value])] : values.filter((item) => item !== value);
}

export function isAnswered(values: string[] = []): boolean {
  return values.some((value) => value.trim().length > 0);
}

function isValidDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const date = new Date(`${value}T00:00:00Z`);

  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

export function validateAnswers(questions: Question[], answers: Answers): AnswerErrors {
  const errors: AnswerErrors = {};

  for (const question of questions) {
    const values = answers[question.id] ?? [];

    if (!isAnswered(values)) {
      if (question.required) {
        errors[question.id] = 'Вкажіть відповідь на це питання.';
      }

      continue;
    }

    if (question.type !== 'CHECKBOX' && values.length !== 1) {
      errors[question.id] = 'Вкажіть одну відповідь.';
    } else if (question.type === 'DATE' && !isValidDate(values[0])) {
      errors[question.id] = 'Вкажіть коректну дату.';
    } else if (
      'options' in question &&
      values.some((value) => !question.options.some((option) => option.value === value))
    ) {
      errors[question.id] = 'Оберіть відповідь із запропонованих варіантів.';
    }
  }

  return errors;
}

export function toResponseAnswers(questions: Question[], answers: Answers): Answer[] {
  return questions.map((question) => ({
    questionId: question.id,
    value: (answers[question.id] ?? [])
      .map((value) => ('options' in question ? value : value.trim()))
      .filter(Boolean),
  }));
}
