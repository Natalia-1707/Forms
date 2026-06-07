import { describe, it, expect } from 'vitest';
import reducer, { addSubmission } from '../store/formSlice';

describe('formSlice', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual({
      submissions: [],
    });
  });

  it('should add submission', () => {
    const initialState = {
      submissions: [],
    };

    const action = addSubmission({
      id: '1',
      type: 'uncontrolled',
      data: {
        name: 'John',
        age: 25,
        gender: 'male',
        email: 'john@mail.com',
        country: 'Germany',
        password: '123',
        confirmPassword: '123',
        image: 'base64',
        terms: true,
      },
    });

    const state = reducer(initialState, action);

    expect(state.submissions.length).toBe(1);
    expect(state.submissions[0].id).toBe('1');
    expect(state.submissions[0].type).toBe('uncontrolled');
  });
});
