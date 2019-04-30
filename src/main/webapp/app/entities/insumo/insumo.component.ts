import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IInsumo } from 'app/shared/model/insumo.model';
import { AccountService } from 'app/core';
import { InsumoService } from './insumo.service';

@Component({
    selector: 'jhi-insumo',
    templateUrl: './insumo.component.html'
})
export class InsumoComponent implements OnInit, OnDestroy {
    insumos: IInsumo[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected insumoService: InsumoService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.insumoService
            .query()
            .pipe(
                filter((res: HttpResponse<IInsumo[]>) => res.ok),
                map((res: HttpResponse<IInsumo[]>) => res.body)
            )
            .subscribe(
                (res: IInsumo[]) => {
                    this.insumos = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInInsumos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IInsumo) {
        return item.id;
    }

    registerChangeInInsumos() {
        this.eventSubscriber = this.eventManager.subscribe('insumoListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
