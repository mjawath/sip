import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IItemMySuffix } from 'app/shared/model/item-my-suffix.model';
import { ItemMySuffixService } from './item-my-suffix.service';
import { ICategoryMySuffix } from 'app/shared/model/category-my-suffix.model';
import { CategoryMySuffixService } from 'app/entities/category-my-suffix';

@Component({
    selector: 'jhi-item-my-suffix-update',
    templateUrl: './item-my-suffix-update.component.html'
})
export class ItemMySuffixUpdateComponent implements OnInit {
    private _item: IItemMySuffix;
    isSaving: boolean;

    categories: ICategoryMySuffix[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private itemService: ItemMySuffixService,
        private categoryService: CategoryMySuffixService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ item }) => {
            this.item = item;
        });
        this.categoryService.query().subscribe(
            (res: HttpResponse<ICategoryMySuffix[]>) => {
                this.categories = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.item.id !== undefined) {
            this.subscribeToSaveResponse(this.itemService.update(this.item));
        } else {
            this.subscribeToSaveResponse(this.itemService.create(this.item));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IItemMySuffix>>) {
        result.subscribe((res: HttpResponse<IItemMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackCategoryById(index: number, item: ICategoryMySuffix) {
        return item.id;
    }
    get item() {
        return this._item;
    }

    set item(item: IItemMySuffix) {
        this._item = item;
    }
}
