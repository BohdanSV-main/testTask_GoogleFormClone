import type { GetFormQuery } from '@/shared/api/generated/graphql';
import type { Form, Question } from '../model/form';

export function toForm(formData: NonNullable<GetFormQuery['form']>): Form {
  return {
    ...formData,
    questions: formData.questions.map((question): Question => {
      const questionDetails = {
        id: question.id,
        title: question.title,
        required: question.required,
      };

      switch (question.type) {
        case 'TEXT':
        case 'DATE':
          return { ...questionDetails, type: question.type };
        case 'MULTIPLE_CHOICE':
        case 'CHECKBOX':
          return { ...questionDetails, type: question.type, options: question.options ?? [] };
      }
    }),
  };
}
