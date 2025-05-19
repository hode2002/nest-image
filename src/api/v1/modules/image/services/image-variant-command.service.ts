import { Injectable, Inject, LoggerService } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { ImageVariant } from 'generated/prisma';
import { IMAGE_TOKENS } from '../constants/inject-token';
import { IImageVariantCommandService } from 'src/api/v1/modules/image/interfaces/image-variant-command.service.interface';
import { CreateVariant } from 'src/api/v1/modules/image/types/create.type';
import { IImageVariantCommandRepository } from 'src/api/v1/modules/image/interfaces/image-variant-command.repository.interface';

@Injectable()
export class ImageVariantCommandService implements IImageVariantCommandService {
    constructor(
        @Inject(WINSTON_MODULE_NEST_PROVIDER)
        private readonly logger: LoggerService,
        @Inject(IMAGE_TOKENS.REPOSITORIES.VARIANT_COMMAND)
        private readonly imageVariantCommandRepository: IImageVariantCommandRepository,
    ) {}

    async create(data: CreateVariant): Promise<ImageVariant> {
        this.logger.log(
            `Creating variant for image: ${data.imageId}`,
            ImageVariantCommandService.name,
        );
        return this.imageVariantCommandRepository.create(data);
    }
}
