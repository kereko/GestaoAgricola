import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IFazenda } from 'app/shared/model/fazenda.model';
import { FazendaService } from './fazenda.service';
import { IProdutor } from 'app/shared/model/produtor.model';
import { ProdutorService } from 'app/entities/produtor';

@Component({
    selector: 'jhi-fazenda-update',
    templateUrl: './fazenda-update.component.html'
})
export class FazendaUpdateComponent implements OnInit {
    fazenda: IFazenda;
    isSaving: boolean;

    produtors: IProdutor[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected fazendaService: FazendaService,
        protected produtorService: ProdutorService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ fazenda }) => {
            this.fazenda = fazenda;
        });
        this.produtorService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IProdutor[]>) => mayBeOk.ok),
                map((response: HttpResponse<IProdutor[]>) => response.body)
            )
            .subscribe((res: IProdutor[]) => (this.produtors = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.fazenda.id !== undefined) {
            this.subscribeToSaveResponse(this.fazendaService.update(this.fazenda));
        } else {
            this.subscribeToSaveResponse(this.fazendaService.create(this.fazenda));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IFazenda>>) {
        result.subscribe((res: HttpResponse<IFazenda>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackProdutorById(index: number, item: IProdutor) {
        return item.id;
    }
}
