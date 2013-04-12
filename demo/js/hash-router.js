/**
 * Module: HashRouter
 * Classes: HashRouter
 * ===================
 * This module define class for routing by hash-URLs starts with #!
 **/

(function ($) {

var instance = null; // Singleton :)

function HashRouter() {
	this._routes = [];
}

HashRouter.prototype = {
	constructor: HashRouter,
	loadPage: function (url) {
		//
	},
	bind: function (urlPattern, loadTo) {
		if (urlPattern in this._routes) return;
		this._routes[urlPattern] = loadTo;
	},
	unbind: function (urlPattern, loadTo) {
		var route = urlPattern? this._findRouteByPattern(urlPattern): this._findRouteByTarget(loadTo);
		if (route !== null) {
			try {delete this._routes[i]} catch (e) {this._routes[i] = undefined}
		}
	},
	_findRouteByPattern: function (urlPattern) {
		for (var i = 0, l = this._routes.length; i < l; ++i) {
			if (this._routes[i].pattern === urlPattern) return i;
		}
		return null;
	},
	_findRouteByTarget: function (loadTo) {
		for (var i = 0, l = this._routes.length; i < l; ++i) {
			if (this._routes[i].target === loadTo) return i;
		}
		return null;
	}
}

if (window) {
	window.HashRouter = HashRouter;
} else {
	return HashRouter;
}

})(jQuery);
