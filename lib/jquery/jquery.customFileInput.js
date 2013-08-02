/*
 jquery.customFileInput - Replaces the standard HTML file input element with a stylized button.

 Version:    1.0
 Author:     Michael Lawrence (michael.lawrence@rhythmagency.com)
 Copyright:  2013 Rhythm Interactive

 TODO: Provide documentation for this plugin.
 */

'use strict';

(function () {
	var name = 'customFileInput';

	module.exports = exports[name] = function ($) {
		$ = $ || window.$;

		// Constants
		var CONST = require('../constants');

		var fn = function (query) {
			query = query || CONST.SELECTORS.INPUT.FILE;

			$(query).each(function() {
				var $el = $(this),
					proxy = $('<a class="button radius" href="#">Choose File</a>').on(CONST.EVENTS.CLICK, function (e) {
						$el.trigger(CONST.EVENTS.CLICK);
						e.preventDefault();
					});

				$el.css('display', 'none').parent().append(proxy);
			});
		};

		$[name] = fn;

		return fn;
	};
})();