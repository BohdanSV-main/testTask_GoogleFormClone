import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from "./pages/HomePage"
import FormBuilderPage from "./pages/FormBuilderPage"
import FormFillerPage from "./pages/FormFillerPage"
import FormResponsesPage from "./pages/FormResponsesPage"


export default function App() {
  return (<BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/forms/new" element={<FormBuilderPage />} />
      <Route path="/forms/:id/fill" element={<FormFillerPage />} />
      <Route path="/forms/:id/responses" element={<FormResponsesPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>

  </BrowserRouter>)
}
