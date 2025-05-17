import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
    @IsString()
    clerkId: string;

    @IsEmail()
    email: string;
}
