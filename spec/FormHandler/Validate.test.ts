import { test, expect } from "vitest";
import FormField from "../../src/FormField";
import { FormHandler } from "../../src/FormHandler";

const fields: FormField[] = [
  new FormField({
    name: "name",
    label: "Name",
    component: "input",
    required: true,
    requiredMessage: "Name is required",
  }),
  new FormField({
    name: "email",
    label: "email",
    component: "input",
    required: true,
    requiredMessage: "Email is required",
  }),
];

test("Should return an error errors", () => {
  const formHandler = new FormHandler(fields);
  const errors = formHandler.validate({ name: "John" });
  expect(errors).toEqual({ email: "Email is required" });
});

test("Should return many errors", () => {
  const formHandler = new FormHandler(fields);
  const errors = formHandler.validate({});
  expect(errors).toEqual({
    email: "Email is required",
    name: "Name is required",
  });
});

test("Should return a validation error message", () => {
  const formHandler = new FormHandler([
    new FormField({
      name: "name",
      label: "Name",
      component: "input",
      required: true,
      requiredMessage: "Name is required",
      rules: [
        {
          regex: /^[a-zA-Z]+$/,
          message: "Name must be letters only",
        },
      ],
    }),
  ]);
  const errors = formHandler.validate({ name: "123" });

  expect(errors).toEqual({ name: "Name must be letters only" });
});
