import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { ClerkAuthGuard } from 'src/api/v1/modules/auth/guards/clerk-auth.guard';

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
    ],
})
export class CoreModule {}
