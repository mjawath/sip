import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SKUMySuffix } from 'app/shared/model/sku-my-suffix.model';
import { SKUMySuffixService } from './sku-my-suffix.service';
import { SKUMySuffixComponent } from './sku-my-suffix.component';
import { SKUMySuffixDetailComponent } from './sku-my-suffix-detail.component';
import { SKUMySuffixUpdateComponent } from './sku-my-suffix-update.component';
import { SKUMySuffixDeletePopupComponent } from './sku-my-suffix-delete-dialog.component';
import { ISKUMySuffix } from 'app/shared/model/sku-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class SKUMySuffixResolve implements Resolve<ISKUMySuffix> {
    constructor(private service: SKUMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((sKU: HttpResponse<SKUMySuffix>) => sKU.body));
        }
        return of(new SKUMySuffix());
    }
}

export const sKURoute: Routes = [
    {
        path: 'sku-my-suffix',
        component: SKUMySuffixComponent,
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
        path: 'sku-my-suffix/:id/view',
        component: SKUMySuffixDetailComponent,
        resolve: {
            sKU: SKUMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SKUS'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'sku-my-suffix/new',
        component: SKUMySuffixUpdateComponent,
        resolve: {
            sKU: SKUMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SKUS'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'sku-my-suffix/:id/edit',
        component: SKUMySuffixUpdateComponent,
        resolve: {
            sKU: SKUMySuffixResolve
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
        path: 'sku-my-suffix/:id/delete',
        component: SKUMySuffixDeletePopupComponent,
        resolve: {
            sKU: SKUMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SKUS'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
