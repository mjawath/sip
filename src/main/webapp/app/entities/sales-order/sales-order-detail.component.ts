import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISalesOrder } from 'app/shared/model/sales-order.model';

@Component({
    selector: 'jhi-sales-order-detail',
    templateUrl: './sales-order-detail.component.html'
})
export class SalesOrderDetailComponent implements OnInit {
    salesOrder: ISalesOrder;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ salesOrder }) => {
            this.salesOrder = salesOrder;
        });
    }

    previousState() {
        window.history.back();
    }
}
