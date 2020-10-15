import { Component, Input, OnInit } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';

const ANGLE_90 = 90;

export interface DialItem {
    icon: string;
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

    constructor() { }

    ngOnInit(): void {
        this.items.forEach((item: DialItem) => {
            const oldClick = item.onClick;
            item.onClick = () => {
                oldClick();
                this.closeDial();
            };
        });
        this.updateItemsPositions();
    }

    // TODO - Animations
    private updateItemsPositions() {
        // for (let i = this.items.length - 1; i >= 0; i--) {
        for (let i = 0; i < this.items.length; i++) {
            const offsetAngle = 360 / this.items.length;
            const rotateAngle = offsetAngle * i;
            // this.items[i].translateX = -5;

            const radius = 100;
            const angle = (rotateAngle - 180) * (Math.PI / 180);
            const cos = Math.cos(angle);
            const sin = Math.sin(angle);
            this.items[i].translateX = radius * cos;
            this.items[i].translateY = radius * sin;



            // (x0 + r cos theta, y0 + r sin theta)
        }
    }

//     var updateLayout = function(listItems) {
//   for (var i = 0; i < listItems.length; i++) {
//     var offsetAngle = 360 / listItems.length;
//     var rotateAngle = offsetAngle * i;
//     $(listItems[i]).css("transform", "rotate(" + rotateAngle + "deg) translate(0, -200px) rotate(-" + rotateAngle + "deg)")
//   };
// };

    public isOpen = false;
    public openDial(): void {
        this.isOpen = true;
    }
    public closeDial(): void {
        this.isOpen = false;
    }
    public toggleDial(): void {
        this.isOpen = !this.isOpen;
    }

}
