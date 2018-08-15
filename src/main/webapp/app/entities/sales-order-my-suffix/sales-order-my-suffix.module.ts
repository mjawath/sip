import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SipSharedModule } from 'app/shared';
import {
    SalesOrderMySuffixComponent,
    SalesOrderMySuffixDetailComponent,
    SalesOrderMySuffixUpdateComponent,
    SalesOrderMySuffixDeletePopupComponent,
    SalesOrderMySuffixDeleteDialogComponent,
    salesOrderRoute,
    salesOrderPopupRoute
} from './';

const ENTITY_STATES = [...salesOrderRoute, ...salesOrderPopupRoute];

@NgModule({
    imports: [SipSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        SalesOrderMySuffixComponent,
        SalesOrderMySuffixDetailComponent,
        SalesOrderMySuffixUpdateComponent,
        SalesOrderMySuffixDeleteDialogComponent,
        SalesOrderMySuffixDeletePopupComponent
    ],
    entryComponents: [
        SalesOrderMySuffixComponent,
        SalesOrderMySuffixUpdateComponent,
        SalesOrderMySuffixDeleteDialogComponent,
        SalesOrderMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SipSalesOrderMySuffixModule {}
