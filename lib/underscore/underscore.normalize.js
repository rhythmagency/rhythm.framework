/*
 underscore.normalize - Data normalization mixin for underscore.js.

 Version:    1.0
 Author:     Michael Lawrence (michael.lawrence@rhythmagency.com)
 Copyright:  2013 Rhythm Interactive

 Usage:

 _.normalize([0, 10, 100], [0, 10]);
 => [0, 1, 10]

 */

'use strict';

(function () {
	var name = 'normalize',
		mixin = {};

	module.exports = exports[name] = function (_) {
		_ = _ || window._;

		var fn = function (original, scaled) {
			var originalArray, originalMin, originalMax, scaledArray, scaledMin, scaledMax;

			if (_.isArray(original)) {
				originalArray = original;
			} else if(_.isObject(original) && !_.isFunction(original)) {
				originalArray = _.values(original);
			} else {
				throw 'Invalid parameter: original.';
			}

			if (_.isArray(scaled)) {
				scaledArray = scaled;
			} else if(_.isObject(scaled) && !_.isFunction(scaled)) {
				scaledArray = _.values(scaled);
			} else {
				throw 'Invalid parameter: scaled.';
			}

			originalMin = _.min(originalArray);
			originalMax = _.max(originalArray);
			scaledMin = _.min(scaledArray);
			scaledMax = _.max(scaledArray);

			return _.map(originalArray, function (value) {
				return scaledMin + (((value - originalMin) * (scaledMax - scaledMin)) / (originalMax - originalMin));
			});
		};

		mixin[name] = fn;
		_.mixin(mixin);

		return fn;
	};
})();