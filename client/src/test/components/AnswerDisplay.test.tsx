import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import AnswerDisplay from "../../components/responses/AnswerDisplay";

describe("AnswerDisplay", () => {
    it("renders question title", () => {
        render(<AnswerDisplay questionTitle="What is your name?" value={["John"]} />);
        expect(screen.getByText("What is your name?")).toBeInTheDocument();
    });

    it("renders single answer value", () => {
        render(<AnswerDisplay questionTitle="Question" value={["Answer"]} />);
        expect(screen.getByText("Answer")).toBeInTheDocument();
    });

    it("renders multiple values joined with comma", () => {
        render(<AnswerDisplay questionTitle="Question" value={["A", "B", "C"]} />);
        expect(screen.getByText("A, B, C")).toBeInTheDocument();
    });

    it("renders empty state when no answer", () => {
        render(<AnswerDisplay questionTitle="Question" value={[]} />);
        expect(screen.getByText("No answer provided")).toBeInTheDocument();
    });
});