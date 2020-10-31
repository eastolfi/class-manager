import { Component, OnInit } from '@angular/core';

import { Alert, AlertType } from './alert';
import { AlertService } from './alert.service';

@Component({
	selector: 'cm-alert',
	templateUrl: './alert.component.html',
	styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
	public alerts: Alert[] = []

	constructor(private _service: AlertService) {
		_service.show = this.show.bind(this)
		_service.showSuccess = this.showSuccess.bind(this)
		_service.showWarning = this.showWarning.bind(this)
		_service.showError = this.showError.bind(this)
		_service.hide = this.hide.bind(this)
	}

	ngOnInit() {
	}

	public getTypeClass(alert: Alert): string {
		switch (alert.type) {
			case AlertType.SUCCESS:
				return 'alert-success'
			case AlertType.WARNING:
				return 'alert-warning'
			case AlertType.ERROR:
				return 'alert-danger'
			default:
				return 'alert-primary'
		}
	}

	public show(alert: Alert|string): void {
		if (alert instanceof Alert) {
			this.alerts.push(alert)
		} else {
			this.alerts.push(new Alert(alert))
		}
	}

	public showSuccess(message: string): void {
		this.show(new Alert(message, AlertType.SUCCESS))
	}

	public showWarning(message: string): void {
		this.show(new Alert(message, AlertType.WARNING))
	}

	public showError(message: string): void {
		this.show(new Alert(message, AlertType.ERROR))
	}

	public hide(alert: Alert|number): void {
		let alertId = (alert instanceof Alert) ? (alert as Alert).id : (alert as number)
		this.alerts = this.alerts.filter((item: Alert) => item.id !== alertId)
	}
}
