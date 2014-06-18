/*
 jquery.radioDeselectEvent - A jQuery plugin that adds a deselect event to radio buttons.

 Version:    1.0
 Author:     Michael Lawrence (michael.lawrence@rhythmagency.com)
 Copyright:  2013 Rhythm Interactive

 TODO: Provide documentation for this plugin.
 */

'use strict';

(function () {
	var name = 'radioDeselectEvent',
		existingHandlers = [];

	// Attaches events, keeping track of handlers.
	var attachEvent = function ($element, event, fn) {
		var handler = {
			$element: $element,
			event: event,
			fn: fn
		};
		existingHandlers.push(handler);
		return $element.on(event, fn);
	};

	module.exports = exports[name] = function ($) {
		$ = $ || window.$;

		// Constants
		var CONST = require('../constants');

		var fn = function () {

			// Detach existing events.
			for (var i = 0; i < existingHandlers.length; i++) {
				var handler = existingHandlers[i];
				try{
					handler.$element.off(handler.event, handler.fn);
				} catch(ex) {}
			}
			existingHandlers = [];

			attachEvent($(CONST.SELECTORS.INPUT.RADIO), CONST.EVENTS.CHANGE, function () {
				var $el = $(this);
				$('input[name="' + $el.attr('name') + '"]').not($el).trigger(CONST.EVENTS.DESELECT);
			});
		};

		$[name] = fn;

		return fn;
	};
})();