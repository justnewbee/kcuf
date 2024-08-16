(function(window, $) {
	"use strict";
	
	var kcuF = /** @lends kcuF */{
		$: $,
		_instances: [],
		/**
		 * Get namespace under `kcuF` with specified path, if anything under the path does not exist, it's created.
		 * If the path indicates it's a class (e.g. "Foo"), then a Class (function) is create, otherwise (e.g. "foo", "FOO"), object.
		 * Anything created using `kcuF.ns` will automatically have a `NS` field holding its full namespace (leading with "kcuF.").
		 * @param {String} subNs Sub namespace under `kcuF`, NO "kcuF." before the path.
		 * @returns {Object|Function} The namespace gotten or created.
		 * @example
		 * var OK = kcuF.ns("OK");// return `kcuF.OK` as an object, and indicates it's a constant
		 * var foo = kcuF.ns("foo");// returns `kcuF.foo` as an object
		 * var Bar = kcuF.ns("foo.Bar");// return `kcuF.foo.Bar` as a class
		 */
		ns: function(subNs) {
			var o = kcuF,
				currPaths = ["kcuF"],
				paths = subNs.split("."),
				p = paths.shift(),
				create = function() {
					return (/^_*[A-Z]/.test(p) && p.toUpperCase() !== p) ? function() {
						if (this._ctor) {
							this._ctor.apply(this, arguments);
						}
					} : {};
				};
			
			while (p) {
				currPaths.push(p);
				if (!o[p]) {
					o[p] = create();
					o[p].NS = currPaths.join(".");
				}
				
				o = o[p];
				p = paths.shift();
			}
			
			return o;
		}
	};
	
	// export
	window.kcuF = kcuF;
}(window, $));