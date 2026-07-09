import { z } from 'zod';
import { ValidationMessages } from 'src/common/constants/validation-messages';

export const loginSchema = z.object({
  email: z.email(ValidationMessages.INVALID_EMAIL),

  password: z.string().min(1, ValidationMessages.PASSWORD_REQUIRED),
});
