import { Module, ValidationPipe } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { ClerkAuthGuard } from 'src/api/v1/modules/auth/guards/clerk-auth.guard';
import { TransformInterceptor } from 'src/api/v1/modules/core/interceptors/transform.interceptor';

@Module({
    providers: [
        {
            provide: APP_GUARD,
            useClass: ClerkAuthGuard,
        },
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: TransformInterceptor,
        },
        {
            provide: APP_PIPE,
            useClass: ValidationPipe,
        },
    ],
})
export class CoreModule {}
