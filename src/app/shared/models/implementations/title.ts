import { ITitle } from "../interfaces/title";

export class Title implements ITitle {
	public title: string = "";
	public score?: number;
	public showScore: boolean = false;
}
