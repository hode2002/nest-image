import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { EnhanceSize } from 'src/api/v1/modules/image/types/enhance.type';

export class CreateImageVariantDto {
    @IsString()
    imageId: string;

    @IsString()
    url: string;

    @IsString()
    publicId: string;

    @IsNumber()
    @IsOptional()
    width?: number;

    @IsNumber()
    @IsOptional()
    height?: number;

    @IsString()
    @IsOptional()
    format?: string;

    @IsNumber()
    @IsOptional()
    quality?: number;

    @IsNumber()
    @IsOptional()
    blur?: number;

    @IsBoolean()
    @IsOptional()
    grayscale?: boolean;

    @IsBoolean()
    @IsOptional()
    sharpen?: boolean;

    @IsString()
    @IsOptional()
    crop?: string;

    @IsString()
    @IsOptional()
    fit?: string;

    @IsEnum(['2x', '4x', '8x'])
    @IsOptional()
    enhance?: EnhanceSize;

    @IsNumber()
    @IsOptional()
    rotate?: number;
}
