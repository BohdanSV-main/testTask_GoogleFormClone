import { isChoiceType, type Question, type QuestionType, type Option } from '@/entities/form';

export interface FormDraft {
  title: string;
  description: string;
  questions: Question[];
}

export const createOption = (): Option => ({ id: crypto.randomUUID(), value: '' });

export function createQuestion(type: QuestionType = 'TEXT'): Question {
  const questionDetails = { id: crypto.randomUUID(), title: '', required: false };

  return isChoiceType(type)
    ? { ...questionDetails, type, options: [createOption()] }
    : { ...questionDetails, type };
}

export function createDraft(): FormDraft {
  return { title: '', description: '', questions: [createQuestion()] };
}
