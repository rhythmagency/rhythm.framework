/*
 jquery.superscript - Superscripts the specified text strings.

 Version:    1.0
 Author:     Michael Lawrence (michael.lawrence@rhythmagency.com)
 Copyright:  2013 Rhythm Interactive

 Usage:

 $('body').superscript('®', '™', '©', '℠', '℗');
 */

'use strict';

(function () {
	var name = 'superscript';

	module.exports = exports[name] = function ($) {
		$ = $ || window.$;

		var fn = function () {
			var regex = new RegExp('(' + $.makeArray(arguments).join('|') + ')', 'gim');

			this.each(function () {
				var $el = $(this);
				$el.html($el.html().replace(regex, '<sup>$1</sup>'));
			});

			return this;
		};

		$.fn[name] = fn;

		return fn;
	};
})();