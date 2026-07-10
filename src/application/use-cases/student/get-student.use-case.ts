import { ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';

import { StudentResponseDto } from 'src/application/dto/student/student-response.dto';
import { IGetStudentUseCase } from 'src/application/interfaces/use-cases/student/get-student.interface';
import { StudentMapper } from 'src/application/mappers/student.mapper';

import { StudentMessages } from 'src/common/constants/student-messages';
import { STUDENT_REPOSITORY } from 'src/common/di/injection-token';

import type { IStudentRepository } from 'src/domain/repositories/interfaces/student.repository';

@Injectable()
export class GetStudentUseCase implements IGetStudentUseCase {
  constructor(
    @Inject(STUDENT_REPOSITORY)
    private readonly studentRepository: IStudentRepository,
  ) {}

  async execute(studentId: string, parentId: string): Promise<StudentResponseDto> {
    const student = await this.studentRepository.findById(studentId);

    if (!student) {
      throw new NotFoundException(StudentMessages.NOT_FOUND);
    }

    if (student.parentId !== parentId) {
      throw new ForbiddenException(StudentMessages.ACCESS_DENIED);
    }

    return StudentMapper.toResponseDto(student);
  }
}
