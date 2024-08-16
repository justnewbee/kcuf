(function(kcuF, $) {
	"use strict";
	
	/**
	 * @namespace
	 * @name kcuF.util
	 */
	var util = kcuF.ns("util");
	
	$.extend(util, /** @lends kcuF.util */{
		/**
		 * Get viewport of body, adopted from dojo.
		 * @returns {Object}
		 */
		viewport: function() {
			var dd = document.documentElement, db = document.body,
				vw = db.clientWidth, vh = db.clientHeight,// viewport width/height
				fw, fh;// full width/height
			
			if ($.browser.mozilla) {
				vw = dd.clientWidth;
				vh = window.innerHeight;
			} else if (!$.browser.opera) {
				if (window.innerWidth) {
					vw = window.innerWidth;
					vh = window.innerHeight;
				} else if (dd && dd.clientWidth) {// IE6 Strict
					vw = dd.clientWidth;
					vh = dd.clientHeight;
				}
			}
			
			if ($.browser.msie && $.browser.version < 7) {
				var sw = Math.max((dd && dd.scrollWidth) || 0, db.scrollWidth),
					ow = Math.max((dd && dd.offsetWidth) || 0, db.offsetWidth),
					sh = Math.max((dd && dd.scrollHeight) || 0, db.scrollHeight),
					oh = Math.max((dd && dd.offsetHeight) || 0, db.offsetHeight);
				
				fw = sw < ow ? vw : sw;
				fh = sh < oh ? vh : sh;
			} else {// "good" browsers
				fw = $(document).width();
				fh = $(document).height();
			}
			return {
				vw: vw,
				vh: vh,
				fw: fw,
				fh: fh,
				x: window.pageXOffset || (dd && dd.scrollLeft) || db.scrollLeft || 0,
				y: window.pageYOffset || (dd && dd.scrollTop) || db.scrollTop || 0
			};
		},
		
		forName: function(objName, root) {
			var obj = window || root,
				parts = objName.split(".");
			for (var i = 0, p; obj && (p = parts[i]); i++) {
				obj = obj[p];
			}
			return obj;
		},
		
		fromJson: function(str) {
			try {
				return eval("(" + str + ")");
			} catch (ex) {
				console.warn("\"" + str + "\"");
				throw ex;
			}
		},
		
		toJson: function(anything, fmt) {
			var format = $.extend({
					indent: "",// " ", "\t"
					newline: false,
					alwaysQuoteKey: false,
					spaceAfterColon: false,
					spaceBetweenArray: false
				}, fmt),
				stringfy = function(o, key, ind) {
					var arr = [], tmpArr, i, l, k;
					if (key !== undefined) {
						if (format.alwaysQuoteKey || /^\d/.test(key) || !/^[\w_\$]+$/.test(key) || " abstract false private boolean final protected break finally public byte float return case for short catch function static char goto switch class if synchronized const implements this continue import throw debugger in throws default instanceof transient delete int true do interface try double long typeof else native var enum new vo export null while extends package with ".indexOf(" " + key + " ") >= 0) {
							key = "\"" + key + "\"";
						}
						arr.push((ind || "") + format.indent + key + (format.spaceAfterColon ? ": " : ":"));
					}
					
					switch (typeof o) {
					case "function":
						arr.push(o.toString().replace(/\n/g, " "));
						break;
					case "object":
						if (o === null) {
							arr.push("null");
						} else if (o instanceof Array) {
							tmpArr = [];
							for (i = 0, l = o.length; i < l; i++) {
								tmpArr.push(stringfy(o[i]));
							}
							arr.push("[" + tmpArr.join(format.spaceBetweenArray ? ", " : ",") + "]");
						} else {// really an object
							tmpArr = [];
							for (k in o) {
								if (o.hasOwnProperty(k)) {
									tmpArr.push(stringfy(o[k], k, ind));
								}
							}
							arr.push("{" + (format.newline ? "\n" : "") + tmpArr.join((format.newline ? ",\n" : ",")) + (format.newline ? "\n" : "") + "}");
						}
						break;
					case "string":
						arr.push("\"" + o.toString().replace(/"/g, "\\\"") + "\"");
						break;
					case "number":
					case "boolean":
					case "undefined":
						arr.push(o + "");
						break;
					default:
						break;
					}
					
					return arr.join("");
				};
			
			return stringfy(anything);
		}
	});
}(kcuF, kcuF.$));