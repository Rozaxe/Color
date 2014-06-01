
/// <reference path="../scenes.ts" />

module Scenes {
	export class Title implements Base {

		loader: HTMLElement = document.getElementById('loader')

		start() {
			(<HTMLElement> this.loader.querySelector('p')).innerHTML = 'Tapez pour jouer !'
			Managers.Scene.attach(this.loader, 'click', (e) => this.tap())
            Managers.Scene.attach(window, 'keyup', (e: KeyboardEvent) => this.tap())
            Managers.Scene.attach((<HTMLElement> this.loader.querySelector('a')), 'click', (e: MouseEvent) => (this.prevent(e)))
		}

		terminate() {}

		tap() {
			this.loader.className += ' loaded'
			Managers.Scene.change_scene(new Scenes.Color())
		}

		prevent(e: MouseEvent) {
			e.stopPropagation()
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