import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { DialItem } from '@app/shared/components/fab-dial/fab-dial.component';
import { ItemEditDialogComponent } from '@app/shared/components/item-edit-dialog/item-edit-dialog.component';
import { ClassItem, ClassLayout, ClassName } from '@app/shared/models/class-layout';
import { ClassLayoutService } from '@app/shared/services/class-layout.service';
import { DomService } from '@app/shared/services/dom.service';
import { MenuOpenerStateService } from '@app/shared/services/menu-opener-state.service';
import { PersistenceService } from '@app/shared/services/persistence.service';

@Component({
    selector: 'co-class-layout',
    templateUrl: './class-layout.component.html',
    styleUrls: ['./class-layout.component.scss']
})
export class ClassLayoutComponent implements OnInit {

    public form: FormGroup;

    public readonly ADD_CLASS_ID = 0;
    private readonly UNSELECTED_CLASS_ID = -1;

    public classNameList$: Observable<ClassName[]>;
    public students: ClassItem[] = [];
    public classElements: ClassItem[] = [];

    public dialItems: DialItem[] = [
        { icon: 'sensor_door', onClick: this.addClassElement.bind(this), disabled: true },
        { icon: 'person_add', onClick: this.addStudent.bind(this), disabled: true },
        { icon: 'save', onClick: this.print.bind(this), disabled: true },
        { icon: 'cloud_download', onClick: this.export.bind(this), disabled: true },
        { icon: 'sync_alt', onClick: this.import.bind(this), disabled: false }
    ];

    private COLORS = {
        red: 'lightcoral',
        orange: 'lightsalmon',
        yellow: 'lightyellow',
        green: 'lightseagreen',
        blue: 'lightskyblue',
        none: 'inherit'
    };

    constructor(
        private readonly fb: FormBuilder,
        private readonly dialog: MatDialog,
        private readonly persistanceService: PersistenceService,
        private readonly classLayoutService: ClassLayoutService,
        private readonly domService: DomService,
        private readonly menuOpenerState: MenuOpenerStateService
    ) {
        this.form = this.fb.group({
            classId: [this.UNSELECTED_CLASS_ID],
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
        return this.classId && this.classId !== this.ADD_CLASS_ID && this.classId !== this.UNSELECTED_CLASS_ID;
    }

    public saveClass(): void {
        if (this.form.value.className.trim().length === 0) {
            return;
        }

        const classId = this.form.value.classId !== this.ADD_CLASS_ID ? this.form.value.classId : (new Date()).getTime();
        const className = this.form.value.className;
        const classData: ClassLayout = {
            id: classId,
            name: className,
            classItems: [
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
            .subscribe(() => this.resetLayout());
        }
    }

    public onMenuClosed(): void {
        this.menuOpenerState.clear();
    }

    public changeColor(color: string) {
        this.menuOpenerState.state$.value.color = this.COLORS[color];
        this.saveClass();
    }

    public rotateItem() {
        if (this.menuOpener.orientation === 'vertical') {
            this.menuOpener.orientation = 'horizontal';
        } else {
            this.menuOpener.orientation = 'vertical';
        }
    }

    public addStudent() {
        this.students.push({
            id: this.getId(),
            label: 'Alumno',
            color: this.COLORS['none'],
            type: 'student'
        });
        this.saveClass();
    }

    public addClassElement() {
        this.classElements.push({
            id: this.getId(),
            label: 'Ventana',
            type: 'class-element',
            orientation: 'vertical'
        });
    }

    public editItem() {
        const opener = this.menuOpener;

        const dialogRef = this.dialog.open(ItemEditDialogComponent, {
            width: '300px',
            data: this.menuOpener
        });

        dialogRef.afterClosed().subscribe((editedItem: ClassItem) => {
            if (editedItem) {
                opener.label = editedItem.label;
            }
        });
    }

    public deleteItem(): void {
        const { id: itemId, type } = this.menuOpener;
        this.onMenuClosed();

        if (type === 'student') {
            this.students = this.students.filter(student => student.id !== itemId);
        } else {
            this.classElements = this.classElements.filter(element => element.id !== itemId);
        }

        this.saveClass();
    }

    private initListeners(): void {
        this.persistanceService.saveRequestSubject.subscribe(() => this.saveClass());
        this.classIdControl.valueChanges.subscribe((classId: number) => {
            switch (classId) {
                case this.UNSELECTED_CLASS_ID:
                    this.getClassNames();
                    this.initClassElements();
                    this.disableFabDialForNoClass();

                    break;
                case this.ADD_CLASS_ID:
                    this.enableFabDialForClass();
                    this.initClassElements();
                    this.form.patchValue({
                        className: ''
                    }, { emitEvent: false });

                    break;
                default:
                    this.enableFabDialForClass();

                    this.classLayoutService.getClassById(classId)
                    .subscribe(({ id, name, classElements, students }: ClassLayout) => {
                        this.form.patchValue({
                            classId: id || this.ADD_CLASS_ID,
                            className: name || ''
                        }, { emitEvent: false });

                        this.classElements = classElements;
                        this.students = students;
                    });
            }
        });
    }

    private initClassElements(): void {
        this.classElements = [];
        this.students = [];
    }

    private disableFabDialForNoClass(): void {
        this.dialItems.forEach((item: DialItem) => {
            // TODO - change to name or id
            if (item.icon !== 'sync_alt') {
                item.disabled = true;
            } else {
                item.disabled = false;
            }
        });
    }
    private enableFabDialForClass(): void {
        this.dialItems.forEach((item: DialItem) => {
            item.disabled = false;
        });
    }

    private getClassNames(): void {
        this.classNameList$ = this.classLayoutService.getClassNames();
    }

    private resetLayout(): void {
        this.classIdControl.patchValue(this.UNSELECTED_CLASS_ID, { emitEvent: true });
    }

    private import(): void {
        this.domService.uploadFile().subscribe((blob: string) => {
            const { id, name, classItems } = JSON.parse(blob) as ClassLayout;
            const classData: ClassLayout = {
                id,
                name,
                classItems
            };
            this.persistanceService.saveClass(classData);
            this.getClassNames();
        });

    }

    private print(): any {
        window.print();
    }

    private export(): void {
        const classId = this.form.value.classId !== this.ADD_CLASS_ID ? this.form.value.classId : (new Date()).getTime();
        const className = this.form.value.className;
        const classData: ClassLayout = {
            id: classId,
            name: className,
            classItems: [
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
