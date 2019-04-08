import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SalesOrder } from 'app/shared/model/sales-order.model';
import { SalesOrderService } from './sales-order.service';
import { SalesOrderComponent } from './sales-order.component';
import { SalesOrderDetailComponent } from './sales-order-detail.component';
import { SalesOrderUpdateComponent } from './sales-order-update.component';
import { SalesOrderDeletePopupComponent } from './sales-order-delete-dialog.component';
import { ISalesOrder } from 'app/shared/model/sales-order.model';

@Injectable({ providedIn: 'root' })
export class SalesOrderResolve implements Resolve<ISalesOrder> {
    constructor(private service: SalesOrderService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((salesOrder: HttpResponse<SalesOrder>) => salesOrder.body));
        }
        return of(new SalesOrder());
    }
}

export const salesOrderRoute: Routes = [
    {
        path: 'sales-order',
        component: SalesOrderComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'SalesOrders'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'sales-order/:id/view',
        component: SalesOrderDetailComponent,
        resolve: {
            salesOrder: SalesOrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SalesOrders'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'sales-order/new',
        component: SalesOrderUpdateComponent,
        resolve: {
            salesOrder: SalesOrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SalesOrders'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'sales-order/:id/edit',
        component: SalesOrderUpdateComponent,
        resolve: {
            salesOrder: SalesOrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SalesOrders'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const salesOrderPopupRoute: Routes = [
    {
        path: 'sales-order/:id/delete',
        component: SalesOrderDeletePopupComponent,
        resolve: {
            salesOrder: SalesOrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SalesOrders'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
