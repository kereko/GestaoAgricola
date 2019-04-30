import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IPlantio } from 'app/shared/model/plantio.model';
import { PlantioService } from './plantio.service';
import { ITalhao } from 'app/shared/model/talhao.model';
import { TalhaoService } from 'app/entities/talhao';
import { ICultura } from 'app/shared/model/cultura.model';
import { CulturaService } from 'app/entities/cultura';
import { IColheita } from 'app/shared/model/colheita.model';
import { ColheitaService } from 'app/entities/colheita';

@Component({
    selector: 'jhi-plantio-update',
    templateUrl: './plantio-update.component.html'
})
export class PlantioUpdateComponent implements OnInit {
    plantio: IPlantio;
    isSaving: boolean;

    talhaos: ITalhao[];

    culturas: ICultura[];

    colheitas: IColheita[];
    dataPlantioDp: any;
    dataPrevisaoColheitaDp: any;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected plantioService: PlantioService,
        protected talhaoService: TalhaoService,
        protected culturaService: CulturaService,
        protected colheitaService: ColheitaService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ plantio }) => {
            this.plantio = plantio;
        });
        this.talhaoService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ITalhao[]>) => mayBeOk.ok),
                map((response: HttpResponse<ITalhao[]>) => response.body)
            )
            .subscribe((res: ITalhao[]) => (this.talhaos = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.culturaService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ICultura[]>) => mayBeOk.ok),
                map((response: HttpResponse<ICultura[]>) => response.body)
            )
            .subscribe((res: ICultura[]) => (this.culturas = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.colheitaService
            .query({ filter: 'plantio-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IColheita[]>) => mayBeOk.ok),
                map((response: HttpResponse<IColheita[]>) => response.body)
            )
            .subscribe(
                (res: IColheita[]) => {
                    if (!this.plantio.colheita || !this.plantio.colheita.id) {
                        this.colheitas = res;
                    } else {
                        this.colheitaService
                            .find(this.plantio.colheita.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IColheita>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IColheita>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IColheita) => (this.colheitas = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.plantio.id !== undefined) {
            this.subscribeToSaveResponse(this.plantioService.update(this.plantio));
        } else {
            this.subscribeToSaveResponse(this.plantioService.create(this.plantio));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IPlantio>>) {
        result.subscribe((res: HttpResponse<IPlantio>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackTalhaoById(index: number, item: ITalhao) {
        return item.id;
    }

    trackCulturaById(index: number, item: ICultura) {
        return item.id;
    }

    trackColheitaById(index: number, item: IColheita) {
        return item.id;
    }
}
