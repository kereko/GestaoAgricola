import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Talhao } from 'app/shared/model/talhao.model';
import { TalhaoService } from './talhao.service';
import { TalhaoComponent } from './talhao.component';
import { TalhaoDetailComponent } from './talhao-detail.component';
import { TalhaoUpdateComponent } from './talhao-update.component';
import { TalhaoDeletePopupComponent } from './talhao-delete-dialog.component';
import { ITalhao } from 'app/shared/model/talhao.model';

@Injectable({ providedIn: 'root' })
export class TalhaoResolve implements Resolve<ITalhao> {
    constructor(private service: TalhaoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITalhao> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Talhao>) => response.ok),
                map((talhao: HttpResponse<Talhao>) => talhao.body)
            );
        }
        return of(new Talhao());
    }
}

export const talhaoRoute: Routes = [
    {
        path: '',
        component: TalhaoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Talhaos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: TalhaoDetailComponent,
        resolve: {
            talhao: TalhaoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Talhaos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: TalhaoUpdateComponent,
        resolve: {
            talhao: TalhaoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Talhaos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: TalhaoUpdateComponent,
        resolve: {
            talhao: TalhaoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Talhaos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const talhaoPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: TalhaoDeletePopupComponent,
        resolve: {
            talhao: TalhaoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Talhaos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
