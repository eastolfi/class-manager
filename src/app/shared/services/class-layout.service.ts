import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { defaultIfEmpty, filter, map, toArray } from 'rxjs/operators';
import { ClassItem, ClassLayout, ClassName } from '../models/class-layout';
import { PersistenceService } from './persistence.service';

@Injectable()
export class ClassLayoutService {

    constructor(private readonly persistanceService: PersistenceService) { }

    public getClassNames(): Observable<ClassName[]> {
        return this.persistanceService.getClasses()
        .pipe(
            map(({ id, name }: ClassLayout) => ({ id, name } as ClassName)),
            toArray()
        );
    }

    public getClasses(): Observable<ClassLayout[]> {
        return this.persistanceService.getClasses().pipe(toArray());
    }

    public getClassById(classId: number): Observable<ClassLayout> {
        return this.persistanceService.getClasses()
        .pipe(
            filter((c: ClassLayout) => c.id === classId),
            defaultIfEmpty({}),
            map(({ id, name, classItems }: ClassLayout) => {
                return {
                    id, name,
                    classElements: classItems.filter((classElement: ClassItem) => classElement.type === 'class-element'),
                    students: classItems.filter((classElement: ClassItem) => classElement.type === 'student')
                }  as ClassLayout;
            })
        )
    }
}
