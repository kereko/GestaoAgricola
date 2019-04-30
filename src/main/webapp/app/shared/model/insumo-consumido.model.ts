import { IPlantio } from 'app/shared/model/plantio.model';
import { IInsumo } from 'app/shared/model/insumo.model';

export interface IInsumoConsumido {
    id?: number;
    quantidade?: number;
    custoTotal?: number;
    plantio?: IPlantio;
    insumos?: IInsumo[];
}

export class InsumoConsumido implements IInsumoConsumido {
    constructor(
        public id?: number,
        public quantidade?: number,
        public custoTotal?: number,
        public plantio?: IPlantio,
        public insumos?: IInsumo[]
    ) {}
}
