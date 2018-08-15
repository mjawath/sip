/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SipTestModule } from '../../../test.module';
import { CategoryMySuffixUpdateComponent } from 'app/entities/category-my-suffix/category-my-suffix-update.component';
import { CategoryMySuffixService } from 'app/entities/category-my-suffix/category-my-suffix.service';
import { CategoryMySuffix } from 'app/shared/model/category-my-suffix.model';

describe('Component Tests', () => {
    describe('CategoryMySuffix Management Update Component', () => {
        let comp: CategoryMySuffixUpdateComponent;
        let fixture: ComponentFixture<CategoryMySuffixUpdateComponent>;
        let service: CategoryMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SipTestModule],
                declarations: [CategoryMySuffixUpdateComponent]
            })
                .overrideTemplate(CategoryMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CategoryMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CategoryMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new CategoryMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.category = entity;
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
                    const entity = new CategoryMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.category = entity;
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
