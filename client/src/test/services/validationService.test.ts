import { describe, it, expect } from "vitest";
import {
    validateFormDraft,
    validateFillerAnswers,
    hasErrors,
} from "../../services/validationService";
import { QuestionType } from "../../types";
import type { FormDraft } from "../../types";

const mockForm: FormDraft = {
    title: "Test Form",
    description: "",
    questions: [],
};

describe("validationService", () => {
    describe("validateFormDraft", () => {
        it("returns no errors for valid form", () => {
            const errors = validateFormDraft(mockForm);
            expect(hasErrors(errors)).toBe(false);
        });

        it("returns error when title is empty", () => {
            const errors = validateFormDraft({ ...mockForm, title: "" });
            expect(errors.title).toBe("Form title is required");
        });

        it("returns error when title is only whitespace", () => {
            const errors = validateFormDraft({ ...mockForm, title: "   " });
            expect(errors.title).toBe("Form title is required");
        });

        it("returns error when question title is empty", () => {
            const form: FormDraft = {
                ...mockForm,
                questions: [
                    {
                        id: "q1",
                        title: "",
                        type: QuestionType.Text,
                        options: [],
                        required: false,
                    },
                ],
            };
            const errors = validateFormDraft(form);
            expect(errors.questions?.["q1"]?.title).toBe(
                "Question title is required",
            );
        });

        it("returns error when multiple choice has no options", () => {
            const form: FormDraft = {
                ...mockForm,
                questions: [
                    {
                        id: "q1",
                        title: "Question",
                        type: QuestionType.MultipleChoice,
                        options: [],
                        required: false,
                    },
                ],
            };
            const errors = validateFormDraft(form);
            expect(errors.questions?.["q1"]?.options).toBe(
                "At least one option is required",
            );
        });

        it("returns no error when multiple choice has valid options", () => {
            const form: FormDraft = {
                ...mockForm,
                questions: [
                    {
                        id: "q1",
                        title: "Question",
                        type: QuestionType.MultipleChoice,
                        options: [{ id: "o1", value: "Option 1" }],
                        required: false,
                    },
                ],
            };
            const errors = validateFormDraft(form);
            expect(errors.questions?.["q1"]).toBeUndefined();
        });
    });

    describe("validateFillerAnswers", () => {
        it("returns no errors when all required fields are filled", () => {
            const questions = [{ id: "q1", required: true }];
            const answers = { q1: ["answer"] };
            const errors = validateFillerAnswers(questions, answers);
            expect(Object.keys(errors)).toHaveLength(0);
        });

        it("returns error when required field is empty", () => {
            const questions = [{ id: "q1", required: true }];
            const answers = { q1: [] };
            const errors = validateFillerAnswers(questions, answers);
            expect(errors["q1"]).toBe("This field is required");
        });

        it("does not return error for optional empty field", () => {
            const questions = [{ id: "q1", required: false }];
            const answers = { q1: [] };
            const errors = validateFillerAnswers(questions, answers);
            expect(errors["q1"]).toBeUndefined();
        });

        it("returns error only for required empty fields", () => {
            const questions = [
                { id: "q1", required: true },
                { id: "q2", required: false },
            ];
            const answers = { q1: [], q2: [] };
            const errors = validateFillerAnswers(questions, answers);
            expect(errors["q1"]).toBeDefined();
            expect(errors["q2"]).toBeUndefined();
        });
    });

    describe("hasErrors", () => {
        it("returns false for empty errors object", () => {
            expect(hasErrors({})).toBe(false);
        });

        it("returns true when errors exist", () => {
            expect(hasErrors({ title: "Error" })).toBe(true);
        });
    });
});
