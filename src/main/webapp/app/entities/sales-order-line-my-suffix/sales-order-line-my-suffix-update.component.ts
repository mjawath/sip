import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ISalesOrderLineMySuffix } from 'app/shared/model/sales-order-line-my-suffix.model';
import { SalesOrderLineMySuffixService } from './sales-order-line-my-suffix.service';
import { ISalesOrderMySuffix } from 'app/shared/model/sales-order-my-suffix.model';
import { SalesOrderMySuffixService } from 'app/entities/sales-order-my-suffix';
import { ISKUMySuffix } from 'app/shared/model/sku-my-suffix.model';
import { SKUMySuffixService } from 'app/entities/sku-my-suffix';

@Component({
    selector: 'jhi-sales-order-line-my-suffix-update',
    templateUrl: './sales-order-line-my-suffix-update.component.html'
})
export class SalesOrderLineMySuffixUpdateComponent implements OnInit {
    private _salesOrderLine: ISalesOrderLineMySuffix;
    isSaving: boolean;

    salesorders: ISalesOrderMySuffix[];

    skus: ISKUMySuffix[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private salesOrderLineService: SalesOrderLineMySuffixService,
        private salesOrderService: SalesOrderMySuffixService,
        private sKUService: SKUMySuffixService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ salesOrderLine }) => {
            this.salesOrderLine = salesOrderLine;
        });
        this.salesOrderService.query().subscribe(
            (res: HttpResponse<ISalesOrderMySuffix[]>) => {
                this.salesorders = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.sKUService.query().subscribe(
            (res: HttpResponse<ISKUMySuffix[]>) => {
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

    private subscribeToSaveResponse(result: Observable<HttpResponse<ISalesOrderLineMySuffix>>) {
        result.subscribe(
            (res: HttpResponse<ISalesOrderLineMySuffix>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
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

    trackSalesOrderById(index: number, item: ISalesOrderMySuffix) {
        return item.id;
    }

    trackSKUById(index: number, item: ISKUMySuffix) {
        return item.id;
    }
    get salesOrderLine() {
        return this._salesOrderLine;
    }

    set salesOrderLine(salesOrderLine: ISalesOrderLineMySuffix) {
        this._salesOrderLine = salesOrderLine;
    }
}
