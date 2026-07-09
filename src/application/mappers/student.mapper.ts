import { Student } from 'src/domain/entities/student.entity';

import { ApplicationStatus } from 'src/domain/enums/application-status.enum';
import { StudentResponseDto } from '../dto/student/student-response.dto';
import { CreateStudentDto } from '../dto/student/create-student.dto';

export class StudentMapper {
  static toDomain(dto: CreateStudentDto, parentId: string): Student {
    return new Student({
      parentId,
      studentName: dto.studentName,
      dateOfBirth: dto.dateOfBirth,
      gender: dto.gender,
      previousSchool: dto.previousSchool,
      applyingGrade: dto.applyingGrade,
      status: ApplicationStatus.APPLICATION_CREATED,
    });
  }

  static toResponseDto(student: Student): StudentResponseDto {
    return {
      id: student.id!,
      studentName: student.studentName,
      dateOfBirth: student.dateOfBirth,
      gender: student.gender,
      previousSchool: student.previousSchool,
      applyingGrade: student.applyingGrade,
      status: student.status,
      examScore: student.examScore,
      assignedCourse: student.assignedCourse,
      createdAt: student.createdAt,
      updatedAt: student.updatedAt,
    };
  }

  static toResponseDtoList(students: Student[]): StudentResponseDto[] {
    return students.map((student) => this.toResponseDto(student));
  }
}
