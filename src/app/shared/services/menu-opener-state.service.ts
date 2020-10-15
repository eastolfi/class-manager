import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ClassItem } from 'src/app/app.component';

@Injectable({
    providedIn: 'root'
})
export class MenuOpenerStateService {
    private _state$: BehaviorSubject<ClassItem> = new BehaviorSubject(null);

    constructor() { }

    // public onMenuOpened(opener: ClassItem): void {
    //     this.state$.next(opener);
    // }

    // public onMenuClosed(): void {
    //     this.state$.next(null);
    // }

    public get state$(): BehaviorSubject<ClassItem> {
        return this._state$;
    }

    public get value(): ClassItem {
        return this.state$.value;
    }

    public update(value: ClassItem): void {
        this.state$.next(value);
    }

    public clear(): void {
        this.state$.next(null);
    }
}
