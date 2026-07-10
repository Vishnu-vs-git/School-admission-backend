import { z } from 'zod';

export const examSlotSchema = z.object({
  date: z.coerce.date(),

  time: z.string().trim().min(1, 'Time is required.'),

  totalSeats: z.number().int().min(1, 'Total seats must be at least 1.'),
});

export type ExamSlotSchema = z.infer<typeof examSlotSchema>;
