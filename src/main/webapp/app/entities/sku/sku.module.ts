import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SipSharedModule } from 'app/shared';
import {
    SKUComponent,
    SKUDetailComponent,
    SKUUpdateComponent,
    SKUDeletePopupComponent,
    SKUDeleteDialogComponent,
    sKURoute,
    sKUPopupRoute
} from './';

const ENTITY_STATES = [...sKURoute, ...sKUPopupRoute];

@NgModule({
    imports: [SipSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [SKUComponent, SKUDetailComponent, SKUUpdateComponent, SKUDeleteDialogComponent, SKUDeletePopupComponent],
    entryComponents: [SKUComponent, SKUUpdateComponent, SKUDeleteDialogComponent, SKUDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SipSKUModule {}
