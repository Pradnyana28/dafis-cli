import { Document } from 'mongoose';

export default interface IUser extends Document {
    firstName: string, 
    lastName: string,
    email: string,
    emailVerified: boolean,
    address: string,
    address2: string,
    city: object,
    cityId: string,
    cityName: string,
    province: object,
    provinceId: string,
    provinceName: string,
    avatar: string,
    options: object,
    deletedAt: string | null,

    generatePassword(password: string): string,
    verifyPassword(password: string): boolean
}