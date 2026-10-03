import { BrowserRouter, Navigate, Route, Routes, useParams } from 'react-router-dom';
import { HomePage } from '@/pages/home';
import { FormBuilderPage } from '@/pages/form-builder';
import { FormFillPage } from '@/pages/form-fill';
import { FormResponsesPage } from '@/pages/form-responses';
import { routes } from '@/shared/config';
import { AppLayout } from '../layouts/AppLayout';

function FormFillRoute() {
  const { id: formId } = useParams();

  return formId ? (
    <FormFillPage key={formId} formId={formId} />
  ) : (
    <Navigate to={routes.home} replace />
  );
}

function FormResponsesRoute() {
  const { id: formId } = useParams();

  return formId ? (
    <FormResponsesPage key={formId} formId={formId} />
  ) : (
    <Navigate to={routes.home} replace />
  );
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="forms/new" element={<FormBuilderPage />} />
          <Route path="forms/:id/fill" element={<FormFillRoute />} />
          <Route path="forms/:id/responses" element={<FormResponsesRoute />} />
          <Route path="*" element={<Navigate to={routes.home} replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
