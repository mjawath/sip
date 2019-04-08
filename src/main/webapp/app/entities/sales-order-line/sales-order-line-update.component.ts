import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ISalesOrderLine } from 'app/shared/model/sales-order-line.model';
import { SalesOrderLineService } from './sales-order-line.service';
import { ISalesOrder } from 'app/shared/model/sales-order.model';
import { SalesOrderService } from 'app/entities/sales-order';
import { ISKU } from 'app/shared/model/sku.model';
import { SKUService } from 'app/entities/sku';

@Component({
    selector: 'jhi-sales-order-line-update',
    templateUrl: './sales-order-line-update.component.html'
})
export class SalesOrderLineUpdateComponent implements OnInit {
    private _salesOrderLine: ISalesOrderLine;
    isSaving: boolean;

    salesorders: ISalesOrder[];

    skus: ISKU[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private salesOrderLineService: SalesOrderLineService,
        private salesOrderService: SalesOrderService,
        private sKUService: SKUService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ salesOrderLine }) => {
            this.salesOrderLine = salesOrderLine;
        });
        this.salesOrderService.query().subscribe(
            (res: HttpResponse<ISalesOrder[]>) => {
                this.salesorders = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.sKUService.query().subscribe(
            (res: HttpResponse<ISKU[]>) => {
                this.skus = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.salesOrderLine.id !== undefined) {
            this.subscribeToSaveResponse(this.salesOrderLineService.update(this.salesOrderLine));
        } else {
            this.subscribeToSaveResponse(this.salesOrderLineService.create(this.salesOrderLine));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ISalesOrderLine>>) {
        result.subscribe((res: HttpResponse<ISalesOrderLine>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackSalesOrderById(index: number, item: ISalesOrder) {
        return item.id;
    }

    trackSKUById(index: number, item: ISKU) {
        return item.id;
    }
    get salesOrderLine() {
        return this._salesOrderLine;
    }

    set salesOrderLine(salesOrderLine: ISalesOrderLine) {
        this._salesOrderLine = salesOrderLine;
    }
}
