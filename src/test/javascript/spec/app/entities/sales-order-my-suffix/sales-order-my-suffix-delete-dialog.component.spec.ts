/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SipTestModule } from '../../../test.module';
import { SalesOrderMySuffixDeleteDialogComponent } from 'app/entities/sales-order-my-suffix/sales-order-my-suffix-delete-dialog.component';
import { SalesOrderMySuffixService } from 'app/entities/sales-order-my-suffix/sales-order-my-suffix.service';

describe('Component Tests', () => {
    describe('SalesOrderMySuffix Management Delete Component', () => {
        let comp: SalesOrderMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<SalesOrderMySuffixDeleteDialogComponent>;
        let service: SalesOrderMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SipTestModule],
                declarations: [SalesOrderMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(SalesOrderMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SalesOrderMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SalesOrderMySuffixService);
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
