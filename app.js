var Scenes;
(function (Scenes) {
    var Color = (function () {
        function Color() {
            this.content = document.getElementById('content');
            this.word = document.getElementById('word');
            this.chrono = document.getElementById('chrono');
            this.choice = document.getElementById('choices');
            this.choices = document.getElementsByClassName('choice');
            this.audio = document.getElementById('loop');
            this.fail = document.getElementById('fail');
            this.score = 0;
            this.duration = 1010;
        }
        Color.prototype.start = function () {
            var _this = this;
            for (var i = 0; i < this.choices.length; ++i) {
                Managers.Scene.attach(this.choices[i], 'click', function (e) {
                    return _this.valid(e.target);
                });
            }
            Managers.Scene.attach(window, 'keyup', function (e) {
                return _this.keyboard(e);
            });
            this.closeText();

            this.audio.play();
        };

        Color.prototype.terminate = function () {
            this.fail.play();
            this.audio.pause();
            this.audio.currentTime = 0;
        };

        Color.prototype.updateWord = function () {
            var _this = this;
            var colors = Managers.Color.getColors(3);

            this.updateChoice(colors);
            this.updateText(colors[0], colors[1]);
            this.updateContent(colors[2]);

            this.timer = window.setTimeout(function () {
                return _this.valid(null);
            }, this.duration);
        };

        Color.prototype.updateChoice = function (colors) {
            var first = Math.floor(Math.random() * colors.length);
            this.winning = this.choices.item(first);
            for (var i = 0; i < colors.length; ++i) {
                this.applyBackgroundColor(this.choices.item((i + first) % this.choices.length), colors[i].light);
            }
        };

        Color.prototype.updateText = function (col1, col2) {
            this.word.innerHTML = col1.name;
            this.word.style.color = col2.regular;
            this.word.className += ' bigger';
            this.chrono.className += ' upper';
        };

        Color.prototype.updateContent = function (col) {
            this.applyBackgroundColor(this.content, col.regular);
        };

        Color.prototype.getChoice = function (i) {
            return this.choice.children.item(i);
        };

        Color.prototype.keyboard = function (e) {
            switch (e.keyCode) {
                case 37:
                    return this.valid(this.getChoice(0));
                case 40:
                    return this.valid(this.getChoice(1));
                case 39:
                    return this.valid(this.getChoice(2));
            }
        };

        Color.prototype.valid = function (elem) {
            window.clearTimeout(this.timer);
            if (elem == this.winning) {
                ++this.score;
            } else {
                Managers.Scene.change_scene(new Scenes.Score(this.score));
                return;
            }
            this.closeText();
        };

        Color.prototype.applyBackgroundColor = function (elem, color) {
            elem.style.backgroundColor = color;
        };

        Color.prototype.closeText = function () {
            var _this = this;
            this.word.className = this.word.className.replace(/\s*\bbigger\b/, '');
            this.chrono.className = this.chrono.className.replace(/\s*\bupper\b/, '');

            window.setTimeout(function () {
                return _this.updateWord();
            }, 16);
        };
        return Color;
    })();
    Scenes.Color = Color;
})(Scenes || (Scenes = {}));
var Scenes;
(function (Scenes) {
    var Score = (function () {
        function Score(score) {
            this.score = document.getElementById('score');
            this.shadow = document.getElementById('shadow');
            this.num = document.getElementById('num');
            this.replay = document.getElementById('restart');
            this.result = score;
        }
        Score.prototype.start = function () {
            var _this = this;
            this.num.innerHTML = this.result.toString();
            this.shadow.className += ' visible';
            this.score.className += ' open';
            Managers.Scene.attach(this.replay, 'click', this.restart);
            Managers.Scene.attach(window, 'keyup', function (e) {
                return _this.restart();
            });
            var link = this.score.querySelector('a');
            link.href = 'https://twitter.com/share?text=Arriverez-vous à faire mieux que mon score de ' + this.result + ' ? Pour tenter, c\'est pas ici';
            this.time = (new Date()).getTime();
        };

        Score.prototype.restart = function () {
            var now = (new Date()).getTime();
            if ((now - this.time) < 400) {
                return;
            }
            Managers.Scene.change_scene(new Scenes.Color());
        };

        Score.prototype.terminate = function () {
            this.shadow.className = this.shadow.className.replace(/\s*\bvisible\b/, '');
            this.score.className = this.score.className.replace(/\s*\bopen\b/, '');
        };
        return Score;
    })();
    Scenes.Score = Score;
})(Scenes || (Scenes = {}));
var Scenes;
(function (Scenes) {
    var Title = (function () {
        function Title() {
            this.loader = document.getElementById('loader');
        }
        Title.prototype.start = function () {
            var _this = this;
            this.loader.querySelector('div').innerHTML = 'Tap me !';
            Managers.Scene.attach(this.loader, 'click', function (e) {
                return _this.tap();
            });
            Managers.Scene.attach(window, 'keyup', function (e) {
                return _this.tap();
            });
            Managers.Scene.attach(this.loader.querySelector('a'), 'click', function (e) {
                return (_this.prevent(e));
            });
        };

        Title.prototype.terminate = function () {
        };

        Title.prototype.tap = function () {
            this.loader.className += ' loaded';
            Managers.Scene.change_scene(new Scenes.Color());
        };

        Title.prototype.prevent = function (e) {
            e.stopPropagation();
        };
        return Title;
    })();
    Scenes.Title = Title;
})(Scenes || (Scenes = {}));
var Tools;
(function (Tools) {
    var Color = (function () {
        function Color(name, regular, light) {
            this.name = name;
            this.regular = regular;
            this.light = light;
        }
        return Color;
    })();
    Tools.Color = Color;
})(Tools || (Tools = {}));
var Managers;
(function (Managers) {
    (function (Scene) {
        var scene;
        var attachs = new Array();

        var Attached = (function () {
            function Attached(e, t, l) {
                this.e = e;
                this.t = t;
                this.l = l;
            }
            return Attached;
        })();

        function clean_streams() {
            attachs.forEach(function (a) {
                a.e.removeEventListener(a.t, a.l, false);
            });
        }

        function attach(e, t, l) {
            e.addEventListener(t, l, false);
            attachs.push(new Attached(e, t, l));
        }
        Scene.attach = attach;

        function change_scene(s) {
            scene.terminate();
            clean_streams();
            init_scene(s);
        }
        Scene.change_scene = change_scene;

        function init_scene(s) {
            scene = s;
            scene.start();
        }
        Scene.init_scene = init_scene;
    })(Managers.Scene || (Managers.Scene = {}));
    var Scene = Managers.Scene;

    (function (Color) {
        var colors = new Array();

        colors.push(new Tools.Color('red', '#D72545', '#E7282D'));
        colors.push(new Tools.Color('green', '#27ae60', '#2ecc71'));
        colors.push(new Tools.Color('blue', '#2980b9', '#3498db'));
        colors.push(new Tools.Color('yellow', '#f39c12', '#f1c40f'));
        colors.push(new Tools.Color('orange', '#EF7700', '#DE6D00'));
        colors.push(new Tools.Color('purple', '#99439C', '#d33682'));

        function getColors(nb) {
            var tmp = new Array();

            for (var i = 0; i < nb; ++i) {
                var col;
                do {
                    col = colors[Math.floor(Math.random() * colors.length)];
                } while(tmp.indexOf(col) != -1);
                tmp.push(col);
            }

            return tmp;
        }
        Color.getColors = getColors;
    })(Managers.Color || (Managers.Color = {}));
    var Color = Managers.Color;
})(Managers || (Managers = {}));
window.onload = function () {
    Managers.Scene.init_scene(new Scenes.Title());
};
