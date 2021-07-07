import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ISalesOrder } from 'app/shared/model/sales-order.model';
import { SalesOrderService } from './sales-order.service';

@Component({
    selector: 'jhi-sales-order-update',
    templateUrl: './sales-order-update.component.html'
})
export class SalesOrderUpdateComponent implements OnInit {
    private _salesOrder: ISalesOrder;
    isSaving: boolean;

    constructor(private salesOrderService: SalesOrderService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ salesOrder }) => {
            this.salesOrder = salesOrder;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.salesOrder.id !== undefined) {
            this.subscribeToSaveResponse(this.salesOrderService.update(this.salesOrder));
        } else {
            this.subscribeToSaveResponse(this.salesOrderService.create(this.salesOrder));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ISalesOrder>>) {
        result.subscribe((res: HttpResponse<ISalesOrder>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get salesOrder() {
        return this._salesOrder;
    }

    set salesOrder(salesOrder: ISalesOrder) {
        this._salesOrder = salesOrder;
    }
}
