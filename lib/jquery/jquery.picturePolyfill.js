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

	var Modernizr = require('browsernizr'),
		name = 'picturePolyfill';

	module.exports = exports[name] = function ($) {
		$ = $ || window.$;

		var fn = function () {
			// TODO: Add support to test if picture tag is supported.

			var $picture = $('picture');

			$picture.each(function() {
				var $source = $('source', $(this));


				$source.each(function() {
					var $el = $(this);
					console.log($el.attr('media'), Modernizr.mq('(' + $el.attr('media') + ')'));
				});
			});
		};

		$[name] = fn;

		return fn;
	};
})();