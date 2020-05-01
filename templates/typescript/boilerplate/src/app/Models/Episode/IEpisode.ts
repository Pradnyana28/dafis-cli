import { Document, Types } from 'mongoose';

export default interface IEpisode extends Document {
    courseId: Types.ObjectId,
    options: object,
    deletedAt: string | null
}