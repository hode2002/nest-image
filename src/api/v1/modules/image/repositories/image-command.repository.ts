import { Injectable } from '@nestjs/common';
import { IImageCommandRepository } from '../interfaces/image-command.repository.interface';
import { CreateImageDto } from '../dto/create-image.dto';
import { UpdateImageDto } from '../dto/update-image.dto';
import { Image } from 'generated/prisma';
import { PrismaService } from 'src/api/v1/modules/prisma/prisma.service';

@Injectable()
export class ImageCommandRepository implements IImageCommandRepository {
    constructor(private readonly prisma: PrismaService) {}

    async create(createImageDto: CreateImageDto): Promise<Image> {
        return this.prisma.image.create({
            data: createImageDto,
        });
    }

    async update(id: string, updateImageDto: UpdateImageDto): Promise<Image> {
        return this.prisma.image.update({
            where: { id },
            data: updateImageDto,
        });
    }

    async delete(id: string): Promise<Image> {
        return this.prisma.image.delete({
            where: { id },
        });
    }
}
