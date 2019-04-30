import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Insumo } from 'app/shared/model/insumo.model';
import { InsumoService } from './insumo.service';
import { InsumoComponent } from './insumo.component';
import { InsumoDetailComponent } from './insumo-detail.component';
import { InsumoUpdateComponent } from './insumo-update.component';
import { InsumoDeletePopupComponent } from './insumo-delete-dialog.component';
import { IInsumo } from 'app/shared/model/insumo.model';

@Injectable({ providedIn: 'root' })
export class InsumoResolve implements Resolve<IInsumo> {
    constructor(private service: InsumoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IInsumo> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Insumo>) => response.ok),
                map((insumo: HttpResponse<Insumo>) => insumo.body)
            );
        }
        return of(new Insumo());
    }
}

export const insumoRoute: Routes = [
    {
        path: '',
        component: InsumoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Insumos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: InsumoDetailComponent,
        resolve: {
            insumo: InsumoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Insumos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: InsumoUpdateComponent,
        resolve: {
            insumo: InsumoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Insumos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: InsumoUpdateComponent,
        resolve: {
            insumo: InsumoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Insumos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const insumoPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: InsumoDeletePopupComponent,
        resolve: {
            insumo: InsumoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Insumos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
