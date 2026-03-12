import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import FormCard from "../../components/forms/FormCard";

const mockForm = {
    id: "1",
    title: "Test Form",
    description: "Test Description",
    createdAt: "2026-01-01T00:00:00.000Z",
    questions: [],
};

const renderFormCard = (form = mockForm) =>
    render(
        <BrowserRouter>
            <FormCard form={form} />
        </BrowserRouter>
    );

describe("FormCard", () => {
    it("renders form title", () => {
        renderFormCard();
        expect(screen.getByText("Test Form")).toBeInTheDocument();
    });

    it("renders form description", () => {
        renderFormCard();
        expect(screen.getByText("Test Description")).toBeInTheDocument();
    });

    it("renders Fill Form link with correct href", () => {
        renderFormCard();
        const fillLink = screen.getByText("Fill Form");
        expect(fillLink).toBeInTheDocument();
        expect(fillLink).toHaveAttribute("href", "/forms/1/fill");
    });

    it("renders Responses link with correct href", () => {
        renderFormCard();
        const responsesLink = screen.getByText("Responses");
        expect(responsesLink).toBeInTheDocument();
        expect(responsesLink).toHaveAttribute("href", "/forms/1/responses");
    });
});