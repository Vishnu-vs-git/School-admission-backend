import { createStudentSchema } from './create-student.schema';

export const updateStudentSchema = createStudentSchema.partial();
