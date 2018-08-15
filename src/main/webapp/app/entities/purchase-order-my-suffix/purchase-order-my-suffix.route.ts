import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PurchaseOrderMySuffix } from 'app/shared/model/purchase-order-my-suffix.model';
import { PurchaseOrderMySuffixService } from './purchase-order-my-suffix.service';
import { PurchaseOrderMySuffixComponent } from './purchase-order-my-suffix.component';
import { PurchaseOrderMySuffixDetailComponent } from './purchase-order-my-suffix-detail.component';
import { PurchaseOrderMySuffixUpdateComponent } from './purchase-order-my-suffix-update.component';
import { PurchaseOrderMySuffixDeletePopupComponent } from './purchase-order-my-suffix-delete-dialog.component';
import { IPurchaseOrderMySuffix } from 'app/shared/model/purchase-order-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class PurchaseOrderMySuffixResolve implements Resolve<IPurchaseOrderMySuffix> {
    constructor(private service: PurchaseOrderMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((purchaseOrder: HttpResponse<PurchaseOrderMySuffix>) => purchaseOrder.body));
        }
        return of(new PurchaseOrderMySuffix());
    }
}

export const purchaseOrderRoute: Routes = [
    {
        path: 'purchase-order-my-suffix',
        component: PurchaseOrderMySuffixComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'PurchaseOrders'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'purchase-order-my-suffix/:id/view',
        component: PurchaseOrderMySuffixDetailComponent,
        resolve: {
            purchaseOrder: PurchaseOrderMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PurchaseOrders'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'purchase-order-my-suffix/new',
        component: PurchaseOrderMySuffixUpdateComponent,
        resolve: {
            purchaseOrder: PurchaseOrderMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PurchaseOrders'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'purchase-order-my-suffix/:id/edit',
        component: PurchaseOrderMySuffixUpdateComponent,
        resolve: {
            purchaseOrder: PurchaseOrderMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PurchaseOrders'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const purchaseOrderPopupRoute: Routes = [
    {
        path: 'purchase-order-my-suffix/:id/delete',
        component: PurchaseOrderMySuffixDeletePopupComponent,
        resolve: {
            purchaseOrder: PurchaseOrderMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PurchaseOrders'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
