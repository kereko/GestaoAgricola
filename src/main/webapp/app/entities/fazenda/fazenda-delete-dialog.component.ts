import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFazenda } from 'app/shared/model/fazenda.model';
import { FazendaService } from './fazenda.service';

@Component({
    selector: 'jhi-fazenda-delete-dialog',
    templateUrl: './fazenda-delete-dialog.component.html'
})
export class FazendaDeleteDialogComponent {
    fazenda: IFazenda;

    constructor(protected fazendaService: FazendaService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.fazendaService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'fazendaListModification',
                content: 'Deleted an fazenda'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-fazenda-delete-popup',
    template: ''
})
export class FazendaDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ fazenda }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(FazendaDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.fazenda = fazenda;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/fazenda', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/fazenda', { outlets: { popup: null } }]);
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
