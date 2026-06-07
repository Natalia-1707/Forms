import { z } from "zod";

export const createFormSchema = (
  countries: string[]
) =>
  z
    .object({
      name: z
        .string()
        .min(1, "Name is required")
        .refine(
          (value) =>
            value[0] === value[0]?.toUpperCase(),
          {
            message:
              "First letter must be uppercase",
          }
        ),

      age: z
        .number()
        .min(0, "Age cannot be negative"),

      gender: z
        .string()
        .min(1, "Choose gender"),

      email: z.string().refine(
        (value) => {
          const parts = value.split("@");

          if (parts.length !== 2)
            return false;

          const [localPart, domain] =
            parts;

          if (!localPart) return false;

          if (!domain.includes("."))
            return false;

          return true;
        },
        {
          message: "Invalid email",
        }
      ),

      country: z
        .string()
        .min(1, "Country is required")
        .refine(
          (value) =>
            countries.includes(value),
          {
            message:
              "Choose valid country",
          }
        ),

      password: z
        .string()
        .min(1, "Password is required"),

      confirmPassword: z.string(),

      image: z
        .string({
          message: "Image is required",
        })
        .min(1, "Image is required"),

      terms: z.literal(true, {
        message:
          "Accept Terms & Conditions",
      }),
    })
    .refine(
      (data) =>
        data.password ===
        data.confirmPassword,
      {
        message: "Passwords must match",
        path: ["confirmPassword"],
      }
    );

export type FormSchema = z.infer<
  ReturnType<typeof createFormSchema>
>;