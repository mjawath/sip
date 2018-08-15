/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SipTestModule } from '../../../test.module';
import { CategoryMySuffixDeleteDialogComponent } from 'app/entities/category-my-suffix/category-my-suffix-delete-dialog.component';
import { CategoryMySuffixService } from 'app/entities/category-my-suffix/category-my-suffix.service';

describe('Component Tests', () => {
    describe('CategoryMySuffix Management Delete Component', () => {
        let comp: CategoryMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<CategoryMySuffixDeleteDialogComponent>;
        let service: CategoryMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SipTestModule],
                declarations: [CategoryMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(CategoryMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CategoryMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CategoryMySuffixService);
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
