import BaseModel from '@models/BaseModel';
import IEpisodeModel from '@models/Episode/IEpisodeModel';

class Episode extends BaseModel implements IEpisodeModel {
    protected schemaName = 'episodes';

    constructor() {
        super();
    }
}

export default new Episode();