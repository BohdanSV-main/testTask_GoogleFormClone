import { Link } from 'react-router-dom';
import { FormCard } from '@/entities/form';
import { routes } from '@/shared/config';
import { Button, ButtonLink } from '@/shared/ui/button';
import { LoadingState, ErrorState, StatePanel } from '@/shared/ui/state-panel';
import { useFormsCatalog } from '../model/use-forms-catalog';
import styles from './forms-catalog.module.css';

export function FormsCatalog() {
  const { searchText, setSearchText, forms, visibleForms, isLoading, isFetching, isError, retry } =
    useFormsCatalog();

  return (
    <section aria-labelledby="forms-title">
      <div className={styles.heading}>
        <h2 id="forms-title">
          Усі форми <span className={styles.count}>{forms.length}</span>
        </h2>
        <label className={styles.search}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            aria-hidden="true"
          >
            <circle cx="10" cy="10" r="6" />
            <path d="m15 15 5 5" />
          </svg>
          <input
            type="search"
            aria-label="Знайти форму"
            placeholder="Знайти ту саму форму…"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />
        </label>
      </div>
      {isLoading ? (
        <LoadingState label="Збираємо ваші форми…" />
      ) : isError ? (
        <ErrorState onRetry={() => void retry()} isRetrying={isFetching} />
      ) : !forms.length ? (
        <StatePanel
          title="Місце для першої ідеї."
          description="Створіть свою першу форму. Почати можна з одного простого питання."
          action={
            <ButtonLink variant="primary" to={routes.createForm}>
              Створити форму
            </ButtonLink>
          }
        />
      ) : !visibleForms.length ? (
        <StatePanel
          icon="?"
          title="Такої форми не знайшлося."
          description="Спробуйте іншу назву або поверніться до всіх форм."
          action={<Button onClick={() => setSearchText('')}>Очистити пошук</Button>}
        />
      ) : (
        <div className={styles.cards}>
          {visibleForms.map((form, index) => (
            <FormCard
              key={form.id}
              form={form}
              index={index}
              actions={
                <>
                  <ButtonLink
                    to={routes.fillForm(form.id)}
                    size="small"
                    aria-label={`Заповнити: ${form.title}`}
                  >
                    Заповнити ↗
                  </ButtonLink>
                  <Link to={routes.formResponses(form.id)} aria-label={`Відповіді: ${form.title}`}>
                    Відповіді →
                  </Link>
                </>
              }
            />
          ))}
        </div>
      )}
    </section>
  );
}
