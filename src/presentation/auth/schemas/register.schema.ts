import { z } from 'zod';

import { Role } from '../../../domain/enums/role.enum';
import { NAME_REGEX, PASSWORD_REGEX } from 'src/common/constants/regex.constants';
import { ValidationMessages } from 'src/common/constants/validation-messages';

export const registerSchema = z.object({
  name: z.string().regex(NAME_REGEX, ValidationMessages.INVALID_NAME),

  email: z.string().email(ValidationMessages.INVALID_EMAIL),

  password: z.string().regex(PASSWORD_REGEX, ValidationMessages.INVALID_PASSWORD),

   role: z.enum(Role),
});
