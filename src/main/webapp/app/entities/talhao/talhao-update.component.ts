import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ITalhao } from 'app/shared/model/talhao.model';
import { TalhaoService } from './talhao.service';
import { IFazenda } from 'app/shared/model/fazenda.model';
import { FazendaService } from 'app/entities/fazenda';

@Component({
    selector: 'jhi-talhao-update',
    templateUrl: './talhao-update.component.html'
})
export class TalhaoUpdateComponent implements OnInit {
    talhao: ITalhao;
    isSaving: boolean;

    fazendas: IFazenda[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected talhaoService: TalhaoService,
        protected fazendaService: FazendaService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ talhao }) => {
            this.talhao = talhao;
        });
        this.fazendaService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IFazenda[]>) => mayBeOk.ok),
                map((response: HttpResponse<IFazenda[]>) => response.body)
            )
            .subscribe((res: IFazenda[]) => (this.fazendas = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.talhao.id !== undefined) {
            this.subscribeToSaveResponse(this.talhaoService.update(this.talhao));
        } else {
            this.subscribeToSaveResponse(this.talhaoService.create(this.talhao));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ITalhao>>) {
        result.subscribe((res: HttpResponse<ITalhao>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackFazendaById(index: number, item: IFazenda) {
        return item.id;
    }
}
