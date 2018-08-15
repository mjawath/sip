/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SipTestModule } from '../../../test.module';
import { PurchaseOrderMySuffixDetailComponent } from 'app/entities/purchase-order-my-suffix/purchase-order-my-suffix-detail.component';
import { PurchaseOrderMySuffix } from 'app/shared/model/purchase-order-my-suffix.model';

describe('Component Tests', () => {
    describe('PurchaseOrderMySuffix Management Detail Component', () => {
        let comp: PurchaseOrderMySuffixDetailComponent;
        let fixture: ComponentFixture<PurchaseOrderMySuffixDetailComponent>;
        const route = ({ data: of({ purchaseOrder: new PurchaseOrderMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SipTestModule],
                declarations: [PurchaseOrderMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PurchaseOrderMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PurchaseOrderMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.purchaseOrder).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
