
library scene_score;

import 'dart:html';
import 'Manager_Scene.dart';
import 'Scene_Base.dart';
import 'Scene_Color.dart';

class Scene_Score extends Scene_Base {

	Element score  = querySelector('#score');
	Element shadow = querySelector('#shadow');
	Element num    = querySelector('#num');
	Element replay = querySelector('#restart');

	int result;

	Scene_Score(int score) {
		this.result = score;
	}

	void start() {
		num.text = result.toString();
        shadow.classes.add('visible');
        score.classes.add('open');
		attach(replay.onClick, (event) => restart());
	}

	void restart() {
		change_scene(new Scene_Color());
	}

	void terminate() {
		shadow.classes.remove('visible');
        score.classes.remove('open');
	}
}