import type { Form } from '@/entities/form';
import type { FormResponse, DisplayAnswer } from '@/entities/response';
import { formatCalendarDate } from '@/shared/lib/format';

export function resolveAnswers(form: Form, response: FormResponse): DisplayAnswer[] {
  const answerValuesByQuestionId = new Map(
    response.answers.map((answer) => [answer.questionId, answer.value]),
  );

  return form.questions.map((question) => ({
    questionTitle: question.title,
    values: (answerValuesByQuestionId.get(question.id) ?? [])
      .filter((value) => value.trim())
      .map((value) => (question.type === 'DATE' ? formatCalendarDate(value) : value)),
    allowsMultipleAnswers: question.type === 'CHECKBOX',
  }));
}
