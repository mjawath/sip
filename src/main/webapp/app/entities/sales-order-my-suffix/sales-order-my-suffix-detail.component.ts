import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISalesOrderMySuffix } from 'app/shared/model/sales-order-my-suffix.model';

@Component({
    selector: 'jhi-sales-order-my-suffix-detail',
    templateUrl: './sales-order-my-suffix-detail.component.html'
})
export class SalesOrderMySuffixDetailComponent implements OnInit {
    salesOrder: ISalesOrderMySuffix;

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
