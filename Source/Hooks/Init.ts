import Settings from "../Utils/Settings";
import Logger from "../Utils/Logger";
import PreloadTemplates from "../PreloadTemplates";

class Init {
	private static _instance: Init;

	private constructor() {
	}

	public static getInstance(): Init {
		if (!Init._instance) Init._instance = new Init();
		return Init._instance;
	}

	public async initHook(): Promise<void> {
		Logger.LogWithTitle(" | Initializing...")
		await PreloadTemplates();
		Settings.RegisterSettings();
	}
}

export default Init.getInstance();