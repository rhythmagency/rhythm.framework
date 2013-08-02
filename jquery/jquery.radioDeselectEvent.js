/*
 jquery.radioDeselectEvent - A jQuery plugin that adds a deselect event to radio buttons.

 Version:    1.0
 Author:     Michael Lawrence (michael.lawrence@rhythmagency.com)
 Copyright:  2013 Rhythm Interactive

 TODO: Provide documentation for this plugin.
 */

'use strict';

(function () {
	var name = 'radioDeselectEvent';

	module.exports = exports[name] = function ($) {
		$ = $ || window.$;

		// Constants
		var CONST = require('../constants');

		var fn = function () {
			$(CONST.SELECTORS.INPUT.RADIO).on(CONST.EVENTS.CHANGE, function () {
				var $el = $(this);
				$('input[name="' + $el.attr('name') + '"]').not($el).trigger(CONST.EVENTS.DESELECT);
			});
		};

		$[name] = fn;

		return fn;
	};
})();