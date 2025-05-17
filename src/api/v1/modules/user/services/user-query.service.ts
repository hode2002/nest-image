import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { IUserQueryRepository } from '../interfaces/user-query.repository';
import { User } from 'generated/prisma';
import { USER_TOKENS } from 'src/api/v1/modules/user/constants/inject-token';
import { IUserQueryService } from 'src/api/v1/modules/user/interfaces/user-query.service.interface';

@Injectable()
export class UserQueryService implements IUserQueryService {
    private readonly logger = new Logger(UserQueryService.name);

    constructor(
        @Inject(USER_TOKENS.REPOSITORIES.QUERY)
        private readonly userQueryRepository: IUserQueryRepository,
    ) {}

    async findById(id: string, passThrough: false): Promise<User | null> {
        try {
            const user = await this.userQueryRepository.findById(id);
            if (!passThrough && !user) {
                throw new NotFoundException(`User with ID ${id} not found`);
            }
            return user;
        } catch (error) {
            this.logger.error('Error fetching user:', error);
            throw error;
        }
    }

    async findByEmail(email: string, passThrough: false): Promise<User | null> {
        try {
            const user = await this.userQueryRepository.findByEmail(email);
            if (!passThrough && !user) {
                throw new NotFoundException(`User with email ${email} not found`);
            }
            return user;
        } catch (error) {
            this.logger.error('Error fetching user:', error);
            throw error;
        }
    }

    async findAll(): Promise<User[]> {
        try {
            return await this.userQueryRepository.findAll();
        } catch (error) {
            this.logger.error('Error fetching all users:', error);
            throw error;
        }
    }
}
