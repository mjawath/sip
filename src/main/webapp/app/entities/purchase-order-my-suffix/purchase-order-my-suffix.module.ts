import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SipSharedModule } from 'app/shared';
import {
    PurchaseOrderMySuffixComponent,
    PurchaseOrderMySuffixDetailComponent,
    PurchaseOrderMySuffixUpdateComponent,
    PurchaseOrderMySuffixDeletePopupComponent,
    PurchaseOrderMySuffixDeleteDialogComponent,
    purchaseOrderRoute,
    purchaseOrderPopupRoute
} from './';

const ENTITY_STATES = [...purchaseOrderRoute, ...purchaseOrderPopupRoute];

@NgModule({
    imports: [SipSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PurchaseOrderMySuffixComponent,
        PurchaseOrderMySuffixDetailComponent,
        PurchaseOrderMySuffixUpdateComponent,
        PurchaseOrderMySuffixDeleteDialogComponent,
        PurchaseOrderMySuffixDeletePopupComponent
    ],
    entryComponents: [
        PurchaseOrderMySuffixComponent,
        PurchaseOrderMySuffixUpdateComponent,
        PurchaseOrderMySuffixDeleteDialogComponent,
        PurchaseOrderMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SipPurchaseOrderMySuffixModule {}
