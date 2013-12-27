/*
 jquery.reverse - Simple plugin that reverses the results from a jQuery result set.

 Version:    1.0
 Author:     Michael Lawrence (michael.lawrence@rhythmagency.com)
 Copyright:  2013 Rhythm Interactive

 Usage:

 <div id='module1' class='module'>Module 1</div>
 <div id='module2' class='module'>Module 2</div>
 <div id='module3' class='module'>Module 3</div>

 var modules = $('.module');
 => [<div id='module1' class='module'>Module 1</div>,
 <div id='module2' class='module'>Module 2</div>,
 <div id='module3' class='module'>Module 3</div>]

 modules = modules.reverse();
 => [<div id='module3' class='module'>Module 3</div>,
 <div id='module2' class='module'>Module 2</div>,
 <div id='module1' class='module'>Module 1</div>]
 */

'use strict';

(function () {
	var name = 'reverse';

	module.exports = exports[name] = function ($) {
		$ = $ || window.$;

		var fn = function () {
			return [].reverse;
		};

		$.fn[name] = fn;

		return fn;
	};
})();