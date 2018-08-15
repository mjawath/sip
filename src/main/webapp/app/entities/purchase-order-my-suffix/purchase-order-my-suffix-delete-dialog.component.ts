import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPurchaseOrderMySuffix } from 'app/shared/model/purchase-order-my-suffix.model';
import { PurchaseOrderMySuffixService } from './purchase-order-my-suffix.service';

@Component({
    selector: 'jhi-purchase-order-my-suffix-delete-dialog',
    templateUrl: './purchase-order-my-suffix-delete-dialog.component.html'
})
export class PurchaseOrderMySuffixDeleteDialogComponent {
    purchaseOrder: IPurchaseOrderMySuffix;

    constructor(
        private purchaseOrderService: PurchaseOrderMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.purchaseOrderService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'purchaseOrderListModification',
                content: 'Deleted an purchaseOrder'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-purchase-order-my-suffix-delete-popup',
    template: ''
})
export class PurchaseOrderMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ purchaseOrder }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PurchaseOrderMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.purchaseOrder = purchaseOrder;
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