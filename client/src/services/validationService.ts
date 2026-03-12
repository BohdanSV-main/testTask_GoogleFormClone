import type { FormDraft } from "../types";
import { QuestionType } from "../types";

export interface ValidationErrors {
    title?: string;
    questions?: Record<string, QuestionErrors>;
}

export interface QuestionErrors {
    title?: string;
    options?: string;
}

export function validateFormDraft(form: FormDraft): ValidationErrors {
    const errors: ValidationErrors = {};

    if (!form.title.trim()) {
        errors.title = "Form title is required";
    }

    const questionErrors: Record<string, QuestionErrors> = {};

    form.questions.forEach((q) => {
        const qErrors: QuestionErrors = {};

        if (!q.title.trim()) {
            qErrors.title = "Question title is required";
        }

        if (
            (q.type === QuestionType.MultipleChoice ||
                q.type === QuestionType.Checkbox) &&
            q.options.filter((o) => o.value.trim() !== "").length === 0
        ) {
            qErrors.options = "At least one option is required";
        }

        if (Object.keys(qErrors).length > 0) {
            questionErrors[q.id] = qErrors;
        }
    });

    if (Object.keys(questionErrors).length > 0) {
        errors.questions = questionErrors;
    }

    return errors;
}

export function hasErrors(errors: ValidationErrors): boolean {
    return Object.keys(errors).length > 0;
}

export function validateFillerAnswers(
    questions: { id: string; required: boolean }[],
    answers: Record<string, string[]>,
): Record<string, string> {
    const errors: Record<string, string> = {};

    questions.forEach((q) => {
        if (!q.required) return;
        const answer = answers[q.id] ?? [];
        if (answer.length === 0 || answer[0] === "") {
            errors[q.id] = "This field is required";
        }
    });

    return errors;
}
