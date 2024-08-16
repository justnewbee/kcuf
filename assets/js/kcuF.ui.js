(function(kcuF, $) {
	"use strict";
	
	/**
	 * @namespace
	 * @name pb.ui
	 */
	var ui = kcuF.ns("ui");
	
	$.extend(ui, /** @lends pb.ui */{
		dialog: function(opts) {
			return new ui.Dialog(opts);
		},
		
		grid: function(opts) {
			return new ui.Grid(opts);
		},
		
		menu: function(opts) {
			return new ui.Menu(opts);
		},
		
		tooltip: function(opts) {
			return new ui.Tooltip(opts);
		}
	});
}(kcuF, kcuF.$));