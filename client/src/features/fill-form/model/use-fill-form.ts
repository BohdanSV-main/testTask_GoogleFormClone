import { useRef, useState } from 'react';
import type { Form } from '@/entities/form';
import { useSubmitResponseMutation } from '../api/submit-response-api';
import { isAnswered, validateAnswers, toResponseAnswers, type Answers } from './answers';

export function useFillForm(form: Form) {
  const [answers, setAnswers] = useState<Answers>({});
  const [hasSubmitAttempt, setHasSubmitAttempt] = useState(false);
  const [submitResponse, submitResponseState] = useSubmitResponseMutation();
  const isSubmittingRef = useRef(false);
  const errors = hasSubmitAttempt ? validateAnswers(form.questions, answers) : {};
  const answeredQuestionCount = form.questions.filter((question) =>
    isAnswered(answers[question.id]),
  ).length;

  function changeAnswer(questionId: string, values: string[]) {
    setAnswers((previousAnswers) => ({ ...previousAnswers, [questionId]: values }));
  }

  async function submit(): Promise<boolean> {
    if (isSubmittingRef.current || submitResponseState.isSuccess) {
      return false;
    }

    setHasSubmitAttempt(true);

    if (Object.keys(validateAnswers(form.questions, answers)).length) {
      return false;
    }

    isSubmittingRef.current = true;

    try {
      await submitResponse({
        formId: form.id,
        answers: toResponseAnswers(form.questions, answers),
      }).unwrap();

      return true;
    } catch {
      return false;
    } finally {
      isSubmittingRef.current = false;
    }
  }

  return {
    answers,
    errors,
    answeredQuestionCount,
    changeAnswer,
    submit,
    isSubmitting: submitResponseState.isLoading,
    isSubmitted: submitResponseState.isSuccess,
    submitFailed: submitResponseState.isError,
  };
}
