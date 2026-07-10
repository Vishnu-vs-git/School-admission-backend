import { z } from 'zod';

import { ValidationMessages } from 'src/common/constants/validation-messages';

export const updateExamScoreSchema = z.object({
  examScore: z
    .number({
      error: ValidationMessages.EXAM_SCORE_REQUIRED,
    })
    .min(0, ValidationMessages.INVALID_EXAM_SCORE)
    .max(100, ValidationMessages.INVALID_EXAM_SCORE),
});

export type UpdateExamScoreSchema = z.infer<typeof updateExamScoreSchema>;
