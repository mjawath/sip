import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ISKU } from 'app/shared/model/sku.model';
import { SKUService } from './sku.service';
import { IItem } from 'app/shared/model/item.model';
import { ItemService } from 'app/entities/item';

@Component({
    selector: 'jhi-sku-update',
    templateUrl: './sku-update.component.html'
})
export class SKUUpdateComponent implements OnInit {
    private _sKU: ISKU;
    isSaving: boolean;

    items: IItem[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private sKUService: SKUService,
        private itemService: ItemService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ sKU }) => {
            this.sKU = sKU;
        });
        this.itemService.query().subscribe(
            (res: HttpResponse<IItem[]>) => {
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

    private subscribeToSaveResponse(result: Observable<HttpResponse<ISKU>>) {
        result.subscribe((res: HttpResponse<ISKU>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackItemById(index: number, item: IItem) {
        return item.id;
    }
    get sKU() {
        return this._sKU;
    }

    set sKU(sKU: ISKU) {
        this._sKU = sKU;
    }
}
