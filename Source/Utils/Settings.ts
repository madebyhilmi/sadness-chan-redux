import Logger from "./Logger";
import utils from "./Helpers";
import ListsEditor from "../Apps/ListsEditor";
import listDefaults from "../Lists/listDefaults";
import settingDefaults from "../Lists/settingsDefaults";
import {Assert} from "../Globals";

class Settings {
	private static game: Game;
	private static instance: Settings;

	private SettingsInit = false;

	private constructor() {
		Logger.Ok("Loading configuration settings...");
	}


	public static Get(): Settings {
		if (Settings.instance)
			return Settings.instance;

		Settings.instance = new Settings();
		return Settings.instance;
	}

	public RegisterSettings(): void {
		if (this.SettingsInit)
			return;

		Assert(game instanceof Game);
		Settings.game = game as Game;

		Settings._registerMenus();
		Settings._registerLists();

		settingDefaults.SETTINGS.forEach((setting: any): void => {
			Settings._registerSetting(setting.key, setting.data);
		});

		this.SettingsInit = true;
		Logger.LogWithTitle("Settings initialized successfully.")
	}

	private static _registerSetting(key: string, data: any): void {
		Logger.LogWithTitle("key: " + key + ", data: " + data);
		Settings.game.settings.register(utils.moduleName, key, data);
	}

	private static _registerMenus(): void {
		Settings.game.settings.registerMenu(utils.moduleName, settingDefaults.SETTING_KEYS.LISTS_EDITOR, {
			name: "Lists editor:",
			label: "Open list editor",
			icon: "fas fa-edit",
			type: ListsEditor,
			restricted: true,
		});
	}

	private static _registerLists(): void {
		const defaultList = JSON.stringify({
			'fail': [...listDefaults.DEFAULT_CRIT_FAIL_COMMENTS],
			'success': [...listDefaults.DEFAULT_CRIT_SUCCESS_COMMENTS],
			'fail_portraits': [...listDefaults.DEFAULT_CRIT_FAIL_PORTRAITS],
			'portraits': [...listDefaults.DEFAULT_CRIT_SUCCESS_PORTRAITS]
		});
		this._registerSetting(settingDefaults.SETTING_KEYS.LISTS, {
			type: String,
			default: defaultList,
			scope: "world",
			config: false,
			restricted: true,
		});
	}

	private static _getSetting(key: string): any {
		return Settings.game.settings.get(utils.moduleName, key);
	}

	private static _setSetting(key: string, data: any): Promise<any> {
		return Settings.game.settings.set(utils.moduleName, key, JSON.stringify(data));
	}

	public resetLists(): Promise<any> {
		const defaultList = JSON.stringify({
			'fail': [...listDefaults.DEFAULT_CRIT_FAIL_COMMENTS],
			'success': [...listDefaults.DEFAULT_CRIT_SUCCESS_COMMENTS],
			'fail_portraits': [...listDefaults.DEFAULT_CRIT_FAIL_PORTRAITS],
			'portraits': [...listDefaults.DEFAULT_CRIT_SUCCESS_PORTRAITS]
		});

		return Settings._setSetting(settingDefaults.SETTING_KEYS.LISTS, defaultList);
	}

	public resetAllSettings() {
		for (const item in settingDefaults.SETTING_DEFAULTS) {

			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			const settings = this.setSetting(settingDefaults.SETTING_KEYS[item], settingDefaults.SETTING_DEFAULTS[item]);
		}
	}

	public resetCounter(): Promise<any> {
		return this.setCounter({});
	}


	public getSetting(key: string): any {
		return Settings._getSetting(key);
	}

	public setSetting(key: string, data: any): Promise<any> {
		return Settings.game.settings.set(utils.moduleName, key, data);
	}

	public setCounter(counterData: any): Promise<any> {
		return Settings._setSetting(settingDefaults.SETTING_KEYS.COUNTER, counterData);
	}

	public getCounter(): any {
		const setting = this.getSetting(settingDefaults.SETTING_KEYS.COUNTER);
		try {
			return JSON.parse(setting);
		} catch (error) {
			return {};
		}
	}

	public setLists(listsData: any): Promise<any> {
		return Settings._setSetting(settingDefaults.SETTING_KEYS.LISTS, listsData);
	}

	public getLists(): any {
		const setting = this.getSetting(settingDefaults.SETTING_KEYS.LISTS);
		try {
			return JSON.parse(setting);
		} catch (error) {
			return {};
		}
	}

	public getPermissionLevel(): number {
		return this.getSetting(settingDefaults.SETTING_KEYS.RESET_LEVEL);
	}

	public resetUserCounter(userID: any): void {
		const counter = this.getCounter();
		counter[userID]?.rolls?.fill(0);
		this.setCounter(counter);
	}
}

export default Settings.Get();
