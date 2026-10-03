import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { SiteHeader, SiteFooter } from '@/widgets/site-chrome';
import styles from './app-layout.module.css';

export function AppLayout() {
  const { pathname } = useLocation();
  const mainRef = useRef<HTMLElement>(null);
  useEffect(() => {
    window.scrollTo(0, 0);
    mainRef.current?.focus({ preventScroll: true });
  }, [pathname]);

  return (
    <div className={styles.app}>
      <a className={styles.skip} href="#main">
        Перейти до вмісту
      </a>
      <SiteHeader />
      <main ref={mainRef} className={styles.main} id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}
