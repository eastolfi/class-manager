import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DialogService {

    constructor(private readonly dialog: MatDialog) { }

    public openDialog<T, U>(componentClass: ComponentType<T>, config?: MatDialogConfig): Observable<U> {
        const dialogRef = this.dialog.open(componentClass, config);

        return dialogRef.afterClosed();
    }
}
