import { Injectable } from '@angular/core';
import { Alert, AlertAction } from './alert';

@Injectable(/*{
	providedIn: 'root'
}*/)
export class AlertService {

    constructor() { }

    show: (alert: Alert | string, action?: AlertAction) => void;
    showSuccess: (message: string, action?: AlertAction) => void;
    showWarning: (message: string, action?: AlertAction) => void;
    showError: (message: string, action?: AlertAction) => void;
    hide: (alert: Alert | number) => void;
}
