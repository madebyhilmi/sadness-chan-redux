class Helpers {
	private static _instance: Helpers;
	private readonly _debugging: boolean;
	private readonly _trace: boolean;
	public readonly moduleName: string = 'sadness-chan-redux';
	public readonly moduleTitle: string = 'Sadness Chan Redux';

	private constructor(debugging: boolean, trace: boolean) {
		this._debugging = debugging;
		this._trace = trace;

		if (debugging) CONFIG.debug.hooks = debugging;
	}

	public static getInstance(debugging: boolean, trace: boolean): Helpers {
		if (!Helpers._instance) Helpers._instance = new Helpers(debugging, trace);
		return Helpers._instance;
	}

	public getRandomItemFromList(list: Array<any>): any {
		return typeof list !== "undefined" && list?.length > 0 ? list[Math.floor(Math.random() * list.length)] : null;
	}

	public roundUp(nr: number): number {
		return Math.round((nr + Number.EPSILON) * 10) / 10;
	}

/*	public getAllPlayerNamesAndIDs() {
		const users = game.users.entities;
		const playerData = {};
		users.forEach((user: any) => {
			playerData[user.data.name] = user.data._id;
		})
		return playerData;
	}*/
}

export default Helpers.getInstance(false, false);