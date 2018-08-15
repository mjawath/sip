import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SipSharedModule } from 'app/shared';
import {
    SKUMySuffixComponent,
    SKUMySuffixDetailComponent,
    SKUMySuffixUpdateComponent,
    SKUMySuffixDeletePopupComponent,
    SKUMySuffixDeleteDialogComponent,
    sKURoute,
    sKUPopupRoute
} from './';

const ENTITY_STATES = [...sKURoute, ...sKUPopupRoute];

@NgModule({
    imports: [SipSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        SKUMySuffixComponent,
        SKUMySuffixDetailComponent,
        SKUMySuffixUpdateComponent,
        SKUMySuffixDeleteDialogComponent,
        SKUMySuffixDeletePopupComponent
    ],
    entryComponents: [SKUMySuffixComponent, SKUMySuffixUpdateComponent, SKUMySuffixDeleteDialogComponent, SKUMySuffixDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SipSKUMySuffixModule {}
