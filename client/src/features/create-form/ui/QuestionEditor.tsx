import type { Dispatch } from 'react';
import { isQuestionType, questionTypes, questionTypeLabels, type Question } from '@/entities/form';
import { Button } from '@/shared/ui/button';
import { TextField, SelectField, ChoiceControl, FieldError } from '@/shared/ui/field';
import { Paper } from '@/shared/ui/paper';
import { formatNumber } from '@/shared/lib/format';
import { createOption } from '../model/form-draft';
import type { DraftAction } from '../model/form-draft-reducer';
import type { QuestionErrors } from '../model/validate-form-draft';
import styles from './create-form.module.css';

interface QuestionEditorProps {
  question: Question;
  index: number;
  errors?: QuestionErrors;
  dispatch: Dispatch<DraftAction>;
}

export function QuestionEditor({ question, index, errors, dispatch }: QuestionEditorProps) {
  const questionId = question.id;

  return (
    <Paper aria-label={`Питання ${index + 1}`}>
      <div className={styles.questionHead}>
        <span className={styles.number}>ПИТАННЯ {formatNumber(index + 1)}</span>
        <SelectField
          label={`Тип питання ${index + 1}`}
          value={question.type}
          onChange={(event) => {
            if (isQuestionType(event.target.value)) {
              dispatch({
                type: 'questionTypeChanged',
                questionId,
                questionType: event.target.value,
                initialOption: createOption(),
              });
            }
          }}
        >
          {questionTypes.map((type) => (
            <option key={type} value={type}>
              {questionTypeLabels[type]}
            </option>
          ))}
        </SelectField>
      </div>
      <TextField
        id={`question-${questionId}`}
        label="Текст питання"
        required
        value={question.title}
        error={errors?.title}
        placeholder="Що хочете дізнатися?"
        onChange={(event) =>
          dispatch({ type: 'questionChanged', questionId, changes: { title: event.target.value } })
        }
      />
      {'options' in question ? (
        <div className={styles.options}>
          {question.options.map((option, optionIndex) => (
            <div className={styles.option} key={option.id}>
              <TextField
                label={`Варіант ${optionIndex + 1}`}
                value={option.value}
                required
                placeholder="Текст варіанта"
                error={errors?.options && !option.value.trim() ? 'Заповніть варіант.' : undefined}
                onChange={(event) =>
                  dispatch({
                    type: 'optionChanged',
                    questionId,
                    optionId: option.id,
                    value: event.target.value,
                  })
                }
              />
              <Button
                variant="text"
                aria-label={`Видалити варіант ${optionIndex + 1}`}
                onClick={() => dispatch({ type: 'optionRemoved', questionId, optionId: option.id })}
              >
                ×
              </Button>
            </div>
          ))}
          <FieldError id={`options-error-${questionId}`}>{errors?.options}</FieldError>
          <Button
            variant="text"
            aria-invalid={!!errors?.options || undefined}
            aria-describedby={errors?.options ? `options-error-${questionId}` : undefined}
            onClick={() => dispatch({ type: 'optionAdded', questionId, option: createOption() })}
          >
            ＋ Додати варіант
          </Button>
        </div>
      ) : (
        <p className={styles.placeholder}>
          {question.type === 'DATE' ? 'дд.мм.рррр' : 'Тут буде коротка відповідь…'}
        </p>
      )}
      <div className={styles.questionFoot}>
        <ChoiceControl
          compact
          checked={question.required}
          onChange={(event) =>
            dispatch({
              type: 'questionChanged',
              questionId,
              changes: { required: event.target.checked },
            })
          }
        >
          Обов’язкове питання
        </ChoiceControl>
        <Button
          variant="text"
          aria-label={`Видалити питання ${index + 1}`}
          onClick={() => dispatch({ type: 'questionRemoved', questionId })}
        >
          Видалити
        </Button>
      </div>
    </Paper>
  );
}
