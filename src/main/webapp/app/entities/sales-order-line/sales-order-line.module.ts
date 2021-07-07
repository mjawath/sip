import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SipSharedModule } from 'app/shared';
import {
    SalesOrderLineComponent,
    SalesOrderLineDetailComponent,
    SalesOrderLineUpdateComponent,
    SalesOrderLineDeletePopupComponent,
    SalesOrderLineDeleteDialogComponent,
    salesOrderLineRoute,
    salesOrderLinePopupRoute
} from './';

const ENTITY_STATES = [...salesOrderLineRoute, ...salesOrderLinePopupRoute];

@NgModule({
    imports: [SipSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        SalesOrderLineComponent,
        SalesOrderLineDetailComponent,
        SalesOrderLineUpdateComponent,
        SalesOrderLineDeleteDialogComponent,
        SalesOrderLineDeletePopupComponent
    ],
    entryComponents: [
        SalesOrderLineComponent,
        SalesOrderLineUpdateComponent,
        SalesOrderLineDeleteDialogComponent,
        SalesOrderLineDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SipSalesOrderLineModule {}
