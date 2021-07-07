import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISalesOrderLine } from 'app/shared/model/sales-order-line.model';

@Component({
    selector: 'jhi-sales-order-line-detail',
    templateUrl: './sales-order-line-detail.component.html'
})
export class SalesOrderLineDetailComponent implements OnInit {
    salesOrderLine: ISalesOrderLine;

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
