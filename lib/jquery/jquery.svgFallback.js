/*
 jquery.svgFallback - Fallback image replacement plugin for jQuery.

 Version:    1.0
 Author:     Michael Lawrence (michael.lawrence@rhythmagency.com)
 Copyright:  2013 Rhythm Interactive

 Usage:

 $('img[data-svg-fallback').svgFallback();

 <img src='images/logo.svg' data-fallback='images/logo.png' alt='logo' />
 */

'use strict';

(function () {
	var name = 'svgFallback';

	module.exports = exports[name] = function ($) {
		$ = $ || window.$;

		// Constants
		var CONST = require('../constants');

		var fn = function () {
			var SRC = 'src';

			this.each(function () {
				var $el = $(this),
					dataFallback = $el.data(CONST.DATA_ATTRIBUTES.SVG_FALLBACK),
					onError = function () {
						$el.off(CONST.EVENTS.ERROR, onError).attr(SRC, dataFallback);
					};

				if (dataFallback) {
					$el.on(CONST.EVENTS.ERROR, onError).attr(SRC, $el.attr(SRC));
				}
			});

			return this;
		};

		$.fn[name] = fn;

		return fn;
	};
})();