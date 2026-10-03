import { useState } from 'react';
import { useGetFormsQuery } from '@/entities/form';

export function useFormsCatalog() {
  const [searchText, setSearchText] = useState('');
  const formsQuery = useGetFormsQuery();
  const forms = [...(formsQuery.data ?? [])].sort(
    (firstForm, secondForm) => Date.parse(secondForm.createdAt) - Date.parse(firstForm.createdAt),
  );
  const normalizedSearch = searchText.trim().toLocaleLowerCase('uk');
  const visibleForms = forms.filter((form) =>
    `${form.title} ${form.description}`.toLocaleLowerCase('uk').includes(normalizedSearch),
  );

  return {
    searchText,
    setSearchText,
    forms,
    visibleForms,
    isLoading: formsQuery.isLoading,
    isFetching: formsQuery.isFetching,
    isError: formsQuery.isError,
    retry: formsQuery.refetch,
  };
}
