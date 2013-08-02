/*
 jquery.replaceEntities - Simple jQuery plugin for replacing html entities and returning the result.

 Version:    1.0
 Author:     Michael Lawrence (michael.lawrence@rhythmagency.com)
 Copyright:  2013 Rhythm Interactive

 Usage:

 $('#myElement').replaceEntities();

 */

'use strict';

(function () {
	var name = 'replaceEntities';

	module.exports = exports[name] = function ($) {
		$ = $ || window.$;

		var fn = function () {
			var decoded = $(this).html().replace(/(&\w+;)/g, function(match, $1) {
				return $('<div/>').html($1).text();
			});

			return $(this).html(decoded);
		};

		$[name] = fn;

		return fn;
	};
})();