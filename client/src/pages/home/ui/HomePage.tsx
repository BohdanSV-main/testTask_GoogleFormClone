import { FormsCatalog } from '@/widgets/forms-catalog';
import { ButtonLink } from '@/shared/ui/button';
import { routes } from '@/shared/config';
import styles from './home-page.module.css';

export function HomePage() {
  return (
    <>
      <title>форма. — Хороші питання. Корисні відповіді.</title>
      <section className={styles.hero} aria-labelledby="home-title">
        <div>
          <p className={styles.eyebrow}>ПРОСТІ ФОРМИ. ЖИВІ ВІДПОВІДІ.</p>
          <h1 id="home-title" tabIndex={-1}>
            Хороші питання.
            <br />
            <em>Корисні відповіді.</em>
          </h1>
          <p className={styles.lead}>
            Для цікавих ідей, чесних відгуків і маленьких досліджень. Зберіть усе важливе в одній
            формі.
          </p>
          <div className={styles.actions}>
            <ButtonLink variant="primary" to={routes.createForm}>
              ＋ Створити форму
            </ButtonLink>
            <span className={styles.asideNote}>почнімо з чистого аркуша ↗</span>
          </div>
        </div>
        <div className={styles.art} aria-hidden="true">
          <div className={styles.grid} />
          <span className={styles.star}>✳</span>
          <div className={styles.slip}>
            <div className={styles.slipTop}>
              <span>АНКЕТА № 001</span>
              <span>↗</span>
            </div>
            <div className={styles.slipTitle}>А що думаєте ви?</div>
            <div className={styles.slipRow}>
              <span className={styles.box}>✓</span>
              <span className={styles.line} />
            </div>
            <div className={styles.slipRow}>
              <span className={styles.box} />
              <span className={styles.shortLine} />
            </div>
            <div className={styles.slipRow}>
              <span className={styles.box}>✓</span>
              <span className={styles.line} />
            </div>
            <div className={styles.slipFoot}>КОЖНА ВІДПОВІДЬ — НОВИЙ ПОГЛЯД.</div>
          </div>
          <div className={styles.stamp}>
            <b>☺</b>менше зайвого,
            <br />
            більше сенсу
          </div>
        </div>
      </section>
      <FormsCatalog />
      <div className={styles.steps}>
        <div>
          <b>01.</b>
          <p>
            <strong>Складіть питання</strong>Текст, варіанти відповіді чи дата.
          </p>
        </div>
        <div>
          <b>02.</b>
          <p>
            <strong>Поділіться формою</strong>Надішліть посилання тим, кого питаєте.
          </p>
        </div>
        <div>
          <b>03.</b>
          <p>
            <strong>Почуйте відповіді</strong>Усі думки зібрані в одному місці.
          </p>
        </div>
      </div>
    </>
  );
}
