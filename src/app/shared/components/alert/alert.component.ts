import { Component, OnInit } from '@angular/core';

import { Alert, AlertAction, AlertType } from './alert';
import { AlertService } from './alert.service';

@Component({
    selector: 'cm-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
    public alerts: Alert[] = []

    constructor(private readonly _service: AlertService) {
        _service.show = this.show.bind(this);
        _service.showSuccess = this.showSuccess.bind(this);
        _service.showWarning = this.showWarning.bind(this);
        _service.showError = this.showError.bind(this);
        _service.hide = this.hide.bind(this);
    }

    ngOnInit() {
    }

    public getTypeClass(alert: Alert): string {
        switch (alert.type) {
            case AlertType.SUCCESS:
                return 'alert-success';
            case AlertType.WARNING:
                return 'alert-warning';
            case AlertType.ERROR:
                return 'alert-danger';
            default:
                return 'alert-primary';
        }
    }

    public show(alert: Alert | string, action?: AlertAction): void {
        let newAlert: Alert;

        if (alert instanceof Alert) {
            newAlert = alert;
        } else {
            newAlert = new Alert(alert);
        }

        if (action) {
            newAlert.action = action;
        }

        this.alerts.push(newAlert);
    }

    public showSuccess(message: string, action?: AlertAction): void {
        this.show(new Alert(message, AlertType.SUCCESS), action);
    }

    public showWarning(message: string, action?: AlertAction): void {
        this.show(new Alert(message, AlertType.WARNING), action);
    }

    public showError(message: string, action?: AlertAction): void {
        this.show(new Alert(message, AlertType.ERROR), action);
    }

    public hide(alert: Alert | number): void {
        let alertId = (alert instanceof Alert) ? (alert as Alert).id : (alert as number)
        this.alerts = this.alerts.filter((item: Alert) => item.id !== alertId)
    }

    public doAction({ action }: Alert): void {
        action.fn();
    }
}
