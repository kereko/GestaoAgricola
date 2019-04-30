import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IProdutor } from 'app/shared/model/produtor.model';
import { AccountService } from 'app/core';
import { ProdutorService } from './produtor.service';

@Component({
    selector: 'jhi-produtor',
    templateUrl: './produtor.component.html'
})
export class ProdutorComponent implements OnInit, OnDestroy {
    produtors: IProdutor[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected produtorService: ProdutorService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.produtorService
            .query()
            .pipe(
                filter((res: HttpResponse<IProdutor[]>) => res.ok),
                map((res: HttpResponse<IProdutor[]>) => res.body)
            )
            .subscribe(
                (res: IProdutor[]) => {
                    this.produtors = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInProdutors();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IProdutor) {
        return item.id;
    }

    registerChangeInProdutors() {
        this.eventSubscriber = this.eventManager.subscribe('produtorListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
