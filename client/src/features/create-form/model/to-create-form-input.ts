import type { CreateFormMutationVariables } from '@/shared/api/generated/graphql';
import type { FormDraft } from './form-draft';

export function toCreateFormInput(draft: FormDraft): CreateFormMutationVariables {
  return {
    title: draft.title.trim(),
    description: draft.description.trim(),
    questions: draft.questions.map((question) => ({
      title: question.title.trim(),
      type: question.type,
      required: question.required,
      ...('options' in question
        ? { options: question.options.map((option) => ({ value: option.value.trim() })) }
        : {}),
    })),
  };
}
