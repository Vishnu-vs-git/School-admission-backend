import { Body, Controller, Get, Inject, Param, Patch, UseGuards } from '@nestjs/common';
import { Roles } from '../auth/decorators/role.decorator';
import { ASSIGN_COURSE_USE_CASE, STUDENT_REPOSITORY, UPDATE_EXAM_SCORE_USE_CASE } from 'src/common/di/injection-token';
import type { IUpdateExamScoreUseCase } from 'src/application/interfaces/use-cases/admission/update-exam-score.interface';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Role } from 'src/domain/enums/role.enum';
import { updateExamScoreSchema } from './schemas/update-exam-score.schema';
import { ZodValidationPipe } from '../auth/pipes/zod-validation.pipe';
import type { IUpdateExamScoreDto } from 'src/application/dto/admission/update-exam-score.dto';
import { StudentResponseDto } from 'src/application/dto/student/student-response.dto';
import type { IAssignCourseDto } from 'src/application/dto/admission/assign-course.dto';
import { assignCourseSchema } from './schemas/assign-course.schema';
import type { IAssignCourseUseCase } from 'src/application/interfaces/use-cases/admission/assign-course.interface';
import type { IStudentRepository } from 'src/domain/repositories/interfaces/student.repository';
import { StudentMapper } from 'src/application/mappers/student.mapper';

@Controller('admission')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMISSION)
export class AdmissionController {
  constructor(
    @Inject(UPDATE_EXAM_SCORE_USE_CASE)
    private readonly updateExamScoreUseCase: IUpdateExamScoreUseCase,

    @Inject(ASSIGN_COURSE_USE_CASE)
    private readonly assignCourseUseCase: IAssignCourseUseCase,

    @Inject(STUDENT_REPOSITORY)
    private readonly studentRepository: IStudentRepository,
  ) {}

  @Get('students')
  async getStudents(): Promise<StudentResponseDto[]> {
    const students = await this.studentRepository.findAll();
    return StudentMapper.toResponseDtoList(students);
  }

  @Patch('students/:id/score')
  async updateExamScore(
    @Param('id') studentId: string,
    @Body(new ZodValidationPipe(updateExamScoreSchema))
    dto: IUpdateExamScoreDto,
  ): Promise<StudentResponseDto> {
    return this.updateExamScoreUseCase.execute(studentId, dto);
  }

  @Patch('students/:id/course')
  async assignCourse(
    @Param('id') studentId: string,
    @Body(new ZodValidationPipe(assignCourseSchema))
    dto: IAssignCourseDto,
  ): Promise<StudentResponseDto> {
    return this.assignCourseUseCase.execute(studentId, dto);
  }
}

