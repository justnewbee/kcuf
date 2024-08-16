(function(kcuF, $) {
	"use strict";
	
	/**
	 * @class Tooltip.
	 * @paran {Object} opts
	 * @private
	 */
	var Tooltip = kcuF.ns("ui.Tooltip"),
		
		util = kcuF.ns("util"),
		template = kcuF.ns("template"),
		
		OPTS = {
			/**
			 * CMD switch, allowed values are "destroy"
			 * @type String
			 */
			cmd: "",
			/**
			 * The tip text. Prior to the title attribute of node.
			 * @type Boolean
			 */
			tip: "",
			/**
			 * Whether show the tip left or right (Default is above or beneth).
			 * @type Boolean
			 */
			vside: true,
			/**
			 * Theme for tooltip, default to "yellow".
			 * @type String
			 */
			theme: "yellow",
			
			distance: 5,
			/**
			 * Customize z-index in case, &lt;=0 means "auto".
			 * @type Number
			 */
			zIndex: 0,
			/**
			 * If html is supported as tooltip text, else all text will be escaped for safety.
			 * @type Boolean
			 * @default false
			 */
			supportHTML: false,
			/**
			 * Opacity of tooltip.
			 * @type Number
			 */
			opacity: 1,
			/**
			 * Callback when the tip is shown.
			 * @type Function
			 */
			onShow: null,
			/**
			 * Callback when the tip is closed.
			 * @type Function
			 */
			onClose: null
		},
		ID_TOOLTIP_SOLO = "kcuF-tooltip-solo";
	
	function showHandler(e) {
		e.data.instance._show();
	}
	function hideHandler(e) {
		e.data.instance._hide();
	}
	
	$.extend(Tooltip, /** @lends kcuF.ui.Tooltip */{
		OPTS: OPTS,
		
		show: function(opts) {
			var options = $.extend({}, OPTS, opts),
				ui = $("#" + ID_TOOLTIP_SOLO),
				node = options.node;
			
			if (!ui.length) {
				ui = template.getAsDom$("Tooltip").attr("id", ID_TOOLTIP_SOLO).appendTo("body");
			}
			
			ui.empty().append(options.message);
			
			// positioning
			var vp = util.viewport(),
				nodeOffset = node.offset(),
				nodeCoords = {
					w: node.outerWidth(),
					h: node.outerHeight(),
					x: nodeOffset.left,
					y: nodeOffset.top
				}, tipCoords = {
					w: 0,
					h: 0,
					x: 0,
					y: 0
				}, showAni = {
					opacity: options.opacity
				},
				tipLeftNode = nodeCoords.x * 2 + nodeCoords.w > vp.w + vp.scrollLeft,// whether node exceeds the middle of viewport
				tipAboveNode = true;
			
//			if (options.vside) {
//				ui.addClass("tooltip-arrow-l");
//			} else {
//				ui.addClass("tooltip-arrow-bl");
//			}
			tipCoords.w = ui.outerWidth();
			tipCoords.h = ui.outerHeight();
			
			if (tipLeftNode) {
				tipCoords.x = options.vside ? (nodeCoords.x - tipCoords.w) : (nodeCoords.x + nodeCoords.w - tipCoords.w);
			} else {
				tipCoords.x = options.vside ? (nodeCoords.x + nodeCoords.w) : nodeCoords.x;
			}
			
			tipCoords.y = options.vside ? (nodeCoords.y + nodeCoords.h * 0.5 - tipCoords.h * 0.5) : nodeCoords.y - tipCoords.h;
			
			if (!options.vside && tipCoords.y < vp.scrollTop + options.distance) {// vertically out of user's eyes when not v-side
				var backupTipY = nodeCoords.y + nodeCoords.h;
				if (backupTipY + tipCoords.h + options.distance <= vp.h) {
					tipAboveNode = false;
					tipCoords.y = backupTipY;
				}
			}
			
			if (options.vside) {
//				ui.addClass(tipLeftNode ? "tooltip-arrow-r" : "tooltip-arrow-l");
				showAni.left = (tipLeftNode ? "-=" : "+=") + options.distance;
			} else {
//				if (tipAboveNode) {
//					ui.addClass(tipLeftNode ? "tooltip-arrow-br" : "tooltip-arrow-bl");
//				} else {
//					ui.addClass(tipLeftNode ? "tooltip-arrow-tr" : "tooltip-arrow-tl");
//				}
				showAni.top = (tipAboveNode ? "-=" : "+=") + options.distance;
			}
			
			ui.css({
				left: tipCoords.x,
				top: tipCoords.y
			}).show().animate(showAni, "fast");
		},
		
		hide: function() {
			$("#" + ID_TOOLTIP_SOLO).hide();
		}
	});
	
	$.extend(Tooltip.prototype, /** @lends kcuF.ui.Tooltip.prototype */{
		/**
		 * Holds the reference to the node who triggers the tooltip.
		 * @type jqNode
		 */
		_node: null,
		/**
		 * Holds the options object.
		 * @see kcuF.ui.Tooltip.OPTS
		 * @type Object
		 */
		_options: null,
		/**
		 * Will hold the bubble node if it's shown, for close.
		 * @type jqNode
		 */
		_tip: null,
		/**
		 * Handle of setTimeout for showing a tooltip.
		 * @type Timer
		 */
		_showTimer: null,
		/**
		 * Used by constructor.
		 * @param {DomNode|jqNode} nd The node that triggers a tooltip.
		 * @param {Object} opts Object of options, see {@link kcuF.ui.Tooltip.OPTS}.
		 * @type void
		 */
		_ctor: function(nd, opts) {
			var node = $(nd),
				options = $.extend({}, Tooltip.OPTS, opts),
				instance = node.data(Tooltip.DATA_KEY);
			
			if (instance) {
				if (options.cmd === "destroy") {
					instance._destroy();
				} else {// update
					$.extend(instance._options, opts);
				}
				return;
			}
			
			this._node = node;
			this._options = options;
			
			options.tip = options.tip || node.attr("title") || "";
			node.removeAttr("title");
			
			node.data(Tooltip.DATA_KEY, this);
			
			// we cannot use hover cause it cannot be unbound
			node.bind("mouseenter", {
				instance: this
			}, showHandler);
			node.bind("mouseleave mousedown", {
				instance: this
			}, hideHandler);
		},
		
		_destroy: function() {
			var node = this._node;
			if (!node) {
				return;
			}
			if (this._options.tip) {
				node.attr("title", this._options.tip);
			}
			node.unbind("mouseenter", showHandler);
			node.unbind("mouseleave mousedown", hideHandler);
			node.data(Tooltip.DATA_KEY, null);
		},
		
		_show: function() {
			var node = this._node,
				options = this._options;
			if (this._showTimer) {
				return;
			}
			
			// update tip if title attr, this would be easy if you want to update tooltip
			var titleAttr = node.attr("title");
			if (titleAttr) {
				node.removeAttr("title");
				options.tip = titleAttr;
			}
			if (!options.tip) {// nonsense for empty tooltips
				return;
			}
			var instance = this;
			this._showTimer = setTimeout(function() {
				instance._showTimer = null;
				// create tooltip
				var $tip = template.getAsDom$("Tooltip", {// FIXME theme and tip not in template yet
					theme: options.theme,
					tip: options.supportHTML ? options.tip : options.tip.escapeHtml()
				});
				instance._tip = $tip;
				
				if (options.zIndex) {
					$tip.css("z-index", options.zIndex);
				}
				// append to a place cannot be seen for positioning
				$tip.css({
					left: -1000,
					top: -1000,
					opacity: 0.1 * options.opacity
				}).appendTo("body");
				// positioning
				var vp = util.viewport(),
					nodeOffset = node.offset(),
					nodeCoords = {
						w: node.outerWidth(),
						h: node.outerHeight(),
						x: nodeOffset.left,
						y: nodeOffset.top
					}, tipCoords = {
						w: 0,
						h: 0,
						x: 0,
						y: 0
					}, showAni = {
						opacity: options.opacity
					},
					tipLeftNode = nodeCoords.x * 2 + nodeCoords.w > vp.w + vp.scrollLeft,// whether node exceeds the middle of viewport
					tipAboveNode = true;
				
				if (options.vside) {
					$tip.addClass("tooltip-arrow-l");
				} else {
					$tip.addClass("tooltip-arrow-bl");
				}
				tipCoords.w = $tip.outerWidth();
				tipCoords.h = $tip.outerHeight();
				
				if (tipLeftNode) {
					tipCoords.x = options.vside ? (nodeCoords.x - tipCoords.w) : (nodeCoords.x + nodeCoords.w - tipCoords.w);
				} else {
					tipCoords.x = options.vside ? (nodeCoords.x + nodeCoords.w) : nodeCoords.x;
				}
				
				tipCoords.y = options.vside ? (nodeCoords.y + nodeCoords.h * 0.5 - tipCoords.h * 0.5) : nodeCoords.y - tipCoords.h;
				
				if (!options.vside && tipCoords.y < vp.scrollTop + options.distance) {// vertically out of user's eyes when not v-side
					var backupTipY = nodeCoords.y + nodeCoords.h;
					if (backupTipY + tipCoords.h + options.distance <= vp.h) {
						tipAboveNode = false;
						tipCoords.y = backupTipY;
					}
				}
				
				$tip.removeClass("tooltip-arrow-l tooltip-arrow-bl");
				
				if (options.vside) {
					$tip.addClass(tipLeftNode ? "tooltip-arrow-r" : "tooltip-arrow-l");
					showAni.left = (tipLeftNode ? "-=" : "+=") + options.distance;
				} else {
					if (tipAboveNode) {
						$tip.addClass(tipLeftNode ? "tooltip-arrow-br" : "tooltip-arrow-bl");
					} else {
						$tip.addClass(tipLeftNode ? "tooltip-arrow-tr" : "tooltip-arrow-tl");
					}
					showAni.top = (tipAboveNode ? "-=" : "+=") + options.distance;
				}
				
				$tip.css({
					left: tipCoords.x,
					top: tipCoords.y
				}).appendTo("body").animate(showAni, "fast");
			}, 50);
		},
		
		_hide: function() {
			if (this._showTimer) {
				clearTimeout(this._showTimer);
				this._showTimer = null;
				return;
			}
			if (!this._tip) {
				return;
			}
			this._tip.remove();
			this._tip = null;
		}
	});
})(kcuF, kcuF.$);
//(function() {
////	return;
//	
//	function isTruncated(dom) {// check if a string was truncated by CSS
//		var $dom = $(dom);
//		try{
//			var $newDom = $dom.clone();
//			$newDom.removeClass("wbxEllipsis").css({
//					display: "block",
//					overflow: "hidden",
//					"white-space": "nowrap",
//					visibility: "hidden"
//				}).appendTo($dom.parent());
//			
//			var clientW = $newDom.attr("clientWidth");
//			var scrollW = $newDom.attr("scrollWidth");
//			$newDom.remove();
////			delete $newDom;
//			if (($.browser.opera && scrollW < clientW) || (!$.browser.opera && scrollW == clientW)) {
//				return false;
//			} else {
//				return true;
//			}
//		} catch(ex) {
//			return true;
//		}
//	}
//	
//	var tooltipTimer = null;
//	var currentMouseX = 0;// Recording the mouse left position in the tooltip target node.
//	function showTooltip(event, options) {
//		var node = options.node;
//		//var $target = $(event.target);
//		//if the dom has "tipForTruncate" attribute and is not truncated, don't show tooltip
//		if (node.attr("tipForTruncate") =="true" && !isTruncated(node)) {
//			return;
//		}
//		
//		if (typeof options.beforeshow === "function") {
//			if (!options.beforeshow.call(node)) {
//				return;
//			}
//		}
//		
//		var tipNode = $("#tip_now");
//		if (tipNode.length) {
//			tipNode.remove();
//		}
//		currentMouseX = event.pageX;
//		$(document).bind("mousemove", mousemoveDuringTooltip);
//		
//		function calculatePosition() {
//			var tooltip = options.node.attr("tooltip");
//			tipNode = $("<div class=\"tooltip\"></div>").attr("id", "tip_now").css({
////				display: "none"
//				visibility: "hidden"
//			}).appendTo(document.body);
//			
//			var sp = $("<span></span>").text(tooltip);
//			var p1 = $("<p></p>").append(sp);
//			var tipTop;
//			nodeOffset = node.offset();
//			if (options.version === 1) {
//				tipTop = nodeOffset.top + node.outerHeight() * 0.5 - tipNode.outerHeight() * 0.5;
//				//tipTop = tipTop < 0 ? 0 : tipTop;
//				tipNode.addClass("tooltip_v").append(p1).css({
//					left: nodeOffset.left + node.outerWidth(),
//					top: tipTop
//				});
//			} else if (options.version === 2) {
//				tipTop = nodeOffset.top + node.outerHeight() * 0.5 - tipNode.outerHeight() * 0.5 - 10;
//				//tipTop = tipTop < 0 ? 0 : tipTop;
//				tipNode.addClass("tooltip_v2").addClass("tooltip_fH").append(p1).css({
//					left: nodeOffset.left + node.outerWidth(),
//					top: tipTop
//				});
//			} else {
//				var spanText,
//					cutLength,
//					cutStartIndex,
//					beginStr;
//				
//				tipTop = nodeOffset.top - 35;
//				//tipTop = tipTop < 0 ? 0 : tipTop;
//				tipNode.css("top", tipTop).append(p1);
//				
//				if (nodeOffset.left > 480) {
//					tip_l = currentMouseX - tipNode.outerWidth() + 14;
//					if (tip_l < 10) {
//						spanText = sp.text();
//						cutLength = -tip_l / 16;
//						cutStartIndex = (spanText.length - cutLength) / 3;
//						beginStr = spanText.substr(0, cutStartIndex);
//						do {
//							cutStartIndex += cutLength;
//							if (cutStartIndex > spanText.length - 1) {
//								cutStartIndex = spanText.length - 1;
//								break;
//							}
//							sp.text(beginStr + "..." + spanText.substr(cutStartIndex));
//							
//							tip_l = currentMouseX - tipNode.outerWidth() + 14;
//							cutLength = -tip_l / 16;
//							if (cutLength < 5) {
//								cutLength = 5;
//							}
//						} while (tip_l < 10);
//						sp.text(beginStr + "..." + spanText.substr(cutStartIndex));
//					}
//					
//					tipNode.addClass("tooltip_fH").css("left", tip_l);
//				} else if (nodeOffset.left <= 480) {
//					tip_l = currentMouseX - 14;
//					tipNode.css("left", tip_l);
//					
//					var frameBodyWidth = $("body").width();
//					/*
//					if ($("#inner_cont0").length > 0) {
//						frameBodyWidth = $("#inner_cont0").width();
//					}*/
//					
//					//var exceedWidth = tipNode.offset().left + tipNode.outerWidth() - $("#inner_cont0").width();
//					var exceedWidth = tipNode.offset().left + tipNode.outerWidth() - frameBodyWidth;
//					if (exceedWidth > -10) {
//						spanText = sp.text();
//						cutLength = exceedWidth / 16;
//						cutStartIndex = (spanText.length - cutLength) / 3;
//						beginStr = spanText.substr(0, cutStartIndex);
//						do {
//							cutStartIndex += cutLength;
//							if (cutStartIndex > spanText.length - 1) {
//								cutStartIndex = spanText.length - 1;
//								break;
//							}
//							sp.text(beginStr + "..." + spanText.substr(cutStartIndex));
//							
//							//exceedWidth = tipNode.offset().left + tipNode.outerWidth() - $("#inner_cont0").width();
//							exceedWidth = tipNode.offset().left + tipNode.outerWidth() - frameBodyWidth;
//							cutLength = exceedWidth / 16;
//							if (cutLength < 5) {
//								cutLength = 5;
//							}
//						} while (exceedWidth > -10);
//						sp.text(beginStr + "..." + spanText.substr(cutStartIndex));
//					}
//				}
//			}
//		}
//		
//		tooltipTimer = setTimeout(function() {
//			$(document).unbind("mousemove", mousemoveDuringTooltip);
//			
//			// Sometimes this node is removed from the document, and we don't know.
//			if (node.parents("body").length !== 0) {
//				calculatePosition();
//				tipNode.css("visibility", "visible").hide().fadeIn("fast");
////				tipNode.css("visibility", "visible").css("opacity", 0).animate(options.showAnimate, "fast");
//			}
//		}, 300);
//	}
//
//	// We name this mousemove function, because it's used to bind and unbind event to document only for Tooltip use.
//	function mousemoveDuringTooltip(event) {
//		currentMouseX = event.pageX;
//	}
//	
//	function hideTooltip(options) {
//		if (tooltipTimer) {
//			clearTimeout(tooltipTimer);
//		}
//		$(document).unbind("mousemove", mousemoveDuringTooltip);
//		
//		var tipNode = $("#tip_now");
//		if (tipNode.length) {
//			tipNode.fadeOut("fast", function() {
//				tipNode.remove();
//			});
//			/* tipNode.animate(options.hideAnimate, 200, function() {
//				tipNode.remove();
//			}); */
//		}
//	}
//	
//	$(function() {
//		$("#container").scroll(function() {
//			hideTooltip();
//		});
//	});
//	
//	$.fn.extend({
//		tooltip: function(options) {
//			options = options || {};
//			
//			return this.each(function() {
//				var $this = $(this);
//				if ($this.data("tooltip_initialized")) {
//					return true;
//				}
//				$this.data("tooltip_initialized", true);
//				
//				// tip_v can be "0", "1", "2"
//				// 0: Normal tooltip.
//				// 1: Vertical tooltip.
//				// 2: Multi-lines tooltip.
//				var version = 0;
//				var tip_v = $this.attr("tip_v");
//				if (typeof tip_v !== "undefined") {
//					version = parseInt(tip_v, 10);
//				}
//				
//				var titleAttrName = options.titleAttrName || "title";
//				var tooltip = $this.attr("tooltip");
//				if (typeof tooltip === "undefined") {
//					tooltip = $this.attr(titleAttrName);
//					if (!tooltip) {
//						return true;
//					}
//					$this.attr("tooltip", tooltip).removeAttr(titleAttrName);
//				}
//				
//				var newOptions = $.extend({}, options, {
//					node: $this,
//					version: version,
//					showAnimate: {opacity: 1, top: "+=5"},
//					hideAnimate: {opacity: 0, top: "-=5"}
//				});
//				
//				if (version === 1 || version === 2) {
//					$.extend(newOptions, {
//						showAnimate: {opacity: 1, left: "-=5"},
//						hideAnimate: {opacity: 0, left: "+=5"}
//					});
//				}
//				
//				if (version === 2) {
//					$this.click(function(event) {
//						showTooltip(event, newOptions);
//					});
//					
//					$this.hover(function() {
//					}, function() {
//						hideTooltip(newOptions);
//					});
//				} else {
//					$this.hover(function(event) {
//						showTooltip(event, newOptions);
//					}, function() {
//						hideTooltip(newOptions);
//					}).mousedown(function() {
//						hideTooltip(newOptions);
//					});
//				}
//			});
//		}
//	});
//	
//	$.wbx.ui.tooltip = function(els) {
//		var isBuild = false,
//			msgNode = null,
//			self = this,
//			tip = null,
//			position = "lower";
//		
//		this.init = function(els) {
//			var tpl = ["<div class=\"jui-tooltip\">",
//					"<b class=\"rtop\"><b class=\"r1\"></b><b class=\"r2\"></b><b class=\"r3\"></b><b class=\"r4\"></b></b>",
//					"<div id=\"msg\"></div>",
//					"<b class=\"rbottom\"><b class=\"r4\"></b><b class=\"r3\"></b><b class=\"r2\"></b><b class=\"r1\"></b></b>",
//				"</div>"].join("");
//			tip = $(tpl).appendTo($("#inner_cont0"));
//			msgNode = $("#msg", tip);
//			isBuild = true;
//			els.hover(self.showTip, self.hideTip);
//		};
//		this.showTip = function(e) {
//			var msg = $(this).attr("title")||$(this).attr("tooltip_title");
//			
//			if ($(this).attr("title")) {
//				$(this).attr("title", "").attr("tooltip_title", msg);
//			}
//			if ($.browser.version < 7) {
//				msgNode.width(0);
//				tip.width(0);
//			}
//			
//			msgNode.html(msg);
//			$(tip).show();
//			
//			tip.width(msgNode.width() + 40);
//			
//			var pos = self.getTipsPos(e);
//			self.setTipArrow(pos);
//			e.stopPropagation();
//		};
//		this.hideTip = function(e) {
//			$(tip).hide().css({
//				width: 0,
//				left: -1000
//			});
//			msgNode.css({
//				width: "",
//				top: 0
//			});
//			e.stopPropagation();
//		};
//		this.getTipsPos = function(e) {
//			var tar = $(e.target),
//				pos = tar.offset(),
//				mw = $(msgNode).width(),
//				wh = $(window).height(),
//				ww = $(window).width(),
//				left, top;
//			
//			scrollTop = $("#container").scrollTop();
//			top = pos.top + tar.outerHeight(true) + scrollTop;
//			left = pos.left;
//			
//			if ((top + tip.height() + 10) > wh) {
//				top = pos.top-tip.height() - 5 + scrollTop;
//				position = "upper";
//			}
//			if ((left + tip.width() + 10) > ww) {
//				left = left - ((left + tip.width() + 20) - ww);
//			}
//			if (tar.attr("tip_v") == "1") {
//				top = pos.top + scrollTop;
//				left = pos.left + tar.width() + 10;
//			}
//			tip.css({
//				top: top,
//				left: left
//			});
//		};
//		this.setTipArrow = function() {};
//		this.init(els);
//		return self;
//	};
//
//})();