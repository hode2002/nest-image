import { CloudinaryUploadResult } from 'src/api/v1/modules/cloudinary/interfaces/upload-result.interface';

export interface ICloudinaryService {
    uploadImage(file: Express.Multer.File, folder?: string): Promise<CloudinaryUploadResult>;
    deleteImage(publicId: string): Promise<void>;
}
