import { Moment } from 'moment';
import { ITalhao } from 'app/shared/model/talhao.model';
import { ICultura } from 'app/shared/model/cultura.model';
import { IColheita } from 'app/shared/model/colheita.model';
import { ISafra } from 'app/shared/model/safra.model';
import { IInsumoConsumido } from 'app/shared/model/insumo-consumido.model';

export interface IPlantio {
    id?: number;
    dataPlantio?: Moment;
    dataPrevisaoColheita?: Moment;
    quantidadePlantado?: number;
    talhao?: ITalhao;
    cultura?: ICultura;
    colheita?: IColheita;
    safras?: ISafra[];
    insumoConsumidos?: IInsumoConsumido[];
}

export class Plantio implements IPlantio {
    constructor(
        public id?: number,
        public dataPlantio?: Moment,
        public dataPrevisaoColheita?: Moment,
        public quantidadePlantado?: number,
        public talhao?: ITalhao,
        public cultura?: ICultura,
        public colheita?: IColheita,
        public safras?: ISafra[],
        public insumoConsumidos?: IInsumoConsumido[]
    ) {}
}
