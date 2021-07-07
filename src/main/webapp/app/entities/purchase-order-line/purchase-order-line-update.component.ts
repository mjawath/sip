import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IPurchaseOrderLine } from 'app/shared/model/purchase-order-line.model';
import { PurchaseOrderLineService } from './purchase-order-line.service';
import { IPurchaseOrder } from 'app/shared/model/purchase-order.model';
import { PurchaseOrderService } from 'app/entities/purchase-order';
import { ISKU } from 'app/shared/model/sku.model';
import { SKUService } from 'app/entities/sku';

@Component({
    selector: 'jhi-purchase-order-line-update',
    templateUrl: './purchase-order-line-update.component.html'
})
export class PurchaseOrderLineUpdateComponent implements OnInit {
    private _purchaseOrderLine: IPurchaseOrderLine;
    isSaving: boolean;

    purchaseorders: IPurchaseOrder[];

    skus: ISKU[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private purchaseOrderLineService: PurchaseOrderLineService,
        private purchaseOrderService: PurchaseOrderService,
        private sKUService: SKUService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ purchaseOrderLine }) => {
            this.purchaseOrderLine = purchaseOrderLine;
        });
        this.purchaseOrderService.query().subscribe(
            (res: HttpResponse<IPurchaseOrder[]>) => {
                this.purchaseorders = res.body;
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
        if (this.purchaseOrderLine.id !== undefined) {
            this.subscribeToSaveResponse(this.purchaseOrderLineService.update(this.purchaseOrderLine));
        } else {
            this.subscribeToSaveResponse(this.purchaseOrderLineService.create(this.purchaseOrderLine));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPurchaseOrderLine>>) {
        result.subscribe((res: HttpResponse<IPurchaseOrderLine>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackPurchaseOrderById(index: number, item: IPurchaseOrder) {
        return item.id;
    }

    trackSKUById(index: number, item: ISKU) {
        return item.id;
    }
    get purchaseOrderLine() {
        return this._purchaseOrderLine;
    }

    set purchaseOrderLine(purchaseOrderLine: IPurchaseOrderLine) {
        this._purchaseOrderLine = purchaseOrderLine;
    }
}
