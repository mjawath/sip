/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SipTestModule } from '../../../test.module';
import { PurchaseOrderLineMySuffixUpdateComponent } from 'app/entities/purchase-order-line-my-suffix/purchase-order-line-my-suffix-update.component';
import { PurchaseOrderLineMySuffixService } from 'app/entities/purchase-order-line-my-suffix/purchase-order-line-my-suffix.service';
import { PurchaseOrderLineMySuffix } from 'app/shared/model/purchase-order-line-my-suffix.model';

describe('Component Tests', () => {
    describe('PurchaseOrderLineMySuffix Management Update Component', () => {
        let comp: PurchaseOrderLineMySuffixUpdateComponent;
        let fixture: ComponentFixture<PurchaseOrderLineMySuffixUpdateComponent>;
        let service: PurchaseOrderLineMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SipTestModule],
                declarations: [PurchaseOrderLineMySuffixUpdateComponent]
            })
                .overrideTemplate(PurchaseOrderLineMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PurchaseOrderLineMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PurchaseOrderLineMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PurchaseOrderLineMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.purchaseOrderLine = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PurchaseOrderLineMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.purchaseOrderLine = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
