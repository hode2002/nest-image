import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { IImageQueryRepository } from '../interfaces/image-query.repository.interface';
import { Image } from 'generated/prisma';
import { ImageWhereInput } from 'src/api/v1/modules/image/types/query.type';
import { User } from '@clerk/backend';

@Injectable()
export class ImageQueryRepository implements IImageQueryRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findFirst(where: ImageWhereInput): Promise<Image | null> {
        return this.prisma.image.findFirst({
            where,
        });
    }

    async findById(id: string): Promise<Image | null> {
        return this.prisma.image.findUnique({
            where: { id },
        });
    }

    async findByUserId(userId: string): Promise<Image[]> {
        return this.prisma.image.findMany({
            where: { userId },
        });
    }

    async findAll(): Promise<Image[]> {
        return this.prisma.image.findMany();
    }

    async findUserImages(user: User): Promise<Image[]> {
        return this.prisma.image.findMany({
            where: {
                userId: user.id,
            },
        });
    }
}
