import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISalesOrderLineMySuffix } from 'app/shared/model/sales-order-line-my-suffix.model';

@Component({
    selector: 'jhi-sales-order-line-my-suffix-detail',
    templateUrl: './sales-order-line-my-suffix-detail.component.html'
})
export class SalesOrderLineMySuffixDetailComponent implements OnInit {
    salesOrderLine: ISalesOrderLineMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ salesOrderLine }) => {
            this.salesOrderLine = salesOrderLine;
        });
    }

    previousState() {
        window.history.back();
    }
}
