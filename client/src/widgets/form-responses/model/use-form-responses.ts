import { useGetFormQuery } from '@/entities/form';
import { useGetResponsesQuery } from '@/entities/response';
import { resolveAnswers } from './resolve-answers';

export function useFormResponses(formId: string) {
  const formQuery = useGetFormQuery(formId);
  const form = formQuery.currentData;
  const responsesQuery = useGetResponsesQuery(formId, { skip: !form });

  function retry() {
    void formQuery.refetch();

    if (!responsesQuery.isUninitialized) {
      void responsesQuery.refetch();
    }
  }

  if (formQuery.isError || responsesQuery.isError) {
    return {
      status: 'error' as const,
      retry,
      isRetrying: formQuery.isFetching || responsesQuery.isFetching,
    };
  }

  if (form === null) {
    return { status: 'not-found' as const };
  }

  if (!form || !responsesQuery.currentData) {
    return { status: 'loading' as const };
  }

  const responses = [...responsesQuery.currentData]
    .sort(
      (firstResponse, secondResponse) =>
        Date.parse(secondResponse.submittedAt) - Date.parse(firstResponse.submittedAt),
    )
    .map((response) => ({ ...response, displayAnswers: resolveAnswers(form, response) }));

  return { status: 'ready' as const, form, responses };
}
