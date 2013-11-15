/*
 jquery.picturePolyfill - Polyfill that adds support for the picture element.

 Version:    1.0
 Author:     Michael Lawrence (michael.lawrence@rhythmagency.com)
 Copyright:  2013 Rhythm Interactive

 TODO: Provide documentation for this plugin.
 */

'use strict';

(function () {
	require('browsernizr/lib/mq');

	var _ = require('underscore'),
		Modernizr = require('browsernizr'),
		CONST = require('../constants'),
		name = 'picturePolyfill';

	module.exports = exports[name] = function ($) {
		$ = $ || window.$;

		var fn = function () {
			// TODO: Add support to test if picture tag is supported.

			var update = function () {
				var $picture = $(CONST.SELECTORS.PICTURE),
					$image = $picture.find(CONST.SELECTORS.IMG);

				if (!$image.length) {
					var $attrPictureAlt = $picture.attr(CONST.ATTRIBUTES.ALT);

					$image = $picture
						.append(CONST.SELECTORS.ELEMENTS.IMG)
						.attr(CONST.ATTRIBUTES.ALT, $attrPictureAlt);
				}

				$picture.each(function () {
					var $source = $(CONST.SELECTORS.SOURCE, $(this));

					$source.each(function () {
						var $el = $(this),
							attrSourceMedia = $el.attr(CONST.ATTRIBUTES.MEDIA),
							queryMatch = Modernizr.mq(attrSourceMedia);

						if (queryMatch || !attrSourceMedia) {
							var attrSourceSrc = $el.attr(CONST.ATTRIBUTES.SRC);

							$image.attr(CONST.ATTRIBUTES.SRC, attrSourceSrc);

							return false;
						}
					});
				});
			}

			$(window).resize(_.throttle(update, CONST.DURATIONS.DEFAULT));
			update();
		};

		$[name] = fn;

		return fn;
	};
})();