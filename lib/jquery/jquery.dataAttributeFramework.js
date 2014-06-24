/*
 jquery.dataAttributeFramework - A collection of utilities that are based on html5 data-attributes

 Version:    1.0
 Author:     Michael Lawrence (michael.lawrence@rhythmagency.com)
 Copyright:  2013 Rhythm Interactive

 TODO: Provide documentation for this plugin.
*/

'use strict';

(function () {
	var name = 'dataAttributeFramework',
		existingHandlers = [],
		firstRun = true;

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
	var attachEvents = function ($element, items) {
		var lastResult;
		for (var i = 0; i < items.length; i++) {
			var item = items[i];
			lastResult = attachEvent($element, item.event, item.fn);
		}
		return lastResult;
	};

	module.exports = exports[name] = function ($) {
		$ = $ || window.$;

		// jQuery plugins
		require('./jquery.getElementByDataAttribute')($);
		require('./jquery.findDataElement')($);
		require('./jquery.radioDeselectEvent')($);
		require('./jquery.scrollToElement')($);

		// Initialize the deselect event on radio buttons.
		$.radioDeselectEvent();

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

			// Add references to page elements to minimize the overhead in making queries with jQuery.
			var $window = $(window),
				$body = $('body'),
				$buttonDataAddActive = $.findDataElement(CONST.DATA_ATTRIBUTES.ADD_ACTIVE),
				$buttonDataRemoveActive = $.findDataElement(CONST.DATA_ATTRIBUTES.REMOVE_ACTIVE),
				$buttonDataSyncActive = $.findDataElement(CONST.DATA_ATTRIBUTES.SYNC_ACTIVE),
				$buttonDataToggleActive = $.findDataElement(CONST.DATA_ATTRIBUTES.TOGGLE_ACTIVE),
				$buttonDataShowOverlay = $.findDataElement(CONST.DATA_ATTRIBUTES.SHOW_OVERLAY),
				$buttonDataHideOverlay = $.findDataElement(CONST.DATA_ATTRIBUTES.HIDE_OVERLAY),
				$buttonDataToggleOverlay = $.findDataElement(CONST.DATA_ATTRIBUTES.TOGGLE_OVERLAY),
				$buttonDataRemoveHash = $.findDataElement(CONST.DATA_ATTRIBUTES.REMOVE_HASH),
				$buttonDataFocus = $.findDataElement(CONST.DATA_ATTRIBUTES.FOCUS),
				$formDataAddActive = $.findDataElement(CONST.DATA_ATTRIBUTES.FORM_ADD_ACTIVE),
				$formDataRemoveActive = $.findDataElement(CONST.DATA_ATTRIBUTES.FORM_REMOVE_ACTIVE),
				$formDataToggleActive = $.findDataElement(CONST.DATA_ATTRIBUTES.FORM_TOGGLE_ACTIVE),
				$formDataShowOverlay = $.findDataElement(CONST.DATA_ATTRIBUTES.FORM_SHOW_OVERLAY),
				$formDataHideOverlay = $.findDataElement(CONST.DATA_ATTRIBUTES.FORM_HIDE_OVERLAY),
				$formDataToggleOverlay = $.findDataElement(CONST.DATA_ATTRIBUTES.FORM_TOGGLE_OVERLAY),
				$inputDataAddActiveOnChecked = $.findDataElement(CONST.DATA_ATTRIBUTES.ADD_ACTIVE_ON_CHECKED),
				$buttonDataScrollTo = $.findDataElement(CONST.DATA_ATTRIBUTES.SCROLL_TO);

			// Any links with the 'data-add-active' attribute will add the 'active' class to the element specified when clicked.
			attachEvent($buttonDataAddActive, CONST.EVENTS.CLICK, function (e) {
				$(this).getElementByDataAttribute(CONST.DATA_ATTRIBUTES.ADD_ACTIVE).addClass(CONST.CSS.ACTIVE);
				e.preventDefault();
			});

			// Any links with the 'data-remove-active' attribute will remove the 'active' class to the element specified when clicked.
			attachEvent($buttonDataRemoveActive, CONST.EVENTS.CLICK, function (e) {
				$(this).getElementByDataAttribute(CONST.DATA_ATTRIBUTES.REMOVE_ACTIVE).removeClass(CONST.CSS.ACTIVE);
				e.preventDefault();
			});

			// Any links with the 'data-toggle-active' attribute will toggle the 'active' class to the element specified when clicked.
			attachEvent($buttonDataToggleActive, CONST.EVENTS.CLICK, function (e) {
				$(this).getElementByDataAttribute(CONST.DATA_ATTRIBUTES.TOGGLE_ACTIVE).toggleClass(CONST.CSS.ACTIVE);
				e.preventDefault();
			});

			// Any links with the 'data-sync-active' attribute will add/remove the 'active' class of the element specified so that both elements have or don't have the 'active' class when clicked.
			attachEvent($buttonDataSyncActive, CONST.EVENTS.CLICK, function (e) {
				if ($(this).hasClass(CONST.CSS.ACTIVE)) {
					$(this).getElementByDataAttribute(CONST.DATA_ATTRIBUTES.SYNC_ACTIVE).addClass(CONST.CSS.ACTIVE);
				} else {
					$(this).getElementByDataAttribute(CONST.DATA_ATTRIBUTES.SYNC_ACTIVE).removeClass(CONST.CSS.ACTIVE);
				}
				e.preventDefault();
			});

			/*
			Any links with the 'data-show-overlay' attribute will add the 'active' class to the element specified
			and set overflow to hidden on the body element when clicked.
			*/
			attachEvent($buttonDataShowOverlay, CONST.EVENTS.CLICK, function (e) {
				var $el = $(this).getElementByDataAttribute(CONST.DATA_ATTRIBUTES.SHOW_OVERLAY);

				$el.addClass(CONST.CSS.ACTIVE).trigger({
					type: CONST.EVENTS.RHYTHM.OVERLAY.SHOW,
					message: CONST.EVENTS.RHYTHM.OVERLAY.SHOW + " triggered.",
					origin: $(this)
				});
				$body.css('overflow', 'hidden');
				e.preventDefault();
			});

			/*
			Any links with the 'data-hide-overlay' attribute will remove the 'active' class to the element specified
			and remove the overflow hidden on the body element when clicked.
			*/
			attachEvent($buttonDataHideOverlay, CONST.EVENTS.CLICK, function (e) {
				$(this).getElementByDataAttribute(CONST.DATA_ATTRIBUTES.HIDE_OVERLAY).removeClass(CONST.CSS.ACTIVE)
					.trigger({
						type: CONST.EVENTS.RHYTHM.OVERLAY.HIDE,
						message: CONST.EVENTS.RHYTHM.OVERLAY.HIDE + " trigged.",
						origin: $(this)
					});
				$body.css('overflow', '');
				e.preventDefault();
			});

			/*
			Any links with the 'data-toggle-overlay' attribute will toggle the 'active' class to the element specified
			and toggle the overflow on the body element when clicked.
			*/
			attachEvent($buttonDataToggleOverlay, CONST.EVENTS.CLICK, function (e) {
				var $el = $(this).getElementByDataAttribute(CONST.DATA_ATTRIBUTES.TOGGLE_OVERLAY)
					.trigger({
						type: CONST.EVENTS.RHYTHM.OVERLAY.TOGGLE,
						message: CONST.EVENTS.RHYTHM.OVERLAY.TOGGLE + " triggered.",
						origin: $(this)
					});
				$el.toggleClass(CONST.CSS.ACTIVE);
				$body.css('overflow', $el.hasClass(CONST.CSS.ACTIVE) ? 'hidden' : '');
				e.preventDefault();
			});

			// Any links with the 'data-remove-hash' attribute will remove the hash from the window's location when clicked.
			attachEvent($buttonDataRemoveHash, CONST.EVENTS.CLICK, function (e) {
				window.location.hash = '';
				e.preventDefault();
			});

			// Any links with the 'data-focus' attribute will focus and clear the element specified when clicked.
			attachEvent($buttonDataFocus, CONST.EVENTS.CLICK, function (e) {
				$(this).getElementByDataAttribute(CONST.DATA_ATTRIBUTES.FOCUS).val('').trigger(CONST.EVENTS.FOCUS);
				e.preventDefault();
			});

			// Any forms with the 'data-form-add-active' attribute will add the 'active' class to the element specified when submitted.
			attachEvents($formDataAddActive, [{
				event: CONST.EVENTS.VALID,
				fn: function (e) {
					$(this).getElementByDataAttribute(CONST.DATA_ATTRIBUTES.FORM_ADD_ACTIVE).addClass(CONST.CSS.ACTIVE);
				}
			}, {
				event: CONST.EVENTS.SUBMIT,
				fn: function (e) {
					e.preventDefault();
				}
			}]);

			// Any forms with the 'data-form-remove-active' attribute will remove the 'active' class to the element specified when submitted.
			attachEvents($formDataRemoveActive, [{
				event: CONST.EVENTS.VALID,
				fn: function () {
					$(this).getElementByDataAttribute(CONST.DATA_ATTRIBUTES.FORM_REMOVE_ACTIVE).removeClass(CONST.CSS.ACTIVE);
				}
			}, {
				event: CONST.EVENTS.SUBMIT,
				fn: function (e) {
					e.preventDefault();
				}
			}]);

			// Any forms with the 'data-form-toggle-active' attribute will toggle the 'active' class to the element specified when submitted.
			attachEvents($formDataToggleActive, [{
				event: CONST.EVENTS.VALID,
				fn: function () {
					$(this).getElementByDataAttribute(CONST.DATA_ATTRIBUTES.FORM_TOGGLE_ACTIVE).toggleClass(CONST.CSS.ACTIVE);
				}
			}, {
				event: CONST.EVENTS.SUBMIT,
				fn: function (e) {
					e.preventDefault();
				}
			}]);

			/*
			Any forms with the 'data-form-show-overlay' attribute will add the 'active' class to the element specified
			and set overflow to hidden on the body element when submitted.
			*/
			attachEvents($formDataShowOverlay, [{
				event: CONST.EVENTS.VALID,
				fn: function () {
					$(this).getElementByDataAttribute(CONST.DATA_ATTRIBUTES.SHOW_OVERLAY).addClass(CONST.CSS.ACTIVE);
					$body.css('overflow', 'hidden');
				}
			}, {
				event: CONST.EVENTS.SUBMIT,
				fn: function (e) {
					e.preventDefault();
				}
			}]);

			/*
			Any forms with the 'data-form-hide-overlay' attribute will remove the 'active' class to the element specified
			and remove the overflow hidden on the body element when submitted.
			*/
			attachEvents($formDataHideOverlay, [{
				event: CONST.EVENTS.VALID,
				fn: function () {
					$(this).getElementByDataAttribute(CONST.DATA_ATTRIBUTES.HIDE_OVERLAY).removeClass(CONST.CSS.ACTIVE);
					$body.css('overflow', '');
				}
			}, {
				event: CONST.EVENTS.SUBMIT,
				fn: function (e) {
					e.preventDefault();
				}
			}]);

			/*
			Any forms with the 'data-form-toggle-overlay' attribute will toggle the 'active' class to the element specified
			and toggle the overflow on the body element when submitted.
			*/
			attachEvents($formDataToggleOverlay, [{
				event: CONST.EVENTS.VALID,
				fn: function () {
					var $el = $(this).getElementByDataAttribute(CONST.DATA_ATTRIBUTES.TOGGLE_OVERLAY);
					$el.toggleClass(CONST.CSS.ACTIVE);
					$body.css('overflow', $el.hasClass(CONST.CSS.ACTIVE) ? 'hidden' : '');
				}
			}, {
				event: CONST.EVENTS.SUBMIT,
				fn: function (e) {
					e.preventDefault();
				}
			}]);

			// When an input (checkbox/radio button) is selected/deselected it adds/removes the 'active' class from the targeted element.
			attachEvents($inputDataAddActiveOnChecked, [{
				event: CONST.EVENTS.CHANGE,
				fn: function () {
					$(this).getElementByDataAttribute(CONST.DATA_ATTRIBUTES.ADD_ACTIVE_ON_CHECKED).addClass(CONST.CSS.ACTIVE);
				}
			}, {
				event: CONST.EVENTS.DESELECT,
				fn: function () {
					$(this).getElementByDataAttribute(CONST.DATA_ATTRIBUTES.ADD_ACTIVE_ON_CHECKED).removeClass(CONST.CSS.ACTIVE);
				}
			}]);

			// Any links with the 'data-scroll-to' attribute will make the specified target scroll to the element specified when clicked.
			attachEvent($buttonDataScrollTo, CONST.EVENTS.CLICK, function (e) {
				e.preventDefault();
				
				var $el = $(this),
					$target = $('body, html'), //body for WebKit, html for IE+FF
					$scrollTo = $el.getElementByDataAttribute(CONST.DATA_ATTRIBUTES.SCROLL_TO);

				if ($el.data(CONST.DATA_ATTRIBUTES.SCROLL_TARGET)) {
					$target = $el.getElementByDataAttribute(CONST.DATA_ATTRIBUTES.SCROLL_TARGET);
				}

				$target.scrollToElement($scrollTo, 1000);
				$el.blur(); //prevent focus styling from remaining on IE+FF
			});

			/*
			Listens for hash changes and adds the 'active' class to any elements that have matching 'data-hash-active' attributes.
			Trigger the hash change event to force the hash to be processed on page load.
			TODO: Make sure this works in all browsers.
			*/
			if(firstRun) {
				$window.on(CONST.EVENTS.HASH_CHANGE, function () {
					$.findDataElement(CONST.DATA_ATTRIBUTES.HASH_ACTIVE, window.location.hash).addClass(CONST.CSS.ACTIVE);
				}).trigger(CONST.EVENTS.HASH_CHANGE);
			}

			// Some handlers only get attached once.
			firstRun = false;
		};

		$[name] = fn;

		return fn;
	};
})();