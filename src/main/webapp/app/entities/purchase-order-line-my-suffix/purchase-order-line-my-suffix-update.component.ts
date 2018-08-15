import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IPurchaseOrderLineMySuffix } from 'app/shared/model/purchase-order-line-my-suffix.model';
import { PurchaseOrderLineMySuffixService } from './purchase-order-line-my-suffix.service';
import { IPurchaseOrderMySuffix } from 'app/shared/model/purchase-order-my-suffix.model';
import { PurchaseOrderMySuffixService } from 'app/entities/purchase-order-my-suffix';
import { ISKUMySuffix } from 'app/shared/model/sku-my-suffix.model';
import { SKUMySuffixService } from 'app/entities/sku-my-suffix';

@Component({
    selector: 'jhi-purchase-order-line-my-suffix-update',
    templateUrl: './purchase-order-line-my-suffix-update.component.html'
})
export class PurchaseOrderLineMySuffixUpdateComponent implements OnInit {
    private _purchaseOrderLine: IPurchaseOrderLineMySuffix;
    isSaving: boolean;

    purchaseorders: IPurchaseOrderMySuffix[];

    skus: ISKUMySuffix[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private purchaseOrderLineService: PurchaseOrderLineMySuffixService,
        private purchaseOrderService: PurchaseOrderMySuffixService,
        private sKUService: SKUMySuffixService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ purchaseOrderLine }) => {
            this.purchaseOrderLine = purchaseOrderLine;
        });
        this.purchaseOrderService.query().subscribe(
            (res: HttpResponse<IPurchaseOrderMySuffix[]>) => {
                this.purchaseorders = res.body;
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
        if (this.purchaseOrderLine.id !== undefined) {
            this.subscribeToSaveResponse(this.purchaseOrderLineService.update(this.purchaseOrderLine));
        } else {
            this.subscribeToSaveResponse(this.purchaseOrderLineService.create(this.purchaseOrderLine));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPurchaseOrderLineMySuffix>>) {
        result.subscribe(
            (res: HttpResponse<IPurchaseOrderLineMySuffix>) => this.onSaveSuccess(),
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

    trackPurchaseOrderById(index: number, item: IPurchaseOrderMySuffix) {
        return item.id;
    }

    trackSKUById(index: number, item: ISKUMySuffix) {
        return item.id;
    }
    get purchaseOrderLine() {
        return this._purchaseOrderLine;
    }

    set purchaseOrderLine(purchaseOrderLine: IPurchaseOrderLineMySuffix) {
        this._purchaseOrderLine = purchaseOrderLine;
    }
}
