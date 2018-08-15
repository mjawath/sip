import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SipSharedModule } from 'app/shared';
import {
    PurchaseOrderLineMySuffixComponent,
    PurchaseOrderLineMySuffixDetailComponent,
    PurchaseOrderLineMySuffixUpdateComponent,
    PurchaseOrderLineMySuffixDeletePopupComponent,
    PurchaseOrderLineMySuffixDeleteDialogComponent,
    purchaseOrderLineRoute,
    purchaseOrderLinePopupRoute
} from './';

const ENTITY_STATES = [...purchaseOrderLineRoute, ...purchaseOrderLinePopupRoute];

@NgModule({
    imports: [SipSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PurchaseOrderLineMySuffixComponent,
        PurchaseOrderLineMySuffixDetailComponent,
        PurchaseOrderLineMySuffixUpdateComponent,
        PurchaseOrderLineMySuffixDeleteDialogComponent,
        PurchaseOrderLineMySuffixDeletePopupComponent
    ],
    entryComponents: [
        PurchaseOrderLineMySuffixComponent,
        PurchaseOrderLineMySuffixUpdateComponent,
        PurchaseOrderLineMySuffixDeleteDialogComponent,
        PurchaseOrderLineMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SipPurchaseOrderLineMySuffixModule {}
