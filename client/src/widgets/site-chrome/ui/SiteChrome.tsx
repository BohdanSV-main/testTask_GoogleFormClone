import { Link } from 'react-router-dom';
import { routes } from '@/shared/config';
import { ButtonLink } from '@/shared/ui/button';
import styles from './site-chrome.module.css';

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link className={styles.brand} to={routes.home} aria-label="форма. — головна">
          <span className={styles.mark} aria-hidden="true">
            <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M6 3h16v22H6zM10 9h8M10 14h8M10 19h5" />
            </svg>
          </span>
          <span>
            <span className={styles.wordmark}>
              форма<span>.</span>
            </span>
            <span className={styles.tagline}>ПИТАННЯ МАЮТЬ ЗНАЧЕННЯ</span>
          </span>
        </Link>
        <nav className={styles.nav} aria-label="Основна навігація">
          <Link to={routes.home}>Усі форми</Link>
          <ButtonLink variant="primary" to={routes.createForm}>
            ＋ Нова форма
          </ButtonLink>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.footerBrand}>
          <span>форма.</span>
          <p>Створюй. Запитуй. Дізнавайся.</p>
        </div>
        <span className={styles.footerTag}>ЗРОБЛЕНО З УВАГОЮ ДО ДЕТАЛЕЙ</span>
        <p className={styles.footerNote}>Forms Lite / навчальний проєкт</p>
      </div>
    </footer>
  );
}
