import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SKU } from 'app/shared/model/sku.model';
import { SKUService } from './sku.service';
import { SKUComponent } from './sku.component';
import { SKUDetailComponent } from './sku-detail.component';
import { SKUUpdateComponent } from './sku-update.component';
import { SKUDeletePopupComponent } from './sku-delete-dialog.component';
import { ISKU } from 'app/shared/model/sku.model';

@Injectable({ providedIn: 'root' })
export class SKUResolve implements Resolve<ISKU> {
    constructor(private service: SKUService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((sKU: HttpResponse<SKU>) => sKU.body));
        }
        return of(new SKU());
    }
}

export const sKURoute: Routes = [
    {
        path: 'sku',
        component: SKUComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'SKUS'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'sku/:id/view',
        component: SKUDetailComponent,
        resolve: {
            sKU: SKUResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SKUS'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'sku/new',
        component: SKUUpdateComponent,
        resolve: {
            sKU: SKUResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SKUS'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'sku/:id/edit',
        component: SKUUpdateComponent,
        resolve: {
            sKU: SKUResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SKUS'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const sKUPopupRoute: Routes = [
    {
        path: 'sku/:id/delete',
        component: SKUDeletePopupComponent,
        resolve: {
            sKU: SKUResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SKUS'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
