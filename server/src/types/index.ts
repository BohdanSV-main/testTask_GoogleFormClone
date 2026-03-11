export enum QuestionType {
    TEXT = "TEXT",
    MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
    CHECKBOX = "CHECKBOX",
    DATE = "DATE",
}

export interface Option {
    id: string;
    value: string;
}

export interface Question {
    id: string;
    title: string;
    type: QuestionType;
    options?: Option[];
    required: boolean;
}

export interface Form {
    id: string;
    title: string;
    description?: string | undefined;
    questions: Question[];
    createdAt: string;
}

export interface Answer {
    questionId: string;
    value: string[];
}

export interface Response {
    id: string;
    formId: string;
    answers: Answer[];
    submittedAt: string;
}
