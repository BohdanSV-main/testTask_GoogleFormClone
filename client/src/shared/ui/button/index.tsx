import type { ButtonHTMLAttributes } from 'react';
import { Link, type LinkProps } from 'react-router-dom';
import { cx } from '@/shared/lib/class-names';
import styles from './button.module.css';

interface ButtonAppearance {
  variant?: 'primary' | 'secondary' | 'yellow' | 'text';
  size?: 'regular' | 'small';
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonAppearance & { loading?: boolean };

export function Button({
  variant = 'secondary',
  size = 'regular',
  loading = false,
  disabled,
  className,
  type = 'button',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cx(styles.button, styles[variant], styles[size], className)}
    >
      {children}
    </button>
  );
}

type ButtonLinkProps = LinkProps & ButtonAppearance;

export function ButtonLink({
  variant = 'secondary',
  size = 'regular',
  className,
  ...props
}: ButtonLinkProps) {
  return (
    <Link {...props} className={cx(styles.button, styles[variant], styles[size], className)} />
  );
}
