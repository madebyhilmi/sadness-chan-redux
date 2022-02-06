import Globals from "./Globals";
import Helpers from "./Utils/Helpers";

const PreloadTemplates = async (): Promise<Handlebars.TemplateDelegate<any>[]> => {
	const rootPath = `${Globals.IsModule ? "modules" : "systems"}/${Helpers.moduleName}/templates/`;
	// Place relative paths in array below, e.g.:
	// const templates = [ rootPath + "actor/actor-sheet.hbs" ]
	// This would map to our local folder of /Assets/templates/Actor/actor-sheet.hbs
	const templates: Array<string> = [];
	return loadTemplates(templates);
}

export default PreloadTemplates;