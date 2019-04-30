import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IInsumoConsumido } from 'app/shared/model/insumo-consumido.model';
import { InsumoConsumidoService } from './insumo-consumido.service';

@Component({
    selector: 'jhi-insumo-consumido-delete-dialog',
    templateUrl: './insumo-consumido-delete-dialog.component.html'
})
export class InsumoConsumidoDeleteDialogComponent {
    insumoConsumido: IInsumoConsumido;

    constructor(
        protected insumoConsumidoService: InsumoConsumidoService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.insumoConsumidoService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'insumoConsumidoListModification',
                content: 'Deleted an insumoConsumido'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-insumo-consumido-delete-popup',
    template: ''
})
export class InsumoConsumidoDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ insumoConsumido }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(InsumoConsumidoDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.insumoConsumido = insumoConsumido;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/insumo-consumido', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/insumo-consumido', { outlets: { popup: null } }]);
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
