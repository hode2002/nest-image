import { User } from 'generated/prisma';

export interface IUserQueryService {
    findAll(): Promise<User[]>;
    findById(id: string, passThrough?: boolean): Promise<User | null>;
    findByEmail(email: string, passThrough?: boolean): Promise<User | null>;
}
