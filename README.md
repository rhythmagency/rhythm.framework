rhythm.framework
================

All modules/plugins are built for use with [Browserify](http://browserify.org/).


## Modules
##### browser-css-supports
Module to test whether a CSS property is supported by the browser.

##### event-dispatcher
This is the events system used inside of backbone.

[https://github.com/documentcloud/backbone](https://github.com/documentcloud/backbone).


## jQuery Plugins

##### jquery.backbone.hijax
jQuery plugin for Backbone that implements Hijax routing. Allows us to find any links that start with '/' and intercept them and add a '#' to the beginning. This prevents the page from reloading.

**Usage:**

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

##### jquery.classSwitcher
A jQuery plugin that switches the class of an element based on the prefix supplied.

##### jquery.customFileInput
Replaces the standard HTML file input element with a stylized button.

##### jquery.dataAttributeFramework
A collection of utilities that are based on html5 data-attributes.

*Note: This will become deprecated with a newer version that utilizes Angular directives.*

##### jquery.decodeEntities
Simple jQuery plugin for decoding html entities and returning the results.

**Usage:**

	$('#myElement').decodeEntities();

##### jquery.findDataElement
Searches for elements who have the data attribute specified.

##### jquery.getElementByDataAttribute
A jQuery plugin that looks at the value of the data attribute specified and retrieves a jQuery element based on the data attribute's value.

##### jquery.picturePolyfill

Polyfill that adds support for the picture element.

**Usage:**

	$.picturePolyfill();

	<picture alt="test image" src="http://fpoimg.com/800x400?text=high ie9">
		<source src="http://fpoimg.com/800x400?text=high" media="(min-width:800px)" />
		<source src="http://fpoimg.com/480x240?text=mid" media="(min-width:480px)" />
		<source src="http://fpoimg.com/240x120?text=low" />
		<noscript>
			<img src="http://fpoimg.com/480x240?text=fallback" alt="test image" />
		</noscript>
	</picture>

##### jquery.radioDeselectEvent
A jQuery plugin that adds a deselect event to radio buttons.

##### jquery.removeClassWithPrefix
A jQuery plugin that removes the class of an element based on the prefix supplied.

##### jquery.replaceEntities
Simple jQuery plugin for replacing html entities and returning the result.

**Usage:**

	$('#myElement').replaceEntities();

##### jquery.reverse
Simple plugin that reverses the results from a jQuery result set.

**Usage:**

	<div id='module1' class='module'>Module 1</div>
	<div id='module2' class='module'>Module 2</div>
	<div id='module3' class='module'>Module 3</div>

	var modules = $('.module');
		=> [
			<div id='module1' class='module'>Module 1</div>,
			<div id='module2' class='module'>Module 2</div>,
			<div id='module3' class='module'>Module 3</div>
		]

	modules = modules.reverse();
		=> [
			<div id='module3' class='module'>Module 3</div>,
			<div id='module2' class='module'>Module 2</div>,
			<div id='module1' class='module'>Module 1</div>
		]

##### jquery.scrollToElement
A jQuery plugin that will animate the scrollTop of an element to another element.

##### jquery.superscript
Superscripts the specified text strings.

*Note: DO NOT run this on the body or html elements. This will cause the script to run over and over again.*

**Usage:**

	$('#my-element').superscript('®', '™', '©', '℠', '℗');

##### jquery.svgFallback
Fallback image replacement plugin for jQuery.

**Usage:**

	$('img[data-svg-fallback]').svgFallback();

	<img src='images/logo.svg' data-fallback='images/logo.png' alt='logo' />


## Modernizr Plugins

##### modernizr.columnBreakInside
Adds a Modernizr test that checks if the browser supports the column-break-inside property.


## Underscore Mixins

##### underscore.normalize
Data normalization mixin for underscore.js.

**Usage:**

	_.normalize([0, 10, 100], [0, 10]);
	=> [0, 1, 10]
