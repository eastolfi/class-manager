import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlagIconComponent } from './flag-icon/flag-icon.component';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';

@NgModule({
    declarations: [
        FlagIconComponent,
        SplashScreenComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        FlagIconComponent,
        SplashScreenComponent
    ]
})
export class ComponentsModule { }
