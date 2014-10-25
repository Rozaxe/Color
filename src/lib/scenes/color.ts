/// <reference path="../scenes.ts" />
/// <reference path="../managers.ts" />

module Scenes {
	export class Color implements Base {
		content: HTMLElement = document.getElementById('content')
		word:    HTMLElement = document.getElementById('word')
		chrono:  HTMLElement = document.getElementById('chrono')
		choice:  HTMLElement = document.getElementById('choices')
		choices: NodeList    = document.getElementsByClassName('choice')
		audio:   HTMLAudioElement = <HTMLAudioElement> document.getElementById('loop')
		fail:   HTMLAudioElement = <HTMLAudioElement> document.getElementById('fail')

		score:    number = 0
		duration: number = 1010
		winning:  HTMLElement
		timer:    number

		start() {
			for (var i = 0 ; i < this.choices.length ; ++i) {
				Managers.Scene.attach(this.choices[i], 'click', (e) => this.valid(<HTMLElement> e.target))
			}
			Managers.Scene.attach(window, 'keyup', (e: KeyboardEvent) => this.keyboard(e))
			this.closeText()
			// Start music
			this.audio.play()
		}

		terminate() {
			// Stop music
			this.fail.play()
			this.audio.pause()
			this.audio.currentTime = 0
		}

		updateWord() {
			var colors = Managers.Color.getColors(3)

			this.updateChoice(colors)
			this.updateText(colors[0], colors[1])
			this.updateContent(colors[2])

			this.timer = window.setTimeout(() => this.valid(null), this.duration)
		}

		updateChoice(colors: Tools.Color[]) {
			var first = Math.floor(Math.random() * colors.length)
			this.winning = <HTMLElement> this.choices.item(first)
			for (var i = 0 ; i < colors.length ; ++i) {
				//(<HTMLElement> this.choices.item((i + first) % this.choices.length)).className = 'choice ' + colors[i].light
				this.applyBackgroundColor(<HTMLElement> this.choices.item((i + first) % this.choices.length), colors[i].light)
			}
		}

		updateText(col1: Tools.Color, col2: Tools.Color) {
			this.word.innerHTML    = col1.name
			this.word.style.color  = col2.regular
			this.word.className   += ' bigger'
			this.chrono.className += ' upper'
		}

		updateContent(col: Tools.Color) {
			this.applyBackgroundColor(this.content, col.regular)
		}

		getChoice(i: number): HTMLElement {
			return (<HTMLElement> this.choice.children.item(i))
		}

		keyboard(e: KeyboardEvent) {
			switch(e.keyCode) {
				case 37: // LEFT
					return this.valid(this.getChoice(0))
				case 40: // DOWN
					return this.valid(this.getChoice(1))
				case 39: // RIGHT
					return this.valid(this.getChoice(2))
			}
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

		applyBackgroundColor(elem: HTMLElement, color: string) {
			elem.style.backgroundColor = color
		}

		closeText() {
			this.word.className   = this.word.className.replace(/\s*\bbigger\b/, '')
			this.chrono.className = this.chrono.className.replace(/\s*\bupper\b/, '')
			// Because browsers are dumb, they need a time to refresh the CSS
			window.setTimeout(() => this.updateWord(), 16)
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
