import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPlantio } from 'app/shared/model/plantio.model';
import { AccountService } from 'app/core';
import { PlantioService } from './plantio.service';

@Component({
    selector: 'jhi-plantio',
    templateUrl: './plantio.component.html'
})
export class PlantioComponent implements OnInit, OnDestroy {
    plantios: IPlantio[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected plantioService: PlantioService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.plantioService
            .query()
            .pipe(
                filter((res: HttpResponse<IPlantio[]>) => res.ok),
                map((res: HttpResponse<IPlantio[]>) => res.body)
            )
            .subscribe(
                (res: IPlantio[]) => {
                    this.plantios = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInPlantios();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IPlantio) {
        return item.id;
    }

    registerChangeInPlantios() {
        this.eventSubscriber = this.eventManager.subscribe('plantioListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
