import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';

import { StudentResponseDto } from 'src/application/dto/student/student-response.dto';

import type { ICreateStudentUseCase } from 'src/application/interfaces/use-cases/student/create-student.interface';

import { CREATE_STUDENT_USE_CASE } from 'src/common/di/injection-token';

import { Role } from 'src/domain/enums/role.enum';
import type { JwtPayload } from 'src/application/types/jwt-payload.type';
import { Roles } from '../auth/decorators/role.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import type { CreateStudentDto } from 'src/application/dto/student/create-student.dto';
import { ZodValidationPipe } from '../auth/pipes/zod-validation.pipe';
import { createStudentSchema } from './schemas/create-student.schema';

@Controller('students')
@UseGuards(JwtAuthGuard, RolesGuard)
export class StudentController {
  constructor(
    @Inject(CREATE_STUDENT_USE_CASE)
    private readonly createStudentUseCase: ICreateStudentUseCase,
  ) {}

  @Post()
  @Roles(Role.PARENT)
  async createStudent(
    @CurrentUser() user: JwtPayload,
    @Body(new ZodValidationPipe(createStudentSchema))
    dto: CreateStudentDto,
  ): Promise<StudentResponseDto> {
    return this.createStudentUseCase.execute(user.id, dto);
  }
}
