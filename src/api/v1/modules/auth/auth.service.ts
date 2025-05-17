import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { User } from '@clerk/backend';
import { IUserQueryService } from 'src/api/v1/modules/user/interfaces/user-query.service.interface';
import { USER_TOKENS } from 'src/api/v1/modules/user/constants/inject-token';
import { IUserCommandService } from 'src/api/v1/modules/user/interfaces/user-command.service.interface';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class AuthService {
    constructor(
        @Inject(WINSTON_MODULE_NEST_PROVIDER)
        private readonly logger: LoggerService,
        @Inject(USER_TOKENS.SERVICES.QUERY)
        private readonly userQueryService: IUserQueryService,
        @Inject(USER_TOKENS.SERVICES.COMMAND)
        private readonly userCommandService: IUserCommandService,
    ) {}

    async login(user: User) {
        this.logger.log(`Processing login for user: ${user.id}`, AuthService.name);
        const existingUser = await this.userQueryService.findById(user.id, true);

        if (!existingUser) {
            this.logger.log(`Creating new user: ${user.id}`, AuthService.name);
            const createUserDto: CreateUserDto = {
                email: user.emailAddresses[0].emailAddress,
                clerkId: user.id,
            };
            return this.userCommandService.create(createUserDto);
        }

        this.logger.log(`User already exists: ${user.id}`, AuthService.name);
        return existingUser;
    }
}
