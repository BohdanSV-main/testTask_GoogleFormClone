import { describe, expect, it } from 'vitest';
import type { Question } from '@/entities/form';
import { toggleAnswer, validateAnswers, toResponseAnswers, isAnswered } from './answers';

const textQuestion: Question = { id: 'text', title: 'Name', type: 'TEXT', required: true };
const dateQuestion: Question = { id: 'date', title: 'Date', type: 'DATE', required: false };
const singleChoiceQuestion: Question = {
  id: 'radio',
  title: 'Choice',
  type: 'MULTIPLE_CHOICE',
  required: true,
  options: [{ id: 'yes', value: 'Yes' }],
};

describe('form answers', () => {
  it.each([{ values: [] }, { values: [''] }, { values: ['  '] }])(
    'rejects missing required answers %j',
    ({ values }) => expect(validateAnswers([textQuestion], { text: values }).text).toBeTruthy(),
  );
  it('accepts omitted optional fields', () =>
    expect(validateAnswers([dateQuestion], {})).toEqual({}));
  it('rejects values outside choice options', () =>
    expect(validateAnswers([singleChoiceQuestion], { radio: ['No'] }).radio).toBeTruthy());
  it('rejects multiple values for a single choice', () =>
    expect(validateAnswers([singleChoiceQuestion], { radio: ['Yes', 'Yes'] }).radio).toBeTruthy());
  it.each(['2026-02-29', '2026-13-01', '2026-04-31', '31.04.2026'])(
    'rejects invalid calendar date %s',
    (value) => expect(validateAnswers([dateQuestion], { date: [value] }).date).toBeTruthy(),
  );
  it('accepts a valid leap day', () =>
    expect(validateAnswers([dateQuestion], { date: ['2028-02-29'] })).toEqual({}));
  it('toggles checkboxes without duplicates or mutations', () => {
    const original = ['CSS'];
    expect(toggleAnswer(original, 'CSS', true)).toEqual(['CSS']);
    expect(toggleAnswer(original, 'React', true)).toEqual(['CSS', 'React']);
    expect(toggleAnswer(original, 'CSS', false)).toEqual([]);
    expect(original).toEqual(['CSS']);
  });
  it('only submits current questions and trims free text', () => {
    expect(
      toResponseAnswers([textQuestion, dateQuestion], { text: [' Ada '], unknown: ['discard'] }),
    ).toEqual([
      { questionId: 'text', value: ['Ada'] },
      { questionId: 'date', value: [] },
    ]);
    expect(isAnswered([' '])).toBe(false);
    expect(isAnswered(['React'])).toBe(true);
  });
});
