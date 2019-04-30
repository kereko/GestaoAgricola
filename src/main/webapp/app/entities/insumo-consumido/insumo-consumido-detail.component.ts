import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IInsumoConsumido } from 'app/shared/model/insumo-consumido.model';

@Component({
    selector: 'jhi-insumo-consumido-detail',
    templateUrl: './insumo-consumido-detail.component.html'
})
export class InsumoConsumidoDetailComponent implements OnInit {
    insumoConsumido: IInsumoConsumido;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ insumoConsumido }) => {
            this.insumoConsumido = insumoConsumido;
        });
    }

    previousState() {
        window.history.back();
    }
}
