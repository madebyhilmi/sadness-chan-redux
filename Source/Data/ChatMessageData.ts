export class ChatMessageData {
	private user: string;
	private contents: string;
	private isPublic: boolean;
	private alias: string;


	constructor(user: string, contents: string, isPublic: boolean, alias = 'Sadness Chan') {
		this.user = user;
		this.contents = contents;
		this.isPublic = isPublic;
		this.alias = alias;
	}

	public getMessage(): Message {
		const message = {
			user: this.user,
			content: this.contents,
			whisper: this.isPublic ? [] : [this.user],
			speaker: {
				alias: this.alias,
			}
		};
		return message;
	}
}

export interface Speaker {
	alias: string;
}

export interface Message {
	user: string;
	content: string,
	whisper: string[],
	speaker: Speaker;
}