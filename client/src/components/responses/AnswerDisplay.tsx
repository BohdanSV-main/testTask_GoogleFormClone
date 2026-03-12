import styles from "./AnswerDisplay.module.css";

interface AnswerDisplayProps {
    questionTitle: string;
    value: string[];
}

export default function AnswerDisplay({ questionTitle, value }: AnswerDisplayProps) {
    const hasAnswer = value.length > 0 && value[0] !== "";

    return (
        <div className={styles.answer}>
            <p className={styles.question}>{questionTitle}</p>
            <p className={`${styles.value} ${!hasAnswer ? styles.empty : ""}`}>
                {hasAnswer ? value.join(", ") : "No answer provided"}
            </p>
        </div>
    );
}