import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISalesOrderLineMySuffix } from 'app/shared/model/sales-order-line-my-suffix.model';
import { SalesOrderLineMySuffixService } from './sales-order-line-my-suffix.service';

@Component({
    selector: 'jhi-sales-order-line-my-suffix-delete-dialog',
    templateUrl: './sales-order-line-my-suffix-delete-dialog.component.html'
})
export class SalesOrderLineMySuffixDeleteDialogComponent {
    salesOrderLine: ISalesOrderLineMySuffix;

    constructor(
        private salesOrderLineService: SalesOrderLineMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.salesOrderLineService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'salesOrderLineListModification',
                content: 'Deleted an salesOrderLine'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-sales-order-line-my-suffix-delete-popup',
    template: ''
})
export class SalesOrderLineMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ salesOrderLine }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(SalesOrderLineMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.salesOrderLine = salesOrderLine;
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
