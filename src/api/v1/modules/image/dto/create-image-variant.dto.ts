import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

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

    @IsBoolean()
    @IsOptional()
    enhance?: boolean;

    @IsNumber()
    @IsOptional()
    rotate?: number;
}
