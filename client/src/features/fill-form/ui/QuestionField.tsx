import type { Question } from '@/entities/form';
import { TextField, ChoiceControl, FieldError } from '@/shared/ui/field';
import { formatNumber } from '@/shared/lib/format';
import { toggleAnswer } from '../model/answers';
import styles from './fill-form.module.css';

interface QuestionFieldProps {
  question: Question;
  index: number;
  values: string[];
  error?: string;
  disabled: boolean;
  onChange: (questionId: string, values: string[]) => void;
}

export function QuestionField({
  question,
  index,
  values,
  error,
  disabled,
  onChange,
}: QuestionFieldProps) {
  const errorId = `answer-error-${question.id}`;

  return (
    <fieldset className={styles.question} disabled={disabled}>
      <legend>
        <span className={styles.questionIndex}>{formatNumber(index + 1)}.</span>
        {question.title}
        {question.required && <span className={styles.required}> *</span>}
      </legend>
      <div className={styles.content}>
        {'options' in question ? (
          <>
            {question.type === 'CHECKBOX' && (
              <p className={styles.hint}>Можна обрати кілька варіантів.</p>
            )}
            <div className={styles.choices}>
              {question.options.map((option) => (
                <ChoiceControl
                  key={option.id}
                  type={question.type === 'CHECKBOX' ? 'checkbox' : 'radio'}
                  name={question.id}
                  value={option.value}
                  checked={values.includes(option.value)}
                  aria-invalid={!!error || undefined}
                  aria-describedby={error ? errorId : undefined}
                  onChange={(event) =>
                    onChange(
                      question.id,
                      question.type === 'CHECKBOX'
                        ? toggleAnswer(values, option.value, event.target.checked)
                        : [option.value],
                    )
                  }
                >
                  {option.value}
                </ChoiceControl>
              ))}
            </div>
            <FieldError id={errorId}>{error}</FieldError>
          </>
        ) : (
          <TextField
            label="Ваша відповідь"
            type={question.type === 'DATE' ? 'date' : 'text'}
            name={question.id}
            required={question.required}
            value={values[0] ?? ''}
            error={error}
            placeholder="Напишіть тут…"
            onChange={(event) => onChange(question.id, [event.target.value])}
          />
        )}
      </div>
    </fieldset>
  );
}
