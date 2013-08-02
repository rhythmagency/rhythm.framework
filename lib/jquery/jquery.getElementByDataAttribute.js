/*
 jquery.getElementByDataAttribute - A jQuery plugin that looks at the value of the data attribute
 specified and retrieves a jQuery element based on the data attribute's value.

 Version:    1.0
 Author:     Michael Lawrence (michael.lawrence@rhythmagency.com)
 Copyright:  2013 Rhythm Interactive

 TODO: Provide documentation for this plugin.
 */

'use strict';

(function () {
	var name = 'getElementByDataAttribute';

	module.exports = exports[name] = function ($) {
		$ = $ || window.$;

		var fn = function (dataAttribute) {
			return $($(this).data(dataAttribute));
		};

		$.fn[name] = fn;

		return fn;
	};
})();