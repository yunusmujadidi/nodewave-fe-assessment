import z from "zod";

export const loginFormSchema = z.object({
  email: z.string().min(1, "Please enter your email"),
  password: z.string().min(1, "Please enter your password"),
});

export const registerFormSchema = z
  .object({
    fullName: z.string().min(1, "Please enter your fullname"),
    lastName: z.string().optional(),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email"),
    phoneNumber: z.string().optional(),
    country: z.string().optional(),
    password: z
      .string()
      .min(1, "Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    about: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const todoSchema = z.object({
  item: z.string().min(1, "Todo cannot be empty"),
});
