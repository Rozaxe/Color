
/// <reference path="scenes.ts" />

module Managers {
    export module Scene {
        var scene: Scenes.Base
        var attachs: Attached[]

        class Attached {
            constructor(public e: HTMLElement, public t: string, public l: (e?: Event) => void) { }
        }

        function clean_streams() {
            attachs.forEach(function(a) {
                a.e.removeEventListener(a.t, a.l, false)
            })
        }

        export function attach(e: HTMLElement, t: string, l: (e?: Event) => void): void {
            e.addEventListener(t, l, false)
            attachs.push(new Attached(e, t, l))
        }

        export function change_scene(s: Scenes.Base): void {
            s.terminate()
            clean_streams()
            init_scene(s)
        }

        export function init_scene(s: Scenes.Base): void {
            scene = s
            scene.start()
        }
    }
}
