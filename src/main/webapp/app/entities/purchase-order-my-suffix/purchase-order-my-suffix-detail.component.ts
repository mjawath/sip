import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPurchaseOrderMySuffix } from 'app/shared/model/purchase-order-my-suffix.model';

@Component({
    selector: 'jhi-purchase-order-my-suffix-detail',
    templateUrl: './purchase-order-my-suffix-detail.component.html'
})
export class PurchaseOrderMySuffixDetailComponent implements OnInit {
    purchaseOrder: IPurchaseOrderMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ purchaseOrder }) => {
            this.purchaseOrder = purchaseOrder;
        });
    }

    previousState() {
        window.history.back();
    }
}
