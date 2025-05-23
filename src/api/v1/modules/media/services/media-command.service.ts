import { Injectable, BadRequestException, Inject, LoggerService } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { MediaUploadResult } from 'src/api/v1/modules/media/interfaces/upload-result.interface';
import { ConfigService } from '@nestjs/config';
import { ICloudinaryService } from 'src/api/v1/modules/cloudinary/interfaces/cloudinary.service.interface';
import { CLOUDINARY_TOKENS } from 'src/api/v1/modules/cloudinary/constants/inject-token';
import { IMediaCommandService } from 'src/api/v1/modules/media/interfaces/media-command.service.interface';

@Injectable()
export class MediaCommandService implements IMediaCommandService {
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService;
    private readonly MAX_FILE_SIZE: number;
    private readonly ALLOWED_MIME_TYPES: string[];

    constructor(
        @Inject(CLOUDINARY_TOKENS.PROVIDER)
        private readonly uploadService: ICloudinaryService,
        private readonly configService: ConfigService,
    ) {
        this.MAX_FILE_SIZE = configService.get<number>('MAX_FILE_SIZE', 5 * 1024 * 1024); // 5MB
        const allowedTypes = configService.get<string>('ALLOWED_MIME_TYPES');
        this.ALLOWED_MIME_TYPES = allowedTypes
            ? allowedTypes.split(',')
            : ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    }

    async uploadImage(file: Express.Multer.File): Promise<MediaUploadResult> {
        this.validateFile(file);

        try {
            const uploadResult = await this.uploadService.uploadImage(file);
            const { secure_url: url, public_id: publicId, bytes: size, ...rest } = uploadResult;

            return {
                url,
                publicId,
                size,
                ...rest,
            };
        } catch (error) {
            this.logger.error(`Failed to upload image: ${file.originalname}`, error);
            throw error;
        }
    }

    async uploadByUrl(url: string): Promise<MediaUploadResult> {
        try {
            const uploadResult = await this.uploadService.uploadUrl(url);
            const {
                secure_url: secureUrl,
                public_id: publicId,
                bytes: size,
                ...rest
            } = uploadResult;

            return {
                url: secureUrl,
                publicId,
                size,
                ...rest,
            };
        } catch (error) {
            this.logger.error(`Failed to upload image url: ${url}`, error);
            throw error;
        }
    }

    async deleteImage(publicId: string): Promise<void> {
        try {
            await this.uploadService.deleteImage(publicId);
        } catch (error) {
            this.logger.error(`Failed to delete image: ${publicId}`, error);
            throw error;
        }
    }

    private validateFile(file: Express.Multer.File): void {
        if (!file) {
            throw new BadRequestException('No file uploaded');
        }

        if (!this.ALLOWED_MIME_TYPES.includes(file.mimetype)) {
            throw new BadRequestException(
                `Invalid file type. Allowed types: ${this.ALLOWED_MIME_TYPES.join(', ')}`,
            );
        }

        if (file.size > this.MAX_FILE_SIZE) {
            throw new BadRequestException(
                `File size exceeds maximum limit of ${this.MAX_FILE_SIZE / 1024 / 1024}MB`,
            );
        }
    }
}
