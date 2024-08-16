(function(kcuF, $) {
	"use strict";
	
	/**
	 * kcuF Grid control.
	 * @author <a href="mailto:jianchunw@hz.webex.com">Jianchun Wang</a>
	 * @version 1.0.0
	 * @requires <ol>
	 *   <li><b>JS: </b>jQuery &gt;= 1.3.2;</li>
	 *   <li><b>CSS: </b>grid.css</li>
	 * </ol>
	 * @description <h3>Change History:</h3>
	 * <ul>
	 *   <li><b>1.0.0 [2010-09-14/Jianchun]:</b> First ugly draft.</li>
	 *   <li><b>1.0.1 [2011-09-08/Jianchun]:</b> 1). Style tuning.
	 *      2). Use `colgroup` and `col` to control column styles (background only..); width, text-align, color is not possible due to browser support problem, see http://www.quirksmode.org/css/columns.html for col compatibility
	 *      </li>
	 * </ul>
	 */
	/**
	 * @class kcuF.ui.Grid
	 */
	var Grid = kcuF.ns("ui.Grid"),
		/**
		 * @class kcuF.ui.Grid-Item
		 */
		GridItem = kcuF.ns("ui.Grid.Item"),
		
		template = kcuF.ns("template"),
		
		OPTS = {
			/**
			 * @type String|JQNode|DomNode
			 */
			attachPoint: "body",
			/**
			 * Width of the grid, when less than 1, it'll be auto.
			 * @type Number
			 */
			width: 0,// auto
			/**
			 * Including head.
			 */
			height: 0,// auto
			/**
			 * Minimal line number of the grid, when row count is less than it, extra rows are filled.
			 * Note: minLines must be smaller than or equal to maxLines, or it is treated the same as maxLines.
			 * @type Number
			 */
			minLines: 0,
			/**
			 * Maximum line number of the grid, when row count is bigger than it, the body is overflowed with vertical scrollbar.
			 * @type Number
			 */
			maxLines: 0,
			/**
			 * How many columns in header, and how they behave. @see kcuF.ui.Grid.DATA_COLUMN.
			 * @type Array
			 */
			columns: null,
			/**
			 * Array of data items for each row, each single data is a key-value object, where the key can be found in the columns.
			 * @type Array
			 */
			items: null,
			/**
			 * For footer... * Note: not implemented yet.
			 * @type ??
			 */
			footer: "",
			/**
			 * Whether loop while key up and down.
			 * @type Boolean
			 */
			loop: true,
			/**
			 * Whether ...
			 * @type Boolean
			 */
			tree: false,
			/**
			 * Give edit a small time delay so that it won't happen together with activate.
			 */
			editDelay: 250,
			
			hoverDelay: 360,
			/**
			 * 
			 */
			onItemMouseEnter: null,
			/**
			 * 
			 */
			onItemMouseLeave: null,
			/**
			 * Callback when item is selected via click, keyboard navigation or select interface.
			 * @param {Object} item
			 * @param {JQNode} row
			 * @type Function
			 */
			onItemSelected: null,
			/**
			 * Callback when item is activated via dblclick or keyboard enter action.
			 * @param {Object} item
			 * @param {JQNode} row
			 * @type Function
			 */
			onItemActivated: null,
			/**
			 * Callback when item is removed.
			 * @param {Object} item
			 * @param {JQNode} row
			 * @type Function
			 */
			onItemDeleted: null
		},
		DATA_COLUMN = {
			/**
			 * The column index. It's readonly! Can only be set by grid itself.
			 * The index is set when initialized, and can only be changed when dragging header.
			 * @type Number
			 */
			index: 0,
			/**
			 * Key in data, used to get data fom a row data.
			 * @type String
			 */
			key: "",
			/**
			 * Displaying value of the column. This can be HTML.
			 * @type String
			 */
			name: "",
			/**
			 * Used as title.
			 * @type String
			 */
			hint: "",
			/**
			 * Default width.
			 * @type Number
			 */
			width: 0,
//			minWidth: 0,
//			maxWidth: 0,
//			resizable: false,
			/**
			 * If false, the column is not sortable. Allowed values are "string", "number", "date", "" or false.
			 * @type String
			 */
			sortAs: "",
			/**
			 * If empty, default sort order varis by sortAs. For string and number, "asc"; for date, default "desc".
			 * @type String
			 */
			sortAscending: false,
			/**
			 * How the text is aligned in the column, default "left". Accepted vaules are which accepted by CSS "text-align".
			 * @type String
			 */
			align: "",
			/**
			 * By default the data will be got as text. This provides a function for transforming data.
			 * If set as "text", the data will be treated as text instead of html.
			 * If set as a function, then "this" is the grid, and has two parameters -
			 * @type Function|String
			 */
			get: null,
			/**
			 * Whether the cell is editable.
			 * @type Boolean|Function
			 */
			edit: false
		},
		OPTS_TREE = {
			children: "_children_",
			folded: "&#9727;",
			unfolded: "&#9720;",
			autoUnfold: false
		},
		QUERY = {
			EDITBOX: "input.grid-editbox",
			HEADER: "div.grid-header",
			HEADER_ROW: "div.grid-header thead:first>tr",
			HEADER_ROW_GHOST: "div.grid-body thead:first>tr",
			COLGROUP: "div.grid-body colgroup:first",
			BODY_WRAPPER: "div.grid-body",
			BODY: "div.grid-body tbody",
			ITEM_ROW: "div.grid-body tbody>tr",
			TREE_TOGGLER: "div.grid-body tbody>tr .grid-tree-toggler",
			FOOTER: "div.grid-footer"
		},
		DATA_KEY = {
			COLUMN: "kcuF_grid_column",// for each cell in header
			ITEM: "kcuF_grid_item"// for each row in body
		};
	
	function compareAsDate(str1, str2) {
		var date1 = new Date(str1),
			date2 = new Date(str2);
		
		return date1 > date2 ? 1 : (date1 < date2 ? -1 : 0);
	}
	
	function compareAsNumber(str1, str2) {
		var num1 = parseFloat(str1),
			num2 = parseFloat(str2);
		
		if (isNaN(num1) && isNaN(num2)) {
			return str1 > str2 ? 1 : (str1 < str2 ? -1 : 0);
		} else if (isNaN(num1)) {
			return -1;
		} else if (isNaN(num2)) {
			return 1;
		} else {
			return num1 > num2 ? 1 : (num1 < num2 ? -1 : 0);
		}
	}
	function compareAsString(str1, str2) {
		return str1 > str2 ? 1 : (str1 < str2 ? -1 : 0);// TODO better sort logic
	}
	
	$.extend(GridItem.prototype, {
		data: null,
		level: 0,
		parent: null,
		children: null,
		
		_ctor: function(data) {
			this.data = data;
		}
	});
	
	Grid.OPTS = OPTS;
	
	$.extend(Grid.prototype, /** @lends kcuF.ui.Grid.prototype */{
		/**
		 * Holds the options object.
		 * @see kcuF.ui.Grid.OPTS
		 * @type Object
		 */
		_options: null,
		/**
		 * Holds the reference of the Grid ui.
		 * @type JQNode
		 */
		_ui: null,
		/**
		 * Initialization of Grid.
		 * @param {Object} opts Object for creating the options.
		 */
		_ctor: function(opts) {
			var options = $.extend({}, OPTS, opts),
				ui = template.getAsDom$("Grid").appendTo(options.attachPoint);
			
			if (options.maxLines > 0 && options.minLines > options.maxLines) {
				options.minLines = options.maxLines;
			}
			if (options.tree) {
				options.tree = $.extend({}, OPTS_TREE, options.tree);
			}
			
			this._options = options;
			this._ui = ui;
			
			(options.width > 0 && ui.width(options.width));
			if (options.maxLines > 0) {
				ui.find("div.grid-body table").width(ui.width());// so that the table won't auto adjust width when overflow-y
			}
			
			var columns = [];
			$.each(options.columns || [], function(idx, itm) {
				columns.push($.extend({}, DATA_COLUMN, itm, {
					index: idx
				}));
			});
			
			this._initUI(columns);
			this._initEvents();
			
			this.add(options.items);
			delete options.items;
		},
		
		_initUI: function(columns) {
			var options = this._options,
				headerRow = this._ui.find(QUERY.HEADER_ROW),
				headerRowGhost = this._ui.find(QUERY.HEADER_ROW_GHOST),
				colgroup = this._ui.find(QUERY.COLGROUP);
			
			$.each(columns, function(k) {
				var cell = $("<th></th>").appendTo(headerRow).data(DATA_KEY.COLUMN, this),
					cellGhost = $("<th></th>").appendTo(headerRowGhost);
				
				$("<col></col>").addClass(k % 2 ? "grid-col-even" : "grid-col-odd").appendTo(colgroup);
				
				if (this.width > 0) {
					cell.width(this.width);
					cellGhost.width(this.width);
				}
				
				(this.hint && cell.attr("title", this.hint));
				cell.html(this.name);
			});
			
			if (options.footer) {
				this._ui.find(QUERY.FOOTER).show().html(options.footer);
			}
		},
		
		_initEvents: function() {
			var eventData = {
				instance: this
			};
			
			this._ui.bind("click dblclick focusin focusout keydown", eventData, function(e) {
				return e.data.instance._aioEventHandler(e);
			}).delegate(QUERY.ITEM_ROW, "mouseenter", eventData, function(e) {
				return e.data.instance._aioEventHandler(e);
			}).delegate(QUERY.BODY, "mouseleave", eventData, function(e) {
				return e.data.instance._aioEventHandler(e);
			});
		},
		
		_aioEventHandler: function(e) {
			var tgt = $(e.target);
			if (tgt.is(QUERY.EDITBOX)) {
				return;
			}
			
			var _this = this,
				ui = this._ui,
				options = this._options,
				cell = tgt.is("tr") ? null : (tgt.is("th,td") ? tgt : tgt.parentsUntil("tr", "th,td")),// DONOT put a table inside a grid
				row = cell ? cell.parent() : tgt,
				item = row.data(DATA_KEY.ITEM),
				resetEdit = function(editNow) {
					if (_this._editTimerTemp) {
						clearTimeout(_this._editTimerTemp);
						delete _this._editTimerTemp;
					}
					if (editNow) {
						_this._edit(cell, item);
					}
				},
				resetHover = function() {
					clearTimeout(_this._hoverTimerTemp);
					delete _this._hoverTimerTemp;
				};
			
			switch (e.type) {
			case "click":
				resetEdit();
				if (tgt.is(QUERY.TREE_TOGGLER)) {
					this._toggleFold(item, tgt);
				}
				if (item) {
					if (row.hasClass("selected")) {
						this._editTimerTemp = setTimeout(function() {
							resetEdit(true);
						}, this._options.editDelay);
					} else {
						this._select(row, e.ctrlKey, true);
					}
				} else {
					var column = cell.data(DATA_KEY.COLUMN);
					column.sortAscending = !column.sortAscending;
					this._sort(cell.prevAll().length, column);
				}
				break;
			case "dblclick":
				resetEdit();
				if (item) {
					this._activate(row);
				}
				break;
			case "focusin":
				ui.addClass("focused");
				break;
			case "focusout":
				ui.removeClass("focused");
				break;
			case "mouseenter":
				resetHover();
				if (item) {
					this._hoverTimerTemp = setTimeout(function() {
						var lastHover = _this.hovering;
						if (lastHover) {
							(options.onItemMouseLeave && options.onItemMouseLeave.call(_this, lastHover.item, lastHover.row, lastHover.cell));
						}
						_this.hovering = {
							item: item,
							row: row,
							cell: cell
						};
						(options.onItemMouseEnter && options.onItemMouseEnter.call(_this, item, row, cell));
					}, options.hoverDelay);
				}
				break;
			case "mouseleave":
				resetHover();
				var lastHover = this.hovering;
				this.hovering = null;
				if (lastHover) {
					(options.onItemMouseLeave && options.onItemMouseLeave.call(_this, lastHover.item, lastHover.row, lastHover.cell));
				}
				break;
			case "keydown":
				if (!item && tgt.is("input,textarea,select")) {
					return true;
				}
				
				switch (e.keyCode) {
				case 13:// Enter
					this._activate(row);
					return false;
				case 38:// Up
				case 40:// Down TODO donot use rowsmap
					var rowsMap = this._getRowsMap(),
						up = (e.keyCode === 38 && !e.shiftKey) || (e.keyCode === 40 && e.shiftKey),
						selIndex = -1,
						selIndexAfter;
					
					rowsMap.real.each(function(k) {
						if ($(this).hasClass("selected")) {
							selIndex = k;
							return false;
						}
					});
					
					if (selIndex < 0) {
						selIndexAfter = up ? rowsMap.real.length - 1 : 0;
					} else {
						if (up) {
							selIndexAfter = selIndex - 1;
							if (selIndexAfter < 0 && options.loop) {
								selIndexAfter = rowsMap.real.length - 1;
							}
						} else {
							selIndexAfter = selIndex + 1;
							if (selIndexAfter > rowsMap.real.length - 1 && options.loop) {
								selIndexAfter = 0;
							}
						}
					}
					
					if (selIndexAfter === selIndex || selIndexAfter < 0 || selIndexAfter > rowsMap.real.length - 1) {
						return true;
					}
					
					this._select($(rowsMap.real[selIndexAfter]));
					return false;
				case 37:// Left TODO select parent if leaf child
				case 39:// Right
					if (item._tree_ && item._tree_.children && item._tree_.children.length) {
						_this._toggleFold(item, null, e.keyCode === 37 ? "fold" : "unfold");
					}
					return false;
				default:
					break;
				}
				return true;
			default:
				break;
			}
			
			return;
		},
		
		// ------- global interfaces ------- //
		/**
		 * Destroy UI and events.
		 */
		destroy: function() {
			this._ui.remove();
			this._ui = null;
		},
		/**
		 * Clear all items.
		 */
		clear: function() {
			this._remove(this._getRowsMap().real);
		},
		
		height: function(h) {
			this._options.height = h;
			
			var bodyWrapper = this._ui.find(QUERY.BODY_WRAPPER),
				bodyH = h - this._ui.find(QUERY.HEADER).outerHeight();
			
			if (bodyH < 0) {
				return;
			}
			
			if (bodyH < bodyWrapper[0].scrollHeight) {
				this._ui.addClass("scroll");
				bodyWrapper.height(bodyH);
			} else {
				this._ui.removeClass("scroll");
				bodyWrapper.css("height", "auto");
			}
		},
		// ------- column interfaces ------- //
		/**
		 * Sort items for one column.
		 * @param {String} sortBy The column key.
		 */
		sort: function(sortBy) {
			var cellIndex,
				column;
			$.each(this._getColumns(), function(k, v) {
				if (v.key === sortBy) {
					cellIndex = k;
					column = v;
					return false;
				}
			});
			if (column) {
				column.sortAscending = !column.sortAscending;
				this._sort(cellIndex, column);
			}
		},
		// ------- item (row) interfaces ------- //
		/*
		 * "load", "get", "remove", "select", "activate", "hide", "show"
		 * arguments can be a function or two values - key and value.
		 * @example
		 * <code>
		 * grid.xxx("some_key", "some_value");
		 * grid.xxx(function(item) {
		 *   return item.some_key = "some_value";
		 * });
		 * </code>
		 */
		/**
		 * Get items.
		 * @return {Array} The mathced items
		 */
		get: function() {
			var items = [];
			this._filterRealRows(arguments).each(function() {
				items.push($(this).data(DATA_KEY.ITEM));
			});
			
			return items;
		},
		/**
		 * Add items.
		 * @param {Array|Object} items
		 * @param {Object} parentItem
		 */
		add: function(items, parentItem) {
			if (!items) {
				return;
			}
			var options = this._options;
			items = $.isArray(items) ? items : [items];
			
			function processItemsForTree(cItems, pItem) {
				$.each(cItems, function(k, v) {
					if (options.tree && !v._tree_) {
						v._tree_ = {
							level: pItem ? (pItem._tree_.level + 1) : 0,
							parent: pItem,
							children: v[options.tree.children]
						};
						if (v._tree_.children) {
							processItemsForTree(v._tree_.children, v);
						}
						delete v[options.tree.children];
					}
				});
			}
			
			processItemsForTree(items, parentItem);
			
			// TODO remove this feature?
			if (options.minLines > 0) {
				var fillUps = options.minLines - items.length + 1;
				for (var i = 0; i < fillUps; i++) {
					items.push(null);
				}
			}
			
			this._add($.isArray(items) ? items : [items], parentItem);
		},
		/**
		 * Remove items.
		 */
		remove: function() {
			this._remove(this._filterRealRows(arguments));
		},
		/**
		 * Select items.
		 */
		select: function() {
			this._select(this._filterRealRows(arguments));
		},
		/**
		 * Activate items.
		 */
		activate: function() {
			this._activate(this._filterRealRows(arguments));
		},
		/**
		 * Hide items.
		 */
		hide: function() {
			this._filterRealRows(arguments).hide();
		},
		/**
		 * Show items.
		 */
		show: function() {
			this._filterRealRows(arguments).show();
		},
		/**
		 * Update item. NOTE: current we only support update one item.
		 * @param {Object} updatedItem
		 * @param {String|Array} updatedKeys
		 */
		update: function(updatedItem, updatedKeys) {
			var _this = this,
				rows = this._filterRealRows([function(item) {// actually we should have one row here
					return item === updatedItem;
				}]);
			if (!rows.length) {
				return;
			}
			
			var columns = this._getColumns(true);
			rows.each(function() {
				var cells = $(this).children();
				$.each($.isArray(updatedKeys) ? updatedKeys : [updatedKeys], function(k, v) {
					var column = columns[v];
					if (!column) {
						return;
					}
					_this._fillCell($(cells[column.index]), updatedItem, column);
				});
			});
		},
		// ------- internal utilities ------- //
		/**
		 * Get column data as array with the correct order.
		 * @param {Boolean} asObj
		 * @returns {Array|Object}
		 */
		_getColumns: function(asObj) {
			var columns = asObj ? {} : [];
			this._ui.find(QUERY.HEADER_ROW).children().each(function() {
				var column = $(this).data(DATA_KEY.COLUMN);
				if (asObj) {
					columns[column.key] = column;
				} else {
					columns.push(column);
				}
			});
			return columns;
		},
		/**
		 * Get the corresponding column for cell.
		 * @param {JQNode} cell The td.
		 */
		_getColumn: function(cell) {
			var cellIndex = -1;
			cell.parent().children().each(function(k) {
				if (this === cell[0]) {
					cellIndex = k;
					return false;
				}
			});
			
			return cellIndex >= 0 ? this._getColumns()[cellIndex] : null;
		},
		/**
		 * Sort items.
		 * @param {Number} cellIndex
		 * @param {Object} column
		 */
		_sort: function(cellIndex, column) {
			if (column.sortAs === false) {
				return;
			}
			
			var rows = this._getRowsMap().real,
				childFilter = ":eq(" + cellIndex + ")";
			
			rows.sort(function(tr1, tr2) {
				var str1 = $(tr1).children(childFilter).text(),
					str2 = $(tr2).children(childFilter).text(),
					ascSortResult;
				
				switch (column.sortAs) {
				case "date":
					ascSortResult = compareAsDate(str1, str2);
					break;
				case "number":
					ascSortResult = compareAsNumber(str1, str2);
					break;
				default:
					ascSortResult = compareAsString(str1, str2);
					break;
				}
				
				return (column.sortAscending && ascSortResult) ? ascSortResult : (0 - ascSortResult);
			});
			
			var row = $(rows.splice(0, 1)),// splice returns array, this line is acctually shift
				gridBody = this._ui.find(QUERY.BODY);
			
			row.prependTo(gridBody);
			rows.each(function() {
				row = $(this).insertAfter(row);
			});
		},
		/**
		 * Filter real rows with the arguments object form other methods.
		 * @returns {JQNode}
		 */
		_filterRealRows: function(args) {
			var filterFn = function() {
				return false;
			};
			if (typeof args[0] === "function") {
				filterFn = args[0];
			}
			if (args.length > 1) {
				var k = args[0],
					v = args[1];
				filterFn = function(item) {
					return item[k] === v;
				};
			}
			
			return this._getRowsMap().real.filter(function() {
				return filterFn($(this).data(DATA_KEY.ITEM));
			});
		},
		/**
		 * This method is only to be used by "add".
		 * @param {Array} items An array of objects representing a row data, or null representing a fill row.
		 */
		_add: function(items, parentItem) {
			var _this = this,
				options = this._options,
				columns = this._getColumns(),
				rowsMap = this._getRowsMap(),
				gridBody = this._ui.find(QUERY.BODY),
				bodyWrapper = this._ui.find(QUERY.BODY_WRAPPER),
				toUnfold = [];
			
			var row = parentItem ? this._filterRealRows([function(item) {
				return parentItem === item;
			}]) : gridBody.find("tr:last");
			
			$.each(items, function(k, v) {
				var cells, newRow = false;
				if (v && rowsMap.fill.length) {
					row = $(Array.prototype.shift.call(rowsMap.fill));
				} else {
					if (row.length) {
						row = $("<tr tabIndex=\"-1\"></tr>").insertAfter(row);
					} else {
						row = $("<tr tabIndex=\"-1\"></tr>").appendTo(gridBody);
					}
					newRow = true;
				}
				
				if (newRow) {// add cells with text-align style, &nbsp; is used to tell the td to have height
					$.each(columns, function() {
						switch (this.align) {
						case "center":
						case "right":
							$("<td>&nbsp;</td>").css("text-align", this.align).appendTo(row);
							break;
						default:
							$("<td>&nbsp;</td>").appendTo(row);
							break;
						}
					});
				}
				cells = row.children();
				
				if (v) {
					rowsMap.real.push(row[0]);
					row.data(DATA_KEY.ITEM, v);
					$.each(columns, function(kk, vv) {
						_this._fillCell($(cells[kk]), v, vv);
					});
				} else {
					rowsMap.fill.push(row[0]);
				}
				
				if (newRow && options.maxLines > 0 && (rowsMap.real.length + rowsMap.fill.length) > options.maxLines) {
					var overflowY = bodyWrapper.css("overflow-y");
					if (!overflowY || overflowY === "hidden") {
						bodyWrapper.css({
							height: bodyWrapper.height(),
							overflowY: "auto"
						});
					}
				}
				
				if (options.tree && options.tree.autoUnfold && v._tree_.children && v._tree_.children.length) {
					if (options.tree.autoUnfold === true || ($.isFunction(options.tree.autoUnfold) && options.tree.autoUnfold(v) !== false)) {
						toUnfold.push(v);
					}
				}
			});
			
			$.each(toUnfold, function() {
				_this._toggleFold(this);
			});
			
			this.height(options.height);
		},
		/**
		 * Remove row(s).
		 * @param {JQNode} rows
		 */
		_remove: function(rows) {
			var _this = this,
				options = this._options,
				rowsMap = this._getRowsMap(),
				allLength = rowsMap.all.length,
				gridBody = this._ui.find(QUERY.BODY),
				bodyWrapper = this._ui.find(QUERY.BODY_WRAPPER);
			
			rows.each(function() {
				var row = $(this),
					item = row.data(DATA_KEY.ITEM);
				
				if (options.minLines > 0 && allLength <= options.minLines) {
					row.removeData(DATA_KEY.ITEM).removeClass("selected").appendTo(gridBody).children().html("&nbsp;");
				} else {
					row.remove();
					allLength -= 1;
				}
				(options.onItemDeleted && options.onItemDeleted.call(_this, item, row));
			});
			
			if (options.maxLines > 0 && allLength <= options.maxLines) {
				var overflowY = bodyWrapper.css("overflow-y");
				if (overflowY && overflowY === "auto") {
					bodyWrapper.css({
						height: "auto",
						overflowY: "hidden"
					});
				}
			}
			
			this.height(options.height);
		},
		
		_toggleFold: function(item, toggler, cmd) {
			var options = this._options;
			toggler = toggler || this._filterRealRows([function(theItem) {
				return theItem === item;
			}]).find(".grid-tree-toggler:first");
			if (!toggler.length || (toggler.hasClass("folded") && cmd === "fold") || (toggler.hasClass("unfolded")  && cmd === "unfold")) {
				return;
			}
			
			if (toggler.hasClass("folded")) {
				toggler.removeClass("folded").addClass("unfolded").html(options.tree.unfolded);
				this.add(item._tree_.children, item);
			} else {
				toggler.removeClass("unfolded").addClass("folded").html(options.tree.folded);
				this.remove(function(cItem) {
					var pItem = cItem._tree_.parent;
					while (pItem) {
						if (pItem === item) {
							return true;
						}
						
						pItem = pItem._tree_.parent;
					}
					return false;
				});
			}
		},
		
		_edit: function(cell, item) {
			var column = this._getColumn(cell);
			if (!column.key || !column.edit) {
				return;
			}
			if (column.edit === true || ($.isFunction(column.edit) && column.edit.call(this, cell, item, column) === true)) {
				this._editInline(cell, item, column);
			}
		},
		/**
		 * Default edit method.
		 * @param {JQNode} cell
		 */
		_editInline: function(cell, item, column) {
			var _this = this,
				editBox = this._ui.children(QUERY.EDITBOX),
				cellPos = cell.position();
			if (!editBox.length) {
				editBox = $("<input type=\"text\" class=\"grid-editbox\" />").appendTo(this._ui);
			}
			editBox.css({
				top: cellPos.top,
				left: cellPos.left,
				width: cell.width(),
				height: cell.height()
			}).show().val(cell.text());
			
			editBox.bind("blur keydown", function(e) {
				var action;
				if (e.type === "blur") {
					action = "save";
				} else {
					if (e.keyCode === 13) {// ENTER
						action = "save";
					} else if (e.keyCode === 27) {// ESC
						action = "cancel";
					}
				}
				
				if (!action) {
					return true;
				}
				
				var newVal = editBox.val();
				if (action === "save" && item[column.key] !== newVal) {
					item[column.key] = newVal;
					_this._fillCell(cell, item, column);
					// TODO onItemUpdated
				}
				editBox.unbind("blur keydown").hide();
				_this._ui.addClass("focused");// when editbox appears the grid will lose "focused" automatically
				return false;
			}).select();
		},
		/**
		 * Select row(s).
		 * @param {JQNode} rows
		 * @param {Boolean} cumulative So that those already selected shall NOT lose selected status.
		 * @param {Boolean} [dontFocus=false]
		 */
		_select: function(rows, cumulative, dontFocus) {
			var _this = this,
				options = this._options,
				selectedRows = this._getRowsMap().selected;
			
			rows.each(function() {
				var row = $(this),
					item = row.data(DATA_KEY.ITEM),
					selIndex = $.inArray(this, selectedRows);
				
				row.addClass("selected");
				if (!dontFocus) {
					row.focus();
				}
				
				if (selIndex >= 0) {
					selectedRows.splice(selIndex, 1);// remove from already selected
				} else {
					(options.onItemSelected && options.onItemSelected.call(_this, item, row));
				}
			});
			
			if (!cumulative) {
				selectedRows.removeClass("selected");
			}
		},
		/**
		 * Activate row(s).
		 * @param {JQNode} rows
		 */
		_activate: function(rows) {
			var _this = this,
				options = this._options;
			rows.each(function() {
				var row = $(this),
					item = row.data(DATA_KEY.ITEM);
				
				(options.onItemActivated && options.onItemActivated.call(_this, item, row));
			});
		},
		/**
		 * Get a map of rows with different status.
		 * @returns {Object}
		 */
		_getRowsMap: function() {
			var rows = this._ui.find(QUERY.ITEM_ROW);
			
			return {
				all: rows,
				selected: rows.filter(".selected"),
				idle: rows.not(".selected").filter(function() {
					return !!$(this).data(DATA_KEY.ITEM);
				}),
				real: rows.filter(function() {
					return !!$(this).data(DATA_KEY.ITEM);
				}),
				fill: rows.filter(function() {
					return !$(this).data(DATA_KEY.ITEM);
				})
			};
		},
		/**
		 * Fill cell data.
		 * @param {JQNode} cell
		 * @param {Object} item
		 * @param {Object} column
		 */
		_fillCell: function(cell, item, column) {
			var options = this._options,
				cellData = item[column.key] === undefined ? "" : item[column.key];
			if ($.isFunction(column.get)) {
				cell.empty().append(column.get.call(this, cellData, item));
			} else if (cellData === "") {
				cell.html("&nbsp;");
			} else if ("text" === column.get) {
				cell.text(cellData);
			} else {
				cell.html(cellData);
			}
			if (item._tree_ && !cell.prev(":visible").length) {
				if (item._tree_.level === 0 || (item._tree_.children && item._tree_.children.length)) {
					$("<span class=\"grid-tree-toggler folded\">" + options.tree.folded + "</span>").prependTo(cell);
				} else {
					$("<span class=\"grid-tree-toggler-ghost\">&nbsp;</span>").prependTo(cell);
				}
				for (var i = 0; i < item._tree_.level; i++) {
					$("<span class=\"grid-tree-toggler-ghost\">&nbsp;</span>").prependTo(cell);
				}
			}
		}
	});
})(kcuF, kcuF.$);