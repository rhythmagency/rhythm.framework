/*
 modernizr.columnBreakInside - Adds a Modernizr test that checks if
 the browser supports the column-break-inside property.

 Version:    1.0
 Author:     Michael Lawrence (michael.lawrence@rhythmagency.com)
 Copyright:  2013 Rhythm Interactive
 */

'use strict';

(function () {
	var name = 'columnBreakInside',
		supports = require('../browser-css-supports');

	module.exports = exports[name] = function (Modernizr) {
		Modernizr = Modernizr || window.Modernizr;

		var fn = function () {
			return supports('column-break-inside');
		};

		Modernizr.addTest(name, fn);

		return fn;
	};
})();