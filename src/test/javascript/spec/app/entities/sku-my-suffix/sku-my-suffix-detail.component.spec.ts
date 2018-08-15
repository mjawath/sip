/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SipTestModule } from '../../../test.module';
import { SKUMySuffixDetailComponent } from 'app/entities/sku-my-suffix/sku-my-suffix-detail.component';
import { SKUMySuffix } from 'app/shared/model/sku-my-suffix.model';

describe('Component Tests', () => {
    describe('SKUMySuffix Management Detail Component', () => {
        let comp: SKUMySuffixDetailComponent;
        let fixture: ComponentFixture<SKUMySuffixDetailComponent>;
        const route = ({ data: of({ sKU: new SKUMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SipTestModule],
                declarations: [SKUMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(SKUMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SKUMySuffixDetailComponent);
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
