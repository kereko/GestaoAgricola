import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProdutoAgricola } from 'app/shared/model/produto-agricola.model';
import { ProdutoAgricolaService } from './produto-agricola.service';

@Component({
    selector: 'jhi-produto-agricola-delete-dialog',
    templateUrl: './produto-agricola-delete-dialog.component.html'
})
export class ProdutoAgricolaDeleteDialogComponent {
    produtoAgricola: IProdutoAgricola;

    constructor(
        protected produtoAgricolaService: ProdutoAgricolaService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.produtoAgricolaService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'produtoAgricolaListModification',
                content: 'Deleted an produtoAgricola'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-produto-agricola-delete-popup',
    template: ''
})
export class ProdutoAgricolaDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ produtoAgricola }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ProdutoAgricolaDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.produtoAgricola = produtoAgricola;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/produto-agricola', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/produto-agricola', { outlets: { popup: null } }]);
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
