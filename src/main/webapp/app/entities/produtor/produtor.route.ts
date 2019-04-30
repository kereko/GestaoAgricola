import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Produtor } from 'app/shared/model/produtor.model';
import { ProdutorService } from './produtor.service';
import { ProdutorComponent } from './produtor.component';
import { ProdutorDetailComponent } from './produtor-detail.component';
import { ProdutorUpdateComponent } from './produtor-update.component';
import { ProdutorDeletePopupComponent } from './produtor-delete-dialog.component';
import { IProdutor } from 'app/shared/model/produtor.model';

@Injectable({ providedIn: 'root' })
export class ProdutorResolve implements Resolve<IProdutor> {
    constructor(private service: ProdutorService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProdutor> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Produtor>) => response.ok),
                map((produtor: HttpResponse<Produtor>) => produtor.body)
            );
        }
        return of(new Produtor());
    }
}

export const produtorRoute: Routes = [
    {
        path: '',
        component: ProdutorComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Produtors'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: ProdutorDetailComponent,
        resolve: {
            produtor: ProdutorResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Produtors'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: ProdutorUpdateComponent,
        resolve: {
            produtor: ProdutorResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Produtors'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: ProdutorUpdateComponent,
        resolve: {
            produtor: ProdutorResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Produtors'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const produtorPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: ProdutorDeletePopupComponent,
        resolve: {
            produtor: ProdutorResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Produtors'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
