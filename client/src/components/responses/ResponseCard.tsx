import type { GetResponsesQuery } from "../../api/generated/types";
import AnswerDisplay from "./AnswerDisplay";
import styles from "./ResponseCard.module.css";

type Response = GetResponsesQuery["responses"][number];

interface ResponseCardProps {
    response: Response;
    getQuestionTitle: (questionId: string) => string;
}

export default function ResponseCard({ response, getQuestionTitle }: ResponseCardProps) {
    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <span className={styles.icon}>📋</span>
                <div>
                    <p className={styles.title}>Response</p>
                    <p className={styles.date}>
                        {new Date(response.submittedAt).toLocaleString()}
                    </p>
                </div>
            </div>
            <div className={styles.answers}>
                {response.answers.map((answer) => (
                    <AnswerDisplay
                        key={answer.questionId}
                        questionTitle={getQuestionTitle(answer.questionId)}
                        value={answer.value}
                    />
                ))}
            </div>
        </div>
    );
}