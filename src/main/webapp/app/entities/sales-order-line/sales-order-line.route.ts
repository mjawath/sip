import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SalesOrderLine } from 'app/shared/model/sales-order-line.model';
import { SalesOrderLineService } from './sales-order-line.service';
import { SalesOrderLineComponent } from './sales-order-line.component';
import { SalesOrderLineDetailComponent } from './sales-order-line-detail.component';
import { SalesOrderLineUpdateComponent } from './sales-order-line-update.component';
import { SalesOrderLineDeletePopupComponent } from './sales-order-line-delete-dialog.component';
import { ISalesOrderLine } from 'app/shared/model/sales-order-line.model';

@Injectable({ providedIn: 'root' })
export class SalesOrderLineResolve implements Resolve<ISalesOrderLine> {
    constructor(private service: SalesOrderLineService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((salesOrderLine: HttpResponse<SalesOrderLine>) => salesOrderLine.body));
        }
        return of(new SalesOrderLine());
    }
}

export const salesOrderLineRoute: Routes = [
    {
        path: 'sales-order-line',
        component: SalesOrderLineComponent,
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
        path: 'sales-order-line/:id/view',
        component: SalesOrderLineDetailComponent,
        resolve: {
            salesOrderLine: SalesOrderLineResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SalesOrderLines'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'sales-order-line/new',
        component: SalesOrderLineUpdateComponent,
        resolve: {
            salesOrderLine: SalesOrderLineResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SalesOrderLines'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'sales-order-line/:id/edit',
        component: SalesOrderLineUpdateComponent,
        resolve: {
            salesOrderLine: SalesOrderLineResolve
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
        path: 'sales-order-line/:id/delete',
        component: SalesOrderLineDeletePopupComponent,
        resolve: {
            salesOrderLine: SalesOrderLineResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SalesOrderLines'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
