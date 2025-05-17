import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ClerkClientProvider } from 'src/common/providers/clerk-client.provider';
import { ConfigModule } from '@nestjs/config';
import { ClerkStrategy } from 'src/api/v1/modules/auth/strategies/clerk.strategy';
import { AuthController } from 'src/api/v1/modules/auth/auth.controller';
import { AuthService } from 'src/api/v1/modules/auth/auth.service';
import { UserModule } from 'src/api/v1/modules/user/user.module';

@Module({
    imports: [PassportModule, ConfigModule, UserModule],
    controllers: [AuthController],
    providers: [AuthService, ClerkStrategy, ClerkClientProvider],
    exports: [PassportModule],
})
export class AuthModule {}
