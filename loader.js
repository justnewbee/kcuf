(function($) {
	var kcuFLoader = {
		CONF: {
			version: "${version}",
			locale: "",// use default
			resourceBase: "",
			
			onError: function(msg) {},
			onProgress: function(pcnt) {},
			onDone: function() {}
		},
		CSS_JS: [
			// --- css --- //
			"assets/css/common.css",
			"assets/css/menu.css",
			"assets/css/grid.css",
			"assets/css/dialog.css",
			"assets/css/tooltip.css",
			"assets/css/main.css",
			
			// --- tools --- //
//			"assets/3rdparty/firebuglite/firebug-lite.js",
//			"assets/3rdparty/syntaxhighlighter/css/shCore.css",
//			"assets/3rdparty/syntaxhighlighter/css/shCoreDefault.css",
//			"assets/3rdparty/syntaxhighlighter/js/XRegExp.js",
//			"assets/3rdparty/syntaxhighlighter/js/shCore.js",
//			"assets/3rdparty/syntaxhighlighter/js/shBrushJScript.js",
//			"assets/3rdparty/syntaxhighlighter/js/shBrushXml.js",
			"assets/3rdparty/codemirror/lib/codemirror.css",
			"assets/3rdparty/codemirror/theme/default.css",
			"assets/3rdparty/codemirror/lib/codemirror.js",
			"assets/3rdparty/codemirror/mode/javascript.js",
			"assets/3rdparty/codemirror/mode/xml.js",
			
			// --- js --- //
			"assets/vendor/jquery.cookie.js",
			"assets/vendor/jquery.ui.core.js",
			"assets/vendor/jquery.ui.widget.js",
			"assets/vendor/jquery.ui.mouse.js",
			"assets/vendor/jquery.ui.draggable.js",
			"assets/js/kcuF.js",
			"assets/js/kcuF.util.js",
			"assets/js/kcuF.util.formatter.js",
			"assets/js/kcuF.ui.js",
			"assets/js/kcuF.ui.Menu.js",
			"assets/js/kcuF.ui.Grid.js",
			"assets/js/kcuF.ui.Dialog.js",
			"assets/js/kcuF.ui.Tooltip.js",
			"assets/js/kcuF.i18n.js",
			"assets/nls/kcuF_en_US.js",
			"assets/nls/kcuF_zh_CN.js",
			"assets/js/kcuF.template.js",
			"assets/tmpl/kcuF_all.js",
			"assets/js/kcuF.main.js"
		],
		
		_conf: null,
		
		load: function(params) {
			var conf = $.extend({}, kcuFLoader.CONF, params);
			kcuFLoader._conf = conf;
			
			var totalCssJs = kcuFLoader.CSS_JS.length,
				cmp = function() {
					conf.onDone();
				};
			
			if (!totalCssJs) {// you cannot load more than once
				cmp();
				return;
			}
			
			kcuFLoader._loadCssJs(function() {
				conf.onProgress(1 - kcuFLoader.CSS_JS.length / totalCssJs);
			}, function(msg) {
				conf.onError(msg);
			}, cmp);
		},
		
		_loadCssJs: function(prg, err, cmp) {
			var v = /^\$\{\w+\}$/.test(kcuFLoader._conf.version) ? new Date().getTime() : kcuFLoader._conf.version,// so that local develop need not to clean cache
				elH = document.getElementsByTagName("head")[0],
				el;
			
			var loadCssJs = function() {
				var url = kcuFLoader.CSS_JS.shift();
				if (!url) {
					cmp();
					return;
				}
				
				prg();
				
				var fullUrl = kcuFLoader._conf.resourceBase + url + "?_v=" + v;
				if (/\.js$/i.test(url)) {
					el = document.createElement("script");
					el.type = "text/javascript";
					el.src = fullUrl;
					
					if ($.browser.msie) {
						el.onreadystatechange = function(e) {
							if (el.readyState === "loaded" || el.readyState === "complete") {
								loadCssJs();
							}
						};
					} else {
						el.onload = function(e) {
							loadCssJs();
						};
						el.onerror = function() {
							err("Failed in loading JS \"" + url + "\"");
						};
					}
					elH.appendChild(el);
				} else {
					el = document.createElement("link");
					el.type = "text/css";
					el.rel = "stylesheet";
					el.href = fullUrl;
					
					elH.appendChild(el);
					
					loadCssJs();
				}
			};
			
			loadCssJs();
		}
	};
	
	kcuFLoader.load();
	
	// export
	window.kcuFLoader = kcuFLoader;
}(jQuery));