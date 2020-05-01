import { Document, Types } from 'mongoose';

export default interface ICourse extends Document {
    instructorId: Types.ObjectId,
    name: string,
    description: string,
    subheading: string,
    language: string,
    students: number,
    lectures: number,
    duration: number,
    options: object,
    thumbnail: string,
    deletedAt: string | null
}