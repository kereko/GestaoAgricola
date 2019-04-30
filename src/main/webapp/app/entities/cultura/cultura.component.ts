import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICultura } from 'app/shared/model/cultura.model';
import { AccountService } from 'app/core';
import { CulturaService } from './cultura.service';

@Component({
    selector: 'jhi-cultura',
    templateUrl: './cultura.component.html'
})
export class CulturaComponent implements OnInit, OnDestroy {
    culturas: ICultura[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected culturaService: CulturaService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.culturaService
            .query()
            .pipe(
                filter((res: HttpResponse<ICultura[]>) => res.ok),
                map((res: HttpResponse<ICultura[]>) => res.body)
            )
            .subscribe(
                (res: ICultura[]) => {
                    this.culturas = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInCulturas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICultura) {
        return item.id;
    }

    registerChangeInCulturas() {
        this.eventSubscriber = this.eventManager.subscribe('culturaListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
