/*
 jquery.scrollToElement - A jQuery plugin that will animate the scrollTop of an element to another element.

 Version:    1.0
 Author:     Michael Lawrence (michael.lawrence@rhythmagency.com)
 Copyright:  2013 Rhythm Interactive

 TODO: Provide documentation for this plugin.
 */

'use strict';

(function () {
	var name = 'scrollToElement';

	module.exports = exports[name] = function ($) {
		$ = $ || window.$;

		// Constants
		var CONST = require('../constants');

		var fn = function ($target, duration, easing, complete) {
			var $el = $(this);

			duration = duration || CONST.DURATIONS.DEFAULT;
			easing = easing || CONST.EASING.SWING;

			var destination = $target.offset().top - $el.offset().top + $el.scrollTop();

			$el.animate({'scrollTop' : destination }, duration, easing, complete);

			return $el;
		};

		$.fn[name] = fn;

		return fn;
	};
})();