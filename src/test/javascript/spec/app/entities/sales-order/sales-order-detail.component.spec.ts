/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SipTestModule } from '../../../test.module';
import { SalesOrderDetailComponent } from 'app/entities/sales-order/sales-order-detail.component';
import { SalesOrder } from 'app/shared/model/sales-order.model';

describe('Component Tests', () => {
    describe('SalesOrder Management Detail Component', () => {
        let comp: SalesOrderDetailComponent;
        let fixture: ComponentFixture<SalesOrderDetailComponent>;
        const route = ({ data: of({ salesOrder: new SalesOrder(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SipTestModule],
                declarations: [SalesOrderDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(SalesOrderDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SalesOrderDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.salesOrder).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
