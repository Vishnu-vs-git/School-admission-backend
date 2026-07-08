export const ValidationMessages = {
  NAME_REQUIRED: 'Name is required.',
  NAME_MUST_BE_STRING: 'Name must be a string.',
  INVALID_NAME:
    'Each word must start with a capital letter and contain only alphabets. Numbers and special characters are not allowed.',

  EMAIL_REQUIRED: 'Email is required.',
  INVALID_EMAIL: 'Please enter a valid email address.',
  ROLE_REQUIRED: 'Role is required.',

  PASSWORD_REQUIRED: 'Password is required.',
  PASSWORD_MUST_BE_STRING: 'Password must be a string.',
  INVALID_PASSWORD:
    'Password must be between 8 and 16 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.',

  INVALID_ROLE: 'Role must be either parent or admission.',
} as const;
