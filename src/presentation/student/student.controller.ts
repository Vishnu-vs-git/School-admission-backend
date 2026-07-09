import { Body, Controller, Get, Inject, Param, Post, Put, UseGuards } from '@nestjs/common';

import { StudentResponseDto } from 'src/application/dto/student/student-response.dto';

import type { ICreateStudentUseCase } from 'src/application/interfaces/use-cases/student/create-student.interface';

import {
  COMPLETE_REGISTRATION_FEE_USE_CASE,
  CREATE_STUDENT_USE_CASE,
  GET_STUDENT_USE_CASE,
  GET_STUDENTS_USE_CASE,
  UPDATE_STUDENT_USE_CASE,
} from 'src/common/di/injection-token';

import { Role } from 'src/domain/enums/role.enum';
import type { JwtPayload } from 'src/application/types/jwt-payload.type';
import { Roles } from '../auth/decorators/role.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import type { CreateStudentDto } from 'src/application/dto/student/create-student.dto';
import { ZodValidationPipe } from '../auth/pipes/zod-validation.pipe';
import { createStudentSchema } from './schemas/create-student.schema';
import type { UpdateStudentDto } from 'src/application/dto/student/update-student.dto';
import type { IUpdateStudentUseCase } from 'src/application/interfaces/use-cases/student/update-student.interface';
import { updateStudentSchema } from './schemas/update-student.schema';
import type { IGetStudentUseCase } from 'src/application/interfaces/use-cases/student/get-student.interface';
import type { IGetStudentsUseCase } from 'src/application/interfaces/use-cases/student/get-students.interface';
import type { ICompleteRegistrationFeeUseCase } from 'src/application/interfaces/use-cases/student/complete-registration-fee.interface';

@Controller('students')
@UseGuards(JwtAuthGuard, RolesGuard)
export class StudentController {
  constructor(
    @Inject(CREATE_STUDENT_USE_CASE)
    private readonly createStudentUseCase: ICreateStudentUseCase,
    @Inject(UPDATE_STUDENT_USE_CASE)
    private readonly updateStudentUseCase: IUpdateStudentUseCase,
    @Inject(GET_STUDENT_USE_CASE)
    private readonly getStudentUseCase: IGetStudentUseCase,
    @Inject(GET_STUDENTS_USE_CASE)
    private readonly getStudentsUseCase: IGetStudentsUseCase,
    @Inject(COMPLETE_REGISTRATION_FEE_USE_CASE)
    private readonly completeRegistrationFeeUseCase: ICompleteRegistrationFeeUseCase,
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
  @Put(':id')
  @Roles(Role.PARENT)
  async updateStudent(
    @Param('id') studentId: string,
    @CurrentUser() user: JwtPayload,
    @Body(new ZodValidationPipe(updateStudentSchema))
    dto: UpdateStudentDto,
  ): Promise<StudentResponseDto> {
    return this.updateStudentUseCase.execute(studentId, user.id, dto);
  }
  @Get(':id')
  @Roles(Role.PARENT)
  async getStudent(
    @Param('id') studentId: string,
    @CurrentUser() user: JwtPayload,
  ): Promise<StudentResponseDto> {
    return this.getStudentUseCase.execute(studentId, user.id);
  }
  @Get()
  @Roles(Role.PARENT)
  async getStudents(@CurrentUser() user: JwtPayload): Promise<StudentResponseDto[]> {
    return this.getStudentsUseCase.execute(user.id);
  }
  @Post(':id/pay')
  @Roles(Role.PARENT)
  async completeRegistrationFee(
    @Param('id') studentId: string,
    @CurrentUser() user: JwtPayload,
  ): Promise<StudentResponseDto> {
    return this.completeRegistrationFeeUseCase.execute(studentId, user.id);
  }
}
