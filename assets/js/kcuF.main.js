(function($, kcuF) {
	"use strict";
	
	/***
	 * @namespace
	 * @name kcuF.main
	 */
	var main = kcuF.ns("main"),
		// required
		i18n = kcuF.ns("i18n"),
		template = kcuF.ns("template"),
		util = kcuF.ns("util"),
		formatter = kcuF.ns("util.formatter"),
		ui = kcuF.ns("ui");
	
	$.extend(main, /** @lends kcuF.main */{
		/**
		 * The Grid instance.
		 * @type {newbe.Grid}
		 */
		_grid: null,
		/**
		 * The Menu instance.
		 * @type {newbe.Menu}
		 */
		_menu: null,
		/**
		 * The Class/Object being tested right now.
		 */
		_config: {
			orignal: null,
			compiled: null
		},
		
		URI_CONFIG: "config.txt",
		
		QUERY_TOOLBAR: "div.kcuF-toolbar",
		QUERY_TOOLBAR_BUTTONS: "div.kcuF-toolbar button",
		QUERY_SIDEBAR: "div.kcuF-sidebar",
		QUERY_MAIN: "div.kcuF-main",
		QUERY_CASES: "#kcuF-cases",
		QUERY_GO: "#kcuF-go",
//		QUERY_STANDALONE: "#kcuF-standalone",
		QUERY_CODE: "#kcuF-code",
		QUERY_TESTCASE: "#kcuF-testcase",
		QUERY_DEPENDANCES: "#kcuF-dependances",
		QUERY_ABOUT: "#kcuF-about",
		QUERY_FEATURES: "#kcuF-features",
		QUERY_TODO: "#kcuF-todo",
		QUERY_SETTINGS: "#kcuF-settings",
		QUERY_IFRAME: "#kcuF-iframe",
		
		OPTS_GRID: {
			loop: false,
			tree: {
				children: "_children_",
				autoUnfold: function(item) {
					return item._tree_.level === 0 && item.name === i18n.get("Options");
				}
			},
			attachPoint: "div.kcuF div.kcuF-sidebar",
			columns: [{
				key: "name",
				name: i18n.get("Name"),
				align: "left",
				width: 150,
				sortAs: false
			}, {
				key: "value",
				name: i18n.get("Value"),
				align: "left",
				sortAs: false,
				get: function(v, item) {
					return main._htmlForItemValue(v, item, this);
				},
				edit: function(cell, item) {
					if (!item.dataType || item.choose || $.inArray(item.dataType, ["boolean", "object", "function"]) >= 0) {
						return false;
					}
					return true;
				}
			}],
			onItemMouseEnter: function(item, row/*, cell*/) {
				if (item._tree_.level === 0) {
					kcuF.ui.Tooltip.hide();
					return;
				}
				kcuF.ui.Tooltip.show({
					message: template.getAsString("tooltip-opt", {
						name: item.name,
						value: main._htmlForItemValue(item.value, item),
						type: typeof item.value,
						access: item.name.indexOf("_") === 0 ? i18n.get("Private") : i18n.get("Public")
					}),
					node: row
				});
			},
			onItemMouseLeave: function(/*item, row, cell*/) {
				if (!this.hovering) {
					kcuF.ui.Tooltip.hide();
				}
			}
		},
		
		OPTS_MENU: {
			toggler: "div.kcuF-sidebar .menu-toggler",
			items:[{
				key: "public",
				text: i18n.get("Public")
			}, {
				key: "private",
				text: i18n.get("Private"),
				callback: function () {
					alert("callback: i return nothing - the menu will be closed");
				}
			}, {
				key: "properties",
				text: i18n.get("Properties"),
				callback: function () {
					alert("callback: i return false - the menu will NOT be closed");
					return false;
				}
			}, {
				key: "methods",
				text: i18n.get("Methods"),
				disabled: true,
				separator: true,
				disabledCallback: function () {
					alert("disabledCallback: i'm disabled and i return nothing - the menu will NOT be closed");
				}
			}, {
				key: "sort_by_name",
				text: i18n.get("Sort_by_Name"),
				disabled: true,
				disabledCallback: function () {
					alert("disabledCallback: i'm disabled and i return true - the menu will be closed");
					return true;
				}
			}, {
				key: "sort_by_type",
				text: i18n.get("Sort_by_Type"),
				disabled: true,
				disabledCallback: function () {
					alert("disabledCallback: i'm disabled and i return true - the menu will be closed");
					return true;
				}
			}],
			onBeforeOpen: null,
			onOpen: null,
			onBeforeClose: null,
			onClose: null
		},
		
		startup: function() {
			main._setupUI();
			main._setupEvents();
			main._setupMenu();
			main._loadConfig();
		},
		
		_setupUI: function() {
			template.getAsDom$("main").appendTo("body");
			
			$(main.QUERY_TOOLBAR_BUTTONS).attr("disabled", "disabled");
			
			main._grid = ui.grid(main.OPTS_GRID);
			main._layout();
		},
		
		_setupEvents: function() {
			$(window).resize(main._layout);
			
			$(main.QUERY_TOOLBAR).find(main.QUERY_CASES).change(function() {
				$(main.QUERY_TOOLBAR_BUTTONS).attr("disabled", "disabled");
				main._grid.clear();
				
				var testcase = $(this).val();
				if (testcase) {
					if ($.cookie("setting.remember") === "true") {
						$.cookie("setting.last", testcase);
					}
					
					var framedConf = $.extend({}, main._getConfig(testcase));
					delete framedConf.optsExt;
					delete framedConf.opts;
					$(main.QUERY_IFRAME).attr("src", "framed.html?c=" + encodeURIComponent(util.toJson(framedConf)));// url cannot be longer than 2083 when using "?" (the limitation of GET)
				} else {
					$.cookie("setting.last", null);
					$(main.QUERY_IFRAME).attr("src", "framed.html");
				}
			}).end().find("button, a").click(function() {
				var node = $(this),
					config = main._getConfig();
				
				if (node.is(main.QUERY_GO)) {
					$(main.QUERY_IFRAME)[0].contentWindow.doTest(util.toJson(main.retrieveParams()));
//				} else if (node.is(main.QUERY_STANDALONE)) {
//					var framedConf = $.extend({}, config);
//					delete framedConf.optsExt;
//					delete framedConf.opts;
//					window.open("framed.html?c=" + encodeURIComponent(util.toJson(framedConf)) + "#o=" + encodeURIComponent(util.toJson(main.retrieveParams())));
				} else if (node.is(main.QUERY_CODE)) {
					main._openDialog(node, {
						buttons: [{
							text: i18n.get("Copy"),
							defaultButton: false,
							align: "left",
							callback: function() {
								alert("TODO copy to clipboard");
								return false;
							}
						}, {
							text: i18n.get("Run"),
							defaultButton: true,
							callback: function() {
//								$(main.QUERY_IFRAME)[0].contentWindow.kcuF.util.fromJson(this.data("codeEditor").getValue());
								alert("TODO run");
								return false;
							}
						}]
					}, {
						code: ["new ", config.clz, "(", util.toJson(main.retrieveParams()), ");"].join(""),
						readOnly: false
					});
				} else if (node.is(main.QUERY_DEPENDANCES)) {
					main._openDialog(node, {
						content: "<div class=\"kcuF-dlg-dependances\"></div>",
						onBeforeOpen: function() {
							var dlgDiv = this.find("div.kcuF-dlg-dependances"),
								dependsArr = [config.js, config.css, config.requiredJs, config.requiredCss],
								h4Arr = [i18n.get("Core_JS"), i18n.get("Core_CSS"), i18n.get("Required_JS"), i18n.get("Required_CSS")];
							for (var i = 0; i < dependsArr.length; i++) {
								var depends = dependsArr[i];
								if (depends && depends.length) {
									$("<h4>" + h4Arr[i] + "</h4>").appendTo(dlgDiv);
									for (var j = 0; j < depends.length; j++) {
										$("<div><a target=\"_blank\" href=\"" + depends[j] + "\">" + depends[j] + "</a></div>").appendTo(dlgDiv);
									}
								}
							}
						}
					});
				} else if (node.is(main.QUERY_TESTCASE)) {
					main._openDialog(node, {
						buttons: [{
							text: i18n.get("Orignal"),
							align: "left",
							defaultButton: true,
							callback: function(/*theBtn*/) {
								this.data("codeEditor.setValue").call(this, main._getConfig(null, true));
								this.updateButton(0, {
									defaultButton: true
								});
								return false;
							}
						}, {
							text: i18n.get("Compiled"),
							align: "left",
							callback: function(/*theBtn*/) {
								var compiledConfig = $.extend({}, main._getConfig());
								delete compiledConfig.opts;
								this.data("codeEditor.setValue").call(this, compiledConfig);
								this.updateButton(1, {
									defaultButton: true
								});
								return false;
							}
						}, {
							text: i18n.get("Close")
						}]
					}, {
						code: main._getConfig(null, true)
					});
				} else if (node.is(main.QUERY_ABOUT)) {
					main._openDialog(node, {
						content: template.getAsString("dlg-about")
					});
				} else if (node.is(main.QUERY_SETTINGS)) {
					main._openDialog(node, {
						content: template.getAsString("dlg-setting"),
						onBeforeOpen: function() {
							this.find("input:checkbox").change(function() {
								var checkbox = $(this),
									checkboxName = checkbox.attr("name"),
									checkboxChecked = checkbox.attr("checked");
								$.cookie("setting." + checkboxName, checkboxChecked ? true : null);
								if (checkboxName === "remember") {
									if (checkboxChecked) {
										$.cookie("setting.last", $(main.QUERY_CASES).val() || null);
									} else {
										$.cookie("setting.last", null);
									}
								}
							}).each(function() {
								var checkbox = $(this);
								if ($.cookie("setting." + checkbox.attr("name")) === "true") {
									checkbox.attr("checked", "checked");
								}
							});
						}
					});
				} else if (node.is(main.QUERY_FEATURES)) {
					main._openDialog(node, {
						content: "Features..."
					});
				} else if (node.is(main.QUERY_TODO)) {
					main._openDialog(node, {
						content: "Tooltip infomation<br />Method invokation<br />Instantiation feadback<br />Summary of private/public, attribute/methods<br />\"Default\" in tooltip"
					});
				} else {
					main._openDialog(node, {
						content: i18n.get("no_handler_set")
					});
				}
			});
		},
		
		_setupMenu: function() {
			main._menu = ui.menu(main.OPTS_MENU);
		},
		
		_loadConfig: function() {
			$.ajax({
				url: main.URI_CONFIG,
				dataType: "text",// DONOT use "json"
				success: function(data/*, textStatus, xhr*/) {
					var configMap;
					try {
						configMap = util.fromJson(data);// DONOT use $.parseJSON or JSON.parse because it's NOT be a "valid" JSON string
					} catch (ex) {
						main._openDialog(null, {
							title: i18n.get("Error"),
							content: i18n.get("error_parsing_config", "<span style=\"color: #C00;\">" + ex.message + "</span>")
						});
						throw ex;
					}
					
					var sel = $(main.QUERY_CASES)[0],
						testcases = [],
						k;
					
					main._config.orignal = util.fromJson(data);
					main._config.compiled = configMap;
					
					for (k in configMap) {
						if (configMap.hasOwnProperty(k)) {
							var config = main._processConfig(configMap, k);
							
							if (config.clz) {
								testcases.push(k);
							}
						}
					}
					
					$.each(testcases.sort(function(a, b) {
						return a.toLowerCase() > b.toLowerCase() ? 1 : -1;
					}), function(idx, itm) {
						sel.options[sel.options.length] = new Option(itm, itm);
					});
					
					var testcase = $.cookie("setting.last");
					if (testcase) {
						$(main.QUERY_CASES).val(testcase).trigger("change");
					} else {
						$(main.QUERY_IFRAME).attr("src", "framed.html");
					}
				},
				error: function(xhr, textStatus, errorThrown) {
					main._openDialog(null, {
						title: i18n.get("Error"),
						content: i18n.get("error_retrieving_config", "<span style=\"color: #C00;\">" + errorThrown + "</span>")
					});
				}
			});
		},
		/**
		 * 
		 * @param {Object} configMap
		 * @param {String} configKey
		 * @returns {Object}
		 */
		_processConfig: function(configMap, configKey) {
			/*
			 * a config is typically an object like this (where every thing is optional):
			 * --------------------------
			 * "testcase name": {
			 *   base: "base testcase name",// all values from base will be "absorbed", and then the "base" attribute is deserted
			 *   clz: "package.ClassName",// when missing, it can only be a "base"
			 *   optsKey: "xxx",// where to get the OPTS object, if lead by a "#" then locate inside class prototype (like jsdoc), otherwise locate inside class as static member
			 *   css: [],// core css urls used by the class
			 *   requiredCss: [],// required css urls, which will be loaded before the core css urls
			 *   js: [...],// core js urls where the class is defined
			 *   requiredJs: [...],// required js urls, which will be loaded before the core js urls
			 *   styles: [...],// addtional css rules spcificly for the testcase
			 *   ready: function(Clz) {...},// invoked when iframe is ready with all js-s and css-s
			 *   doTest: function(Clz, args) {...},// invoked when the "Go" button is clicked, if not set the doTest funtion will be "new Clz(args);"
			 *   optsExt: {// extention to the option object used by the class
			 *     type: {
			 *       choose: ["info", "warn", "error", ...]// this will give a selector in the "Options" panel
			 *     },
			 *     text: {
			 *       val: "xxxx"// give a user defined
			 *     },
			 *     validate: {
			 *       val: function() {...}// force the option to be a function and give it a value in the meantime
			 *     },
			 *     next: {
			 *       dataType: "function"// force the option to be a function, NOTE dataType is case-insensitive, vlidate ones are "string", "number", "boolean", "array", "object", "function"
			 *     }
			 *   }
			 * }
			 * --------------------------
			 * When extend from base:
			 * Simple values: "clz", "optsKey", "ready", "doTest"
			 *  - overriden by sub-testcase value
			 * Array values: "js", "requiredJs", "css", "requiredCss", "styles"
			 *  - base-testcase values will be PRE-pend to the sub-testcase values
			 * Object values: "optsExt"
			 *  - merge using $.extend({}, base, sub), so sub-testcase can have those defined in base and override if needed
			 */
			var config = configMap[configKey],
				simpleVals = ["clz", "optsKey", "ready", "doTest"],
				arrayVals = ["js", "css", "requiredJs", "requiredCss", "styles"],
				objectVals = ["optsExt"];
			
			$.each(arrayVals, function(idx, itm) {
				config[itm] = config[itm] || [];
			});
			
			if (config.base) {// extend from base
				var baseConfig = main._processConfig(configMap, config.base);
				
				$.each(simpleVals, function(idx, itm) {
					if (!config[itm] && baseConfig[itm]) {
						config[itm] = baseConfig[itm];
					}
				});
				
				$.each(arrayVals, function(idx, itm) {
					var baseJsCss = baseConfig[itm],
						configJsCss = config[itm];
					if (baseJsCss && baseJsCss.length) {
						for (var i = baseJsCss.length - 1; i >= 0; i--) {
							configJsCss.unshift(baseJsCss[i]);
						}
					}
				});
				
				$.each(objectVals, function(idx, itm) {
					config[itm] = $.extend({}, baseConfig[itm], config[itm]);
				});
				
				delete config.base;// delete it meaning the base is solved
			}
			
			$.each(arrayVals, function(idx, itm) {// remove useless arry values to make the object smaller
				if (!config[itm].length) {
					delete config[itm];
				}
			});
			
			return config;
		},
		/**
		 * Make the UI fully covers the whole browser window without scrolls.
		 */
		_layout: function() {
			var tb = $(main.QUERY_TOOLBAR),
				sb = $(main.QUERY_SIDEBAR),
				vp = util.viewport(),
				vh = vp.vh > 300 ? vp.vh : 300,
				vw = vp.vw > 400 ? vp.vw : 400,
				h = vh - tb.outerHeight(true);
			
			sb.outerHeight(h);
			main._grid.height(h - sb.children("div.title:first").outerHeight(true));
			$(main.QUERY_MAIN).outerHeight(h).outerWidth(vw - sb.outerWidth(true));
		},
		/**
		 * Open a dialog. This method will help set some default values of dialog options and will do the code highlighting if codeOpts is provided.
		 * @param {JQNode} node
		 * @param {Object} dlgOpts
		 * @param {Object} codeOpts
		 * @returns {kcuF.ui.Dialog}
		 */
		_openDialog: function(node, dlgOpts, codeOpts) {
			var options = $.extend(node ? {
				title: node.text(),
				refocus: node
			} : {
				refocus: $(main.QUERY_CASES)
			}, dlgOpts);
			if (codeOpts) {
				options.content = (options.content || "") + "<textarea></textarea>";
				options.focus = "none";
				options.onBeforeOpen = function() {
					codeOpts = $.extend({
						mode: "javascript",
						indentUnit: 4,
						lineNumbers: true,
						matchBrackets: true,
						readOnly: true
					}, codeOpts);
					
					var codeEditor = CodeMirror.fromTextArea(this.find("textarea")[0], codeOpts),
						setValue = function(code) {
							if (typeof code !== "string") {
								code = util.toJson(code);
							}
							if (codeOpts.mode === "javascript") {
								code = formatter.formatJS(code).replace(/\},\s*\{/g, "}, {");
							} else if (codeOpts.mode === "xml") {
								code = formatter.formatHTML(code);
							}
							codeEditor.setValue(code);
						};
					
					setValue(codeOpts.code);
					delete codeOpts.code;
					
					this.data({
						codeEditor: codeEditor,
						"codeEditor.setValue": setValue
					});
					if (dlgOpts.onBeforeOpen) {
						dlgOpts.onBeforeOpen.apply(this, arguments);
					}
				};
			}
			
			return ui.dialog(options);
		},
		
		_htmlForItemValue: function(v, item, grid) {
			if (item._tree_ && item._tree_.children) {
				return "<span style=\"color: #CCC;\">(" + item._tree_.children.length + " items)</style>";
			}
			
			var itemType = item.dataType,
				dataType = itemType || typeof v,
				cls = dataType,
				text;
			
			switch (dataType) {
			case "object":
				text = v ? "[Object]" : "null";
				break;
			case "function":
				text = v || grid ? "[Function]" : "null";
				break;
			case "string":
				if ((item.name || "").indexOf("TMPL") === 0 || (item.name || "").indexOf("_template") === 0) {// TODO configurable
					cls = "xml";
					text = "[HTML_FRAGMENT]";
				} else {
					cls = "string";
					text = v;
				}
				break;
			default:
				text = v;
				break;
			}
			
			if (!grid) {
				return text;
			}
			
			if (item.choose) {// OPTS - choose
				var selArr = ["<select name=\"" + item.name + "\" title=\"" + item.dataType + "\">", "<option value=\"\"></option>"];
				
				$.each(item.choose, function(idx, itm) {
					selArr.push("<option value=\"" + itm + "\"" + (item.value == itm ? " selected=\"selected\"" : "") + ">" + itm + "</option>");
				});
				
				selArr.push("</select>");
				return $(selArr.join("")).change(function() {
					item.value = $(this).val();// TODO dataType
				});
			}
			
			if (itemType === "boolean") {
				return $(["<label>",
						"<input type=\"radio\" name=\"" + item.name + "\" value=\"true\" " + (v ? "checked=\"checked\"" : "") + " />",
						(v ? "<b>true</b>" : "true"),
					"</label>",
					" <label>",
						"<input type=\"radio\" name=\"" + item.name + "\" value=\"false\" " + (!v ? "checked=\"checked\"" : "") + " />",
						(v ? "false" : "<b>false</b>"),
					"</label>"].join("")).find("input").change(function() {
						item.value = $(this).val() == "true";
					}).end();
			}
			
			return ($.inArray(cls, ["object", "function", "xml"]) >= 0 && (item.value !== null || item.dataType)) ? $("<a href=\"javascript:void('code');\" class=\"" + cls + "\">" + text + "</a>").click(function() {
				var dlgTitle, code, mode;
				switch (item.dataType || typeof item.value) {
				case "function":
					dlgTitle = "[Function]" + item.name;
					code = item.value ? item.value.toString() : "function() {}";
					mode = "javascript";
					break;
				case "string":
					dlgTitle = "[HTML_FRAGMENT]" + item.name;
					code = item.value;
					mode = "xml";
					break;
				default:
					dlgTitle = "[Object]" + item.name;
					code = item.value ? util.toJson(item.value) : "";
					mode = "javascript";
					break;
				}
				
				var dlg = main._openDialog($(this), {
					title: dlgTitle,
					buttons: item.dataType ? [{
						text: i18n.get("Save"),
						disabled: true,
						align: "left",
						defaultButton: true,
						callback: function() {
							if (mode === "javascript") {
								try {
									item.value = util.fromJson($.trim(this.data("codeEditor").getValue()));
									// there's no need to call grid.update(item, "value"); because UI is not to be updated
								} catch(ex) {
									alert(ex.message);
									return false;
								}
							}
						}
					}, {
						text: i18n.get("Restore"),
						disabled: true,
						callback: function() {
							this.data("codeEditor").setValue(code);
							this.updateButton(0, {
								disabled: true
							});
							return false;
						}
					}, {
						text: i18n.get("Cancel")
					}] : null
				}, {
					code: code,
					mode: mode,
					readOnly: !item.dataType,
					onChange: function(/*editor, change*/) {
						setTimeout(function() {
							dlg.updateButton(0, {
								disabled: false
							});
							dlg.updateButton(1, {
								disabled: false
							});
						}, 0);
					}
				});
			}) : ("<span class=\"" + cls + "\">" + text + "</span>");
		},
		/**
		 * Get one conf object by configKey, if configKey is omitted, get the current.
		 * @param {String} [configKey]
		 * @param {Booelan} [orignal]
		 * @returns {Object}
		 */
		_getConfig: function(configKey, orignal) {
			configKey = configKey || $(main.QUERY_CASES).val();
			if (orignal) {
				return main._config.orignal[configKey];
			}
			return main._config.compiled[configKey];
		},
//		/**
//		 * Get the current tested Class.
//		 * @returns {Class|Object}
//		 */
//		_getClz: function() {
//			return $(main.QUERY_IFRAME)[0].contentWindow.kcuF.forName(main._getConfig().clz);
//		},
		/**
		 * Get the default options object for current Class.
		 * @returns
		 */
		_getDefaultOpts: function(Clz) {
			var optsKey = main._getConfig().optsKey || "OPTS";
			
			return $.extend({}, optsKey.indexOf("#") === 0 ? Clz.prototype[optsKey.substring(1)] : Clz[optsKey]);
		},
		
		/* publics */
		retrieveParams: function() {
			var conf = main._getConfig(),
				optsArr = conf.opts,
				optsObj = {};
			
			$.each(optsArr, function(idx, itm) {
				optsObj[itm.name] = itm.value;
			});
			
			return optsObj;
		},
		
		frameReady: function(clz, Clz, cssErrs, jsErrs) {
			if (!Clz || cssErrs.length || jsErrs.length) {
				main._openDialog(null, {
					title: i18n.get("Error"),
					content: "<div class=\"kcuF-dlg-errorreport\"></div>",
					onBeforeOpen: function() {
						var dlgDiv = this.find("div.kcuF-dlg-errorreport");
						if (!Clz) {
							dlgDiv.append("<h4>" + i18n.get("class_not_found", clz) + "</h4>");
						}
						if (cssErrs.length) {
							dlgDiv.append("<h4>" + i18n.get("CSS_Errors") + "</h4>");
							$.each(cssErrs, function(idx, itm) {
								dlgDiv.append("<div>" + itm + "</div>");
							});
						}
						if (jsErrs.length) {
							dlgDiv.append("<h4>" + i18n.get("JS_Errors") + "</h4>");
							$.each(jsErrs, function(idx, itm) {
								dlgDiv.append("<div>" + itm + "</div>");
							});
						}
					}
				});
				
				return;
			}
			
			var optsArr = [],
				staticArr = [],
				dynamicArr = [],
				config = main._getConfig(),
				opts = main._getDefaultOpts(Clz),
				optsExt = config.optsExt || {},
				sortFn = function(a, b) {
					var aType = a.dataType || typeof a.value,
						bType = b.dataType || typeof b.value;
					
					if (aType === "function" && bType !== "function") {
						return 1;
					} else if (aType !== "function" && bType === "function") {
						return -1;
					} else {// both/neither function
						return a.name > b.name ? 1 : -1;
					}
				}, k;
			
			for (k in opts) {
				if (opts.hasOwnProperty(k)) {
					var v = opts[k],
						vType = typeof v;
					
					if (optsExt[k] && optsExt[k].val !== undefined) {
						v = optsExt[k].val;
					}
					
					if (optsExt[k] && optsExt[k].dataType) {
						vType = optsExt[k].dataType;
					} else {
						if (/^on[A-Z]/.test(k) || /handler/i.test(k) || /callback/i.test(k)) {// it's a onXxx callback or some handler
							vType = "function";
						}
					}
					
					optsArr.push({
						name: k,
						value: v,
						dataType: vType,
						choose: (optsExt[k] && optsExt[k].choose),
						devInfo: (optsExt[k] && optsExt[k].devInfo)
					});
				}
			}
			for (k in Clz) {
				if (Clz.hasOwnProperty(k)) {
					staticArr.push({
						name: k,
						value: Clz[k]
					});
				}
			}
			for (k in Clz.prototype) {
				if (Clz.prototype.hasOwnProperty(k)) {
					dynamicArr.push({
						name: k,
						value: Clz.prototype[k]
					});
				}
			}
			
			main._grid.add([{
				name: i18n.get("Options"),
				_children_: optsArr.sort(sortFn)
			}, {
				name: i18n.get("Static_Members"),
				_children_: staticArr.sort(sortFn)
			}, {
				name: i18n.get("Dynamic_Members"),
				_children_: dynamicArr.sort(sortFn)
			}]);
			
			config.opts = optsArr;// XXX
			
			$(main.QUERY_TOOLBAR_BUTTONS).removeAttr("disabled", "disabled");
			if ($.cookie("setting.auto") === "true") {
				$(main.QUERY_GO).trigger("click");
			}
		},
		
		frameTestDone: function(errMsg) {
			if (errMsg) {
				main._openDialog(null, {
					title: i18n.get("Error"),
					content: i18n.get("error_in_test", "<span style=\"color: #C00;\">" + errMsg + "</span>")
				});
			}
		}
	});
})(jQuery, kcuF);

$(function() {
	kcuF.main.startup();
});