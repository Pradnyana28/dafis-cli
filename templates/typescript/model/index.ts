import BaseModel from '@models/BaseModel';
import I<%= modelName %>Model from '@models/<%= modulePath %>/I<%= modelName %>Model';

class <%= modelName %> extends BaseModel implements I<%= modelName %>Model {
    protected schemaName = '<%= modelNameLowercase %>';

    constructor() {
        super();
    }
}

export default new <%= modelName %>();