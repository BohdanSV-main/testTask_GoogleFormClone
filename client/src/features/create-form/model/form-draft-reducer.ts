import { isChoiceType, type Question, type QuestionType, type Option } from '@/entities/form';
import type { FormDraft } from './form-draft';

export type DraftAction =
  | { type: 'titleChanged'; value: string }
  | { type: 'descriptionChanged'; value: string }
  | { type: 'questionAdded'; question: Question }
  | { type: 'questionRemoved'; questionId: string }
  | { type: 'questionChanged'; questionId: string; changes: { title?: string; required?: boolean } }
  | {
      type: 'questionTypeChanged';
      questionId: string;
      questionType: QuestionType;
      initialOption: Option;
    }
  | { type: 'optionAdded'; questionId: string; option: Option }
  | { type: 'optionRemoved'; questionId: string; optionId: string }
  | { type: 'optionChanged'; questionId: string; optionId: string; value: string };

export function formDraftReducer(state: FormDraft, action: DraftAction): FormDraft {
  switch (action.type) {
    case 'titleChanged':
      return { ...state, title: action.value };
    case 'descriptionChanged':
      return { ...state, description: action.value };
    case 'questionAdded':
      return { ...state, questions: [...state.questions, action.question] };
    case 'questionRemoved':
      return {
        ...state,
        questions: state.questions.filter((question) => question.id !== action.questionId),
      };
    default:
      return {
        ...state,
        questions: state.questions.map((question) => {
          if (question.id !== action.questionId) {
            return question;
          }

          switch (action.type) {
            case 'questionChanged':
              return { ...question, ...action.changes };
            case 'questionTypeChanged': {
              const questionDetails = {
                id: question.id,
                title: question.title,
                required: question.required,
              };

              return isChoiceType(action.questionType)
                ? {
                    ...questionDetails,
                    type: action.questionType,
                    options: 'options' in question ? question.options : [action.initialOption],
                  }
                : { ...questionDetails, type: action.questionType };
            }
            case 'optionAdded':
              return 'options' in question
                ? { ...question, options: [...question.options, action.option] }
                : question;
            case 'optionRemoved':
              return 'options' in question
                ? {
                    ...question,
                    options: question.options.filter((option) => option.id !== action.optionId),
                  }
                : question;
            case 'optionChanged':
              return 'options' in question
                ? {
                    ...question,
                    options: question.options.map((option) =>
                      option.id === action.optionId ? { ...option, value: action.value } : option,
                    ),
                  }
                : question;
          }
        }),
      };
  }
}
