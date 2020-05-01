import { Schema, Types } from 'mongoose';
import timeConvertion from '@utils/timeConvertion';

const CourseSchema = new Schema({
    instructorId: { type: Types.ObjectId, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    subheading: String,
    language: String,
    lectures: Number,
    duration: Number,
    thumbnail: String,
    options: Object,
    deletedAt: { type: Date, default: null }
}, { timestamps: true });

CourseSchema.virtual('durationSecond').get(() => {
    return timeConvertion(this.duration, 'ms').toSecond();
});

CourseSchema.virtual('durationMinute').get(() => {
    return timeConvertion(this.duration, 'ms').toMinute();
});

CourseSchema.virtual('durationHours').get(() => {
    return timeConvertion(this.duration, 'ms').toHour();
});

export default CourseSchema;