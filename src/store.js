Gesture.store.add([
	Gesture.DIR_S, '?',
	Gesture.DIR_SW,
	Gesture.DIR_W, '?',
	Gesture.DIR_NW,
	Gesture.DIR_N, '?',
	Gesture.DIR_NE,
	Gesture.DIR_E, '?',
	Gesture.DIR_NE, '?',
	Gesture.DIR_N, '?',
	Gesture.DIR_NW,
	Gesture.DIR_W, '?',
	Gesture.DIR_SW,
	Gesture.DIR_S, '?'
].join(''), 'S');

Gesture.store.add([
	'[' + Gesture.DIR_S + '|' + Gesture.DIR_SE + ']{1,3}',
	'[' + Gesture.DIR_NE + '|' + Gesture.DIR_N + ']{1,3}',
	Gesture.DIR_W, '?',
	Gesture.DIR_SW,
	Gesture.DIR_S, '?',
	'[' + Gesture.DIR_E + '|' + Gesture.DIR_SE + ']{1,2}'
].join(''), 'A');

Gesture.store.add([
	Gesture.DIR_N, '?',
	Gesture.DIR_S,
	Gesture.DIR_SE, '?',
	'[' + Gesture.DIR_E + Gesture.DIR_NE + Gesture.DIR_N + ']{1,3}',
	'[' + Gesture.DIR_NW + Gesture.DIR_W + ']{1,2}'
].join(''), 'P');

Gesture.store.add(Gesture.DIR_E, 'right');
Gesture.store.add(Gesture.DIR_W, 'left');
