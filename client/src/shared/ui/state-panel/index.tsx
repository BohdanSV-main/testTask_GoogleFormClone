import type { ReactNode } from 'react';
import { Button } from '@/shared/ui/button';
import styles from './state-panel.module.css';

interface StatePanelProps {
  title: string;
  description: string;
  icon?: string;
  action?: ReactNode;
  alert?: boolean;
}

export function StatePanel({
  title,
  description,
  icon = '+',
  action,
  alert = false,
}: StatePanelProps) {
  return (
    <section className={styles.panel} role={alert ? 'alert' : undefined}>
      <span className={styles.icon} aria-hidden="true">
        {icon}
      </span>
      <h2>{title}</h2>
      <p>{description}</p>
      {action}
    </section>
  );
}

export function ErrorState({ onRetry, isRetrying }: { onRetry: () => void; isRetrying?: boolean }) {
  return (
    <StatePanel
      alert
      icon="!"
      title="Не вдалося завантажити."
      description="Перевірте з’єднання та спробуйте ще раз."
      action={
        <Button onClick={onRetry} loading={isRetrying}>
          {isRetrying ? 'Завантажуємо…' : 'Спробувати знову ↻'}
        </Button>
      }
    />
  );
}

export function LoadingState({ label = 'Завантажуємо…' }: { label?: string }) {
  return (
    <div className={styles.loading} role="status" aria-live="polite">
      <p>{label}</p>
      <div className={styles.skeleton} aria-hidden="true" />
      <div className={styles.shortSkeleton} aria-hidden="true" />
      <div className={styles.skeleton} aria-hidden="true" />
    </div>
  );
}
