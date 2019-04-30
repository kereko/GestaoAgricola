import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestaoAgricolaSharedModule } from 'app/shared';
import {
    ProdutoVendaComponent,
    ProdutoVendaDetailComponent,
    ProdutoVendaUpdateComponent,
    ProdutoVendaDeletePopupComponent,
    ProdutoVendaDeleteDialogComponent,
    produtoVendaRoute,
    produtoVendaPopupRoute
} from './';

const ENTITY_STATES = [...produtoVendaRoute, ...produtoVendaPopupRoute];

@NgModule({
    imports: [GestaoAgricolaSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ProdutoVendaComponent,
        ProdutoVendaDetailComponent,
        ProdutoVendaUpdateComponent,
        ProdutoVendaDeleteDialogComponent,
        ProdutoVendaDeletePopupComponent
    ],
    entryComponents: [
        ProdutoVendaComponent,
        ProdutoVendaUpdateComponent,
        ProdutoVendaDeleteDialogComponent,
        ProdutoVendaDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestaoAgricolaProdutoVendaModule {}
