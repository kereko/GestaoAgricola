import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IVenda } from 'app/shared/model/venda.model';
import { AccountService } from 'app/core';
import { VendaService } from './venda.service';

@Component({
    selector: 'jhi-venda',
    templateUrl: './venda.component.html'
})
export class VendaComponent implements OnInit, OnDestroy {
    vendas: IVenda[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected vendaService: VendaService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.vendaService
            .query()
            .pipe(
                filter((res: HttpResponse<IVenda[]>) => res.ok),
                map((res: HttpResponse<IVenda[]>) => res.body)
            )
            .subscribe(
                (res: IVenda[]) => {
                    this.vendas = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInVendas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IVenda) {
        return item.id;
    }

    registerChangeInVendas() {
        this.eventSubscriber = this.eventManager.subscribe('vendaListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
