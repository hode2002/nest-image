import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateImageDto {
    @IsString()
    @IsOptional()
    url?: string;

    @IsString()
    @IsOptional()
    userId?: string;

    @IsNumber()
    @IsOptional()
    width?: number;

    @IsNumber()
    @IsOptional()
    height?: number;

    @IsBoolean()
    @IsOptional()
    transformed?: boolean;
}
