
/// <reference path="../scenes.ts" />

module Scenes {
	export class Title implements Base {
		loader: HTMLElement = document.getElementById('loader')

		start() {
			(<HTMLElement> this.loader.querySelector('div')).innerHTML = 'Tap me !'
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
	}
}
