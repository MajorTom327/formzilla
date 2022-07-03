import { test, expect } from "vitest";
import { FormField } from "../../src/FormField";

test("Should map corretly fields to form fields", () => {
  const ff = new FormField({
    name: "name",
    label: "Name",
    placeholder: "Enter your name",
    required: true,
    requiredMessage: "Please this is required",
    rules: [
      {
        regex: /^[a-zA-Z]+$/,
        message: "Only letters allowed",
      },
    ],
    component: "input",
    transformer: (v: string) => v.toUpperCase(),
  });

  expect(ff.name).toBe("name");
  expect(ff.label).toBe("Name");
  expect(ff.placeholder).toBe("Enter your name");
  expect(ff.required).toBe(true);
  expect(ff.requiredMessage).toBe("Please this is required");
  expect(ff.rules).to.have.length(1);
  expect(ff.component).toBe("input");
  expect(ff.transformer("hello")).toBe("HELLO");
});

test("Should map corretly default fields to form fields", () => {
  const ff = new FormField({
    name: "name",
    label: "Name",
    component: "input",
  });

  expect(ff.name).toBe("name");
  expect(ff.label).toBe("Name");
  expect(ff.placeholder).toBe(undefined);
  expect(ff.required).toBe(false);
  expect(ff.requiredMessage).toBe("This field is required");
  expect(ff.rules).to.have.length(0);
  expect(ff.component).toBe("input");
  expect(ff.transformer("hello")).toBe("hello");
});
