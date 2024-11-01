var COMPARE_TIME = 5,
	MOVE_TIME = 50;
/**
 * Used by all sorting algorithms to swap two entries in the array.
 * @param {Array} arr
 * @param {Number} i
 * @param {Number} j
 */
function _swap(arr, i, j) {
	var tmp = arr[i];
	arr[i] = arr[j];
	arr[j] = tmp;
}
/**
 * Used to do setTimeout.
 * @param {Function} fn
 * @param {Number} ms
 */
function _delay(fn, ms) {
	if (ms > 0) {
		setTimeout(fn, ms);
	} else {
		fn();
	}
}
/**
 * Insertion sort
 * @param {Array} arr
 */
function insertionSort(arr) {
	var n = arr.length,
		i, j;
	for (i = 1; i < n; i++) {
		for (j = i; j >= 0 && arr[j] < arr[j - 1]; j--) {
			_swap(arr, j - 1, j);
		}
	}
	
	console.info(arr);
}
/**
 * 
 * @param {Array} arr
 */
function insertionSort_noloop(arr) {
	var n = arr.length,
		i = 1, j;
	
	function loopInner() {
		if (j >= 0) {
			if (arr[j] < arr[j - 1]) {// compare
				_swap(arr, j - 1, j);
				j--;
				_delay(loopInner, COMPARE_TIME + MOVE_TIME);
			} else {
				i++;
				_delay(loop, COMPARE_TIME);
			}
		} else {
			i++;
			loop();
		}
	}
	function loop() {
		if (i < n) {
			j = i;
			loopInner();
		} else {
			console.info(arr);// end of sort
		}
	}
	loop();
}
/**
 * 
 * @param {Array} arr
 */
function bubbleSort(arr) {
	var n = arr.length,
		i, j;
	for (i = n - 1; i >= 0; i--) {
		for (j = 0; j < i; j++) {
			if (arr[j] > arr[j + 1]) {
				_swap(arr, j, j + 1);
			}
		}
	}
	
	console.info(arr);
}
function bubbleSort_noloop(arr) {
	var n = arr.length,
		i = n - 1, j;
	
	function loopInner() {
		if (j < i) {
			var needMove = arr[j] > arr[j + 1];// compare
			if (needMove) {
				_swap(arr, j, j + 1);// move
			}
			j++;
			_delay(loopInner, needMove ? COMPARE_TIME + MOVE_TIME : COMPARE_TIME);
		} else {
			i--;
			loop();
		}
	}
	function loop() {
		if (i >= 0) {
			j = 0;
			loopInner();
		} else {
			console.info(arr);// end of sort
		}
	}
	loop();
}
/**
 * 
 * @param {Array} arr
 */
function bubbleSortEx(arr) {
	var n = arr.length,
		i, j, unmoved;
	for (i = 0; i < n - 1; i++) {
		unmoved = true;
		for (j = n - 1; j > i; j--) {
			if (arr[j] < arr[j - 1]) {
				_swap(arr, j, j - 1);
				unmoved = false;
			}
		}
		
		if (unmoved) {
			break;
		}
	}
	
	console.info(arr);
}
/**
 * 
 * @param {Array} arr
 */
function bubbleSortEx_noloop(arr) {
	var n = arr.length,
		i = 0, j, unmoved;
	
	function loopInner() {
		if (j > i) {
			var needMove = arr[j] < arr[j - 1];
			if (needMove) {
				_swap(arr, j, j - 1);
				unmoved = false;
			}
			j--;
			_delay(loopInner, needMove ? COMPARE_TIME + MOVE_TIME : COMPARE_TIME);
		} else {
			if (unmoved) {
				console.info(arr);// end of sort - break the outer loop for nothing moved during one pass
			} else {
				i++;
				loop();
			}
		}
	}
	function loop() {
		if (i < n - 1) {
			unmoved = true;
			j = n - 1;
			loopInner();
		} else {
			console.info(arr);// end of sort
		}
	}
	loop();
}
/**
 * 
 * @param {Array} arr
 */
function selectionSort(arr) {
	var n = arr.length,
		i, j, min, minIdx;
	for (i = 0; i < n - 1; i++) {
		min = arr[i];
		minIdx = i;
		for (j = i + 1; j < n; j++) {
			if (arr[j] < min) {
				min = arr[j];
				minIdx = j;
			}
		}
		_swap(arr, i, minIdx);
	}
	
	console.info(arr);
}
/**
 * 
 * @param {Array} arr
 */
function selectionSort_noloop(arr) {
	var n = arr.length,
		i = 0, j, min, minIdx;
	
	function loopInner() {
		if (j < n) {
			if (arr[j] < min) {// compare
				min = arr[j];
				minIdx = j;
			}
			j++;
			_delay(loopInner, COMPARE_TIME);
		} else {
			_swap(arr, i, minIdx);// move
			i++;
			_delay(loop, MOVE_TIME);
		}
	}
	function loop() {
		if (i < n - 1) {
			min = arr[i];
			minIdx = i;
			j = i + 1;
			loopInner();
		} else {
			console.info(arr);// end of sort
		}
	}
	
	loop();
}
/**
 * 
 * @param {Array} arr
 */
function quickSort(arr) {
	function quick(l, r) {// l for left, r for right
		if (l >= r) {
			return;
		}
		
		var pivot = arr[l],// the first of the sub-list as the pivot
			i = l + 1,
			j = r;
		
		while (true) {
			while (i < r && arr[i] <= pivot) {
				i++;
			}
			while (j > l && arr[j] >= pivot) {
				j--;
			}
			
			if (i < j) {
				_swap(arr, i, j);
			} else {
				_swap(arr, l, j);
				break;
			}
		}
		
		quick(l, j - 1);
		quick(j + 1, r);
	}
	quick(0, arr.length - 1);
	
	console.info(arr);
}
/**
 * 
 * @param {Array} arr
 */
function quickSort_noloop(arr) {
	var recursiveStack = [],
		n = arr.length - 1,
		pivot, i, j, l, r, needCmp;
	
	function loopJ() {
		needCmp = j > l;
		if (needCmp && arr[j] >= pivot) {
			j--;
			_delay(loopJ, COMPARE_TIME);
		} else {
			if (i < j) {
				_swap(arr, i, j);
				_delay(loop, needCmp ? COMPARE_TIME + MOVE_TIME : MOVE_TIME);
			} else {
				_swap(arr, l, j);
				
				recursiveStack.push({
					l: j + 1,
					r: r
				});
				_delay(function() {
					quick(l, j - 1);
				}, needCmp ? COMPARE_TIME + MOVE_TIME : MOVE_TIME);
			}
		}
	}
	function loopI() {
		needCmp = i < r;
		if (needCmp && arr[i] <= pivot) {
			i++;
			_delay(loopI, COMPARE_TIME);
		} else {
			_delay(loopJ, needCmp ? COMPARE_TIME : 0);
		}
	}
	function loop() {
		loopI();
	}
	
	function quick(_l, _r) {// l for left, r for right
		l = _l;
		r = _r;
		
		if (l >= r) {
			var o = recursiveStack.pop();
			if (o) {
				quick(o.l, o.r);
			} else {
				console.info(arr);// end of sort
			}
			return;
		}
		
		pivot = arr[l];// the first of the sub-list as the pivot
		i = l + 1;
		j = r;
		
		loop();
	}
	quick(0, n);
}