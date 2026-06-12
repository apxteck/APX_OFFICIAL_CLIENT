import z from 'zod';

export const forgotPasswordSchema = z.object({
  email: z.string().trim().toLowerCase().min(1, 'Email is required').email('Invalid email format'),
});

export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;
