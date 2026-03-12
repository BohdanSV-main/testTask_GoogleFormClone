interface MultipleChoiceQuestionProps {
    questionId: string;
    options: { id: string; value: string }[];
    value: string;
    onChange: (questionId: string, value: string) => void;
    className?: string;
}

export default function MultipleChoiceQuestion({
    questionId,
    options,
    value,
    onChange,
    className,
}: MultipleChoiceQuestionProps) {
    return (
        <div className={className}>
            {options.map((option) => (
                <label key={option.id}>
                    <input
                        type="radio"
                        name={questionId}
                        value={option.value}
                        checked={value === option.value}
                        onChange={(e) => onChange(questionId, e.target.value)}
                    />
                    {option.value}
                </label>
            ))}
        </div>
    );
}