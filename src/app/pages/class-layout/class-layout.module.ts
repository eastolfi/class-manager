import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';

import { ClassLayoutComponent } from './class-layout.component';
import { ClassLayoutRoutingModule } from './class-layout-routing.module';
import { FabDialComponent } from '@app/shared/components/fab-dial/fab-dial.component';
import { ItemEditDialogComponent } from '@shared/components/item-edit-dialog/item-edit-dialog.component';
import { ClassItemComponent } from '@app/shared/components/class-item/class-item.component';
import { MatButtonModule } from '@angular/material/button';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CoreModule } from '@app/core.module';

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
    ]
})
export class ClassLayoutModule { }
