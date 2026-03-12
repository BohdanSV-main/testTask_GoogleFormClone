import { responses, forms } from "../store/inMemoryStore.js";
import type { Response, Answer } from "../types/index.js";
import type { SubmitResponseArgs } from "../types/index.js";
import { v4 as uuidv4 } from "uuid";

export const responseResolvers = {
    Query: {
        responses: (_: unknown, { formId }: { formId: string }) =>
            responses.filter((r) => r.formId === formId),
    },

    Mutation: {
        submitResponse: (
            _: unknown,
            { formId, answers }: SubmitResponseArgs,
        ): Response => {
            const form = forms.find((f) => f.id === formId);
            if (!form) {
                throw new Error(`Form with id ${formId} not found`);
            }

            const newResponse: Response = {
                id: uuidv4(),
                formId,
                answers: answers.map(
                    (a): Answer => ({
                        questionId: a.questionId,
                        value: a.value,
                    }),
                ),
                submittedAt: new Date().toISOString(),
            };

            responses.push(newResponse);
            return newResponse;
        },
    },
};
