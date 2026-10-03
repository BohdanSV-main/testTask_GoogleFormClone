export const questionTypes = ['TEXT', 'MULTIPLE_CHOICE', 'CHECKBOX', 'DATE'] as const;

export type QuestionType = (typeof questionTypes)[number];

export type ChoiceType = 'MULTIPLE_CHOICE' | 'CHECKBOX';

export const questionTypeLabels: Record<QuestionType, string> = {
  TEXT: 'Коротка відповідь',
  MULTIPLE_CHOICE: 'Один варіант',
  CHECKBOX: 'Кілька варіантів',
  DATE: 'Дата',
};

export interface Option {
  id: string;
  value: string;
}

interface QuestionBase {
  id: string;
  title: string;
  required: boolean;
}

export type Question = QuestionBase &
  ({ type: 'TEXT' | 'DATE' } | { type: ChoiceType; options: Option[] });

export interface FormSummary {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

export interface Form extends FormSummary {
  questions: Question[];
}

export function isChoiceType(type: QuestionType): type is ChoiceType {
  return type === 'MULTIPLE_CHOICE' || type === 'CHECKBOX';
}

export function isQuestionType(value: string): value is QuestionType {
  return questionTypes.some((type) => type === value);
}
