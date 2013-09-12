/*
 jquery.superscript - Superscripts the specified text strings.

 Version:    1.0
 Author:     Michael Lawrence (michael.lawrence@rhythmagency.com)
 Copyright:  2013 Rhythm Interactive

 Notes:

 DO NOT run this on the body or html elements.
 This will cause the script to run over and over again.

 Usage:

 $('#my-element').superscript('®', '™', '©', '℠', '℗');
 */

'use strict';

(function () {
	var name = 'superscript';

	module.exports = exports[name] = function ($) {
		$ = $ || window.$;

		var fn = function () {
			var $el = $(this),
				regex = new RegExp('(' + $.makeArray(arguments).join('|') + ')', 'gim');

			$el.html($el.html().replace(regex, '<sup>$1</sup>'));

			return this;
		};

		$.fn[name] = fn;

		return fn;
	};
})();