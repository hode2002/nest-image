import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserQueryService } from './services/user-query.service';
import { UserCommandService } from './services/user-command.service';
import { UserCommandRepository } from './repositories/user-command.repository';
import { UserQueryRepository } from './repositories/user-query.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { USER_TOKENS } from './constants/inject-token';

@Module({
    imports: [PrismaModule],
    controllers: [UserController],
    providers: [
        {
            provide: USER_TOKENS.SERVICES.QUERY,
            useClass: UserQueryService,
        },
        {
            provide: USER_TOKENS.SERVICES.COMMAND,
            useClass: UserCommandService,
        },
        {
            provide: USER_TOKENS.REPOSITORIES.COMMAND,
            useClass: UserCommandRepository,
        },
        {
            provide: USER_TOKENS.REPOSITORIES.QUERY,
            useClass: UserQueryRepository,
        },
    ],
    exports: [USER_TOKENS.SERVICES.QUERY, USER_TOKENS.SERVICES.COMMAND],
})
export class UserModule {}
