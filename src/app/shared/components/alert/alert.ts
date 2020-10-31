import { Utils } from '@app/shared/utils/utils';

export enum AlertType {
    SUCCESS, WARNING, ERROR
}

export class Alert {
    id: number = Utils.createId();
    type: AlertType = AlertType.SUCCESS;
    message: string;
    dismiss: boolean = false;
    timeout?: number;
    action?: AlertAction;

    constructor(message: string, type?: AlertType, dismiss?: boolean) {
        this.message = message

        if (type) this.type = type
        if (dismiss != null) this.dismiss = dismiss
    }
}

export interface AlertAction {
    label: string;
    fn: Function;
}
