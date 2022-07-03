import { test, expect } from "vitest";
import { FormField } from "../../src/FormField";

test("Should validate with regex", () => {
  const ff = new FormField({
    name: "name",
    label: "Name",
    component: "input",
    rules: [
      {
        regex: /^[a-zA-Z]+$/,
        message: "Only letters allowed",
      },
    ],
  });

  expect(ff.validate("hello")).toBe(null);
  expect(ff.validate("hello world")).toBe("Only letters allowed");
  expect(ff.validate("hello123")).toBe("Only letters allowed");
});

test("Should validate with function", () => {
  const ff = new FormField({
    name: "name",
    label: "Name",
    component: "input",
    rules: [
      {
        f: (value: string) => value.length > 3,
        message: "Too short",
      },
    ],
  });

  expect(ff.validate("hi")).toBe("Too short");
  expect(ff.validate("hello world")).toBe(null);
});

test("Should return first validation error", () => {
  const ff = new FormField({
    name: "name",
    label: "Name",
    component: "input",
    rules: [
      {
        regex: /^[a-zA-Z]+$/,
        message: "Only letters allowed",
      },
      {
        f: (value: string) => value.length > 3,
        message: "Too short",
      },
    ],
  });

  expect(ff.validate("hi")).toBe("Too short");
  expect(ff.validate("hello world")).toBe("Only letters allowed");
  expect(ff.validate("hello")).toBe(null);
});
