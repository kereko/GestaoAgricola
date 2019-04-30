import { Moment } from 'moment';
import { IPlantio } from 'app/shared/model/plantio.model';

export interface ISafra {
    id?: number;
    alcunha?: string;
    dataInicio?: Moment;
    dataFim?: Moment;
    plantio?: IPlantio;
}

export class Safra implements ISafra {
    constructor(
        public id?: number,
        public alcunha?: string,
        public dataInicio?: Moment,
        public dataFim?: Moment,
        public plantio?: IPlantio
    ) {}
}
