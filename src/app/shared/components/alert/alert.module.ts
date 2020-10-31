import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertComponent } from './alert.component';
import { AlertService } from './alert.service';
import { CoreModule } from '@app/core.module';

@NgModule({
    declarations: [
        AlertComponent
    ],
    imports: [
        CommonModule,
        CoreModule
    ],
    exports: [
        AlertComponent
    ]
})
export class AlertModule {
    public static forRoot(): ModuleWithProviders<AlertModule> {
        return {
            ngModule: AlertModule,
            providers: [
                AlertService
            ]
        }
    }
}
