import { z } from 'zod';

export const updateExamScoreSchema = z.object({
  examScore: z.number().min(0).max(100),
});

export type UpdateExamScoreSchema = z.infer<typeof updateExamScoreSchema>;
