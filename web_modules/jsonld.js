import { g as getCjsExportFromNamespace, a as commonjsGlobal, c as createCommonjsModule } from './common/_commonjsHelpers-7dcf7119.js';

var toStr = Object.prototype.toString;

var isArguments = function isArguments(value) {
	var str = toStr.call(value);
	var isArgs = str === '[object Arguments]';
	if (!isArgs) {
		isArgs = str !== '[object Array]' &&
			value !== null &&
			typeof value === 'object' &&
			typeof value.length === 'number' &&
			value.length >= 0 &&
			toStr.call(value.callee) === '[object Function]';
	}
	return isArgs;
};

var keysShim;
if (!Object.keys) {
	// modified from https://github.com/es-shims/es5-shim
	var has = Object.prototype.hasOwnProperty;
	var toStr$1 = Object.prototype.toString;
	var isArgs = isArguments; // eslint-disable-line global-require
	var isEnumerable = Object.prototype.propertyIsEnumerable;
	var hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');
	var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
	var dontEnums = [
		'toString',
		'toLocaleString',
		'valueOf',
		'hasOwnProperty',
		'isPrototypeOf',
		'propertyIsEnumerable',
		'constructor'
	];
	var equalsConstructorPrototype = function (o) {
		var ctor = o.constructor;
		return ctor && ctor.prototype === o;
	};
	var excludedKeys = {
		$applicationCache: true,
		$console: true,
		$external: true,
		$frame: true,
		$frameElement: true,
		$frames: true,
		$innerHeight: true,
		$innerWidth: true,
		$onmozfullscreenchange: true,
		$onmozfullscreenerror: true,
		$outerHeight: true,
		$outerWidth: true,
		$pageXOffset: true,
		$pageYOffset: true,
		$parent: true,
		$scrollLeft: true,
		$scrollTop: true,
		$scrollX: true,
		$scrollY: true,
		$self: true,
		$webkitIndexedDB: true,
		$webkitStorageInfo: true,
		$window: true
	};
	var hasAutomationEqualityBug = (function () {
		/* global window */
		if (typeof window === 'undefined') { return false; }
		for (var k in window) {
			try {
				if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
					try {
						equalsConstructorPrototype(window[k]);
					} catch (e) {
						return true;
					}
				}
			} catch (e) {
				return true;
			}
		}
		return false;
	}());
	var equalsConstructorPrototypeIfNotBuggy = function (o) {
		/* global window */
		if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
			return equalsConstructorPrototype(o);
		}
		try {
			return equalsConstructorPrototype(o);
		} catch (e) {
			return false;
		}
	};

	keysShim = function keys(object) {
		var isObject = object !== null && typeof object === 'object';
		var isFunction = toStr$1.call(object) === '[object Function]';
		var isArguments = isArgs(object);
		var isString = isObject && toStr$1.call(object) === '[object String]';
		var theKeys = [];

		if (!isObject && !isFunction && !isArguments) {
			throw new TypeError('Object.keys called on a non-object');
		}

		var skipProto = hasProtoEnumBug && isFunction;
		if (isString && object.length > 0 && !has.call(object, 0)) {
			for (var i = 0; i < object.length; ++i) {
				theKeys.push(String(i));
			}
		}

		if (isArguments && object.length > 0) {
			for (var j = 0; j < object.length; ++j) {
				theKeys.push(String(j));
			}
		} else {
			for (var name in object) {
				if (!(skipProto && name === 'prototype') && has.call(object, name)) {
					theKeys.push(String(name));
				}
			}
		}

		if (hasDontEnumBug) {
			var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

			for (var k = 0; k < dontEnums.length; ++k) {
				if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
					theKeys.push(dontEnums[k]);
				}
			}
		}
		return theKeys;
	};
}
var implementation = keysShim;

var slice = Array.prototype.slice;


var origKeys = Object.keys;
var keysShim$1 = origKeys ? function keys(o) { return origKeys(o); } : implementation;

var originalKeys = Object.keys;

keysShim$1.shim = function shimObjectKeys() {
	if (Object.keys) {
		var keysWorksWithArguments = (function () {
			// Safari 5.0 bug
			var args = Object.keys(arguments);
			return args && args.length === arguments.length;
		}(1, 2));
		if (!keysWorksWithArguments) {
			Object.keys = function keys(object) { // eslint-disable-line func-name-matching
				if (isArguments(object)) {
					return originalKeys(slice.call(object));
				}
				return originalKeys(object);
			};
		}
	} else {
		Object.keys = keysShim$1;
	}
	return Object.keys || keysShim$1;
};

var objectKeys = keysShim$1;

var hasSymbols = typeof Symbol === 'function' && typeof Symbol('foo') === 'symbol';

var toStr$2 = Object.prototype.toString;
var concat = Array.prototype.concat;
var origDefineProperty = Object.defineProperty;

var isFunction = function (fn) {
	return typeof fn === 'function' && toStr$2.call(fn) === '[object Function]';
};

var arePropertyDescriptorsSupported = function () {
	var obj = {};
	try {
		origDefineProperty(obj, 'x', { enumerable: false, value: obj });
		// eslint-disable-next-line no-unused-vars, no-restricted-syntax
		for (var _ in obj) { // jscs:ignore disallowUnusedVariables
			return false;
		}
		return obj.x === obj;
	} catch (e) { /* this is IE 8. */
		return false;
	}
};
var supportsDescriptors = origDefineProperty && arePropertyDescriptorsSupported();

var defineProperty = function (object, name, value, predicate) {
	if (name in object && (!isFunction(predicate) || !predicate())) {
		return;
	}
	if (supportsDescriptors) {
		origDefineProperty(object, name, {
			configurable: true,
			enumerable: false,
			value: value,
			writable: true
		});
	} else {
		object[name] = value;
	}
};

var defineProperties = function (object, map) {
	var predicates = arguments.length > 2 ? arguments[2] : {};
	var props = objectKeys(map);
	if (hasSymbols) {
		props = concat.call(props, Object.getOwnPropertySymbols(map));
	}
	for (var i = 0; i < props.length; i += 1) {
		defineProperty(object, props[i], map[props[i]], predicates[props[i]]);
	}
};

defineProperties.supportsDescriptors = !!supportsDescriptors;

var defineProperties_1 = defineProperties;

/* eslint no-invalid-this: 1 */

var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var slice$1 = Array.prototype.slice;
var toStr$3 = Object.prototype.toString;
var funcType = '[object Function]';

var implementation$1 = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr$3.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slice$1.call(arguments, 1);

    var bound;
    var binder = function () {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                args.concat(slice$1.call(arguments))
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        } else {
            return target.apply(
                that,
                args.concat(slice$1.call(arguments))
            );
        }
    };

    var boundLength = Math.max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs.push('$' + i);
    }

    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};

var functionBind = Function.prototype.bind || implementation$1;

var _nodeResolve_empty = {};

var _nodeResolve_empty$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	'default': _nodeResolve_empty
});

var require$$4 = getCjsExportFromNamespace(_nodeResolve_empty$1);

var hasMap = typeof Map === 'function' && Map.prototype;
var mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype, 'size') : null;
var mapSize = hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get === 'function' ? mapSizeDescriptor.get : null;
var mapForEach = hasMap && Map.prototype.forEach;
var hasSet = typeof Set === 'function' && Set.prototype;
var setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, 'size') : null;
var setSize = hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === 'function' ? setSizeDescriptor.get : null;
var setForEach = hasSet && Set.prototype.forEach;
var hasWeakMap = typeof WeakMap === 'function' && WeakMap.prototype;
var weakMapHas = hasWeakMap ? WeakMap.prototype.has : null;
var hasWeakSet = typeof WeakSet === 'function' && WeakSet.prototype;
var weakSetHas = hasWeakSet ? WeakSet.prototype.has : null;
var booleanValueOf = Boolean.prototype.valueOf;
var objectToString = Object.prototype.toString;
var match = String.prototype.match;
var bigIntValueOf = typeof BigInt === 'function' ? BigInt.prototype.valueOf : null;

var inspectCustom = require$$4.custom;
var inspectSymbol = inspectCustom && isSymbol(inspectCustom) ? inspectCustom : null;

var objectInspect = function inspect_(obj, options, depth, seen) {
    var opts = options || {};

    if (has$1(opts, 'quoteStyle') && (opts.quoteStyle !== 'single' && opts.quoteStyle !== 'double')) {
        throw new TypeError('option "quoteStyle" must be "single" or "double"');
    }

    if (typeof obj === 'undefined') {
        return 'undefined';
    }
    if (obj === null) {
        return 'null';
    }
    if (typeof obj === 'boolean') {
        return obj ? 'true' : 'false';
    }

    if (typeof obj === 'string') {
        return inspectString(obj, opts);
    }
    if (typeof obj === 'number') {
        if (obj === 0) {
            return Infinity / obj > 0 ? '0' : '-0';
        }
        return String(obj);
    }
    if (typeof obj === 'bigint') { // eslint-disable-line valid-typeof
        return String(obj) + 'n';
    }

    var maxDepth = typeof opts.depth === 'undefined' ? 5 : opts.depth;
    if (typeof depth === 'undefined') { depth = 0; }
    if (depth >= maxDepth && maxDepth > 0 && typeof obj === 'object') {
        return '[Object]';
    }

    if (typeof seen === 'undefined') {
        seen = [];
    } else if (indexOf(seen, obj) >= 0) {
        return '[Circular]';
    }

    function inspect(value, from) {
        if (from) {
            seen = seen.slice();
            seen.push(from);
        }
        return inspect_(value, opts, depth + 1, seen);
    }

    if (typeof obj === 'function') {
        var name = nameOf(obj);
        return '[Function' + (name ? ': ' + name : '') + ']';
    }
    if (isSymbol(obj)) {
        var symString = Symbol.prototype.toString.call(obj);
        return typeof obj === 'object' ? markBoxed(symString) : symString;
    }
    if (isElement(obj)) {
        var s = '<' + String(obj.nodeName).toLowerCase();
        var attrs = obj.attributes || [];
        for (var i = 0; i < attrs.length; i++) {
            s += ' ' + attrs[i].name + '=' + wrapQuotes(quote(attrs[i].value), 'double', opts);
        }
        s += '>';
        if (obj.childNodes && obj.childNodes.length) { s += '...'; }
        s += '</' + String(obj.nodeName).toLowerCase() + '>';
        return s;
    }
    if (isArray(obj)) {
        if (obj.length === 0) { return '[]'; }
        return '[ ' + arrObjKeys(obj, inspect).join(', ') + ' ]';
    }
    if (isError(obj)) {
        var parts = arrObjKeys(obj, inspect);
        if (parts.length === 0) { return '[' + String(obj) + ']'; }
        return '{ [' + String(obj) + '] ' + parts.join(', ') + ' }';
    }
    if (typeof obj === 'object') {
        if (inspectSymbol && typeof obj[inspectSymbol] === 'function') {
            return obj[inspectSymbol]();
        } else if (typeof obj.inspect === 'function') {
            return obj.inspect();
        }
    }
    if (isMap(obj)) {
        var mapParts = [];
        mapForEach.call(obj, function (value, key) {
            mapParts.push(inspect(key, obj) + ' => ' + inspect(value, obj));
        });
        return collectionOf('Map', mapSize.call(obj), mapParts);
    }
    if (isSet(obj)) {
        var setParts = [];
        setForEach.call(obj, function (value) {
            setParts.push(inspect(value, obj));
        });
        return collectionOf('Set', setSize.call(obj), setParts);
    }
    if (isWeakMap(obj)) {
        return weakCollectionOf('WeakMap');
    }
    if (isWeakSet(obj)) {
        return weakCollectionOf('WeakSet');
    }
    if (isNumber(obj)) {
        return markBoxed(inspect(Number(obj)));
    }
    if (isBigInt(obj)) {
        return markBoxed(inspect(bigIntValueOf.call(obj)));
    }
    if (isBoolean(obj)) {
        return markBoxed(booleanValueOf.call(obj));
    }
    if (isString(obj)) {
        return markBoxed(inspect(String(obj)));
    }
    if (!isDate(obj) && !isRegExp(obj)) {
        var xs = arrObjKeys(obj, inspect);
        if (xs.length === 0) { return '{}'; }
        return '{ ' + xs.join(', ') + ' }';
    }
    return String(obj);
};

function wrapQuotes(s, defaultStyle, opts) {
    var quoteChar = (opts.quoteStyle || defaultStyle) === 'double' ? '"' : "'";
    return quoteChar + s + quoteChar;
}

function quote(s) {
    return String(s).replace(/"/g, '&quot;');
}

function isArray(obj) { return toStr$4(obj) === '[object Array]'; }
function isDate(obj) { return toStr$4(obj) === '[object Date]'; }
function isRegExp(obj) { return toStr$4(obj) === '[object RegExp]'; }
function isError(obj) { return toStr$4(obj) === '[object Error]'; }
function isSymbol(obj) { return toStr$4(obj) === '[object Symbol]'; }
function isString(obj) { return toStr$4(obj) === '[object String]'; }
function isNumber(obj) { return toStr$4(obj) === '[object Number]'; }
function isBigInt(obj) { return toStr$4(obj) === '[object BigInt]'; }
function isBoolean(obj) { return toStr$4(obj) === '[object Boolean]'; }

var hasOwn = Object.prototype.hasOwnProperty || function (key) { return key in this; };
function has$1(obj, key) {
    return hasOwn.call(obj, key);
}

function toStr$4(obj) {
    return objectToString.call(obj);
}

function nameOf(f) {
    if (f.name) { return f.name; }
    var m = match.call(f, /^function\s*([\w$]+)/);
    if (m) { return m[1]; }
    return null;
}

function indexOf(xs, x) {
    if (xs.indexOf) { return xs.indexOf(x); }
    for (var i = 0, l = xs.length; i < l; i++) {
        if (xs[i] === x) { return i; }
    }
    return -1;
}

function isMap(x) {
    if (!mapSize || !x || typeof x !== 'object') {
        return false;
    }
    try {
        mapSize.call(x);
        try {
            setSize.call(x);
        } catch (s) {
            return true;
        }
        return x instanceof Map; // core-js workaround, pre-v2.5.0
    } catch (e) {}
    return false;
}

function isWeakMap(x) {
    if (!weakMapHas || !x || typeof x !== 'object') {
        return false;
    }
    try {
        weakMapHas.call(x, weakMapHas);
        try {
            weakSetHas.call(x, weakSetHas);
        } catch (s) {
            return true;
        }
        return x instanceof WeakMap; // core-js workaround, pre-v2.5.0
    } catch (e) {}
    return false;
}

function isSet(x) {
    if (!setSize || !x || typeof x !== 'object') {
        return false;
    }
    try {
        setSize.call(x);
        try {
            mapSize.call(x);
        } catch (m) {
            return true;
        }
        return x instanceof Set; // core-js workaround, pre-v2.5.0
    } catch (e) {}
    return false;
}

function isWeakSet(x) {
    if (!weakSetHas || !x || typeof x !== 'object') {
        return false;
    }
    try {
        weakSetHas.call(x, weakSetHas);
        try {
            weakMapHas.call(x, weakMapHas);
        } catch (s) {
            return true;
        }
        return x instanceof WeakSet; // core-js workaround, pre-v2.5.0
    } catch (e) {}
    return false;
}

function isElement(x) {
    if (!x || typeof x !== 'object') { return false; }
    if (typeof HTMLElement !== 'undefined' && x instanceof HTMLElement) {
        return true;
    }
    return typeof x.nodeName === 'string' && typeof x.getAttribute === 'function';
}

function inspectString(str, opts) {
    // eslint-disable-next-line no-control-regex
    var s = str.replace(/(['\\])/g, '\\$1').replace(/[\x00-\x1f]/g, lowbyte);
    return wrapQuotes(s, 'single', opts);
}

function lowbyte(c) {
    var n = c.charCodeAt(0);
    var x = {
        8: 'b', 9: 't', 10: 'n', 12: 'f', 13: 'r'
    }[n];
    if (x) { return '\\' + x; }
    return '\\x' + (n < 0x10 ? '0' : '') + n.toString(16);
}

function markBoxed(str) {
    return 'Object(' + str + ')';
}

function weakCollectionOf(type) {
    return type + ' { ? }';
}

function collectionOf(type, size, entries) {
    return type + ' (' + size + ') {' + entries.join(', ') + '}';
}

function arrObjKeys(obj, inspect) {
    var isArr = isArray(obj);
    var xs = [];
    if (isArr) {
        xs.length = obj.length;
        for (var i = 0; i < obj.length; i++) {
            xs[i] = has$1(obj, i) ? inspect(obj[i], obj) : '';
        }
    }
    for (var key in obj) { // eslint-disable-line no-restricted-syntax
        if (!has$1(obj, key)) { continue; } // eslint-disable-line no-restricted-syntax, no-continue
        if (isArr && String(Number(key)) === key && key < obj.length) { continue; } // eslint-disable-line no-restricted-syntax, no-continue
        if ((/[^\w$]/).test(key)) {
            xs.push(inspect(key, obj) + ': ' + inspect(obj[key], obj));
        } else {
            xs.push(key + ': ' + inspect(obj[key], obj));
        }
    }
    return xs;
}

/* eslint complexity: [2, 18], max-statements: [2, 33] */
var shams = function hasSymbols() {
	if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') { return false; }
	if (typeof Symbol.iterator === 'symbol') { return true; }

	var obj = {};
	var sym = Symbol('test');
	var symObj = Object(sym);
	if (typeof sym === 'string') { return false; }

	if (Object.prototype.toString.call(sym) !== '[object Symbol]') { return false; }
	if (Object.prototype.toString.call(symObj) !== '[object Symbol]') { return false; }

	// temp disabled per https://github.com/ljharb/object.assign/issues/17
	// if (sym instanceof Symbol) { return false; }
	// temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
	// if (!(symObj instanceof Symbol)) { return false; }

	// if (typeof Symbol.prototype.toString !== 'function') { return false; }
	// if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }

	var symVal = 42;
	obj[sym] = symVal;
	for (sym in obj) { return false; } // eslint-disable-line no-restricted-syntax
	if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) { return false; }

	if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) { return false; }

	var syms = Object.getOwnPropertySymbols(obj);
	if (syms.length !== 1 || syms[0] !== sym) { return false; }

	if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) { return false; }

	if (typeof Object.getOwnPropertyDescriptor === 'function') {
		var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
		if (descriptor.value !== symVal || descriptor.enumerable !== true) { return false; }
	}

	return true;
};

var origSymbol = commonjsGlobal.Symbol;


var hasSymbols$1 = function hasNativeSymbols() {
	if (typeof origSymbol !== 'function') { return false; }
	if (typeof Symbol !== 'function') { return false; }
	if (typeof origSymbol('foo') !== 'symbol') { return false; }
	if (typeof Symbol('bar') !== 'symbol') { return false; }

	return shams();
};

/* globals
	Atomics,
	SharedArrayBuffer,
*/

var undefined$1;

var $TypeError = TypeError;

var $gOPD = Object.getOwnPropertyDescriptor;
if ($gOPD) {
	try {
		$gOPD({}, '');
	} catch (e) {
		$gOPD = null; // this is IE 8, which has a broken gOPD
	}
}

var throwTypeError = function () { throw new $TypeError(); };
var ThrowTypeError = $gOPD
	? (function () {
		try {
			// eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
			arguments.callee; // IE 8 does not throw here
			return throwTypeError;
		} catch (calleeThrows) {
			try {
				// IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
				return $gOPD(arguments, 'callee').get;
			} catch (gOPDthrows) {
				return throwTypeError;
			}
		}
	}())
	: throwTypeError;

var hasSymbols$2 = hasSymbols$1();

var getProto = Object.getPrototypeOf || function (x) { return x.__proto__; }; // eslint-disable-line no-proto
var generatorFunction =  undefined$1;
var asyncFunction =  undefined$1;
var asyncGenFunction =  undefined$1;

var TypedArray = typeof Uint8Array === 'undefined' ? undefined$1 : getProto(Uint8Array);

var INTRINSICS = {
	'%Array%': Array,
	'%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined$1 : ArrayBuffer,
	'%ArrayBufferPrototype%': typeof ArrayBuffer === 'undefined' ? undefined$1 : ArrayBuffer.prototype,
	'%ArrayIteratorPrototype%': hasSymbols$2 ? getProto([][Symbol.iterator]()) : undefined$1,
	'%ArrayPrototype%': Array.prototype,
	'%ArrayProto_entries%': Array.prototype.entries,
	'%ArrayProto_forEach%': Array.prototype.forEach,
	'%ArrayProto_keys%': Array.prototype.keys,
	'%ArrayProto_values%': Array.prototype.values,
	'%AsyncFromSyncIteratorPrototype%': undefined$1,
	'%AsyncFunction%': asyncFunction,
	'%AsyncFunctionPrototype%':  undefined$1,
	'%AsyncGenerator%':  undefined$1,
	'%AsyncGeneratorFunction%': asyncGenFunction,
	'%AsyncGeneratorPrototype%':  undefined$1,
	'%AsyncIteratorPrototype%':  undefined$1,
	'%Atomics%': typeof Atomics === 'undefined' ? undefined$1 : Atomics,
	'%Boolean%': Boolean,
	'%BooleanPrototype%': Boolean.prototype,
	'%DataView%': typeof DataView === 'undefined' ? undefined$1 : DataView,
	'%DataViewPrototype%': typeof DataView === 'undefined' ? undefined$1 : DataView.prototype,
	'%Date%': Date,
	'%DatePrototype%': Date.prototype,
	'%decodeURI%': decodeURI,
	'%decodeURIComponent%': decodeURIComponent,
	'%encodeURI%': encodeURI,
	'%encodeURIComponent%': encodeURIComponent,
	'%Error%': Error,
	'%ErrorPrototype%': Error.prototype,
	'%eval%': eval, // eslint-disable-line no-eval
	'%EvalError%': EvalError,
	'%EvalErrorPrototype%': EvalError.prototype,
	'%Float32Array%': typeof Float32Array === 'undefined' ? undefined$1 : Float32Array,
	'%Float32ArrayPrototype%': typeof Float32Array === 'undefined' ? undefined$1 : Float32Array.prototype,
	'%Float64Array%': typeof Float64Array === 'undefined' ? undefined$1 : Float64Array,
	'%Float64ArrayPrototype%': typeof Float64Array === 'undefined' ? undefined$1 : Float64Array.prototype,
	'%Function%': Function,
	'%FunctionPrototype%': Function.prototype,
	'%Generator%':  undefined$1,
	'%GeneratorFunction%': generatorFunction,
	'%GeneratorPrototype%':  undefined$1,
	'%Int8Array%': typeof Int8Array === 'undefined' ? undefined$1 : Int8Array,
	'%Int8ArrayPrototype%': typeof Int8Array === 'undefined' ? undefined$1 : Int8Array.prototype,
	'%Int16Array%': typeof Int16Array === 'undefined' ? undefined$1 : Int16Array,
	'%Int16ArrayPrototype%': typeof Int16Array === 'undefined' ? undefined$1 : Int8Array.prototype,
	'%Int32Array%': typeof Int32Array === 'undefined' ? undefined$1 : Int32Array,
	'%Int32ArrayPrototype%': typeof Int32Array === 'undefined' ? undefined$1 : Int32Array.prototype,
	'%isFinite%': isFinite,
	'%isNaN%': isNaN,
	'%IteratorPrototype%': hasSymbols$2 ? getProto(getProto([][Symbol.iterator]())) : undefined$1,
	'%JSON%': typeof JSON === 'object' ? JSON : undefined$1,
	'%JSONParse%': typeof JSON === 'object' ? JSON.parse : undefined$1,
	'%Map%': typeof Map === 'undefined' ? undefined$1 : Map,
	'%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols$2 ? undefined$1 : getProto(new Map()[Symbol.iterator]()),
	'%MapPrototype%': typeof Map === 'undefined' ? undefined$1 : Map.prototype,
	'%Math%': Math,
	'%Number%': Number,
	'%NumberPrototype%': Number.prototype,
	'%Object%': Object,
	'%ObjectPrototype%': Object.prototype,
	'%ObjProto_toString%': Object.prototype.toString,
	'%ObjProto_valueOf%': Object.prototype.valueOf,
	'%parseFloat%': parseFloat,
	'%parseInt%': parseInt,
	'%Promise%': typeof Promise === 'undefined' ? undefined$1 : Promise,
	'%PromisePrototype%': typeof Promise === 'undefined' ? undefined$1 : Promise.prototype,
	'%PromiseProto_then%': typeof Promise === 'undefined' ? undefined$1 : Promise.prototype.then,
	'%Promise_all%': typeof Promise === 'undefined' ? undefined$1 : Promise.all,
	'%Promise_reject%': typeof Promise === 'undefined' ? undefined$1 : Promise.reject,
	'%Promise_resolve%': typeof Promise === 'undefined' ? undefined$1 : Promise.resolve,
	'%Proxy%': typeof Proxy === 'undefined' ? undefined$1 : Proxy,
	'%RangeError%': RangeError,
	'%RangeErrorPrototype%': RangeError.prototype,
	'%ReferenceError%': ReferenceError,
	'%ReferenceErrorPrototype%': ReferenceError.prototype,
	'%Reflect%': typeof Reflect === 'undefined' ? undefined$1 : Reflect,
	'%RegExp%': RegExp,
	'%RegExpPrototype%': RegExp.prototype,
	'%Set%': typeof Set === 'undefined' ? undefined$1 : Set,
	'%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols$2 ? undefined$1 : getProto(new Set()[Symbol.iterator]()),
	'%SetPrototype%': typeof Set === 'undefined' ? undefined$1 : Set.prototype,
	'%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined$1 : SharedArrayBuffer,
	'%SharedArrayBufferPrototype%': typeof SharedArrayBuffer === 'undefined' ? undefined$1 : SharedArrayBuffer.prototype,
	'%String%': String,
	'%StringIteratorPrototype%': hasSymbols$2 ? getProto(''[Symbol.iterator]()) : undefined$1,
	'%StringPrototype%': String.prototype,
	'%Symbol%': hasSymbols$2 ? Symbol : undefined$1,
	'%SymbolPrototype%': hasSymbols$2 ? Symbol.prototype : undefined$1,
	'%SyntaxError%': SyntaxError,
	'%SyntaxErrorPrototype%': SyntaxError.prototype,
	'%ThrowTypeError%': ThrowTypeError,
	'%TypedArray%': TypedArray,
	'%TypedArrayPrototype%': TypedArray ? TypedArray.prototype : undefined$1,
	'%TypeError%': $TypeError,
	'%TypeErrorPrototype%': $TypeError.prototype,
	'%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined$1 : Uint8Array,
	'%Uint8ArrayPrototype%': typeof Uint8Array === 'undefined' ? undefined$1 : Uint8Array.prototype,
	'%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined$1 : Uint8ClampedArray,
	'%Uint8ClampedArrayPrototype%': typeof Uint8ClampedArray === 'undefined' ? undefined$1 : Uint8ClampedArray.prototype,
	'%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined$1 : Uint16Array,
	'%Uint16ArrayPrototype%': typeof Uint16Array === 'undefined' ? undefined$1 : Uint16Array.prototype,
	'%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined$1 : Uint32Array,
	'%Uint32ArrayPrototype%': typeof Uint32Array === 'undefined' ? undefined$1 : Uint32Array.prototype,
	'%URIError%': URIError,
	'%URIErrorPrototype%': URIError.prototype,
	'%WeakMap%': typeof WeakMap === 'undefined' ? undefined$1 : WeakMap,
	'%WeakMapPrototype%': typeof WeakMap === 'undefined' ? undefined$1 : WeakMap.prototype,
	'%WeakSet%': typeof WeakSet === 'undefined' ? undefined$1 : WeakSet,
	'%WeakSetPrototype%': typeof WeakSet === 'undefined' ? undefined$1 : WeakSet.prototype
};


var $replace = functionBind.call(Function.call, String.prototype.replace);

/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */
var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
var reEscapeChar = /\\(\\)?/g; /** Used to match backslashes in property paths. */
var stringToPath = function stringToPath(string) {
	var result = [];
	$replace(string, rePropName, function (match, number, quote, subString) {
		result[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : (number || match);
	});
	return result;
};
/* end adaptation */

var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
	if (!(name in INTRINSICS)) {
		throw new SyntaxError('intrinsic ' + name + ' does not exist!');
	}

	// istanbul ignore if // hopefully this is impossible to test :-)
	if (typeof INTRINSICS[name] === 'undefined' && !allowMissing) {
		throw new $TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
	}

	return INTRINSICS[name];
};

var GetIntrinsic = function GetIntrinsic(name, allowMissing) {
	if (typeof name !== 'string' || name.length === 0) {
		throw new TypeError('intrinsic name must be a non-empty string');
	}
	if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
		throw new TypeError('"allowMissing" argument must be a boolean');
	}

	var parts = stringToPath(name);

	var value = getBaseIntrinsic('%' + (parts.length > 0 ? parts[0] : '') + '%', allowMissing);
	for (var i = 1; i < parts.length; i += 1) {
		if (value != null) {
			if ($gOPD && (i + 1) >= parts.length) {
				var desc = $gOPD(value, parts[i]);
				if (!allowMissing && !(parts[i] in value)) {
					throw new $TypeError('base intrinsic for ' + name + ' exists, but the property is not available.');
				}
				value = desc ? (desc.get || desc.value) : value[parts[i]];
			} else {
				value = value[parts[i]];
			}
		}
	}
	return value;
};

var fnToStr = Function.prototype.toString;

var constructorRegex = /^\s*class\b/;
var isES6ClassFn = function isES6ClassFunction(value) {
	try {
		var fnStr = fnToStr.call(value);
		return constructorRegex.test(fnStr);
	} catch (e) {
		return false; // not a function
	}
};

var tryFunctionObject = function tryFunctionToStr(value) {
	try {
		if (isES6ClassFn(value)) { return false; }
		fnToStr.call(value);
		return true;
	} catch (e) {
		return false;
	}
};
var toStr$5 = Object.prototype.toString;
var fnClass = '[object Function]';
var genClass = '[object GeneratorFunction]';
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

var isCallable = function isCallable(value) {
	if (!value) { return false; }
	if (typeof value !== 'function' && typeof value !== 'object') { return false; }
	if (typeof value === 'function' && !value.prototype) { return true; }
	if (hasToStringTag) { return tryFunctionObject(value); }
	if (isES6ClassFn(value)) { return false; }
	var strClass = toStr$5.call(value);
	return strClass === fnClass || strClass === genClass;
};

// http://www.ecma-international.org/ecma-262/5.1/#sec-9.11

var IsCallable = isCallable;

var $TypeError$1 = GetIntrinsic('%TypeError%');





// https://www.ecma-international.org/ecma-262/6.0/#sec-call

var Call = function Call(F, V) {
	var args = arguments.length > 2 ? arguments[2] : [];
	if (!IsCallable(F)) {
		throw new $TypeError$1(objectInspect(F) + ' is not a function');
	}
	return F.apply(V, args);
};

// https://www.ecma-international.org/ecma-262/6.0/#sec-ispropertykey

var IsPropertyKey = function IsPropertyKey(argument) {
	return typeof argument === 'string' || typeof argument === 'symbol';
};

// https://www.ecma-international.org/ecma-262/5.1/#sec-8

var Type = function Type(x) {
	if (x === null) {
		return 'Null';
	}
	if (typeof x === 'undefined') {
		return 'Undefined';
	}
	if (typeof x === 'function' || typeof x === 'object') {
		return 'Object';
	}
	if (typeof x === 'number') {
		return 'Number';
	}
	if (typeof x === 'boolean') {
		return 'Boolean';
	}
	if (typeof x === 'string') {
		return 'String';
	}
};

// https://www.ecma-international.org/ecma-262/6.0/#sec-tostring

var Type$1 = function Type$1(x) {
	if (typeof x === 'symbol') {
		return 'Symbol';
	}
	return Type(x);
};

var $TypeError$2 = GetIntrinsic('%TypeError%');






/**
 * 7.3.1 Get (O, P) - https://ecma-international.org/ecma-262/6.0/#sec-get-o-p
 * 1. Assert: Type(O) is Object.
 * 2. Assert: IsPropertyKey(P) is true.
 * 3. Return O.[[Get]](P, O).
 */

var Get = function Get(O, P) {
	// 7.3.1.1
	if (Type$1(O) !== 'Object') {
		throw new $TypeError$2('Assertion failed: Type(O) is not Object');
	}
	// 7.3.1.2
	if (!IsPropertyKey(P)) {
		throw new $TypeError$2('Assertion failed: IsPropertyKey(P) is not true, got ' + objectInspect(P));
	}
	// 7.3.1.3
	return O[P];
};

var $Function = GetIntrinsic('%Function%');
var $apply = $Function.apply;
var $call = $Function.call;

var callBind = function callBind() {
	return functionBind.apply($call, arguments);
};

var apply = function applyBind() {
	return functionBind.apply($apply, arguments);
};
callBind.apply = apply;

var $indexOf = callBind(GetIntrinsic('String.prototype.indexOf'));

var callBound = function callBoundIntrinsic(name, allowMissing) {
	var intrinsic = GetIntrinsic(name, !!allowMissing);
	if (typeof intrinsic === 'function' && $indexOf(name, '.prototype.')) {
		return callBind(intrinsic);
	}
	return intrinsic;
};

var hasSymbols$3 = hasSymbols$1();



var $iterator = GetIntrinsic('%Symbol.iterator%', true);
var $stringSlice = callBound('String.prototype.slice');

var getIteratorMethod = function getIteratorMethod(ES, iterable) {
	var usingIterator;
	if (hasSymbols$3) {
		usingIterator = ES.GetMethod(iterable, $iterator);
	} else if (ES.IsArray(iterable)) {
		usingIterator = function () {
			var i = -1;
			var arr = this; // eslint-disable-line no-invalid-this
			return {
				next: function () {
					i += 1;
					return {
						done: i >= arr.length,
						value: arr[i]
					};
				}
			};
		};
	} else if (ES.Type(iterable) === 'String') {
		usingIterator = function () {
			var i = 0;
			return {
				next: function () {
					var nextIndex = ES.AdvanceStringIndex(iterable, i, true);
					var value = $stringSlice(iterable, i, nextIndex);
					i = nextIndex;
					return {
						done: nextIndex > iterable.length,
						value: value
					};
				}
			};
		};
	}
	return usingIterator;
};

var _isNaN = Number.isNaN || function isNaN(a) {
	return a !== a;
};

var $isNaN = Number.isNaN || function (a) { return a !== a; };

var _isFinite = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

var $Math = GetIntrinsic('%Math%');

var $floor = $Math.floor;
var $abs = $Math.abs;




// https://www.ecma-international.org/ecma-262/6.0/#sec-isinteger

var IsInteger = function IsInteger(argument) {
	if (typeof argument !== 'number' || _isNaN(argument) || !_isFinite(argument)) {
		return false;
	}
	var abs = $abs(argument);
	return $floor(abs) === abs;
};

var $Math$1 = GetIntrinsic('%Math%');
var $Number = GetIntrinsic('%Number%');

var maxSafeInteger = $Number.MAX_SAFE_INTEGER || $Math$1.pow(2, 53) - 1;

var $TypeError$3 = GetIntrinsic('%TypeError%');

var $charCodeAt = callBound('String.prototype.charCodeAt');

// https://ecma-international.org/ecma-262/6.0/#sec-advancestringindex

var AdvanceStringIndex = function AdvanceStringIndex(S, index, unicode) {
	if (Type$1(S) !== 'String') {
		throw new $TypeError$3('Assertion failed: `S` must be a String');
	}
	if (!IsInteger(index) || index < 0 || index > maxSafeInteger) {
		throw new $TypeError$3('Assertion failed: `length` must be an integer >= 0 and <= 2**53');
	}
	if (Type$1(unicode) !== 'Boolean') {
		throw new $TypeError$3('Assertion failed: `unicode` must be a Boolean');
	}
	if (!unicode) {
		return index + 1;
	}
	var length = S.length;
	if ((index + 1) >= length) {
		return index + 1;
	}

	var first = $charCodeAt(S, index);
	if (first < 0xD800 || first > 0xDBFF) {
		return index + 1;
	}

	var second = $charCodeAt(S, index + 1);
	if (second < 0xDC00 || second > 0xDFFF) {
		return index + 1;
	}

	return index + 2;
};

var $TypeError$4 = GetIntrinsic('%TypeError%');

// http://www.ecma-international.org/ecma-262/5.1/#sec-9.10

var CheckObjectCoercible = function CheckObjectCoercible(value, optMessage) {
	if (value == null) {
		throw new $TypeError$4(optMessage || ('Cannot call method on ' + value));
	}
	return value;
};

var RequireObjectCoercible = CheckObjectCoercible;

var $Object = GetIntrinsic('%Object%');



// https://www.ecma-international.org/ecma-262/6.0/#sec-toobject

var ToObject = function ToObject(value) {
	RequireObjectCoercible(value);
	return $Object(value);
};

var $TypeError$5 = GetIntrinsic('%TypeError%');




/**
 * 7.3.2 GetV (V, P)
 * 1. Assert: IsPropertyKey(P) is true.
 * 2. Let O be ToObject(V).
 * 3. ReturnIfAbrupt(O).
 * 4. Return O.[[Get]](P, V).
 */

var GetV = function GetV(V, P) {
	// 7.3.2.1
	if (!IsPropertyKey(P)) {
		throw new $TypeError$5('Assertion failed: IsPropertyKey(P) is not true');
	}

	// 7.3.2.2-3
	var O = ToObject(V);

	// 7.3.2.4
	return O[P];
};

var $TypeError$6 = GetIntrinsic('%TypeError%');





/**
 * 7.3.9 - https://ecma-international.org/ecma-262/6.0/#sec-getmethod
 * 1. Assert: IsPropertyKey(P) is true.
 * 2. Let func be GetV(O, P).
 * 3. ReturnIfAbrupt(func).
 * 4. If func is either undefined or null, return undefined.
 * 5. If IsCallable(func) is false, throw a TypeError exception.
 * 6. Return func.
 */

var GetMethod = function GetMethod(O, P) {
	// 7.3.9.1
	if (!IsPropertyKey(P)) {
		throw new $TypeError$6('Assertion failed: IsPropertyKey(P) is not true');
	}

	// 7.3.9.2
	var func = GetV(O, P);

	// 7.3.9.4
	if (func == null) {
		return void 0;
	}

	// 7.3.9.5
	if (!IsCallable(func)) {
		throw new $TypeError$6(P + 'is not a function');
	}

	// 7.3.9.6
	return func;
};

var $Array = GetIntrinsic('%Array%');

// eslint-disable-next-line global-require
var toStr$6 = !$Array.isArray && callBound('Object.prototype.toString');

// https://www.ecma-international.org/ecma-262/6.0/#sec-isarray

var IsArray = $Array.isArray || function IsArray(argument) {
	return toStr$6(argument) === '[object Array]';
};

var $TypeError$7 = GetIntrinsic('%TypeError%');








// https://ecma-international.org/ecma-262/6.0/#sec-getiterator

var GetIterator = function GetIterator(obj, method) {
	var actualMethod = method;
	if (arguments.length < 2) {
		actualMethod = getIteratorMethod(
			{
				AdvanceStringIndex: AdvanceStringIndex,
				GetMethod: GetMethod,
				IsArray: IsArray,
				Type: Type$1
			},
			obj
		);
	}
	var iterator = Call(actualMethod, obj);
	if (Type$1(iterator) !== 'Object') {
		throw new $TypeError$7('iterator must return an object');
	}

	return iterator;
};

var $TypeError$8 = GetIntrinsic('%TypeError%');






// https://ecma-international.org/ecma-262/6.0/#sec-iteratorclose

var IteratorClose = function IteratorClose(iterator, completion) {
	if (Type$1(iterator) !== 'Object') {
		throw new $TypeError$8('Assertion failed: Type(iterator) is not Object');
	}
	if (!IsCallable(completion)) {
		throw new $TypeError$8('Assertion failed: completion is not a thunk for a Completion Record');
	}
	var completionThunk = completion;

	var iteratorReturn = GetMethod(iterator, 'return');

	if (typeof iteratorReturn === 'undefined') {
		return completionThunk();
	}

	var completionRecord;
	try {
		var innerResult = Call(iteratorReturn, iterator, []);
	} catch (e) {
		// if we hit here, then "e" is the innerResult completion that needs re-throwing

		// if the completion is of type "throw", this will throw.
		completionThunk();
		completionThunk = null; // ensure it's not called twice.

		// if not, then return the innerResult completion
		throw e;
	}
	completionRecord = completionThunk(); // if innerResult worked, then throw if the completion does
	completionThunk = null; // ensure it's not called twice.

	if (Type$1(innerResult) !== 'Object') {
		throw new $TypeError$8('iterator .return must return an object');
	}

	return completionRecord;
};

// http://www.ecma-international.org/ecma-262/5.1/#sec-9.2

var ToBoolean = function ToBoolean(value) { return !!value; };

var $TypeError$9 = GetIntrinsic('%TypeError%');





// https://ecma-international.org/ecma-262/6.0/#sec-iteratorcomplete

var IteratorComplete = function IteratorComplete(iterResult) {
	if (Type$1(iterResult) !== 'Object') {
		throw new $TypeError$9('Assertion failed: Type(iterResult) is not Object');
	}
	return ToBoolean(Get(iterResult, 'done'));
};

var $TypeError$a = GetIntrinsic('%TypeError%');

var $arraySlice = callBound('Array.prototype.slice');





// https://ecma-international.org/ecma-262/6.0/#sec-invoke

var Invoke = function Invoke(O, P) {
	if (!IsPropertyKey(P)) {
		throw new $TypeError$a('P must be a Property Key');
	}
	var argumentsList = $arraySlice(arguments, 2);
	var func = GetV(O, P);
	return Call(func, O, argumentsList);
};

var $TypeError$b = GetIntrinsic('%TypeError%');




// https://ecma-international.org/ecma-262/6.0/#sec-iteratornext

var IteratorNext = function IteratorNext(iterator, value) {
	var result = Invoke(iterator, 'next', arguments.length < 2 ? [] : [value]);
	if (Type$1(result) !== 'Object') {
		throw new $TypeError$b('iterator next must return an object');
	}
	return result;
};

// https://ecma-international.org/ecma-262/6.0/#sec-iteratorstep

var IteratorStep = function IteratorStep(iterator) {
	var result = IteratorNext(iterator);
	var done = IteratorComplete(result);
	return done === true ? false : result;
};

var $TypeError$c = GetIntrinsic('%TypeError%');




// https://ecma-international.org/ecma-262/6.0/#sec-iteratorvalue

var IteratorValue = function IteratorValue(iterResult) {
	if (Type$1(iterResult) !== 'Object') {
		throw new $TypeError$c('Assertion failed: Type(iterResult) is not Object');
	}
	return Get(iterResult, 'value');
};

var $TypeError$d = GetIntrinsic('%TypeError%');










// https://tc39.es/ecma262/#sec-add-entries-from-iterable

var AddEntriesFromIterable = function AddEntriesFromIterable(target, iterable, adder) {
	if (!IsCallable(adder)) {
		throw new $TypeError$d('Assertion failed: `adder` is not callable');
	}
	if (iterable == null) {
		throw new $TypeError$d('Assertion failed: `iterable` is present, and not nullish');
	}
	var iteratorRecord = GetIterator(iterable);
	while (true) { // eslint-disable-line no-constant-condition
		var next = IteratorStep(iteratorRecord);
		if (!next) {
			return target;
		}
		var nextItem = IteratorValue(next);
		if (Type$1(nextItem) !== 'Object') {
			var error = new $TypeError$d('iterator next must return an Object, got ' + objectInspect(nextItem));
			return IteratorClose(
				iteratorRecord,
				function () { throw error; } // eslint-disable-line no-loop-func
			);
		}
		try {
			var k = Get(nextItem, '0');
			var v = Get(nextItem, '1');
			Call(adder, target, [k, v]);
		} catch (e) {
			return IteratorClose(
				iteratorRecord,
				function () { throw e; }
			);
		}
	}
};

var $defineProperty = GetIntrinsic('%Object.defineProperty%', true);

if ($defineProperty) {
	try {
		$defineProperty({}, 'a', { value: 1 });
	} catch (e) {
		// IE 8 has a broken defineProperty
		$defineProperty = null;
	}
}



var $isEnumerable = callBound('Object.prototype.propertyIsEnumerable');

// eslint-disable-next-line max-params
var DefineOwnProperty = function DefineOwnProperty(IsDataDescriptor, SameValue, FromPropertyDescriptor, O, P, desc) {
	if (!$defineProperty) {
		if (!IsDataDescriptor(desc)) {
			// ES3 does not support getters/setters
			return false;
		}
		if (!desc['[[Configurable]]'] || !desc['[[Writable]]']) {
			return false;
		}

		// fallback for ES3
		if (P in O && $isEnumerable(O, P) !== !!desc['[[Enumerable]]']) {
			// a non-enumerable existing property
			return false;
		}

		// property does not exist at all, or exists but is enumerable
		var V = desc['[[Value]]'];
		// eslint-disable-next-line no-param-reassign
		O[P] = V; // will use [[Define]]
		return SameValue(O[P], V);
	}
	$defineProperty(O, P, FromPropertyDescriptor(desc));
	return true;
};

var src = functionBind.call(Function.call, Object.prototype.hasOwnProperty);

var $TypeError$e = GetIntrinsic('%TypeError%');
var $SyntaxError = GetIntrinsic('%SyntaxError%');



var predicates = {
	// https://ecma-international.org/ecma-262/6.0/#sec-property-descriptor-specification-type
	'Property Descriptor': function isPropertyDescriptor(Type, Desc) {
		if (Type(Desc) !== 'Object') {
			return false;
		}
		var allowed = {
			'[[Configurable]]': true,
			'[[Enumerable]]': true,
			'[[Get]]': true,
			'[[Set]]': true,
			'[[Value]]': true,
			'[[Writable]]': true
		};

		for (var key in Desc) { // eslint-disable-line
			if (src(Desc, key) && !allowed[key]) {
				return false;
			}
		}

		var isData = src(Desc, '[[Value]]');
		var IsAccessor = src(Desc, '[[Get]]') || src(Desc, '[[Set]]');
		if (isData && IsAccessor) {
			throw new $TypeError$e('Property Descriptors may not be both accessor and data descriptors');
		}
		return true;
	}
};

var assertRecord = function assertRecord(Type, recordType, argumentName, value) {
	var predicate = predicates[recordType];
	if (typeof predicate !== 'function') {
		throw new $SyntaxError('unknown record type: ' + recordType);
	}
	if (!predicate(Type, value)) {
		throw new $TypeError$e(argumentName + ' must be a ' + recordType);
	}
};

// https://www.ecma-international.org/ecma-262/6.0/#sec-frompropertydescriptor

var FromPropertyDescriptor = function FromPropertyDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return Desc;
	}

	assertRecord(Type$1, 'Property Descriptor', 'Desc', Desc);

	var obj = {};
	if ('[[Value]]' in Desc) {
		obj.value = Desc['[[Value]]'];
	}
	if ('[[Writable]]' in Desc) {
		obj.writable = Desc['[[Writable]]'];
	}
	if ('[[Get]]' in Desc) {
		obj.get = Desc['[[Get]]'];
	}
	if ('[[Set]]' in Desc) {
		obj.set = Desc['[[Set]]'];
	}
	if ('[[Enumerable]]' in Desc) {
		obj.enumerable = Desc['[[Enumerable]]'];
	}
	if ('[[Configurable]]' in Desc) {
		obj.configurable = Desc['[[Configurable]]'];
	}
	return obj;
};

var $gOPD$1 = GetIntrinsic('%Object.getOwnPropertyDescriptor%');
if ($gOPD$1) {
	try {
		$gOPD$1([], 'length');
	} catch (e) {
		// IE 8 has a broken gOPD
		$gOPD$1 = null;
	}
}

var getOwnPropertyDescriptor = $gOPD$1;

var regexExec = RegExp.prototype.exec;
var gOPD = Object.getOwnPropertyDescriptor;

var tryRegexExecCall = function tryRegexExec(value) {
	try {
		var lastIndex = value.lastIndex;
		value.lastIndex = 0; // eslint-disable-line no-param-reassign

		regexExec.call(value);
		return true;
	} catch (e) {
		return false;
	} finally {
		value.lastIndex = lastIndex; // eslint-disable-line no-param-reassign
	}
};
var toStr$7 = Object.prototype.toString;
var regexClass = '[object RegExp]';
var hasToStringTag$1 = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

var isRegex = function isRegex(value) {
	if (!value || typeof value !== 'object') {
		return false;
	}
	if (!hasToStringTag$1) {
		return toStr$7.call(value) === regexClass;
	}

	var descriptor = gOPD(value, 'lastIndex');
	var hasLastIndexDataProperty = descriptor && src(descriptor, 'value');
	if (!hasLastIndexDataProperty) {
		return false;
	}

	return tryRegexExecCall(value);
};

var $match = GetIntrinsic('%Symbol.match%', true);





// https://ecma-international.org/ecma-262/6.0/#sec-isregexp

var IsRegExp = function IsRegExp(argument) {
	if (!argument || typeof argument !== 'object') {
		return false;
	}
	if ($match) {
		var isRegExp = argument[$match];
		if (typeof isRegExp !== 'undefined') {
			return ToBoolean(isRegExp);
		}
	}
	return isRegex(argument);
};

var $TypeError$f = GetIntrinsic('%TypeError%');





// https://ecma-international.org/ecma-262/5.1/#sec-8.10.5

var ToPropertyDescriptor = function ToPropertyDescriptor(Obj) {
	if (Type$1(Obj) !== 'Object') {
		throw new $TypeError$f('ToPropertyDescriptor requires an object');
	}

	var desc = {};
	if (src(Obj, 'enumerable')) {
		desc['[[Enumerable]]'] = ToBoolean(Obj.enumerable);
	}
	if (src(Obj, 'configurable')) {
		desc['[[Configurable]]'] = ToBoolean(Obj.configurable);
	}
	if (src(Obj, 'value')) {
		desc['[[Value]]'] = Obj.value;
	}
	if (src(Obj, 'writable')) {
		desc['[[Writable]]'] = ToBoolean(Obj.writable);
	}
	if (src(Obj, 'get')) {
		var getter = Obj.get;
		if (typeof getter !== 'undefined' && !IsCallable(getter)) {
			throw new TypeError('getter must be a function');
		}
		desc['[[Get]]'] = getter;
	}
	if (src(Obj, 'set')) {
		var setter = Obj.set;
		if (typeof setter !== 'undefined' && !IsCallable(setter)) {
			throw new $TypeError$f('setter must be a function');
		}
		desc['[[Set]]'] = setter;
	}

	if ((src(desc, '[[Get]]') || src(desc, '[[Set]]')) && (src(desc, '[[Value]]') || src(desc, '[[Writable]]'))) {
		throw new $TypeError$f('Invalid property descriptor. Cannot both specify accessors and a value or writable attribute');
	}
	return desc;
};

var $TypeError$g = GetIntrinsic('%TypeError%');



var $isEnumerable$1 = callBound('Object.prototype.propertyIsEnumerable');









// https://www.ecma-international.org/ecma-262/6.0/#sec-ordinarygetownproperty

var OrdinaryGetOwnProperty = function OrdinaryGetOwnProperty(O, P) {
	if (Type$1(O) !== 'Object') {
		throw new $TypeError$g('Assertion failed: O must be an Object');
	}
	if (!IsPropertyKey(P)) {
		throw new $TypeError$g('Assertion failed: P must be a Property Key');
	}
	if (!src(O, P)) {
		return void 0;
	}
	if (!getOwnPropertyDescriptor) {
		// ES3 / IE 8 fallback
		var arrayLength = IsArray(O) && P === 'length';
		var regexLastIndex = IsRegExp(O) && P === 'lastIndex';
		return {
			'[[Configurable]]': !(arrayLength || regexLastIndex),
			'[[Enumerable]]': $isEnumerable$1(O, P),
			'[[Value]]': O[P],
			'[[Writable]]': true
		};
	}
	return ToPropertyDescriptor(getOwnPropertyDescriptor(O, P));
};

// https://www.ecma-international.org/ecma-262/6.0/#sec-isdatadescriptor

var IsDataDescriptor = function IsDataDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return false;
	}

	assertRecord(Type$1, 'Property Descriptor', 'Desc', Desc);

	if (!src(Desc, '[[Value]]') && !src(Desc, '[[Writable]]')) {
		return false;
	}

	return true;
};

var isPrimitive = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

var $Object$1 = GetIntrinsic('%Object%');



var $preventExtensions = $Object$1.preventExtensions;
var $isExtensible = $Object$1.isExtensible;

// https://www.ecma-international.org/ecma-262/6.0/#sec-isextensible-o

var IsExtensible = $preventExtensions
	? function IsExtensible(obj) {
		return !isPrimitive(obj) && $isExtensible(obj);
	}
	: function IsExtensible(obj) {
		return !isPrimitive(obj);
	};

// http://www.ecma-international.org/ecma-262/5.1/#sec-9.12

var SameValue = function SameValue(x, y) {
	if (x === y) { // 0 === -0, but they are not identical.
		if (x === 0) { return 1 / x === 1 / y; }
		return true;
	}
	return _isNaN(x) && _isNaN(y);
};

var $TypeError$h = GetIntrinsic('%TypeError%');











// https://www.ecma-international.org/ecma-262/6.0/#sec-createdataproperty

var CreateDataProperty = function CreateDataProperty(O, P, V) {
	if (Type$1(O) !== 'Object') {
		throw new $TypeError$h('Assertion failed: Type(O) is not Object');
	}
	if (!IsPropertyKey(P)) {
		throw new $TypeError$h('Assertion failed: IsPropertyKey(P) is not true');
	}
	var oldDesc = OrdinaryGetOwnProperty(O, P);
	var extensible = !oldDesc || IsExtensible(O);
	var immutable = oldDesc && (!oldDesc['[[Writable]]'] || !oldDesc['[[Configurable]]']);
	if (immutable || !extensible) {
		return false;
	}
	return DefineOwnProperty(
		IsDataDescriptor,
		SameValue,
		FromPropertyDescriptor,
		O,
		P,
		{
			'[[Configurable]]': true,
			'[[Enumerable]]': true,
			'[[Value]]': V,
			'[[Writable]]': true
		}
	);
};

var $TypeError$i = GetIntrinsic('%TypeError%');





// // https://ecma-international.org/ecma-262/6.0/#sec-createdatapropertyorthrow

var CreateDataPropertyOrThrow = function CreateDataPropertyOrThrow(O, P, V) {
	if (Type$1(O) !== 'Object') {
		throw new $TypeError$i('Assertion failed: Type(O) is not Object');
	}
	if (!IsPropertyKey(P)) {
		throw new $TypeError$i('Assertion failed: IsPropertyKey(P) is not true');
	}
	var success = CreateDataProperty(O, P, V);
	if (!success) {
		throw new $TypeError$i('unable to create data property');
	}
	return success;
};

var isPrimitive$1 = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

var getDay = Date.prototype.getDay;
var tryDateObject = function tryDateGetDayCall(value) {
	try {
		getDay.call(value);
		return true;
	} catch (e) {
		return false;
	}
};

var toStr$8 = Object.prototype.toString;
var dateClass = '[object Date]';
var hasToStringTag$2 = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

var isDateObject = function isDateObject(value) {
	if (typeof value !== 'object' || value === null) {
		return false;
	}
	return hasToStringTag$2 ? tryDateObject(value) : toStr$8.call(value) === dateClass;
};

var isSymbol$1 = createCommonjsModule(function (module) {

var toStr = Object.prototype.toString;
var hasSymbols = hasSymbols$1();

if (hasSymbols) {
	var symToStr = Symbol.prototype.toString;
	var symStringRegex = /^Symbol\(.*\)$/;
	var isSymbolObject = function isRealSymbolObject(value) {
		if (typeof value.valueOf() !== 'symbol') {
			return false;
		}
		return symStringRegex.test(symToStr.call(value));
	};

	module.exports = function isSymbol(value) {
		if (typeof value === 'symbol') {
			return true;
		}
		if (toStr.call(value) !== '[object Symbol]') {
			return false;
		}
		try {
			return isSymbolObject(value);
		} catch (e) {
			return false;
		}
	};
} else {

	module.exports = function isSymbol(value) {
		// this environment does not support Symbols.
		return false ;
	};
}
});

var hasSymbols$4 = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol';






var ordinaryToPrimitive = function OrdinaryToPrimitive(O, hint) {
	if (typeof O === 'undefined' || O === null) {
		throw new TypeError('Cannot call method on ' + O);
	}
	if (typeof hint !== 'string' || (hint !== 'number' && hint !== 'string')) {
		throw new TypeError('hint must be "string" or "number"');
	}
	var methodNames = hint === 'string' ? ['toString', 'valueOf'] : ['valueOf', 'toString'];
	var method, result, i;
	for (i = 0; i < methodNames.length; ++i) {
		method = O[methodNames[i]];
		if (isCallable(method)) {
			result = method.call(O);
			if (isPrimitive$1(result)) {
				return result;
			}
		}
	}
	throw new TypeError('No default value');
};

var GetMethod$1 = function GetMethod(O, P) {
	var func = O[P];
	if (func !== null && typeof func !== 'undefined') {
		if (!isCallable(func)) {
			throw new TypeError(func + ' returned for property ' + P + ' of object ' + O + ' is not a function');
		}
		return func;
	}
	return void 0;
};

// http://www.ecma-international.org/ecma-262/6.0/#sec-toprimitive
var es2015 = function ToPrimitive(input) {
	if (isPrimitive$1(input)) {
		return input;
	}
	var hint = 'default';
	if (arguments.length > 1) {
		if (arguments[1] === String) {
			hint = 'string';
		} else if (arguments[1] === Number) {
			hint = 'number';
		}
	}

	var exoticToPrim;
	if (hasSymbols$4) {
		if (Symbol.toPrimitive) {
			exoticToPrim = GetMethod$1(input, Symbol.toPrimitive);
		} else if (isSymbol$1(input)) {
			exoticToPrim = Symbol.prototype.valueOf;
		}
	}
	if (typeof exoticToPrim !== 'undefined') {
		var result = exoticToPrim.call(input, hint);
		if (isPrimitive$1(result)) {
			return result;
		}
		throw new TypeError('unable to convert exotic object to primitive');
	}
	if (hint === 'default' && (isDateObject(input) || isSymbol$1(input))) {
		hint = 'string';
	}
	return ordinaryToPrimitive(input, hint === 'default' ? 'number' : hint);
};

// https://www.ecma-international.org/ecma-262/6.0/#sec-toprimitive

var ToPrimitive = function ToPrimitive(input) {
	if (arguments.length > 1) {
		return es2015(input, arguments[1]);
	}
	return es2015(input);
};

var $String = GetIntrinsic('%String%');
var $TypeError$j = GetIntrinsic('%TypeError%');

// https://www.ecma-international.org/ecma-262/6.0/#sec-tostring

var ToString = function ToString(argument) {
	if (typeof argument === 'symbol') {
		throw new $TypeError$j('Cannot convert a Symbol value to a string');
	}
	return $String(argument);
};

var $String$1 = GetIntrinsic('%String%');




// https://www.ecma-international.org/ecma-262/6.0/#sec-topropertykey

var ToPropertyKey = function ToPropertyKey(argument) {
	var key = ToPrimitive(argument, $String$1);
	return typeof key === 'symbol' ? key : ToString(key);
};

var adder = function addDataProperty(key, value) {
	var O = this; // eslint-disable-line no-invalid-this
	var propertyKey = ToPropertyKey(key);
	CreateDataPropertyOrThrow(O, propertyKey, value);
};

var legacyAssign = function assign(obj, entries) {
	for (var i = 0; i < entries.length; ++i) {
		var entry = entries[i];
		if (Type$1(entry) !== 'Object') {
			throw new TypeError('iterator returned a non-object; entry expected');
		}

		var key = Get(entry, '0');
		var value = Get(entry, '1');
		var propertyKey = ToPropertyKey(key);
		CreateDataPropertyOrThrow(obj, propertyKey, value);
	}
};

var hasSymbols$5 = typeof Symbol === 'function' && typeof Symbol('foo') === 'symbol';

var implementation$2 = function fromEntries(iterable) {
	RequireObjectCoercible(iterable);

	var obj = {};

	// this part isn't in the spec, it's for a reasonable fallback for pre-ES6 environments
	if (!hasSymbols$5) {
		if (!IsArray(iterable)) {
			throw new TypeError('this environment lacks native Symbols, and can not support non-Array iterables');
		}
		legacyAssign(obj, iterable);
		return obj;
	}

	return AddEntriesFromIterable(obj, iterable, adder);
};

var polyfill = function getPolyfill() {
	return typeof Object.fromEntries === 'function' ? Object.fromEntries : implementation$2;
};

var shim = function shimEntries() {
	var polyfill$1 = polyfill();
	defineProperties_1(Object, { fromEntries: polyfill$1 }, {
		fromEntries: function testEntries() {
			return Object.fromEntries !== polyfill$1;
		}
	});
	return polyfill$1;
};

var polyfill$1 = functionBind.call(polyfill());

defineProperties_1(polyfill$1, {
	getPolyfill: polyfill,
	implementation: implementation$2,
	shim: shim
});

var object_fromentries = polyfill$1;

var semver = createCommonjsModule(function (module, exports) {
exports = module.exports = SemVer;

var debug;
/* istanbul ignore next */
if (typeof process === 'object' &&
    process.env &&
    ({}).NODE_DEBUG &&
    /\bsemver\b/i.test(({}).NODE_DEBUG)) {
  debug = function () {
    var args = Array.prototype.slice.call(arguments, 0);
    args.unshift('SEMVER');
    console.log.apply(console, args);
  };
} else {
  debug = function () {};
}

// Note: this is the semver.org version of the spec that it implements
// Not necessarily the package version of this code.
exports.SEMVER_SPEC_VERSION = '2.0.0';

var MAX_LENGTH = 256;
var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER ||
  /* istanbul ignore next */ 9007199254740991;

// Max safe segment length for coercion.
var MAX_SAFE_COMPONENT_LENGTH = 16;

// The actual regexps go on exports.re
var re = exports.re = [];
var src = exports.src = [];
var t = exports.tokens = {};
var R = 0;

function tok (n) {
  t[n] = R++;
}

// The following Regular Expressions can be used for tokenizing,
// validating, and parsing SemVer version strings.

// ## Numeric Identifier
// A single `0`, or a non-zero digit followed by zero or more digits.

tok('NUMERICIDENTIFIER');
src[t.NUMERICIDENTIFIER] = '0|[1-9]\\d*';
tok('NUMERICIDENTIFIERLOOSE');
src[t.NUMERICIDENTIFIERLOOSE] = '[0-9]+';

// ## Non-numeric Identifier
// Zero or more digits, followed by a letter or hyphen, and then zero or
// more letters, digits, or hyphens.

tok('NONNUMERICIDENTIFIER');
src[t.NONNUMERICIDENTIFIER] = '\\d*[a-zA-Z-][a-zA-Z0-9-]*';

// ## Main Version
// Three dot-separated numeric identifiers.

tok('MAINVERSION');
src[t.MAINVERSION] = '(' + src[t.NUMERICIDENTIFIER] + ')\\.' +
                   '(' + src[t.NUMERICIDENTIFIER] + ')\\.' +
                   '(' + src[t.NUMERICIDENTIFIER] + ')';

tok('MAINVERSIONLOOSE');
src[t.MAINVERSIONLOOSE] = '(' + src[t.NUMERICIDENTIFIERLOOSE] + ')\\.' +
                        '(' + src[t.NUMERICIDENTIFIERLOOSE] + ')\\.' +
                        '(' + src[t.NUMERICIDENTIFIERLOOSE] + ')';

// ## Pre-release Version Identifier
// A numeric identifier, or a non-numeric identifier.

tok('PRERELEASEIDENTIFIER');
src[t.PRERELEASEIDENTIFIER] = '(?:' + src[t.NUMERICIDENTIFIER] +
                            '|' + src[t.NONNUMERICIDENTIFIER] + ')';

tok('PRERELEASEIDENTIFIERLOOSE');
src[t.PRERELEASEIDENTIFIERLOOSE] = '(?:' + src[t.NUMERICIDENTIFIERLOOSE] +
                                 '|' + src[t.NONNUMERICIDENTIFIER] + ')';

// ## Pre-release Version
// Hyphen, followed by one or more dot-separated pre-release version
// identifiers.

tok('PRERELEASE');
src[t.PRERELEASE] = '(?:-(' + src[t.PRERELEASEIDENTIFIER] +
                  '(?:\\.' + src[t.PRERELEASEIDENTIFIER] + ')*))';

tok('PRERELEASELOOSE');
src[t.PRERELEASELOOSE] = '(?:-?(' + src[t.PRERELEASEIDENTIFIERLOOSE] +
                       '(?:\\.' + src[t.PRERELEASEIDENTIFIERLOOSE] + ')*))';

// ## Build Metadata Identifier
// Any combination of digits, letters, or hyphens.

tok('BUILDIDENTIFIER');
src[t.BUILDIDENTIFIER] = '[0-9A-Za-z-]+';

// ## Build Metadata
// Plus sign, followed by one or more period-separated build metadata
// identifiers.

tok('BUILD');
src[t.BUILD] = '(?:\\+(' + src[t.BUILDIDENTIFIER] +
             '(?:\\.' + src[t.BUILDIDENTIFIER] + ')*))';

// ## Full Version String
// A main version, followed optionally by a pre-release version and
// build metadata.

// Note that the only major, minor, patch, and pre-release sections of
// the version string are capturing groups.  The build metadata is not a
// capturing group, because it should not ever be used in version
// comparison.

tok('FULL');
tok('FULLPLAIN');
src[t.FULLPLAIN] = 'v?' + src[t.MAINVERSION] +
                  src[t.PRERELEASE] + '?' +
                  src[t.BUILD] + '?';

src[t.FULL] = '^' + src[t.FULLPLAIN] + '$';

// like full, but allows v1.2.3 and =1.2.3, which people do sometimes.
// also, 1.0.0alpha1 (prerelease without the hyphen) which is pretty
// common in the npm registry.
tok('LOOSEPLAIN');
src[t.LOOSEPLAIN] = '[v=\\s]*' + src[t.MAINVERSIONLOOSE] +
                  src[t.PRERELEASELOOSE] + '?' +
                  src[t.BUILD] + '?';

tok('LOOSE');
src[t.LOOSE] = '^' + src[t.LOOSEPLAIN] + '$';

tok('GTLT');
src[t.GTLT] = '((?:<|>)?=?)';

// Something like "2.*" or "1.2.x".
// Note that "x.x" is a valid xRange identifer, meaning "any version"
// Only the first item is strictly required.
tok('XRANGEIDENTIFIERLOOSE');
src[t.XRANGEIDENTIFIERLOOSE] = src[t.NUMERICIDENTIFIERLOOSE] + '|x|X|\\*';
tok('XRANGEIDENTIFIER');
src[t.XRANGEIDENTIFIER] = src[t.NUMERICIDENTIFIER] + '|x|X|\\*';

tok('XRANGEPLAIN');
src[t.XRANGEPLAIN] = '[v=\\s]*(' + src[t.XRANGEIDENTIFIER] + ')' +
                   '(?:\\.(' + src[t.XRANGEIDENTIFIER] + ')' +
                   '(?:\\.(' + src[t.XRANGEIDENTIFIER] + ')' +
                   '(?:' + src[t.PRERELEASE] + ')?' +
                   src[t.BUILD] + '?' +
                   ')?)?';

tok('XRANGEPLAINLOOSE');
src[t.XRANGEPLAINLOOSE] = '[v=\\s]*(' + src[t.XRANGEIDENTIFIERLOOSE] + ')' +
                        '(?:\\.(' + src[t.XRANGEIDENTIFIERLOOSE] + ')' +
                        '(?:\\.(' + src[t.XRANGEIDENTIFIERLOOSE] + ')' +
                        '(?:' + src[t.PRERELEASELOOSE] + ')?' +
                        src[t.BUILD] + '?' +
                        ')?)?';

tok('XRANGE');
src[t.XRANGE] = '^' + src[t.GTLT] + '\\s*' + src[t.XRANGEPLAIN] + '$';
tok('XRANGELOOSE');
src[t.XRANGELOOSE] = '^' + src[t.GTLT] + '\\s*' + src[t.XRANGEPLAINLOOSE] + '$';

// Coercion.
// Extract anything that could conceivably be a part of a valid semver
tok('COERCE');
src[t.COERCE] = '(^|[^\\d])' +
              '(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '})' +
              '(?:\\.(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '}))?' +
              '(?:\\.(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '}))?' +
              '(?:$|[^\\d])';
tok('COERCERTL');
re[t.COERCERTL] = new RegExp(src[t.COERCE], 'g');

// Tilde ranges.
// Meaning is "reasonably at or greater than"
tok('LONETILDE');
src[t.LONETILDE] = '(?:~>?)';

tok('TILDETRIM');
src[t.TILDETRIM] = '(\\s*)' + src[t.LONETILDE] + '\\s+';
re[t.TILDETRIM] = new RegExp(src[t.TILDETRIM], 'g');
var tildeTrimReplace = '$1~';

tok('TILDE');
src[t.TILDE] = '^' + src[t.LONETILDE] + src[t.XRANGEPLAIN] + '$';
tok('TILDELOOSE');
src[t.TILDELOOSE] = '^' + src[t.LONETILDE] + src[t.XRANGEPLAINLOOSE] + '$';

// Caret ranges.
// Meaning is "at least and backwards compatible with"
tok('LONECARET');
src[t.LONECARET] = '(?:\\^)';

tok('CARETTRIM');
src[t.CARETTRIM] = '(\\s*)' + src[t.LONECARET] + '\\s+';
re[t.CARETTRIM] = new RegExp(src[t.CARETTRIM], 'g');
var caretTrimReplace = '$1^';

tok('CARET');
src[t.CARET] = '^' + src[t.LONECARET] + src[t.XRANGEPLAIN] + '$';
tok('CARETLOOSE');
src[t.CARETLOOSE] = '^' + src[t.LONECARET] + src[t.XRANGEPLAINLOOSE] + '$';

// A simple gt/lt/eq thing, or just "" to indicate "any version"
tok('COMPARATORLOOSE');
src[t.COMPARATORLOOSE] = '^' + src[t.GTLT] + '\\s*(' + src[t.LOOSEPLAIN] + ')$|^$';
tok('COMPARATOR');
src[t.COMPARATOR] = '^' + src[t.GTLT] + '\\s*(' + src[t.FULLPLAIN] + ')$|^$';

// An expression to strip any whitespace between the gtlt and the thing
// it modifies, so that `> 1.2.3` ==> `>1.2.3`
tok('COMPARATORTRIM');
src[t.COMPARATORTRIM] = '(\\s*)' + src[t.GTLT] +
                      '\\s*(' + src[t.LOOSEPLAIN] + '|' + src[t.XRANGEPLAIN] + ')';

// this one has to use the /g flag
re[t.COMPARATORTRIM] = new RegExp(src[t.COMPARATORTRIM], 'g');
var comparatorTrimReplace = '$1$2$3';

// Something like `1.2.3 - 1.2.4`
// Note that these all use the loose form, because they'll be
// checked against either the strict or loose comparator form
// later.
tok('HYPHENRANGE');
src[t.HYPHENRANGE] = '^\\s*(' + src[t.XRANGEPLAIN] + ')' +
                   '\\s+-\\s+' +
                   '(' + src[t.XRANGEPLAIN] + ')' +
                   '\\s*$';

tok('HYPHENRANGELOOSE');
src[t.HYPHENRANGELOOSE] = '^\\s*(' + src[t.XRANGEPLAINLOOSE] + ')' +
                        '\\s+-\\s+' +
                        '(' + src[t.XRANGEPLAINLOOSE] + ')' +
                        '\\s*$';

// Star ranges basically just allow anything at all.
tok('STAR');
src[t.STAR] = '(<|>)?=?\\s*\\*';

// Compile to actual regexp objects.
// All are flag-free, unless they were created above with a flag.
for (var i = 0; i < R; i++) {
  debug(i, src[i]);
  if (!re[i]) {
    re[i] = new RegExp(src[i]);
  }
}

exports.parse = parse;
function parse (version, options) {
  if (!options || typeof options !== 'object') {
    options = {
      loose: !!options,
      includePrerelease: false
    };
  }

  if (version instanceof SemVer) {
    return version
  }

  if (typeof version !== 'string') {
    return null
  }

  if (version.length > MAX_LENGTH) {
    return null
  }

  var r = options.loose ? re[t.LOOSE] : re[t.FULL];
  if (!r.test(version)) {
    return null
  }

  try {
    return new SemVer(version, options)
  } catch (er) {
    return null
  }
}

exports.valid = valid;
function valid (version, options) {
  var v = parse(version, options);
  return v ? v.version : null
}

exports.clean = clean;
function clean (version, options) {
  var s = parse(version.trim().replace(/^[=v]+/, ''), options);
  return s ? s.version : null
}

exports.SemVer = SemVer;

function SemVer (version, options) {
  if (!options || typeof options !== 'object') {
    options = {
      loose: !!options,
      includePrerelease: false
    };
  }
  if (version instanceof SemVer) {
    if (version.loose === options.loose) {
      return version
    } else {
      version = version.version;
    }
  } else if (typeof version !== 'string') {
    throw new TypeError('Invalid Version: ' + version)
  }

  if (version.length > MAX_LENGTH) {
    throw new TypeError('version is longer than ' + MAX_LENGTH + ' characters')
  }

  if (!(this instanceof SemVer)) {
    return new SemVer(version, options)
  }

  debug('SemVer', version, options);
  this.options = options;
  this.loose = !!options.loose;

  var m = version.trim().match(options.loose ? re[t.LOOSE] : re[t.FULL]);

  if (!m) {
    throw new TypeError('Invalid Version: ' + version)
  }

  this.raw = version;

  // these are actually numbers
  this.major = +m[1];
  this.minor = +m[2];
  this.patch = +m[3];

  if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
    throw new TypeError('Invalid major version')
  }

  if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
    throw new TypeError('Invalid minor version')
  }

  if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
    throw new TypeError('Invalid patch version')
  }

  // numberify any prerelease numeric ids
  if (!m[4]) {
    this.prerelease = [];
  } else {
    this.prerelease = m[4].split('.').map(function (id) {
      if (/^[0-9]+$/.test(id)) {
        var num = +id;
        if (num >= 0 && num < MAX_SAFE_INTEGER) {
          return num
        }
      }
      return id
    });
  }

  this.build = m[5] ? m[5].split('.') : [];
  this.format();
}

SemVer.prototype.format = function () {
  this.version = this.major + '.' + this.minor + '.' + this.patch;
  if (this.prerelease.length) {
    this.version += '-' + this.prerelease.join('.');
  }
  return this.version
};

SemVer.prototype.toString = function () {
  return this.version
};

SemVer.prototype.compare = function (other) {
  debug('SemVer.compare', this.version, this.options, other);
  if (!(other instanceof SemVer)) {
    other = new SemVer(other, this.options);
  }

  return this.compareMain(other) || this.comparePre(other)
};

SemVer.prototype.compareMain = function (other) {
  if (!(other instanceof SemVer)) {
    other = new SemVer(other, this.options);
  }

  return compareIdentifiers(this.major, other.major) ||
         compareIdentifiers(this.minor, other.minor) ||
         compareIdentifiers(this.patch, other.patch)
};

SemVer.prototype.comparePre = function (other) {
  if (!(other instanceof SemVer)) {
    other = new SemVer(other, this.options);
  }

  // NOT having a prerelease is > having one
  if (this.prerelease.length && !other.prerelease.length) {
    return -1
  } else if (!this.prerelease.length && other.prerelease.length) {
    return 1
  } else if (!this.prerelease.length && !other.prerelease.length) {
    return 0
  }

  var i = 0;
  do {
    var a = this.prerelease[i];
    var b = other.prerelease[i];
    debug('prerelease compare', i, a, b);
    if (a === undefined && b === undefined) {
      return 0
    } else if (b === undefined) {
      return 1
    } else if (a === undefined) {
      return -1
    } else if (a === b) {
      continue
    } else {
      return compareIdentifiers(a, b)
    }
  } while (++i)
};

SemVer.prototype.compareBuild = function (other) {
  if (!(other instanceof SemVer)) {
    other = new SemVer(other, this.options);
  }

  var i = 0;
  do {
    var a = this.build[i];
    var b = other.build[i];
    debug('prerelease compare', i, a, b);
    if (a === undefined && b === undefined) {
      return 0
    } else if (b === undefined) {
      return 1
    } else if (a === undefined) {
      return -1
    } else if (a === b) {
      continue
    } else {
      return compareIdentifiers(a, b)
    }
  } while (++i)
};

// preminor will bump the version up to the next minor release, and immediately
// down to pre-release. premajor and prepatch work the same way.
SemVer.prototype.inc = function (release, identifier) {
  switch (release) {
    case 'premajor':
      this.prerelease.length = 0;
      this.patch = 0;
      this.minor = 0;
      this.major++;
      this.inc('pre', identifier);
      break
    case 'preminor':
      this.prerelease.length = 0;
      this.patch = 0;
      this.minor++;
      this.inc('pre', identifier);
      break
    case 'prepatch':
      // If this is already a prerelease, it will bump to the next version
      // drop any prereleases that might already exist, since they are not
      // relevant at this point.
      this.prerelease.length = 0;
      this.inc('patch', identifier);
      this.inc('pre', identifier);
      break
    // If the input is a non-prerelease version, this acts the same as
    // prepatch.
    case 'prerelease':
      if (this.prerelease.length === 0) {
        this.inc('patch', identifier);
      }
      this.inc('pre', identifier);
      break

    case 'major':
      // If this is a pre-major version, bump up to the same major version.
      // Otherwise increment major.
      // 1.0.0-5 bumps to 1.0.0
      // 1.1.0 bumps to 2.0.0
      if (this.minor !== 0 ||
          this.patch !== 0 ||
          this.prerelease.length === 0) {
        this.major++;
      }
      this.minor = 0;
      this.patch = 0;
      this.prerelease = [];
      break
    case 'minor':
      // If this is a pre-minor version, bump up to the same minor version.
      // Otherwise increment minor.
      // 1.2.0-5 bumps to 1.2.0
      // 1.2.1 bumps to 1.3.0
      if (this.patch !== 0 || this.prerelease.length === 0) {
        this.minor++;
      }
      this.patch = 0;
      this.prerelease = [];
      break
    case 'patch':
      // If this is not a pre-release version, it will increment the patch.
      // If it is a pre-release it will bump up to the same patch version.
      // 1.2.0-5 patches to 1.2.0
      // 1.2.0 patches to 1.2.1
      if (this.prerelease.length === 0) {
        this.patch++;
      }
      this.prerelease = [];
      break
    // This probably shouldn't be used publicly.
    // 1.0.0 "pre" would become 1.0.0-0 which is the wrong direction.
    case 'pre':
      if (this.prerelease.length === 0) {
        this.prerelease = [0];
      } else {
        var i = this.prerelease.length;
        while (--i >= 0) {
          if (typeof this.prerelease[i] === 'number') {
            this.prerelease[i]++;
            i = -2;
          }
        }
        if (i === -1) {
          // didn't increment anything
          this.prerelease.push(0);
        }
      }
      if (identifier) {
        // 1.2.0-beta.1 bumps to 1.2.0-beta.2,
        // 1.2.0-beta.fooblz or 1.2.0-beta bumps to 1.2.0-beta.0
        if (this.prerelease[0] === identifier) {
          if (isNaN(this.prerelease[1])) {
            this.prerelease = [identifier, 0];
          }
        } else {
          this.prerelease = [identifier, 0];
        }
      }
      break

    default:
      throw new Error('invalid increment argument: ' + release)
  }
  this.format();
  this.raw = this.version;
  return this
};

exports.inc = inc;
function inc (version, release, loose, identifier) {
  if (typeof (loose) === 'string') {
    identifier = loose;
    loose = undefined;
  }

  try {
    return new SemVer(version, loose).inc(release, identifier).version
  } catch (er) {
    return null
  }
}

exports.diff = diff;
function diff (version1, version2) {
  if (eq(version1, version2)) {
    return null
  } else {
    var v1 = parse(version1);
    var v2 = parse(version2);
    var prefix = '';
    if (v1.prerelease.length || v2.prerelease.length) {
      prefix = 'pre';
      var defaultResult = 'prerelease';
    }
    for (var key in v1) {
      if (key === 'major' || key === 'minor' || key === 'patch') {
        if (v1[key] !== v2[key]) {
          return prefix + key
        }
      }
    }
    return defaultResult // may be undefined
  }
}

exports.compareIdentifiers = compareIdentifiers;

var numeric = /^[0-9]+$/;
function compareIdentifiers (a, b) {
  var anum = numeric.test(a);
  var bnum = numeric.test(b);

  if (anum && bnum) {
    a = +a;
    b = +b;
  }

  return a === b ? 0
    : (anum && !bnum) ? -1
    : (bnum && !anum) ? 1
    : a < b ? -1
    : 1
}

exports.rcompareIdentifiers = rcompareIdentifiers;
function rcompareIdentifiers (a, b) {
  return compareIdentifiers(b, a)
}

exports.major = major;
function major (a, loose) {
  return new SemVer(a, loose).major
}

exports.minor = minor;
function minor (a, loose) {
  return new SemVer(a, loose).minor
}

exports.patch = patch;
function patch (a, loose) {
  return new SemVer(a, loose).patch
}

exports.compare = compare;
function compare (a, b, loose) {
  return new SemVer(a, loose).compare(new SemVer(b, loose))
}

exports.compareLoose = compareLoose;
function compareLoose (a, b) {
  return compare(a, b, true)
}

exports.compareBuild = compareBuild;
function compareBuild (a, b, loose) {
  var versionA = new SemVer(a, loose);
  var versionB = new SemVer(b, loose);
  return versionA.compare(versionB) || versionA.compareBuild(versionB)
}

exports.rcompare = rcompare;
function rcompare (a, b, loose) {
  return compare(b, a, loose)
}

exports.sort = sort;
function sort (list, loose) {
  return list.sort(function (a, b) {
    return exports.compareBuild(a, b, loose)
  })
}

exports.rsort = rsort;
function rsort (list, loose) {
  return list.sort(function (a, b) {
    return exports.compareBuild(b, a, loose)
  })
}

exports.gt = gt;
function gt (a, b, loose) {
  return compare(a, b, loose) > 0
}

exports.lt = lt;
function lt (a, b, loose) {
  return compare(a, b, loose) < 0
}

exports.eq = eq;
function eq (a, b, loose) {
  return compare(a, b, loose) === 0
}

exports.neq = neq;
function neq (a, b, loose) {
  return compare(a, b, loose) !== 0
}

exports.gte = gte;
function gte (a, b, loose) {
  return compare(a, b, loose) >= 0
}

exports.lte = lte;
function lte (a, b, loose) {
  return compare(a, b, loose) <= 0
}

exports.cmp = cmp;
function cmp (a, op, b, loose) {
  switch (op) {
    case '===':
      if (typeof a === 'object')
        a = a.version;
      if (typeof b === 'object')
        b = b.version;
      return a === b

    case '!==':
      if (typeof a === 'object')
        a = a.version;
      if (typeof b === 'object')
        b = b.version;
      return a !== b

    case '':
    case '=':
    case '==':
      return eq(a, b, loose)

    case '!=':
      return neq(a, b, loose)

    case '>':
      return gt(a, b, loose)

    case '>=':
      return gte(a, b, loose)

    case '<':
      return lt(a, b, loose)

    case '<=':
      return lte(a, b, loose)

    default:
      throw new TypeError('Invalid operator: ' + op)
  }
}

exports.Comparator = Comparator;
function Comparator (comp, options) {
  if (!options || typeof options !== 'object') {
    options = {
      loose: !!options,
      includePrerelease: false
    };
  }

  if (comp instanceof Comparator) {
    if (comp.loose === !!options.loose) {
      return comp
    } else {
      comp = comp.value;
    }
  }

  if (!(this instanceof Comparator)) {
    return new Comparator(comp, options)
  }

  debug('comparator', comp, options);
  this.options = options;
  this.loose = !!options.loose;
  this.parse(comp);

  if (this.semver === ANY) {
    this.value = '';
  } else {
    this.value = this.operator + this.semver.version;
  }

  debug('comp', this);
}

var ANY = {};
Comparator.prototype.parse = function (comp) {
  var r = this.options.loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR];
  var m = comp.match(r);

  if (!m) {
    throw new TypeError('Invalid comparator: ' + comp)
  }

  this.operator = m[1] !== undefined ? m[1] : '';
  if (this.operator === '=') {
    this.operator = '';
  }

  // if it literally is just '>' or '' then allow anything.
  if (!m[2]) {
    this.semver = ANY;
  } else {
    this.semver = new SemVer(m[2], this.options.loose);
  }
};

Comparator.prototype.toString = function () {
  return this.value
};

Comparator.prototype.test = function (version) {
  debug('Comparator.test', version, this.options.loose);

  if (this.semver === ANY || version === ANY) {
    return true
  }

  if (typeof version === 'string') {
    try {
      version = new SemVer(version, this.options);
    } catch (er) {
      return false
    }
  }

  return cmp(version, this.operator, this.semver, this.options)
};

Comparator.prototype.intersects = function (comp, options) {
  if (!(comp instanceof Comparator)) {
    throw new TypeError('a Comparator is required')
  }

  if (!options || typeof options !== 'object') {
    options = {
      loose: !!options,
      includePrerelease: false
    };
  }

  var rangeTmp;

  if (this.operator === '') {
    if (this.value === '') {
      return true
    }
    rangeTmp = new Range(comp.value, options);
    return satisfies(this.value, rangeTmp, options)
  } else if (comp.operator === '') {
    if (comp.value === '') {
      return true
    }
    rangeTmp = new Range(this.value, options);
    return satisfies(comp.semver, rangeTmp, options)
  }

  var sameDirectionIncreasing =
    (this.operator === '>=' || this.operator === '>') &&
    (comp.operator === '>=' || comp.operator === '>');
  var sameDirectionDecreasing =
    (this.operator === '<=' || this.operator === '<') &&
    (comp.operator === '<=' || comp.operator === '<');
  var sameSemVer = this.semver.version === comp.semver.version;
  var differentDirectionsInclusive =
    (this.operator === '>=' || this.operator === '<=') &&
    (comp.operator === '>=' || comp.operator === '<=');
  var oppositeDirectionsLessThan =
    cmp(this.semver, '<', comp.semver, options) &&
    ((this.operator === '>=' || this.operator === '>') &&
    (comp.operator === '<=' || comp.operator === '<'));
  var oppositeDirectionsGreaterThan =
    cmp(this.semver, '>', comp.semver, options) &&
    ((this.operator === '<=' || this.operator === '<') &&
    (comp.operator === '>=' || comp.operator === '>'));

  return sameDirectionIncreasing || sameDirectionDecreasing ||
    (sameSemVer && differentDirectionsInclusive) ||
    oppositeDirectionsLessThan || oppositeDirectionsGreaterThan
};

exports.Range = Range;
function Range (range, options) {
  if (!options || typeof options !== 'object') {
    options = {
      loose: !!options,
      includePrerelease: false
    };
  }

  if (range instanceof Range) {
    if (range.loose === !!options.loose &&
        range.includePrerelease === !!options.includePrerelease) {
      return range
    } else {
      return new Range(range.raw, options)
    }
  }

  if (range instanceof Comparator) {
    return new Range(range.value, options)
  }

  if (!(this instanceof Range)) {
    return new Range(range, options)
  }

  this.options = options;
  this.loose = !!options.loose;
  this.includePrerelease = !!options.includePrerelease;

  // First, split based on boolean or ||
  this.raw = range;
  this.set = range.split(/\s*\|\|\s*/).map(function (range) {
    return this.parseRange(range.trim())
  }, this).filter(function (c) {
    // throw out any that are not relevant for whatever reason
    return c.length
  });

  if (!this.set.length) {
    throw new TypeError('Invalid SemVer Range: ' + range)
  }

  this.format();
}

Range.prototype.format = function () {
  this.range = this.set.map(function (comps) {
    return comps.join(' ').trim()
  }).join('||').trim();
  return this.range
};

Range.prototype.toString = function () {
  return this.range
};

Range.prototype.parseRange = function (range) {
  var loose = this.options.loose;
  range = range.trim();
  // `1.2.3 - 1.2.4` => `>=1.2.3 <=1.2.4`
  var hr = loose ? re[t.HYPHENRANGELOOSE] : re[t.HYPHENRANGE];
  range = range.replace(hr, hyphenReplace);
  debug('hyphen replace', range);
  // `> 1.2.3 < 1.2.5` => `>1.2.3 <1.2.5`
  range = range.replace(re[t.COMPARATORTRIM], comparatorTrimReplace);
  debug('comparator trim', range, re[t.COMPARATORTRIM]);

  // `~ 1.2.3` => `~1.2.3`
  range = range.replace(re[t.TILDETRIM], tildeTrimReplace);

  // `^ 1.2.3` => `^1.2.3`
  range = range.replace(re[t.CARETTRIM], caretTrimReplace);

  // normalize spaces
  range = range.split(/\s+/).join(' ');

  // At this point, the range is completely trimmed and
  // ready to be split into comparators.

  var compRe = loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR];
  var set = range.split(' ').map(function (comp) {
    return parseComparator(comp, this.options)
  }, this).join(' ').split(/\s+/);
  if (this.options.loose) {
    // in loose mode, throw out any that are not valid comparators
    set = set.filter(function (comp) {
      return !!comp.match(compRe)
    });
  }
  set = set.map(function (comp) {
    return new Comparator(comp, this.options)
  }, this);

  return set
};

Range.prototype.intersects = function (range, options) {
  if (!(range instanceof Range)) {
    throw new TypeError('a Range is required')
  }

  return this.set.some(function (thisComparators) {
    return (
      isSatisfiable(thisComparators, options) &&
      range.set.some(function (rangeComparators) {
        return (
          isSatisfiable(rangeComparators, options) &&
          thisComparators.every(function (thisComparator) {
            return rangeComparators.every(function (rangeComparator) {
              return thisComparator.intersects(rangeComparator, options)
            })
          })
        )
      })
    )
  })
};

// take a set of comparators and determine whether there
// exists a version which can satisfy it
function isSatisfiable (comparators, options) {
  var result = true;
  var remainingComparators = comparators.slice();
  var testComparator = remainingComparators.pop();

  while (result && remainingComparators.length) {
    result = remainingComparators.every(function (otherComparator) {
      return testComparator.intersects(otherComparator, options)
    });

    testComparator = remainingComparators.pop();
  }

  return result
}

// Mostly just for testing and legacy API reasons
exports.toComparators = toComparators;
function toComparators (range, options) {
  return new Range(range, options).set.map(function (comp) {
    return comp.map(function (c) {
      return c.value
    }).join(' ').trim().split(' ')
  })
}

// comprised of xranges, tildes, stars, and gtlt's at this point.
// already replaced the hyphen ranges
// turn into a set of JUST comparators.
function parseComparator (comp, options) {
  debug('comp', comp, options);
  comp = replaceCarets(comp, options);
  debug('caret', comp);
  comp = replaceTildes(comp, options);
  debug('tildes', comp);
  comp = replaceXRanges(comp, options);
  debug('xrange', comp);
  comp = replaceStars(comp, options);
  debug('stars', comp);
  return comp
}

function isX (id) {
  return !id || id.toLowerCase() === 'x' || id === '*'
}

// ~, ~> --> * (any, kinda silly)
// ~2, ~2.x, ~2.x.x, ~>2, ~>2.x ~>2.x.x --> >=2.0.0 <3.0.0
// ~2.0, ~2.0.x, ~>2.0, ~>2.0.x --> >=2.0.0 <2.1.0
// ~1.2, ~1.2.x, ~>1.2, ~>1.2.x --> >=1.2.0 <1.3.0
// ~1.2.3, ~>1.2.3 --> >=1.2.3 <1.3.0
// ~1.2.0, ~>1.2.0 --> >=1.2.0 <1.3.0
function replaceTildes (comp, options) {
  return comp.trim().split(/\s+/).map(function (comp) {
    return replaceTilde(comp, options)
  }).join(' ')
}

function replaceTilde (comp, options) {
  var r = options.loose ? re[t.TILDELOOSE] : re[t.TILDE];
  return comp.replace(r, function (_, M, m, p, pr) {
    debug('tilde', comp, _, M, m, p, pr);
    var ret;

    if (isX(M)) {
      ret = '';
    } else if (isX(m)) {
      ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';
    } else if (isX(p)) {
      // ~1.2 == >=1.2.0 <1.3.0
      ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';
    } else if (pr) {
      debug('replaceTilde pr', pr);
      ret = '>=' + M + '.' + m + '.' + p + '-' + pr +
            ' <' + M + '.' + (+m + 1) + '.0';
    } else {
      // ~1.2.3 == >=1.2.3 <1.3.0
      ret = '>=' + M + '.' + m + '.' + p +
            ' <' + M + '.' + (+m + 1) + '.0';
    }

    debug('tilde return', ret);
    return ret
  })
}

// ^ --> * (any, kinda silly)
// ^2, ^2.x, ^2.x.x --> >=2.0.0 <3.0.0
// ^2.0, ^2.0.x --> >=2.0.0 <3.0.0
// ^1.2, ^1.2.x --> >=1.2.0 <2.0.0
// ^1.2.3 --> >=1.2.3 <2.0.0
// ^1.2.0 --> >=1.2.0 <2.0.0
function replaceCarets (comp, options) {
  return comp.trim().split(/\s+/).map(function (comp) {
    return replaceCaret(comp, options)
  }).join(' ')
}

function replaceCaret (comp, options) {
  debug('caret', comp, options);
  var r = options.loose ? re[t.CARETLOOSE] : re[t.CARET];
  return comp.replace(r, function (_, M, m, p, pr) {
    debug('caret', comp, _, M, m, p, pr);
    var ret;

    if (isX(M)) {
      ret = '';
    } else if (isX(m)) {
      ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';
    } else if (isX(p)) {
      if (M === '0') {
        ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';
      } else {
        ret = '>=' + M + '.' + m + '.0 <' + (+M + 1) + '.0.0';
      }
    } else if (pr) {
      debug('replaceCaret pr', pr);
      if (M === '0') {
        if (m === '0') {
          ret = '>=' + M + '.' + m + '.' + p + '-' + pr +
                ' <' + M + '.' + m + '.' + (+p + 1);
        } else {
          ret = '>=' + M + '.' + m + '.' + p + '-' + pr +
                ' <' + M + '.' + (+m + 1) + '.0';
        }
      } else {
        ret = '>=' + M + '.' + m + '.' + p + '-' + pr +
              ' <' + (+M + 1) + '.0.0';
      }
    } else {
      debug('no pr');
      if (M === '0') {
        if (m === '0') {
          ret = '>=' + M + '.' + m + '.' + p +
                ' <' + M + '.' + m + '.' + (+p + 1);
        } else {
          ret = '>=' + M + '.' + m + '.' + p +
                ' <' + M + '.' + (+m + 1) + '.0';
        }
      } else {
        ret = '>=' + M + '.' + m + '.' + p +
              ' <' + (+M + 1) + '.0.0';
      }
    }

    debug('caret return', ret);
    return ret
  })
}

function replaceXRanges (comp, options) {
  debug('replaceXRanges', comp, options);
  return comp.split(/\s+/).map(function (comp) {
    return replaceXRange(comp, options)
  }).join(' ')
}

function replaceXRange (comp, options) {
  comp = comp.trim();
  var r = options.loose ? re[t.XRANGELOOSE] : re[t.XRANGE];
  return comp.replace(r, function (ret, gtlt, M, m, p, pr) {
    debug('xRange', comp, ret, gtlt, M, m, p, pr);
    var xM = isX(M);
    var xm = xM || isX(m);
    var xp = xm || isX(p);
    var anyX = xp;

    if (gtlt === '=' && anyX) {
      gtlt = '';
    }

    // if we're including prereleases in the match, then we need
    // to fix this to -0, the lowest possible prerelease value
    pr = options.includePrerelease ? '-0' : '';

    if (xM) {
      if (gtlt === '>' || gtlt === '<') {
        // nothing is allowed
        ret = '<0.0.0-0';
      } else {
        // nothing is forbidden
        ret = '*';
      }
    } else if (gtlt && anyX) {
      // we know patch is an x, because we have any x at all.
      // replace X with 0
      if (xm) {
        m = 0;
      }
      p = 0;

      if (gtlt === '>') {
        // >1 => >=2.0.0
        // >1.2 => >=1.3.0
        // >1.2.3 => >= 1.2.4
        gtlt = '>=';
        if (xm) {
          M = +M + 1;
          m = 0;
          p = 0;
        } else {
          m = +m + 1;
          p = 0;
        }
      } else if (gtlt === '<=') {
        // <=0.7.x is actually <0.8.0, since any 0.7.x should
        // pass.  Similarly, <=7.x is actually <8.0.0, etc.
        gtlt = '<';
        if (xm) {
          M = +M + 1;
        } else {
          m = +m + 1;
        }
      }

      ret = gtlt + M + '.' + m + '.' + p + pr;
    } else if (xm) {
      ret = '>=' + M + '.0.0' + pr + ' <' + (+M + 1) + '.0.0' + pr;
    } else if (xp) {
      ret = '>=' + M + '.' + m + '.0' + pr +
        ' <' + M + '.' + (+m + 1) + '.0' + pr;
    }

    debug('xRange return', ret);

    return ret
  })
}

// Because * is AND-ed with everything else in the comparator,
// and '' means "any version", just remove the *s entirely.
function replaceStars (comp, options) {
  debug('replaceStars', comp, options);
  // Looseness is ignored here.  star is always as loose as it gets!
  return comp.trim().replace(re[t.STAR], '')
}

// This function is passed to string.replace(re[t.HYPHENRANGE])
// M, m, patch, prerelease, build
// 1.2 - 3.4.5 => >=1.2.0 <=3.4.5
// 1.2.3 - 3.4 => >=1.2.0 <3.5.0 Any 3.4.x will do
// 1.2 - 3.4 => >=1.2.0 <3.5.0
function hyphenReplace ($0,
  from, fM, fm, fp, fpr, fb,
  to, tM, tm, tp, tpr, tb) {
  if (isX(fM)) {
    from = '';
  } else if (isX(fm)) {
    from = '>=' + fM + '.0.0';
  } else if (isX(fp)) {
    from = '>=' + fM + '.' + fm + '.0';
  } else {
    from = '>=' + from;
  }

  if (isX(tM)) {
    to = '';
  } else if (isX(tm)) {
    to = '<' + (+tM + 1) + '.0.0';
  } else if (isX(tp)) {
    to = '<' + tM + '.' + (+tm + 1) + '.0';
  } else if (tpr) {
    to = '<=' + tM + '.' + tm + '.' + tp + '-' + tpr;
  } else {
    to = '<=' + to;
  }

  return (from + ' ' + to).trim()
}

// if ANY of the sets match ALL of its comparators, then pass
Range.prototype.test = function (version) {
  if (!version) {
    return false
  }

  if (typeof version === 'string') {
    try {
      version = new SemVer(version, this.options);
    } catch (er) {
      return false
    }
  }

  for (var i = 0; i < this.set.length; i++) {
    if (testSet(this.set[i], version, this.options)) {
      return true
    }
  }
  return false
};

function testSet (set, version, options) {
  for (var i = 0; i < set.length; i++) {
    if (!set[i].test(version)) {
      return false
    }
  }

  if (version.prerelease.length && !options.includePrerelease) {
    // Find the set of versions that are allowed to have prereleases
    // For example, ^1.2.3-pr.1 desugars to >=1.2.3-pr.1 <2.0.0
    // That should allow `1.2.3-pr.2` to pass.
    // However, `1.2.4-alpha.notready` should NOT be allowed,
    // even though it's within the range set by the comparators.
    for (i = 0; i < set.length; i++) {
      debug(set[i].semver);
      if (set[i].semver === ANY) {
        continue
      }

      if (set[i].semver.prerelease.length > 0) {
        var allowed = set[i].semver;
        if (allowed.major === version.major &&
            allowed.minor === version.minor &&
            allowed.patch === version.patch) {
          return true
        }
      }
    }

    // Version has a -pre, but it's not one of the ones we like.
    return false
  }

  return true
}

exports.satisfies = satisfies;
function satisfies (version, range, options) {
  try {
    range = new Range(range, options);
  } catch (er) {
    return false
  }
  return range.test(version)
}

exports.maxSatisfying = maxSatisfying;
function maxSatisfying (versions, range, options) {
  var max = null;
  var maxSV = null;
  try {
    var rangeObj = new Range(range, options);
  } catch (er) {
    return null
  }
  versions.forEach(function (v) {
    if (rangeObj.test(v)) {
      // satisfies(v, range, options)
      if (!max || maxSV.compare(v) === -1) {
        // compare(max, v, true)
        max = v;
        maxSV = new SemVer(max, options);
      }
    }
  });
  return max
}

exports.minSatisfying = minSatisfying;
function minSatisfying (versions, range, options) {
  var min = null;
  var minSV = null;
  try {
    var rangeObj = new Range(range, options);
  } catch (er) {
    return null
  }
  versions.forEach(function (v) {
    if (rangeObj.test(v)) {
      // satisfies(v, range, options)
      if (!min || minSV.compare(v) === 1) {
        // compare(min, v, true)
        min = v;
        minSV = new SemVer(min, options);
      }
    }
  });
  return min
}

exports.minVersion = minVersion;
function minVersion (range, loose) {
  range = new Range(range, loose);

  var minver = new SemVer('0.0.0');
  if (range.test(minver)) {
    return minver
  }

  minver = new SemVer('0.0.0-0');
  if (range.test(minver)) {
    return minver
  }

  minver = null;
  for (var i = 0; i < range.set.length; ++i) {
    var comparators = range.set[i];

    comparators.forEach(function (comparator) {
      // Clone to avoid manipulating the comparator's semver object.
      var compver = new SemVer(comparator.semver.version);
      switch (comparator.operator) {
        case '>':
          if (compver.prerelease.length === 0) {
            compver.patch++;
          } else {
            compver.prerelease.push(0);
          }
          compver.raw = compver.format();
          /* fallthrough */
        case '':
        case '>=':
          if (!minver || gt(minver, compver)) {
            minver = compver;
          }
          break
        case '<':
        case '<=':
          /* Ignore maximum versions */
          break
        /* istanbul ignore next */
        default:
          throw new Error('Unexpected operation: ' + comparator.operator)
      }
    });
  }

  if (minver && range.test(minver)) {
    return minver
  }

  return null
}

exports.validRange = validRange;
function validRange (range, options) {
  try {
    // Return '*' instead of '' so that truthiness works.
    // This will throw if it's invalid anyway
    return new Range(range, options).range || '*'
  } catch (er) {
    return null
  }
}

// Determine if version is less than all the versions possible in the range
exports.ltr = ltr;
function ltr (version, range, options) {
  return outside(version, range, '<', options)
}

// Determine if version is greater than all the versions possible in the range.
exports.gtr = gtr;
function gtr (version, range, options) {
  return outside(version, range, '>', options)
}

exports.outside = outside;
function outside (version, range, hilo, options) {
  version = new SemVer(version, options);
  range = new Range(range, options);

  var gtfn, ltefn, ltfn, comp, ecomp;
  switch (hilo) {
    case '>':
      gtfn = gt;
      ltefn = lte;
      ltfn = lt;
      comp = '>';
      ecomp = '>=';
      break
    case '<':
      gtfn = lt;
      ltefn = gte;
      ltfn = gt;
      comp = '<';
      ecomp = '<=';
      break
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"')
  }

  // If it satisifes the range it is not outside
  if (satisfies(version, range, options)) {
    return false
  }

  // From now on, variable terms are as if we're in "gtr" mode.
  // but note that everything is flipped for the "ltr" function.

  for (var i = 0; i < range.set.length; ++i) {
    var comparators = range.set[i];

    var high = null;
    var low = null;

    comparators.forEach(function (comparator) {
      if (comparator.semver === ANY) {
        comparator = new Comparator('>=0.0.0');
      }
      high = high || comparator;
      low = low || comparator;
      if (gtfn(comparator.semver, high.semver, options)) {
        high = comparator;
      } else if (ltfn(comparator.semver, low.semver, options)) {
        low = comparator;
      }
    });

    // If the edge version comparator has a operator then our version
    // isn't outside it
    if (high.operator === comp || high.operator === ecomp) {
      return false
    }

    // If the lowest version comparator has an operator and our version
    // is less than it then it isn't higher than the range
    if ((!low.operator || low.operator === comp) &&
        ltefn(version, low.semver)) {
      return false
    } else if (low.operator === ecomp && ltfn(version, low.semver)) {
      return false
    }
  }
  return true
}

exports.prerelease = prerelease;
function prerelease (version, options) {
  var parsed = parse(version, options);
  return (parsed && parsed.prerelease.length) ? parsed.prerelease : null
}

exports.intersects = intersects;
function intersects (r1, r2, options) {
  r1 = new Range(r1, options);
  r2 = new Range(r2, options);
  return r1.intersects(r2)
}

exports.coerce = coerce;
function coerce (version, options) {
  if (version instanceof SemVer) {
    return version
  }

  if (typeof version === 'number') {
    version = String(version);
  }

  if (typeof version !== 'string') {
    return null
  }

  options = options || {};

  var match = null;
  if (!options.rtl) {
    match = version.match(re[t.COERCE]);
  } else {
    // Find the right-most coercible string that does not share
    // a terminus with a more left-ward coercible string.
    // Eg, '1.2.3.4' wants to coerce '2.3.4', not '3.4' or '4'
    //
    // Walk through the string checking with a /g regexp
    // Manually set the index so as to pick up overlapping matches.
    // Stop when we get a match that ends at the string end, since no
    // coercible string can be more right-ward without the same terminus.
    var next;
    while ((next = re[t.COERCERTL].exec(version)) &&
      (!match || match.index + match[0].length !== version.length)
    ) {
      if (!match ||
          next.index + next[0].length !== match.index + match[0].length) {
        match = next;
      }
      re[t.COERCERTL].lastIndex = next.index + next[1].length + next[2].length;
    }
    // leave it in a clean state
    re[t.COERCERTL].lastIndex = -1;
  }

  if (match === null) {
    return null
  }

  return parse(match[2] +
    '.' + (match[3] || '0') +
    '.' + (match[4] || '0'), options)
}
});
var semver_1 = semver.SEMVER_SPEC_VERSION;
var semver_2 = semver.re;
var semver_3 = semver.src;
var semver_4 = semver.tokens;
var semver_5 = semver.parse;
var semver_6 = semver.valid;
var semver_7 = semver.clean;
var semver_8 = semver.SemVer;
var semver_9 = semver.inc;
var semver_10 = semver.diff;
var semver_11 = semver.compareIdentifiers;
var semver_12 = semver.rcompareIdentifiers;
var semver_13 = semver.major;
var semver_14 = semver.minor;
var semver_15 = semver.patch;
var semver_16 = semver.compare;
var semver_17 = semver.compareLoose;
var semver_18 = semver.compareBuild;
var semver_19 = semver.rcompare;
var semver_20 = semver.sort;
var semver_21 = semver.rsort;
var semver_22 = semver.gt;
var semver_23 = semver.lt;
var semver_24 = semver.eq;
var semver_25 = semver.neq;
var semver_26 = semver.gte;
var semver_27 = semver.lte;
var semver_28 = semver.cmp;
var semver_29 = semver.Comparator;
var semver_30 = semver.Range;
var semver_31 = semver.toComparators;
var semver_32 = semver.satisfies;
var semver_33 = semver.maxSatisfying;
var semver_34 = semver.minSatisfying;
var semver_35 = semver.minVersion;
var semver_36 = semver.validRange;
var semver_37 = semver.ltr;
var semver_38 = semver.gtr;
var semver_39 = semver.outside;
var semver_40 = semver.prerelease;
var semver_41 = semver.intersects;
var semver_42 = semver.coerce;

/*
 * Copyright (c) 2016-2017 Digital Bazaar, Inc. All rights reserved.
 */

const api = {};
var util = api;

// define setImmediate and nextTick
//// nextTick implementation with browser-compatible fallback ////
// from https://github.com/caolan/async/blob/master/lib/async.js

// capture the global reference to guard against fakeTimer mocks
const _setImmediate = typeof setImmediate === 'function' && setImmediate;

const _delay = _setImmediate ?
  // not a direct alias (for IE10 compatibility)
  fn => _setImmediate(fn) :
  fn => setTimeout(fn, 0);

if(typeof process === 'object' && typeof process.nextTick === 'function') {
  api.nextTick = process.nextTick;
} else {
  api.nextTick = _delay;
}
api.setImmediate = _setImmediate ? _delay : api.nextTick;

/**
 * Clones an object, array, or string/number. If a typed JavaScript object
 * is given, such as a Date, it will be converted to a string.
 *
 * @param value the value to clone.
 *
 * @return the cloned value.
 */
api.clone = function(value) {
  if(value && typeof value === 'object') {
    let rval;
    if(Array.isArray(value)) {
      rval = [];
      for(let i = 0; i < value.length; ++i) {
        rval[i] = api.clone(value[i]);
      }
    } else if(api.isObject(value)) {
      rval = {};
      for(const key in value) {
        rval[key] = api.clone(value[key]);
      }
    } else {
      rval = value.toString();
    }
    return rval;
  }
  return value;
};

/**
 * Returns true if the given value is an Object.
 *
 * @param v the value to check.
 *
 * @return true if the value is an Object, false if not.
 */
api.isObject = v => Object.prototype.toString.call(v) === '[object Object]';

/**
 * Returns true if the given value is undefined.
 *
 * @param v the value to check.
 *
 * @return true if the value is undefined, false if not.
 */
api.isUndefined = v => typeof v === 'undefined';

api.callbackify = fn => {
  return async function(...args) {
    const callback = args[args.length - 1];
    if(typeof callback === 'function') {
      args.pop();
    }

    let result;
    try {
      result = await fn.apply(null, args);
    } catch(e) {
      if(typeof callback === 'function') {
        return _invokeCallback(callback, e);
      }
      throw e;
    }

    if(typeof callback === 'function') {
      return _invokeCallback(callback, null, result);
    }

    return result;
  };
};

function _invokeCallback(callback, err, result) {
  try {
    return callback(err, result);
  } catch(unhandledError) {
    // throw unhandled errors to prevent "unhandled rejected promise"
    // and simulate what would have happened in a promiseless API
    process.nextTick(() => {
      throw unhandledError;
    });
  }
}

var AsyncAlgorithm_1 = class AsyncAlgorithm {
  constructor({
    maxCallStackDepth = 500,
    maxTotalCallStackDepth = 0xFFFFFFFF,
    // milliseconds
    timeSlice = 10
  } = {}) {
    this.schedule = {};
    this.schedule.MAX_DEPTH = maxCallStackDepth;
    this.schedule.MAX_TOTAL_DEPTH = maxTotalCallStackDepth;
    this.schedule.depth = 0;
    this.schedule.totalDepth = 0;
    this.schedule.timeSlice = timeSlice;
  }

  // do some work in a time slice, but in serial
  doWork(fn, callback) {
    const schedule = this.schedule;

    if(schedule.totalDepth >= schedule.MAX_TOTAL_DEPTH) {
      return callback(new Error(
        'Maximum total call stack depth exceeded; canonicalization aborting.'));
    }

    (function work() {
      if(schedule.depth === schedule.MAX_DEPTH) {
        // stack too deep, run on next tick
        schedule.depth = 0;
        schedule.running = false;
        return util.nextTick(work);
      }

      // if not yet running, force run
      const now = Date.now();
      if(!schedule.running) {
        schedule.start = Date.now();
        schedule.deadline = schedule.start + schedule.timeSlice;
      }

      // TODO: should also include an estimate of expectedWorkTime
      if(now < schedule.deadline) {
        schedule.running = true;
        schedule.depth++;
        schedule.totalDepth++;
        return fn((err, result) => {
          schedule.depth--;
          schedule.totalDepth--;
          callback(err, result);
        });
      }

      // not enough time left in this slice, run after letting browser
      // do some other things
      schedule.depth = 0;
      schedule.running = false;
      util.setImmediate(work);
    })();
  }

  // asynchronously loop
  forEach(iterable, fn, callback) {
    const self = this;
    let iterator;
    let idx = 0;
    let length;
    if(Array.isArray(iterable)) {
      length = iterable.length;
      iterator = () => {
        if(idx === length) {
          return false;
        }
        iterator.value = iterable[idx++];
        iterator.key = idx;
        return true;
      };
    } else {
      const keys = Object.keys(iterable);
      length = keys.length;
      iterator = () => {
        if(idx === length) {
          return false;
        }
        iterator.key = keys[idx++];
        iterator.value = iterable[iterator.key];
        return true;
      };
    }

    (function iterate(err) {
      if(err) {
        return callback(err);
      }
      if(iterator()) {
        return self.doWork(() => fn(iterator.value, iterator.key, iterate));
      }
      callback();
    })();
  }

  // asynchronous waterfall
  waterfall(fns, callback) {
    const self = this;
    self.forEach(
      fns, (fn, idx, callback) => self.doWork(fn, callback), callback);
  }

  // asynchronous while
  whilst(condition, fn, callback) {
    const self = this;
    (function loop(err) {
      if(err) {
        return callback(err);
      }
      if(!condition()) {
        return callback();
      }
      self.doWork(fn, loop);
    })();
  }
};

var IdentifierIssuer_1 = class IdentifierIssuer {
  /**
   * Creates a new IdentifierIssuer. A IdentifierIssuer issues unique
   * identifiers, keeping track of any previously issued identifiers.
   *
   * @param prefix the prefix to use ('<prefix><counter>').
   */
  constructor(prefix) {
    this.prefix = prefix;
    this.counter = 0;
    this.existing = {};
  }

  /**
   * Copies this IdentifierIssuer.
   *
   * @return a copy of this IdentifierIssuer.
   */
  clone() {
    const copy = new IdentifierIssuer(this.prefix);
    copy.counter = this.counter;
    copy.existing = util.clone(this.existing);
    return copy;
  }

  /**
   * Gets the new identifier for the given old identifier, where if no old
   * identifier is given a new identifier will be generated.
   *
   * @param [old] the old identifier to get the new identifier for.
   *
   * @return the new identifier.
   */
  getId(old) {
    // return existing old identifier
    if(old && old in this.existing) {
      return this.existing[old];
    }

    // get next identifier
    const identifier = this.prefix + this.counter;
    this.counter += 1;

    // save mapping
    if(old) {
      this.existing[old] = identifier;
    }

    return identifier;
  }

  /**
   * Returns true if the given old identifer has already been assigned a new
   * identifier.
   *
   * @param old the old identifier to check.
   *
   * @return true if the old identifier has been assigned a new identifier,
   *   false if not.
   */
  hasId(old) {
    return (old in this.existing);
  }
};

/**
 * Node.js module for Forge.
 *
 * @author Dave Longley
 *
 * Copyright 2011-2016 Digital Bazaar, Inc.
 */
var forge = {
  // default options
  options: {
    usePureJavaScript: false
  }
};

/**
 * Node.js module for Forge message digests.
 *
 * @author Dave Longley
 *
 * Copyright 2011-2017 Digital Bazaar, Inc.
 */


var md = forge.md = forge.md || {};
forge.md.algorithms = forge.md.algorithms || {};

/**
 * Base-N/Base-X encoding/decoding functions.
 *
 * Original implementation from base-x:
 * https://github.com/cryptocoinjs/base-x
 *
 * Which is MIT licensed:
 *
 * The MIT License (MIT)
 *
 * Copyright base-x contributors (c) 2016
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */
var api$1 = {};
var baseN = api$1;

// baseN alphabet indexes
var _reverseAlphabets = {};

/**
 * BaseN-encodes a Uint8Array using the given alphabet.
 *
 * @param input the Uint8Array to encode.
 * @param maxline the maximum number of encoded characters per line to use,
 *          defaults to none.
 *
 * @return the baseN-encoded output string.
 */
api$1.encode = function(input, alphabet, maxline) {
  if(typeof alphabet !== 'string') {
    throw new TypeError('"alphabet" must be a string.');
  }
  if(maxline !== undefined && typeof maxline !== 'number') {
    throw new TypeError('"maxline" must be a number.');
  }

  var output = '';

  if(!(input instanceof Uint8Array)) {
    // assume forge byte buffer
    output = _encodeWithByteBuffer(input, alphabet);
  } else {
    var i = 0;
    var base = alphabet.length;
    var first = alphabet.charAt(0);
    var digits = [0];
    for(i = 0; i < input.length; ++i) {
      for(var j = 0, carry = input[i]; j < digits.length; ++j) {
        carry += digits[j] << 8;
        digits[j] = carry % base;
        carry = (carry / base) | 0;
      }

      while(carry > 0) {
        digits.push(carry % base);
        carry = (carry / base) | 0;
      }
    }

    // deal with leading zeros
    for(i = 0; input[i] === 0 && i < input.length - 1; ++i) {
      output += first;
    }
    // convert digits to a string
    for(i = digits.length - 1; i >= 0; --i) {
      output += alphabet[digits[i]];
    }
  }

  if(maxline) {
    var regex = new RegExp('.{1,' + maxline + '}', 'g');
    output = output.match(regex).join('\r\n');
  }

  return output;
};

/**
 * Decodes a baseN-encoded (using the given alphabet) string to a
 * Uint8Array.
 *
 * @param input the baseN-encoded input string.
 *
 * @return the Uint8Array.
 */
api$1.decode = function(input, alphabet) {
  if(typeof input !== 'string') {
    throw new TypeError('"input" must be a string.');
  }
  if(typeof alphabet !== 'string') {
    throw new TypeError('"alphabet" must be a string.');
  }

  var table = _reverseAlphabets[alphabet];
  if(!table) {
    // compute reverse alphabet
    table = _reverseAlphabets[alphabet] = [];
    for(var i = 0; i < alphabet.length; ++i) {
      table[alphabet.charCodeAt(i)] = i;
    }
  }

  // remove whitespace characters
  input = input.replace(/\s/g, '');

  var base = alphabet.length;
  var first = alphabet.charAt(0);
  var bytes = [0];
  for(var i = 0; i < input.length; i++) {
    var value = table[input.charCodeAt(i)];
    if(value === undefined) {
      return;
    }

    for(var j = 0, carry = value; j < bytes.length; ++j) {
      carry += bytes[j] * base;
      bytes[j] = carry & 0xff;
      carry >>= 8;
    }

    while(carry > 0) {
      bytes.push(carry & 0xff);
      carry >>= 8;
    }
  }

  // deal with leading zeros
  for(var k = 0; input[k] === first && k < input.length - 1; ++k) {
    bytes.push(0);
  }

  if(typeof Buffer !== 'undefined') {
    return Buffer.from(bytes.reverse());
  }

  return new Uint8Array(bytes.reverse());
};

function _encodeWithByteBuffer(input, alphabet) {
  var i = 0;
  var base = alphabet.length;
  var first = alphabet.charAt(0);
  var digits = [0];
  for(i = 0; i < input.length(); ++i) {
    for(var j = 0, carry = input.at(i); j < digits.length; ++j) {
      carry += digits[j] << 8;
      digits[j] = carry % base;
      carry = (carry / base) | 0;
    }

    while(carry > 0) {
      digits.push(carry % base);
      carry = (carry / base) | 0;
    }
  }

  var output = '';

  // deal with leading zeros
  for(i = 0; input.at(i) === 0 && i < input.length() - 1; ++i) {
    output += first;
  }
  // convert digits to a string
  for(i = digits.length - 1; i >= 0; --i) {
    output += alphabet[digits[i]];
  }

  return output;
}

var util_1 = createCommonjsModule(function (module) {
/**
 * Utility functions for web applications.
 *
 * @author Dave Longley
 *
 * Copyright (c) 2010-2018 Digital Bazaar, Inc.
 */



/* Utilities API */
var util = module.exports = forge.util = forge.util || {};

// define setImmediate and nextTick
(function() {
  // use native nextTick (unless we're in webpack)
  // webpack (or better node-libs-browser polyfill) sets process.browser.
  // this way we can detect webpack properly
  if(typeof process !== 'undefined' && process.nextTick && !process.browser) {
    util.nextTick = process.nextTick;
    if(typeof setImmediate === 'function') {
      util.setImmediate = setImmediate;
    } else {
      // polyfill setImmediate with nextTick, older versions of node
      // (those w/o setImmediate) won't totally starve IO
      util.setImmediate = util.nextTick;
    }
    return;
  }

  // polyfill nextTick with native setImmediate
  if(typeof setImmediate === 'function') {
    util.setImmediate = function() { return setImmediate.apply(undefined, arguments); };
    util.nextTick = function(callback) {
      return setImmediate(callback);
    };
    return;
  }

  /* Note: A polyfill upgrade pattern is used here to allow combining
  polyfills. For example, MutationObserver is fast, but blocks UI updates,
  so it needs to allow UI updates periodically, so it falls back on
  postMessage or setTimeout. */

  // polyfill with setTimeout
  util.setImmediate = function(callback) {
    setTimeout(callback, 0);
  };

  // upgrade polyfill to use postMessage
  if(typeof window !== 'undefined' &&
    typeof window.postMessage === 'function') {
    var msg = 'forge.setImmediate';
    var callbacks = [];
    util.setImmediate = function(callback) {
      callbacks.push(callback);
      // only send message when one hasn't been sent in
      // the current turn of the event loop
      if(callbacks.length === 1) {
        window.postMessage(msg, '*');
      }
    };
    function handler(event) {
      if(event.source === window && event.data === msg) {
        event.stopPropagation();
        var copy = callbacks.slice();
        callbacks.length = 0;
        copy.forEach(function(callback) {
          callback();
        });
      }
    }
    window.addEventListener('message', handler, true);
  }

  // upgrade polyfill to use MutationObserver
  if(typeof MutationObserver !== 'undefined') {
    // polyfill with MutationObserver
    var now = Date.now();
    var attr = true;
    var div = document.createElement('div');
    var callbacks = [];
    new MutationObserver(function() {
      var copy = callbacks.slice();
      callbacks.length = 0;
      copy.forEach(function(callback) {
        callback();
      });
    }).observe(div, {attributes: true});
    var oldSetImmediate = util.setImmediate;
    util.setImmediate = function(callback) {
      if(Date.now() - now > 15) {
        now = Date.now();
        oldSetImmediate(callback);
      } else {
        callbacks.push(callback);
        // only trigger observer when it hasn't been triggered in
        // the current turn of the event loop
        if(callbacks.length === 1) {
          div.setAttribute('a', attr = !attr);
        }
      }
    };
  }

  util.nextTick = util.setImmediate;
})();

// check if running under Node.js
util.isNodejs =
  typeof process !== 'undefined' && process.versions && process.versions.node;


// 'self' will also work in Web Workers (instance of WorkerGlobalScope) while
// it will point to `window` in the main thread.
// To remain compatible with older browsers, we fall back to 'window' if 'self'
// is not available.
util.globalScope = (function() {
  if(util.isNodejs) {
    return commonjsGlobal;
  }

  return typeof self === 'undefined' ? window : self;
})();

// define isArray
util.isArray = Array.isArray || function(x) {
  return Object.prototype.toString.call(x) === '[object Array]';
};

// define isArrayBuffer
util.isArrayBuffer = function(x) {
  return typeof ArrayBuffer !== 'undefined' && x instanceof ArrayBuffer;
};

// define isArrayBufferView
util.isArrayBufferView = function(x) {
  return x && util.isArrayBuffer(x.buffer) && x.byteLength !== undefined;
};

/**
 * Ensure a bits param is 8, 16, 24, or 32. Used to validate input for
 * algorithms where bit manipulation, JavaScript limitations, and/or algorithm
 * design only allow for byte operations of a limited size.
 *
 * @param n number of bits.
 *
 * Throw Error if n invalid.
 */
function _checkBitsParam(n) {
  if(!(n === 8 || n === 16 || n === 24 || n === 32)) {
    throw new Error('Only 8, 16, 24, or 32 bits supported: ' + n);
  }
}

// TODO: set ByteBuffer to best available backing
util.ByteBuffer = ByteStringBuffer;

/** Buffer w/BinaryString backing */

/**
 * Constructor for a binary string backed byte buffer.
 *
 * @param [b] the bytes to wrap (either encoded as string, one byte per
 *          character, or as an ArrayBuffer or Typed Array).
 */
function ByteStringBuffer(b) {
  // TODO: update to match DataBuffer API

  // the data in this buffer
  this.data = '';
  // the pointer for reading from this buffer
  this.read = 0;

  if(typeof b === 'string') {
    this.data = b;
  } else if(util.isArrayBuffer(b) || util.isArrayBufferView(b)) {
    if(typeof Buffer !== 'undefined' && b instanceof Buffer) {
      this.data = b.toString('binary');
    } else {
      // convert native buffer to forge buffer
      // FIXME: support native buffers internally instead
      var arr = new Uint8Array(b);
      try {
        this.data = String.fromCharCode.apply(null, arr);
      } catch(e) {
        for(var i = 0; i < arr.length; ++i) {
          this.putByte(arr[i]);
        }
      }
    }
  } else if(b instanceof ByteStringBuffer ||
    (typeof b === 'object' && typeof b.data === 'string' &&
    typeof b.read === 'number')) {
    // copy existing buffer
    this.data = b.data;
    this.read = b.read;
  }

  // used for v8 optimization
  this._constructedStringLength = 0;
}
util.ByteStringBuffer = ByteStringBuffer;

/* Note: This is an optimization for V8-based browsers. When V8 concatenates
  a string, the strings are only joined logically using a "cons string" or
  "constructed/concatenated string". These containers keep references to one
  another and can result in very large memory usage. For example, if a 2MB
  string is constructed by concatenating 4 bytes together at a time, the
  memory usage will be ~44MB; so ~22x increase. The strings are only joined
  together when an operation requiring their joining takes place, such as
  substr(). This function is called when adding data to this buffer to ensure
  these types of strings are periodically joined to reduce the memory
  footprint. */
var _MAX_CONSTRUCTED_STRING_LENGTH = 4096;
util.ByteStringBuffer.prototype._optimizeConstructedString = function(x) {
  this._constructedStringLength += x;
  if(this._constructedStringLength > _MAX_CONSTRUCTED_STRING_LENGTH) {
    // this substr() should cause the constructed string to join
    this.data.substr(0, 1);
    this._constructedStringLength = 0;
  }
};

/**
 * Gets the number of bytes in this buffer.
 *
 * @return the number of bytes in this buffer.
 */
util.ByteStringBuffer.prototype.length = function() {
  return this.data.length - this.read;
};

/**
 * Gets whether or not this buffer is empty.
 *
 * @return true if this buffer is empty, false if not.
 */
util.ByteStringBuffer.prototype.isEmpty = function() {
  return this.length() <= 0;
};

/**
 * Puts a byte in this buffer.
 *
 * @param b the byte to put.
 *
 * @return this buffer.
 */
util.ByteStringBuffer.prototype.putByte = function(b) {
  return this.putBytes(String.fromCharCode(b));
};

/**
 * Puts a byte in this buffer N times.
 *
 * @param b the byte to put.
 * @param n the number of bytes of value b to put.
 *
 * @return this buffer.
 */
util.ByteStringBuffer.prototype.fillWithByte = function(b, n) {
  b = String.fromCharCode(b);
  var d = this.data;
  while(n > 0) {
    if(n & 1) {
      d += b;
    }
    n >>>= 1;
    if(n > 0) {
      b += b;
    }
  }
  this.data = d;
  this._optimizeConstructedString(n);
  return this;
};

/**
 * Puts bytes in this buffer.
 *
 * @param bytes the bytes (as a binary encoded string) to put.
 *
 * @return this buffer.
 */
util.ByteStringBuffer.prototype.putBytes = function(bytes) {
  this.data += bytes;
  this._optimizeConstructedString(bytes.length);
  return this;
};

/**
 * Puts a UTF-16 encoded string into this buffer.
 *
 * @param str the string to put.
 *
 * @return this buffer.
 */
util.ByteStringBuffer.prototype.putString = function(str) {
  return this.putBytes(util.encodeUtf8(str));
};

/**
 * Puts a 16-bit integer in this buffer in big-endian order.
 *
 * @param i the 16-bit integer.
 *
 * @return this buffer.
 */
util.ByteStringBuffer.prototype.putInt16 = function(i) {
  return this.putBytes(
    String.fromCharCode(i >> 8 & 0xFF) +
    String.fromCharCode(i & 0xFF));
};

/**
 * Puts a 24-bit integer in this buffer in big-endian order.
 *
 * @param i the 24-bit integer.
 *
 * @return this buffer.
 */
util.ByteStringBuffer.prototype.putInt24 = function(i) {
  return this.putBytes(
    String.fromCharCode(i >> 16 & 0xFF) +
    String.fromCharCode(i >> 8 & 0xFF) +
    String.fromCharCode(i & 0xFF));
};

/**
 * Puts a 32-bit integer in this buffer in big-endian order.
 *
 * @param i the 32-bit integer.
 *
 * @return this buffer.
 */
util.ByteStringBuffer.prototype.putInt32 = function(i) {
  return this.putBytes(
    String.fromCharCode(i >> 24 & 0xFF) +
    String.fromCharCode(i >> 16 & 0xFF) +
    String.fromCharCode(i >> 8 & 0xFF) +
    String.fromCharCode(i & 0xFF));
};

/**
 * Puts a 16-bit integer in this buffer in little-endian order.
 *
 * @param i the 16-bit integer.
 *
 * @return this buffer.
 */
util.ByteStringBuffer.prototype.putInt16Le = function(i) {
  return this.putBytes(
    String.fromCharCode(i & 0xFF) +
    String.fromCharCode(i >> 8 & 0xFF));
};

/**
 * Puts a 24-bit integer in this buffer in little-endian order.
 *
 * @param i the 24-bit integer.
 *
 * @return this buffer.
 */
util.ByteStringBuffer.prototype.putInt24Le = function(i) {
  return this.putBytes(
    String.fromCharCode(i & 0xFF) +
    String.fromCharCode(i >> 8 & 0xFF) +
    String.fromCharCode(i >> 16 & 0xFF));
};

/**
 * Puts a 32-bit integer in this buffer in little-endian order.
 *
 * @param i the 32-bit integer.
 *
 * @return this buffer.
 */
util.ByteStringBuffer.prototype.putInt32Le = function(i) {
  return this.putBytes(
    String.fromCharCode(i & 0xFF) +
    String.fromCharCode(i >> 8 & 0xFF) +
    String.fromCharCode(i >> 16 & 0xFF) +
    String.fromCharCode(i >> 24 & 0xFF));
};

/**
 * Puts an n-bit integer in this buffer in big-endian order.
 *
 * @param i the n-bit integer.
 * @param n the number of bits in the integer (8, 16, 24, or 32).
 *
 * @return this buffer.
 */
util.ByteStringBuffer.prototype.putInt = function(i, n) {
  _checkBitsParam(n);
  var bytes = '';
  do {
    n -= 8;
    bytes += String.fromCharCode((i >> n) & 0xFF);
  } while(n > 0);
  return this.putBytes(bytes);
};

/**
 * Puts a signed n-bit integer in this buffer in big-endian order. Two's
 * complement representation is used.
 *
 * @param i the n-bit integer.
 * @param n the number of bits in the integer (8, 16, 24, or 32).
 *
 * @return this buffer.
 */
util.ByteStringBuffer.prototype.putSignedInt = function(i, n) {
  // putInt checks n
  if(i < 0) {
    i += 2 << (n - 1);
  }
  return this.putInt(i, n);
};

/**
 * Puts the given buffer into this buffer.
 *
 * @param buffer the buffer to put into this one.
 *
 * @return this buffer.
 */
util.ByteStringBuffer.prototype.putBuffer = function(buffer) {
  return this.putBytes(buffer.getBytes());
};

/**
 * Gets a byte from this buffer and advances the read pointer by 1.
 *
 * @return the byte.
 */
util.ByteStringBuffer.prototype.getByte = function() {
  return this.data.charCodeAt(this.read++);
};

/**
 * Gets a uint16 from this buffer in big-endian order and advances the read
 * pointer by 2.
 *
 * @return the uint16.
 */
util.ByteStringBuffer.prototype.getInt16 = function() {
  var rval = (
    this.data.charCodeAt(this.read) << 8 ^
    this.data.charCodeAt(this.read + 1));
  this.read += 2;
  return rval;
};

/**
 * Gets a uint24 from this buffer in big-endian order and advances the read
 * pointer by 3.
 *
 * @return the uint24.
 */
util.ByteStringBuffer.prototype.getInt24 = function() {
  var rval = (
    this.data.charCodeAt(this.read) << 16 ^
    this.data.charCodeAt(this.read + 1) << 8 ^
    this.data.charCodeAt(this.read + 2));
  this.read += 3;
  return rval;
};

/**
 * Gets a uint32 from this buffer in big-endian order and advances the read
 * pointer by 4.
 *
 * @return the word.
 */
util.ByteStringBuffer.prototype.getInt32 = function() {
  var rval = (
    this.data.charCodeAt(this.read) << 24 ^
    this.data.charCodeAt(this.read + 1) << 16 ^
    this.data.charCodeAt(this.read + 2) << 8 ^
    this.data.charCodeAt(this.read + 3));
  this.read += 4;
  return rval;
};

/**
 * Gets a uint16 from this buffer in little-endian order and advances the read
 * pointer by 2.
 *
 * @return the uint16.
 */
util.ByteStringBuffer.prototype.getInt16Le = function() {
  var rval = (
    this.data.charCodeAt(this.read) ^
    this.data.charCodeAt(this.read + 1) << 8);
  this.read += 2;
  return rval;
};

/**
 * Gets a uint24 from this buffer in little-endian order and advances the read
 * pointer by 3.
 *
 * @return the uint24.
 */
util.ByteStringBuffer.prototype.getInt24Le = function() {
  var rval = (
    this.data.charCodeAt(this.read) ^
    this.data.charCodeAt(this.read + 1) << 8 ^
    this.data.charCodeAt(this.read + 2) << 16);
  this.read += 3;
  return rval;
};

/**
 * Gets a uint32 from this buffer in little-endian order and advances the read
 * pointer by 4.
 *
 * @return the word.
 */
util.ByteStringBuffer.prototype.getInt32Le = function() {
  var rval = (
    this.data.charCodeAt(this.read) ^
    this.data.charCodeAt(this.read + 1) << 8 ^
    this.data.charCodeAt(this.read + 2) << 16 ^
    this.data.charCodeAt(this.read + 3) << 24);
  this.read += 4;
  return rval;
};

/**
 * Gets an n-bit integer from this buffer in big-endian order and advances the
 * read pointer by ceil(n/8).
 *
 * @param n the number of bits in the integer (8, 16, 24, or 32).
 *
 * @return the integer.
 */
util.ByteStringBuffer.prototype.getInt = function(n) {
  _checkBitsParam(n);
  var rval = 0;
  do {
    // TODO: Use (rval * 0x100) if adding support for 33 to 53 bits.
    rval = (rval << 8) + this.data.charCodeAt(this.read++);
    n -= 8;
  } while(n > 0);
  return rval;
};

/**
 * Gets a signed n-bit integer from this buffer in big-endian order, using
 * two's complement, and advances the read pointer by n/8.
 *
 * @param n the number of bits in the integer (8, 16, 24, or 32).
 *
 * @return the integer.
 */
util.ByteStringBuffer.prototype.getSignedInt = function(n) {
  // getInt checks n
  var x = this.getInt(n);
  var max = 2 << (n - 2);
  if(x >= max) {
    x -= max << 1;
  }
  return x;
};

/**
 * Reads bytes out as a binary encoded string and clears them from the
 * buffer. Note that the resulting string is binary encoded (in node.js this
 * encoding is referred to as `binary`, it is *not* `utf8`).
 *
 * @param count the number of bytes to read, undefined or null for all.
 *
 * @return a binary encoded string of bytes.
 */
util.ByteStringBuffer.prototype.getBytes = function(count) {
  var rval;
  if(count) {
    // read count bytes
    count = Math.min(this.length(), count);
    rval = this.data.slice(this.read, this.read + count);
    this.read += count;
  } else if(count === 0) {
    rval = '';
  } else {
    // read all bytes, optimize to only copy when needed
    rval = (this.read === 0) ? this.data : this.data.slice(this.read);
    this.clear();
  }
  return rval;
};

/**
 * Gets a binary encoded string of the bytes from this buffer without
 * modifying the read pointer.
 *
 * @param count the number of bytes to get, omit to get all.
 *
 * @return a string full of binary encoded characters.
 */
util.ByteStringBuffer.prototype.bytes = function(count) {
  return (typeof(count) === 'undefined' ?
    this.data.slice(this.read) :
    this.data.slice(this.read, this.read + count));
};

/**
 * Gets a byte at the given index without modifying the read pointer.
 *
 * @param i the byte index.
 *
 * @return the byte.
 */
util.ByteStringBuffer.prototype.at = function(i) {
  return this.data.charCodeAt(this.read + i);
};

/**
 * Puts a byte at the given index without modifying the read pointer.
 *
 * @param i the byte index.
 * @param b the byte to put.
 *
 * @return this buffer.
 */
util.ByteStringBuffer.prototype.setAt = function(i, b) {
  this.data = this.data.substr(0, this.read + i) +
    String.fromCharCode(b) +
    this.data.substr(this.read + i + 1);
  return this;
};

/**
 * Gets the last byte without modifying the read pointer.
 *
 * @return the last byte.
 */
util.ByteStringBuffer.prototype.last = function() {
  return this.data.charCodeAt(this.data.length - 1);
};

/**
 * Creates a copy of this buffer.
 *
 * @return the copy.
 */
util.ByteStringBuffer.prototype.copy = function() {
  var c = util.createBuffer(this.data);
  c.read = this.read;
  return c;
};

/**
 * Compacts this buffer.
 *
 * @return this buffer.
 */
util.ByteStringBuffer.prototype.compact = function() {
  if(this.read > 0) {
    this.data = this.data.slice(this.read);
    this.read = 0;
  }
  return this;
};

/**
 * Clears this buffer.
 *
 * @return this buffer.
 */
util.ByteStringBuffer.prototype.clear = function() {
  this.data = '';
  this.read = 0;
  return this;
};

/**
 * Shortens this buffer by triming bytes off of the end of this buffer.
 *
 * @param count the number of bytes to trim off.
 *
 * @return this buffer.
 */
util.ByteStringBuffer.prototype.truncate = function(count) {
  var len = Math.max(0, this.length() - count);
  this.data = this.data.substr(this.read, len);
  this.read = 0;
  return this;
};

/**
 * Converts this buffer to a hexadecimal string.
 *
 * @return a hexadecimal string.
 */
util.ByteStringBuffer.prototype.toHex = function() {
  var rval = '';
  for(var i = this.read; i < this.data.length; ++i) {
    var b = this.data.charCodeAt(i);
    if(b < 16) {
      rval += '0';
    }
    rval += b.toString(16);
  }
  return rval;
};

/**
 * Converts this buffer to a UTF-16 string (standard JavaScript string).
 *
 * @return a UTF-16 string.
 */
util.ByteStringBuffer.prototype.toString = function() {
  return util.decodeUtf8(this.bytes());
};

/** End Buffer w/BinaryString backing */

/** Buffer w/UInt8Array backing */

/**
 * FIXME: Experimental. Do not use yet.
 *
 * Constructor for an ArrayBuffer-backed byte buffer.
 *
 * The buffer may be constructed from a string, an ArrayBuffer, DataView, or a
 * TypedArray.
 *
 * If a string is given, its encoding should be provided as an option,
 * otherwise it will default to 'binary'. A 'binary' string is encoded such
 * that each character is one byte in length and size.
 *
 * If an ArrayBuffer, DataView, or TypedArray is given, it will be used
 * *directly* without any copying. Note that, if a write to the buffer requires
 * more space, the buffer will allocate a new backing ArrayBuffer to
 * accommodate. The starting read and write offsets for the buffer may be
 * given as options.
 *
 * @param [b] the initial bytes for this buffer.
 * @param options the options to use:
 *          [readOffset] the starting read offset to use (default: 0).
 *          [writeOffset] the starting write offset to use (default: the
 *            length of the first parameter).
 *          [growSize] the minimum amount, in bytes, to grow the buffer by to
 *            accommodate writes (default: 1024).
 *          [encoding] the encoding ('binary', 'utf8', 'utf16', 'hex') for the
 *            first parameter, if it is a string (default: 'binary').
 */
function DataBuffer(b, options) {
  // default options
  options = options || {};

  // pointers for read from/write to buffer
  this.read = options.readOffset || 0;
  this.growSize = options.growSize || 1024;

  var isArrayBuffer = util.isArrayBuffer(b);
  var isArrayBufferView = util.isArrayBufferView(b);
  if(isArrayBuffer || isArrayBufferView) {
    // use ArrayBuffer directly
    if(isArrayBuffer) {
      this.data = new DataView(b);
    } else {
      // TODO: adjust read/write offset based on the type of view
      // or specify that this must be done in the options ... that the
      // offsets are byte-based
      this.data = new DataView(b.buffer, b.byteOffset, b.byteLength);
    }
    this.write = ('writeOffset' in options ?
      options.writeOffset : this.data.byteLength);
    return;
  }

  // initialize to empty array buffer and add any given bytes using putBytes
  this.data = new DataView(new ArrayBuffer(0));
  this.write = 0;

  if(b !== null && b !== undefined) {
    this.putBytes(b);
  }

  if('writeOffset' in options) {
    this.write = options.writeOffset;
  }
}
util.DataBuffer = DataBuffer;

/**
 * Gets the number of bytes in this buffer.
 *
 * @return the number of bytes in this buffer.
 */
util.DataBuffer.prototype.length = function() {
  return this.write - this.read;
};

/**
 * Gets whether or not this buffer is empty.
 *
 * @return true if this buffer is empty, false if not.
 */
util.DataBuffer.prototype.isEmpty = function() {
  return this.length() <= 0;
};

/**
 * Ensures this buffer has enough empty space to accommodate the given number
 * of bytes. An optional parameter may be given that indicates a minimum
 * amount to grow the buffer if necessary. If the parameter is not given,
 * the buffer will be grown by some previously-specified default amount
 * or heuristic.
 *
 * @param amount the number of bytes to accommodate.
 * @param [growSize] the minimum amount, in bytes, to grow the buffer by if
 *          necessary.
 */
util.DataBuffer.prototype.accommodate = function(amount, growSize) {
  if(this.length() >= amount) {
    return this;
  }
  growSize = Math.max(growSize || this.growSize, amount);

  // grow buffer
  var src = new Uint8Array(
    this.data.buffer, this.data.byteOffset, this.data.byteLength);
  var dst = new Uint8Array(this.length() + growSize);
  dst.set(src);
  this.data = new DataView(dst.buffer);

  return this;
};

/**
 * Puts a byte in this buffer.
 *
 * @param b the byte to put.
 *
 * @return this buffer.
 */
util.DataBuffer.prototype.putByte = function(b) {
  this.accommodate(1);
  this.data.setUint8(this.write++, b);
  return this;
};

/**
 * Puts a byte in this buffer N times.
 *
 * @param b the byte to put.
 * @param n the number of bytes of value b to put.
 *
 * @return this buffer.
 */
util.DataBuffer.prototype.fillWithByte = function(b, n) {
  this.accommodate(n);
  for(var i = 0; i < n; ++i) {
    this.data.setUint8(b);
  }
  return this;
};

/**
 * Puts bytes in this buffer. The bytes may be given as a string, an
 * ArrayBuffer, a DataView, or a TypedArray.
 *
 * @param bytes the bytes to put.
 * @param [encoding] the encoding for the first parameter ('binary', 'utf8',
 *          'utf16', 'hex'), if it is a string (default: 'binary').
 *
 * @return this buffer.
 */
util.DataBuffer.prototype.putBytes = function(bytes, encoding) {
  if(util.isArrayBufferView(bytes)) {
    var src = new Uint8Array(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    var len = src.byteLength - src.byteOffset;
    this.accommodate(len);
    var dst = new Uint8Array(this.data.buffer, this.write);
    dst.set(src);
    this.write += len;
    return this;
  }

  if(util.isArrayBuffer(bytes)) {
    var src = new Uint8Array(bytes);
    this.accommodate(src.byteLength);
    var dst = new Uint8Array(this.data.buffer);
    dst.set(src, this.write);
    this.write += src.byteLength;
    return this;
  }

  // bytes is a util.DataBuffer or equivalent
  if(bytes instanceof util.DataBuffer ||
    (typeof bytes === 'object' &&
    typeof bytes.read === 'number' && typeof bytes.write === 'number' &&
    util.isArrayBufferView(bytes.data))) {
    var src = new Uint8Array(bytes.data.byteLength, bytes.read, bytes.length());
    this.accommodate(src.byteLength);
    var dst = new Uint8Array(bytes.data.byteLength, this.write);
    dst.set(src);
    this.write += src.byteLength;
    return this;
  }

  if(bytes instanceof util.ByteStringBuffer) {
    // copy binary string and process as the same as a string parameter below
    bytes = bytes.data;
    encoding = 'binary';
  }

  // string conversion
  encoding = encoding || 'binary';
  if(typeof bytes === 'string') {
    var view;

    // decode from string
    if(encoding === 'hex') {
      this.accommodate(Math.ceil(bytes.length / 2));
      view = new Uint8Array(this.data.buffer, this.write);
      this.write += util.binary.hex.decode(bytes, view, this.write);
      return this;
    }
    if(encoding === 'base64') {
      this.accommodate(Math.ceil(bytes.length / 4) * 3);
      view = new Uint8Array(this.data.buffer, this.write);
      this.write += util.binary.base64.decode(bytes, view, this.write);
      return this;
    }

    // encode text as UTF-8 bytes
    if(encoding === 'utf8') {
      // encode as UTF-8 then decode string as raw binary
      bytes = util.encodeUtf8(bytes);
      encoding = 'binary';
    }

    // decode string as raw binary
    if(encoding === 'binary' || encoding === 'raw') {
      // one byte per character
      this.accommodate(bytes.length);
      view = new Uint8Array(this.data.buffer, this.write);
      this.write += util.binary.raw.decode(view);
      return this;
    }

    // encode text as UTF-16 bytes
    if(encoding === 'utf16') {
      // two bytes per character
      this.accommodate(bytes.length * 2);
      view = new Uint16Array(this.data.buffer, this.write);
      this.write += util.text.utf16.encode(view);
      return this;
    }

    throw new Error('Invalid encoding: ' + encoding);
  }

  throw Error('Invalid parameter: ' + bytes);
};

/**
 * Puts the given buffer into this buffer.
 *
 * @param buffer the buffer to put into this one.
 *
 * @return this buffer.
 */
util.DataBuffer.prototype.putBuffer = function(buffer) {
  this.putBytes(buffer);
  buffer.clear();
  return this;
};

/**
 * Puts a string into this buffer.
 *
 * @param str the string to put.
 * @param [encoding] the encoding for the string (default: 'utf16').
 *
 * @return this buffer.
 */
util.DataBuffer.prototype.putString = function(str) {
  return this.putBytes(str, 'utf16');
};

/**
 * Puts a 16-bit integer in this buffer in big-endian order.
 *
 * @param i the 16-bit integer.
 *
 * @return this buffer.
 */
util.DataBuffer.prototype.putInt16 = function(i) {
  this.accommodate(2);
  this.data.setInt16(this.write, i);
  this.write += 2;
  return this;
};

/**
 * Puts a 24-bit integer in this buffer in big-endian order.
 *
 * @param i the 24-bit integer.
 *
 * @return this buffer.
 */
util.DataBuffer.prototype.putInt24 = function(i) {
  this.accommodate(3);
  this.data.setInt16(this.write, i >> 8 & 0xFFFF);
  this.data.setInt8(this.write, i >> 16 & 0xFF);
  this.write += 3;
  return this;
};

/**
 * Puts a 32-bit integer in this buffer in big-endian order.
 *
 * @param i the 32-bit integer.
 *
 * @return this buffer.
 */
util.DataBuffer.prototype.putInt32 = function(i) {
  this.accommodate(4);
  this.data.setInt32(this.write, i);
  this.write += 4;
  return this;
};

/**
 * Puts a 16-bit integer in this buffer in little-endian order.
 *
 * @param i the 16-bit integer.
 *
 * @return this buffer.
 */
util.DataBuffer.prototype.putInt16Le = function(i) {
  this.accommodate(2);
  this.data.setInt16(this.write, i, true);
  this.write += 2;
  return this;
};

/**
 * Puts a 24-bit integer in this buffer in little-endian order.
 *
 * @param i the 24-bit integer.
 *
 * @return this buffer.
 */
util.DataBuffer.prototype.putInt24Le = function(i) {
  this.accommodate(3);
  this.data.setInt8(this.write, i >> 16 & 0xFF);
  this.data.setInt16(this.write, i >> 8 & 0xFFFF, true);
  this.write += 3;
  return this;
};

/**
 * Puts a 32-bit integer in this buffer in little-endian order.
 *
 * @param i the 32-bit integer.
 *
 * @return this buffer.
 */
util.DataBuffer.prototype.putInt32Le = function(i) {
  this.accommodate(4);
  this.data.setInt32(this.write, i, true);
  this.write += 4;
  return this;
};

/**
 * Puts an n-bit integer in this buffer in big-endian order.
 *
 * @param i the n-bit integer.
 * @param n the number of bits in the integer (8, 16, 24, or 32).
 *
 * @return this buffer.
 */
util.DataBuffer.prototype.putInt = function(i, n) {
  _checkBitsParam(n);
  this.accommodate(n / 8);
  do {
    n -= 8;
    this.data.setInt8(this.write++, (i >> n) & 0xFF);
  } while(n > 0);
  return this;
};

/**
 * Puts a signed n-bit integer in this buffer in big-endian order. Two's
 * complement representation is used.
 *
 * @param i the n-bit integer.
 * @param n the number of bits in the integer.
 *
 * @return this buffer.
 */
util.DataBuffer.prototype.putSignedInt = function(i, n) {
  _checkBitsParam(n);
  this.accommodate(n / 8);
  if(i < 0) {
    i += 2 << (n - 1);
  }
  return this.putInt(i, n);
};

/**
 * Gets a byte from this buffer and advances the read pointer by 1.
 *
 * @return the byte.
 */
util.DataBuffer.prototype.getByte = function() {
  return this.data.getInt8(this.read++);
};

/**
 * Gets a uint16 from this buffer in big-endian order and advances the read
 * pointer by 2.
 *
 * @return the uint16.
 */
util.DataBuffer.prototype.getInt16 = function() {
  var rval = this.data.getInt16(this.read);
  this.read += 2;
  return rval;
};

/**
 * Gets a uint24 from this buffer in big-endian order and advances the read
 * pointer by 3.
 *
 * @return the uint24.
 */
util.DataBuffer.prototype.getInt24 = function() {
  var rval = (
    this.data.getInt16(this.read) << 8 ^
    this.data.getInt8(this.read + 2));
  this.read += 3;
  return rval;
};

/**
 * Gets a uint32 from this buffer in big-endian order and advances the read
 * pointer by 4.
 *
 * @return the word.
 */
util.DataBuffer.prototype.getInt32 = function() {
  var rval = this.data.getInt32(this.read);
  this.read += 4;
  return rval;
};

/**
 * Gets a uint16 from this buffer in little-endian order and advances the read
 * pointer by 2.
 *
 * @return the uint16.
 */
util.DataBuffer.prototype.getInt16Le = function() {
  var rval = this.data.getInt16(this.read, true);
  this.read += 2;
  return rval;
};

/**
 * Gets a uint24 from this buffer in little-endian order and advances the read
 * pointer by 3.
 *
 * @return the uint24.
 */
util.DataBuffer.prototype.getInt24Le = function() {
  var rval = (
    this.data.getInt8(this.read) ^
    this.data.getInt16(this.read + 1, true) << 8);
  this.read += 3;
  return rval;
};

/**
 * Gets a uint32 from this buffer in little-endian order and advances the read
 * pointer by 4.
 *
 * @return the word.
 */
util.DataBuffer.prototype.getInt32Le = function() {
  var rval = this.data.getInt32(this.read, true);
  this.read += 4;
  return rval;
};

/**
 * Gets an n-bit integer from this buffer in big-endian order and advances the
 * read pointer by n/8.
 *
 * @param n the number of bits in the integer (8, 16, 24, or 32).
 *
 * @return the integer.
 */
util.DataBuffer.prototype.getInt = function(n) {
  _checkBitsParam(n);
  var rval = 0;
  do {
    // TODO: Use (rval * 0x100) if adding support for 33 to 53 bits.
    rval = (rval << 8) + this.data.getInt8(this.read++);
    n -= 8;
  } while(n > 0);
  return rval;
};

/**
 * Gets a signed n-bit integer from this buffer in big-endian order, using
 * two's complement, and advances the read pointer by n/8.
 *
 * @param n the number of bits in the integer (8, 16, 24, or 32).
 *
 * @return the integer.
 */
util.DataBuffer.prototype.getSignedInt = function(n) {
  // getInt checks n
  var x = this.getInt(n);
  var max = 2 << (n - 2);
  if(x >= max) {
    x -= max << 1;
  }
  return x;
};

/**
 * Reads bytes out as a binary encoded string and clears them from the
 * buffer.
 *
 * @param count the number of bytes to read, undefined or null for all.
 *
 * @return a binary encoded string of bytes.
 */
util.DataBuffer.prototype.getBytes = function(count) {
  // TODO: deprecate this method, it is poorly named and
  // this.toString('binary') replaces it
  // add a toTypedArray()/toArrayBuffer() function
  var rval;
  if(count) {
    // read count bytes
    count = Math.min(this.length(), count);
    rval = this.data.slice(this.read, this.read + count);
    this.read += count;
  } else if(count === 0) {
    rval = '';
  } else {
    // read all bytes, optimize to only copy when needed
    rval = (this.read === 0) ? this.data : this.data.slice(this.read);
    this.clear();
  }
  return rval;
};

/**
 * Gets a binary encoded string of the bytes from this buffer without
 * modifying the read pointer.
 *
 * @param count the number of bytes to get, omit to get all.
 *
 * @return a string full of binary encoded characters.
 */
util.DataBuffer.prototype.bytes = function(count) {
  // TODO: deprecate this method, it is poorly named, add "getString()"
  return (typeof(count) === 'undefined' ?
    this.data.slice(this.read) :
    this.data.slice(this.read, this.read + count));
};

/**
 * Gets a byte at the given index without modifying the read pointer.
 *
 * @param i the byte index.
 *
 * @return the byte.
 */
util.DataBuffer.prototype.at = function(i) {
  return this.data.getUint8(this.read + i);
};

/**
 * Puts a byte at the given index without modifying the read pointer.
 *
 * @param i the byte index.
 * @param b the byte to put.
 *
 * @return this buffer.
 */
util.DataBuffer.prototype.setAt = function(i, b) {
  this.data.setUint8(i, b);
  return this;
};

/**
 * Gets the last byte without modifying the read pointer.
 *
 * @return the last byte.
 */
util.DataBuffer.prototype.last = function() {
  return this.data.getUint8(this.write - 1);
};

/**
 * Creates a copy of this buffer.
 *
 * @return the copy.
 */
util.DataBuffer.prototype.copy = function() {
  return new util.DataBuffer(this);
};

/**
 * Compacts this buffer.
 *
 * @return this buffer.
 */
util.DataBuffer.prototype.compact = function() {
  if(this.read > 0) {
    var src = new Uint8Array(this.data.buffer, this.read);
    var dst = new Uint8Array(src.byteLength);
    dst.set(src);
    this.data = new DataView(dst);
    this.write -= this.read;
    this.read = 0;
  }
  return this;
};

/**
 * Clears this buffer.
 *
 * @return this buffer.
 */
util.DataBuffer.prototype.clear = function() {
  this.data = new DataView(new ArrayBuffer(0));
  this.read = this.write = 0;
  return this;
};

/**
 * Shortens this buffer by triming bytes off of the end of this buffer.
 *
 * @param count the number of bytes to trim off.
 *
 * @return this buffer.
 */
util.DataBuffer.prototype.truncate = function(count) {
  this.write = Math.max(0, this.length() - count);
  this.read = Math.min(this.read, this.write);
  return this;
};

/**
 * Converts this buffer to a hexadecimal string.
 *
 * @return a hexadecimal string.
 */
util.DataBuffer.prototype.toHex = function() {
  var rval = '';
  for(var i = this.read; i < this.data.byteLength; ++i) {
    var b = this.data.getUint8(i);
    if(b < 16) {
      rval += '0';
    }
    rval += b.toString(16);
  }
  return rval;
};

/**
 * Converts this buffer to a string, using the given encoding. If no
 * encoding is given, 'utf8' (UTF-8) is used.
 *
 * @param [encoding] the encoding to use: 'binary', 'utf8', 'utf16', 'hex',
 *          'base64' (default: 'utf8').
 *
 * @return a string representation of the bytes in this buffer.
 */
util.DataBuffer.prototype.toString = function(encoding) {
  var view = new Uint8Array(this.data, this.read, this.length());
  encoding = encoding || 'utf8';

  // encode to string
  if(encoding === 'binary' || encoding === 'raw') {
    return util.binary.raw.encode(view);
  }
  if(encoding === 'hex') {
    return util.binary.hex.encode(view);
  }
  if(encoding === 'base64') {
    return util.binary.base64.encode(view);
  }

  // decode to text
  if(encoding === 'utf8') {
    return util.text.utf8.decode(view);
  }
  if(encoding === 'utf16') {
    return util.text.utf16.decode(view);
  }

  throw new Error('Invalid encoding: ' + encoding);
};

/** End Buffer w/UInt8Array backing */

/**
 * Creates a buffer that stores bytes. A value may be given to populate the
 * buffer with data. This value can either be string of encoded bytes or a
 * regular string of characters. When passing a string of binary encoded
 * bytes, the encoding `raw` should be given. This is also the default. When
 * passing a string of characters, the encoding `utf8` should be given.
 *
 * @param [input] a string with encoded bytes to store in the buffer.
 * @param [encoding] (default: 'raw', other: 'utf8').
 */
util.createBuffer = function(input, encoding) {
  // TODO: deprecate, use new ByteBuffer() instead
  encoding = encoding || 'raw';
  if(input !== undefined && encoding === 'utf8') {
    input = util.encodeUtf8(input);
  }
  return new util.ByteBuffer(input);
};

/**
 * Fills a string with a particular value. If you want the string to be a byte
 * string, pass in String.fromCharCode(theByte).
 *
 * @param c the character to fill the string with, use String.fromCharCode
 *          to fill the string with a byte value.
 * @param n the number of characters of value c to fill with.
 *
 * @return the filled string.
 */
util.fillString = function(c, n) {
  var s = '';
  while(n > 0) {
    if(n & 1) {
      s += c;
    }
    n >>>= 1;
    if(n > 0) {
      c += c;
    }
  }
  return s;
};

/**
 * Performs a per byte XOR between two byte strings and returns the result as a
 * string of bytes.
 *
 * @param s1 first string of bytes.
 * @param s2 second string of bytes.
 * @param n the number of bytes to XOR.
 *
 * @return the XOR'd result.
 */
util.xorBytes = function(s1, s2, n) {
  var s3 = '';
  var b = '';
  var t = '';
  var i = 0;
  var c = 0;
  for(; n > 0; --n, ++i) {
    b = s1.charCodeAt(i) ^ s2.charCodeAt(i);
    if(c >= 10) {
      s3 += t;
      t = '';
      c = 0;
    }
    t += String.fromCharCode(b);
    ++c;
  }
  s3 += t;
  return s3;
};

/**
 * Converts a hex string into a 'binary' encoded string of bytes.
 *
 * @param hex the hexadecimal string to convert.
 *
 * @return the binary-encoded string of bytes.
 */
util.hexToBytes = function(hex) {
  // TODO: deprecate: "Deprecated. Use util.binary.hex.decode instead."
  var rval = '';
  var i = 0;
  if(hex.length & 1 == 1) {
    // odd number of characters, convert first character alone
    i = 1;
    rval += String.fromCharCode(parseInt(hex[0], 16));
  }
  // convert 2 characters (1 byte) at a time
  for(; i < hex.length; i += 2) {
    rval += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  }
  return rval;
};

/**
 * Converts a 'binary' encoded string of bytes to hex.
 *
 * @param bytes the byte string to convert.
 *
 * @return the string of hexadecimal characters.
 */
util.bytesToHex = function(bytes) {
  // TODO: deprecate: "Deprecated. Use util.binary.hex.encode instead."
  return util.createBuffer(bytes).toHex();
};

/**
 * Converts an 32-bit integer to 4-big-endian byte string.
 *
 * @param i the integer.
 *
 * @return the byte string.
 */
util.int32ToBytes = function(i) {
  return (
    String.fromCharCode(i >> 24 & 0xFF) +
    String.fromCharCode(i >> 16 & 0xFF) +
    String.fromCharCode(i >> 8 & 0xFF) +
    String.fromCharCode(i & 0xFF));
};

// base64 characters, reverse mapping
var _base64 =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
var _base64Idx = [
/*43 -43 = 0*/
/*'+',  1,  2,  3,'/' */
   62, -1, -1, -1, 63,

/*'0','1','2','3','4','5','6','7','8','9' */
   52, 53, 54, 55, 56, 57, 58, 59, 60, 61,

/*15, 16, 17,'=', 19, 20, 21 */
  -1, -1, -1, 64, -1, -1, -1,

/*65 - 43 = 22*/
/*'A','B','C','D','E','F','G','H','I','J','K','L','M', */
   0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12,

/*'N','O','P','Q','R','S','T','U','V','W','X','Y','Z' */
   13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,

/*91 - 43 = 48 */
/*48, 49, 50, 51, 52, 53 */
  -1, -1, -1, -1, -1, -1,

/*97 - 43 = 54*/
/*'a','b','c','d','e','f','g','h','i','j','k','l','m' */
   26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38,

/*'n','o','p','q','r','s','t','u','v','w','x','y','z' */
   39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51
];

// base58 characters (Bitcoin alphabet)
var _base58 = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

/**
 * Base64 encodes a 'binary' encoded string of bytes.
 *
 * @param input the binary encoded string of bytes to base64-encode.
 * @param maxline the maximum number of encoded characters per line to use,
 *          defaults to none.
 *
 * @return the base64-encoded output.
 */
util.encode64 = function(input, maxline) {
  // TODO: deprecate: "Deprecated. Use util.binary.base64.encode instead."
  var line = '';
  var output = '';
  var chr1, chr2, chr3;
  var i = 0;
  while(i < input.length) {
    chr1 = input.charCodeAt(i++);
    chr2 = input.charCodeAt(i++);
    chr3 = input.charCodeAt(i++);

    // encode 4 character group
    line += _base64.charAt(chr1 >> 2);
    line += _base64.charAt(((chr1 & 3) << 4) | (chr2 >> 4));
    if(isNaN(chr2)) {
      line += '==';
    } else {
      line += _base64.charAt(((chr2 & 15) << 2) | (chr3 >> 6));
      line += isNaN(chr3) ? '=' : _base64.charAt(chr3 & 63);
    }

    if(maxline && line.length > maxline) {
      output += line.substr(0, maxline) + '\r\n';
      line = line.substr(maxline);
    }
  }
  output += line;
  return output;
};

/**
 * Base64 decodes a string into a 'binary' encoded string of bytes.
 *
 * @param input the base64-encoded input.
 *
 * @return the binary encoded string.
 */
util.decode64 = function(input) {
  // TODO: deprecate: "Deprecated. Use util.binary.base64.decode instead."

  // remove all non-base64 characters
  input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');

  var output = '';
  var enc1, enc2, enc3, enc4;
  var i = 0;

  while(i < input.length) {
    enc1 = _base64Idx[input.charCodeAt(i++) - 43];
    enc2 = _base64Idx[input.charCodeAt(i++) - 43];
    enc3 = _base64Idx[input.charCodeAt(i++) - 43];
    enc4 = _base64Idx[input.charCodeAt(i++) - 43];

    output += String.fromCharCode((enc1 << 2) | (enc2 >> 4));
    if(enc3 !== 64) {
      // decoded at least 2 bytes
      output += String.fromCharCode(((enc2 & 15) << 4) | (enc3 >> 2));
      if(enc4 !== 64) {
        // decoded 3 bytes
        output += String.fromCharCode(((enc3 & 3) << 6) | enc4);
      }
    }
  }

  return output;
};

/**
 * Encodes the given string of characters (a standard JavaScript
 * string) as a binary encoded string where the bytes represent
 * a UTF-8 encoded string of characters. Non-ASCII characters will be
 * encoded as multiple bytes according to UTF-8.
 *
 * @param str a standard string of characters to encode.
 *
 * @return the binary encoded string.
 */
util.encodeUtf8 = function(str) {
  return unescape(encodeURIComponent(str));
};

/**
 * Decodes a binary encoded string that contains bytes that
 * represent a UTF-8 encoded string of characters -- into a
 * string of characters (a standard JavaScript string).
 *
 * @param str the binary encoded string to decode.
 *
 * @return the resulting standard string of characters.
 */
util.decodeUtf8 = function(str) {
  return decodeURIComponent(escape(str));
};

// binary encoding/decoding tools
// FIXME: Experimental. Do not use yet.
util.binary = {
  raw: {},
  hex: {},
  base64: {},
  base58: {},
  baseN : {
    encode: baseN.encode,
    decode: baseN.decode
  }
};

/**
 * Encodes a Uint8Array as a binary-encoded string. This encoding uses
 * a value between 0 and 255 for each character.
 *
 * @param bytes the Uint8Array to encode.
 *
 * @return the binary-encoded string.
 */
util.binary.raw.encode = function(bytes) {
  return String.fromCharCode.apply(null, bytes);
};

/**
 * Decodes a binary-encoded string to a Uint8Array. This encoding uses
 * a value between 0 and 255 for each character.
 *
 * @param str the binary-encoded string to decode.
 * @param [output] an optional Uint8Array to write the output to; if it
 *          is too small, an exception will be thrown.
 * @param [offset] the start offset for writing to the output (default: 0).
 *
 * @return the Uint8Array or the number of bytes written if output was given.
 */
util.binary.raw.decode = function(str, output, offset) {
  var out = output;
  if(!out) {
    out = new Uint8Array(str.length);
  }
  offset = offset || 0;
  var j = offset;
  for(var i = 0; i < str.length; ++i) {
    out[j++] = str.charCodeAt(i);
  }
  return output ? (j - offset) : out;
};

/**
 * Encodes a 'binary' string, ArrayBuffer, DataView, TypedArray, or
 * ByteBuffer as a string of hexadecimal characters.
 *
 * @param bytes the bytes to convert.
 *
 * @return the string of hexadecimal characters.
 */
util.binary.hex.encode = util.bytesToHex;

/**
 * Decodes a hex-encoded string to a Uint8Array.
 *
 * @param hex the hexadecimal string to convert.
 * @param [output] an optional Uint8Array to write the output to; if it
 *          is too small, an exception will be thrown.
 * @param [offset] the start offset for writing to the output (default: 0).
 *
 * @return the Uint8Array or the number of bytes written if output was given.
 */
util.binary.hex.decode = function(hex, output, offset) {
  var out = output;
  if(!out) {
    out = new Uint8Array(Math.ceil(hex.length / 2));
  }
  offset = offset || 0;
  var i = 0, j = offset;
  if(hex.length & 1) {
    // odd number of characters, convert first character alone
    i = 1;
    out[j++] = parseInt(hex[0], 16);
  }
  // convert 2 characters (1 byte) at a time
  for(; i < hex.length; i += 2) {
    out[j++] = parseInt(hex.substr(i, 2), 16);
  }
  return output ? (j - offset) : out;
};

/**
 * Base64-encodes a Uint8Array.
 *
 * @param input the Uint8Array to encode.
 * @param maxline the maximum number of encoded characters per line to use,
 *          defaults to none.
 *
 * @return the base64-encoded output string.
 */
util.binary.base64.encode = function(input, maxline) {
  var line = '';
  var output = '';
  var chr1, chr2, chr3;
  var i = 0;
  while(i < input.byteLength) {
    chr1 = input[i++];
    chr2 = input[i++];
    chr3 = input[i++];

    // encode 4 character group
    line += _base64.charAt(chr1 >> 2);
    line += _base64.charAt(((chr1 & 3) << 4) | (chr2 >> 4));
    if(isNaN(chr2)) {
      line += '==';
    } else {
      line += _base64.charAt(((chr2 & 15) << 2) | (chr3 >> 6));
      line += isNaN(chr3) ? '=' : _base64.charAt(chr3 & 63);
    }

    if(maxline && line.length > maxline) {
      output += line.substr(0, maxline) + '\r\n';
      line = line.substr(maxline);
    }
  }
  output += line;
  return output;
};

/**
 * Decodes a base64-encoded string to a Uint8Array.
 *
 * @param input the base64-encoded input string.
 * @param [output] an optional Uint8Array to write the output to; if it
 *          is too small, an exception will be thrown.
 * @param [offset] the start offset for writing to the output (default: 0).
 *
 * @return the Uint8Array or the number of bytes written if output was given.
 */
util.binary.base64.decode = function(input, output, offset) {
  var out = output;
  if(!out) {
    out = new Uint8Array(Math.ceil(input.length / 4) * 3);
  }

  // remove all non-base64 characters
  input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');

  offset = offset || 0;
  var enc1, enc2, enc3, enc4;
  var i = 0, j = offset;

  while(i < input.length) {
    enc1 = _base64Idx[input.charCodeAt(i++) - 43];
    enc2 = _base64Idx[input.charCodeAt(i++) - 43];
    enc3 = _base64Idx[input.charCodeAt(i++) - 43];
    enc4 = _base64Idx[input.charCodeAt(i++) - 43];

    out[j++] = (enc1 << 2) | (enc2 >> 4);
    if(enc3 !== 64) {
      // decoded at least 2 bytes
      out[j++] = ((enc2 & 15) << 4) | (enc3 >> 2);
      if(enc4 !== 64) {
        // decoded 3 bytes
        out[j++] = ((enc3 & 3) << 6) | enc4;
      }
    }
  }

  // make sure result is the exact decoded length
  return output ? (j - offset) : out.subarray(0, j);
};

// add support for base58 encoding/decoding with Bitcoin alphabet
util.binary.base58.encode = function(input, maxline) {
  return util.binary.baseN.encode(input, _base58, maxline);
};
util.binary.base58.decode = function(input, maxline) {
  return util.binary.baseN.decode(input, _base58, maxline);
};

// text encoding/decoding tools
// FIXME: Experimental. Do not use yet.
util.text = {
  utf8: {},
  utf16: {}
};

/**
 * Encodes the given string as UTF-8 in a Uint8Array.
 *
 * @param str the string to encode.
 * @param [output] an optional Uint8Array to write the output to; if it
 *          is too small, an exception will be thrown.
 * @param [offset] the start offset for writing to the output (default: 0).
 *
 * @return the Uint8Array or the number of bytes written if output was given.
 */
util.text.utf8.encode = function(str, output, offset) {
  str = util.encodeUtf8(str);
  var out = output;
  if(!out) {
    out = new Uint8Array(str.length);
  }
  offset = offset || 0;
  var j = offset;
  for(var i = 0; i < str.length; ++i) {
    out[j++] = str.charCodeAt(i);
  }
  return output ? (j - offset) : out;
};

/**
 * Decodes the UTF-8 contents from a Uint8Array.
 *
 * @param bytes the Uint8Array to decode.
 *
 * @return the resulting string.
 */
util.text.utf8.decode = function(bytes) {
  return util.decodeUtf8(String.fromCharCode.apply(null, bytes));
};

/**
 * Encodes the given string as UTF-16 in a Uint8Array.
 *
 * @param str the string to encode.
 * @param [output] an optional Uint8Array to write the output to; if it
 *          is too small, an exception will be thrown.
 * @param [offset] the start offset for writing to the output (default: 0).
 *
 * @return the Uint8Array or the number of bytes written if output was given.
 */
util.text.utf16.encode = function(str, output, offset) {
  var out = output;
  if(!out) {
    out = new Uint8Array(str.length * 2);
  }
  var view = new Uint16Array(out.buffer);
  offset = offset || 0;
  var j = offset;
  var k = offset;
  for(var i = 0; i < str.length; ++i) {
    view[k++] = str.charCodeAt(i);
    j += 2;
  }
  return output ? (j - offset) : out;
};

/**
 * Decodes the UTF-16 contents from a Uint8Array.
 *
 * @param bytes the Uint8Array to decode.
 *
 * @return the resulting string.
 */
util.text.utf16.decode = function(bytes) {
  return String.fromCharCode.apply(null, new Uint16Array(bytes.buffer));
};

/**
 * Deflates the given data using a flash interface.
 *
 * @param api the flash interface.
 * @param bytes the data.
 * @param raw true to return only raw deflate data, false to include zlib
 *          header and trailer.
 *
 * @return the deflated data as a string.
 */
util.deflate = function(api, bytes, raw) {
  bytes = util.decode64(api.deflate(util.encode64(bytes)).rval);

  // strip zlib header and trailer if necessary
  if(raw) {
    // zlib header is 2 bytes (CMF,FLG) where FLG indicates that
    // there is a 4-byte DICT (alder-32) block before the data if
    // its 5th bit is set
    var start = 2;
    var flg = bytes.charCodeAt(1);
    if(flg & 0x20) {
      start = 6;
    }
    // zlib trailer is 4 bytes of adler-32
    bytes = bytes.substring(start, bytes.length - 4);
  }

  return bytes;
};

/**
 * Inflates the given data using a flash interface.
 *
 * @param api the flash interface.
 * @param bytes the data.
 * @param raw true if the incoming data has no zlib header or trailer and is
 *          raw DEFLATE data.
 *
 * @return the inflated data as a string, null on error.
 */
util.inflate = function(api, bytes, raw) {
  // TODO: add zlib header and trailer if necessary/possible
  var rval = api.inflate(util.encode64(bytes)).rval;
  return (rval === null) ? null : util.decode64(rval);
};

/**
 * Sets a storage object.
 *
 * @param api the storage interface.
 * @param id the storage ID to use.
 * @param obj the storage object, null to remove.
 */
var _setStorageObject = function(api, id, obj) {
  if(!api) {
    throw new Error('WebStorage not available.');
  }

  var rval;
  if(obj === null) {
    rval = api.removeItem(id);
  } else {
    // json-encode and base64-encode object
    obj = util.encode64(JSON.stringify(obj));
    rval = api.setItem(id, obj);
  }

  // handle potential flash error
  if(typeof(rval) !== 'undefined' && rval.rval !== true) {
    var error = new Error(rval.error.message);
    error.id = rval.error.id;
    error.name = rval.error.name;
    throw error;
  }
};

/**
 * Gets a storage object.
 *
 * @param api the storage interface.
 * @param id the storage ID to use.
 *
 * @return the storage object entry or null if none exists.
 */
var _getStorageObject = function(api, id) {
  if(!api) {
    throw new Error('WebStorage not available.');
  }

  // get the existing entry
  var rval = api.getItem(id);

  /* Note: We check api.init because we can't do (api == localStorage)
    on IE because of "Class doesn't support Automation" exception. Only
    the flash api has an init method so this works too, but we need a
    better solution in the future. */

  // flash returns item wrapped in an object, handle special case
  if(api.init) {
    if(rval.rval === null) {
      if(rval.error) {
        var error = new Error(rval.error.message);
        error.id = rval.error.id;
        error.name = rval.error.name;
        throw error;
      }
      // no error, but also no item
      rval = null;
    } else {
      rval = rval.rval;
    }
  }

  // handle decoding
  if(rval !== null) {
    // base64-decode and json-decode data
    rval = JSON.parse(util.decode64(rval));
  }

  return rval;
};

/**
 * Stores an item in local storage.
 *
 * @param api the storage interface.
 * @param id the storage ID to use.
 * @param key the key for the item.
 * @param data the data for the item (any javascript object/primitive).
 */
var _setItem = function(api, id, key, data) {
  // get storage object
  var obj = _getStorageObject(api, id);
  if(obj === null) {
    // create a new storage object
    obj = {};
  }
  // update key
  obj[key] = data;

  // set storage object
  _setStorageObject(api, id, obj);
};

/**
 * Gets an item from local storage.
 *
 * @param api the storage interface.
 * @param id the storage ID to use.
 * @param key the key for the item.
 *
 * @return the item.
 */
var _getItem = function(api, id, key) {
  // get storage object
  var rval = _getStorageObject(api, id);
  if(rval !== null) {
    // return data at key
    rval = (key in rval) ? rval[key] : null;
  }

  return rval;
};

/**
 * Removes an item from local storage.
 *
 * @param api the storage interface.
 * @param id the storage ID to use.
 * @param key the key for the item.
 */
var _removeItem = function(api, id, key) {
  // get storage object
  var obj = _getStorageObject(api, id);
  if(obj !== null && key in obj) {
    // remove key
    delete obj[key];

    // see if entry has no keys remaining
    var empty = true;
    for(var prop in obj) {
      empty = false;
      break;
    }
    if(empty) {
      // remove entry entirely if no keys are left
      obj = null;
    }

    // set storage object
    _setStorageObject(api, id, obj);
  }
};

/**
 * Clears the local disk storage identified by the given ID.
 *
 * @param api the storage interface.
 * @param id the storage ID to use.
 */
var _clearItems = function(api, id) {
  _setStorageObject(api, id, null);
};

/**
 * Calls a storage function.
 *
 * @param func the function to call.
 * @param args the arguments for the function.
 * @param location the location argument.
 *
 * @return the return value from the function.
 */
var _callStorageFunction = function(func, args, location) {
  var rval = null;

  // default storage types
  if(typeof(location) === 'undefined') {
    location = ['web', 'flash'];
  }

  // apply storage types in order of preference
  var type;
  var done = false;
  var exception = null;
  for(var idx in location) {
    type = location[idx];
    try {
      if(type === 'flash' || type === 'both') {
        if(args[0] === null) {
          throw new Error('Flash local storage not available.');
        }
        rval = func.apply(this, args);
        done = (type === 'flash');
      }
      if(type === 'web' || type === 'both') {
        args[0] = localStorage;
        rval = func.apply(this, args);
        done = true;
      }
    } catch(ex) {
      exception = ex;
    }
    if(done) {
      break;
    }
  }

  if(!done) {
    throw exception;
  }

  return rval;
};

/**
 * Stores an item on local disk.
 *
 * The available types of local storage include 'flash', 'web', and 'both'.
 *
 * The type 'flash' refers to flash local storage (SharedObject). In order
 * to use flash local storage, the 'api' parameter must be valid. The type
 * 'web' refers to WebStorage, if supported by the browser. The type 'both'
 * refers to storing using both 'flash' and 'web', not just one or the
 * other.
 *
 * The location array should list the storage types to use in order of
 * preference:
 *
 * ['flash']: flash only storage
 * ['web']: web only storage
 * ['both']: try to store in both
 * ['flash','web']: store in flash first, but if not available, 'web'
 * ['web','flash']: store in web first, but if not available, 'flash'
 *
 * The location array defaults to: ['web', 'flash']
 *
 * @param api the flash interface, null to use only WebStorage.
 * @param id the storage ID to use.
 * @param key the key for the item.
 * @param data the data for the item (any javascript object/primitive).
 * @param location an array with the preferred types of storage to use.
 */
util.setItem = function(api, id, key, data, location) {
  _callStorageFunction(_setItem, arguments, location);
};

/**
 * Gets an item on local disk.
 *
 * Set setItem() for details on storage types.
 *
 * @param api the flash interface, null to use only WebStorage.
 * @param id the storage ID to use.
 * @param key the key for the item.
 * @param location an array with the preferred types of storage to use.
 *
 * @return the item.
 */
util.getItem = function(api, id, key, location) {
  return _callStorageFunction(_getItem, arguments, location);
};

/**
 * Removes an item on local disk.
 *
 * Set setItem() for details on storage types.
 *
 * @param api the flash interface.
 * @param id the storage ID to use.
 * @param key the key for the item.
 * @param location an array with the preferred types of storage to use.
 */
util.removeItem = function(api, id, key, location) {
  _callStorageFunction(_removeItem, arguments, location);
};

/**
 * Clears the local disk storage identified by the given ID.
 *
 * Set setItem() for details on storage types.
 *
 * @param api the flash interface if flash is available.
 * @param id the storage ID to use.
 * @param location an array with the preferred types of storage to use.
 */
util.clearItems = function(api, id, location) {
  _callStorageFunction(_clearItems, arguments, location);
};

/**
 * Parses the scheme, host, and port from an http(s) url.
 *
 * @param str the url string.
 *
 * @return the parsed url object or null if the url is invalid.
 */
util.parseUrl = function(str) {
  // FIXME: this regex looks a bit broken
  var regex = /^(https?):\/\/([^:&^\/]*):?(\d*)(.*)$/g;
  regex.lastIndex = 0;
  var m = regex.exec(str);
  var url = (m === null) ? null : {
    full: str,
    scheme: m[1],
    host: m[2],
    port: m[3],
    path: m[4]
  };
  if(url) {
    url.fullHost = url.host;
    if(url.port) {
      if(url.port !== 80 && url.scheme === 'http') {
        url.fullHost += ':' + url.port;
      } else if(url.port !== 443 && url.scheme === 'https') {
        url.fullHost += ':' + url.port;
      }
    } else if(url.scheme === 'http') {
      url.port = 80;
    } else if(url.scheme === 'https') {
      url.port = 443;
    }
    url.full = url.scheme + '://' + url.fullHost;
  }
  return url;
};

/* Storage for query variables */
var _queryVariables = null;

/**
 * Returns the window location query variables. Query is parsed on the first
 * call and the same object is returned on subsequent calls. The mapping
 * is from keys to an array of values. Parameters without values will have
 * an object key set but no value added to the value array. Values are
 * unescaped.
 *
 * ...?k1=v1&k2=v2:
 * {
 *   "k1": ["v1"],
 *   "k2": ["v2"]
 * }
 *
 * ...?k1=v1&k1=v2:
 * {
 *   "k1": ["v1", "v2"]
 * }
 *
 * ...?k1=v1&k2:
 * {
 *   "k1": ["v1"],
 *   "k2": []
 * }
 *
 * ...?k1=v1&k1:
 * {
 *   "k1": ["v1"]
 * }
 *
 * ...?k1&k1:
 * {
 *   "k1": []
 * }
 *
 * @param query the query string to parse (optional, default to cached
 *          results from parsing window location search query).
 *
 * @return object mapping keys to variables.
 */
util.getQueryVariables = function(query) {
  var parse = function(q) {
    var rval = {};
    var kvpairs = q.split('&');
    for(var i = 0; i < kvpairs.length; i++) {
      var pos = kvpairs[i].indexOf('=');
      var key;
      var val;
      if(pos > 0) {
        key = kvpairs[i].substring(0, pos);
        val = kvpairs[i].substring(pos + 1);
      } else {
        key = kvpairs[i];
        val = null;
      }
      if(!(key in rval)) {
        rval[key] = [];
      }
      // disallow overriding object prototype keys
      if(!(key in Object.prototype) && val !== null) {
        rval[key].push(unescape(val));
      }
    }
    return rval;
  };

   var rval;
   if(typeof(query) === 'undefined') {
     // set cached variables if needed
     if(_queryVariables === null) {
       if(typeof(window) !== 'undefined' && window.location && window.location.search) {
          // parse window search query
          _queryVariables = parse(window.location.search.substring(1));
       } else {
          // no query variables available
          _queryVariables = {};
       }
     }
     rval = _queryVariables;
   } else {
     // parse given query
     rval = parse(query);
   }
   return rval;
};

/**
 * Parses a fragment into a path and query. This method will take a URI
 * fragment and break it up as if it were the main URI. For example:
 *    /bar/baz?a=1&b=2
 * results in:
 *    {
 *       path: ["bar", "baz"],
 *       query: {"k1": ["v1"], "k2": ["v2"]}
 *    }
 *
 * @return object with a path array and query object.
 */
util.parseFragment = function(fragment) {
  // default to whole fragment
  var fp = fragment;
  var fq = '';
  // split into path and query if possible at the first '?'
  var pos = fragment.indexOf('?');
  if(pos > 0) {
    fp = fragment.substring(0, pos);
    fq = fragment.substring(pos + 1);
  }
  // split path based on '/' and ignore first element if empty
  var path = fp.split('/');
  if(path.length > 0 && path[0] === '') {
    path.shift();
  }
  // convert query into object
  var query = (fq === '') ? {} : util.getQueryVariables(fq);

  return {
    pathString: fp,
    queryString: fq,
    path: path,
    query: query
  };
};

/**
 * Makes a request out of a URI-like request string. This is intended to
 * be used where a fragment id (after a URI '#') is parsed as a URI with
 * path and query parts. The string should have a path beginning and
 * delimited by '/' and optional query parameters following a '?'. The
 * query should be a standard URL set of key value pairs delimited by
 * '&'. For backwards compatibility the initial '/' on the path is not
 * required. The request object has the following API, (fully described
 * in the method code):
 *    {
 *       path: <the path string part>.
 *       query: <the query string part>,
 *       getPath(i): get part or all of the split path array,
 *       getQuery(k, i): get part or all of a query key array,
 *       getQueryLast(k, _default): get last element of a query key array.
 *    }
 *
 * @return object with request parameters.
 */
util.makeRequest = function(reqString) {
  var frag = util.parseFragment(reqString);
  var req = {
    // full path string
    path: frag.pathString,
    // full query string
    query: frag.queryString,
    /**
     * Get path or element in path.
     *
     * @param i optional path index.
     *
     * @return path or part of path if i provided.
     */
    getPath: function(i) {
      return (typeof(i) === 'undefined') ? frag.path : frag.path[i];
    },
    /**
     * Get query, values for a key, or value for a key index.
     *
     * @param k optional query key.
     * @param i optional query key index.
     *
     * @return query, values for a key, or value for a key index.
     */
    getQuery: function(k, i) {
      var rval;
      if(typeof(k) === 'undefined') {
        rval = frag.query;
      } else {
        rval = frag.query[k];
        if(rval && typeof(i) !== 'undefined') {
           rval = rval[i];
        }
      }
      return rval;
    },
    getQueryLast: function(k, _default) {
      var rval;
      var vals = req.getQuery(k);
      if(vals) {
        rval = vals[vals.length - 1];
      } else {
        rval = _default;
      }
      return rval;
    }
  };
  return req;
};

/**
 * Makes a URI out of a path, an object with query parameters, and a
 * fragment. Uses jQuery.param() internally for query string creation.
 * If the path is an array, it will be joined with '/'.
 *
 * @param path string path or array of strings.
 * @param query object with query parameters. (optional)
 * @param fragment fragment string. (optional)
 *
 * @return string object with request parameters.
 */
util.makeLink = function(path, query, fragment) {
  // join path parts if needed
  path = jQuery.isArray(path) ? path.join('/') : path;

  var qstr = jQuery.param(query || {});
  fragment = fragment || '';
  return path +
    ((qstr.length > 0) ? ('?' + qstr) : '') +
    ((fragment.length > 0) ? ('#' + fragment) : '');
};

/**
 * Follows a path of keys deep into an object hierarchy and set a value.
 * If a key does not exist or it's value is not an object, create an
 * object in it's place. This can be destructive to a object tree if
 * leaf nodes are given as non-final path keys.
 * Used to avoid exceptions from missing parts of the path.
 *
 * @param object the starting object.
 * @param keys an array of string keys.
 * @param value the value to set.
 */
util.setPath = function(object, keys, value) {
  // need to start at an object
  if(typeof(object) === 'object' && object !== null) {
    var i = 0;
    var len = keys.length;
    while(i < len) {
      var next = keys[i++];
      if(i == len) {
        // last
        object[next] = value;
      } else {
        // more
        var hasNext = (next in object);
        if(!hasNext ||
          (hasNext && typeof(object[next]) !== 'object') ||
          (hasNext && object[next] === null)) {
          object[next] = {};
        }
        object = object[next];
      }
    }
  }
};

/**
 * Follows a path of keys deep into an object hierarchy and return a value.
 * If a key does not exist, create an object in it's place.
 * Used to avoid exceptions from missing parts of the path.
 *
 * @param object the starting object.
 * @param keys an array of string keys.
 * @param _default value to return if path not found.
 *
 * @return the value at the path if found, else default if given, else
 *         undefined.
 */
util.getPath = function(object, keys, _default) {
  var i = 0;
  var len = keys.length;
  var hasNext = true;
  while(hasNext && i < len &&
    typeof(object) === 'object' && object !== null) {
    var next = keys[i++];
    hasNext = next in object;
    if(hasNext) {
      object = object[next];
    }
  }
  return (hasNext ? object : _default);
};

/**
 * Follow a path of keys deep into an object hierarchy and delete the
 * last one. If a key does not exist, do nothing.
 * Used to avoid exceptions from missing parts of the path.
 *
 * @param object the starting object.
 * @param keys an array of string keys.
 */
util.deletePath = function(object, keys) {
  // need to start at an object
  if(typeof(object) === 'object' && object !== null) {
    var i = 0;
    var len = keys.length;
    while(i < len) {
      var next = keys[i++];
      if(i == len) {
        // last
        delete object[next];
      } else {
        // more
        if(!(next in object) ||
          (typeof(object[next]) !== 'object') ||
          (object[next] === null)) {
           break;
        }
        object = object[next];
      }
    }
  }
};

/**
 * Check if an object is empty.
 *
 * Taken from:
 * http://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object-from-json/679937#679937
 *
 * @param object the object to check.
 */
util.isEmpty = function(obj) {
  for(var prop in obj) {
    if(obj.hasOwnProperty(prop)) {
      return false;
    }
  }
  return true;
};

/**
 * Format with simple printf-style interpolation.
 *
 * %%: literal '%'
 * %s,%o: convert next argument into a string.
 *
 * @param format the string to format.
 * @param ... arguments to interpolate into the format string.
 */
util.format = function(format) {
  var re = /%./g;
  // current match
  var match;
  // current part
  var part;
  // current arg index
  var argi = 0;
  // collected parts to recombine later
  var parts = [];
  // last index found
  var last = 0;
  // loop while matches remain
  while((match = re.exec(format))) {
    part = format.substring(last, re.lastIndex - 2);
    // don't add empty strings (ie, parts between %s%s)
    if(part.length > 0) {
      parts.push(part);
    }
    last = re.lastIndex;
    // switch on % code
    var code = match[0][1];
    switch(code) {
    case 's':
    case 'o':
      // check if enough arguments were given
      if(argi < arguments.length) {
        parts.push(arguments[argi++ + 1]);
      } else {
        parts.push('<?>');
      }
      break;
    // FIXME: do proper formating for numbers, etc
    //case 'f':
    //case 'd':
    case '%':
      parts.push('%');
      break;
    default:
      parts.push('<%' + code + '?>');
    }
  }
  // add trailing part of format string
  parts.push(format.substring(last));
  return parts.join('');
};

/**
 * Formats a number.
 *
 * http://snipplr.com/view/5945/javascript-numberformat--ported-from-php/
 */
util.formatNumber = function(number, decimals, dec_point, thousands_sep) {
  // http://kevin.vanzonneveld.net
  // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +     bugfix by: Michael White (http://crestidg.com)
  // +     bugfix by: Benjamin Lupton
  // +     bugfix by: Allan Jensen (http://www.winternet.no)
  // +    revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
  // *     example 1: number_format(1234.5678, 2, '.', '');
  // *     returns 1: 1234.57

  var n = number, c = isNaN(decimals = Math.abs(decimals)) ? 2 : decimals;
  var d = dec_point === undefined ? ',' : dec_point;
  var t = thousands_sep === undefined ?
   '.' : thousands_sep, s = n < 0 ? '-' : '';
  var i = parseInt((n = Math.abs(+n || 0).toFixed(c)), 10) + '';
  var j = (i.length > 3) ? i.length % 3 : 0;
  return s + (j ? i.substr(0, j) + t : '') +
    i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + t) +
    (c ? d + Math.abs(n - i).toFixed(c).slice(2) : '');
};

/**
 * Formats a byte size.
 *
 * http://snipplr.com/view/5949/format-humanize-file-byte-size-presentation-in-javascript/
 */
util.formatSize = function(size) {
  if(size >= 1073741824) {
    size = util.formatNumber(size / 1073741824, 2, '.', '') + ' GiB';
  } else if(size >= 1048576) {
    size = util.formatNumber(size / 1048576, 2, '.', '') + ' MiB';
  } else if(size >= 1024) {
    size = util.formatNumber(size / 1024, 0) + ' KiB';
  } else {
    size = util.formatNumber(size, 0) + ' bytes';
  }
  return size;
};

/**
 * Converts an IPv4 or IPv6 string representation into bytes (in network order).
 *
 * @param ip the IPv4 or IPv6 address to convert.
 *
 * @return the 4-byte IPv6 or 16-byte IPv6 address or null if the address can't
 *         be parsed.
 */
util.bytesFromIP = function(ip) {
  if(ip.indexOf('.') !== -1) {
    return util.bytesFromIPv4(ip);
  }
  if(ip.indexOf(':') !== -1) {
    return util.bytesFromIPv6(ip);
  }
  return null;
};

/**
 * Converts an IPv4 string representation into bytes (in network order).
 *
 * @param ip the IPv4 address to convert.
 *
 * @return the 4-byte address or null if the address can't be parsed.
 */
util.bytesFromIPv4 = function(ip) {
  ip = ip.split('.');
  if(ip.length !== 4) {
    return null;
  }
  var b = util.createBuffer();
  for(var i = 0; i < ip.length; ++i) {
    var num = parseInt(ip[i], 10);
    if(isNaN(num)) {
      return null;
    }
    b.putByte(num);
  }
  return b.getBytes();
};

/**
 * Converts an IPv6 string representation into bytes (in network order).
 *
 * @param ip the IPv6 address to convert.
 *
 * @return the 16-byte address or null if the address can't be parsed.
 */
util.bytesFromIPv6 = function(ip) {
  var blanks = 0;
  ip = ip.split(':').filter(function(e) {
    if(e.length === 0) ++blanks;
    return true;
  });
  var zeros = (8 - ip.length + blanks) * 2;
  var b = util.createBuffer();
  for(var i = 0; i < 8; ++i) {
    if(!ip[i] || ip[i].length === 0) {
      b.fillWithByte(0, zeros);
      zeros = 0;
      continue;
    }
    var bytes = util.hexToBytes(ip[i]);
    if(bytes.length < 2) {
      b.putByte(0);
    }
    b.putBytes(bytes);
  }
  return b.getBytes();
};

/**
 * Converts 4-bytes into an IPv4 string representation or 16-bytes into
 * an IPv6 string representation. The bytes must be in network order.
 *
 * @param bytes the bytes to convert.
 *
 * @return the IPv4 or IPv6 string representation if 4 or 16 bytes,
 *         respectively, are given, otherwise null.
 */
util.bytesToIP = function(bytes) {
  if(bytes.length === 4) {
    return util.bytesToIPv4(bytes);
  }
  if(bytes.length === 16) {
    return util.bytesToIPv6(bytes);
  }
  return null;
};

/**
 * Converts 4-bytes into an IPv4 string representation. The bytes must be
 * in network order.
 *
 * @param bytes the bytes to convert.
 *
 * @return the IPv4 string representation or null for an invalid # of bytes.
 */
util.bytesToIPv4 = function(bytes) {
  if(bytes.length !== 4) {
    return null;
  }
  var ip = [];
  for(var i = 0; i < bytes.length; ++i) {
    ip.push(bytes.charCodeAt(i));
  }
  return ip.join('.');
};

/**
 * Converts 16-bytes into an IPv16 string representation. The bytes must be
 * in network order.
 *
 * @param bytes the bytes to convert.
 *
 * @return the IPv16 string representation or null for an invalid # of bytes.
 */
util.bytesToIPv6 = function(bytes) {
  if(bytes.length !== 16) {
    return null;
  }
  var ip = [];
  var zeroGroups = [];
  var zeroMaxGroup = 0;
  for(var i = 0; i < bytes.length; i += 2) {
    var hex = util.bytesToHex(bytes[i] + bytes[i + 1]);
    // canonicalize zero representation
    while(hex[0] === '0' && hex !== '0') {
      hex = hex.substr(1);
    }
    if(hex === '0') {
      var last = zeroGroups[zeroGroups.length - 1];
      var idx = ip.length;
      if(!last || idx !== last.end + 1) {
        zeroGroups.push({start: idx, end: idx});
      } else {
        last.end = idx;
        if((last.end - last.start) >
          (zeroGroups[zeroMaxGroup].end - zeroGroups[zeroMaxGroup].start)) {
          zeroMaxGroup = zeroGroups.length - 1;
        }
      }
    }
    ip.push(hex);
  }
  if(zeroGroups.length > 0) {
    var group = zeroGroups[zeroMaxGroup];
    // only shorten group of length > 0
    if(group.end - group.start > 0) {
      ip.splice(group.start, group.end - group.start + 1, '');
      if(group.start === 0) {
        ip.unshift('');
      }
      if(group.end === 7) {
        ip.push('');
      }
    }
  }
  return ip.join(':');
};

/**
 * Estimates the number of processes that can be run concurrently. If
 * creating Web Workers, keep in mind that the main JavaScript process needs
 * its own core.
 *
 * @param options the options to use:
 *          update true to force an update (not use the cached value).
 * @param callback(err, max) called once the operation completes.
 */
util.estimateCores = function(options, callback) {
  if(typeof options === 'function') {
    callback = options;
    options = {};
  }
  options = options || {};
  if('cores' in util && !options.update) {
    return callback(null, util.cores);
  }
  if(typeof navigator !== 'undefined' &&
    'hardwareConcurrency' in navigator &&
    navigator.hardwareConcurrency > 0) {
    util.cores = navigator.hardwareConcurrency;
    return callback(null, util.cores);
  }
  if(typeof Worker === 'undefined') {
    // workers not available
    util.cores = 1;
    return callback(null, util.cores);
  }
  if(typeof Blob === 'undefined') {
    // can't estimate, default to 2
    util.cores = 2;
    return callback(null, util.cores);
  }

  // create worker concurrency estimation code as blob
  var blobUrl = URL.createObjectURL(new Blob(['(',
    function() {
      self.addEventListener('message', function(e) {
        // run worker for 4 ms
        var st = Date.now();
        var et = st + 4;
        self.postMessage({st: st, et: et});
      });
    }.toString(),
  ')()'], {type: 'application/javascript'}));

  // take 5 samples using 16 workers
  sample([], 5, 16);

  function sample(max, samples, numWorkers) {
    if(samples === 0) {
      // get overlap average
      var avg = Math.floor(max.reduce(function(avg, x) {
        return avg + x;
      }, 0) / max.length);
      util.cores = Math.max(1, avg);
      URL.revokeObjectURL(blobUrl);
      return callback(null, util.cores);
    }
    map(numWorkers, function(err, results) {
      max.push(reduce(numWorkers, results));
      sample(max, samples - 1, numWorkers);
    });
  }

  function map(numWorkers, callback) {
    var workers = [];
    var results = [];
    for(var i = 0; i < numWorkers; ++i) {
      var worker = new Worker(blobUrl);
      worker.addEventListener('message', function(e) {
        results.push(e.data);
        if(results.length === numWorkers) {
          for(var i = 0; i < numWorkers; ++i) {
            workers[i].terminate();
          }
          callback(null, results);
        }
      });
      workers.push(worker);
    }
    for(var i = 0; i < numWorkers; ++i) {
      workers[i].postMessage(i);
    }
  }

  function reduce(numWorkers, results) {
    // find overlapping time windows
    var overlaps = [];
    for(var n = 0; n < numWorkers; ++n) {
      var r1 = results[n];
      var overlap = overlaps[n] = [];
      for(var i = 0; i < numWorkers; ++i) {
        if(n === i) {
          continue;
        }
        var r2 = results[i];
        if((r1.st > r2.st && r1.st < r2.et) ||
          (r2.st > r1.st && r2.st < r1.et)) {
          overlap.push(i);
        }
      }
    }
    // get maximum overlaps ... don't include overlapping worker itself
    // as the main JS process was also being scheduled during the work and
    // would have to be subtracted from the estimate anyway
    return overlaps.reduce(function(max, overlap) {
      return Math.max(max, overlap.length);
    }, 0);
  }
};
});

var sha1_1 = createCommonjsModule(function (module) {
/**
 * Secure Hash Algorithm with 160-bit digest (SHA-1) implementation.
 *
 * @author Dave Longley
 *
 * Copyright (c) 2010-2015 Digital Bazaar, Inc.
 */




var sha1 = module.exports = forge.sha1 = forge.sha1 || {};
forge.md.sha1 = forge.md.algorithms.sha1 = sha1;

/**
 * Creates a SHA-1 message digest object.
 *
 * @return a message digest object.
 */
sha1.create = function() {
  // do initialization as necessary
  if(!_initialized) {
    _init();
  }

  // SHA-1 state contains five 32-bit integers
  var _state = null;

  // input buffer
  var _input = forge.util.createBuffer();

  // used for word storage
  var _w = new Array(80);

  // message digest object
  var md = {
    algorithm: 'sha1',
    blockLength: 64,
    digestLength: 20,
    // 56-bit length of message so far (does not including padding)
    messageLength: 0,
    // true message length
    fullMessageLength: null,
    // size of message length in bytes
    messageLengthSize: 8
  };

  /**
   * Starts the digest.
   *
   * @return this digest object.
   */
  md.start = function() {
    // up to 56-bit message length for convenience
    md.messageLength = 0;

    // full message length (set md.messageLength64 for backwards-compatibility)
    md.fullMessageLength = md.messageLength64 = [];
    var int32s = md.messageLengthSize / 4;
    for(var i = 0; i < int32s; ++i) {
      md.fullMessageLength.push(0);
    }
    _input = forge.util.createBuffer();
    _state = {
      h0: 0x67452301,
      h1: 0xEFCDAB89,
      h2: 0x98BADCFE,
      h3: 0x10325476,
      h4: 0xC3D2E1F0
    };
    return md;
  };
  // start digest automatically for first time
  md.start();

  /**
   * Updates the digest with the given message input. The given input can
   * treated as raw input (no encoding will be applied) or an encoding of
   * 'utf8' maybe given to encode the input using UTF-8.
   *
   * @param msg the message input to update with.
   * @param encoding the encoding to use (default: 'raw', other: 'utf8').
   *
   * @return this digest object.
   */
  md.update = function(msg, encoding) {
    if(encoding === 'utf8') {
      msg = forge.util.encodeUtf8(msg);
    }

    // update message length
    var len = msg.length;
    md.messageLength += len;
    len = [(len / 0x100000000) >>> 0, len >>> 0];
    for(var i = md.fullMessageLength.length - 1; i >= 0; --i) {
      md.fullMessageLength[i] += len[1];
      len[1] = len[0] + ((md.fullMessageLength[i] / 0x100000000) >>> 0);
      md.fullMessageLength[i] = md.fullMessageLength[i] >>> 0;
      len[0] = ((len[1] / 0x100000000) >>> 0);
    }

    // add bytes to input buffer
    _input.putBytes(msg);

    // process bytes
    _update(_state, _w, _input);

    // compact input buffer every 2K or if empty
    if(_input.read > 2048 || _input.length() === 0) {
      _input.compact();
    }

    return md;
  };

  /**
   * Produces the digest.
   *
   * @return a byte buffer containing the digest value.
   */
  md.digest = function() {
    /* Note: Here we copy the remaining bytes in the input buffer and
    add the appropriate SHA-1 padding. Then we do the final update
    on a copy of the state so that if the user wants to get
    intermediate digests they can do so. */

    /* Determine the number of bytes that must be added to the message
    to ensure its length is congruent to 448 mod 512. In other words,
    the data to be digested must be a multiple of 512 bits (or 128 bytes).
    This data includes the message, some padding, and the length of the
    message. Since the length of the message will be encoded as 8 bytes (64
    bits), that means that the last segment of the data must have 56 bytes
    (448 bits) of message and padding. Therefore, the length of the message
    plus the padding must be congruent to 448 mod 512 because
    512 - 128 = 448.

    In order to fill up the message length it must be filled with
    padding that begins with 1 bit followed by all 0 bits. Padding
    must *always* be present, so if the message length is already
    congruent to 448 mod 512, then 512 padding bits must be added. */

    var finalBlock = forge.util.createBuffer();
    finalBlock.putBytes(_input.bytes());

    // compute remaining size to be digested (include message length size)
    var remaining = (
      md.fullMessageLength[md.fullMessageLength.length - 1] +
      md.messageLengthSize);

    // add padding for overflow blockSize - overflow
    // _padding starts with 1 byte with first bit is set (byte value 128), then
    // there may be up to (blockSize - 1) other pad bytes
    var overflow = remaining & (md.blockLength - 1);
    finalBlock.putBytes(_padding.substr(0, md.blockLength - overflow));

    // serialize message length in bits in big-endian order; since length
    // is stored in bytes we multiply by 8 and add carry from next int
    var next, carry;
    var bits = md.fullMessageLength[0] * 8;
    for(var i = 0; i < md.fullMessageLength.length - 1; ++i) {
      next = md.fullMessageLength[i + 1] * 8;
      carry = (next / 0x100000000) >>> 0;
      bits += carry;
      finalBlock.putInt32(bits >>> 0);
      bits = next >>> 0;
    }
    finalBlock.putInt32(bits);

    var s2 = {
      h0: _state.h0,
      h1: _state.h1,
      h2: _state.h2,
      h3: _state.h3,
      h4: _state.h4
    };
    _update(s2, _w, finalBlock);
    var rval = forge.util.createBuffer();
    rval.putInt32(s2.h0);
    rval.putInt32(s2.h1);
    rval.putInt32(s2.h2);
    rval.putInt32(s2.h3);
    rval.putInt32(s2.h4);
    return rval;
  };

  return md;
};

// sha-1 padding bytes not initialized yet
var _padding = null;
var _initialized = false;

/**
 * Initializes the constant tables.
 */
function _init() {
  // create padding
  _padding = String.fromCharCode(128);
  _padding += forge.util.fillString(String.fromCharCode(0x00), 64);

  // now initialized
  _initialized = true;
}

/**
 * Updates a SHA-1 state with the given byte buffer.
 *
 * @param s the SHA-1 state to update.
 * @param w the array to use to store words.
 * @param bytes the byte buffer to update with.
 */
function _update(s, w, bytes) {
  // consume 512 bit (64 byte) chunks
  var t, a, b, c, d, e, f, i;
  var len = bytes.length();
  while(len >= 64) {
    // the w array will be populated with sixteen 32-bit big-endian words
    // and then extended into 80 32-bit words according to SHA-1 algorithm
    // and for 32-79 using Max Locktyukhin's optimization

    // initialize hash value for this chunk
    a = s.h0;
    b = s.h1;
    c = s.h2;
    d = s.h3;
    e = s.h4;

    // round 1
    for(i = 0; i < 16; ++i) {
      t = bytes.getInt32();
      w[i] = t;
      f = d ^ (b & (c ^ d));
      t = ((a << 5) | (a >>> 27)) + f + e + 0x5A827999 + t;
      e = d;
      d = c;
      // `>>> 0` necessary to avoid iOS/Safari 10 optimization bug
      c = ((b << 30) | (b >>> 2)) >>> 0;
      b = a;
      a = t;
    }
    for(; i < 20; ++i) {
      t = (w[i - 3] ^ w[i - 8] ^ w[i - 14] ^ w[i - 16]);
      t = (t << 1) | (t >>> 31);
      w[i] = t;
      f = d ^ (b & (c ^ d));
      t = ((a << 5) | (a >>> 27)) + f + e + 0x5A827999 + t;
      e = d;
      d = c;
      // `>>> 0` necessary to avoid iOS/Safari 10 optimization bug
      c = ((b << 30) | (b >>> 2)) >>> 0;
      b = a;
      a = t;
    }
    // round 2
    for(; i < 32; ++i) {
      t = (w[i - 3] ^ w[i - 8] ^ w[i - 14] ^ w[i - 16]);
      t = (t << 1) | (t >>> 31);
      w[i] = t;
      f = b ^ c ^ d;
      t = ((a << 5) | (a >>> 27)) + f + e + 0x6ED9EBA1 + t;
      e = d;
      d = c;
      // `>>> 0` necessary to avoid iOS/Safari 10 optimization bug
      c = ((b << 30) | (b >>> 2)) >>> 0;
      b = a;
      a = t;
    }
    for(; i < 40; ++i) {
      t = (w[i - 6] ^ w[i - 16] ^ w[i - 28] ^ w[i - 32]);
      t = (t << 2) | (t >>> 30);
      w[i] = t;
      f = b ^ c ^ d;
      t = ((a << 5) | (a >>> 27)) + f + e + 0x6ED9EBA1 + t;
      e = d;
      d = c;
      // `>>> 0` necessary to avoid iOS/Safari 10 optimization bug
      c = ((b << 30) | (b >>> 2)) >>> 0;
      b = a;
      a = t;
    }
    // round 3
    for(; i < 60; ++i) {
      t = (w[i - 6] ^ w[i - 16] ^ w[i - 28] ^ w[i - 32]);
      t = (t << 2) | (t >>> 30);
      w[i] = t;
      f = (b & c) | (d & (b ^ c));
      t = ((a << 5) | (a >>> 27)) + f + e + 0x8F1BBCDC + t;
      e = d;
      d = c;
      // `>>> 0` necessary to avoid iOS/Safari 10 optimization bug
      c = ((b << 30) | (b >>> 2)) >>> 0;
      b = a;
      a = t;
    }
    // round 4
    for(; i < 80; ++i) {
      t = (w[i - 6] ^ w[i - 16] ^ w[i - 28] ^ w[i - 32]);
      t = (t << 2) | (t >>> 30);
      w[i] = t;
      f = b ^ c ^ d;
      t = ((a << 5) | (a >>> 27)) + f + e + 0xCA62C1D6 + t;
      e = d;
      d = c;
      // `>>> 0` necessary to avoid iOS/Safari 10 optimization bug
      c = ((b << 30) | (b >>> 2)) >>> 0;
      b = a;
      a = t;
    }

    // update hash state
    s.h0 = (s.h0 + a) | 0;
    s.h1 = (s.h1 + b) | 0;
    s.h2 = (s.h2 + c) | 0;
    s.h3 = (s.h3 + d) | 0;
    s.h4 = (s.h4 + e) | 0;

    len -= 64;
  }
}
});

var sha256_1 = createCommonjsModule(function (module) {
/**
 * Secure Hash Algorithm with 256-bit digest (SHA-256) implementation.
 *
 * See FIPS 180-2 for details.
 *
 * @author Dave Longley
 *
 * Copyright (c) 2010-2015 Digital Bazaar, Inc.
 */




var sha256 = module.exports = forge.sha256 = forge.sha256 || {};
forge.md.sha256 = forge.md.algorithms.sha256 = sha256;

/**
 * Creates a SHA-256 message digest object.
 *
 * @return a message digest object.
 */
sha256.create = function() {
  // do initialization as necessary
  if(!_initialized) {
    _init();
  }

  // SHA-256 state contains eight 32-bit integers
  var _state = null;

  // input buffer
  var _input = forge.util.createBuffer();

  // used for word storage
  var _w = new Array(64);

  // message digest object
  var md = {
    algorithm: 'sha256',
    blockLength: 64,
    digestLength: 32,
    // 56-bit length of message so far (does not including padding)
    messageLength: 0,
    // true message length
    fullMessageLength: null,
    // size of message length in bytes
    messageLengthSize: 8
  };

  /**
   * Starts the digest.
   *
   * @return this digest object.
   */
  md.start = function() {
    // up to 56-bit message length for convenience
    md.messageLength = 0;

    // full message length (set md.messageLength64 for backwards-compatibility)
    md.fullMessageLength = md.messageLength64 = [];
    var int32s = md.messageLengthSize / 4;
    for(var i = 0; i < int32s; ++i) {
      md.fullMessageLength.push(0);
    }
    _input = forge.util.createBuffer();
    _state = {
      h0: 0x6A09E667,
      h1: 0xBB67AE85,
      h2: 0x3C6EF372,
      h3: 0xA54FF53A,
      h4: 0x510E527F,
      h5: 0x9B05688C,
      h6: 0x1F83D9AB,
      h7: 0x5BE0CD19
    };
    return md;
  };
  // start digest automatically for first time
  md.start();

  /**
   * Updates the digest with the given message input. The given input can
   * treated as raw input (no encoding will be applied) or an encoding of
   * 'utf8' maybe given to encode the input using UTF-8.
   *
   * @param msg the message input to update with.
   * @param encoding the encoding to use (default: 'raw', other: 'utf8').
   *
   * @return this digest object.
   */
  md.update = function(msg, encoding) {
    if(encoding === 'utf8') {
      msg = forge.util.encodeUtf8(msg);
    }

    // update message length
    var len = msg.length;
    md.messageLength += len;
    len = [(len / 0x100000000) >>> 0, len >>> 0];
    for(var i = md.fullMessageLength.length - 1; i >= 0; --i) {
      md.fullMessageLength[i] += len[1];
      len[1] = len[0] + ((md.fullMessageLength[i] / 0x100000000) >>> 0);
      md.fullMessageLength[i] = md.fullMessageLength[i] >>> 0;
      len[0] = ((len[1] / 0x100000000) >>> 0);
    }

    // add bytes to input buffer
    _input.putBytes(msg);

    // process bytes
    _update(_state, _w, _input);

    // compact input buffer every 2K or if empty
    if(_input.read > 2048 || _input.length() === 0) {
      _input.compact();
    }

    return md;
  };

  /**
   * Produces the digest.
   *
   * @return a byte buffer containing the digest value.
   */
  md.digest = function() {
    /* Note: Here we copy the remaining bytes in the input buffer and
    add the appropriate SHA-256 padding. Then we do the final update
    on a copy of the state so that if the user wants to get
    intermediate digests they can do so. */

    /* Determine the number of bytes that must be added to the message
    to ensure its length is congruent to 448 mod 512. In other words,
    the data to be digested must be a multiple of 512 bits (or 128 bytes).
    This data includes the message, some padding, and the length of the
    message. Since the length of the message will be encoded as 8 bytes (64
    bits), that means that the last segment of the data must have 56 bytes
    (448 bits) of message and padding. Therefore, the length of the message
    plus the padding must be congruent to 448 mod 512 because
    512 - 128 = 448.

    In order to fill up the message length it must be filled with
    padding that begins with 1 bit followed by all 0 bits. Padding
    must *always* be present, so if the message length is already
    congruent to 448 mod 512, then 512 padding bits must be added. */

    var finalBlock = forge.util.createBuffer();
    finalBlock.putBytes(_input.bytes());

    // compute remaining size to be digested (include message length size)
    var remaining = (
      md.fullMessageLength[md.fullMessageLength.length - 1] +
      md.messageLengthSize);

    // add padding for overflow blockSize - overflow
    // _padding starts with 1 byte with first bit is set (byte value 128), then
    // there may be up to (blockSize - 1) other pad bytes
    var overflow = remaining & (md.blockLength - 1);
    finalBlock.putBytes(_padding.substr(0, md.blockLength - overflow));

    // serialize message length in bits in big-endian order; since length
    // is stored in bytes we multiply by 8 and add carry from next int
    var next, carry;
    var bits = md.fullMessageLength[0] * 8;
    for(var i = 0; i < md.fullMessageLength.length - 1; ++i) {
      next = md.fullMessageLength[i + 1] * 8;
      carry = (next / 0x100000000) >>> 0;
      bits += carry;
      finalBlock.putInt32(bits >>> 0);
      bits = next >>> 0;
    }
    finalBlock.putInt32(bits);

    var s2 = {
      h0: _state.h0,
      h1: _state.h1,
      h2: _state.h2,
      h3: _state.h3,
      h4: _state.h4,
      h5: _state.h5,
      h6: _state.h6,
      h7: _state.h7
    };
    _update(s2, _w, finalBlock);
    var rval = forge.util.createBuffer();
    rval.putInt32(s2.h0);
    rval.putInt32(s2.h1);
    rval.putInt32(s2.h2);
    rval.putInt32(s2.h3);
    rval.putInt32(s2.h4);
    rval.putInt32(s2.h5);
    rval.putInt32(s2.h6);
    rval.putInt32(s2.h7);
    return rval;
  };

  return md;
};

// sha-256 padding bytes not initialized yet
var _padding = null;
var _initialized = false;

// table of constants
var _k = null;

/**
 * Initializes the constant tables.
 */
function _init() {
  // create padding
  _padding = String.fromCharCode(128);
  _padding += forge.util.fillString(String.fromCharCode(0x00), 64);

  // create K table for SHA-256
  _k = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5,
    0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
    0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc,
    0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7,
    0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
    0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3,
    0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5,
    0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
    0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2];

  // now initialized
  _initialized = true;
}

/**
 * Updates a SHA-256 state with the given byte buffer.
 *
 * @param s the SHA-256 state to update.
 * @param w the array to use to store words.
 * @param bytes the byte buffer to update with.
 */
function _update(s, w, bytes) {
  // consume 512 bit (64 byte) chunks
  var t1, t2, s0, s1, ch, maj, i, a, b, c, d, e, f, g, h;
  var len = bytes.length();
  while(len >= 64) {
    // the w array will be populated with sixteen 32-bit big-endian words
    // and then extended into 64 32-bit words according to SHA-256
    for(i = 0; i < 16; ++i) {
      w[i] = bytes.getInt32();
    }
    for(; i < 64; ++i) {
      // XOR word 2 words ago rot right 17, rot right 19, shft right 10
      t1 = w[i - 2];
      t1 =
        ((t1 >>> 17) | (t1 << 15)) ^
        ((t1 >>> 19) | (t1 << 13)) ^
        (t1 >>> 10);
      // XOR word 15 words ago rot right 7, rot right 18, shft right 3
      t2 = w[i - 15];
      t2 =
        ((t2 >>> 7) | (t2 << 25)) ^
        ((t2 >>> 18) | (t2 << 14)) ^
        (t2 >>> 3);
      // sum(t1, word 7 ago, t2, word 16 ago) modulo 2^32
      w[i] = (t1 + w[i - 7] + t2 + w[i - 16]) | 0;
    }

    // initialize hash value for this chunk
    a = s.h0;
    b = s.h1;
    c = s.h2;
    d = s.h3;
    e = s.h4;
    f = s.h5;
    g = s.h6;
    h = s.h7;

    // round function
    for(i = 0; i < 64; ++i) {
      // Sum1(e)
      s1 =
        ((e >>> 6) | (e << 26)) ^
        ((e >>> 11) | (e << 21)) ^
        ((e >>> 25) | (e << 7));
      // Ch(e, f, g) (optimized the same way as SHA-1)
      ch = g ^ (e & (f ^ g));
      // Sum0(a)
      s0 =
        ((a >>> 2) | (a << 30)) ^
        ((a >>> 13) | (a << 19)) ^
        ((a >>> 22) | (a << 10));
      // Maj(a, b, c) (optimized the same way as SHA-1)
      maj = (a & b) | (c & (a ^ b));

      // main algorithm
      t1 = h + s1 + ch + _k[i] + w[i];
      t2 = s0 + maj;
      h = g;
      g = f;
      f = e;
      // `>>> 0` necessary to avoid iOS/Safari 10 optimization bug
      // can't truncate with `| 0`
      e = (d + t1) >>> 0;
      d = c;
      c = b;
      b = a;
      // `>>> 0` necessary to avoid iOS/Safari 10 optimization bug
      // can't truncate with `| 0`
      a = (t1 + t2) >>> 0;
    }

    // update hash state
    s.h0 = (s.h0 + a) | 0;
    s.h1 = (s.h1 + b) | 0;
    s.h2 = (s.h2 + c) | 0;
    s.h3 = (s.h3 + d) | 0;
    s.h4 = (s.h4 + e) | 0;
    s.h5 = (s.h5 + f) | 0;
    s.h6 = (s.h6 + g) | 0;
    s.h7 = (s.h7 + h) | 0;
    len -= 64;
  }
}
});

var MessageDigestBrowser = class MessageDigest {
  /**
   * Creates a new MessageDigest.
   *
   * @param algorithm the algorithm to use.
   */
  constructor(algorithm) {
    this.md = forge.md[algorithm].create();
  }

  update(msg) {
    this.md.update(msg, 'utf8');
  }

  digest() {
    return this.md.digest().toHex();
  }
};

/*
 * Copyright (c) 2016-2017 Digital Bazaar, Inc. All rights reserved.
 */

// TODO: convert to ES6 iterable

var Permutator_1 = class Permutator {
  /**
   * A Permutator iterates over all possible permutations of the given array
   * of elements.
   *
   * @param list the array of elements to iterate over.
   */
  constructor(list) {
    // original array
    this.list = list.sort();
    // indicates whether there are more permutations
    this.done = false;
    // directional info for permutation algorithm
    this.left = {};
    for(let i = 0; i < list.length; ++i) {
      this.left[list[i]] = true;
    }
  }

  /**
   * Returns true if there is another permutation.
   *
   * @return true if there is another permutation, false if not.
   */
  hasNext() {
    return !this.done;
  }

  /**
   * Gets the next permutation. Call hasNext() to ensure there is another one
   * first.
   *
   * @return the next permutation.
   */
  next() {
    // copy current permutation
    const rval = this.list.slice();

    /* Calculate the next permutation using the Steinhaus-Johnson-Trotter
     permutation algorithm. */

    // get largest mobile element k
    // (mobile: element is greater than the one it is looking at)
    let k = null;
    let pos = 0;
    const length = this.list.length;
    for(let i = 0; i < length; ++i) {
      const element = this.list[i];
      const left = this.left[element];
      if((k === null || element > k) &&
        ((left && i > 0 && element > this.list[i - 1]) ||
        (!left && i < (length - 1) && element > this.list[i + 1]))) {
        k = element;
        pos = i;
      }
    }

    // no more permutations
    if(k === null) {
      this.done = true;
    } else {
      // swap k and the element it is looking at
      const swap = this.left[k] ? pos - 1 : pos + 1;
      this.list[pos] = this.list[swap];
      this.list[swap] = k;

      // reverse the direction of all elements larger than k
      for(let i = 0; i < length; ++i) {
        if(this.list[i] > k) {
          this.left[this.list[i]] = !this.left[this.list[i]];
        }
      }
    }

    return rval;
  }
};

/*
 * Copyright (c) 2016-2017 Digital Bazaar, Inc. All rights reserved.
 */
const RDF = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#';
const RDF_LANGSTRING = RDF + 'langString';
const XSD_STRING = 'http://www.w3.org/2001/XMLSchema#string';

// build regexes
const REGEX = {};
(() => {
  const iri = '(?:<([^:]+:[^>]*)>)';
  // https://www.w3.org/TR/turtle/#grammar-production-BLANK_NODE_LABEL
  const PN_CHARS_BASE =
    'A-Z' + 'a-z' +
    '\u00C0-\u00D6' +
    '\u00D8-\u00F6' +
    '\u00F8-\u02FF' +
    '\u0370-\u037D' +
    '\u037F-\u1FFF' +
    '\u200C-\u200D' +
    '\u2070-\u218F' +
    '\u2C00-\u2FEF' +
    '\u3001-\uD7FF' +
    '\uF900-\uFDCF' +
    '\uFDF0-\uFFFD';
    // TODO:
    //'\u10000-\uEFFFF';
  const PN_CHARS_U =
    PN_CHARS_BASE +
    '_';
  const PN_CHARS =
    PN_CHARS_U +
    '0-9' +
    '-' +
    '\u00B7' +
    '\u0300-\u036F' +
    '\u203F-\u2040';
  const BLANK_NODE_LABEL =
    '(_:' +
      '(?:[' + PN_CHARS_U + '0-9])' +
      '(?:(?:[' + PN_CHARS + '.])*(?:[' + PN_CHARS + ']))?' +
    ')';
  const bnode = BLANK_NODE_LABEL;
  const plain = '"([^"\\\\]*(?:\\\\.[^"\\\\]*)*)"';
  const datatype = '(?:\\^\\^' + iri + ')';
  const language = '(?:@([a-zA-Z]+(?:-[a-zA-Z0-9]+)*))';
  const literal = '(?:' + plain + '(?:' + datatype + '|' + language + ')?)';
  const ws = '[ \\t]+';
  const wso = '[ \\t]*';

  // define quad part regexes
  const subject = '(?:' + iri + '|' + bnode + ')' + ws;
  const property = iri + ws;
  const object = '(?:' + iri + '|' + bnode + '|' + literal + ')' + wso;
  const graphName = '(?:\\.|(?:(?:' + iri + '|' + bnode + ')' + wso + '\\.))';

  // end of line and empty regexes
  REGEX.eoln = /(?:\r\n)|(?:\n)|(?:\r)/g;
  REGEX.empty = new RegExp('^' + wso + '$');

  // full quad regex
  REGEX.quad = new RegExp(
    '^' + wso + subject + property + object + graphName + wso + '$');
})();

var NQuads_1 = class NQuads {
  /**
   * Parses RDF in the form of N-Quads.
   *
   * @param input the N-Quads input to parse.
   *
   * @return an RDF dataset (an array of quads per http://rdf.js.org/).
   */
  static parse(input) {
    // build RDF dataset
    const dataset = [];

    const graphs = {};

    // split N-Quad input into lines
    const lines = input.split(REGEX.eoln);
    let lineNumber = 0;
    for(const line of lines) {
      lineNumber++;

      // skip empty lines
      if(REGEX.empty.test(line)) {
        continue;
      }

      // parse quad
      const match = line.match(REGEX.quad);
      if(match === null) {
        throw new Error('N-Quads parse error on line ' + lineNumber + '.');
      }

      // create RDF quad
      const quad = {};

      // get subject
      if(match[1] !== undefined) {
        quad.subject = {termType: 'NamedNode', value: match[1]};
      } else {
        quad.subject = {termType: 'BlankNode', value: match[2]};
      }

      // get predicate
      quad.predicate = {termType: 'NamedNode', value: match[3]};

      // get object
      if(match[4] !== undefined) {
        quad.object = {termType: 'NamedNode', value: match[4]};
      } else if(match[5] !== undefined) {
        quad.object = {termType: 'BlankNode', value: match[5]};
      } else {
        quad.object = {
          termType: 'Literal',
          value: undefined,
          datatype: {
            termType: 'NamedNode'
          }
        };
        if(match[7] !== undefined) {
          quad.object.datatype.value = match[7];
        } else if(match[8] !== undefined) {
          quad.object.datatype.value = RDF_LANGSTRING;
          quad.object.language = match[8];
        } else {
          quad.object.datatype.value = XSD_STRING;
        }
        quad.object.value = _unescape(match[6]);
      }

      // get graph
      if(match[9] !== undefined) {
        quad.graph = {
          termType: 'NamedNode',
          value: match[9]
        };
      } else if(match[10] !== undefined) {
        quad.graph = {
          termType: 'BlankNode',
          value: match[10]
        };
      } else {
        quad.graph = {
          termType: 'DefaultGraph',
          value: ''
        };
      }

      // only add quad if it is unique in its graph
      if(!(quad.graph.value in graphs)) {
        graphs[quad.graph.value] = [quad];
        dataset.push(quad);
      } else {
        let unique = true;
        const quads = graphs[quad.graph.value];
        for(const q of quads) {
          if(_compareTriples(q, quad)) {
            unique = false;
            break;
          }
        }
        if(unique) {
          quads.push(quad);
          dataset.push(quad);
        }
      }
    }

    return dataset;
  }

  /**
   * Converts an RDF dataset to N-Quads.
   *
   * @param dataset (array of quads) the RDF dataset to convert.
   *
   * @return the N-Quads string.
   */
  static serialize(dataset) {
    if(!Array.isArray(dataset)) {
      dataset = NQuads.legacyDatasetToQuads(dataset);
    }
    const quads = [];
    for(const quad of dataset) {
      quads.push(NQuads.serializeQuad(quad));
    }
    return quads.sort().join('');
  }

  /**
   * Converts an RDF quad to an N-Quad string (a single quad).
   *
   * @param quad the RDF quad convert.
   *
   * @return the N-Quad string.
   */
  static serializeQuad(quad) {
    const s = quad.subject;
    const p = quad.predicate;
    const o = quad.object;
    const g = quad.graph;

    let nquad = '';

    // subject and predicate can only be NamedNode or BlankNode
    [s, p].forEach(term => {
      if(term.termType === 'NamedNode') {
        nquad += '<' + term.value + '>';
      } else {
        nquad += term.value;
      }
      nquad += ' ';
    });

    // object is NamedNode, BlankNode, or Literal
    if(o.termType === 'NamedNode') {
      nquad += '<' + o.value + '>';
    } else if(o.termType === 'BlankNode') {
      nquad += o.value;
    } else {
      nquad += '"' + _escape(o.value) + '"';
      if(o.datatype.value === RDF_LANGSTRING) {
        if(o.language) {
          nquad += '@' + o.language;
        }
      } else if(o.datatype.value !== XSD_STRING) {
        nquad += '^^<' + o.datatype.value + '>';
      }
    }

    // graph can only be NamedNode or BlankNode (or DefaultGraph, but that
    // does not add to `nquad`)
    if(g.termType === 'NamedNode') {
      nquad += ' <' + g.value + '>';
    } else if(g.termType === 'BlankNode') {
      nquad += ' ' + g.value;
    }

    nquad += ' .\n';
    return nquad;
  }

  /**
   * Converts a legacy-formatted dataset to an array of quads dataset per
   * http://rdf.js.org/.
   *
   * @param dataset the legacy dataset to convert.
   *
   * @return the array of quads dataset.
   */
  static legacyDatasetToQuads(dataset) {
    const quads = [];

    const termTypeMap = {
      'blank node': 'BlankNode',
      'IRI': 'NamedNode',
      'literal': 'Literal'
    };

    for(const graphName in dataset) {
      const triples = dataset[graphName];
      triples.forEach(triple => {
        const quad = {};
        for(const componentName in triple) {
          const oldComponent = triple[componentName];
          const newComponent = {
            termType: termTypeMap[oldComponent.type],
            value: oldComponent.value
          };
          if(newComponent.termType === 'Literal') {
            newComponent.datatype = {
              termType: 'NamedNode'
            };
            if('datatype' in oldComponent) {
              newComponent.datatype.value = oldComponent.datatype;
            }
            if('language' in oldComponent) {
              if(!('datatype' in oldComponent)) {
                newComponent.datatype.value = RDF_LANGSTRING;
              }
              newComponent.language = oldComponent.language;
            } else if(!('datatype' in oldComponent)) {
              newComponent.datatype.value = XSD_STRING;
            }
          }
          quad[componentName] = newComponent;
        }
        if(graphName === '@default') {
          quad.graph = {
            termType: 'DefaultGraph',
            value: ''
          };
        } else {
          quad.graph = {
            termType: graphName.startsWith('_:') ? 'BlankNode' : 'NamedNode',
            value: graphName
          };
        }
        quads.push(quad);
      });
    }

    return quads;
  }
};

/**
 * Compares two RDF triples for equality.
 *
 * @param t1 the first triple.
 * @param t2 the second triple.
 *
 * @return true if the triples are the same, false if not.
 */
function _compareTriples(t1, t2) {
  for(const k in t1) {
    if(t1[k].termType !== t2[k].termType || t1[k].value !== t2[k].value) {
      return false;
    }
  }
  if(t1.object.termType !== 'Literal') {
    return true;
  }
  return (
    (t1.object.datatype.termType === t2.object.datatype.termType) &&
    (t1.object.datatype.value === t2.object.datatype.value) &&
    (t1.object.language === t2.object.language)
  );
}

const _escapeRegex = /["\\\n\r]/g;
/**
 * Escape string to N-Quads literal
 */
function _escape(s) {
  return s.replace(_escapeRegex, function(match) {
    switch(match) {
      case '"': return '\\"';
      case '\\': return '\\\\';
      case '\n': return '\\n';
      case '\r': return '\\r';
    }
  });
}

const _unescapeRegex =
  /(?:\\([tbnrf"'\\]))|(?:\\u([0-9A-Fa-f]{4}))|(?:\\U([0-9A-Fa-f]{8}))/g;
/**
 * Unescape N-Quads literal to string
 */
function _unescape(s) {
  return s.replace(_unescapeRegex, function(match, code, u, U) {
    if(code) {
      switch(code) {
        case 't': return '\t';
        case 'b': return '\b';
        case 'n': return '\n';
        case 'r': return '\r';
        case 'f': return '\f';
        case '"': return '"';
        case '\'': return '\'';
        case '\\': return '\\';
      }
    }
    if(u) {
      return String.fromCharCode(parseInt(u, 16));
    }
    if(U) {
      // FIXME: support larger values
      throw new Error('Unsupported U escape');
    }
  });
}

const POSITIONS = {subject: 's', object: 'o', graph: 'g'};

var URDNA2015_1 = class URDNA2015 extends AsyncAlgorithm_1 {
  constructor(options) {
    options = options || {};
    super(options);
    this.name = 'URDNA2015';
    this.options = Object.assign({}, options);
    this.blankNodeInfo = {};
    this.hashToBlankNodes = {};
    this.canonicalIssuer = new IdentifierIssuer_1('_:c14n');
    this.hashAlgorithm = 'sha256';
    this.quads;
  }

  // 4.4) Normalization Algorithm
  main(dataset, callback) {
    const self = this;
    self.schedule.start = Date.now();
    let result;
    self.quads = dataset;

    // 1) Create the normalization state.

    // Note: Optimize by generating non-normalized blank node map concurrently.
    const nonNormalized = {};

    self.waterfall([
      callback => {
        // 2) For every quad in input dataset:
        self.forEach(dataset, (quad, idx, callback) => {
          // 2.1) For each blank node that occurs in the quad, add a reference
          // to the quad using the blank node identifier in the blank node to
          // quads map, creating a new entry if necessary.
          self.forEachComponent(quad, component => {
            if(component.termType !== 'BlankNode') {
              return;
            }
            const id = component.value;
            if(id in self.blankNodeInfo) {
              self.blankNodeInfo[id].quads.push(quad);
            } else {
              nonNormalized[id] = true;
              self.blankNodeInfo[id] = {quads: [quad]};
            }
          });

          callback();
        }, callback);
      },
      callback => {
        // 3) Create a list of non-normalized blank node identifiers
        // non-normalized identifiers and populate it using the keys from the
        // blank node to quads map.
        // Note: We use a map here and it was generated during step 2.

        // 4) Initialize simple, a boolean flag, to true.
        let simple = true;

        // 5) While simple is true, issue canonical identifiers for blank nodes:
        self.whilst(() => simple, callback => {
          // 5.1) Set simple to false.
          simple = false;

          // 5.2) Clear hash to blank nodes map.
          self.hashToBlankNodes = {};

          self.waterfall([
            callback => {
              // 5.3) For each blank node identifier identifier in
              // non-normalized identifiers:
              self.forEach(nonNormalized, (value, id, callback) => {
                // 5.3.1) Create a hash, hash, according to the Hash First
                // Degree Quads algorithm.
                self.hashFirstDegreeQuads(id, (err, hash) => {
                  if(err) {
                    return callback(err);
                  }
                  // 5.3.2) Add hash and identifier to hash to blank nodes map,
                  // creating a new entry if necessary.
                  if(hash in self.hashToBlankNodes) {
                    self.hashToBlankNodes[hash].push(id);
                  } else {
                    self.hashToBlankNodes[hash] = [id];
                  }
                  callback();
                });
              }, callback);
            },
            callback => {
              // 5.4) For each hash to identifier list mapping in hash to blank
              // nodes map, lexicographically-sorted by hash:
              const hashes = Object.keys(self.hashToBlankNodes).sort();
              self.forEach(hashes, (hash, i, callback) => {
                // 5.4.1) If the length of identifier list is greater than 1,
                // continue to the next mapping.
                const idList = self.hashToBlankNodes[hash];
                if(idList.length > 1) {
                  return callback();
                }

                // 5.4.2) Use the Issue Identifier algorithm, passing canonical
                // issuer and the single blank node identifier in identifier
                // list, identifier, to issue a canonical replacement identifier
                // for identifier.
                // TODO: consider changing `getId` to `issue`
                const id = idList[0];
                self.canonicalIssuer.getId(id);

                // 5.4.3) Remove identifier from non-normalized identifiers.
                delete nonNormalized[id];

                // 5.4.4) Remove hash from the hash to blank nodes map.
                delete self.hashToBlankNodes[hash];

                // 5.4.5) Set simple to true.
                simple = true;
                callback();
              }, callback);
            }
          ], callback);
        }, callback);
      },
      callback => {
        // 6) For each hash to identifier list mapping in hash to blank nodes
        // map, lexicographically-sorted by hash:
        const hashes = Object.keys(self.hashToBlankNodes).sort();
        self.forEach(hashes, (hash, idx, callback) => {
          // 6.1) Create hash path list where each item will be a result of
          // running the Hash N-Degree Quads algorithm.
          const hashPathList = [];

          // 6.2) For each blank node identifier identifier in identifier list:
          const idList = self.hashToBlankNodes[hash];
          self.waterfall([
            callback => {
              self.forEach(idList, (id, idx, callback) => {
                // 6.2.1) If a canonical identifier has already been issued for
                // identifier, continue to the next identifier.
                if(self.canonicalIssuer.hasId(id)) {
                  return callback();
                }

                // 6.2.2) Create temporary issuer, an identifier issuer
                // initialized with the prefix _:b.
                const issuer = new IdentifierIssuer_1('_:b');

                // 6.2.3) Use the Issue Identifier algorithm, passing temporary
                // issuer and identifier, to issue a new temporary blank node
                // identifier for identifier.
                issuer.getId(id);

                // 6.2.4) Run the Hash N-Degree Quads algorithm, passing
                // temporary issuer, and append the result to the hash path
                // list.
                self.hashNDegreeQuads(id, issuer, (err, result) => {
                  if(err) {
                    return callback(err);
                  }
                  hashPathList.push(result);
                  callback();
                });
              }, callback);
            },
            callback => {
              // 6.3) For each result in the hash path list,
              // lexicographically-sorted by the hash in result:
              // TODO: use `String.localeCompare`?
              hashPathList.sort((a, b) =>
                (a.hash < b.hash) ? -1 : ((a.hash > b.hash) ? 1 : 0));
              self.forEach(hashPathList, (result, idx, callback) => {
                // 6.3.1) For each blank node identifier, existing identifier,
                // that was issued a temporary identifier by identifier issuer
                // in result, issue a canonical identifier, in the same order,
                // using the Issue Identifier algorithm, passing canonical
                // issuer and existing identifier.
                for(const existing in result.issuer.existing) {
                  self.canonicalIssuer.getId(existing);
                }
                callback();
              }, callback);
            }
          ], callback);
        }, callback);
      }, callback => {
        /* Note: At this point all blank nodes in the set of RDF quads have been
        assigned canonical identifiers, which have been stored in the canonical
        issuer. Here each quad is updated by assigning each of its blank nodes
        its new identifier. */

        // 7) For each quad, quad, in input dataset:
        const normalized = [];
        self.waterfall([
          callback => {
            self.forEach(self.quads, (quad, idx, callback) => {
              // 7.1) Create a copy, quad copy, of quad and replace any existing
              // blank node identifiers using the canonical identifiers
              // previously issued by canonical issuer.
              // Note: We optimize away the copy here.
              self.forEachComponent(quad, component => {
                if(component.termType === 'BlankNode' &&
                  !component.value.startsWith(self.canonicalIssuer.prefix)) {
                  component.value = self.canonicalIssuer.getId(component.value);
                }
              });
              // 7.2) Add quad copy to the normalized dataset.
              normalized.push(NQuads_1.serializeQuad(quad));
              callback();
            }, callback);
          },
          callback => {
            // sort normalized output
            normalized.sort();

            // 8) Return the normalized dataset.
            result = normalized.join('');
            return callback();
          }
        ], callback);
      }
    ], err => callback(err, result));
  }

  // 4.6) Hash First Degree Quads
  hashFirstDegreeQuads(id, callback) {
    const self = this;

    // return cached hash
    const info = self.blankNodeInfo[id];
    if('hash' in info) {
      return callback(null, info.hash);
    }

    // 1) Initialize nquads to an empty list. It will be used to store quads in
    // N-Quads format.
    const nquads = [];

    // 2) Get the list of quads quads associated with the reference blank node
    // identifier in the blank node to quads map.
    const quads = info.quads;

    // 3) For each quad quad in quads:
    self.forEach(quads, (quad, idx, callback) => {
      // 3.1) Serialize the quad in N-Quads format with the following special
      // rule:

      // 3.1.1) If any component in quad is an blank node, then serialize it
      // using a special identifier as follows:
      const copy = {predicate: quad.predicate};
      self.forEachComponent(quad, (component, key) => {
        // 3.1.2) If the blank node's existing blank node identifier matches the
        // reference blank node identifier then use the blank node identifier
        // _:a, otherwise, use the blank node identifier _:z.
        copy[key] = self.modifyFirstDegreeComponent(id, component, key);
      });
      nquads.push(NQuads_1.serializeQuad(copy));
      callback();
    }, err => {
      if(err) {
        return callback(err);
      }
      // 4) Sort nquads in lexicographical order.
      nquads.sort();

      // 5) Return the hash that results from passing the sorted, joined nquads
      // through the hash algorithm.
      const md = new MessageDigestBrowser(self.hashAlgorithm);
      for(let i = 0; i < nquads.length; ++i) {
        md.update(nquads[i]);
      }
      // TODO: represent as byte buffer instead to cut memory usage in half
      info.hash = md.digest();
      callback(null, info.hash);
    });
  }

  // 4.7) Hash Related Blank Node
  hashRelatedBlankNode(related, quad, issuer, position, callback) {
    const self = this;

    // 1) Set the identifier to use for related, preferring first the canonical
    // identifier for related if issued, second the identifier issued by issuer
    // if issued, and last, if necessary, the result of the Hash First Degree
    // Quads algorithm, passing related.
    let id;
    self.waterfall([
      callback => {
        if(self.canonicalIssuer.hasId(related)) {
          id = self.canonicalIssuer.getId(related);
          return callback();
        }
        if(issuer.hasId(related)) {
          id = issuer.getId(related);
          return callback();
        }
        self.hashFirstDegreeQuads(related, (err, hash) => {
          if(err) {
            return callback(err);
          }
          id = hash;
          callback();
        });
      }
    ], err => {
      if(err) {
        return callback(err);
      }

      // 2) Initialize a string input to the value of position.
      // Note: We use a hash object instead.
      const md = new MessageDigestBrowser(self.hashAlgorithm);
      md.update(position);

      // 3) If position is not g, append <, the value of the predicate in quad,
      // and > to input.
      if(position !== 'g') {
        md.update(self.getRelatedPredicate(quad));
      }

      // 4) Append identifier to input.
      md.update(id);

      // 5) Return the hash that results from passing input through the hash
      // algorithm.
      // TODO: represent as byte buffer instead to cut memory usage in half
      return callback(null, md.digest());
    });
  }

  // 4.8) Hash N-Degree Quads
  hashNDegreeQuads(id, issuer, callback) {
    const self = this;

    // 1) Create a hash to related blank nodes map for storing hashes that
    // identify related blank nodes.
    // Note: 2) and 3) handled within `createHashToRelated`
    let hashToRelated;
    const md = new MessageDigestBrowser(self.hashAlgorithm);
    self.waterfall([
      callback => self.createHashToRelated(id, issuer, (err, result) => {
        if(err) {
          return callback(err);
        }
        hashToRelated = result;
        callback();
      }),
      callback => {
        // 4) Create an empty string, data to hash.
        // Note: We created a hash object `md` above instead.

        // 5) For each related hash to blank node list mapping in hash to
        // related blank nodes map, sorted lexicographically by related hash:
        const hashes = Object.keys(hashToRelated).sort();
        self.forEach(hashes, (hash, idx, callback) => {
          // 5.1) Append the related hash to the data to hash.
          md.update(hash);

          // 5.2) Create a string chosen path.
          let chosenPath = '';

          // 5.3) Create an unset chosen issuer variable.
          let chosenIssuer;

          // 5.4) For each permutation of blank node list:
          const permutator = new Permutator_1(hashToRelated[hash]);
          self.whilst(() => permutator.hasNext(), nextPermutation => {
            const permutation = permutator.next();

            // 5.4.1) Create a copy of issuer, issuer copy.
            let issuerCopy = issuer.clone();

            // 5.4.2) Create a string path.
            let path = '';

            // 5.4.3) Create a recursion list, to store blank node identifiers
            // that must be recursively processed by this algorithm.
            const recursionList = [];

            self.waterfall([
              callback => {
                // 5.4.4) For each related in permutation:
                self.forEach(permutation, (related, idx, callback) => {
                  // 5.4.4.1) If a canonical identifier has been issued for
                  // related, append it to path.
                  if(self.canonicalIssuer.hasId(related)) {
                    path += self.canonicalIssuer.getId(related);
                  } else {
                    // 5.4.4.2) Otherwise:
                    // 5.4.4.2.1) If issuer copy has not issued an identifier
                    // for related, append related to recursion list.
                    if(!issuerCopy.hasId(related)) {
                      recursionList.push(related);
                    }
                    // 5.4.4.2.2) Use the Issue Identifier algorithm, passing
                    // issuer copy and related and append the result to path.
                    path += issuerCopy.getId(related);
                  }

                  // 5.4.4.3) If chosen path is not empty and the length of path
                  // is greater than or equal to the length of chosen path and
                  // path is lexicographically greater than chosen path, then
                  // skip to the next permutation.
                  // Note: Comparing path length to chosen path length can be
                  // optimized away; only compare lexicographically.
                  if(chosenPath.length !== 0 && path > chosenPath) {
                    // FIXME: may cause inaccurate total depth calculation
                    return nextPermutation();
                  }
                  callback();
                }, callback);
              },
              callback => {
                // 5.4.5) For each related in recursion list:
                self.forEach(recursionList, (related, idx, callback) => {
                  // 5.4.5.1) Set result to the result of recursively executing
                  // the Hash N-Degree Quads algorithm, passing related for
                  // identifier and issuer copy for path identifier issuer.
                  self.hashNDegreeQuads(related, issuerCopy, (err, result) => {
                    if(err) {
                      return callback(err);
                    }

                    // 5.4.5.2) Use the Issue Identifier algorithm, passing
                    // issuer copy and related and append the result to path.
                    path += issuerCopy.getId(related);

                    // 5.4.5.3) Append <, the hash in result, and > to path.
                    path += '<' + result.hash + '>';

                    // 5.4.5.4) Set issuer copy to the identifier issuer in
                    // result.
                    issuerCopy = result.issuer;

                    // 5.4.5.5) If chosen path is not empty and the length of
                    // path is greater than or equal to the length of chosen
                    // path and path is lexicographically greater than chosen
                    // path, then skip to the next permutation.
                    // Note: Comparing path length to chosen path length can be
                    // optimized away; only compare lexicographically.
                    if(chosenPath.length !== 0 && path > chosenPath) {
                      // FIXME: may cause inaccurate total depth calculation
                      return nextPermutation();
                    }
                    callback();
                  });
                }, callback);
              },
              callback => {
                // 5.4.6) If chosen path is empty or path is lexicographically
                // less than chosen path, set chosen path to path and chosen
                // issuer to issuer copy.
                if(chosenPath.length === 0 || path < chosenPath) {
                  chosenPath = path;
                  chosenIssuer = issuerCopy;
                }
                callback();
              }
            ], nextPermutation);
          }, err => {
            if(err) {
              return callback(err);
            }

            // 5.5) Append chosen path to data to hash.
            md.update(chosenPath);

            // 5.6) Replace issuer, by reference, with chosen issuer.
            issuer = chosenIssuer;
            callback();
          });
        }, callback);
      }
    ], err => {
      // 6) Return issuer and the hash that results from passing data to hash
      // through the hash algorithm.
      callback(err, {hash: md.digest(), issuer});
    });
  }

  // helper for modifying component during Hash First Degree Quads
  modifyFirstDegreeComponent(id, component) {
    if(component.termType !== 'BlankNode') {
      return component;
    }
    component = util.clone(component);
    component.value = (component.value === id ? '_:a' : '_:z');
    return component;
  }

  // helper for getting a related predicate
  getRelatedPredicate(quad) {
    return '<' + quad.predicate.value + '>';
  }

  // helper for creating hash to related blank nodes map
  createHashToRelated(id, issuer, callback) {
    const self = this;

    // 1) Create a hash to related blank nodes map for storing hashes that
    // identify related blank nodes.
    const hashToRelated = {};

    // 2) Get a reference, quads, to the list of quads in the blank node to
    // quads map for the key identifier.
    const quads = self.blankNodeInfo[id].quads;

    // 3) For each quad in quads:
    self.forEach(quads, (quad, idx, callback) => {
      // 3.1) For each component in quad, if component is the subject, object,
      // and graph name and it is a blank node that is not identified by
      // identifier:
      self.forEach(quad, (component, key, callback) => {
        if(key === 'predicate' ||
          !(component.termType === 'BlankNode' && component.value !== id)) {
          return callback();
        }
        // 3.1.1) Set hash to the result of the Hash Related Blank Node
        // algorithm, passing the blank node identifier for component as
        // related, quad, path identifier issuer as issuer, and position as
        // either s, o, or g based on whether component is a subject, object,
        // graph name, respectively.
        const related = component.value;
        const position = POSITIONS[key];
        self.hashRelatedBlankNode(
          related, quad, issuer, position, (err, hash) => {
          if(err) {
            return callback(err);
          }
          // 3.1.2) Add a mapping of hash to the blank node identifier for
          // component to hash to related blank nodes map, adding an entry as
          // necessary.
          if(hash in hashToRelated) {
            hashToRelated[hash].push(related);
          } else {
            hashToRelated[hash] = [related];
          }
          callback();
        });
      }, callback);
    }, err => callback(err, hashToRelated));
  }

  // helper that iterates over quad components (skips predicate)
  forEachComponent(quad, op) {
    for(const key in quad) {
      // skip `predicate`
      if(key === 'predicate') {
        continue;
      }
      op(quad[key], key, quad);
    }
  }
};

var URGNA2012 = class URDNA2012 extends URDNA2015_1 {
  constructor(options) {
    super(options);
    this.name = 'URGNA2012';
    this.hashAlgorithm = 'sha1';
  }

  // helper for modifying component during Hash First Degree Quads
  modifyFirstDegreeComponent(id, component, key) {
    if(component.termType !== 'BlankNode') {
      return component;
    }
    component = util.clone(component);
    if(key === 'name') {
      component.value = '_:g';
    } else {
      component.value = (component.value === id ? '_:a' : '_:z');
    }
    return component;
  }

  // helper for getting a related predicate
  getRelatedPredicate(quad) {
    return quad.predicate.value;
  }

  // helper for creating hash to related blank nodes map
  createHashToRelated(id, issuer, callback) {
    const self = this;

    // 1) Create a hash to related blank nodes map for storing hashes that
    // identify related blank nodes.
    const hashToRelated = {};

    // 2) Get a reference, quads, to the list of quads in the blank node to
    // quads map for the key identifier.
    const quads = self.blankNodeInfo[id].quads;

    // 3) For each quad in quads:
    self.forEach(quads, (quad, idx, callback) => {
      // 3.1) If the quad's subject is a blank node that does not match
      // identifier, set hash to the result of the Hash Related Blank Node
      // algorithm, passing the blank node identifier for subject as related,
      // quad, path identifier issuer as issuer, and p as position.
      let position;
      let related;
      if(quad.subject.termType === 'BlankNode' && quad.subject.value !== id) {
        related = quad.subject.value;
        position = 'p';
      } else if(
        quad.object.termType === 'BlankNode' && quad.object.value !== id) {
        // 3.2) Otherwise, if quad's object is a blank node that does not match
        // identifier, to the result of the Hash Related Blank Node algorithm,
        // passing the blank node identifier for object as related, quad, path
        // identifier issuer as issuer, and r as position.
        related = quad.object.value;
        position = 'r';
      } else {
        // 3.3) Otherwise, continue to the next quad.
        return callback();
      }
      // 3.4) Add a mapping of hash to the blank node identifier for the
      // component that matched (subject or object) to hash to related blank
      // nodes map, adding an entry as necessary.
      self.hashRelatedBlankNode(
        related, quad, issuer, position, (err, hash) => {
        if(err) {
          return callback(err);
        }
        if(hash in hashToRelated) {
          hashToRelated[hash].push(related);
        } else {
          hashToRelated[hash] = [related];
        }
        callback();
      });
    }, err => callback(err, hashToRelated));
  }
};

const POSITIONS$1 = {subject: 's', object: 'o', graph: 'g'};

var URDNA2015Sync_1 = class URDNA2015Sync {
  constructor() {
    this.name = 'URDNA2015';
    this.blankNodeInfo = {};
    this.hashToBlankNodes = {};
    this.canonicalIssuer = new IdentifierIssuer_1('_:c14n');
    this.hashAlgorithm = 'sha256';
    this.quads;
  }

  // 4.4) Normalization Algorithm
  main(dataset) {
    const self = this;
    self.quads = dataset;

    // 1) Create the normalization state.

    // Note: Optimize by generating non-normalized blank node map concurrently.
    const nonNormalized = {};

    // 2) For every quad in input dataset:
    for(const quad of dataset) {
      // 2.1) For each blank node that occurs in the quad, add a reference
      // to the quad using the blank node identifier in the blank node to
      // quads map, creating a new entry if necessary.
      self.forEachComponent(quad, component => {
        if(component.termType !== 'BlankNode') {
          return;
        }
        const id = component.value;
        if(id in self.blankNodeInfo) {
          self.blankNodeInfo[id].quads.push(quad);
        } else {
          nonNormalized[id] = true;
          self.blankNodeInfo[id] = {quads: [quad]};
        }
      });
    }

    // 3) Create a list of non-normalized blank node identifiers
    // non-normalized identifiers and populate it using the keys from the
    // blank node to quads map.
    // Note: We use a map here and it was generated during step 2.

    // 4) Initialize simple, a boolean flag, to true.
    let simple = true;

    // 5) While simple is true, issue canonical identifiers for blank nodes:
    while(simple) {
      // 5.1) Set simple to false.
      simple = false;

      // 5.2) Clear hash to blank nodes map.
      self.hashToBlankNodes = {};

      // 5.3) For each blank node identifier identifier in non-normalized
      // identifiers:
      for(const id in nonNormalized) {
        // 5.3.1) Create a hash, hash, according to the Hash First Degree
        // Quads algorithm.
        const hash = self.hashFirstDegreeQuads(id);

        // 5.3.2) Add hash and identifier to hash to blank nodes map,
        // creating a new entry if necessary.
        if(hash in self.hashToBlankNodes) {
          self.hashToBlankNodes[hash].push(id);
        } else {
          self.hashToBlankNodes[hash] = [id];
        }
      }

      // 5.4) For each hash to identifier list mapping in hash to blank
      // nodes map, lexicographically-sorted by hash:
      const hashes = Object.keys(self.hashToBlankNodes).sort();
      for(let i = 0; i < hashes.length; ++i) {
        // 5.4.1) If the length of identifier list is greater than 1,
        // continue to the next mapping.
        const hash = hashes[i];
        const idList = self.hashToBlankNodes[hash];
        if(idList.length > 1) {
          continue;
        }

        // 5.4.2) Use the Issue Identifier algorithm, passing canonical
        // issuer and the single blank node identifier in identifier
        // list, identifier, to issue a canonical replacement identifier
        // for identifier.
        // TODO: consider changing `getId` to `issue`
        const id = idList[0];
        self.canonicalIssuer.getId(id);

        // 5.4.3) Remove identifier from non-normalized identifiers.
        delete nonNormalized[id];

        // 5.4.4) Remove hash from the hash to blank nodes map.
        delete self.hashToBlankNodes[hash];

        // 5.4.5) Set simple to true.
        simple = true;
      }
    }

    // 6) For each hash to identifier list mapping in hash to blank nodes map,
    // lexicographically-sorted by hash:
    const hashes = Object.keys(self.hashToBlankNodes).sort();
    for(let i = 0; i < hashes.length; ++i) {
      // 6.1) Create hash path list where each item will be a result of
      // running the Hash N-Degree Quads algorithm.
      const hashPathList = [];

      // 6.2) For each blank node identifier identifier in identifier list:
      const hash = hashes[i];
      const idList = self.hashToBlankNodes[hash];
      for(let j = 0; j < idList.length; ++j) {
        // 6.2.1) If a canonical identifier has already been issued for
        // identifier, continue to the next identifier.
        const id = idList[j];
        if(self.canonicalIssuer.hasId(id)) {
          continue;
        }

        // 6.2.2) Create temporary issuer, an identifier issuer
        // initialized with the prefix _:b.
        const issuer = new IdentifierIssuer_1('_:b');

        // 6.2.3) Use the Issue Identifier algorithm, passing temporary
        // issuer and identifier, to issue a new temporary blank node
        // identifier for identifier.
        issuer.getId(id);

        // 6.2.4) Run the Hash N-Degree Quads algorithm, passing
        // temporary issuer, and append the result to the hash path list.
        const result = self.hashNDegreeQuads(id, issuer);
        hashPathList.push(result);
      }

      // 6.3) For each result in the hash path list,
      // lexicographically-sorted by the hash in result:
      // TODO: use `String.localeCompare`?
      hashPathList.sort((a, b) =>
        (a.hash < b.hash) ? -1 : ((a.hash > b.hash) ? 1 : 0));
      for(let j = 0; j < hashPathList.length; ++j) {
        // 6.3.1) For each blank node identifier, existing identifier,
        // that was issued a temporary identifier by identifier issuer
        // in result, issue a canonical identifier, in the same order,
        // using the Issue Identifier algorithm, passing canonical
        // issuer and existing identifier.
        const result = hashPathList[j];
        for(const existing in result.issuer.existing) {
          self.canonicalIssuer.getId(existing);
        }
      }
    }

    /* Note: At this point all blank nodes in the set of RDF quads have been
    assigned canonical identifiers, which have been stored in the canonical
    issuer. Here each quad is updated by assigning each of its blank nodes
    its new identifier. */

    // 7) For each quad, quad, in input dataset:
    const normalized = [];
    for(let i = 0; i < self.quads.length; ++i) {
      // 7.1) Create a copy, quad copy, of quad and replace any existing
      // blank node identifiers using the canonical identifiers
      // previously issued by canonical issuer.
      // Note: We optimize away the copy here.
      const quad = self.quads[i];
      self.forEachComponent(quad, component => {
        if(component.termType === 'BlankNode' &&
          !component.value.startsWith(self.canonicalIssuer.prefix)) {
          component.value = self.canonicalIssuer.getId(component.value);
        }
      });
      // 7.2) Add quad copy to the normalized dataset.
      normalized.push(NQuads_1.serializeQuad(quad));
    }

    // sort normalized output
    normalized.sort();

    // 8) Return the normalized dataset.
    return normalized.join('');
  }

  // 4.6) Hash First Degree Quads
  hashFirstDegreeQuads(id) {
    const self = this;

    // return cached hash
    const info = self.blankNodeInfo[id];
    if('hash' in info) {
      return info.hash;
    }

    // 1) Initialize nquads to an empty list. It will be used to store quads in
    // N-Quads format.
    const nquads = [];

    // 2) Get the list of quads `quads` associated with the reference blank node
    // identifier in the blank node to quads map.
    const quads = info.quads;

    // 3) For each quad `quad` in `quads`:
    for(let i = 0; i < quads.length; ++i) {
      const quad = quads[i];

      // 3.1) Serialize the quad in N-Quads format with the following special
      // rule:

      // 3.1.1) If any component in quad is an blank node, then serialize it
      // using a special identifier as follows:
      const copy = {predicate: quad.predicate};
      self.forEachComponent(quad, (component, key) => {
        // 3.1.2) If the blank node's existing blank node identifier matches
        // the reference blank node identifier then use the blank node
        // identifier _:a, otherwise, use the blank node identifier _:z.
        copy[key] = self.modifyFirstDegreeComponent(id, component, key);
      });
      nquads.push(NQuads_1.serializeQuad(copy));
    }

    // 4) Sort nquads in lexicographical order.
    nquads.sort();

    // 5) Return the hash that results from passing the sorted, joined nquads
    // through the hash algorithm.
    const md = new MessageDigestBrowser(self.hashAlgorithm);
    for(let i = 0; i < nquads.length; ++i) {
      md.update(nquads[i]);
    }
    // TODO: represent as byte buffer instead to cut memory usage in half
    info.hash = md.digest();
    return info.hash;
  }

  // 4.7) Hash Related Blank Node
  hashRelatedBlankNode(related, quad, issuer, position) {
    const self = this;

    // 1) Set the identifier to use for related, preferring first the canonical
    // identifier for related if issued, second the identifier issued by issuer
    // if issued, and last, if necessary, the result of the Hash First Degree
    // Quads algorithm, passing related.
    let id;
    if(self.canonicalIssuer.hasId(related)) {
      id = self.canonicalIssuer.getId(related);
    } else if(issuer.hasId(related)) {
      id = issuer.getId(related);
    } else {
      id = self.hashFirstDegreeQuads(related);
    }

    // 2) Initialize a string input to the value of position.
    // Note: We use a hash object instead.
    const md = new MessageDigestBrowser(self.hashAlgorithm);
    md.update(position);

    // 3) If position is not g, append <, the value of the predicate in quad,
    // and > to input.
    if(position !== 'g') {
      md.update(self.getRelatedPredicate(quad));
    }

    // 4) Append identifier to input.
    md.update(id);

    // 5) Return the hash that results from passing input through the hash
    // algorithm.
    // TODO: represent as byte buffer instead to cut memory usage in half
    return md.digest();
  }

  // 4.8) Hash N-Degree Quads
  hashNDegreeQuads(id, issuer) {
    const self = this;

    // 1) Create a hash to related blank nodes map for storing hashes that
    // identify related blank nodes.
    // Note: 2) and 3) handled within `createHashToRelated`
    const md = new MessageDigestBrowser(self.hashAlgorithm);
    const hashToRelated = self.createHashToRelated(id, issuer);

    // 4) Create an empty string, data to hash.
    // Note: We created a hash object `md` above instead.

    // 5) For each related hash to blank node list mapping in hash to related
    // blank nodes map, sorted lexicographically by related hash:
    const hashes = Object.keys(hashToRelated).sort();
    for(let i = 0; i < hashes.length; ++i) {
      // 5.1) Append the related hash to the data to hash.
      const hash = hashes[i];
      md.update(hash);

      // 5.2) Create a string chosen path.
      let chosenPath = '';

      // 5.3) Create an unset chosen issuer variable.
      let chosenIssuer;

      // 5.4) For each permutation of blank node list:
      const permutator = new Permutator_1(hashToRelated[hash]);
      while(permutator.hasNext()) {
        const permutation = permutator.next();

        // 5.4.1) Create a copy of issuer, issuer copy.
        let issuerCopy = issuer.clone();

        // 5.4.2) Create a string path.
        let path = '';

        // 5.4.3) Create a recursion list, to store blank node identifiers
        // that must be recursively processed by this algorithm.
        const recursionList = [];

        // 5.4.4) For each related in permutation:
        let nextPermutation = false;
        for(let j = 0; j < permutation.length; ++j) {
          // 5.4.4.1) If a canonical identifier has been issued for
          // related, append it to path.
          const related = permutation[j];
          if(self.canonicalIssuer.hasId(related)) {
            path += self.canonicalIssuer.getId(related);
          } else {
            // 5.4.4.2) Otherwise:
            // 5.4.4.2.1) If issuer copy has not issued an identifier for
            // related, append related to recursion list.
            if(!issuerCopy.hasId(related)) {
              recursionList.push(related);
            }
            // 5.4.4.2.2) Use the Issue Identifier algorithm, passing
            // issuer copy and related and append the result to path.
            path += issuerCopy.getId(related);
          }

          // 5.4.4.3) If chosen path is not empty and the length of path
          // is greater than or equal to the length of chosen path and
          // path is lexicographically greater than chosen path, then
          // skip to the next permutation.
          // Note: Comparing path length to chosen path length can be optimized
          // away; only compare lexicographically.
          if(chosenPath.length !== 0 && path > chosenPath) {
            nextPermutation = true;
            break;
          }
        }

        if(nextPermutation) {
          continue;
        }

        // 5.4.5) For each related in recursion list:
        for(let j = 0; j < recursionList.length; ++j) {
          // 5.4.5.1) Set result to the result of recursively executing
          // the Hash N-Degree Quads algorithm, passing related for
          // identifier and issuer copy for path identifier issuer.
          const related = recursionList[j];
          const result = self.hashNDegreeQuads(related, issuerCopy);

          // 5.4.5.2) Use the Issue Identifier algorithm, passing issuer
          // copy and related and append the result to path.
          path += issuerCopy.getId(related);

          // 5.4.5.3) Append <, the hash in result, and > to path.
          path += '<' + result.hash + '>';

          // 5.4.5.4) Set issuer copy to the identifier issuer in
          // result.
          issuerCopy = result.issuer;

          // 5.4.5.5) If chosen path is not empty and the length of path
          // is greater than or equal to the length of chosen path and
          // path is lexicographically greater than chosen path, then
          // skip to the next permutation.
          // Note: Comparing path length to chosen path length can be optimized
          // away; only compare lexicographically.
          if(chosenPath.length !== 0 && path > chosenPath) {
            nextPermutation = true;
            break;
          }
        }

        if(nextPermutation) {
          continue;
        }

        // 5.4.6) If chosen path is empty or path is lexicographically
        // less than chosen path, set chosen path to path and chosen
        // issuer to issuer copy.
        if(chosenPath.length === 0 || path < chosenPath) {
          chosenPath = path;
          chosenIssuer = issuerCopy;
        }
      }

      // 5.5) Append chosen path to data to hash.
      md.update(chosenPath);

      // 5.6) Replace issuer, by reference, with chosen issuer.
      issuer = chosenIssuer;
    }

    // 6) Return issuer and the hash that results from passing data to hash
    // through the hash algorithm.
    return {hash: md.digest(), issuer};
  }

  // helper for modifying component during Hash First Degree Quads
  modifyFirstDegreeComponent(id, component) {
    if(component.termType !== 'BlankNode') {
      return component;
    }
    component = util.clone(component);
    component.value = (component.value === id ? '_:a' : '_:z');
    return component;
  }

  // helper for getting a related predicate
  getRelatedPredicate(quad) {
    return '<' + quad.predicate.value + '>';
  }

  // helper for creating hash to related blank nodes map
  createHashToRelated(id, issuer) {
    const self = this;

    // 1) Create a hash to related blank nodes map for storing hashes that
    // identify related blank nodes.
    const hashToRelated = {};

    // 2) Get a reference, quads, to the list of quads in the blank node to
    // quads map for the key identifier.
    const quads = self.blankNodeInfo[id].quads;

    // 3) For each quad in quads:
    for(let i = 0; i < quads.length; ++i) {
      // 3.1) For each component in quad, if component is the subject, object,
      // and graph name and it is a blank node that is not identified by
      // identifier:
      const quad = quads[i];
      for(const key in quad) {
        const component = quad[key];
        if(key === 'predicate' ||
          !(component.termType === 'BlankNode' && component.value !== id)) {
          continue;
        }
        // 3.1.1) Set hash to the result of the Hash Related Blank Node
        // algorithm, passing the blank node identifier for component as
        // related, quad, path identifier issuer as issuer, and position as
        // either s, o, or g based on whether component is a subject, object,
        // graph name, respectively.
        const related = component.value;
        const position = POSITIONS$1[key];
        const hash = self.hashRelatedBlankNode(related, quad, issuer, position);

        // 3.1.2) Add a mapping of hash to the blank node identifier for
        // component to hash to related blank nodes map, adding an entry as
        // necessary.
        if(hash in hashToRelated) {
          hashToRelated[hash].push(related);
        } else {
          hashToRelated[hash] = [related];
        }
      }
    }

    return hashToRelated;
  }

  // helper that iterates over quad components (skips predicate)
  forEachComponent(quad, op) {
    for(const key in quad) {
      // skip `predicate`
      if(key === 'predicate') {
        continue;
      }
      op(quad[key], key, quad);
    }
  }
};

var URGNA2012Sync = class URDNA2012Sync extends URDNA2015Sync_1 {
  constructor() {
    super();
    this.name = 'URGNA2012';
    this.hashAlgorithm = 'sha1';
  }

  // helper for modifying component during Hash First Degree Quads
  modifyFirstDegreeComponent(id, component, key) {
    if(component.termType !== 'BlankNode') {
      return component;
    }
    component = util.clone(component);
    if(key === 'name') {
      component.value = '_:g';
    } else {
      component.value = (component.value === id ? '_:a' : '_:z');
    }
    return component;
  }

  // helper for getting a related predicate
  getRelatedPredicate(quad) {
    return quad.predicate.value;
  }

  // helper for creating hash to related blank nodes map
  createHashToRelated(id, issuer) {
    const self = this;

    // 1) Create a hash to related blank nodes map for storing hashes that
    // identify related blank nodes.
    const hashToRelated = {};

    // 2) Get a reference, quads, to the list of quads in the blank node to
    // quads map for the key identifier.
    const quads = self.blankNodeInfo[id].quads;

    // 3) For each quad in quads:
    for(let i = 0; i < quads.length; ++i) {
      // 3.1) If the quad's subject is a blank node that does not match
      // identifier, set hash to the result of the Hash Related Blank Node
      // algorithm, passing the blank node identifier for subject as related,
      // quad, path identifier issuer as issuer, and p as position.
      const quad = quads[i];
      let position;
      let related;
      if(quad.subject.termType === 'BlankNode' && quad.subject.value !== id) {
        related = quad.subject.value;
        position = 'p';
      } else if(
        quad.object.termType === 'BlankNode' && quad.object.value !== id) {
        // 3.2) Otherwise, if quad's object is a blank node that does not match
        // identifier, to the result of the Hash Related Blank Node algorithm,
        // passing the blank node identifier for object as related, quad, path
        // identifier issuer as issuer, and r as position.
        related = quad.object.value;
        position = 'r';
      } else {
        // 3.3) Otherwise, continue to the next quad.
        continue;
      }
      // 3.4) Add a mapping of hash to the blank node identifier for the
      // component that matched (subject or object) to hash to related blank
      // nodes map, adding an entry as necessary.
      const hash = self.hashRelatedBlankNode(related, quad, issuer, position);
      if(hash in hashToRelated) {
        hashToRelated[hash].push(related);
      } else {
        hashToRelated[hash] = [related];
      }
    }

    return hashToRelated;
  }
};

// optional native support
let rdfCanonizeNative;
try {
  rdfCanonizeNative = require$$4;
} catch(e) {}

const api$2 = {};
var lib = api$2;

// expose helpers
api$2.NQuads = NQuads_1;
api$2.IdentifierIssuer = IdentifierIssuer_1;

/**
 * Get or set native API.
 *
 * @param api the native API.
 *
 * @return the currently set native API.
 */
api$2._rdfCanonizeNative = function(api) {
  if(api) {
    rdfCanonizeNative = api;
  }
  return rdfCanonizeNative;
};

/**
 * Asynchronously canonizes an RDF dataset.
 *
 * @param dataset the dataset to canonize.
 * @param options the options to use:
 *          algorithm the canonicalization algorithm to use, `URDNA2015` or
 *            `URGNA2012`.
 *          [useNative] use native implementation (default: false).
 * @param [callback(err, canonical)] called once the operation completes.
 *
 * @return a Promise that resolves to the canonicalized RDF Dataset.
 */
api$2.canonize = util.callbackify(async function(dataset, options) {
  let callback;
  const promise = new Promise((resolve, reject) => {
    callback = (err, canonical) => {
      if(err) {
        return reject(err);
      }

      /*if(options.format === 'application/n-quads') {
        canonical = canonical.join('');
      }
      canonical = _parseNQuads(canonical.join(''));*/

      resolve(canonical);
    };
  });

  // back-compat with legacy dataset
  if(!Array.isArray(dataset)) {
    dataset = api$2.NQuads.legacyDatasetToQuads(dataset);
  }

  // TODO: convert algorithms to Promise-based async
  if(options.useNative) {
    if(rdfCanonizeNative) {
      rdfCanonizeNative.canonize(dataset, options, callback);
    } else {
      throw new Error('rdf-canonize-native not available');
    }
  } else {
    if(options.algorithm === 'URDNA2015') {
      new URDNA2015_1(options).main(dataset, callback);
    } else if(options.algorithm === 'URGNA2012') {
      new URGNA2012(options).main(dataset, callback);
    } else if(!('algorithm' in options)) {
      throw new Error('No RDF Dataset Canonicalization algorithm specified.');
    } else {
      throw new Error(
        'Invalid RDF Dataset Canonicalization algorithm: ' + options.algorithm);
    }
  }

  return promise;
});

/**
 * Synchronously canonizes an RDF dataset.
 *
 * @param dataset the dataset to canonize.
 * @param options the options to use:
 *          algorithm the canonicalization algorithm to use, `URDNA2015` or
 *            `URGNA2012`.
 *          [useNative] use native implementation (default: false).
 *
 * @return the RDF dataset in canonical form.
 */
api$2.canonizeSync = function(dataset, options) {
  // back-compat with legacy dataset
  if(!Array.isArray(dataset)) {
    dataset = api$2.NQuads.legacyDatasetToQuads(dataset);
  }

  if(options.useNative) {
    if(rdfCanonizeNative) {
      return rdfCanonizeNative.canonizeSync(dataset, options);
    }
    throw new Error('rdf-canonize-native not available');
  }
  if(options.algorithm === 'URDNA2015') {
    return new URDNA2015Sync_1(options).main(dataset);
  } else if(options.algorithm === 'URGNA2012') {
    return new URGNA2012Sync(options).main(dataset);
  }
  if(!('algorithm' in options)) {
    throw new Error('No RDF Dataset Canonicalization algorithm specified.');
  }
  throw new Error(
    'Invalid RDF Dataset Canonicalization algorithm: ' + options.algorithm);
};

/*
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */

const api$3 = {};
var types = api$3;

/**
 * Returns true if the given value is an Array.
 *
 * @param v the value to check.
 *
 * @return true if the value is an Array, false if not.
 */
api$3.isArray = Array.isArray;

/**
 * Returns true if the given value is a Boolean.
 *
 * @param v the value to check.
 *
 * @return true if the value is a Boolean, false if not.
 */
api$3.isBoolean = v => (typeof v === 'boolean' ||
  Object.prototype.toString.call(v) === '[object Boolean]');

/**
 * Returns true if the given value is a double.
 *
 * @param v the value to check.
 *
 * @return true if the value is a double, false if not.
 */
api$3.isDouble = v => api$3.isNumber(v) &&
  (String(v).indexOf('.') !== -1 || Math.abs(v) >= 1e21);

/**
 * Returns true if the given value is an empty Object.
 *
 * @param v the value to check.
 *
 * @return true if the value is an empty Object, false if not.
 */
api$3.isEmptyObject = v => api$3.isObject(v) && Object.keys(v).length === 0;

/**
 * Returns true if the given value is a Number.
 *
 * @param v the value to check.
 *
 * @return true if the value is a Number, false if not.
 */
api$3.isNumber = v => (typeof v === 'number' ||
  Object.prototype.toString.call(v) === '[object Number]');

/**
 * Returns true if the given value is numeric.
 *
 * @param v the value to check.
 *
 * @return true if the value is numeric, false if not.
 */
api$3.isNumeric = v => !isNaN(parseFloat(v)) && isFinite(v);

/**
 * Returns true if the given value is an Object.
 *
 * @param v the value to check.
 *
 * @return true if the value is an Object, false if not.
 */
api$3.isObject = v => Object.prototype.toString.call(v) === '[object Object]';

/**
 * Returns true if the given value is a String.
 *
 * @param v the value to check.
 *
 * @return true if the value is a String, false if not.
 */
api$3.isString = v => (typeof v === 'string' ||
  Object.prototype.toString.call(v) === '[object String]');

/**
 * Returns true if the given value is undefined.
 *
 * @param v the value to check.
 *
 * @return true if the value is undefined, false if not.
 */
api$3.isUndefined = v => typeof v === 'undefined';

const api$4 = {};
var graphTypes = api$4;

/**
 * Returns true if the given value is a subject with properties.
 *
 * @param v the value to check.
 *
 * @return true if the value is a subject with properties, false if not.
 */
api$4.isSubject = v => {
  // Note: A value is a subject if all of these hold true:
  // 1. It is an Object.
  // 2. It is not a @value, @set, or @list.
  // 3. It has more than 1 key OR any existing key is not @id.
  if(types.isObject(v) &&
    !(('@value' in v) || ('@set' in v) || ('@list' in v))) {
    const keyCount = Object.keys(v).length;
    return (keyCount > 1 || !('@id' in v));
  }
  return false;
};

/**
 * Returns true if the given value is a subject reference.
 *
 * @param v the value to check.
 *
 * @return true if the value is a subject reference, false if not.
 */
api$4.isSubjectReference = v =>
  // Note: A value is a subject reference if all of these hold true:
  // 1. It is an Object.
  // 2. It has a single key: @id.
  (types.isObject(v) && Object.keys(v).length === 1 && ('@id' in v));

/**
 * Returns true if the given value is a @value.
 *
 * @param v the value to check.
 *
 * @return true if the value is a @value, false if not.
 */
api$4.isValue = v =>
  // Note: A value is a @value if all of these hold true:
  // 1. It is an Object.
  // 2. It has the @value property.
  types.isObject(v) && ('@value' in v);

/**
 * Returns true if the given value is a @list.
 *
 * @param v the value to check.
 *
 * @return true if the value is a @list, false if not.
 */
api$4.isList = v =>
  // Note: A value is a @list if all of these hold true:
  // 1. It is an Object.
  // 2. It has the @list property.
  types.isObject(v) && ('@list' in v);

/**
 * Returns true if the given value is a @graph.
 *
 * @return true if the value is a @graph, false if not.
 */
api$4.isGraph = v => {
  // Note: A value is a graph if all of these hold true:
  // 1. It is an object.
  // 2. It has an `@graph` key.
  // 3. It may have '@id' or '@index'
  return types.isObject(v) &&
    '@graph' in v &&
    Object.keys(v)
      .filter(key => key !== '@id' && key !== '@index').length === 1;
};

/**
 * Returns true if the given value is a simple @graph.
 *
 * @return true if the value is a simple @graph, false if not.
 */
api$4.isSimpleGraph = v => {
  // Note: A value is a simple graph if all of these hold true:
  // 1. It is an object.
  // 2. It has an `@graph` key.
  // 3. It has only 1 key or 2 keys where one of them is `@index`.
  return api$4.isGraph(v) && !('@id' in v);
};

/**
 * Returns true if the given value is a blank node.
 *
 * @param v the value to check.
 *
 * @return true if the value is a blank node, false if not.
 */
api$4.isBlankNode = v => {
  // Note: A value is a blank node if all of these hold true:
  // 1. It is an Object.
  // 2. If it has an @id key its value begins with '_:'.
  // 3. It has no keys OR is not a @value, @set, or @list.
  if(types.isObject(v)) {
    if('@id' in v) {
      return (v['@id'].indexOf('_:') === 0);
    }
    return (Object.keys(v).length === 0 ||
      !(('@value' in v) || ('@set' in v) || ('@list' in v)));
  }
  return false;
};

/*
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */

var JsonLdError_1 = class JsonLdError extends Error {
  /**
   * Creates a JSON-LD Error.
   *
   * @param msg the error message.
   * @param type the error type.
   * @param details the error details.
   */
  constructor(
    message = 'An unspecified JSON-LD error occurred.',
    name = 'jsonld.Error',
    details = {}) {
    super(message);
    this.name = name;
    this.message = message;
    this.details = details;
  }
};

// TODO: move `IdentifierIssuer` to its own package
const IdentifierIssuer = lib.IdentifierIssuer;


// constants
const REGEX_LINK_HEADERS = /(?:<[^>]*?>|"[^"]*?"|[^,])+/g;
const REGEX_LINK_HEADER = /\s*<([^>]*?)>\s*(?:;\s*(.*))?/;
const REGEX_LINK_HEADER_PARAMS =
  /(.*?)=(?:(?:"([^"]*?)")|([^"]*?))\s*(?:(?:;\s*)|$)/g;

const DEFAULTS = {
  headers: {
    accept: 'application/ld+json, application/json'
  }
};

const api$5 = {};
var util$1 = api$5;
api$5.IdentifierIssuer = IdentifierIssuer;

/**
 * Clones an object, array, Map, Set, or string/number. If a typed JavaScript
 * object is given, such as a Date, it will be converted to a string.
 *
 * @param value the value to clone.
 *
 * @return the cloned value.
 */
api$5.clone = function(value) {
  if(value && typeof value === 'object') {
    let rval;
    if(types.isArray(value)) {
      rval = [];
      for(let i = 0; i < value.length; ++i) {
        rval[i] = api$5.clone(value[i]);
      }
    } else if(value instanceof Map) {
      rval = new Map();
      for(const [k, v] of value) {
        rval.set(k, api$5.clone(v));
      }
    } else if(value instanceof Set) {
      rval = new Set();
      for(const v of value) {
        rval.add(api$5.clone(v));
      }
    } else if(types.isObject(value)) {
      rval = {};
      for(const key in value) {
        rval[key] = api$5.clone(value[key]);
      }
    } else {
      rval = value.toString();
    }
    return rval;
  }
  return value;
};

/**
 * Ensure a value is an array. If the value is an array, it is returned.
 * Otherwise, it is wrapped in an array.
 *
 * @param value the value to return as an array.
 *
 * @return the value as an array.
 */
api$5.asArray = function(value) {
  return Array.isArray(value) ? value : [value];
};

/**
 * Builds an HTTP headers object for making a JSON-LD request from custom
 * headers and asserts the `accept` header isn't overridden.
 *
 * @param headers an object of headers with keys as header names and values
 *          as header values.
 *
 * @return an object of headers with a valid `accept` header.
 */
api$5.buildHeaders = (headers = {}) => {
  const hasAccept = Object.keys(headers).some(
    h => h.toLowerCase() === 'accept');

  if(hasAccept) {
    throw new RangeError(
      'Accept header may not be specified; only "' +
      DEFAULTS.headers.accept + '" is supported.');
  }

  return Object.assign({Accept: DEFAULTS.headers.accept}, headers);
};

/**
 * Parses a link header. The results will be key'd by the value of "rel".
 *
 * Link: <http://json-ld.org/contexts/person.jsonld>;
 * rel="http://www.w3.org/ns/json-ld#context"; type="application/ld+json"
 *
 * Parses as: {
 *   'http://www.w3.org/ns/json-ld#context': {
 *     target: http://json-ld.org/contexts/person.jsonld,
 *     type: 'application/ld+json'
 *   }
 * }
 *
 * If there is more than one "rel" with the same IRI, then entries in the
 * resulting map for that "rel" will be arrays.
 *
 * @param header the link header to parse.
 */
api$5.parseLinkHeader = header => {
  const rval = {};
  // split on unbracketed/unquoted commas
  const entries = header.match(REGEX_LINK_HEADERS);
  for(let i = 0; i < entries.length; ++i) {
    let match = entries[i].match(REGEX_LINK_HEADER);
    if(!match) {
      continue;
    }
    const result = {target: match[1]};
    const params = match[2];
    while((match = REGEX_LINK_HEADER_PARAMS.exec(params))) {
      result[match[1]] = (match[2] === undefined) ? match[3] : match[2];
    }
    const rel = result['rel'] || '';
    if(Array.isArray(rval[rel])) {
      rval[rel].push(result);
    } else if(rval.hasOwnProperty(rel)) {
      rval[rel] = [rval[rel], result];
    } else {
      rval[rel] = result;
    }
  }
  return rval;
};

/**
 * Throws an exception if the given value is not a valid @type value.
 *
 * @param v the value to check.
 */
api$5.validateTypeValue = (v, isFrame) => {
  if(types.isString(v)) {
    return;
  }

  if(types.isArray(v) && v.every(vv => types.isString(vv))) {
    return;
  }
  if(isFrame && types.isObject(v)) {
    switch(Object.keys(v).length) {
      case 0:
        // empty object is wildcard
        return;
      case 1:
        // default entry is all strings
        if('@default' in v &&
          api$5.asArray(v['@default']).every(vv => types.isString(vv))) {
          return;
        }
    }
  }

  throw new JsonLdError_1(
    'Invalid JSON-LD syntax; "@type" value must a string, an array of ' +
    'strings, an empty object, ' +
    'or a default object.', 'jsonld.SyntaxError',
    {code: 'invalid type value', value: v});
};

/**
 * Returns true if the given subject has the given property.
 *
 * @param subject the subject to check.
 * @param property the property to look for.
 *
 * @return true if the subject has the given property, false if not.
 */
api$5.hasProperty = (subject, property) => {
  if(subject.hasOwnProperty(property)) {
    const value = subject[property];
    return (!types.isArray(value) || value.length > 0);
  }
  return false;
};

/**
 * Determines if the given value is a property of the given subject.
 *
 * @param subject the subject to check.
 * @param property the property to check.
 * @param value the value to check.
 *
 * @return true if the value exists, false if not.
 */
api$5.hasValue = (subject, property, value) => {
  if(api$5.hasProperty(subject, property)) {
    let val = subject[property];
    const isList = graphTypes.isList(val);
    if(types.isArray(val) || isList) {
      if(isList) {
        val = val['@list'];
      }
      for(let i = 0; i < val.length; ++i) {
        if(api$5.compareValues(value, val[i])) {
          return true;
        }
      }
    } else if(!types.isArray(value)) {
      // avoid matching the set of values with an array value parameter
      return api$5.compareValues(value, val);
    }
  }
  return false;
};

/**
 * Adds a value to a subject. If the value is an array, all values in the
 * array will be added.
 *
 * @param subject the subject to add the value to.
 * @param property the property that relates the value to the subject.
 * @param value the value to add.
 * @param [options] the options to use:
 *        [propertyIsArray] true if the property is always an array, false
 *          if not (default: false).
 *        [valueIsArray] true if the value to be added should be preserved as
 *          an array (lists) (default: false).
 *        [allowDuplicate] true to allow duplicates, false not to (uses a
 *          simple shallow comparison of subject ID or value) (default: true).
 *        [prependValue] false to prepend value to any existing values.
 *          (default: false)
 */
api$5.addValue = (subject, property, value, options) => {
  options = options || {};
  if(!('propertyIsArray' in options)) {
    options.propertyIsArray = false;
  }
  if(!('valueIsArray' in options)) {
    options.valueIsArray = false;
  }
  if(!('allowDuplicate' in options)) {
    options.allowDuplicate = true;
  }
  if(!('prependValue' in options)) {
    options.prependValue = false;
  }

  if(options.valueIsArray) {
    subject[property] = value;
  } else if(types.isArray(value)) {
    if(value.length === 0 && options.propertyIsArray &&
      !subject.hasOwnProperty(property)) {
      subject[property] = [];
    }
    if(options.prependValue) {
      value = value.concat(subject[property]);
      subject[property] = [];
    }
    for(let i = 0; i < value.length; ++i) {
      api$5.addValue(subject, property, value[i], options);
    }
  } else if(subject.hasOwnProperty(property)) {
    // check if subject already has value if duplicates not allowed
    const hasValue = (!options.allowDuplicate &&
      api$5.hasValue(subject, property, value));

    // make property an array if value not present or always an array
    if(!types.isArray(subject[property]) &&
      (!hasValue || options.propertyIsArray)) {
      subject[property] = [subject[property]];
    }

    // add new value
    if(!hasValue) {
      if(options.prependValue) {
        subject[property].unshift(value);
      } else {
        subject[property].push(value);
      }
    }
  } else {
    // add new value as set or single value
    subject[property] = options.propertyIsArray ? [value] : value;
  }
};

/**
 * Gets all of the values for a subject's property as an array.
 *
 * @param subject the subject.
 * @param property the property.
 *
 * @return all of the values for a subject's property as an array.
 */
api$5.getValues = (subject, property) => [].concat(subject[property] || []);

/**
 * Removes a property from a subject.
 *
 * @param subject the subject.
 * @param property the property.
 */
api$5.removeProperty = (subject, property) => {
  delete subject[property];
};

/**
 * Removes a value from a subject.
 *
 * @param subject the subject.
 * @param property the property that relates the value to the subject.
 * @param value the value to remove.
 * @param [options] the options to use:
 *          [propertyIsArray] true if the property is always an array, false
 *            if not (default: false).
 */
api$5.removeValue = (subject, property, value, options) => {
  options = options || {};
  if(!('propertyIsArray' in options)) {
    options.propertyIsArray = false;
  }

  // filter out value
  const values = api$5.getValues(subject, property).filter(
    e => !api$5.compareValues(e, value));

  if(values.length === 0) {
    api$5.removeProperty(subject, property);
  } else if(values.length === 1 && !options.propertyIsArray) {
    subject[property] = values[0];
  } else {
    subject[property] = values;
  }
};

/**
 * Relabels all blank nodes in the given JSON-LD input.
 *
 * @param input the JSON-LD input.
 * @param [options] the options to use:
 *          [issuer] an IdentifierIssuer to use to label blank nodes.
 */
api$5.relabelBlankNodes = (input, options) => {
  options = options || {};
  const issuer = options.issuer || new IdentifierIssuer('_:b');
  return _labelBlankNodes(issuer, input);
};

/**
 * Compares two JSON-LD values for equality. Two JSON-LD values will be
 * considered equal if:
 *
 * 1. They are both primitives of the same type and value.
 * 2. They are both @values with the same @value, @type, @language,
 *   and @index, OR
 * 3. They both have @ids they are the same.
 *
 * @param v1 the first value.
 * @param v2 the second value.
 *
 * @return true if v1 and v2 are considered equal, false if not.
 */
api$5.compareValues = (v1, v2) => {
  // 1. equal primitives
  if(v1 === v2) {
    return true;
  }

  // 2. equal @values
  if(graphTypes.isValue(v1) && graphTypes.isValue(v2) &&
    v1['@value'] === v2['@value'] &&
    v1['@type'] === v2['@type'] &&
    v1['@language'] === v2['@language'] &&
    v1['@index'] === v2['@index']) {
    return true;
  }

  // 3. equal @ids
  if(types.isObject(v1) &&
    ('@id' in v1) &&
    types.isObject(v2) &&
    ('@id' in v2)) {
    return v1['@id'] === v2['@id'];
  }

  return false;
};

/**
 * Compares two strings first based on length and then lexicographically.
 *
 * @param a the first string.
 * @param b the second string.
 *
 * @return -1 if a < b, 1 if a > b, 0 if a === b.
 */
api$5.compareShortestLeast = (a, b) => {
  if(a.length < b.length) {
    return -1;
  }
  if(b.length < a.length) {
    return 1;
  }
  if(a === b) {
    return 0;
  }
  return (a < b) ? -1 : 1;
};

/**
 * Labels the blank nodes in the given value using the given IdentifierIssuer.
 *
 * @param issuer the IdentifierIssuer to use.
 * @param element the element with blank nodes to rename.
 *
 * @return the element.
 */
function _labelBlankNodes(issuer, element) {
  if(types.isArray(element)) {
    for(let i = 0; i < element.length; ++i) {
      element[i] = _labelBlankNodes(issuer, element[i]);
    }
  } else if(graphTypes.isList(element)) {
    element['@list'] = _labelBlankNodes(issuer, element['@list']);
  } else if(types.isObject(element)) {
    // relabel blank node
    if(graphTypes.isBlankNode(element)) {
      element['@id'] = issuer.getId(element['@id']);
    }

    // recursively apply to all keys
    const keys = Object.keys(element).sort();
    for(let ki = 0; ki < keys.length; ++ki) {
      const key = keys[ki];
      if(key !== '@id') {
        element[key] = _labelBlankNodes(issuer, element[key]);
      }
    }
  }

  return element;
}

const api$6 = {};
var url = api$6;

// define URL parser
// parseUri 1.2.2
// (c) Steven Levithan <stevenlevithan.com>
// MIT License
// with local jsonld.js modifications
api$6.parsers = {
  simple: {
    // RFC 3986 basic parts
    keys: [
      'href', 'scheme', 'authority', 'path', 'query', 'fragment'
    ],
    /* eslint-disable-next-line max-len */
    regex: /^(?:([^:\/?#]+):)?(?:\/\/([^\/?#]*))?([^?#]*)(?:\?([^#]*))?(?:#(.*))?/
  },
  full: {
    keys: [
      'href', 'protocol', 'scheme', 'authority', 'auth', 'user', 'password',
      'hostname', 'port', 'path', 'directory', 'file', 'query', 'fragment'
    ],
    /* eslint-disable-next-line max-len */
    regex: /^(([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?(?:(((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/
  }
};
api$6.parse = (str, parser) => {
  const parsed = {};
  const o = api$6.parsers[parser || 'full'];
  const m = o.regex.exec(str);
  let i = o.keys.length;
  while(i--) {
    parsed[o.keys[i]] = (m[i] === undefined) ? null : m[i];
  }

  // remove default ports in found in URLs
  if((parsed.scheme === 'https' && parsed.port === '443') ||
    (parsed.scheme === 'http' && parsed.port === '80')) {
    parsed.href = parsed.href.replace(':' + parsed.port, '');
    parsed.authority = parsed.authority.replace(':' + parsed.port, '');
    parsed.port = null;
  }

  parsed.normalizedPath = api$6.removeDotSegments(parsed.path);
  return parsed;
};

/**
 * Prepends a base IRI to the given relative IRI.
 *
 * @param base the base IRI.
 * @param iri the relative IRI.
 *
 * @return the absolute IRI.
 */
api$6.prependBase = (base, iri) => {
  // skip IRI processing
  if(base === null) {
    return iri;
  }
  // already an absolute IRI
  if(api$6.isAbsolute(iri)) {
    return iri;
  }

  // parse base if it is a string
  if(!base || types.isString(base)) {
    base = api$6.parse(base || '');
  }

  // parse given IRI
  const rel = api$6.parse(iri);

  // per RFC3986 5.2.2
  const transform = {
    protocol: base.protocol || ''
  };

  if(rel.authority !== null) {
    transform.authority = rel.authority;
    transform.path = rel.path;
    transform.query = rel.query;
  } else {
    transform.authority = base.authority;

    if(rel.path === '') {
      transform.path = base.path;
      if(rel.query !== null) {
        transform.query = rel.query;
      } else {
        transform.query = base.query;
      }
    } else {
      if(rel.path.indexOf('/') === 0) {
        // IRI represents an absolute path
        transform.path = rel.path;
      } else {
        // merge paths
        let path = base.path;

        // append relative path to the end of the last directory from base
        path = path.substr(0, path.lastIndexOf('/') + 1);
        if((path.length > 0 || base.authority) && path.substr(-1) !== '/') {
          path += '/';
        }
        path += rel.path;

        transform.path = path;
      }
      transform.query = rel.query;
    }
  }

  if(rel.path !== '') {
    // remove slashes and dots in path
    transform.path = api$6.removeDotSegments(transform.path);
  }

  // construct URL
  let rval = transform.protocol;
  if(transform.authority !== null) {
    rval += '//' + transform.authority;
  }
  rval += transform.path;
  if(transform.query !== null) {
    rval += '?' + transform.query;
  }
  if(rel.fragment !== null) {
    rval += '#' + rel.fragment;
  }

  // handle empty base
  if(rval === '') {
    rval = './';
  }

  return rval;
};

/**
 * Removes a base IRI from the given absolute IRI.
 *
 * @param base the base IRI.
 * @param iri the absolute IRI.
 *
 * @return the relative IRI if relative to base, otherwise the absolute IRI.
 */
api$6.removeBase = (base, iri) => {
  // skip IRI processing
  if(base === null) {
    return iri;
  }

  if(!base || types.isString(base)) {
    base = api$6.parse(base || '');
  }

  // establish base root
  let root = '';
  if(base.href !== '') {
    root += (base.protocol || '') + '//' + (base.authority || '');
  } else if(iri.indexOf('//')) {
    // support network-path reference with empty base
    root += '//';
  }

  // IRI not relative to base
  if(iri.indexOf(root) !== 0) {
    return iri;
  }

  // remove root from IRI and parse remainder
  const rel = api$6.parse(iri.substr(root.length));

  // remove path segments that match (do not remove last segment unless there
  // is a hash or query)
  const baseSegments = base.normalizedPath.split('/');
  const iriSegments = rel.normalizedPath.split('/');
  const last = (rel.fragment || rel.query) ? 0 : 1;
  while(baseSegments.length > 0 && iriSegments.length > last) {
    if(baseSegments[0] !== iriSegments[0]) {
      break;
    }
    baseSegments.shift();
    iriSegments.shift();
  }

  // use '../' for each non-matching base segment
  let rval = '';
  if(baseSegments.length > 0) {
    // don't count the last segment (if it ends with '/' last path doesn't
    // count and if it doesn't end with '/' it isn't a path)
    baseSegments.pop();
    for(let i = 0; i < baseSegments.length; ++i) {
      rval += '../';
    }
  }

  // prepend remaining segments
  rval += iriSegments.join('/');

  // add query and hash
  if(rel.query !== null) {
    rval += '?' + rel.query;
  }
  if(rel.fragment !== null) {
    rval += '#' + rel.fragment;
  }

  // handle empty base
  if(rval === '') {
    rval = './';
  }

  return rval;
};

/**
 * Removes dot segments from a URL path.
 *
 * @param path the path to remove dot segments from.
 */
api$6.removeDotSegments = path => {
  // RFC 3986 5.2.4 (reworked)

  // empty path shortcut
  if(path.length === 0) {
    return '';
  }

  const input = path.split('/');
  const output = [];

  while(input.length > 0) {
    const next = input.shift();
    const done = input.length === 0;

    if(next === '.') {
      if(done) {
        // ensure output has trailing /
        output.push('');
      }
      continue;
    }

    if(next === '..') {
      output.pop();
      if(done) {
        // ensure output has trailing /
        output.push('');
      }
      continue;
    }

    output.push(next);
  }

  // if path was absolute, ensure output has leading /
  if(path[0] === '/' && output.length > 0 && output[0] !== '') {
    output.unshift('');
  }
  if(output.length === 1 && output[0] === '') {
    return '/';
  }

  return output.join('/');
};

// TODO: time better isAbsolute/isRelative checks using full regexes:
// http://jmrware.com/articles/2009/uri_regexp/URI_regex.html

// regex to check for absolute IRI (starting scheme and ':') or blank node IRI
const isAbsoluteRegex = /^([A-Za-z][A-Za-z0-9+-.]*|_):[^\s]*$/;

/**
 * Returns true if the given value is an absolute IRI or blank node IRI, false
 * if not.
 * Note: This weak check only checks for a correct starting scheme.
 *
 * @param v the value to check.
 *
 * @return true if the value is an absolute IRI, false if not.
 */
api$6.isAbsolute = v => types.isString(v) && isAbsoluteRegex.test(v);

/**
 * Returns true if the given value is a relative IRI, false if not.
 * Note: this is a weak check.
 *
 * @param v the value to check.
 *
 * @return true if the value is a relative IRI, false if not.
 */
api$6.isRelative = v => types.isString(v);

var iterator = function (Yallist) {
  Yallist.prototype[Symbol.iterator] = function* () {
    for (let walker = this.head; walker; walker = walker.next) {
      yield walker.value;
    }
  };
};

var yallist = Yallist;

Yallist.Node = Node$1;
Yallist.create = Yallist;

function Yallist (list) {
  var self = this;
  if (!(self instanceof Yallist)) {
    self = new Yallist();
  }

  self.tail = null;
  self.head = null;
  self.length = 0;

  if (list && typeof list.forEach === 'function') {
    list.forEach(function (item) {
      self.push(item);
    });
  } else if (arguments.length > 0) {
    for (var i = 0, l = arguments.length; i < l; i++) {
      self.push(arguments[i]);
    }
  }

  return self
}

Yallist.prototype.removeNode = function (node) {
  if (node.list !== this) {
    throw new Error('removing node which does not belong to this list')
  }

  var next = node.next;
  var prev = node.prev;

  if (next) {
    next.prev = prev;
  }

  if (prev) {
    prev.next = next;
  }

  if (node === this.head) {
    this.head = next;
  }
  if (node === this.tail) {
    this.tail = prev;
  }

  node.list.length--;
  node.next = null;
  node.prev = null;
  node.list = null;

  return next
};

Yallist.prototype.unshiftNode = function (node) {
  if (node === this.head) {
    return
  }

  if (node.list) {
    node.list.removeNode(node);
  }

  var head = this.head;
  node.list = this;
  node.next = head;
  if (head) {
    head.prev = node;
  }

  this.head = node;
  if (!this.tail) {
    this.tail = node;
  }
  this.length++;
};

Yallist.prototype.pushNode = function (node) {
  if (node === this.tail) {
    return
  }

  if (node.list) {
    node.list.removeNode(node);
  }

  var tail = this.tail;
  node.list = this;
  node.prev = tail;
  if (tail) {
    tail.next = node;
  }

  this.tail = node;
  if (!this.head) {
    this.head = node;
  }
  this.length++;
};

Yallist.prototype.push = function () {
  for (var i = 0, l = arguments.length; i < l; i++) {
    push(this, arguments[i]);
  }
  return this.length
};

Yallist.prototype.unshift = function () {
  for (var i = 0, l = arguments.length; i < l; i++) {
    unshift(this, arguments[i]);
  }
  return this.length
};

Yallist.prototype.pop = function () {
  if (!this.tail) {
    return undefined
  }

  var res = this.tail.value;
  this.tail = this.tail.prev;
  if (this.tail) {
    this.tail.next = null;
  } else {
    this.head = null;
  }
  this.length--;
  return res
};

Yallist.prototype.shift = function () {
  if (!this.head) {
    return undefined
  }

  var res = this.head.value;
  this.head = this.head.next;
  if (this.head) {
    this.head.prev = null;
  } else {
    this.tail = null;
  }
  this.length--;
  return res
};

Yallist.prototype.forEach = function (fn, thisp) {
  thisp = thisp || this;
  for (var walker = this.head, i = 0; walker !== null; i++) {
    fn.call(thisp, walker.value, i, this);
    walker = walker.next;
  }
};

Yallist.prototype.forEachReverse = function (fn, thisp) {
  thisp = thisp || this;
  for (var walker = this.tail, i = this.length - 1; walker !== null; i--) {
    fn.call(thisp, walker.value, i, this);
    walker = walker.prev;
  }
};

Yallist.prototype.get = function (n) {
  for (var i = 0, walker = this.head; walker !== null && i < n; i++) {
    // abort out of the list early if we hit a cycle
    walker = walker.next;
  }
  if (i === n && walker !== null) {
    return walker.value
  }
};

Yallist.prototype.getReverse = function (n) {
  for (var i = 0, walker = this.tail; walker !== null && i < n; i++) {
    // abort out of the list early if we hit a cycle
    walker = walker.prev;
  }
  if (i === n && walker !== null) {
    return walker.value
  }
};

Yallist.prototype.map = function (fn, thisp) {
  thisp = thisp || this;
  var res = new Yallist();
  for (var walker = this.head; walker !== null;) {
    res.push(fn.call(thisp, walker.value, this));
    walker = walker.next;
  }
  return res
};

Yallist.prototype.mapReverse = function (fn, thisp) {
  thisp = thisp || this;
  var res = new Yallist();
  for (var walker = this.tail; walker !== null;) {
    res.push(fn.call(thisp, walker.value, this));
    walker = walker.prev;
  }
  return res
};

Yallist.prototype.reduce = function (fn, initial) {
  var acc;
  var walker = this.head;
  if (arguments.length > 1) {
    acc = initial;
  } else if (this.head) {
    walker = this.head.next;
    acc = this.head.value;
  } else {
    throw new TypeError('Reduce of empty list with no initial value')
  }

  for (var i = 0; walker !== null; i++) {
    acc = fn(acc, walker.value, i);
    walker = walker.next;
  }

  return acc
};

Yallist.prototype.reduceReverse = function (fn, initial) {
  var acc;
  var walker = this.tail;
  if (arguments.length > 1) {
    acc = initial;
  } else if (this.tail) {
    walker = this.tail.prev;
    acc = this.tail.value;
  } else {
    throw new TypeError('Reduce of empty list with no initial value')
  }

  for (var i = this.length - 1; walker !== null; i--) {
    acc = fn(acc, walker.value, i);
    walker = walker.prev;
  }

  return acc
};

Yallist.prototype.toArray = function () {
  var arr = new Array(this.length);
  for (var i = 0, walker = this.head; walker !== null; i++) {
    arr[i] = walker.value;
    walker = walker.next;
  }
  return arr
};

Yallist.prototype.toArrayReverse = function () {
  var arr = new Array(this.length);
  for (var i = 0, walker = this.tail; walker !== null; i++) {
    arr[i] = walker.value;
    walker = walker.prev;
  }
  return arr
};

Yallist.prototype.slice = function (from, to) {
  to = to || this.length;
  if (to < 0) {
    to += this.length;
  }
  from = from || 0;
  if (from < 0) {
    from += this.length;
  }
  var ret = new Yallist();
  if (to < from || to < 0) {
    return ret
  }
  if (from < 0) {
    from = 0;
  }
  if (to > this.length) {
    to = this.length;
  }
  for (var i = 0, walker = this.head; walker !== null && i < from; i++) {
    walker = walker.next;
  }
  for (; walker !== null && i < to; i++, walker = walker.next) {
    ret.push(walker.value);
  }
  return ret
};

Yallist.prototype.sliceReverse = function (from, to) {
  to = to || this.length;
  if (to < 0) {
    to += this.length;
  }
  from = from || 0;
  if (from < 0) {
    from += this.length;
  }
  var ret = new Yallist();
  if (to < from || to < 0) {
    return ret
  }
  if (from < 0) {
    from = 0;
  }
  if (to > this.length) {
    to = this.length;
  }
  for (var i = this.length, walker = this.tail; walker !== null && i > to; i--) {
    walker = walker.prev;
  }
  for (; walker !== null && i > from; i--, walker = walker.prev) {
    ret.push(walker.value);
  }
  return ret
};

Yallist.prototype.splice = function (start, deleteCount /*, ...nodes */) {
  if (start > this.length) {
    start = this.length - 1;
  }
  if (start < 0) {
    start = this.length + start;
  }

  for (var i = 0, walker = this.head; walker !== null && i < start; i++) {
    walker = walker.next;
  }

  var ret = [];
  for (var i = 0; walker && i < deleteCount; i++) {
    ret.push(walker.value);
    walker = this.removeNode(walker);
  }
  if (walker === null) {
    walker = this.tail;
  }

  if (walker !== this.head && walker !== this.tail) {
    walker = walker.prev;
  }

  for (var i = 2; i < arguments.length; i++) {
    walker = insert(this, walker, arguments[i]);
  }
  return ret;
};

Yallist.prototype.reverse = function () {
  var head = this.head;
  var tail = this.tail;
  for (var walker = head; walker !== null; walker = walker.prev) {
    var p = walker.prev;
    walker.prev = walker.next;
    walker.next = p;
  }
  this.head = tail;
  this.tail = head;
  return this
};

function insert (self, node, value) {
  var inserted = node === self.head ?
    new Node$1(value, null, node, self) :
    new Node$1(value, node, node.next, self);

  if (inserted.next === null) {
    self.tail = inserted;
  }
  if (inserted.prev === null) {
    self.head = inserted;
  }

  self.length++;

  return inserted
}

function push (self, item) {
  self.tail = new Node$1(item, self.tail, null, self);
  if (!self.head) {
    self.head = self.tail;
  }
  self.length++;
}

function unshift (self, item) {
  self.head = new Node$1(item, null, self.head, self);
  if (!self.tail) {
    self.tail = self.head;
  }
  self.length++;
}

function Node$1 (value, prev, next, list) {
  if (!(this instanceof Node$1)) {
    return new Node$1(value, prev, next, list)
  }

  this.list = list;
  this.value = value;

  if (prev) {
    prev.next = this;
    this.prev = prev;
  } else {
    this.prev = null;
  }

  if (next) {
    next.prev = this;
    this.next = next;
  } else {
    this.next = null;
  }
}

try {
  // add if support for Symbol.iterator is present
  iterator(Yallist);
} catch (er) {}

// A linked list to keep track of recently-used-ness


const MAX = Symbol('max');
const LENGTH = Symbol('length');
const LENGTH_CALCULATOR = Symbol('lengthCalculator');
const ALLOW_STALE = Symbol('allowStale');
const MAX_AGE = Symbol('maxAge');
const DISPOSE = Symbol('dispose');
const NO_DISPOSE_ON_SET = Symbol('noDisposeOnSet');
const LRU_LIST = Symbol('lruList');
const CACHE = Symbol('cache');
const UPDATE_AGE_ON_GET = Symbol('updateAgeOnGet');

const naiveLength = () => 1;

// lruList is a yallist where the head is the youngest
// item, and the tail is the oldest.  the list contains the Hit
// objects as the entries.
// Each Hit object has a reference to its Yallist.Node.  This
// never changes.
//
// cache is a Map (or PseudoMap) that matches the keys to
// the Yallist.Node object.
class LRUCache {
  constructor (options) {
    if (typeof options === 'number')
      options = { max: options };

    if (!options)
      options = {};

    if (options.max && (typeof options.max !== 'number' || options.max < 0))
      throw new TypeError('max must be a non-negative number')
    // Kind of weird to have a default max of Infinity, but oh well.
    const max = this[MAX] = options.max || Infinity;

    const lc = options.length || naiveLength;
    this[LENGTH_CALCULATOR] = (typeof lc !== 'function') ? naiveLength : lc;
    this[ALLOW_STALE] = options.stale || false;
    if (options.maxAge && typeof options.maxAge !== 'number')
      throw new TypeError('maxAge must be a number')
    this[MAX_AGE] = options.maxAge || 0;
    this[DISPOSE] = options.dispose;
    this[NO_DISPOSE_ON_SET] = options.noDisposeOnSet || false;
    this[UPDATE_AGE_ON_GET] = options.updateAgeOnGet || false;
    this.reset();
  }

  // resize the cache when the max changes.
  set max (mL) {
    if (typeof mL !== 'number' || mL < 0)
      throw new TypeError('max must be a non-negative number')

    this[MAX] = mL || Infinity;
    trim(this);
  }
  get max () {
    return this[MAX]
  }

  set allowStale (allowStale) {
    this[ALLOW_STALE] = !!allowStale;
  }
  get allowStale () {
    return this[ALLOW_STALE]
  }

  set maxAge (mA) {
    if (typeof mA !== 'number')
      throw new TypeError('maxAge must be a non-negative number')

    this[MAX_AGE] = mA;
    trim(this);
  }
  get maxAge () {
    return this[MAX_AGE]
  }

  // resize the cache when the lengthCalculator changes.
  set lengthCalculator (lC) {
    if (typeof lC !== 'function')
      lC = naiveLength;

    if (lC !== this[LENGTH_CALCULATOR]) {
      this[LENGTH_CALCULATOR] = lC;
      this[LENGTH] = 0;
      this[LRU_LIST].forEach(hit => {
        hit.length = this[LENGTH_CALCULATOR](hit.value, hit.key);
        this[LENGTH] += hit.length;
      });
    }
    trim(this);
  }
  get lengthCalculator () { return this[LENGTH_CALCULATOR] }

  get length () { return this[LENGTH] }
  get itemCount () { return this[LRU_LIST].length }

  rforEach (fn, thisp) {
    thisp = thisp || this;
    for (let walker = this[LRU_LIST].tail; walker !== null;) {
      const prev = walker.prev;
      forEachStep(this, fn, walker, thisp);
      walker = prev;
    }
  }

  forEach (fn, thisp) {
    thisp = thisp || this;
    for (let walker = this[LRU_LIST].head; walker !== null;) {
      const next = walker.next;
      forEachStep(this, fn, walker, thisp);
      walker = next;
    }
  }

  keys () {
    return this[LRU_LIST].toArray().map(k => k.key)
  }

  values () {
    return this[LRU_LIST].toArray().map(k => k.value)
  }

  reset () {
    if (this[DISPOSE] &&
        this[LRU_LIST] &&
        this[LRU_LIST].length) {
      this[LRU_LIST].forEach(hit => this[DISPOSE](hit.key, hit.value));
    }

    this[CACHE] = new Map(); // hash of items by key
    this[LRU_LIST] = new yallist(); // list of items in order of use recency
    this[LENGTH] = 0; // length of items in the list
  }

  dump () {
    return this[LRU_LIST].map(hit =>
      isStale(this, hit) ? false : {
        k: hit.key,
        v: hit.value,
        e: hit.now + (hit.maxAge || 0)
      }).toArray().filter(h => h)
  }

  dumpLru () {
    return this[LRU_LIST]
  }

  set (key, value, maxAge) {
    maxAge = maxAge || this[MAX_AGE];

    if (maxAge && typeof maxAge !== 'number')
      throw new TypeError('maxAge must be a number')

    const now = maxAge ? Date.now() : 0;
    const len = this[LENGTH_CALCULATOR](value, key);

    if (this[CACHE].has(key)) {
      if (len > this[MAX]) {
        del(this, this[CACHE].get(key));
        return false
      }

      const node = this[CACHE].get(key);
      const item = node.value;

      // dispose of the old one before overwriting
      // split out into 2 ifs for better coverage tracking
      if (this[DISPOSE]) {
        if (!this[NO_DISPOSE_ON_SET])
          this[DISPOSE](key, item.value);
      }

      item.now = now;
      item.maxAge = maxAge;
      item.value = value;
      this[LENGTH] += len - item.length;
      item.length = len;
      this.get(key);
      trim(this);
      return true
    }

    const hit = new Entry(key, value, len, now, maxAge);

    // oversized objects fall out of cache automatically.
    if (hit.length > this[MAX]) {
      if (this[DISPOSE])
        this[DISPOSE](key, value);

      return false
    }

    this[LENGTH] += hit.length;
    this[LRU_LIST].unshift(hit);
    this[CACHE].set(key, this[LRU_LIST].head);
    trim(this);
    return true
  }

  has (key) {
    if (!this[CACHE].has(key)) return false
    const hit = this[CACHE].get(key).value;
    return !isStale(this, hit)
  }

  get (key) {
    return get(this, key, true)
  }

  peek (key) {
    return get(this, key, false)
  }

  pop () {
    const node = this[LRU_LIST].tail;
    if (!node)
      return null

    del(this, node);
    return node.value
  }

  del (key) {
    del(this, this[CACHE].get(key));
  }

  load (arr) {
    // reset the cache
    this.reset();

    const now = Date.now();
    // A previous serialized cache has the most recent items first
    for (let l = arr.length - 1; l >= 0; l--) {
      const hit = arr[l];
      const expiresAt = hit.e || 0;
      if (expiresAt === 0)
        // the item was created without expiration in a non aged cache
        this.set(hit.k, hit.v);
      else {
        const maxAge = expiresAt - now;
        // dont add already expired items
        if (maxAge > 0) {
          this.set(hit.k, hit.v, maxAge);
        }
      }
    }
  }

  prune () {
    this[CACHE].forEach((value, key) => get(this, key, false));
  }
}

const get = (self, key, doUse) => {
  const node = self[CACHE].get(key);
  if (node) {
    const hit = node.value;
    if (isStale(self, hit)) {
      del(self, node);
      if (!self[ALLOW_STALE])
        return undefined
    } else {
      if (doUse) {
        if (self[UPDATE_AGE_ON_GET])
          node.value.now = Date.now();
        self[LRU_LIST].unshiftNode(node);
      }
    }
    return hit.value
  }
};

const isStale = (self, hit) => {
  if (!hit || (!hit.maxAge && !self[MAX_AGE]))
    return false

  const diff = Date.now() - hit.now;
  return hit.maxAge ? diff > hit.maxAge
    : self[MAX_AGE] && (diff > self[MAX_AGE])
};

const trim = self => {
  if (self[LENGTH] > self[MAX]) {
    for (let walker = self[LRU_LIST].tail;
      self[LENGTH] > self[MAX] && walker !== null;) {
      // We know that we're about to delete this one, and also
      // what the next least recently used key will be, so just
      // go ahead and set it now.
      const prev = walker.prev;
      del(self, walker);
      walker = prev;
    }
  }
};

const del = (self, node) => {
  if (node) {
    const hit = node.value;
    if (self[DISPOSE])
      self[DISPOSE](hit.key, hit.value);

    self[LENGTH] -= hit.length;
    self[CACHE].delete(hit.key);
    self[LRU_LIST].removeNode(node);
  }
};

class Entry {
  constructor (key, value, length, now, maxAge) {
    this.key = key;
    this.value = value;
    this.length = length;
    this.now = now;
    this.maxAge = maxAge || 0;
  }
}

const forEachStep = (self, fn, node, thisp) => {
  let hit = node.value;
  if (isStale(self, hit)) {
    del(self, node);
    if (!self[ALLOW_STALE])
      hit = undefined;
  }
  if (hit)
    fn.call(thisp, hit.value, hit.key, self);
};

var lruCache = LRUCache;

const MAX_ACTIVE_CONTEXTS = 10;

var ResolvedContext_1 = class ResolvedContext {
  /**
   * Creates a ResolvedContext.
   *
   * @param document the context document.
   */
  constructor({document}) {
    this.document = document;
    // TODO: enable customization of processed context cache
    // TODO: limit based on size of processed contexts vs. number of them
    this.cache = new lruCache({max: MAX_ACTIVE_CONTEXTS});
  }

  getProcessed(activeCtx) {
    return this.cache.get(activeCtx);
  }

  setProcessed(activeCtx, processedCtx) {
    this.cache.set(activeCtx, processedCtx);
  }
};

const {
  isArray: _isArray,
  isObject: _isObject,
  isString: _isString,
} = types;
const {
  asArray: _asArray
} = util$1;
const {prependBase} = url;



const MAX_CONTEXT_URLS = 10;

var ContextResolver_1 = class ContextResolver {
  /**
   * Creates a ContextResolver.
   *
   * @param sharedCache a shared LRU cache with `get` and `set` APIs.
   */
  constructor({sharedCache}) {
    this.perOpCache = new Map();
    this.sharedCache = sharedCache;
  }

  async resolve({
    activeCtx, context, documentLoader, base, cycles = new Set()
  }) {
    // process `@context`
    if(context && _isObject(context) && context['@context']) {
      context = context['@context'];
    }

    // context is one or more contexts
    context = _asArray(context);

    // resolve each context in the array
    const allResolved = [];
    for(const ctx of context) {
      if(_isString(ctx)) {
        // see if `ctx` has been resolved before...
        let resolved = this._get(ctx);
        if(!resolved) {
          // not resolved yet, resolve
          resolved = await this._resolveRemoteContext(
            {activeCtx, url: ctx, documentLoader, base, cycles});
        }

        // add to output and continue
        if(_isArray(resolved)) {
          allResolved.push(...resolved);
        } else {
          allResolved.push(resolved);
        }
        continue;
      }
      if(ctx === null) {
        // handle `null` context, nothing to cache
        allResolved.push(new ResolvedContext_1({document: null}));
        continue;
      }
      if(!_isObject(ctx)) {
        _throwInvalidLocalContext(context);
      }
      // context is an object, get/create `ResolvedContext` for it
      const key = JSON.stringify(ctx);
      let resolved = this._get(key);
      if(!resolved) {
        // create a new static `ResolvedContext` and cache it
        resolved = new ResolvedContext_1({document: ctx});
        this._cacheResolvedContext({key, resolved, tag: 'static'});
      }
      allResolved.push(resolved);
    }

    return allResolved;
  }

  _get(key) {
    // get key from per operation cache; no `tag` is used with this cache so
    // any retrieved context will always be the same during a single operation
    let resolved = this.perOpCache.get(key);
    if(!resolved) {
      // see if the shared cache has a `static` entry for this URL
      const tagMap = this.sharedCache.get(key);
      if(tagMap) {
        resolved = tagMap.get('static');
        if(resolved) {
          this.perOpCache.set(key, resolved);
        }
      }
    }
    return resolved;
  }

  _cacheResolvedContext({key, resolved, tag}) {
    this.perOpCache.set(key, resolved);
    if(tag !== undefined) {
      let tagMap = this.sharedCache.get(key);
      if(!tagMap) {
        tagMap = new Map();
        this.sharedCache.set(key, tagMap);
      }
      tagMap.set(tag, resolved);
    }
    return resolved;
  }

  async _resolveRemoteContext({activeCtx, url, documentLoader, base, cycles}) {
    // resolve relative URL and fetch context
    url = prependBase(base, url);
    const {context, remoteDoc} = await this._fetchContext(
      {activeCtx, url, documentLoader, cycles});

    // update base according to remote document and resolve any relative URLs
    base = remoteDoc.documentUrl || url;
    _resolveContextUrls({context, base});

    // resolve, cache, and return context
    const resolved = await this.resolve(
      {activeCtx, context, documentLoader, base, cycles});
    this._cacheResolvedContext({key: url, resolved, tag: remoteDoc.tag});
    return resolved;
  }

  async _fetchContext({activeCtx, url, documentLoader, cycles}) {
    // check for max context URLs fetched during a resolve operation
    if(cycles.size > MAX_CONTEXT_URLS) {
      throw new JsonLdError_1(
        'Maximum number of @context URLs exceeded.',
        'jsonld.ContextUrlError',
        {
          code: activeCtx.processingMode === 'json-ld-1.0' ?
            'loading remote context failed' :
            'context overflow',
          max: MAX_CONTEXT_URLS
        });
    }

    // check for context URL cycle
    // shortcut to avoid extra work that would eventually hit the max above
    if(cycles.has(url)) {
      throw new JsonLdError_1(
        'Cyclical @context URLs detected.',
        'jsonld.ContextUrlError',
        {
          code: activeCtx.processingMode === 'json-ld-1.0' ?
            'recursive context inclusion' :
            'context overflow',
          url
        });
    }

    // track cycles
    cycles.add(url);

    let context;
    let remoteDoc;

    try {
      remoteDoc = await documentLoader(url);
      context = remoteDoc.document || null;
      // parse string context as JSON
      if(_isString(context)) {
        context = JSON.parse(context);
      }
    } catch(e) {
      throw new JsonLdError_1(
        'Dereferencing a URL did not result in a valid JSON-LD object. ' +
        'Possible causes are an inaccessible URL perhaps due to ' +
        'a same-origin policy (ensure the server uses CORS if you are ' +
        'using client-side JavaScript), too many redirects, a ' +
        'non-JSON response, or more than one HTTP Link Header was ' +
        'provided for a remote context.',
        'jsonld.InvalidUrl',
        {code: 'loading remote context failed', url, cause: e});
    }

    // ensure ctx is an object
    if(!_isObject(context)) {
      throw new JsonLdError_1(
        'Dereferencing a URL did not result in a JSON object. The ' +
        'response was valid JSON, but it was not a JSON object.',
        'jsonld.InvalidUrl', {code: 'invalid remote context', url});
    }

    // use empty context if no @context key is present
    if(!('@context' in context)) {
      context = {'@context': {}};
    } else {
      context = {'@context': context['@context']};
    }

    // append @context URL to context if given
    if(remoteDoc.contextUrl) {
      if(!_isArray(context['@context'])) {
        context['@context'] = [context['@context']];
      }
      context['@context'].push(remoteDoc.contextUrl);
    }

    return {context, remoteDoc};
  }
};

function _throwInvalidLocalContext(ctx) {
  throw new JsonLdError_1(
    'Invalid JSON-LD syntax; @context must be an object.',
    'jsonld.SyntaxError', {
      code: 'invalid local context', context: ctx
    });
}

/**
 * Resolve all relative `@context` URLs in the given context by inline
 * replacing them with absolute URLs.
 *
 * @param context the context.
 * @param base the base IRI to use to resolve relative IRIs.
 */
function _resolveContextUrls({context, base}) {
  if(!context) {
    return;
  }

  const ctx = context['@context'];

  if(_isString(ctx)) {
    context['@context'] = prependBase(base, ctx);
    return;
  }

  if(_isArray(ctx)) {
    for(let i = 0; i < ctx.length; ++i) {
      const element = ctx[i];
      if(_isString(element)) {
        ctx[i] = prependBase(base, element);
        continue;
      }
      if(_isObject(element)) {
        _resolveContextUrls({context: {'@context': element}, base});
      }
    }
    return;
  }

  if(!_isObject(ctx)) {
    // no @context URLs can be found in non-object
    return;
  }

  // ctx is an object, resolve any context URLs in terms
  for(const term in ctx) {
    _resolveContextUrls({context: ctx[term], base});
  }
}

// TODO: move `NQuads` to its own package
var NQuads = lib.NQuads;

/*
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */

const RDF$1 = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#';
const XSD = 'http://www.w3.org/2001/XMLSchema#';

var constants = {
  // TODO: Deprecated and will be removed later. Use LINK_HEADER_CONTEXT.
  LINK_HEADER_REL: 'http://www.w3.org/ns/json-ld#context',

  LINK_HEADER_CONTEXT: 'http://www.w3.org/ns/json-ld#context',

  RDF: RDF$1,
  RDF_LIST: RDF$1 + 'List',
  RDF_FIRST: RDF$1 + 'first',
  RDF_REST: RDF$1 + 'rest',
  RDF_NIL: RDF$1 + 'nil',
  RDF_TYPE: RDF$1 + 'type',
  RDF_PLAIN_LITERAL: RDF$1 + 'PlainLiteral',
  RDF_XML_LITERAL: RDF$1 + 'XMLLiteral',
  RDF_JSON_LITERAL: RDF$1 + 'JSON',
  RDF_OBJECT: RDF$1 + 'object',
  RDF_LANGSTRING: RDF$1 + 'langString',

  XSD,
  XSD_BOOLEAN: XSD + 'boolean',
  XSD_DOUBLE: XSD + 'double',
  XSD_INTEGER: XSD + 'integer',
  XSD_STRING: XSD + 'string',
};

const {
  RDF_LANGSTRING: RDF_LANGSTRING$1,
  RDF_PLAIN_LITERAL,
  RDF_OBJECT,
  RDF_XML_LITERAL,
  XSD_STRING: XSD_STRING$1,
} = constants;

let _Node;
if(typeof Node !== 'undefined') {
  _Node = Node;
} else {
  _Node = {
    ELEMENT_NODE: 1,
    ATTRIBUTE_NODE: 2,
    TEXT_NODE: 3,
    CDATA_SECTION_NODE: 4,
    ENTITY_REFERENCE_NODE: 5,
    ENTITY_NODE: 6,
    PROCESSING_INSTRUCTION_NODE: 7,
    COMMENT_NODE: 8,
    DOCUMENT_NODE: 9,
    DOCUMENT_TYPE_NODE: 10,
    DOCUMENT_FRAGMENT_NODE: 11,
    NOTATION_NODE: 12
  };
}

var Rdfa_1 = class Rdfa {
  /**
   * Parses the RDF dataset found via the data object from the RDFa API.
   *
   * @param data the RDFa API data object.
   *
   * @return the RDF dataset.
   */
  parse(data) {
    const dataset = {};
    dataset['@default'] = [];

    const subjects = data.getSubjects();
    for(let si = 0; si < subjects.length; ++si) {
      const subject = subjects[si];
      if(subject === null) {
        continue;
      }

      // get all related triples
      const triples = data.getSubjectTriples(subject);
      if(triples === null) {
        continue;
      }
      const predicates = triples.predicates;
      for(const predicate in predicates) {
        // iterate over objects
        const objects = predicates[predicate].objects;
        for(let oi = 0; oi < objects.length; ++oi) {
          const object = objects[oi];

          // create RDF triple
          const triple = {};

          // add subject
          if(subject.indexOf('_:') === 0) {
            triple.subject = {type: 'blank node', value: subject};
          } else {
            triple.subject = {type: 'IRI', value: subject};
          }

          // add predicate
          if(predicate.indexOf('_:') === 0) {
            triple.predicate = {type: 'blank node', value: predicate};
          } else {
            triple.predicate = {type: 'IRI', value: predicate};
          }

          // serialize XML literal
          let value = object.value;
          if(object.type === RDF_XML_LITERAL) {
            // initialize XMLSerializer
            const XMLSerializer = getXMLSerializerClass();
            const serializer = new XMLSerializer();
            value = '';
            for(let x = 0; x < object.value.length; x++) {
              if(object.value[x].nodeType === _Node.ELEMENT_NODE) {
                value += serializer.serializeToString(object.value[x]);
              } else if(object.value[x].nodeType === _Node.TEXT_NODE) {
                value += object.value[x].nodeValue;
              }
            }
          }

          // add object
          triple.object = {};

          // object is an IRI
          if(object.type === RDF_OBJECT) {
            if(object.value.indexOf('_:') === 0) {
              triple.object.type = 'blank node';
            } else {
              triple.object.type = 'IRI';
            }
          } else {
            // object is a literal
            triple.object.type = 'literal';
            if(object.type === RDF_PLAIN_LITERAL) {
              if(object.language) {
                triple.object.datatype = RDF_LANGSTRING$1;
                triple.object.language = object.language;
              } else {
                triple.object.datatype = XSD_STRING$1;
              }
            } else {
              triple.object.datatype = object.type;
            }
          }
          triple.object.value = value;

          // add triple to dataset in default graph
          dataset['@default'].push(triple);
        }
      }
    }

    return dataset;
  }
};

function getXMLSerializerClass() {
  if(typeof XMLSerializer === 'undefined') {
    return require$$4.XMLSerializer;
  }
  return XMLSerializer;
}

const {
  isArray: _isArray$1,
  isObject: _isObject$1,
  isString: _isString$1,
  isUndefined: _isUndefined
} = types;

const {
  isAbsolute: _isAbsoluteIri,
  isRelative: _isRelativeIri,
  prependBase: prependBase$1,
  parse: parseUrl
} = url;

const {
  asArray: _asArray$1,
  compareShortestLeast: _compareShortestLeast
} = util$1;

const INITIAL_CONTEXT_CACHE = new Map();
const INITIAL_CONTEXT_CACHE_MAX_SIZE = 10000;
const KEYWORD_PATTERN = /^@[a-zA-Z]+$/;

const api$7 = {};
var context = api$7;

/**
 * Processes a local context and returns a new active context.
 *
 * @param activeCtx the current active context.
 * @param localCtx the local context to process.
 * @param options the context processing options.
 * @param propagate `true` if `false`, retains any previously defined term,
 *   which can be rolled back when the descending into a new node object.
 * @param overrideProtected `false` allows protected terms to be modified.
 *
 * @return a Promise that resolves to the new active context.
 */
api$7.process = async ({
  activeCtx, localCtx, options,
  propagate = true,
  overrideProtected = false,
  cycles = new Set()
}) => {
  // normalize local context to an array of @context objects
  if(_isObject$1(localCtx) && '@context' in localCtx &&
    _isArray$1(localCtx['@context'])) {
    localCtx = localCtx['@context'];
  }
  const ctxs = _asArray$1(localCtx);

  // no contexts in array, return current active context w/o changes
  if(ctxs.length === 0) {
    return activeCtx;
  }

  // resolve contexts
  const resolved = await options.contextResolver.resolve({
    activeCtx,
    context: localCtx,
    documentLoader: options.documentLoader,
    base: options.base
  });

  // override propagate if first resolved context has `@propagate`
  if(_isObject$1(resolved[0].document) &&
    typeof resolved[0].document['@propagate'] === 'boolean') {
    // retrieve early, error checking done later
    propagate = resolved[0].document['@propagate'];
  }

  // process each context in order, update active context
  // on each iteration to ensure proper caching
  let rval = activeCtx;

  // track the previous context
  // if not propagating, make sure rval has a previous context
  if(!propagate && !rval.previousContext) {
    // clone `rval` context before updating
    rval = rval.clone();
    rval.previousContext = activeCtx;
  }

  for(const resolvedContext of resolved) {
    let {document: ctx} = resolvedContext;

    // update active context to one computed from last iteration
    activeCtx = rval;

    // reset to initial context
    if(ctx === null) {
      // We can't nullify if there are protected terms and we're
      // not allowing overrides (e.g. processing a property term scoped context)
      if(!overrideProtected &&
        Object.keys(activeCtx.protected).length !== 0) {
        const protectedMode = (options && options.protectedMode) || 'error';
        if(protectedMode === 'error') {
          throw new JsonLdError_1(
            'Tried to nullify a context with protected terms outside of ' +
            'a term definition.',
            'jsonld.SyntaxError',
            {code: 'invalid context nullification'});
        } else if(protectedMode === 'warn') {
          // FIXME: remove logging and use a handler
          console.warn('WARNING: invalid context nullification');

          // get processed context from cache if available
          const processed = resolvedContext.getProcessed(activeCtx);
          if(processed) {
            rval = activeCtx = processed;
            continue;
          }

          const oldActiveCtx = activeCtx;
          // copy all protected term definitions to fresh initial context
          rval = activeCtx = api$7.getInitialContext(options).clone();
          for(const [term, _protected] of
            Object.entries(oldActiveCtx.protected)) {
            if(_protected) {
              activeCtx.mappings[term] =
                util$1.clone(oldActiveCtx.mappings[term]);
            }
          }
          activeCtx.protected = util$1.clone(oldActiveCtx.protected);

          // cache processed result
          resolvedContext.setProcessed(oldActiveCtx, rval);
          continue;
        }
        throw new JsonLdError_1(
          'Invalid protectedMode.',
          'jsonld.SyntaxError',
          {code: 'invalid protected mode', context: localCtx, protectedMode});
      }
      rval = activeCtx = api$7.getInitialContext(options).clone();
      continue;
    }

    // get processed context from cache if available
    const processed = resolvedContext.getProcessed(activeCtx);
    if(processed) {
      rval = activeCtx = processed;
      continue;
    }

    // dereference @context key if present
    if(_isObject$1(ctx) && '@context' in ctx) {
      ctx = ctx['@context'];
    }

    // context must be an object by now, all URLs retrieved before this call
    if(!_isObject$1(ctx)) {
      throw new JsonLdError_1(
        'Invalid JSON-LD syntax; @context must be an object.',
        'jsonld.SyntaxError', {code: 'invalid local context', context: ctx});
    }

    // TODO: there is likely a `previousContext` cloning optimization that
    // could be applied here (no need to copy it under certain conditions)

    // clone context before updating it
    rval = rval.clone();

    // define context mappings for keys in local context
    const defined = new Map();

    // handle @version
    if('@version' in ctx) {
      if(ctx['@version'] !== 1.1) {
        throw new JsonLdError_1(
          'Unsupported JSON-LD version: ' + ctx['@version'],
          'jsonld.UnsupportedVersion',
          {code: 'invalid @version value', context: ctx});
      }
      if(activeCtx.processingMode &&
        activeCtx.processingMode === 'json-ld-1.0') {
        throw new JsonLdError_1(
          '@version: ' + ctx['@version'] + ' not compatible with ' +
          activeCtx.processingMode,
          'jsonld.ProcessingModeConflict',
          {code: 'processing mode conflict', context: ctx});
      }
      rval.processingMode = 'json-ld-1.1';
      rval['@version'] = ctx['@version'];
      defined.set('@version', true);
    }

    // if not set explicitly, set processingMode to "json-ld-1.1"
    rval.processingMode =
      rval.processingMode || activeCtx.processingMode;

    // handle @base
    if('@base' in ctx) {
      let base = ctx['@base'];

      if(base === null || _isAbsoluteIri(base)) ; else if(_isRelativeIri(base)) {
        base = prependBase$1(rval['@base'], base);
      } else {
        throw new JsonLdError_1(
          'Invalid JSON-LD syntax; the value of "@base" in a ' +
          '@context must be an absolute IRI, a relative IRI, or null.',
          'jsonld.SyntaxError', {code: 'invalid base IRI', context: ctx});
      }

      rval['@base'] = base;
      defined.set('@base', true);
    }

    // handle @vocab
    if('@vocab' in ctx) {
      const value = ctx['@vocab'];
      if(value === null) {
        delete rval['@vocab'];
      } else if(!_isString$1(value)) {
        throw new JsonLdError_1(
          'Invalid JSON-LD syntax; the value of "@vocab" in a ' +
          '@context must be a string or null.',
          'jsonld.SyntaxError', {code: 'invalid vocab mapping', context: ctx});
      } else if(!_isAbsoluteIri(value) && api$7.processingMode(rval, 1.0)) {
        throw new JsonLdError_1(
          'Invalid JSON-LD syntax; the value of "@vocab" in a ' +
          '@context must be an absolute IRI.',
          'jsonld.SyntaxError', {code: 'invalid vocab mapping', context: ctx});
      } else {
        rval['@vocab'] = _expandIri(rval, value, {vocab: true, base: true},
          undefined, undefined, options);
      }
      defined.set('@vocab', true);
    }

    // handle @language
    if('@language' in ctx) {
      const value = ctx['@language'];
      if(value === null) {
        delete rval['@language'];
      } else if(!_isString$1(value)) {
        throw new JsonLdError_1(
          'Invalid JSON-LD syntax; the value of "@language" in a ' +
          '@context must be a string or null.',
          'jsonld.SyntaxError',
          {code: 'invalid default language', context: ctx});
      } else {
        rval['@language'] = value.toLowerCase();
      }
      defined.set('@language', true);
    }

    // handle @direction
    if('@direction' in ctx) {
      const value = ctx['@direction'];
      if(activeCtx.processingMode === 'json-ld-1.0') {
        throw new JsonLdError_1(
          'Invalid JSON-LD syntax; @direction not compatible with ' +
          activeCtx.processingMode,
          'jsonld.SyntaxError',
          {code: 'invalid context member', context: ctx});
      }
      if(value === null) {
        delete rval['@direction'];
      } else if(value !== 'ltr' && value !== 'rtl') {
        throw new JsonLdError_1(
          'Invalid JSON-LD syntax; the value of "@direction" in a ' +
          '@context must be null, "ltr", or "rtl".',
          'jsonld.SyntaxError',
          {code: 'invalid base direction', context: ctx});
      } else {
        rval['@direction'] = value;
      }
      defined.set('@direction', true);
    }

    // handle @propagate
    // note: we've already extracted it, here we just do error checking
    if('@propagate' in ctx) {
      const value = ctx['@propagate'];
      if(activeCtx.processingMode === 'json-ld-1.0') {
        throw new JsonLdError_1(
          'Invalid JSON-LD syntax; @propagate not compatible with ' +
          activeCtx.processingMode,
          'jsonld.SyntaxError',
          {code: 'invalid context entry', context: ctx});
      }
      if(typeof value !== 'boolean') {
        throw new JsonLdError_1(
          'Invalid JSON-LD syntax; @propagate value must be a boolean.',
          'jsonld.SyntaxError',
          {code: 'invalid @propagate value', context: localCtx});
      }
      defined.set('@propagate', true);
    }

    // handle @import
    if('@import' in ctx) {
      const value = ctx['@import'];
      if(activeCtx.processingMode === 'json-ld-1.0') {
        throw new JsonLdError_1(
          'Invalid JSON-LD syntax; @import not compatible with ' +
          activeCtx.processingMode,
          'jsonld.SyntaxError',
          {code: 'invalid context entry', context: ctx});
      }
      if(!_isString$1(value)) {
        throw new JsonLdError_1(
          'Invalid JSON-LD syntax; @import must be a string.',
          'jsonld.SyntaxError',
          {code: 'invalid @import value', context: localCtx});
      }

      // resolve contexts
      const resolvedImport = await options.contextResolver.resolve({
        activeCtx,
        context: value,
        documentLoader: options.documentLoader,
        base: options.base
      });
      if(resolvedImport.length !== 1) {
        throw new JsonLdError_1(
          'Invalid JSON-LD syntax; @import must reference a single context.',
          'jsonld.SyntaxError',
          {code: 'invalid remote context', context: localCtx});
      }
      const processedImport = resolvedImport[0].getProcessed(activeCtx);
      if(processedImport) {
        // Note: if the same context were used in this active context
        // as a reference context, then processed_input might not
        // be a dict.
        ctx = processedImport;
      } else {
        const importCtx = resolvedImport[0].document;
        if('@import' in importCtx) {
          throw new JsonLdError_1(
            'Invalid JSON-LD syntax: ' +
            'imported context must not include @import.',
            'jsonld.SyntaxError',
            {code: 'invalid context entry', context: localCtx});
        }

        // merge ctx into importCtx and replace rval with the result
        for(const key in importCtx) {
          if(!ctx.hasOwnProperty(key)) {
            ctx[key] = importCtx[key];
          }
        }

        // Note: this could potenially conflict if the import
        // were used in the same active context as a referenced
        // context and an import. In this case, we
        // could override the cached result, but seems unlikely.
        resolvedImport[0].setProcessed(activeCtx, ctx);
      }

      defined.set('@import', true);
    }

    // handle @protected; determine whether this sub-context is declaring
    // all its terms to be "protected" (exceptions can be made on a
    // per-definition basis)
    defined.set('@protected', ctx['@protected'] || false);

    // process all other keys
    for(const key in ctx) {
      api$7.createTermDefinition({
        activeCtx: rval,
        localCtx: ctx,
        term: key,
        defined,
        options,
        overrideProtected
      });

      if(_isObject$1(ctx[key]) && '@context' in ctx[key]) {
        const keyCtx = ctx[key]['@context'];
        let process = true;
        if(_isString$1(keyCtx)) {
          const url = prependBase$1(options.base, keyCtx);
          // track processed contexts to avoid scoped context recursion
          if(cycles.has(url)) {
            process = false;
          } else {
            cycles.add(url);
          }
        }
        // parse context to validate
        if(process) {
          try {
            await api$7.process({
              activeCtx: rval,
              localCtx: ctx[key]['@context'],
              overrideProtected: true,
              options,
              cycles
            });
          } catch(e) {
            throw new JsonLdError_1(
              'Invalid JSON-LD syntax; invalid scoped context.',
              'jsonld.SyntaxError',
              {
                code: 'invalid scoped context',
                context: ctx[key]['@context'],
                term: key
              });
          }
        }
      }
    }

    // cache processed result
    resolvedContext.setProcessed(activeCtx, rval);
  }

  return rval;
};

/**
 * Creates a term definition during context processing.
 *
 * @param activeCtx the current active context.
 * @param localCtx the local context being processed.
 * @param term the term in the local context to define the mapping for.
 * @param defined a map of defining/defined keys to detect cycles and prevent
 *          double definitions.
 * @param {Object} [options] - creation options.
 * @param {string} [options.protectedMode="error"] - "error" to throw error
 *   on `@protected` constraint violation, "warn" to allow violations and
 *   signal a warning.
 * @param overrideProtected `false` allows protected terms to be modified.
 */
api$7.createTermDefinition = ({
  activeCtx,
  localCtx,
  term,
  defined,
  options,
  overrideProtected = false,
}) => {
  if(defined.has(term)) {
    // term already defined
    if(defined.get(term)) {
      return;
    }
    // cycle detected
    throw new JsonLdError_1(
      'Cyclical context definition detected.',
      'jsonld.CyclicalContext',
      {code: 'cyclic IRI mapping', context: localCtx, term});
  }

  // now defining term
  defined.set(term, false);

  // get context term value
  let value;
  if(localCtx.hasOwnProperty(term)) {
    value = localCtx[term];
  }

  if(term === '@type' &&
     _isObject$1(value) &&
     (value['@container'] || '@set') === '@set' &&
     api$7.processingMode(activeCtx, 1.1)) {

    const validKeys = ['@container', '@id', '@protected'];
    const keys = Object.keys(value);
    if(keys.length === 0 || keys.some(k => !validKeys.includes(k))) {
      throw new JsonLdError_1(
        'Invalid JSON-LD syntax; keywords cannot be overridden.',
        'jsonld.SyntaxError',
        {code: 'keyword redefinition', context: localCtx, term});
    }
  } else if(api$7.isKeyword(term)) {
    throw new JsonLdError_1(
      'Invalid JSON-LD syntax; keywords cannot be overridden.',
      'jsonld.SyntaxError',
      {code: 'keyword redefinition', context: localCtx, term});
  } else if(term.match(KEYWORD_PATTERN)) {
    // FIXME: remove logging and use a handler
    console.warn('WARNING: terms beginning with "@" are reserved' +
      ' for future use and ignored', {term});
    return;
  } else if(term === '') {
    throw new JsonLdError_1(
      'Invalid JSON-LD syntax; a term cannot be an empty string.',
      'jsonld.SyntaxError',
      {code: 'invalid term definition', context: localCtx});
  }

  // keep reference to previous mapping for potential `@protected` check
  const previousMapping = activeCtx.mappings.get(term);

  // remove old mapping
  if(activeCtx.mappings.has(term)) {
    activeCtx.mappings.delete(term);
  }

  // convert short-hand value to object w/@id
  let simpleTerm = false;
  if(_isString$1(value) || value === null) {
    simpleTerm = true;
    value = {'@id': value};
  }

  if(!_isObject$1(value)) {
    throw new JsonLdError_1(
      'Invalid JSON-LD syntax; @context term values must be ' +
      'strings or objects.',
      'jsonld.SyntaxError',
      {code: 'invalid term definition', context: localCtx});
  }

  // create new mapping
  const mapping = {};
  activeCtx.mappings.set(term, mapping);
  mapping.reverse = false;

  // make sure term definition only has expected keywords
  const validKeys = ['@container', '@id', '@language', '@reverse', '@type'];

  // JSON-LD 1.1 support
  if(api$7.processingMode(activeCtx, 1.1)) {
    validKeys.push(
      '@context', '@direction', '@index', '@nest', '@prefix', '@protected');
  }

  for(const kw in value) {
    if(!validKeys.includes(kw)) {
      throw new JsonLdError_1(
        'Invalid JSON-LD syntax; a term definition must not contain ' + kw,
        'jsonld.SyntaxError',
        {code: 'invalid term definition', context: localCtx});
    }
  }

  // always compute whether term has a colon as an optimization for
  // _compactIri
  const colon = term.indexOf(':');
  mapping._termHasColon = (colon > 0);

  if('@reverse' in value) {
    if('@id' in value) {
      throw new JsonLdError_1(
        'Invalid JSON-LD syntax; a @reverse term definition must not ' +
        'contain @id.', 'jsonld.SyntaxError',
        {code: 'invalid reverse property', context: localCtx});
    }
    if('@nest' in value) {
      throw new JsonLdError_1(
        'Invalid JSON-LD syntax; a @reverse term definition must not ' +
        'contain @nest.', 'jsonld.SyntaxError',
        {code: 'invalid reverse property', context: localCtx});
    }
    const reverse = value['@reverse'];
    if(!_isString$1(reverse)) {
      throw new JsonLdError_1(
        'Invalid JSON-LD syntax; a @context @reverse value must be a string.',
        'jsonld.SyntaxError', {code: 'invalid IRI mapping', context: localCtx});
    }

    if(!api$7.isKeyword(reverse) && reverse.match(KEYWORD_PATTERN)) {
      // FIXME: remove logging and use a handler
      console.warn('WARNING: values beginning with "@" are reserved' +
        ' for future use and ignored', {reverse});
      if(previousMapping) {
        activeCtx.mappings.set(term, previousMapping);
      } else {
        activeCtx.mappings.delete(term);
      }
      return;
    }

    // expand and add @id mapping
    const id = _expandIri(
      activeCtx, reverse, {vocab: true, base: false}, localCtx, defined,
      options);
    if(!_isAbsoluteIri(id)) {
      throw new JsonLdError_1(
        'Invalid JSON-LD syntax; a @context @reverse value must be an ' +
        'absolute IRI or a blank node identifier.',
        'jsonld.SyntaxError', {code: 'invalid IRI mapping', context: localCtx});
    }

    mapping['@id'] = id;
    mapping.reverse = true;
  } else if('@id' in value) {
    let id = value['@id'];
    if(id && !_isString$1(id)) {
      throw new JsonLdError_1(
        'Invalid JSON-LD syntax; a @context @id value must be an array ' +
        'of strings or a string.',
        'jsonld.SyntaxError', {code: 'invalid IRI mapping', context: localCtx});
    }
    if(id === null) {
      // reserve a null term, which may be protected
      mapping['@id'] = null;
    } else if(!api$7.isKeyword(id) && id.match(KEYWORD_PATTERN)) {
      // FIXME: remove logging and use a handler
      console.warn('WARNING: values beginning with "@" are reserved' +
        ' for future use and ignored', {id});
      if(previousMapping) {
        activeCtx.mappings.set(term, previousMapping);
      } else {
        activeCtx.mappings.delete(term);
      }
      return;
    } else if(id !== term) {
      // expand and add @id mapping
      id = _expandIri(
        activeCtx, id, {vocab: true, base: false}, localCtx, defined, options);
      if(!_isAbsoluteIri(id) && !api$7.isKeyword(id)) {
        throw new JsonLdError_1(
          'Invalid JSON-LD syntax; a @context @id value must be an ' +
          'absolute IRI, a blank node identifier, or a keyword.',
          'jsonld.SyntaxError',
          {code: 'invalid IRI mapping', context: localCtx});
      }

      // if term has the form of an IRI it must map the same
      if(term.match(/(?::[^:])|\//)) {
        const termDefined = new Map(defined).set(term, true);
        const termIri = _expandIri(
          activeCtx, term, {vocab: true, base: false},
          localCtx, termDefined, options);
        if(termIri !== id) {
          throw new JsonLdError_1(
            'Invalid JSON-LD syntax; term in form of IRI must ' +
            'expand to definition.',
            'jsonld.SyntaxError',
            {code: 'invalid IRI mapping', context: localCtx});
        }
      }

      mapping['@id'] = id;
      // indicate if this term may be used as a compact IRI prefix
      mapping._prefix = (simpleTerm &&
        !mapping._termHasColon &&
        id.match(/[:\/\?#\[\]@]$/));
    }
  }

  if(!('@id' in mapping)) {
    // see if the term has a prefix
    if(mapping._termHasColon) {
      const prefix = term.substr(0, colon);
      if(localCtx.hasOwnProperty(prefix)) {
        // define parent prefix
        api$7.createTermDefinition({
          activeCtx, localCtx, term: prefix, defined, options
        });
      }

      if(activeCtx.mappings.has(prefix)) {
        // set @id based on prefix parent
        const suffix = term.substr(colon + 1);
        mapping['@id'] = activeCtx.mappings.get(prefix)['@id'] + suffix;
      } else {
        // term is an absolute IRI
        mapping['@id'] = term;
      }
    } else if(term === '@type') {
      // Special case, were we've previously determined that container is @set
      mapping['@id'] = term;
    } else {
      // non-IRIs *must* define @ids if @vocab is not available
      if(!('@vocab' in activeCtx)) {
        throw new JsonLdError_1(
          'Invalid JSON-LD syntax; @context terms must define an @id.',
          'jsonld.SyntaxError',
          {code: 'invalid IRI mapping', context: localCtx, term});
      }
      // prepend vocab to term
      mapping['@id'] = activeCtx['@vocab'] + term;
    }
  }

  // Handle term protection
  if(value['@protected'] === true ||
    (defined.get('@protected') === true && value['@protected'] !== false)) {
    activeCtx.protected[term] = true;
    mapping.protected = true;
  }

  // IRI mapping now defined
  defined.set(term, true);

  if('@type' in value) {
    let type = value['@type'];
    if(!_isString$1(type)) {
      throw new JsonLdError_1(
        'Invalid JSON-LD syntax; an @context @type value must be a string.',
        'jsonld.SyntaxError',
        {code: 'invalid type mapping', context: localCtx});
    }

    if((type === '@json' || type === '@none')) {
      if(api$7.processingMode(activeCtx, 1.0)) {
        throw new JsonLdError_1(
          'Invalid JSON-LD syntax; an @context @type value must not be ' +
          `"${type}" in JSON-LD 1.0 mode.`,
          'jsonld.SyntaxError',
          {code: 'invalid type mapping', context: localCtx});
      }
    } else if(type !== '@id' && type !== '@vocab') {
      // expand @type to full IRI
      type = _expandIri(
        activeCtx, type, {vocab: true, base: false}, localCtx, defined,
        options);
      if(!_isAbsoluteIri(type)) {
        throw new JsonLdError_1(
          'Invalid JSON-LD syntax; an @context @type value must be an ' +
          'absolute IRI.',
          'jsonld.SyntaxError',
          {code: 'invalid type mapping', context: localCtx});
      }
      if(type.indexOf('_:') === 0) {
        throw new JsonLdError_1(
          'Invalid JSON-LD syntax; an @context @type value must be an IRI, ' +
          'not a blank node identifier.',
          'jsonld.SyntaxError',
          {code: 'invalid type mapping', context: localCtx});
      }
    }

    // add @type to mapping
    mapping['@type'] = type;
  }

  if('@container' in value) {
    // normalize container to an array form
    const container = _isString$1(value['@container']) ?
      [value['@container']] : (value['@container'] || []);
    const validContainers = ['@list', '@set', '@index', '@language'];
    let isValid = true;
    const hasSet = container.includes('@set');

    // JSON-LD 1.1 support
    if(api$7.processingMode(activeCtx, 1.1)) {
      validContainers.push('@graph', '@id', '@type');

      // check container length
      if(container.includes('@list')) {
        if(container.length !== 1) {
          throw new JsonLdError_1(
            'Invalid JSON-LD syntax; @context @container with @list must ' +
            'have no other values',
            'jsonld.SyntaxError',
            {code: 'invalid container mapping', context: localCtx});
        }
      } else if(container.includes('@graph')) {
        if(container.some(key =>
          key !== '@graph' && key !== '@id' && key !== '@index' &&
          key !== '@set')) {
          throw new JsonLdError_1(
            'Invalid JSON-LD syntax; @context @container with @graph must ' +
            'have no other values other than @id, @index, and @set',
            'jsonld.SyntaxError',
            {code: 'invalid container mapping', context: localCtx});
        }
      } else {
        // otherwise, container may also include @set
        isValid &= container.length <= (hasSet ? 2 : 1);
      }

      if(container.includes('@type')) {
        // If mapping does not have an @type,
        // set it to @id
        mapping['@type'] = mapping['@type'] || '@id';

        // type mapping must be either @id or @vocab
        if(!['@id', '@vocab'].includes(mapping['@type'])) {
          throw new JsonLdError_1(
            'Invalid JSON-LD syntax; container: @type requires @type to be ' +
            '@id or @vocab.',
            'jsonld.SyntaxError',
            {code: 'invalid type mapping', context: localCtx});
        }
      }
    } else {
      // in JSON-LD 1.0, container must not be an array (it must be a string,
      // which is one of the validContainers)
      isValid &= !_isArray$1(value['@container']);

      // check container length
      isValid &= container.length <= 1;
    }

    // check against valid containers
    isValid &= container.every(c => validContainers.includes(c));

    // @set not allowed with @list
    isValid &= !(hasSet && container.includes('@list'));

    if(!isValid) {
      throw new JsonLdError_1(
        'Invalid JSON-LD syntax; @context @container value must be ' +
        'one of the following: ' + validContainers.join(', '),
        'jsonld.SyntaxError',
        {code: 'invalid container mapping', context: localCtx});
    }

    if(mapping.reverse &&
      !container.every(c => ['@index', '@set'].includes(c))) {
      throw new JsonLdError_1(
        'Invalid JSON-LD syntax; @context @container value for a @reverse ' +
        'type definition must be @index or @set.', 'jsonld.SyntaxError',
        {code: 'invalid reverse property', context: localCtx});
    }

    // add @container to mapping
    mapping['@container'] = container;
  }

  // property indexing
  if('@index' in value) {
    if(!('@container' in value) || !mapping['@container'].includes('@index')) {
      throw new JsonLdError_1(
        'Invalid JSON-LD syntax; @index without @index in @container: ' +
        `"${value['@index']}" on term "${term}".`, 'jsonld.SyntaxError',
        {code: 'invalid term definition', context: localCtx});
    }
    if(!_isString$1(value['@index']) || value['@index'].indexOf('@') === 0) {
      throw new JsonLdError_1(
        'Invalid JSON-LD syntax; @index must expand to an IRI: ' +
        `"${value['@index']}" on term "${term}".`, 'jsonld.SyntaxError',
        {code: 'invalid term definition', context: localCtx});
    }
    mapping['@index'] = value['@index'];
  }

  // scoped contexts
  if('@context' in value) {
    mapping['@context'] = value['@context'];
  }

  if('@language' in value && !('@type' in value)) {
    let language = value['@language'];
    if(language !== null && !_isString$1(language)) {
      throw new JsonLdError_1(
        'Invalid JSON-LD syntax; @context @language value must be ' +
        'a string or null.', 'jsonld.SyntaxError',
        {code: 'invalid language mapping', context: localCtx});
    }

    // add @language to mapping
    if(language !== null) {
      language = language.toLowerCase();
    }
    mapping['@language'] = language;
  }

  // term may be used as a prefix
  if('@prefix' in value) {
    if(term.match(/:|\//)) {
      throw new JsonLdError_1(
        'Invalid JSON-LD syntax; @context @prefix used on a compact IRI term',
        'jsonld.SyntaxError',
        {code: 'invalid term definition', context: localCtx});
    }
    if(api$7.isKeyword(mapping['@id'])) {
      throw new JsonLdError_1(
        'Invalid JSON-LD syntax; keywords may not be used as prefixes',
        'jsonld.SyntaxError',
        {code: 'invalid term definition', context: localCtx});
    }
    if(typeof value['@prefix'] === 'boolean') {
      mapping._prefix = value['@prefix'] === true;
    } else {
      throw new JsonLdError_1(
        'Invalid JSON-LD syntax; @context value for @prefix must be boolean',
        'jsonld.SyntaxError',
        {code: 'invalid @prefix value', context: localCtx});
    }
  }

  if('@direction' in value) {
    const direction = value['@direction'];
    if(direction !== null && direction !== 'ltr' && direction !== 'rtl') {
      throw new JsonLdError_1(
        'Invalid JSON-LD syntax; @direction value must be ' +
        'null, "ltr", or "rtl".',
        'jsonld.SyntaxError',
        {code: 'invalid base direction', context: localCtx});
    }
    mapping['@direction'] = direction;
  }

  if('@nest' in value) {
    const nest = value['@nest'];
    if(!_isString$1(nest) || (nest !== '@nest' && nest.indexOf('@') === 0)) {
      throw new JsonLdError_1(
        'Invalid JSON-LD syntax; @context @nest value must be ' +
        'a string which is not a keyword other than @nest.',
        'jsonld.SyntaxError',
        {code: 'invalid @nest value', context: localCtx});
    }
    mapping['@nest'] = nest;
  }

  // disallow aliasing @context and @preserve
  const id = mapping['@id'];
  if(id === '@context' || id === '@preserve') {
    throw new JsonLdError_1(
      'Invalid JSON-LD syntax; @context and @preserve cannot be aliased.',
      'jsonld.SyntaxError', {code: 'invalid keyword alias', context: localCtx});
  }

  // Check for overriding protected terms
  if(previousMapping && previousMapping.protected && !overrideProtected) {
    // force new term to continue to be protected and see if the mappings would
    // be equal
    activeCtx.protected[term] = true;
    mapping.protected = true;
    if(!_deepCompare(previousMapping, mapping)) {
      const protectedMode = (options && options.protectedMode) || 'error';
      if(protectedMode === 'error') {
        throw new JsonLdError_1(
          'Invalid JSON-LD syntax; tried to redefine a protected term.',
          'jsonld.SyntaxError',
          {code: 'protected term redefinition', context: localCtx, term});
      } else if(protectedMode === 'warn') {
        // FIXME: remove logging and use a handler
        console.warn('WARNING: protected term redefinition', {term});
        return;
      }
      throw new JsonLdError_1(
        'Invalid protectedMode.',
        'jsonld.SyntaxError',
        {code: 'invalid protected mode', context: localCtx, term,
          protectedMode});
    }
  }
};

/**
 * Expands a string to a full IRI. The string may be a term, a prefix, a
 * relative IRI, or an absolute IRI. The associated absolute IRI will be
 * returned.
 *
 * @param activeCtx the current active context.
 * @param value the string to expand.
 * @param relativeTo options for how to resolve relative IRIs:
 *          base: true to resolve against the base IRI, false not to.
 *          vocab: true to concatenate after @vocab, false not to.
 * @param {Object} [options] - processing options.
 *
 * @return the expanded value.
 */
api$7.expandIri = (activeCtx, value, relativeTo, options) => {
  return _expandIri(activeCtx, value, relativeTo, undefined, undefined,
    options);
};

/**
 * Expands a string to a full IRI. The string may be a term, a prefix, a
 * relative IRI, or an absolute IRI. The associated absolute IRI will be
 * returned.
 *
 * @param activeCtx the current active context.
 * @param value the string to expand.
 * @param relativeTo options for how to resolve relative IRIs:
 *          base: true to resolve against the base IRI, false not to.
 *          vocab: true to concatenate after @vocab, false not to.
 * @param localCtx the local context being processed (only given if called
 *          during context processing).
 * @param defined a map for tracking cycles in context definitions (only given
 *          if called during context processing).
 * @param {Object} [options] - processing options.
 *
 * @return the expanded value.
 */
function _expandIri(activeCtx, value, relativeTo, localCtx, defined, options) {
  // already expanded
  if(value === null || !_isString$1(value) || api$7.isKeyword(value)) {
    return value;
  }

  // ignore non-keyword things that look like a keyword
  if(value.match(KEYWORD_PATTERN)) {
    return null;
  }

  // define term dependency if not defined
  if(localCtx && localCtx.hasOwnProperty(value) &&
    defined.get(value) !== true) {
    api$7.createTermDefinition({
      activeCtx, localCtx, term: value, defined, options
    });
  }

  relativeTo = relativeTo || {};
  if(relativeTo.vocab) {
    const mapping = activeCtx.mappings.get(value);

    // value is explicitly ignored with a null mapping
    if(mapping === null) {
      return null;
    }

    if(_isObject$1(mapping) && '@id' in mapping) {
      // value is a term
      return mapping['@id'];
    }
  }

  // split value into prefix:suffix
  const colon = value.indexOf(':');
  if(colon > 0) {
    const prefix = value.substr(0, colon);
    const suffix = value.substr(colon + 1);

    // do not expand blank nodes (prefix of '_') or already-absolute
    // IRIs (suffix of '//')
    if(prefix === '_' || suffix.indexOf('//') === 0) {
      return value;
    }

    // prefix dependency not defined, define it
    if(localCtx && localCtx.hasOwnProperty(prefix)) {
      api$7.createTermDefinition({
        activeCtx, localCtx, term: prefix, defined, options
      });
    }

    // use mapping if prefix is defined
    const mapping = activeCtx.mappings.get(prefix);
    if(mapping && mapping._prefix) {
      return mapping['@id'] + suffix;
    }

    // already absolute IRI
    if(_isAbsoluteIri(value)) {
      return value;
    }
  }

  // prepend vocab
  if(relativeTo.vocab && '@vocab' in activeCtx) {
    return activeCtx['@vocab'] + value;
  }

  // prepend base
  if(relativeTo.base && '@base' in activeCtx) {
    if(activeCtx['@base']) {
      // The null case preserves value as potentially relative
      return prependBase$1(prependBase$1(options.base, activeCtx['@base']), value);
    }
  } else if(relativeTo.base) {
    return prependBase$1(options.base, value);
  }

  return value;
}

/**
 * Gets the initial context.
 *
 * @param options the options to use:
 *          [base] the document base IRI.
 *
 * @return the initial context.
 */
api$7.getInitialContext = options => {
  const key = JSON.stringify({processingMode: options.processingMode});
  const cached = INITIAL_CONTEXT_CACHE.get(key);
  if(cached) {
    return cached;
  }

  const initialContext = {
    processingMode: options.processingMode,
    mappings: new Map(),
    inverse: null,
    getInverse: _createInverseContext,
    clone: _cloneActiveContext,
    revertToPreviousContext: _revertToPreviousContext,
    protected: {}
  };
  // TODO: consider using LRU cache instead
  if(INITIAL_CONTEXT_CACHE.size === INITIAL_CONTEXT_CACHE_MAX_SIZE) {
    // clear whole cache -- assumes scenario where the cache fills means
    // the cache isn't being used very efficiently anyway
    INITIAL_CONTEXT_CACHE.clear();
  }
  INITIAL_CONTEXT_CACHE.set(key, initialContext);
  return initialContext;

  /**
   * Generates an inverse context for use in the compaction algorithm, if
   * not already generated for the given active context.
   *
   * @return the inverse context.
   */
  function _createInverseContext() {
    const activeCtx = this;

    // lazily create inverse
    if(activeCtx.inverse) {
      return activeCtx.inverse;
    }
    const inverse = activeCtx.inverse = {};

    // variables for building fast CURIE map
    const fastCurieMap = activeCtx.fastCurieMap = {};
    const irisToTerms = {};

    // handle default language
    const defaultLanguage = (activeCtx['@language'] || '@none').toLowerCase();

    // handle default direction
    const defaultDirection = activeCtx['@direction'];

    // create term selections for each mapping in the context, ordered by
    // shortest and then lexicographically least
    const mappings = activeCtx.mappings;
    const terms = [...mappings.keys()].sort(_compareShortestLeast);
    for(const term of terms) {
      const mapping = mappings.get(term);
      if(mapping === null) {
        continue;
      }

      let container = mapping['@container'] || '@none';
      container = [].concat(container).sort().join('');

      if(mapping['@id'] === null) {
        continue;
      }
      // iterate over every IRI in the mapping
      const ids = _asArray$1(mapping['@id']);
      for(const iri of ids) {
        let entry = inverse[iri];
        const isKeyword = api$7.isKeyword(iri);

        if(!entry) {
          // initialize entry
          inverse[iri] = entry = {};

          if(!isKeyword && !mapping._termHasColon) {
            // init IRI to term map and fast CURIE prefixes
            irisToTerms[iri] = [term];
            const fastCurieEntry = {iri, terms: irisToTerms[iri]};
            if(iri[0] in fastCurieMap) {
              fastCurieMap[iri[0]].push(fastCurieEntry);
            } else {
              fastCurieMap[iri[0]] = [fastCurieEntry];
            }
          }
        } else if(!isKeyword && !mapping._termHasColon) {
          // add IRI to term match
          irisToTerms[iri].push(term);
        }

        // add new entry
        if(!entry[container]) {
          entry[container] = {
            '@language': {},
            '@type': {},
            '@any': {}
          };
        }
        entry = entry[container];
        _addPreferredTerm(term, entry['@any'], '@none');

        if(mapping.reverse) {
          // term is preferred for values using @reverse
          _addPreferredTerm(term, entry['@type'], '@reverse');
        } else if(mapping['@type'] === '@none') {
          _addPreferredTerm(term, entry['@any'], '@none');
          _addPreferredTerm(term, entry['@language'], '@none');
          _addPreferredTerm(term, entry['@type'], '@none');
        } else if('@type' in mapping) {
          // term is preferred for values using specific type
          _addPreferredTerm(term, entry['@type'], mapping['@type']);
        } else if('@language' in mapping && '@direction' in mapping) {
          // term is preferred for values using specific language and direction
          const language = mapping['@language'];
          const direction = mapping['@direction'];
          if(language && direction) {
            _addPreferredTerm(term, entry['@language'],
              `${language}_${direction}`.toLowerCase());
          } else if(language) {
            _addPreferredTerm(term, entry['@language'], language.toLowerCase());
          } else if(direction) {
            _addPreferredTerm(term, entry['@language'], `_${direction}`);
          } else {
            _addPreferredTerm(term, entry['@language'], '@null');
          }
        } else if('@language' in mapping) {
          _addPreferredTerm(term, entry['@language'],
            (mapping['@language'] || '@null').toLowerCase());
        } else if('@direction' in mapping) {
          if(mapping['@direction']) {
            _addPreferredTerm(term, entry['@language'],
              `_${mapping['@direction']}`);
          } else {
            _addPreferredTerm(term, entry['@language'], '@none');
          }
        } else if(defaultDirection) {
          _addPreferredTerm(term, entry['@language'], `_${defaultDirection}`);
          _addPreferredTerm(term, entry['@language'], '@none');
          _addPreferredTerm(term, entry['@type'], '@none');
        } else {
          // add entries for no type and no language
          _addPreferredTerm(term, entry['@language'], defaultLanguage);
          _addPreferredTerm(term, entry['@language'], '@none');
          _addPreferredTerm(term, entry['@type'], '@none');
        }
      }
    }

    // build fast CURIE map
    for(const key in fastCurieMap) {
      _buildIriMap(fastCurieMap, key, 1);
    }

    return inverse;
  }

  /**
   * Runs a recursive algorithm to build a lookup map for quickly finding
   * potential CURIEs.
   *
   * @param iriMap the map to build.
   * @param key the current key in the map to work on.
   * @param idx the index into the IRI to compare.
   */
  function _buildIriMap(iriMap, key, idx) {
    const entries = iriMap[key];
    const next = iriMap[key] = {};

    let iri;
    let letter;
    for(const entry of entries) {
      iri = entry.iri;
      if(idx >= iri.length) {
        letter = '';
      } else {
        letter = iri[idx];
      }
      if(letter in next) {
        next[letter].push(entry);
      } else {
        next[letter] = [entry];
      }
    }

    for(const key in next) {
      if(key === '') {
        continue;
      }
      _buildIriMap(next, key, idx + 1);
    }
  }

  /**
   * Adds the term for the given entry if not already added.
   *
   * @param term the term to add.
   * @param entry the inverse context typeOrLanguage entry to add to.
   * @param typeOrLanguageValue the key in the entry to add to.
   */
  function _addPreferredTerm(term, entry, typeOrLanguageValue) {
    if(!entry.hasOwnProperty(typeOrLanguageValue)) {
      entry[typeOrLanguageValue] = term;
    }
  }

  /**
   * Clones an active context, creating a child active context.
   *
   * @return a clone (child) of the active context.
   */
  function _cloneActiveContext() {
    const child = {};
    child.mappings = util$1.clone(this.mappings);
    child.clone = this.clone;
    child.inverse = null;
    child.getInverse = this.getInverse;
    child.protected = util$1.clone(this.protected);
    if(this.previousContext) {
      child.previousContext = this.previousContext.clone();
    }
    child.revertToPreviousContext = this.revertToPreviousContext;
    if('@base' in this) {
      child['@base'] = this['@base'];
    }
    if('@language' in this) {
      child['@language'] = this['@language'];
    }
    if('@vocab' in this) {
      child['@vocab'] = this['@vocab'];
    }
    return child;
  }

  /**
   * Reverts any type-scoped context in this active context to the previous
   * context.
   */
  function _revertToPreviousContext() {
    if(!this.previousContext) {
      return this;
    }
    return this.previousContext.clone();
  }
};

/**
 * Gets the value for the given active context key and type, null if none is
 * set or undefined if none is set and type is '@context'.
 *
 * @param ctx the active context.
 * @param key the context key.
 * @param [type] the type of value to get (eg: '@id', '@type'), if not
 *          specified gets the entire entry for a key, null if not found.
 *
 * @return the value, null, or undefined.
 */
api$7.getContextValue = (ctx, key, type) => {
  // invalid key
  if(key === null) {
    if(type === '@context') {
      return undefined;
    }
    return null;
  }

  // get specific entry information
  if(ctx.mappings.has(key)) {
    const entry = ctx.mappings.get(key);

    if(_isUndefined(type)) {
      // return whole entry
      return entry;
    }
    if(entry.hasOwnProperty(type)) {
      // return entry value for type
      return entry[type];
    }
  }

  // get default language
  if(type === '@language' && type in ctx) {
    return ctx[type];
  }

  // get default direction
  if(type === '@direction' && type in ctx) {
    return ctx[type];
  }

  if(type === '@context') {
    return undefined;
  }
  return null;
};

/**
 * Processing Mode check.
 *
 * @param activeCtx the current active context.
 * @param version the string or numeric version to check.
 *
 * @return boolean.
 */
api$7.processingMode = (activeCtx, version) => {
  if(version.toString() >= '1.1') {
    return !activeCtx.processingMode ||
      activeCtx.processingMode >= 'json-ld-' + version.toString();
  } else {
    return activeCtx.processingMode === 'json-ld-1.0';
  }
};

/**
 * Returns whether or not the given value is a keyword.
 *
 * @param v the value to check.
 *
 * @return true if the value is a keyword, false if not.
 */
api$7.isKeyword = v => {
  if(!_isString$1(v) || v[0] !== '@') {
    return false;
  }
  switch(v) {
    case '@base':
    case '@container':
    case '@context':
    case '@default':
    case '@direction':
    case '@embed':
    case '@explicit':
    case '@graph':
    case '@id':
    case '@included':
    case '@index':
    case '@json':
    case '@language':
    case '@list':
    case '@nest':
    case '@none':
    case '@omitDefault':
    case '@prefix':
    case '@preserve':
    case '@protected':
    case '@requireAll':
    case '@reverse':
    case '@set':
    case '@type':
    case '@value':
    case '@version':
    case '@vocab':
      return true;
  }
  return false;
};

function _deepCompare(x1, x2) {
  // compare `null` or primitive types directly
  if((!(x1 && typeof x1 === 'object')) ||
     (!(x2 && typeof x2 === 'object'))) {
    return x1 === x2;
  }
  // x1 and x2 are objects (also potentially arrays)
  const x1Array = Array.isArray(x1);
  if(x1Array !== Array.isArray(x2)) {
    return false;
  }
  if(x1Array) {
    if(x1.length !== x2.length) {
      return false;
    }
    for(let i = 0; i < x1.length; ++i) {
      if(!_deepCompare(x1[i], x2[i])) {
        return false;
      }
    }
    return true;
  }
  // x1 and x2 are non-array objects
  const k1s = Object.keys(x1);
  const k2s = Object.keys(x2);
  if(k1s.length !== k2s.length) {
    return false;
  }
  for(const k1 in x1) {
    let v1 = x1[k1];
    let v2 = x2[k1];
    // special case: `@container` can be in any order
    if(k1 === '@container') {
      if(Array.isArray(v1) && Array.isArray(v2)) {
        v1 = v1.slice().sort();
        v2 = v2.slice().sort();
      }
    }
    if(!_deepCompare(v1, v2)) {
      return false;
    }
  }
  return true;
}

const {
  isArray: _isArray$2,
  isObject: _isObject$2,
  isEmptyObject: _isEmptyObject,
  isString: _isString$2,
  isUndefined: _isUndefined$1
} = types;

const {
  isList: _isList,
  isValue: _isValue,
  isGraph: _isGraph,
  isSubject: _isSubject
} = graphTypes;

const {
  expandIri: _expandIri$1,
  getContextValue: _getContextValue,
  isKeyword: _isKeyword,
  process: _processContext,
  processingMode: _processingMode
} = context;

const {
  isAbsolute: _isAbsoluteIri$1
} = url;

const {
  addValue: _addValue,
  asArray: _asArray$2,
  getValues: _getValues,
  validateTypeValue: _validateTypeValue
} = util$1;

const api$8 = {};
var expand = api$8;
const REGEX_BCP47 = /^[a-zA-Z]{1,8}(-[a-zA-Z0-9]{1,8})*$/;

/**
 * Recursively expands an element using the given context. Any context in
 * the element will be removed. All context URLs must have been retrieved
 * before calling this method.
 *
 * @param activeCtx the context to use.
 * @param activeProperty the property for the element, null for none.
 * @param element the element to expand.
 * @param options the expansion options.
 * @param insideList true if the element is a list, false if not.
 * @param insideIndex true if the element is inside an index container,
 *          false if not.
 * @param typeScopedContext an optional type-scoped active context for
 *          expanding values of nodes that were expressed according to
 *          a type-scoped context.
 * @param expansionMap(info) a function that can be used to custom map
 *          unmappable values (or to throw an error when they are detected);
 *          if this function returns `undefined` then the default behavior
 *          will be used.
 *
 * @return a Promise that resolves to the expanded value.
 */
api$8.expand = async ({
  activeCtx,
  activeProperty = null,
  element,
  options = {},
  insideList = false,
  insideIndex = false,
  typeScopedContext = null,
  expansionMap = () => undefined
}) => {
  // nothing to expand
  if(element === null || element === undefined) {
    return null;
  }

  // disable framing if activeProperty is @default
  if(activeProperty === '@default') {
    options = Object.assign({}, options, {isFrame: false});
  }

  if(!_isArray$2(element) && !_isObject$2(element)) {
    // drop free-floating scalars that are not in lists unless custom mapped
    if(!insideList && (activeProperty === null ||
      _expandIri$1(activeCtx, activeProperty, {vocab: true},
        options) === '@graph')) {
      const mapped = await expansionMap({
        unmappedValue: element,
        activeCtx,
        activeProperty,
        options,
        insideList
      });
      if(mapped === undefined) {
        return null;
      }
      return mapped;
    }

    // expand element according to value expansion rules
    return _expandValue({activeCtx, activeProperty, value: element, options});
  }

  // recursively expand array
  if(_isArray$2(element)) {
    let rval = [];
    const container = _getContextValue(
      activeCtx, activeProperty, '@container') || [];
    insideList = insideList || container.includes('@list');
    for(let i = 0; i < element.length; ++i) {
      // expand element
      let e = await api$8.expand({
        activeCtx,
        activeProperty,
        element: element[i],
        options,
        expansionMap,
        insideIndex,
        typeScopedContext
      });
      if(insideList && _isArray$2(e)) {
        e = {'@list': e};
      }

      if(e === null) {
        e = await expansionMap({
          unmappedValue: element[i],
          activeCtx,
          activeProperty,
          parent: element,
          index: i,
          options,
          expandedParent: rval,
          insideList
        });
        if(e === undefined) {
          continue;
        }
      }

      if(_isArray$2(e)) {
        rval = rval.concat(e);
      } else {
        rval.push(e);
      }
    }
    return rval;
  }

  // recursively expand object:

  // first, expand the active property
  const expandedActiveProperty = _expandIri$1(
    activeCtx, activeProperty, {vocab: true}, options);

  // Get any property-scoped context for activeProperty
  const propertyScopedCtx =
    _getContextValue(activeCtx, activeProperty, '@context');

  // second, determine if any type-scoped context should be reverted; it
  // should only be reverted when the following are all true:
  // 1. `element` is not a value or subject reference
  // 2. `insideIndex` is false
  typeScopedContext = typeScopedContext ||
    (activeCtx.previousContext ? activeCtx : null);
  let keys = Object.keys(element).sort();
  let mustRevert = !insideIndex;
  if(mustRevert && typeScopedContext && keys.length <= 2 &&
    !keys.includes('@context')) {
    for(const key of keys) {
      const expandedProperty = _expandIri$1(
        typeScopedContext, key, {vocab: true}, options);
      if(expandedProperty === '@value') {
        // value found, ensure type-scoped context is used to expand it
        mustRevert = false;
        activeCtx = typeScopedContext;
        break;
      }
      if(expandedProperty === '@id' && keys.length === 1) {
        // subject reference found, do not revert
        mustRevert = false;
        break;
      }
    }
  }

  if(mustRevert) {
    // revert type scoped context
    activeCtx = activeCtx.revertToPreviousContext();
  }

  // apply property-scoped context after reverting term-scoped context
  if(!_isUndefined$1(propertyScopedCtx)) {
    activeCtx = await _processContext({
      activeCtx,
      localCtx: propertyScopedCtx,
      propagate: true,
      overrideProtected: true,
      options
    });
  }

  // if element has a context, process it
  if('@context' in element) {
    activeCtx = await _processContext(
      {activeCtx, localCtx: element['@context'], options});
  }

  // set the type-scoped context to the context on input, for use later
  typeScopedContext = activeCtx;

  // Remember the first key found expanding to @type
  let typeKey = null;

  // look for scoped contexts on `@type`
  for(const key of keys) {
    const expandedProperty = _expandIri$1(activeCtx, key, {vocab: true}, options);
    if(expandedProperty === '@type') {
      // set scoped contexts from @type
      // avoid sorting if possible
      typeKey = typeKey || key;
      const value = element[key];
      const types =
        Array.isArray(value) ?
          (value.length > 1 ? value.slice().sort() : value) : [value];
      for(const type of types) {
        const ctx = _getContextValue(typeScopedContext, type, '@context');
        if(!_isUndefined$1(ctx)) {
          activeCtx = await _processContext({
            activeCtx,
            localCtx: ctx,
            options,
            propagate: false
          });
        }
      }
    }
  }

  // process each key and value in element, ignoring @nest content
  let rval = {};
  await _expandObject({
    activeCtx,
    activeProperty,
    expandedActiveProperty,
    element,
    expandedParent: rval,
    options,
    insideList,
    typeKey,
    typeScopedContext,
    expansionMap});

  // get property count on expanded output
  keys = Object.keys(rval);
  let count = keys.length;

  if('@value' in rval) {
    // @value must only have @language or @type
    if('@type' in rval && ('@language' in rval || '@direction' in rval)) {
      throw new JsonLdError_1(
        'Invalid JSON-LD syntax; an element containing "@value" may not ' +
        'contain both "@type" and either "@language" or "@direction".',
        'jsonld.SyntaxError', {code: 'invalid value object', element: rval});
    }
    let validCount = count - 1;
    if('@type' in rval) {
      validCount -= 1;
    }
    if('@index' in rval) {
      validCount -= 1;
    }
    if('@language' in rval) {
      validCount -= 1;
    }
    if('@direction' in rval) {
      validCount -= 1;
    }
    if(validCount !== 0) {
      throw new JsonLdError_1(
        'Invalid JSON-LD syntax; an element containing "@value" may only ' +
        'have an "@index" property and either "@type" ' +
        'or either or both "@language" or "@direction".',
        'jsonld.SyntaxError', {code: 'invalid value object', element: rval});
    }
    const values = rval['@value'] === null ? [] : _asArray$2(rval['@value']);
    const types = _getValues(rval, '@type');

    // drop null @values unless custom mapped
    if(_processingMode(activeCtx, 1.1) && types.includes('@json') &&
      types.length === 1) ; else if(values.length === 0) {
      const mapped = await expansionMap({
        unmappedValue: rval,
        activeCtx,
        activeProperty,
        element,
        options,
        insideList
      });
      if(mapped !== undefined) {
        rval = mapped;
      } else {
        rval = null;
      }
    } else if(!values.every(v => (_isString$2(v) || _isEmptyObject(v))) &&
      '@language' in rval) {
      // if @language is present, @value must be a string
      throw new JsonLdError_1(
        'Invalid JSON-LD syntax; only strings may be language-tagged.',
        'jsonld.SyntaxError',
        {code: 'invalid language-tagged value', element: rval});
    } else if(!types.every(t =>
      (_isAbsoluteIri$1(t) && !(_isString$2(t) && t.indexOf('_:') === 0) ||
      _isEmptyObject(t)))) {
      throw new JsonLdError_1(
        'Invalid JSON-LD syntax; an element containing "@value" and "@type" ' +
        'must have an absolute IRI for the value of "@type".',
        'jsonld.SyntaxError', {code: 'invalid typed value', element: rval});
    }
  } else if('@type' in rval && !_isArray$2(rval['@type'])) {
    // convert @type to an array
    rval['@type'] = [rval['@type']];
  } else if('@set' in rval || '@list' in rval) {
    // handle @set and @list
    if(count > 1 && !(count === 2 && '@index' in rval)) {
      throw new JsonLdError_1(
        'Invalid JSON-LD syntax; if an element has the property "@set" ' +
        'or "@list", then it can have at most one other property that is ' +
        '"@index".', 'jsonld.SyntaxError',
        {code: 'invalid set or list object', element: rval});
    }
    // optimize away @set
    if('@set' in rval) {
      rval = rval['@set'];
      keys = Object.keys(rval);
      count = keys.length;
    }
  } else if(count === 1 && '@language' in rval) {
    // drop objects with only @language unless custom mapped
    const mapped = await expansionMap(rval, {
      unmappedValue: rval,
      activeCtx,
      activeProperty,
      element,
      options,
      insideList
    });
    if(mapped !== undefined) {
      rval = mapped;
    } else {
      rval = null;
    }
  }

  // drop certain top-level objects that do not occur in lists, unless custom
  // mapped
  if(_isObject$2(rval) &&
    !options.keepFreeFloatingNodes && !insideList &&
    (activeProperty === null || expandedActiveProperty === '@graph')) {
    // drop empty object, top-level @value/@list, or object with only @id
    if(count === 0 || '@value' in rval || '@list' in rval ||
      (count === 1 && '@id' in rval)) {
      const mapped = await expansionMap({
        unmappedValue: rval,
        activeCtx,
        activeProperty,
        element,
        options,
        insideList
      });
      if(mapped !== undefined) {
        rval = mapped;
      } else {
        rval = null;
      }
    }
  }

  return rval;
};

/**
 * Expand each key and value of element adding to result
 *
 * @param activeCtx the context to use.
 * @param activeProperty the property for the element.
 * @param expandedActiveProperty the expansion of activeProperty
 * @param element the element to expand.
 * @param expandedParent the expanded result into which to add values.
 * @param options the expansion options.
 * @param insideList true if the element is a list, false if not.
 * @param typeKey first key found expanding to @type.
 * @param typeScopedContext the context before reverting.
 * @param expansionMap(info) a function that can be used to custom map
 *          unmappable values (or to throw an error when they are detected);
 *          if this function returns `undefined` then the default behavior
 *          will be used.
 */
async function _expandObject({
  activeCtx,
  activeProperty,
  expandedActiveProperty,
  element,
  expandedParent,
  options = {},
  insideList,
  typeKey,
  typeScopedContext,
  expansionMap
}) {
  const keys = Object.keys(element).sort();
  const nests = [];
  let unexpandedValue;

  // Figure out if this is the type for a JSON literal
  const isJsonType = element[typeKey] &&
    _expandIri$1(activeCtx,
      (_isArray$2(element[typeKey]) ? element[typeKey][0] : element[typeKey]),
      {vocab: true}, options) === '@json';

  for(const key of keys) {
    let value = element[key];
    let expandedValue;

    // skip @context
    if(key === '@context') {
      continue;
    }

    // expand property
    let expandedProperty = _expandIri$1(activeCtx, key, {vocab: true}, options);

    // drop non-absolute IRI keys that aren't keywords unless custom mapped
    if(expandedProperty === null ||
      !(_isAbsoluteIri$1(expandedProperty) || _isKeyword(expandedProperty))) {
      // TODO: use `await` to support async
      expandedProperty = expansionMap({
        unmappedProperty: key,
        activeCtx,
        activeProperty,
        parent: element,
        options,
        insideList,
        value,
        expandedParent
      });
      if(expandedProperty === undefined) {
        continue;
      }
    }

    if(_isKeyword(expandedProperty)) {
      if(expandedActiveProperty === '@reverse') {
        throw new JsonLdError_1(
          'Invalid JSON-LD syntax; a keyword cannot be used as a @reverse ' +
          'property.', 'jsonld.SyntaxError',
          {code: 'invalid reverse property map', value});
      }
      if(expandedProperty in expandedParent &&
         expandedProperty !== '@included' &&
         expandedProperty !== '@type') {
        throw new JsonLdError_1(
          'Invalid JSON-LD syntax; colliding keywords detected.',
          'jsonld.SyntaxError',
          {code: 'colliding keywords', keyword: expandedProperty});
      }
    }

    // syntax error if @id is not a string
    if(expandedProperty === '@id') {
      if(!_isString$2(value)) {
        if(!options.isFrame) {
          throw new JsonLdError_1(
            'Invalid JSON-LD syntax; "@id" value must a string.',
            'jsonld.SyntaxError', {code: 'invalid @id value', value});
        }
        if(_isObject$2(value)) {
          // empty object is a wildcard
          if(!_isEmptyObject(value)) {
            throw new JsonLdError_1(
              'Invalid JSON-LD syntax; "@id" value an empty object or array ' +
              'of strings, if framing',
              'jsonld.SyntaxError', {code: 'invalid @id value', value});
          }
        } else if(_isArray$2(value)) {
          if(!value.every(v => _isString$2(v))) {
            throw new JsonLdError_1(
              'Invalid JSON-LD syntax; "@id" value an empty object or array ' +
              'of strings, if framing',
              'jsonld.SyntaxError', {code: 'invalid @id value', value});
          }
        } else {
          throw new JsonLdError_1(
            'Invalid JSON-LD syntax; "@id" value an empty object or array ' +
            'of strings, if framing',
            'jsonld.SyntaxError', {code: 'invalid @id value', value});
        }
      }

      _addValue(
        expandedParent, '@id',
        _asArray$2(value).map(v =>
          _isString$2(v) ? _expandIri$1(activeCtx, v, {base: true}, options) : v),
        {propertyIsArray: options.isFrame});
      continue;
    }

    if(expandedProperty === '@type') {
      // if framing, can be a default object, but need to expand
      // key to determine that
      if(_isObject$2(value)) {
        value = Object.fromEntries(Object.entries(value).map(([k, v]) => [
          _expandIri$1(typeScopedContext, k, {vocab: true}),
          _asArray$2(v).map(vv =>
            _expandIri$1(typeScopedContext, vv, {base: true, vocab: true})
          )
        ]));
      }
      _validateTypeValue(value, options.isFrame);
      _addValue(
        expandedParent, '@type',
        _asArray$2(value).map(v =>
          _isString$2(v) ?
            _expandIri$1(typeScopedContext, v,
              {base: true, vocab: true}, options) : v),
        {propertyIsArray: options.isFrame});
      continue;
    }

    // Included blocks are treated as an array of separate object nodes sharing
    // the same referencing active_property.
    // For 1.0, it is skipped as are other unknown keywords
    if(expandedProperty === '@included' && _processingMode(activeCtx, 1.1)) {
      const includedResult = _asArray$2(await api$8.expand({
        activeCtx,
        activeProperty,
        element: value,
        options,
        expansionMap
      }));

      // Expanded values must be node objects
      if(!includedResult.every(v => _isSubject(v))) {
        throw new JsonLdError_1(
          'Invalid JSON-LD syntax; ' +
          'values of @included must expand to node objects.',
          'jsonld.SyntaxError', {code: 'invalid @included value', value});
      }

      _addValue(
        expandedParent, '@included', includedResult, {propertyIsArray: true});
      continue;
    }

    // @graph must be an array or an object
    if(expandedProperty === '@graph' &&
      !(_isObject$2(value) || _isArray$2(value))) {
      throw new JsonLdError_1(
        'Invalid JSON-LD syntax; "@graph" value must not be an ' +
        'object or an array.',
        'jsonld.SyntaxError', {code: 'invalid @graph value', value});
    }

    if(expandedProperty === '@value') {
      // capture value for later
      // "colliding keywords" check prevents this from being set twice
      unexpandedValue = value;
      if(isJsonType && _processingMode(activeCtx, 1.1)) {
        // no coercion to array, and retain all values
        expandedParent['@value'] = value;
      } else {
        _addValue(
          expandedParent, '@value', value, {propertyIsArray: options.isFrame});
      }
      continue;
    }

    // @language must be a string
    // it should match BCP47
    if(expandedProperty === '@language') {
      if(value === null) {
        // drop null @language values, they expand as if they didn't exist
        continue;
      }
      if(!_isString$2(value) && !options.isFrame) {
        throw new JsonLdError_1(
          'Invalid JSON-LD syntax; "@language" value must be a string.',
          'jsonld.SyntaxError',
          {code: 'invalid language-tagged string', value});
      }
      // ensure language value is lowercase
      value = _asArray$2(value).map(v => _isString$2(v) ? v.toLowerCase() : v);

      // ensure language tag matches BCP47
      for(const lang of value) {
        if(_isString$2(lang) && !lang.match(REGEX_BCP47)) {
          console.warn(`@language must be valid BCP47: ${lang}`);
        }
      }

      _addValue(
        expandedParent, '@language', value, {propertyIsArray: options.isFrame});
      continue;
    }

    // @direction must be "ltr" or "rtl"
    if(expandedProperty === '@direction') {
      if(!_isString$2(value) && !options.isFrame) {
        throw new JsonLdError_1(
          'Invalid JSON-LD syntax; "@direction" value must be a string.',
          'jsonld.SyntaxError',
          {code: 'invalid base direction', value});
      }

      value = _asArray$2(value);

      // ensure direction is "ltr" or "rtl"
      for(const dir of value) {
        if(_isString$2(dir) && dir !== 'ltr' && dir !== 'rtl') {
          throw new JsonLdError_1(
            'Invalid JSON-LD syntax; "@direction" must be "ltr" or "rtl".',
            'jsonld.SyntaxError',
            {code: 'invalid base direction', value});
        }
      }

      _addValue(
        expandedParent, '@direction', value,
        {propertyIsArray: options.isFrame});
      continue;
    }

    // @index must be a string
    if(expandedProperty === '@index') {
      if(!_isString$2(value)) {
        throw new JsonLdError_1(
          'Invalid JSON-LD syntax; "@index" value must be a string.',
          'jsonld.SyntaxError',
          {code: 'invalid @index value', value});
      }
      _addValue(expandedParent, '@index', value);
      continue;
    }

    // @reverse must be an object
    if(expandedProperty === '@reverse') {
      if(!_isObject$2(value)) {
        throw new JsonLdError_1(
          'Invalid JSON-LD syntax; "@reverse" value must be an object.',
          'jsonld.SyntaxError', {code: 'invalid @reverse value', value});
      }

      expandedValue = await api$8.expand({
        activeCtx,
        activeProperty:
        '@reverse',
        element: value,
        options,
        expansionMap
      });
      // properties double-reversed
      if('@reverse' in expandedValue) {
        for(const property in expandedValue['@reverse']) {
          _addValue(
            expandedParent, property, expandedValue['@reverse'][property],
            {propertyIsArray: true});
        }
      }

      // FIXME: can this be merged with code below to simplify?
      // merge in all reversed properties
      let reverseMap = expandedParent['@reverse'] || null;
      for(const property in expandedValue) {
        if(property === '@reverse') {
          continue;
        }
        if(reverseMap === null) {
          reverseMap = expandedParent['@reverse'] = {};
        }
        _addValue(reverseMap, property, [], {propertyIsArray: true});
        const items = expandedValue[property];
        for(let ii = 0; ii < items.length; ++ii) {
          const item = items[ii];
          if(_isValue(item) || _isList(item)) {
            throw new JsonLdError_1(
              'Invalid JSON-LD syntax; "@reverse" value must not be a ' +
              '@value or an @list.', 'jsonld.SyntaxError',
              {code: 'invalid reverse property value', value: expandedValue});
          }
          _addValue(reverseMap, property, item, {propertyIsArray: true});
        }
      }

      continue;
    }

    // nested keys
    if(expandedProperty === '@nest') {
      nests.push(key);
      continue;
    }

    // use potential scoped context for key
    let termCtx = activeCtx;
    const ctx = _getContextValue(activeCtx, key, '@context');
    if(!_isUndefined$1(ctx)) {
      termCtx = await _processContext({
        activeCtx,
        localCtx: ctx,
        propagate: true,
        overrideProtected: true,
        options
      });
    }

    const container = _getContextValue(termCtx, key, '@container') || [];

    if(container.includes('@language') && _isObject$2(value)) {
      const direction = _getContextValue(termCtx, key, '@direction');
      // handle language map container (skip if value is not an object)
      expandedValue = _expandLanguageMap(termCtx, value, direction, options);
    } else if(container.includes('@index') && _isObject$2(value)) {
      // handle index container (skip if value is not an object)
      const asGraph = container.includes('@graph');
      const indexKey = _getContextValue(termCtx, key, '@index') || '@index';
      const propertyIndex = indexKey !== '@index' &&
        _expandIri$1(activeCtx, indexKey, {vocab: true}, options);

      expandedValue = await _expandIndexMap({
        activeCtx: termCtx,
        options,
        activeProperty: key,
        value,
        expansionMap,
        asGraph,
        indexKey,
        propertyIndex
      });
    } else if(container.includes('@id') && _isObject$2(value)) {
      // handle id container (skip if value is not an object)
      const asGraph = container.includes('@graph');
      expandedValue = await _expandIndexMap({
        activeCtx: termCtx,
        options,
        activeProperty: key,
        value,
        expansionMap,
        asGraph,
        indexKey: '@id'
      });
    } else if(container.includes('@type') && _isObject$2(value)) {
      // handle type container (skip if value is not an object)
      expandedValue = await _expandIndexMap({
        // since container is `@type`, revert type scoped context when expanding
        activeCtx: termCtx.revertToPreviousContext(),
        options,
        activeProperty: key,
        value,
        expansionMap,
        asGraph: false,
        indexKey: '@type'
      });
    } else {
      // recurse into @list or @set
      const isList = (expandedProperty === '@list');
      if(isList || expandedProperty === '@set') {
        let nextActiveProperty = activeProperty;
        if(isList && expandedActiveProperty === '@graph') {
          nextActiveProperty = null;
        }
        expandedValue = await api$8.expand({
          activeCtx: termCtx,
          activeProperty: nextActiveProperty,
          element: value,
          options,
          insideList: isList,
          expansionMap
        });
      } else if(
        _getContextValue(activeCtx, key, '@type') === '@json') {
        expandedValue = {
          '@type': '@json',
          '@value': value
        };
      } else {
        // recursively expand value with key as new active property
        expandedValue = await api$8.expand({
          activeCtx: termCtx,
          activeProperty: key,
          element: value,
          options,
          insideList: false,
          expansionMap
        });
      }
    }

    // drop null values if property is not @value
    if(expandedValue === null && expandedProperty !== '@value') {
      // TODO: use `await` to support async
      expandedValue = expansionMap({
        unmappedValue: value,
        expandedProperty,
        activeCtx: termCtx,
        activeProperty,
        parent: element,
        options,
        insideList,
        key,
        expandedParent
      });
      if(expandedValue === undefined) {
        continue;
      }
    }

    // convert expanded value to @list if container specifies it
    if(expandedProperty !== '@list' && !_isList(expandedValue) &&
      container.includes('@list')) {
      // ensure expanded value in @list is an array
      expandedValue = {'@list': _asArray$2(expandedValue)};
    }

    // convert expanded value to @graph if container specifies it
    // and value is not, itself, a graph
    // index cases handled above
    if(container.includes('@graph') &&
      !container.some(key => key === '@id' || key === '@index')) {
      // ensure expanded values are arrays
      expandedValue = _asArray$2(expandedValue)
        .map(v => ({'@graph': _asArray$2(v)}));
    }

    // FIXME: can this be merged with code above to simplify?
    // merge in reverse properties
    if(termCtx.mappings.has(key) && termCtx.mappings.get(key).reverse) {
      const reverseMap =
        expandedParent['@reverse'] = expandedParent['@reverse'] || {};
      expandedValue = _asArray$2(expandedValue);
      for(let ii = 0; ii < expandedValue.length; ++ii) {
        const item = expandedValue[ii];
        if(_isValue(item) || _isList(item)) {
          throw new JsonLdError_1(
            'Invalid JSON-LD syntax; "@reverse" value must not be a ' +
            '@value or an @list.', 'jsonld.SyntaxError',
            {code: 'invalid reverse property value', value: expandedValue});
        }
        _addValue(reverseMap, expandedProperty, item, {propertyIsArray: true});
      }
      continue;
    }

    // add value for property
    // special keywords handled above
    _addValue(expandedParent, expandedProperty, expandedValue, {
      propertyIsArray: true
    });
  }

  // @value must not be an object or an array (unless framing) or if @type is
  // @json
  if('@value' in expandedParent) {
    if(expandedParent['@type'] === '@json' && _processingMode(activeCtx, 1.1)) ; else if((_isObject$2(unexpandedValue) || _isArray$2(unexpandedValue)) &&
      !options.isFrame) {
      throw new JsonLdError_1(
        'Invalid JSON-LD syntax; "@value" value must not be an ' +
        'object or an array.',
        'jsonld.SyntaxError',
        {code: 'invalid value object value', value: unexpandedValue});
    }
  }

  // expand each nested key
  for(const key of nests) {
    const nestedValues = _isArray$2(element[key]) ? element[key] : [element[key]];
    for(const nv of nestedValues) {
      if(!_isObject$2(nv) || Object.keys(nv).some(k =>
        _expandIri$1(activeCtx, k, {vocab: true}, options) === '@value')) {
        throw new JsonLdError_1(
          'Invalid JSON-LD syntax; nested value must be a node object.',
          'jsonld.SyntaxError',
          {code: 'invalid @nest value', value: nv});
      }
      await _expandObject({
        activeCtx,
        activeProperty,
        expandedActiveProperty,
        element: nv,
        expandedParent,
        options,
        insideList,
        typeScopedContext,
        typeKey,
        expansionMap});
    }
  }
}

/**
 * Expands the given value by using the coercion and keyword rules in the
 * given context.
 *
 * @param activeCtx the active context to use.
 * @param activeProperty the active property the value is associated with.
 * @param value the value to expand.
 * @param {Object} [options] - processing options.
 *
 * @return the expanded value.
 */
function _expandValue({activeCtx, activeProperty, value, options}) {
  // nothing to expand
  if(value === null || value === undefined) {
    return null;
  }

  // special-case expand @id and @type (skips '@id' expansion)
  const expandedProperty = _expandIri$1(
    activeCtx, activeProperty, {vocab: true}, options);
  if(expandedProperty === '@id') {
    return _expandIri$1(activeCtx, value, {base: true}, options);
  } else if(expandedProperty === '@type') {
    return _expandIri$1(activeCtx, value, {vocab: true, base: true}, options);
  }

  // get type definition from context
  const type = _getContextValue(activeCtx, activeProperty, '@type');

  // do @id expansion (automatic for @graph)
  if((type === '@id' || expandedProperty === '@graph') && _isString$2(value)) {
    return {'@id': _expandIri$1(activeCtx, value, {base: true}, options)};
  }
  // do @id expansion w/vocab
  if(type === '@vocab' && _isString$2(value)) {
    return {
      '@id': _expandIri$1(activeCtx, value, {vocab: true, base: true}, options)
    };
  }

  // do not expand keyword values
  if(_isKeyword(expandedProperty)) {
    return value;
  }

  const rval = {};

  if(type && !['@id', '@vocab', '@none'].includes(type)) {
    // other type
    rval['@type'] = type;
  } else if(_isString$2(value)) {
    // check for language tagging for strings
    const language = _getContextValue(activeCtx, activeProperty, '@language');
    if(language !== null) {
      rval['@language'] = language;
    }
    const direction = _getContextValue(activeCtx, activeProperty, '@direction');
    if(direction !== null) {
      rval['@direction'] = direction;
    }
  }
  // do conversion of values that aren't basic JSON types to strings
  if(!['boolean', 'number', 'string'].includes(typeof value)) {
    value = value.toString();
  }
  rval['@value'] = value;

  return rval;
}

/**
 * Expands a language map.
 *
 * @param activeCtx the active context to use.
 * @param languageMap the language map to expand.
 * @param direction the direction to apply to values.
 * @param {Object} [options] - processing options.
 *
 * @return the expanded language map.
 */
function _expandLanguageMap(activeCtx, languageMap, direction, options) {
  const rval = [];
  const keys = Object.keys(languageMap).sort();
  for(const key of keys) {
    const expandedKey = _expandIri$1(activeCtx, key, {vocab: true}, options);
    let val = languageMap[key];
    if(!_isArray$2(val)) {
      val = [val];
    }
    for(const item of val) {
      if(item === null) {
        // null values are allowed (8.5) but ignored (3.1)
        continue;
      }
      if(!_isString$2(item)) {
        throw new JsonLdError_1(
          'Invalid JSON-LD syntax; language map values must be strings.',
          'jsonld.SyntaxError',
          {code: 'invalid language map value', languageMap});
      }
      const val = {'@value': item};
      if(expandedKey !== '@none') {
        val['@language'] = key.toLowerCase();
      }
      if(direction) {
        val['@direction'] = direction;
      }
      rval.push(val);
    }
  }
  return rval;
}

async function _expandIndexMap(
  {activeCtx, options, activeProperty, value, expansionMap, asGraph,
    indexKey, propertyIndex}) {
  const rval = [];
  const keys = Object.keys(value).sort();
  const isTypeIndex = indexKey === '@type';
  for(let key of keys) {
    // if indexKey is @type, there may be a context defined for it
    if(isTypeIndex) {
      const ctx = _getContextValue(activeCtx, key, '@context');
      if(!_isUndefined$1(ctx)) {
        activeCtx = await _processContext({
          activeCtx,
          localCtx: ctx,
          propagate: false,
          options
        });
      }
    }

    let val = value[key];
    if(!_isArray$2(val)) {
      val = [val];
    }

    val = await api$8.expand({
      activeCtx,
      activeProperty,
      element: val,
      options,
      insideList: false,
      insideIndex: true,
      expansionMap
    });

    // expand for @type, but also for @none
    let expandedKey;
    if(propertyIndex) {
      if(key === '@none') {
        expandedKey = '@none';
      } else {
        expandedKey = _expandValue(
          {activeCtx, activeProperty: indexKey, value: key, options});
      }
    } else {
      expandedKey = _expandIri$1(activeCtx, key, {vocab: true}, options);
    }

    if(indexKey === '@id') {
      // expand document relative
      key = _expandIri$1(activeCtx, key, {base: true}, options);
    } else if(isTypeIndex) {
      key = expandedKey;
    }

    for(let item of val) {
      // If this is also a @graph container, turn items into graphs
      if(asGraph && !_isGraph(item)) {
        item = {'@graph': [item]};
      }
      if(indexKey === '@type') {
        if(expandedKey === '@none') ; else if(item['@type']) {
          item['@type'] = [key].concat(item['@type']);
        } else {
          item['@type'] = [key];
        }
      } else if(_isValue(item) &&
        !['@language', '@type', '@index'].includes(indexKey)) {
        throw new JsonLdError_1(
          'Invalid JSON-LD syntax; Attempt to add illegal key to value ' +
          `object: "${indexKey}".`,
          'jsonld.SyntaxError',
          {code: 'invalid value object', value: item});
      } else if(propertyIndex) {
        // index is a property to be expanded, and values interpreted for that
        // property
        if(expandedKey !== '@none') {
          // expand key as a value
          _addValue(item, propertyIndex, expandedKey, {
            propertyIsArray: true,
            prependValue: true
          });
        }
      } else if(expandedKey !== '@none' && !(indexKey in item)) {
        item[indexKey] = key;
      }
      rval.push(item);
    }
  }
  return rval;
}

const {isKeyword} = context;





const api$9 = {};
var nodeMap = api$9;

/**
 * Creates a merged JSON-LD node map (node ID => node).
 *
 * @param input the expanded JSON-LD to create a node map of.
 * @param [options] the options to use:
 *          [issuer] a jsonld.IdentifierIssuer to use to label blank nodes.
 *
 * @return the node map.
 */
api$9.createMergedNodeMap = (input, options) => {
  options = options || {};

  // produce a map of all subjects and name each bnode
  const issuer = options.issuer || new util$1.IdentifierIssuer('_:b');
  const graphs = {'@default': {}};
  api$9.createNodeMap(input, graphs, '@default', issuer);

  // add all non-default graphs to default graph
  return api$9.mergeNodeMaps(graphs);
};

/**
 * Recursively flattens the subjects in the given JSON-LD expanded input
 * into a node map.
 *
 * @param input the JSON-LD expanded input.
 * @param graphs a map of graph name to subject map.
 * @param graph the name of the current graph.
 * @param issuer the blank node identifier issuer.
 * @param name the name assigned to the current input if it is a bnode.
 * @param list the list to append to, null for none.
 */
api$9.createNodeMap = (input, graphs, graph, issuer, name, list) => {
  // recurse through array
  if(types.isArray(input)) {
    for(const node of input) {
      api$9.createNodeMap(node, graphs, graph, issuer, undefined, list);
    }
    return;
  }

  // add non-object to list
  if(!types.isObject(input)) {
    if(list) {
      list.push(input);
    }
    return;
  }

  // add values to list
  if(graphTypes.isValue(input)) {
    if('@type' in input) {
      let type = input['@type'];
      // rename @type blank node
      if(type.indexOf('_:') === 0) {
        input['@type'] = type = issuer.getId(type);
      }
    }
    if(list) {
      list.push(input);
    }
    return;
  } else if(list && graphTypes.isList(input)) {
    const _list = [];
    api$9.createNodeMap(input['@list'], graphs, graph, issuer, name, _list);
    list.push({'@list': _list});
    return;
  }

  // Note: At this point, input must be a subject.

  // spec requires @type to be named first, so assign names early
  if('@type' in input) {
    const types = input['@type'];
    for(const type of types) {
      if(type.indexOf('_:') === 0) {
        issuer.getId(type);
      }
    }
  }

  // get name for subject
  if(types.isUndefined(name)) {
    name = graphTypes.isBlankNode(input) ?
      issuer.getId(input['@id']) : input['@id'];
  }

  // add subject reference to list
  if(list) {
    list.push({'@id': name});
  }

  // create new subject or merge into existing one
  const subjects = graphs[graph];
  const subject = subjects[name] = subjects[name] || {};
  subject['@id'] = name;
  const properties = Object.keys(input).sort();
  for(let property of properties) {
    // skip @id
    if(property === '@id') {
      continue;
    }

    // handle reverse properties
    if(property === '@reverse') {
      const referencedNode = {'@id': name};
      const reverseMap = input['@reverse'];
      for(const reverseProperty in reverseMap) {
        const items = reverseMap[reverseProperty];
        for(const item of items) {
          let itemName = item['@id'];
          if(graphTypes.isBlankNode(item)) {
            itemName = issuer.getId(itemName);
          }
          api$9.createNodeMap(item, graphs, graph, issuer, itemName);
          util$1.addValue(
            subjects[itemName], reverseProperty, referencedNode,
            {propertyIsArray: true, allowDuplicate: false});
        }
      }
      continue;
    }

    // recurse into graph
    if(property === '@graph') {
      // add graph subjects map entry
      if(!(name in graphs)) {
        graphs[name] = {};
      }
      api$9.createNodeMap(input[property], graphs, name, issuer);
      continue;
    }

    // recurse into included
    if(property === '@included') {
      api$9.createNodeMap(input[property], graphs, graph, issuer);
      continue;
    }

    // copy non-@type keywords
    if(property !== '@type' && isKeyword(property)) {
      if(property === '@index' && property in subject &&
        (input[property] !== subject[property] ||
        input[property]['@id'] !== subject[property]['@id'])) {
        throw new JsonLdError_1(
          'Invalid JSON-LD syntax; conflicting @index property detected.',
          'jsonld.SyntaxError',
          {code: 'conflicting indexes', subject});
      }
      subject[property] = input[property];
      continue;
    }

    // iterate over objects
    const objects = input[property];

    // if property is a bnode, assign it a new id
    if(property.indexOf('_:') === 0) {
      property = issuer.getId(property);
    }

    // ensure property is added for empty arrays
    if(objects.length === 0) {
      util$1.addValue(subject, property, [], {propertyIsArray: true});
      continue;
    }
    for(let o of objects) {
      if(property === '@type') {
        // rename @type blank nodes
        o = (o.indexOf('_:') === 0) ? issuer.getId(o) : o;
      }

      // handle embedded subject or subject reference
      if(graphTypes.isSubject(o) || graphTypes.isSubjectReference(o)) {
        // skip null @id
        if('@id' in o && !o['@id']) {
          continue;
        }

        // relabel blank node @id
        const id = graphTypes.isBlankNode(o) ?
          issuer.getId(o['@id']) : o['@id'];

        // add reference and recurse
        util$1.addValue(
          subject, property, {'@id': id},
          {propertyIsArray: true, allowDuplicate: false});
        api$9.createNodeMap(o, graphs, graph, issuer, id);
      } else if(graphTypes.isValue(o)) {
        util$1.addValue(
          subject, property, o,
          {propertyIsArray: true, allowDuplicate: false});
      } else if(graphTypes.isList(o)) {
        // handle @list
        const _list = [];
        api$9.createNodeMap(o['@list'], graphs, graph, issuer, name, _list);
        o = {'@list': _list};
        util$1.addValue(
          subject, property, o,
          {propertyIsArray: true, allowDuplicate: false});
      } else {
        // handle @value
        api$9.createNodeMap(o, graphs, graph, issuer, name);
        util$1.addValue(
          subject, property, o, {propertyIsArray: true, allowDuplicate: false});
      }
    }
  }
};

/**
 * Merge separate named graphs into a single merged graph including
 * all nodes from the default graph and named graphs.
 *
 * @param graphs a map of graph name to subject map.
 *
 * @return the merged graph map.
 */
api$9.mergeNodeMapGraphs = graphs => {
  const merged = {};
  for(const name of Object.keys(graphs).sort()) {
    for(const id of Object.keys(graphs[name]).sort()) {
      const node = graphs[name][id];
      if(!(id in merged)) {
        merged[id] = {'@id': id};
      }
      const mergedNode = merged[id];

      for(const property of Object.keys(node).sort()) {
        if(isKeyword(property) && property !== '@type') {
          // copy keywords
          mergedNode[property] = util$1.clone(node[property]);
        } else {
          // merge objects
          for(const value of node[property]) {
            util$1.addValue(
              mergedNode, property, util$1.clone(value),
              {propertyIsArray: true, allowDuplicate: false});
          }
        }
      }
    }
  }

  return merged;
};

api$9.mergeNodeMaps = graphs => {
  // add all non-default graphs to default graph
  const defaultGraph = graphs['@default'];
  const graphNames = Object.keys(graphs).sort();
  for(const graphName of graphNames) {
    if(graphName === '@default') {
      continue;
    }
    const nodeMap = graphs[graphName];
    let subject = defaultGraph[graphName];
    if(!subject) {
      defaultGraph[graphName] = subject = {
        '@id': graphName,
        '@graph': []
      };
    } else if(!('@graph' in subject)) {
      subject['@graph'] = [];
    }
    const graph = subject['@graph'];
    for(const id of Object.keys(nodeMap).sort()) {
      const node = nodeMap[id];
      // only add full subjects
      if(!graphTypes.isSubjectReference(node)) {
        graph.push(node);
      }
    }
  }
  return defaultGraph;
};

const {
  isSubjectReference: _isSubjectReference
} = graphTypes;

const {
  createMergedNodeMap: _createMergedNodeMap
} = nodeMap;

const api$a = {};
var flatten = api$a;

/**
 * Performs JSON-LD flattening.
 *
 * @param input the expanded JSON-LD to flatten.
 *
 * @return the flattened output.
 */
api$a.flatten = input => {
  const defaultGraph = _createMergedNodeMap(input);

  // produce flattened output
  const flattened = [];
  const keys = Object.keys(defaultGraph).sort();
  for(let ki = 0; ki < keys.length; ++ki) {
    const node = defaultGraph[keys[ki]];
    // only add full subjects to top-level
    if(!_isSubjectReference(node)) {
      flattened.push(node);
    }
  }
  return flattened;
};

// constants
const {
  // RDF,
  RDF_LIST,
  RDF_FIRST,
  RDF_REST,
  RDF_NIL,
  RDF_TYPE,
  // RDF_PLAIN_LITERAL,
  // RDF_XML_LITERAL,
  RDF_JSON_LITERAL,
  // RDF_OBJECT,
  // RDF_LANGSTRING,

  // XSD,
  XSD_BOOLEAN,
  XSD_DOUBLE,
  XSD_INTEGER,
  XSD_STRING: XSD_STRING$2,
} = constants;

const REGEX_BCP47$1 = /^[a-zA-Z]{1,8}(-[a-zA-Z0-9]{1,8})*$/;

const api$b = {};
var fromRdf = api$b;

/**
 * Converts an RDF dataset to JSON-LD.
 *
 * @param dataset the RDF dataset.
 * @param options the RDF serialization options.
 *
 * @return a Promise that resolves to the JSON-LD output.
 */
api$b.fromRDF = async (
  dataset,
  {
    useRdfType = false,
    useNativeTypes = false,
    rdfDirection = null
  }
) => {
  const defaultGraph = {};
  const graphMap = {'@default': defaultGraph};
  const referencedOnce = {};

  for(const quad of dataset) {
    // TODO: change 'name' to 'graph'
    const name = (quad.graph.termType === 'DefaultGraph') ?
      '@default' : quad.graph.value;
    if(!(name in graphMap)) {
      graphMap[name] = {};
    }
    if(name !== '@default' && !(name in defaultGraph)) {
      defaultGraph[name] = {'@id': name};
    }

    const nodeMap = graphMap[name];

    // get subject, predicate, object
    const s = quad.subject.value;
    const p = quad.predicate.value;
    const o = quad.object;

    if(!(s in nodeMap)) {
      nodeMap[s] = {'@id': s};
    }
    const node = nodeMap[s];

    const objectIsNode = o.termType.endsWith('Node');
    if(objectIsNode && !(o.value in nodeMap)) {
      nodeMap[o.value] = {'@id': o.value};
    }

    if(p === RDF_TYPE && !useRdfType && objectIsNode) {
      util$1.addValue(node, '@type', o.value, {propertyIsArray: true});
      continue;
    }

    const value = _RDFToObject(o, useNativeTypes, rdfDirection);
    util$1.addValue(node, p, value, {propertyIsArray: true});

    // object may be an RDF list/partial list node but we can't know easily
    // until all triples are read
    if(objectIsNode) {
      if(o.value === RDF_NIL) {
        // track rdf:nil uniquely per graph
        const object = nodeMap[o.value];
        if(!('usages' in object)) {
          object.usages = [];
        }
        object.usages.push({
          node,
          property: p,
          value
        });
      } else if(o.value in referencedOnce) {
        // object referenced more than once
        referencedOnce[o.value] = false;
      } else {
        // keep track of single reference
        referencedOnce[o.value] = {
          node,
          property: p,
          value
        };
      }
    }
  }

  /*
  for(let name in dataset) {
    const graph = dataset[name];
    if(!(name in graphMap)) {
      graphMap[name] = {};
    }
    if(name !== '@default' && !(name in defaultGraph)) {
      defaultGraph[name] = {'@id': name};
    }
    const nodeMap = graphMap[name];
    for(let ti = 0; ti < graph.length; ++ti) {
      const triple = graph[ti];

      // get subject, predicate, object
      const s = triple.subject.value;
      const p = triple.predicate.value;
      const o = triple.object;

      if(!(s in nodeMap)) {
        nodeMap[s] = {'@id': s};
      }
      const node = nodeMap[s];

      const objectIsId = (o.type === 'IRI' || o.type === 'blank node');
      if(objectIsId && !(o.value in nodeMap)) {
        nodeMap[o.value] = {'@id': o.value};
      }

      if(p === RDF_TYPE && !useRdfType && objectIsId) {
        util.addValue(node, '@type', o.value, {propertyIsArray: true});
        continue;
      }

      const value = _RDFToObject(o, useNativeTypes);
      util.addValue(node, p, value, {propertyIsArray: true});

      // object may be an RDF list/partial list node but we can't know easily
      // until all triples are read
      if(objectIsId) {
        if(o.value === RDF_NIL) {
          // track rdf:nil uniquely per graph
          const object = nodeMap[o.value];
          if(!('usages' in object)) {
            object.usages = [];
          }
          object.usages.push({
            node: node,
            property: p,
            value: value
          });
        } else if(o.value in referencedOnce) {
          // object referenced more than once
          referencedOnce[o.value] = false;
        } else {
          // keep track of single reference
          referencedOnce[o.value] = {
            node: node,
            property: p,
            value: value
          };
        }
      }
    }
  }*/

  // convert linked lists to @list arrays
  for(const name in graphMap) {
    const graphObject = graphMap[name];

    // no @lists to be converted, continue
    if(!(RDF_NIL in graphObject)) {
      continue;
    }

    // iterate backwards through each RDF list
    const nil = graphObject[RDF_NIL];
    if(!nil.usages) {
      continue;
    }
    for(let usage of nil.usages) {
      let node = usage.node;
      let property = usage.property;
      let head = usage.value;
      const list = [];
      const listNodes = [];

      // ensure node is a well-formed list node; it must:
      // 1. Be referenced only once.
      // 2. Have an array for rdf:first that has 1 item.
      // 3. Have an array for rdf:rest that has 1 item.
      // 4. Have no keys other than: @id, rdf:first, rdf:rest, and,
      //   optionally, @type where the value is rdf:List.
      let nodeKeyCount = Object.keys(node).length;
      while(property === RDF_REST &&
        types.isObject(referencedOnce[node['@id']]) &&
        types.isArray(node[RDF_FIRST]) && node[RDF_FIRST].length === 1 &&
        types.isArray(node[RDF_REST]) && node[RDF_REST].length === 1 &&
        (nodeKeyCount === 3 ||
          (nodeKeyCount === 4 && types.isArray(node['@type']) &&
          node['@type'].length === 1 && node['@type'][0] === RDF_LIST))) {
        list.push(node[RDF_FIRST][0]);
        listNodes.push(node['@id']);

        // get next node, moving backwards through list
        usage = referencedOnce[node['@id']];
        node = usage.node;
        property = usage.property;
        head = usage.value;
        nodeKeyCount = Object.keys(node).length;

        // if node is not a blank node, then list head found
        if(!graphTypes.isBlankNode(node)) {
          break;
        }
      }

      // transform list into @list object
      delete head['@id'];
      head['@list'] = list.reverse();
      for(const listNode of listNodes) {
        delete graphObject[listNode];
      }
    }

    delete nil.usages;
  }

  const result = [];
  const subjects = Object.keys(defaultGraph).sort();
  for(const subject of subjects) {
    const node = defaultGraph[subject];
    if(subject in graphMap) {
      const graph = node['@graph'] = [];
      const graphObject = graphMap[subject];
      const graphSubjects = Object.keys(graphObject).sort();
      for(const graphSubject of graphSubjects) {
        const node = graphObject[graphSubject];
        // only add full subjects to top-level
        if(!graphTypes.isSubjectReference(node)) {
          graph.push(node);
        }
      }
    }
    // only add full subjects to top-level
    if(!graphTypes.isSubjectReference(node)) {
      result.push(node);
    }
  }

  return result;
};

/**
 * Converts an RDF triple object to a JSON-LD object.
 *
 * @param o the RDF triple object to convert.
 * @param useNativeTypes true to output native types, false not to.
 *
 * @return the JSON-LD object.
 */
function _RDFToObject(o, useNativeTypes, rdfDirection) {
  // convert NamedNode/BlankNode object to JSON-LD
  if(o.termType.endsWith('Node')) {
    return {'@id': o.value};
  }

  // convert literal to JSON-LD
  const rval = {'@value': o.value};

  // add language
  if(o.language) {
    rval['@language'] = o.language;
  } else {
    let type = o.datatype.value;
    if(!type) {
      type = XSD_STRING$2;
    }
    if(type === RDF_JSON_LITERAL) {
      type = '@json';
      try {
        rval['@value'] = JSON.parse(rval['@value']);
      } catch(e) {
        throw new JsonLdError_1(
          'JSON literal could not be parsed.',
          'jsonld.InvalidJsonLiteral',
          {code: 'invalid JSON literal', value: rval['@value'], cause: e});
      }
    }
    // use native types for certain xsd types
    if(useNativeTypes) {
      if(type === XSD_BOOLEAN) {
        if(rval['@value'] === 'true') {
          rval['@value'] = true;
        } else if(rval['@value'] === 'false') {
          rval['@value'] = false;
        }
      } else if(types.isNumeric(rval['@value'])) {
        if(type === XSD_INTEGER) {
          const i = parseInt(rval['@value'], 10);
          if(i.toFixed(0) === rval['@value']) {
            rval['@value'] = i;
          }
        } else if(type === XSD_DOUBLE) {
          rval['@value'] = parseFloat(rval['@value']);
        }
      }
      // do not add native type
      if(![XSD_BOOLEAN, XSD_INTEGER, XSD_DOUBLE, XSD_STRING$2].includes(type)) {
        rval['@type'] = type;
      }
    } else if(rdfDirection === 'i18n-datatype' &&
      type.startsWith('https://www.w3.org/ns/i18n#')) {
      const [, language, direction] = type.split(/[#_]/);
      if(language.length > 0) {
        rval['@language'] = language;
        if(!language.match(REGEX_BCP47$1)) {
          console.warn(`@language must be valid BCP47: ${language}`);
        }
      }
      rval['@direction'] = direction;
    } else if(type !== XSD_STRING$2) {
      rval['@type'] = type;
    }
  }

  return rval;
}

/* jshint esversion: 6 */

var canonicalize = function (object) {
  return serialize(object);

  function serialize (object) {
    if (object === null || typeof object !== 'object' || object.toJSON != null) {
      return JSON.stringify(object);
    }
    if (Array.isArray(object) && object.length === 0) {
      return '[]';
    }
    if (Array.isArray(object) && object.length === 1) {
      return '[' + serialize(object[0]) + ']';
    }
    if (Array.isArray(object)) {
      return '[' + object.reduce((t, cv, ci) => {
        t = (ci === 1 ? serialize(t) : t);
        return t + ',' + serialize(cv);
      }) + ']';
    }
    const keys = Object.keys(object);
    if (keys.length === 0) {
      return '{}';
    }
    if (keys.length === 1) {
      return '{' + serialize(keys[0]) + ':' + serialize(object[keys[0]]) + '}';
    }
    return '{' + keys.sort().reduce((t, cv, ci) => {
      t = (ci === 1 ? serialize(t) + ':' + serialize(object[t]) : t);
      return t + ',' + serialize(cv) + ':' + serialize(object[cv]);
    }) + '}';
  }
};

const {createNodeMap} = nodeMap;
const {isKeyword: isKeyword$1} = context;





const {
  // RDF,
  // RDF_LIST,
  RDF_FIRST: RDF_FIRST$1,
  RDF_REST: RDF_REST$1,
  RDF_NIL: RDF_NIL$1,
  RDF_TYPE: RDF_TYPE$1,
  // RDF_PLAIN_LITERAL,
  // RDF_XML_LITERAL,
  RDF_JSON_LITERAL: RDF_JSON_LITERAL$1,
  // RDF_OBJECT,
  RDF_LANGSTRING: RDF_LANGSTRING$2,

  // XSD,
  XSD_BOOLEAN: XSD_BOOLEAN$1,
  XSD_DOUBLE: XSD_DOUBLE$1,
  XSD_INTEGER: XSD_INTEGER$1,
  XSD_STRING: XSD_STRING$3,
} = constants;

const {
  isAbsolute: _isAbsoluteIri$2
} = url;

const api$c = {};
var toRdf = api$c;

/**
 * Outputs an RDF dataset for the expanded JSON-LD input.
 *
 * @param input the expanded JSON-LD input.
 * @param options the RDF serialization options.
 *
 * @return the RDF dataset.
 */
api$c.toRDF = (input, options) => {
  // create node map for default graph (and any named graphs)
  const issuer = new util$1.IdentifierIssuer('_:b');
  const nodeMap = {'@default': {}};
  createNodeMap(input, nodeMap, '@default', issuer);

  const dataset = [];
  const graphNames = Object.keys(nodeMap).sort();
  for(const graphName of graphNames) {
    let graphTerm;
    if(graphName === '@default') {
      graphTerm = {termType: 'DefaultGraph', value: ''};
    } else if(_isAbsoluteIri$2(graphName)) {
      if(graphName.startsWith('_:')) {
        graphTerm = {termType: 'BlankNode'};
      } else {
        graphTerm = {termType: 'NamedNode'};
      }
      graphTerm.value = graphName;
    } else {
      // skip relative IRIs (not valid RDF)
      continue;
    }
    _graphToRDF(dataset, nodeMap[graphName], graphTerm, issuer, options);
  }

  return dataset;
};

/**
 * Adds RDF quads for a particular graph to the given dataset.
 *
 * @param dataset the dataset to append RDF quads to.
 * @param graph the graph to create RDF quads for.
 * @param graphTerm the graph term for each quad.
 * @param issuer a IdentifierIssuer for assigning blank node names.
 * @param options the RDF serialization options.
 *
 * @return the array of RDF triples for the given graph.
 */
function _graphToRDF(dataset, graph, graphTerm, issuer, options) {
  const ids = Object.keys(graph).sort();
  for(const id of ids) {
    const node = graph[id];
    const properties = Object.keys(node).sort();
    for(let property of properties) {
      const items = node[property];
      if(property === '@type') {
        property = RDF_TYPE$1;
      } else if(isKeyword$1(property)) {
        continue;
      }

      for(const item of items) {
        // RDF subject
        const subject = {
          termType: id.startsWith('_:') ? 'BlankNode' : 'NamedNode',
          value: id
        };

        // skip relative IRI subjects (not valid RDF)
        if(!_isAbsoluteIri$2(id)) {
          continue;
        }

        // RDF predicate
        const predicate = {
          termType: property.startsWith('_:') ? 'BlankNode' : 'NamedNode',
          value: property
        };

        // skip relative IRI predicates (not valid RDF)
        if(!_isAbsoluteIri$2(property)) {
          continue;
        }

        // skip blank node predicates unless producing generalized RDF
        if(predicate.termType === 'BlankNode' &&
          !options.produceGeneralizedRdf) {
          continue;
        }

        // convert list, value or node object to triple
        const object =
          _objectToRDF(item, issuer, dataset, graphTerm, options.rdfDirection);
        // skip null objects (they are relative IRIs)
        if(object) {
          dataset.push({
            subject,
            predicate,
            object,
            graph: graphTerm
          });
        }
      }
    }
  }
}

/**
 * Converts a @list value into linked list of blank node RDF quads
 * (an RDF collection).
 *
 * @param list the @list value.
 * @param issuer a IdentifierIssuer for assigning blank node names.
 * @param dataset the array of quads to append to.
 * @param graphTerm the graph term for each quad.
 *
 * @return the head of the list.
 */
function _listToRDF(list, issuer, dataset, graphTerm, rdfDirection) {
  const first = {termType: 'NamedNode', value: RDF_FIRST$1};
  const rest = {termType: 'NamedNode', value: RDF_REST$1};
  const nil = {termType: 'NamedNode', value: RDF_NIL$1};

  const last = list.pop();
  // Result is the head of the list
  const result = last ? {termType: 'BlankNode', value: issuer.getId()} : nil;
  let subject = result;

  for(const item of list) {
    const object = _objectToRDF(item, issuer, dataset, graphTerm, rdfDirection);
    const next = {termType: 'BlankNode', value: issuer.getId()};
    dataset.push({
      subject,
      predicate: first,
      object,
      graph: graphTerm
    });
    dataset.push({
      subject,
      predicate: rest,
      object: next,
      graph: graphTerm
    });
    subject = next;
  }

  // Tail of list
  if(last) {
    const object = _objectToRDF(last, issuer, dataset, graphTerm, rdfDirection);
    dataset.push({
      subject,
      predicate: first,
      object,
      graph: graphTerm
    });
    dataset.push({
      subject,
      predicate: rest,
      object: nil,
      graph: graphTerm
    });
  }

  return result;
}

/**
 * Converts a JSON-LD value object to an RDF literal or a JSON-LD string,
 * node object to an RDF resource, or adds a list.
 *
 * @param item the JSON-LD value or node object.
 * @param issuer a IdentifierIssuer for assigning blank node names.
 * @param dataset the dataset to append RDF quads to.
 * @param graphTerm the graph term for each quad.
 *
 * @return the RDF literal or RDF resource.
 */
function _objectToRDF(item, issuer, dataset, graphTerm, rdfDirection) {
  const object = {};

  // convert value object to RDF
  if(graphTypes.isValue(item)) {
    object.termType = 'Literal';
    object.value = undefined;
    object.datatype = {
      termType: 'NamedNode'
    };
    let value = item['@value'];
    const datatype = item['@type'] || null;

    // convert to XSD/JSON datatypes as appropriate
    if(datatype === '@json') {
      object.value = canonicalize(value);
      object.datatype.value = RDF_JSON_LITERAL$1;
    } else if(types.isBoolean(value)) {
      object.value = value.toString();
      object.datatype.value = datatype || XSD_BOOLEAN$1;
    } else if(types.isDouble(value) || datatype === XSD_DOUBLE$1) {
      if(!types.isDouble(value)) {
        value = parseFloat(value);
      }
      // canonical double representation
      object.value = value.toExponential(15).replace(/(\d)0*e\+?/, '$1E');
      object.datatype.value = datatype || XSD_DOUBLE$1;
    } else if(types.isNumber(value)) {
      object.value = value.toFixed(0);
      object.datatype.value = datatype || XSD_INTEGER$1;
    } else if(rdfDirection === 'i18n-datatype' &&
      '@direction' in item) {
      const datatype = 'https://www.w3.org/ns/i18n#' +
        (item['@language'] || '') +
        `_${item['@direction']}`;
      object.datatype.value = datatype;
      object.value = value;
    } else if('@language' in item) {
      object.value = value;
      object.datatype.value = datatype || RDF_LANGSTRING$2;
      object.language = item['@language'];
    } else {
      object.value = value;
      object.datatype.value = datatype || XSD_STRING$3;
    }
  } else if(graphTypes.isList(item)) {
    const _list =
      _listToRDF(item['@list'], issuer, dataset, graphTerm, rdfDirection);
    object.termType = _list.termType;
    object.value = _list.value;
  } else {
    // convert string/node object to RDF
    const id = types.isObject(item) ? item['@id'] : item;
    object.termType = id.startsWith('_:') ? 'BlankNode' : 'NamedNode';
    object.value = id;
  }

  // skip relative IRIs, not valid RDF
  if(object.termType === 'NamedNode' && !_isAbsoluteIri$2(object.value)) {
    return null;
  }

  return object;
}

const {isKeyword: isKeyword$2} = context;





const {
  createNodeMap: _createNodeMap,
  mergeNodeMapGraphs: _mergeNodeMapGraphs
} = nodeMap;

const api$d = {};
var frame = api$d;

/**
 * Performs JSON-LD `merged` framing.
 *
 * @param input the expanded JSON-LD to frame.
 * @param frame the expanded JSON-LD frame to use.
 * @param options the framing options.
 *
 * @return the framed output.
 */
api$d.frameMergedOrDefault = (input, frame, options) => {
  // create framing state
  const state = {
    options,
    embedded: false,
    graph: '@default',
    graphMap: {'@default': {}},
    subjectStack: [],
    link: {},
    bnodeMap: {}
  };

  // produce a map of all graphs and name each bnode
  // FIXME: currently uses subjects from @merged graph only
  const issuer = new util$1.IdentifierIssuer('_:b');
  _createNodeMap(input, state.graphMap, '@default', issuer);
  if(options.merged) {
    state.graphMap['@merged'] = _mergeNodeMapGraphs(state.graphMap);
    state.graph = '@merged';
  }
  state.subjects = state.graphMap[state.graph];

  // frame the subjects
  const framed = [];
  api$d.frame(state, Object.keys(state.subjects).sort(), frame, framed);

  // If pruning blank nodes, find those to prune
  if(options.pruneBlankNodeIdentifiers) {
    // remove all blank nodes appearing only once, done in compaction
    options.bnodesToClear =
      Object.keys(state.bnodeMap).filter(id => state.bnodeMap[id].length === 1);
  }

  // remove @preserve from results
  options.link = {};
  return _cleanupPreserve(framed, options);
};

/**
 * Frames subjects according to the given frame.
 *
 * @param state the current framing state.
 * @param subjects the subjects to filter.
 * @param frame the frame.
 * @param parent the parent subject or top-level array.
 * @param property the parent property, initialized to null.
 */
api$d.frame = (state, subjects, frame, parent, property = null) => {
  // validate the frame
  _validateFrame(frame);
  frame = frame[0];

  // get flags for current frame
  const options = state.options;
  const flags = {
    embed: _getFrameFlag(frame, options, 'embed'),
    explicit: _getFrameFlag(frame, options, 'explicit'),
    requireAll: _getFrameFlag(frame, options, 'requireAll')
  };

  // get link for current graph
  if(!state.link.hasOwnProperty(state.graph)) {
    state.link[state.graph] = {};
  }
  const link = state.link[state.graph];

  // filter out subjects that match the frame
  const matches = _filterSubjects(state, subjects, frame, flags);

  // add matches to output
  const ids = Object.keys(matches).sort();
  for(const id of ids) {
    const subject = matches[id];

    /* Note: In order to treat each top-level match as a compartmentalized
    result, clear the unique embedded subjects map when the property is null,
    which only occurs at the top-level. */
    if(property === null) {
      state.uniqueEmbeds = {[state.graph]: {}};
    } else {
      state.uniqueEmbeds[state.graph] = state.uniqueEmbeds[state.graph] || {};
    }

    if(flags.embed === '@link' && id in link) {
      // TODO: may want to also match an existing linked subject against
      // the current frame ... so different frames could produce different
      // subjects that are only shared in-memory when the frames are the same

      // add existing linked subject
      _addFrameOutput(parent, property, link[id]);
      continue;
    }

    // start output for subject
    const output = {'@id': id};
    if(id.indexOf('_:') === 0) {
      util$1.addValue(state.bnodeMap, id, output, {propertyIsArray: true});
    }
    link[id] = output;

    // validate @embed
    if((flags.embed === '@first' || flags.embed === '@last') && state.is11) {
      throw new JsonLdError_1(
        'Invalid JSON-LD syntax; invalid value of @embed.',
        'jsonld.SyntaxError', {code: 'invalid @embed value', frame});
    }

    if(!state.embedded && state.uniqueEmbeds[state.graph].hasOwnProperty(id)) {
      // skip adding this node object to the top level, as it was
      // already included in another node object
      continue;
    }

    // if embed is @never or if a circular reference would be created by an
    // embed, the subject cannot be embedded, just add the reference;
    // note that a circular reference won't occur when the embed flag is
    // `@link` as the above check will short-circuit before reaching this point
    if(state.embedded &&
      (flags.embed === '@never' ||
      _createsCircularReference(subject, state.graph, state.subjectStack))) {
      _addFrameOutput(parent, property, output);
      continue;
    }

    // if only the first (or once) should be embedded
    if(state.embedded &&
       (flags.embed == '@first' || flags.embed == '@once') &&
       state.uniqueEmbeds[state.graph].hasOwnProperty(id)) {
      _addFrameOutput(parent, property, output);
      continue;
    }

    // if only the last match should be embedded
    if(flags.embed === '@last') {
      // remove any existing embed
      if(id in state.uniqueEmbeds[state.graph]) {
        _removeEmbed(state, id);
      }
    }

    state.uniqueEmbeds[state.graph][id] = {parent, property};

    // push matching subject onto stack to enable circular embed checks
    state.subjectStack.push({subject, graph: state.graph});

    // subject is also the name of a graph
    if(id in state.graphMap) {
      let recurse = false;
      let subframe = null;
      if(!('@graph' in frame)) {
        recurse = state.graph !== '@merged';
        subframe = {};
      } else {
        subframe = frame['@graph'][0];
        recurse = !(id === '@merged' || id === '@default');
        if(!types.isObject(subframe)) {
          subframe = {};
        }
      }

      if(recurse) {
        // recurse into graph
        api$d.frame(
          {...state, graph: id, embedded: false},
          Object.keys(state.graphMap[id]).sort(), [subframe], output, '@graph');
      }
    }

    // if frame has @included, recurse over its sub-frame
    if('@included' in frame) {
      api$d.frame(
        {...state, embedded: false},
        subjects, frame['@included'], output, '@included');
    }

    // iterate over subject properties
    for(const prop of Object.keys(subject).sort()) {
      // copy keywords to output
      if(isKeyword$2(prop)) {
        output[prop] = util$1.clone(subject[prop]);

        if(prop === '@type') {
          // count bnode values of @type
          for(const type of subject['@type']) {
            if(type.indexOf('_:') === 0) {
              util$1.addValue(
                state.bnodeMap, type, output, {propertyIsArray: true});
            }
          }
        }
        continue;
      }

      // explicit is on and property isn't in the frame, skip processing
      if(flags.explicit && !(prop in frame)) {
        continue;
      }

      // add objects
      for(const o of subject[prop]) {
        const subframe = (prop in frame ?
          frame[prop] : _createImplicitFrame(flags));

        // recurse into list
        if(graphTypes.isList(o)) {
          const subframe =
            (frame[prop] && frame[prop][0] && frame[prop][0]['@list']) ?
              frame[prop][0]['@list'] :
              _createImplicitFrame(flags);

          // add empty list
          const list = {'@list': []};
          _addFrameOutput(output, prop, list);

          // add list objects
          const src = o['@list'];
          for(const oo of src) {
            if(graphTypes.isSubjectReference(oo)) {
              // recurse into subject reference
              api$d.frame(
                {...state, embedded: true},
                [oo['@id']], subframe, list, '@list');
            } else {
              // include other values automatically
              _addFrameOutput(list, '@list', util$1.clone(oo));
            }
          }
        } else if(graphTypes.isSubjectReference(o)) {
          // recurse into subject reference
          api$d.frame(
            {...state, embedded: true},
            [o['@id']], subframe, output, prop);
        } else if(_valueMatch(subframe[0], o)) {
          // include other values, if they match
          _addFrameOutput(output, prop, util$1.clone(o));
        }
      }
    }

    // handle defaults
    for(const prop of Object.keys(frame).sort()) {
      // skip keywords
      if(prop === '@type') {
        if(!types.isObject(frame[prop][0]) ||
           !('@default' in frame[prop][0])) {
          continue;
        }
        // allow through default types
      } else if(isKeyword$2(prop)) {
        continue;
      }

      // if omit default is off, then include default values for properties
      // that appear in the next frame but are not in the matching subject
      const next = frame[prop][0] || {};
      const omitDefaultOn = _getFrameFlag(next, options, 'omitDefault');
      if(!omitDefaultOn && !(prop in output)) {
        let preserve = '@null';
        if('@default' in next) {
          preserve = util$1.clone(next['@default']);
        }
        if(!types.isArray(preserve)) {
          preserve = [preserve];
        }
        output[prop] = [{'@preserve': preserve}];
      }
    }

    // if embed reverse values by finding nodes having this subject as a value
    // of the associated property
    for(const reverseProp of Object.keys(frame['@reverse'] || {}).sort()) {
      const subframe = frame['@reverse'][reverseProp];
      for(const subject of Object.keys(state.subjects)) {
        const nodeValues =
          util$1.getValues(state.subjects[subject], reverseProp);
        if(nodeValues.some(v => v['@id'] === id)) {
          // node has property referencing this subject, recurse
          output['@reverse'] = output['@reverse'] || {};
          util$1.addValue(
            output['@reverse'], reverseProp, [], {propertyIsArray: true});
          api$d.frame(
            {...state, embedded: true},
            [subject], subframe, output['@reverse'][reverseProp],
            property);
        }
      }
    }

    // add output to parent
    _addFrameOutput(parent, property, output);

    // pop matching subject from circular ref-checking stack
    state.subjectStack.pop();
  }
};

/**
 * Replace `@null` with `null`, removing it from arrays.
 *
 * @param input the framed, compacted output.
 * @param options the framing options used.
 *
 * @return the resulting output.
 */
api$d.cleanupNull = (input, options) => {
  // recurse through arrays
  if(types.isArray(input)) {
    const noNulls = input.map(v => api$d.cleanupNull(v, options));
    return noNulls.filter(v => v); // removes nulls from array
  }

  if(input === '@null') {
    return null;
  }

  if(types.isObject(input)) {
    // handle in-memory linked nodes
    if('@id' in input) {
      const id = input['@id'];
      if(options.link.hasOwnProperty(id)) {
        const idx = options.link[id].indexOf(input);
        if(idx !== -1) {
          // already visited
          return options.link[id][idx];
        }
        // prevent circular visitation
        options.link[id].push(input);
      } else {
        // prevent circular visitation
        options.link[id] = [input];
      }
    }

    for(const key in input) {
      input[key] = api$d.cleanupNull(input[key], options);
    }
  }
  return input;
};

/**
 * Creates an implicit frame when recursing through subject matches. If
 * a frame doesn't have an explicit frame for a particular property, then
 * a wildcard child frame will be created that uses the same flags that the
 * parent frame used.
 *
 * @param flags the current framing flags.
 *
 * @return the implicit frame.
 */
function _createImplicitFrame(flags) {
  const frame = {};
  for(const key in flags) {
    if(flags[key] !== undefined) {
      frame['@' + key] = [flags[key]];
    }
  }
  return [frame];
}

/**
 * Checks the current subject stack to see if embedding the given subject
 * would cause a circular reference.
 *
 * @param subjectToEmbed the subject to embed.
 * @param graph the graph the subject to embed is in.
 * @param subjectStack the current stack of subjects.
 *
 * @return true if a circular reference would be created, false if not.
 */
function _createsCircularReference(subjectToEmbed, graph, subjectStack) {
  for(let i = subjectStack.length - 1; i >= 0; --i) {
    const subject = subjectStack[i];
    if(subject.graph === graph &&
      subject.subject['@id'] === subjectToEmbed['@id']) {
      return true;
    }
  }
  return false;
}

/**
 * Gets the frame flag value for the given flag name.
 *
 * @param frame the frame.
 * @param options the framing options.
 * @param name the flag name.
 *
 * @return the flag value.
 */
function _getFrameFlag(frame, options, name) {
  const flag = '@' + name;
  let rval = (flag in frame ? frame[flag][0] : options[name]);
  if(name === 'embed') {
    // default is "@last"
    // backwards-compatibility support for "embed" maps:
    // true => "@last"
    // false => "@never"
    if(rval === true) {
      rval = '@once';
    } else if(rval === false) {
      rval = '@never';
    } else if(rval !== '@always' && rval !== '@never' && rval !== '@link' &&
      rval !== '@first' && rval !== '@last' && rval !== '@once') {
      throw new JsonLdError_1(
        'Invalid JSON-LD syntax; invalid value of @embed.',
        'jsonld.SyntaxError', {code: 'invalid @embed value', frame});
    }
  }
  return rval;
}

/**
 * Validates a JSON-LD frame, throwing an exception if the frame is invalid.
 *
 * @param frame the frame to validate.
 */
function _validateFrame(frame) {
  if(!types.isArray(frame) || frame.length !== 1 || !types.isObject(frame[0])) {
    throw new JsonLdError_1(
      'Invalid JSON-LD syntax; a JSON-LD frame must be a single object.',
      'jsonld.SyntaxError', {frame});
  }

  if('@id' in frame[0]) {
    for(const id of util$1.asArray(frame[0]['@id'])) {
      // @id must be wildcard or an IRI
      if(!(types.isObject(id) || url.isAbsolute(id)) ||
        (types.isString(id) && id.indexOf('_:') === 0)) {
        throw new JsonLdError_1(
          'Invalid JSON-LD syntax; invalid @id in frame.',
          'jsonld.SyntaxError', {code: 'invalid frame', frame});
      }
    }
  }

  if('@type' in frame[0]) {
    for(const type of util$1.asArray(frame[0]['@type'])) {
      // @id must be wildcard or an IRI
      if(!(types.isObject(type) || url.isAbsolute(type)) ||
        (types.isString(type) && type.indexOf('_:') === 0)) {
        throw new JsonLdError_1(
          'Invalid JSON-LD syntax; invalid @type in frame.',
          'jsonld.SyntaxError', {code: 'invalid frame', frame});
      }
    }
  }
}

/**
 * Returns a map of all of the subjects that match a parsed frame.
 *
 * @param state the current framing state.
 * @param subjects the set of subjects to filter.
 * @param frame the parsed frame.
 * @param flags the frame flags.
 *
 * @return all of the matched subjects.
 */
function _filterSubjects(state, subjects, frame, flags) {
  // filter subjects in @id order
  const rval = {};
  for(const id of subjects) {
    const subject = state.graphMap[state.graph][id];
    if(_filterSubject(state, subject, frame, flags)) {
      rval[id] = subject;
    }
  }
  return rval;
}

/**
 * Returns true if the given subject matches the given frame.
 *
 * Matches either based on explicit type inclusion where the node has any
 * type listed in the frame. If the frame has empty types defined matches
 * nodes not having a @type. If the frame has a type of {} defined matches
 * nodes having any type defined.
 *
 * Otherwise, does duck typing, where the node must have all of the
 * properties defined in the frame.
 *
 * @param state the current framing state.
 * @param subject the subject to check.
 * @param frame the frame to check.
 * @param flags the frame flags.
 *
 * @return true if the subject matches, false if not.
 */
function _filterSubject(state, subject, frame, flags) {
  // check ducktype
  let wildcard = true;
  let matchesSome = false;

  for(const key in frame) {
    let matchThis = false;
    const nodeValues = util$1.getValues(subject, key);
    const isEmpty = util$1.getValues(frame, key).length === 0;

    if(key === '@id') {
      // match on no @id or any matching @id, including wildcard
      if(types.isEmptyObject(frame['@id'][0] || {})) {
        matchThis = true;
      } else if(frame['@id'].length >= 0) {
        matchThis = frame['@id'].includes(nodeValues[0]);
      }
      if(!flags.requireAll) {
        return matchThis;
      }
    } else if(key === '@type') {
      // check @type (object value means 'any' type,
      // fall through to ducktyping)
      wildcard = false;
      if(isEmpty) {
        if(nodeValues.length > 0) {
          // don't match on no @type
          return false;
        }
        matchThis = true;
      } else if(frame['@type'].length === 1 &&
        types.isEmptyObject(frame['@type'][0])) {
        // match on wildcard @type if there is a type
        matchThis = nodeValues.length > 0;
      } else {
        // match on a specific @type
        for(const type of frame['@type']) {
          if(types.isObject(type) && '@default' in type) {
            // match on default object
            matchThis = true;
          } else {
            matchThis = matchThis || nodeValues.some(tt => tt === type);
          }
        }
      }
      if(!flags.requireAll) {
        return matchThis;
      }
    } else if(isKeyword$2(key)) {
      continue;
    } else {
      // Force a copy of this frame entry so it can be manipulated
      const thisFrame = util$1.getValues(frame, key)[0];
      let hasDefault = false;
      if(thisFrame) {
        _validateFrame([thisFrame]);
        hasDefault = '@default' in thisFrame;
      }

      // no longer a wildcard pattern if frame has any non-keyword properties
      wildcard = false;

      // skip, but allow match if node has no value for property, and frame has
      // a default value
      if(nodeValues.length === 0 && hasDefault) {
        continue;
      }

      // if frame value is empty, don't match if subject has any value
      if(nodeValues.length > 0 && isEmpty) {
        return false;
      }

      if(thisFrame === undefined) {
        // node does not match if values is not empty and the value of property
        // in frame is match none.
        if(nodeValues.length > 0) {
          return false;
        }
        matchThis = true;
      } else {
        if(graphTypes.isList(thisFrame)) {
          const listValue = thisFrame['@list'][0];
          if(graphTypes.isList(nodeValues[0])) {
            const nodeListValues = nodeValues[0]['@list'];

            if(graphTypes.isValue(listValue)) {
              // match on any matching value
              matchThis = nodeListValues.some(lv => _valueMatch(listValue, lv));
            } else if(graphTypes.isSubject(listValue) ||
              graphTypes.isSubjectReference(listValue)) {
              matchThis = nodeListValues.some(lv => _nodeMatch(
                state, listValue, lv, flags));
            }
          }
        } else if(graphTypes.isValue(thisFrame)) {
          matchThis = nodeValues.some(nv => _valueMatch(thisFrame, nv));
        } else if(graphTypes.isSubjectReference(thisFrame)) {
          matchThis =
            nodeValues.some(nv => _nodeMatch(state, thisFrame, nv, flags));
        } else if(types.isObject(thisFrame)) {
          matchThis = nodeValues.length > 0;
        } else {
          matchThis = false;
        }
      }
    }

    // all non-defaulted values must match if requireAll is set
    if(!matchThis && flags.requireAll) {
      return false;
    }

    matchesSome = matchesSome || matchThis;
  }

  // return true if wildcard or subject matches some properties
  return wildcard || matchesSome;
}

/**
 * Removes an existing embed.
 *
 * @param state the current framing state.
 * @param id the @id of the embed to remove.
 */
function _removeEmbed(state, id) {
  // get existing embed
  const embeds = state.uniqueEmbeds[state.graph];
  const embed = embeds[id];
  const parent = embed.parent;
  const property = embed.property;

  // create reference to replace embed
  const subject = {'@id': id};

  // remove existing embed
  if(types.isArray(parent)) {
    // replace subject with reference
    for(let i = 0; i < parent.length; ++i) {
      if(util$1.compareValues(parent[i], subject)) {
        parent[i] = subject;
        break;
      }
    }
  } else {
    // replace subject with reference
    const useArray = types.isArray(parent[property]);
    util$1.removeValue(parent, property, subject, {propertyIsArray: useArray});
    util$1.addValue(parent, property, subject, {propertyIsArray: useArray});
  }

  // recursively remove dependent dangling embeds
  const removeDependents = id => {
    // get embed keys as a separate array to enable deleting keys in map
    const ids = Object.keys(embeds);
    for(const next of ids) {
      if(next in embeds && types.isObject(embeds[next].parent) &&
        embeds[next].parent['@id'] === id) {
        delete embeds[next];
        removeDependents(next);
      }
    }
  };
  removeDependents(id);
}

/**
 * Removes the @preserve keywords from expanded result of framing.
 *
 * @param input the framed, framed output.
 * @param options the framing options used.
 *
 * @return the resulting output.
 */
function _cleanupPreserve(input, options) {
  // recurse through arrays
  if(types.isArray(input)) {
    return input.map(value => _cleanupPreserve(value, options));
  }

  if(types.isObject(input)) {
    // remove @preserve
    if('@preserve' in input) {
      return input['@preserve'][0];
    }

    // skip @values
    if(graphTypes.isValue(input)) {
      return input;
    }

    // recurse through @lists
    if(graphTypes.isList(input)) {
      input['@list'] = _cleanupPreserve(input['@list'], options);
      return input;
    }

    // handle in-memory linked nodes
    if('@id' in input) {
      const id = input['@id'];
      if(options.link.hasOwnProperty(id)) {
        const idx = options.link[id].indexOf(input);
        if(idx !== -1) {
          // already visited
          return options.link[id][idx];
        }
        // prevent circular visitation
        options.link[id].push(input);
      } else {
        // prevent circular visitation
        options.link[id] = [input];
      }
    }

    // recurse through properties
    for(const prop in input) {
      // potentially remove the id, if it is an unreference bnode
      if(prop === '@id' && options.bnodesToClear.includes(input[prop])) {
        delete input['@id'];
        continue;
      }

      input[prop] = _cleanupPreserve(input[prop], options);
    }
  }
  return input;
}

/**
 * Adds framing output to the given parent.
 *
 * @param parent the parent to add to.
 * @param property the parent property.
 * @param output the output to add.
 */
function _addFrameOutput(parent, property, output) {
  if(types.isObject(parent)) {
    util$1.addValue(parent, property, output, {propertyIsArray: true});
  } else {
    parent.push(output);
  }
}

/**
 * Node matches if it is a node, and matches the pattern as a frame.
 *
 * @param state the current framing state.
 * @param pattern used to match value
 * @param value to check
 * @param flags the frame flags.
 */
function _nodeMatch(state, pattern, value, flags) {
  if(!('@id' in value)) {
    return false;
  }
  const nodeObject = state.subjects[value['@id']];
  return nodeObject && _filterSubject(state, nodeObject, pattern, flags);
}

/**
 * Value matches if it is a value and matches the value pattern
 *
 * * `pattern` is empty
 * * @values are the same, or `pattern[@value]` is a wildcard, and
 * * @types are the same or `value[@type]` is not null
 *   and `pattern[@type]` is `{}`, or `value[@type]` is null
 *   and `pattern[@type]` is null or `[]`, and
 * * @languages are the same or `value[@language]` is not null
 *   and `pattern[@language]` is `{}`, or `value[@language]` is null
 *   and `pattern[@language]` is null or `[]`.
 *
 * @param pattern used to match value
 * @param value to check
 */
function _valueMatch(pattern, value) {
  const v1 = value['@value'];
  const t1 = value['@type'];
  const l1 = value['@language'];
  const v2 = pattern['@value'] ?
    (types.isArray(pattern['@value']) ?
      pattern['@value'] : [pattern['@value']]) :
    [];
  const t2 = pattern['@type'] ?
    (types.isArray(pattern['@type']) ?
      pattern['@type'] : [pattern['@type']]) :
    [];
  const l2 = pattern['@language'] ?
    (types.isArray(pattern['@language']) ?
      pattern['@language'] : [pattern['@language']]) :
    [];

  if(v2.length === 0 && t2.length === 0 && l2.length === 0) {
    return true;
  }
  if(!(v2.includes(v1) || types.isEmptyObject(v2[0]))) {
    return false;
  }
  if(!(!t1 && t2.length === 0 || t2.includes(t1) || t1 &&
    types.isEmptyObject(t2[0]))) {
    return false;
  }
  if(!(!l1 && l2.length === 0 || l2.includes(l1) || l1 &&
    types.isEmptyObject(l2[0]))) {
    return false;
  }
  return true;
}

const {
  isArray: _isArray$3,
  isObject: _isObject$3,
  isString: _isString$3,
  isUndefined: _isUndefined$2
} = types;

const {
  isList: _isList$1,
  isValue: _isValue$1,
  isGraph: _isGraph$1,
  isSimpleGraph: _isSimpleGraph,
  isSubjectReference: _isSubjectReference$1
} = graphTypes;

const {
  expandIri: _expandIri$2,
  getContextValue: _getContextValue$1,
  isKeyword: _isKeyword$1,
  process: _processContext$1,
  processingMode: _processingMode$1
} = context;

const {
  removeBase: _removeBase,
  prependBase: _prependBase
} = url;

const {
  addValue: _addValue$1,
  asArray: _asArray$3,
  compareShortestLeast: _compareShortestLeast$1
} = util$1;

const api$e = {};
var compact = api$e;

/**
 * Recursively compacts an element using the given active context. All values
 * must be in expanded form before this method is called.
 *
 * @param activeCtx the active context to use.
 * @param activeProperty the compacted property associated with the element
 *          to compact, null for none.
 * @param element the element to compact.
 * @param options the compaction options.
 * @param compactionMap the compaction map to use.
 *
 * @return a promise that resolves to the compacted value.
 */
api$e.compact = async ({
  activeCtx,
  activeProperty = null,
  element,
  options = {},
  compactionMap = () => undefined
}) => {
  // recursively compact array
  if(_isArray$3(element)) {
    let rval = [];
    for(let i = 0; i < element.length; ++i) {
      // compact, dropping any null values unless custom mapped
      let compacted = await api$e.compact({
        activeCtx,
        activeProperty,
        element: element[i],
        options,
        compactionMap
      });
      if(compacted === null) {
        compacted = await compactionMap({
          unmappedValue: element[i],
          activeCtx,
          activeProperty,
          parent: element,
          index: i,
          options
        });
        if(compacted === undefined) {
          continue;
        }
      }
      rval.push(compacted);
    }
    if(options.compactArrays && rval.length === 1) {
      // use single element if no container is specified
      const container = _getContextValue$1(
        activeCtx, activeProperty, '@container') || [];
      if(container.length === 0) {
        rval = rval[0];
      }
    }
    return rval;
  }

  // use any scoped context on activeProperty
  const ctx = _getContextValue$1(activeCtx, activeProperty, '@context');
  if(!_isUndefined$2(ctx)) {
    activeCtx = await _processContext$1({
      activeCtx,
      localCtx: ctx,
      propagate: true,
      overrideProtected: true,
      options
    });
  }

  // recursively compact object
  if(_isObject$3(element)) {
    if(options.link && '@id' in element &&
      options.link.hasOwnProperty(element['@id'])) {
      // check for a linked element to reuse
      const linked = options.link[element['@id']];
      for(let i = 0; i < linked.length; ++i) {
        if(linked[i].expanded === element) {
          return linked[i].compacted;
        }
      }
    }

    // do value compaction on @values and subject references
    if(_isValue$1(element) || _isSubjectReference$1(element)) {
      const rval =
        api$e.compactValue({activeCtx, activeProperty, value: element, options});
      if(options.link && _isSubjectReference$1(element)) {
        // store linked element
        if(!(options.link.hasOwnProperty(element['@id']))) {
          options.link[element['@id']] = [];
        }
        options.link[element['@id']].push({expanded: element, compacted: rval});
      }
      return rval;
    }

    // if expanded property is @list and we're contained within a list
    // container, recursively compact this item to an array
    if(_isList$1(element)) {
      const container = _getContextValue$1(
        activeCtx, activeProperty, '@container') || [];
      if(container.includes('@list')) {
        return api$e.compact({
          activeCtx,
          activeProperty,
          element: element['@list'],
          options,
          compactionMap
        });
      }
    }

    // FIXME: avoid misuse of active property as an expanded property?
    const insideReverse = (activeProperty === '@reverse');

    const rval = {};

    // original context before applying property-scoped and local contexts
    const inputCtx = activeCtx;

    // revert to previous context, if there is one,
    // and element is not a value object or a node reference
    if(!_isValue$1(element) && !_isSubjectReference$1(element)) {
      activeCtx = activeCtx.revertToPreviousContext();
    }

    // apply property-scoped context after reverting term-scoped context
    const propertyScopedCtx =
      _getContextValue$1(inputCtx, activeProperty, '@context');
    if(!_isUndefined$2(propertyScopedCtx)) {
      activeCtx = await _processContext$1({
        activeCtx,
        localCtx: propertyScopedCtx,
        propagate: true,
        overrideProtected: true,
        options
      });
    }

    if(options.link && '@id' in element) {
      // store linked element
      if(!options.link.hasOwnProperty(element['@id'])) {
        options.link[element['@id']] = [];
      }
      options.link[element['@id']].push({expanded: element, compacted: rval});
    }

    // apply any context defined on an alias of @type
    // if key is @type and any compacted value is a term having a local
    // context, overlay that context
    let types = element['@type'] || [];
    if(types.length > 1) {
      types = Array.from(types).sort();
    }
    // find all type-scoped contexts based on current context, prior to
    // updating it
    const typeContext = activeCtx;
    for(const type of types) {
      const compactedType = api$e.compactIri(
        {activeCtx: typeContext, iri: type, relativeTo: {vocab: true}});

      // Use any type-scoped context defined on this value
      const ctx = _getContextValue$1(inputCtx, compactedType, '@context');
      if(!_isUndefined$2(ctx)) {
        activeCtx = await _processContext$1({
          activeCtx,
          localCtx: ctx,
          options,
          propagate: false
        });
      }
    }

    // process element keys in order
    const keys = Object.keys(element).sort();
    for(const expandedProperty of keys) {
      const expandedValue = element[expandedProperty];

      // compact @id
      if(expandedProperty === '@id') {
        let compactedValue = _asArray$3(expandedValue).map(
          expandedIri => api$e.compactIri({
            activeCtx,
            iri: expandedIri,
            relativeTo: {vocab: false},
            base: options.base
          }));
        if(compactedValue.length === 1) {
          compactedValue = compactedValue[0];
        }

        // use keyword alias and add value
        const alias = api$e.compactIri(
          {activeCtx, iri: '@id', relativeTo: {vocab: true}});

        rval[alias] = compactedValue;
        continue;
      }

      // compact @type(s)
      if(expandedProperty === '@type') {
        // resolve type values against previous context
        let compactedValue = _asArray$3(expandedValue).map(
          expandedIri => api$e.compactIri({
            activeCtx: inputCtx,
            iri: expandedIri,
            relativeTo: {vocab: true}
          }));
        if(compactedValue.length === 1) {
          compactedValue = compactedValue[0];
        }

        // use keyword alias and add value
        const alias = api$e.compactIri(
          {activeCtx, iri: '@type', relativeTo: {vocab: true}});
        const container = _getContextValue$1(
          activeCtx, alias, '@container') || [];

        // treat as array for @type if @container includes @set
        const typeAsSet =
          container.includes('@set') &&
          _processingMode$1(activeCtx, 1.1);
        const isArray =
          typeAsSet || (_isArray$3(compactedValue) && expandedValue.length === 0);
        _addValue$1(rval, alias, compactedValue, {propertyIsArray: isArray});
        continue;
      }

      // handle @reverse
      if(expandedProperty === '@reverse') {
        // recursively compact expanded value
        const compactedValue = await api$e.compact({
          activeCtx,
          activeProperty: '@reverse',
          element: expandedValue,
          options,
          compactionMap
        });

        // handle double-reversed properties
        for(const compactedProperty in compactedValue) {
          if(activeCtx.mappings.has(compactedProperty) &&
            activeCtx.mappings.get(compactedProperty).reverse) {
            const value = compactedValue[compactedProperty];
            const container = _getContextValue$1(
              activeCtx, compactedProperty, '@container') || [];
            const useArray = (
              container.includes('@set') || !options.compactArrays);
            _addValue$1(
              rval, compactedProperty, value, {propertyIsArray: useArray});
            delete compactedValue[compactedProperty];
          }
        }

        if(Object.keys(compactedValue).length > 0) {
          // use keyword alias and add value
          const alias = api$e.compactIri({
            activeCtx,
            iri: expandedProperty,
            relativeTo: {vocab: true}
          });
          _addValue$1(rval, alias, compactedValue);
        }

        continue;
      }

      if(expandedProperty === '@preserve') {
        // compact using activeProperty
        const compactedValue = await api$e.compact({
          activeCtx,
          activeProperty,
          element: expandedValue,
          options,
          compactionMap
        });

        if(!(_isArray$3(compactedValue) && compactedValue.length === 0)) {
          _addValue$1(rval, expandedProperty, compactedValue);
        }
        continue;
      }

      // handle @index property
      if(expandedProperty === '@index') {
        // drop @index if inside an @index container
        const container = _getContextValue$1(
          activeCtx, activeProperty, '@container') || [];
        if(container.includes('@index')) {
          continue;
        }

        // use keyword alias and add value
        const alias = api$e.compactIri({
          activeCtx,
          iri: expandedProperty,
          relativeTo: {vocab: true}
        });
        _addValue$1(rval, alias, expandedValue);
        continue;
      }

      // skip array processing for keywords that aren't
      // @graph, @list, or @included
      if(expandedProperty !== '@graph' && expandedProperty !== '@list' &&
        expandedProperty !== '@included' &&
        _isKeyword$1(expandedProperty)) {
        // use keyword alias and add value as is
        const alias = api$e.compactIri({
          activeCtx,
          iri: expandedProperty,
          relativeTo: {vocab: true}
        });
        _addValue$1(rval, alias, expandedValue);
        continue;
      }

      // Note: expanded value must be an array due to expansion algorithm.
      if(!_isArray$3(expandedValue)) {
        throw new JsonLdError_1(
          'JSON-LD expansion error; expanded value must be an array.',
          'jsonld.SyntaxError');
      }

      // preserve empty arrays
      if(expandedValue.length === 0) {
        const itemActiveProperty = api$e.compactIri({
          activeCtx,
          iri: expandedProperty,
          value: expandedValue,
          relativeTo: {vocab: true},
          reverse: insideReverse
        });
        const nestProperty = activeCtx.mappings.has(itemActiveProperty) ?
          activeCtx.mappings.get(itemActiveProperty)['@nest'] : null;
        let nestResult = rval;
        if(nestProperty) {
          _checkNestProperty(activeCtx, nestProperty, options);
          if(!_isObject$3(rval[nestProperty])) {
            rval[nestProperty] = {};
          }
          nestResult = rval[nestProperty];
        }
        _addValue$1(
          nestResult, itemActiveProperty, expandedValue, {
            propertyIsArray: true
          });
      }

      // recusively process array values
      for(const expandedItem of expandedValue) {
        // compact property and get container type
        const itemActiveProperty = api$e.compactIri({
          activeCtx,
          iri: expandedProperty,
          value: expandedItem,
          relativeTo: {vocab: true},
          reverse: insideReverse
        });

        // if itemActiveProperty is a @nest property, add values to nestResult,
        // otherwise rval
        const nestProperty = activeCtx.mappings.has(itemActiveProperty) ?
          activeCtx.mappings.get(itemActiveProperty)['@nest'] : null;
        let nestResult = rval;
        if(nestProperty) {
          _checkNestProperty(activeCtx, nestProperty, options);
          if(!_isObject$3(rval[nestProperty])) {
            rval[nestProperty] = {};
          }
          nestResult = rval[nestProperty];
        }

        const container = _getContextValue$1(
          activeCtx, itemActiveProperty, '@container') || [];

        // get simple @graph or @list value if appropriate
        const isGraph = _isGraph$1(expandedItem);
        const isList = _isList$1(expandedItem);
        let inner;
        if(isList) {
          inner = expandedItem['@list'];
        } else if(isGraph) {
          inner = expandedItem['@graph'];
        }

        // recursively compact expanded item
        let compactedItem = await api$e.compact({
          activeCtx,
          activeProperty: itemActiveProperty,
          element: (isList || isGraph) ? inner : expandedItem,
          options,
          compactionMap
        });

        // handle @list
        if(isList) {
          // ensure @list value is an array
          if(!_isArray$3(compactedItem)) {
            compactedItem = [compactedItem];
          }

          if(!container.includes('@list')) {
            // wrap using @list alias
            compactedItem = {
              [api$e.compactIri({
                activeCtx,
                iri: '@list',
                relativeTo: {vocab: true}
              })]: compactedItem
            };

            // include @index from expanded @list, if any
            if('@index' in expandedItem) {
              compactedItem[api$e.compactIri({
                activeCtx,
                iri: '@index',
                relativeTo: {vocab: true}
              })] = expandedItem['@index'];
            }
          } else {
            _addValue$1(nestResult, itemActiveProperty, compactedItem, {
              valueIsArray: true,
              allowDuplicate: true
            });
            continue;
          }
        }

        // Graph object compaction cases
        if(isGraph) {
          if(container.includes('@graph') && (container.includes('@id') ||
            container.includes('@index') && _isSimpleGraph(expandedItem))) {
            // get or create the map object
            let mapObject;
            if(nestResult.hasOwnProperty(itemActiveProperty)) {
              mapObject = nestResult[itemActiveProperty];
            } else {
              nestResult[itemActiveProperty] = mapObject = {};
            }

            // index on @id or @index or alias of @none
            const key = (container.includes('@id') ?
              expandedItem['@id'] : expandedItem['@index']) ||
              api$e.compactIri({activeCtx, iri: '@none',
                relativeTo: {vocab: true}});
            // add compactedItem to map, using value of `@id` or a new blank
            // node identifier

            _addValue$1(
              mapObject, key, compactedItem, {
                propertyIsArray:
                  (!options.compactArrays || container.includes('@set'))
              });
          } else if(container.includes('@graph') &&
            _isSimpleGraph(expandedItem)) {
            // container includes @graph but not @id or @index and value is a
            // simple graph object add compact value
            // if compactedItem contains multiple values, it is wrapped in
            // `@included`
            if(_isArray$3(compactedItem) && compactedItem.length > 1) {
              compactedItem = {'@included': compactedItem};
            }
            _addValue$1(
              nestResult, itemActiveProperty, compactedItem, {
                propertyIsArray:
                  (!options.compactArrays || container.includes('@set'))
              });
          } else {
            // wrap using @graph alias, remove array if only one item and
            // compactArrays not set
            if(_isArray$3(compactedItem) && compactedItem.length === 1 &&
              options.compactArrays) {
              compactedItem = compactedItem[0];
            }
            compactedItem = {
              [api$e.compactIri({
                activeCtx,
                iri: '@graph',
                relativeTo: {vocab: true}
              })]: compactedItem
            };

            // include @id from expanded graph, if any
            if('@id' in expandedItem) {
              compactedItem[api$e.compactIri({
                activeCtx,
                iri: '@id',
                relativeTo: {vocab: true}
              })] = expandedItem['@id'];
            }

            // include @index from expanded graph, if any
            if('@index' in expandedItem) {
              compactedItem[api$e.compactIri({
                activeCtx,
                iri: '@index',
                relativeTo: {vocab: true}
              })] = expandedItem['@index'];
            }
            _addValue$1(
              nestResult, itemActiveProperty, compactedItem, {
                propertyIsArray:
                  (!options.compactArrays || container.includes('@set'))
              });
          }
        } else if(container.includes('@language') ||
          container.includes('@index') || container.includes('@id') ||
          container.includes('@type')) {
          // handle language and index maps
          // get or create the map object
          let mapObject;
          if(nestResult.hasOwnProperty(itemActiveProperty)) {
            mapObject = nestResult[itemActiveProperty];
          } else {
            nestResult[itemActiveProperty] = mapObject = {};
          }

          let key;
          if(container.includes('@language')) {
          // if container is a language map, simplify compacted value to
          // a simple string
            if(_isValue$1(compactedItem)) {
              compactedItem = compactedItem['@value'];
            }
            key = expandedItem['@language'];
          } else if(container.includes('@index')) {
            const indexKey = _getContextValue$1(
              activeCtx, itemActiveProperty, '@index') || '@index';
            const containerKey = api$e.compactIri(
              {activeCtx, iri: indexKey, relativeTo: {vocab: true}});
            if(indexKey === '@index') {
              key = expandedItem['@index'];
              delete compactedItem[containerKey];
            } else {
              let others;
              [key, ...others] = _asArray$3(compactedItem[indexKey] || []);
              if(!_isString$3(key)) {
                // Will use @none if it isn't a string.
                key = null;
              } else {
                switch(others.length) {
                  case 0:
                    delete compactedItem[indexKey];
                    break;
                  case 1:
                    compactedItem[indexKey] = others[0];
                    break;
                  default:
                    compactedItem[indexKey] = others;
                    break;
                }
              }
            }
          } else if(container.includes('@id')) {
            const idKey = api$e.compactIri({activeCtx, iri: '@id',
              relativeTo: {vocab: true}});
            key = compactedItem[idKey];
            delete compactedItem[idKey];
          } else if(container.includes('@type')) {
            const typeKey = api$e.compactIri({
              activeCtx,
              iri: '@type',
              relativeTo: {vocab: true}
            });
            let types;
            [key, ...types] = _asArray$3(compactedItem[typeKey] || []);
            switch(types.length) {
              case 0:
                delete compactedItem[typeKey];
                break;
              case 1:
                compactedItem[typeKey] = types[0];
                break;
              default:
                compactedItem[typeKey] = types;
                break;
            }

            // If compactedItem contains a single entry
            // whose key maps to @id, recompact without @type
            if(Object.keys(compactedItem).length === 1 &&
              '@id' in expandedItem) {
              compactedItem = await api$e.compact({
                activeCtx,
                activeProperty: itemActiveProperty,
                element: {'@id': expandedItem['@id']},
                options,
                compactionMap
              });
            }
          }

          // if compacting this value which has no key, index on @none
          if(!key) {
            key = api$e.compactIri({activeCtx, iri: '@none',
              relativeTo: {vocab: true}});
          }
          // add compact value to map object using key from expanded value
          // based on the container type
          _addValue$1(
            mapObject, key, compactedItem, {
              propertyIsArray: container.includes('@set')
            });
        } else {
          // use an array if: compactArrays flag is false,
          // @container is @set or @list , value is an empty
          // array, or key is @graph
          const isArray = (!options.compactArrays ||
            container.includes('@set') || container.includes('@list') ||
            (_isArray$3(compactedItem) && compactedItem.length === 0) ||
            expandedProperty === '@list' || expandedProperty === '@graph');

          // add compact value
          _addValue$1(
            nestResult, itemActiveProperty, compactedItem,
            {propertyIsArray: isArray});
        }
      }
    }

    return rval;
  }

  // only primitives remain which are already compact
  return element;
};

/**
 * Compacts an IRI or keyword into a term or prefix if it can be. If the
 * IRI has an associated value it may be passed.
 *
 * @param activeCtx the active context to use.
 * @param iri the IRI to compact.
 * @param value the value to check or null.
 * @param relativeTo options for how to compact IRIs:
 *          vocab: true to split after @vocab, false not to.
 * @param reverse true if a reverse property is being compacted, false if not.
 * @param base the absolute URL to use for compacting document-relative IRIs.
 *
 * @return the compacted term, prefix, keyword alias, or the original IRI.
 */
api$e.compactIri = ({
  activeCtx,
  iri,
  value = null,
  relativeTo = {vocab: false},
  reverse = false,
  base = null
}) => {
  // can't compact null
  if(iri === null) {
    return iri;
  }

  // if context is from a property term scoped context composed with a
  // type-scoped context, then use the previous context instead
  if(activeCtx.isPropertyTermScoped && activeCtx.previousContext) {
    activeCtx = activeCtx.previousContext;
  }

  const inverseCtx = activeCtx.getInverse();

  // if term is a keyword, it may be compacted to a simple alias
  if(_isKeyword$1(iri) &&
    iri in inverseCtx &&
    '@none' in inverseCtx[iri] &&
    '@type' in inverseCtx[iri]['@none'] &&
    '@none' in inverseCtx[iri]['@none']['@type']) {
    return inverseCtx[iri]['@none']['@type']['@none'];
  }

  // use inverse context to pick a term if iri is relative to vocab
  if(relativeTo.vocab && iri in inverseCtx) {
    const defaultLanguage = activeCtx['@language'] || '@none';

    // prefer @index if available in value
    const containers = [];
    if(_isObject$3(value) && '@index' in value && !('@graph' in value)) {
      containers.push('@index', '@index@set');
    }

    // if value is a preserve object, use its value
    if(_isObject$3(value) && '@preserve' in value) {
      value = value['@preserve'][0];
    }

    // prefer most specific container including @graph, prefering @set
    // variations
    if(_isGraph$1(value)) {
      // favor indexmap if the graph is indexed
      if('@index' in value) {
        containers.push(
          '@graph@index', '@graph@index@set', '@index', '@index@set');
      }
      // favor idmap if the graph is has an @id
      if('@id' in value) {
        containers.push(
          '@graph@id', '@graph@id@set');
      }
      containers.push('@graph', '@graph@set', '@set');
      // allow indexmap if the graph is not indexed
      if(!('@index' in value)) {
        containers.push(
          '@graph@index', '@graph@index@set', '@index', '@index@set');
      }
      // allow idmap if the graph does not have an @id
      if(!('@id' in value)) {
        containers.push('@graph@id', '@graph@id@set');
      }
    } else if(_isObject$3(value) && !_isValue$1(value)) {
      containers.push('@id', '@id@set', '@type', '@set@type');
    }

    // defaults for term selection based on type/language
    let typeOrLanguage = '@language';
    let typeOrLanguageValue = '@null';

    if(reverse) {
      typeOrLanguage = '@type';
      typeOrLanguageValue = '@reverse';
      containers.push('@set');
    } else if(_isList$1(value)) {
      // choose the most specific term that works for all elements in @list
      // only select @list containers if @index is NOT in value
      if(!('@index' in value)) {
        containers.push('@list');
      }
      const list = value['@list'];
      if(list.length === 0) {
        // any empty list can be matched against any term that uses the
        // @list container regardless of @type or @language
        typeOrLanguage = '@any';
        typeOrLanguageValue = '@none';
      } else {
        let commonLanguage = (list.length === 0) ? defaultLanguage : null;
        let commonType = null;
        for(let i = 0; i < list.length; ++i) {
          const item = list[i];
          let itemLanguage = '@none';
          let itemType = '@none';
          if(_isValue$1(item)) {
            if('@direction' in item) {
              const lang = (item['@language'] || '').toLowerCase();
              const dir = item['@direction'];
              itemLanguage = `${lang}_${dir}`;
            } else if('@language' in item) {
              itemLanguage = item['@language'].toLowerCase();
            } else if('@type' in item) {
              itemType = item['@type'];
            } else {
              // plain literal
              itemLanguage = '@null';
            }
          } else {
            itemType = '@id';
          }
          if(commonLanguage === null) {
            commonLanguage = itemLanguage;
          } else if(itemLanguage !== commonLanguage && _isValue$1(item)) {
            commonLanguage = '@none';
          }
          if(commonType === null) {
            commonType = itemType;
          } else if(itemType !== commonType) {
            commonType = '@none';
          }
          // there are different languages and types in the list, so choose
          // the most generic term, no need to keep iterating the list
          if(commonLanguage === '@none' && commonType === '@none') {
            break;
          }
        }
        commonLanguage = commonLanguage || '@none';
        commonType = commonType || '@none';
        if(commonType !== '@none') {
          typeOrLanguage = '@type';
          typeOrLanguageValue = commonType;
        } else {
          typeOrLanguageValue = commonLanguage;
        }
      }
    } else {
      if(_isValue$1(value)) {
        if('@language' in value && !('@index' in value)) {
          containers.push('@language', '@language@set');
          typeOrLanguageValue = value['@language'];
          const dir = value['@direction'];
          if(dir) {
            typeOrLanguageValue = `${typeOrLanguageValue}_${dir}`;
          }
        } else if('@direction' in value && !('@index' in value)) {
          typeOrLanguageValue = `_${value['@direction']}`;
        } else if('@type' in value) {
          typeOrLanguage = '@type';
          typeOrLanguageValue = value['@type'];
        }
      } else {
        typeOrLanguage = '@type';
        typeOrLanguageValue = '@id';
      }
      containers.push('@set');
    }

    // do term selection
    containers.push('@none');

    // an index map can be used to index values using @none, so add as a low
    // priority
    if(_isObject$3(value) && !('@index' in value)) {
      // allow indexing even if no @index present
      containers.push('@index', '@index@set');
    }

    // values without type or language can use @language map
    if(_isValue$1(value) && Object.keys(value).length === 1) {
      // allow indexing even if no @index present
      containers.push('@language', '@language@set');
    }

    const term = _selectTerm(
      activeCtx, iri, value, containers, typeOrLanguage, typeOrLanguageValue);
    if(term !== null) {
      return term;
    }
  }

  // no term match, use @vocab if available
  if(relativeTo.vocab) {
    if('@vocab' in activeCtx) {
      // determine if vocab is a prefix of the iri
      const vocab = activeCtx['@vocab'];
      if(iri.indexOf(vocab) === 0 && iri !== vocab) {
        // use suffix as relative iri if it is not a term in the active context
        const suffix = iri.substr(vocab.length);
        if(!activeCtx.mappings.has(suffix)) {
          return suffix;
        }
      }
    }
  }

  // no term or @vocab match, check for possible CURIEs
  let choice = null;
  // TODO: make FastCurieMap a class with a method to do this lookup
  const partialMatches = [];
  let iriMap = activeCtx.fastCurieMap;
  // check for partial matches of against `iri`, which means look until
  // iri.length - 1, not full length
  const maxPartialLength = iri.length - 1;
  for(let i = 0; i < maxPartialLength && iri[i] in iriMap; ++i) {
    iriMap = iriMap[iri[i]];
    if('' in iriMap) {
      partialMatches.push(iriMap[''][0]);
    }
  }
  // check partial matches in reverse order to prefer longest ones first
  for(let i = partialMatches.length - 1; i >= 0; --i) {
    const entry = partialMatches[i];
    const terms = entry.terms;
    for(const term of terms) {
      // a CURIE is usable if:
      // 1. it has no mapping, OR
      // 2. value is null, which means we're not compacting an @value, AND
      //   the mapping matches the IRI
      const curie = term + ':' + iri.substr(entry.iri.length);
      const isUsableCurie = (activeCtx.mappings.get(term)._prefix &&
        (!activeCtx.mappings.has(curie) ||
        (value === null && activeCtx.mappings.get(curie)['@id'] === iri)));

      // select curie if it is shorter or the same length but lexicographically
      // less than the current choice
      if(isUsableCurie && (choice === null ||
        _compareShortestLeast$1(curie, choice) < 0)) {
        choice = curie;
      }
    }
  }

  // return chosen curie
  if(choice !== null) {
    return choice;
  }

  // If iri could be confused with a compact IRI using a term in this context,
  // signal an error
  for(const [term, td] of activeCtx.mappings) {
    if(td && td._prefix && iri.startsWith(term + ':')) {
      throw new JsonLdError_1(
        `Absolute IRI "${iri}" confused with prefix "${term}".`,
        'jsonld.SyntaxError',
        {code: 'IRI confused with prefix', context: activeCtx});
    }
  }

  // compact IRI relative to base
  if(!relativeTo.vocab) {
    if('@base' in activeCtx) {
      if(!activeCtx['@base']) {
        // The None case preserves rval as potentially relative
        return iri;
      } else {
        return _removeBase(_prependBase(base, activeCtx['@base']), iri);
      }
    } else {
      return _removeBase(base, iri);
    }
  }

  // return IRI as is
  return iri;
};

/**
 * Performs value compaction on an object with '@value' or '@id' as the only
 * property.
 *
 * @param activeCtx the active context.
 * @param activeProperty the active property that points to the value.
 * @param value the value to compact.
 * @param {Object} [options] - processing options.
 *
 * @return the compaction result.
 */
api$e.compactValue = ({activeCtx, activeProperty, value, options}) => {
  // value is a @value
  if(_isValue$1(value)) {
    // get context rules
    const type = _getContextValue$1(activeCtx, activeProperty, '@type');
    const language = _getContextValue$1(activeCtx, activeProperty, '@language');
    const direction = _getContextValue$1(activeCtx, activeProperty, '@direction');
    const container =
      _getContextValue$1(activeCtx, activeProperty, '@container') || [];

    // whether or not the value has an @index that must be preserved
    const preserveIndex = '@index' in value && !container.includes('@index');

    // if there's no @index to preserve ...
    if(!preserveIndex && type !== '@none') {
      // matching @type or @language specified in context, compact value
      if(value['@type'] === type) {
        return value['@value'];
      }
      if('@language' in value && value['@language'] === language &&
         '@direction' in value && value['@direction'] === direction) {
        return value['@value'];
      }
      if('@language' in value && value['@language'] === language) {
        return value['@value'];
      }
      if('@direction' in value && value['@direction'] === direction) {
        return value['@value'];
      }
    }

    // return just the value of @value if all are true:
    // 1. @value is the only key or @index isn't being preserved
    // 2. there is no default language or @value is not a string or
    //   the key has a mapping with a null @language
    const keyCount = Object.keys(value).length;
    const isValueOnlyKey = (keyCount === 1 ||
      (keyCount === 2 && '@index' in value && !preserveIndex));
    const hasDefaultLanguage = ('@language' in activeCtx);
    const isValueString = _isString$3(value['@value']);
    const hasNullMapping = (activeCtx.mappings.has(activeProperty) &&
      activeCtx.mappings.get(activeProperty)['@language'] === null);
    if(isValueOnlyKey &&
      type !== '@none' &&
      (!hasDefaultLanguage || !isValueString || hasNullMapping)) {
      return value['@value'];
    }

    const rval = {};

    // preserve @index
    if(preserveIndex) {
      rval[api$e.compactIri({
        activeCtx,
        iri: '@index',
        relativeTo: {vocab: true}
      })] = value['@index'];
    }

    if('@type' in value) {
      // compact @type IRI
      rval[api$e.compactIri({
        activeCtx,
        iri: '@type',
        relativeTo: {vocab: true}
      })] = api$e.compactIri(
        {activeCtx, iri: value['@type'], relativeTo: {vocab: true}});
    } else if('@language' in value) {
      // alias @language
      rval[api$e.compactIri({
        activeCtx,
        iri: '@language',
        relativeTo: {vocab: true}
      })] = value['@language'];
    }

    if('@direction' in value) {
      // alias @direction
      rval[api$e.compactIri({
        activeCtx,
        iri: '@direction',
        relativeTo: {vocab: true}
      })] = value['@direction'];
    }

    // alias @value
    rval[api$e.compactIri({
      activeCtx,
      iri: '@value',
      relativeTo: {vocab: true}
    })] = value['@value'];

    return rval;
  }

  // value is a subject reference
  const expandedProperty = _expandIri$2(activeCtx, activeProperty, {vocab: true},
    options);
  const type = _getContextValue$1(activeCtx, activeProperty, '@type');
  const compacted = api$e.compactIri({
    activeCtx,
    iri: value['@id'],
    relativeTo: {vocab: type === '@vocab'},
    base: options.base});

  // compact to scalar
  if(type === '@id' || type === '@vocab' || expandedProperty === '@graph') {
    return compacted;
  }

  return {
    [api$e.compactIri({
      activeCtx,
      iri: '@id',
      relativeTo: {vocab: true}
    })]: compacted
  };
};

/**
 * Picks the preferred compaction term from the given inverse context entry.
 *
 * @param activeCtx the active context.
 * @param iri the IRI to pick the term for.
 * @param value the value to pick the term for.
 * @param containers the preferred containers.
 * @param typeOrLanguage either '@type' or '@language'.
 * @param typeOrLanguageValue the preferred value for '@type' or '@language'.
 *
 * @return the preferred term.
 */
function _selectTerm(
  activeCtx, iri, value, containers, typeOrLanguage, typeOrLanguageValue) {
  if(typeOrLanguageValue === null) {
    typeOrLanguageValue = '@null';
  }

  // preferences for the value of @type or @language
  const prefs = [];

  // determine prefs for @id based on whether or not value compacts to a term
  if((typeOrLanguageValue === '@id' || typeOrLanguageValue === '@reverse') &&
    _isObject$3(value) && '@id' in value) {
    // prefer @reverse first
    if(typeOrLanguageValue === '@reverse') {
      prefs.push('@reverse');
    }
    // try to compact value to a term
    const term = api$e.compactIri(
      {activeCtx, iri: value['@id'], relativeTo: {vocab: true}});
    if(activeCtx.mappings.has(term) &&
      activeCtx.mappings.get(term) &&
      activeCtx.mappings.get(term)['@id'] === value['@id']) {
      // prefer @vocab
      prefs.push.apply(prefs, ['@vocab', '@id']);
    } else {
      // prefer @id
      prefs.push.apply(prefs, ['@id', '@vocab']);
    }
  } else {
    prefs.push(typeOrLanguageValue);

    // consider direction only
    const langDir = prefs.find(el => el.includes('_'));
    if(langDir) {
      // consider _dir portion
      prefs.push(langDir.replace(/^[^_]+_/, '_'));
    }
  }
  prefs.push('@none');

  const containerMap = activeCtx.inverse[iri];
  for(const container of containers) {
    // if container not available in the map, continue
    if(!(container in containerMap)) {
      continue;
    }

    const typeOrLanguageValueMap = containerMap[container][typeOrLanguage];
    for(const pref of prefs) {
      // if type/language option not available in the map, continue
      if(!(pref in typeOrLanguageValueMap)) {
        continue;
      }

      // select term
      return typeOrLanguageValueMap[pref];
    }
  }

  return null;
}

/**
 * The value of `@nest` in the term definition must either be `@nest`, or a term
 * which resolves to `@nest`.
 *
 * @param activeCtx the active context.
 * @param nestProperty a term in the active context or `@nest`.
 * @param {Object} [options] - processing options.
 */
function _checkNestProperty(activeCtx, nestProperty, options) {
  if(_expandIri$2(activeCtx, nestProperty, {vocab: true}, options) !== '@nest') {
    throw new JsonLdError_1(
      'JSON-LD compact error; nested property must have an @nest value ' +
      'resolving to @nest.',
      'jsonld.SyntaxError', {code: 'invalid @nest value'});
  }
}

/*
 * Copyright (c) 2017-2019 Digital Bazaar, Inc. All rights reserved.
 */

var RequestQueue_1 = class RequestQueue {
  /**
   * Creates a simple queue for requesting documents.
   */
  constructor() {
    this._requests = {};
  }

  wrapLoader(loader) {
    const self = this;
    self._loader = loader;
    return function(/* url */) {
      return self.add.apply(self, arguments);
    };
  }

  async add(url) {
    let promise = this._requests[url];
    if(promise) {
      // URL already queued, wait for it to load
      return Promise.resolve(promise);
    }

    // queue URL and load it
    promise = this._requests[url] = this._loader(url);

    try {
      return await promise;
    } finally {
      delete this._requests[url];
    }
  }
};

const {parseLinkHeader, buildHeaders} = util$1;
const {LINK_HEADER_CONTEXT} = constants;


const {prependBase: prependBase$2} = url;

/**
 * Creates a built-in node document loader.
 *
 * @param options the options to use:
 *          secure: require all URLs to use HTTPS.
 *          strictSSL: true to require SSL certificates to be valid,
 *            false not to (default: true).
 *          maxRedirects: the maximum number of redirects to permit, none by
 *            default.
 *          request: the object which will make the request, default is
 *            provided by `https://www.npmjs.com/package/request`.
 *          headers: an object (map) of headers which will be passed as request
 *            headers for the requested document. Accept is not allowed.
 *
 * @return the node document loader.
 */
var node = ({
  secure,
  strictSSL = true,
  maxRedirects = -1,
  request,
  headers = {}
} = {strictSSL: true, maxRedirects: -1, headers: {}}) => {
  headers = buildHeaders(headers);
  // TODO: use `axios`
  request = request || require$$4;
  const http = require$$4;

  const queue = new RequestQueue_1();
  return queue.wrapLoader(function(url) {
    return loadDocument(url, []);
  });

  async function loadDocument(url, redirects) {
    if(url.indexOf('http:') !== 0 && url.indexOf('https:') !== 0) {
      throw new JsonLdError_1(
        'URL could not be dereferenced; only "http" and "https" URLs are ' +
        'supported.',
        'jsonld.InvalidUrl', {code: 'loading document failed', url});
    }
    if(secure && url.indexOf('https') !== 0) {
      throw new JsonLdError_1(
        'URL could not be dereferenced; secure mode is enabled and ' +
        'the URL\'s scheme is not "https".',
        'jsonld.InvalidUrl', {code: 'loading document failed', url});
    }
    // TODO: disable cache until HTTP caching implemented
    let doc = null;//cache.get(url);
    if(doc !== null) {
      return doc;
    }

    let result;
    let alternate = null;
    try {
      result = await _request(request, {
        url,
        headers,
        strictSSL,
        followRedirect: false
      });
    } catch(e) {
      throw new JsonLdError_1(
        'URL could not be dereferenced, an error occurred.',
        'jsonld.LoadDocumentError',
        {code: 'loading document failed', url, cause: e});
    }

    const {res, body} = result;

    doc = {contextUrl: null, documentUrl: url, document: body || null};

    // handle error
    const statusText = http.STATUS_CODES[res.statusCode];
    if(res.statusCode >= 400) {
      throw new JsonLdError_1(
        `URL "${url}" could not be dereferenced: ${statusText}`,
        'jsonld.InvalidUrl', {
          code: 'loading document failed',
          url,
          httpStatusCode: res.statusCode
        });
    }

    // handle Link Header
    if(res.headers.link &&
      res.headers['content-type'] !== 'application/ld+json') {
      // only 1 related link header permitted
      const linkHeaders = parseLinkHeader(res.headers.link);
      const linkedContext = linkHeaders[LINK_HEADER_CONTEXT];
      if(Array.isArray(linkedContext)) {
        throw new JsonLdError_1(
          'URL could not be dereferenced, it has more than one associated ' +
          'HTTP Link Header.',
          'jsonld.InvalidUrl',
          {code: 'multiple context link headers', url});
      }
      if(linkedContext) {
        doc.contextUrl = linkedContext.target;
      }

      // "alternate" link header is a redirect
      alternate = linkHeaders['alternate'];
      if(alternate &&
        alternate.type == 'application/ld+json' &&
        !(res.headers['content-type'] || '')
          .match(/^application\/(\w*\+)?json$/)) {
        res.headers.location = prependBase$2(url, alternate.target);
      }
    }

    // handle redirect
    if((alternate ||
      res.statusCode >= 300 && res.statusCode < 400) && res.headers.location) {
      if(redirects.length === maxRedirects) {
        throw new JsonLdError_1(
          'URL could not be dereferenced; there were too many redirects.',
          'jsonld.TooManyRedirects', {
            code: 'loading document failed',
            url,
            httpStatusCode: res.statusCode,
            redirects
          });
      }
      if(redirects.indexOf(url) !== -1) {
        throw new JsonLdError_1(
          'URL could not be dereferenced; infinite redirection was detected.',
          'jsonld.InfiniteRedirectDetected', {
            code: 'recursive context inclusion',
            url,
            httpStatusCode: res.statusCode,
            redirects
          });
      }
      redirects.push(url);
      return loadDocument(res.headers.location, redirects);
    }

    // cache for each redirected URL
    redirects.push(url);
    // TODO: disable cache until HTTP caching implemented
    /*
    for(let i = 0; i < redirects.length; ++i) {
      cache.set(
        redirects[i],
        {contextUrl: null, documentUrl: redirects[i], document: body});
    }
    */

    return doc;
  }
};

function _request(request, options) {
  return new Promise((resolve, reject) => {
    request(options, (err, res, body) => {
      if(err) {
        reject(err);
      } else {
        resolve({res, body});
      }
    });
  });
}

const {parseLinkHeader: parseLinkHeader$1, buildHeaders: buildHeaders$1} = util$1;
const {LINK_HEADER_CONTEXT: LINK_HEADER_CONTEXT$1} = constants;


const {prependBase: prependBase$3} = url;

const REGEX_LINK_HEADER$1 = /(^|(\r\n))link:/i;

/**
 * Creates a built-in XMLHttpRequest document loader.
 *
 * @param options the options to use:
 *          secure: require all URLs to use HTTPS.
 *          headers: an object (map) of headers which will be passed as request
 *            headers for the requested document. Accept is not allowed.
 *          [xhr]: the XMLHttpRequest API to use.
 *
 * @return the XMLHttpRequest document loader.
 */
var xhr = ({
  secure,
  headers = {},
  xhr
} = {headers: {}}) => {
  headers = buildHeaders$1(headers);
  const queue = new RequestQueue_1();
  return queue.wrapLoader(loader);

  async function loader(url) {
    if(url.indexOf('http:') !== 0 && url.indexOf('https:') !== 0) {
      throw new JsonLdError_1(
        'URL could not be dereferenced; only "http" and "https" URLs are ' +
        'supported.',
        'jsonld.InvalidUrl', {code: 'loading document failed', url});
    }
    if(secure && url.indexOf('https') !== 0) {
      throw new JsonLdError_1(
        'URL could not be dereferenced; secure mode is enabled and ' +
        'the URL\'s scheme is not "https".',
        'jsonld.InvalidUrl', {code: 'loading document failed', url});
    }

    let req;
    try {
      req = await _get(xhr, url, headers);
    } catch(e) {
      throw new JsonLdError_1(
        'URL could not be dereferenced, an error occurred.',
        'jsonld.LoadDocumentError',
        {code: 'loading document failed', url, cause: e});
    }

    if(req.status >= 400) {
      throw new JsonLdError_1(
        'URL could not be dereferenced: ' + req.statusText,
        'jsonld.LoadDocumentError', {
          code: 'loading document failed',
          url,
          httpStatusCode: req.status
        });
    }

    let doc = {contextUrl: null, documentUrl: url, document: req.response};
    let alternate = null;

    // handle Link Header (avoid unsafe header warning by existence testing)
    const contentType = req.getResponseHeader('Content-Type');
    let linkHeader;
    if(REGEX_LINK_HEADER$1.test(req.getAllResponseHeaders())) {
      linkHeader = req.getResponseHeader('Link');
    }
    if(linkHeader && contentType !== 'application/ld+json') {
      // only 1 related link header permitted
      const linkHeaders = parseLinkHeader$1(req.headers.link);
      const linkedContext = linkHeaders[LINK_HEADER_CONTEXT$1];
      if(Array.isArray(linkedContext)) {
        throw new JsonLdError_1(
          'URL could not be dereferenced, it has more than one ' +
          'associated HTTP Link Header.',
          'jsonld.InvalidUrl',
          {code: 'multiple context link headers', url});
      }
      if(linkedContext) {
        doc.contextUrl = linkedContext.target;
      }

      // "alternate" link header is a redirect
      alternate = linkHeaders['alternate'];
      if(alternate &&
        alternate.type == 'application/ld+json' &&
        !(contentType || '').match(/^application\/(\w*\+)?json$/)) {
        doc = await loader(prependBase$3(url, alternate.target));
      }
    }

    return doc;
  }
};

function _get(xhr, url, headers) {
  xhr = xhr || XMLHttpRequest;
  const req = new xhr();
  return new Promise((resolve, reject) => {
    req.onload = () => resolve(req);
    req.onerror = err => reject(err);
    req.open('GET', url, true);
    for(const k in headers) {
      req.setRequestHeader(k, headers[k]);
    }
    req.send();
  });
}

/*
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */

var JsonLdProcessor = jsonld => {
  class JsonLdProcessor {
    toString() {
      return '[object JsonLdProcessor]';
    }
  }
  Object.defineProperty(JsonLdProcessor, 'prototype', {
    writable: false,
    enumerable: false
  });
  Object.defineProperty(JsonLdProcessor.prototype, 'constructor', {
    writable: true,
    enumerable: false,
    configurable: true,
    value: JsonLdProcessor
  });

  // The Web IDL test harness will check the number of parameters defined in
  // the functions below. The number of parameters must exactly match the
  // required (non-optional) parameters of the JsonLdProcessor interface as
  // defined here:
  // https://www.w3.org/TR/json-ld-api/#the-jsonldprocessor-interface

  JsonLdProcessor.compact = function(input, ctx) {
    if(arguments.length < 2) {
      return Promise.reject(
        new TypeError('Could not compact, too few arguments.'));
    }
    return jsonld.compact(input, ctx);
  };
  JsonLdProcessor.expand = function(input) {
    if(arguments.length < 1) {
      return Promise.reject(
        new TypeError('Could not expand, too few arguments.'));
    }
    return jsonld.expand(input);
  };
  JsonLdProcessor.flatten = function(input) {
    if(arguments.length < 1) {
      return Promise.reject(
        new TypeError('Could not flatten, too few arguments.'));
    }
    return jsonld.flatten(input);
  };

  return JsonLdProcessor;
};

/**
 * A JavaScript implementation of the JSON-LD API.
 *
 * @author Dave Longley
 *
 * @license BSD 3-Clause License
 * Copyright (c) 2011-2019 Digital Bazaar, Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice,
 * this list of conditions and the following disclaimer.
 *
 * Redistributions in binary form must reproduce the above copyright
 * notice, this list of conditions and the following disclaimer in the
 * documentation and/or other materials provided with the distribution.
 *
 * Neither the name of the Digital Bazaar, Inc. nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
 * IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED
 * TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
 * PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */



const IdentifierIssuer$1 = util$1.IdentifierIssuer;





const {expand: _expand} = expand;
const {flatten: _flatten} = flatten;
const {fromRDF: _fromRDF} = fromRdf;
const {toRDF: _toRDF} = toRdf;

const {
  frameMergedOrDefault: _frameMergedOrDefault,
  cleanupNull: _cleanupNull
} = frame;

const {
  isArray: _isArray$4,
  isObject: _isObject$4,
  isString: _isString$4
} = types;

const {
  isSubjectReference: _isSubjectReference$2,
} = graphTypes;

const {
  expandIri: _expandIri$3,
  getInitialContext: _getInitialContext,
  process: _processContext$2,
  processingMode: _processingMode$2
} = context;

const {
  compact: _compact,
  compactIri: _compactIri
} = compact;

const {
  createNodeMap: _createNodeMap$1,
  createMergedNodeMap: _createMergedNodeMap$1,
  mergeNodeMaps: _mergeNodeMaps
} = nodeMap;

// determine if in-browser or using Node.js
const _nodejs = (
  typeof process !== 'undefined' && process.versions && process.versions.node);
const _browser = !_nodejs &&
  (typeof window !== 'undefined' || typeof self !== 'undefined');

/* eslint-disable indent */
// attaches jsonld API to the given object
const wrapper = function(jsonld) {

/** Registered RDF dataset parsers hashed by content-type. */
const _rdfParsers = {};

// resolved context cache
// TODO: consider basing max on context size rather than number
const RESOLVED_CONTEXT_CACHE_MAX_SIZE = 100;
const _resolvedContextCache = new lruCache({max: RESOLVED_CONTEXT_CACHE_MAX_SIZE});

/* Core API */

/**
 * Performs JSON-LD compaction.
 *
 * @param input the JSON-LD input to compact.
 * @param ctx the context to compact with.
 * @param [options] options to use:
 *          [base] the base IRI to use.
 *          [compactArrays] true to compact arrays to single values when
 *            appropriate, false not to (default: true).
 *          [compactToRelative] true to compact IRIs to be relative to document
 *            base, false to keep absolute (default: true)
 *          [graph] true to always output a top-level graph (default: false).
 *          [expandContext] a context to expand with.
 *          [skipExpansion] true to assume the input is expanded and skip
 *            expansion, false not to, defaults to false.
 *          [documentLoader(url, options)] the document loader.
 *          [expansionMap(info)] a function that can be used to custom map
 *            unmappable values (or to throw an error when they are detected);
 *            if this function returns `undefined` then the default behavior
 *            will be used.
 *          [framing] true if compaction is occuring during a framing operation.
 *          [compactionMap(info)] a function that can be used to custom map
 *            unmappable values (or to throw an error when they are detected);
 *            if this function returns `undefined` then the default behavior
 *            will be used.
 *          [contextResolver] internal use only.
 *
 * @return a Promise that resolves to the compacted output.
 */
jsonld.compact = async function(input, ctx, options) {
  if(arguments.length < 2) {
    throw new TypeError('Could not compact, too few arguments.');
  }

  if(ctx === null) {
    throw new JsonLdError_1(
      'The compaction context must not be null.',
      'jsonld.CompactError', {code: 'invalid local context'});
  }

  // nothing to compact
  if(input === null) {
    return null;
  }

  // set default options
  options = _setDefaults(options, {
    base: _isString$4(input) ? input : '',
    compactArrays: true,
    compactToRelative: true,
    graph: false,
    skipExpansion: false,
    link: false,
    issuer: new IdentifierIssuer$1('_:b'),
    contextResolver: new ContextResolver_1(
      {sharedCache: _resolvedContextCache})
  });
  if(options.link) {
    // force skip expansion when linking, "link" is not part of the public
    // API, it should only be called from framing
    options.skipExpansion = true;
  }
  if(!options.compactToRelative) {
    delete options.base;
  }

  // expand input
  let expanded;
  if(options.skipExpansion) {
    expanded = input;
  } else {
    expanded = await jsonld.expand(input, options);
  }

  // process context
  const activeCtx = await jsonld.processContext(
    _getInitialContext(options), ctx, options);

  // do compaction
  let compacted = await _compact({
    activeCtx,
    element: expanded,
    options,
    compactionMap: options.compactionMap
  });

  // perform clean up
  if(options.compactArrays && !options.graph && _isArray$4(compacted)) {
    if(compacted.length === 1) {
      // simplify to a single item
      compacted = compacted[0];
    } else if(compacted.length === 0) {
      // simplify to an empty object
      compacted = {};
    }
  } else if(options.graph && _isObject$4(compacted)) {
    // always use array if graph option is on
    compacted = [compacted];
  }

  // follow @context key
  if(_isObject$4(ctx) && '@context' in ctx) {
    ctx = ctx['@context'];
  }

  // build output context
  ctx = util$1.clone(ctx);
  if(!_isArray$4(ctx)) {
    ctx = [ctx];
  }
  // remove empty contexts
  const tmp = ctx;
  ctx = [];
  for(let i = 0; i < tmp.length; ++i) {
    if(!_isObject$4(tmp[i]) || Object.keys(tmp[i]).length > 0) {
      ctx.push(tmp[i]);
    }
  }

  // remove array if only one context
  const hasContext = (ctx.length > 0);
  if(ctx.length === 1) {
    ctx = ctx[0];
  }

  // add context and/or @graph
  if(_isArray$4(compacted)) {
    // use '@graph' keyword
    const graphAlias = _compactIri({
      activeCtx, iri: '@graph', relativeTo: {vocab: true}
    });
    const graph = compacted;
    compacted = {};
    if(hasContext) {
      compacted['@context'] = ctx;
    }
    compacted[graphAlias] = graph;
  } else if(_isObject$4(compacted) && hasContext) {
    // reorder keys so @context is first
    const graph = compacted;
    compacted = {'@context': ctx};
    for(const key in graph) {
      compacted[key] = graph[key];
    }
  }

  return compacted;
};

/**
 * Performs JSON-LD expansion.
 *
 * @param input the JSON-LD input to expand.
 * @param [options] the options to use:
 *          [base] the base IRI to use.
 *          [expandContext] a context to expand with.
 *          [keepFreeFloatingNodes] true to keep free-floating nodes,
 *            false not to, defaults to false.
 *          [documentLoader(url, options)] the document loader.
 *          [expansionMap(info)] a function that can be used to custom map
 *            unmappable values (or to throw an error when they are detected);
 *            if this function returns `undefined` then the default behavior
 *            will be used.
 *          [contextResolver] internal use only.
 *
 * @return a Promise that resolves to the expanded output.
 */
jsonld.expand = async function(input, options) {
  if(arguments.length < 1) {
    throw new TypeError('Could not expand, too few arguments.');
  }

  // set default options
  options = _setDefaults(options, {
    keepFreeFloatingNodes: false,
    contextResolver: new ContextResolver_1(
      {sharedCache: _resolvedContextCache})
  });
  if(options.expansionMap === false) {
    options.expansionMap = undefined;
  }

  // build set of objects that may have @contexts to resolve
  const toResolve = {};

  // build set of contexts to process prior to expansion
  const contextsToProcess = [];

  // if an `expandContext` has been given ensure it gets resolved
  if('expandContext' in options) {
    const expandContext = util$1.clone(options.expandContext);
    if(_isObject$4(expandContext) && '@context' in expandContext) {
      toResolve.expandContext = expandContext;
    } else {
      toResolve.expandContext = {'@context': expandContext};
    }
    contextsToProcess.push(toResolve.expandContext);
  }

  // if input is a string, attempt to dereference remote document
  let defaultBase;
  if(!_isString$4(input)) {
    // input is not a URL, do not need to retrieve it first
    toResolve.input = util$1.clone(input);
  } else {
    // load remote doc
    const remoteDoc = await jsonld.get(input, options);
    defaultBase = remoteDoc.documentUrl;
    toResolve.input = remoteDoc.document;
    if(remoteDoc.contextUrl) {
      // context included in HTTP link header and must be resolved
      toResolve.remoteContext = {'@context': remoteDoc.contextUrl};
      contextsToProcess.push(toResolve.remoteContext);
    }
  }

  // set default base
  if(!('base' in options)) {
    options.base = defaultBase || '';
  }

  // process any additional contexts
  let activeCtx = _getInitialContext(options);
  for(const localCtx of contextsToProcess) {
    activeCtx = await _processContext$2({activeCtx, localCtx, options});
  }

  // expand resolved input
  let expanded = await _expand({
    activeCtx,
    element: toResolve.input,
    options,
    expansionMap: options.expansionMap
  });

  // optimize away @graph with no other properties
  if(_isObject$4(expanded) && ('@graph' in expanded) &&
    Object.keys(expanded).length === 1) {
    expanded = expanded['@graph'];
  } else if(expanded === null) {
    expanded = [];
  }

  // normalize to an array
  if(!_isArray$4(expanded)) {
    expanded = [expanded];
  }

  return expanded;
};

/**
 * Performs JSON-LD flattening.
 *
 * @param input the JSON-LD to flatten.
 * @param ctx the context to use to compact the flattened output, or null.
 * @param [options] the options to use:
 *          [base] the base IRI to use.
 *          [expandContext] a context to expand with.
 *          [documentLoader(url, options)] the document loader.
 *          [contextResolver] internal use only.
 *
 * @return a Promise that resolves to the flattened output.
 */
jsonld.flatten = async function(input, ctx, options) {
  if(arguments.length < 1) {
    return new TypeError('Could not flatten, too few arguments.');
  }

  if(typeof ctx === 'function') {
    ctx = null;
  } else {
    ctx = ctx || null;
  }

  // set default options
  options = _setDefaults(options, {
    base: _isString$4(input) ? input : '',
    contextResolver: new ContextResolver_1(
      {sharedCache: _resolvedContextCache})
  });

  // expand input
  const expanded = await jsonld.expand(input, options);

  // do flattening
  const flattened = _flatten(expanded);

  if(ctx === null) {
    // no compaction required
    return flattened;
  }

  // compact result (force @graph option to true, skip expansion)
  options.graph = true;
  options.skipExpansion = true;
  const compacted = await jsonld.compact(flattened, ctx, options);

  return compacted;
};

/**
 * Performs JSON-LD framing.
 *
 * @param input the JSON-LD input to frame.
 * @param frame the JSON-LD frame to use.
 * @param [options] the framing options.
 *          [base] the base IRI to use.
 *          [expandContext] a context to expand with.
 *          [embed] default @embed flag: '@last', '@always', '@never', '@link'
 *            (default: '@last').
 *          [explicit] default @explicit flag (default: false).
 *          [requireAll] default @requireAll flag (default: true).
 *          [omitDefault] default @omitDefault flag (default: false).
 *          [documentLoader(url, options)] the document loader.
 *          [contextResolver] internal use only.
 *
 * @return a Promise that resolves to the framed output.
 */
jsonld.frame = async function(input, frame, options) {
  if(arguments.length < 2) {
    throw new TypeError('Could not frame, too few arguments.');
  }

  // set default options
  options = _setDefaults(options, {
    base: _isString$4(input) ? input : '',
    embed: '@once',
    explicit: false,
    requireAll: false,
    omitDefault: false,
    bnodesToClear: [],
    contextResolver: new ContextResolver_1(
      {sharedCache: _resolvedContextCache})
  });

  // if frame is a string, attempt to dereference remote document
  if(_isString$4(frame)) {
    // load remote doc
    const remoteDoc = await jsonld.get(frame, options);
    frame = remoteDoc.document;

    if(remoteDoc.contextUrl) {
      // inject link header @context into frame
      let ctx = frame['@context'];
      if(!ctx) {
        ctx = remoteDoc.contextUrl;
      } else if(_isArray$4(ctx)) {
        ctx.push(remoteDoc.contextUrl);
      } else {
        ctx = [ctx, remoteDoc.contextUrl];
      }
      frame['@context'] = ctx;
    }
  }

  const frameContext = frame ? frame['@context'] || {} : {};

  // process context
  const activeCtx = await jsonld.processContext(
    _getInitialContext(options), frameContext, options);

  // mode specific defaults
  if(!options.hasOwnProperty('omitGraph')) {
    options.omitGraph = _processingMode$2(activeCtx, 1.1);
  }
  if(!options.hasOwnProperty('pruneBlankNodeIdentifiers')) {
    options.pruneBlankNodeIdentifiers = _processingMode$2(activeCtx, 1.1);
  }

  // expand input
  const expanded = await jsonld.expand(input, options);

  // expand frame
  const opts = {...options};
  opts.isFrame = true;
  opts.keepFreeFloatingNodes = true;
  const expandedFrame = await jsonld.expand(frame, opts);

  // if the unexpanded frame includes a key expanding to @graph, frame the
  // default graph, otherwise, the merged graph
  const frameKeys = Object.keys(frame)
    .map(key => _expandIri$3(activeCtx, key, {vocab: true}));
  opts.merged = !frameKeys.includes('@graph');
  opts.is11 = _processingMode$2(activeCtx, 1.1);

  // do framing
  const framed = _frameMergedOrDefault(expanded, expandedFrame, opts);

  opts.graph = !options.omitGraph;
  opts.skipExpansion = true;
  opts.link = {};
  opts.framing = true;
  let compacted = await jsonld.compact(framed, frameContext, opts);

  // replace @null with null, compacting arrays
  opts.link = {};
  compacted = _cleanupNull(compacted, opts);

  return compacted;
};

/**
 * **Experimental**
 *
 * Links a JSON-LD document's nodes in memory.
 *
 * @param input the JSON-LD document to link.
 * @param [ctx] the JSON-LD context to apply.
 * @param [options] the options to use:
 *          [base] the base IRI to use.
 *          [expandContext] a context to expand with.
 *          [documentLoader(url, options)] the document loader.
 *          [contextResolver] internal use only.
 *
 * @return a Promise that resolves to the linked output.
 */
jsonld.link = async function(input, ctx, options) {
  // API matches running frame with a wildcard frame and embed: '@link'
  // get arguments
  const frame = {};
  if(ctx) {
    frame['@context'] = ctx;
  }
  frame['@embed'] = '@link';
  return jsonld.frame(input, frame, options);
};

/**
 * Performs RDF dataset normalization on the given input. The input is JSON-LD
 * unless the 'inputFormat' option is used. The output is an RDF dataset
 * unless the 'format' option is used.
 *
 * @param input the input to normalize as JSON-LD or as a format specified by
 *          the 'inputFormat' option.
 * @param [options] the options to use:
 *          [algorithm] the normalization algorithm to use, `URDNA2015` or
 *            `URGNA2012` (default: `URDNA2015`).
 *          [base] the base IRI to use.
 *          [expandContext] a context to expand with.
 *          [skipExpansion] true to assume the input is expanded and skip
 *            expansion, false not to, defaults to false.
 *          [inputFormat] the format if input is not JSON-LD:
 *            'application/n-quads' for N-Quads.
 *          [format] the format if output is a string:
 *            'application/n-quads' for N-Quads.
 *          [documentLoader(url, options)] the document loader.
 *          [useNative] true to use a native canonize algorithm
 *          [contextResolver] internal use only.
 *
 * @return a Promise that resolves to the normalized output.
 */
jsonld.normalize = jsonld.canonize = async function(input, options) {
  if(arguments.length < 1) {
    throw new TypeError('Could not canonize, too few arguments.');
  }

  // set default options
  options = _setDefaults(options, {
    base: _isString$4(input) ? input : '',
    algorithm: 'URDNA2015',
    skipExpansion: false,
    contextResolver: new ContextResolver_1(
      {sharedCache: _resolvedContextCache})
  });
  if('inputFormat' in options) {
    if(options.inputFormat !== 'application/n-quads' &&
      options.inputFormat !== 'application/nquads') {
      throw new JsonLdError_1(
        'Unknown canonicalization input format.',
        'jsonld.CanonizeError');
    }
    // TODO: `await` for async parsers
    const parsedInput = NQuads.parse(input);

    // do canonicalization
    return lib.canonize(parsedInput, options);
  }

  // convert to RDF dataset then do normalization
  const opts = {...options};
  delete opts.format;
  opts.produceGeneralizedRdf = false;
  const dataset = await jsonld.toRDF(input, opts);

  // do canonicalization
  return lib.canonize(dataset, options);
};

/**
 * Converts an RDF dataset to JSON-LD.
 *
 * @param dataset a serialized string of RDF in a format specified by the
 *          format option or an RDF dataset to convert.
 * @param [options] the options to use:
 *          [format] the format if dataset param must first be parsed:
 *            'application/n-quads' for N-Quads (default).
 *          [rdfParser] a custom RDF-parser to use to parse the dataset.
 *          [useRdfType] true to use rdf:type, false to use @type
 *            (default: false).
 *          [useNativeTypes] true to convert XSD types into native types
 *            (boolean, integer, double), false not to (default: false).
 *
 * @return a Promise that resolves to the JSON-LD document.
 */
jsonld.fromRDF = async function(dataset, options) {
  if(arguments.length < 1) {
    throw new TypeError('Could not convert from RDF, too few arguments.');
  }

  // set default options
  options = _setDefaults(options, {
    format: _isString$4(dataset) ? 'application/n-quads' : undefined
  });

  const {format} = options;
  let {rdfParser} = options;

  // handle special format
  if(format) {
    // check supported formats
    rdfParser = rdfParser || _rdfParsers[format];
    if(!rdfParser) {
      throw new JsonLdError_1(
        'Unknown input format.',
        'jsonld.UnknownFormat', {format});
    }
  } else {
    // no-op parser, assume dataset already parsed
    rdfParser = () => dataset;
  }

  // rdfParser must be synchronous or return a promise, no callback support
  const parsedDataset = await rdfParser(dataset);
  return _fromRDF(parsedDataset, options);
};

/**
 * Outputs the RDF dataset found in the given JSON-LD object.
 *
 * @param input the JSON-LD input.
 * @param [options] the options to use:
 *          [base] the base IRI to use.
 *          [expandContext] a context to expand with.
 *          [skipExpansion] true to assume the input is expanded and skip
 *            expansion, false not to, defaults to false.
 *          [format] the format to use to output a string:
 *            'application/n-quads' for N-Quads.
 *          [produceGeneralizedRdf] true to output generalized RDF, false
 *            to produce only standard RDF (default: false).
 *          [documentLoader(url, options)] the document loader.
 *          [contextResolver] internal use only.
 *
 * @return a Promise that resolves to the RDF dataset.
 */
jsonld.toRDF = async function(input, options) {
  if(arguments.length < 1) {
    throw new TypeError('Could not convert to RDF, too few arguments.');
  }

  // set default options
  options = _setDefaults(options, {
    base: _isString$4(input) ? input : '',
    skipExpansion: false,
    contextResolver: new ContextResolver_1(
      {sharedCache: _resolvedContextCache})
  });

  // TODO: support toRDF custom map?
  let expanded;
  if(options.skipExpansion) {
    expanded = input;
  } else {
    // expand input
    expanded = await jsonld.expand(input, options);
  }

  // output RDF dataset
  const dataset = _toRDF(expanded, options);
  if(options.format) {
    if(options.format === 'application/n-quads' ||
      options.format === 'application/nquads') {
      return await NQuads.serialize(dataset);
    }
    throw new JsonLdError_1(
      'Unknown output format.',
      'jsonld.UnknownFormat', {format: options.format});
  }

  return dataset;
};

/**
 * **Experimental**
 *
 * Recursively flattens the nodes in the given JSON-LD input into a merged
 * map of node ID => node. All graphs will be merged into the default graph.
 *
 * @param input the JSON-LD input.
 * @param [options] the options to use:
 *          [base] the base IRI to use.
 *          [expandContext] a context to expand with.
 *          [issuer] a jsonld.IdentifierIssuer to use to label blank nodes.
 *          [documentLoader(url, options)] the document loader.
 *          [contextResolver] internal use only.
 *
 * @return a Promise that resolves to the merged node map.
 */
jsonld.createNodeMap = async function(input, options) {
  if(arguments.length < 1) {
    throw new TypeError('Could not create node map, too few arguments.');
  }

  // set default options
  options = _setDefaults(options, {
    base: _isString$4(input) ? input : '',
    contextResolver: new ContextResolver_1(
      {sharedCache: _resolvedContextCache})
  });

  // expand input
  const expanded = await jsonld.expand(input, options);

  return _createMergedNodeMap$1(expanded, options);
};

/**
 * **Experimental**
 *
 * Merges two or more JSON-LD documents into a single flattened document.
 *
 * @param docs the JSON-LD documents to merge together.
 * @param ctx the context to use to compact the merged result, or null.
 * @param [options] the options to use:
 *          [base] the base IRI to use.
 *          [expandContext] a context to expand with.
 *          [issuer] a jsonld.IdentifierIssuer to use to label blank nodes.
 *          [mergeNodes] true to merge properties for nodes with the same ID,
 *            false to ignore new properties for nodes with the same ID once
 *            the ID has been defined; note that this may not prevent merging
 *            new properties where a node is in the `object` position
 *            (default: true).
 *          [documentLoader(url, options)] the document loader.
 *          [contextResolver] internal use only.
 *
 * @return a Promise that resolves to the merged output.
 */
jsonld.merge = async function(docs, ctx, options) {
  if(arguments.length < 1) {
    throw new TypeError('Could not merge, too few arguments.');
  }
  if(!_isArray$4(docs)) {
    throw new TypeError('Could not merge, "docs" must be an array.');
  }

  if(typeof ctx === 'function') {
    ctx = null;
  } else {
    ctx = ctx || null;
  }

  // set default options
  options = _setDefaults(options, {
    contextResolver: new ContextResolver_1(
      {sharedCache: _resolvedContextCache})
  });

  // expand all documents
  const expanded = await Promise.all(docs.map(doc => {
    const opts = {...options};
    return jsonld.expand(doc, opts);
  }));

  let mergeNodes = true;
  if('mergeNodes' in options) {
    mergeNodes = options.mergeNodes;
  }

  const issuer = options.issuer || new IdentifierIssuer$1('_:b');
  const graphs = {'@default': {}};

  for(let i = 0; i < expanded.length; ++i) {
    // uniquely relabel blank nodes
    const doc = util$1.relabelBlankNodes(expanded[i], {
      issuer: new IdentifierIssuer$1('_:b' + i + '-')
    });

    // add nodes to the shared node map graphs if merging nodes, to a
    // separate graph set if not
    const _graphs = (mergeNodes || i === 0) ? graphs : {'@default': {}};
    _createNodeMap$1(doc, _graphs, '@default', issuer);

    if(_graphs !== graphs) {
      // merge document graphs but don't merge existing nodes
      for(const graphName in _graphs) {
        const _nodeMap = _graphs[graphName];
        if(!(graphName in graphs)) {
          graphs[graphName] = _nodeMap;
          continue;
        }
        const nodeMap = graphs[graphName];
        for(const key in _nodeMap) {
          if(!(key in nodeMap)) {
            nodeMap[key] = _nodeMap[key];
          }
        }
      }
    }
  }

  // add all non-default graphs to default graph
  const defaultGraph = _mergeNodeMaps(graphs);

  // produce flattened output
  const flattened = [];
  const keys = Object.keys(defaultGraph).sort();
  for(let ki = 0; ki < keys.length; ++ki) {
    const node = defaultGraph[keys[ki]];
    // only add full subjects to top-level
    if(!_isSubjectReference$2(node)) {
      flattened.push(node);
    }
  }

  if(ctx === null) {
    return flattened;
  }

  // compact result (force @graph option to true, skip expansion)
  options.graph = true;
  options.skipExpansion = true;
  const compacted = await jsonld.compact(flattened, ctx, options);

  return compacted;
};

/**
 * The default document loader for external documents.
 *
 * @param url the URL to load.
 *
 * @return a promise that resolves to the remote document.
 */
Object.defineProperty(jsonld, 'documentLoader', {
  get: () => jsonld._documentLoader,
  set: v => jsonld._documentLoader = v
});
// default document loader not implemented
jsonld.documentLoader = async url => {
  throw new JsonLdError_1(
    'Could not retrieve a JSON-LD document from the URL. URL ' +
    'dereferencing not implemented.', 'jsonld.LoadDocumentError',
    {code: 'loading document failed', url});
};

/**
 * Gets a remote JSON-LD document using the default document loader or
 * one given in the passed options.
 *
 * @param url the URL to fetch.
 * @param [options] the options to use:
 *          [documentLoader] the document loader to use.
 *
 * @return a Promise that resolves to the retrieved remote document.
 */
jsonld.get = async function(url, options) {
  let load;
  if(typeof options.documentLoader === 'function') {
    load = options.documentLoader;
  } else {
    load = jsonld.documentLoader;
  }

  const remoteDoc = await load(url);

  try {
    if(!remoteDoc.document) {
      throw new JsonLdError_1(
        'No remote document found at the given URL.',
        'jsonld.NullRemoteDocument');
    }
    if(_isString$4(remoteDoc.document)) {
      remoteDoc.document = JSON.parse(remoteDoc.document);
    }
  } catch(e) {
    throw new JsonLdError_1(
      'Could not retrieve a JSON-LD document from the URL.',
      'jsonld.LoadDocumentError', {
        code: 'loading document failed',
        cause: e,
        remoteDoc
      });
  }

  return remoteDoc;
};

/**
 * Processes a local context, resolving any URLs as necessary, and returns a
 * new active context.
 *
 * @param activeCtx the current active context.
 * @param localCtx the local context to process.
 * @param [options] the options to use:
 *          [documentLoader(url, options)] the document loader.
 *          [contextResolver] internal use only.
 *
 * @return a Promise that resolves to the new active context.
 */
jsonld.processContext = async function(
  activeCtx, localCtx, options) {
  // set default options
  options = _setDefaults(options, {
    base: '',
    contextResolver: new ContextResolver_1(
      {sharedCache: _resolvedContextCache})
  });

  // return initial context early for null context
  if(localCtx === null) {
    return _getInitialContext(options);
  }

  // get URLs in localCtx
  localCtx = util$1.clone(localCtx);
  if(!(_isObject$4(localCtx) && '@context' in localCtx)) {
    localCtx = {'@context': localCtx};
  }

  return _processContext$2({activeCtx, localCtx, options});
};

// backwards compatibility
jsonld.getContextValue = context.getContextValue;

/**
 * Document loaders.
 */
jsonld.documentLoaders = {};
jsonld.documentLoaders.node = node;
jsonld.documentLoaders.xhr = xhr;

/**
 * Assigns the default document loader for external document URLs to a built-in
 * default. Supported types currently include: 'xhr' and 'node'.
 *
 * @param type the type to set.
 * @param [params] the parameters required to use the document loader.
 */
jsonld.useDocumentLoader = function(type) {
  if(!(type in jsonld.documentLoaders)) {
    throw new JsonLdError_1(
      'Unknown document loader type: "' + type + '"',
      'jsonld.UnknownDocumentLoader',
      {type});
  }

  // set document loader
  jsonld.documentLoader = jsonld.documentLoaders[type].apply(
    jsonld, Array.prototype.slice.call(arguments, 1));
};

/**
 * Registers an RDF dataset parser by content-type, for use with
 * jsonld.fromRDF. An RDF dataset parser will always be given one parameter,
 * a string of input. An RDF dataset parser can be synchronous or
 * asynchronous (by returning a promise).
 *
 * @param contentType the content-type for the parser.
 * @param parser(input) the parser function (takes a string as a parameter
 *          and either returns an RDF dataset or a Promise that resolves to one.
 */
jsonld.registerRDFParser = function(contentType, parser) {
  _rdfParsers[contentType] = parser;
};

/**
 * Unregisters an RDF dataset parser by content-type.
 *
 * @param contentType the content-type for the parser.
 */
jsonld.unregisterRDFParser = function(contentType) {
  delete _rdfParsers[contentType];
};

// register the N-Quads RDF parser
jsonld.registerRDFParser('application/n-quads', NQuads.parse);
jsonld.registerRDFParser('application/nquads', NQuads.parse);

// register the RDFa API RDF parser
jsonld.registerRDFParser('rdfa-api', Rdfa_1.parse);

/* URL API */
jsonld.url = url;

/* Utility API */
jsonld.util = util$1;
// backwards compatibility
Object.assign(jsonld, util$1);

// reexpose API as jsonld.promises for backwards compatability
jsonld.promises = jsonld;

// backwards compatibility
jsonld.RequestQueue = RequestQueue_1;

/* WebIDL API */
jsonld.JsonLdProcessor = JsonLdProcessor(jsonld);

// setup browser global JsonLdProcessor
if(_browser && typeof commonjsGlobal.JsonLdProcessor === 'undefined') {
  Object.defineProperty(commonjsGlobal, 'JsonLdProcessor', {
    writable: true,
    enumerable: false,
    configurable: true,
    value: jsonld.JsonLdProcessor
  });
}

// set platform-specific defaults/APIs
if(_nodejs) {
  // use node document loader by default
  jsonld.useDocumentLoader('node');
} else if(typeof XMLHttpRequest !== 'undefined') {
  // use xhr document loader by default
  jsonld.useDocumentLoader('xhr');
}

function _setDefaults(options, {
  documentLoader = jsonld.documentLoader,
  ...defaults
}) {
  return Object.assign({}, {documentLoader}, defaults, options);
}

// end of jsonld API `wrapper` factory
return jsonld;
};

// external APIs:

// used to generate a new jsonld API instance
const factory = function() {
  return wrapper(function() {
    return factory();
  });
};

// wrap the main jsonld API instance
wrapper(factory);
// export API
var jsonld = factory;

var _global = createCommonjsModule(function (module) {
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
});

var _core = createCommonjsModule(function (module) {
var core = module.exports = { version: '2.6.11' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
});
var _core_1 = _core.version;

var _isObject$5 = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

var _anObject = function (it) {
  if (!_isObject$5(it)) throw TypeError(it + ' is not an object!');
  return it;
};

var _fails = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

// Thank's IE8 for his funny defineProperty
var _descriptors = !_fails(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

var document$1 = _global.document;
// typeof document.createElement is 'object' in old IE
var is = _isObject$5(document$1) && _isObject$5(document$1.createElement);
var _domCreate = function (it) {
  return is ? document$1.createElement(it) : {};
};

var _ie8DomDefine = !_descriptors && !_fails(function () {
  return Object.defineProperty(_domCreate('div'), 'a', { get: function () { return 7; } }).a != 7;
});

// 7.1.1 ToPrimitive(input [, PreferredType])

// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
var _toPrimitive = function (it, S) {
  if (!_isObject$5(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !_isObject$5(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !_isObject$5(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !_isObject$5(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

var dP = Object.defineProperty;

var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  _anObject(O);
  P = _toPrimitive(P, true);
  _anObject(Attributes);
  if (_ie8DomDefine) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var _objectDp = {
	f: f
};

var _propertyDesc = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var _hide = _descriptors ? function (object, key, value) {
  return _objectDp.f(object, key, _propertyDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var hasOwnProperty = {}.hasOwnProperty;
var _has = function (it, key) {
  return hasOwnProperty.call(it, key);
};

var id = 0;
var px = Math.random();
var _uid = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

var _shared = createCommonjsModule(function (module) {
var SHARED = '__core-js_shared__';
var store = _global[SHARED] || (_global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: _core.version,
  mode:  'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});
});

var _functionToString = _shared('native-function-to-string', Function.toString);

var _redefine = createCommonjsModule(function (module) {
var SRC = _uid('src');

var TO_STRING = 'toString';
var TPL = ('' + _functionToString).split(TO_STRING);

_core.inspectSource = function (it) {
  return _functionToString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) _has(val, 'name') || _hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) _has(val, SRC) || _hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === _global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    _hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    _hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || _functionToString.call(this);
});
});

var _aFunction = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

// optional / simple context binding

var _ctx = function (fn, that, length) {
  _aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] || (_global[name] = {}) : (_global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? _ctx(out, _global) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
    // extend global
    if (target) _redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) _hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
_global.core = _core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
var _export = $export;

var toString = {}.toString;

var _cof = function (it) {
  return toString.call(it).slice(8, -1);
};

// fallback for non-array-like ES3 and non-enumerable old V8 strings

// eslint-disable-next-line no-prototype-builtins
var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return _cof(it) == 'String' ? it.split('') : Object(it);
};

// 7.2.1 RequireObjectCoercible(argument)
var _defined = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

// to indexed object, toObject with fallback for non-array-like ES3 strings


var _toIobject = function (it) {
  return _iobject(_defined(it));
};

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
var _toInteger = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

// 7.1.15 ToLength

var min = Math.min;
var _toLength = function (it) {
  return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

var max = Math.max;
var min$1 = Math.min;
var _toAbsoluteIndex = function (index, length) {
  index = _toInteger(index);
  return index < 0 ? max(index + length, 0) : min$1(index, length);
};

// false -> Array#indexOf
// true  -> Array#includes



var _arrayIncludes = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = _toIobject($this);
    var length = _toLength(O.length);
    var index = _toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

var shared = _shared('keys');

var _sharedKey = function (key) {
  return shared[key] || (shared[key] = _uid(key));
};

var arrayIndexOf = _arrayIncludes(false);
var IE_PROTO = _sharedKey('IE_PROTO');

var _objectKeysInternal = function (object, names) {
  var O = _toIobject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) _has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (_has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

// IE 8- don't enum bug keys
var _enumBugKeys = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

// 19.1.2.14 / 15.2.3.14 Object.keys(O)



var _objectKeys = Object.keys || function keys(O) {
  return _objectKeysInternal(O, _enumBugKeys);
};

var f$1 = {}.propertyIsEnumerable;

var _objectPie = {
	f: f$1
};

var isEnum = _objectPie.f;
var _objectToArray = function (isEntries) {
  return function (it) {
    var O = _toIobject(it);
    var keys = _objectKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) {
      key = keys[i++];
      if (!_descriptors || isEnum.call(O, key)) {
        result.push(isEntries ? [key, O[key]] : O[key]);
      }
    }
    return result;
  };
};

// https://github.com/tc39/proposal-object-values-entries

var $entries = _objectToArray(true);

_export(_export.S, 'Object', {
  entries: function entries(it) {
    return $entries(it);
  }
});

var entries = _core.Object.entries;

/*
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */

const api$f = {};
var types$1 = api$f;
/**
 * Returns true if the given value is an Array.
 *
 * @param v the value to check.
 *
 * @return true if the value is an Array, false if not.
 */

api$f.isArray = Array.isArray;
/**
 * Returns true if the given value is a Boolean.
 *
 * @param v the value to check.
 *
 * @return true if the value is a Boolean, false if not.
 */

api$f.isBoolean = v => typeof v === 'boolean' || Object.prototype.toString.call(v) === '[object Boolean]';
/**
 * Returns true if the given value is a double.
 *
 * @param v the value to check.
 *
 * @return true if the value is a double, false if not.
 */


api$f.isDouble = v => api$f.isNumber(v) && (String(v).indexOf('.') !== -1 || Math.abs(v) >= 1e21);
/**
 * Returns true if the given value is an empty Object.
 *
 * @param v the value to check.
 *
 * @return true if the value is an empty Object, false if not.
 */


api$f.isEmptyObject = v => api$f.isObject(v) && Object.keys(v).length === 0;
/**
 * Returns true if the given value is a Number.
 *
 * @param v the value to check.
 *
 * @return true if the value is a Number, false if not.
 */


api$f.isNumber = v => typeof v === 'number' || Object.prototype.toString.call(v) === '[object Number]';
/**
 * Returns true if the given value is numeric.
 *
 * @param v the value to check.
 *
 * @return true if the value is numeric, false if not.
 */


api$f.isNumeric = v => !isNaN(parseFloat(v)) && isFinite(v);
/**
 * Returns true if the given value is an Object.
 *
 * @param v the value to check.
 *
 * @return true if the value is an Object, false if not.
 */


api$f.isObject = v => Object.prototype.toString.call(v) === '[object Object]';
/**
 * Returns true if the given value is a String.
 *
 * @param v the value to check.
 *
 * @return true if the value is a String, false if not.
 */


api$f.isString = v => typeof v === 'string' || Object.prototype.toString.call(v) === '[object String]';
/**
 * Returns true if the given value is undefined.
 *
 * @param v the value to check.
 *
 * @return true if the value is undefined, false if not.
 */


api$f.isUndefined = v => typeof v === 'undefined';

const api$g = {};
var graphTypes$1 = api$g;
/**
 * Returns true if the given value is a subject with properties.
 *
 * @param v the value to check.
 *
 * @return true if the value is a subject with properties, false if not.
 */

api$g.isSubject = v => {
  // Note: A value is a subject if all of these hold true:
  // 1. It is an Object.
  // 2. It is not a @value, @set, or @list.
  // 3. It has more than 1 key OR any existing key is not @id.
  if (types$1.isObject(v) && !('@value' in v || '@set' in v || '@list' in v)) {
    const keyCount = Object.keys(v).length;
    return keyCount > 1 || !('@id' in v);
  }

  return false;
};
/**
 * Returns true if the given value is a subject reference.
 *
 * @param v the value to check.
 *
 * @return true if the value is a subject reference, false if not.
 */


api$g.isSubjectReference = v => // Note: A value is a subject reference if all of these hold true:
// 1. It is an Object.
// 2. It has a single key: @id.
types$1.isObject(v) && Object.keys(v).length === 1 && '@id' in v;
/**
 * Returns true if the given value is a @value.
 *
 * @param v the value to check.
 *
 * @return true if the value is a @value, false if not.
 */


api$g.isValue = v => // Note: A value is a @value if all of these hold true:
// 1. It is an Object.
// 2. It has the @value property.
types$1.isObject(v) && '@value' in v;
/**
 * Returns true if the given value is a @list.
 *
 * @param v the value to check.
 *
 * @return true if the value is a @list, false if not.
 */


api$g.isList = v => // Note: A value is a @list if all of these hold true:
// 1. It is an Object.
// 2. It has the @list property.
types$1.isObject(v) && '@list' in v;
/**
 * Returns true if the given value is a @graph.
 *
 * @return true if the value is a @graph, false if not.
 */


api$g.isGraph = v => {
  // Note: A value is a graph if all of these hold true:
  // 1. It is an object.
  // 2. It has an `@graph` key.
  // 3. It may have '@id' or '@index'
  return types$1.isObject(v) && '@graph' in v && Object.keys(v).filter(key => key !== '@id' && key !== '@index').length === 1;
};
/**
 * Returns true if the given value is a simple @graph.
 *
 * @return true if the value is a simple @graph, false if not.
 */


api$g.isSimpleGraph = v => {
  // Note: A value is a simple graph if all of these hold true:
  // 1. It is an object.
  // 2. It has an `@graph` key.
  // 3. It has only 1 key or 2 keys where one of them is `@index`.
  return api$g.isGraph(v) && !('@id' in v);
};
/**
 * Returns true if the given value is a blank node.
 *
 * @param v the value to check.
 *
 * @return true if the value is a blank node, false if not.
 */


api$g.isBlankNode = v => {
  // Note: A value is a blank node if all of these hold true:
  // 1. It is an Object.
  // 2. If it has an @id key its value begins with '_:'.
  // 3. It has no keys OR is not a @value, @set, or @list.
  if (types$1.isObject(v)) {
    if ('@id' in v) {
      return v['@id'].indexOf('_:') === 0;
    }

    return Object.keys(v).length === 0 || !('@value' in v || '@set' in v || '@list' in v);
  }

  return false;
};

/*
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */

var JsonLdError_1$1 = class JsonLdError extends Error {
  /**
   * Creates a JSON-LD Error.
   *
   * @param msg the error message.
   * @param type the error type.
   * @param details the error details.
   */
  constructor(message = 'An unspecified JSON-LD error occurred.', name = 'jsonld.Error', details = {}) {
    super(message);
    this.name = name;
    this.message = message;
    this.details = details;
  }

};

// TODO: move `IdentifierIssuer` to its own package


const IdentifierIssuer$2 = lib.IdentifierIssuer;

 // constants


const REGEX_LINK_HEADERS$1 = /(?:<[^>]*?>|"[^"]*?"|[^,])+/g;
const REGEX_LINK_HEADER$2 = /\s*<([^>]*?)>\s*(?:;\s*(.*))?/;
const REGEX_LINK_HEADER_PARAMS$1 = /(.*?)=(?:(?:"([^"]*?)")|([^"]*?))\s*(?:(?:;\s*)|$)/g;
const DEFAULTS$1 = {
  headers: {
    accept: 'application/ld+json, application/json'
  }
};
const api$h = {};
var util$2 = api$h;
api$h.IdentifierIssuer = IdentifierIssuer$2;
/**
 * Clones an object, array, Map, Set, or string/number. If a typed JavaScript
 * object is given, such as a Date, it will be converted to a string.
 *
 * @param value the value to clone.
 *
 * @return the cloned value.
 */

api$h.clone = function (value) {
  if (value && typeof value === 'object') {
    let rval;

    if (types$1.isArray(value)) {
      rval = [];

      for (let i = 0; i < value.length; ++i) {
        rval[i] = api$h.clone(value[i]);
      }
    } else if (value instanceof Map) {
      rval = new Map();

      for (const [k, v] of value) {
        rval.set(k, api$h.clone(v));
      }
    } else if (value instanceof Set) {
      rval = new Set();

      for (const v of value) {
        rval.add(api$h.clone(v));
      }
    } else if (types$1.isObject(value)) {
      rval = {};

      for (const key in value) {
        rval[key] = api$h.clone(value[key]);
      }
    } else {
      rval = value.toString();
    }

    return rval;
  }

  return value;
};
/**
 * Ensure a value is an array. If the value is an array, it is returned.
 * Otherwise, it is wrapped in an array.
 *
 * @param value the value to return as an array.
 *
 * @return the value as an array.
 */


api$h.asArray = function (value) {
  return Array.isArray(value) ? value : [value];
};
/**
 * Builds an HTTP headers object for making a JSON-LD request from custom
 * headers and asserts the `accept` header isn't overridden.
 *
 * @param headers an object of headers with keys as header names and values
 *          as header values.
 *
 * @return an object of headers with a valid `accept` header.
 */


api$h.buildHeaders = (headers = {}) => {
  const hasAccept = Object.keys(headers).some(h => h.toLowerCase() === 'accept');

  if (hasAccept) {
    throw new RangeError('Accept header may not be specified; only "' + DEFAULTS$1.headers.accept + '" is supported.');
  }

  return Object.assign({
    Accept: DEFAULTS$1.headers.accept
  }, headers);
};
/**
 * Parses a link header. The results will be key'd by the value of "rel".
 *
 * Link: <http://json-ld.org/contexts/person.jsonld>;
 * rel="http://www.w3.org/ns/json-ld#context"; type="application/ld+json"
 *
 * Parses as: {
 *   'http://www.w3.org/ns/json-ld#context': {
 *     target: http://json-ld.org/contexts/person.jsonld,
 *     type: 'application/ld+json'
 *   }
 * }
 *
 * If there is more than one "rel" with the same IRI, then entries in the
 * resulting map for that "rel" will be arrays.
 *
 * @param header the link header to parse.
 */


api$h.parseLinkHeader = header => {
  const rval = {}; // split on unbracketed/unquoted commas

  const entries = header.match(REGEX_LINK_HEADERS$1);

  for (let i = 0; i < entries.length; ++i) {
    let match = entries[i].match(REGEX_LINK_HEADER$2);

    if (!match) {
      continue;
    }

    const result = {
      target: match[1]
    };
    const params = match[2];

    while (match = REGEX_LINK_HEADER_PARAMS$1.exec(params)) {
      result[match[1]] = match[2] === undefined ? match[3] : match[2];
    }

    const rel = result['rel'] || '';

    if (Array.isArray(rval[rel])) {
      rval[rel].push(result);
    } else if (rval.hasOwnProperty(rel)) {
      rval[rel] = [rval[rel], result];
    } else {
      rval[rel] = result;
    }
  }

  return rval;
};
/**
 * Throws an exception if the given value is not a valid @type value.
 *
 * @param v the value to check.
 */


api$h.validateTypeValue = (v, isFrame) => {
  if (types$1.isString(v)) {
    return;
  }

  if (types$1.isArray(v) && v.every(vv => types$1.isString(vv))) {
    return;
  }

  if (isFrame && types$1.isObject(v)) {
    switch (Object.keys(v).length) {
      case 0:
        // empty object is wildcard
        return;

      case 1:
        // default entry is all strings
        if ('@default' in v && api$h.asArray(v['@default']).every(vv => types$1.isString(vv))) {
          return;
        }

    }
  }

  throw new JsonLdError_1$1('Invalid JSON-LD syntax; "@type" value must a string, an array of ' + 'strings, an empty object, ' + 'or a default object.', 'jsonld.SyntaxError', {
    code: 'invalid type value',
    value: v
  });
};
/**
 * Returns true if the given subject has the given property.
 *
 * @param subject the subject to check.
 * @param property the property to look for.
 *
 * @return true if the subject has the given property, false if not.
 */


api$h.hasProperty = (subject, property) => {
  if (subject.hasOwnProperty(property)) {
    const value = subject[property];
    return !types$1.isArray(value) || value.length > 0;
  }

  return false;
};
/**
 * Determines if the given value is a property of the given subject.
 *
 * @param subject the subject to check.
 * @param property the property to check.
 * @param value the value to check.
 *
 * @return true if the value exists, false if not.
 */


api$h.hasValue = (subject, property, value) => {
  if (api$h.hasProperty(subject, property)) {
    let val = subject[property];
    const isList = graphTypes$1.isList(val);

    if (types$1.isArray(val) || isList) {
      if (isList) {
        val = val['@list'];
      }

      for (let i = 0; i < val.length; ++i) {
        if (api$h.compareValues(value, val[i])) {
          return true;
        }
      }
    } else if (!types$1.isArray(value)) {
      // avoid matching the set of values with an array value parameter
      return api$h.compareValues(value, val);
    }
  }

  return false;
};
/**
 * Adds a value to a subject. If the value is an array, all values in the
 * array will be added.
 *
 * @param subject the subject to add the value to.
 * @param property the property that relates the value to the subject.
 * @param value the value to add.
 * @param [options] the options to use:
 *        [propertyIsArray] true if the property is always an array, false
 *          if not (default: false).
 *        [valueIsArray] true if the value to be added should be preserved as
 *          an array (lists) (default: false).
 *        [allowDuplicate] true to allow duplicates, false not to (uses a
 *          simple shallow comparison of subject ID or value) (default: true).
 *        [prependValue] false to prepend value to any existing values.
 *          (default: false)
 */


api$h.addValue = (subject, property, value, options) => {
  options = options || {};

  if (!('propertyIsArray' in options)) {
    options.propertyIsArray = false;
  }

  if (!('valueIsArray' in options)) {
    options.valueIsArray = false;
  }

  if (!('allowDuplicate' in options)) {
    options.allowDuplicate = true;
  }

  if (!('prependValue' in options)) {
    options.prependValue = false;
  }

  if (options.valueIsArray) {
    subject[property] = value;
  } else if (types$1.isArray(value)) {
    if (value.length === 0 && options.propertyIsArray && !subject.hasOwnProperty(property)) {
      subject[property] = [];
    }

    if (options.prependValue) {
      value = value.concat(subject[property]);
      subject[property] = [];
    }

    for (let i = 0; i < value.length; ++i) {
      api$h.addValue(subject, property, value[i], options);
    }
  } else if (subject.hasOwnProperty(property)) {
    // check if subject already has value if duplicates not allowed
    const hasValue = !options.allowDuplicate && api$h.hasValue(subject, property, value); // make property an array if value not present or always an array

    if (!types$1.isArray(subject[property]) && (!hasValue || options.propertyIsArray)) {
      subject[property] = [subject[property]];
    } // add new value


    if (!hasValue) {
      if (options.prependValue) {
        subject[property].unshift(value);
      } else {
        subject[property].push(value);
      }
    }
  } else {
    // add new value as set or single value
    subject[property] = options.propertyIsArray ? [value] : value;
  }
};
/**
 * Gets all of the values for a subject's property as an array.
 *
 * @param subject the subject.
 * @param property the property.
 *
 * @return all of the values for a subject's property as an array.
 */


api$h.getValues = (subject, property) => [].concat(subject[property] || []);
/**
 * Removes a property from a subject.
 *
 * @param subject the subject.
 * @param property the property.
 */


api$h.removeProperty = (subject, property) => {
  delete subject[property];
};
/**
 * Removes a value from a subject.
 *
 * @param subject the subject.
 * @param property the property that relates the value to the subject.
 * @param value the value to remove.
 * @param [options] the options to use:
 *          [propertyIsArray] true if the property is always an array, false
 *            if not (default: false).
 */


api$h.removeValue = (subject, property, value, options) => {
  options = options || {};

  if (!('propertyIsArray' in options)) {
    options.propertyIsArray = false;
  } // filter out value


  const values = api$h.getValues(subject, property).filter(e => !api$h.compareValues(e, value));

  if (values.length === 0) {
    api$h.removeProperty(subject, property);
  } else if (values.length === 1 && !options.propertyIsArray) {
    subject[property] = values[0];
  } else {
    subject[property] = values;
  }
};
/**
 * Relabels all blank nodes in the given JSON-LD input.
 *
 * @param input the JSON-LD input.
 * @param [options] the options to use:
 *          [issuer] an IdentifierIssuer to use to label blank nodes.
 */


api$h.relabelBlankNodes = (input, options) => {
  options = options || {};
  const issuer = options.issuer || new IdentifierIssuer$2('_:b');
  return _labelBlankNodes$1(issuer, input);
};
/**
 * Compares two JSON-LD values for equality. Two JSON-LD values will be
 * considered equal if:
 *
 * 1. They are both primitives of the same type and value.
 * 2. They are both @values with the same @value, @type, @language,
 *   and @index, OR
 * 3. They both have @ids they are the same.
 *
 * @param v1 the first value.
 * @param v2 the second value.
 *
 * @return true if v1 and v2 are considered equal, false if not.
 */


api$h.compareValues = (v1, v2) => {
  // 1. equal primitives
  if (v1 === v2) {
    return true;
  } // 2. equal @values


  if (graphTypes$1.isValue(v1) && graphTypes$1.isValue(v2) && v1['@value'] === v2['@value'] && v1['@type'] === v2['@type'] && v1['@language'] === v2['@language'] && v1['@index'] === v2['@index']) {
    return true;
  } // 3. equal @ids


  if (types$1.isObject(v1) && '@id' in v1 && types$1.isObject(v2) && '@id' in v2) {
    return v1['@id'] === v2['@id'];
  }

  return false;
};
/**
 * Compares two strings first based on length and then lexicographically.
 *
 * @param a the first string.
 * @param b the second string.
 *
 * @return -1 if a < b, 1 if a > b, 0 if a === b.
 */


api$h.compareShortestLeast = (a, b) => {
  if (a.length < b.length) {
    return -1;
  }

  if (b.length < a.length) {
    return 1;
  }

  if (a === b) {
    return 0;
  }

  return a < b ? -1 : 1;
};
/**
 * Labels the blank nodes in the given value using the given IdentifierIssuer.
 *
 * @param issuer the IdentifierIssuer to use.
 * @param element the element with blank nodes to rename.
 *
 * @return the element.
 */


function _labelBlankNodes$1(issuer, element) {
  if (types$1.isArray(element)) {
    for (let i = 0; i < element.length; ++i) {
      element[i] = _labelBlankNodes$1(issuer, element[i]);
    }
  } else if (graphTypes$1.isList(element)) {
    element['@list'] = _labelBlankNodes$1(issuer, element['@list']);
  } else if (types$1.isObject(element)) {
    // relabel blank node
    if (graphTypes$1.isBlankNode(element)) {
      element['@id'] = issuer.getId(element['@id']);
    } // recursively apply to all keys


    const keys = Object.keys(element).sort();

    for (let ki = 0; ki < keys.length; ++ki) {
      const key = keys[ki];

      if (key !== '@id') {
        element[key] = _labelBlankNodes$1(issuer, element[key]);
      }
    }
  }

  return element;
}

const api$i = {};
var url$1 = api$i; // define URL parser
// parseUri 1.2.2
// (c) Steven Levithan <stevenlevithan.com>
// MIT License
// with local jsonld.js modifications

api$i.parsers = {
  simple: {
    // RFC 3986 basic parts
    keys: ['href', 'scheme', 'authority', 'path', 'query', 'fragment'],

    /* eslint-disable-next-line max-len */
    regex: /^(?:([^:\/?#]+):)?(?:\/\/([^\/?#]*))?([^?#]*)(?:\?([^#]*))?(?:#(.*))?/
  },
  full: {
    keys: ['href', 'protocol', 'scheme', 'authority', 'auth', 'user', 'password', 'hostname', 'port', 'path', 'directory', 'file', 'query', 'fragment'],

    /* eslint-disable-next-line max-len */
    regex: /^(([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?(?:(((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/
  }
};

api$i.parse = (str, parser) => {
  const parsed = {};
  const o = api$i.parsers[parser || 'full'];
  const m = o.regex.exec(str);
  let i = o.keys.length;

  while (i--) {
    parsed[o.keys[i]] = m[i] === undefined ? null : m[i];
  } // remove default ports in found in URLs


  if (parsed.scheme === 'https' && parsed.port === '443' || parsed.scheme === 'http' && parsed.port === '80') {
    parsed.href = parsed.href.replace(':' + parsed.port, '');
    parsed.authority = parsed.authority.replace(':' + parsed.port, '');
    parsed.port = null;
  }

  parsed.normalizedPath = api$i.removeDotSegments(parsed.path);
  return parsed;
};
/**
 * Prepends a base IRI to the given relative IRI.
 *
 * @param base the base IRI.
 * @param iri the relative IRI.
 *
 * @return the absolute IRI.
 */


api$i.prependBase = (base, iri) => {
  // skip IRI processing
  if (base === null) {
    return iri;
  } // already an absolute IRI


  if (api$i.isAbsolute(iri)) {
    return iri;
  } // parse base if it is a string


  if (!base || types$1.isString(base)) {
    base = api$i.parse(base || '');
  } // parse given IRI


  const rel = api$i.parse(iri); // per RFC3986 5.2.2

  const transform = {
    protocol: base.protocol || ''
  };

  if (rel.authority !== null) {
    transform.authority = rel.authority;
    transform.path = rel.path;
    transform.query = rel.query;
  } else {
    transform.authority = base.authority;

    if (rel.path === '') {
      transform.path = base.path;

      if (rel.query !== null) {
        transform.query = rel.query;
      } else {
        transform.query = base.query;
      }
    } else {
      if (rel.path.indexOf('/') === 0) {
        // IRI represents an absolute path
        transform.path = rel.path;
      } else {
        // merge paths
        let path = base.path; // append relative path to the end of the last directory from base

        path = path.substr(0, path.lastIndexOf('/') + 1);

        if ((path.length > 0 || base.authority) && path.substr(-1) !== '/') {
          path += '/';
        }

        path += rel.path;
        transform.path = path;
      }

      transform.query = rel.query;
    }
  }

  if (rel.path !== '') {
    // remove slashes and dots in path
    transform.path = api$i.removeDotSegments(transform.path);
  } // construct URL


  let rval = transform.protocol;

  if (transform.authority !== null) {
    rval += '//' + transform.authority;
  }

  rval += transform.path;

  if (transform.query !== null) {
    rval += '?' + transform.query;
  }

  if (rel.fragment !== null) {
    rval += '#' + rel.fragment;
  } // handle empty base


  if (rval === '') {
    rval = './';
  }

  return rval;
};
/**
 * Removes a base IRI from the given absolute IRI.
 *
 * @param base the base IRI.
 * @param iri the absolute IRI.
 *
 * @return the relative IRI if relative to base, otherwise the absolute IRI.
 */


api$i.removeBase = (base, iri) => {
  // skip IRI processing
  if (base === null) {
    return iri;
  }

  if (!base || types$1.isString(base)) {
    base = api$i.parse(base || '');
  } // establish base root


  let root = '';

  if (base.href !== '') {
    root += (base.protocol || '') + '//' + (base.authority || '');
  } else if (iri.indexOf('//')) {
    // support network-path reference with empty base
    root += '//';
  } // IRI not relative to base


  if (iri.indexOf(root) !== 0) {
    return iri;
  } // remove root from IRI and parse remainder


  const rel = api$i.parse(iri.substr(root.length)); // remove path segments that match (do not remove last segment unless there
  // is a hash or query)

  const baseSegments = base.normalizedPath.split('/');
  const iriSegments = rel.normalizedPath.split('/');
  const last = rel.fragment || rel.query ? 0 : 1;

  while (baseSegments.length > 0 && iriSegments.length > last) {
    if (baseSegments[0] !== iriSegments[0]) {
      break;
    }

    baseSegments.shift();
    iriSegments.shift();
  } // use '../' for each non-matching base segment


  let rval = '';

  if (baseSegments.length > 0) {
    // don't count the last segment (if it ends with '/' last path doesn't
    // count and if it doesn't end with '/' it isn't a path)
    baseSegments.pop();

    for (let i = 0; i < baseSegments.length; ++i) {
      rval += '../';
    }
  } // prepend remaining segments


  rval += iriSegments.join('/'); // add query and hash

  if (rel.query !== null) {
    rval += '?' + rel.query;
  }

  if (rel.fragment !== null) {
    rval += '#' + rel.fragment;
  } // handle empty base


  if (rval === '') {
    rval = './';
  }

  return rval;
};
/**
 * Removes dot segments from a URL path.
 *
 * @param path the path to remove dot segments from.
 */


api$i.removeDotSegments = path => {
  // RFC 3986 5.2.4 (reworked)
  // empty path shortcut
  if (path.length === 0) {
    return '';
  }

  const input = path.split('/');
  const output = [];

  while (input.length > 0) {
    const next = input.shift();
    const done = input.length === 0;

    if (next === '.') {
      if (done) {
        // ensure output has trailing /
        output.push('');
      }

      continue;
    }

    if (next === '..') {
      output.pop();

      if (done) {
        // ensure output has trailing /
        output.push('');
      }

      continue;
    }

    output.push(next);
  } // if path was absolute, ensure output has leading /


  if (path[0] === '/' && output.length > 0 && output[0] !== '') {
    output.unshift('');
  }

  if (output.length === 1 && output[0] === '') {
    return '/';
  }

  return output.join('/');
}; // TODO: time better isAbsolute/isRelative checks using full regexes:
// http://jmrware.com/articles/2009/uri_regexp/URI_regex.html
// regex to check for absolute IRI (starting scheme and ':') or blank node IRI


const isAbsoluteRegex$1 = /^([A-Za-z][A-Za-z0-9+-.]*|_):[^\s]*$/;
/**
 * Returns true if the given value is an absolute IRI or blank node IRI, false
 * if not.
 * Note: This weak check only checks for a correct starting scheme.
 *
 * @param v the value to check.
 *
 * @return true if the value is an absolute IRI, false if not.
 */

api$i.isAbsolute = v => types$1.isString(v) && isAbsoluteRegex$1.test(v);
/**
 * Returns true if the given value is a relative IRI, false if not.
 * Note: this is a weak check.
 *
 * @param v the value to check.
 *
 * @return true if the value is a relative IRI, false if not.
 */


api$i.isRelative = v => types$1.isString(v);

const MAX_ACTIVE_CONTEXTS$1 = 10;
var ResolvedContext_1$1 = class ResolvedContext {
  /**
   * Creates a ResolvedContext.
   *
   * @param document the context document.
   */
  constructor({
    document
  }) {
    this.document = document; // TODO: enable customization of processed context cache
    // TODO: limit based on size of processed contexts vs. number of them

    this.cache = new lruCache({
      max: MAX_ACTIVE_CONTEXTS$1
    });
  }

  getProcessed(activeCtx) {
    return this.cache.get(activeCtx);
  }

  setProcessed(activeCtx, processedCtx) {
    this.cache.set(activeCtx, processedCtx);
  }

};

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const {
  isArray: _isArray$5,
  isObject: _isObject$6,
  isString: _isString$5
} = types$1;

const {
  asArray: _asArray$4
} = util$2;

const {
  prependBase: prependBase$4
} = url$1;





const MAX_CONTEXT_URLS$1 = 10;
var ContextResolver_1$1 = class ContextResolver {
  /**
   * Creates a ContextResolver.
   *
   * @param sharedCache a shared LRU cache with `get` and `set` APIs.
   */
  constructor({
    sharedCache
  }) {
    this.perOpCache = new Map();
    this.sharedCache = sharedCache;
  }

  resolve({
    activeCtx,
    context,
    documentLoader,
    base,
    cycles = new Set()
  }) {
    var _this = this;

    return _asyncToGenerator(function* () {
      // process `@context`
      if (context && _isObject$6(context) && context['@context']) {
        context = context['@context'];
      } // context is one or more contexts


      context = _asArray$4(context); // resolve each context in the array

      const allResolved = [];

      for (const ctx of context) {
        if (_isString$5(ctx)) {
          // see if `ctx` has been resolved before...
          let resolved = _this._get(ctx);

          if (!resolved) {
            // not resolved yet, resolve
            resolved = yield _this._resolveRemoteContext({
              activeCtx,
              url: ctx,
              documentLoader,
              base,
              cycles
            });
          } // add to output and continue


          if (_isArray$5(resolved)) {
            allResolved.push(...resolved);
          } else {
            allResolved.push(resolved);
          }

          continue;
        }

        if (ctx === null) {
          // handle `null` context, nothing to cache
          allResolved.push(new ResolvedContext_1$1({
            document: null
          }));
          continue;
        }

        if (!_isObject$6(ctx)) {
          _throwInvalidLocalContext$1(context);
        } // context is an object, get/create `ResolvedContext` for it


        const key = JSON.stringify(ctx);

        let resolved = _this._get(key);

        if (!resolved) {
          // create a new static `ResolvedContext` and cache it
          resolved = new ResolvedContext_1$1({
            document: ctx
          });

          _this._cacheResolvedContext({
            key,
            resolved,
            tag: 'static'
          });
        }

        allResolved.push(resolved);
      }

      return allResolved;
    })();
  }

  _get(key) {
    // get key from per operation cache; no `tag` is used with this cache so
    // any retrieved context will always be the same during a single operation
    let resolved = this.perOpCache.get(key);

    if (!resolved) {
      // see if the shared cache has a `static` entry for this URL
      const tagMap = this.sharedCache.get(key);

      if (tagMap) {
        resolved = tagMap.get('static');

        if (resolved) {
          this.perOpCache.set(key, resolved);
        }
      }
    }

    return resolved;
  }

  _cacheResolvedContext({
    key,
    resolved,
    tag
  }) {
    this.perOpCache.set(key, resolved);

    if (tag !== undefined) {
      let tagMap = this.sharedCache.get(key);

      if (!tagMap) {
        tagMap = new Map();
        this.sharedCache.set(key, tagMap);
      }

      tagMap.set(tag, resolved);
    }

    return resolved;
  }

  _resolveRemoteContext({
    activeCtx,
    url,
    documentLoader,
    base,
    cycles
  }) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      // resolve relative URL and fetch context
      url = prependBase$4(base, url);
      const {
        context,
        remoteDoc
      } = yield _this2._fetchContext({
        activeCtx,
        url,
        documentLoader,
        cycles
      }); // update base according to remote document and resolve any relative URLs

      base = remoteDoc.documentUrl || url;

      _resolveContextUrls$1({
        context,
        base
      }); // resolve, cache, and return context


      const resolved = yield _this2.resolve({
        activeCtx,
        context,
        documentLoader,
        base,
        cycles
      });

      _this2._cacheResolvedContext({
        key: url,
        resolved,
        tag: remoteDoc.tag
      });

      return resolved;
    })();
  }

  _fetchContext({
    activeCtx,
    url,
    documentLoader,
    cycles
  }) {
    return _asyncToGenerator(function* () {
      // check for max context URLs fetched during a resolve operation
      if (cycles.size > MAX_CONTEXT_URLS$1) {
        throw new JsonLdError_1$1('Maximum number of @context URLs exceeded.', 'jsonld.ContextUrlError', {
          code: activeCtx.processingMode === 'json-ld-1.0' ? 'loading remote context failed' : 'context overflow',
          max: MAX_CONTEXT_URLS$1
        });
      } // check for context URL cycle
      // shortcut to avoid extra work that would eventually hit the max above


      if (cycles.has(url)) {
        throw new JsonLdError_1$1('Cyclical @context URLs detected.', 'jsonld.ContextUrlError', {
          code: activeCtx.processingMode === 'json-ld-1.0' ? 'recursive context inclusion' : 'context overflow',
          url
        });
      } // track cycles


      cycles.add(url);
      let context;
      let remoteDoc;

      try {
        remoteDoc = yield documentLoader(url);
        context = remoteDoc.document || null; // parse string context as JSON

        if (_isString$5(context)) {
          context = JSON.parse(context);
        }
      } catch (e) {
        throw new JsonLdError_1$1('Dereferencing a URL did not result in a valid JSON-LD object. ' + 'Possible causes are an inaccessible URL perhaps due to ' + 'a same-origin policy (ensure the server uses CORS if you are ' + 'using client-side JavaScript), too many redirects, a ' + 'non-JSON response, or more than one HTTP Link Header was ' + 'provided for a remote context.', 'jsonld.InvalidUrl', {
          code: 'loading remote context failed',
          url,
          cause: e
        });
      } // ensure ctx is an object


      if (!_isObject$6(context)) {
        throw new JsonLdError_1$1('Dereferencing a URL did not result in a JSON object. The ' + 'response was valid JSON, but it was not a JSON object.', 'jsonld.InvalidUrl', {
          code: 'invalid remote context',
          url
        });
      } // use empty context if no @context key is present


      if (!('@context' in context)) {
        context = {
          '@context': {}
        };
      } else {
        context = {
          '@context': context['@context']
        };
      } // append @context URL to context if given


      if (remoteDoc.contextUrl) {
        if (!_isArray$5(context['@context'])) {
          context['@context'] = [context['@context']];
        }

        context['@context'].push(remoteDoc.contextUrl);
      }

      return {
        context,
        remoteDoc
      };
    })();
  }

};

function _throwInvalidLocalContext$1(ctx) {
  throw new JsonLdError_1$1('Invalid JSON-LD syntax; @context must be an object.', 'jsonld.SyntaxError', {
    code: 'invalid local context',
    context: ctx
  });
}
/**
 * Resolve all relative `@context` URLs in the given context by inline
 * replacing them with absolute URLs.
 *
 * @param context the context.
 * @param base the base IRI to use to resolve relative IRIs.
 */


function _resolveContextUrls$1({
  context,
  base
}) {
  if (!context) {
    return;
  }

  const ctx = context['@context'];

  if (_isString$5(ctx)) {
    context['@context'] = prependBase$4(base, ctx);
    return;
  }

  if (_isArray$5(ctx)) {
    for (let i = 0; i < ctx.length; ++i) {
      const element = ctx[i];

      if (_isString$5(element)) {
        ctx[i] = prependBase$4(base, element);
        continue;
      }

      if (_isObject$6(element)) {
        _resolveContextUrls$1({
          context: {
            '@context': element
          },
          base
        });
      }
    }

    return;
  }

  if (!_isObject$6(ctx)) {
    // no @context URLs can be found in non-object
    return;
  } // ctx is an object, resolve any context URLs in terms


  for (const term in ctx) {
    _resolveContextUrls$1({
      context: ctx[term],
      base
    });
  }
}

var NQuads$1 = lib.NQuads;

/*
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */

const RDF$2 = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#';
const XSD$1 = 'http://www.w3.org/2001/XMLSchema#';
var constants$1 = {
  // TODO: Deprecated and will be removed later. Use LINK_HEADER_CONTEXT.
  LINK_HEADER_REL: 'http://www.w3.org/ns/json-ld#context',
  LINK_HEADER_CONTEXT: 'http://www.w3.org/ns/json-ld#context',
  RDF: RDF$2,
  RDF_LIST: RDF$2 + 'List',
  RDF_FIRST: RDF$2 + 'first',
  RDF_REST: RDF$2 + 'rest',
  RDF_NIL: RDF$2 + 'nil',
  RDF_TYPE: RDF$2 + 'type',
  RDF_PLAIN_LITERAL: RDF$2 + 'PlainLiteral',
  RDF_XML_LITERAL: RDF$2 + 'XMLLiteral',
  RDF_JSON_LITERAL: RDF$2 + 'JSON',
  RDF_OBJECT: RDF$2 + 'object',
  RDF_LANGSTRING: RDF$2 + 'langString',
  XSD: XSD$1,
  XSD_BOOLEAN: XSD$1 + 'boolean',
  XSD_DOUBLE: XSD$1 + 'double',
  XSD_INTEGER: XSD$1 + 'integer',
  XSD_STRING: XSD$1 + 'string'
};

const {
  RDF_LANGSTRING: RDF_LANGSTRING$3,
  RDF_PLAIN_LITERAL: RDF_PLAIN_LITERAL$1,
  RDF_OBJECT: RDF_OBJECT$1,
  RDF_XML_LITERAL: RDF_XML_LITERAL$1,
  XSD_STRING: XSD_STRING$4
} = constants$1;

let _Node$1;

if (typeof Node !== 'undefined') {
  _Node$1 = Node;
} else {
  _Node$1 = {
    ELEMENT_NODE: 1,
    ATTRIBUTE_NODE: 2,
    TEXT_NODE: 3,
    CDATA_SECTION_NODE: 4,
    ENTITY_REFERENCE_NODE: 5,
    ENTITY_NODE: 6,
    PROCESSING_INSTRUCTION_NODE: 7,
    COMMENT_NODE: 8,
    DOCUMENT_NODE: 9,
    DOCUMENT_TYPE_NODE: 10,
    DOCUMENT_FRAGMENT_NODE: 11,
    NOTATION_NODE: 12
  };
}

var Rdfa_1$1 = class Rdfa {
  /**
   * Parses the RDF dataset found via the data object from the RDFa API.
   *
   * @param data the RDFa API data object.
   *
   * @return the RDF dataset.
   */
  parse(data) {
    const dataset = {};
    dataset['@default'] = [];
    const subjects = data.getSubjects();

    for (let si = 0; si < subjects.length; ++si) {
      const subject = subjects[si];

      if (subject === null) {
        continue;
      } // get all related triples


      const triples = data.getSubjectTriples(subject);

      if (triples === null) {
        continue;
      }

      const predicates = triples.predicates;

      for (const predicate in predicates) {
        // iterate over objects
        const objects = predicates[predicate].objects;

        for (let oi = 0; oi < objects.length; ++oi) {
          const object = objects[oi]; // create RDF triple

          const triple = {}; // add subject

          if (subject.indexOf('_:') === 0) {
            triple.subject = {
              type: 'blank node',
              value: subject
            };
          } else {
            triple.subject = {
              type: 'IRI',
              value: subject
            };
          } // add predicate


          if (predicate.indexOf('_:') === 0) {
            triple.predicate = {
              type: 'blank node',
              value: predicate
            };
          } else {
            triple.predicate = {
              type: 'IRI',
              value: predicate
            };
          } // serialize XML literal


          let value = object.value;

          if (object.type === RDF_XML_LITERAL$1) {
            // initialize XMLSerializer
            const XMLSerializer = getXMLSerializerClass$1();
            const serializer = new XMLSerializer();
            value = '';

            for (let x = 0; x < object.value.length; x++) {
              if (object.value[x].nodeType === _Node$1.ELEMENT_NODE) {
                value += serializer.serializeToString(object.value[x]);
              } else if (object.value[x].nodeType === _Node$1.TEXT_NODE) {
                value += object.value[x].nodeValue;
              }
            }
          } // add object


          triple.object = {}; // object is an IRI

          if (object.type === RDF_OBJECT$1) {
            if (object.value.indexOf('_:') === 0) {
              triple.object.type = 'blank node';
            } else {
              triple.object.type = 'IRI';
            }
          } else {
            // object is a literal
            triple.object.type = 'literal';

            if (object.type === RDF_PLAIN_LITERAL$1) {
              if (object.language) {
                triple.object.datatype = RDF_LANGSTRING$3;
                triple.object.language = object.language;
              } else {
                triple.object.datatype = XSD_STRING$4;
              }
            } else {
              triple.object.datatype = object.type;
            }
          }

          triple.object.value = value; // add triple to dataset in default graph

          dataset['@default'].push(triple);
        }
      }
    }

    return dataset;
  }

};

function getXMLSerializerClass$1() {
  if (typeof XMLSerializer === 'undefined') {
    return require$$4.XMLSerializer;
  }

  return XMLSerializer;
}

function asyncGeneratorStep$1(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator$1(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep$1(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep$1(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }





const {
  isArray: _isArray$6,
  isObject: _isObject$7,
  isString: _isString$6,
  isUndefined: _isUndefined$3
} = types$1;

const {
  isAbsolute: _isAbsoluteIri$3,
  isRelative: _isRelativeIri$1,
  prependBase: prependBase$5,
  parse: parseUrl$1
} = url$1;

const {
  asArray: _asArray$5,
  compareShortestLeast: _compareShortestLeast$2
} = util$2;

const INITIAL_CONTEXT_CACHE$1 = new Map();
const INITIAL_CONTEXT_CACHE_MAX_SIZE$1 = 10000;
const KEYWORD_PATTERN$1 = /^@[a-zA-Z]+$/;
const api$j = {};
var context$1 = api$j;
/**
 * Processes a local context and returns a new active context.
 *
 * @param activeCtx the current active context.
 * @param localCtx the local context to process.
 * @param options the context processing options.
 * @param propagate `true` if `false`, retains any previously defined term,
 *   which can be rolled back when the descending into a new node object.
 * @param overrideProtected `false` allows protected terms to be modified.
 *
 * @return a Promise that resolves to the new active context.
 */

api$j.process = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator$1(function* ({
    activeCtx,
    localCtx,
    options,
    propagate = true,
    overrideProtected = false,
    cycles = new Set()
  }) {
    // normalize local context to an array of @context objects
    if (_isObject$7(localCtx) && '@context' in localCtx && _isArray$6(localCtx['@context'])) {
      localCtx = localCtx['@context'];
    }

    const ctxs = _asArray$5(localCtx); // no contexts in array, return current active context w/o changes


    if (ctxs.length === 0) {
      return activeCtx;
    } // resolve contexts


    const resolved = yield options.contextResolver.resolve({
      activeCtx,
      context: localCtx,
      documentLoader: options.documentLoader,
      base: options.base
    }); // override propagate if first resolved context has `@propagate`

    if (_isObject$7(resolved[0].document) && typeof resolved[0].document['@propagate'] === 'boolean') {
      // retrieve early, error checking done later
      propagate = resolved[0].document['@propagate'];
    } // process each context in order, update active context
    // on each iteration to ensure proper caching


    let rval = activeCtx; // track the previous context
    // if not propagating, make sure rval has a previous context

    if (!propagate && !rval.previousContext) {
      // clone `rval` context before updating
      rval = rval.clone();
      rval.previousContext = activeCtx;
    }

    for (const resolvedContext of resolved) {
      let {
        document: ctx
      } = resolvedContext; // update active context to one computed from last iteration

      activeCtx = rval; // reset to initial context

      if (ctx === null) {
        // We can't nullify if there are protected terms and we're
        // not allowing overrides (e.g. processing a property term scoped context)
        if (!overrideProtected && Object.keys(activeCtx.protected).length !== 0) {
          const protectedMode = options && options.protectedMode || 'error';

          if (protectedMode === 'error') {
            throw new JsonLdError_1$1('Tried to nullify a context with protected terms outside of ' + 'a term definition.', 'jsonld.SyntaxError', {
              code: 'invalid context nullification'
            });
          } else if (protectedMode === 'warn') {
            // FIXME: remove logging and use a handler
            console.warn('WARNING: invalid context nullification'); // get processed context from cache if available

            const processed = resolvedContext.getProcessed(activeCtx);

            if (processed) {
              rval = activeCtx = processed;
              continue;
            }

            const oldActiveCtx = activeCtx; // copy all protected term definitions to fresh initial context

            rval = activeCtx = api$j.getInitialContext(options).clone();

            for (const [term, _protected] of Object.entries(oldActiveCtx.protected)) {
              if (_protected) {
                activeCtx.mappings[term] = util$2.clone(oldActiveCtx.mappings[term]);
              }
            }

            activeCtx.protected = util$2.clone(oldActiveCtx.protected); // cache processed result

            resolvedContext.setProcessed(oldActiveCtx, rval);
            continue;
          }

          throw new JsonLdError_1$1('Invalid protectedMode.', 'jsonld.SyntaxError', {
            code: 'invalid protected mode',
            context: localCtx,
            protectedMode
          });
        }

        rval = activeCtx = api$j.getInitialContext(options).clone();
        continue;
      } // get processed context from cache if available


      const processed = resolvedContext.getProcessed(activeCtx);

      if (processed) {
        rval = activeCtx = processed;
        continue;
      } // dereference @context key if present


      if (_isObject$7(ctx) && '@context' in ctx) {
        ctx = ctx['@context'];
      } // context must be an object by now, all URLs retrieved before this call


      if (!_isObject$7(ctx)) {
        throw new JsonLdError_1$1('Invalid JSON-LD syntax; @context must be an object.', 'jsonld.SyntaxError', {
          code: 'invalid local context',
          context: ctx
        });
      } // TODO: there is likely a `previousContext` cloning optimization that
      // could be applied here (no need to copy it under certain conditions)
      // clone context before updating it


      rval = rval.clone(); // define context mappings for keys in local context

      const defined = new Map(); // handle @version

      if ('@version' in ctx) {
        if (ctx['@version'] !== 1.1) {
          throw new JsonLdError_1$1('Unsupported JSON-LD version: ' + ctx['@version'], 'jsonld.UnsupportedVersion', {
            code: 'invalid @version value',
            context: ctx
          });
        }

        if (activeCtx.processingMode && activeCtx.processingMode === 'json-ld-1.0') {
          throw new JsonLdError_1$1('@version: ' + ctx['@version'] + ' not compatible with ' + activeCtx.processingMode, 'jsonld.ProcessingModeConflict', {
            code: 'processing mode conflict',
            context: ctx
          });
        }

        rval.processingMode = 'json-ld-1.1';
        rval['@version'] = ctx['@version'];
        defined.set('@version', true);
      } // if not set explicitly, set processingMode to "json-ld-1.1"


      rval.processingMode = rval.processingMode || activeCtx.processingMode; // handle @base

      if ('@base' in ctx) {
        let base = ctx['@base'];

        if (base === null || _isAbsoluteIri$3(base)) ; else if (_isRelativeIri$1(base)) {
          base = prependBase$5(rval['@base'], base);
        } else {
          throw new JsonLdError_1$1('Invalid JSON-LD syntax; the value of "@base" in a ' + '@context must be an absolute IRI, a relative IRI, or null.', 'jsonld.SyntaxError', {
            code: 'invalid base IRI',
            context: ctx
          });
        }

        rval['@base'] = base;
        defined.set('@base', true);
      } // handle @vocab


      if ('@vocab' in ctx) {
        const value = ctx['@vocab'];

        if (value === null) {
          delete rval['@vocab'];
        } else if (!_isString$6(value)) {
          throw new JsonLdError_1$1('Invalid JSON-LD syntax; the value of "@vocab" in a ' + '@context must be a string or null.', 'jsonld.SyntaxError', {
            code: 'invalid vocab mapping',
            context: ctx
          });
        } else if (!_isAbsoluteIri$3(value) && api$j.processingMode(rval, 1.0)) {
          throw new JsonLdError_1$1('Invalid JSON-LD syntax; the value of "@vocab" in a ' + '@context must be an absolute IRI.', 'jsonld.SyntaxError', {
            code: 'invalid vocab mapping',
            context: ctx
          });
        } else {
          rval['@vocab'] = _expandIri$4(rval, value, {
            vocab: true,
            base: true
          }, undefined, undefined, options);
        }

        defined.set('@vocab', true);
      } // handle @language


      if ('@language' in ctx) {
        const value = ctx['@language'];

        if (value === null) {
          delete rval['@language'];
        } else if (!_isString$6(value)) {
          throw new JsonLdError_1$1('Invalid JSON-LD syntax; the value of "@language" in a ' + '@context must be a string or null.', 'jsonld.SyntaxError', {
            code: 'invalid default language',
            context: ctx
          });
        } else {
          rval['@language'] = value.toLowerCase();
        }

        defined.set('@language', true);
      } // handle @direction


      if ('@direction' in ctx) {
        const value = ctx['@direction'];

        if (activeCtx.processingMode === 'json-ld-1.0') {
          throw new JsonLdError_1$1('Invalid JSON-LD syntax; @direction not compatible with ' + activeCtx.processingMode, 'jsonld.SyntaxError', {
            code: 'invalid context member',
            context: ctx
          });
        }

        if (value === null) {
          delete rval['@direction'];
        } else if (value !== 'ltr' && value !== 'rtl') {
          throw new JsonLdError_1$1('Invalid JSON-LD syntax; the value of "@direction" in a ' + '@context must be null, "ltr", or "rtl".', 'jsonld.SyntaxError', {
            code: 'invalid base direction',
            context: ctx
          });
        } else {
          rval['@direction'] = value;
        }

        defined.set('@direction', true);
      } // handle @propagate
      // note: we've already extracted it, here we just do error checking


      if ('@propagate' in ctx) {
        const value = ctx['@propagate'];

        if (activeCtx.processingMode === 'json-ld-1.0') {
          throw new JsonLdError_1$1('Invalid JSON-LD syntax; @propagate not compatible with ' + activeCtx.processingMode, 'jsonld.SyntaxError', {
            code: 'invalid context entry',
            context: ctx
          });
        }

        if (typeof value !== 'boolean') {
          throw new JsonLdError_1$1('Invalid JSON-LD syntax; @propagate value must be a boolean.', 'jsonld.SyntaxError', {
            code: 'invalid @propagate value',
            context: localCtx
          });
        }

        defined.set('@propagate', true);
      } // handle @import


      if ('@import' in ctx) {
        const value = ctx['@import'];

        if (activeCtx.processingMode === 'json-ld-1.0') {
          throw new JsonLdError_1$1('Invalid JSON-LD syntax; @import not compatible with ' + activeCtx.processingMode, 'jsonld.SyntaxError', {
            code: 'invalid context entry',
            context: ctx
          });
        }

        if (!_isString$6(value)) {
          throw new JsonLdError_1$1('Invalid JSON-LD syntax; @import must be a string.', 'jsonld.SyntaxError', {
            code: 'invalid @import value',
            context: localCtx
          });
        } // resolve contexts


        const resolvedImport = yield options.contextResolver.resolve({
          activeCtx,
          context: value,
          documentLoader: options.documentLoader,
          base: options.base
        });

        if (resolvedImport.length !== 1) {
          throw new JsonLdError_1$1('Invalid JSON-LD syntax; @import must reference a single context.', 'jsonld.SyntaxError', {
            code: 'invalid remote context',
            context: localCtx
          });
        }

        const processedImport = resolvedImport[0].getProcessed(activeCtx);

        if (processedImport) {
          // Note: if the same context were used in this active context
          // as a reference context, then processed_input might not
          // be a dict.
          ctx = processedImport;
        } else {
          const importCtx = resolvedImport[0].document;

          if ('@import' in importCtx) {
            throw new JsonLdError_1$1('Invalid JSON-LD syntax: ' + 'imported context must not include @import.', 'jsonld.SyntaxError', {
              code: 'invalid context entry',
              context: localCtx
            });
          } // merge ctx into importCtx and replace rval with the result


          for (const key in importCtx) {
            if (!ctx.hasOwnProperty(key)) {
              ctx[key] = importCtx[key];
            }
          } // Note: this could potenially conflict if the import
          // were used in the same active context as a referenced
          // context and an import. In this case, we
          // could override the cached result, but seems unlikely.


          resolvedImport[0].setProcessed(activeCtx, ctx);
        }

        defined.set('@import', true);
      } // handle @protected; determine whether this sub-context is declaring
      // all its terms to be "protected" (exceptions can be made on a
      // per-definition basis)


      defined.set('@protected', ctx['@protected'] || false); // process all other keys

      for (const key in ctx) {
        api$j.createTermDefinition({
          activeCtx: rval,
          localCtx: ctx,
          term: key,
          defined,
          options,
          overrideProtected
        });

        if (_isObject$7(ctx[key]) && '@context' in ctx[key]) {
          const keyCtx = ctx[key]['@context'];
          let process = true;

          if (_isString$6(keyCtx)) {
            const url = prependBase$5(options.base, keyCtx); // track processed contexts to avoid scoped context recursion

            if (cycles.has(url)) {
              process = false;
            } else {
              cycles.add(url);
            }
          } // parse context to validate


          if (process) {
            try {
              yield api$j.process({
                activeCtx: rval,
                localCtx: ctx[key]['@context'],
                overrideProtected: true,
                options,
                cycles
              });
            } catch (e) {
              throw new JsonLdError_1$1('Invalid JSON-LD syntax; invalid scoped context.', 'jsonld.SyntaxError', {
                code: 'invalid scoped context',
                context: ctx[key]['@context'],
                term: key
              });
            }
          }
        }
      } // cache processed result


      resolvedContext.setProcessed(activeCtx, rval);
    }

    return rval;
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Creates a term definition during context processing.
 *
 * @param activeCtx the current active context.
 * @param localCtx the local context being processed.
 * @param term the term in the local context to define the mapping for.
 * @param defined a map of defining/defined keys to detect cycles and prevent
 *          double definitions.
 * @param {Object} [options] - creation options.
 * @param {string} [options.protectedMode="error"] - "error" to throw error
 *   on `@protected` constraint violation, "warn" to allow violations and
 *   signal a warning.
 * @param overrideProtected `false` allows protected terms to be modified.
 */


api$j.createTermDefinition = ({
  activeCtx,
  localCtx,
  term,
  defined,
  options,
  overrideProtected = false
}) => {
  if (defined.has(term)) {
    // term already defined
    if (defined.get(term)) {
      return;
    } // cycle detected


    throw new JsonLdError_1$1('Cyclical context definition detected.', 'jsonld.CyclicalContext', {
      code: 'cyclic IRI mapping',
      context: localCtx,
      term
    });
  } // now defining term


  defined.set(term, false); // get context term value

  let value;

  if (localCtx.hasOwnProperty(term)) {
    value = localCtx[term];
  }

  if (term === '@type' && _isObject$7(value) && (value['@container'] || '@set') === '@set' && api$j.processingMode(activeCtx, 1.1)) {
    const validKeys = ['@container', '@id', '@protected'];
    const keys = Object.keys(value);

    if (keys.length === 0 || keys.some(k => !validKeys.includes(k))) {
      throw new JsonLdError_1$1('Invalid JSON-LD syntax; keywords cannot be overridden.', 'jsonld.SyntaxError', {
        code: 'keyword redefinition',
        context: localCtx,
        term
      });
    }
  } else if (api$j.isKeyword(term)) {
    throw new JsonLdError_1$1('Invalid JSON-LD syntax; keywords cannot be overridden.', 'jsonld.SyntaxError', {
      code: 'keyword redefinition',
      context: localCtx,
      term
    });
  } else if (term.match(KEYWORD_PATTERN$1)) {
    // FIXME: remove logging and use a handler
    console.warn('WARNING: terms beginning with "@" are reserved' + ' for future use and ignored', {
      term
    });
    return;
  } else if (term === '') {
    throw new JsonLdError_1$1('Invalid JSON-LD syntax; a term cannot be an empty string.', 'jsonld.SyntaxError', {
      code: 'invalid term definition',
      context: localCtx
    });
  } // keep reference to previous mapping for potential `@protected` check


  const previousMapping = activeCtx.mappings.get(term); // remove old mapping

  if (activeCtx.mappings.has(term)) {
    activeCtx.mappings.delete(term);
  } // convert short-hand value to object w/@id


  let simpleTerm = false;

  if (_isString$6(value) || value === null) {
    simpleTerm = true;
    value = {
      '@id': value
    };
  }

  if (!_isObject$7(value)) {
    throw new JsonLdError_1$1('Invalid JSON-LD syntax; @context term values must be ' + 'strings or objects.', 'jsonld.SyntaxError', {
      code: 'invalid term definition',
      context: localCtx
    });
  } // create new mapping


  const mapping = {};
  activeCtx.mappings.set(term, mapping);
  mapping.reverse = false; // make sure term definition only has expected keywords

  const validKeys = ['@container', '@id', '@language', '@reverse', '@type']; // JSON-LD 1.1 support

  if (api$j.processingMode(activeCtx, 1.1)) {
    validKeys.push('@context', '@direction', '@index', '@nest', '@prefix', '@protected');
  }

  for (const kw in value) {
    if (!validKeys.includes(kw)) {
      throw new JsonLdError_1$1('Invalid JSON-LD syntax; a term definition must not contain ' + kw, 'jsonld.SyntaxError', {
        code: 'invalid term definition',
        context: localCtx
      });
    }
  } // always compute whether term has a colon as an optimization for
  // _compactIri


  const colon = term.indexOf(':');
  mapping._termHasColon = colon > 0;

  if ('@reverse' in value) {
    if ('@id' in value) {
      throw new JsonLdError_1$1('Invalid JSON-LD syntax; a @reverse term definition must not ' + 'contain @id.', 'jsonld.SyntaxError', {
        code: 'invalid reverse property',
        context: localCtx
      });
    }

    if ('@nest' in value) {
      throw new JsonLdError_1$1('Invalid JSON-LD syntax; a @reverse term definition must not ' + 'contain @nest.', 'jsonld.SyntaxError', {
        code: 'invalid reverse property',
        context: localCtx
      });
    }

    const reverse = value['@reverse'];

    if (!_isString$6(reverse)) {
      throw new JsonLdError_1$1('Invalid JSON-LD syntax; a @context @reverse value must be a string.', 'jsonld.SyntaxError', {
        code: 'invalid IRI mapping',
        context: localCtx
      });
    }

    if (!api$j.isKeyword(reverse) && reverse.match(KEYWORD_PATTERN$1)) {
      // FIXME: remove logging and use a handler
      console.warn('WARNING: values beginning with "@" are reserved' + ' for future use and ignored', {
        reverse
      });

      if (previousMapping) {
        activeCtx.mappings.set(term, previousMapping);
      } else {
        activeCtx.mappings.delete(term);
      }

      return;
    } // expand and add @id mapping


    const id = _expandIri$4(activeCtx, reverse, {
      vocab: true,
      base: false
    }, localCtx, defined, options);

    if (!_isAbsoluteIri$3(id)) {
      throw new JsonLdError_1$1('Invalid JSON-LD syntax; a @context @reverse value must be an ' + 'absolute IRI or a blank node identifier.', 'jsonld.SyntaxError', {
        code: 'invalid IRI mapping',
        context: localCtx
      });
    }

    mapping['@id'] = id;
    mapping.reverse = true;
  } else if ('@id' in value) {
    let id = value['@id'];

    if (id && !_isString$6(id)) {
      throw new JsonLdError_1$1('Invalid JSON-LD syntax; a @context @id value must be an array ' + 'of strings or a string.', 'jsonld.SyntaxError', {
        code: 'invalid IRI mapping',
        context: localCtx
      });
    }

    if (id === null) {
      // reserve a null term, which may be protected
      mapping['@id'] = null;
    } else if (!api$j.isKeyword(id) && id.match(KEYWORD_PATTERN$1)) {
      // FIXME: remove logging and use a handler
      console.warn('WARNING: values beginning with "@" are reserved' + ' for future use and ignored', {
        id
      });

      if (previousMapping) {
        activeCtx.mappings.set(term, previousMapping);
      } else {
        activeCtx.mappings.delete(term);
      }

      return;
    } else if (id !== term) {
      // expand and add @id mapping
      id = _expandIri$4(activeCtx, id, {
        vocab: true,
        base: false
      }, localCtx, defined, options);

      if (!_isAbsoluteIri$3(id) && !api$j.isKeyword(id)) {
        throw new JsonLdError_1$1('Invalid JSON-LD syntax; a @context @id value must be an ' + 'absolute IRI, a blank node identifier, or a keyword.', 'jsonld.SyntaxError', {
          code: 'invalid IRI mapping',
          context: localCtx
        });
      } // if term has the form of an IRI it must map the same


      if (term.match(/(?::[^:])|\//)) {
        const termDefined = new Map(defined).set(term, true);

        const termIri = _expandIri$4(activeCtx, term, {
          vocab: true,
          base: false
        }, localCtx, termDefined, options);

        if (termIri !== id) {
          throw new JsonLdError_1$1('Invalid JSON-LD syntax; term in form of IRI must ' + 'expand to definition.', 'jsonld.SyntaxError', {
            code: 'invalid IRI mapping',
            context: localCtx
          });
        }
      }

      mapping['@id'] = id; // indicate if this term may be used as a compact IRI prefix

      mapping._prefix = simpleTerm && !mapping._termHasColon && id.match(/[:\/\?#\[\]@]$/);
    }
  }

  if (!('@id' in mapping)) {
    // see if the term has a prefix
    if (mapping._termHasColon) {
      const prefix = term.substr(0, colon);

      if (localCtx.hasOwnProperty(prefix)) {
        // define parent prefix
        api$j.createTermDefinition({
          activeCtx,
          localCtx,
          term: prefix,
          defined,
          options
        });
      }

      if (activeCtx.mappings.has(prefix)) {
        // set @id based on prefix parent
        const suffix = term.substr(colon + 1);
        mapping['@id'] = activeCtx.mappings.get(prefix)['@id'] + suffix;
      } else {
        // term is an absolute IRI
        mapping['@id'] = term;
      }
    } else if (term === '@type') {
      // Special case, were we've previously determined that container is @set
      mapping['@id'] = term;
    } else {
      // non-IRIs *must* define @ids if @vocab is not available
      if (!('@vocab' in activeCtx)) {
        throw new JsonLdError_1$1('Invalid JSON-LD syntax; @context terms must define an @id.', 'jsonld.SyntaxError', {
          code: 'invalid IRI mapping',
          context: localCtx,
          term
        });
      } // prepend vocab to term


      mapping['@id'] = activeCtx['@vocab'] + term;
    }
  } // Handle term protection


  if (value['@protected'] === true || defined.get('@protected') === true && value['@protected'] !== false) {
    activeCtx.protected[term] = true;
    mapping.protected = true;
  } // IRI mapping now defined


  defined.set(term, true);

  if ('@type' in value) {
    let type = value['@type'];

    if (!_isString$6(type)) {
      throw new JsonLdError_1$1('Invalid JSON-LD syntax; an @context @type value must be a string.', 'jsonld.SyntaxError', {
        code: 'invalid type mapping',
        context: localCtx
      });
    }

    if (type === '@json' || type === '@none') {
      if (api$j.processingMode(activeCtx, 1.0)) {
        throw new JsonLdError_1$1('Invalid JSON-LD syntax; an @context @type value must not be ' + `"${type}" in JSON-LD 1.0 mode.`, 'jsonld.SyntaxError', {
          code: 'invalid type mapping',
          context: localCtx
        });
      }
    } else if (type !== '@id' && type !== '@vocab') {
      // expand @type to full IRI
      type = _expandIri$4(activeCtx, type, {
        vocab: true,
        base: false
      }, localCtx, defined, options);

      if (!_isAbsoluteIri$3(type)) {
        throw new JsonLdError_1$1('Invalid JSON-LD syntax; an @context @type value must be an ' + 'absolute IRI.', 'jsonld.SyntaxError', {
          code: 'invalid type mapping',
          context: localCtx
        });
      }

      if (type.indexOf('_:') === 0) {
        throw new JsonLdError_1$1('Invalid JSON-LD syntax; an @context @type value must be an IRI, ' + 'not a blank node identifier.', 'jsonld.SyntaxError', {
          code: 'invalid type mapping',
          context: localCtx
        });
      }
    } // add @type to mapping


    mapping['@type'] = type;
  }

  if ('@container' in value) {
    // normalize container to an array form
    const container = _isString$6(value['@container']) ? [value['@container']] : value['@container'] || [];
    const validContainers = ['@list', '@set', '@index', '@language'];
    let isValid = true;
    const hasSet = container.includes('@set'); // JSON-LD 1.1 support

    if (api$j.processingMode(activeCtx, 1.1)) {
      validContainers.push('@graph', '@id', '@type'); // check container length

      if (container.includes('@list')) {
        if (container.length !== 1) {
          throw new JsonLdError_1$1('Invalid JSON-LD syntax; @context @container with @list must ' + 'have no other values', 'jsonld.SyntaxError', {
            code: 'invalid container mapping',
            context: localCtx
          });
        }
      } else if (container.includes('@graph')) {
        if (container.some(key => key !== '@graph' && key !== '@id' && key !== '@index' && key !== '@set')) {
          throw new JsonLdError_1$1('Invalid JSON-LD syntax; @context @container with @graph must ' + 'have no other values other than @id, @index, and @set', 'jsonld.SyntaxError', {
            code: 'invalid container mapping',
            context: localCtx
          });
        }
      } else {
        // otherwise, container may also include @set
        isValid &= container.length <= (hasSet ? 2 : 1);
      }

      if (container.includes('@type')) {
        // If mapping does not have an @type,
        // set it to @id
        mapping['@type'] = mapping['@type'] || '@id'; // type mapping must be either @id or @vocab

        if (!['@id', '@vocab'].includes(mapping['@type'])) {
          throw new JsonLdError_1$1('Invalid JSON-LD syntax; container: @type requires @type to be ' + '@id or @vocab.', 'jsonld.SyntaxError', {
            code: 'invalid type mapping',
            context: localCtx
          });
        }
      }
    } else {
      // in JSON-LD 1.0, container must not be an array (it must be a string,
      // which is one of the validContainers)
      isValid &= !_isArray$6(value['@container']); // check container length

      isValid &= container.length <= 1;
    } // check against valid containers


    isValid &= container.every(c => validContainers.includes(c)); // @set not allowed with @list

    isValid &= !(hasSet && container.includes('@list'));

    if (!isValid) {
      throw new JsonLdError_1$1('Invalid JSON-LD syntax; @context @container value must be ' + 'one of the following: ' + validContainers.join(', '), 'jsonld.SyntaxError', {
        code: 'invalid container mapping',
        context: localCtx
      });
    }

    if (mapping.reverse && !container.every(c => ['@index', '@set'].includes(c))) {
      throw new JsonLdError_1$1('Invalid JSON-LD syntax; @context @container value for a @reverse ' + 'type definition must be @index or @set.', 'jsonld.SyntaxError', {
        code: 'invalid reverse property',
        context: localCtx
      });
    } // add @container to mapping


    mapping['@container'] = container;
  } // property indexing


  if ('@index' in value) {
    if (!('@container' in value) || !mapping['@container'].includes('@index')) {
      throw new JsonLdError_1$1('Invalid JSON-LD syntax; @index without @index in @container: ' + `"${value['@index']}" on term "${term}".`, 'jsonld.SyntaxError', {
        code: 'invalid term definition',
        context: localCtx
      });
    }

    if (!_isString$6(value['@index']) || value['@index'].indexOf('@') === 0) {
      throw new JsonLdError_1$1('Invalid JSON-LD syntax; @index must expand to an IRI: ' + `"${value['@index']}" on term "${term}".`, 'jsonld.SyntaxError', {
        code: 'invalid term definition',
        context: localCtx
      });
    }

    mapping['@index'] = value['@index'];
  } // scoped contexts


  if ('@context' in value) {
    mapping['@context'] = value['@context'];
  }

  if ('@language' in value && !('@type' in value)) {
    let language = value['@language'];

    if (language !== null && !_isString$6(language)) {
      throw new JsonLdError_1$1('Invalid JSON-LD syntax; @context @language value must be ' + 'a string or null.', 'jsonld.SyntaxError', {
        code: 'invalid language mapping',
        context: localCtx
      });
    } // add @language to mapping


    if (language !== null) {
      language = language.toLowerCase();
    }

    mapping['@language'] = language;
  } // term may be used as a prefix


  if ('@prefix' in value) {
    if (term.match(/:|\//)) {
      throw new JsonLdError_1$1('Invalid JSON-LD syntax; @context @prefix used on a compact IRI term', 'jsonld.SyntaxError', {
        code: 'invalid term definition',
        context: localCtx
      });
    }

    if (api$j.isKeyword(mapping['@id'])) {
      throw new JsonLdError_1$1('Invalid JSON-LD syntax; keywords may not be used as prefixes', 'jsonld.SyntaxError', {
        code: 'invalid term definition',
        context: localCtx
      });
    }

    if (typeof value['@prefix'] === 'boolean') {
      mapping._prefix = value['@prefix'] === true;
    } else {
      throw new JsonLdError_1$1('Invalid JSON-LD syntax; @context value for @prefix must be boolean', 'jsonld.SyntaxError', {
        code: 'invalid @prefix value',
        context: localCtx
      });
    }
  }

  if ('@direction' in value) {
    const direction = value['@direction'];

    if (direction !== null && direction !== 'ltr' && direction !== 'rtl') {
      throw new JsonLdError_1$1('Invalid JSON-LD syntax; @direction value must be ' + 'null, "ltr", or "rtl".', 'jsonld.SyntaxError', {
        code: 'invalid base direction',
        context: localCtx
      });
    }

    mapping['@direction'] = direction;
  }

  if ('@nest' in value) {
    const nest = value['@nest'];

    if (!_isString$6(nest) || nest !== '@nest' && nest.indexOf('@') === 0) {
      throw new JsonLdError_1$1('Invalid JSON-LD syntax; @context @nest value must be ' + 'a string which is not a keyword other than @nest.', 'jsonld.SyntaxError', {
        code: 'invalid @nest value',
        context: localCtx
      });
    }

    mapping['@nest'] = nest;
  } // disallow aliasing @context and @preserve


  const id = mapping['@id'];

  if (id === '@context' || id === '@preserve') {
    throw new JsonLdError_1$1('Invalid JSON-LD syntax; @context and @preserve cannot be aliased.', 'jsonld.SyntaxError', {
      code: 'invalid keyword alias',
      context: localCtx
    });
  } // Check for overriding protected terms


  if (previousMapping && previousMapping.protected && !overrideProtected) {
    // force new term to continue to be protected and see if the mappings would
    // be equal
    activeCtx.protected[term] = true;
    mapping.protected = true;

    if (!_deepCompare$1(previousMapping, mapping)) {
      const protectedMode = options && options.protectedMode || 'error';

      if (protectedMode === 'error') {
        throw new JsonLdError_1$1('Invalid JSON-LD syntax; tried to redefine a protected term.', 'jsonld.SyntaxError', {
          code: 'protected term redefinition',
          context: localCtx,
          term
        });
      } else if (protectedMode === 'warn') {
        // FIXME: remove logging and use a handler
        console.warn('WARNING: protected term redefinition', {
          term
        });
        return;
      }

      throw new JsonLdError_1$1('Invalid protectedMode.', 'jsonld.SyntaxError', {
        code: 'invalid protected mode',
        context: localCtx,
        term,
        protectedMode
      });
    }
  }
};
/**
 * Expands a string to a full IRI. The string may be a term, a prefix, a
 * relative IRI, or an absolute IRI. The associated absolute IRI will be
 * returned.
 *
 * @param activeCtx the current active context.
 * @param value the string to expand.
 * @param relativeTo options for how to resolve relative IRIs:
 *          base: true to resolve against the base IRI, false not to.
 *          vocab: true to concatenate after @vocab, false not to.
 * @param {Object} [options] - processing options.
 *
 * @return the expanded value.
 */


api$j.expandIri = (activeCtx, value, relativeTo, options) => {
  return _expandIri$4(activeCtx, value, relativeTo, undefined, undefined, options);
};
/**
 * Expands a string to a full IRI. The string may be a term, a prefix, a
 * relative IRI, or an absolute IRI. The associated absolute IRI will be
 * returned.
 *
 * @param activeCtx the current active context.
 * @param value the string to expand.
 * @param relativeTo options for how to resolve relative IRIs:
 *          base: true to resolve against the base IRI, false not to.
 *          vocab: true to concatenate after @vocab, false not to.
 * @param localCtx the local context being processed (only given if called
 *          during context processing).
 * @param defined a map for tracking cycles in context definitions (only given
 *          if called during context processing).
 * @param {Object} [options] - processing options.
 *
 * @return the expanded value.
 */


function _expandIri$4(activeCtx, value, relativeTo, localCtx, defined, options) {
  // already expanded
  if (value === null || !_isString$6(value) || api$j.isKeyword(value)) {
    return value;
  } // ignore non-keyword things that look like a keyword


  if (value.match(KEYWORD_PATTERN$1)) {
    return null;
  } // define term dependency if not defined


  if (localCtx && localCtx.hasOwnProperty(value) && defined.get(value) !== true) {
    api$j.createTermDefinition({
      activeCtx,
      localCtx,
      term: value,
      defined,
      options
    });
  }

  relativeTo = relativeTo || {};

  if (relativeTo.vocab) {
    const mapping = activeCtx.mappings.get(value); // value is explicitly ignored with a null mapping

    if (mapping === null) {
      return null;
    }

    if (_isObject$7(mapping) && '@id' in mapping) {
      // value is a term
      return mapping['@id'];
    }
  } // split value into prefix:suffix


  const colon = value.indexOf(':');

  if (colon > 0) {
    const prefix = value.substr(0, colon);
    const suffix = value.substr(colon + 1); // do not expand blank nodes (prefix of '_') or already-absolute
    // IRIs (suffix of '//')

    if (prefix === '_' || suffix.indexOf('//') === 0) {
      return value;
    } // prefix dependency not defined, define it


    if (localCtx && localCtx.hasOwnProperty(prefix)) {
      api$j.createTermDefinition({
        activeCtx,
        localCtx,
        term: prefix,
        defined,
        options
      });
    } // use mapping if prefix is defined


    const mapping = activeCtx.mappings.get(prefix);

    if (mapping && mapping._prefix) {
      return mapping['@id'] + suffix;
    } // already absolute IRI


    if (_isAbsoluteIri$3(value)) {
      return value;
    }
  } // prepend vocab


  if (relativeTo.vocab && '@vocab' in activeCtx) {
    return activeCtx['@vocab'] + value;
  } // prepend base


  if (relativeTo.base && '@base' in activeCtx) {
    if (activeCtx['@base']) {
      // The null case preserves value as potentially relative
      return prependBase$5(prependBase$5(options.base, activeCtx['@base']), value);
    }
  } else if (relativeTo.base) {
    return prependBase$5(options.base, value);
  }

  return value;
}
/**
 * Gets the initial context.
 *
 * @param options the options to use:
 *          [base] the document base IRI.
 *
 * @return the initial context.
 */


api$j.getInitialContext = options => {
  const key = JSON.stringify({
    processingMode: options.processingMode
  });
  const cached = INITIAL_CONTEXT_CACHE$1.get(key);

  if (cached) {
    return cached;
  }

  const initialContext = {
    processingMode: options.processingMode,
    mappings: new Map(),
    inverse: null,
    getInverse: _createInverseContext,
    clone: _cloneActiveContext,
    revertToPreviousContext: _revertToPreviousContext,
    protected: {}
  }; // TODO: consider using LRU cache instead

  if (INITIAL_CONTEXT_CACHE$1.size === INITIAL_CONTEXT_CACHE_MAX_SIZE$1) {
    // clear whole cache -- assumes scenario where the cache fills means
    // the cache isn't being used very efficiently anyway
    INITIAL_CONTEXT_CACHE$1.clear();
  }

  INITIAL_CONTEXT_CACHE$1.set(key, initialContext);
  return initialContext;
  /**
   * Generates an inverse context for use in the compaction algorithm, if
   * not already generated for the given active context.
   *
   * @return the inverse context.
   */

  function _createInverseContext() {
    const activeCtx = this; // lazily create inverse

    if (activeCtx.inverse) {
      return activeCtx.inverse;
    }

    const inverse = activeCtx.inverse = {}; // variables for building fast CURIE map

    const fastCurieMap = activeCtx.fastCurieMap = {};
    const irisToTerms = {}; // handle default language

    const defaultLanguage = (activeCtx['@language'] || '@none').toLowerCase(); // handle default direction

    const defaultDirection = activeCtx['@direction']; // create term selections for each mapping in the context, ordered by
    // shortest and then lexicographically least

    const mappings = activeCtx.mappings;
    const terms = [...mappings.keys()].sort(_compareShortestLeast$2);

    for (const term of terms) {
      const mapping = mappings.get(term);

      if (mapping === null) {
        continue;
      }

      let container = mapping['@container'] || '@none';
      container = [].concat(container).sort().join('');

      if (mapping['@id'] === null) {
        continue;
      } // iterate over every IRI in the mapping


      const ids = _asArray$5(mapping['@id']);

      for (const iri of ids) {
        let entry = inverse[iri];
        const isKeyword = api$j.isKeyword(iri);

        if (!entry) {
          // initialize entry
          inverse[iri] = entry = {};

          if (!isKeyword && !mapping._termHasColon) {
            // init IRI to term map and fast CURIE prefixes
            irisToTerms[iri] = [term];
            const fastCurieEntry = {
              iri,
              terms: irisToTerms[iri]
            };

            if (iri[0] in fastCurieMap) {
              fastCurieMap[iri[0]].push(fastCurieEntry);
            } else {
              fastCurieMap[iri[0]] = [fastCurieEntry];
            }
          }
        } else if (!isKeyword && !mapping._termHasColon) {
          // add IRI to term match
          irisToTerms[iri].push(term);
        } // add new entry


        if (!entry[container]) {
          entry[container] = {
            '@language': {},
            '@type': {},
            '@any': {}
          };
        }

        entry = entry[container];

        _addPreferredTerm(term, entry['@any'], '@none');

        if (mapping.reverse) {
          // term is preferred for values using @reverse
          _addPreferredTerm(term, entry['@type'], '@reverse');
        } else if (mapping['@type'] === '@none') {
          _addPreferredTerm(term, entry['@any'], '@none');

          _addPreferredTerm(term, entry['@language'], '@none');

          _addPreferredTerm(term, entry['@type'], '@none');
        } else if ('@type' in mapping) {
          // term is preferred for values using specific type
          _addPreferredTerm(term, entry['@type'], mapping['@type']);
        } else if ('@language' in mapping && '@direction' in mapping) {
          // term is preferred for values using specific language and direction
          const language = mapping['@language'];
          const direction = mapping['@direction'];

          if (language && direction) {
            _addPreferredTerm(term, entry['@language'], `${language}_${direction}`.toLowerCase());
          } else if (language) {
            _addPreferredTerm(term, entry['@language'], language.toLowerCase());
          } else if (direction) {
            _addPreferredTerm(term, entry['@language'], `_${direction}`);
          } else {
            _addPreferredTerm(term, entry['@language'], '@null');
          }
        } else if ('@language' in mapping) {
          _addPreferredTerm(term, entry['@language'], (mapping['@language'] || '@null').toLowerCase());
        } else if ('@direction' in mapping) {
          if (mapping['@direction']) {
            _addPreferredTerm(term, entry['@language'], `_${mapping['@direction']}`);
          } else {
            _addPreferredTerm(term, entry['@language'], '@none');
          }
        } else if (defaultDirection) {
          _addPreferredTerm(term, entry['@language'], `_${defaultDirection}`);

          _addPreferredTerm(term, entry['@language'], '@none');

          _addPreferredTerm(term, entry['@type'], '@none');
        } else {
          // add entries for no type and no language
          _addPreferredTerm(term, entry['@language'], defaultLanguage);

          _addPreferredTerm(term, entry['@language'], '@none');

          _addPreferredTerm(term, entry['@type'], '@none');
        }
      }
    } // build fast CURIE map


    for (const key in fastCurieMap) {
      _buildIriMap(fastCurieMap, key, 1);
    }

    return inverse;
  }
  /**
   * Runs a recursive algorithm to build a lookup map for quickly finding
   * potential CURIEs.
   *
   * @param iriMap the map to build.
   * @param key the current key in the map to work on.
   * @param idx the index into the IRI to compare.
   */


  function _buildIriMap(iriMap, key, idx) {
    const entries = iriMap[key];
    const next = iriMap[key] = {};
    let iri;
    let letter;

    for (const entry of entries) {
      iri = entry.iri;

      if (idx >= iri.length) {
        letter = '';
      } else {
        letter = iri[idx];
      }

      if (letter in next) {
        next[letter].push(entry);
      } else {
        next[letter] = [entry];
      }
    }

    for (const key in next) {
      if (key === '') {
        continue;
      }

      _buildIriMap(next, key, idx + 1);
    }
  }
  /**
   * Adds the term for the given entry if not already added.
   *
   * @param term the term to add.
   * @param entry the inverse context typeOrLanguage entry to add to.
   * @param typeOrLanguageValue the key in the entry to add to.
   */


  function _addPreferredTerm(term, entry, typeOrLanguageValue) {
    if (!entry.hasOwnProperty(typeOrLanguageValue)) {
      entry[typeOrLanguageValue] = term;
    }
  }
  /**
   * Clones an active context, creating a child active context.
   *
   * @return a clone (child) of the active context.
   */


  function _cloneActiveContext() {
    const child = {};
    child.mappings = util$2.clone(this.mappings);
    child.clone = this.clone;
    child.inverse = null;
    child.getInverse = this.getInverse;
    child.protected = util$2.clone(this.protected);

    if (this.previousContext) {
      child.previousContext = this.previousContext.clone();
    }

    child.revertToPreviousContext = this.revertToPreviousContext;

    if ('@base' in this) {
      child['@base'] = this['@base'];
    }

    if ('@language' in this) {
      child['@language'] = this['@language'];
    }

    if ('@vocab' in this) {
      child['@vocab'] = this['@vocab'];
    }

    return child;
  }
  /**
   * Reverts any type-scoped context in this active context to the previous
   * context.
   */


  function _revertToPreviousContext() {
    if (!this.previousContext) {
      return this;
    }

    return this.previousContext.clone();
  }
};
/**
 * Gets the value for the given active context key and type, null if none is
 * set or undefined if none is set and type is '@context'.
 *
 * @param ctx the active context.
 * @param key the context key.
 * @param [type] the type of value to get (eg: '@id', '@type'), if not
 *          specified gets the entire entry for a key, null if not found.
 *
 * @return the value, null, or undefined.
 */


api$j.getContextValue = (ctx, key, type) => {
  // invalid key
  if (key === null) {
    if (type === '@context') {
      return undefined;
    }

    return null;
  } // get specific entry information


  if (ctx.mappings.has(key)) {
    const entry = ctx.mappings.get(key);

    if (_isUndefined$3(type)) {
      // return whole entry
      return entry;
    }

    if (entry.hasOwnProperty(type)) {
      // return entry value for type
      return entry[type];
    }
  } // get default language


  if (type === '@language' && type in ctx) {
    return ctx[type];
  } // get default direction


  if (type === '@direction' && type in ctx) {
    return ctx[type];
  }

  if (type === '@context') {
    return undefined;
  }

  return null;
};
/**
 * Processing Mode check.
 *
 * @param activeCtx the current active context.
 * @param version the string or numeric version to check.
 *
 * @return boolean.
 */


api$j.processingMode = (activeCtx, version) => {
  if (version.toString() >= '1.1') {
    return !activeCtx.processingMode || activeCtx.processingMode >= 'json-ld-' + version.toString();
  } else {
    return activeCtx.processingMode === 'json-ld-1.0';
  }
};
/**
 * Returns whether or not the given value is a keyword.
 *
 * @param v the value to check.
 *
 * @return true if the value is a keyword, false if not.
 */


api$j.isKeyword = v => {
  if (!_isString$6(v) || v[0] !== '@') {
    return false;
  }

  switch (v) {
    case '@base':
    case '@container':
    case '@context':
    case '@default':
    case '@direction':
    case '@embed':
    case '@explicit':
    case '@graph':
    case '@id':
    case '@included':
    case '@index':
    case '@json':
    case '@language':
    case '@list':
    case '@nest':
    case '@none':
    case '@omitDefault':
    case '@prefix':
    case '@preserve':
    case '@protected':
    case '@requireAll':
    case '@reverse':
    case '@set':
    case '@type':
    case '@value':
    case '@version':
    case '@vocab':
      return true;
  }

  return false;
};

function _deepCompare$1(x1, x2) {
  // compare `null` or primitive types directly
  if (!(x1 && typeof x1 === 'object') || !(x2 && typeof x2 === 'object')) {
    return x1 === x2;
  } // x1 and x2 are objects (also potentially arrays)


  const x1Array = Array.isArray(x1);

  if (x1Array !== Array.isArray(x2)) {
    return false;
  }

  if (x1Array) {
    if (x1.length !== x2.length) {
      return false;
    }

    for (let i = 0; i < x1.length; ++i) {
      if (!_deepCompare$1(x1[i], x2[i])) {
        return false;
      }
    }

    return true;
  } // x1 and x2 are non-array objects


  const k1s = Object.keys(x1);
  const k2s = Object.keys(x2);

  if (k1s.length !== k2s.length) {
    return false;
  }

  for (const k1 in x1) {
    let v1 = x1[k1];
    let v2 = x2[k1]; // special case: `@container` can be in any order

    if (k1 === '@container') {
      if (Array.isArray(v1) && Array.isArray(v2)) {
        v1 = v1.slice().sort();
        v2 = v2.slice().sort();
      }
    }

    if (!_deepCompare$1(v1, v2)) {
      return false;
    }
  }

  return true;
}

function asyncGeneratorStep$2(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator$2(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep$2(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep$2(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }



const {
  isArray: _isArray$7,
  isObject: _isObject$8,
  isEmptyObject: _isEmptyObject$1,
  isString: _isString$7,
  isUndefined: _isUndefined$4
} = types$1;

const {
  isList: _isList$2,
  isValue: _isValue$2,
  isGraph: _isGraph$2,
  isSubject: _isSubject$1
} = graphTypes$1;

const {
  expandIri: _expandIri$5,
  getContextValue: _getContextValue$2,
  isKeyword: _isKeyword$2,
  process: _processContext$3,
  processingMode: _processingMode$3
} = context$1;

const {
  isAbsolute: _isAbsoluteIri$4
} = url$1;

const {
  addValue: _addValue$2,
  asArray: _asArray$6,
  getValues: _getValues$1,
  validateTypeValue: _validateTypeValue$1
} = util$2;

const api$k = {};
var expand$1 = api$k;
const REGEX_BCP47$2 = /^[a-zA-Z]{1,8}(-[a-zA-Z0-9]{1,8})*$/;
/**
 * Recursively expands an element using the given context. Any context in
 * the element will be removed. All context URLs must have been retrieved
 * before calling this method.
 *
 * @param activeCtx the context to use.
 * @param activeProperty the property for the element, null for none.
 * @param element the element to expand.
 * @param options the expansion options.
 * @param insideList true if the element is a list, false if not.
 * @param insideIndex true if the element is inside an index container,
 *          false if not.
 * @param typeScopedContext an optional type-scoped active context for
 *          expanding values of nodes that were expressed according to
 *          a type-scoped context.
 * @param expansionMap(info) a function that can be used to custom map
 *          unmappable values (or to throw an error when they are detected);
 *          if this function returns `undefined` then the default behavior
 *          will be used.
 *
 * @return a Promise that resolves to the expanded value.
 */

api$k.expand = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator$2(function* ({
    activeCtx,
    activeProperty = null,
    element,
    options = {},
    insideList = false,
    insideIndex = false,
    typeScopedContext = null,
    expansionMap = () => undefined
  }) {
    // nothing to expand
    if (element === null || element === undefined) {
      return null;
    } // disable framing if activeProperty is @default


    if (activeProperty === '@default') {
      options = Object.assign({}, options, {
        isFrame: false
      });
    }

    if (!_isArray$7(element) && !_isObject$8(element)) {
      // drop free-floating scalars that are not in lists unless custom mapped
      if (!insideList && (activeProperty === null || _expandIri$5(activeCtx, activeProperty, {
        vocab: true
      }, options) === '@graph')) {
        const mapped = yield expansionMap({
          unmappedValue: element,
          activeCtx,
          activeProperty,
          options,
          insideList
        });

        if (mapped === undefined) {
          return null;
        }

        return mapped;
      } // expand element according to value expansion rules


      return _expandValue$1({
        activeCtx,
        activeProperty,
        value: element,
        options
      });
    } // recursively expand array


    if (_isArray$7(element)) {
      let rval = [];
      const container = _getContextValue$2(activeCtx, activeProperty, '@container') || [];
      insideList = insideList || container.includes('@list');

      for (let i = 0; i < element.length; ++i) {
        // expand element
        let e = yield api$k.expand({
          activeCtx,
          activeProperty,
          element: element[i],
          options,
          expansionMap,
          insideIndex,
          typeScopedContext
        });

        if (insideList && _isArray$7(e)) {
          e = {
            '@list': e
          };
        }

        if (e === null) {
          e = yield expansionMap({
            unmappedValue: element[i],
            activeCtx,
            activeProperty,
            parent: element,
            index: i,
            options,
            expandedParent: rval,
            insideList
          });

          if (e === undefined) {
            continue;
          }
        }

        if (_isArray$7(e)) {
          rval = rval.concat(e);
        } else {
          rval.push(e);
        }
      }

      return rval;
    } // recursively expand object:
    // first, expand the active property


    const expandedActiveProperty = _expandIri$5(activeCtx, activeProperty, {
      vocab: true
    }, options); // Get any property-scoped context for activeProperty


    const propertyScopedCtx = _getContextValue$2(activeCtx, activeProperty, '@context'); // second, determine if any type-scoped context should be reverted; it
    // should only be reverted when the following are all true:
    // 1. `element` is not a value or subject reference
    // 2. `insideIndex` is false


    typeScopedContext = typeScopedContext || (activeCtx.previousContext ? activeCtx : null);
    let keys = Object.keys(element).sort();
    let mustRevert = !insideIndex;

    if (mustRevert && typeScopedContext && keys.length <= 2 && !keys.includes('@context')) {
      for (const key of keys) {
        const expandedProperty = _expandIri$5(typeScopedContext, key, {
          vocab: true
        }, options);

        if (expandedProperty === '@value') {
          // value found, ensure type-scoped context is used to expand it
          mustRevert = false;
          activeCtx = typeScopedContext;
          break;
        }

        if (expandedProperty === '@id' && keys.length === 1) {
          // subject reference found, do not revert
          mustRevert = false;
          break;
        }
      }
    }

    if (mustRevert) {
      // revert type scoped context
      activeCtx = activeCtx.revertToPreviousContext();
    } // apply property-scoped context after reverting term-scoped context


    if (!_isUndefined$4(propertyScopedCtx)) {
      activeCtx = yield _processContext$3({
        activeCtx,
        localCtx: propertyScopedCtx,
        propagate: true,
        overrideProtected: true,
        options
      });
    } // if element has a context, process it


    if ('@context' in element) {
      activeCtx = yield _processContext$3({
        activeCtx,
        localCtx: element['@context'],
        options
      });
    } // set the type-scoped context to the context on input, for use later


    typeScopedContext = activeCtx; // Remember the first key found expanding to @type

    let typeKey = null; // look for scoped contexts on `@type`

    for (const key of keys) {
      const expandedProperty = _expandIri$5(activeCtx, key, {
        vocab: true
      }, options);

      if (expandedProperty === '@type') {
        // set scoped contexts from @type
        // avoid sorting if possible
        typeKey = typeKey || key;
        const value = element[key];
        const types = Array.isArray(value) ? value.length > 1 ? value.slice().sort() : value : [value];

        for (const type of types) {
          const ctx = _getContextValue$2(typeScopedContext, type, '@context');

          if (!_isUndefined$4(ctx)) {
            activeCtx = yield _processContext$3({
              activeCtx,
              localCtx: ctx,
              options,
              propagate: false
            });
          }
        }
      }
    } // process each key and value in element, ignoring @nest content


    let rval = {};
    yield _expandObject$1({
      activeCtx,
      activeProperty,
      expandedActiveProperty,
      element,
      expandedParent: rval,
      options,
      insideList,
      typeKey,
      typeScopedContext,
      expansionMap
    }); // get property count on expanded output

    keys = Object.keys(rval);
    let count = keys.length;

    if ('@value' in rval) {
      // @value must only have @language or @type
      if ('@type' in rval && ('@language' in rval || '@direction' in rval)) {
        throw new JsonLdError_1$1('Invalid JSON-LD syntax; an element containing "@value" may not ' + 'contain both "@type" and either "@language" or "@direction".', 'jsonld.SyntaxError', {
          code: 'invalid value object',
          element: rval
        });
      }

      let validCount = count - 1;

      if ('@type' in rval) {
        validCount -= 1;
      }

      if ('@index' in rval) {
        validCount -= 1;
      }

      if ('@language' in rval) {
        validCount -= 1;
      }

      if ('@direction' in rval) {
        validCount -= 1;
      }

      if (validCount !== 0) {
        throw new JsonLdError_1$1('Invalid JSON-LD syntax; an element containing "@value" may only ' + 'have an "@index" property and either "@type" ' + 'or either or both "@language" or "@direction".', 'jsonld.SyntaxError', {
          code: 'invalid value object',
          element: rval
        });
      }

      const values = rval['@value'] === null ? [] : _asArray$6(rval['@value']);

      const types = _getValues$1(rval, '@type'); // drop null @values unless custom mapped


      if (_processingMode$3(activeCtx, 1.1) && types.includes('@json') && types.length === 1) ; else if (values.length === 0) {
        const mapped = yield expansionMap({
          unmappedValue: rval,
          activeCtx,
          activeProperty,
          element,
          options,
          insideList
        });

        if (mapped !== undefined) {
          rval = mapped;
        } else {
          rval = null;
        }
      } else if (!values.every(v => _isString$7(v) || _isEmptyObject$1(v)) && '@language' in rval) {
        // if @language is present, @value must be a string
        throw new JsonLdError_1$1('Invalid JSON-LD syntax; only strings may be language-tagged.', 'jsonld.SyntaxError', {
          code: 'invalid language-tagged value',
          element: rval
        });
      } else if (!types.every(t => _isAbsoluteIri$4(t) && !(_isString$7(t) && t.indexOf('_:') === 0) || _isEmptyObject$1(t))) {
        throw new JsonLdError_1$1('Invalid JSON-LD syntax; an element containing "@value" and "@type" ' + 'must have an absolute IRI for the value of "@type".', 'jsonld.SyntaxError', {
          code: 'invalid typed value',
          element: rval
        });
      }
    } else if ('@type' in rval && !_isArray$7(rval['@type'])) {
      // convert @type to an array
      rval['@type'] = [rval['@type']];
    } else if ('@set' in rval || '@list' in rval) {
      // handle @set and @list
      if (count > 1 && !(count === 2 && '@index' in rval)) {
        throw new JsonLdError_1$1('Invalid JSON-LD syntax; if an element has the property "@set" ' + 'or "@list", then it can have at most one other property that is ' + '"@index".', 'jsonld.SyntaxError', {
          code: 'invalid set or list object',
          element: rval
        });
      } // optimize away @set


      if ('@set' in rval) {
        rval = rval['@set'];
        keys = Object.keys(rval);
        count = keys.length;
      }
    } else if (count === 1 && '@language' in rval) {
      // drop objects with only @language unless custom mapped
      const mapped = yield expansionMap(rval, {
        unmappedValue: rval,
        activeCtx,
        activeProperty,
        element,
        options,
        insideList
      });

      if (mapped !== undefined) {
        rval = mapped;
      } else {
        rval = null;
      }
    } // drop certain top-level objects that do not occur in lists, unless custom
    // mapped


    if (_isObject$8(rval) && !options.keepFreeFloatingNodes && !insideList && (activeProperty === null || expandedActiveProperty === '@graph')) {
      // drop empty object, top-level @value/@list, or object with only @id
      if (count === 0 || '@value' in rval || '@list' in rval || count === 1 && '@id' in rval) {
        const mapped = yield expansionMap({
          unmappedValue: rval,
          activeCtx,
          activeProperty,
          element,
          options,
          insideList
        });

        if (mapped !== undefined) {
          rval = mapped;
        } else {
          rval = null;
        }
      }
    }

    return rval;
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Expand each key and value of element adding to result
 *
 * @param activeCtx the context to use.
 * @param activeProperty the property for the element.
 * @param expandedActiveProperty the expansion of activeProperty
 * @param element the element to expand.
 * @param expandedParent the expanded result into which to add values.
 * @param options the expansion options.
 * @param insideList true if the element is a list, false if not.
 * @param typeKey first key found expanding to @type.
 * @param typeScopedContext the context before reverting.
 * @param expansionMap(info) a function that can be used to custom map
 *          unmappable values (or to throw an error when they are detected);
 *          if this function returns `undefined` then the default behavior
 *          will be used.
 */


function _expandObject$1(_x2) {
  return _expandObject2.apply(this, arguments);
}
/**
 * Expands the given value by using the coercion and keyword rules in the
 * given context.
 *
 * @param activeCtx the active context to use.
 * @param activeProperty the active property the value is associated with.
 * @param value the value to expand.
 * @param {Object} [options] - processing options.
 *
 * @return the expanded value.
 */


function _expandObject2() {
  _expandObject2 = _asyncToGenerator$2(function* ({
    activeCtx,
    activeProperty,
    expandedActiveProperty,
    element,
    expandedParent,
    options = {},
    insideList,
    typeKey,
    typeScopedContext,
    expansionMap
  }) {
    const keys = Object.keys(element).sort();
    const nests = [];
    let unexpandedValue; // Figure out if this is the type for a JSON literal

    const isJsonType = element[typeKey] && _expandIri$5(activeCtx, _isArray$7(element[typeKey]) ? element[typeKey][0] : element[typeKey], {
      vocab: true
    }, options) === '@json';

    for (const key of keys) {
      let value = element[key];
      let expandedValue; // skip @context

      if (key === '@context') {
        continue;
      } // expand property


      let expandedProperty = _expandIri$5(activeCtx, key, {
        vocab: true
      }, options); // drop non-absolute IRI keys that aren't keywords unless custom mapped


      if (expandedProperty === null || !(_isAbsoluteIri$4(expandedProperty) || _isKeyword$2(expandedProperty))) {
        // TODO: use `await` to support async
        expandedProperty = expansionMap({
          unmappedProperty: key,
          activeCtx,
          activeProperty,
          parent: element,
          options,
          insideList,
          value,
          expandedParent
        });

        if (expandedProperty === undefined) {
          continue;
        }
      }

      if (_isKeyword$2(expandedProperty)) {
        if (expandedActiveProperty === '@reverse') {
          throw new JsonLdError_1$1('Invalid JSON-LD syntax; a keyword cannot be used as a @reverse ' + 'property.', 'jsonld.SyntaxError', {
            code: 'invalid reverse property map',
            value
          });
        }

        if (expandedProperty in expandedParent && expandedProperty !== '@included' && expandedProperty !== '@type') {
          throw new JsonLdError_1$1('Invalid JSON-LD syntax; colliding keywords detected.', 'jsonld.SyntaxError', {
            code: 'colliding keywords',
            keyword: expandedProperty
          });
        }
      } // syntax error if @id is not a string


      if (expandedProperty === '@id') {
        if (!_isString$7(value)) {
          if (!options.isFrame) {
            throw new JsonLdError_1$1('Invalid JSON-LD syntax; "@id" value must a string.', 'jsonld.SyntaxError', {
              code: 'invalid @id value',
              value
            });
          }

          if (_isObject$8(value)) {
            // empty object is a wildcard
            if (!_isEmptyObject$1(value)) {
              throw new JsonLdError_1$1('Invalid JSON-LD syntax; "@id" value an empty object or array ' + 'of strings, if framing', 'jsonld.SyntaxError', {
                code: 'invalid @id value',
                value
              });
            }
          } else if (_isArray$7(value)) {
            if (!value.every(v => _isString$7(v))) {
              throw new JsonLdError_1$1('Invalid JSON-LD syntax; "@id" value an empty object or array ' + 'of strings, if framing', 'jsonld.SyntaxError', {
                code: 'invalid @id value',
                value
              });
            }
          } else {
            throw new JsonLdError_1$1('Invalid JSON-LD syntax; "@id" value an empty object or array ' + 'of strings, if framing', 'jsonld.SyntaxError', {
              code: 'invalid @id value',
              value
            });
          }
        }

        _addValue$2(expandedParent, '@id', _asArray$6(value).map(v => _isString$7(v) ? _expandIri$5(activeCtx, v, {
          base: true
        }, options) : v), {
          propertyIsArray: options.isFrame
        });

        continue;
      }

      if (expandedProperty === '@type') {
        // if framing, can be a default object, but need to expand
        // key to determine that
        if (_isObject$8(value)) {
          value = Object.fromEntries(Object.entries(value).map(([k, v]) => [_expandIri$5(typeScopedContext, k, {
            vocab: true
          }), _asArray$6(v).map(vv => _expandIri$5(typeScopedContext, vv, {
            base: true,
            vocab: true
          }))]));
        }

        _validateTypeValue$1(value, options.isFrame);

        _addValue$2(expandedParent, '@type', _asArray$6(value).map(v => _isString$7(v) ? _expandIri$5(typeScopedContext, v, {
          base: true,
          vocab: true
        }, options) : v), {
          propertyIsArray: options.isFrame
        });

        continue;
      } // Included blocks are treated as an array of separate object nodes sharing
      // the same referencing active_property.
      // For 1.0, it is skipped as are other unknown keywords


      if (expandedProperty === '@included' && _processingMode$3(activeCtx, 1.1)) {
        const includedResult = _asArray$6((yield api$k.expand({
          activeCtx,
          activeProperty,
          element: value,
          options,
          expansionMap
        }))); // Expanded values must be node objects


        if (!includedResult.every(v => _isSubject$1(v))) {
          throw new JsonLdError_1$1('Invalid JSON-LD syntax; ' + 'values of @included must expand to node objects.', 'jsonld.SyntaxError', {
            code: 'invalid @included value',
            value
          });
        }

        _addValue$2(expandedParent, '@included', includedResult, {
          propertyIsArray: true
        });

        continue;
      } // @graph must be an array or an object


      if (expandedProperty === '@graph' && !(_isObject$8(value) || _isArray$7(value))) {
        throw new JsonLdError_1$1('Invalid JSON-LD syntax; "@graph" value must not be an ' + 'object or an array.', 'jsonld.SyntaxError', {
          code: 'invalid @graph value',
          value
        });
      }

      if (expandedProperty === '@value') {
        // capture value for later
        // "colliding keywords" check prevents this from being set twice
        unexpandedValue = value;

        if (isJsonType && _processingMode$3(activeCtx, 1.1)) {
          // no coercion to array, and retain all values
          expandedParent['@value'] = value;
        } else {
          _addValue$2(expandedParent, '@value', value, {
            propertyIsArray: options.isFrame
          });
        }

        continue;
      } // @language must be a string
      // it should match BCP47


      if (expandedProperty === '@language') {
        if (value === null) {
          // drop null @language values, they expand as if they didn't exist
          continue;
        }

        if (!_isString$7(value) && !options.isFrame) {
          throw new JsonLdError_1$1('Invalid JSON-LD syntax; "@language" value must be a string.', 'jsonld.SyntaxError', {
            code: 'invalid language-tagged string',
            value
          });
        } // ensure language value is lowercase


        value = _asArray$6(value).map(v => _isString$7(v) ? v.toLowerCase() : v); // ensure language tag matches BCP47

        for (const lang of value) {
          if (_isString$7(lang) && !lang.match(REGEX_BCP47$2)) {
            console.warn(`@language must be valid BCP47: ${lang}`);
          }
        }

        _addValue$2(expandedParent, '@language', value, {
          propertyIsArray: options.isFrame
        });

        continue;
      } // @direction must be "ltr" or "rtl"


      if (expandedProperty === '@direction') {
        if (!_isString$7(value) && !options.isFrame) {
          throw new JsonLdError_1$1('Invalid JSON-LD syntax; "@direction" value must be a string.', 'jsonld.SyntaxError', {
            code: 'invalid base direction',
            value
          });
        }

        value = _asArray$6(value); // ensure direction is "ltr" or "rtl"

        for (const dir of value) {
          if (_isString$7(dir) && dir !== 'ltr' && dir !== 'rtl') {
            throw new JsonLdError_1$1('Invalid JSON-LD syntax; "@direction" must be "ltr" or "rtl".', 'jsonld.SyntaxError', {
              code: 'invalid base direction',
              value
            });
          }
        }

        _addValue$2(expandedParent, '@direction', value, {
          propertyIsArray: options.isFrame
        });

        continue;
      } // @index must be a string


      if (expandedProperty === '@index') {
        if (!_isString$7(value)) {
          throw new JsonLdError_1$1('Invalid JSON-LD syntax; "@index" value must be a string.', 'jsonld.SyntaxError', {
            code: 'invalid @index value',
            value
          });
        }

        _addValue$2(expandedParent, '@index', value);

        continue;
      } // @reverse must be an object


      if (expandedProperty === '@reverse') {
        if (!_isObject$8(value)) {
          throw new JsonLdError_1$1('Invalid JSON-LD syntax; "@reverse" value must be an object.', 'jsonld.SyntaxError', {
            code: 'invalid @reverse value',
            value
          });
        }

        expandedValue = yield api$k.expand({
          activeCtx,
          activeProperty: '@reverse',
          element: value,
          options,
          expansionMap
        }); // properties double-reversed

        if ('@reverse' in expandedValue) {
          for (const property in expandedValue['@reverse']) {
            _addValue$2(expandedParent, property, expandedValue['@reverse'][property], {
              propertyIsArray: true
            });
          }
        } // FIXME: can this be merged with code below to simplify?
        // merge in all reversed properties


        let reverseMap = expandedParent['@reverse'] || null;

        for (const property in expandedValue) {
          if (property === '@reverse') {
            continue;
          }

          if (reverseMap === null) {
            reverseMap = expandedParent['@reverse'] = {};
          }

          _addValue$2(reverseMap, property, [], {
            propertyIsArray: true
          });

          const items = expandedValue[property];

          for (let ii = 0; ii < items.length; ++ii) {
            const item = items[ii];

            if (_isValue$2(item) || _isList$2(item)) {
              throw new JsonLdError_1$1('Invalid JSON-LD syntax; "@reverse" value must not be a ' + '@value or an @list.', 'jsonld.SyntaxError', {
                code: 'invalid reverse property value',
                value: expandedValue
              });
            }

            _addValue$2(reverseMap, property, item, {
              propertyIsArray: true
            });
          }
        }

        continue;
      } // nested keys


      if (expandedProperty === '@nest') {
        nests.push(key);
        continue;
      } // use potential scoped context for key


      let termCtx = activeCtx;

      const ctx = _getContextValue$2(activeCtx, key, '@context');

      if (!_isUndefined$4(ctx)) {
        termCtx = yield _processContext$3({
          activeCtx,
          localCtx: ctx,
          propagate: true,
          overrideProtected: true,
          options
        });
      }

      const container = _getContextValue$2(termCtx, key, '@container') || [];

      if (container.includes('@language') && _isObject$8(value)) {
        const direction = _getContextValue$2(termCtx, key, '@direction'); // handle language map container (skip if value is not an object)


        expandedValue = _expandLanguageMap$1(termCtx, value, direction, options);
      } else if (container.includes('@index') && _isObject$8(value)) {
        // handle index container (skip if value is not an object)
        const asGraph = container.includes('@graph');
        const indexKey = _getContextValue$2(termCtx, key, '@index') || '@index';

        const propertyIndex = indexKey !== '@index' && _expandIri$5(activeCtx, indexKey, {
          vocab: true
        }, options);

        expandedValue = yield _expandIndexMap$1({
          activeCtx: termCtx,
          options,
          activeProperty: key,
          value,
          expansionMap,
          asGraph,
          indexKey,
          propertyIndex
        });
      } else if (container.includes('@id') && _isObject$8(value)) {
        // handle id container (skip if value is not an object)
        const asGraph = container.includes('@graph');
        expandedValue = yield _expandIndexMap$1({
          activeCtx: termCtx,
          options,
          activeProperty: key,
          value,
          expansionMap,
          asGraph,
          indexKey: '@id'
        });
      } else if (container.includes('@type') && _isObject$8(value)) {
        // handle type container (skip if value is not an object)
        expandedValue = yield _expandIndexMap$1({
          // since container is `@type`, revert type scoped context when expanding
          activeCtx: termCtx.revertToPreviousContext(),
          options,
          activeProperty: key,
          value,
          expansionMap,
          asGraph: false,
          indexKey: '@type'
        });
      } else {
        // recurse into @list or @set
        const isList = expandedProperty === '@list';

        if (isList || expandedProperty === '@set') {
          let nextActiveProperty = activeProperty;

          if (isList && expandedActiveProperty === '@graph') {
            nextActiveProperty = null;
          }

          expandedValue = yield api$k.expand({
            activeCtx: termCtx,
            activeProperty: nextActiveProperty,
            element: value,
            options,
            insideList: isList,
            expansionMap
          });
        } else if (_getContextValue$2(activeCtx, key, '@type') === '@json') {
          expandedValue = {
            '@type': '@json',
            '@value': value
          };
        } else {
          // recursively expand value with key as new active property
          expandedValue = yield api$k.expand({
            activeCtx: termCtx,
            activeProperty: key,
            element: value,
            options,
            insideList: false,
            expansionMap
          });
        }
      } // drop null values if property is not @value


      if (expandedValue === null && expandedProperty !== '@value') {
        // TODO: use `await` to support async
        expandedValue = expansionMap({
          unmappedValue: value,
          expandedProperty,
          activeCtx: termCtx,
          activeProperty,
          parent: element,
          options,
          insideList,
          key,
          expandedParent
        });

        if (expandedValue === undefined) {
          continue;
        }
      } // convert expanded value to @list if container specifies it


      if (expandedProperty !== '@list' && !_isList$2(expandedValue) && container.includes('@list')) {
        // ensure expanded value in @list is an array
        expandedValue = {
          '@list': _asArray$6(expandedValue)
        };
      } // convert expanded value to @graph if container specifies it
      // and value is not, itself, a graph
      // index cases handled above


      if (container.includes('@graph') && !container.some(key => key === '@id' || key === '@index')) {
        // ensure expanded values are arrays
        expandedValue = _asArray$6(expandedValue).map(v => ({
          '@graph': _asArray$6(v)
        }));
      } // FIXME: can this be merged with code above to simplify?
      // merge in reverse properties


      if (termCtx.mappings.has(key) && termCtx.mappings.get(key).reverse) {
        const reverseMap = expandedParent['@reverse'] = expandedParent['@reverse'] || {};
        expandedValue = _asArray$6(expandedValue);

        for (let ii = 0; ii < expandedValue.length; ++ii) {
          const item = expandedValue[ii];

          if (_isValue$2(item) || _isList$2(item)) {
            throw new JsonLdError_1$1('Invalid JSON-LD syntax; "@reverse" value must not be a ' + '@value or an @list.', 'jsonld.SyntaxError', {
              code: 'invalid reverse property value',
              value: expandedValue
            });
          }

          _addValue$2(reverseMap, expandedProperty, item, {
            propertyIsArray: true
          });
        }

        continue;
      } // add value for property
      // special keywords handled above


      _addValue$2(expandedParent, expandedProperty, expandedValue, {
        propertyIsArray: true
      });
    } // @value must not be an object or an array (unless framing) or if @type is
    // @json


    if ('@value' in expandedParent) {
      if (expandedParent['@type'] === '@json' && _processingMode$3(activeCtx, 1.1)) ; else if ((_isObject$8(unexpandedValue) || _isArray$7(unexpandedValue)) && !options.isFrame) {
        throw new JsonLdError_1$1('Invalid JSON-LD syntax; "@value" value must not be an ' + 'object or an array.', 'jsonld.SyntaxError', {
          code: 'invalid value object value',
          value: unexpandedValue
        });
      }
    } // expand each nested key


    for (const key of nests) {
      const nestedValues = _isArray$7(element[key]) ? element[key] : [element[key]];

      for (const nv of nestedValues) {
        if (!_isObject$8(nv) || Object.keys(nv).some(k => _expandIri$5(activeCtx, k, {
          vocab: true
        }, options) === '@value')) {
          throw new JsonLdError_1$1('Invalid JSON-LD syntax; nested value must be a node object.', 'jsonld.SyntaxError', {
            code: 'invalid @nest value',
            value: nv
          });
        }

        yield _expandObject$1({
          activeCtx,
          activeProperty,
          expandedActiveProperty,
          element: nv,
          expandedParent,
          options,
          insideList,
          typeScopedContext,
          typeKey,
          expansionMap
        });
      }
    }
  });
  return _expandObject2.apply(this, arguments);
}

function _expandValue$1({
  activeCtx,
  activeProperty,
  value,
  options
}) {
  // nothing to expand
  if (value === null || value === undefined) {
    return null;
  } // special-case expand @id and @type (skips '@id' expansion)


  const expandedProperty = _expandIri$5(activeCtx, activeProperty, {
    vocab: true
  }, options);

  if (expandedProperty === '@id') {
    return _expandIri$5(activeCtx, value, {
      base: true
    }, options);
  } else if (expandedProperty === '@type') {
    return _expandIri$5(activeCtx, value, {
      vocab: true,
      base: true
    }, options);
  } // get type definition from context


  const type = _getContextValue$2(activeCtx, activeProperty, '@type'); // do @id expansion (automatic for @graph)


  if ((type === '@id' || expandedProperty === '@graph') && _isString$7(value)) {
    return {
      '@id': _expandIri$5(activeCtx, value, {
        base: true
      }, options)
    };
  } // do @id expansion w/vocab


  if (type === '@vocab' && _isString$7(value)) {
    return {
      '@id': _expandIri$5(activeCtx, value, {
        vocab: true,
        base: true
      }, options)
    };
  } // do not expand keyword values


  if (_isKeyword$2(expandedProperty)) {
    return value;
  }

  const rval = {};

  if (type && !['@id', '@vocab', '@none'].includes(type)) {
    // other type
    rval['@type'] = type;
  } else if (_isString$7(value)) {
    // check for language tagging for strings
    const language = _getContextValue$2(activeCtx, activeProperty, '@language');

    if (language !== null) {
      rval['@language'] = language;
    }

    const direction = _getContextValue$2(activeCtx, activeProperty, '@direction');

    if (direction !== null) {
      rval['@direction'] = direction;
    }
  } // do conversion of values that aren't basic JSON types to strings


  if (!['boolean', 'number', 'string'].includes(typeof value)) {
    value = value.toString();
  }

  rval['@value'] = value;
  return rval;
}
/**
 * Expands a language map.
 *
 * @param activeCtx the active context to use.
 * @param languageMap the language map to expand.
 * @param direction the direction to apply to values.
 * @param {Object} [options] - processing options.
 *
 * @return the expanded language map.
 */


function _expandLanguageMap$1(activeCtx, languageMap, direction, options) {
  const rval = [];
  const keys = Object.keys(languageMap).sort();

  for (const key of keys) {
    const expandedKey = _expandIri$5(activeCtx, key, {
      vocab: true
    }, options);

    let val = languageMap[key];

    if (!_isArray$7(val)) {
      val = [val];
    }

    for (const item of val) {
      if (item === null) {
        // null values are allowed (8.5) but ignored (3.1)
        continue;
      }

      if (!_isString$7(item)) {
        throw new JsonLdError_1$1('Invalid JSON-LD syntax; language map values must be strings.', 'jsonld.SyntaxError', {
          code: 'invalid language map value',
          languageMap
        });
      }

      const val = {
        '@value': item
      };

      if (expandedKey !== '@none') {
        val['@language'] = key.toLowerCase();
      }

      if (direction) {
        val['@direction'] = direction;
      }

      rval.push(val);
    }
  }

  return rval;
}

function _expandIndexMap$1(_x3) {
  return _expandIndexMap2.apply(this, arguments);
}

function _expandIndexMap2() {
  _expandIndexMap2 = _asyncToGenerator$2(function* ({
    activeCtx,
    options,
    activeProperty,
    value,
    expansionMap,
    asGraph,
    indexKey,
    propertyIndex
  }) {
    const rval = [];
    const keys = Object.keys(value).sort();
    const isTypeIndex = indexKey === '@type';

    for (let key of keys) {
      // if indexKey is @type, there may be a context defined for it
      if (isTypeIndex) {
        const ctx = _getContextValue$2(activeCtx, key, '@context');

        if (!_isUndefined$4(ctx)) {
          activeCtx = yield _processContext$3({
            activeCtx,
            localCtx: ctx,
            propagate: false,
            options
          });
        }
      }

      let val = value[key];

      if (!_isArray$7(val)) {
        val = [val];
      }

      val = yield api$k.expand({
        activeCtx,
        activeProperty,
        element: val,
        options,
        insideList: false,
        insideIndex: true,
        expansionMap
      }); // expand for @type, but also for @none

      let expandedKey;

      if (propertyIndex) {
        if (key === '@none') {
          expandedKey = '@none';
        } else {
          expandedKey = _expandValue$1({
            activeCtx,
            activeProperty: indexKey,
            value: key,
            options
          });
        }
      } else {
        expandedKey = _expandIri$5(activeCtx, key, {
          vocab: true
        }, options);
      }

      if (indexKey === '@id') {
        // expand document relative
        key = _expandIri$5(activeCtx, key, {
          base: true
        }, options);
      } else if (isTypeIndex) {
        key = expandedKey;
      }

      for (let item of val) {
        // If this is also a @graph container, turn items into graphs
        if (asGraph && !_isGraph$2(item)) {
          item = {
            '@graph': [item]
          };
        }

        if (indexKey === '@type') {
          if (expandedKey === '@none') ; else if (item['@type']) {
            item['@type'] = [key].concat(item['@type']);
          } else {
            item['@type'] = [key];
          }
        } else if (_isValue$2(item) && !['@language', '@type', '@index'].includes(indexKey)) {
          throw new JsonLdError_1$1('Invalid JSON-LD syntax; Attempt to add illegal key to value ' + `object: "${indexKey}".`, 'jsonld.SyntaxError', {
            code: 'invalid value object',
            value: item
          });
        } else if (propertyIndex) {
          // index is a property to be expanded, and values interpreted for that
          // property
          if (expandedKey !== '@none') {
            // expand key as a value
            _addValue$2(item, propertyIndex, expandedKey, {
              propertyIsArray: true,
              prependValue: true
            });
          }
        } else if (expandedKey !== '@none' && !(indexKey in item)) {
          item[indexKey] = key;
        }

        rval.push(item);
      }
    }

    return rval;
  });
  return _expandIndexMap2.apply(this, arguments);
}

const {
  isKeyword: isKeyword$3
} = context$1;









const api$l = {};
var nodeMap$1 = api$l;
/**
 * Creates a merged JSON-LD node map (node ID => node).
 *
 * @param input the expanded JSON-LD to create a node map of.
 * @param [options] the options to use:
 *          [issuer] a jsonld.IdentifierIssuer to use to label blank nodes.
 *
 * @return the node map.
 */

api$l.createMergedNodeMap = (input, options) => {
  options = options || {}; // produce a map of all subjects and name each bnode

  const issuer = options.issuer || new util$2.IdentifierIssuer('_:b');
  const graphs = {
    '@default': {}
  };
  api$l.createNodeMap(input, graphs, '@default', issuer); // add all non-default graphs to default graph

  return api$l.mergeNodeMaps(graphs);
};
/**
 * Recursively flattens the subjects in the given JSON-LD expanded input
 * into a node map.
 *
 * @param input the JSON-LD expanded input.
 * @param graphs a map of graph name to subject map.
 * @param graph the name of the current graph.
 * @param issuer the blank node identifier issuer.
 * @param name the name assigned to the current input if it is a bnode.
 * @param list the list to append to, null for none.
 */


api$l.createNodeMap = (input, graphs, graph, issuer, name, list) => {
  // recurse through array
  if (types$1.isArray(input)) {
    for (const node of input) {
      api$l.createNodeMap(node, graphs, graph, issuer, undefined, list);
    }

    return;
  } // add non-object to list


  if (!types$1.isObject(input)) {
    if (list) {
      list.push(input);
    }

    return;
  } // add values to list


  if (graphTypes$1.isValue(input)) {
    if ('@type' in input) {
      let type = input['@type']; // rename @type blank node

      if (type.indexOf('_:') === 0) {
        input['@type'] = type = issuer.getId(type);
      }
    }

    if (list) {
      list.push(input);
    }

    return;
  } else if (list && graphTypes$1.isList(input)) {
    const _list = [];
    api$l.createNodeMap(input['@list'], graphs, graph, issuer, name, _list);
    list.push({
      '@list': _list
    });
    return;
  } // Note: At this point, input must be a subject.
  // spec requires @type to be named first, so assign names early


  if ('@type' in input) {
    const types = input['@type'];

    for (const type of types) {
      if (type.indexOf('_:') === 0) {
        issuer.getId(type);
      }
    }
  } // get name for subject


  if (types$1.isUndefined(name)) {
    name = graphTypes$1.isBlankNode(input) ? issuer.getId(input['@id']) : input['@id'];
  } // add subject reference to list


  if (list) {
    list.push({
      '@id': name
    });
  } // create new subject or merge into existing one


  const subjects = graphs[graph];
  const subject = subjects[name] = subjects[name] || {};
  subject['@id'] = name;
  const properties = Object.keys(input).sort();

  for (let property of properties) {
    // skip @id
    if (property === '@id') {
      continue;
    } // handle reverse properties


    if (property === '@reverse') {
      const referencedNode = {
        '@id': name
      };
      const reverseMap = input['@reverse'];

      for (const reverseProperty in reverseMap) {
        const items = reverseMap[reverseProperty];

        for (const item of items) {
          let itemName = item['@id'];

          if (graphTypes$1.isBlankNode(item)) {
            itemName = issuer.getId(itemName);
          }

          api$l.createNodeMap(item, graphs, graph, issuer, itemName);
          util$2.addValue(subjects[itemName], reverseProperty, referencedNode, {
            propertyIsArray: true,
            allowDuplicate: false
          });
        }
      }

      continue;
    } // recurse into graph


    if (property === '@graph') {
      // add graph subjects map entry
      if (!(name in graphs)) {
        graphs[name] = {};
      }

      api$l.createNodeMap(input[property], graphs, name, issuer);
      continue;
    } // recurse into included


    if (property === '@included') {
      api$l.createNodeMap(input[property], graphs, graph, issuer);
      continue;
    } // copy non-@type keywords


    if (property !== '@type' && isKeyword$3(property)) {
      if (property === '@index' && property in subject && (input[property] !== subject[property] || input[property]['@id'] !== subject[property]['@id'])) {
        throw new JsonLdError_1$1('Invalid JSON-LD syntax; conflicting @index property detected.', 'jsonld.SyntaxError', {
          code: 'conflicting indexes',
          subject
        });
      }

      subject[property] = input[property];
      continue;
    } // iterate over objects


    const objects = input[property]; // if property is a bnode, assign it a new id

    if (property.indexOf('_:') === 0) {
      property = issuer.getId(property);
    } // ensure property is added for empty arrays


    if (objects.length === 0) {
      util$2.addValue(subject, property, [], {
        propertyIsArray: true
      });
      continue;
    }

    for (let o of objects) {
      if (property === '@type') {
        // rename @type blank nodes
        o = o.indexOf('_:') === 0 ? issuer.getId(o) : o;
      } // handle embedded subject or subject reference


      if (graphTypes$1.isSubject(o) || graphTypes$1.isSubjectReference(o)) {
        // skip null @id
        if ('@id' in o && !o['@id']) {
          continue;
        } // relabel blank node @id


        const id = graphTypes$1.isBlankNode(o) ? issuer.getId(o['@id']) : o['@id']; // add reference and recurse

        util$2.addValue(subject, property, {
          '@id': id
        }, {
          propertyIsArray: true,
          allowDuplicate: false
        });
        api$l.createNodeMap(o, graphs, graph, issuer, id);
      } else if (graphTypes$1.isValue(o)) {
        util$2.addValue(subject, property, o, {
          propertyIsArray: true,
          allowDuplicate: false
        });
      } else if (graphTypes$1.isList(o)) {
        // handle @list
        const _list = [];
        api$l.createNodeMap(o['@list'], graphs, graph, issuer, name, _list);
        o = {
          '@list': _list
        };
        util$2.addValue(subject, property, o, {
          propertyIsArray: true,
          allowDuplicate: false
        });
      } else {
        // handle @value
        api$l.createNodeMap(o, graphs, graph, issuer, name);
        util$2.addValue(subject, property, o, {
          propertyIsArray: true,
          allowDuplicate: false
        });
      }
    }
  }
};
/**
 * Merge separate named graphs into a single merged graph including
 * all nodes from the default graph and named graphs.
 *
 * @param graphs a map of graph name to subject map.
 *
 * @return the merged graph map.
 */


api$l.mergeNodeMapGraphs = graphs => {
  const merged = {};

  for (const name of Object.keys(graphs).sort()) {
    for (const id of Object.keys(graphs[name]).sort()) {
      const node = graphs[name][id];

      if (!(id in merged)) {
        merged[id] = {
          '@id': id
        };
      }

      const mergedNode = merged[id];

      for (const property of Object.keys(node).sort()) {
        if (isKeyword$3(property) && property !== '@type') {
          // copy keywords
          mergedNode[property] = util$2.clone(node[property]);
        } else {
          // merge objects
          for (const value of node[property]) {
            util$2.addValue(mergedNode, property, util$2.clone(value), {
              propertyIsArray: true,
              allowDuplicate: false
            });
          }
        }
      }
    }
  }

  return merged;
};

api$l.mergeNodeMaps = graphs => {
  // add all non-default graphs to default graph
  const defaultGraph = graphs['@default'];
  const graphNames = Object.keys(graphs).sort();

  for (const graphName of graphNames) {
    if (graphName === '@default') {
      continue;
    }

    const nodeMap = graphs[graphName];
    let subject = defaultGraph[graphName];

    if (!subject) {
      defaultGraph[graphName] = subject = {
        '@id': graphName,
        '@graph': []
      };
    } else if (!('@graph' in subject)) {
      subject['@graph'] = [];
    }

    const graph = subject['@graph'];

    for (const id of Object.keys(nodeMap).sort()) {
      const node = nodeMap[id]; // only add full subjects

      if (!graphTypes$1.isSubjectReference(node)) {
        graph.push(node);
      }
    }
  }

  return defaultGraph;
};

const {
  isSubjectReference: _isSubjectReference$3
} = graphTypes$1;

const {
  createMergedNodeMap: _createMergedNodeMap$2
} = nodeMap$1;

const api$m = {};
var flatten$1 = api$m;
/**
 * Performs JSON-LD flattening.
 *
 * @param input the expanded JSON-LD to flatten.
 *
 * @return the flattened output.
 */

api$m.flatten = input => {
  const defaultGraph = _createMergedNodeMap$2(input); // produce flattened output


  const flattened = [];
  const keys = Object.keys(defaultGraph).sort();

  for (let ki = 0; ki < keys.length; ++ki) {
    const node = defaultGraph[keys[ki]]; // only add full subjects to top-level

    if (!_isSubjectReference$3(node)) {
      flattened.push(node);
    }
  }

  return flattened;
};

function asyncGeneratorStep$3(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator$3(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep$3(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep$3(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }







 // constants


const {
  // RDF,
  RDF_LIST: RDF_LIST$1,
  RDF_FIRST: RDF_FIRST$2,
  RDF_REST: RDF_REST$2,
  RDF_NIL: RDF_NIL$2,
  RDF_TYPE: RDF_TYPE$2,
  // RDF_PLAIN_LITERAL,
  // RDF_XML_LITERAL,
  RDF_JSON_LITERAL: RDF_JSON_LITERAL$2,
  // RDF_OBJECT,
  // RDF_LANGSTRING,
  // XSD,
  XSD_BOOLEAN: XSD_BOOLEAN$2,
  XSD_DOUBLE: XSD_DOUBLE$2,
  XSD_INTEGER: XSD_INTEGER$2,
  XSD_STRING: XSD_STRING$5
} = constants$1;

const REGEX_BCP47$3 = /^[a-zA-Z]{1,8}(-[a-zA-Z0-9]{1,8})*$/;
const api$n = {};
var fromRdf$1 = api$n;
/**
 * Converts an RDF dataset to JSON-LD.
 *
 * @param dataset the RDF dataset.
 * @param options the RDF serialization options.
 *
 * @return a Promise that resolves to the JSON-LD output.
 */

api$n.fromRDF = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator$3(function* (dataset, {
    useRdfType = false,
    useNativeTypes = false,
    rdfDirection = null
  }) {
    const defaultGraph = {};
    const graphMap = {
      '@default': defaultGraph
    };
    const referencedOnce = {};

    for (const quad of dataset) {
      // TODO: change 'name' to 'graph'
      const name = quad.graph.termType === 'DefaultGraph' ? '@default' : quad.graph.value;

      if (!(name in graphMap)) {
        graphMap[name] = {};
      }

      if (name !== '@default' && !(name in defaultGraph)) {
        defaultGraph[name] = {
          '@id': name
        };
      }

      const nodeMap = graphMap[name]; // get subject, predicate, object

      const s = quad.subject.value;
      const p = quad.predicate.value;
      const o = quad.object;

      if (!(s in nodeMap)) {
        nodeMap[s] = {
          '@id': s
        };
      }

      const node = nodeMap[s];
      const objectIsNode = o.termType.endsWith('Node');

      if (objectIsNode && !(o.value in nodeMap)) {
        nodeMap[o.value] = {
          '@id': o.value
        };
      }

      if (p === RDF_TYPE$2 && !useRdfType && objectIsNode) {
        util$2.addValue(node, '@type', o.value, {
          propertyIsArray: true
        });
        continue;
      }

      const value = _RDFToObject$1(o, useNativeTypes, rdfDirection);

      util$2.addValue(node, p, value, {
        propertyIsArray: true
      }); // object may be an RDF list/partial list node but we can't know easily
      // until all triples are read

      if (objectIsNode) {
        if (o.value === RDF_NIL$2) {
          // track rdf:nil uniquely per graph
          const object = nodeMap[o.value];

          if (!('usages' in object)) {
            object.usages = [];
          }

          object.usages.push({
            node,
            property: p,
            value
          });
        } else if (o.value in referencedOnce) {
          // object referenced more than once
          referencedOnce[o.value] = false;
        } else {
          // keep track of single reference
          referencedOnce[o.value] = {
            node,
            property: p,
            value
          };
        }
      }
    }
    /*
    for(let name in dataset) {
      const graph = dataset[name];
      if(!(name in graphMap)) {
        graphMap[name] = {};
      }
      if(name !== '@default' && !(name in defaultGraph)) {
        defaultGraph[name] = {'@id': name};
      }
      const nodeMap = graphMap[name];
      for(let ti = 0; ti < graph.length; ++ti) {
        const triple = graph[ti];
         // get subject, predicate, object
        const s = triple.subject.value;
        const p = triple.predicate.value;
        const o = triple.object;
         if(!(s in nodeMap)) {
          nodeMap[s] = {'@id': s};
        }
        const node = nodeMap[s];
         const objectIsId = (o.type === 'IRI' || o.type === 'blank node');
        if(objectIsId && !(o.value in nodeMap)) {
          nodeMap[o.value] = {'@id': o.value};
        }
         if(p === RDF_TYPE && !useRdfType && objectIsId) {
          util.addValue(node, '@type', o.value, {propertyIsArray: true});
          continue;
        }
         const value = _RDFToObject(o, useNativeTypes);
        util.addValue(node, p, value, {propertyIsArray: true});
         // object may be an RDF list/partial list node but we can't know easily
        // until all triples are read
        if(objectIsId) {
          if(o.value === RDF_NIL) {
            // track rdf:nil uniquely per graph
            const object = nodeMap[o.value];
            if(!('usages' in object)) {
              object.usages = [];
            }
            object.usages.push({
              node: node,
              property: p,
              value: value
            });
          } else if(o.value in referencedOnce) {
            // object referenced more than once
            referencedOnce[o.value] = false;
          } else {
            // keep track of single reference
            referencedOnce[o.value] = {
              node: node,
              property: p,
              value: value
            };
          }
        }
      }
    }*/
    // convert linked lists to @list arrays


    for (const name in graphMap) {
      const graphObject = graphMap[name]; // no @lists to be converted, continue

      if (!(RDF_NIL$2 in graphObject)) {
        continue;
      } // iterate backwards through each RDF list


      const nil = graphObject[RDF_NIL$2];

      if (!nil.usages) {
        continue;
      }

      for (let usage of nil.usages) {
        let node = usage.node;
        let property = usage.property;
        let head = usage.value;
        const list = [];
        const listNodes = []; // ensure node is a well-formed list node; it must:
        // 1. Be referenced only once.
        // 2. Have an array for rdf:first that has 1 item.
        // 3. Have an array for rdf:rest that has 1 item.
        // 4. Have no keys other than: @id, rdf:first, rdf:rest, and,
        //   optionally, @type where the value is rdf:List.

        let nodeKeyCount = Object.keys(node).length;

        while (property === RDF_REST$2 && types$1.isObject(referencedOnce[node['@id']]) && types$1.isArray(node[RDF_FIRST$2]) && node[RDF_FIRST$2].length === 1 && types$1.isArray(node[RDF_REST$2]) && node[RDF_REST$2].length === 1 && (nodeKeyCount === 3 || nodeKeyCount === 4 && types$1.isArray(node['@type']) && node['@type'].length === 1 && node['@type'][0] === RDF_LIST$1)) {
          list.push(node[RDF_FIRST$2][0]);
          listNodes.push(node['@id']); // get next node, moving backwards through list

          usage = referencedOnce[node['@id']];
          node = usage.node;
          property = usage.property;
          head = usage.value;
          nodeKeyCount = Object.keys(node).length; // if node is not a blank node, then list head found

          if (!graphTypes$1.isBlankNode(node)) {
            break;
          }
        } // transform list into @list object


        delete head['@id'];
        head['@list'] = list.reverse();

        for (const listNode of listNodes) {
          delete graphObject[listNode];
        }
      }

      delete nil.usages;
    }

    const result = [];
    const subjects = Object.keys(defaultGraph).sort();

    for (const subject of subjects) {
      const node = defaultGraph[subject];

      if (subject in graphMap) {
        const graph = node['@graph'] = [];
        const graphObject = graphMap[subject];
        const graphSubjects = Object.keys(graphObject).sort();

        for (const graphSubject of graphSubjects) {
          const node = graphObject[graphSubject]; // only add full subjects to top-level

          if (!graphTypes$1.isSubjectReference(node)) {
            graph.push(node);
          }
        }
      } // only add full subjects to top-level


      if (!graphTypes$1.isSubjectReference(node)) {
        result.push(node);
      }
    }

    return result;
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Converts an RDF triple object to a JSON-LD object.
 *
 * @param o the RDF triple object to convert.
 * @param useNativeTypes true to output native types, false not to.
 *
 * @return the JSON-LD object.
 */


function _RDFToObject$1(o, useNativeTypes, rdfDirection) {
  // convert NamedNode/BlankNode object to JSON-LD
  if (o.termType.endsWith('Node')) {
    return {
      '@id': o.value
    };
  } // convert literal to JSON-LD


  const rval = {
    '@value': o.value
  }; // add language

  if (o.language) {
    rval['@language'] = o.language;
  } else {
    let type = o.datatype.value;

    if (!type) {
      type = XSD_STRING$5;
    }

    if (type === RDF_JSON_LITERAL$2) {
      type = '@json';

      try {
        rval['@value'] = JSON.parse(rval['@value']);
      } catch (e) {
        throw new JsonLdError_1$1('JSON literal could not be parsed.', 'jsonld.InvalidJsonLiteral', {
          code: 'invalid JSON literal',
          value: rval['@value'],
          cause: e
        });
      }
    } // use native types for certain xsd types


    if (useNativeTypes) {
      if (type === XSD_BOOLEAN$2) {
        if (rval['@value'] === 'true') {
          rval['@value'] = true;
        } else if (rval['@value'] === 'false') {
          rval['@value'] = false;
        }
      } else if (types$1.isNumeric(rval['@value'])) {
        if (type === XSD_INTEGER$2) {
          const i = parseInt(rval['@value'], 10);

          if (i.toFixed(0) === rval['@value']) {
            rval['@value'] = i;
          }
        } else if (type === XSD_DOUBLE$2) {
          rval['@value'] = parseFloat(rval['@value']);
        }
      } // do not add native type


      if (![XSD_BOOLEAN$2, XSD_INTEGER$2, XSD_DOUBLE$2, XSD_STRING$5].includes(type)) {
        rval['@type'] = type;
      }
    } else if (rdfDirection === 'i18n-datatype' && type.startsWith('https://www.w3.org/ns/i18n#')) {
      const [, language, direction] = type.split(/[#_]/);

      if (language.length > 0) {
        rval['@language'] = language;

        if (!language.match(REGEX_BCP47$3)) {
          console.warn(`@language must be valid BCP47: ${language}`);
        }
      }

      rval['@direction'] = direction;
    } else if (type !== XSD_STRING$5) {
      rval['@type'] = type;
    }
  }

  return rval;
}

const {
  createNodeMap: createNodeMap$1
} = nodeMap$1;

const {
  isKeyword: isKeyword$4
} = context$1;









const {
  // RDF,
  // RDF_LIST,
  RDF_FIRST: RDF_FIRST$3,
  RDF_REST: RDF_REST$3,
  RDF_NIL: RDF_NIL$3,
  RDF_TYPE: RDF_TYPE$3,
  // RDF_PLAIN_LITERAL,
  // RDF_XML_LITERAL,
  RDF_JSON_LITERAL: RDF_JSON_LITERAL$3,
  // RDF_OBJECT,
  RDF_LANGSTRING: RDF_LANGSTRING$4,
  // XSD,
  XSD_BOOLEAN: XSD_BOOLEAN$3,
  XSD_DOUBLE: XSD_DOUBLE$3,
  XSD_INTEGER: XSD_INTEGER$3,
  XSD_STRING: XSD_STRING$6
} = constants$1;

const {
  isAbsolute: _isAbsoluteIri$5
} = url$1;

const api$o = {};
var toRdf$1 = api$o;
/**
 * Outputs an RDF dataset for the expanded JSON-LD input.
 *
 * @param input the expanded JSON-LD input.
 * @param options the RDF serialization options.
 *
 * @return the RDF dataset.
 */

api$o.toRDF = (input, options) => {
  // create node map for default graph (and any named graphs)
  const issuer = new util$2.IdentifierIssuer('_:b');
  const nodeMap = {
    '@default': {}
  };
  createNodeMap$1(input, nodeMap, '@default', issuer);
  const dataset = [];
  const graphNames = Object.keys(nodeMap).sort();

  for (const graphName of graphNames) {
    let graphTerm;

    if (graphName === '@default') {
      graphTerm = {
        termType: 'DefaultGraph',
        value: ''
      };
    } else if (_isAbsoluteIri$5(graphName)) {
      if (graphName.startsWith('_:')) {
        graphTerm = {
          termType: 'BlankNode'
        };
      } else {
        graphTerm = {
          termType: 'NamedNode'
        };
      }

      graphTerm.value = graphName;
    } else {
      // skip relative IRIs (not valid RDF)
      continue;
    }

    _graphToRDF$1(dataset, nodeMap[graphName], graphTerm, issuer, options);
  }

  return dataset;
};
/**
 * Adds RDF quads for a particular graph to the given dataset.
 *
 * @param dataset the dataset to append RDF quads to.
 * @param graph the graph to create RDF quads for.
 * @param graphTerm the graph term for each quad.
 * @param issuer a IdentifierIssuer for assigning blank node names.
 * @param options the RDF serialization options.
 *
 * @return the array of RDF triples for the given graph.
 */


function _graphToRDF$1(dataset, graph, graphTerm, issuer, options) {
  const ids = Object.keys(graph).sort();

  for (const id of ids) {
    const node = graph[id];
    const properties = Object.keys(node).sort();

    for (let property of properties) {
      const items = node[property];

      if (property === '@type') {
        property = RDF_TYPE$3;
      } else if (isKeyword$4(property)) {
        continue;
      }

      for (const item of items) {
        // RDF subject
        const subject = {
          termType: id.startsWith('_:') ? 'BlankNode' : 'NamedNode',
          value: id
        }; // skip relative IRI subjects (not valid RDF)

        if (!_isAbsoluteIri$5(id)) {
          continue;
        } // RDF predicate


        const predicate = {
          termType: property.startsWith('_:') ? 'BlankNode' : 'NamedNode',
          value: property
        }; // skip relative IRI predicates (not valid RDF)

        if (!_isAbsoluteIri$5(property)) {
          continue;
        } // skip blank node predicates unless producing generalized RDF


        if (predicate.termType === 'BlankNode' && !options.produceGeneralizedRdf) {
          continue;
        } // convert list, value or node object to triple


        const object = _objectToRDF$1(item, issuer, dataset, graphTerm, options.rdfDirection); // skip null objects (they are relative IRIs)


        if (object) {
          dataset.push({
            subject,
            predicate,
            object,
            graph: graphTerm
          });
        }
      }
    }
  }
}
/**
 * Converts a @list value into linked list of blank node RDF quads
 * (an RDF collection).
 *
 * @param list the @list value.
 * @param issuer a IdentifierIssuer for assigning blank node names.
 * @param dataset the array of quads to append to.
 * @param graphTerm the graph term for each quad.
 *
 * @return the head of the list.
 */


function _listToRDF$1(list, issuer, dataset, graphTerm, rdfDirection) {
  const first = {
    termType: 'NamedNode',
    value: RDF_FIRST$3
  };
  const rest = {
    termType: 'NamedNode',
    value: RDF_REST$3
  };
  const nil = {
    termType: 'NamedNode',
    value: RDF_NIL$3
  };
  const last = list.pop(); // Result is the head of the list

  const result = last ? {
    termType: 'BlankNode',
    value: issuer.getId()
  } : nil;
  let subject = result;

  for (const item of list) {
    const object = _objectToRDF$1(item, issuer, dataset, graphTerm, rdfDirection);

    const next = {
      termType: 'BlankNode',
      value: issuer.getId()
    };
    dataset.push({
      subject,
      predicate: first,
      object,
      graph: graphTerm
    });
    dataset.push({
      subject,
      predicate: rest,
      object: next,
      graph: graphTerm
    });
    subject = next;
  } // Tail of list


  if (last) {
    const object = _objectToRDF$1(last, issuer, dataset, graphTerm, rdfDirection);

    dataset.push({
      subject,
      predicate: first,
      object,
      graph: graphTerm
    });
    dataset.push({
      subject,
      predicate: rest,
      object: nil,
      graph: graphTerm
    });
  }

  return result;
}
/**
 * Converts a JSON-LD value object to an RDF literal or a JSON-LD string,
 * node object to an RDF resource, or adds a list.
 *
 * @param item the JSON-LD value or node object.
 * @param issuer a IdentifierIssuer for assigning blank node names.
 * @param dataset the dataset to append RDF quads to.
 * @param graphTerm the graph term for each quad.
 *
 * @return the RDF literal or RDF resource.
 */


function _objectToRDF$1(item, issuer, dataset, graphTerm, rdfDirection) {
  const object = {}; // convert value object to RDF

  if (graphTypes$1.isValue(item)) {
    object.termType = 'Literal';
    object.value = undefined;
    object.datatype = {
      termType: 'NamedNode'
    };
    let value = item['@value'];
    const datatype = item['@type'] || null; // convert to XSD/JSON datatypes as appropriate

    if (datatype === '@json') {
      object.value = canonicalize(value);
      object.datatype.value = RDF_JSON_LITERAL$3;
    } else if (types$1.isBoolean(value)) {
      object.value = value.toString();
      object.datatype.value = datatype || XSD_BOOLEAN$3;
    } else if (types$1.isDouble(value) || datatype === XSD_DOUBLE$3) {
      if (!types$1.isDouble(value)) {
        value = parseFloat(value);
      } // canonical double representation


      object.value = value.toExponential(15).replace(/(\d)0*e\+?/, '$1E');
      object.datatype.value = datatype || XSD_DOUBLE$3;
    } else if (types$1.isNumber(value)) {
      object.value = value.toFixed(0);
      object.datatype.value = datatype || XSD_INTEGER$3;
    } else if (rdfDirection === 'i18n-datatype' && '@direction' in item) {
      const datatype = 'https://www.w3.org/ns/i18n#' + (item['@language'] || '') + `_${item['@direction']}`;
      object.datatype.value = datatype;
      object.value = value;
    } else if ('@language' in item) {
      object.value = value;
      object.datatype.value = datatype || RDF_LANGSTRING$4;
      object.language = item['@language'];
    } else {
      object.value = value;
      object.datatype.value = datatype || XSD_STRING$6;
    }
  } else if (graphTypes$1.isList(item)) {
    const _list = _listToRDF$1(item['@list'], issuer, dataset, graphTerm, rdfDirection);

    object.termType = _list.termType;
    object.value = _list.value;
  } else {
    // convert string/node object to RDF
    const id = types$1.isObject(item) ? item['@id'] : item;
    object.termType = id.startsWith('_:') ? 'BlankNode' : 'NamedNode';
    object.value = id;
  } // skip relative IRIs, not valid RDF


  if (object.termType === 'NamedNode' && !_isAbsoluteIri$5(object.value)) {
    return null;
  }

  return object;
}

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const {
  isKeyword: isKeyword$5
} = context$1;











const {
  createNodeMap: _createNodeMap$2,
  mergeNodeMapGraphs: _mergeNodeMapGraphs$1
} = nodeMap$1;

const api$p = {};
var frame$1 = api$p;
/**
 * Performs JSON-LD `merged` framing.
 *
 * @param input the expanded JSON-LD to frame.
 * @param frame the expanded JSON-LD frame to use.
 * @param options the framing options.
 *
 * @return the framed output.
 */

api$p.frameMergedOrDefault = (input, frame, options) => {
  // create framing state
  const state = {
    options,
    embedded: false,
    graph: '@default',
    graphMap: {
      '@default': {}
    },
    subjectStack: [],
    link: {},
    bnodeMap: {}
  }; // produce a map of all graphs and name each bnode
  // FIXME: currently uses subjects from @merged graph only

  const issuer = new util$2.IdentifierIssuer('_:b');

  _createNodeMap$2(input, state.graphMap, '@default', issuer);

  if (options.merged) {
    state.graphMap['@merged'] = _mergeNodeMapGraphs$1(state.graphMap);
    state.graph = '@merged';
  }

  state.subjects = state.graphMap[state.graph]; // frame the subjects

  const framed = [];
  api$p.frame(state, Object.keys(state.subjects).sort(), frame, framed); // If pruning blank nodes, find those to prune

  if (options.pruneBlankNodeIdentifiers) {
    // remove all blank nodes appearing only once, done in compaction
    options.bnodesToClear = Object.keys(state.bnodeMap).filter(id => state.bnodeMap[id].length === 1);
  } // remove @preserve from results


  options.link = {};
  return _cleanupPreserve$1(framed, options);
};
/**
 * Frames subjects according to the given frame.
 *
 * @param state the current framing state.
 * @param subjects the subjects to filter.
 * @param frame the frame.
 * @param parent the parent subject or top-level array.
 * @param property the parent property, initialized to null.
 */


api$p.frame = (state, subjects, frame, parent, property = null) => {
  // validate the frame
  _validateFrame$1(frame);

  frame = frame[0]; // get flags for current frame

  const options = state.options;
  const flags = {
    embed: _getFrameFlag$1(frame, options, 'embed'),
    explicit: _getFrameFlag$1(frame, options, 'explicit'),
    requireAll: _getFrameFlag$1(frame, options, 'requireAll')
  }; // get link for current graph

  if (!state.link.hasOwnProperty(state.graph)) {
    state.link[state.graph] = {};
  }

  const link = state.link[state.graph]; // filter out subjects that match the frame

  const matches = _filterSubjects$1(state, subjects, frame, flags); // add matches to output


  const ids = Object.keys(matches).sort();

  for (const id of ids) {
    const subject = matches[id];
    /* Note: In order to treat each top-level match as a compartmentalized
    result, clear the unique embedded subjects map when the property is null,
    which only occurs at the top-level. */

    if (property === null) {
      state.uniqueEmbeds = {
        [state.graph]: {}
      };
    } else {
      state.uniqueEmbeds[state.graph] = state.uniqueEmbeds[state.graph] || {};
    }

    if (flags.embed === '@link' && id in link) {
      // TODO: may want to also match an existing linked subject against
      // the current frame ... so different frames could produce different
      // subjects that are only shared in-memory when the frames are the same
      // add existing linked subject
      _addFrameOutput$1(parent, property, link[id]);

      continue;
    } // start output for subject


    const output = {
      '@id': id
    };

    if (id.indexOf('_:') === 0) {
      util$2.addValue(state.bnodeMap, id, output, {
        propertyIsArray: true
      });
    }

    link[id] = output; // validate @embed

    if ((flags.embed === '@first' || flags.embed === '@last') && state.is11) {
      throw new JsonLdError_1$1('Invalid JSON-LD syntax; invalid value of @embed.', 'jsonld.SyntaxError', {
        code: 'invalid @embed value',
        frame
      });
    }

    if (!state.embedded && state.uniqueEmbeds[state.graph].hasOwnProperty(id)) {
      // skip adding this node object to the top level, as it was
      // already included in another node object
      continue;
    } // if embed is @never or if a circular reference would be created by an
    // embed, the subject cannot be embedded, just add the reference;
    // note that a circular reference won't occur when the embed flag is
    // `@link` as the above check will short-circuit before reaching this point


    if (state.embedded && (flags.embed === '@never' || _createsCircularReference$1(subject, state.graph, state.subjectStack))) {
      _addFrameOutput$1(parent, property, output);

      continue;
    } // if only the first (or once) should be embedded


    if (state.embedded && (flags.embed == '@first' || flags.embed == '@once') && state.uniqueEmbeds[state.graph].hasOwnProperty(id)) {
      _addFrameOutput$1(parent, property, output);

      continue;
    } // if only the last match should be embedded


    if (flags.embed === '@last') {
      // remove any existing embed
      if (id in state.uniqueEmbeds[state.graph]) {
        _removeEmbed$1(state, id);
      }
    }

    state.uniqueEmbeds[state.graph][id] = {
      parent,
      property
    }; // push matching subject onto stack to enable circular embed checks

    state.subjectStack.push({
      subject,
      graph: state.graph
    }); // subject is also the name of a graph

    if (id in state.graphMap) {
      let recurse = false;
      let subframe = null;

      if (!('@graph' in frame)) {
        recurse = state.graph !== '@merged';
        subframe = {};
      } else {
        subframe = frame['@graph'][0];
        recurse = !(id === '@merged' || id === '@default');

        if (!types$1.isObject(subframe)) {
          subframe = {};
        }
      }

      if (recurse) {
        // recurse into graph
        api$p.frame(_objectSpread({}, state, {
          graph: id,
          embedded: false
        }), Object.keys(state.graphMap[id]).sort(), [subframe], output, '@graph');
      }
    } // if frame has @included, recurse over its sub-frame


    if ('@included' in frame) {
      api$p.frame(_objectSpread({}, state, {
        embedded: false
      }), subjects, frame['@included'], output, '@included');
    } // iterate over subject properties


    for (const prop of Object.keys(subject).sort()) {
      // copy keywords to output
      if (isKeyword$5(prop)) {
        output[prop] = util$2.clone(subject[prop]);

        if (prop === '@type') {
          // count bnode values of @type
          for (const type of subject['@type']) {
            if (type.indexOf('_:') === 0) {
              util$2.addValue(state.bnodeMap, type, output, {
                propertyIsArray: true
              });
            }
          }
        }

        continue;
      } // explicit is on and property isn't in the frame, skip processing


      if (flags.explicit && !(prop in frame)) {
        continue;
      } // add objects


      for (const o of subject[prop]) {
        const subframe = prop in frame ? frame[prop] : _createImplicitFrame$1(flags); // recurse into list

        if (graphTypes$1.isList(o)) {
          const subframe = frame[prop] && frame[prop][0] && frame[prop][0]['@list'] ? frame[prop][0]['@list'] : _createImplicitFrame$1(flags); // add empty list

          const list = {
            '@list': []
          };

          _addFrameOutput$1(output, prop, list); // add list objects


          const src = o['@list'];

          for (const oo of src) {
            if (graphTypes$1.isSubjectReference(oo)) {
              // recurse into subject reference
              api$p.frame(_objectSpread({}, state, {
                embedded: true
              }), [oo['@id']], subframe, list, '@list');
            } else {
              // include other values automatically
              _addFrameOutput$1(list, '@list', util$2.clone(oo));
            }
          }
        } else if (graphTypes$1.isSubjectReference(o)) {
          // recurse into subject reference
          api$p.frame(_objectSpread({}, state, {
            embedded: true
          }), [o['@id']], subframe, output, prop);
        } else if (_valueMatch$1(subframe[0], o)) {
          // include other values, if they match
          _addFrameOutput$1(output, prop, util$2.clone(o));
        }
      }
    } // handle defaults


    for (const prop of Object.keys(frame).sort()) {
      // skip keywords
      if (prop === '@type') {
        if (!types$1.isObject(frame[prop][0]) || !('@default' in frame[prop][0])) {
          continue;
        } // allow through default types

      } else if (isKeyword$5(prop)) {
        continue;
      } // if omit default is off, then include default values for properties
      // that appear in the next frame but are not in the matching subject


      const next = frame[prop][0] || {};

      const omitDefaultOn = _getFrameFlag$1(next, options, 'omitDefault');

      if (!omitDefaultOn && !(prop in output)) {
        let preserve = '@null';

        if ('@default' in next) {
          preserve = util$2.clone(next['@default']);
        }

        if (!types$1.isArray(preserve)) {
          preserve = [preserve];
        }

        output[prop] = [{
          '@preserve': preserve
        }];
      }
    } // if embed reverse values by finding nodes having this subject as a value
    // of the associated property


    for (const reverseProp of Object.keys(frame['@reverse'] || {}).sort()) {
      const subframe = frame['@reverse'][reverseProp];

      for (const subject of Object.keys(state.subjects)) {
        const nodeValues = util$2.getValues(state.subjects[subject], reverseProp);

        if (nodeValues.some(v => v['@id'] === id)) {
          // node has property referencing this subject, recurse
          output['@reverse'] = output['@reverse'] || {};
          util$2.addValue(output['@reverse'], reverseProp, [], {
            propertyIsArray: true
          });
          api$p.frame(_objectSpread({}, state, {
            embedded: true
          }), [subject], subframe, output['@reverse'][reverseProp], property);
        }
      }
    } // add output to parent


    _addFrameOutput$1(parent, property, output); // pop matching subject from circular ref-checking stack


    state.subjectStack.pop();
  }
};
/**
 * Replace `@null` with `null`, removing it from arrays.
 *
 * @param input the framed, compacted output.
 * @param options the framing options used.
 *
 * @return the resulting output.
 */


api$p.cleanupNull = (input, options) => {
  // recurse through arrays
  if (types$1.isArray(input)) {
    const noNulls = input.map(v => api$p.cleanupNull(v, options));
    return noNulls.filter(v => v); // removes nulls from array
  }

  if (input === '@null') {
    return null;
  }

  if (types$1.isObject(input)) {
    // handle in-memory linked nodes
    if ('@id' in input) {
      const id = input['@id'];

      if (options.link.hasOwnProperty(id)) {
        const idx = options.link[id].indexOf(input);

        if (idx !== -1) {
          // already visited
          return options.link[id][idx];
        } // prevent circular visitation


        options.link[id].push(input);
      } else {
        // prevent circular visitation
        options.link[id] = [input];
      }
    }

    for (const key in input) {
      input[key] = api$p.cleanupNull(input[key], options);
    }
  }

  return input;
};
/**
 * Creates an implicit frame when recursing through subject matches. If
 * a frame doesn't have an explicit frame for a particular property, then
 * a wildcard child frame will be created that uses the same flags that the
 * parent frame used.
 *
 * @param flags the current framing flags.
 *
 * @return the implicit frame.
 */


function _createImplicitFrame$1(flags) {
  const frame = {};

  for (const key in flags) {
    if (flags[key] !== undefined) {
      frame['@' + key] = [flags[key]];
    }
  }

  return [frame];
}
/**
 * Checks the current subject stack to see if embedding the given subject
 * would cause a circular reference.
 *
 * @param subjectToEmbed the subject to embed.
 * @param graph the graph the subject to embed is in.
 * @param subjectStack the current stack of subjects.
 *
 * @return true if a circular reference would be created, false if not.
 */


function _createsCircularReference$1(subjectToEmbed, graph, subjectStack) {
  for (let i = subjectStack.length - 1; i >= 0; --i) {
    const subject = subjectStack[i];

    if (subject.graph === graph && subject.subject['@id'] === subjectToEmbed['@id']) {
      return true;
    }
  }

  return false;
}
/**
 * Gets the frame flag value for the given flag name.
 *
 * @param frame the frame.
 * @param options the framing options.
 * @param name the flag name.
 *
 * @return the flag value.
 */


function _getFrameFlag$1(frame, options, name) {
  const flag = '@' + name;
  let rval = flag in frame ? frame[flag][0] : options[name];

  if (name === 'embed') {
    // default is "@last"
    // backwards-compatibility support for "embed" maps:
    // true => "@last"
    // false => "@never"
    if (rval === true) {
      rval = '@once';
    } else if (rval === false) {
      rval = '@never';
    } else if (rval !== '@always' && rval !== '@never' && rval !== '@link' && rval !== '@first' && rval !== '@last' && rval !== '@once') {
      throw new JsonLdError_1$1('Invalid JSON-LD syntax; invalid value of @embed.', 'jsonld.SyntaxError', {
        code: 'invalid @embed value',
        frame
      });
    }
  }

  return rval;
}
/**
 * Validates a JSON-LD frame, throwing an exception if the frame is invalid.
 *
 * @param frame the frame to validate.
 */


function _validateFrame$1(frame) {
  if (!types$1.isArray(frame) || frame.length !== 1 || !types$1.isObject(frame[0])) {
    throw new JsonLdError_1$1('Invalid JSON-LD syntax; a JSON-LD frame must be a single object.', 'jsonld.SyntaxError', {
      frame
    });
  }

  if ('@id' in frame[0]) {
    for (const id of util$2.asArray(frame[0]['@id'])) {
      // @id must be wildcard or an IRI
      if (!(types$1.isObject(id) || url$1.isAbsolute(id)) || types$1.isString(id) && id.indexOf('_:') === 0) {
        throw new JsonLdError_1$1('Invalid JSON-LD syntax; invalid @id in frame.', 'jsonld.SyntaxError', {
          code: 'invalid frame',
          frame
        });
      }
    }
  }

  if ('@type' in frame[0]) {
    for (const type of util$2.asArray(frame[0]['@type'])) {
      // @id must be wildcard or an IRI
      if (!(types$1.isObject(type) || url$1.isAbsolute(type)) || types$1.isString(type) && type.indexOf('_:') === 0) {
        throw new JsonLdError_1$1('Invalid JSON-LD syntax; invalid @type in frame.', 'jsonld.SyntaxError', {
          code: 'invalid frame',
          frame
        });
      }
    }
  }
}
/**
 * Returns a map of all of the subjects that match a parsed frame.
 *
 * @param state the current framing state.
 * @param subjects the set of subjects to filter.
 * @param frame the parsed frame.
 * @param flags the frame flags.
 *
 * @return all of the matched subjects.
 */


function _filterSubjects$1(state, subjects, frame, flags) {
  // filter subjects in @id order
  const rval = {};

  for (const id of subjects) {
    const subject = state.graphMap[state.graph][id];

    if (_filterSubject$1(state, subject, frame, flags)) {
      rval[id] = subject;
    }
  }

  return rval;
}
/**
 * Returns true if the given subject matches the given frame.
 *
 * Matches either based on explicit type inclusion where the node has any
 * type listed in the frame. If the frame has empty types defined matches
 * nodes not having a @type. If the frame has a type of {} defined matches
 * nodes having any type defined.
 *
 * Otherwise, does duck typing, where the node must have all of the
 * properties defined in the frame.
 *
 * @param state the current framing state.
 * @param subject the subject to check.
 * @param frame the frame to check.
 * @param flags the frame flags.
 *
 * @return true if the subject matches, false if not.
 */


function _filterSubject$1(state, subject, frame, flags) {
  // check ducktype
  let wildcard = true;
  let matchesSome = false;

  for (const key in frame) {
    let matchThis = false;
    const nodeValues = util$2.getValues(subject, key);
    const isEmpty = util$2.getValues(frame, key).length === 0;

    if (key === '@id') {
      // match on no @id or any matching @id, including wildcard
      if (types$1.isEmptyObject(frame['@id'][0] || {})) {
        matchThis = true;
      } else if (frame['@id'].length >= 0) {
        matchThis = frame['@id'].includes(nodeValues[0]);
      }

      if (!flags.requireAll) {
        return matchThis;
      }
    } else if (key === '@type') {
      // check @type (object value means 'any' type,
      // fall through to ducktyping)
      wildcard = false;

      if (isEmpty) {
        if (nodeValues.length > 0) {
          // don't match on no @type
          return false;
        }

        matchThis = true;
      } else if (frame['@type'].length === 1 && types$1.isEmptyObject(frame['@type'][0])) {
        // match on wildcard @type if there is a type
        matchThis = nodeValues.length > 0;
      } else {
        // match on a specific @type
        for (const type of frame['@type']) {
          if (types$1.isObject(type) && '@default' in type) {
            // match on default object
            matchThis = true;
          } else {
            matchThis = matchThis || nodeValues.some(tt => tt === type);
          }
        }
      }

      if (!flags.requireAll) {
        return matchThis;
      }
    } else if (isKeyword$5(key)) {
      continue;
    } else {
      // Force a copy of this frame entry so it can be manipulated
      const thisFrame = util$2.getValues(frame, key)[0];
      let hasDefault = false;

      if (thisFrame) {
        _validateFrame$1([thisFrame]);

        hasDefault = '@default' in thisFrame;
      } // no longer a wildcard pattern if frame has any non-keyword properties


      wildcard = false; // skip, but allow match if node has no value for property, and frame has
      // a default value

      if (nodeValues.length === 0 && hasDefault) {
        continue;
      } // if frame value is empty, don't match if subject has any value


      if (nodeValues.length > 0 && isEmpty) {
        return false;
      }

      if (thisFrame === undefined) {
        // node does not match if values is not empty and the value of property
        // in frame is match none.
        if (nodeValues.length > 0) {
          return false;
        }

        matchThis = true;
      } else {
        if (graphTypes$1.isList(thisFrame)) {
          const listValue = thisFrame['@list'][0];

          if (graphTypes$1.isList(nodeValues[0])) {
            const nodeListValues = nodeValues[0]['@list'];

            if (graphTypes$1.isValue(listValue)) {
              // match on any matching value
              matchThis = nodeListValues.some(lv => _valueMatch$1(listValue, lv));
            } else if (graphTypes$1.isSubject(listValue) || graphTypes$1.isSubjectReference(listValue)) {
              matchThis = nodeListValues.some(lv => _nodeMatch$1(state, listValue, lv, flags));
            }
          }
        } else if (graphTypes$1.isValue(thisFrame)) {
          matchThis = nodeValues.some(nv => _valueMatch$1(thisFrame, nv));
        } else if (graphTypes$1.isSubjectReference(thisFrame)) {
          matchThis = nodeValues.some(nv => _nodeMatch$1(state, thisFrame, nv, flags));
        } else if (types$1.isObject(thisFrame)) {
          matchThis = nodeValues.length > 0;
        } else {
          matchThis = false;
        }
      }
    } // all non-defaulted values must match if requireAll is set


    if (!matchThis && flags.requireAll) {
      return false;
    }

    matchesSome = matchesSome || matchThis;
  } // return true if wildcard or subject matches some properties


  return wildcard || matchesSome;
}
/**
 * Removes an existing embed.
 *
 * @param state the current framing state.
 * @param id the @id of the embed to remove.
 */


function _removeEmbed$1(state, id) {
  // get existing embed
  const embeds = state.uniqueEmbeds[state.graph];
  const embed = embeds[id];
  const parent = embed.parent;
  const property = embed.property; // create reference to replace embed

  const subject = {
    '@id': id
  }; // remove existing embed

  if (types$1.isArray(parent)) {
    // replace subject with reference
    for (let i = 0; i < parent.length; ++i) {
      if (util$2.compareValues(parent[i], subject)) {
        parent[i] = subject;
        break;
      }
    }
  } else {
    // replace subject with reference
    const useArray = types$1.isArray(parent[property]);
    util$2.removeValue(parent, property, subject, {
      propertyIsArray: useArray
    });
    util$2.addValue(parent, property, subject, {
      propertyIsArray: useArray
    });
  } // recursively remove dependent dangling embeds


  const removeDependents = id => {
    // get embed keys as a separate array to enable deleting keys in map
    const ids = Object.keys(embeds);

    for (const next of ids) {
      if (next in embeds && types$1.isObject(embeds[next].parent) && embeds[next].parent['@id'] === id) {
        delete embeds[next];
        removeDependents(next);
      }
    }
  };

  removeDependents(id);
}
/**
 * Removes the @preserve keywords from expanded result of framing.
 *
 * @param input the framed, framed output.
 * @param options the framing options used.
 *
 * @return the resulting output.
 */


function _cleanupPreserve$1(input, options) {
  // recurse through arrays
  if (types$1.isArray(input)) {
    return input.map(value => _cleanupPreserve$1(value, options));
  }

  if (types$1.isObject(input)) {
    // remove @preserve
    if ('@preserve' in input) {
      return input['@preserve'][0];
    } // skip @values


    if (graphTypes$1.isValue(input)) {
      return input;
    } // recurse through @lists


    if (graphTypes$1.isList(input)) {
      input['@list'] = _cleanupPreserve$1(input['@list'], options);
      return input;
    } // handle in-memory linked nodes


    if ('@id' in input) {
      const id = input['@id'];

      if (options.link.hasOwnProperty(id)) {
        const idx = options.link[id].indexOf(input);

        if (idx !== -1) {
          // already visited
          return options.link[id][idx];
        } // prevent circular visitation


        options.link[id].push(input);
      } else {
        // prevent circular visitation
        options.link[id] = [input];
      }
    } // recurse through properties


    for (const prop in input) {
      // potentially remove the id, if it is an unreference bnode
      if (prop === '@id' && options.bnodesToClear.includes(input[prop])) {
        delete input['@id'];
        continue;
      }

      input[prop] = _cleanupPreserve$1(input[prop], options);
    }
  }

  return input;
}
/**
 * Adds framing output to the given parent.
 *
 * @param parent the parent to add to.
 * @param property the parent property.
 * @param output the output to add.
 */


function _addFrameOutput$1(parent, property, output) {
  if (types$1.isObject(parent)) {
    util$2.addValue(parent, property, output, {
      propertyIsArray: true
    });
  } else {
    parent.push(output);
  }
}
/**
 * Node matches if it is a node, and matches the pattern as a frame.
 *
 * @param state the current framing state.
 * @param pattern used to match value
 * @param value to check
 * @param flags the frame flags.
 */


function _nodeMatch$1(state, pattern, value, flags) {
  if (!('@id' in value)) {
    return false;
  }

  const nodeObject = state.subjects[value['@id']];
  return nodeObject && _filterSubject$1(state, nodeObject, pattern, flags);
}
/**
 * Value matches if it is a value and matches the value pattern
 *
 * * `pattern` is empty
 * * @values are the same, or `pattern[@value]` is a wildcard, and
 * * @types are the same or `value[@type]` is not null
 *   and `pattern[@type]` is `{}`, or `value[@type]` is null
 *   and `pattern[@type]` is null or `[]`, and
 * * @languages are the same or `value[@language]` is not null
 *   and `pattern[@language]` is `{}`, or `value[@language]` is null
 *   and `pattern[@language]` is null or `[]`.
 *
 * @param pattern used to match value
 * @param value to check
 */


function _valueMatch$1(pattern, value) {
  const v1 = value['@value'];
  const t1 = value['@type'];
  const l1 = value['@language'];
  const v2 = pattern['@value'] ? types$1.isArray(pattern['@value']) ? pattern['@value'] : [pattern['@value']] : [];
  const t2 = pattern['@type'] ? types$1.isArray(pattern['@type']) ? pattern['@type'] : [pattern['@type']] : [];
  const l2 = pattern['@language'] ? types$1.isArray(pattern['@language']) ? pattern['@language'] : [pattern['@language']] : [];

  if (v2.length === 0 && t2.length === 0 && l2.length === 0) {
    return true;
  }

  if (!(v2.includes(v1) || types$1.isEmptyObject(v2[0]))) {
    return false;
  }

  if (!(!t1 && t2.length === 0 || t2.includes(t1) || t1 && types$1.isEmptyObject(t2[0]))) {
    return false;
  }

  if (!(!l1 && l2.length === 0 || l2.includes(l1) || l1 && types$1.isEmptyObject(l2[0]))) {
    return false;
  }

  return true;
}

function asyncGeneratorStep$4(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator$4(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep$4(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep$4(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }



const {
  isArray: _isArray$8,
  isObject: _isObject$9,
  isString: _isString$8,
  isUndefined: _isUndefined$5
} = types$1;

const {
  isList: _isList$3,
  isValue: _isValue$3,
  isGraph: _isGraph$3,
  isSimpleGraph: _isSimpleGraph$1,
  isSubjectReference: _isSubjectReference$4
} = graphTypes$1;

const {
  expandIri: _expandIri$6,
  getContextValue: _getContextValue$3,
  isKeyword: _isKeyword$3,
  process: _processContext$4,
  processingMode: _processingMode$4
} = context$1;

const {
  removeBase: _removeBase$1,
  prependBase: _prependBase$1
} = url$1;

const {
  addValue: _addValue$3,
  asArray: _asArray$7,
  compareShortestLeast: _compareShortestLeast$3
} = util$2;

const api$q = {};
var compact$1 = api$q;
/**
 * Recursively compacts an element using the given active context. All values
 * must be in expanded form before this method is called.
 *
 * @param activeCtx the active context to use.
 * @param activeProperty the compacted property associated with the element
 *          to compact, null for none.
 * @param element the element to compact.
 * @param options the compaction options.
 * @param compactionMap the compaction map to use.
 *
 * @return a promise that resolves to the compacted value.
 */

api$q.compact = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator$4(function* ({
    activeCtx,
    activeProperty = null,
    element,
    options = {},
    compactionMap = () => undefined
  }) {
    // recursively compact array
    if (_isArray$8(element)) {
      let rval = [];

      for (let i = 0; i < element.length; ++i) {
        // compact, dropping any null values unless custom mapped
        let compacted = yield api$q.compact({
          activeCtx,
          activeProperty,
          element: element[i],
          options,
          compactionMap
        });

        if (compacted === null) {
          compacted = yield compactionMap({
            unmappedValue: element[i],
            activeCtx,
            activeProperty,
            parent: element,
            index: i,
            options
          });

          if (compacted === undefined) {
            continue;
          }
        }

        rval.push(compacted);
      }

      if (options.compactArrays && rval.length === 1) {
        // use single element if no container is specified
        const container = _getContextValue$3(activeCtx, activeProperty, '@container') || [];

        if (container.length === 0) {
          rval = rval[0];
        }
      }

      return rval;
    } // use any scoped context on activeProperty


    const ctx = _getContextValue$3(activeCtx, activeProperty, '@context');

    if (!_isUndefined$5(ctx)) {
      activeCtx = yield _processContext$4({
        activeCtx,
        localCtx: ctx,
        propagate: true,
        overrideProtected: true,
        options
      });
    } // recursively compact object


    if (_isObject$9(element)) {
      if (options.link && '@id' in element && options.link.hasOwnProperty(element['@id'])) {
        // check for a linked element to reuse
        const linked = options.link[element['@id']];

        for (let i = 0; i < linked.length; ++i) {
          if (linked[i].expanded === element) {
            return linked[i].compacted;
          }
        }
      } // do value compaction on @values and subject references


      if (_isValue$3(element) || _isSubjectReference$4(element)) {
        const rval = api$q.compactValue({
          activeCtx,
          activeProperty,
          value: element,
          options
        });

        if (options.link && _isSubjectReference$4(element)) {
          // store linked element
          if (!options.link.hasOwnProperty(element['@id'])) {
            options.link[element['@id']] = [];
          }

          options.link[element['@id']].push({
            expanded: element,
            compacted: rval
          });
        }

        return rval;
      } // if expanded property is @list and we're contained within a list
      // container, recursively compact this item to an array


      if (_isList$3(element)) {
        const container = _getContextValue$3(activeCtx, activeProperty, '@container') || [];

        if (container.includes('@list')) {
          return api$q.compact({
            activeCtx,
            activeProperty,
            element: element['@list'],
            options,
            compactionMap
          });
        }
      } // FIXME: avoid misuse of active property as an expanded property?


      const insideReverse = activeProperty === '@reverse';
      const rval = {}; // original context before applying property-scoped and local contexts

      const inputCtx = activeCtx; // revert to previous context, if there is one,
      // and element is not a value object or a node reference

      if (!_isValue$3(element) && !_isSubjectReference$4(element)) {
        activeCtx = activeCtx.revertToPreviousContext();
      } // apply property-scoped context after reverting term-scoped context


      const propertyScopedCtx = _getContextValue$3(inputCtx, activeProperty, '@context');

      if (!_isUndefined$5(propertyScopedCtx)) {
        activeCtx = yield _processContext$4({
          activeCtx,
          localCtx: propertyScopedCtx,
          propagate: true,
          overrideProtected: true,
          options
        });
      }

      if (options.link && '@id' in element) {
        // store linked element
        if (!options.link.hasOwnProperty(element['@id'])) {
          options.link[element['@id']] = [];
        }

        options.link[element['@id']].push({
          expanded: element,
          compacted: rval
        });
      } // apply any context defined on an alias of @type
      // if key is @type and any compacted value is a term having a local
      // context, overlay that context


      let types = element['@type'] || [];

      if (types.length > 1) {
        types = Array.from(types).sort();
      } // find all type-scoped contexts based on current context, prior to
      // updating it


      const typeContext = activeCtx;

      for (const type of types) {
        const compactedType = api$q.compactIri({
          activeCtx: typeContext,
          iri: type,
          relativeTo: {
            vocab: true
          }
        }); // Use any type-scoped context defined on this value

        const ctx = _getContextValue$3(inputCtx, compactedType, '@context');

        if (!_isUndefined$5(ctx)) {
          activeCtx = yield _processContext$4({
            activeCtx,
            localCtx: ctx,
            options,
            propagate: false
          });
        }
      } // process element keys in order


      const keys = Object.keys(element).sort();

      for (const expandedProperty of keys) {
        const expandedValue = element[expandedProperty]; // compact @id

        if (expandedProperty === '@id') {
          let compactedValue = _asArray$7(expandedValue).map(expandedIri => api$q.compactIri({
            activeCtx,
            iri: expandedIri,
            relativeTo: {
              vocab: false
            },
            base: options.base
          }));

          if (compactedValue.length === 1) {
            compactedValue = compactedValue[0];
          } // use keyword alias and add value


          const alias = api$q.compactIri({
            activeCtx,
            iri: '@id',
            relativeTo: {
              vocab: true
            }
          });
          rval[alias] = compactedValue;
          continue;
        } // compact @type(s)


        if (expandedProperty === '@type') {
          // resolve type values against previous context
          let compactedValue = _asArray$7(expandedValue).map(expandedIri => api$q.compactIri({
            activeCtx: inputCtx,
            iri: expandedIri,
            relativeTo: {
              vocab: true
            }
          }));

          if (compactedValue.length === 1) {
            compactedValue = compactedValue[0];
          } // use keyword alias and add value


          const alias = api$q.compactIri({
            activeCtx,
            iri: '@type',
            relativeTo: {
              vocab: true
            }
          });
          const container = _getContextValue$3(activeCtx, alias, '@container') || []; // treat as array for @type if @container includes @set

          const typeAsSet = container.includes('@set') && _processingMode$4(activeCtx, 1.1);

          const isArray = typeAsSet || _isArray$8(compactedValue) && expandedValue.length === 0;

          _addValue$3(rval, alias, compactedValue, {
            propertyIsArray: isArray
          });

          continue;
        } // handle @reverse


        if (expandedProperty === '@reverse') {
          // recursively compact expanded value
          const compactedValue = yield api$q.compact({
            activeCtx,
            activeProperty: '@reverse',
            element: expandedValue,
            options,
            compactionMap
          }); // handle double-reversed properties

          for (const compactedProperty in compactedValue) {
            if (activeCtx.mappings.has(compactedProperty) && activeCtx.mappings.get(compactedProperty).reverse) {
              const value = compactedValue[compactedProperty];
              const container = _getContextValue$3(activeCtx, compactedProperty, '@container') || [];
              const useArray = container.includes('@set') || !options.compactArrays;

              _addValue$3(rval, compactedProperty, value, {
                propertyIsArray: useArray
              });

              delete compactedValue[compactedProperty];
            }
          }

          if (Object.keys(compactedValue).length > 0) {
            // use keyword alias and add value
            const alias = api$q.compactIri({
              activeCtx,
              iri: expandedProperty,
              relativeTo: {
                vocab: true
              }
            });

            _addValue$3(rval, alias, compactedValue);
          }

          continue;
        }

        if (expandedProperty === '@preserve') {
          // compact using activeProperty
          const compactedValue = yield api$q.compact({
            activeCtx,
            activeProperty,
            element: expandedValue,
            options,
            compactionMap
          });

          if (!(_isArray$8(compactedValue) && compactedValue.length === 0)) {
            _addValue$3(rval, expandedProperty, compactedValue);
          }

          continue;
        } // handle @index property


        if (expandedProperty === '@index') {
          // drop @index if inside an @index container
          const container = _getContextValue$3(activeCtx, activeProperty, '@container') || [];

          if (container.includes('@index')) {
            continue;
          } // use keyword alias and add value


          const alias = api$q.compactIri({
            activeCtx,
            iri: expandedProperty,
            relativeTo: {
              vocab: true
            }
          });

          _addValue$3(rval, alias, expandedValue);

          continue;
        } // skip array processing for keywords that aren't
        // @graph, @list, or @included


        if (expandedProperty !== '@graph' && expandedProperty !== '@list' && expandedProperty !== '@included' && _isKeyword$3(expandedProperty)) {
          // use keyword alias and add value as is
          const alias = api$q.compactIri({
            activeCtx,
            iri: expandedProperty,
            relativeTo: {
              vocab: true
            }
          });

          _addValue$3(rval, alias, expandedValue);

          continue;
        } // Note: expanded value must be an array due to expansion algorithm.


        if (!_isArray$8(expandedValue)) {
          throw new JsonLdError_1$1('JSON-LD expansion error; expanded value must be an array.', 'jsonld.SyntaxError');
        } // preserve empty arrays


        if (expandedValue.length === 0) {
          const itemActiveProperty = api$q.compactIri({
            activeCtx,
            iri: expandedProperty,
            value: expandedValue,
            relativeTo: {
              vocab: true
            },
            reverse: insideReverse
          });
          const nestProperty = activeCtx.mappings.has(itemActiveProperty) ? activeCtx.mappings.get(itemActiveProperty)['@nest'] : null;
          let nestResult = rval;

          if (nestProperty) {
            _checkNestProperty$1(activeCtx, nestProperty, options);

            if (!_isObject$9(rval[nestProperty])) {
              rval[nestProperty] = {};
            }

            nestResult = rval[nestProperty];
          }

          _addValue$3(nestResult, itemActiveProperty, expandedValue, {
            propertyIsArray: true
          });
        } // recusively process array values


        for (const expandedItem of expandedValue) {
          // compact property and get container type
          const itemActiveProperty = api$q.compactIri({
            activeCtx,
            iri: expandedProperty,
            value: expandedItem,
            relativeTo: {
              vocab: true
            },
            reverse: insideReverse
          }); // if itemActiveProperty is a @nest property, add values to nestResult,
          // otherwise rval

          const nestProperty = activeCtx.mappings.has(itemActiveProperty) ? activeCtx.mappings.get(itemActiveProperty)['@nest'] : null;
          let nestResult = rval;

          if (nestProperty) {
            _checkNestProperty$1(activeCtx, nestProperty, options);

            if (!_isObject$9(rval[nestProperty])) {
              rval[nestProperty] = {};
            }

            nestResult = rval[nestProperty];
          }

          const container = _getContextValue$3(activeCtx, itemActiveProperty, '@container') || []; // get simple @graph or @list value if appropriate

          const isGraph = _isGraph$3(expandedItem);

          const isList = _isList$3(expandedItem);

          let inner;

          if (isList) {
            inner = expandedItem['@list'];
          } else if (isGraph) {
            inner = expandedItem['@graph'];
          } // recursively compact expanded item


          let compactedItem = yield api$q.compact({
            activeCtx,
            activeProperty: itemActiveProperty,
            element: isList || isGraph ? inner : expandedItem,
            options,
            compactionMap
          }); // handle @list

          if (isList) {
            // ensure @list value is an array
            if (!_isArray$8(compactedItem)) {
              compactedItem = [compactedItem];
            }

            if (!container.includes('@list')) {
              // wrap using @list alias
              compactedItem = {
                [api$q.compactIri({
                  activeCtx,
                  iri: '@list',
                  relativeTo: {
                    vocab: true
                  }
                })]: compactedItem
              }; // include @index from expanded @list, if any

              if ('@index' in expandedItem) {
                compactedItem[api$q.compactIri({
                  activeCtx,
                  iri: '@index',
                  relativeTo: {
                    vocab: true
                  }
                })] = expandedItem['@index'];
              }
            } else {
              _addValue$3(nestResult, itemActiveProperty, compactedItem, {
                valueIsArray: true,
                allowDuplicate: true
              });

              continue;
            }
          } // Graph object compaction cases


          if (isGraph) {
            if (container.includes('@graph') && (container.includes('@id') || container.includes('@index') && _isSimpleGraph$1(expandedItem))) {
              // get or create the map object
              let mapObject;

              if (nestResult.hasOwnProperty(itemActiveProperty)) {
                mapObject = nestResult[itemActiveProperty];
              } else {
                nestResult[itemActiveProperty] = mapObject = {};
              } // index on @id or @index or alias of @none


              const key = (container.includes('@id') ? expandedItem['@id'] : expandedItem['@index']) || api$q.compactIri({
                activeCtx,
                iri: '@none',
                relativeTo: {
                  vocab: true
                }
              }); // add compactedItem to map, using value of `@id` or a new blank
              // node identifier

              _addValue$3(mapObject, key, compactedItem, {
                propertyIsArray: !options.compactArrays || container.includes('@set')
              });
            } else if (container.includes('@graph') && _isSimpleGraph$1(expandedItem)) {
              // container includes @graph but not @id or @index and value is a
              // simple graph object add compact value
              // if compactedItem contains multiple values, it is wrapped in
              // `@included`
              if (_isArray$8(compactedItem) && compactedItem.length > 1) {
                compactedItem = {
                  '@included': compactedItem
                };
              }

              _addValue$3(nestResult, itemActiveProperty, compactedItem, {
                propertyIsArray: !options.compactArrays || container.includes('@set')
              });
            } else {
              // wrap using @graph alias, remove array if only one item and
              // compactArrays not set
              if (_isArray$8(compactedItem) && compactedItem.length === 1 && options.compactArrays) {
                compactedItem = compactedItem[0];
              }

              compactedItem = {
                [api$q.compactIri({
                  activeCtx,
                  iri: '@graph',
                  relativeTo: {
                    vocab: true
                  }
                })]: compactedItem
              }; // include @id from expanded graph, if any

              if ('@id' in expandedItem) {
                compactedItem[api$q.compactIri({
                  activeCtx,
                  iri: '@id',
                  relativeTo: {
                    vocab: true
                  }
                })] = expandedItem['@id'];
              } // include @index from expanded graph, if any


              if ('@index' in expandedItem) {
                compactedItem[api$q.compactIri({
                  activeCtx,
                  iri: '@index',
                  relativeTo: {
                    vocab: true
                  }
                })] = expandedItem['@index'];
              }

              _addValue$3(nestResult, itemActiveProperty, compactedItem, {
                propertyIsArray: !options.compactArrays || container.includes('@set')
              });
            }
          } else if (container.includes('@language') || container.includes('@index') || container.includes('@id') || container.includes('@type')) {
            // handle language and index maps
            // get or create the map object
            let mapObject;

            if (nestResult.hasOwnProperty(itemActiveProperty)) {
              mapObject = nestResult[itemActiveProperty];
            } else {
              nestResult[itemActiveProperty] = mapObject = {};
            }

            let key;

            if (container.includes('@language')) {
              // if container is a language map, simplify compacted value to
              // a simple string
              if (_isValue$3(compactedItem)) {
                compactedItem = compactedItem['@value'];
              }

              key = expandedItem['@language'];
            } else if (container.includes('@index')) {
              const indexKey = _getContextValue$3(activeCtx, itemActiveProperty, '@index') || '@index';
              const containerKey = api$q.compactIri({
                activeCtx,
                iri: indexKey,
                relativeTo: {
                  vocab: true
                }
              });

              if (indexKey === '@index') {
                key = expandedItem['@index'];
                delete compactedItem[containerKey];
              } else {
                let others;
                [key, ...others] = _asArray$7(compactedItem[indexKey] || []);

                if (!_isString$8(key)) {
                  // Will use @none if it isn't a string.
                  key = null;
                } else {
                  switch (others.length) {
                    case 0:
                      delete compactedItem[indexKey];
                      break;

                    case 1:
                      compactedItem[indexKey] = others[0];
                      break;

                    default:
                      compactedItem[indexKey] = others;
                      break;
                  }
                }
              }
            } else if (container.includes('@id')) {
              const idKey = api$q.compactIri({
                activeCtx,
                iri: '@id',
                relativeTo: {
                  vocab: true
                }
              });
              key = compactedItem[idKey];
              delete compactedItem[idKey];
            } else if (container.includes('@type')) {
              const typeKey = api$q.compactIri({
                activeCtx,
                iri: '@type',
                relativeTo: {
                  vocab: true
                }
              });
              let types;
              [key, ...types] = _asArray$7(compactedItem[typeKey] || []);

              switch (types.length) {
                case 0:
                  delete compactedItem[typeKey];
                  break;

                case 1:
                  compactedItem[typeKey] = types[0];
                  break;

                default:
                  compactedItem[typeKey] = types;
                  break;
              } // If compactedItem contains a single entry
              // whose key maps to @id, recompact without @type


              if (Object.keys(compactedItem).length === 1 && '@id' in expandedItem) {
                compactedItem = yield api$q.compact({
                  activeCtx,
                  activeProperty: itemActiveProperty,
                  element: {
                    '@id': expandedItem['@id']
                  },
                  options,
                  compactionMap
                });
              }
            } // if compacting this value which has no key, index on @none


            if (!key) {
              key = api$q.compactIri({
                activeCtx,
                iri: '@none',
                relativeTo: {
                  vocab: true
                }
              });
            } // add compact value to map object using key from expanded value
            // based on the container type


            _addValue$3(mapObject, key, compactedItem, {
              propertyIsArray: container.includes('@set')
            });
          } else {
            // use an array if: compactArrays flag is false,
            // @container is @set or @list , value is an empty
            // array, or key is @graph
            const isArray = !options.compactArrays || container.includes('@set') || container.includes('@list') || _isArray$8(compactedItem) && compactedItem.length === 0 || expandedProperty === '@list' || expandedProperty === '@graph'; // add compact value

            _addValue$3(nestResult, itemActiveProperty, compactedItem, {
              propertyIsArray: isArray
            });
          }
        }
      }

      return rval;
    } // only primitives remain which are already compact


    return element;
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Compacts an IRI or keyword into a term or prefix if it can be. If the
 * IRI has an associated value it may be passed.
 *
 * @param activeCtx the active context to use.
 * @param iri the IRI to compact.
 * @param value the value to check or null.
 * @param relativeTo options for how to compact IRIs:
 *          vocab: true to split after @vocab, false not to.
 * @param reverse true if a reverse property is being compacted, false if not.
 * @param base the absolute URL to use for compacting document-relative IRIs.
 *
 * @return the compacted term, prefix, keyword alias, or the original IRI.
 */


api$q.compactIri = ({
  activeCtx,
  iri,
  value = null,
  relativeTo = {
    vocab: false
  },
  reverse = false,
  base = null
}) => {
  // can't compact null
  if (iri === null) {
    return iri;
  } // if context is from a property term scoped context composed with a
  // type-scoped context, then use the previous context instead


  if (activeCtx.isPropertyTermScoped && activeCtx.previousContext) {
    activeCtx = activeCtx.previousContext;
  }

  const inverseCtx = activeCtx.getInverse(); // if term is a keyword, it may be compacted to a simple alias

  if (_isKeyword$3(iri) && iri in inverseCtx && '@none' in inverseCtx[iri] && '@type' in inverseCtx[iri]['@none'] && '@none' in inverseCtx[iri]['@none']['@type']) {
    return inverseCtx[iri]['@none']['@type']['@none'];
  } // use inverse context to pick a term if iri is relative to vocab


  if (relativeTo.vocab && iri in inverseCtx) {
    const defaultLanguage = activeCtx['@language'] || '@none'; // prefer @index if available in value

    const containers = [];

    if (_isObject$9(value) && '@index' in value && !('@graph' in value)) {
      containers.push('@index', '@index@set');
    } // if value is a preserve object, use its value


    if (_isObject$9(value) && '@preserve' in value) {
      value = value['@preserve'][0];
    } // prefer most specific container including @graph, prefering @set
    // variations


    if (_isGraph$3(value)) {
      // favor indexmap if the graph is indexed
      if ('@index' in value) {
        containers.push('@graph@index', '@graph@index@set', '@index', '@index@set');
      } // favor idmap if the graph is has an @id


      if ('@id' in value) {
        containers.push('@graph@id', '@graph@id@set');
      }

      containers.push('@graph', '@graph@set', '@set'); // allow indexmap if the graph is not indexed

      if (!('@index' in value)) {
        containers.push('@graph@index', '@graph@index@set', '@index', '@index@set');
      } // allow idmap if the graph does not have an @id


      if (!('@id' in value)) {
        containers.push('@graph@id', '@graph@id@set');
      }
    } else if (_isObject$9(value) && !_isValue$3(value)) {
      containers.push('@id', '@id@set', '@type', '@set@type');
    } // defaults for term selection based on type/language


    let typeOrLanguage = '@language';
    let typeOrLanguageValue = '@null';

    if (reverse) {
      typeOrLanguage = '@type';
      typeOrLanguageValue = '@reverse';
      containers.push('@set');
    } else if (_isList$3(value)) {
      // choose the most specific term that works for all elements in @list
      // only select @list containers if @index is NOT in value
      if (!('@index' in value)) {
        containers.push('@list');
      }

      const list = value['@list'];

      if (list.length === 0) {
        // any empty list can be matched against any term that uses the
        // @list container regardless of @type or @language
        typeOrLanguage = '@any';
        typeOrLanguageValue = '@none';
      } else {
        let commonLanguage = list.length === 0 ? defaultLanguage : null;
        let commonType = null;

        for (let i = 0; i < list.length; ++i) {
          const item = list[i];
          let itemLanguage = '@none';
          let itemType = '@none';

          if (_isValue$3(item)) {
            if ('@direction' in item) {
              const lang = (item['@language'] || '').toLowerCase();
              const dir = item['@direction'];
              itemLanguage = `${lang}_${dir}`;
            } else if ('@language' in item) {
              itemLanguage = item['@language'].toLowerCase();
            } else if ('@type' in item) {
              itemType = item['@type'];
            } else {
              // plain literal
              itemLanguage = '@null';
            }
          } else {
            itemType = '@id';
          }

          if (commonLanguage === null) {
            commonLanguage = itemLanguage;
          } else if (itemLanguage !== commonLanguage && _isValue$3(item)) {
            commonLanguage = '@none';
          }

          if (commonType === null) {
            commonType = itemType;
          } else if (itemType !== commonType) {
            commonType = '@none';
          } // there are different languages and types in the list, so choose
          // the most generic term, no need to keep iterating the list


          if (commonLanguage === '@none' && commonType === '@none') {
            break;
          }
        }

        commonLanguage = commonLanguage || '@none';
        commonType = commonType || '@none';

        if (commonType !== '@none') {
          typeOrLanguage = '@type';
          typeOrLanguageValue = commonType;
        } else {
          typeOrLanguageValue = commonLanguage;
        }
      }
    } else {
      if (_isValue$3(value)) {
        if ('@language' in value && !('@index' in value)) {
          containers.push('@language', '@language@set');
          typeOrLanguageValue = value['@language'];
          const dir = value['@direction'];

          if (dir) {
            typeOrLanguageValue = `${typeOrLanguageValue}_${dir}`;
          }
        } else if ('@direction' in value && !('@index' in value)) {
          typeOrLanguageValue = `_${value['@direction']}`;
        } else if ('@type' in value) {
          typeOrLanguage = '@type';
          typeOrLanguageValue = value['@type'];
        }
      } else {
        typeOrLanguage = '@type';
        typeOrLanguageValue = '@id';
      }

      containers.push('@set');
    } // do term selection


    containers.push('@none'); // an index map can be used to index values using @none, so add as a low
    // priority

    if (_isObject$9(value) && !('@index' in value)) {
      // allow indexing even if no @index present
      containers.push('@index', '@index@set');
    } // values without type or language can use @language map


    if (_isValue$3(value) && Object.keys(value).length === 1) {
      // allow indexing even if no @index present
      containers.push('@language', '@language@set');
    }

    const term = _selectTerm$1(activeCtx, iri, value, containers, typeOrLanguage, typeOrLanguageValue);

    if (term !== null) {
      return term;
    }
  } // no term match, use @vocab if available


  if (relativeTo.vocab) {
    if ('@vocab' in activeCtx) {
      // determine if vocab is a prefix of the iri
      const vocab = activeCtx['@vocab'];

      if (iri.indexOf(vocab) === 0 && iri !== vocab) {
        // use suffix as relative iri if it is not a term in the active context
        const suffix = iri.substr(vocab.length);

        if (!activeCtx.mappings.has(suffix)) {
          return suffix;
        }
      }
    }
  } // no term or @vocab match, check for possible CURIEs


  let choice = null; // TODO: make FastCurieMap a class with a method to do this lookup

  const partialMatches = [];
  let iriMap = activeCtx.fastCurieMap; // check for partial matches of against `iri`, which means look until
  // iri.length - 1, not full length

  const maxPartialLength = iri.length - 1;

  for (let i = 0; i < maxPartialLength && iri[i] in iriMap; ++i) {
    iriMap = iriMap[iri[i]];

    if ('' in iriMap) {
      partialMatches.push(iriMap[''][0]);
    }
  } // check partial matches in reverse order to prefer longest ones first


  for (let i = partialMatches.length - 1; i >= 0; --i) {
    const entry = partialMatches[i];
    const terms = entry.terms;

    for (const term of terms) {
      // a CURIE is usable if:
      // 1. it has no mapping, OR
      // 2. value is null, which means we're not compacting an @value, AND
      //   the mapping matches the IRI
      const curie = term + ':' + iri.substr(entry.iri.length);
      const isUsableCurie = activeCtx.mappings.get(term)._prefix && (!activeCtx.mappings.has(curie) || value === null && activeCtx.mappings.get(curie)['@id'] === iri); // select curie if it is shorter or the same length but lexicographically
      // less than the current choice

      if (isUsableCurie && (choice === null || _compareShortestLeast$3(curie, choice) < 0)) {
        choice = curie;
      }
    }
  } // return chosen curie


  if (choice !== null) {
    return choice;
  } // If iri could be confused with a compact IRI using a term in this context,
  // signal an error


  for (const [term, td] of activeCtx.mappings) {
    if (td && td._prefix && iri.startsWith(term + ':')) {
      throw new JsonLdError_1$1(`Absolute IRI "${iri}" confused with prefix "${term}".`, 'jsonld.SyntaxError', {
        code: 'IRI confused with prefix',
        context: activeCtx
      });
    }
  } // compact IRI relative to base


  if (!relativeTo.vocab) {
    if ('@base' in activeCtx) {
      if (!activeCtx['@base']) {
        // The None case preserves rval as potentially relative
        return iri;
      } else {
        return _removeBase$1(_prependBase$1(base, activeCtx['@base']), iri);
      }
    } else {
      return _removeBase$1(base, iri);
    }
  } // return IRI as is


  return iri;
};
/**
 * Performs value compaction on an object with '@value' or '@id' as the only
 * property.
 *
 * @param activeCtx the active context.
 * @param activeProperty the active property that points to the value.
 * @param value the value to compact.
 * @param {Object} [options] - processing options.
 *
 * @return the compaction result.
 */


api$q.compactValue = ({
  activeCtx,
  activeProperty,
  value,
  options
}) => {
  // value is a @value
  if (_isValue$3(value)) {
    // get context rules
    const type = _getContextValue$3(activeCtx, activeProperty, '@type');

    const language = _getContextValue$3(activeCtx, activeProperty, '@language');

    const direction = _getContextValue$3(activeCtx, activeProperty, '@direction');

    const container = _getContextValue$3(activeCtx, activeProperty, '@container') || []; // whether or not the value has an @index that must be preserved

    const preserveIndex = '@index' in value && !container.includes('@index'); // if there's no @index to preserve ...

    if (!preserveIndex && type !== '@none') {
      // matching @type or @language specified in context, compact value
      if (value['@type'] === type) {
        return value['@value'];
      }

      if ('@language' in value && value['@language'] === language && '@direction' in value && value['@direction'] === direction) {
        return value['@value'];
      }

      if ('@language' in value && value['@language'] === language) {
        return value['@value'];
      }

      if ('@direction' in value && value['@direction'] === direction) {
        return value['@value'];
      }
    } // return just the value of @value if all are true:
    // 1. @value is the only key or @index isn't being preserved
    // 2. there is no default language or @value is not a string or
    //   the key has a mapping with a null @language


    const keyCount = Object.keys(value).length;
    const isValueOnlyKey = keyCount === 1 || keyCount === 2 && '@index' in value && !preserveIndex;
    const hasDefaultLanguage = ('@language' in activeCtx);

    const isValueString = _isString$8(value['@value']);

    const hasNullMapping = activeCtx.mappings.has(activeProperty) && activeCtx.mappings.get(activeProperty)['@language'] === null;

    if (isValueOnlyKey && type !== '@none' && (!hasDefaultLanguage || !isValueString || hasNullMapping)) {
      return value['@value'];
    }

    const rval = {}; // preserve @index

    if (preserveIndex) {
      rval[api$q.compactIri({
        activeCtx,
        iri: '@index',
        relativeTo: {
          vocab: true
        }
      })] = value['@index'];
    }

    if ('@type' in value) {
      // compact @type IRI
      rval[api$q.compactIri({
        activeCtx,
        iri: '@type',
        relativeTo: {
          vocab: true
        }
      })] = api$q.compactIri({
        activeCtx,
        iri: value['@type'],
        relativeTo: {
          vocab: true
        }
      });
    } else if ('@language' in value) {
      // alias @language
      rval[api$q.compactIri({
        activeCtx,
        iri: '@language',
        relativeTo: {
          vocab: true
        }
      })] = value['@language'];
    }

    if ('@direction' in value) {
      // alias @direction
      rval[api$q.compactIri({
        activeCtx,
        iri: '@direction',
        relativeTo: {
          vocab: true
        }
      })] = value['@direction'];
    } // alias @value


    rval[api$q.compactIri({
      activeCtx,
      iri: '@value',
      relativeTo: {
        vocab: true
      }
    })] = value['@value'];
    return rval;
  } // value is a subject reference


  const expandedProperty = _expandIri$6(activeCtx, activeProperty, {
    vocab: true
  }, options);

  const type = _getContextValue$3(activeCtx, activeProperty, '@type');

  const compacted = api$q.compactIri({
    activeCtx,
    iri: value['@id'],
    relativeTo: {
      vocab: type === '@vocab'
    },
    base: options.base
  }); // compact to scalar

  if (type === '@id' || type === '@vocab' || expandedProperty === '@graph') {
    return compacted;
  }

  return {
    [api$q.compactIri({
      activeCtx,
      iri: '@id',
      relativeTo: {
        vocab: true
      }
    })]: compacted
  };
};
/**
 * Picks the preferred compaction term from the given inverse context entry.
 *
 * @param activeCtx the active context.
 * @param iri the IRI to pick the term for.
 * @param value the value to pick the term for.
 * @param containers the preferred containers.
 * @param typeOrLanguage either '@type' or '@language'.
 * @param typeOrLanguageValue the preferred value for '@type' or '@language'.
 *
 * @return the preferred term.
 */


function _selectTerm$1(activeCtx, iri, value, containers, typeOrLanguage, typeOrLanguageValue) {
  if (typeOrLanguageValue === null) {
    typeOrLanguageValue = '@null';
  } // preferences for the value of @type or @language


  const prefs = []; // determine prefs for @id based on whether or not value compacts to a term

  if ((typeOrLanguageValue === '@id' || typeOrLanguageValue === '@reverse') && _isObject$9(value) && '@id' in value) {
    // prefer @reverse first
    if (typeOrLanguageValue === '@reverse') {
      prefs.push('@reverse');
    } // try to compact value to a term


    const term = api$q.compactIri({
      activeCtx,
      iri: value['@id'],
      relativeTo: {
        vocab: true
      }
    });

    if (activeCtx.mappings.has(term) && activeCtx.mappings.get(term) && activeCtx.mappings.get(term)['@id'] === value['@id']) {
      // prefer @vocab
      prefs.push.apply(prefs, ['@vocab', '@id']);
    } else {
      // prefer @id
      prefs.push.apply(prefs, ['@id', '@vocab']);
    }
  } else {
    prefs.push(typeOrLanguageValue); // consider direction only

    const langDir = prefs.find(el => el.includes('_'));

    if (langDir) {
      // consider _dir portion
      prefs.push(langDir.replace(/^[^_]+_/, '_'));
    }
  }

  prefs.push('@none');
  const containerMap = activeCtx.inverse[iri];

  for (const container of containers) {
    // if container not available in the map, continue
    if (!(container in containerMap)) {
      continue;
    }

    const typeOrLanguageValueMap = containerMap[container][typeOrLanguage];

    for (const pref of prefs) {
      // if type/language option not available in the map, continue
      if (!(pref in typeOrLanguageValueMap)) {
        continue;
      } // select term


      return typeOrLanguageValueMap[pref];
    }
  }

  return null;
}
/**
 * The value of `@nest` in the term definition must either be `@nest`, or a term
 * which resolves to `@nest`.
 *
 * @param activeCtx the active context.
 * @param nestProperty a term in the active context or `@nest`.
 * @param {Object} [options] - processing options.
 */


function _checkNestProperty$1(activeCtx, nestProperty, options) {
  if (_expandIri$6(activeCtx, nestProperty, {
    vocab: true
  }, options) !== '@nest') {
    throw new JsonLdError_1$1('JSON-LD compact error; nested property must have an @nest value ' + 'resolving to @nest.', 'jsonld.SyntaxError', {
      code: 'invalid @nest value'
    });
  }
}

/*
 * Copyright (c) 2017-2019 Digital Bazaar, Inc. All rights reserved.
 */

function asyncGeneratorStep$5(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator$5(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep$5(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep$5(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var RequestQueue_1$1 = class RequestQueue {
  /**
   * Creates a simple queue for requesting documents.
   */
  constructor() {
    this._requests = {};
  }

  wrapLoader(loader) {
    const self = this;
    self._loader = loader;
    return function ()
    /* url */
    {
      return self.add.apply(self, arguments);
    };
  }

  add(url) {
    var _this = this;

    return _asyncToGenerator$5(function* () {
      let promise = _this._requests[url];

      if (promise) {
        // URL already queued, wait for it to load
        return Promise.resolve(promise);
      } // queue URL and load it


      promise = _this._requests[url] = _this._loader(url);

      try {
        return yield promise;
      } finally {
        delete _this._requests[url];
      }
    })();
  }

};

function asyncGeneratorStep$6(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator$6(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep$6(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep$6(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const {
  parseLinkHeader: parseLinkHeader$2,
  buildHeaders: buildHeaders$2
} = util$2;

const {
  LINK_HEADER_CONTEXT: LINK_HEADER_CONTEXT$2
} = constants$1;





const {
  prependBase: prependBase$6
} = url$1;
/**
 * Creates a built-in node document loader.
 *
 * @param options the options to use:
 *          secure: require all URLs to use HTTPS.
 *          strictSSL: true to require SSL certificates to be valid,
 *            false not to (default: true).
 *          maxRedirects: the maximum number of redirects to permit, none by
 *            default.
 *          request: the object which will make the request, default is
 *            provided by `https://www.npmjs.com/package/request`.
 *          headers: an object (map) of headers which will be passed as request
 *            headers for the requested document. Accept is not allowed.
 *
 * @return the node document loader.
 */


var node$1 = ({
  secure,
  strictSSL = true,
  maxRedirects = -1,
  request,
  headers = {}
} = {
  strictSSL: true,
  maxRedirects: -1,
  headers: {}
}) => {
  headers = buildHeaders$2(headers); // TODO: use `axios`

  request = request || require$$4;

  const http = require$$4;

  const queue = new RequestQueue_1$1();
  return queue.wrapLoader(function (url) {
    return loadDocument(url, []);
  });

  function loadDocument(_x, _x2) {
    return _loadDocument.apply(this, arguments);
  }

  function _loadDocument() {
    _loadDocument = _asyncToGenerator$6(function* (url, redirects) {
      if (url.indexOf('http:') !== 0 && url.indexOf('https:') !== 0) {
        throw new JsonLdError_1$1('URL could not be dereferenced; only "http" and "https" URLs are ' + 'supported.', 'jsonld.InvalidUrl', {
          code: 'loading document failed',
          url
        });
      }

      if (secure && url.indexOf('https') !== 0) {
        throw new JsonLdError_1$1('URL could not be dereferenced; secure mode is enabled and ' + 'the URL\'s scheme is not "https".', 'jsonld.InvalidUrl', {
          code: 'loading document failed',
          url
        });
      } // TODO: disable cache until HTTP caching implemented


      let doc = null; //cache.get(url);

      if (doc !== null) {
        return doc;
      }

      let result;
      let alternate = null;

      try {
        result = yield _request$1(request, {
          url,
          headers,
          strictSSL,
          followRedirect: false
        });
      } catch (e) {
        throw new JsonLdError_1$1('URL could not be dereferenced, an error occurred.', 'jsonld.LoadDocumentError', {
          code: 'loading document failed',
          url,
          cause: e
        });
      }

      const {
        res,
        body
      } = result;
      doc = {
        contextUrl: null,
        documentUrl: url,
        document: body || null
      }; // handle error

      const statusText = http.STATUS_CODES[res.statusCode];

      if (res.statusCode >= 400) {
        throw new JsonLdError_1$1(`URL "${url}" could not be dereferenced: ${statusText}`, 'jsonld.InvalidUrl', {
          code: 'loading document failed',
          url,
          httpStatusCode: res.statusCode
        });
      } // handle Link Header


      if (res.headers.link && res.headers['content-type'] !== 'application/ld+json') {
        // only 1 related link header permitted
        const linkHeaders = parseLinkHeader$2(res.headers.link);
        const linkedContext = linkHeaders[LINK_HEADER_CONTEXT$2];

        if (Array.isArray(linkedContext)) {
          throw new JsonLdError_1$1('URL could not be dereferenced, it has more than one associated ' + 'HTTP Link Header.', 'jsonld.InvalidUrl', {
            code: 'multiple context link headers',
            url
          });
        }

        if (linkedContext) {
          doc.contextUrl = linkedContext.target;
        } // "alternate" link header is a redirect


        alternate = linkHeaders['alternate'];

        if (alternate && alternate.type == 'application/ld+json' && !(res.headers['content-type'] || '').match(/^application\/(\w*\+)?json$/)) {
          res.headers.location = prependBase$6(url, alternate.target);
        }
      } // handle redirect


      if ((alternate || res.statusCode >= 300 && res.statusCode < 400) && res.headers.location) {
        if (redirects.length === maxRedirects) {
          throw new JsonLdError_1$1('URL could not be dereferenced; there were too many redirects.', 'jsonld.TooManyRedirects', {
            code: 'loading document failed',
            url,
            httpStatusCode: res.statusCode,
            redirects
          });
        }

        if (redirects.indexOf(url) !== -1) {
          throw new JsonLdError_1$1('URL could not be dereferenced; infinite redirection was detected.', 'jsonld.InfiniteRedirectDetected', {
            code: 'recursive context inclusion',
            url,
            httpStatusCode: res.statusCode,
            redirects
          });
        }

        redirects.push(url);
        return loadDocument(res.headers.location, redirects);
      } // cache for each redirected URL


      redirects.push(url); // TODO: disable cache until HTTP caching implemented

      /*
      for(let i = 0; i < redirects.length; ++i) {
        cache.set(
          redirects[i],
          {contextUrl: null, documentUrl: redirects[i], document: body});
      }
      */

      return doc;
    });
    return _loadDocument.apply(this, arguments);
  }
};

function _request$1(request, options) {
  return new Promise((resolve, reject) => {
    request(options, (err, res, body) => {
      if (err) {
        reject(err);
      } else {
        resolve({
          res,
          body
        });
      }
    });
  });
}

function asyncGeneratorStep$7(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator$7(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep$7(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep$7(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const {
  parseLinkHeader: parseLinkHeader$3,
  buildHeaders: buildHeaders$3
} = util$2;

const {
  LINK_HEADER_CONTEXT: LINK_HEADER_CONTEXT$3
} = constants$1;





const {
  prependBase: prependBase$7
} = url$1;

const REGEX_LINK_HEADER$3 = /(^|(\r\n))link:/i;
/**
 * Creates a built-in XMLHttpRequest document loader.
 *
 * @param options the options to use:
 *          secure: require all URLs to use HTTPS.
 *          headers: an object (map) of headers which will be passed as request
 *            headers for the requested document. Accept is not allowed.
 *          [xhr]: the XMLHttpRequest API to use.
 *
 * @return the XMLHttpRequest document loader.
 */

var xhr$1 = ({
  secure,
  headers = {},
  xhr
} = {
  headers: {}
}) => {
  headers = buildHeaders$3(headers);
  const queue = new RequestQueue_1$1();
  return queue.wrapLoader(loader);

  function loader(_x) {
    return _loader.apply(this, arguments);
  }

  function _loader() {
    _loader = _asyncToGenerator$7(function* (url) {
      if (url.indexOf('http:') !== 0 && url.indexOf('https:') !== 0) {
        throw new JsonLdError_1$1('URL could not be dereferenced; only "http" and "https" URLs are ' + 'supported.', 'jsonld.InvalidUrl', {
          code: 'loading document failed',
          url
        });
      }

      if (secure && url.indexOf('https') !== 0) {
        throw new JsonLdError_1$1('URL could not be dereferenced; secure mode is enabled and ' + 'the URL\'s scheme is not "https".', 'jsonld.InvalidUrl', {
          code: 'loading document failed',
          url
        });
      }

      let req;

      try {
        req = yield _get$1(xhr, url, headers);
      } catch (e) {
        throw new JsonLdError_1$1('URL could not be dereferenced, an error occurred.', 'jsonld.LoadDocumentError', {
          code: 'loading document failed',
          url,
          cause: e
        });
      }

      if (req.status >= 400) {
        throw new JsonLdError_1$1('URL could not be dereferenced: ' + req.statusText, 'jsonld.LoadDocumentError', {
          code: 'loading document failed',
          url,
          httpStatusCode: req.status
        });
      }

      let doc = {
        contextUrl: null,
        documentUrl: url,
        document: req.response
      };
      let alternate = null; // handle Link Header (avoid unsafe header warning by existence testing)

      const contentType = req.getResponseHeader('Content-Type');
      let linkHeader;

      if (REGEX_LINK_HEADER$3.test(req.getAllResponseHeaders())) {
        linkHeader = req.getResponseHeader('Link');
      }

      if (linkHeader && contentType !== 'application/ld+json') {
        // only 1 related link header permitted
        const linkHeaders = parseLinkHeader$3(req.headers.link);
        const linkedContext = linkHeaders[LINK_HEADER_CONTEXT$3];

        if (Array.isArray(linkedContext)) {
          throw new JsonLdError_1$1('URL could not be dereferenced, it has more than one ' + 'associated HTTP Link Header.', 'jsonld.InvalidUrl', {
            code: 'multiple context link headers',
            url
          });
        }

        if (linkedContext) {
          doc.contextUrl = linkedContext.target;
        } // "alternate" link header is a redirect


        alternate = linkHeaders['alternate'];

        if (alternate && alternate.type == 'application/ld+json' && !(contentType || '').match(/^application\/(\w*\+)?json$/)) {
          doc = yield loader(prependBase$7(url, alternate.target));
        }
      }

      return doc;
    });
    return _loader.apply(this, arguments);
  }
};

function _get$1(xhr, url, headers) {
  xhr = xhr || XMLHttpRequest;
  const req = new xhr();
  return new Promise((resolve, reject) => {
    req.onload = () => resolve(req);

    req.onerror = err => reject(err);

    req.open('GET', url, true);

    for (const k in headers) {
      req.setRequestHeader(k, headers[k]);
    }

    req.send();
  });
}

/*
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */

var JsonLdProcessor$1 = jsonld => {
  class JsonLdProcessor {
    toString() {
      return '[object JsonLdProcessor]';
    }

  }

  Object.defineProperty(JsonLdProcessor, 'prototype', {
    writable: false,
    enumerable: false
  });
  Object.defineProperty(JsonLdProcessor.prototype, 'constructor', {
    writable: true,
    enumerable: false,
    configurable: true,
    value: JsonLdProcessor
  }); // The Web IDL test harness will check the number of parameters defined in
  // the functions below. The number of parameters must exactly match the
  // required (non-optional) parameters of the JsonLdProcessor interface as
  // defined here:
  // https://www.w3.org/TR/json-ld-api/#the-jsonldprocessor-interface

  JsonLdProcessor.compact = function (input, ctx) {
    if (arguments.length < 2) {
      return Promise.reject(new TypeError('Could not compact, too few arguments.'));
    }

    return jsonld.compact(input, ctx);
  };

  JsonLdProcessor.expand = function (input) {
    if (arguments.length < 1) {
      return Promise.reject(new TypeError('Could not expand, too few arguments.'));
    }

    return jsonld.expand(input);
  };

  JsonLdProcessor.flatten = function (input) {
    if (arguments.length < 1) {
      return Promise.reject(new TypeError('Could not flatten, too few arguments.'));
    }

    return jsonld.flatten(input);
  };

  return JsonLdProcessor;
};

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(Object(source), true).forEach(function (key) { _defineProperty$1(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty$1(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep$8(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator$8(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep$8(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep$8(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * A JavaScript implementation of the JSON-LD API.
 *
 * @author Dave Longley
 *
 * @license BSD 3-Clause License
 * Copyright (c) 2011-2019 Digital Bazaar, Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice,
 * this list of conditions and the following disclaimer.
 *
 * Redistributions in binary form must reproduce the above copyright
 * notice, this list of conditions and the following disclaimer in the
 * documentation and/or other materials provided with the distribution.
 *
 * Neither the name of the Digital Bazaar, Inc. nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
 * IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED
 * TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
 * PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */






const IdentifierIssuer$3 = util$2.IdentifierIssuer;









const {
  expand: _expand$1
} = expand$1;

const {
  flatten: _flatten$1
} = flatten$1;

const {
  fromRDF: _fromRDF$1
} = fromRdf$1;

const {
  toRDF: _toRDF$1
} = toRdf$1;

const {
  frameMergedOrDefault: _frameMergedOrDefault$1,
  cleanupNull: _cleanupNull$1
} = frame$1;

const {
  isArray: _isArray$9,
  isObject: _isObject$a,
  isString: _isString$9
} = types$1;

const {
  isSubjectReference: _isSubjectReference$5
} = graphTypes$1;

const {
  expandIri: _expandIri$7,
  getInitialContext: _getInitialContext$1,
  process: _processContext$5,
  processingMode: _processingMode$5
} = context$1;

const {
  compact: _compact$1,
  compactIri: _compactIri$1
} = compact$1;

const {
  createNodeMap: _createNodeMap$3,
  createMergedNodeMap: _createMergedNodeMap$3,
  mergeNodeMaps: _mergeNodeMaps$1
} = nodeMap$1; // determine if in-browser or using Node.js


const _nodejs$1 = typeof process !== 'undefined' && process.versions && process.versions.node;

const _browser$1 = !_nodejs$1 && (typeof window !== 'undefined' || typeof self !== 'undefined');
/* eslint-disable indent */
// attaches jsonld API to the given object


const wrapper$1 = function (jsonld) {
  /** Registered RDF dataset parsers hashed by content-type. */
  const _rdfParsers = {}; // resolved context cache
  // TODO: consider basing max on context size rather than number

  const RESOLVED_CONTEXT_CACHE_MAX_SIZE = 100;

  const _resolvedContextCache = new lruCache({
    max: RESOLVED_CONTEXT_CACHE_MAX_SIZE
  });
  /* Core API */

  /**
   * Performs JSON-LD compaction.
   *
   * @param input the JSON-LD input to compact.
   * @param ctx the context to compact with.
   * @param [options] options to use:
   *          [base] the base IRI to use.
   *          [compactArrays] true to compact arrays to single values when
   *            appropriate, false not to (default: true).
   *          [compactToRelative] true to compact IRIs to be relative to document
   *            base, false to keep absolute (default: true)
   *          [graph] true to always output a top-level graph (default: false).
   *          [expandContext] a context to expand with.
   *          [skipExpansion] true to assume the input is expanded and skip
   *            expansion, false not to, defaults to false.
   *          [documentLoader(url, options)] the document loader.
   *          [expansionMap(info)] a function that can be used to custom map
   *            unmappable values (or to throw an error when they are detected);
   *            if this function returns `undefined` then the default behavior
   *            will be used.
   *          [framing] true if compaction is occuring during a framing operation.
   *          [compactionMap(info)] a function that can be used to custom map
   *            unmappable values (or to throw an error when they are detected);
   *            if this function returns `undefined` then the default behavior
   *            will be used.
   *          [contextResolver] internal use only.
   *
   * @return a Promise that resolves to the compacted output.
   */


  jsonld.compact = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator$8(function* (input, ctx, options) {
      if (arguments.length < 2) {
        throw new TypeError('Could not compact, too few arguments.');
      }

      if (ctx === null) {
        throw new JsonLdError_1$1('The compaction context must not be null.', 'jsonld.CompactError', {
          code: 'invalid local context'
        });
      } // nothing to compact


      if (input === null) {
        return null;
      } // set default options


      options = _setDefaults(options, {
        base: _isString$9(input) ? input : '',
        compactArrays: true,
        compactToRelative: true,
        graph: false,
        skipExpansion: false,
        link: false,
        issuer: new IdentifierIssuer$3('_:b'),
        contextResolver: new ContextResolver_1$1({
          sharedCache: _resolvedContextCache
        })
      });

      if (options.link) {
        // force skip expansion when linking, "link" is not part of the public
        // API, it should only be called from framing
        options.skipExpansion = true;
      }

      if (!options.compactToRelative) {
        delete options.base;
      } // expand input


      let expanded;

      if (options.skipExpansion) {
        expanded = input;
      } else {
        expanded = yield jsonld.expand(input, options);
      } // process context


      const activeCtx = yield jsonld.processContext(_getInitialContext$1(options), ctx, options); // do compaction

      let compacted = yield _compact$1({
        activeCtx,
        element: expanded,
        options,
        compactionMap: options.compactionMap
      }); // perform clean up

      if (options.compactArrays && !options.graph && _isArray$9(compacted)) {
        if (compacted.length === 1) {
          // simplify to a single item
          compacted = compacted[0];
        } else if (compacted.length === 0) {
          // simplify to an empty object
          compacted = {};
        }
      } else if (options.graph && _isObject$a(compacted)) {
        // always use array if graph option is on
        compacted = [compacted];
      } // follow @context key


      if (_isObject$a(ctx) && '@context' in ctx) {
        ctx = ctx['@context'];
      } // build output context


      ctx = util$2.clone(ctx);

      if (!_isArray$9(ctx)) {
        ctx = [ctx];
      } // remove empty contexts


      const tmp = ctx;
      ctx = [];

      for (let i = 0; i < tmp.length; ++i) {
        if (!_isObject$a(tmp[i]) || Object.keys(tmp[i]).length > 0) {
          ctx.push(tmp[i]);
        }
      } // remove array if only one context


      const hasContext = ctx.length > 0;

      if (ctx.length === 1) {
        ctx = ctx[0];
      } // add context and/or @graph


      if (_isArray$9(compacted)) {
        // use '@graph' keyword
        const graphAlias = _compactIri$1({
          activeCtx,
          iri: '@graph',
          relativeTo: {
            vocab: true
          }
        });

        const graph = compacted;
        compacted = {};

        if (hasContext) {
          compacted['@context'] = ctx;
        }

        compacted[graphAlias] = graph;
      } else if (_isObject$a(compacted) && hasContext) {
        // reorder keys so @context is first
        const graph = compacted;
        compacted = {
          '@context': ctx
        };

        for (const key in graph) {
          compacted[key] = graph[key];
        }
      }

      return compacted;
    });

    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }();
  /**
   * Performs JSON-LD expansion.
   *
   * @param input the JSON-LD input to expand.
   * @param [options] the options to use:
   *          [base] the base IRI to use.
   *          [expandContext] a context to expand with.
   *          [keepFreeFloatingNodes] true to keep free-floating nodes,
   *            false not to, defaults to false.
   *          [documentLoader(url, options)] the document loader.
   *          [expansionMap(info)] a function that can be used to custom map
   *            unmappable values (or to throw an error when they are detected);
   *            if this function returns `undefined` then the default behavior
   *            will be used.
   *          [contextResolver] internal use only.
   *
   * @return a Promise that resolves to the expanded output.
   */


  jsonld.expand = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator$8(function* (input, options) {
      if (arguments.length < 1) {
        throw new TypeError('Could not expand, too few arguments.');
      } // set default options


      options = _setDefaults(options, {
        keepFreeFloatingNodes: false,
        contextResolver: new ContextResolver_1$1({
          sharedCache: _resolvedContextCache
        })
      });

      if (options.expansionMap === false) {
        options.expansionMap = undefined;
      } // build set of objects that may have @contexts to resolve


      const toResolve = {}; // build set of contexts to process prior to expansion

      const contextsToProcess = []; // if an `expandContext` has been given ensure it gets resolved

      if ('expandContext' in options) {
        const expandContext = util$2.clone(options.expandContext);

        if (_isObject$a(expandContext) && '@context' in expandContext) {
          toResolve.expandContext = expandContext;
        } else {
          toResolve.expandContext = {
            '@context': expandContext
          };
        }

        contextsToProcess.push(toResolve.expandContext);
      } // if input is a string, attempt to dereference remote document


      let defaultBase;

      if (!_isString$9(input)) {
        // input is not a URL, do not need to retrieve it first
        toResolve.input = util$2.clone(input);
      } else {
        // load remote doc
        const remoteDoc = yield jsonld.get(input, options);
        defaultBase = remoteDoc.documentUrl;
        toResolve.input = remoteDoc.document;

        if (remoteDoc.contextUrl) {
          // context included in HTTP link header and must be resolved
          toResolve.remoteContext = {
            '@context': remoteDoc.contextUrl
          };
          contextsToProcess.push(toResolve.remoteContext);
        }
      } // set default base


      if (!('base' in options)) {
        options.base = defaultBase || '';
      } // process any additional contexts


      let activeCtx = _getInitialContext$1(options);

      for (const localCtx of contextsToProcess) {
        activeCtx = yield _processContext$5({
          activeCtx,
          localCtx,
          options
        });
      } // expand resolved input


      let expanded = yield _expand$1({
        activeCtx,
        element: toResolve.input,
        options,
        expansionMap: options.expansionMap
      }); // optimize away @graph with no other properties

      if (_isObject$a(expanded) && '@graph' in expanded && Object.keys(expanded).length === 1) {
        expanded = expanded['@graph'];
      } else if (expanded === null) {
        expanded = [];
      } // normalize to an array


      if (!_isArray$9(expanded)) {
        expanded = [expanded];
      }

      return expanded;
    });

    return function (_x4, _x5) {
      return _ref2.apply(this, arguments);
    };
  }();
  /**
   * Performs JSON-LD flattening.
   *
   * @param input the JSON-LD to flatten.
   * @param ctx the context to use to compact the flattened output, or null.
   * @param [options] the options to use:
   *          [base] the base IRI to use.
   *          [expandContext] a context to expand with.
   *          [documentLoader(url, options)] the document loader.
   *          [contextResolver] internal use only.
   *
   * @return a Promise that resolves to the flattened output.
   */


  jsonld.flatten = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator$8(function* (input, ctx, options) {
      if (arguments.length < 1) {
        return new TypeError('Could not flatten, too few arguments.');
      }

      if (typeof ctx === 'function') {
        ctx = null;
      } else {
        ctx = ctx || null;
      } // set default options


      options = _setDefaults(options, {
        base: _isString$9(input) ? input : '',
        contextResolver: new ContextResolver_1$1({
          sharedCache: _resolvedContextCache
        })
      }); // expand input

      const expanded = yield jsonld.expand(input, options); // do flattening

      const flattened = _flatten$1(expanded);

      if (ctx === null) {
        // no compaction required
        return flattened;
      } // compact result (force @graph option to true, skip expansion)


      options.graph = true;
      options.skipExpansion = true;
      const compacted = yield jsonld.compact(flattened, ctx, options);
      return compacted;
    });

    return function (_x6, _x7, _x8) {
      return _ref3.apply(this, arguments);
    };
  }();
  /**
   * Performs JSON-LD framing.
   *
   * @param input the JSON-LD input to frame.
   * @param frame the JSON-LD frame to use.
   * @param [options] the framing options.
   *          [base] the base IRI to use.
   *          [expandContext] a context to expand with.
   *          [embed] default @embed flag: '@last', '@always', '@never', '@link'
   *            (default: '@last').
   *          [explicit] default @explicit flag (default: false).
   *          [requireAll] default @requireAll flag (default: true).
   *          [omitDefault] default @omitDefault flag (default: false).
   *          [documentLoader(url, options)] the document loader.
   *          [contextResolver] internal use only.
   *
   * @return a Promise that resolves to the framed output.
   */


  jsonld.frame = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator$8(function* (input, frame, options) {
      if (arguments.length < 2) {
        throw new TypeError('Could not frame, too few arguments.');
      } // set default options


      options = _setDefaults(options, {
        base: _isString$9(input) ? input : '',
        embed: '@once',
        explicit: false,
        requireAll: false,
        omitDefault: false,
        bnodesToClear: [],
        contextResolver: new ContextResolver_1$1({
          sharedCache: _resolvedContextCache
        })
      }); // if frame is a string, attempt to dereference remote document

      if (_isString$9(frame)) {
        // load remote doc
        const remoteDoc = yield jsonld.get(frame, options);
        frame = remoteDoc.document;

        if (remoteDoc.contextUrl) {
          // inject link header @context into frame
          let ctx = frame['@context'];

          if (!ctx) {
            ctx = remoteDoc.contextUrl;
          } else if (_isArray$9(ctx)) {
            ctx.push(remoteDoc.contextUrl);
          } else {
            ctx = [ctx, remoteDoc.contextUrl];
          }

          frame['@context'] = ctx;
        }
      }

      const frameContext = frame ? frame['@context'] || {} : {}; // process context

      const activeCtx = yield jsonld.processContext(_getInitialContext$1(options), frameContext, options); // mode specific defaults

      if (!options.hasOwnProperty('omitGraph')) {
        options.omitGraph = _processingMode$5(activeCtx, 1.1);
      }

      if (!options.hasOwnProperty('pruneBlankNodeIdentifiers')) {
        options.pruneBlankNodeIdentifiers = _processingMode$5(activeCtx, 1.1);
      } // expand input


      const expanded = yield jsonld.expand(input, options); // expand frame

      const opts = _objectSpread$1({}, options);

      opts.isFrame = true;
      opts.keepFreeFloatingNodes = true;
      const expandedFrame = yield jsonld.expand(frame, opts); // if the unexpanded frame includes a key expanding to @graph, frame the
      // default graph, otherwise, the merged graph

      const frameKeys = Object.keys(frame).map(key => _expandIri$7(activeCtx, key, {
        vocab: true
      }));
      opts.merged = !frameKeys.includes('@graph');
      opts.is11 = _processingMode$5(activeCtx, 1.1); // do framing

      const framed = _frameMergedOrDefault$1(expanded, expandedFrame, opts);

      opts.graph = !options.omitGraph;
      opts.skipExpansion = true;
      opts.link = {};
      opts.framing = true;
      let compacted = yield jsonld.compact(framed, frameContext, opts); // replace @null with null, compacting arrays

      opts.link = {};
      compacted = _cleanupNull$1(compacted, opts);
      return compacted;
    });

    return function (_x9, _x10, _x11) {
      return _ref4.apply(this, arguments);
    };
  }();
  /**
   * **Experimental**
   *
   * Links a JSON-LD document's nodes in memory.
   *
   * @param input the JSON-LD document to link.
   * @param [ctx] the JSON-LD context to apply.
   * @param [options] the options to use:
   *          [base] the base IRI to use.
   *          [expandContext] a context to expand with.
   *          [documentLoader(url, options)] the document loader.
   *          [contextResolver] internal use only.
   *
   * @return a Promise that resolves to the linked output.
   */


  jsonld.link = /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator$8(function* (input, ctx, options) {
      // API matches running frame with a wildcard frame and embed: '@link'
      // get arguments
      const frame = {};

      if (ctx) {
        frame['@context'] = ctx;
      }

      frame['@embed'] = '@link';
      return jsonld.frame(input, frame, options);
    });

    return function (_x12, _x13, _x14) {
      return _ref5.apply(this, arguments);
    };
  }();
  /**
   * Performs RDF dataset normalization on the given input. The input is JSON-LD
   * unless the 'inputFormat' option is used. The output is an RDF dataset
   * unless the 'format' option is used.
   *
   * @param input the input to normalize as JSON-LD or as a format specified by
   *          the 'inputFormat' option.
   * @param [options] the options to use:
   *          [algorithm] the normalization algorithm to use, `URDNA2015` or
   *            `URGNA2012` (default: `URDNA2015`).
   *          [base] the base IRI to use.
   *          [expandContext] a context to expand with.
   *          [skipExpansion] true to assume the input is expanded and skip
   *            expansion, false not to, defaults to false.
   *          [inputFormat] the format if input is not JSON-LD:
   *            'application/n-quads' for N-Quads.
   *          [format] the format if output is a string:
   *            'application/n-quads' for N-Quads.
   *          [documentLoader(url, options)] the document loader.
   *          [useNative] true to use a native canonize algorithm
   *          [contextResolver] internal use only.
   *
   * @return a Promise that resolves to the normalized output.
   */


  jsonld.normalize = jsonld.canonize = /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator$8(function* (input, options) {
      if (arguments.length < 1) {
        throw new TypeError('Could not canonize, too few arguments.');
      } // set default options


      options = _setDefaults(options, {
        base: _isString$9(input) ? input : '',
        algorithm: 'URDNA2015',
        skipExpansion: false,
        contextResolver: new ContextResolver_1$1({
          sharedCache: _resolvedContextCache
        })
      });

      if ('inputFormat' in options) {
        if (options.inputFormat !== 'application/n-quads' && options.inputFormat !== 'application/nquads') {
          throw new JsonLdError_1$1('Unknown canonicalization input format.', 'jsonld.CanonizeError');
        } // TODO: `await` for async parsers


        const parsedInput = NQuads$1.parse(input); // do canonicalization

        return lib.canonize(parsedInput, options);
      } // convert to RDF dataset then do normalization


      const opts = _objectSpread$1({}, options);

      delete opts.format;
      opts.produceGeneralizedRdf = false;
      const dataset = yield jsonld.toRDF(input, opts); // do canonicalization

      return lib.canonize(dataset, options);
    });

    return function (_x15, _x16) {
      return _ref6.apply(this, arguments);
    };
  }();
  /**
   * Converts an RDF dataset to JSON-LD.
   *
   * @param dataset a serialized string of RDF in a format specified by the
   *          format option or an RDF dataset to convert.
   * @param [options] the options to use:
   *          [format] the format if dataset param must first be parsed:
   *            'application/n-quads' for N-Quads (default).
   *          [rdfParser] a custom RDF-parser to use to parse the dataset.
   *          [useRdfType] true to use rdf:type, false to use @type
   *            (default: false).
   *          [useNativeTypes] true to convert XSD types into native types
   *            (boolean, integer, double), false not to (default: false).
   *
   * @return a Promise that resolves to the JSON-LD document.
   */


  jsonld.fromRDF = /*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator$8(function* (dataset, options) {
      if (arguments.length < 1) {
        throw new TypeError('Could not convert from RDF, too few arguments.');
      } // set default options


      options = _setDefaults(options, {
        format: _isString$9(dataset) ? 'application/n-quads' : undefined
      });
      const {
        format
      } = options;
      let {
        rdfParser
      } = options; // handle special format

      if (format) {
        // check supported formats
        rdfParser = rdfParser || _rdfParsers[format];

        if (!rdfParser) {
          throw new JsonLdError_1$1('Unknown input format.', 'jsonld.UnknownFormat', {
            format
          });
        }
      } else {
        // no-op parser, assume dataset already parsed
        rdfParser = () => dataset;
      } // rdfParser must be synchronous or return a promise, no callback support


      const parsedDataset = yield rdfParser(dataset);
      return _fromRDF$1(parsedDataset, options);
    });

    return function (_x17, _x18) {
      return _ref7.apply(this, arguments);
    };
  }();
  /**
   * Outputs the RDF dataset found in the given JSON-LD object.
   *
   * @param input the JSON-LD input.
   * @param [options] the options to use:
   *          [base] the base IRI to use.
   *          [expandContext] a context to expand with.
   *          [skipExpansion] true to assume the input is expanded and skip
   *            expansion, false not to, defaults to false.
   *          [format] the format to use to output a string:
   *            'application/n-quads' for N-Quads.
   *          [produceGeneralizedRdf] true to output generalized RDF, false
   *            to produce only standard RDF (default: false).
   *          [documentLoader(url, options)] the document loader.
   *          [contextResolver] internal use only.
   *
   * @return a Promise that resolves to the RDF dataset.
   */


  jsonld.toRDF = /*#__PURE__*/function () {
    var _ref8 = _asyncToGenerator$8(function* (input, options) {
      if (arguments.length < 1) {
        throw new TypeError('Could not convert to RDF, too few arguments.');
      } // set default options


      options = _setDefaults(options, {
        base: _isString$9(input) ? input : '',
        skipExpansion: false,
        contextResolver: new ContextResolver_1$1({
          sharedCache: _resolvedContextCache
        })
      }); // TODO: support toRDF custom map?

      let expanded;

      if (options.skipExpansion) {
        expanded = input;
      } else {
        // expand input
        expanded = yield jsonld.expand(input, options);
      } // output RDF dataset


      const dataset = _toRDF$1(expanded, options);

      if (options.format) {
        if (options.format === 'application/n-quads' || options.format === 'application/nquads') {
          return yield NQuads$1.serialize(dataset);
        }

        throw new JsonLdError_1$1('Unknown output format.', 'jsonld.UnknownFormat', {
          format: options.format
        });
      }

      return dataset;
    });

    return function (_x19, _x20) {
      return _ref8.apply(this, arguments);
    };
  }();
  /**
   * **Experimental**
   *
   * Recursively flattens the nodes in the given JSON-LD input into a merged
   * map of node ID => node. All graphs will be merged into the default graph.
   *
   * @param input the JSON-LD input.
   * @param [options] the options to use:
   *          [base] the base IRI to use.
   *          [expandContext] a context to expand with.
   *          [issuer] a jsonld.IdentifierIssuer to use to label blank nodes.
   *          [documentLoader(url, options)] the document loader.
   *          [contextResolver] internal use only.
   *
   * @return a Promise that resolves to the merged node map.
   */


  jsonld.createNodeMap = /*#__PURE__*/function () {
    var _ref9 = _asyncToGenerator$8(function* (input, options) {
      if (arguments.length < 1) {
        throw new TypeError('Could not create node map, too few arguments.');
      } // set default options


      options = _setDefaults(options, {
        base: _isString$9(input) ? input : '',
        contextResolver: new ContextResolver_1$1({
          sharedCache: _resolvedContextCache
        })
      }); // expand input

      const expanded = yield jsonld.expand(input, options);
      return _createMergedNodeMap$3(expanded, options);
    });

    return function (_x21, _x22) {
      return _ref9.apply(this, arguments);
    };
  }();
  /**
   * **Experimental**
   *
   * Merges two or more JSON-LD documents into a single flattened document.
   *
   * @param docs the JSON-LD documents to merge together.
   * @param ctx the context to use to compact the merged result, or null.
   * @param [options] the options to use:
   *          [base] the base IRI to use.
   *          [expandContext] a context to expand with.
   *          [issuer] a jsonld.IdentifierIssuer to use to label blank nodes.
   *          [mergeNodes] true to merge properties for nodes with the same ID,
   *            false to ignore new properties for nodes with the same ID once
   *            the ID has been defined; note that this may not prevent merging
   *            new properties where a node is in the `object` position
   *            (default: true).
   *          [documentLoader(url, options)] the document loader.
   *          [contextResolver] internal use only.
   *
   * @return a Promise that resolves to the merged output.
   */


  jsonld.merge = /*#__PURE__*/function () {
    var _ref10 = _asyncToGenerator$8(function* (docs, ctx, options) {
      if (arguments.length < 1) {
        throw new TypeError('Could not merge, too few arguments.');
      }

      if (!_isArray$9(docs)) {
        throw new TypeError('Could not merge, "docs" must be an array.');
      }

      if (typeof ctx === 'function') {
        ctx = null;
      } else {
        ctx = ctx || null;
      } // set default options


      options = _setDefaults(options, {
        contextResolver: new ContextResolver_1$1({
          sharedCache: _resolvedContextCache
        })
      }); // expand all documents

      const expanded = yield Promise.all(docs.map(doc => {
        const opts = _objectSpread$1({}, options);

        return jsonld.expand(doc, opts);
      }));
      let mergeNodes = true;

      if ('mergeNodes' in options) {
        mergeNodes = options.mergeNodes;
      }

      const issuer = options.issuer || new IdentifierIssuer$3('_:b');
      const graphs = {
        '@default': {}
      };

      for (let i = 0; i < expanded.length; ++i) {
        // uniquely relabel blank nodes
        const doc = util$2.relabelBlankNodes(expanded[i], {
          issuer: new IdentifierIssuer$3('_:b' + i + '-')
        }); // add nodes to the shared node map graphs if merging nodes, to a
        // separate graph set if not

        const _graphs = mergeNodes || i === 0 ? graphs : {
          '@default': {}
        };

        _createNodeMap$3(doc, _graphs, '@default', issuer);

        if (_graphs !== graphs) {
          // merge document graphs but don't merge existing nodes
          for (const graphName in _graphs) {
            const _nodeMap = _graphs[graphName];

            if (!(graphName in graphs)) {
              graphs[graphName] = _nodeMap;
              continue;
            }

            const nodeMap = graphs[graphName];

            for (const key in _nodeMap) {
              if (!(key in nodeMap)) {
                nodeMap[key] = _nodeMap[key];
              }
            }
          }
        }
      } // add all non-default graphs to default graph


      const defaultGraph = _mergeNodeMaps$1(graphs); // produce flattened output


      const flattened = [];
      const keys = Object.keys(defaultGraph).sort();

      for (let ki = 0; ki < keys.length; ++ki) {
        const node = defaultGraph[keys[ki]]; // only add full subjects to top-level

        if (!_isSubjectReference$5(node)) {
          flattened.push(node);
        }
      }

      if (ctx === null) {
        return flattened;
      } // compact result (force @graph option to true, skip expansion)


      options.graph = true;
      options.skipExpansion = true;
      const compacted = yield jsonld.compact(flattened, ctx, options);
      return compacted;
    });

    return function (_x23, _x24, _x25) {
      return _ref10.apply(this, arguments);
    };
  }();
  /**
   * The default document loader for external documents.
   *
   * @param url the URL to load.
   *
   * @return a promise that resolves to the remote document.
   */


  Object.defineProperty(jsonld, 'documentLoader', {
    get: () => jsonld._documentLoader,
    set: v => jsonld._documentLoader = v
  }); // default document loader not implemented

  jsonld.documentLoader = /*#__PURE__*/function () {
    var _ref11 = _asyncToGenerator$8(function* (url) {
      throw new JsonLdError_1$1('Could not retrieve a JSON-LD document from the URL. URL ' + 'dereferencing not implemented.', 'jsonld.LoadDocumentError', {
        code: 'loading document failed',
        url
      });
    });

    return function (_x26) {
      return _ref11.apply(this, arguments);
    };
  }();
  /**
   * Gets a remote JSON-LD document using the default document loader or
   * one given in the passed options.
   *
   * @param url the URL to fetch.
   * @param [options] the options to use:
   *          [documentLoader] the document loader to use.
   *
   * @return a Promise that resolves to the retrieved remote document.
   */


  jsonld.get = /*#__PURE__*/function () {
    var _ref12 = _asyncToGenerator$8(function* (url, options) {
      let load;

      if (typeof options.documentLoader === 'function') {
        load = options.documentLoader;
      } else {
        load = jsonld.documentLoader;
      }

      const remoteDoc = yield load(url);

      try {
        if (!remoteDoc.document) {
          throw new JsonLdError_1$1('No remote document found at the given URL.', 'jsonld.NullRemoteDocument');
        }

        if (_isString$9(remoteDoc.document)) {
          remoteDoc.document = JSON.parse(remoteDoc.document);
        }
      } catch (e) {
        throw new JsonLdError_1$1('Could not retrieve a JSON-LD document from the URL.', 'jsonld.LoadDocumentError', {
          code: 'loading document failed',
          cause: e,
          remoteDoc
        });
      }

      return remoteDoc;
    });

    return function (_x27, _x28) {
      return _ref12.apply(this, arguments);
    };
  }();
  /**
   * Processes a local context, resolving any URLs as necessary, and returns a
   * new active context.
   *
   * @param activeCtx the current active context.
   * @param localCtx the local context to process.
   * @param [options] the options to use:
   *          [documentLoader(url, options)] the document loader.
   *          [contextResolver] internal use only.
   *
   * @return a Promise that resolves to the new active context.
   */


  jsonld.processContext = /*#__PURE__*/function () {
    var _ref13 = _asyncToGenerator$8(function* (activeCtx, localCtx, options) {
      // set default options
      options = _setDefaults(options, {
        base: '',
        contextResolver: new ContextResolver_1$1({
          sharedCache: _resolvedContextCache
        })
      }); // return initial context early for null context

      if (localCtx === null) {
        return _getInitialContext$1(options);
      } // get URLs in localCtx


      localCtx = util$2.clone(localCtx);

      if (!(_isObject$a(localCtx) && '@context' in localCtx)) {
        localCtx = {
          '@context': localCtx
        };
      }

      return _processContext$5({
        activeCtx,
        localCtx,
        options
      });
    });

    return function (_x29, _x30, _x31) {
      return _ref13.apply(this, arguments);
    };
  }(); // backwards compatibility


  jsonld.getContextValue = context$1.getContextValue;
  /**
   * Document loaders.
   */

  jsonld.documentLoaders = {};
  jsonld.documentLoaders.node = node$1;
  jsonld.documentLoaders.xhr = xhr$1;
  /**
   * Assigns the default document loader for external document URLs to a built-in
   * default. Supported types currently include: 'xhr' and 'node'.
   *
   * @param type the type to set.
   * @param [params] the parameters required to use the document loader.
   */

  jsonld.useDocumentLoader = function (type) {
    if (!(type in jsonld.documentLoaders)) {
      throw new JsonLdError_1$1('Unknown document loader type: "' + type + '"', 'jsonld.UnknownDocumentLoader', {
        type
      });
    } // set document loader


    jsonld.documentLoader = jsonld.documentLoaders[type].apply(jsonld, Array.prototype.slice.call(arguments, 1));
  };
  /**
   * Registers an RDF dataset parser by content-type, for use with
   * jsonld.fromRDF. An RDF dataset parser will always be given one parameter,
   * a string of input. An RDF dataset parser can be synchronous or
   * asynchronous (by returning a promise).
   *
   * @param contentType the content-type for the parser.
   * @param parser(input) the parser function (takes a string as a parameter
   *          and either returns an RDF dataset or a Promise that resolves to one.
   */


  jsonld.registerRDFParser = function (contentType, parser) {
    _rdfParsers[contentType] = parser;
  };
  /**
   * Unregisters an RDF dataset parser by content-type.
   *
   * @param contentType the content-type for the parser.
   */


  jsonld.unregisterRDFParser = function (contentType) {
    delete _rdfParsers[contentType];
  }; // register the N-Quads RDF parser


  jsonld.registerRDFParser('application/n-quads', NQuads$1.parse);
  jsonld.registerRDFParser('application/nquads', NQuads$1.parse); // register the RDFa API RDF parser

  jsonld.registerRDFParser('rdfa-api', Rdfa_1$1.parse);
  /* URL API */

  jsonld.url = url$1;
  /* Utility API */

  jsonld.util = util$2; // backwards compatibility

  Object.assign(jsonld, util$2); // reexpose API as jsonld.promises for backwards compatability

  jsonld.promises = jsonld; // backwards compatibility

  jsonld.RequestQueue = RequestQueue_1$1;
  /* WebIDL API */

  jsonld.JsonLdProcessor = JsonLdProcessor$1(jsonld); // setup browser global JsonLdProcessor

  if (_browser$1 && typeof commonjsGlobal.JsonLdProcessor === 'undefined') {
    Object.defineProperty(commonjsGlobal, 'JsonLdProcessor', {
      writable: true,
      enumerable: false,
      configurable: true,
      value: jsonld.JsonLdProcessor
    });
  } // set platform-specific defaults/APIs


  if (_nodejs$1) {
    // use node document loader by default
    jsonld.useDocumentLoader('node');
  } else if (typeof XMLHttpRequest !== 'undefined') {
    // use xhr document loader by default
    jsonld.useDocumentLoader('xhr');
  }

  function _setDefaults(options, _ref14) {
    let {
      documentLoader = jsonld.documentLoader
    } = _ref14,
        defaults = _objectWithoutProperties(_ref14, ["documentLoader"]);

    return Object.assign({}, {
      documentLoader
    }, defaults, options);
  } // end of jsonld API `wrapper` factory


  return jsonld;
}; // external APIs:
// used to generate a new jsonld API instance


const factory$1 = function () {
  return wrapper$1(function () {
    return factory$1();
  });
}; // wrap the main jsonld API instance


wrapper$1(factory$1); // export API

var jsonld$1 = factory$1;

var lib$1 = createCommonjsModule(function (module) {
/**
 * jsonld.js library.
 *
 * @author Dave Longley
 *
 * Copyright 2010-2017 Digital Bazaar, Inc.
 */
// FIXME: remove after change to core-js 3 and dropping node6 support

if(!Object.fromEntries) {
  object_fromentries.shim();
}

if(semver.gte(process.version, '8.6.0')) {
  module.exports = jsonld;
} else {
  
  module.exports = jsonld$1;
}
});

export default lib$1;
