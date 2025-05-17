import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary, UploadApiOptions } from 'cloudinary';
import { CloudinaryUploadResult } from './interfaces/upload-result.interface';
import * as streamifier from 'streamifier';

@Injectable()
export class CloudinaryService {
    private readonly logger = new Logger(CloudinaryService.name);

    async uploadImage(
        file: Express.Multer.File,
        folder: string = 'nest-image',
    ): Promise<{
        url: string;
        publicId: string;
        width: number;
        height: number;
    }> {
        try {
            return new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        folder,
                        resource_type: 'auto',
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
                        resolve({
                            url: uploadResult.secure_url,
                            publicId: uploadResult.public_id,
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

    async deleteImage(publicId: string): Promise<void> {
        try {
            const result = await cloudinary.uploader.destroy(publicId);
            if (result.result !== 'ok') {
                throw new Error(`Failed to delete image: ${result.result}`);
            }
        } catch (error) {
            this.logger.error('Error in deleteImage:', error);
            throw error;
        }
    }
}
