export interface Result {
	result: number;
	active: boolean;
}

export interface Term {
	class: string;
	evaluated: boolean;
	number: number;
	faces: number;
	modifiers: any[];
	results: Result[];
}

export interface Roll {
	class: string;
	dice: any[];
	formula: string;
	terms: Term[];
	total: number;
	evaluated: boolean;
}

export interface DiceSoNice {
	welcomeMessageShown: boolean;
}

export interface DdbGameLog {
	welcomeMessageDisplayed: boolean;
}

export interface Flags {
	diceSoNice: DiceSoNice;
	ddbGameLog: DdbGameLog;
}

export interface User {
	_id: string;
	character?: any;
	color: string;
	hotbar: Hotbar;
	name: string;
	password: string;
	permissions: Permissions;
	role: number;
	flags: Flags;
}

export interface Context {
	roll: Roll;
	user: User;
	users?: any;
	blind: boolean;
}

