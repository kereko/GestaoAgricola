import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPlantio } from 'app/shared/model/plantio.model';
import { PlantioService } from './plantio.service';

@Component({
    selector: 'jhi-plantio-delete-dialog',
    templateUrl: './plantio-delete-dialog.component.html'
})
export class PlantioDeleteDialogComponent {
    plantio: IPlantio;

    constructor(protected plantioService: PlantioService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.plantioService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'plantioListModification',
                content: 'Deleted an plantio'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-plantio-delete-popup',
    template: ''
})
export class PlantioDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ plantio }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PlantioDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.plantio = plantio;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/plantio', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/plantio', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
