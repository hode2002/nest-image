import { ImageVariant } from 'generated/prisma';
import { ImageVariantWhereInput } from 'src/api/v1/modules/image/types/query.type';

export interface IImageVariantQueryService {
    findFirst(where: ImageVariantWhereInput): Promise<ImageVariant | null>;
}
