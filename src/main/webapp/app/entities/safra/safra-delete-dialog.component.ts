import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISafra } from 'app/shared/model/safra.model';
import { SafraService } from './safra.service';

@Component({
    selector: 'jhi-safra-delete-dialog',
    templateUrl: './safra-delete-dialog.component.html'
})
export class SafraDeleteDialogComponent {
    safra: ISafra;

    constructor(protected safraService: SafraService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.safraService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'safraListModification',
                content: 'Deleted an safra'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-safra-delete-popup',
    template: ''
})
export class SafraDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ safra }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(SafraDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.safra = safra;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/safra', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/safra', { outlets: { popup: null } }]);
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
