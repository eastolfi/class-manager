import { Utils } from '@app/shared/utils/utils';

export enum AlertType {
	SUCCESS, WARNING, ERROR
}

export class Alert {
	id: number = Utils.createId();
	type: AlertType = AlertType.SUCCESS;
	message: string;
	timeout?: number;
	dismiss: boolean = false;

	constructor(message: string, type?: AlertType, dismiss?: boolean) {
		this.message = message

		if (type) this.type = type
		if (dismiss != null) this.dismiss = dismiss
	}
}
