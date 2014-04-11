
// TODO Add keymapping
// TODO Add sound

library sceneColor;

import 'dart:async';
import 'dart:html';
import 'dart:math';
import 'Manager_Color.dart';
import 'Manager_Scene.dart';
import 'Color.dart';
import 'Scene_Base.dart';
import 'Scene_Score.dart';

class Scene_Color extends Scene_Base {

	Element content = querySelector('#content');
	Element word    = querySelector('#word');
	Element chrono  = querySelector('#chrono');
	Element choice  = querySelector('#choices');
	List<Element> choices = querySelectorAll('.choice');

	List<StreamSubscription> events = new List<StreamSubscription>();

	int score = 0;
	int duration = 1010; // In milliseconds
	Element winning;
	Timer timer;

	Scene_Color();

	void start() {
		// Attach event listener on choice div
		for (Element elem in choices) {
			attach(elem.onClick, (event) => valid(event.target));
		}
		// Attach event fo keyboard
		attach(window.onKeyUp, (KeyboardEvent e) => keyboard(e));
		closeText();
	}

	void terminate() {}

	void updateWord() {
		List<Color> colors = new Manager_Color().getColors(3);

		updateChoice(colors);
		updateText(colors[0], colors[1]);
		updateContent(colors[2]);

		timer = new Timer(new Duration(milliseconds: duration), () => valid(null));
	}

	void updateChoice(List<Color> colors) {
		int first = new Random().nextInt(colors.length);
		winning = choices[first];
		for (int i = 0 ; i < colors.length ; ++i) {
			applyBackgroundColor(choices[(i + first) % choices.length], colors[i].hex);
		}
	}

	void updateText(Color col1, Color col2) {
		word..text = col1.name
			..style.color = col2.hex;
		word.classes.add('bigger');
		chrono.classes.add('upper');
	}

	void updateContent(Color col) {
		applyBackgroundColor(content, col.hex_light);
	}

	Element getChoice(int i) {
		return choice.children[i];
	}

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

	void valid(Element elem) {
		timer.cancel();
		if (elem == winning) {
			score += 1;
		} else {
			change_scene(new Scene_Score(score));
			return;
		}
		closeText();
	}

	void applyBackgroundColor(Element elem, String color) {
		elem.style.backgroundColor = color;
	}

	void closeText() {
		word.classes.remove('bigger');
		chrono.classes.remove('upper');
		// Because browser needs a little time to refresh css
		// And we need to spec a little time because browser with js are too slow
		new Timer(new Duration(milliseconds: 16), () => updateWord());
		//new Timer(new Duration(milliseconds: 16), () => updateWord()); // Dart VM only
	}
}