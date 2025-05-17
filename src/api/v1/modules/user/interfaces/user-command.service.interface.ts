import { User } from 'generated/prisma';
import { CreateUserDto } from '../dto/create-user.dto';

export interface IUserCommandService {
    create(createUserDto: CreateUserDto): Promise<User>;
    update(id: string, data: Partial<CreateUserDto>): Promise<User>;
    delete(id: string): Promise<boolean>;
}
