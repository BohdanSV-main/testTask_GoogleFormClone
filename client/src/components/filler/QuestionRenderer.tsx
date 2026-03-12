import { QuestionType } from "../../types";
import type { QuestionDraft } from "../../types";
import TextQuestion from "./TextQuestion";
import DateQuestion from "./DateQuestion";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";
import CheckboxQuestion from "./CheckboxQuestion";
import styles from "./QuestionRenderer.module.css";

interface QuestionRendererProps {
    question: QuestionDraft;
    answers: Record<string, string[]>;
    error?: string;
    onTextChange: (questionId: string, value: string) => void;
    onCheckboxChange: (questionId: string, value: string, checked: boolean) => void;
    onSingleChoiceChange: (questionId: string, value: string) => void;
}

export default function QuestionRenderer({
    question,
    answers,
    error,
    onTextChange,
    onCheckboxChange,
    onSingleChoiceChange,
}: QuestionRendererProps) {
    const value = answers[question.id] ?? [];

    return (
        <div className={styles.renderer}>
            <p className={styles.title}>
                {question.title}
                {question.required && <span> *</span>}
            </p>

            {question.type === QuestionType.Text && (
                <TextQuestion
                    questionId={question.id}
                    value={value[0] ?? ""}
                    onChange={onTextChange}
                />
            )}

            {question.type === QuestionType.Date && (
                <DateQuestion
                    questionId={question.id}
                    value={value[0] ?? ""}
                    onChange={onTextChange}
                />
            )}

            {question.type === QuestionType.MultipleChoice && (
                <MultipleChoiceQuestion
                    questionId={question.id}
                    options={question.options}
                    value={value[0] ?? ""}
                    onChange={onSingleChoiceChange}
                    className={styles.multipleChoice}
                />
            )}

            {question.type === QuestionType.Checkbox && (
                <CheckboxQuestion
                    questionId={question.id}
                    options={question.options}
                    values={value}
                    onChange={onCheckboxChange}
                    className={styles.checkbox}
                />
            )}

            {error && <p className="error-text">{error}</p>}
        </div>
    );
}