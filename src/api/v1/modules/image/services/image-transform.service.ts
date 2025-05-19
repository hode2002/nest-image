import { Injectable, LoggerService } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Inject } from '@nestjs/common';
import sharp from 'sharp';
import { IImageTransformService } from 'src/api/v1/modules/image/interfaces/image-transform.service.interface';
import { ICloudinaryService } from 'src/api/v1/modules/cloudinary/interfaces/cloudinary.service.interface';
import { CLOUDINARY_TOKENS } from 'src/api/v1/modules/cloudinary/constants/inject-token';
import { IMAGE_TOKENS } from 'src/api/v1/modules/image/constants/inject-token';
import { TransformQuery } from 'src/api/v1/modules/image/dto/transform-query.dto';
import { IImageQueryService } from 'src/api/v1/modules/image/interfaces/image-query.service.interface';
import { IImageVariantCommandService } from 'src/api/v1/modules/image/interfaces/image-variant-command.service.interface';
import { CreateVariant } from 'src/api/v1/modules/image/types/create.type';
import { IImageVariantQueryService } from 'src/api/v1/modules/image/interfaces/image-variant-query.service.interface';

@Injectable()
export class ImageTransformService implements IImageTransformService {
    constructor(
        @Inject(WINSTON_MODULE_NEST_PROVIDER)
        private readonly logger: LoggerService,
        @Inject(IMAGE_TOKENS.SERVICES.VARIANT_COMMAND)
        private readonly imageVariantCommandService: IImageVariantCommandService,
        @Inject(CLOUDINARY_TOKENS.PROVIDER)
        private readonly uploadService: ICloudinaryService,
        @Inject(IMAGE_TOKENS.SERVICES.QUERY)
        private readonly imageQueryService: IImageQueryService,
        @Inject(IMAGE_TOKENS.SERVICES.VARIANT_QUERY)
        private readonly imageVariantQueryService: IImageVariantQueryService,
    ) {}

    async transformImage(id: string, query: TransformQuery): Promise<any> {
        const optionJson = JSON.stringify({ id, ...query });
        const existingVariant = await this.imageVariantQueryService.findFirst({
            options: optionJson,
        });

        if (existingVariant) {
            return existingVariant;
        }

        const buffer = await this.imageQueryService.getOriginalImageBuffer(id);
        let transformer = sharp(buffer);

        const width = query.w ? parseInt(query.w) : 800;
        const height = query.h ? parseInt(query.h) : 600;
        const fit = query.fit || sharp.fit.cover;
        const position = query.crop || 'center';
        const format = query.format || 'jpeg';
        const quality = query.quality ? parseInt(query.quality) : 80;
        const blur = query.blur ? parseFloat(query.blur) : null;
        const grayscale = query.grayscale === 'true';
        const sharpen = query.sharpen === 'true';
        const enhance = query.enhance === 'true';
        const rotate = query.rotate ? parseInt(query.rotate) : null;

        if (width || height) {
            transformer = transformer.resize({
                width,
                height,
                position,
            });
        }

        switch (fit) {
            case 'cover':
                transformer = transformer.resize({
                    fit: sharp.fit.cover,
                });
                break;
            case 'contain':
                transformer = transformer.resize({
                    fit: sharp.fit.contain,
                });
                break;
            case 'fill':
                transformer = transformer.resize({
                    fit: sharp.fit.fill,
                });
                break;
            case 'inside':
                transformer = transformer.resize({
                    fit: sharp.fit.inside,
                });
                break;
            case 'outside':
                transformer = transformer.resize({
                    fit: sharp.fit.outside,
                });
                break;
            default:
                transformer = transformer.resize({
                    fit: sharp.fit.cover,
                });
                break;
        }

        if (grayscale) transformer = transformer.grayscale();
        if (blur && blur > 0) transformer = transformer.blur(blur);
        if (sharpen) transformer = transformer.sharpen();
        if (rotate) transformer = transformer.rotate(rotate);
        if (enhance) transformer = transformer.normalize();

        switch (format) {
            case 'jpeg':
                transformer = transformer.jpeg({ quality });
                break;
            case 'png':
                transformer = transformer.png({ quality });
                break;
            case 'webp':
                transformer = transformer.webp({ quality });
                break;
            case 'avif':
                transformer = transformer.avif({ quality });
                break;
            default:
                transformer = transformer.webp({ quality });
                break;
        }

        try {
            const transformedBuffer = await transformer.toBuffer();
            const uploadResult = await this.uploadService.uploadBuffer(transformedBuffer);

            const variantDto: CreateVariant = {
                imageId: id,
                publicId: uploadResult.public_id,
                url: uploadResult.secure_url,
                width: width || 800,
                height: height || 600,
                format,
                quality,
                blur: blur || 0,
                grayscale,
                sharpen,
                crop: position,
                fit,
                enhance,
                rotate: rotate || 0,
                options: optionJson,
            };

            return this.imageVariantCommandService.create(variantDto);
        } catch (error) {
            this.logger.error(`Error transforming and uploading image: ${error.message}`);
            throw error;
        }
    }

    async getImageMetadata(imageBuffer: Buffer): Promise<sharp.Metadata> {
        try {
            return await sharp(imageBuffer).metadata();
        } catch (error) {
            this.logger.error(
                `Error getting image metadata: ${error.message}`,
                error.stack,
                ImageTransformService.name,
            );
            throw error;
        }
    }
}
