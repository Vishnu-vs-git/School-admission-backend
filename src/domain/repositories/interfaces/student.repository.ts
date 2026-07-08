import { Student } from "src/domain/entities/student.entity";


export interface IStudentRepository {
  create(student: Student): Promise<Student>;

  update(student: Student): Promise<Student>;

  findById(id: string): Promise<Student | null>;

  findByParent(parentId: string): Promise<Student[]>;

  findAll(): Promise<Student[]>;
}