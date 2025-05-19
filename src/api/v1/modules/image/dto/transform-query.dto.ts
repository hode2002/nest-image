import { IsString, IsOptional } from 'class-validator';

export class TransformQuery {
    @IsString()
    @IsOptional()
    w?: string;

    @IsString()
    @IsOptional()
    h?: string;

    @IsString()
    @IsOptional()
    fit?: string;

    @IsString()
    @IsOptional()
    format?: string;

    @IsString()
    @IsOptional()
    quality?: string;

    @IsString()
    @IsOptional()
    grayscale?: string;

    @IsString()
    @IsOptional()
    blur?: string;

    @IsString()
    @IsOptional()
    sharpen?: string;

    @IsString()
    @IsOptional()
    rotate?: string;

    @IsString()
    @IsOptional()
    crop?: string;

    @IsString()
    @IsOptional()
    enhance?: string;
}
