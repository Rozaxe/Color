/// <reference path="../scenes.ts" />
/// <reference path="../managers.ts" />

module Scenes {
	export class Color implements Base {
		content: HTMLElement = document.getElementById('content')
		word:    HTMLElement = document.getElementById('word')
		chrono:  HTMLElement = document.getElementById('chrono')
		choice:  HTMLElement = document.getElementById('choices')
		choices: NodeList    = document.getElementsByClassName('choice')

		score:    number = 0
		duration: number = 1010
		winning:  HTMLElement
		timer:    number

		start() {
			for (var i = 0 ; i < this.choices.length ; ++i) {
				Managers.Scene.attach(this.choices[i], 'click', (e) => this.valid(<HTMLElement> e.target))
			}
			Managers.Scene.attach(window, 'keyup', this.keyboard)
			this.closeText()
		}

		terminate() {}

		updateWord() {
			var colors = Managers.Color.getColors(3)

			this.updateChoice(colors)
			this.updateText(colors[0], colors[1])
			this.updateContent(colors[2])

			this.timer = window.setTimeout(() => valid(null), this.duration)
		}

		updateChoice(colors: Tools.Color[]) {
			var first = Math.floor(Math.random() * colors.length)
			this.winning = this.choices[first]
			for (var i = 0 ; i < colors.length ; ++i) {
				this.applyBackgroundColor(this.choices[(i + first) % this.choices.length], colors[i])
			}
		}

		updateText(col1: Tools.Color, col2: Tools.Color) {
			this.word.innerText = col1.regular
			this.word.className = col2.regular
			this.word.className   += 'bigger'
			this.chrono.className += 'upper'
		}

		updateContent(col: Tools.Color) {
			this.applyBackgroundColor(this.content, col);
		}

		getChoice(i: number): HTMLElement {
			return <HTMLElement> this.choice.children.item(i)
		}

		keyboard(e: KeyboardEvent) {
			/*
			switch(e.keyCode) {
				case KeyCode.LEFT:
			}*/
		}

		valid(elem: HTMLElement) {
			window.clearTimeout(this.timer)
			if (elem == this.winning) {
				++this.score
			} else {
				Managers.Scene.change_scene(new Scenes.Score(this.score))
				return
			}
			this.closeText()
		}

		applyBackgroundColor(elem: HTMLElement, color: Tools.Color) {
			elem.className = color.light
		}

		closeText() {
			this.word.className = this.word.className.replace(/\bbigger\b/, '')
			this.word.className = this.word.className.replace(/\bupper\b/, '')
			window.setTimeout(this.updateWord())
		}
		/*

		 void keyboard(KeyboardEvent e) {
		 switch (e.keyCode) {
		 case KeyCode.LEFT:
		 valid(getChoice(0));
		 break;
		 case KeyCode.DOWN:
		 valid(getChoice(1));
		 break;
		 case KeyCode.RIGHT:
		 valid(getChoice(2));
		 break;
		 }
		 }
		 */
	}
}
