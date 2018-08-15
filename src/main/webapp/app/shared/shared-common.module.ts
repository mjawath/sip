import { NgModule } from '@angular/core';

import { SipSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [SipSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [SipSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class SipSharedCommonModule {}
