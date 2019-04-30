import { Moment } from 'moment';
import { IProdutoVenda } from 'app/shared/model/produto-venda.model';
import { ICliente } from 'app/shared/model/cliente.model';

export interface IVenda {
    id?: number;
    dataVenda?: Moment;
    produtoVenda?: IProdutoVenda;
    cliente?: ICliente;
}

export class Venda implements IVenda {
    constructor(public id?: number, public dataVenda?: Moment, public produtoVenda?: IProdutoVenda, public cliente?: ICliente) {}
}
