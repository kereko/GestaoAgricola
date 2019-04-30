import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProdutor } from 'app/shared/model/produtor.model';
import { ProdutorService } from './produtor.service';

@Component({
    selector: 'jhi-produtor-delete-dialog',
    templateUrl: './produtor-delete-dialog.component.html'
})
export class ProdutorDeleteDialogComponent {
    produtor: IProdutor;

    constructor(protected produtorService: ProdutorService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.produtorService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'produtorListModification',
                content: 'Deleted an produtor'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-produtor-delete-popup',
    template: ''
})
export class ProdutorDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ produtor }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ProdutorDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.produtor = produtor;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/produtor', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/produtor', { outlets: { popup: null } }]);
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
