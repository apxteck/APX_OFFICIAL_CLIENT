import z from 'zod';

export const resendSchema = z.object({
  email: z.string().trim().toLowerCase().min(1, 'Email is required').email('Invalid email format'),
});

export type ResendFormValues = z.infer<typeof resendSchema>;
