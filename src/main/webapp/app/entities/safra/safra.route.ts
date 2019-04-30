import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Safra } from 'app/shared/model/safra.model';
import { SafraService } from './safra.service';
import { SafraComponent } from './safra.component';
import { SafraDetailComponent } from './safra-detail.component';
import { SafraUpdateComponent } from './safra-update.component';
import { SafraDeletePopupComponent } from './safra-delete-dialog.component';
import { ISafra } from 'app/shared/model/safra.model';

@Injectable({ providedIn: 'root' })
export class SafraResolve implements Resolve<ISafra> {
    constructor(private service: SafraService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISafra> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Safra>) => response.ok),
                map((safra: HttpResponse<Safra>) => safra.body)
            );
        }
        return of(new Safra());
    }
}

export const safraRoute: Routes = [
    {
        path: '',
        component: SafraComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Safras'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: SafraDetailComponent,
        resolve: {
            safra: SafraResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Safras'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: SafraUpdateComponent,
        resolve: {
            safra: SafraResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Safras'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: SafraUpdateComponent,
        resolve: {
            safra: SafraResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Safras'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const safraPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: SafraDeletePopupComponent,
        resolve: {
            safra: SafraResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Safras'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
