import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IVenda } from 'app/shared/model/venda.model';
import { VendaService } from './venda.service';

@Component({
    selector: 'jhi-venda-delete-dialog',
    templateUrl: './venda-delete-dialog.component.html'
})
export class VendaDeleteDialogComponent {
    venda: IVenda;

    constructor(protected vendaService: VendaService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.vendaService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'vendaListModification',
                content: 'Deleted an venda'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-venda-delete-popup',
    template: ''
})
export class VendaDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ venda }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(VendaDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.venda = venda;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/venda', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/venda', { outlets: { popup: null } }]);
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
