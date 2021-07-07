import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SipCategoryModule } from './category/category.module';
import { SipItemModule } from './item/item.module';
import { SipSKUModule } from './sku/sku.module';
import { SipSalesOrderModule } from './sales-order/sales-order.module';
import { SipPurchaseOrderModule } from './purchase-order/purchase-order.module';
import { SipSalesOrderLineModule } from './sales-order-line/sales-order-line.module';
import { SipPurchaseOrderLineModule } from './purchase-order-line/purchase-order-line.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        SipCategoryModule,
        SipItemModule,
        SipSKUModule,
        SipSalesOrderModule,
        SipPurchaseOrderModule,
        SipSalesOrderLineModule,
        SipPurchaseOrderLineModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SipEntityModule {}
