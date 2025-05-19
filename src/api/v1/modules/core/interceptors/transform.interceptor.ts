import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Reflector } from '@nestjs/core';
import { RESPONSE_MESSAGE_KEY } from 'src/common/decorators/response-message.decorator';

export interface Response<T> {
    status: string;
    statusCode: number;
    message: string;
    data: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
    constructor(private readonly reflector: Reflector) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
        const ctx = context.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        const customMessage = this.reflector.get<string>(
            RESPONSE_MESSAGE_KEY,
            context.getHandler(),
        );

        return next.handle().pipe(
            map(data => ({
                status: 'success',
                statusCode: response.statusCode,
                message: customMessage || this.getMessage(request.method),
                data,
            })),
        );
    }

    private getMessage(method: string): string {
        const messages = {
            GET: 'Data retrieved successfully',
            POST: 'Data created successfully',
            PATCH: 'Data updated successfully',
            PUT: 'Data updated successfully',
            DELETE: 'Data deleted successfully',
        };
        return messages[method] || 'Operation completed successfully';
    }
}
