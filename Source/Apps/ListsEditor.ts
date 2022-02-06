import Helpers from "../Utils/Helpers";
import Settings from "../Utils/Settings"

export default class ListsEditor extends FormApplication {
	static get defaultOptions(): any {
		return {
			...super.defaultOptions,
			title: 'Lists editor',
			template: `modules/${Helpers.moduleName}/templates/comments-editor.html`,
			submitOnChange: false,
			submitOnClose: true,
			closeOnSubmit: true,
		};
	}

	// eslint-disable-next-line @typescript-eslint/ban-types
	public getData(options?: {}): any {
		return {
			options: this.options,
			moduleName: Helpers.moduleName,
			lists: this._prepareListsForDisplay(),
		};
	}

	public async _updateObject(event: Event | JQuery.Event, formData: any): Promise<any> {
		const {fail, success, fail_portraits, portraits} = formData;
		const oldLists = Settings.getLists();

		const listsData = {
			'fail': this._convertStringToList(fail, oldLists.fail),
			'success': this._convertStringToList(success, oldLists.success),
			'fail_portraits': this._convertStringToList(fail_portraits, oldLists.fail_portraits),
			'portraits': this._convertStringToList(portraits, oldLists.portraits),
		};

		return Settings.setLists(listsData)
	}

	public activateListeners(html: JQuery | HTMLElement): void {
		super.activateListeners(<JQuery>html);
	}

	private _prepareListsForDisplay(): any {
		const {fail, success, fail_portraits, portraits} = Settings.getLists();
		return {
			'fail': fail?.length ? fail.join('\n') : '',
			'success': success?.length ? success.join('\n') : '',
			'fail_portraits': fail_portraits?.length ? fail_portraits.join('\n') : '',
			'portraits': portraits?.length ? portraits.join('\n') : '',
		}
	}

	private _convertStringToList(stringList: string, oldValue: Array<any>): any {
		if (!(typeof stringList === "string" && stringList !== '')) return oldValue;
		return stringList.split('\n');
	}
}