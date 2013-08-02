/*
 jquery.backboneHijax - jQuery plugin for Backbone that implements Hijax routing.
 Allows us to find any links that start with '/' and intercept them and add a '#'
 to the beginning. This prevents the page from reloading.

 Version:    1.0
 Author:     Michael Lawrence (michael.lawrence@rhythmagency.com)
 Copyright:  2013 Rhythm Interactive

 Usage:

 var router = Backbone.Router.extend({
	 'routes': {
		 'home' : 'home',
		 'about' : 'about'
	 },

	 'home' : function () {
		...
	 },

	 'about' : function () {
		...
	 }
 });

 $.backboneHijax(router);

 */

'use strict';

(function () {
	var name = 'backboneHijax';

	module.exports = exports[name] = function ($) {
		$ = $ || window.$;

		// Constants
		var CONST = require('../constants');

		var fn = function () {
			return $(document).on(CONST.EVENTS.CLICK, 'a[href]:not([data-bypass])', function (e) {
				var href = $(this).attr('href'),
					url = href.replace(/^\//,'').replace('\#\!\/','');

				if (href.charAt(0) === '/') {
					router.navigate(url, { 'trigger' : true });

					e.preventDefault();
					return false;
				}
			});
		};

		$.fn[name] = fn;

		return fn;
	};
})();