import { v4 as uuidv4 } from "uuid";
import type { QuestionDraft, OptionDraft, FormDraft } from "../types";
import { QuestionType } from "../types";

export function createEmptyQuestion(): QuestionDraft {
    return {
        id: uuidv4(),
        title: "",
        type: QuestionType.Text,
        options: [],
        required: false,
    };
}

export function createEmptyOption(): OptionDraft {
    return {
        id: uuidv4(),
        value: "",
    };
}

export function createEmptyForm(): FormDraft {
    return {
        title: "",
        description: "",
        questions: [],
    };
}

export function addOptionToQuestion(
    questions: QuestionDraft[],
    questionId: string,
): QuestionDraft[] {
    return questions.map((q) =>
        q.id === questionId
            ? { ...q, options: [...q.options, createEmptyOption()] }
            : q,
    );
}

export function removeOptionFromQuestion(
    questions: QuestionDraft[],
    questionId: string,
    optionId: string,
): QuestionDraft[] {
    return questions.map((q) =>
        q.id === questionId
            ? { ...q, options: q.options.filter((o) => o.id !== optionId) }
            : q,
    );
}

export function updateQuestion(
    questions: QuestionDraft[],
    questionId: string,
    updates: Partial<QuestionDraft>,
): QuestionDraft[] {
    return questions.map((q) =>
        q.id === questionId ? { ...q, ...updates } : q,
    );
}

export function removeQuestion(
    questions: QuestionDraft[],
    questionId: string,
): QuestionDraft[] {
    return questions.filter((q) => q.id !== questionId);
}

export function updateOption(
    questions: QuestionDraft[],
    questionId: string,
    optionId: string,
    value: string,
): QuestionDraft[] {
    return questions.map((q) =>
        q.id === questionId
            ? {
                  ...q,
                  options: q.options.map((o) =>
                      o.id === optionId ? { ...o, value } : o,
                  ),
              }
            : q,
    );
}
