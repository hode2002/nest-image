import { User } from '@clerk/backend';
import { Image } from 'generated/prisma';
import { ImageWhereInput } from 'src/api/v1/modules/image/types/query.type';

export interface IImageQueryService {
    getOriginalImage(imageId: string): Promise<{ url: string; buffer: Buffer }>;
    findFirst(where: ImageWhereInput): Promise<Image | null>;
    findById(id: string): Promise<Image | null>;
    findByUserId(userId: string): Promise<Image[]>;
    findAll(): Promise<Image[]>;
    findUserImages(user: User): Promise<Image[]>;
}
