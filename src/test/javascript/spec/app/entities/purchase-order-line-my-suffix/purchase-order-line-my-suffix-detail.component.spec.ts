/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SipTestModule } from '../../../test.module';
import { PurchaseOrderLineMySuffixDetailComponent } from 'app/entities/purchase-order-line-my-suffix/purchase-order-line-my-suffix-detail.component';
import { PurchaseOrderLineMySuffix } from 'app/shared/model/purchase-order-line-my-suffix.model';

describe('Component Tests', () => {
    describe('PurchaseOrderLineMySuffix Management Detail Component', () => {
        let comp: PurchaseOrderLineMySuffixDetailComponent;
        let fixture: ComponentFixture<PurchaseOrderLineMySuffixDetailComponent>;
        const route = ({ data: of({ purchaseOrderLine: new PurchaseOrderLineMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SipTestModule],
                declarations: [PurchaseOrderLineMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PurchaseOrderLineMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PurchaseOrderLineMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.purchaseOrderLine).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
