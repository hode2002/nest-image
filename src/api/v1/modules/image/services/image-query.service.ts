import { Injectable, Inject, LoggerService, NotFoundException } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Image } from 'generated/prisma';
import axios from 'axios';
import { IImageQueryService } from '../interfaces/image-query.service.interface';
import { IMAGE_TOKENS } from '../constants/inject-token';
import { IImageQueryRepository } from '../interfaces/image-query.repository.interface';
import { ImageWhereInput } from 'src/api/v1/modules/image/types/query.type';
import { User } from '@clerk/backend';

@Injectable()
export class ImageQueryService implements IImageQueryService {
    constructor(
        @Inject(WINSTON_MODULE_NEST_PROVIDER)
        private readonly logger: LoggerService,
        @Inject(IMAGE_TOKENS.REPOSITORIES.QUERY)
        private readonly imageRepository: IImageQueryRepository,
        @Inject(IMAGE_TOKENS.REPOSITORIES.QUERY)
        private readonly imageQueryRepository: IImageQueryRepository,
    ) {}

    async findFirst(where: ImageWhereInput): Promise<Image | null> {
        this.logger.log(`Finding image by ${JSON.stringify(where)}`, ImageQueryService.name);
        const image = await this.imageRepository.findFirst(where);
        if (!image) {
            throw new NotFoundException(`Image with ${JSON.stringify(where)} not found`);
        }
        return image;
    }

    async getOriginalImage(imageId: string): Promise<{ url: string; buffer: Buffer }> {
        const image = await this.imageQueryRepository.findById(imageId);
        if (!image) {
            throw new NotFoundException('Image not found');
        }

        const response = await axios.get(image.originalUrl, {
            responseType: 'arraybuffer',
        });

        return {
            url: image.originalUrl,
            buffer: Buffer.from(response.data),
        };
    }

    async findById(id: string): Promise<any> {
        this.logger.log(`Finding image by id: ${id}`, ImageQueryService.name);

        const image = await this.imageRepository.findById(id);
        if (!image) {
            throw new NotFoundException(`Image with ID ${id} not found`);
        }
        return image;
    }

    async findByUserId(userId: string): Promise<Image[]> {
        this.logger.log(`Finding images for user: ${userId}`, ImageQueryService.name);
        return this.imageRepository.findByUserId(userId);
    }

    async findAll(): Promise<any[]> {
        this.logger.log('Finding all images', ImageQueryService.name);
        return this.imageRepository.findAll();
    }

    async findUserImages(user: User): Promise<Image[]> {
        this.logger.log('Finding all images', ImageQueryService.name);
        return this.imageRepository.findUserImages(user);
    }
}
