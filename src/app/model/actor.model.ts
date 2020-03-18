import { Entity } from './entity.model';

export class Actor extends Entity {
    name: string;
    surname: string;
    email: string;
    password: string;
    address: string;
    phone: string;
    role: string;
    banned: boolean;
    createdAt: Date;
    customToken: string;
}