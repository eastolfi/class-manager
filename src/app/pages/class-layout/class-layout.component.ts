import { Component, OnInit, SecurityContext } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DialItem } from '@app/shared/components/fab-dial/fab-dial.component';
import { ItemEditDialogComponent } from '@app/shared/components/item-edit-dialog/item-edit-dialog.component';
import { DomService } from '@app/shared/services/dom.service';
import { MenuOpenerStateService } from '@app/shared/services/menu-opener-state.service';
import { IClassName, PersistenceService, Position } from '@app/shared/services/persistence.service';
import { Observable, of, Subscription } from 'rxjs';
import { defaultIfEmpty, filter, map, toArray } from 'rxjs/operators';

export interface ClassItem {
    id: number;
    label: string;
    type: string;
    color?: string;
    orientation?: string;
    editing?: boolean;
    lastKnownPosition?: Position,
    position?: Position
}

export interface IClass {
    id: number;
    name: string;
    classElements: ClassItem[];
}

@Component({
    selector: 'co-class-layout',
    templateUrl: './class-layout.component.html',
    styleUrls: ['./class-layout.component.scss']
})
export class ClassLayoutComponent implements OnInit {

    public form: FormGroup;

    // public classList$: Observable<IClass[]>;
    public classNameList$: Observable<IClassName[]>;
    public students: ClassItem[] = [];
    public classElements: ClassItem[] = [];
    public defaultClassName: IClassName = { id: 99, name: '' }
    public unselectedClassId = -1;

    private COLORS = {
        red: 'lightcoral',
        orange: 'lightsalmon',
        yellow: 'lightyellow',
        green: 'lightseagreen',
        blue: 'lightskyblue',
        none: 'inherit'
    };
    public dialItems: DialItem[] = [
        { icon: 'sensor_door', onClick: this.addClassElement.bind(this), disabled: true },
        { icon: 'person_add', onClick: this.addStudent.bind(this), disabled: true },
        { icon: 'save', onClick: this.print.bind(this), disabled: true },
        { icon: 'cloud_download', onClick: this.export.bind(this), disabled: true },
        { icon: 'sync_alt', onClick: this.import.bind(this), disabled: false }
    ];

    constructor(
        private readonly sanitizer: DomSanitizer,
        private readonly fb: FormBuilder,
        private readonly dialog: MatDialog,
        private readonly persistanceService: PersistenceService,
        private readonly domService: DomService,
        private readonly menuOpenerState: MenuOpenerStateService
    ) {
        this.form = this.fb.group({
            classId: [this.unselectedClassId],
            className: ['', Validators.required]
        });
    }

    ngOnInit() {
        this.getClassNames();
        this.initListeners();
    }

    public get classIdControl(): FormControl {
        return this.form.get('classId') as FormControl;
    }

    public get menuOpener(): ClassItem {
        return this.menuOpenerState.state$.value;
    }

    public get menuType(): string {
        if (this.menuOpener) {
            return this.menuOpener.type;
        }

        return '';
    }

    public get classId(): number {
        return this.form.get('classId').value;
    }
    public get isNewClass(): boolean {
        return this.classId && this.classId !== this.defaultClassName.id && this.classId !== this.unselectedClassId;
    }

    public saveClass(): void {
        if (this.form.value.className.trim().length === 0) {
            return;
        }

        const classId = this.form.value.classId !== this.defaultClassName.id ? this.form.value.classId : (new Date()).getTime();
        const className = this.form.value.className;
        // const className = this.classList$.pipe(
        //     filter(c => {
        //         debugger;
        //         return true;
        //     })
        //     // filter((c: { id: number, name: string }) => c.id === classId),
        //     // first(),
        //     // map((c: { id: number, name: string }) => c.name)
        // ).subscribe((asd: any) => {
        //     debugger;
        // })
        const classData: IClass = {
            id: classId,
            name: className,
            classElements: [
                ...this.classElements,
                ...this.students
            ]
        };
        this.persistanceService.saveClass(classData);
        this.form.patchValue({
            classId
        }, { emitEvent: false });
        this.getClassNames();
    }

    public deleteClass(): void {
        if (confirm('Sure sure ?')) {
            this.persistanceService.deleteClass(this.classId)
            .subscribe(() => this.reset());
        }
    }

    public onMenuClosed(): void {
        this.menuOpenerState.clear();
    }

    public changeColor(color: string) {
        this.menuOpenerState.state$.value.color = this.COLORS[color];
    }


    // drop(event: CdkDragDrop<string[]>) {
    //     if (event.previousContainer === event.container) {
    //         moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    //     } else {
    //         transferArrayItem(event.previousContainer.data,
    //             event.container.data,
    //             event.previousIndex,
    //             event.currentIndex);
    //     }
    // }

    // public currentMenuOpener: ClassItem = null;

    // public setCurrentMenuOpener(opener: ClassItem) {
    //     this.currentMenuOpener = opener;
    // }
    public rotateItem() {
        // if (this.menuOpener) {
        if (this.menuOpener.orientation === 'vertical') {
            this.menuOpener.orientation = 'horizontal';
        } else {
            this.menuOpener.orientation = 'vertical';
        }
        // }
        // this.currentMenuOpener = null;
    }


    public addStudent() {
        this.students.push({
            id: this.getId(),
            label: 'Alumno',
            color: this.COLORS['none'],
            type: 'student'
        });
        this.saveClass();
        // this.closeDial();
    }
    public addClassElement() {
        this.classElements.push({
            id: this.getId(),
            label: 'Ventana',
            type: 'class-element',
            orientation: 'vertical'
        })
    }
    public editItem() {
        // item.editing = !item.editing;
        const opener = this.menuOpener;

        const dialogRef = this.dialog.open(ItemEditDialogComponent, {
            width: '300px',
            data: this.menuOpener
        });

        dialogRef.afterClosed().subscribe((editedItem: ClassItem) => {
            if (editedItem) {
                opener.label = editedItem.label;
            }
            // this.currentMenuOpener = null;
        })
    }

    // public endEditing(item: ClassItem, event) {
    //     item.label = event.srcElement.value
    //     item.editing = !item.editing;
    //     this.currentMenuOpener = null;
    // }
    public deleteItem(): void {
        if (this.menuOpener.type === 'student') {
            const itemId = this.menuOpener.id;
            this.onMenuClosed();
            // Change to ID
            this.students = this.students.filter(student => student.id !== itemId);

            this.saveClass();
        }

        // this.currentMenuOpener = null;
    }



    public resetPosition(): void {
        document.querySelectorAll('.draggable').forEach((item: HTMLElement) => item.style.transform = '')
        // this.classElements[1].lastKnownPosition = null;
    }

    private initListeners(): void {
        this.persistanceService.saveRequestSubject.subscribe(() => this.saveClass());
        this.classIdControl.valueChanges.subscribe((classId: number) => {
            if (classId === this.unselectedClassId) {
                // reload classnames
                this.getClassNames();
                this.classElements = [];
                this.students = [];
                this.disableFabDialForNoClass();
                // class items = []
            } else {
                this.enableFabDialForClass();

                // get class elements
                this.persistanceService.getClasses()
                .pipe(
                    filter((c: IClass) => c.id === classId),
                    defaultIfEmpty({}),
                ).subscribe(({ id, name, classElements }: IClass) => {
                    this.form.patchValue({
                        classId: id || this.defaultClassName.id,
                        className: name || this.defaultClassName.name
                    }, { emitEvent: false });

                    of(...classElements || []).pipe(
                        filter((classElement: ClassItem) => classElement.type === 'class-element'),
                        toArray()
                    ).subscribe((classElements: ClassItem[]) => {
                        this.classElements = classElements;
                    });
                    of(...classElements || []).pipe(
                        filter((classElement: ClassItem) => classElement.type === 'student'),
                        toArray()
                    ).subscribe((classElements: ClassItem[]) => {
                        this.students = classElements;
                    });
                });
            }
        });
        // this.classIdControl.valueChanges.subscribe(this.onClassChanged(this._classList$).bind(this));
    }

    private disableFabDialForNoClass(): void {
        this.dialItems.forEach((item: DialItem) => {
            // change to name or id
            if (item.icon !== 'sync_alt') {
                item.disabled = true;
            } else {
                item.disabled = false;
            }
        });
    }
    private enableFabDialForClass(): void {
        this.dialItems.forEach((item: DialItem) => {
            // change to name or id
            item.disabled = false;
        });
    }

    // private _classList$: Observable<IClass>;
    private getClassNames(refresh: boolean = false): void {
        // if (refresh) {
        //     this.classElements = [];
        //     this.students = [];
        //     this.form.patchValue({
        //         classId: this.unselectedClassId
        //     }, { emitEvent: true });
        // }

        // this._classList$ = this.persistanceService.getClasses();

        this.classNameList$ = this.persistanceService.getClasses()
        .pipe(
            map(({ id, name }: IClass) => ({ id, name })),
            toArray()
        );
        // this.classList$ = this._classList$.pipe(toArray());
    }

    // private onClassChanged(classList$: Observable<IClass>): (id: number) => void {
    //     return (id: number) => {
    //         classList$.pipe(
    //             filter((c: IClass) => c.id === id),
    //             defaultIfEmpty({}),
    //         ).subscribe(({ id, name, classElements }: IClass) => {
    //             console.log(id, name, classElements.length);
    //             this.form.patchValue({
    //                 classId: id || this.defaultClassName.id,
    //                 className: name || this.defaultClassName.name
    //             }, { emitEvent: false });

    //             of(...classElements || []).pipe(
    //                 filter((classElement: ClassItem) => classElement.type === 'class-element'),
    //                 toArray()
    //             ).subscribe((classElements: ClassItem[]) => {
    //                 this.classElements = classElements;
    //             });
    //             of(...classElements || []).pipe(
    //                 filter((classElement: ClassItem) => classElement.type === 'student'),
    //                 toArray()
    //             ).subscribe((classElements: ClassItem[]) => {
    //                 this.students = classElements;
    //             });
    //         })
    //     }
    // }

    private reset(): void {
        this.classIdControl.patchValue(this.unselectedClassId, { emitEvent: true });
    }

    private import(): void {
        const uploader: HTMLInputElement = document.createElement('input');
        uploader.hidden = true;
        uploader.type = 'file';
        uploader.onchange = (event) => {
            const files = (event.target as HTMLInputElement).files;


            var fileReader = new FileReader();
            fileReader.onload = (fileLoadedEvent: ProgressEvent) => {
                // check
                const { id, name, classElements } = JSON.parse((fileLoadedEvent.target as FileReader).result.toString());
                // console.log(textFromFileLoaded);
                const classData: IClass = {
                    id,
                    name,
                    classElements
                };
                this.persistanceService.saveClass(classData);
                this.getClassNames();

            };

            fileReader.readAsText(files[0], "UTF-8");
        }

        window.document.body.append(uploader);

        uploader.click();
    }

    private print(): any {
        print();
    }

    private export(): void {
        const classId = this.form.value.classId !== this.defaultClassName.id ? this.form.value.classId : (new Date()).getTime();
        const className = this.form.value.className;
        const classData: IClass = {
            id: classId,
            name: className,
            classElements: [
                ...this.classElements,
                ...this.students
            ]
        };

        const blob = new Blob([JSON.stringify(classData)], { type: 'application/octet-stream' });
        this.domService.downloadBlob(blob, `export_${className}__${'01/01/2020'}.txt`)
    }


    // Utils
    private getId(): number {
        return (new Date()).getTime();
    }

}
