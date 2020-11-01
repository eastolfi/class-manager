import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SplashScreenService {
    public toggle$: EventEmitter<boolean> = new EventEmitter();

    constructor() { }

    public open(): void {
        this.toggle$.emit(true);
    }

    public close(): void {
        this.toggle$.emit(false);
    }
}
