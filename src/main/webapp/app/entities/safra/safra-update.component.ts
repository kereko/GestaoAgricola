import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { ISafra } from 'app/shared/model/safra.model';
import { SafraService } from './safra.service';
import { IPlantio } from 'app/shared/model/plantio.model';
import { PlantioService } from 'app/entities/plantio';

@Component({
    selector: 'jhi-safra-update',
    templateUrl: './safra-update.component.html'
})
export class SafraUpdateComponent implements OnInit {
    safra: ISafra;
    isSaving: boolean;

    plantios: IPlantio[];
    dataInicioDp: any;
    dataFimDp: any;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected safraService: SafraService,
        protected plantioService: PlantioService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ safra }) => {
            this.safra = safra;
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
        if (this.safra.id !== undefined) {
            this.subscribeToSaveResponse(this.safraService.update(this.safra));
        } else {
            this.subscribeToSaveResponse(this.safraService.create(this.safra));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ISafra>>) {
        result.subscribe((res: HttpResponse<ISafra>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
