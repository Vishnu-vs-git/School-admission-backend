import { Inject, Injectable } from '@nestjs/common';
import { StudentMapper } from 'src/application/mappers/student.mapper';
import type { IStudentRepository } from 'src/domain/repositories/interfaces/student.repository';
import { ICreateStudentUseCase } from 'src/application/interfaces/use-cases/student/create-student.interface';
import { STUDENT_REPOSITORY } from 'src/common/di/injection-token';
import { CreateStudentDto } from 'src/application/dto/student/create-student.dto';
import { StudentResponseDto } from 'src/application/dto/student/student-response.dto';

@Injectable()
export class CreateStudentUseCase implements ICreateStudentUseCase {
  constructor(
    @Inject(STUDENT_REPOSITORY)
    private readonly studentRepository: IStudentRepository,
  ) {}

  async execute(parentId: string, dto: CreateStudentDto): Promise<StudentResponseDto> {
    const student = StudentMapper.toDomain(dto, parentId);

    const createdStudent = await this.studentRepository.create(student);

    return StudentMapper.toResponseDto(createdStudent);
  }
}
