import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISKUMySuffix } from 'app/shared/model/sku-my-suffix.model';

@Component({
    selector: 'jhi-sku-my-suffix-detail',
    templateUrl: './sku-my-suffix-detail.component.html'
})
export class SKUMySuffixDetailComponent implements OnInit {
    sKU: ISKUMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ sKU }) => {
            this.sKU = sKU;
        });
    }

    previousState() {
        window.history.back();
    }
}
