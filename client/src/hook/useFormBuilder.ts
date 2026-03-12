import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateFormMutation } from "../api/baseApi";
import {
    createEmptyForm,
    createEmptyQuestion,
    addOptionToQuestion,
    removeOptionFromQuestion,
    updateQuestion,
    removeQuestion,
    createEmptyOption,
    updateOption,
} from "../services/formBuilderService";
import type { FormDraft, QuestionDraft } from "../types";
import { QuestionType } from "../types";
import { validateFormDraft, hasErrors } from "../services/validationService";
import type { ValidationErrors } from "../services/validationService";

export function useFormBuilder() {
    const navigate = useNavigate();
    const [form, setForm] = useState<FormDraft>(createEmptyForm());
    const [createForm, { isLoading, isError }] = useCreateFormMutation();
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
        {},
    );

    const setTitle = (title: string) => setForm((f) => ({ ...f, title }));
    const setDescription = (description: string) =>
        setForm((f) => ({ ...f, description }));

    const needsOptions = (type: QuestionType) =>
        type === QuestionType.MultipleChoice || type === QuestionType.Checkbox;

    const addQuestion = () => {
        setForm((f) => ({
            ...f,
            questions: [...f.questions, createEmptyQuestion()],
        }));
    };

    const deleteQuestion = (questionId: string) => {
        setForm((f) => ({
            ...f,
            questions: removeQuestion(f.questions, questionId),
        }));
    };

    const changeQuestion = (
        questionId: string,
        updates: Partial<QuestionDraft>,
    ) => {
        setForm((f) => ({
            ...f,
            questions: updateQuestion(f.questions, questionId, {
                ...updates,
                ...(updates.type &&
                    needsOptions(updates.type) && {
                        options: [createEmptyOption()],
                    }),
            }),
        }));
    };

    const addOption = (questionId: string) => {
        setForm((f) => ({
            ...f,
            questions: addOptionToQuestion(f.questions, questionId),
        }));
    };

    const removeOption = (questionId: string, optionId: string) => {
        setForm((f) => ({
            ...f,
            questions: removeOptionFromQuestion(
                f.questions,
                questionId,
                optionId,
            ),
        }));
    };

    const changeOption = (
        questionId: string,
        optionId: string,
        value: string,
    ) => {
        setForm((f) => ({
            ...f,
            questions: updateOption(f.questions, questionId, optionId, value),
        }));
    };

    const handleSubmit = async () => {
        const errors = validateFormDraft(form);
        if (hasErrors(errors)) {
            setValidationErrors(errors);
            return;
        }

        setValidationErrors({});

        const result = await createForm({
            title: form.title,
            description: form.description || undefined,
            questions: form.questions.map((q) => ({
                title: q.title,
                type: q.type,
                required: q.required,
                options: needsOptions(q.type)
                    ? q.options
                          .filter((o) => o.value.trim() !== "")
                          .map((o) => ({ value: o.value }))
                    : undefined,
            })),
        });

        if (!("error" in result)) {
            navigate("/");
        }
    };

    return {
        form,
        isLoading,
        isError,
        setTitle,
        setDescription,
        addQuestion,
        deleteQuestion,
        changeQuestion,
        addOption,
        removeOption,
        needsOptions,
        handleSubmit,
        changeOption,
        validationErrors,
    };
}
