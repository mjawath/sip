import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SipSharedModule } from 'app/shared';
import {
    PurchaseOrderLineComponent,
    PurchaseOrderLineDetailComponent,
    PurchaseOrderLineUpdateComponent,
    PurchaseOrderLineDeletePopupComponent,
    PurchaseOrderLineDeleteDialogComponent,
    purchaseOrderLineRoute,
    purchaseOrderLinePopupRoute
} from './';

const ENTITY_STATES = [...purchaseOrderLineRoute, ...purchaseOrderLinePopupRoute];

@NgModule({
    imports: [SipSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PurchaseOrderLineComponent,
        PurchaseOrderLineDetailComponent,
        PurchaseOrderLineUpdateComponent,
        PurchaseOrderLineDeleteDialogComponent,
        PurchaseOrderLineDeletePopupComponent
    ],
    entryComponents: [
        PurchaseOrderLineComponent,
        PurchaseOrderLineUpdateComponent,
        PurchaseOrderLineDeleteDialogComponent,
        PurchaseOrderLineDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SipPurchaseOrderLineModule {}
