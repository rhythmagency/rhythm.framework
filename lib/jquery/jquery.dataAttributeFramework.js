/*
 jquery.dataAttributeFramework - A collection of utilities that are based on html5 data-attributes

 Version:    1.0
 Author:     Michael Lawrence (michael.lawrence@rhythmagency.com)
 Copyright:  2013 Rhythm Interactive

 TODO: Provide documentation for this plugin.
*/

'use strict';

(function () {
	var name = 'dataAttributeFramework';

	module.exports = exports[name] = function ($) {
		$ = $ || window.$;

		// jQuery plugins
		require('jquery.getElementByDataAttribute')($);
		require('jquery.findDataElement')($);
		require('jquery.radioDeselectEvent')($);
		require('jquery.scrollToElement')($);

		// Initialize the deselect event on radio buttons.
		$.radioDeselectEvent();

		// Constants
		var CONST = require('../constants');

		var fn = function () {
			// Add references to page elements to minimize the overhead in making queries with jQuery.
			var $window = $(window),
				$body = $('body'),
				$buttonDataAddActive = $.findDataElement(CONST.DATA_ATTRIBUTES.ADD_ACTIVE),
				$buttonDataRemoveActive = $.findDataElement(CONST.DATA_ATTRIBUTES.REMOVE_ACTIVE),
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
			$buttonDataAddActive.on(CONST.EVENTS.CLICK, function (e) {
				$(this).getElementByDataAttribute(CONST.DATA_ATTRIBUTES.ADD_ACTIVE).addClass(CONST.CSS.ACTIVE);
				e.preventDefault();
			});

			// Any links with the 'data-remove-active' attribute will remove the 'active' class to the element specified when clicked.
			$buttonDataRemoveActive.on(CONST.EVENTS.CLICK, function (e) {
				$(this).getElementByDataAttribute(CONST.DATA_ATTRIBUTES.REMOVE_ACTIVE).removeClass(CONST.CSS.ACTIVE);
				e.preventDefault();
			});

			// Any links with the 'data-toggle-active' attribute will toggle the 'active' class to the element specified when clicked.
			$buttonDataToggleActive.on(CONST.EVENTS.CLICK, function (e) {
				$(this).getElementByDataAttribute(CONST.DATA_ATTRIBUTES.TOGGLE_ACTIVE).toggleClass(CONST.CSS.ACTIVE);
				e.preventDefault();
			});

			/*
			Any links with the 'data-show-overlay' attribute will add the 'active' class to the element specified
			and set overflow to hidden on the body element when clicked.
			*/
			$buttonDataShowOverlay.on(CONST.EVENTS.CLICK, function (e) {
				$(this).getElementByDataAttribute(CONST.DATA_ATTRIBUTES.SHOW_OVERLAY).addClass(CONST.CSS.ACTIVE);
				$body.css('overflow', 'hidden');
				e.preventDefault();
			});

			/*
			Any links with the 'data-hide-overlay' attribute will remove the 'active' class to the element specified
			and remove the overflow hidden on the body element when clicked.
			*/
			$buttonDataHideOverlay.on(CONST.EVENTS.CLICK, function (e) {
				$(this).getElementByDataAttribute(CONST.DATA_ATTRIBUTES.HIDE_OVERLAY).removeClass(CONST.CSS.ACTIVE);
				$body.css('overflow', '');
				e.preventDefault();
			});

			/*
			Any links with the 'data-toggle-overlay' attribute will toggle the 'active' class to the element specified
			and toggle the overflow on the body element when clicked.
			*/
			$buttonDataToggleOverlay.on(CONST.EVENTS.CLICK, function (e) {
				var $el = $(this).getElementByDataAttribute(CONST.DATA_ATTRIBUTES.TOGGLE_OVERLAY);
				$el.toggleClass(CONST.CSS.ACTIVE);
				$body.css('overflow', $el.hasClass(CONST.CSS.ACTIVE) ? 'hidden' : '');
				e.preventDefault();
			});

			// Any links with the 'data-remove-hash' attribute will remove the hash from the window's location when clicked.
			$buttonDataRemoveHash.on(CONST.EVENTS.CLICK, function (e) {
				window.location.hash = '';
				e.preventDefault();
			});

			// Any links with the 'data-focus' attribute will focus and clear the element specified when clicked.
			$buttonDataFocus.on(CONST.EVENTS.CLICK, function (e) {
				$(this).getElementByDataAttribute(CONST.DATA_ATTRIBUTES.FOCUS).val('').trigger(CONST.EVENTS.FOCUS);
				e.preventDefault();
			});

			// Any forms with the 'data-form-add-active' attribute will add the 'active' class to the element specified when submitted.
			$formDataAddActive.on(CONST.EVENTS.VALID, function (e) {
				$(this).getElementByDataAttribute(CONST.DATA_ATTRIBUTES.FORM_ADD_ACTIVE).addClass(CONST.CSS.ACTIVE);
			}).on(CONST.EVENTS.SUBMIT, function (e) {
				e.preventDefault();
			});

			// Any forms with the 'data-form-remove-active' attribute will remove the 'active' class to the element specified when submitted.
			$formDataRemoveActive.on(CONST.EVENTS.VALID, function () {
				$(this).getElementByDataAttribute(CONST.DATA_ATTRIBUTES.FORM_REMOVE_ACTIVE).removeClass(CONST.CSS.ACTIVE);
			}).on(CONST.EVENTS.SUBMIT, function (e) {
				e.preventDefault();
			});

			// Any forms with the 'data-form-toggle-active' attribute will toggle the 'active' class to the element specified when submitted.
			$formDataToggleActive.on(CONST.EVENTS.VALID, function () {
				$(this).getElementByDataAttribute(CONST.DATA_ATTRIBUTES.FORM_TOGGLE_ACTIVE).toggleClass(CONST.CSS.ACTIVE);
			}).on(CONST.EVENTS.SUBMIT, function (e) {
				e.preventDefault();
			});

			/*
			Any forms with the 'data-form-show-overlay' attribute will add the 'active' class to the element specified
			and set overflow to hidden on the body element when submitted.
			*/
			$formDataShowOverlay.on(CONST.EVENTS.VALID, function () {
				$(this).getElementByDataAttribute(CONST.DATA_ATTRIBUTES.SHOW_OVERLAY).addClass(CONST.CSS.ACTIVE);
				$body.css('overflow', 'hidden');
			}).on(CONST.EVENTS.SUBMIT, function (e) {
				e.preventDefault();
			});

			/*
			Any forms with the 'data-form-hide-overlay' attribute will remove the 'active' class to the element specified
			and remove the overflow hidden on the body element when submitted.
			*/
			$formDataHideOverlay.on(CONST.EVENTS.VALID, function () {
				$(this).getElementByDataAttribute(CONST.DATA_ATTRIBUTES.HIDE_OVERLAY).removeClass(CONST.CSS.ACTIVE);
				$body.css('overflow', '');
			}).on(CONST.EVENTS.SUBMIT, function (e) {
				e.preventDefault();
			});

			/*
			Any forms with the 'data-form-toggle-overlay' attribute will toggle the 'active' class to the element specified
			and toggle the overflow on the body element when submitted.
			*/
			$formDataToggleOverlay.on(CONST.EVENTS.VALID, function () {
				var $el = $(this).getElementByDataAttribute(CONST.DATA_ATTRIBUTES.TOGGLE_OVERLAY);
				$el.toggleClass(CONST.CSS.ACTIVE);
				$body.css('overflow', $el.hasClass(CONST.CSS.ACTIVE) ? 'hidden' : '');
			}).on(CONST.EVENTS.SUBMIT, function (e) {
				e.preventDefault();
			});

			// When an input (checkbox/radio button) is selected/deselected it adds/removes the 'active' class from the targeted element.
			$inputDataAddActiveOnChecked.on(CONST.EVENTS.CHANGE, function () {
				$(this).getElementByDataAttribute(CONST.DATA_ATTRIBUTES.ADD_ACTIVE_ON_CHECKED).addClass(CONST.CSS.ACTIVE);
			}).on(CONST.EVENTS.DESELECT, function () {
				$(this).getElementByDataAttribute(CONST.DATA_ATTRIBUTES.ADD_ACTIVE_ON_CHECKED).removeClass(CONST.CSS.ACTIVE);
			});

			// Any links with the 'data-scroll-to' attribute will make the specified target scroll to the element specified when clicked.
			$buttonDataScrollTo.on(CONST.EVENTS.CLICK, function (e) {
				var $el = $(this),
					$target = $('body'),
					$scrollTo = $el.getElementByDataAttribute(CONST.DATA_ATTRIBUTES.SCROLL_TO);

				if ($el.data(CONST.DATA_ATTRIBUTES.SCROLL_TARGET)) {
					$target = $el.getElementByDataAttribute(CONST.DATA_ATTRIBUTES.SCROLL_TARGET);
				}

				$target.scrollToElement($scrollTo, 1000);
				e.preventDefault();
			});

			/*
			Listens for hash changes and adds the 'active' class to any elements that have matching 'data-hash-active' attributes.
			Trigger the hash change event to force the hash to be processed on page load.
			TODO: Make sure this works in all browsers.
			*/
			$window.on(CONST.EVENTS.HASH_CHANGE,function () {
				$.findDataElement(CONST.DATA_ATTRIBUTES.HASH_ACTIVE, window.location.hash).addClass(CONST.CSS.ACTIVE);
			}).trigger(CONST.EVENTS.HASH_CHANGE);
		};

		$[name] = fn;

		return fn;
	};
})();