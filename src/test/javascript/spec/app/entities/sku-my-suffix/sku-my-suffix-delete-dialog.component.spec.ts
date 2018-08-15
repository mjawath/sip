/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SipTestModule } from '../../../test.module';
import { SKUMySuffixDeleteDialogComponent } from 'app/entities/sku-my-suffix/sku-my-suffix-delete-dialog.component';
import { SKUMySuffixService } from 'app/entities/sku-my-suffix/sku-my-suffix.service';

describe('Component Tests', () => {
    describe('SKUMySuffix Management Delete Component', () => {
        let comp: SKUMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<SKUMySuffixDeleteDialogComponent>;
        let service: SKUMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SipTestModule],
                declarations: [SKUMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(SKUMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SKUMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SKUMySuffixService);
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
