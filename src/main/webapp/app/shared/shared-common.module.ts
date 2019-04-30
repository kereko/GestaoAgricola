import { NgModule } from '@angular/core';

import { GestaoAgricolaSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [GestaoAgricolaSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [GestaoAgricolaSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class GestaoAgricolaSharedCommonModule {}
