import { Injectable } from '@nestjs/common';
import { ImageVariant } from 'generated/prisma';
import { CreateVariant } from 'src/api/v1/modules/image/types/create.type';
import { IImageVariantCommandRepository } from 'src/api/v1/modules/image/interfaces/image-variant-command.repository.interface';
import { PrismaService } from 'src/api/v1/modules/prisma/prisma.service';

@Injectable()
export class ImageVariantCommandRepository implements IImageVariantCommandRepository {
    constructor(private readonly prisma: PrismaService) {}

    async create(data: CreateVariant): Promise<ImageVariant> {
        return this.prisma.imageVariant.create({
            data,
        });
    }
}
