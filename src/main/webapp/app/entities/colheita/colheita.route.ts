import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Colheita } from 'app/shared/model/colheita.model';
import { ColheitaService } from './colheita.service';
import { ColheitaComponent } from './colheita.component';
import { ColheitaDetailComponent } from './colheita-detail.component';
import { ColheitaUpdateComponent } from './colheita-update.component';
import { ColheitaDeletePopupComponent } from './colheita-delete-dialog.component';
import { IColheita } from 'app/shared/model/colheita.model';

@Injectable({ providedIn: 'root' })
export class ColheitaResolve implements Resolve<IColheita> {
    constructor(private service: ColheitaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IColheita> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Colheita>) => response.ok),
                map((colheita: HttpResponse<Colheita>) => colheita.body)
            );
        }
        return of(new Colheita());
    }
}

export const colheitaRoute: Routes = [
    {
        path: '',
        component: ColheitaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Colheitas'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: ColheitaDetailComponent,
        resolve: {
            colheita: ColheitaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Colheitas'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: ColheitaUpdateComponent,
        resolve: {
            colheita: ColheitaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Colheitas'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: ColheitaUpdateComponent,
        resolve: {
            colheita: ColheitaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Colheitas'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const colheitaPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: ColheitaDeletePopupComponent,
        resolve: {
            colheita: ColheitaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Colheitas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
