/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SipTestModule } from '../../../test.module';
import { PurchaseOrderMySuffixDeleteDialogComponent } from 'app/entities/purchase-order-my-suffix/purchase-order-my-suffix-delete-dialog.component';
import { PurchaseOrderMySuffixService } from 'app/entities/purchase-order-my-suffix/purchase-order-my-suffix.service';

describe('Component Tests', () => {
    describe('PurchaseOrderMySuffix Management Delete Component', () => {
        let comp: PurchaseOrderMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<PurchaseOrderMySuffixDeleteDialogComponent>;
        let service: PurchaseOrderMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SipTestModule],
                declarations: [PurchaseOrderMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(PurchaseOrderMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PurchaseOrderMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PurchaseOrderMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
