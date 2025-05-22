import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { v2 as cloudinary, UploadApiOptions } from 'cloudinary';
import { CloudinaryUploadResult } from './interfaces/upload-result.interface';
import * as streamifier from 'streamifier';
import { ICloudinaryService } from 'src/api/v1/modules/cloudinary/interfaces/cloudinary.service.interface';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class CloudinaryService implements ICloudinaryService {
    constructor(
        @Inject(WINSTON_MODULE_NEST_PROVIDER)
        private readonly logger: LoggerService,
    ) {}

    async uploadImage(
        file: Express.Multer.File,
        folder: string = 'nest-image',
    ): Promise<CloudinaryUploadResult> {
        try {
            return new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        folder,
                        resource_type: 'image',
                    },
                    (error, result) => {
                        if (error) {
                            this.logger.error('Error uploading to Cloudinary:', error);
                            reject(error);
                            return;
                        }
                        if (!result) {
                            reject(new Error('No result from Cloudinary upload'));
                            return;
                        }
                        const uploadResult = result as CloudinaryUploadResult;
                        this.logger.log(`Upload for ${file?.originalname} successfully`);
                        resolve({
                            public_id: uploadResult.public_id,
                            secure_url: uploadResult.secure_url,
                            bytes: uploadResult.bytes,
                            format: uploadResult.format,
                            width: uploadResult.width,
                            height: uploadResult.height,
                        });
                    },
                );

                streamifier.createReadStream(file.buffer).pipe(uploadStream);
            });
        } catch (error) {
            this.logger.error('Error in uploadImage:', error);
            throw error;
        }
    }

    async uploadBuffer(file: Buffer): Promise<CloudinaryUploadResult> {
        try {
            this.logger.log(`Uploading file to Cloudinary`, CloudinaryService.name);

            return new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        folder: 'transformed',
                        resource_type: 'image',
                    },
                    (error, result) => {
                        if (error) {
                            this.logger.error('Error uploading to Cloudinary:', error);
                            reject(error);
                            return;
                        }
                        if (!result) {
                            reject(new Error('No result from Cloudinary upload'));
                            return;
                        }
                        const uploadResult = result as CloudinaryUploadResult;
                        this.logger.log(`Upload successfully`);
                        resolve({
                            public_id: uploadResult.public_id,
                            secure_url: uploadResult.secure_url,
                            bytes: uploadResult.bytes,
                            format: uploadResult.format,
                            width: uploadResult.width,
                            height: uploadResult.height,
                        });
                    },
                );

                uploadStream.end(file);
            });
        } catch (error) {
            this.logger.error(
                `Error in uploadFile: ${error.message}`,
                error.stack,
                CloudinaryService.name,
            );
            throw error;
        }
    }

    async deleteImage(publicId: string): Promise<void> {
        try {
            const result = await cloudinary.uploader.destroy(publicId);
            if (result.result !== 'ok') {
                throw new Error(`Failed to delete image: ${result.result}`);
            }
            this.logger.log(`Image deleted successfully: ${publicId}`);
        } catch (error) {
            this.logger.error('Error in deleteImage:', error);
            throw error;
        }
    }
}
