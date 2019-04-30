import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IColheita } from 'app/shared/model/colheita.model';
import { AccountService } from 'app/core';
import { ColheitaService } from './colheita.service';

@Component({
    selector: 'jhi-colheita',
    templateUrl: './colheita.component.html'
})
export class ColheitaComponent implements OnInit, OnDestroy {
    colheitas: IColheita[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected colheitaService: ColheitaService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.colheitaService
            .query()
            .pipe(
                filter((res: HttpResponse<IColheita[]>) => res.ok),
                map((res: HttpResponse<IColheita[]>) => res.body)
            )
            .subscribe(
                (res: IColheita[]) => {
                    this.colheitas = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInColheitas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IColheita) {
        return item.id;
    }

    registerChangeInColheitas() {
        this.eventSubscriber = this.eventManager.subscribe('colheitaListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
