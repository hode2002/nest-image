import sharp from 'sharp';
import { TransformQuery } from 'src/api/v1/modules/image/dto/transform-query.dto';

export interface IImageTransformService {
    transformImage(id: string, query: TransformQuery): Promise<any>;
    getImageMetadata(imageBuffer: Buffer): Promise<sharp.Metadata>;
}
