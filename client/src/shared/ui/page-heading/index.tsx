import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { routes } from '@/shared/config';
import styles from './page-heading.module.css';

export function BackLink() {
  return (
    <Link className={styles.back} to={routes.home}>
      ← До всіх форм
    </Link>
  );
}

interface PageHeadingProps {
  title: string;
  description?: string;
  eyebrow?: string;
  action?: ReactNode;
}

export function PageHeading({ title, description, eyebrow, action }: PageHeadingProps) {
  return (
    <header className={styles.header}>
      <BackLink />
      <div className={styles.row}>
        <div>
          {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
          <h1 tabIndex={-1}>{title}</h1>
          {description && <p className={styles.description}>{description}</p>}
        </div>
        {action}
      </div>
    </header>
  );
}
