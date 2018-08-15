import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISalesOrderMySuffix } from 'app/shared/model/sales-order-my-suffix.model';
import { SalesOrderMySuffixService } from './sales-order-my-suffix.service';

@Component({
    selector: 'jhi-sales-order-my-suffix-delete-dialog',
    templateUrl: './sales-order-my-suffix-delete-dialog.component.html'
})
export class SalesOrderMySuffixDeleteDialogComponent {
    salesOrder: ISalesOrderMySuffix;

    constructor(
        private salesOrderService: SalesOrderMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.salesOrderService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'salesOrderListModification',
                content: 'Deleted an salesOrder'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-sales-order-my-suffix-delete-popup',
    template: ''
})
export class SalesOrderMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ salesOrder }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(SalesOrderMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.salesOrder = salesOrder;
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
