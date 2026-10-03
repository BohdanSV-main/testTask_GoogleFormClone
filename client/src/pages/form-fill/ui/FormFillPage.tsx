import { FillForm } from '@/features/fill-form';
import styles from './form-fill-page.module.css';

export function FormFillPage({ formId }: { formId: string }) {
  return (
    <div className={styles.page}>
      <FillForm formId={formId} />
    </div>
  );
}
