import { Injectable } from '@nestjs/common';
import { ImageVariant } from 'generated/prisma';
import { IImageVariantQueryRepository } from 'src/api/v1/modules/image/interfaces/image-variant-query.repository.interface';
import { ImageVariantWhereInput } from 'src/api/v1/modules/image/types/query.type';
import { PrismaService } from 'src/api/v1/modules/prisma/prisma.service';

@Injectable()
export class ImageVariantQueryRepository implements IImageVariantQueryRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findFirst(where: ImageVariantWhereInput): Promise<ImageVariant | null> {
        return this.prisma.imageVariant.findFirst({
            where,
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    async findAll(where?: ImageVariantWhereInput): Promise<ImageVariant[]> {
        return this.prisma.imageVariant.findMany({
            where,
        });
    }
}
