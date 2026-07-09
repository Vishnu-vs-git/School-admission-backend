import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { STUDENT_REPOSITORY } from 'src/common/di/injection-token';
import { StudentMessages } from 'src/common/constants/student-messages';

import { StudentMapper } from 'src/application/mappers/student.mapper';
import { StudentResponseDto } from 'src/application/dto/student/student-response.dto';
import { UpdateStudentDto } from 'src/application/dto/student/update-student.dto';
import { IUpdateStudentUseCase } from 'src/application/interfaces/use-cases/student/update-student.interface';

import { ApplicationStatus } from 'src/domain/enums/application-status.enum';
import type { IStudentRepository } from 'src/domain/repositories/interfaces/student.repository';

@Injectable()
export class UpdateStudentUseCase implements IUpdateStudentUseCase {
  constructor(
    @Inject(STUDENT_REPOSITORY)
    private readonly studentRepository: IStudentRepository,
  ) {}

  async execute(
    studentId: string,
    parentId: string,
    dto: UpdateStudentDto,
  ): Promise<StudentResponseDto> {
    const student = await this.studentRepository.findById(studentId);

    if (!student) {
      throw new NotFoundException(StudentMessages.NOT_FOUND);
    }

    if (student.parentId !== parentId) {
      throw new ForbiddenException(StudentMessages.ACCESS_DENIED);
    }

    if (student.status !== ApplicationStatus.APPLICATION_CREATED) {
      throw new BadRequestException(StudentMessages.UPDATE_NOT_ALLOWED);
    }

    student.updateDetails(dto);

    const updatedStudent = await this.studentRepository.update(student);

    if (!updatedStudent) {
      throw new NotFoundException(StudentMessages.NOT_FOUND);
    }

    return StudentMapper.toResponseDto(updatedStudent);
  }
}
