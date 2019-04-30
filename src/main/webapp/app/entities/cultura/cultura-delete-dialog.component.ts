import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICultura } from 'app/shared/model/cultura.model';
import { CulturaService } from './cultura.service';

@Component({
    selector: 'jhi-cultura-delete-dialog',
    templateUrl: './cultura-delete-dialog.component.html'
})
export class CulturaDeleteDialogComponent {
    cultura: ICultura;

    constructor(protected culturaService: CulturaService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.culturaService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'culturaListModification',
                content: 'Deleted an cultura'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-cultura-delete-popup',
    template: ''
})
export class CulturaDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ cultura }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CulturaDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.cultura = cultura;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/cultura', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/cultura', { outlets: { popup: null } }]);
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
