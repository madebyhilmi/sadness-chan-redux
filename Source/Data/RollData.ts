export default class RollData {
	user: User;
	value: number;
	maximum: number;
	minimum: number;

	public constructor(user: User, value: number, maximum: number, minimum = 1) {
		this.minimum = minimum;
		this.maximum = maximum;
		this.user = user;
		this.value = value;
	}

	public isCriticalSuccess(): boolean {
		return this.value == this.maximum;
	}

	public isCriticalFailure(): boolean {
		return this.value == this.minimum;
	}

	public isCritical(): boolean {
		return this.isCriticalSuccess() || this.isCriticalFailure();
	}

}

