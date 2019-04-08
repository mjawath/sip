import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISKU } from 'app/shared/model/sku.model';

@Component({
    selector: 'jhi-sku-detail',
    templateUrl: './sku-detail.component.html'
})
export class SKUDetailComponent implements OnInit {
    sKU: ISKU;

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
