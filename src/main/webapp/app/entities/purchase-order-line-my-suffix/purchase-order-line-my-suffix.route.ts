import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PurchaseOrderLineMySuffix } from 'app/shared/model/purchase-order-line-my-suffix.model';
import { PurchaseOrderLineMySuffixService } from './purchase-order-line-my-suffix.service';
import { PurchaseOrderLineMySuffixComponent } from './purchase-order-line-my-suffix.component';
import { PurchaseOrderLineMySuffixDetailComponent } from './purchase-order-line-my-suffix-detail.component';
import { PurchaseOrderLineMySuffixUpdateComponent } from './purchase-order-line-my-suffix-update.component';
import { PurchaseOrderLineMySuffixDeletePopupComponent } from './purchase-order-line-my-suffix-delete-dialog.component';
import { IPurchaseOrderLineMySuffix } from 'app/shared/model/purchase-order-line-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class PurchaseOrderLineMySuffixResolve implements Resolve<IPurchaseOrderLineMySuffix> {
    constructor(private service: PurchaseOrderLineMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((purchaseOrderLine: HttpResponse<PurchaseOrderLineMySuffix>) => purchaseOrderLine.body));
        }
        return of(new PurchaseOrderLineMySuffix());
    }
}

export const purchaseOrderLineRoute: Routes = [
    {
        path: 'purchase-order-line-my-suffix',
        component: PurchaseOrderLineMySuffixComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'PurchaseOrderLines'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'purchase-order-line-my-suffix/:id/view',
        component: PurchaseOrderLineMySuffixDetailComponent,
        resolve: {
            purchaseOrderLine: PurchaseOrderLineMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PurchaseOrderLines'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'purchase-order-line-my-suffix/new',
        component: PurchaseOrderLineMySuffixUpdateComponent,
        resolve: {
            purchaseOrderLine: PurchaseOrderLineMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PurchaseOrderLines'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'purchase-order-line-my-suffix/:id/edit',
        component: PurchaseOrderLineMySuffixUpdateComponent,
        resolve: {
            purchaseOrderLine: PurchaseOrderLineMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PurchaseOrderLines'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const purchaseOrderLinePopupRoute: Routes = [
    {
        path: 'purchase-order-line-my-suffix/:id/delete',
        component: PurchaseOrderLineMySuffixDeletePopupComponent,
        resolve: {
            purchaseOrderLine: PurchaseOrderLineMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PurchaseOrderLines'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
