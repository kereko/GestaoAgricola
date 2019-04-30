import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IProdutoVenda } from 'app/shared/model/produto-venda.model';
import { AccountService } from 'app/core';
import { ProdutoVendaService } from './produto-venda.service';

@Component({
    selector: 'jhi-produto-venda',
    templateUrl: './produto-venda.component.html'
})
export class ProdutoVendaComponent implements OnInit, OnDestroy {
    produtoVendas: IProdutoVenda[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected produtoVendaService: ProdutoVendaService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.produtoVendaService
            .query()
            .pipe(
                filter((res: HttpResponse<IProdutoVenda[]>) => res.ok),
                map((res: HttpResponse<IProdutoVenda[]>) => res.body)
            )
            .subscribe(
                (res: IProdutoVenda[]) => {
                    this.produtoVendas = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInProdutoVendas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IProdutoVenda) {
        return item.id;
    }

    registerChangeInProdutoVendas() {
        this.eventSubscriber = this.eventManager.subscribe('produtoVendaListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
