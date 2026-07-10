import { Body, Controller, Get, Inject, Param, Post, UseGuards, NotFoundException } from '@nestjs/common';

import { Role } from 'src/domain/enums/role.enum';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

import type { ICreateExamSlotDto } from 'src/application/dto/exam-slot/create-exam-slot.dto';
import type { IExamSlotResponseDto } from 'src/application/dto/exam-slot/exam-slot-response.dto';

import {
  BOOK_EXAM_SLOT_USE_CASE,
  CREATE_EXAM_SLOT_USE_CASE,
  EXAM_SLOT_REPOSITORY,
  GET_AVAILABLE_EXAM_SLOTS_USE_CASE,
} from 'src/common/di/injection-token';
import type { ICreateExamSlotUseCase } from 'src/application/interfaces/use-cases/exam-slot/create-exam-slot.interface';
import { ZodValidationPipe } from '../auth/pipes/zod-validation.pipe';
import { Roles } from '../auth/decorators/role.decorator';
import { examSlotSchema } from './schemas/exam-slot.schema';
import type { IGetAvailableExamSlotsUseCase } from 'src/application/interfaces/use-cases/exam-slot/get-available-exam-slots.interface';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { JwtPayload } from 'src/application/types/jwt-payload.type';
import { bookExamSlotSchema } from './schemas/bookExamSlotSchema';
import { BookExamSlotDto } from 'src/application/dto/exam-slot/book-exam-slot.dto';
import { StudentResponseDto } from 'src/application/dto/student/student-response.dto';
import type { IBookExamSlotUseCase } from 'src/application/interfaces/use-cases/exam-slot/book-exam-slot.interface';
import type { IExamSlotRepository } from 'src/domain/repositories/interfaces/exam-slot.repository';
import { ExamSlotMapper } from 'src/application/mappers/exam-slot.mapper';

@Controller('exam-slots')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ExamSlotController {
  constructor(
    @Inject(CREATE_EXAM_SLOT_USE_CASE)
    private readonly createExamSlotUseCase: ICreateExamSlotUseCase,
    @Inject(GET_AVAILABLE_EXAM_SLOTS_USE_CASE)
    private readonly getAvailableExamSlotsUseCase: IGetAvailableExamSlotsUseCase,
    @Inject(BOOK_EXAM_SLOT_USE_CASE)
    private readonly bookExamSlotUseCase: IBookExamSlotUseCase,
    @Inject(EXAM_SLOT_REPOSITORY)
    private readonly examSlotRepository: IExamSlotRepository,
  ) {}

  @Post()
  @Roles(Role.ADMISSION)
  async createExamSlot(
    @Body(new ZodValidationPipe(examSlotSchema))
    dto: ICreateExamSlotDto,
  ): Promise<IExamSlotResponseDto> {
    return this.createExamSlotUseCase.execute(dto);
  }

  @Get()
  @Roles(Role.PARENT, Role.ADMISSION)
  async getAvailableSlots(@CurrentUser() user: JwtPayload): Promise<IExamSlotResponseDto[]> {
    if (user.role === Role.ADMISSION) {
      const slots = await this.examSlotRepository.findAll();
      return ExamSlotMapper.toResponseDtoList(slots);
    }
    return this.getAvailableExamSlotsUseCase.execute();
  }

  @Get(':id')
  @Roles(Role.PARENT, Role.ADMISSION)
  async getSlotById(@Param('id') id: string): Promise<IExamSlotResponseDto> {
    const slot = await this.examSlotRepository.findById(id);
    if (!slot) {
      throw new NotFoundException('Exam slot not found');
    }
    return ExamSlotMapper.toResponseDto(slot);
  }

  @Post(':studentId/book')
  @Roles(Role.PARENT)
  async bookExamSlot(
    @Param('studentId') studentId: string,
    @CurrentUser() user: JwtPayload,
    @Body(new ZodValidationPipe(bookExamSlotSchema))
    dto: BookExamSlotDto,
  ): Promise<StudentResponseDto> {
    return this.bookExamSlotUseCase.execute(studentId, user.id, dto);
  }
}

