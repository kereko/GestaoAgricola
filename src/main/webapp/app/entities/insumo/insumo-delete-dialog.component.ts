import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IInsumo } from 'app/shared/model/insumo.model';
import { InsumoService } from './insumo.service';

@Component({
    selector: 'jhi-insumo-delete-dialog',
    templateUrl: './insumo-delete-dialog.component.html'
})
export class InsumoDeleteDialogComponent {
    insumo: IInsumo;

    constructor(protected insumoService: InsumoService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.insumoService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'insumoListModification',
                content: 'Deleted an insumo'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-insumo-delete-popup',
    template: ''
})
export class InsumoDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ insumo }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(InsumoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.insumo = insumo;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/insumo', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/insumo', { outlets: { popup: null } }]);
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
