/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SipTestModule } from '../../../test.module';
import { PurchaseOrderMySuffixUpdateComponent } from 'app/entities/purchase-order-my-suffix/purchase-order-my-suffix-update.component';
import { PurchaseOrderMySuffixService } from 'app/entities/purchase-order-my-suffix/purchase-order-my-suffix.service';
import { PurchaseOrderMySuffix } from 'app/shared/model/purchase-order-my-suffix.model';

describe('Component Tests', () => {
    describe('PurchaseOrderMySuffix Management Update Component', () => {
        let comp: PurchaseOrderMySuffixUpdateComponent;
        let fixture: ComponentFixture<PurchaseOrderMySuffixUpdateComponent>;
        let service: PurchaseOrderMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SipTestModule],
                declarations: [PurchaseOrderMySuffixUpdateComponent]
            })
                .overrideTemplate(PurchaseOrderMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PurchaseOrderMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PurchaseOrderMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PurchaseOrderMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.purchaseOrder = entity;
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
                    const entity = new PurchaseOrderMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.purchaseOrder = entity;
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
