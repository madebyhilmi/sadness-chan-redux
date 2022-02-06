import RollData from "../Data/RollData";
import {USER_ROLES} from "../Utils/Constants";
import {ChatMessageSender} from "../ChatMessageSender";

class RollHook {
	private static _instance: RollHook;

	private constructor() {
	}

	public static getInstance(): RollHook {
		if (!RollHook._instance) RollHook._instance = new RollHook();
		return RollHook._instance;
	}

	public async createRollHook(chatMessage: ChatMessage): Promise<void> {
		if (chatMessage.roll == undefined || chatMessage.user == undefined) {
			return;
		}
		const rolledUser = chatMessage.user;

		if (rolledUser.role.valueOf() == USER_ROLES.NONE) {
			return;
		}

		const rolls = RollHook._extractRolls(rolledUser, chatMessage.roll.dice);

		rolls.forEach(roll => {
			if (roll.isCritical()) {
				ChatMessageSender.sendMessageFromRoll(roll);
			}
		})
	}

	private static _extractRolls(user: User, dieType: DiceTerm[]): RollData[] {
		const rolls: RollData[] = [];
		dieType.forEach(die => {
			die.results.forEach(roll => {
				rolls.push(new RollData(user, roll.result, die.faces));
			})
		})
		return rolls;
	}

}

export default RollHook.getInstance();