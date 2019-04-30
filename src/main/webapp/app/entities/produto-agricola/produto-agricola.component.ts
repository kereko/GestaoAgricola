import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IProdutoAgricola } from 'app/shared/model/produto-agricola.model';
import { AccountService } from 'app/core';
import { ProdutoAgricolaService } from './produto-agricola.service';

@Component({
    selector: 'jhi-produto-agricola',
    templateUrl: './produto-agricola.component.html'
})
export class ProdutoAgricolaComponent implements OnInit, OnDestroy {
    produtoAgricolas: IProdutoAgricola[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected produtoAgricolaService: ProdutoAgricolaService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.produtoAgricolaService
            .query()
            .pipe(
                filter((res: HttpResponse<IProdutoAgricola[]>) => res.ok),
                map((res: HttpResponse<IProdutoAgricola[]>) => res.body)
            )
            .subscribe(
                (res: IProdutoAgricola[]) => {
                    this.produtoAgricolas = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInProdutoAgricolas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IProdutoAgricola) {
        return item.id;
    }

    registerChangeInProdutoAgricolas() {
        this.eventSubscriber = this.eventManager.subscribe('produtoAgricolaListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
