import { describe, it, expect } from "vitest";
import {
    createEmptyForm,
    createEmptyQuestion,
    addOptionToQuestion,
    removeOptionFromQuestion,
    updateQuestion,
    removeQuestion,
    updateOption,
} from "../../services/formBuilderService";
import { QuestionType } from "../../types";

describe("formBuilderService", () => {
    it("createEmptyForm returns correct structure", () => {
        const form = createEmptyForm();
        expect(form.title).toBe("");
        expect(form.description).toBe("");
        expect(form.questions).toEqual([]);
    });

    it("createEmptyQuestion returns correct structure", () => {
        const question = createEmptyQuestion();
        expect(question.title).toBe("");
        expect(question.type).toBe(QuestionType.Text);
        expect(question.required).toBe(false);
        expect(question.options).toEqual([]);
    });

    it("addOptionToQuestion adds option to correct question", () => {
        const question = createEmptyQuestion();
        const result = addOptionToQuestion([question], question.id);
        expect(result[0]?.options).toHaveLength(1);
    });

    it("removeOptionFromQuestion removes correct option", () => {
        const question = createEmptyQuestion();
        const withOption = addOptionToQuestion([question], question.id);
        const optionId = withOption[0]!.options[0]!.id;
        const result = removeOptionFromQuestion(
            [withOption[0]!],
            question.id,
            optionId,
        );
        expect(result[0]?.options).toHaveLength(0);
    });

    it("updateQuestion updates correct question", () => {
        const question = createEmptyQuestion();
        const result = updateQuestion([question], question.id, {
            title: "Updated",
        });
        expect(result[0]?.title).toBe("Updated");
    });

    it("removeQuestion removes correct question", () => {
        const q1 = createEmptyQuestion();
        const q2 = createEmptyQuestion();
        const result = removeQuestion([q1, q2], q1.id);
        expect(result).toHaveLength(1);
        expect(result[0]?.id).toBe(q2.id);
    });

    it("updateOption updates correct option value", () => {
        const question = createEmptyQuestion();
        const withOption = addOptionToQuestion([question], question.id);
        const optionId = withOption[0]!.options[0]!.id;
        const result = updateOption(
            [withOption[0]!],
            question.id,
            optionId,
            "New Value",
        );
        expect(result[0]?.options[0]?.value).toBe("New Value");
    });
});
