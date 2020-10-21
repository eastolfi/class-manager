import { Component, OnInit, SecurityContext } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DialItem } from '@app/shared/components/fab-dial/fab-dial.component';
import { ItemEditDialogComponent } from '@app/shared/components/item-edit-dialog/item-edit-dialog.component';
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

    public classList$: Observable<IClass[]>;
    public classNameList$: Observable<IClassName[]>;

    private COLORS = {
        red: 'lightcoral',
        orange: 'lightsalmon',
        yellow: 'lightyellow',
        green: 'lightseagreen',
        blue: 'lightskyblue',
        none: 'inherit'
    };

    public students: ClassItem[] = [
        // { id: 1, label: 'Mohamed', color: this.COLORS['none'], type: 'student' },
        // { id: 2, label: 'Mamadou', color: this.COLORS['none'], type: 'student' },
        // { id: 3, label: 'Paco', color: this.COLORS['none'], type: 'student' },
        // { id: 4, label: 'Pepe', color: this.COLORS['none'], type: 'student' },
        // { id: 5, label: 'Leo', color: this.COLORS['none'], type: 'student' },
        // { id: 6, label: 'Wiem', color: this.COLORS['none'], type: 'student' },
        // { id: 7, label: 'Hatem', color: this.COLORS['none'], type: 'student' }
    ];

    public classElements: ClassItem[] = [
        // { id: 8, label: 'Mesa', orientation: 'vertical', type: 'class-element', lastKnownPosition: { x: 50, y: 420 } },
        // { id: 9, label: 'Ventana', orientation: 'vertical', type: 'class-element', lastKnownPosition: { x: 50, y: 100 } }
    ];

    constructor(
        private readonly sanitizer: DomSanitizer,
        private readonly fb: FormBuilder,
        private readonly dialog: MatDialog,
        private readonly persistanceService: PersistenceService,
        private readonly menuOpenerState: MenuOpenerStateService
    ) {
        this.form = this.fb.group({
            classId: [-1],
            className: ['']
        });
    }

    ngOnInit() {
        this.getClassNames();
        // const itemPositions: ItemPosition[] = this.persistanceService.getItemPositions();

        // itemPositions.forEach((savedItem: ItemPosition) => {
        //     const item = [
        //         ...this.classElements,
        //         ...this.students
        //     ].find(item => item.id === savedItem.id);

        //     if (item) {
        //         item.lastKnownPosition = savedItem.position;
        //     }
        // });
    }

    private subs: Subscription;
    private getClassNames(refresh: boolean = false): void {
        const _classList$: Observable<IClass> = this.persistanceService.getClasses();

        this.classNameList$ = _classList$.pipe(
            map(({ id, name }: IClass) => ({ id, name })),
            toArray()
        );
        this.classList$ = _classList$.pipe(toArray());

        const sub = this.form.get('classId').valueChanges.subscribe(this.onClassChanged(_classList$).bind(this));
        // this.subs.add(sub);
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

    public saveClass(): void {
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
        this.getClassNames();
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


    private lastId = 9;
    public addStudent() {
        this.students.push({
            id: ++this.lastId,
            label: 'Alumno',
            color: this.COLORS['none'],
            type: 'student'
        });
        this.saveClass();
        // this.closeDial();
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
            // Change to ID
            this.students = this.students.filter(student => student.label !== this.menuOpener.label);
        }

        // this.currentMenuOpener = null;
    }



    public resetPosition(): void {
        document.querySelectorAll('.draggable').forEach((item: HTMLElement) => item.style.transform = '')
        // this.classElements[1].lastKnownPosition = null;
    }




    public defaultClassName: IClassName = { id: 99, name: '' }
    private onClassChanged(classList$: Observable<IClass>): (id: number) => void {
        return (id: number) => {
            classList$.pipe(
                filter((c: IClass) => c.id === id),
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
            })
        }
    }
    public get classId(): number {
        return this.form.get('classId').value;
    }
    public get isNewClass(): boolean {
        return this.classId && this.classId !== this.defaultClassName.id && this.classId !== -1;
    }

    public import(/*uploader: HTMLInputElement*/): void {
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
    // public importFile(event: InputEvent): void {
    //     const files = (event.target as HTMLInputElement).files;


    //     var fileReader = new FileReader();
    //     fileReader.onload = function(fileLoadedEvent) {
    //         var textFromFileLoaded = fileLoadedEvent.target.result;
    //         console.log(textFromFileLoaded);
    //     };

    //     fileReader.readAsText(files[0], "UTF-8");
    // }
    public fileUrl: SafeResourceUrl;
    public export(/*downloader: HTMLInputElement*/): void {
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
        this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));

        const downloader: HTMLAnchorElement = document.createElement('a');
        // downloader.setAttribute('hidden', 'true');
        downloader.hidden = true;
        downloader.href = this.sanitizer.sanitize(SecurityContext.RESOURCE_URL,
            this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob)));
        downloader.download = 'pruebas.txt';

        window.document.body.append(downloader);

        // downloader.onclick =
        downloader.click();
    }


    public dialItems: DialItem[] = [
        { icon: 'person_add', onClick: this.addStudent.bind(this) },
        { icon: 'cloud_download', onClick: this.export.bind(this) },
        { icon: 'cloud_upload', onClick: this.import.bind(this) }
    ]

}
