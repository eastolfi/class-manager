import { Injectable } from '@angular/core';
import { Alert } from './alert';

@Injectable(/*{
	providedIn: 'root'
}*/)
export class AlertService {

	constructor() { }

	show: (alert: Alert|string) => void;
	showSuccess: (message: string) => void;
	showWarning: (message: string) => void;
	showError: (message: string) => void;
	hide: (alert: Alert|number) => void;
}
