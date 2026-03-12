import type { QuestionDraft } from "../types";
import { QuestionType } from "../types";

export function getInitialAnswers(
    questions: QuestionDraft[],
): Record<string, string[]> {
    return questions.reduce<Record<string, string[]>>((acc, question) => {
        acc[question.id] = [];
        return acc;
    }, {});
}

export function updateTextAnswer(
    answers: Record<string, string[]>,
    questionId: string,
    value: string,
): Record<string, string[]> {
    return { ...answers, [questionId]: [value] };
}

export function updateCheckboxAnswer(
    answers: Record<string, string[]>,
    questionId: string,
    value: string,
    checked: boolean,
): Record<string, string[]> {
    const current = answers[questionId] ?? [];
    const updated = checked
        ? [...current, value]
        : current.filter((v) => v !== value);
    return { ...answers, [questionId]: updated };
}

export function validateAnswers(
    questions: QuestionDraft[],
    answers: Record<string, string[]>,
): boolean {
    return questions.every((q) => {
        if (!q.required) return true;
        const answer = answers[q.id] ?? [];
        return answer.length > 0 && answer[0] !== "";
    });
}

export function isChoiceType(type: QuestionType): boolean {
    return (
        type === QuestionType.MultipleChoice || type === QuestionType.Checkbox
    );
}
