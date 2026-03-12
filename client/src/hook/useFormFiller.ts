import { useState } from "react";
import { useGetFormQuery, useSubmitResponseMutation } from "../api/baseApi";
import {
    updateTextAnswer,
    updateCheckboxAnswer,
} from "../services/formFillerService";
import type { QuestionDraft } from "../types";
import { validateFillerAnswers } from "../services/validationService";

export function useFormFiller(formId: string) {
    const { data, isLoading, isError } = useGetFormQuery({ id: formId });
    const [submitResponse, { isLoading: isSubmitting }] =
        useSubmitResponseMutation();
    const [answers, setAnswers] = useState<Record<string, string[]>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

    const questions = (data?.form?.questions ?? []) as QuestionDraft[];

    const handleTextChange = (questionId: string, value: string) => {
        setAnswers((prev) => updateTextAnswer(prev, questionId, value));
    };

    const handleCheckboxChange = (
        questionId: string,
        value: string,
        checked: boolean,
    ) => {
        setAnswers((prev) =>
            updateCheckboxAnswer(prev, questionId, value, checked),
        );
    };

    const handleSingleChoiceChange = (questionId: string, value: string) => {
        setAnswers((prev) => ({ ...prev, [questionId]: [value] }));
    };

    const handleSubmit = async () => {
        const errors = validateFillerAnswers(questions, answers);
        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            return;
        }

        setFieldErrors({});

        await submitResponse({
            formId,
            answers: Object.entries(answers).map(([questionId, value]) => ({
                questionId,
                value,
            })),
        });

        setIsSubmitted(true);
    };

    return {
        form: data?.form,
        questions,
        answers,
        isLoading,
        isError,
        isSubmitting,
        isSubmitted,
        fieldErrors,
        handleTextChange,
        handleCheckboxChange,
        handleSingleChoiceChange,
        handleSubmit,
    };
}
