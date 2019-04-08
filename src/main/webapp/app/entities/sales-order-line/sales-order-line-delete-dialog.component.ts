import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISalesOrderLine } from 'app/shared/model/sales-order-line.model';
import { SalesOrderLineService } from './sales-order-line.service';

@Component({
    selector: 'jhi-sales-order-line-delete-dialog',
    templateUrl: './sales-order-line-delete-dialog.component.html'
})
export class SalesOrderLineDeleteDialogComponent {
    salesOrderLine: ISalesOrderLine;

    constructor(
        private salesOrderLineService: SalesOrderLineService,
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
    selector: 'jhi-sales-order-line-delete-popup',
    template: ''
})
export class SalesOrderLineDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ salesOrderLine }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(SalesOrderLineDeleteDialogComponent as Component, {
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
