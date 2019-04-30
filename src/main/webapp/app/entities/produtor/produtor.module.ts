import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestaoAgricolaSharedModule } from 'app/shared';
import {
    ProdutorComponent,
    ProdutorDetailComponent,
    ProdutorUpdateComponent,
    ProdutorDeletePopupComponent,
    ProdutorDeleteDialogComponent,
    produtorRoute,
    produtorPopupRoute
} from './';

const ENTITY_STATES = [...produtorRoute, ...produtorPopupRoute];

@NgModule({
    imports: [GestaoAgricolaSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ProdutorComponent,
        ProdutorDetailComponent,
        ProdutorUpdateComponent,
        ProdutorDeleteDialogComponent,
        ProdutorDeletePopupComponent
    ],
    entryComponents: [ProdutorComponent, ProdutorUpdateComponent, ProdutorDeleteDialogComponent, ProdutorDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestaoAgricolaProdutorModule {}
