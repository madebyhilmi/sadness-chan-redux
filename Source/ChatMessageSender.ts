import Utils from "./Utils/Helpers";
import Settings from "./Utils/Settings";
import settingDefaults from "./Lists/settingsDefaults";
import RollData from "./Data/RollData";
import {ChatMessageData} from "./Data/ChatMessageData";

export class ChatMessageSender {
	private static readonly _settingKeys = settingDefaults.SETTING_KEYS;

	public static sendMessageFromRoll(roll: RollData): Promise<any> {
		let userName = "Roller!";
		if (roll.user.name != null) {
			userName = roll.user.name
		}
		const isSuccess = roll.isCriticalSuccess();
		const content = isSuccess ? this._selectCrtFailComments(userName) : this._selectCrtSuccessComments(userName);
		const isPublic = Settings.getSetting(settingDefaults.SETTING_KEYS.COMMENT_MESSAGE_VISIBILITY);

		const message = ChatMessageSender._generateMessageHTML(content, isSuccess);
		const data: ChatMessageData = new ChatMessageData(userName, message, isPublic);

		return ChatMessageSender._sendMessage(data);
	}

	private static async _sendMessage(data: ChatMessageData) {
		return ChatMessage.create(data.getMessage());
	}

	private static _generateMessageHTML(content: string, isSuccess = true): string {
		const chatMessageClass = `${Utils.moduleName}-chat-message`;
		const chatHeaderClass = `${chatMessageClass}-header`;
		const chatBodyClass = `${chatMessageClass}-body`

		return `
            <div class="${chatMessageClass}">
                <div class="${chatHeaderClass}">
                    ${ChatMessageSender._getRandomPortrait(chatHeaderClass, isSuccess)}
                    <h3 class="${chatHeaderClass}__name">
                        ${Settings.getSetting(ChatMessageSender._settingKeys.SADNESS_TITLE)}
                    </h3>
                </div>
                <div class="${chatBodyClass}">
                    ${content}
                </div>
            </div>
        `;
	}

	private static _updateDynamicMessages(message: string, user: string): string {
		return message.replace(/\[sc-name]/, (): string => {
			return user;
		});
	}

	private static _getRandomPortrait(cssClass: string, isSuccess = true): string {
		const {fail_portraits, portraits} = Settings.getLists();
		const portrait = Utils.getRandomItemFromList(isSuccess ? portraits : fail_portraits);
		const noBorder = Settings.getSetting(ChatMessageSender._settingKeys.IMAGE_BORDER) ? '' : 'no-border';
		if (!portrait) return '';

		return `
            <img
                src="${portrait}"
                alt="${Utils.moduleName}-portrait"
                class="${cssClass}__portrait ${noBorder}"
            />
        `;
	}

	private static _selectCrtFailComments(user: string): string {
		const {fail} = Settings.getLists();
		const message = Utils.getRandomItemFromList(fail);
		return this._updateDynamicMessages(message, user);
	}

	private static _selectCrtSuccessComments(user: any): string {
		const {success} = Settings.getLists();
		const message = Utils.getRandomItemFromList(success);
		return this._updateDynamicMessages(message, user);
	}
}