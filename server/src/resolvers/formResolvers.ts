import { forms } from "../store/inMemoryStore.js";
import type {
    Form,
    Question,
    Option,
    QuestionType,
    CreateFormArgs,
} from "../types/index.js";
import { v4 as uuidv4 } from "uuid";

export const formResolvers = {
    Query: {
        forms: () => forms,
        form: (_: unknown, { id }: { id: string }) =>
            forms.find((f) => f.id === id) ?? null,
    },

    Mutation: {
        createForm: (
            _: unknown,
            { title, description, questions }: CreateFormArgs,
        ): Form => {
            const newForm: Form = {
                id: uuidv4(),
                title,
                ...(description && { description }), // ← так
                questions: (questions ?? []).map(
                    (q): Question => ({
                        id: uuidv4(),
                        title: q.title,
                        type: q.type as QuestionType,
                        required: q.required,
                        ...(q.options && {
                            options: q.options.map(
                                (o): Option => ({
                                    id: uuidv4(),
                                    value: o.value,
                                }),
                            ),
                        }),
                    }),
                ),
                createdAt: new Date().toISOString(),
            };
            forms.push(newForm);
            return newForm;
        },
    },
};
