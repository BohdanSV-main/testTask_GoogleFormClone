import { useId, type ComponentProps, type ReactNode } from 'react';
import { cx } from '@/shared/lib/class-names';
import styles from './field.module.css';

interface FieldProps {
  label: string;
  error?: string;
  hint?: string;
}

type FieldFrameProps = FieldProps & { id: string; required?: boolean; children: ReactNode };

function FieldFrame({ id, label, error, hint, required, children }: FieldFrameProps) {
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {required && <span className={styles.required}> *</span>}
      </label>
      {hint && (
        <p className={styles.hint} id={`${id}-hint`}>
          {hint}
        </p>
      )}
      {children}
      {error && (
        <p className={styles.error} id={`${id}-error`} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function getDescriptionIds(id: string, error?: string, hint?: string) {
  return [error && `${id}-error`, hint && `${id}-hint`].filter(Boolean).join(' ') || undefined;
}

type TextFieldProps = FieldProps & ComponentProps<'input'> & { titleStyle?: boolean };

export function TextField({
  label,
  error,
  hint,
  id: providedId,
  className,
  titleStyle,
  ...props
}: TextFieldProps) {
  const generatedId = useId();
  const id = providedId ?? generatedId;

  return (
    <FieldFrame id={id} label={label} error={error} hint={hint} required={props.required}>
      <input
        {...props}
        id={id}
        aria-invalid={!!error || undefined}
        aria-describedby={getDescriptionIds(id, error, hint)}
        className={cx(styles.input, titleStyle && styles.title, className)}
      />
    </FieldFrame>
  );
}

type TextareaFieldProps = FieldProps & ComponentProps<'textarea'>;

export function TextareaField({
  label,
  error,
  hint,
  id: providedId,
  className,
  ...props
}: TextareaFieldProps) {
  const generatedId = useId();
  const id = providedId ?? generatedId;

  return (
    <FieldFrame id={id} label={label} error={error} hint={hint} required={props.required}>
      <textarea
        {...props}
        id={id}
        aria-invalid={!!error || undefined}
        aria-describedby={getDescriptionIds(id, error, hint)}
        className={cx(styles.input, styles.textarea, className)}
      />
    </FieldFrame>
  );
}

type SelectFieldProps = FieldProps & ComponentProps<'select'>;

export function SelectField({
  label,
  error,
  hint,
  id: providedId,
  className,
  ...props
}: SelectFieldProps) {
  const generatedId = useId();
  const id = providedId ?? generatedId;

  return (
    <FieldFrame id={id} label={label} error={error} hint={hint}>
      <select
        {...props}
        id={id}
        aria-invalid={!!error || undefined}
        aria-describedby={getDescriptionIds(id, error, hint)}
        className={cx(styles.input, styles.select, className)}
      />
    </FieldFrame>
  );
}

type ChoiceControlProps = ComponentProps<'input'> & {
  children: ReactNode;
  type?: 'checkbox' | 'radio';
  compact?: boolean;
};

export function ChoiceControl({
  children,
  className,
  type = 'checkbox',
  compact = false,
  ...props
}: ChoiceControlProps) {
  return (
    <label className={cx(styles.choice, compact && styles.compact, className)}>
      <input {...props} type={type} />
      <span>{children}</span>
    </label>
  );
}

export function FieldError({ id, children }: { id?: string; children?: ReactNode }) {
  return children ? (
    <p id={id} className={styles.error} role="alert">
      {children}
    </p>
  ) : null;
}
