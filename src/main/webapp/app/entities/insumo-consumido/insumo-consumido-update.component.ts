import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IInsumoConsumido } from 'app/shared/model/insumo-consumido.model';
import { InsumoConsumidoService } from './insumo-consumido.service';
import { IPlantio } from 'app/shared/model/plantio.model';
import { PlantioService } from 'app/entities/plantio';

@Component({
    selector: 'jhi-insumo-consumido-update',
    templateUrl: './insumo-consumido-update.component.html'
})
export class InsumoConsumidoUpdateComponent implements OnInit {
    insumoConsumido: IInsumoConsumido;
    isSaving: boolean;

    plantios: IPlantio[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected insumoConsumidoService: InsumoConsumidoService,
        protected plantioService: PlantioService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ insumoConsumido }) => {
            this.insumoConsumido = insumoConsumido;
        });
        this.plantioService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IPlantio[]>) => mayBeOk.ok),
                map((response: HttpResponse<IPlantio[]>) => response.body)
            )
            .subscribe((res: IPlantio[]) => (this.plantios = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.insumoConsumido.id !== undefined) {
            this.subscribeToSaveResponse(this.insumoConsumidoService.update(this.insumoConsumido));
        } else {
            this.subscribeToSaveResponse(this.insumoConsumidoService.create(this.insumoConsumido));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IInsumoConsumido>>) {
        result.subscribe((res: HttpResponse<IInsumoConsumido>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackPlantioById(index: number, item: IPlantio) {
        return item.id;
    }
}
