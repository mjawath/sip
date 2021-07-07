/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SipTestModule } from '../../../test.module';
import { SKUDetailComponent } from 'app/entities/sku/sku-detail.component';
import { SKU } from 'app/shared/model/sku.model';

describe('Component Tests', () => {
    describe('SKU Management Detail Component', () => {
        let comp: SKUDetailComponent;
        let fixture: ComponentFixture<SKUDetailComponent>;
        const route = ({ data: of({ sKU: new SKU(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SipTestModule],
                declarations: [SKUDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(SKUDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SKUDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.sKU).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
