import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Cultura } from 'app/shared/model/cultura.model';
import { CulturaService } from './cultura.service';
import { CulturaComponent } from './cultura.component';
import { CulturaDetailComponent } from './cultura-detail.component';
import { CulturaUpdateComponent } from './cultura-update.component';
import { CulturaDeletePopupComponent } from './cultura-delete-dialog.component';
import { ICultura } from 'app/shared/model/cultura.model';

@Injectable({ providedIn: 'root' })
export class CulturaResolve implements Resolve<ICultura> {
    constructor(private service: CulturaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICultura> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Cultura>) => response.ok),
                map((cultura: HttpResponse<Cultura>) => cultura.body)
            );
        }
        return of(new Cultura());
    }
}

export const culturaRoute: Routes = [
    {
        path: '',
        component: CulturaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Culturas'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: CulturaDetailComponent,
        resolve: {
            cultura: CulturaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Culturas'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: CulturaUpdateComponent,
        resolve: {
            cultura: CulturaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Culturas'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: CulturaUpdateComponent,
        resolve: {
            cultura: CulturaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Culturas'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const culturaPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: CulturaDeletePopupComponent,
        resolve: {
            cultura: CulturaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Culturas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
