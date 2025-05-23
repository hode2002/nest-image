import { CloudinaryUploadResult } from 'src/api/v1/modules/cloudinary/interfaces/upload-result.interface';

export interface ICloudinaryService {
    uploadImage(file: Express.Multer.File, folder?: string): Promise<CloudinaryUploadResult>;
    uploadBuffer(buffer: Buffer): Promise<CloudinaryUploadResult>;
    uploadUrl(url: string): Promise<CloudinaryUploadResult>;
    deleteImage(publicId: string): Promise<void>;
}
