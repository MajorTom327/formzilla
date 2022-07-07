import { test, expect } from 'vitest';
import Joi from 'joi';
import FormField from '../../src/FormField';
import { FormHandler } from '../../src/FormHandler';

const fields: FormField[] = [
  new FormField({
    name: 'name',
    label: 'Name',
    component: 'input',
    required: true,
  }),
  new FormField({
    name: 'email',
    label: 'email',
    component: 'input',
    required: true,
  }),
];

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
});

test('Should return an error errors', () => {
  const formHandler = new FormHandler(fields, schema);
  const errors = formHandler.validate({ name: 'John' });
  expect(errors).toEqual({ email: '"email" is required' });
});

test('Should return many errors', () => {
  const formHandler = new FormHandler(fields, schema);
  const errors = formHandler.validate({});
  expect(errors).toEqual({
    email: '"email" is required',
    name: '"name" is required',
  });
});

test('Should return a validation error message', () => {
  const formHandler = new FormHandler([
    new FormField({
      name: 'name',
      label: 'Name',
      component: 'input',
      required: true,
    }),
  ], Joi.object({
    name: Joi
      .string()
      .pattern(/^[a-zA-Z]+$/)
      .required()
      .messages({ 'string.pattern.base': 'Name must be letters only' }),
  }));
  const errors = formHandler.validate({ name: '123' });

  expect(errors).toEqual({ name: 'Name must be letters only' });
});
