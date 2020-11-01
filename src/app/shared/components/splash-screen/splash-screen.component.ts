import { Component, OnInit } from '@angular/core';
import { SplashScreenService } from './splash-screen.service';

@Component({
    selector: 'cm-splash-screen',
    templateUrl: './splash-screen.component.html',
    styleUrls: ['./splash-screen.component.scss']
})
export class SplashScreenComponent implements OnInit {
    windowWidth: string;
    showSplash = true;

    constructor(private readonly service: SplashScreenService) { }

    ngOnInit(): void {
        this.service.toggle$.subscribe((isOpen: boolean) => {
            this.toggleSplash(isOpen);
        });
    }

    private toggleSplash(isOpen: boolean): void {
        const width: string = isOpen ? '0px' : `-${window.innerWidth}px`;

        if (isOpen) {
            this.showSplash = !this.showSplash;

            setTimeout(() => {
                this.windowWidth = width;
            }, 500);
        } else {
            setTimeout(() => {
                this.windowWidth = width;

                setTimeout(() => {
                    this.showSplash = !this.showSplash;
                }, 500);
            }, 100);
        }

    }

}
