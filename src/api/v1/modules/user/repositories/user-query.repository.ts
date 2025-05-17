import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { IUserQueryRepository } from '../interfaces/user-query.repository';
import { User } from 'generated/prisma';

@Injectable()
export class UserQueryRepository implements IUserQueryRepository {
    private readonly logger = new Logger(UserQueryRepository.name);

    constructor(private readonly prisma: PrismaService) {}

    async findById(id: string): Promise<User | null> {
        try {
            return await this.prisma.user.findUnique({
                where: { clerkId: id },
            });
        } catch (error) {
            this.logger.error('Error finding user by ID:', error);
            throw error;
        }
    }

    async findByEmail(email: string): Promise<User | null> {
        try {
            return await this.prisma.user.findUnique({
                where: { email },
            });
        } catch (error) {
            this.logger.error('Error finding user by email:', error);
            throw error;
        }
    }

    async findAll(): Promise<User[]> {
        try {
            return await this.prisma.user.findMany();
        } catch (error) {
            this.logger.error('Error finding all users:', error);
            throw error;
        }
    }
}
