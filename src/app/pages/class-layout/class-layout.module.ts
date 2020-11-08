import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from '@app/core.module';
import { FabDialComponent } from '@shared/components/fab-dial/fab-dial.component';
import { ItemEditDialogComponent } from '@shared/components/item-edit-dialog/item-edit-dialog.component';
import { ClassItemComponent } from '@shared/components/class-item/class-item.component';
import { ClassLayoutService } from '@shared/services/class-layout.service';

import { ClassLayoutComponent } from './class-layout.component';
import { ClassLayoutRoutingModule } from './class-layout-routing.module';

@NgModule({
    declarations: [
        ClassLayoutComponent,
        ClassItemComponent,
        FabDialComponent,
        ItemEditDialogComponent
    ],
    imports: [
        CommonModule,
        CoreModule,
        ClassLayoutRoutingModule
    ],
    providers: [
        ClassLayoutService
    ]
})
export class ClassLayoutModule { }
