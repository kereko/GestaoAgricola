import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IVenda } from 'app/shared/model/venda.model';
import { VendaService } from './venda.service';
import { IProdutoVenda } from 'app/shared/model/produto-venda.model';
import { ProdutoVendaService } from 'app/entities/produto-venda';
import { ICliente } from 'app/shared/model/cliente.model';
import { ClienteService } from 'app/entities/cliente';

@Component({
    selector: 'jhi-venda-update',
    templateUrl: './venda-update.component.html'
})
export class VendaUpdateComponent implements OnInit {
    venda: IVenda;
    isSaving: boolean;

    produtovendas: IProdutoVenda[];

    clientes: ICliente[];
    dataVendaDp: any;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected vendaService: VendaService,
        protected produtoVendaService: ProdutoVendaService,
        protected clienteService: ClienteService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ venda }) => {
            this.venda = venda;
        });
        this.produtoVendaService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IProdutoVenda[]>) => mayBeOk.ok),
                map((response: HttpResponse<IProdutoVenda[]>) => response.body)
            )
            .subscribe((res: IProdutoVenda[]) => (this.produtovendas = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.clienteService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ICliente[]>) => mayBeOk.ok),
                map((response: HttpResponse<ICliente[]>) => response.body)
            )
            .subscribe((res: ICliente[]) => (this.clientes = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.venda.id !== undefined) {
            this.subscribeToSaveResponse(this.vendaService.update(this.venda));
        } else {
            this.subscribeToSaveResponse(this.vendaService.create(this.venda));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IVenda>>) {
        result.subscribe((res: HttpResponse<IVenda>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackProdutoVendaById(index: number, item: IProdutoVenda) {
        return item.id;
    }

    trackClienteById(index: number, item: ICliente) {
        return item.id;
    }
}
