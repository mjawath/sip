/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SipTestModule } from '../../../test.module';
import { SalesOrderDeleteDialogComponent } from 'app/entities/sales-order/sales-order-delete-dialog.component';
import { SalesOrderService } from 'app/entities/sales-order/sales-order.service';

describe('Component Tests', () => {
    describe('SalesOrder Management Delete Component', () => {
        let comp: SalesOrderDeleteDialogComponent;
        let fixture: ComponentFixture<SalesOrderDeleteDialogComponent>;
        let service: SalesOrderService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SipTestModule],
                declarations: [SalesOrderDeleteDialogComponent]
            })
                .overrideTemplate(SalesOrderDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SalesOrderDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SalesOrderService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it(
                'Should call delete service on confirmDelete',
                inject(
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
                )
            );
        });
    });
});
