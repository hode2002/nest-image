import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    UseGuards,
    Put,
    Inject,
    LoggerService,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { ClerkAuthGuard } from '../auth/guards/clerk-auth.guard';
import { IUserQueryService } from './interfaces/user-query.service.interface';
import { USER_TOKENS } from './constants/inject-token';
import { IUserCommandService } from 'src/api/v1/modules/user/interfaces/user-command.service.interface';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { User } from '@clerk/backend';
import { CurrentUser } from 'src/common/decorators/get-user.decorator';

@Controller('users')
@UseGuards(ClerkAuthGuard)
export class UserController {
    constructor(
        @Inject(WINSTON_MODULE_NEST_PROVIDER)
        private readonly logger: LoggerService,
        @Inject(USER_TOKENS.SERVICES.QUERY)
        private readonly userQueryService: IUserQueryService,
        @Inject(USER_TOKENS.SERVICES.COMMAND)
        private readonly userCommandService: IUserCommandService,
    ) {}

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        this.logger.log(`Creating user with email: ${createUserDto.email}`, UserController.name);
        return this.userCommandService.create(createUserDto);
    }

    @Get('me')
    async getProfile(@CurrentUser() user: User) {
        this.logger.log('Fetching current user', UserController.name);
        return user;
    }

    @Get()
    async findAll() {
        this.logger.log('Fetching all users', UserController.name);
        return this.userQueryService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        this.logger.log(`Finding user with id: ${id}`, UserController.name);
        return this.userQueryService.findById(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateUserDto: Partial<CreateUserDto>) {
        this.logger.log(`Updating user with ID: ${id}`, UserController.name);
        return this.userCommandService.update(id, updateUserDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        this.logger.log(`Deleting user with ID: ${id}`, UserController.name);
        return this.userCommandService.delete(id);
    }
}
