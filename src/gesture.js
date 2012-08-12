(function () {

	'use strict';

	// Constansts
	var DIR_E  = '\u2192',
		DIR_NE = '\u2198',
		DIR_N  = '\u2193',
		DIR_NW = '\u2199',
		DIR_W  = '\u2190',
		DIR_SW = '\u2196',
		DIR_S  = '\u2191',
		DIR_SE = '\u2197';

	var DIR = [DIR_E, DIR_NE, DIR_N, DIR_NW, DIR_W, DIR_SW, DIR_S, DIR_SE].join(''),
		DIR_COUNT = DIR.length;

	var PI = Math.PI,
		PI_D2 = Math.PI / 2,
		PI_D4 = Math.PI / 4,
		PI_M2 = Math.PI * 2;

	var RE_GEST = new RegExp('^([' + DIR + '\\?\\*\\+\\^\\$\\[\\]\\|\\{\\}\\,\\d]+)$');

	var handlers = {};

	function Recorder() {
		this._points = null;
		this._merge = 20;
		this._context = null;
		this._recordPointHandler = this._recordPoint();
	}

	Recorder.prototype = {
		constructor: Recorder,

		_len: function (p1, p2) {
			var w = p1.x - p2.x,
				h = p1.y - p2.y;
			return Math.sqrt(w * w + h * h);
		},

		_dir: function (p1, p2) {
			var a, b, l, d;
			a = Math.abs(p1.x - p2.x);
			b = Math.abs(p1.y - p2.y);
			l = PI_D2 * (b / (a + b));
			if (p2.x < p1.x && p2.y > p1.y) {
				l = PI - l;
			} else if (p2.x > p1.x && p2.y < p1.y) {
				l = PI_M2 - l;
			} else if (p2.x <= p1.x && p2.y <= p1.y) {
				l = PI + l;
			}
			return Math.round(l / PI_D4) % DIR_COUNT;
		},

		_recordPoint: function () {
			var that = this, len = this._len;
			return function (e) {
				e = e || window.event;
				var p = {x: e.clientX, y: e.clientY};
				if (that._points.length === 0) {
					that._points.push(p);
				} else if (len(that._points[that._points.length - 1], p) >= that._merge) {
					that._points.push(p);
				}
			};
		},

		gesture: function (p) {
			var i, lim, cd, ld = null, p1, p2, gesture = '';
			for (i = 1, lim = p.length; i < lim; i++) {
				p1 = p[i - 1];
				p2 = p[i];
				cd = this._dir(p1, p2);
				if (cd !== ld) {
					ld = cd;
					gesture += DIR[cd];				
				}
			}
			return gesture;
		},

		start: function (context) {
			// Init
			context = context || document.body;
			this._context = context;
			this._points = [];
			// Handle events
			if (context.addEventListener) {
				context.addEventListener('mousemove', this._recordPointHandler, false);
			} else if (context.attachEvent) {
				context.attachEvent('onmousemove', this._recordPointHandler);
			} else {
				throw {
					name: 'EventError',
					message: 'Can\'t handle event'
				};
			}
		},

		stop: function () {
			var gesture, context;
			context = this._context;
			if (context === null) {
				return null;
			}
			if (context.removeEventListener) {
				context.removeEventListener('mousemove', this._recordPointHandler, false);
			} else if (context.detachEvent) {
				context.detachEvent('onmousemove', this._recordPointHandler);
			} else {
				throw {
					name: 'EventError',
					message: 'Can\'t unhandle event'
				};
			}
			gesture = this.gesture(this._points);
			try { delete this._points } catch(e) {}
			this._points = null;
			this._context = null;
			return gesture;
		}
	};

	function Store() {
		this._base = [];
		this._handlers = {};
	}

	Store.prototype = {
		constructor: Store,

		add: function (gesture, name) {
			if (typeof gesture !== 'string' || typeof name !== 'string') {
				return false;
			}
			this._base.push({name: name, re: new RegExp('^' + gesture + '$')});
			return true;
		},

		on: function (name, handler) {
			if (typeof handler !== 'function') {
				return -1;
			}
			if (!this._handlers[name]) {
				this._handlers[name] = [];
			}
			this._handlers[name].push(handler);
			return this._handlers[name].length - 1;
		},

		detect: function (gesture) {
			var b = this._base,
				i, j, h, lim;
			for (i = 0, lim = this._base.length; i < lim; i++) {
				if (b[i].re.test(gesture)) {
					h = this._handlers[b[i].name];
					for (j = 0; h && j < h.length; j++) {
						h[j]();
					}
				}
			}
		}
	};

	window.Gesture = {
		// Constants
		DIR_E:  DIR_E,
		DIR_NE: DIR_NE,
		DIR_N:  DIR_N,
		DIR_NW: DIR_NW,
		DIR_W:  DIR_W,
		DIR_SW: DIR_SW,
		DIR_S:  DIR_S,
		DIR_SE: DIR_SE,
		DIR:   DIR,
		// Classes
		Recorder: Recorder,
		Store: Store,
		// Properties
		recorder: new Recorder(),
		store: new Store(),
	};

}());
