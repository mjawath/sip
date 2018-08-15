import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPurchaseOrderLineMySuffix } from 'app/shared/model/purchase-order-line-my-suffix.model';

@Component({
    selector: 'jhi-purchase-order-line-my-suffix-detail',
    templateUrl: './purchase-order-line-my-suffix-detail.component.html'
})
export class PurchaseOrderLineMySuffixDetailComponent implements OnInit {
    purchaseOrderLine: IPurchaseOrderLineMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ purchaseOrderLine }) => {
            this.purchaseOrderLine = purchaseOrderLine;
        });
    }

    previousState() {
        window.history.back();
    }
}
