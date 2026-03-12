interface TextQuestionProps {
    questionId: string;
    value: string;
    onChange: (questionId: string, value: string) => void;
}

export default function TextQuestion({ questionId, value, onChange }: TextQuestionProps) {
    return (
        <input
            type="text"
            value={value}
            placeholder="Your answer"
            onChange={(e) => onChange(questionId, e.target.value)}
        />
    );
}