/*
 jquery.removeClassWithPrefix - A jQuery plugin that removes the class of an element based on the prefix supplied.

 Version:    1.0
 Author:     Michael Lawrence (michael.lawrence@rhythmagency.com)
 Copyright:  2013 Rhythm Interactive

 TODO: Provide documentation for this plugin.
 */

'use strict';

(function () {
	var name = 'removeClassWithPrefix';

	module.exports = exports[name] = function ($) {
		$ = $ || window.$;

		var fn = function (prefix) {
			var $el = $(this),
				ATTR = 'class',
				DELIMITER = ' ';

			if ($el && $el.attr(ATTR)) {
				var classes = $.map($el.attr(ATTR).split(DELIMITER), function(item) {
					return item.indexOf(prefix) === -1 ? item : '';
				});

				return $el.attr(ATTR, classes.join(DELIMITER));
			}

			return $el;
		};

		$.fn[name] = fn;

		return fn;
	};
})();