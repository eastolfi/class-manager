import { Injectable } from '@angular/core';
import { merge, Observable, Observer, of, Subject } from 'rxjs';
import { distinct, filter, toArray } from 'rxjs/operators';

import { ClassItem, ClassLayout, ItemPosition } from '@shared/models/class-layout';

@Injectable({
    providedIn: 'root'
})
export class PersistenceService {
    public saveRequestSubject = new Subject<void>();

    private storageKey = 'item-positions';

    constructor() { }

    public saveClass(classData: ClassLayout): void {
        const classItems = classData.classItems.map((item: ClassItem) => {
            item.position = item.position || item.lastKnownPosition;
            return item;
        });

        classData.classItems = classItems;

        merge(
            of(classData),
            this.getClasses()
        ).pipe(
            distinct(e => e.id),
            toArray()
        )
        .subscribe((items: ClassLayout[]) => {
            console.log(items);
            localStorage.setItem('classes', JSON.stringify(items));
        });
    }

    public requestSave(): void {
        this.saveRequestSubject.next();
    }

    public deleteClass(classId: number): Observable<void> {
        return new Observable((observer: Observer<void>) => {
            this.getClasses().pipe(
                filter((savedClass: ClassLayout) => savedClass.id !== classId),
                toArray()
            )
            .subscribe((items: ClassLayout[]) => {
                console.log(items);
                localStorage.setItem('classes', JSON.stringify(items));

                observer.next();
                observer.complete();
            });
        })
    }

    public getClasses(): Observable<ClassLayout> {
        const stored: ClassLayout[] = JSON.parse(localStorage.getItem('classes')) || [];
        return of(...stored);
    }

    public getClassData(classId: number): Observable<ClassLayout[]> {
        return of (
            (JSON.parse(localStorage.getItem('classes')) || []).filter(({ id }: ClassLayout) => classId === id)
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
