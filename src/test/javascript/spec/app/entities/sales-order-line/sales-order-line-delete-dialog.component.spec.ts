/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SipTestModule } from '../../../test.module';
import { SalesOrderLineDeleteDialogComponent } from 'app/entities/sales-order-line/sales-order-line-delete-dialog.component';
import { SalesOrderLineService } from 'app/entities/sales-order-line/sales-order-line.service';

describe('Component Tests', () => {
    describe('SalesOrderLine Management Delete Component', () => {
        let comp: SalesOrderLineDeleteDialogComponent;
        let fixture: ComponentFixture<SalesOrderLineDeleteDialogComponent>;
        let service: SalesOrderLineService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SipTestModule],
                declarations: [SalesOrderLineDeleteDialogComponent]
            })
                .overrideTemplate(SalesOrderLineDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SalesOrderLineDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SalesOrderLineService);
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
