import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestaoAgricolaSharedModule } from 'app/shared';
import {
    InsumoConsumidoComponent,
    InsumoConsumidoDetailComponent,
    InsumoConsumidoUpdateComponent,
    InsumoConsumidoDeletePopupComponent,
    InsumoConsumidoDeleteDialogComponent,
    insumoConsumidoRoute,
    insumoConsumidoPopupRoute
} from './';

const ENTITY_STATES = [...insumoConsumidoRoute, ...insumoConsumidoPopupRoute];

@NgModule({
    imports: [GestaoAgricolaSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        InsumoConsumidoComponent,
        InsumoConsumidoDetailComponent,
        InsumoConsumidoUpdateComponent,
        InsumoConsumidoDeleteDialogComponent,
        InsumoConsumidoDeletePopupComponent
    ],
    entryComponents: [
        InsumoConsumidoComponent,
        InsumoConsumidoUpdateComponent,
        InsumoConsumidoDeleteDialogComponent,
        InsumoConsumidoDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestaoAgricolaInsumoConsumidoModule {}
