import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
    selector: 'exagen-flag-icon',
    templateUrl: './flag-icon.component.html',
    styleUrls: ['./flag-icon.component.scss']
})
export class FlagIconComponent implements OnInit, OnChanges {
    @Input()
    public code: string;

    public cssClass: string;

    constructor() { }

    ngOnInit(): void {
        this.generateClass();
    }

    ngOnChanges({ code }: SimpleChanges): void {
        if (!code.firstChange && code.currentValue && code.currentValue !== code.previousValue) {
            this.generateClass();
        }
    }

    private generateClass() {
        this.cssClass = `flag-icon flag-icon-${this.code}`;
    }
}
