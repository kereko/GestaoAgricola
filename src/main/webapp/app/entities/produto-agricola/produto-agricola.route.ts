import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ProdutoAgricola } from 'app/shared/model/produto-agricola.model';
import { ProdutoAgricolaService } from './produto-agricola.service';
import { ProdutoAgricolaComponent } from './produto-agricola.component';
import { ProdutoAgricolaDetailComponent } from './produto-agricola-detail.component';
import { ProdutoAgricolaUpdateComponent } from './produto-agricola-update.component';
import { ProdutoAgricolaDeletePopupComponent } from './produto-agricola-delete-dialog.component';
import { IProdutoAgricola } from 'app/shared/model/produto-agricola.model';

@Injectable({ providedIn: 'root' })
export class ProdutoAgricolaResolve implements Resolve<IProdutoAgricola> {
    constructor(private service: ProdutoAgricolaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProdutoAgricola> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<ProdutoAgricola>) => response.ok),
                map((produtoAgricola: HttpResponse<ProdutoAgricola>) => produtoAgricola.body)
            );
        }
        return of(new ProdutoAgricola());
    }
}

export const produtoAgricolaRoute: Routes = [
    {
        path: '',
        component: ProdutoAgricolaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ProdutoAgricolas'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: ProdutoAgricolaDetailComponent,
        resolve: {
            produtoAgricola: ProdutoAgricolaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ProdutoAgricolas'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: ProdutoAgricolaUpdateComponent,
        resolve: {
            produtoAgricola: ProdutoAgricolaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ProdutoAgricolas'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: ProdutoAgricolaUpdateComponent,
        resolve: {
            produtoAgricola: ProdutoAgricolaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ProdutoAgricolas'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const produtoAgricolaPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: ProdutoAgricolaDeletePopupComponent,
        resolve: {
            produtoAgricola: ProdutoAgricolaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ProdutoAgricolas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
