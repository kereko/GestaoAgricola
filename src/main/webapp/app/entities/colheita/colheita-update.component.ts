import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IColheita } from 'app/shared/model/colheita.model';
import { ColheitaService } from './colheita.service';
import { IProdutoAgricola } from 'app/shared/model/produto-agricola.model';
import { ProdutoAgricolaService } from 'app/entities/produto-agricola';
import { IPlantio } from 'app/shared/model/plantio.model';
import { PlantioService } from 'app/entities/plantio';

@Component({
    selector: 'jhi-colheita-update',
    templateUrl: './colheita-update.component.html'
})
export class ColheitaUpdateComponent implements OnInit {
    colheita: IColheita;
    isSaving: boolean;

    produtoagricolas: IProdutoAgricola[];

    plantios: IPlantio[];
    dataColheitaDp: any;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected colheitaService: ColheitaService,
        protected produtoAgricolaService: ProdutoAgricolaService,
        protected plantioService: PlantioService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ colheita }) => {
            this.colheita = colheita;
        });
        this.produtoAgricolaService
            .query({ filter: 'colheita-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IProdutoAgricola[]>) => mayBeOk.ok),
                map((response: HttpResponse<IProdutoAgricola[]>) => response.body)
            )
            .subscribe(
                (res: IProdutoAgricola[]) => {
                    if (!this.colheita.produtoAgricola || !this.colheita.produtoAgricola.id) {
                        this.produtoagricolas = res;
                    } else {
                        this.produtoAgricolaService
                            .find(this.colheita.produtoAgricola.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IProdutoAgricola>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IProdutoAgricola>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IProdutoAgricola) => (this.produtoagricolas = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
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
        if (this.colheita.id !== undefined) {
            this.subscribeToSaveResponse(this.colheitaService.update(this.colheita));
        } else {
            this.subscribeToSaveResponse(this.colheitaService.create(this.colheita));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IColheita>>) {
        result.subscribe((res: HttpResponse<IColheita>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackProdutoAgricolaById(index: number, item: IProdutoAgricola) {
        return item.id;
    }

    trackPlantioById(index: number, item: IPlantio) {
        return item.id;
    }
}
