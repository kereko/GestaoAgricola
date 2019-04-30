import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IFazenda } from 'app/shared/model/fazenda.model';
import { AccountService } from 'app/core';
import { FazendaService } from './fazenda.service';

@Component({
    selector: 'jhi-fazenda',
    templateUrl: './fazenda.component.html'
})
export class FazendaComponent implements OnInit, OnDestroy {
    fazendas: IFazenda[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected fazendaService: FazendaService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.fazendaService
            .query()
            .pipe(
                filter((res: HttpResponse<IFazenda[]>) => res.ok),
                map((res: HttpResponse<IFazenda[]>) => res.body)
            )
            .subscribe(
                (res: IFazenda[]) => {
                    this.fazendas = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInFazendas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IFazenda) {
        return item.id;
    }

    registerChangeInFazendas() {
        this.eventSubscriber = this.eventManager.subscribe('fazendaListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
