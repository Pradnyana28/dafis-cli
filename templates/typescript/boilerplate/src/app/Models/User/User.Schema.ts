import { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    emailVerified: { type: Boolean, default: false },
    password: { type: String, required: true },
    address: { type: String, required: true },
    address2: String,
    city: Map,
    province: Map,
    avatar: String,
    options: Object,
    deletedAt: { type: Date, default: null }
}, { timestamps: true });

UserSchema.methods.generatePassword = (password: string): string => {
    return bcrypt.hashSync(password, process.env.SYSTEM_SALT);
}

UserSchema.methods.verifyPassword = (password: string): boolean => {
    return bcrypt.compareSync(password, this.password);
}

UserSchema.virtual('cityId').get(() => {
    return this.city ? this.city.get('id') : '';
});

UserSchema.virtual('cityName').get(() => {
    return this.city ? this.city.get('name') : '';
});

UserSchema.virtual('provinceId').get(() => {
    return this.province ? this.province.get('id') : '';
});

UserSchema.virtual('provinceName').get(() => {
    return this.province ? this.province.get('name') : '';
});

export default UserSchema;