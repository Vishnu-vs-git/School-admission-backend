import { Student } from 'src/domain/entities/student.entity';
import { StudentDocument } from './student.schema';

export class StudentFactory {
  static toDomain(document: StudentDocument): Student {
    return new Student({
      id: document._id.toString(),
      parentId: document.parentId.toString(),
      studentName: document.studentName,
      dateOfBirth: document.dateOfBirth,
      gender: document.gender,
      previousSchool: document.previousSchool,
      applyingGrade: document.applyingGrade,
      status: document.status,
      examSlotId: document.examSlotId?.toString(),
      examScore: document.examScore,
      assignedCourse: document.assignedCourse,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    });
  }

  static toDomainList(documents: StudentDocument[]): Student[] {
    return documents.map((document) => this.toDomain(document));
  }
}
