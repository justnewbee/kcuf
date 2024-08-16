(function(kcuF, $) {
	"use strict";
	
	/**
	 * Menu component.
	 * @author <a href="mailto:justnewbee@gmail.com">Jianchun Wang</a>
	 * @class kcuF.ui.Menu
	 * @param {Object} opts
	 * @example
	 * 
	 * @description
	 * <h3>Change History:</h3>
	 * <ul>
	 *   <li><b>1.0.0 [2011-05-13/Jianchun]:</b> Initial draft.</li>
	 * </ul>
	 */
	var Menu = kcuF.ns("ui.Menu"),
		
		util = kcuF.ns("util"),
		template = kcuF.ns("template");
	
	$.extend(Menu, /** @lends kcuF.ui.Menu */{
		/**
		 * Default options for {@link kcuF.ui.Menu} instances.
		 */
		OPTS: {
			/**
			 * Menu toggler.
			 * @type String|DomNode|JQNode
			 */
			toggler: "",
			/**
			 * By default, the menu items are aligned vertically, use this option to give the menu a horizontal view.
			 * @type Boolean
			 */
			horizontal: false,
			/**
			 * Setting of menu items, each item is an object, @see kcuF.ui.Menu.OPTS_ITEM
			 * @type Array
			 */
			items: null,
			/**
			 * Callback right before the menu is about to be opened, return false to keep the menu from being opened.
			 * @type Function
			 */
			onBeforeOpen: null,
			/**
			 * Callback after the menu is opened.
			 * @type Function
			 */
			onOpen: null,
			/**
			 * Callback right before the menu is about to be closed, return false to keep the menu from being closed.
			 * @type Function
			 */
			onBeforeClose: null,
			/**
			 * Callback after the menu is closed.
			 * @type Function
			 */
			onClose: null
		},
		
		OPTS_ITEM: {
			/**
			 * All menu items could be referenced by index, however giving the menu a unique key is much safer, this option is optional.
			 * @type String
			 */
			key: "",
			/**
			 * The text to be displayed, this option is required.
			 * @type String
			 */
			text: "",
			/**
			 * Make the menu item initially disabled.
			 * @type disabled
			 */
			disabled: false,
			/**
			 * Make the menu item a separator.
			 * @type disabled
			 */
			separator: false,
			/**
			 * Callback when clicked at normal state, by default, the menu will be closed after this callback, return false here to keep the menu from being closed.
			 * @type Function
			 */
			callback: null,
			/**
			 * Callback when clicked at disabled state, by default, the menu will NOT be closed after this callback, return true here to close it.
			 * @type Function
			 */
			disabledCallback: null
		},
		
		DATAKEY_INSTANCE: "kcuF_menu_instance",
		DATAKEY_MENUITEM: "kcuF_menu_item",
		
		_clickHandler: function(e) {
			e.data.instance.close();
		},
		
		_keydownHandler: function(e) {
			if (e.keyCode == 27) {// ESC
				e.data.instance.close();
			}
		},
		
		_resizeHandler: function(e) {
			e.data.instance.close();
		}
	});
	
	$.extend(Menu.prototype, /** @lends kcuF.ui.Menu.prototype */{
		_options: null,
		_ui: null,
		
		_ctor: function(opts) {
			this._options = $.extend({}, Menu.OPTS, opts);
			this.bindToggler(this._options.toggler);
		},
		/**
		 * @param {String|DomNode|JQNode} toggler
		 * @param {String} [event=click]
		 */
		bindToggler: function(toggler, event) {
			var me = this;
			$(toggler).bind(event || "click", function(e) {
				me.toggle(this);
				return false;
			});
		},
		/**
		 * @param {DomNode|JQNode} toggler
		 */
		toggle: function(toggler) {
			toggler = $(toggler);
			if (this._toggler && this._toggler[0] == toggler[0]) {
				this.close();
			} else {
				this.open(toggler);
			}
		},
		
		open: function(toggler) {
			var options = this._options,
				ui = this._getUI();
			
			if (options.onBeforeOpen && options.onBeforeOpen.call(this) === false) {
				return;
			}
			
			this._toggler = $(toggler);
			
			var hidden = ui.is(":hidden");
			if (hidden) {
				ui.show();
				ui.focus();
			}
			
			this._positioning();
			if (hidden) {
				var me = this;
				setTimeout(function() {// setTimeout to avoid menu from hiding (body click happens right away)
					$(document).bind("click.menu", {
						instance: me
					}, Menu._clickHandler).bind("keydown.menu", {
						instance: me
					}, Menu._keydownHandler);
					$(window).bind("resize.menu", {
						instance: me
					}, Menu._resizeHandler);
				}, 0);
			}
			
			if (options.onOpen) {
				options.onOpen.call(this);
			}
		},
		
		close: function() {
			var options = this._options,
				ui = this._getUI();
			
			if (options.onBeforeClose && options.onBeforeClose.call(this) === false) {// keep the menu from being closed by returning false in onBeforeClose
				return;
			}
			
			$(document).unbind("click.menu", Menu._clickHandler).unbind("keydown.menu", Menu._keydownHandler);
			$(window).unbind("resize.menu", Menu._resizeHandler);
			
			this._toggler = null;
			ui.hide();
			if (options.onClose) {
				options.onClose.call(this);
			}
		},
		/**
		 * Find the menu item node by index or item key.
		 * @param {Number|String} itemRef Item index (Number) or item key (String).
		 * @return JQNode
		 */
		findItem: function(itemRef) {
			var ui = this._getUI(),
				menuItems = ui.find(">li"),
				menuItem;
			if (typeof itemRef == "number") {
				menuItem = menuItems[itemRef];
			} else {
				$.each(menuItems, function() {
					if ($(this).data(Menu.DATAKEY_MENUITEM).key == itemRef) {
						menuItem = this;
						return false;
					}
				});
			}
			
			return menuItem ? $(menuItem) : null;
		},
		
		_positioning: function() {
			var ui = this._getUI(),
				vp = util.viewport(),
				togglerOffset = this._toggler.offset(),
				togglerCoords = {
					w: this._toggler.width(),
					h: this._toggler.height(),
					l: togglerOffset.left,
					t: togglerOffset.top
				},
				menuCoords = {
					w: ui.outerWidth(),
					h: ui.outerHeight(),
					l: togglerCoords.l,
					t: togglerCoords.t + togglerCoords.h
				};
			
			// for l
			if (togglerCoords.l + menuCoords.w > vp.fw + vp.x) {// the menu will be outside the viewport by width
				var fallbackL = togglerCoords.l + togglerCoords.w - menuCoords.w;
				if (fallbackL >= 0) {
					menuCoords.l = fallbackL;
				}
			}
			// for t
			if (togglerCoords.t + togglerCoords.h + menuCoords.h > vp.fh + vp.y) {// the menu will be outside the viewport by height
				var fallbackT = togglerCoords.t - menuCoords.h;
				if (fallbackT >= 0) {
					menuCoords.t = fallbackT;
				}
			}
			
			ui.css({
				left: Math.floor(menuCoords.l),
				top: Math.floor(menuCoords.t)
			});
		},
		
		_getUI: function() {
			var me = this,
				options = this._options,
				ui = this._ui;
			if (!ui) {
				ui = template.getAsDom$("Menu").data(Menu.DATAKEY_INSTANCE, this).appendTo("body").click(function(e) {
					return false;// do not trigger document click
				});
				if (options.horizontal) {
					ui.addClass("horizontal");
				}
				
				$.each(options.items || [], function(idx, itm) {
					var itemOptions = $.extend({}, Menu.OPTS_ITEM, itm),
						menuItem = template.getAsDom$("MenuItem", {
							text: itemOptions.text
						}).data(Menu.DATAKEY_MENUITEM, {
							key: itemOptions.key,
							callback: itemOptions.callback,
							disabledCallback: itemOptions.disabledCallback
						}).click(function(e) {
							var menuItemNode = $(this),
								menuItemData = menuItemNode.data(Menu.DATAKEY_MENUITEM);
							if (menuItemNode.hasClass("disabled")) {
								if (menuItemData.disabledCallback && menuItemData.disabledCallback.call(me) === true) {
									me.close();
								}
							} else {
								if (menuItemData.callback && menuItemData.callback.call(me) === false) {
									return false;
								}
								me.close();
							}
							
							return false;
						}).appendTo(ui);
					
					if (itemOptions.disabled) {
						menuItem.addClass("disabled");
					}
					if (itemOptions.separator) {
						menuItem.addClass("separator");
					}
					menuItem.addClass();
				});
				
				this._ui = ui;
			}
			return ui;
		}
	});
})(kcuF, kcuF.$);