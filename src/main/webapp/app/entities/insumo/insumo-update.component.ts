import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IInsumo } from 'app/shared/model/insumo.model';
import { InsumoService } from './insumo.service';
import { IInsumoConsumido } from 'app/shared/model/insumo-consumido.model';
import { InsumoConsumidoService } from 'app/entities/insumo-consumido';

@Component({
    selector: 'jhi-insumo-update',
    templateUrl: './insumo-update.component.html'
})
export class InsumoUpdateComponent implements OnInit {
    insumo: IInsumo;
    isSaving: boolean;

    insumoconsumidos: IInsumoConsumido[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected insumoService: InsumoService,
        protected insumoConsumidoService: InsumoConsumidoService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ insumo }) => {
            this.insumo = insumo;
        });
        this.insumoConsumidoService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IInsumoConsumido[]>) => mayBeOk.ok),
                map((response: HttpResponse<IInsumoConsumido[]>) => response.body)
            )
            .subscribe((res: IInsumoConsumido[]) => (this.insumoconsumidos = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.insumo.id !== undefined) {
            this.subscribeToSaveResponse(this.insumoService.update(this.insumo));
        } else {
            this.subscribeToSaveResponse(this.insumoService.create(this.insumo));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IInsumo>>) {
        result.subscribe((res: HttpResponse<IInsumo>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackInsumoConsumidoById(index: number, item: IInsumoConsumido) {
        return item.id;
    }
}
