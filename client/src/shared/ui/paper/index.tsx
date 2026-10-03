import type { ComponentProps } from 'react';
import { cx } from '@/shared/lib/class-names';
import styles from './paper.module.css';

type PaperProps = ComponentProps<'section'> & { accent?: 'yellow' | 'red' };

export function Paper({ className, accent, ...props }: PaperProps) {
  return <section {...props} className={cx(styles.paper, accent && styles[accent], className)} />;
}
