/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SipTestModule } from '../../../test.module';
import { SalesOrderLineUpdateComponent } from 'app/entities/sales-order-line/sales-order-line-update.component';
import { SalesOrderLineService } from 'app/entities/sales-order-line/sales-order-line.service';
import { SalesOrderLine } from 'app/shared/model/sales-order-line.model';

describe('Component Tests', () => {
    describe('SalesOrderLine Management Update Component', () => {
        let comp: SalesOrderLineUpdateComponent;
        let fixture: ComponentFixture<SalesOrderLineUpdateComponent>;
        let service: SalesOrderLineService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SipTestModule],
                declarations: [SalesOrderLineUpdateComponent]
            })
                .overrideTemplate(SalesOrderLineUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SalesOrderLineUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SalesOrderLineService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new SalesOrderLine(123);
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
                    const entity = new SalesOrderLine();
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
