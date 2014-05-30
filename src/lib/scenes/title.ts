
/// <reference path="../scenes.ts" />

module Scenes {
	export class Title implements Base {

		loader: HTMLElement = document.getElementById('loader')

		start() {
			Managers.Scene.attach(this.loader, 'click', (e) => this.tap())
		}

		terminate() {}

		tap() {
			this.loader.className += 'loaded'
			Managers.Scene.change_scene(new Scenes.Color())
		}

		/*
		Element loader = querySelector('#loader');

		Scene_Title();

		void start() {
		attach(loader.onClick, (event) => (tap()));
		attach(loader.querySelector('a').onClick, (event) => (prevent(event)));
	}

		void tap() {
		loader.classes.add('loaded');
		change_scene(new Scene_Color());
	}

		void prevent(Event e) {
		e.stopPropagation();
	}

	void terminate() {}
		start() {}
		terminate() {}*/
	}
}