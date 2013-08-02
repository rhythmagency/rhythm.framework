/*
 jquery.decodeEntities - Simple jQuery plugin for decoding html entities and returning the results.

 Version:    1.0
 Author:     Michael Lawrence (michael.lawrence@rhythmagency.com)
 Copyright:  2013 Rhythm Interactive

 Usage:

 $('#myElement').decodeEntities();

 */

'use strict';

(function () {
	var name = 'decodeEntities';

	module.exports = exports[name] = function ($) {
		$ = $ || window.$;

		var fn = function () {
			return $('<div/>').html(s).text();
		};

		$[name] = fn;

		return fn;
	};
})();