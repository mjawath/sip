import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SipSharedModule } from 'app/shared';
import {
    CategoryMySuffixComponent,
    CategoryMySuffixDetailComponent,
    CategoryMySuffixUpdateComponent,
    CategoryMySuffixDeletePopupComponent,
    CategoryMySuffixDeleteDialogComponent,
    categoryRoute,
    categoryPopupRoute
} from './';

const ENTITY_STATES = [...categoryRoute, ...categoryPopupRoute];

@NgModule({
    imports: [SipSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CategoryMySuffixComponent,
        CategoryMySuffixDetailComponent,
        CategoryMySuffixUpdateComponent,
        CategoryMySuffixDeleteDialogComponent,
        CategoryMySuffixDeletePopupComponent
    ],
    entryComponents: [
        CategoryMySuffixComponent,
        CategoryMySuffixUpdateComponent,
        CategoryMySuffixDeleteDialogComponent,
        CategoryMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SipCategoryMySuffixModule {}
