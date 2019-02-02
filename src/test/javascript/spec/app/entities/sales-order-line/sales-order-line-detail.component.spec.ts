/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SipTestModule } from '../../../test.module';
import { SalesOrderLineDetailComponent } from 'app/entities/sales-order-line/sales-order-line-detail.component';
import { SalesOrderLine } from 'app/shared/model/sales-order-line.model';

describe('Component Tests', () => {
    describe('SalesOrderLine Management Detail Component', () => {
        let comp: SalesOrderLineDetailComponent;
        let fixture: ComponentFixture<SalesOrderLineDetailComponent>;
        const route = ({ data: of({ salesOrderLine: new SalesOrderLine(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SipTestModule],
                declarations: [SalesOrderLineDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(SalesOrderLineDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SalesOrderLineDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.salesOrderLine).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
