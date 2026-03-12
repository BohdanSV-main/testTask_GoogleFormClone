import { QuestionType } from "../../types";
import styles from "./QuestionTypeSelector.module.css";

interface QuestionTypeSelectorProps {
    value: QuestionType;
    onChange: (type: QuestionType) => void;
}

const options = [
    { label: "Text", value: QuestionType.Text },
    { label: "Multiple Choice", value: QuestionType.MultipleChoice },
    { label: "Checkboxes", value: QuestionType.Checkbox },
    { label: "Date", value: QuestionType.Date },
];

export default function QuestionTypeSelector({ value, onChange }: QuestionTypeSelectorProps) {
    return (
        <select
            className={styles.selector}
            value={value}
            onChange={(e) => onChange(e.target.value as QuestionType)}
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}