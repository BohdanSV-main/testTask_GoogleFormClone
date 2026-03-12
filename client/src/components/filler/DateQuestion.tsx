interface DateQuestionProps {
    questionId: string;
    value: string;
    onChange: (questionId: string, value: string) => void;
}

export default function DateQuestion({ questionId, value, onChange }: DateQuestionProps) {
    return (
        <input
            type="date"
            value={value}
            onChange={(e) => onChange(questionId, e.target.value)}
        />
    );
}