$(function() {
	"use strict";
	
	var i18n = kcuF.i18n,
		util = kcuF.util;
	
	var locSearch = window.location.search;
	
	if (!locSearch) {
		$("<h1 style=\"font-size: 150%; color: #F90;\">" + i18n.get("choose_testcase_please") + "</h1>").appendTo("body");
		return;
	}
	var config = util.fromJson(decodeURIComponent(locSearch.substring(locSearch.indexOf("=") + 1))),
		cssErrs = [],
		jsErrs = [],
		framed = top !== self,
		docHead = $("head");
	
	document.title = config.clz;
	
	function loadJsCss(uri) {
		var css = uri.lastIndexOf(".css") === uri.length - 4;// otherwise js
		if (/^https?:\/\//.test(location.href)) {
			$.ajax({
				url: uri,
				async: false,
				type: framed ? "GET" : "HEAD",
				dataType: (framed && !css) ? "script" : "text",
				success: function(data, textStatus, xhr) {
					if (css) {
						docHead.append("<link type=\"text/css\" rel=\"stylesheet\" href=\"" + uri + "\" />");
					} else if (!framed) {
						var script = document.createElement("script");
						script.type = "text/javascript";
						script.src = uri;
						docHead[0].appendChild(script);
					}
				},
				error: function(xhr, textStatus, err) {
					(css ? cssErrs : jsErrs).push("<a target=\"_blank\" href=\"" + uri + "\">" + uri + "</a> <b style=\"color: #C00;\">" + textStatus + "</b> " + (err.message || err));
				}
			});
		} else {
			if (css) {
				docHead.append("<link type=\"text/css\" rel=\"stylesheet\" href=\"" + uri + "\" />");
			} else {
				var script = document.createElement("script");
				script.type = "text/javascript";
				script.src = uri;
				docHead[0].appendChild(script);
			}
		}
	}
	$.each((config.requiredCss || []).concat(config.css || []).concat(config.requiredJs || []).concat(config.js || []), function(idx, itm) {
		loadJsCss(itm);
	});
	
	if (config.styles) {
		var styleEl = document.createElement("style");
		styleEl.setAttribute("type", "text/css");
		$("head")[0].appendChild(styleEl);
		if (styleEl.styleSheet && styleEl.styleSheet.cssText) {
			styleEl.styleSheet.cssText += config.styles.join("\n");
		} else {
			styleEl.appendChild(document.createTextNode(config.styles.join("\n")));
		}
	}
	
	if (framed) {
		if (cssErrs.length || jsErrs.length) {
			$("<h1 style=\"font-size: 150%; color: #C33; margin-bottom: 5px;\">" + i18n.get("iframe_ready_with_errors") + " <span style=\"color: #999; font-size: 70%;\">" + config.clz + "</span></h1>").appendTo("body");
		} else {
			$("<h1 style=\"font-size: 150%; color: #3C3; margin-bottom: 5px;\">" + i18n.get("iframe_ready") + " <span style=\"color: #999; font-size: 70%;\">" + config.clz + "</span></h1>").appendTo("body");
			$("<div style=\"color: #33C; margin-bottom: 5px;\">" + i18n.get("you_can_now_test", ["<b>" + i18n.get("Options") + "</b>", "<b>" + i18n.get("Go") + "</b>"]) + "</div>").appendTo("body");
		}
	}
	
	setTimeout(function() {
		var Clz;
		if (config.getClz) {
			Clz = config.getClz();
		} else {
			Clz = util.forName(config.clz);
		}
		
		if (config.ready) {
			config.ready(Clz);
		}
		
		if (framed) {
			window.doTest = function(strOpts) {
				var exCaught;
				try {
					var args = util.fromJson(strOpts),
						instance;
					if (config.doTest) {
						instance = config.doTest(Clz, args);
					} else {
						instance = new Clz(args);
					}
					
					if (instance) {
						kcuF._instances.push(instance);
					}
				} catch(ex) {
					exCaught = ex.message;
					throw ex;
				} finally {
					parent.kcuF.main.frameTestDone(exCaught);
				}
			};
			parent.kcuF.main.frameReady(config.clz, Clz, cssErrs, jsErrs);
		} else {
			var args = kcuF.retrieveParams(), instance;
			
			if (config.doTest) {
				instance = config.doTest(Clz, args);
			} else {
				instance = new Clz(args);
			}
			if (instance) {
				kcuF._instances.push(instance);
			}
		}
	}, framed ? 0 : 1000);
});