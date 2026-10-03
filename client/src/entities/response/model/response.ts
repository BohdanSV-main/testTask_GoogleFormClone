export interface Answer {
  questionId: string;
  value: string[];
}

export interface FormResponse {
  id: string;
  formId: string;
  submittedAt: string;
  answers: Answer[];
}

export interface DisplayAnswer {
  questionTitle: string;
  values: string[];
  allowsMultipleAnswers: boolean;
}
