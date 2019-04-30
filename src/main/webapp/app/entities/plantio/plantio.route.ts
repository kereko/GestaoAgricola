import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Plantio } from 'app/shared/model/plantio.model';
import { PlantioService } from './plantio.service';
import { PlantioComponent } from './plantio.component';
import { PlantioDetailComponent } from './plantio-detail.component';
import { PlantioUpdateComponent } from './plantio-update.component';
import { PlantioDeletePopupComponent } from './plantio-delete-dialog.component';
import { IPlantio } from 'app/shared/model/plantio.model';

@Injectable({ providedIn: 'root' })
export class PlantioResolve implements Resolve<IPlantio> {
    constructor(private service: PlantioService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPlantio> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Plantio>) => response.ok),
                map((plantio: HttpResponse<Plantio>) => plantio.body)
            );
        }
        return of(new Plantio());
    }
}

export const plantioRoute: Routes = [
    {
        path: '',
        component: PlantioComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Plantios'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: PlantioDetailComponent,
        resolve: {
            plantio: PlantioResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Plantios'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: PlantioUpdateComponent,
        resolve: {
            plantio: PlantioResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Plantios'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: PlantioUpdateComponent,
        resolve: {
            plantio: PlantioResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Plantios'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const plantioPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: PlantioDeletePopupComponent,
        resolve: {
            plantio: PlantioResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Plantios'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
