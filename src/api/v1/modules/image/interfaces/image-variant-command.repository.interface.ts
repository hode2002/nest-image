import { ImageVariant } from 'generated/prisma';
import { CreateVariant } from 'src/api/v1/modules/image/types/create.type';

export interface IImageVariantCommandRepository {
    create(data: CreateVariant): Promise<ImageVariant>;
}
