import { z } from 'zod';

export const faqSchema = z.object({
  question: z
    .string()
    .min(3, 'Question must be at least 3 characters')
    .max(255, 'Question is too long'),
  answer: z.string().min(10, 'Answer must be at least 10 characters'),
  category: z.string(),
  sortOrder: z.number().min(0, 'Sort order must be at least 0'),
  isPublished: z.boolean(),
});

export type FaqFormData = z.infer<typeof faqSchema>;
