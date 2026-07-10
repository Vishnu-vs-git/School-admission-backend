import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { ErrorMessages } from '../constants/error-messages';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const context = host.switchToHttp();

    const request = context.getRequest<Request>();
    const response = context.getResponse<Response>();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

    let error: string | string[] | Record<string, unknown> = ErrorMessages.INTERNAL_SERVER_ERROR;

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();

      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        error = exceptionResponse;
      } else {
        const responseBody = exceptionResponse as {
          message?: string | string[] | Record<string, unknown>;
        };

        error = responseBody.message ?? 'Internal Server Error';
      }
    }

    response.status(statusCode).json({
      success: false,
      statusCode,
      error,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
    });
  }
}
