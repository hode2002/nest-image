import { MediaUploadResult } from 'src/api/v1/modules/media/interfaces/upload-result.interface';

export interface IMediaCommandService {
    uploadImage(file: Express.Multer.File): Promise<MediaUploadResult>;
    uploadByUrl(url: string): Promise<MediaUploadResult>;
    deleteImage(publicId: string): Promise<void>;
}
