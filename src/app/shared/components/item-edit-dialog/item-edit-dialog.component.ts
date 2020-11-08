import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClassItem } from '@shared/models/class-layout';

@Component({
    selector: 'co-item-edit-dialog',
    templateUrl: './item-edit-dialog.component.html',
    styleUrls: ['./item-edit-dialog.component.scss']
})
export class ItemEditDialogComponent implements OnInit {
    public form: FormGroup;
    public initialLabel: string;

    constructor(
        private readonly fb: FormBuilder,
        private readonly dialogRef: MatDialogRef<ItemEditDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private readonly data: ClassItem
    ) { }

    ngOnInit(): void {
        this.initialLabel = this.data.label;
        this.form = this.fb.group({
            label: [this.initialLabel]
        })
    }

    public get label(): FormControl {
        return this.form.get('label') as FormControl;
    }

    public confirm(): void {
        this.dialogRef.close(this.form.value);
    }

}
