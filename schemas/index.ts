import * as z from "zod";

export const RegisterFormSchema = z
  .object({
    name: z
      .string({ required_error: "Name is required" })
      .min(3, { message: "Name must be at least 3 characters" }),
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const LoginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const TimelineFormSchema = z.object({
  title: z.string().min(1),
  // date:z.string().min(1),
  date: z.coerce.date(),
  description: z.string().min(1),
});
