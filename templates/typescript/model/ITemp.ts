import { Document } from 'mongoose';

export default interface I<%= modelName %> extends Document {
    // insert your object here...
    options: object,
    deletedAt: string | null,
}