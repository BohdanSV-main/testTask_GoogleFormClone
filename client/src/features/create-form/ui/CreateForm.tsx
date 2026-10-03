import { useRef, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { questionTypes, questionTypeLabels, type QuestionType } from '@/entities/form';
import { routes } from '@/shared/config';
import { focusFirstError } from '@/shared/lib/focus';
import { Button } from '@/shared/ui/button';
import { TextField, TextareaField, FieldError } from '@/shared/ui/field';
import { Paper } from '@/shared/ui/paper';
import { createQuestion } from '../model/form-draft';
import { useCreateForm } from '../model/use-create-form';
import { QuestionEditor } from './QuestionEditor';
import styles from './create-form.module.css';

const questionTypeSymbols: Record<QuestionType, string> = {
  TEXT: 'Aa',
  MULTIPLE_CHOICE: '◉',
  CHECKBOX: '☑',
  DATE: '▦',
};

export function CreateForm() {
  const { draft, dispatch, errors, submit, isSaving, saveFailed } = useCreateForm();
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();

  function addQuestion(type: QuestionType) {
    const question = createQuestion(type);
    dispatch({ type: 'questionAdded', question });
    requestAnimationFrame(() => document.getElementById(`question-${question.id}`)?.focus());
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const createdFormId = await submit();

    if (createdFormId) {
      navigate(routes.home);
    } else {
      focusFirstError(formRef.current);
    }
  }

  return (
    <form
      ref={formRef}
      className={styles.workspace}
      onSubmit={handleSubmit}
      noValidate
      aria-label="Конструктор форми"
      aria-busy={isSaving}
    >
      <aside className={styles.sidebar}>
        <h2 className={styles.sidebarTitle}>ДОДАТИ ПИТАННЯ</h2>
        <div className={styles.palette}>
          {questionTypes.map((type) => (
            <button
              key={type}
              type="button"
              className={styles.typeButton}
              disabled={isSaving}
              onClick={() => addQuestion(type)}
            >
              <span className={styles.symbol} aria-hidden="true">
                {questionTypeSymbols[type]}
              </span>
              {questionTypeLabels[type]}
              <span aria-hidden="true">+</span>
            </button>
          ))}
        </div>
        <p className={styles.note}>
          <strong>Маленька порада ↗</strong>Одне питання — одна думка. Так відповідати простіше, а
          відповіді будуть точнішими.
        </p>
      </aside>
      <fieldset className={styles.fields} disabled={isSaving}>
        <legend className={styles.srOnly}>Питання та налаштування форми</legend>
        <Paper accent="yellow">
          <p className={styles.number}>ПОЧНІМО З ГОЛОВНОГО</p>
          <div className={styles.headingFields}>
            <TextField
              id="form-title"
              label="Назва форми"
              titleStyle
              required
              value={draft.title}
              error={errors.title}
              placeholder="Дайте формі назву"
              onChange={(event) => dispatch({ type: 'titleChanged', value: event.target.value })}
            />
            <TextareaField
              label="Кілька слів для учасників · необов’язково"
              value={draft.description}
              placeholder="Про що ця форма?"
              onChange={(event) =>
                dispatch({ type: 'descriptionChanged', value: event.target.value })
              }
            />
          </div>
        </Paper>
        {draft.questions.map((question, index) => (
          <QuestionEditor
            key={question.id}
            question={question}
            index={index}
            dispatch={dispatch}
            errors={errors.questions?.[question.id]}
          />
        ))}
        <button
          className={styles.addQuestion}
          type="button"
          onClick={() => addQuestion('TEXT')}
          data-error-focus={errors.root ? true : undefined}
        >
          ＋ Ще одне питання
        </button>
        <FieldError>{errors.root}</FieldError>
        {saveFailed && (
          <FieldError>
            Не вдалося зберегти форму. Введені дані залишилися на місці. Спробуйте ще раз.
          </FieldError>
        )}
        <div className={styles.saveRow}>
          <p>
            Усе готово?
            <br />
            Збережіть форму й збирайте відповіді.
          </p>
          <Button variant="primary" type="submit" loading={isSaving}>
            {isSaving ? 'Зберігаємо…' : 'Зберегти форму ↗'}
          </Button>
        </div>
      </fieldset>
    </form>
  );
}
