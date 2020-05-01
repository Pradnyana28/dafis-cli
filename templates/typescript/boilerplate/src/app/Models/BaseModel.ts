import { model, Model, Types } from 'mongoose';

import Logger from '@utils/logger';

class BaseModel {
    // share variable within derived class
    public model: Model<any>;
    protected schema;
    protected logger: Logger;
    
    protected schemaName: string;
    protected primaryKey: string = '_id';

    protected constructor () {
        this.logger = new Logger();
        this.schemaName = 'User';
        this.schema = require(__dirname +`/${this.schemaName}/${this.schemaName}.Schema`);
        this.model = model(this.schemaName, this.schema);
    }

    public async all(): Promise<object[]> {
        try {
            return await this.model.find({});
        } catch (err) {
            this.logger.error('Failed loading schema data', err, __filename);
            return [];
        }
    }

    public async find(whereClause: object = {}): Promise<object[]> {
        try {
            return await this.model.find(whereClause);
        } catch (err) {
            this.logger.error('Failed while retrieving schema data', err, __filename);
            return [];
        }
    }

    public async findById(id: string): Promise<object> {
        try {
            return await this.findOne({ [this.primaryKey]: id });
        } catch (err) {
            this.logger.error('Failed while retrieving schema identifier', err, __filename);
            return null;
        }
    }

    public async findOne(whereClause: object): Promise<object> {
        try {
            return await this.model.findOne({ ...whereClause, deletedAt: null });
        } catch (err) {
            this.logger.error('Failed while retrieving schema data', err, __filename);
            return null;
        }
    }

    public async updateById(id: string, updateClause: object): Promise<object> {
        try {
            const data = await this.model.updateOne({ [this.primaryKey]: id }, updateClause);
            if (data) {
                return await this.findById(id);
            }
            return null;
        } catch (err) {
            this.logger.error('Failed while deleting schema object', err, __filename);
            return null;
        }
    }

    public async update(whereClause: object, updateClause: object): Promise<object> {
        try {
            const data = await this.model.updateMany({ ...whereClause, deletedAt: null }, updateClause);
            if (data) {
                return await this.find(whereClause);
            }
            return [];
        } catch (err) {
            this.logger.error('Failed while retrieving schema data', err, __filename);
            return [];
        }
    }

    public async deleteById(id: Types.ObjectId): Promise<boolean> {
        try {
            return await this.model.updateOne({ [this.primaryKey]: id }, { deletedAt: new Date() })
                ? true : false;
        } catch (err) {
            this.logger.error('Failed while deleting schema object', err, __filename);
            return false;
        }
    }

    public async delete(whereClause: object): Promise<boolean> {
        try {
            return this.model.updateMany({ ...whereClause, deletedAt: null }, { deletedAt: new Date() })
                ? true : false;
        } catch (err) {
            this.logger.error('Failed while deleting schema object', err, __filename);
            return false;
        }
    }
}

export default BaseModel;