import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ISalesOrderMySuffix } from 'app/shared/model/sales-order-my-suffix.model';
import { SalesOrderMySuffixService } from './sales-order-my-suffix.service';

@Component({
    selector: 'jhi-sales-order-my-suffix-update',
    templateUrl: './sales-order-my-suffix-update.component.html'
})
export class SalesOrderMySuffixUpdateComponent implements OnInit {
    private _salesOrder: ISalesOrderMySuffix;
    isSaving: boolean;

    constructor(private salesOrderService: SalesOrderMySuffixService, private activatedRoute: ActivatedRoute) {}

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

    private subscribeToSaveResponse(result: Observable<HttpResponse<ISalesOrderMySuffix>>) {
        result.subscribe((res: HttpResponse<ISalesOrderMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    set salesOrder(salesOrder: ISalesOrderMySuffix) {
        this._salesOrder = salesOrder;
    }
}
