import { z } from 'zod';

import { Grade } from 'src/domain/enums/grade.enum';
import { ValidationMessages } from 'src/common/constants/validation-messages';

export const assignCourseSchema = z.object({
  assignedCourse: z.enum(Grade, {
    error: ValidationMessages.INVALID_ASSIGNED_COURSE,
  }),
});

export type AssignCourseSchema = z.infer<typeof assignCourseSchema>;
