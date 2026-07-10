import { z } from 'zod';

import { Gender } from 'src/domain/enums/gender.enum';
import { Grade } from 'src/domain/enums/grade.enum';
import { NAME_REGEX } from 'src/common/constants/regex.constants';
import { ValidationMessages } from 'src/common/constants/validation-messages';

export const createStudentSchema = z.object({
  studentName: z
    .string()
    .trim()
    .min(3, ValidationMessages.STUDENT_NAME_MIN_LENGTH)
    .max(100, ValidationMessages.STUDENT_NAME_MAX_LENGTH)
    .regex(NAME_REGEX, ValidationMessages.INVALID_NAME),

  dateOfBirth: z.coerce.date({
    error: ValidationMessages.INVALID_DATE_OF_BIRTH,
  }),

  gender: z.enum(Gender, {
    error: ValidationMessages.INVALID_GENDER,
  }),

  previousSchool: z
    .string()
    .trim()
    .min(2, ValidationMessages.PREVIOUS_SCHOOL_MIN_LENGTH)
    .max(100, ValidationMessages.PREVIOUS_SCHOOL_MAX_LENGTH)
    .regex(NAME_REGEX, ValidationMessages.INVALID_NAME),

  applyingGrade: z.enum(Grade, {
    error: ValidationMessages.INVALID_APPLYING_GRADE,
  }),
});

export type CreateStudentSchema = z.infer<typeof createStudentSchema>;
