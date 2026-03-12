import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import QuestionRenderer from "../../components/filler/QuestionRenderer";
import { QuestionType } from "../../types";
import type { QuestionDraft } from "../../types";

const mockHandlers = {
    onTextChange: vi.fn(),
    onCheckboxChange: vi.fn(),
    onSingleChoiceChange: vi.fn(),
};

const createQuestion = (type: QuestionType, overrides = {}): QuestionDraft => ({
    id: "q1",
    title: "Test Question",
    type,
    options: [
        { id: "o1", value: "Option 1" },
        { id: "o2", value: "Option 2" },
    ],
    required: false,
    ...overrides,
});

describe("QuestionRenderer", () => {
    it("renders question title", () => {
        render(
            <QuestionRenderer
                question={createQuestion(QuestionType.Text)}
                answers={{}}
                {...mockHandlers}
            />
        );
        expect(screen.getByText("Test Question")).toBeInTheDocument();
    });

    it("renders required asterisk when question is required", () => {
        render(
            <QuestionRenderer
                question={createQuestion(QuestionType.Text, { required: true })}
                answers={{}}
                {...mockHandlers}
            />
        );
        expect(screen.getByText("*")).toBeInTheDocument();
    });

    it("renders text input for TEXT type", () => {
        render(
            <QuestionRenderer
                question={createQuestion(QuestionType.Text)}
                answers={{}}
                {...mockHandlers}
            />
        );
        expect(screen.getByPlaceholderText("Your answer")).toBeInTheDocument();
    });

    it("renders date input for DATE type", () => {
        render(
            <QuestionRenderer
                question={createQuestion(QuestionType.Date)}
                answers={{}}
                {...mockHandlers}
            />
        );
        expect(screen.getByDisplayValue("")).toBeInTheDocument();
    });

    it("renders radio buttons for MULTIPLE_CHOICE type", () => {
        render(
            <QuestionRenderer
                question={createQuestion(QuestionType.MultipleChoice)}
                answers={{}}
                {...mockHandlers}
            />
        );
        const radios = screen.getAllByRole("radio");
        expect(radios).toHaveLength(2);
    });

    it("renders checkboxes for CHECKBOX type", () => {
        render(
            <QuestionRenderer
                question={createQuestion(QuestionType.Checkbox)}
                answers={{}}
                {...mockHandlers}
            />
        );
        const checkboxes = screen.getAllByRole("checkbox");
        expect(checkboxes).toHaveLength(2);
    });

    it("renders error message when error prop is provided", () => {
        render(
            <QuestionRenderer
                question={createQuestion(QuestionType.Text)}
                answers={{}}
                error="This field is required"
                {...mockHandlers}
            />
        );
        expect(screen.getByText("This field is required")).toBeInTheDocument();
    });

    it("does not render error when error prop is not provided", () => {
        render(
            <QuestionRenderer
                question={createQuestion(QuestionType.Text)}
                answers={{}}
                {...mockHandlers}
            />
        );
        expect(screen.queryByText("This field is required")).not.toBeInTheDocument();
    });
});