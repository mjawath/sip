/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SipTestModule } from '../../../test.module';
import { SalesOrderMySuffixDetailComponent } from 'app/entities/sales-order-my-suffix/sales-order-my-suffix-detail.component';
import { SalesOrderMySuffix } from 'app/shared/model/sales-order-my-suffix.model';

describe('Component Tests', () => {
    describe('SalesOrderMySuffix Management Detail Component', () => {
        let comp: SalesOrderMySuffixDetailComponent;
        let fixture: ComponentFixture<SalesOrderMySuffixDetailComponent>;
        const route = ({ data: of({ salesOrder: new SalesOrderMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SipTestModule],
                declarations: [SalesOrderMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(SalesOrderMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SalesOrderMySuffixDetailComponent);
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
