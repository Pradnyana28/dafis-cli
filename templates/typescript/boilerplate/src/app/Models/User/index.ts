import BaseModel from '@models/BaseModel';
import IUserModel from '@models/User/IUserModel';

class User extends BaseModel implements IUserModel {
    protected schemaName = 'users';

    constructor() {
        super();
    }
}

export default new User();