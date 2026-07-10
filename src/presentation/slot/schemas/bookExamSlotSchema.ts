import { z } from 'zod';
import { ValidationMessages } from 'src/common/constants/validation-messages';

export const bookExamSlotSchema = z.object({
  examSlotId: z.string().trim().min(1, ValidationMessages.EXAM_SLOT_REQUIRED),
});

export type BookExamSlotSchema = z.infer<typeof bookExamSlotSchema>;
