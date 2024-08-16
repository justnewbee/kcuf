(function(kcuF, $) {
	"use strict";
	
	/**
	 * @namespace
	 * @name kcuF.i18n
	 */
	var i18n = kcuF.ns("i18n"),
		DEFAULT_LOCALE = "en_US",
		locale = DEFAULT_LOCALE,
		BUNDLES = {};// a map storing all loaded resource bundles
	
	$.extend(i18n, /** @lends kcuF.i18n */{
		__BUNDLES__: BUNDLES,// quick ref for dev
		
		/**
		 * Get i18n-ed string.
		 * @example
		 * i18n.get("key");// no args
		 * i18n.get("key", ["blah", "blah"]);// args in array
		 * i18n.get("key", "blah", "blah");// args followed by key
		 * @return {String}
		 */
		get: function() {
			var bundle = BUNDLES[locale] || BUNDLES[DEFAULT_LOCALE] || {},// in case not loaded
				key = arguments[0],
				args;
			
			if (arguments.length === 2 && $.isArray(arguments[1])) {// ("key", ["blah", "blah"]);
				args = arguments[1];
			} else {// ("key"); or ("key", "blah", "blah");
				args = Array.prototype.slice.call(arguments, 1);
			}
			
			return (bundle[key] || "").replace(/\{(\d+)\}/g, function(m, i) {
				return args[i] === undefined ? "" : args[i];
			}) || key;
		},
		/**
		 * Add a resource bundle.
		 * @param {Object} bundle
		 * @param {String} loc
		 */
		add: function(bundle, loc) {
			if (!BUNDLES[loc]) {
				BUNDLES[loc] = bundle;
			} else {
				$.extend(BUNDLES[loc], bundle);
			}
		}
	});
}(kcuF, kcuF.$));