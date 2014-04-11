
library manager_color;

import 'dart:math';
import 'Color.dart';

class Manager_Color {
	static final Manager_Color _singleton = new Manager_Color._internal();
	List<Color> colors = new List<Color>();

	factory Manager_Color() {
		return _singleton;
	}

	Manager_Color._internal() {
		colors..add(new Color('rouge',  '#e74c3c', '#EB8D84'))
		      ..add(new Color('vert',   '#2ecc71', '#70D49A'))
		      ..add(new Color('bleu',   '#3498db', '#79B7E1'))
		      ..add(new Color('jaune',  '#f1c40f', '#F3D458'))
		      ..add(new Color('orange', '#DE6D00', '#E39244'))
		      ..add(new Color('violet', '#9b59b6', '#B699C2'));
	}

	List<Color> getColors(int nb) {
		List<Color> tmp = new List<Color>();
		for (int i = 0 ; i < nb ; ++i) {
			Color color;
			do {
				color = colors[new Random().nextInt(colors.length)];
			} while(tmp.indexOf(color) != -1);
			tmp.add(color);
		}
		return tmp;
	}

}