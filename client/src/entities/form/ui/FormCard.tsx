import type { ReactNode } from 'react';
import { formatDate, formatNumber } from '@/shared/lib/format';
import type { FormSummary } from '../model/form';
import styles from './form-card.module.css';

interface FormCardProps {
  form: FormSummary;
  index: number;
  actions: ReactNode;
}

export function FormCard({ form, index, actions }: FormCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.band}>
        <span>ФОРМА / {formatNumber(index + 1)}</span>
        <svg
          viewBox="0 0 20 20"
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          aria-hidden="true"
        >
          <path d="M5 2h10v16H5zM8 6h4M8 10h4M8 14h3" />
        </svg>
      </div>
      <div className={styles.body}>
        <h3>{form.title}</h3>
        <p>{form.description || 'Нова форма для ваших запитань.'}</p>
        <div className={styles.meta}>
          СТВОРЕНО <time dateTime={form.createdAt}>{formatDate(form.createdAt)}</time>
        </div>
      </div>
      <div className={styles.actions}>{actions}</div>
    </article>
  );
}
