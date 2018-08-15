import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IPurchaseOrderMySuffix } from 'app/shared/model/purchase-order-my-suffix.model';
import { PurchaseOrderMySuffixService } from './purchase-order-my-suffix.service';

@Component({
    selector: 'jhi-purchase-order-my-suffix-update',
    templateUrl: './purchase-order-my-suffix-update.component.html'
})
export class PurchaseOrderMySuffixUpdateComponent implements OnInit {
    private _purchaseOrder: IPurchaseOrderMySuffix;
    isSaving: boolean;

    constructor(private purchaseOrderService: PurchaseOrderMySuffixService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ purchaseOrder }) => {
            this.purchaseOrder = purchaseOrder;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.purchaseOrder.id !== undefined) {
            this.subscribeToSaveResponse(this.purchaseOrderService.update(this.purchaseOrder));
        } else {
            this.subscribeToSaveResponse(this.purchaseOrderService.create(this.purchaseOrder));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPurchaseOrderMySuffix>>) {
        result.subscribe(
            (res: HttpResponse<IPurchaseOrderMySuffix>) => this.onSaveSuccess(),
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
    get purchaseOrder() {
        return this._purchaseOrder;
    }

    set purchaseOrder(purchaseOrder: IPurchaseOrderMySuffix) {
        this._purchaseOrder = purchaseOrder;
    }
}
