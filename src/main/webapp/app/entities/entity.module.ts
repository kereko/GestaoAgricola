import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'produtor',
                loadChildren: './produtor/produtor.module#GestaoAgricolaProdutorModule'
            },
            {
                path: 'fazenda',
                loadChildren: './fazenda/fazenda.module#GestaoAgricolaFazendaModule'
            },
            {
                path: 'talhao',
                loadChildren: './talhao/talhao.module#GestaoAgricolaTalhaoModule'
            },
            {
                path: 'safra',
                loadChildren: './safra/safra.module#GestaoAgricolaSafraModule'
            },
            {
                path: 'cultura',
                loadChildren: './cultura/cultura.module#GestaoAgricolaCulturaModule'
            },
            {
                path: 'plantio',
                loadChildren: './plantio/plantio.module#GestaoAgricolaPlantioModule'
            },
            {
                path: 'insumo',
                loadChildren: './insumo/insumo.module#GestaoAgricolaInsumoModule'
            },
            {
                path: 'insumo-consumido',
                loadChildren: './insumo-consumido/insumo-consumido.module#GestaoAgricolaInsumoConsumidoModule'
            },
            {
                path: 'colheita',
                loadChildren: './colheita/colheita.module#GestaoAgricolaColheitaModule'
            },
            {
                path: 'produto-agricola',
                loadChildren: './produto-agricola/produto-agricola.module#GestaoAgricolaProdutoAgricolaModule'
            },
            {
                path: 'produto-venda',
                loadChildren: './produto-venda/produto-venda.module#GestaoAgricolaProdutoVendaModule'
            },
            {
                path: 'venda',
                loadChildren: './venda/venda.module#GestaoAgricolaVendaModule'
            },
            {
                path: 'cliente',
                loadChildren: './cliente/cliente.module#GestaoAgricolaClienteModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestaoAgricolaEntityModule {}
