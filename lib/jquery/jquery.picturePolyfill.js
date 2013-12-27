/*
 jquery.picturePolyfill - Polyfill that adds support for the picture element.

 Version:    1.0
 Author:     Michael Lawrence (michael.lawrence@rhythmagency.com)
 Copyright:  2013 Rhythm Interactive

 Usage:

 $.picturePolyfill();

 <picture alt="test image" src="http://fpoimg.com/800x400?text=high ie9">
	 <source src="http://fpoimg.com/800x400?text=high" media="(min-width:800px)" />
	 <source src="http://fpoimg.com/480x240?text=mid" media="(min-width:480px)" />
	 <source src="http://fpoimg.com/240x120?text=low" />
	 <noscript>
		 <img src="http://fpoimg.com/480x240?text=fallback" alt="test image" />
	 </noscript>
 </picture>

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
			// TODO: Add support to test if picture tag is supported. This can't really be done until more information about the picture element is released (JavaScript properties, etc.).

			document.createElement(CONST.SELECTORS.PICTURE);
			document.createElement(CONST.SELECTORS.SOURCE);

			var update = function () {
				var $pictures = $(CONST.SELECTORS.PICTURE);

				if ($pictures.length) {
					$pictures.each(function () {
						var $picture = $(this),
							$image = $(CONST.SELECTORS.IMG, $picture),
							$sources = $(CONST.SELECTORS.SOURCE, $picture);

						if (!$image.length) {
							$image = $(CONST.SELECTORS.ELEMENTS.IMG);
							$picture.append($image);
						}

						$.each(this.attributes, function () {
							if (this.name !== 'id') {
								$image.attr(this.name, this.value);
							}
						});

						$sources.each(function () {
							var $source = $(this),
								attrSourceMedia = $source.attr(CONST.ATTRIBUTES.MEDIA),
								queryMatch = Modernizr.mq(attrSourceMedia);

							if (queryMatch || !attrSourceMedia) {
								var attrSourceSrc = $source.attr(CONST.ATTRIBUTES.SRC);

								$image.attr(CONST.ATTRIBUTES.SRC, attrSourceSrc);

								return false;
							}
						});
					});
				}
			}

			$(window).bind(CONST.EVENTS.RESIZE, _.throttle(update, CONST.DURATIONS.DEFAULT));

			update();
		};

		$[name] = fn;

		return fn;
	};
})();