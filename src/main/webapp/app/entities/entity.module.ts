import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SipCategoryMySuffixModule } from './category-my-suffix/category-my-suffix.module';
import { SipItemMySuffixModule } from './item-my-suffix/item-my-suffix.module';
import { SipSKUMySuffixModule } from './sku-my-suffix/sku-my-suffix.module';
import { SipSalesOrderMySuffixModule } from './sales-order-my-suffix/sales-order-my-suffix.module';
import { SipPurchaseOrderMySuffixModule } from './purchase-order-my-suffix/purchase-order-my-suffix.module';
import { SipSalesOrderLineMySuffixModule } from './sales-order-line-my-suffix/sales-order-line-my-suffix.module';
import { SipPurchaseOrderLineMySuffixModule } from './purchase-order-line-my-suffix/purchase-order-line-my-suffix.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        SipCategoryMySuffixModule,
        SipItemMySuffixModule,
        SipSKUMySuffixModule,
        SipSalesOrderMySuffixModule,
        SipPurchaseOrderMySuffixModule,
        SipSalesOrderLineMySuffixModule,
        SipPurchaseOrderLineMySuffixModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SipEntityModule {}
