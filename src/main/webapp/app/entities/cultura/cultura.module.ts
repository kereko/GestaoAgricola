import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestaoAgricolaSharedModule } from 'app/shared';
import {
    CulturaComponent,
    CulturaDetailComponent,
    CulturaUpdateComponent,
    CulturaDeletePopupComponent,
    CulturaDeleteDialogComponent,
    culturaRoute,
    culturaPopupRoute
} from './';

const ENTITY_STATES = [...culturaRoute, ...culturaPopupRoute];

@NgModule({
    imports: [GestaoAgricolaSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CulturaComponent,
        CulturaDetailComponent,
        CulturaUpdateComponent,
        CulturaDeleteDialogComponent,
        CulturaDeletePopupComponent
    ],
    entryComponents: [CulturaComponent, CulturaUpdateComponent, CulturaDeleteDialogComponent, CulturaDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestaoAgricolaCulturaModule {}
