import { useRef, type FormEvent } from 'react';
import { useGetFormQuery, type Form } from '@/entities/form';
import { routes } from '@/shared/config';
import { focusFirstError } from '@/shared/lib/focus';
import { Button, ButtonLink } from '@/shared/ui/button';
import { BackLink } from '@/shared/ui/page-heading';
import { Paper } from '@/shared/ui/paper';
import { FieldError } from '@/shared/ui/field';
import { LoadingState, ErrorState, StatePanel } from '@/shared/ui/state-panel';
import { useFillForm } from '../model/use-fill-form';
import { QuestionField } from './QuestionField';
import styles from './fill-form.module.css';

export function FillForm({ formId }: { formId: string }) {
  const { currentData: form, isFetching, isError, refetch } = useGetFormQuery(formId);

  if (isError) {
    return <ErrorState onRetry={() => void refetch()} isRetrying={isFetching} />;
  }

  if (form === undefined) {
    return <LoadingState label="Готуємо вашу анкету…" />;
  }

  if (!form) {
    return (
      <StatePanel
        icon="?"
        title="Цей аркуш загубився."
        description="Форму за цим посиланням не знайдено. Перевірте адресу або поверніться до списку."
        action={<ButtonLink to={routes.home}>До всіх форм</ButtonLink>}
      />
    );
  }

  return <FormAnswerSheet key={form.id} form={form} />;
}

function FormAnswerSheet({ form }: { form: Form }) {
  const {
    answers,
    errors,
    answeredQuestionCount,
    changeAnswer,
    submit,
    isSubmitting,
    isSubmitted,
    submitFailed,
  } = useFillForm(form);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!(await submit())) {
      focusFirstError(formRef.current);
    }
  }

  if (isSubmitted) {
    return (
      <Paper className={styles.success}>
        <title>Дякуємо за відповідь — форма.</title>
        <span className={styles.stamp}>✓ ВІДПОВІДЬ ПРИЙНЯТО</span>
        <h1
          tabIndex={-1}
          ref={(element) => {
            element?.focus();
          }}
        >
          Дякуємо за ваш час.
        </h1>
        <p>
          Кожна думка важлива. Ваші відповіді на форму «{form.title}» вже зібрані разом з іншими.
        </p>
        <div className={styles.successActions}>
          <ButtonLink variant="yellow" to={routes.home}>
            До всіх форм
          </ButtonLink>
          <ButtonLink variant="text" to={routes.formResponses(form.id)}>
            Переглянути відповіді →
          </ButtonLink>
        </div>
      </Paper>
    );
  }

  return (
    <>
      <title>{`${form.title} — форма.`}</title>
      <BackLink />
      <Paper accent="red" className={styles.heading}>
        <p className={styles.eyebrow}>ВАША ДУМКА МАЄ ЗНАЧЕННЯ</p>
        <h1 tabIndex={-1}>{form.title}</h1>
        {form.description && <p className={styles.description}>{form.description}</p>}
        <div className={styles.meta}>
          <span>КІЛЬКІСТЬ ПИТАНЬ: {form.questions.length}</span>
          <span>
            <span className={styles.required}>*</span> ОБОВ’ЯЗКОВЕ ПОЛЕ
          </span>
        </div>
      </Paper>
      <form
        ref={formRef}
        noValidate
        onSubmit={handleSubmit}
        aria-label="Заповнення анкети"
        aria-busy={isSubmitting}
      >
        {form.questions.map((question, index) => (
          <QuestionField
            key={question.id}
            question={question}
            index={index}
            values={answers[question.id] ?? []}
            error={errors[question.id]}
            disabled={isSubmitting}
            onChange={changeAnswer}
          />
        ))}
        {submitFailed && (
          <div className={styles.submitError}>
            <FieldError>
              Не вдалося надіслати відповіді. Введені дані залишаються у формі. Спробуйте ще раз.
            </FieldError>
          </div>
        )}
        <div className={styles.bottom}>
          <div>
            <p className={styles.progressLabel} role="status">
              Заповнено: {answeredQuestionCount} із {form.questions.length}
            </p>
            <progress
              className={styles.progress}
              value={answeredQuestionCount}
              max={form.questions.length || 1}
              aria-label="Прогрес заповнення"
            />
          </div>
          <Button type="submit" variant="primary" loading={isSubmitting}>
            {isSubmitting ? 'Надсилаємо…' : 'Надіслати відповіді ↗'}
          </Button>
        </div>
      </form>
    </>
  );
}
