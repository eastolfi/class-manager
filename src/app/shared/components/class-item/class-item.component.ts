import { CdkDragMove } from '@angular/cdk/drag-drop';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatMenu } from '@angular/material/menu';
import { ClassItem } from '@app/pages/class-layout/class-layout.component';
import { BehaviorSubject, Subject } from 'rxjs';
import { MenuOpenerStateService } from '../../services/menu-opener-state.service';
import { PersistenceService } from '../../services/persistence.service';
import { ItemEditDialogComponent } from '../item-edit-dialog/item-edit-dialog.component';

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

    // private currentItem: ClassItem;

    private currentDragTransform: string;

    constructor(
        private readonly persistanceService: PersistenceService,
        private readonly menuOpenerState: MenuOpenerStateService
    ) { }

    ngOnInit(): void {
        // this.menuOpenerSubject.subscribe((item: ClassItem) => {
        //     this.currentItem = item;
        // });
    }

    ngOnDestroy(): void {
        this.menuOpenerState.update(null);
    }



    public onMenuOpened(opener: ClassItem): void {
        this.menuOpenerState.update(opener);
    }

    public setOpenerAndEdit(item: ClassItem): void {
        // this.menuOpenerState.update(item);
        // this.editItem();
    }

    public onDrag(item: ClassItem, event: CdkDragMove) {
        // this.currentDragPosition = {
        //     x: event.pointerPosition.x,
        //     y: event.pointerPosition.y
        // };
        // const offset = 16;
        // this.currentDragPosition = {
        //     x: event.pointerPosition.x - (event.source.element.nativeElement.offsetWidth / 2) - offset,
        //     y: event.pointerPosition.y - (event.source.element.nativeElement.offsetHeight * 1.5) - offset
        // }
        this.currentDragTransform = event.source.element.nativeElement.style.transform;
        // event.source.element.nativeElement.offsetWidth
        // window.innerWidth
    }

    public onDragReleased(item: ClassItem) {
        console.log(this.currentDragTransform);
        const positions = this.currentDragTransform.replace('translate3d', '').match(/([-]*\d)+/g);
        // // item.lastKnownPosition = { x: parseInt(positions[0]), y: parseInt(positions[1]) }
        item.position = { x: parseInt(positions[0]), y: parseInt(positions[1]) };

        this.persistanceService.requestSave();
        // this.persistanceService.saveItemPosition({ id: item.id, position: { x: parseInt(positions[0]), y: parseInt(positions[1]) } });

        // const itemPositions: any[] = JSON.parse(localStorage.getItem('item-positions')) || [];

        // let found = false;
        // itemPositions.forEach(i => {
        //     if (i.id === item.id) {
        //         i.position = item.lastKnownPosition;
        //         found = true;
        //     }
        // });
        // if (!found) {
        //     itemPositions.push({ id: item.id, position: item.lastKnownPosition });
        // }
        // localStorage.setItem('item-positions', JSON.stringify(itemPositions));
    }
}
