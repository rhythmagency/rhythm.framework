/*
 jquery.classSwitcher - A jQuery plugin that switches the class of an element based on the prefix supplied.

 Version:    1.0
 Author:     Michael Lawrence (michael.lawrence@rhythmagency.com)
 Copyright:  2013 Rhythm Interactive

 TODO: Provide documentation for this plugin.
 */

'use strict';

(function () {
	var name = 'classSwitcher';

	module.exports = exports[name] = function ($) {
		$ = $ || window.$;

		// jQuery plugins
		require('jquery.removeClassWithPrefix');

		// Constants
		var CONST = require('../constants');

		var fn = function (prefix, $target) {
			var $el = $(this);

			$target = $target || $('body');

			$el.on(CONST.EVENTS.CHANGE, function (e) {
				$target.removeClassWithPrefix(prefix).addClass(prefix + '-' + $(this).val());
				e.preventDefault();
			});

			return $el;
		};

		$.fn[name] = fn;

		return fn;
	};
})();