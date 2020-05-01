import { Schema, Types } from 'mongoose';

const EpisodeSchema = new Schema({
    courseId: { type: Types.ObjectId, required: true },
    options: Object,
    deletedAt: { type: Date, default: null }
}, { timestamps: true });

export default EpisodeSchema;