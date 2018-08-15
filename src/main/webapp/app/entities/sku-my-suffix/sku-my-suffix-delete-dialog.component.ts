import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISKUMySuffix } from 'app/shared/model/sku-my-suffix.model';
import { SKUMySuffixService } from './sku-my-suffix.service';

@Component({
    selector: 'jhi-sku-my-suffix-delete-dialog',
    templateUrl: './sku-my-suffix-delete-dialog.component.html'
})
export class SKUMySuffixDeleteDialogComponent {
    sKU: ISKUMySuffix;

    constructor(private sKUService: SKUMySuffixService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.sKUService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'sKUListModification',
                content: 'Deleted an sKU'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-sku-my-suffix-delete-popup',
    template: ''
})
export class SKUMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ sKU }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(SKUMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.sKU = sKU;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
