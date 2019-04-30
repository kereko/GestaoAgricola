import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ISafra } from 'app/shared/model/safra.model';
import { AccountService } from 'app/core';
import { SafraService } from './safra.service';

@Component({
    selector: 'jhi-safra',
    templateUrl: './safra.component.html'
})
export class SafraComponent implements OnInit, OnDestroy {
    safras: ISafra[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected safraService: SafraService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.safraService
            .query()
            .pipe(
                filter((res: HttpResponse<ISafra[]>) => res.ok),
                map((res: HttpResponse<ISafra[]>) => res.body)
            )
            .subscribe(
                (res: ISafra[]) => {
                    this.safras = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInSafras();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ISafra) {
        return item.id;
    }

    registerChangeInSafras() {
        this.eventSubscriber = this.eventManager.subscribe('safraListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
