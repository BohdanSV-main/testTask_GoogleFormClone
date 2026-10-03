import type { FormDraft } from './form-draft';

export interface QuestionErrors {
  title?: string;
  options?: string;
}

export interface DraftErrors {
  title?: string;
  questions?: Record<string, QuestionErrors>;
  root?: string;
}

export function validateFormDraft(draft: FormDraft): DraftErrors {
  const errors: DraftErrors = {};

  if (!draft.title.trim()) {
    errors.title = 'Дайте формі назву.';
  }

  if (!draft.questions.length) {
    errors.root = 'Додайте хоча б одне питання.';
  }

  const errorsByQuestionId: Record<string, QuestionErrors> = {};

  for (const question of draft.questions) {
    const questionErrors: QuestionErrors = {};

    if (!question.title.trim()) {
      questionErrors.title = 'Напишіть текст питання.';
    }

    if ('options' in question) {
      const optionValues = question.options.map((option) => option.value.trim());

      if (!optionValues.length) {
        questionErrors.options = 'Додайте хоча б один варіант відповіді.';
      } else if (optionValues.some((value) => !value)) {
        questionErrors.options = 'Заповніть усі варіанти або видаліть порожні.';
      } else if (new Set(optionValues).size !== optionValues.length) {
        questionErrors.options = 'Варіанти відповідей мають відрізнятися.';
      }
    }

    if (Object.keys(questionErrors).length) {
      errorsByQuestionId[question.id] = questionErrors;
    }
  }

  if (Object.keys(errorsByQuestionId).length) {
    errors.questions = errorsByQuestionId;
  }

  return errors;
}
