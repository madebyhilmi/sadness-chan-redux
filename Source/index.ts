import Logger from "./Utils/Logger";
import Init from "./Hooks/Init";
import RollHook from "./Hooks/RollHook";

Hooks.once('init', Init.initHook.bind(Init));


Hooks.once("ready", () => {
	Logger.Ok("Is ready to tickle you!")
});

Hooks.on('createChatMessage', RollHook.createRollHook.bind(RollHook));