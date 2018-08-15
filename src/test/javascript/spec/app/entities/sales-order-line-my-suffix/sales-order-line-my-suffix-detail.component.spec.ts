/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SipTestModule } from '../../../test.module';
import { SalesOrderLineMySuffixDetailComponent } from 'app/entities/sales-order-line-my-suffix/sales-order-line-my-suffix-detail.component';
import { SalesOrderLineMySuffix } from 'app/shared/model/sales-order-line-my-suffix.model';

describe('Component Tests', () => {
    describe('SalesOrderLineMySuffix Management Detail Component', () => {
        let comp: SalesOrderLineMySuffixDetailComponent;
        let fixture: ComponentFixture<SalesOrderLineMySuffixDetailComponent>;
        const route = ({ data: of({ salesOrderLine: new SalesOrderLineMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SipTestModule],
                declarations: [SalesOrderLineMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(SalesOrderLineMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SalesOrderLineMySuffixDetailComponent);
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
