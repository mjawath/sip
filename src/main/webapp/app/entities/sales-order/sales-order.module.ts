import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SipSharedModule } from 'app/shared';
import {
    SalesOrderComponent,
    SalesOrderDetailComponent,
    SalesOrderUpdateComponent,
    SalesOrderDeletePopupComponent,
    SalesOrderDeleteDialogComponent,
    salesOrderRoute,
    salesOrderPopupRoute
} from './';

const ENTITY_STATES = [...salesOrderRoute, ...salesOrderPopupRoute];

@NgModule({
    imports: [SipSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        SalesOrderComponent,
        SalesOrderDetailComponent,
        SalesOrderUpdateComponent,
        SalesOrderDeleteDialogComponent,
        SalesOrderDeletePopupComponent
    ],
    entryComponents: [SalesOrderComponent, SalesOrderUpdateComponent, SalesOrderDeleteDialogComponent, SalesOrderDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SipSalesOrderModule {}
