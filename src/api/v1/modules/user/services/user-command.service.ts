import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { IUserCommandRepository } from '../interfaces/user-command.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from 'generated/prisma';
import { USER_TOKENS } from 'src/api/v1/modules/user/constants/inject-token';
import { IUserCommandService } from 'src/api/v1/modules/user/interfaces/user-command.service.interface';

@Injectable()
export class UserCommandService implements IUserCommandService {
    private readonly logger = new Logger(UserCommandService.name);

    constructor(
        @Inject(USER_TOKENS.REPOSITORIES.COMMAND)
        private readonly userCommandRepository: IUserCommandRepository,
    ) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        try {
            return await this.userCommandRepository.create(createUserDto);
        } catch (error) {
            this.logger.error('Error creating user:', error);
            throw error;
        }
    }

    async update(id: string, updateData: Partial<CreateUserDto>): Promise<User> {
        try {
            const user = await this.userCommandRepository.update(id, updateData);
            if (!user) {
                throw new NotFoundException(`User with ID ${id} not found`);
            }
            return user;
        } catch (error) {
            this.logger.error('Error updating user:', error);
            throw error;
        }
    }

    async delete(id: string): Promise<boolean> {
        try {
            await this.userCommandRepository.delete(id);
            return true;
        } catch (error) {
            this.logger.error('Error deleting user:', error);
            throw error;
        }
    }
}
