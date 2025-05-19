import { Image } from 'generated/prisma';
import { ImageWhereInput } from 'src/api/v1/modules/image/types/query.type';

export interface IImageQueryRepository {
    findFirst(where: ImageWhereInput): Promise<Image | null>;
    findById(id: string): Promise<Image | null>;
    findByUserId(userId: string): Promise<Image[]>;
    findAll(): Promise<Image[]>;
}
