
/// <reference path="scenes.ts" />
/// <reference path="tools.ts" />

module Managers {
	export module Scene {
		var scene: Scenes.Base
		var attachs: Attached[] = new Array()

		class Attached {
			constructor(public e: EventTarget, public t: string, public l: (e: Event) => void) { }
		}

		function clean_streams() {
			attachs.forEach(function(a: Attached) {
				a.e.removeEventListener(a.t, a.l, false)
			})
		}

		export function attach(e: EventTarget, t: string, l: (e: Event) => void): void {
			e.addEventListener(t, l, false)
			attachs.push(new Attached(e, t, l))
		}

		export function change_scene(s: Scenes.Base): void {
			scene.terminate()
			clean_streams()
			init_scene(s)
		}

		export function init_scene(s: Scenes.Base): void {
			scene = s
			scene.start()
		}
	}

	export module Color {
		var colors : Tools.Color[] = new Array()

		//						   Name	  Regular	Light
		colors.push(new Tools.Color('red',	'#c0392b', '#e74c3c'))
		colors.push(new Tools.Color('green',  '#27ae60', '#2ecc71'))
		colors.push(new Tools.Color('blue',   '#2980b9', '#3498db'))
		colors.push(new Tools.Color('yellow', '#f39c12', '#f1c40f'))
		colors.push(new Tools.Color('orange', '#d35400', '#e67e22'))
		colors.push(new Tools.Color('purple', '#8e44ad', '#9b59b6'))

		// Return nb random Color
		export function getColors(nb: number): Tools.Color[] {
			var tmp : Tools.Color[] = new Array()

			for (var i = 0 ; i < nb ; ++i) {
				var col: Tools.Color
				do {
					col = colors[Math.floor(Math.random() * colors.length)]
				} while(tmp.indexOf(col) != -1)
				tmp.push(col)
			}

			return tmp
		}
	}
}
