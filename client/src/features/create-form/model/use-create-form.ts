import { useReducer, useRef, useState } from 'react';
import { createDraft } from './form-draft';
import { formDraftReducer } from './form-draft-reducer';
import { validateFormDraft, type DraftErrors } from './validate-form-draft';
import { toCreateFormInput } from './to-create-form-input';
import { useCreateFormMutation } from '../api/create-form-api';

export function useCreateForm() {
  const [draft, dispatch] = useReducer(formDraftReducer, undefined, createDraft);
  const [hasSubmitAttempt, setHasSubmitAttempt] = useState(false);
  const [createForm, createFormState] = useCreateFormMutation();
  const isSubmittingRef = useRef(false);
  const errors: DraftErrors = hasSubmitAttempt ? validateFormDraft(draft) : {};

  async function submit(): Promise<string | undefined> {
    if (isSubmittingRef.current) {
      return;
    }

    setHasSubmitAttempt(true);

    if (Object.keys(validateFormDraft(draft)).length) {
      return;
    }

    isSubmittingRef.current = true;

    try {
      return await createForm(toCreateFormInput(draft)).unwrap();
    } catch {
      return undefined;
    } finally {
      isSubmittingRef.current = false;
    }
  }

  return {
    draft,
    dispatch,
    errors,
    submit,
    isSaving: createFormState.isLoading,
    saveFailed: createFormState.isError,
  };
}
