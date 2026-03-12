import { QuestionType } from "../api/generated/types";
export { QuestionType };

export interface OptionDraft {
    id: string;
    value: string;
}

export interface QuestionDraft {
    id: string;
    title: string;
    type: QuestionType;
    options: OptionDraft[];
    required: boolean;
}

export interface FormDraft {
    title: string;
    description: string;
    questions: QuestionDraft[];
}
