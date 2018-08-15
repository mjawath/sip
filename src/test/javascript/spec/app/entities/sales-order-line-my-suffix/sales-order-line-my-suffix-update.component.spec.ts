/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SipTestModule } from '../../../test.module';
import { SalesOrderLineMySuffixUpdateComponent } from 'app/entities/sales-order-line-my-suffix/sales-order-line-my-suffix-update.component';
import { SalesOrderLineMySuffixService } from 'app/entities/sales-order-line-my-suffix/sales-order-line-my-suffix.service';
import { SalesOrderLineMySuffix } from 'app/shared/model/sales-order-line-my-suffix.model';

describe('Component Tests', () => {
    describe('SalesOrderLineMySuffix Management Update Component', () => {
        let comp: SalesOrderLineMySuffixUpdateComponent;
        let fixture: ComponentFixture<SalesOrderLineMySuffixUpdateComponent>;
        let service: SalesOrderLineMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SipTestModule],
                declarations: [SalesOrderLineMySuffixUpdateComponent]
            })
                .overrideTemplate(SalesOrderLineMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SalesOrderLineMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SalesOrderLineMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new SalesOrderLineMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.salesOrderLine = entity;
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
                    const entity = new SalesOrderLineMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.salesOrderLine = entity;
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
