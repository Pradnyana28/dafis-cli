import { Schema } from 'mongoose';

const <%= modelName %>Schema = new Schema({
    // insert your object here...
    options: Object,
    deletedAt: { type: Date, default: null }
}, { timestamps: true });

<%= modelName %>Schema.methods.myCustomMethod = (paramName: string): boolean => {
    // return anything you want
}

<%= modelName %>Schema.virtual('yourVirtualMethod').get(() => {
    // return anything you want
});

export default <%= modelName %>Schema;