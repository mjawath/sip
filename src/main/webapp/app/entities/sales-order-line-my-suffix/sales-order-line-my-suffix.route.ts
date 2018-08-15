import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SalesOrderLineMySuffix } from 'app/shared/model/sales-order-line-my-suffix.model';
import { SalesOrderLineMySuffixService } from './sales-order-line-my-suffix.service';
import { SalesOrderLineMySuffixComponent } from './sales-order-line-my-suffix.component';
import { SalesOrderLineMySuffixDetailComponent } from './sales-order-line-my-suffix-detail.component';
import { SalesOrderLineMySuffixUpdateComponent } from './sales-order-line-my-suffix-update.component';
import { SalesOrderLineMySuffixDeletePopupComponent } from './sales-order-line-my-suffix-delete-dialog.component';
import { ISalesOrderLineMySuffix } from 'app/shared/model/sales-order-line-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class SalesOrderLineMySuffixResolve implements Resolve<ISalesOrderLineMySuffix> {
    constructor(private service: SalesOrderLineMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((salesOrderLine: HttpResponse<SalesOrderLineMySuffix>) => salesOrderLine.body));
        }
        return of(new SalesOrderLineMySuffix());
    }
}

export const salesOrderLineRoute: Routes = [
    {
        path: 'sales-order-line-my-suffix',
        component: SalesOrderLineMySuffixComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'SalesOrderLines'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'sales-order-line-my-suffix/:id/view',
        component: SalesOrderLineMySuffixDetailComponent,
        resolve: {
            salesOrderLine: SalesOrderLineMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SalesOrderLines'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'sales-order-line-my-suffix/new',
        component: SalesOrderLineMySuffixUpdateComponent,
        resolve: {
            salesOrderLine: SalesOrderLineMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SalesOrderLines'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'sales-order-line-my-suffix/:id/edit',
        component: SalesOrderLineMySuffixUpdateComponent,
        resolve: {
            salesOrderLine: SalesOrderLineMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SalesOrderLines'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const salesOrderLinePopupRoute: Routes = [
    {
        path: 'sales-order-line-my-suffix/:id/delete',
        component: SalesOrderLineMySuffixDeletePopupComponent,
        resolve: {
            salesOrderLine: SalesOrderLineMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SalesOrderLines'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
