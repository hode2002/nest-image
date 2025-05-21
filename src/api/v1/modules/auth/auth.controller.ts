import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CurrentUser } from 'src/common/decorators/get-user.decorator';
import { User } from '@clerk/backend';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@CurrentUser() user: User) {
        return this.authService.login(user);
    }
}
