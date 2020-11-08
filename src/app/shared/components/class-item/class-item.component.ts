import { CdkDragMove } from '@angular/cdk/drag-drop';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatMenu } from '@angular/material/menu';

import { DialogService } from '@shared/services/dialog.service';
import { ClassItem } from '@shared/models/class-layout';
import { MenuOpenerStateService } from '@shared/services/menu-opener-state.service';
import { PersistenceService } from '@shared/services/persistence.service';
import { ItemEditDialogComponent } from '@shared/components/item-edit-dialog/item-edit-dialog.component';

@Component({
    selector: 'co-class-item',
    templateUrl: './class-item.component.html',
    styleUrls: ['./class-item.component.scss']
})
export class ClassItemComponent implements OnInit, OnDestroy {
    @Input()
    public item: ClassItem;

    @Input()
    public menu: MatMenu;

    private currentDragTransform: string;

    constructor(
        private readonly persistanceService: PersistenceService,
        private readonly menuOpenerState: MenuOpenerStateService,
        private readonly dialogService: DialogService
    ) { }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this.menuOpenerState.update(null);
    }

    public openMenu(): void {
        this.menuOpenerState.update(this.item);
    }

    public setOpenerAndEdit(): void {
        this.openMenu();

        const opener = this.menuOpenerState.state$.value;

        this.dialogService.openDialog<ItemEditDialogComponent, ClassItem>(
            ItemEditDialogComponent,
            {
                width: '300px',
                data: opener
            }
        ).subscribe((editedItem: ClassItem) => {
            if (editedItem) {
                opener.label = editedItem.label;
            }
        });
    }

    public onDrag(event: CdkDragMove) {
        this.currentDragTransform = event.source.element.nativeElement.style.transform;
    }

    public onDragReleased() {
        console.log(this.currentDragTransform);
        const positions = this.currentDragTransform.replace('translate3d', '').match(/([-]*\d)+/g);
        this.item.position = { x: parseInt(positions[0]), y: parseInt(positions[1]) };

        this.persistanceService.requestSave();
    }
}
