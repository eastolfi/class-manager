import { Injectable } from '@angular/core';
import { ClassItem, IClass } from '@app/pages/class-layout/class-layout.component';
import { combineLatest, from, merge, Observable, of } from 'rxjs';
import { combineAll, concatAll, distinct, distinctUntilKeyChanged, map, mergeAll, mergeMap, toArray, zip, zipAll } from 'rxjs/operators';

export interface Position {
    x: number;
    y: number;
}
export interface ItemPosition {
    id: number;
    position: Position;
}
export interface IClassName {
    id: number;
    name: string;
}

@Injectable({
    providedIn: 'root'
})
export class PersistenceService {

    private storageKey = 'item-positions';

    constructor() { }

    public saveClass(classData: IClass): void {
        const classElements = classData.classElements.map((element: ClassItem) => {
            element.position = element.position || element.lastKnownPosition;
            return element;
        });
        classData.classElements = classElements;

        merge(
            of(classData),
            this.getClasses()
        ).pipe(
            distinct(e => e.id),
            toArray()
        )
        .subscribe((items: IClass[]) => {
            console.log(items);
            localStorage.setItem('classes', JSON.stringify(items));
        });
    }

    public getClasses(): Observable<IClass> {
        // { id: number, name: string }
        // const asd: any[] = [ { id: 1, name: 'string' }, { id: 2, name: 'string2' }, { id: 3, name: 'string3' }];
        // return from( asd );
        const stored: IClass[] = JSON.parse(localStorage.getItem('classes')) || [];
        // const names: IClassName[] = stored.map((({ id, name }: IClass) => ({ id, name } as IClassName)));
        return of(...stored);
    }

    public getClassData(classId: number): Observable<IClass[]> {
        return of (
            (JSON.parse(localStorage.getItem('classes')) || []).filter(({ id }: IClass) => classId === id)
        )
    }

    public saveItemPosition(itemPosition: ItemPosition): void {
        const currentPositions: ItemPosition[] = JSON.parse(localStorage.getItem(this.storageKey)) || [];

        let found = false;
        currentPositions.forEach(item => {
            if (item.id === itemPosition.id) {
                item.position = itemPosition.position;
                found = true;
            }
        });
        if (!found) {
            currentPositions.push({ id: itemPosition.id, position: itemPosition.position });
        }
        localStorage.setItem(this.storageKey, JSON.stringify(currentPositions));
    }

    public getItemPositions(): ItemPosition[] {
        return JSON.parse(localStorage.getItem(this.storageKey)) || [];
    }
}
