import { IProdutoAgricola } from 'app/shared/model/produto-agricola.model';
import { IVenda } from 'app/shared/model/venda.model';

export interface IProdutoVenda {
    id?: number;
    preco?: number;
    produtosAgricolas?: IProdutoAgricola[];
    clientes?: IVenda[];
}

export class ProdutoVenda implements IProdutoVenda {
    constructor(public id?: number, public preco?: number, public produtosAgricolas?: IProdutoAgricola[], public clientes?: IVenda[]) {}
}
