import Logger from "./Utils/Logger";
import Settings from "./Utils/Settings";

import PreloadTemplates from "./PreloadTemplates";

Hooks.once("init", async () => {
	Logger.Log("Initializing....")
	Settings.Get().RegisterSettings();
	await PreloadTemplates();
});

Hooks.once("setup", () => {
	Logger.Log("Template module is being setup.")
});

Hooks.once("ready", () => {
	Logger.Ok("Template module is now ready.");
});

Hooks.on("renderChatMessage", (message: ChatMessage, html: any, data: any) => {
	if (message.roll?.result != null) {
		const result: string = message.roll.result
		Logger.Log(result)
	}
})