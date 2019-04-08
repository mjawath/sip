/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SipTestModule } from '../../../test.module';
import { SKUUpdateComponent } from 'app/entities/sku/sku-update.component';
import { SKUService } from 'app/entities/sku/sku.service';
import { SKU } from 'app/shared/model/sku.model';

describe('Component Tests', () => {
    describe('SKU Management Update Component', () => {
        let comp: SKUUpdateComponent;
        let fixture: ComponentFixture<SKUUpdateComponent>;
        let service: SKUService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SipTestModule],
                declarations: [SKUUpdateComponent]
            })
                .overrideTemplate(SKUUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SKUUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SKUService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new SKU(123);
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
                    const entity = new SKU();
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
