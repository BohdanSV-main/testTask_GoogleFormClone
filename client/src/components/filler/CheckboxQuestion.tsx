interface CheckboxQuestionProps {
    questionId: string;
    options: { id: string; value: string }[];
    values: string[];
    onChange: (questionId: string, value: string, checked: boolean) => void;
    className?: string;
}

export default function CheckboxQuestion({
    questionId,
    options,
    values,
    onChange,
    className,
}: CheckboxQuestionProps) {
    return (
        <div className={className}>
            {options.map((option) => (
                <label key={option.id}>
                    <input
                        type="checkbox"
                        value={option.value}
                        checked={values.includes(option.value)}
                        onChange={(e) => onChange(questionId, option.value, e.target.checked)}
                    />
                    {option.value}
                </label>
            ))}
        </div>
    );
}