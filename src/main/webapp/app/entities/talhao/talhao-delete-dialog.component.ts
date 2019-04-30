import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITalhao } from 'app/shared/model/talhao.model';
import { TalhaoService } from './talhao.service';

@Component({
    selector: 'jhi-talhao-delete-dialog',
    templateUrl: './talhao-delete-dialog.component.html'
})
export class TalhaoDeleteDialogComponent {
    talhao: ITalhao;

    constructor(protected talhaoService: TalhaoService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.talhaoService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'talhaoListModification',
                content: 'Deleted an talhao'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-talhao-delete-popup',
    template: ''
})
export class TalhaoDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ talhao }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TalhaoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.talhao = talhao;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/talhao', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/talhao', { outlets: { popup: null } }]);
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
