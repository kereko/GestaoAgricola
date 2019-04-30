import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITalhao } from 'app/shared/model/talhao.model';
import { AccountService } from 'app/core';
import { TalhaoService } from './talhao.service';

@Component({
    selector: 'jhi-talhao',
    templateUrl: './talhao.component.html'
})
export class TalhaoComponent implements OnInit, OnDestroy {
    talhaos: ITalhao[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected talhaoService: TalhaoService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.talhaoService
            .query()
            .pipe(
                filter((res: HttpResponse<ITalhao[]>) => res.ok),
                map((res: HttpResponse<ITalhao[]>) => res.body)
            )
            .subscribe(
                (res: ITalhao[]) => {
                    this.talhaos = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInTalhaos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITalhao) {
        return item.id;
    }

    registerChangeInTalhaos() {
        this.eventSubscriber = this.eventManager.subscribe('talhaoListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
