import { describe, it, expect, beforeEach } from "vitest";
import { forms, responses } from "../store/inMemoryStore.js";
import { formResolvers } from "../resolvers/formResolvers.js";
import { responseResolvers } from "../resolvers/responseResolvers.js";

beforeEach(() => {
    forms.length = 0;
    responses.length = 0;
});

describe("formResolvers", () => {
    describe("Query.forms", () => {
        it("returns empty array when no forms exist", () => {
            const result = formResolvers.Query.forms();
            expect(result).toEqual([]);
        });

        it("returns all forms", () => {
            formResolvers.Mutation.createForm(
                {},
                {
                    title: "Form 1",
                    description: "Desc 1",
                },
            );
            formResolvers.Mutation.createForm(
                {},
                {
                    title: "Form 2",
                },
            );
            const result = formResolvers.Query.forms();
            expect(result).toHaveLength(2);
        });
    });

    describe("Query.form", () => {
        it("returns form by id", () => {
            const created = formResolvers.Mutation.createForm(
                {},
                { title: "Test Form" },
            );
            const result = formResolvers.Query.form({}, { id: created.id });
            expect(result?.title).toBe("Test Form");
        });

        it("returns null when form not found", () => {
            const result = formResolvers.Query.form({}, { id: "non-existent" });
            expect(result).toBeNull();
        });
    });

    describe("Mutation.createForm", () => {
        it("creates form with title", () => {
            const result = formResolvers.Mutation.createForm(
                {},
                { title: "New Form" },
            );
            expect(result.title).toBe("New Form");
        });

        it("creates form with description", () => {
            const result = formResolvers.Mutation.createForm(
                {},
                {
                    title: "New Form",
                    description: "Description",
                },
            );
            expect(result.description).toBe("Description");
        });

        it("creates form with questions", () => {
            const result = formResolvers.Mutation.createForm(
                {},
                {
                    title: "New Form",
                    questions: [
                        { title: "Question 1", type: "TEXT", required: true },
                    ],
                },
            );
            expect(result.questions).toHaveLength(1);
            expect(result.questions[0]?.title).toBe("Question 1");
        });

        it("generates unique id for each form", () => {
            const form1 = formResolvers.Mutation.createForm(
                {},
                { title: "Form 1" },
            );
            const form2 = formResolvers.Mutation.createForm(
                {},
                { title: "Form 2" },
            );
            expect(form1.id).not.toBe(form2.id);
        });

        it("saves form to store", () => {
            formResolvers.Mutation.createForm({}, { title: "Stored Form" });
            expect(forms).toHaveLength(1);
        });

        it("creates form with empty questions when not provided", () => {
            const result = formResolvers.Mutation.createForm(
                {},
                { title: "No Questions" },
            );
            expect(result.questions).toEqual([]);
        });
    });
});

describe("responseResolvers", () => {
    describe("Query.responses", () => {
        it("returns empty array when no responses exist", () => {
            const result = responseResolvers.Query.responses(
                {},
                { formId: "form1" },
            );
            expect(result).toEqual([]);
        });

        it("returns only responses for specified form", () => {
            const form1 = formResolvers.Mutation.createForm(
                {},
                { title: "Form 1" },
            );
            const form2 = formResolvers.Mutation.createForm(
                {},
                { title: "Form 2" },
            );

            responseResolvers.Mutation.submitResponse(
                {},
                {
                    formId: form1.id,
                    answers: [{ questionId: "q1", value: ["answer1"] }],
                },
            );
            responseResolvers.Mutation.submitResponse(
                {},
                {
                    formId: form2.id,
                    answers: [{ questionId: "q2", value: ["answer2"] }],
                },
            );

            const result = responseResolvers.Query.responses(
                {},
                { formId: form1.id },
            );
            expect(result).toHaveLength(1);
            expect(result[0]?.formId).toBe(form1.id);
        });
    });

    describe("Mutation.submitResponse", () => {
        it("submits response for existing form", () => {
            const form = formResolvers.Mutation.createForm(
                {},
                { title: "Test Form" },
            );
            const result = responseResolvers.Mutation.submitResponse(
                {},
                {
                    formId: form.id,
                    answers: [{ questionId: "q1", value: ["answer"] }],
                },
            );
            expect(result.formId).toBe(form.id);
        });

        it("throws error when form not found", () => {
            expect(() =>
                responseResolvers.Mutation.submitResponse(
                    {},
                    {
                        formId: "non-existent",
                        answers: [],
                    },
                ),
            ).toThrow("Form with id non-existent not found");
        });

        it("saves response with correct answers", () => {
            const form = formResolvers.Mutation.createForm(
                {},
                { title: "Test Form" },
            );
            const result = responseResolvers.Mutation.submitResponse(
                {},
                {
                    formId: form.id,
                    answers: [
                        { questionId: "q1", value: ["answer1", "answer2"] },
                    ],
                },
            );
            expect(result.answers[0]?.questionId).toBe("q1");
            expect(result.answers[0]?.value).toEqual(["answer1", "answer2"]);
        });

        it("generates unique id for each response", () => {
            const form = formResolvers.Mutation.createForm(
                {},
                { title: "Test Form" },
            );
            const r1 = responseResolvers.Mutation.submitResponse(
                {},
                {
                    formId: form.id,
                    answers: [],
                },
            );
            const r2 = responseResolvers.Mutation.submitResponse(
                {},
                {
                    formId: form.id,
                    answers: [],
                },
            );
            expect(r1.id).not.toBe(r2.id);
        });

        it("saves response to store", () => {
            const form = formResolvers.Mutation.createForm(
                {},
                { title: "Test Form" },
            );
            responseResolvers.Mutation.submitResponse(
                {},
                {
                    formId: form.id,
                    answers: [],
                },
            );
            expect(responses).toHaveLength(1);
        });
    });
});
