'use strict';

var $ = require('jquery-browser/lib/jquery');

require('../../../lib/jquery/jquery.picturePolyfill')($);

$(function () {
	console.log('Starting test...');

	$.picturePolyfill();
});