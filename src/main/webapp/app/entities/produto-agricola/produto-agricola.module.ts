import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestaoAgricolaSharedModule } from 'app/shared';
import {
    ProdutoAgricolaComponent,
    ProdutoAgricolaDetailComponent,
    ProdutoAgricolaUpdateComponent,
    ProdutoAgricolaDeletePopupComponent,
    ProdutoAgricolaDeleteDialogComponent,
    produtoAgricolaRoute,
    produtoAgricolaPopupRoute
} from './';

const ENTITY_STATES = [...produtoAgricolaRoute, ...produtoAgricolaPopupRoute];

@NgModule({
    imports: [GestaoAgricolaSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ProdutoAgricolaComponent,
        ProdutoAgricolaDetailComponent,
        ProdutoAgricolaUpdateComponent,
        ProdutoAgricolaDeleteDialogComponent,
        ProdutoAgricolaDeletePopupComponent
    ],
    entryComponents: [
        ProdutoAgricolaComponent,
        ProdutoAgricolaUpdateComponent,
        ProdutoAgricolaDeleteDialogComponent,
        ProdutoAgricolaDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestaoAgricolaProdutoAgricolaModule {}
