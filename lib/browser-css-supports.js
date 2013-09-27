var _s = require('underscore.string');

module.exports = exports['browserCSSSupports'] = (function () {
	var vendors = 'Khtml Ms O Moz Webkit'.split(' '),
		len = vendors.length;

	return function (prop) {
		if (prop in document.body.style) return true;

		prop = _s.titleize(prop).replace(/[^a-z]/gim, '');

		while (len--) {
			if (vendors[len] + prop in document.body.style) {
				return true;
			}
		}
		return false;
	};
})();