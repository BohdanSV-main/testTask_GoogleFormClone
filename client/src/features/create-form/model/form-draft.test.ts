import { describe, expect, it } from 'vitest';
import { createDraft, createOption, createQuestion } from './form-draft';
import { formDraftReducer } from './form-draft-reducer';
import { validateFormDraft } from './validate-form-draft';
import { toCreateFormInput } from './to-create-form-input';

describe('form draft', () => {
  it('starts with a blank text question', () => {
    const draft = createDraft();
    expect(draft.questions).toHaveLength(1);
    expect(draft.questions[0]).toMatchObject({ type: 'TEXT', title: '', required: false });
    expect(draft.questions[0]).not.toHaveProperty('options');
  });
  it('adds and removes only the selected question without mutating state', () => {
    const draft = createDraft();
    const question = createQuestion('DATE');
    const added = formDraftReducer(draft, { type: 'questionAdded', question });
    const removed = formDraftReducer(added, {
      type: 'questionRemoved',
      questionId: draft.questions[0].id,
    });
    expect(draft.questions).toHaveLength(1);
    expect(removed.questions).toEqual([question]);
  });
  it('preserves options when switching between choice types', () => {
    const question = {
      ...createQuestion('MULTIPLE_CHOICE'),
      options: [{ id: 'o', value: 'React' }],
    };
    const result = formDraftReducer(
      { title: '', description: '', questions: [question] },
      {
        type: 'questionTypeChanged',
        questionId: question.id,
        questionType: 'CHECKBOX',
        initialOption: createOption(),
      },
    );
    expect(result.questions[0]).toMatchObject({
      type: 'CHECKBOX',
      options: [{ id: 'o', value: 'React' }],
    });
  });
  it('removes options when switching to text', () => {
    const question = createQuestion('CHECKBOX');
    const result = formDraftReducer(
      { title: '', description: '', questions: [question] },
      {
        type: 'questionTypeChanged',
        questionId: question.id,
        questionType: 'TEXT',
        initialOption: createOption(),
      },
    );
    expect(result.questions[0]).not.toHaveProperty('options');
  });
  it('updates and removes options by stable id', () => {
    const question = createQuestion('CHECKBOX');
    const option = { id: 'new', value: '' };
    const initial = { title: '', description: '', questions: [question] };
    const added = formDraftReducer(initial, {
      type: 'optionAdded',
      questionId: question.id,
      option,
    });
    const changed = formDraftReducer(added, {
      type: 'optionChanged',
      questionId: question.id,
      optionId: option.id,
      value: 'CSS',
    });
    expect(changed.questions[0]).toHaveProperty('options.1.value', 'CSS');
    const removed = formDraftReducer(changed, {
      type: 'optionRemoved',
      questionId: question.id,
      optionId: option.id,
    });
    expect(removed.questions[0]).toHaveProperty('options.length', 1);
  });
  it('rejects empty and whitespace-only titles', () => {
    expect(validateFormDraft({ ...createDraft(), title: '   ' }).title).toBeTruthy();
    const draft = createDraft();
    expect(validateFormDraft(draft).questions?.[draft.questions[0].id]?.title).toBeTruthy();
  });
  it('requires at least one question', () => {
    expect(
      validateFormDraft({ title: 'Survey', description: '', questions: [] }).root,
    ).toBeTruthy();
  });
  it.each([
    { options: [] },
    { options: [{ id: 'a', value: ' ' }] },
    {
      options: [
        { id: 'a', value: 'Yes' },
        { id: 'b', value: ' Yes ' },
      ],
    },
  ])('rejects invalid choice options %j', ({ options }) => {
    const draft = {
      title: 'Survey',
      description: '',
      questions: [{ id: 'q', title: 'Pick', required: true, type: 'CHECKBOX' as const, options }],
    };
    expect(validateFormDraft(draft).questions?.q.options).toBeTruthy();
  });
  it('validates and maps the payload, excluding local ids', () => {
    const draft = {
      title: ' Survey ',
      description: ' About ',
      questions: [
        {
          id: 'q',
          title: ' Pick ',
          required: true,
          type: 'MULTIPLE_CHOICE' as const,
          options: [{ id: 'o', value: ' Yes ' }],
        },
      ],
    };
    expect(validateFormDraft(draft)).toEqual({});
    expect(toCreateFormInput(draft)).toEqual({
      title: 'Survey',
      description: 'About',
      questions: [
        { title: 'Pick', required: true, type: 'MULTIPLE_CHOICE', options: [{ value: 'Yes' }] },
      ],
    });
  });
});
