import BaseModel from '@models/BaseModel';
import ICourseModel from '@models/Course/ICourseModel';

class Course extends BaseModel implements ICourseModel {
    protected schemaName = 'courses';

    constructor() {
        super();
    }
}

export default new Course();