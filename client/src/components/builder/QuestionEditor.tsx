import type { QuestionDraft } from "../../types";
import { QuestionType } from "../../types";
import QuestionTypeSelector from "./QuestionTypeSelector";
import OptionsList from "./OptionsList";
import styles from "./QuestionEditor.module.css";

interface QuestionEditorProps {
    question: QuestionDraft;
    onDelete: (id: string) => void;
    onChange: (id: string, updates: Partial<QuestionDraft>) => void;
    onAddOption: (questionId: string) => void;
    onRemoveOption: (questionId: string, optionId: string) => void;
    onChangeOption: (questionId: string, optionId: string, value: string) => void;
    needsOptions: (type: QuestionType) => boolean;
    errors?: { title?: string; options?: string };
}

export default function QuestionEditor({
    question,
    onDelete,
    onChange,
    onAddOption,
    onRemoveOption,
    onChangeOption,
    needsOptions,
    errors,
}: QuestionEditorProps) {
    return (
        <div className={styles.editor}>
            <div className={styles.top}>
                <input
                    type="text"
                    value={question.title}
                    placeholder="Question title"
                    onChange={(e) => onChange(question.id, { title: e.target.value })}
                />
                <QuestionTypeSelector
                    value={question.type}
                    onChange={(type) => onChange(question.id, { type })}
                />
            </div>

            {errors?.title && <p className="error-text">{errors.title}</p>}

            {needsOptions(question.type) && (
                <>
                    <OptionsList
                        options={question.options}
                        onAdd={() => onAddOption(question.id)}
                        onRemove={(optionId) => onRemoveOption(question.id, optionId)}
                        onChange={(optionId, value) => onChangeOption(question.id, optionId, value)}
                    />
                    {errors?.options && <p className="error-text">{errors.options}</p>}
                </>
            )}

            <div className={styles.footer}>
                <label>
                    <input
                        type="checkbox"
                        checked={question.required}
                        onChange={(e) => onChange(question.id, { required: e.target.checked })}
                    />
                    Required
                </label>
                <button className={styles.deleteBtn} onClick={() => onDelete(question.id)}>
                    🗑 Delete
                </button>
            </div>
        </div>
    );
}