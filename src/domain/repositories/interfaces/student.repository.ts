import { Student } from 'src/domain/entities/student.entity';

export interface IStudentRepository {
  create(student: Student): Promise<Student>;

  update(student: Student): Promise<Student | null>;

  findById(id: string): Promise<Student | null>;

  findByParentId(parentId: string): Promise<Student[]>;

  findAll(): Promise<Student[]>;
}
