import Logger from "./Utils/Logger";
import {Context} from "./Data/DSNRoll";
import Helpers from "./Utils/Helpers";
import Init from "./Hooks/Init";

Hooks.once('init', Init.initHook.bind(Init));


Hooks.once("ready", () => {
	Logger.Ok(Helpers.moduleTitle + " | Is ready to tickle you!")
});

Hooks.on('diceSoNiceRollStart', (messageId: string, context: Context) => {
	Logger.LogWithTitle(Helpers.moduleTitle + " | Roll: ")
	const roll = context.roll;
	Logger.Warn(JSON.stringify(roll));
	roll.terms.forEach(die => {
		die.results.forEach(resultObject => {
			Logger.Log("Rolled: " + resultObject.result);
		})
	});
	context.blind = true;
});
/**
 * This hook is used to add the command !sadness
 * The command will modify the message to be a whisper with some sad stats ◔w◔
 */
//Hooks.on('preCreateChatMessage', PreCreateChatMessage.preCreateChatMessageHook.bind(PreCreateChatMessage));

/**
 * This hook is used to extract roll information from a message
 * Supports default rolls and betterrolls5e
 */
//Hooks.on('createChatMessage', CreateChatMessage.createChatMessageHook.bind(CreateChatMessage));