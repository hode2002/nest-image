import {
    Controller,
    Post,
    UseGuards,
    Logger,
    Req,
    Get,
    Body,
    Inject,
    LoggerService,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ClerkAuthGuard } from './guards/clerk-auth.guard';
import { CurrentUser } from 'src/common/decorators/get-user.decorator';
import { User } from '@clerk/backend';
import { Public } from 'src/common/decorators/public.decorator';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Controller('auth')
@UseGuards(ClerkAuthGuard)
export class AuthController {
    constructor(
        @Inject(WINSTON_MODULE_NEST_PROVIDER)
        private readonly logger: LoggerService,
        private readonly authService: AuthService,
    ) {}

    @Public()
    @Get()
    async app() {
        return 'Hello World';
    }

    @Post('login')
    async login(@CurrentUser() user: User) {
        this.logger.log(`Login attempt for user: ${user.id}`);
        return this.authService.login(user);
    }
}
