import { IVenda } from 'app/shared/model/venda.model';

export interface ICliente {
    id?: number;
    nome?: string;
    vendas?: IVenda[];
}

export class Cliente implements ICliente {
    constructor(public id?: number, public nome?: string, public vendas?: IVenda[]) {}
}
