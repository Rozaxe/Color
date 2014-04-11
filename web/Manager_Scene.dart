
library manager_scene;

import 'dart:async';
import 'Scene_Base.dart';

Scene_Base scene;
List<StreamSubscription> _events = new List<StreamSubscription>();

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
}
