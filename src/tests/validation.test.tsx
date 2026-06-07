import { describe, it, expect } from "vitest";
import { createFormSchema } from "../validation/validation";

describe("createFormSchema", () => {
  const countries = ["Germany", "France"];
  const schema = createFormSchema(countries);

  it("valid data passes", () => {
    const result = schema.safeParse({
      name: "John",
      age: 25,
      gender: "male",
      email: "john@mail.com",
      country: "Germany",
      password: "123456",
      confirmPassword: "123456",
      image: "base64string",
      terms: true,
    });

    expect(result.success).toBe(true);
  });

  it("fails when passwords do not match", () => {
    const result = schema.safeParse({
      name: "John",
      age: 25,
      gender: "male",
      email: "john@mail.com",
      country: "Germany",
      password: "123456",
      confirmPassword: "different",
      image: "base64string",
      terms: true,
    });

    expect(result.success).toBe(false);
  });

  it("fails when country is invalid", () => {
    const result = schema.safeParse({
      name: "John",
      age: 25,
      gender: "male",
      email: "john@mail.com",
      country: "Spain",
      password: "123456",
      confirmPassword: "123456",
      image: "base64string",
      terms: true,
    });

    expect(result.success).toBe(false);
  });

  it("fails when email is invalid", () => {
    const result = schema.safeParse({
      name: "John",
      age: 25,
      gender: "male",
      email: "johnmail.com",
      country: "Germany",
      password: "123456",
      confirmPassword: "123456",
      image: "base64string",
      terms: true,
    });

    expect(result.success).toBe(false);
  });
});