import { Image } from 'generated/prisma';
import { CreateImageDto } from '../dto/create-image.dto';
import { UpdateImageDto } from '../dto/update-image.dto';

export interface IImageCommandRepository {
    create(createImageDto: CreateImageDto): Promise<Image>;
    update(id: string, updateImageDto: UpdateImageDto): Promise<Image>;
    delete(id: string): Promise<Image>;
}
