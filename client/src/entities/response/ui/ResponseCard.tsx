import { formatDateTime, formatNumber } from '@/shared/lib/format';
import type { DisplayAnswer } from '../model/response';
import styles from './response-card.module.css';

interface ResponseCardProps {
  index: number;
  submittedAt: string;
  answers: DisplayAnswer[];
}

export function ResponseCard({ index, submittedAt, answers }: ResponseCardProps) {
  return (
    <details className={styles.card} open={index === 0}>
      <summary>
        <span>
          <span className={styles.title}>Відповідь № {formatNumber(index + 1)}</span>
          <time className={styles.date} dateTime={submittedAt}>
            {formatDateTime(submittedAt)}
          </time>
        </span>
      </summary>
      <dl className={styles.answers}>
        {answers.map((answer, answerIndex) => (
          <div className={styles.answer} key={answerIndex}>
            <dt>
              {formatNumber(answerIndex + 1)}. {answer.questionTitle}
            </dt>
            <dd>
              {answer.values.length ? (
                answer.values.map((value, valueIndex) => (
                  <span
                    className={answer.allowsMultipleAnswers ? styles.tag : undefined}
                    key={valueIndex}
                  >
                    {value}
                    {!answer.allowsMultipleAnswers && valueIndex < answer.values.length - 1
                      ? ' · '
                      : ''}
                  </span>
                ))
              ) : (
                <span className={styles.empty}>Без відповіді</span>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </details>
  );
}
