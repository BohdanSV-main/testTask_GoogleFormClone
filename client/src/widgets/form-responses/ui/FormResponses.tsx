import { ResponseCard } from '@/entities/response';
import { routes } from '@/shared/config';
import { formatDate, formatNumber } from '@/shared/lib/format';
import { ButtonLink } from '@/shared/ui/button';
import { PageHeading } from '@/shared/ui/page-heading';
import { ErrorState, LoadingState, StatePanel } from '@/shared/ui/state-panel';
import { useFormResponses } from '../model/use-form-responses';
import styles from './form-responses.module.css';

export function FormResponses({ formId }: { formId: string }) {
  const responsesState = useFormResponses(formId);

  if (responsesState.status === 'loading') {
    return <LoadingState label="Збираємо відповіді…" />;
  }

  if (responsesState.status === 'error') {
    return <ErrorState onRetry={responsesState.retry} isRetrying={responsesState.isRetrying} />;
  }

  if (responsesState.status === 'not-found') {
    return (
      <StatePanel
        icon="?"
        title="Цей аркуш загубився."
        description="Такої форми не знайдено. Перевірте посилання або поверніться до списку."
        action={<ButtonLink to={routes.home}>До всіх форм</ButtonLink>}
      />
    );
  }

  const { form, responses } = responsesState;

  return (
    <>
      <title>{`Відповіді: ${form.title} — форма.`}</title>
      <PageHeading
        title={form.title}
        description="Відповіді учасників, зібрані в одному місці."
        eyebrow="ПОЧУТИ КОЖНОГО"
        action={
          <ButtonLink size="small" to={routes.fillForm(form.id)}>
            Відкрити форму ↗
          </ButtonLink>
        }
      />
      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <div className={styles.receipt}>
            <div className={styles.caption}>ОТРИМАНО ВІДПОВІДЕЙ</div>
            <div className={styles.total}>{formatNumber(responses.length)}</div>
            <div className={styles.caption}>КОЖНА ДУМКА ВАЖЛИВА</div>
            <div className={styles.receiptBottom}>
              <div>
                <span>ПИТАНЬ У ФОРМІ</span>
                <b>{form.questions.length}</b>
              </div>
              <div>
                <span>СТВОРЕНО</span>
                <b>{formatDate(form.createdAt)}</b>
              </div>
            </div>
          </div>
          <p className={styles.note}>
            <strong>За цифрами — люди.</strong>Відкрийте відповідь, щоб побачити кожне питання й те,
            що розповів учасник.
          </p>
        </aside>
        <div className={styles.list}>
          {responses.length ? (
            responses.map((response, index) => (
              <ResponseCard
                key={response.id}
                index={index}
                submittedAt={response.submittedAt}
                answers={response.displayAnswers}
              />
            ))
          ) : (
            <StatePanel
              icon="↗"
              title="Розмова ще попереду."
              description="Тут з’являться відповіді. Поділіться посиланням на форму з першими учасниками."
              action={
                <ButtonLink size="small" to={routes.fillForm(form.id)}>
                  Відкрити форму ↗
                </ButtonLink>
              }
            />
          )}
        </div>
      </div>
    </>
  );
}
