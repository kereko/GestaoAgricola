import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { InsumoConsumido } from 'app/shared/model/insumo-consumido.model';
import { InsumoConsumidoService } from './insumo-consumido.service';
import { InsumoConsumidoComponent } from './insumo-consumido.component';
import { InsumoConsumidoDetailComponent } from './insumo-consumido-detail.component';
import { InsumoConsumidoUpdateComponent } from './insumo-consumido-update.component';
import { InsumoConsumidoDeletePopupComponent } from './insumo-consumido-delete-dialog.component';
import { IInsumoConsumido } from 'app/shared/model/insumo-consumido.model';

@Injectable({ providedIn: 'root' })
export class InsumoConsumidoResolve implements Resolve<IInsumoConsumido> {
    constructor(private service: InsumoConsumidoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IInsumoConsumido> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<InsumoConsumido>) => response.ok),
                map((insumoConsumido: HttpResponse<InsumoConsumido>) => insumoConsumido.body)
            );
        }
        return of(new InsumoConsumido());
    }
}

export const insumoConsumidoRoute: Routes = [
    {
        path: '',
        component: InsumoConsumidoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'InsumoConsumidos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: InsumoConsumidoDetailComponent,
        resolve: {
            insumoConsumido: InsumoConsumidoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'InsumoConsumidos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: InsumoConsumidoUpdateComponent,
        resolve: {
            insumoConsumido: InsumoConsumidoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'InsumoConsumidos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: InsumoConsumidoUpdateComponent,
        resolve: {
            insumoConsumido: InsumoConsumidoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'InsumoConsumidos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const insumoConsumidoPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: InsumoConsumidoDeletePopupComponent,
        resolve: {
            insumoConsumido: InsumoConsumidoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'InsumoConsumidos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
