/*
 jquery.findDataElement - Searches for elements who have the data attribute specified.

 Version:    1.0
 Author:     Michael Lawrence (michael.lawrence@rhythmagency.com)
 Copyright:  2013 Rhythm Interactive

 TODO: Provide documentation for this plugin.
 */

'use strict';

(function () {
	var name = 'findDataElement';

	module.exports = exports[name] = function ($) {
		$ = $ || window.$;

		var getQuery, fnGen, fn;

		getQuery = function (dataAttribute, value, operator) {
			operator = operator || '=';

			var query = '*[data-' + dataAttribute;

			if (value !== undefined) {
				query += operator + '"' + value + '"';
			}

			query += ']';

			return query;
		};

		fnGen = function (isStatic) {
			return function (dataAttribute, value, operator) {
				var query = getQuery(dataAttribute, value, operator);
				return isStatic ? $(query) : $(query, this);
			};
		};

		fn = fnGen(false);

		$[name] = fnGen(true); // Static version
		$.fn[name] = fn;

		return fn;
	};
})();