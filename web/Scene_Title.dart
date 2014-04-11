
library scene_title;

import 'dart:html';
import 'Manager_Scene.dart';
import 'Scene_Color.dart';
import 'Scene_Base.dart';

class Scene_Title extends Scene_Base {
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

}