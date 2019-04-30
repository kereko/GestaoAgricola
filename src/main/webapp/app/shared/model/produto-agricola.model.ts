import { IColheita } from 'app/shared/model/colheita.model';
import { IProdutoVenda } from 'app/shared/model/produto-venda.model';

export interface IProdutoAgricola {
    id?: number;
    nome?: string;
    colheita?: IColheita;
    produtoVenda?: IProdutoVenda;
}

export class ProdutoAgricola implements IProdutoAgricola {
    constructor(public id?: number, public nome?: string, public colheita?: IColheita, public produtoVenda?: IProdutoVenda) {}
}
