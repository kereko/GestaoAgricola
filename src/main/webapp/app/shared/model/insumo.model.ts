import { IInsumoConsumido } from 'app/shared/model/insumo-consumido.model';

export interface IInsumo {
    id?: number;
    nome?: string;
    qtdEstoque?: number;
    custoPorUnidade?: number;
    categoria?: string;
    insumoConsumido?: IInsumoConsumido;
}

export class Insumo implements IInsumo {
    constructor(
        public id?: number,
        public nome?: string,
        public qtdEstoque?: number,
        public custoPorUnidade?: number,
        public categoria?: string,
        public insumoConsumido?: IInsumoConsumido
    ) {}
}
