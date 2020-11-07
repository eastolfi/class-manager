import { Component, Input, OnInit } from '@angular/core';

const ANGLE_RANGE = 175;
const ANGLE_OFFSET = 205;
const RADIUS = 100;

export interface DialItem {
    icon: string;
    disabled?: boolean;
    onClick: () => void;
    translateX?: number;
    translateY?: number;
}

@Component({
    selector: 'co-fab-dial',
    templateUrl: './fab-dial.component.html',
    styleUrls: ['./fab-dial.component.scss']
})
export class FabDialComponent implements OnInit {
    @Input()
    public items: DialItem[];

    @Input()
    public disabled: boolean = false;

    public isOpen = false;

    constructor() { }

    ngOnInit(): void {
        this.items.forEach((item: DialItem) => {
            const oldClick = item.onClick;
            item.onClick = () => {
                oldClick();
                this.closeDial();
            };
        });
    }

    public openDial(): void {
        if (!this.isOpen) {
            this.isOpen = true;
            this.updateItemsPositions();
        }
    }

    public closeDial(): void {
        if (this.isOpen) {
            this.isOpen = false;
            this.resetItemsPositions();
        }
    }

    public toggleDial(): void {
        if (this.isOpen) {
            this.closeDial();
        } else {
            this.openDial();
        }
    }

    private updateItemsPositions() {
        for (let i = 0; i < this.items.length; i++) {
            const offsetAngle = ANGLE_RANGE / this.items.length;
            const rotateAngle = offsetAngle * i;

            const radius = RADIUS;
            const angle = (rotateAngle - ANGLE_OFFSET) * (Math.PI / 180);
            const cos = Math.cos(angle);
            const sin = Math.sin(angle);
            this.items[i].translateX = radius * cos;
            this.items[i].translateY = radius * sin;
        }
    }

    private resetItemsPositions() {
        this.items.forEach((item: DialItem) => {
            item.translateX = 0;
            item.translateY = 0;
        });
    }
}
