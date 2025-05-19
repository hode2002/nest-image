import { IsNumber, IsString } from 'class-validator';

export class CreateImageDto {
    @IsString()
    publicId: string;

    @IsString()
    userId: string;

    @IsString()
    originalUrl: string;

    @IsNumber()
    width: number;

    @IsNumber()
    height: number;

    @IsNumber()
    size: number;

    @IsString()
    format: string;
}
