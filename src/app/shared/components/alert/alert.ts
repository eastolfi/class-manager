import { IdFactory } from "../../factories/id.factory";

export enum AlertType {
	SUCCESS, WARNING, ERROR
}

export class Alert {
	id: number = IdFactory.createId();
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