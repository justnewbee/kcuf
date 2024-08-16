(function(kcuF, $) {
	"use strict";
	
	/**
	 * @namespace
	 * @name kcuF.template
	 */
	var template = kcuF.ns("template"),
		i18n = kcuF.ns("i18n"),
		TMPLS = {};
	
	$.extend(template, /** @lends kcuF.template */{
		__TMPLS__: TMPLS,// quick ref for dev
		/**
		 * Register a template with specified key in `TMPLS`.
		 * A template is a string of HTML code with place-holders in it.
		 * Now there're two kinds of placeholders in a template: i18n {@i18n_key} and data {:data_string}.
		 * You have to give the `data` as an object when you want the template, i18n will be handled automatically.
		 * @param {Array|String} tmpl
		 * @param {String} key
		 */
		add: function(tmpl, key) {
			if (TMPLS[key]) {
				return;
			}
			
			TMPLS[key] = $.isArray(tmpl) ? tmpl.join("") : tmpl;
		},
		/**
		 * Batch add templates, can help save a lot of individual `add` calls.
		 * @param {Object} o
		 */
		addBatch: function(o) {
			$.each(o, function(k, v) {
				template.add(v, k);
			});
		},
		/**
		 * Get template as a string by replacing i18n and data place-holders, the template must have been registered using `add` first.
		 * @param {String} key The template key in `TMPLS`.
		 * @param {Object} [data]
		 * @returns {String}
		 */
		getAsString: function(key, data) {
			var tmpl = TMPLS[key];
			if (tmpl === undefined) {
				throw "NO template \"" + key + "\" has been defined, must add first!";
			}
			
			return template.makeString(tmpl, data);
		},
		/**
		 * Get as jQuery DOM element object.
		 * @param {String} key The template key in `TMPLS`.
		 * @param {Object} [data]
		 * @param {Document} [doc]
		 * @returns {JQDom}
		 */
		getAsDom$: function(key, data, doc) {
			return $(template.getAsString(key, data), doc);
		},
		/**
		 * Sometimes you don't want to add any template but simply want to use the replace functionality of template.
		 * @param {Array|String} tmpl
		 * @param {Object} [data]
		 */
		makeString: function(tmpl, data) {
			tmpl = $.isArray(tmpl) ? tmpl.join("") : (tmpl || "");
			data = data || {};
			
			return tmpl.replace(/\\?([#\$])\{([^\{}]+)}/g, function(match, $_1, $_2) {// replace function gives arguments as: match, group1, group2, ..., index, the_string
				if (match.charAt(0) === "\\") {// escape so that it won't be processed
					return match.slice(1);
				}
				
				if ($_1 === "#") {// i18n
					return i18n.get($_2);
				}
				
				return (data[$_2] !== undefined) ? data[$_2] : "";
			});
		}
	});
}(kcuF, kcuF.$));