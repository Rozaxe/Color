
/// <reference path="Scenes.ts" />


module Managers {
    module Scene {
        var scene : Scenes.Base
        var attachs : Attached[]

        class Attached {
            constructor(public e: HTMLElement, public t : string, public l : (e : any) => void) {}
        }

        function clean_streams() {
            attachs.forEach(function(a) {
                a.e.removeEventListener(a.t, a.l, false)
            })
        }

        export function attach(e: HTMLElement, t : string, l : (e : any) => void) : void {
            e.addEventListener(t, l, false)
            attachs.push(new Attached(e, t, l))
        }

        export function change_scene(s : Scenes.Base) : void {
            s.terminate()
            clean_streams()
            init_scene(s)
        }

        export function init_scene(s : Scenes.Base) : void {
            scene = s
            scene.start()
        }
    }
}

/*
_events

void attach(Stream stream, void onEvent(dynamic e)) {
	_events.add(stream.listen(onEvent));
}

void _clean_streams() {
	for (StreamSubscription i in _events) {
    	i.cancel();
    }
}

void change_scene(Scene_Base s) {
	scene.terminate();
	_clean_streams();
	init_scene(s);
}

void init_scene(Scene_Base s) {
	scene = s;
    scene.start();
}*/
