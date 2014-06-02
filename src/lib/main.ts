
/// <reference path="managers.ts" />
/// <reference path="scenes.ts" />

window.onload = function() {
	// Animation testing
	//window.setTimeout(() => Managers.Scene.init_scene(new Scenes.Title()), 2000)
	Managers.Scene.init_scene(new Scenes.Title())
}
