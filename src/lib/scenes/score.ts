
/// <reference path="../scenes.ts" />
/// <reference path="../managers.ts" />
/// <reference path="color.ts" />

module Scenes {
    export class Score implements Base {
        score:  HTMLElement = document.getElementById('score')
        shadow: HTMLElement = document.getElementById('shadow')
        num:    HTMLElement = document.getElementById('num')
        replay: HTMLElement = document.getElementById('restart')

        result: number

        constructor(score: number) {
            this.result = score
        }

        start() {
            this.num.innerHTML = this.result.toString()
            this.shadow.className += ' visible'
            this.score.className  += ' open'
            Managers.Scene.attach(this.replay, 'click', this.restart)
        }

        restart() {
            Managers.Scene.change_scene(new Scenes.Color())
        }

        terminate() {
            this.shadow.className = this.shadow.className.replace(/\s*\bvisible\b/, '')
            this.score.className  = this.score.className.replace(/\s*\bopen\b/, '')
        }
    }
}
