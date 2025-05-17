import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { IUserCommandRepository } from '../interfaces/user-command.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from 'generated/prisma';

@Injectable()
export class UserCommandRepository implements IUserCommandRepository {
    private readonly logger = new Logger(UserCommandRepository.name);

    constructor(private readonly prisma: PrismaService) {}

    async create(data: CreateUserDto): Promise<User> {
        try {
            return await this.prisma.user.create({
                data,
            });
        } catch (error) {
            this.logger.error('Error creating user:', error);
            throw error;
        }
    }

    async update(id: string, data: Partial<CreateUserDto>): Promise<User> {
        try {
            return await this.prisma.user.update({
                where: { clerkId: id },
                data,
            });
        } catch (error) {
            this.logger.error('Error updating user:', error);
            throw error;
        }
    }

    async delete(id: string): Promise<void> {
        try {
            await this.prisma.user.delete({
                where: { clerkId: id },
            });
        } catch (error) {
            this.logger.error('Error deleting user:', error);
            throw error;
        }
    }
}
