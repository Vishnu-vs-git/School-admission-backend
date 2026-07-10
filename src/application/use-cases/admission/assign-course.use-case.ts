import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';

import { StudentResponseDto } from 'src/application/dto/student/student-response.dto';

import { IAssignCourseUseCase } from 'src/application/interfaces/use-cases/admission/assign-course.interface';
import { StudentMapper } from 'src/application/mappers/student.mapper';

import { STUDENT_REPOSITORY } from 'src/common/di/injection-token';
import { StudentMessages } from 'src/common/constants/student-messages';

import { ApplicationStatus } from 'src/domain/enums/application-status.enum';
import type { IStudentRepository } from 'src/domain/repositories/interfaces/student.repository';
import { IAssignCourseDto } from 'src/application/dto/admission/assign-course.dto';

@Injectable()
export class AssignCourseUseCase implements IAssignCourseUseCase {
  constructor(
    @Inject(STUDENT_REPOSITORY)
    private readonly studentRepository: IStudentRepository,
  ) {}

  async execute(studentId: string, dto: IAssignCourseDto): Promise<StudentResponseDto> {
    const student = await this.studentRepository.findById(studentId);

    if (!student) {
      throw new NotFoundException(StudentMessages.NOT_FOUND);
    }

    if (student.status !== ApplicationStatus.EXAM_COMPLETED) {
      throw new BadRequestException(StudentMessages.INVALID_STATUS_TRANSITION);
    }

    student.assignCourse(dto.assignedCourse);

    const updatedStudent = await this.studentRepository.update(student);

    if (!updatedStudent) {
      throw new NotFoundException(StudentMessages.NOT_FOUND);
    }

    return StudentMapper.toResponseDto(updatedStudent);
  }
}
