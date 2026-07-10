import { Inject, Injectable } from '@nestjs/common';

import { StudentResponseDto } from 'src/application/dto/student/student-response.dto';
import { IGetStudentsUseCase } from 'src/application/interfaces/use-cases/student/get-students.interface';
import { StudentMapper } from 'src/application/mappers/student.mapper';

import { STUDENT_REPOSITORY } from 'src/common/di/injection-token';

import type { IStudentRepository } from 'src/domain/repositories/interfaces/student.repository';

@Injectable()
export class GetStudentsUseCase implements IGetStudentsUseCase {
  constructor(
    @Inject(STUDENT_REPOSITORY)
    private readonly studentRepository: IStudentRepository,
  ) {}

  async execute(parentId: string): Promise<StudentResponseDto[]> {
    const students = await this.studentRepository.findByParentId(parentId);

    return students.map((student) => StudentMapper.toResponseDto(student));
  }
}
