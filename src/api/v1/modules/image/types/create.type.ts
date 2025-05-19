import { CreateImageVariantDto } from 'src/api/v1/modules/image/dto/create-image-variant.dto';

export type CreateVariant = CreateImageVariantDto & { options: string };
