import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SalesOrderMySuffix } from 'app/shared/model/sales-order-my-suffix.model';
import { SalesOrderMySuffixService } from './sales-order-my-suffix.service';
import { SalesOrderMySuffixComponent } from './sales-order-my-suffix.component';
import { SalesOrderMySuffixDetailComponent } from './sales-order-my-suffix-detail.component';
import { SalesOrderMySuffixUpdateComponent } from './sales-order-my-suffix-update.component';
import { SalesOrderMySuffixDeletePopupComponent } from './sales-order-my-suffix-delete-dialog.component';
import { ISalesOrderMySuffix } from 'app/shared/model/sales-order-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class SalesOrderMySuffixResolve implements Resolve<ISalesOrderMySuffix> {
    constructor(private service: SalesOrderMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((salesOrder: HttpResponse<SalesOrderMySuffix>) => salesOrder.body));
        }
        return of(new SalesOrderMySuffix());
    }
}

export const salesOrderRoute: Routes = [
    {
        path: 'sales-order-my-suffix',
        component: SalesOrderMySuffixComponent,
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
        path: 'sales-order-my-suffix/:id/view',
        component: SalesOrderMySuffixDetailComponent,
        resolve: {
            salesOrder: SalesOrderMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SalesOrders'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'sales-order-my-suffix/new',
        component: SalesOrderMySuffixUpdateComponent,
        resolve: {
            salesOrder: SalesOrderMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SalesOrders'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'sales-order-my-suffix/:id/edit',
        component: SalesOrderMySuffixUpdateComponent,
        resolve: {
            salesOrder: SalesOrderMySuffixResolve
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
        path: 'sales-order-my-suffix/:id/delete',
        component: SalesOrderMySuffixDeletePopupComponent,
        resolve: {
            salesOrder: SalesOrderMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SalesOrders'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
