/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SipTestModule } from '../../../test.module';
import { SalesOrderMySuffixUpdateComponent } from 'app/entities/sales-order-my-suffix/sales-order-my-suffix-update.component';
import { SalesOrderMySuffixService } from 'app/entities/sales-order-my-suffix/sales-order-my-suffix.service';
import { SalesOrderMySuffix } from 'app/shared/model/sales-order-my-suffix.model';

describe('Component Tests', () => {
    describe('SalesOrderMySuffix Management Update Component', () => {
        let comp: SalesOrderMySuffixUpdateComponent;
        let fixture: ComponentFixture<SalesOrderMySuffixUpdateComponent>;
        let service: SalesOrderMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SipTestModule],
                declarations: [SalesOrderMySuffixUpdateComponent]
            })
                .overrideTemplate(SalesOrderMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SalesOrderMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SalesOrderMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new SalesOrderMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.salesOrder = entity;
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
                    const entity = new SalesOrderMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.salesOrder = entity;
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
