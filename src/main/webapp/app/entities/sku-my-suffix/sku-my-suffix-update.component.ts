import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ISKUMySuffix } from 'app/shared/model/sku-my-suffix.model';
import { SKUMySuffixService } from './sku-my-suffix.service';
import { IItemMySuffix } from 'app/shared/model/item-my-suffix.model';
import { ItemMySuffixService } from 'app/entities/item-my-suffix';

@Component({
    selector: 'jhi-sku-my-suffix-update',
    templateUrl: './sku-my-suffix-update.component.html'
})
export class SKUMySuffixUpdateComponent implements OnInit {
    private _sKU: ISKUMySuffix;
    isSaving: boolean;

    items: IItemMySuffix[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private sKUService: SKUMySuffixService,
        private itemService: ItemMySuffixService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ sKU }) => {
            this.sKU = sKU;
        });
        this.itemService.query().subscribe(
            (res: HttpResponse<IItemMySuffix[]>) => {
                this.items = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.sKU.id !== undefined) {
            this.subscribeToSaveResponse(this.sKUService.update(this.sKU));
        } else {
            this.subscribeToSaveResponse(this.sKUService.create(this.sKU));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ISKUMySuffix>>) {
        result.subscribe((res: HttpResponse<ISKUMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackItemById(index: number, item: IItemMySuffix) {
        return item.id;
    }
    get sKU() {
        return this._sKU;
    }

    set sKU(sKU: ISKUMySuffix) {
        this._sKU = sKU;
    }
}
