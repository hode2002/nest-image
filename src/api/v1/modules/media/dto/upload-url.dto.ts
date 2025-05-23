import { IsNotEmpty, IsString } from 'class-validator';

export class UploadImageUrlDto {
    @IsString()
    @IsNotEmpty()
    imageUrl: string;
}
