export class IdFactory {
	public static createId(): number {
		return (new Date().getTime());
	}
}
