import { CreateForm } from '@/features/create-form';
import { PageHeading } from '@/shared/ui/page-heading';
import { Badge } from '@/shared/ui/badge';

export function FormBuilderPage() {
  return (
    <>
      <title>Створити форму — форма.</title>
      <PageHeading
        title="Скласти нову форму"
        description="Одне хороше питання — вже початок розмови."
        action={<Badge>✎ НОВА ФОРМА</Badge>}
      />
      <CreateForm />
    </>
  );
}
