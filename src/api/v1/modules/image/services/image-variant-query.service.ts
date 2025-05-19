import { Injectable, Inject, LoggerService } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { ImageVariant } from 'generated/prisma';
import { IMAGE_TOKENS } from '../constants/inject-token';
import { IImageVariantQueryService } from 'src/api/v1/modules/image/interfaces/image-variant-query.service.interface';
import { ImageVariantWhereInput } from 'src/api/v1/modules/image/types/query.type';
import { IImageVariantQueryRepository } from 'src/api/v1/modules/image/interfaces/image-variant-query.repository.interface';

@Injectable()
export class ImageVariantQueryService implements IImageVariantQueryService {
    constructor(
        @Inject(WINSTON_MODULE_NEST_PROVIDER)
        private readonly logger: LoggerService,
        @Inject(IMAGE_TOKENS.REPOSITORIES.VARIANT_QUERY)
        private readonly imageVariantQueryRepository: IImageVariantQueryRepository,
    ) {}

    async findFirst(where: ImageVariantWhereInput): Promise<ImageVariant | null> {
        this.logger.log(
            `Finding variant with options: ${JSON.stringify(where)}`,
            ImageVariantQueryService.name,
        );
        return this.imageVariantQueryRepository.findFirst(where);
    }
}
