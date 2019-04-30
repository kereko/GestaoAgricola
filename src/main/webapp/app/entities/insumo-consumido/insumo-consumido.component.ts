import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IInsumoConsumido } from 'app/shared/model/insumo-consumido.model';
import { AccountService } from 'app/core';
import { InsumoConsumidoService } from './insumo-consumido.service';

@Component({
    selector: 'jhi-insumo-consumido',
    templateUrl: './insumo-consumido.component.html'
})
export class InsumoConsumidoComponent implements OnInit, OnDestroy {
    insumoConsumidos: IInsumoConsumido[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected insumoConsumidoService: InsumoConsumidoService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.insumoConsumidoService
            .query()
            .pipe(
                filter((res: HttpResponse<IInsumoConsumido[]>) => res.ok),
                map((res: HttpResponse<IInsumoConsumido[]>) => res.body)
            )
            .subscribe(
                (res: IInsumoConsumido[]) => {
                    this.insumoConsumidos = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInInsumoConsumidos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IInsumoConsumido) {
        return item.id;
    }

    registerChangeInInsumoConsumidos() {
        this.eventSubscriber = this.eventManager.subscribe('insumoConsumidoListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
