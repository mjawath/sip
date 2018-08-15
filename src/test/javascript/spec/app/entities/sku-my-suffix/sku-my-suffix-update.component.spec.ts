/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SipTestModule } from '../../../test.module';
import { SKUMySuffixUpdateComponent } from 'app/entities/sku-my-suffix/sku-my-suffix-update.component';
import { SKUMySuffixService } from 'app/entities/sku-my-suffix/sku-my-suffix.service';
import { SKUMySuffix } from 'app/shared/model/sku-my-suffix.model';

describe('Component Tests', () => {
    describe('SKUMySuffix Management Update Component', () => {
        let comp: SKUMySuffixUpdateComponent;
        let fixture: ComponentFixture<SKUMySuffixUpdateComponent>;
        let service: SKUMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SipTestModule],
                declarations: [SKUMySuffixUpdateComponent]
            })
                .overrideTemplate(SKUMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SKUMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SKUMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new SKUMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.sKU = entity;
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
                    const entity = new SKUMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.sKU = entity;
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
