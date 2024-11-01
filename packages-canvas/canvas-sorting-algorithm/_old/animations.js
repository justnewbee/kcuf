(function() {
	var PADDING = 2,
		POINTER_W = 4,
		POINTER_H = 8,
		DATA_W = 4,
		DATA_H = 2,
		
		COMPARE_TIME = 50,
		MOVE_TIME = 450,
		mixin = function() {
			var dest = arguments[0],
				n = arguments.length,
				src, k, i;
			
			for (i = 1; i < n; i++) {
				src = arguments[i];
				for (k in src) {
					if (src.hasOwnProperty(k)) {
						dest[k] = src[k];
					}
				}
			}
			
			return dest;
		};
	
	var SortAnimation = function(arr, opts) {
		this._opts = mixin({}, opts);
		this._arr0 = arr;
		
		var canvas = document.createElement("canvas");
		canvas.width = 0;
		canvas.height = 0;
		(this._opts.container || document.body).appendChild(canvas);
		
		var _this = this;
		canvas.addEventListener("dblclick", function(e) {
			if (_this._arr0 && _this._opts.algorithm) {
				_this.sort();
			}
		}, false);
		
		this._canvas = canvas;
		this._ctx = canvas.getContext("2d");
		
		if (this._arr0 && this._opts.algorithm) {
			this.sort();
		}
	};
	
	mixin(SortAnimation, {
		ALGORITHM_INSERTION: "insertion",
		ALGORITHM_BUBBLE: "bubble",
		ALGORITHM_SELECTION: "selection",
		ALGORITHM_QUICK: "quick",
		OPTS: {
			container: null,
			algorithm: "",
			onComplete: null
		}
	});
	
	SortAnimation.prototype = {
		_canvas: null,
		_ctx: null,
		_opts: null,
		_arr0: null,// the original array to sort
		
		_arr: null,// the array which is a copy of the original one, used for sorting
		_timer: null,
		_movements: 0,
		_comparisons: 0,
		
		sort: function() {
			if (!this._arr0 || !this._opts.algorithm) {
				throw "You must provide an array and the algorithm of sorting!";
			}
			
			this._preSort();
			
			switch (this._opts.algorithm) {
			case SortAnimation.ALGORITHM_INSERTION:
				this._insertionSort();
				break;
			case SortAnimation.ALGORITHM_BUBBLE:
				this._bubbleSort();
				break;
			case SortAnimation.ALGORITHM_SELECTION:
				this._selectionSort();
				break;
			case SortAnimation.ALGORITHM_QUICK:
				this._quickSort();
				break;
			default:
				throw "algorithm \"" + this._opts.algorithm + "\" is not supported!";
			}
		},
		
		_insertionSort: function() {
			var _this = this,
				arr = this._arr,
				n = arr.length,
				i, j;
			
			function loopInner() {
				_this._pointAt(j);
				
				if (j >= 1) {
					_this._comparisons++;
					
					if (arr[j] < arr[j - 1]) {
						_this._swap(j, j - 1);
						
						j--;
						_this._delay(loopInner, COMPARE_TIME + MOVE_TIME);
					} else {// no need to go on the inner loop
//						_this._drawEntry(j);
						
						i++;
						_this._delay(loop, COMPARE_TIME);
					}
				} else {// end of inner loop
					i++;
					loop();
				}
			}
			function loop() {
				if (i < n) {
					_this._pointAt(i);
					j = i;
					loopInner();
				} else {// end of loop
					_this._postSort();
				}
			}
			
//			this._drawEntry(0);// start
			i = 0;
			loop();
		},
		
		_bubbleSort: function() {
			var _this = this,
				arr = this._arr,
				n = arr.length,
				i, j, unmoved;
			
			function loop() {
				if (i < n - 1) {
					_this._pointAt(i);
					j = n - 1;
					loopInner();
				} else {// end of loop
					_this._postSort();
				}
			}
			function loopInner() {
				if (j > i) {// inner condition
					_this._comparisons++;
					
					var moved = arr[j] < arr[j - 1];
					if (moved) {
						_this._swap(j, j - 1);
						unmoved = false;
					}
					
					j--;
					_this._delay(loopInner, moved ? COMPARE_TIME + MOVE_TIME : COMPARE_TIME);
				} else {// end of inner
					if (unmoved) {// unmoved in one pass, break the loop
						_this._postSort();
					} else {
						i++;
						loop();
					}
				}
			}
			i = 0;
			loop();
		},
		
		_selectionSort: function() {
			var _this = this,
				arr = this._arr,
				n = arr.length,
				i, j, min, minIdx;
			
			function loop() {
				if (i < n - 1) {
					_this._pointAt(i);
					
					min = arr[i];
					minIdx = i;
					j = i + 1;
					loopInner();
				} else {// end of loop
					_this._postSort();
				}
			}
			function loopInner() {
				if (j < n) {
					_this._comparisons++;
					_this._pointAt(j);
					
					if (arr[j] < min) {
						min = arr[j];
						minIdx = j;
					}
					j++;
					_this._delay(loopInner, COMPARE_TIME);
				} else {// end of inner
					_this._swap(minIdx, i);
					
					i++;
					_this._delay(loop, MOVE_TIME);
				}
			}
			i = 0;
			loop();
		},
		
		_quickSort: function() {
			var _this = this,
				arr = this._arr,
				n = arr.length,
				recursiveStack = [],
				pivot, i, j;
			
			function quick(l, r) {
				if (l >= r) {
					var o = recursiveStack.pop();
					if (o) {
						quick(o.l, o.r);
					} else {// end of sort
						_this._postSort();
					}
					return;
				}
				
				function loopI() {
					if (arr[i] <= pivot && i < r) {
						_this._pointAt(i);
						i++;
						_this._delay(loopI, COMPARE_TIME);
					} else {
						loopJ();
					}
				}
				function loopJ() {
					if (arr[j] >= pivot && j > l) {
						_this._pointAt(i);
						_this._pointAt(j, true);// true to keep both arrow
						j--;
						_this._delay(loopJ, COMPARE_TIME);
					} else {
						if (i < j) {
							_this._swap(i, j);
							_this._delay(loop, MOVE_TIME);
						} else {
							_this._swap(l, j);
							
							recursiveStack.push({
								l: j + 1,
								r: r
							});
							quick(l, j - 1);
						}
					}
				}
				function loop() {
					loopI();
				}
				
				pivot = arr[l];
				i = l + 1;
				j = r;
				
				loop();
			}
			
			quick(0, n - 1);
		},
		
		_delay: function(fn, time) {
			this._timer = setTimeout(fn, time);
		},
		
		_preSort: function() {
			if (this._timer) {
				clearTimeout(this._timer);
				this._timer = null;
			}
			
			this._arr = this._arr0.slice(0);
			this._comparisons = 0;
			this._movements = 0;
			
			var canvas = this._canvas,
				ctx = this._ctx,
				probScale = Math.ceil(this._arr.length / 10) * 10,
				w = PADDING * 2 + POINTER_W + probScale * DATA_W,
				h = PADDING * 2 + (2 * probScale + 1) * DATA_H,
				n = this._arr.length,
				i;
			
			canvas.width = w;
			canvas.style.width = w + "px";
			canvas.height = h;
			canvas.style.height = h + "px";
			
			ctx.save();
			ctx.fillStyle = "#999";
			for (i = 0; i < n; i++) {
				this._drawEntry(i);
			}
			ctx.restore();
		},
		
		_postSort: function() {
			this._pointAt(-1);
			this._timer = null;
			
			console.info("%s sorting result: comparisons = %d; movements = %d", this._opts.algorithm, this._comparisons, this._movements, this._arr0);
		},
		
		_drawEntry: function(i) {
			var ctx = this._ctx,
				x_i = PADDING + POINTER_W,
				y_i = PADDING + 2 * (i + 1) * DATA_H - DATA_H;
			
			ctx.clearRect(x_i, y_i, this._canvas.width - PADDING * 2 - POINTER_W, DATA_H);
			ctx.fillRect(x_i, y_i, this._arr[i] * DATA_W, DATA_H);
		},
		
		_pointAt: function(i, dontClear) {
			var canvas = this._canvas,
				ctx = this._ctx;
			
			if (!dontClear) {
				ctx.clearRect(0, 0, PADDING + POINTER_W, canvas.height);
			}
			
			if (i < 0) {
				return;// just clear
			}
			
			var x0 = PADDING,
				y0 = PADDING + 2 * i * DATA_H + 1.5 * DATA_H - POINTER_H * 0.5;
			
			ctx.save();
			
			ctx.beginPath();
			ctx.moveTo(x0, y0);
			ctx.lineTo(x0 + POINTER_W, y0 + POINTER_H * 0.5);
			ctx.lineTo(x0, y0 + POINTER_H);
			ctx.closePath();
			
			ctx.fillStyle = "#F00";
			ctx.fill();
			
			ctx.restore();
		},
		
		_swap: function(from, to) {
			this._movements++;
			
			var arr = this._arr,
				tmp = arr[from];
			
			arr[from] = arr[to];
			arr[to] = tmp;
			
			this._drawEntry(from);
			this._pointAt(to);
			this._drawEntry(to);
		}
	};
	
	// export
	window.SortAnimation = SortAnimation;
})();