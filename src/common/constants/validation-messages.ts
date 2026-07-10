export const ValidationMessages = {
  // Common
  REQUIRED: 'This field is required.',
  INVALID_DATE: 'Please provide a valid date.',
  INVALID_ENUM: 'Invalid value selected.',

  //------ Name
  NAME_REQUIRED: 'Name is required.',
  NAME_MUST_BE_STRING: 'Name must be a string.',
  NAME_MIN_LENGTH: 'Name must be at least 3 characters.',
  NAME_MAX_LENGTH: 'Name cannot exceed 100 characters.',
  INVALID_NAME:
    'Each word must start with a capital letter and contain only alphabets. Numbers and special characters are not allowed.',

  // ------Email
  EMAIL_REQUIRED: 'Email is required.',
  INVALID_EMAIL: 'Please enter a valid email address.',

  // -----Password
  PASSWORD_REQUIRED: 'Password is required.',
  PASSWORD_MUST_BE_STRING: 'Password must be a string.',
  INVALID_PASSWORD:
    'Password must be between 8 and 16 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.',

  //----- Role
  ROLE_REQUIRED: 'Role is required.',
  INVALID_ROLE: 'Role must be either parent or admission.',

  // -----Student
  STUDENT_NAME_REQUIRED: 'Student name is required.',
  STUDENT_NAME_MIN_LENGTH: 'Student name must be at least 3 characters.',
  STUDENT_NAME_MAX_LENGTH: 'Student name cannot exceed 100 characters.',

  PREVIOUS_SCHOOL_REQUIRED: 'Previous school is required.',
  PREVIOUS_SCHOOL_MIN_LENGTH: 'Previous school must be at least 2 characters.',
  PREVIOUS_SCHOOL_MAX_LENGTH: 'Previous school cannot exceed 100 characters.',

  DATE_OF_BIRTH_REQUIRED: 'Date of birth is required.',
  INVALID_DATE_OF_BIRTH: 'Please provide a valid date of birth.',

  GENDER_REQUIRED: 'Gender is required.',
  INVALID_GENDER: 'Please select a valid gender.',

  APPLYING_GRADE_REQUIRED: 'Applying grade is required.',
  INVALID_APPLYING_GRADE: 'Please select a valid grade.',
  //-----Exam-slot
  DATE_REQUIRED: 'Date is required.',

  TIME_REQUIRED: 'Time is required.',
  TIME_MIN_LENGTH: 'Time is required.',
  TIME_MAX_LENGTH: 'Time cannot exceed 20 characters.',
  EXAM_SLOT_NOT_FOUND: 'Exam slot not found.',

  SLOT_FULL: 'No seats are available for this slot.',

  TOTAL_SEATS_REQUIRED: 'Total seats is required.',
  INVALID_TOTAL_SEATS: 'Total seats must be greater than 0.',
  EXAM_SLOT_REQUIRED: 'Exam slot is required.',
  EXAM_SLOT_ALREADY_BOOKED: 'Student has already booked an exam slot.',
} as const;
