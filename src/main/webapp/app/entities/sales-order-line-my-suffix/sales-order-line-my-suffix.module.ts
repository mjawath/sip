import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SipSharedModule } from 'app/shared';
import {
    SalesOrderLineMySuffixComponent,
    SalesOrderLineMySuffixDetailComponent,
    SalesOrderLineMySuffixUpdateComponent,
    SalesOrderLineMySuffixDeletePopupComponent,
    SalesOrderLineMySuffixDeleteDialogComponent,
    salesOrderLineRoute,
    salesOrderLinePopupRoute
} from './';

const ENTITY_STATES = [...salesOrderLineRoute, ...salesOrderLinePopupRoute];

@NgModule({
    imports: [SipSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        SalesOrderLineMySuffixComponent,
        SalesOrderLineMySuffixDetailComponent,
        SalesOrderLineMySuffixUpdateComponent,
        SalesOrderLineMySuffixDeleteDialogComponent,
        SalesOrderLineMySuffixDeletePopupComponent
    ],
    entryComponents: [
        SalesOrderLineMySuffixComponent,
        SalesOrderLineMySuffixUpdateComponent,
        SalesOrderLineMySuffixDeleteDialogComponent,
        SalesOrderLineMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SipSalesOrderLineMySuffixModule {}
