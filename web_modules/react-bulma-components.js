import React from './react.js';
import require$$2 from './react-dom.js';
import { u as unwrapExports, c as createCommonjsModule, a as commonjsGlobal } from './common/_commonjsHelpers-7dcf7119.js';
import { g as propTypes } from './common/index-7b9c781f.js';

var dist = createCommonjsModule(function (module, exports) {
(function webpackUniversalModuleDefinition(root, factory) {
	module.exports = factory();
})(commonjsGlobal, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 37);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = propTypes;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/

/* global define */
(function () {

  var hasOwn = {}.hasOwnProperty;

  function classNames() {
    var classes = [];

    for (var i = 0; i < arguments.length; i++) {
      var arg = arguments[i];
      if (!arg) continue;

      var argType = _typeof(arg);

      if (argType === 'string' || argType === 'number') {
        classes.push(arg);
      } else if (Array.isArray(arg) && arg.length) {
        var inner = classNames.apply(null, arg);

        if (inner) {
          classes.push(inner);
        }
      } else if (argType === 'object') {
        for (var key in arg) {
          if (hasOwn.call(arg, key) && arg[key]) {
            classes.push(key);
          }
        }
      }
    }

    return classes.join(' ');
  }

  if (  module.exports) {
    classNames.default = classNames;
    module.exports = classNames;
  } else if (  _typeof(__webpack_require__(3)) === 'object' && __webpack_require__(3)) {
    // register as 'classnames', consistent with npm package name
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
      return classNames;
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {
    window.classNames = classNames;
  }
})();

/***/ }),
/* 3 */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(this, {}));

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require$$2;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
var components_form_namespaceObject = {};
__webpack_require__.r(components_form_namespaceObject);
__webpack_require__.d(components_form_namespaceObject, "Field", function() { return field; });
__webpack_require__.d(components_form_namespaceObject, "Control", function() { return control; });
__webpack_require__.d(components_form_namespaceObject, "Input", function() { return input; });
__webpack_require__.d(components_form_namespaceObject, "Label", function() { return components_label; });
__webpack_require__.d(components_form_namespaceObject, "Textarea", function() { return components_textarea; });
__webpack_require__.d(components_form_namespaceObject, "Select", function() { return components_select; });
__webpack_require__.d(components_form_namespaceObject, "Checkbox", function() { return components_checkbox; });
__webpack_require__.d(components_form_namespaceObject, "Radio", function() { return components_radio; });
__webpack_require__.d(components_form_namespaceObject, "Help", function() { return help; });
__webpack_require__.d(components_form_namespaceObject, "InputFile", function() { return input_file_InputFile; });

// EXTERNAL MODULE: ./src/index.sass
var src_0 = __webpack_require__(5);

// EXTERNAL MODULE: ./src/components/form/form.sass
var form_form = __webpack_require__(6);

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(1);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: external "prop-types"
var external_prop_types_ = __webpack_require__(0);
var external_prop_types_default = /*#__PURE__*/__webpack_require__.n(external_prop_types_);

// EXTERNAL MODULE: ./node_modules/classnames/index.js
var node_modules_classnames = __webpack_require__(2);
var classnames_default = /*#__PURE__*/__webpack_require__.n(node_modules_classnames);

// CONCATENATED MODULE: ./src/modifiers/helpers.js
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



/* harmony default export */ var helpers = ({
  propTypes: {
    clearfix: external_prop_types_default.a.bool,
    pull: external_prop_types_default.a.oneOf([undefined, 'right', 'left']),
    marginless: external_prop_types_default.a.bool,
    paddingless: external_prop_types_default.a.bool,
    overlay: external_prop_types_default.a.bool,
    clipped: external_prop_types_default.a.bool,
    radiusless: external_prop_types_default.a.bool,
    shadowless: external_prop_types_default.a.bool,
    unselectable: external_prop_types_default.a.bool,
    invisible: external_prop_types_default.a.bool,
    hidden: external_prop_types_default.a.bool
  },
  defaultProps: {
    clearfix: undefined,
    pull: undefined,
    marginless: undefined,
    paddingless: undefined,
    overlay: undefined,
    clipped: undefined,
    radiusless: undefined,
    shadowless: undefined,
    unselectable: undefined,
    invisible: undefined,
    hidden: undefined
  },
  classnames: function classnames(props) {
    var _classnames2;

    return classnames_default()((_classnames2 = {
      'is-clearfix': props.clearfix
    }, _defineProperty(_classnames2, "is-pulled-".concat(props.pull), props.pull), _defineProperty(_classnames2, 'is-marginless', props.marginless), _defineProperty(_classnames2, 'is-paddingless', props.paddingless), _defineProperty(_classnames2, 'is-overlay', props.overlay), _defineProperty(_classnames2, 'is-clipped', props.clipped), _defineProperty(_classnames2, 'is-radiusless', props.radiusless), _defineProperty(_classnames2, 'is-shadowless', props.shadowless), _defineProperty(_classnames2, 'is-unselectable', props.unselectable), _defineProperty(_classnames2, 'is-invisible', props.invisible), _defineProperty(_classnames2, 'is-hidden', props.hidden), _classnames2));
  },
  clean: function clean(_ref) {
    var hidden = _ref.hidden,
        clearfix = _ref.clearfix,
        paddingless = _ref.paddingless,
        pull = _ref.pull,
        marginless = _ref.marginless,
        overlay = _ref.overlay,
        clipped = _ref.clipped,
        radiusless = _ref.radiusless,
        shadowless = _ref.shadowless,
        unselectable = _ref.unselectable,
        invisible = _ref.invisible,
        props = _objectWithoutProperties(_ref, ["hidden", "clearfix", "paddingless", "pull", "marginless", "overlay", "clipped", "radiusless", "shadowless", "unselectable", "invisible"]);

    return props;
  }
});
// CONCATENATED MODULE: ./src/modifiers/responsives.js
function responsives_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = responsives_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function responsives_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { responsives_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function responsives_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var displays = ['block', 'flex', 'inline', 'inline-block', 'inline-flex'];

var getSizeClassFromProp = function getSizeClassFromProp(sizes) {
  return Object.keys(sizes).reduce(function (classes, size) {
    var _objectSpread2;

    var display = sizes[size].display || {};
    var hide = sizes[size].hide || {};
    var textSize = sizes[size].textSize || {};
    var textAlignment = sizes[size].textAlignment || {};

    var obj = _objectSpread({}, classes, (_objectSpread2 = {}, responsives_defineProperty(_objectSpread2, "is-".concat(display.value, "-").concat(size).concat(display.only ? '-only' : ''), display.value), responsives_defineProperty(_objectSpread2, "is-hidden-".concat(size).concat(hide.only ? '-only' : ''), hide.value), responsives_defineProperty(_objectSpread2, "has-text-".concat(textAlignment.value, "-").concat(size).concat(textAlignment.only ? '-only' : ''), textAlignment.value), responsives_defineProperty(_objectSpread2, "is-size-".concat(textSize.value, "-").concat(size), textSize.value > 0), _objectSpread2));

    return obj;
  }, {});
};

var sizeShape = external_prop_types_default.a.shape({
  display: external_prop_types_default.a.shape({
    value: external_prop_types_default.a.oneOf(displays),
    only: external_prop_types_default.a.bool
  }),
  hide: external_prop_types_default.a.shape({
    value: external_prop_types_default.a.bool,
    only: external_prop_types_default.a.bool
  }),
  textSize: external_prop_types_default.a.shape({
    value: external_prop_types_default.a.oneOf([1, 2, 3, 4, 5, 6])
  }),
  textAlignment: external_prop_types_default.a.shape({
    value: external_prop_types_default.a.oneOf(['centered', 'justified', 'left', 'right']),
    only: external_prop_types_default.a.bool
  })
});
/* harmony default export */ var responsives = ({
  propTypes: {
    responsive: external_prop_types_default.a.shape({
      mobile: sizeShape,
      tablet: sizeShape,
      desktop: sizeShape,
      widescreen: sizeShape,
      fullhd: sizeShape,
      touch: sizeShape
    })
  },
  defaultProps: {
    responsive: undefined
  },
  classnames: function classnames(props) {
    return classnames_default()(_objectSpread({}, getSizeClassFromProp(props.responsive || {})));
  },
  clean: function clean(_ref) {
    var responsive = _ref.responsive,
        hide = _ref.hide,
        props = responsives_objectWithoutProperties(_ref, ["responsive", "hide"]);

    return props;
  }
});
// CONCATENATED MODULE: ./src/modifiers/colors.js
function colors_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = colors_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function colors_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function colors_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


 // const colors = ['white', 'black', 'light', 'dark', 'primary', 'info', 'link', 'success', 'warning', 'danger', 'black-bis', 'black-ter', 'grey-darker', 'grey-dark', 'grey', 'grey-light', 'grey-lighter', 'white-ter', 'white-bis'];

/* harmony default export */ var colors = ({
  propTypes: {
    textColor: external_prop_types_default.a.string,
    backgroundColor: external_prop_types_default.a.string
  },
  defaultProps: {
    textColor: undefined,
    backgroundColor: undefined
  },
  classnames: function classnames(props) {
    var _classnames2;

    return classnames_default()((_classnames2 = {}, colors_defineProperty(_classnames2, "has-text-".concat(props.textColor), props.textColor), colors_defineProperty(_classnames2, "has-background-".concat(props.backgroundColor), props.backgroundColor), _classnames2));
  },
  clean: function clean(_ref) {
    var textColor = _ref.textColor,
        backgroundColor = _ref.backgroundColor,
        props = colors_objectWithoutProperties(_ref, ["textColor", "backgroundColor"]);

    return props;
  }
});
// CONCATENATED MODULE: ./src/modifiers/typography.js
function typography_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = typography_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function typography_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function typography_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



/* harmony default export */ var typography = ({
  propTypes: {
    textSize: external_prop_types_default.a.oneOf([1, 2, 3, 4, 5, 6]),
    textAlignment: external_prop_types_default.a.oneOf(['centered', 'justified', 'left', 'right']),
    textTransform: external_prop_types_default.a.oneOf(['capitalized', 'lowercase', 'uppercase']),
    textWeight: external_prop_types_default.a.oneOf(['light', 'normal', 'semibold', 'bold']),
    italic: external_prop_types_default.a.bool
  },
  defaultProps: {
    textSize: undefined,
    textAlignment: undefined,
    textTransform: undefined,
    italic: undefined,
    textWeight: undefined
  },
  classnames: function classnames(props) {
    var _classnames2;

    return classnames_default()((_classnames2 = {}, typography_defineProperty(_classnames2, "has-text-".concat(props.textAlignment), props.textAlignment), typography_defineProperty(_classnames2, "has-text-weight-".concat(props.textWeight), props.textWeight), typography_defineProperty(_classnames2, "is-size-".concat(props.textSize), props.textSize), typography_defineProperty(_classnames2, "is-".concat(props.textTransform), props.textTransform), typography_defineProperty(_classnames2, 'is-italic', props.italic), _classnames2));
  },
  clean: function clean(_ref) {
    var textWeight = _ref.textWeight,
        textTransform = _ref.textTransform,
        italic = _ref.italic,
        textSize = _ref.textSize,
        textAlignment = _ref.textAlignment,
        props = typography_objectWithoutProperties(_ref, ["textWeight", "textTransform", "italic", "textSize", "textAlignment"]);

    return props;
  }
});
// CONCATENATED MODULE: ./src/modifiers/index.js
function modifiers_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function modifiers_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { modifiers_ownKeys(source, true).forEach(function (key) { modifiers_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { modifiers_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function modifiers_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







var compose = function compose() {
  for (var _len = arguments.length, fns = new Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }

  return function (args) {
    return fns.reduce(function (arg, fn) {
      return fn(arg);
    }, args);
  };
};

/* harmony default export */ var modifiers = ({
  propTypes: modifiers_objectSpread({}, helpers.propTypes, {}, responsives.propTypes, {}, colors.propTypes, {}, typography.propTypes),
  defaultProps: modifiers_objectSpread({}, helpers.defaultProps, {}, responsives.defaultProps, {}, colors.defaultProps, {}, typography.defaultProps),
  classnames: function classnames(props) {
    return classnames_default()(helpers.classnames(props), responsives.classnames(props), colors.classnames(props), typography.classnames(props));
  },
  clean: function clean(props) {
    return compose(helpers.clean, responsives.clean, colors.clean, typography.clean)(props);
  }
});
// CONCATENATED MODULE: ./src/modifiers/render-as.js

var renderAsShape = external_prop_types_default.a.oneOfType([external_prop_types_default.a.string, external_prop_types_default.a.func, external_prop_types_default.a.object]);
/* harmony default export */ var render_as = (renderAsShape);
// CONCATENATED MODULE: ./src/components/element/element.js
function element_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function element_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { element_ownKeys(source, true).forEach(function (key) { element_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { element_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function element_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function element_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = element_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function element_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }







var element_Element = function Element(_ref) {
  var className = _ref.className,
      renderAs = _ref.renderAs,
      domRef = _ref.domRef,
      allProps = element_objectWithoutProperties(_ref, ["className", "renderAs", "domRef"]);

  var RenderAs = renderAs;
  var props = modifiers.clean(allProps);
  return external_react_default.a.createElement(RenderAs, _extends({
    ref: domRef,
    className: classnames_default()(className, modifiers.classnames(allProps)) || undefined
  }, props));
};

element_Element.propTypes = element_objectSpread({}, modifiers.propTypes, {
  /**
   * Reference to Dom element
   */
  domRef: external_prop_types_default.a.object,
  className: external_prop_types_default.a.string,
  renderAs: render_as
});
element_Element.defaultProps = element_objectSpread({}, modifiers.defaultProps, {
  domRef: undefined,
  className: undefined,
  style: undefined,
  renderAs: 'div'
});
/* harmony default export */ var element_element = (element_Element);
// CONCATENATED MODULE: ./src/components/element/index.js

/* harmony default export */ var components_element = (element_element);
// CONCATENATED MODULE: ./src/components/form/components/field/field-label.js
function field_label_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function field_label_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { field_label_ownKeys(source, true).forEach(function (key) { field_label_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { field_label_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function field_label_extends() { field_label_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return field_label_extends.apply(this, arguments); }

function field_label_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function field_label_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = field_label_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function field_label_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }








var field_label_FieldLabel = function FieldLabel(_ref) {
  var children = _ref.children,
      className = _ref.className,
      size = _ref.size,
      props = field_label_objectWithoutProperties(_ref, ["children", "className", "size"]);

  return external_react_default.a.createElement(components_element, field_label_extends({}, props, {
    className: classnames_default()('field-label', className, field_label_defineProperty({}, "is-".concat(size), size))
  }), children);
};

field_label_FieldLabel.propTypes = field_label_objectSpread({}, modifiers.propTypes, {
  children: external_prop_types_default.a.node,
  className: external_prop_types_default.a.string,
  style: external_prop_types_default.a.shape({}),
  renderAs: render_as,
  size: external_prop_types_default.a.oneOf(['small', 'normal', 'medium', 'large'])
});
field_label_FieldLabel.defaultProps = field_label_objectSpread({}, modifiers.defaultProps, {
  children: null,
  className: undefined,
  style: undefined,
  renderAs: 'div',
  size: undefined
});
/* harmony default export */ var field_label = (field_label_FieldLabel);
// CONCATENATED MODULE: ./src/components/form/components/field/field-body.js
function field_body_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function field_body_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { field_body_ownKeys(source, true).forEach(function (key) { field_body_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { field_body_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function field_body_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function field_body_extends() { field_body_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return field_body_extends.apply(this, arguments); }

function field_body_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = field_body_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function field_body_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }








var field_body_FieldBody = function FieldBody(_ref) {
  var children = _ref.children,
      className = _ref.className,
      props = field_body_objectWithoutProperties(_ref, ["children", "className"]);

  return external_react_default.a.createElement(components_element, field_body_extends({}, props, {
    className: classnames_default()('field-body', className, {})
  }), children);
};

field_body_FieldBody.propTypes = field_body_objectSpread({}, modifiers.propTypes, {
  children: external_prop_types_default.a.node,
  className: external_prop_types_default.a.string,
  style: external_prop_types_default.a.shape({}),
  renderAs: render_as
});
field_body_FieldBody.defaultProps = field_body_objectSpread({}, modifiers.defaultProps, {
  children: null,
  className: undefined,
  style: undefined,
  renderAs: 'div'
});
/* harmony default export */ var field_body = (field_body_FieldBody);
// CONCATENATED MODULE: ./src/components/form/components/field/field.js
function field_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function field_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { field_ownKeys(source, true).forEach(function (key) { field_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { field_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function field_extends() { field_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return field_extends.apply(this, arguments); }

function field_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function field_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = field_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function field_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }










var field_Field = function Field(_ref) {
  var _classnames;

  var className = _ref.className,
      align = _ref.align,
      multiline = _ref.multiline,
      horizontal = _ref.horizontal,
      kind = _ref.kind,
      props = field_objectWithoutProperties(_ref, ["className", "align", "multiline", "horizontal", "kind"]);

  var k = null;

  if (kind === 'addons') {
    k = 'has-addons';
  } else if (kind === 'group') {
    k = 'is-grouped';
  }

  return external_react_default.a.createElement(components_element, field_extends({}, props, {
    className: classnames_default()('field', className, (_classnames = {}, field_defineProperty(_classnames, "".concat(k), k), field_defineProperty(_classnames, "".concat(k, "-").concat(align), k && align), field_defineProperty(_classnames, "".concat(k, "-multiline"), k === 'is-grouped' && multiline), field_defineProperty(_classnames, 'is-horizontal', horizontal), _classnames))
  }));
};

field_Field.Label = field_label;
field_Field.Body = field_body;
field_Field.propTypes = field_objectSpread({}, modifiers.propTypes, {
  children: external_prop_types_default.a.node,
  className: external_prop_types_default.a.string,
  style: external_prop_types_default.a.shape({}),
  renderAs: render_as,
  align: external_prop_types_default.a.oneOf(['centered', 'right']),
  kind: external_prop_types_default.a.oneOf(['addons', 'group']),
  multiline: external_prop_types_default.a.bool,
  horizontal: external_prop_types_default.a.bool
});
field_Field.defaultProps = field_objectSpread({}, modifiers.defaultProps, {
  children: null,
  className: undefined,
  style: undefined,
  renderAs: 'div',
  align: undefined,
  kind: undefined,
  multiline: undefined,
  horizontal: undefined
});
/* harmony default export */ var field = (field_Field);
// CONCATENATED MODULE: ./src/components/form/components/field/index.js

// CONCATENATED MODULE: ./src/components/form/components/control.js
function control_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function control_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { control_ownKeys(source, true).forEach(function (key) { control_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { control_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function control_extends() { control_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return control_extends.apply(this, arguments); }

function control_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function control_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = control_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function control_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }








var control_Control = function Control(_ref) {
  var children = _ref.children,
      className = _ref.className,
      fullwidth = _ref.fullwidth,
      iconLeft = _ref.iconLeft,
      iconRight = _ref.iconRight,
      loading = _ref.loading,
      size = _ref.size,
      props = control_objectWithoutProperties(_ref, ["children", "className", "fullwidth", "iconLeft", "iconRight", "loading", "size"]);

  return external_react_default.a.createElement(components_element, control_extends({}, props, {
    className: classnames_default()('control', className, control_defineProperty({
      'is-expanded': fullwidth,
      'has-icons-left': iconLeft,
      'has-icons-right': iconRight,
      'is-loading': loading
    }, "is-".concat(size), size))
  }), children);
};

control_Control.propTypes = control_objectSpread({}, modifiers.propTypes, {
  children: external_prop_types_default.a.node,
  className: external_prop_types_default.a.string,
  style: external_prop_types_default.a.shape({}),
  renderAs: render_as,
  fullwidth: external_prop_types_default.a.bool,
  iconLeft: external_prop_types_default.a.bool,
  iconRight: external_prop_types_default.a.bool,
  loading: external_prop_types_default.a.bool,
  size: external_prop_types_default.a.oneOf(['small', 'medium', 'large'])
});
control_Control.defaultProps = control_objectSpread({}, modifiers.defaultProps, {
  children: null,
  className: undefined,
  style: undefined,
  renderAs: 'div',
  fullwidth: undefined,
  iconLeft: undefined,
  iconRight: undefined,
  loading: undefined,
  size: undefined
});
/* harmony default export */ var control = (control_Control);
// CONCATENATED MODULE: ./src/constants.js
/* harmony default export */ var constants = ({
  BREAKPOINTS: {
    DESKTOP: 'desktop',
    TABLET: 'tablet',
    MOBILE: 'mobile',
    WIDESCREEN: 'widescreen',
    FULLHD: 'fullhd',
    TOUCH: 'touch'
  },
  COLORS: {
    PRIMARY: 'primary',
    SUCCESS: 'success',
    INFO: 'info',
    WARNING: 'warning',
    DANGER: 'danger',
    LIGHT: 'light',
    DARK: 'dark',
    WHITE: 'white',
    BLACK: 'black',
    LINK: 'link'
  }
});
// CONCATENATED MODULE: ./src/components/form/components/input.js
function input_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function input_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { input_ownKeys(source, true).forEach(function (key) { input_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { input_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function input_extends() { input_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return input_extends.apply(this, arguments); }

function input_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function input_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = input_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function input_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }







var input_colors = [null].concat(Object.keys(constants.COLORS).map(function (key) {
  return constants.COLORS[key];
}));

var input_Input = function Input(_ref) {
  var _classnames;

  var className = _ref.className,
      type = _ref.type,
      size = _ref.size,
      color = _ref.color,
      readOnly = _ref.readOnly,
      isStatic = _ref.isStatic,
      disabled = _ref.disabled,
      placeholder = _ref.placeholder,
      value = _ref.value,
      name = _ref.name,
      props = input_objectWithoutProperties(_ref, ["className", "type", "size", "color", "readOnly", "isStatic", "disabled", "placeholder", "value", "name"]);

  return external_react_default.a.createElement(components_element, input_extends({}, props, {
    renderAs: "input",
    name: name,
    value: value,
    type: type,
    placeholder: placeholder,
    readOnly: readOnly || isStatic,
    disabled: disabled,
    className: classnames_default()('input', className, (_classnames = {
      'is-static': isStatic
    }, input_defineProperty(_classnames, "is-".concat(size), size), input_defineProperty(_classnames, "is-".concat(color), color), _classnames))
  }));
};

input_Input.propTypes = input_objectSpread({}, modifiers.propTypes, {
  className: external_prop_types_default.a.string,
  style: external_prop_types_default.a.shape({}),
  type: external_prop_types_default.a.oneOf(['text', 'email', 'tel', 'password', 'number', 'search', 'color', 'date', 'time', 'datetime-local']),
  size: external_prop_types_default.a.oneOf(['small', 'medium', 'large']),
  color: external_prop_types_default.a.oneOf(input_colors),
  readOnly: external_prop_types_default.a.bool,
  isStatic: external_prop_types_default.a.bool,
  disabled: external_prop_types_default.a.bool,
  placeholder: external_prop_types_default.a.string,
  value: external_prop_types_default.a.oneOfType([external_prop_types_default.a.string, external_prop_types_default.a.number]),

  /**
   * The name of the input field Commonly used for [multi-input handling](https://reactjs.org/docs/forms.html#handling-multiple-inputs)
   */
  name: external_prop_types_default.a.string
});
input_Input.defaultProps = input_objectSpread({}, modifiers.defaultProps, {
  className: undefined,
  value: '',
  style: undefined,
  type: 'text',
  size: undefined,
  color: undefined,
  readOnly: false,
  isStatic: false,
  disabled: false,
  placeholder: '',
  name: undefined
});
/* harmony default export */ var input = (input_Input);
// CONCATENATED MODULE: ./src/components/form/components/label.js
function label_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function label_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { label_ownKeys(source, true).forEach(function (key) { label_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { label_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function label_extends() { label_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return label_extends.apply(this, arguments); }

function label_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function label_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = label_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function label_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }







var label_Label = function Label(_ref) {
  var children = _ref.children,
      className = _ref.className,
      size = _ref.size,
      props = label_objectWithoutProperties(_ref, ["children", "className", "size"]);

  return external_react_default.a.createElement(components_element, label_extends({
    renderAs: "label"
  }, props, {
    className: classnames_default()('label', className, label_defineProperty({}, "is-".concat(size), size))
  }), children);
};

label_Label.propTypes = label_objectSpread({}, modifiers.propTypes, {
  children: external_prop_types_default.a.node,
  className: external_prop_types_default.a.string,
  style: external_prop_types_default.a.shape({}),
  htmlFor: external_prop_types_default.a.string,
  size: external_prop_types_default.a.oneOf(['small', 'medium', 'large'])
});
label_Label.defaultProps = label_objectSpread({}, modifiers.defaultProps, {
  children: null,
  className: undefined,
  style: undefined,
  size: undefined,
  htmlFor: undefined
});
/* harmony default export */ var components_label = (label_Label);
// CONCATENATED MODULE: ./src/components/form/components/textarea.js
function textarea_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function textarea_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { textarea_ownKeys(source, true).forEach(function (key) { textarea_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { textarea_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function textarea_extends() { textarea_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return textarea_extends.apply(this, arguments); }

function textarea_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function textarea_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = textarea_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function textarea_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }







var textarea_colors = [null].concat(Object.keys(constants.COLORS).map(function (key) {
  return constants.COLORS[key];
}));

var textarea_Textarea = function Textarea(_ref) {
  var _classnames;

  var className = _ref.className,
      size = _ref.size,
      color = _ref.color,
      readOnly = _ref.readOnly,
      disabled = _ref.disabled,
      placeholder = _ref.placeholder,
      rows = _ref.rows,
      value = _ref.value,
      name = _ref.name,
      props = textarea_objectWithoutProperties(_ref, ["className", "size", "color", "readOnly", "disabled", "placeholder", "rows", "value", "name"]);

  return external_react_default.a.createElement(components_element, textarea_extends({
    renderAs: "textarea",
    name: name
  }, props, {
    value: value,
    rows: rows,
    placeholder: placeholder,
    readOnly: readOnly,
    disabled: disabled,
    className: classnames_default()('textarea', className, (_classnames = {}, textarea_defineProperty(_classnames, "is-".concat(size), size), textarea_defineProperty(_classnames, "is-".concat(color), color), _classnames))
  }));
};

textarea_Textarea.propTypes = textarea_objectSpread({}, modifiers.propTypes, {
  className: external_prop_types_default.a.string,
  style: external_prop_types_default.a.shape({}),
  size: external_prop_types_default.a.oneOf(['small', 'medium', 'large']),
  color: external_prop_types_default.a.oneOf(textarea_colors),
  readOnly: external_prop_types_default.a.bool,
  disabled: external_prop_types_default.a.bool,
  placeholder: external_prop_types_default.a.string,
  rows: external_prop_types_default.a.number,
  value: external_prop_types_default.a.string,

  /**
   * The name of the input field Commonly used for [multi-input handling](https://reactjs.org/docs/forms.html#handling-multiple-inputs)
   */
  name: external_prop_types_default.a.string
});
textarea_Textarea.defaultProps = textarea_objectSpread({}, modifiers.defaultProps, {
  className: undefined,
  style: undefined,
  size: undefined,
  color: undefined,
  readOnly: false,
  disabled: false,
  placeholder: '',
  rows: 4,
  value: '',
  name: ''
});
/* harmony default export */ var components_textarea = (textarea_Textarea);
// CONCATENATED MODULE: ./src/components/form/components/select.js
function select_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function select_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { select_ownKeys(source, true).forEach(function (key) { select_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { select_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function select_extends() { select_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return select_extends.apply(this, arguments); }

function select_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function select_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = select_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function select_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }







var select_colors = [null].concat(Object.keys(constants.COLORS).map(function (key) {
  return constants.COLORS[key];
}));

var select_Select = function Select(_ref) {
  var _classnames;

  var className = _ref.className,
      style = _ref.style,
      size = _ref.size,
      color = _ref.color,
      loading = _ref.loading,
      readOnly = _ref.readOnly,
      disabled = _ref.disabled,
      value = _ref.value,
      multiple = _ref.multiple,
      children = _ref.children,
      name = _ref.name,
      domRef = _ref.domRef,
      props = select_objectWithoutProperties(_ref, ["className", "style", "size", "color", "loading", "readOnly", "disabled", "value", "multiple", "children", "name", "domRef"]);

  return external_react_default.a.createElement(components_element, {
    domRef: domRef,
    className: classnames_default()('select', className, (_classnames = {}, select_defineProperty(_classnames, "is-".concat(size), size), select_defineProperty(_classnames, "is-".concat(color), color), select_defineProperty(_classnames, 'is-loading', loading), select_defineProperty(_classnames, 'is-multiple', multiple), _classnames)),
    style: style
  }, external_react_default.a.createElement(components_element, select_extends({
    renderAs: "select"
  }, props, {
    multiple: multiple,
    value: value,
    readOnly: readOnly,
    disabled: disabled,
    name: name
  }), children));
};

select_Select.propTypes = select_objectSpread({}, modifiers.propTypes, {
  children: external_prop_types_default.a.node,
  className: external_prop_types_default.a.string,
  style: external_prop_types_default.a.shape({}),
  size: external_prop_types_default.a.oneOf(['small', 'medium', 'large']),
  color: external_prop_types_default.a.oneOf(select_colors),
  readOnly: external_prop_types_default.a.bool,
  disabled: external_prop_types_default.a.bool,
  multiple: external_prop_types_default.a.bool,
  loading: external_prop_types_default.a.bool,
  value: external_prop_types_default.a.oneOfType([external_prop_types_default.a.string, external_prop_types_default.a.number]),

  /**
   * The name of the input field Commonly used for [multi-input handling](https://reactjs.org/docs/forms.html#handling-multiple-inputs)
   */
  name: external_prop_types_default.a.string
});
select_Select.defaultProps = select_objectSpread({}, modifiers.defaultProps, {
  children: null,
  className: undefined,
  value: '',
  style: undefined,
  size: undefined,
  color: undefined,
  readOnly: false,
  disabled: false,
  multiple: false,
  loading: false,
  name: undefined
});
/* harmony default export */ var components_select = (select_Select);
// CONCATENATED MODULE: ./src/components/form/components/checkbox.js
function checkbox_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function checkbox_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { checkbox_ownKeys(source, true).forEach(function (key) { checkbox_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { checkbox_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function checkbox_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function checkbox_extends() { checkbox_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return checkbox_extends.apply(this, arguments); }

function checkbox_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = checkbox_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function checkbox_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }







var checkbox_Checkbox = function Checkbox(_ref) {
  var className = _ref.className,
      style = _ref.style,
      disabled = _ref.disabled,
      value = _ref.value,
      children = _ref.children,
      checked = _ref.checked,
      name = _ref.name,
      domRef = _ref.domRef,
      props = checkbox_objectWithoutProperties(_ref, ["className", "style", "disabled", "value", "children", "checked", "name", "domRef"]);

  return external_react_default.a.createElement(components_element, {
    renderAs: "label",
    domRef: domRef,
    disabled: disabled,
    className: classnames_default()('checkbox', className),
    style: style
  }, external_react_default.a.createElement(components_element, checkbox_extends({}, props, {
    renderAs: "input",
    name: name,
    type: "checkbox",
    value: value,
    disabled: disabled,
    checked: checked
  })), children);
};

checkbox_Checkbox.propTypes = checkbox_objectSpread({}, modifiers.propTypes, {
  children: external_prop_types_default.a.node,
  className: external_prop_types_default.a.string,
  style: external_prop_types_default.a.shape({}),
  disabled: external_prop_types_default.a.bool,
  value: external_prop_types_default.a.string,
  checked: external_prop_types_default.a.bool,

  /**
   * The name of the input field Commonly used for [multi-input handling](https://reactjs.org/docs/forms.html#handling-multiple-inputs)
   */
  name: external_prop_types_default.a.string
});
checkbox_Checkbox.defaultProps = checkbox_objectSpread({}, modifiers.defaultProps, {
  children: null,
  className: undefined,
  value: undefined,
  style: undefined,
  disabled: undefined,
  checked: undefined,
  name: undefined
});
/* harmony default export */ var components_checkbox = (checkbox_Checkbox);
// CONCATENATED MODULE: ./src/components/form/components/radio.js
function radio_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function radio_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { radio_ownKeys(source, true).forEach(function (key) { radio_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { radio_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function radio_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function radio_extends() { radio_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return radio_extends.apply(this, arguments); }

function radio_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = radio_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function radio_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }







var radio_Radio = function Radio(_ref) {
  var className = _ref.className,
      style = _ref.style,
      disabled = _ref.disabled,
      checked = _ref.checked,
      value = _ref.value,
      name = _ref.name,
      children = _ref.children,
      domRef = _ref.domRef,
      props = radio_objectWithoutProperties(_ref, ["className", "style", "disabled", "checked", "value", "name", "children", "domRef"]);

  return external_react_default.a.createElement(components_element, {
    renderAs: "label",
    domRef: domRef,
    disabled: disabled,
    className: classnames_default()('radio', className),
    style: style
  }, external_react_default.a.createElement(components_element, radio_extends({
    renderAs: "input"
  }, props, {
    name: name,
    checked: checked,
    type: "radio",
    value: value,
    disabled: disabled
  })), children);
};

radio_Radio.propTypes = radio_objectSpread({}, modifiers.propTypes, {
  children: external_prop_types_default.a.node,
  className: external_prop_types_default.a.string,

  /**
   * The name of the input field Commonly used for [multi-input handling](https://reactjs.org/docs/forms.html#handling-multiple-inputs)
   */
  name: external_prop_types_default.a.string.isRequired,
  style: external_prop_types_default.a.shape({}),
  disabled: external_prop_types_default.a.bool,
  checked: external_prop_types_default.a.bool,
  value: external_prop_types_default.a.string
});
radio_Radio.defaultProps = radio_objectSpread({}, modifiers.defaultProps, {
  children: null,
  className: undefined,
  value: '',
  style: undefined,
  disabled: false,
  checked: false
});
/* harmony default export */ var components_radio = (radio_Radio);
// CONCATENATED MODULE: ./src/components/form/components/help.js
function help_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function help_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { help_ownKeys(source, true).forEach(function (key) { help_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { help_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function help_extends() { help_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return help_extends.apply(this, arguments); }

function help_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function help_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = help_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function help_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }







var help_colors = [null].concat(Object.keys(constants.COLORS).map(function (key) {
  return constants.COLORS[key];
}));

var help_Help = function Help(_ref) {
  var className = _ref.className,
      children = _ref.children,
      color = _ref.color,
      props = help_objectWithoutProperties(_ref, ["className", "children", "color"]);

  return external_react_default.a.createElement(components_element, help_extends({}, props, {
    className: classnames_default()('help', className, help_defineProperty({}, "is-".concat(color), color))
  }), children);
};

help_Help.propTypes = help_objectSpread({}, modifiers.propTypes, {
  className: external_prop_types_default.a.string,
  color: external_prop_types_default.a.oneOf(help_colors),
  children: external_prop_types_default.a.node
});
help_Help.defaultProps = help_objectSpread({}, modifiers.defaultProps, {
  children: null,
  className: undefined,
  color: undefined,
  renderAs: 'p'
});
/* harmony default export */ var help = (help_Help);
// CONCATENATED MODULE: ./src/components/form/components/input-file.js
function input_file_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function input_file_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { input_file_ownKeys(source, true).forEach(function (key) { input_file_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { input_file_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function input_file_extends() { input_file_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return input_file_extends.apply(this, arguments); }

function input_file_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = input_file_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function input_file_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function input_file_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







var input_file_colors = [null].concat(Object.keys(constants.COLORS).map(function (key) {
  return constants.COLORS[key];
}));

var input_file_InputFile =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(InputFile, _PureComponent);

  function InputFile(props) {
    var _this;

    _classCallCheck(this, InputFile);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(InputFile).call(this, props));

    input_file_defineProperty(_assertThisInitialized(_this), "select", function (event) {
      var files = event.target.files;

      _this.setState({
        filename: files.length > 0 ? files[0].name : undefined
      });

      if (_this.props.onChange) {
        _this.props.onChange(event);
      }
    });

    _this.state = {
      filename: undefined
    };
    return _this;
  }

  _createClass(InputFile, [{
    key: "render",
    value: function render() {
      var _classnames;

      var _this$props = this.props,
          className = _this$props.className,
          style = _this$props.style,
          onChange = _this$props.onChange,
          color = _this$props.color,
          size = _this$props.size,
          fileName = _this$props.fileName,
          fullwidth = _this$props.fullwidth,
          right = _this$props.right,
          boxed = _this$props.boxed,
          name = _this$props.name,
          label = _this$props.label,
          icon = _this$props.icon,
          inputProps = _this$props.inputProps,
          props = input_file_objectWithoutProperties(_this$props, ["className", "style", "onChange", "color", "size", "fileName", "fullwidth", "right", "boxed", "name", "label", "icon", "inputProps"]);

      var filename = this.state.filename;
      return external_react_default.a.createElement(components_element, input_file_extends({
        style: style
      }, props, {
        className: classnames_default()('file', className, (_classnames = {}, input_file_defineProperty(_classnames, "is-".concat(size), size), input_file_defineProperty(_classnames, "is-".concat(color), color), input_file_defineProperty(_classnames, 'has-name', !fileName), input_file_defineProperty(_classnames, 'is-right', right), input_file_defineProperty(_classnames, 'is-boxed', boxed), input_file_defineProperty(_classnames, 'is-fullwidth', fullwidth), _classnames))
      }), external_react_default.a.createElement("label", {
        className: "file-label"
      }, external_react_default.a.createElement("input", input_file_extends({}, inputProps, {
        name: name,
        type: "file",
        className: "file-input",
        onChange: this.select
      })), external_react_default.a.createElement("span", {
        className: "file-cta"
      }, icon && external_react_default.a.createElement("span", {
        className: "file-icon"
      }, icon), external_react_default.a.createElement("span", {
        className: "file-label"
      }, label)), fileName && filename && external_react_default.a.createElement("span", {
        className: "file-name"
      }, filename)));
    }
  }]);

  return InputFile;
}(external_react_["PureComponent"]);


input_file_InputFile.propTypes = input_file_objectSpread({}, modifiers.propTypes, {
  className: external_prop_types_default.a.string,
  style: external_prop_types_default.a.shape({}),
  onChange: external_prop_types_default.a.func,
  color: external_prop_types_default.a.oneOf(input_file_colors),
  size: external_prop_types_default.a.oneOf(['small', 'medium', 'large']),
  fileName: external_prop_types_default.a.bool,
  fullwidth: external_prop_types_default.a.bool,
  right: external_prop_types_default.a.bool,
  boxed: external_prop_types_default.a.bool,

  /**
   * The name of the input field Commonly used for [multi-input handling](https://reactjs.org/docs/forms.html#handling-multiple-inputs)
   */
  name: external_prop_types_default.a.string,
  label: external_prop_types_default.a.string,
  icon: external_prop_types_default.a.element,
  inputProps: external_prop_types_default.a.shape({
    accept: external_prop_types_default.a.string,
    capture: external_prop_types_default.a.string,
    multiple: external_prop_types_default.a.bool
  })
});
input_file_InputFile.defaultProps = input_file_objectSpread({}, modifiers.defaultProps, {
  className: undefined,
  style: undefined,
  onChange: function onChange() {},
  color: undefined,
  size: undefined,
  fileName: true,
  fullwidth: undefined,
  right: undefined,
  boxed: undefined,
  name: undefined,
  icon: undefined,
  label: 'Choose a file...',
  inputProps: {
    accept: undefined,
    capture: undefined,
    multiple: undefined
  }
});
// CONCATENATED MODULE: ./src/components/form/index.js











// CONCATENATED MODULE: ./src/components/box/box.js
function box_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function box_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { box_ownKeys(source, true).forEach(function (key) { box_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { box_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function box_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function box_extends() { box_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return box_extends.apply(this, arguments); }

function box_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = box_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function box_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }








var box_Box = function Box(_ref) {
  var children = _ref.children,
      className = _ref.className,
      props = box_objectWithoutProperties(_ref, ["children", "className"]);

  return external_react_default.a.createElement(components_element, box_extends({}, props, {
    className: classnames_default()('box', className)
  }), children);
};

box_Box.propTypes = box_objectSpread({}, modifiers.propTypes, {
  children: external_prop_types_default.a.node,
  className: external_prop_types_default.a.string,
  style: external_prop_types_default.a.shape({}),
  renderAs: render_as
});
box_Box.defaultProps = box_objectSpread({}, modifiers.defaultProps, {
  children: null,
  className: undefined,
  style: undefined,
  renderAs: 'div'
});
/* harmony default export */ var box = (box_Box);
// EXTERNAL MODULE: ./src/components/box/box.sass
var box_box = __webpack_require__(7);

// CONCATENATED MODULE: ./src/components/box/index.js


/* harmony default export */ var components_box = (box);
// EXTERNAL MODULE: ./src/components/button/button.sass
var button_button = __webpack_require__(8);

// CONCATENATED MODULE: ./src/components/button/components/button-group.js
function button_group_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function button_group_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { button_group_ownKeys(source, true).forEach(function (key) { button_group_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { button_group_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function button_group_extends() { button_group_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return button_group_extends.apply(this, arguments); }

function button_group_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function button_group_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = button_group_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function button_group_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }








var button_group_ButtonGroup = function ButtonGroup(_ref) {
  var _classnames;

  var children = _ref.children,
      className = _ref.className,
      hasAddons = _ref.hasAddons,
      position = _ref.position,
      size = _ref.size,
      props = button_group_objectWithoutProperties(_ref, ["children", "className", "hasAddons", "position", "size"]);

  return external_react_default.a.createElement(components_element, button_group_extends({}, props, {
    className: classnames_default()('buttons', className, (_classnames = {
      'has-addons': hasAddons
    }, button_group_defineProperty(_classnames, "is-".concat([position]), position), button_group_defineProperty(_classnames, "are-".concat(size), size), _classnames))
  }), children);
};

button_group_ButtonGroup.propTypes = button_group_objectSpread({}, modifiers.propTypes, {
  className: external_prop_types_default.a.string,
  hasAddons: external_prop_types_default.a.bool,
  size: external_prop_types_default.a.string,
  position: external_prop_types_default.a.oneOf(['centered', 'right']),
  renderAs: render_as
});
button_group_ButtonGroup.defaultProps = button_group_objectSpread({}, modifiers.defaultProps, {
  className: undefined,
  hasAddons: undefined,
  position: undefined,
  size: undefined,
  renderAs: 'div'
});
/* harmony default export */ var button_group = (button_group_ButtonGroup);
// CONCATENATED MODULE: ./src/components/button/button.js
function button_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function button_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { button_ownKeys(source, true).forEach(function (key) { button_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { button_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function button_extends() { button_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return button_extends.apply(this, arguments); }

function button_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function button_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = button_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function button_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }









var button_colors = [null, ''].concat(Object.keys(constants.COLORS).map(function (key) {
  return constants.COLORS[key];
}));

var button_Button = function Button(_ref) {
  var _classnames;

  var children = _ref.children,
      className = _ref.className,
      renderAs = _ref.renderAs,
      color = _ref.color,
      size = _ref.size,
      outlined = _ref.outlined,
      inverted = _ref.inverted,
      state = _ref.state,
      submit = _ref.submit,
      reset = _ref.reset,
      fullwidth = _ref.fullwidth,
      loading = _ref.loading,
      disabled = _ref.disabled,
      remove = _ref.remove,
      isSelected = _ref.isSelected,
      isStatic = _ref.isStatic,
      rounded = _ref.rounded,
      onClick = _ref.onClick,
      text = _ref.text,
      props = button_objectWithoutProperties(_ref, ["children", "className", "renderAs", "color", "size", "outlined", "inverted", "state", "submit", "reset", "fullwidth", "loading", "disabled", "remove", "isSelected", "isStatic", "rounded", "onClick", "text"]);

  // let Element = isStatic ? 'span' : renderAs;
  var otherProps = {};

  if (submit) {
    otherProps = {
      type: 'submit',
      renderAs: renderAs || 'button'
    };
  }

  if (reset) {
    otherProps = {
      type: 'reset',
      renderAs: renderAs || 'button'
    };
  }

  if (isStatic) {
    otherProps = {
      renderAs: 'span'
    };
  }

  return external_react_default.a.createElement(components_element, button_extends({
    tabIndex: disabled ? -1 : 0,
    renderAs: renderAs
  }, props, otherProps, {
    disabled: disabled,
    onClick: disabled ? undefined : onClick,
    className: classnames_default()(className, (_classnames = {}, button_defineProperty(_classnames, "is-".concat(color), color), button_defineProperty(_classnames, "is-".concat(size), size), button_defineProperty(_classnames, "is-".concat(state), state), button_defineProperty(_classnames, 'is-selected', isSelected), button_defineProperty(_classnames, 'is-static', isStatic), button_defineProperty(_classnames, 'is-rounded', rounded), button_defineProperty(_classnames, 'is-outlined', outlined), button_defineProperty(_classnames, 'is-inverted', inverted), button_defineProperty(_classnames, 'is-fullwidth', fullwidth), button_defineProperty(_classnames, 'is-loading', loading), button_defineProperty(_classnames, 'is-text', text), button_defineProperty(_classnames, "delete", remove), button_defineProperty(_classnames, "button", !remove), _classnames))
  }), children);
};

button_Button.Group = button_group;
button_Button.propTypes = button_objectSpread({}, modifiers.propTypes, {
  children: external_prop_types_default.a.node,
  className: external_prop_types_default.a.string,
  style: external_prop_types_default.a.shape({}),
  renderAs: render_as,
  onClick: external_prop_types_default.a.func,
  color: external_prop_types_default.a.oneOf(button_colors),
  size: external_prop_types_default.a.oneOf(['small', 'medium', 'large']),
  state: external_prop_types_default.a.oneOf(['hover', 'focus', 'active', 'loading']),
  outlined: external_prop_types_default.a.bool,
  inverted: external_prop_types_default.a.bool,
  submit: external_prop_types_default.a.bool,
  reset: external_prop_types_default.a.bool,
  loading: external_prop_types_default.a.bool,
  fullwidth: external_prop_types_default.a.bool,
  disabled: external_prop_types_default.a.bool,
  remove: external_prop_types_default.a.bool,
  isSelected: external_prop_types_default.a.bool,
  isStatic: external_prop_types_default.a.bool,
  rounded: external_prop_types_default.a.bool,
  text: external_prop_types_default.a.bool
});
button_Button.defaultProps = button_objectSpread({}, modifiers.defaultProps, {
  children: null,
  className: undefined,
  style: undefined,
  renderAs: 'button',
  onClick: function onClick() {
    return null;
  },
  color: undefined,
  size: undefined,
  state: undefined,
  outlined: false,
  inverted: false,
  submit: false,
  reset: false,
  fullwidth: false,
  loading: false,
  disabled: false,
  remove: false,
  isSelected: false,
  isStatic: false,
  rounded: false,
  text: false
});
/* harmony default export */ var components_button_button = (button_Button);
// CONCATENATED MODULE: ./src/components/button/index.js


// CONCATENATED MODULE: ./src/components/breadcrumb/breadcrumb.js
function breadcrumb_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function breadcrumb_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { breadcrumb_ownKeys(source, true).forEach(function (key) { breadcrumb_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { breadcrumb_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function breadcrumb_extends() { breadcrumb_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return breadcrumb_extends.apply(this, arguments); }

function breadcrumb_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function breadcrumb_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = breadcrumb_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function breadcrumb_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }








var breadcrumb_Breadcrumb = function Breadcrumb(_ref) {
  var _classnames;

  var className = _ref.className,
      items = _ref.items,
      renderAs = _ref.renderAs,
      hrefAttr = _ref.hrefAttr,
      separator = _ref.separator,
      size = _ref.size,
      align = _ref.align,
      props = breadcrumb_objectWithoutProperties(_ref, ["className", "items", "renderAs", "hrefAttr", "separator", "size", "align"]);

  return external_react_default.a.createElement(components_element, breadcrumb_extends({
    renderAs: "nav"
  }, props, {
    className: classnames_default()('breadcrumb', className, (_classnames = {}, breadcrumb_defineProperty(_classnames, "has-".concat(separator, "-separator"), separator), breadcrumb_defineProperty(_classnames, "is-".concat(size), size), breadcrumb_defineProperty(_classnames, "is-".concat(align), align), _classnames))
  }), external_react_default.a.createElement("ul", null, items.map(function (item) {
    var p = breadcrumb_defineProperty({
      renderAs: renderAs
    }, hrefAttr, item.url);

    return external_react_default.a.createElement("li", {
      key: item.url,
      className: classnames_default()({
        'is-active': item.active
      })
    }, external_react_default.a.createElement(components_element, p, item.name));
  })));
};

breadcrumb_Breadcrumb.propTypes = breadcrumb_objectSpread({}, modifiers.propTypes, {
  className: external_prop_types_default.a.string,
  style: external_prop_types_default.a.shape({}),
  separator: external_prop_types_default.a.oneOf(['arrow', 'bullet', 'dot', 'succeeds']),
  size: external_prop_types_default.a.oneOf(['small', 'medium', 'large']),
  align: external_prop_types_default.a.oneOf(['right', 'center']),
  items: external_prop_types_default.a.arrayOf(external_prop_types_default.a.shape({
    url: external_prop_types_default.a.string.isRequired,
    active: external_prop_types_default.a.bool,
    name: external_prop_types_default.a.node
  })),
  renderAs: render_as,
  hrefAttr: external_prop_types_default.a.string
});
breadcrumb_Breadcrumb.defaultProps = breadcrumb_objectSpread({}, modifiers.defaultProps, {
  items: [],
  hrefAttr: 'href',
  separator: undefined,
  renderAs: 'a',
  className: undefined,
  style: undefined,
  size: undefined,
  align: undefined
});
/* harmony default export */ var breadcrumb = (breadcrumb_Breadcrumb);
// EXTERNAL MODULE: ./src/components/breadcrumb/breadcrumb.sass
var breadcrumb_breadcrumb = __webpack_require__(9);

// CONCATENATED MODULE: ./src/components/breadcrumb/index.js


/* harmony default export */ var components_breadcrumb = (breadcrumb);
// EXTERNAL MODULE: ./src/components/card/card.sass
var card = __webpack_require__(10);

// EXTERNAL MODULE: ./src/components/image/image.sass
var image_image = __webpack_require__(11);

// CONCATENATED MODULE: ./src/components/image/constants.js
/* harmony default export */ var image_constants = ({
  SIZES: [16, 24, 32, 48, 64, 96, 128, 'square', '1by1', '4by3', '3by2', '16by9', '2by1', '5by4', '5by3', '3by1', '4by5', '3by4', '2by3', '3by5', '9by16', '1by2', '1by3']
});
// CONCATENATED MODULE: ./src/components/image/image.js
function image_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function image_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { image_ownKeys(source, true).forEach(function (key) { image_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { image_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function image_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { image_typeof = function _typeof(obj) { return typeof obj; }; } else { image_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return image_typeof(obj); }

function image_extends() { image_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return image_extends.apply(this, arguments); }

function image_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = image_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function image_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function image_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function image_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function image_createClass(Constructor, protoProps, staticProps) { if (protoProps) image_defineProperties(Constructor.prototype, protoProps); if (staticProps) image_defineProperties(Constructor, staticProps); return Constructor; }

function image_possibleConstructorReturn(self, call) { if (call && (image_typeof(call) === "object" || typeof call === "function")) { return call; } return image_assertThisInitialized(self); }

function image_getPrototypeOf(o) { image_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return image_getPrototypeOf(o); }

function image_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function image_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) image_setPrototypeOf(subClass, superClass); }

function image_setPrototypeOf(o, p) { image_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return image_setPrototypeOf(o, p); }

function image_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








var image_Image =
/*#__PURE__*/
function (_PureComponent) {
  image_inherits(Image, _PureComponent);

  function Image(props) {
    var _this;

    image_classCallCheck(this, Image);

    _this = image_possibleConstructorReturn(this, image_getPrototypeOf(Image).call(this, props));

    image_defineProperty(image_assertThisInitialized(_this), "onError", function () {
      _this.setState({
        src: _this.props.fallback
      });
    });

    _this.state = {};
    return _this;
  }

  image_createClass(Image, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          className = _this$props.className,
          alt = _this$props.alt,
          size = _this$props.size,
          fallback = _this$props.fallback,
          rounded = _this$props.rounded,
          src = _this$props.src,
          props = image_objectWithoutProperties(_this$props, ["className", "alt", "size", "fallback", "rounded", "src"]);

      var s = size;

      if (typeof size === 'number') {
        s = "".concat(s, "x").concat(s);
      }

      return external_react_default.a.createElement(components_element, image_extends({}, props, {
        renderAs: "figure",
        className: classnames_default()('image', className, image_defineProperty({}, "is-".concat(s), s))
      }), external_react_default.a.createElement("img", {
        className: classnames_default()({
          'is-rounded': rounded
        }),
        onError: this.onError,
        src: this.state.src,
        alt: alt
      }));
    }
  }]);

  return Image;
}(external_react_["PureComponent"]);

image_defineProperty(image_Image, "getDerivedStateFromProps", function (props, state) {
  return {
    src: state.default !== props.src ? props.src : state.src,
    default: props.src
  };
});


image_Image.propTypes = image_objectSpread({}, modifiers.propTypes, {
  className: external_prop_types_default.a.string,
  src: external_prop_types_default.a.string,
  alt: external_prop_types_default.a.string,
  rounded: external_prop_types_default.a.bool,
  style: external_prop_types_default.a.shape({}),
  size: external_prop_types_default.a.oneOf(image_constants.SIZES),
  fallback: external_prop_types_default.a.string
});
image_Image.defaultProps = image_objectSpread({}, modifiers.defaultProps, {
  className: undefined,
  src: '',
  alt: '',
  rounded: false,
  style: undefined,
  size: undefined,
  fallback: 'https://bulma.io/images/placeholders/480x480.png'
});
// CONCATENATED MODULE: ./src/components/image/index.js


// CONCATENATED MODULE: ./src/components/card/components/image.js
function components_image_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function components_image_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { components_image_ownKeys(source, true).forEach(function (key) { components_image_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { components_image_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function components_image_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function components_image_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = components_image_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function components_image_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }







var image_CardImage = function CardImage(_ref) {
  var className = _ref.className,
      domRef = _ref.domRef,
      props = components_image_objectWithoutProperties(_ref, ["className", "domRef"]);

  return external_react_default.a.createElement(components_element, {
    domRef: domRef,
    className: classnames_default()('card-image', className)
  }, external_react_default.a.createElement(image_Image, props));
};

image_CardImage.propTypes = components_image_objectSpread({}, modifiers.propTypes, {}, image_Image.propTypes);
image_CardImage.defaultProps = components_image_objectSpread({}, modifiers.defaultProps, {}, image_Image.defaultProps);
/* harmony default export */ var components_image = (image_CardImage);
// CONCATENATED MODULE: ./src/components/card/components/content.js
function content_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function content_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { content_ownKeys(source, true).forEach(function (key) { content_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { content_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function content_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function content_extends() { content_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return content_extends.apply(this, arguments); }

function content_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = content_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function content_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }








var content_CardContent = function CardContent(_ref) {
  var className = _ref.className,
      props = content_objectWithoutProperties(_ref, ["className"]);

  return external_react_default.a.createElement(components_element, content_extends({}, props, {
    className: classnames_default()('card-content', className)
  }));
};

content_CardContent.propTypes = content_objectSpread({}, modifiers.propTypes, {
  className: external_prop_types_default.a.string,
  renderAs: render_as
});
content_CardContent.defaultProps = content_objectSpread({}, modifiers.defaultProps, {
  className: undefined,
  renderAs: 'div'
});
/* harmony default export */ var content = (content_CardContent);
// CONCATENATED MODULE: ./src/components/card/components/header/components/header-title.js
function header_title_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function header_title_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { header_title_ownKeys(source, true).forEach(function (key) { header_title_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { header_title_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function header_title_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function header_title_extends() { header_title_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return header_title_extends.apply(this, arguments); }

function header_title_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = header_title_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function header_title_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }








var header_title_CardHeaderTitle = function CardHeaderTitle(_ref) {
  var className = _ref.className,
      props = header_title_objectWithoutProperties(_ref, ["className"]);

  return external_react_default.a.createElement(components_element, header_title_extends({}, props, {
    className: classnames_default()('card-header-title', className)
  }));
};

header_title_CardHeaderTitle.propTypes = header_title_objectSpread({}, modifiers.propTypes, {
  className: external_prop_types_default.a.string,
  renderAs: render_as
});
header_title_CardHeaderTitle.defaultProps = header_title_objectSpread({}, modifiers.defaultProps, {
  className: undefined,
  renderAs: 'div'
});
/* harmony default export */ var header_title = (header_title_CardHeaderTitle);
// CONCATENATED MODULE: ./src/components/card/components/header/components/header-icon.js
function header_icon_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function header_icon_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { header_icon_ownKeys(source, true).forEach(function (key) { header_icon_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { header_icon_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function header_icon_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function header_icon_extends() { header_icon_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return header_icon_extends.apply(this, arguments); }

function header_icon_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = header_icon_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function header_icon_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }








var header_icon_CardHeaderIcon = function CardHeaderIcon(_ref) {
  var className = _ref.className,
      props = header_icon_objectWithoutProperties(_ref, ["className"]);

  return external_react_default.a.createElement(components_element, header_icon_extends({}, props, {
    className: classnames_default()('card-header-icon', className)
  }));
};

header_icon_CardHeaderIcon.propTypes = header_icon_objectSpread({}, modifiers.propTypes, {
  className: external_prop_types_default.a.string,
  renderAs: render_as
});
header_icon_CardHeaderIcon.defaultProps = header_icon_objectSpread({}, modifiers.defaultProps, {
  className: undefined,
  renderAs: 'div'
});
/* harmony default export */ var header_icon = (header_icon_CardHeaderIcon);
// CONCATENATED MODULE: ./src/components/card/components/header/header.js
function header_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function header_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { header_ownKeys(source, true).forEach(function (key) { header_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { header_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function header_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function header_extends() { header_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return header_extends.apply(this, arguments); }

function header_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = header_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function header_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }










var header_CardHeader = function CardHeader(_ref) {
  var className = _ref.className,
      props = header_objectWithoutProperties(_ref, ["className"]);

  return external_react_default.a.createElement(components_element, header_extends({}, props, {
    className: classnames_default()('card-header', className)
  }));
};

header_CardHeader.Title = header_title;
header_CardHeader.Icon = header_icon;
header_CardHeader.propTypes = header_objectSpread({}, modifiers.propTypes, {
  className: external_prop_types_default.a.string,
  renderAs: render_as
});
header_CardHeader.defaultProps = header_objectSpread({}, modifiers.defaultProps, {
  className: undefined,
  renderAs: 'div'
});
/* harmony default export */ var header = (header_CardHeader);
// CONCATENATED MODULE: ./src/components/card/components/header/index.js

// CONCATENATED MODULE: ./src/components/card/components/footer/components/footer-item.js
function footer_item_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function footer_item_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { footer_item_ownKeys(source, true).forEach(function (key) { footer_item_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { footer_item_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function footer_item_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function footer_item_extends() { footer_item_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return footer_item_extends.apply(this, arguments); }

function footer_item_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = footer_item_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function footer_item_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }








var footer_item_CardFooterItem = function CardFooterItem(_ref) {
  var className = _ref.className,
      props = footer_item_objectWithoutProperties(_ref, ["className"]);

  return external_react_default.a.createElement(components_element, footer_item_extends({}, props, {
    className: classnames_default()('card-footer-item', className)
  }));
};

footer_item_CardFooterItem.propTypes = footer_item_objectSpread({}, modifiers.propTypes, {
  className: external_prop_types_default.a.string,
  renderAs: render_as
});
footer_item_CardFooterItem.defaultProps = footer_item_objectSpread({}, modifiers.defaultProps, {
  className: undefined,
  renderAs: 'div'
});
/* harmony default export */ var footer_item = (footer_item_CardFooterItem);
// CONCATENATED MODULE: ./src/components/card/components/footer/footer.js
function footer_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function footer_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { footer_ownKeys(source, true).forEach(function (key) { footer_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { footer_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function footer_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function footer_extends() { footer_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return footer_extends.apply(this, arguments); }

function footer_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = footer_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function footer_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }









var footer_CardFooter = function CardFooter(_ref) {
  var className = _ref.className,
      props = footer_objectWithoutProperties(_ref, ["className"]);

  return external_react_default.a.createElement(components_element, footer_extends({}, props, {
    className: classnames_default()('card-footer', className)
  }));
};

footer_CardFooter.Item = footer_item;
footer_CardFooter.propTypes = footer_objectSpread({}, modifiers.propTypes, {
  className: external_prop_types_default.a.string,
  renderAs: render_as
});
footer_CardFooter.defaultProps = footer_objectSpread({}, modifiers.defaultProps, {
  className: undefined,
  renderAs: 'div'
});
/* harmony default export */ var footer = (footer_CardFooter);
// CONCATENATED MODULE: ./src/components/card/components/footer/index.js

// CONCATENATED MODULE: ./src/components/card/card.js
function card_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function card_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { card_ownKeys(source, true).forEach(function (key) { card_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { card_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function card_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function card_extends() { card_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return card_extends.apply(this, arguments); }

function card_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = card_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function card_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }












var card_Card = function Card(_ref) {
  var className = _ref.className,
      children = _ref.children,
      props = card_objectWithoutProperties(_ref, ["className", "children"]);

  return external_react_default.a.createElement(components_element, card_extends({
    className: classnames_default()('card', className)
  }, props), children);
};

card_Card.Image = components_image;
card_Card.Content = content;
card_Card.Header = header;
card_Card.Footer = footer;
card_Card.propTypes = card_objectSpread({}, modifiers.propTypes, {
  className: external_prop_types_default.a.string,
  children: external_prop_types_default.a.node,
  style: external_prop_types_default.a.shape({}),
  renderAs: render_as
});
card_Card.defaultProps = card_objectSpread({}, modifiers.defaultProps, {
  className: undefined,
  children: null,
  style: undefined,
  renderAs: 'div'
});
/* harmony default export */ var card_card = (card_Card);
// CONCATENATED MODULE: ./src/components/card/index.js


// CONCATENATED MODULE: ./src/components/columns/constants.js
/* harmony default export */ var columns_constants = ({
  SIZES: {
    THREEQUARTERS: 'three-quarters',
    TWOTHIRDS: 'two-thirds',
    HALF: 'half',
    ONETHIRD: 'one-third',
    ONEQUARTER: 'one-quarter',
    ONEFIFTH: 'one-fifth',
    TWOFIFTHS: 'two-fifths',
    THREEFIFTHS: 'three-fifths',
    FOURFIFTHS: 'four-fifths'
  }
});
// CONCATENATED MODULE: ./src/components/columns/components/column.js
function column_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function column_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { column_ownKeys(source, true).forEach(function (key) { column_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { column_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function column_extends() { column_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return column_extends.apply(this, arguments); }

function column_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function column_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = column_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function column_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }







var sizes = [null, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].concat(Object.keys(columns_constants.SIZES).map(function (key) {
  return columns_constants.SIZES[key];
}));

var column_Column = function Column(_ref) {
  var _classNames;

  var children = _ref.children,
      className = _ref.className,
      size = _ref.size,
      offset = _ref.offset,
      narrow = _ref.narrow,
      mobile = _ref.mobile,
      tablet = _ref.tablet,
      desktop = _ref.desktop,
      widescreen = _ref.widescreen,
      fullhd = _ref.fullhd,
      touch = _ref.touch,
      props = column_objectWithoutProperties(_ref, ["children", "className", "size", "offset", "narrow", "mobile", "tablet", "desktop", "widescreen", "fullhd", "touch"]);

  return external_react_default.a.createElement(components_element, column_extends({}, props, {
    className: classnames_default()(className, 'column', (_classNames = {}, column_defineProperty(_classNames, "is-".concat(size), size), column_defineProperty(_classNames, "is-".concat(touch.size, "-mobile"), touch.size), column_defineProperty(_classNames, "is-".concat(mobile.size, "-mobile"), mobile.size), column_defineProperty(_classNames, "is-".concat(tablet.size, "-tablet"), tablet.size), column_defineProperty(_classNames, "is-".concat(desktop.size, "-desktop"), desktop.size), column_defineProperty(_classNames, "is-".concat(widescreen.size, "-widescreen"), widescreen.size), column_defineProperty(_classNames, "is-".concat(fullhd.size, "-fullhd"), fullhd.size), column_defineProperty(_classNames, "is-offset-".concat(touch.offset, "-mobile"), touch.offset), column_defineProperty(_classNames, "is-offset-".concat(mobile.offset, "-mobile"), mobile.offset), column_defineProperty(_classNames, "is-offset-".concat(tablet.offset, "-tablet"), tablet.offset), column_defineProperty(_classNames, "is-offset-".concat(desktop.offset, "-desktop"), desktop.offset), column_defineProperty(_classNames, "is-offset-".concat(widescreen.offset, "-widescreen"), widescreen.offset), column_defineProperty(_classNames, "is-offset-".concat(fullhd.offset, "-fullhd"), fullhd.offset), column_defineProperty(_classNames, "is-offset-".concat(offset), offset), column_defineProperty(_classNames, 'is-narrow', narrow), column_defineProperty(_classNames, 'is-narrow-touch', touch.narrow), column_defineProperty(_classNames, 'is-narrow-mobile', mobile.narrow), column_defineProperty(_classNames, 'is-narrow-tablet', tablet.narrow), column_defineProperty(_classNames, 'is-narrow-desktop', desktop.narrow), column_defineProperty(_classNames, 'is-narrow-widescreen', widescreen.narrow), column_defineProperty(_classNames, 'is-narrow-fullhd', fullhd.narrow), _classNames))
  }), children);
};

column_Column.propTypes = column_objectSpread({}, modifiers.propTypes, {
  children: external_prop_types_default.a.node,
  className: external_prop_types_default.a.string,
  style: external_prop_types_default.a.shape({}),

  /**
   * The size of the column. the maximum size of a row is 12
   */
  size: external_prop_types_default.a.oneOf(sizes),

  /**
   * Create horizontal space around Column elements
   */
  offset: external_prop_types_default.a.oneOf(sizes),

  /**
   * If you want a column to only take the space it needs, use the narrow modifier. The other column(s) will fill up the remaining space.
   */
  narrow: external_prop_types_default.a.bool,

  /**
   * Size, Offset and Narrow props for Mobile devices (Up to 768px)
   */
  touch: external_prop_types_default.a.shape({
    size: external_prop_types_default.a.oneOf(sizes),
    offset: external_prop_types_default.a.oneOf(sizes),
    narrow: external_prop_types_default.a.bool
  }),

  /**
   * Size, Offset and Narrow props for Mobile devices (Up to 768px)
   */
  mobile: external_prop_types_default.a.shape({
    size: external_prop_types_default.a.oneOf(sizes),
    offset: external_prop_types_default.a.oneOf(sizes),
    narrow: external_prop_types_default.a.bool
  }),

  /**
   * Size, Offset and Narrow props for Tablet devices (Between 769px and 1023px)
   */
  tablet: external_prop_types_default.a.shape({
    size: external_prop_types_default.a.oneOf(sizes),
    offset: external_prop_types_default.a.oneOf(sizes),
    narrow: external_prop_types_default.a.bool
  }),

  /**
   * Size, Offset and Narrow props for Desktop devices (Between 1024px and 1215px)
   */
  desktop: external_prop_types_default.a.shape({
    size: external_prop_types_default.a.oneOf(sizes),
    offset: external_prop_types_default.a.oneOf(sizes),
    narrow: external_prop_types_default.a.bool
  }),

  /**
   * Size, Offset and Narrow props for WideScreen devices (Between 1216px and 1407px)
   */
  widescreen: external_prop_types_default.a.shape({
    size: external_prop_types_default.a.oneOf(sizes),
    offset: external_prop_types_default.a.oneOf(sizes),
    narrow: external_prop_types_default.a.bool
  }),

  /**
   * Size, Offset and Narrow props for FullHD devices (1408px and above)
   */
  fullhd: external_prop_types_default.a.shape({
    size: external_prop_types_default.a.oneOf(sizes),
    offset: external_prop_types_default.a.oneOf(sizes),
    narrow: external_prop_types_default.a.bool
  })
});
column_Column.defaultProps = column_objectSpread({}, modifiers.defaultProps, {
  children: undefined,
  className: undefined,
  style: undefined,
  size: undefined,
  offset: undefined,
  narrow: undefined,
  mobile: {
    size: undefined,
    offset: undefined,
    narrow: undefined
  },
  touch: {
    size: undefined,
    offset: undefined,
    narrow: undefined
  },
  tablet: {
    size: undefined,
    offset: undefined,
    narrow: undefined
  },
  desktop: {
    size: undefined,
    offset: undefined,
    narrow: undefined
  },
  widescreen: {
    size: undefined,
    offset: undefined,
    narrow: undefined
  },
  fullhd: {
    size: undefined,
    offset: undefined,
    narrow: undefined
  }
});
/* harmony default export */ var column = (column_Column);
// CONCATENATED MODULE: ./src/components/columns/columns.js
function columns_extends() { columns_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return columns_extends.apply(this, arguments); }

function columns_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function columns_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { columns_ownKeys(source, true).forEach(function (key) { columns_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { columns_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function columns_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function columns_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = columns_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function columns_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }









var breakpoints = [null].concat(Object.keys(constants.BREAKPOINTS).map(function (key) {
  return constants.BREAKPOINTS[key];
}));
var columns_sizes = [0, 1, 2, 3, 4, 5, 6, 7, 8];

var columns_Columns = function Columns(_ref) {
  var _objectSpread2, _ref2;

  var className = _ref.className,
      breakpoint = _ref.breakpoint,
      gapless = _ref.gapless,
      multiline = _ref.multiline,
      centered = _ref.centered,
      vCentered = _ref.vCentered,
      variableGap = _ref.variableGap,
      props = columns_objectWithoutProperties(_ref, ["className", "breakpoint", "gapless", "multiline", "centered", "vCentered", "variableGap"]);

  return external_react_default.a.createElement(components_element, columns_extends({}, props, {
    className: classnames_default()(className, 'columns', columns_objectSpread((_objectSpread2 = {}, columns_defineProperty(_objectSpread2, "is-".concat(breakpoint), breakpoint), columns_defineProperty(_objectSpread2, 'is-gapless', gapless), columns_defineProperty(_objectSpread2, 'is-multiline', multiline), columns_defineProperty(_objectSpread2, 'is-centered', centered), columns_defineProperty(_objectSpread2, 'is-vcentered', vCentered), columns_defineProperty(_objectSpread2, 'is-variable', Object.keys(variableGap).length > 0), _objectSpread2), variableGap ? (_ref2 = {}, columns_defineProperty(_ref2, "is-".concat(variableGap.touch, "-touch"), variableGap.touch), columns_defineProperty(_ref2, "is-".concat(variableGap.mobile, "-mobile"), variableGap.mobile), columns_defineProperty(_ref2, "is-".concat(variableGap.tablet, "-tablet"), variableGap.tablet), columns_defineProperty(_ref2, "is-".concat(variableGap.desktop, "-desktop"), variableGap.desktop), columns_defineProperty(_ref2, "is-".concat(variableGap.widescreen, "-widescreen"), variableGap.widescreen), columns_defineProperty(_ref2, "is-".concat(variableGap.fullhd, "-fullhd"), variableGap.fullhd), _ref2) : {}))
  }));
};

columns_Columns.Column = column;
columns_Columns.CONSTANTS = columns_constants;
columns_Columns.propTypes = columns_objectSpread({}, modifiers.propTypes, {
  children: external_prop_types_default.a.node,
  className: external_prop_types_default.a.string,
  style: external_prop_types_default.a.shape({}),
  variableGap: external_prop_types_default.a.shape(columns_objectSpread({}, Object.values(constants.BREAKPOINTS).reduce(function (values, breakpoint) {
    return columns_objectSpread({}, values, columns_defineProperty({}, breakpoint, external_prop_types_default.a.oneOf(columns_sizes)));
  }, {}))),

  /**
   * Breakpoint where columns become stacked.
   */
  breakpoint: external_prop_types_default.a.oneOf(breakpoints),

  /**
   * `true` to remove space between columns
   */
  gapless: external_prop_types_default.a.bool,

  /**
   * `true` if you want to use more than one line if you add more column elements that would fit in a single row.
   */
  multiline: external_prop_types_default.a.bool,

  /**
   * `true` you want the columns inside to be horizontaly centered
   */
  centered: external_prop_types_default.a.bool,

  /**
   * `true` if you want to vertically align columns
   */
  vCentered: external_prop_types_default.a.bool
});
columns_Columns.defaultProps = columns_objectSpread({}, modifiers.defaultProps, {
  children: null,
  className: undefined,
  style: undefined,
  breakpoint: undefined,
  gapless: false,
  centered: false,
  vCentered: false,
  multiline: true,
  variableGap: {}
});
/* harmony default export */ var columns = (columns_Columns);
// EXTERNAL MODULE: ./src/components/columns/columns.sass
var columns_columns = __webpack_require__(12);

// CONCATENATED MODULE: ./src/components/columns/index.js


/* harmony default export */ var components_columns = (columns);
// EXTERNAL MODULE: ./src/components/container/container.sass
var container = __webpack_require__(13);

// CONCATENATED MODULE: ./src/components/container/container.js
function container_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function container_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { container_ownKeys(source, true).forEach(function (key) { container_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { container_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function container_extends() { container_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return container_extends.apply(this, arguments); }

function container_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function container_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = container_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function container_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }








var container_breakpoints = [null].concat(Object.keys(constants.BREAKPOINTS).map(function (key) {
  return constants.BREAKPOINTS[key];
}));

var container_Container = function Container(_ref) {
  var children = _ref.children,
      fluid = _ref.fluid,
      breakpoint = _ref.breakpoint,
      className = _ref.className,
      props = container_objectWithoutProperties(_ref, ["children", "fluid", "breakpoint", "className"]);

  return external_react_default.a.createElement(components_element, container_extends({}, props, {
    className: classnames_default()('container', className, container_defineProperty({
      'is-fluid': fluid
    }, "is-".concat(breakpoint), breakpoint))
  }), children);
};

container_Container.propTypes = container_objectSpread({}, modifiers.propTypes, {
  children: external_prop_types_default.a.node,
  fluid: external_prop_types_default.a.bool,
  className: external_prop_types_default.a.string,
  style: external_prop_types_default.a.shape({}),
  breakpoint: external_prop_types_default.a.oneOf(container_breakpoints),
  renderAs: render_as
});
container_Container.defaultProps = container_objectSpread({}, modifiers.defaultProps, {
  fluid: false,
  children: null,
  breakpoint: undefined,
  className: undefined,
  style: undefined,
  renderAs: 'div'
});
/* harmony default export */ var container_container = (container_Container);
// CONCATENATED MODULE: ./src/components/container/index.js


// EXTERNAL MODULE: ./src/components/content/content.sass
var content_content = __webpack_require__(14);

// CONCATENATED MODULE: ./src/components/content/content.js
function content_content_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function content_content_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { content_content_ownKeys(source, true).forEach(function (key) { content_content_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { content_content_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function content_content_extends() { content_content_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return content_content_extends.apply(this, arguments); }

function content_content_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function content_content_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = content_content_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function content_content_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }








var content_Content = function Content(_ref) {
  var children = _ref.children,
      className = _ref.className,
      size = _ref.size,
      props = content_content_objectWithoutProperties(_ref, ["children", "className", "size"]);

  return external_react_default.a.createElement(components_element, content_content_extends({}, props, {
    className: classnames_default()('content', className, content_content_defineProperty({}, "is-".concat(size), size))
  }), children);
};

content_Content.propTypes = content_content_objectSpread({}, modifiers.propTypes, {
  children: external_prop_types_default.a.node,
  className: external_prop_types_default.a.string,
  style: external_prop_types_default.a.shape({}),
  size: external_prop_types_default.a.oneOf(['small', 'medium', 'large']),
  renderAs: render_as
});
content_Content.defaultProps = content_content_objectSpread({}, modifiers.defaultProps, {
  children: null,
  className: undefined,
  style: undefined,
  size: undefined,
  renderAs: 'div'
});
/* harmony default export */ var components_content_content = (content_Content);
// CONCATENATED MODULE: ./src/components/content/index.js


// EXTERNAL MODULE: ./src/components/footer/footer.sass
var footer_footer = __webpack_require__(15);

// CONCATENATED MODULE: ./src/components/footer/footer.js
function footer_footer_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function footer_footer_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { footer_footer_ownKeys(source, true).forEach(function (key) { footer_footer_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { footer_footer_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function footer_footer_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function footer_footer_extends() { footer_footer_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return footer_footer_extends.apply(this, arguments); }

function footer_footer_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = footer_footer_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function footer_footer_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }








var footer_Footer = function Footer(_ref) {
  var children = _ref.children,
      className = _ref.className,
      props = footer_footer_objectWithoutProperties(_ref, ["children", "className"]);

  return external_react_default.a.createElement(components_element, footer_footer_extends({}, props, {
    className: classnames_default()('footer', className)
  }), children);
};

footer_Footer.propTypes = footer_footer_objectSpread({}, modifiers.propTypes, {
  children: external_prop_types_default.a.node,
  className: external_prop_types_default.a.string,
  style: external_prop_types_default.a.shape({}),
  renderAs: render_as
});
footer_Footer.defaultProps = footer_footer_objectSpread({}, modifiers.defaultProps, {
  children: null,
  className: undefined,
  style: undefined,
  renderAs: 'div'
});
/* harmony default export */ var components_footer_footer = (footer_Footer);
// CONCATENATED MODULE: ./src/components/footer/index.js


// EXTERNAL MODULE: ./src/components/heading/heading.sass
var heading_heading = __webpack_require__(16);

// CONCATENATED MODULE: ./src/components/heading/heading.js
function heading_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function heading_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { heading_ownKeys(source, true).forEach(function (key) { heading_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { heading_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function heading_extends() { heading_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return heading_extends.apply(this, arguments); }

function heading_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function heading_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = heading_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function heading_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }








var heading_Heading = function Heading(_ref) {
  var _classnames;

  var children = _ref.children,
      className = _ref.className,
      size = _ref.size,
      subtitle = _ref.subtitle,
      weight = _ref.weight,
      spaced = _ref.spaced,
      heading = _ref.heading,
      props = heading_objectWithoutProperties(_ref, ["children", "className", "size", "subtitle", "weight", "spaced", "heading"]);

  return external_react_default.a.createElement(components_element, heading_extends({}, props, {
    className: classnames_default()(className, (_classnames = {
      title: !subtitle && !heading,
      subtitle: subtitle,
      heading: heading
    }, heading_defineProperty(_classnames, "is-".concat(size), size), heading_defineProperty(_classnames, "has-text-weight-".concat(weight), weight), heading_defineProperty(_classnames, 'is-spaced', spaced && !subtitle), _classnames))
  }), children);
};

heading_Heading.propTypes = heading_objectSpread({}, modifiers.propTypes, {
  children: external_prop_types_default.a.node,
  className: external_prop_types_default.a.string,
  renderAs: render_as,
  size: external_prop_types_default.a.oneOf([1, 2, 3, 4, 5, 6]),
  weight: external_prop_types_default.a.oneOf(['light', 'normal', 'semibold', 'bold']),
  subtitle: external_prop_types_default.a.bool,
  heading: external_prop_types_default.a.bool,
  spaced: external_prop_types_default.a.bool
});
heading_Heading.defaultProps = heading_objectSpread({}, modifiers.defaultProps, {
  children: null,
  className: undefined,
  renderAs: 'h1',
  size: undefined,
  weight: undefined,
  subtitle: false,
  heading: false,
  spaced: false
});
/* harmony default export */ var components_heading_heading = (heading_Heading);
// CONCATENATED MODULE: ./src/components/heading/index.js


// EXTERNAL MODULE: ./src/components/hero/hero.sass
var hero = __webpack_require__(17);

// CONCATENATED MODULE: ./src/components/hero/components/hero-head.js
function hero_head_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function hero_head_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { hero_head_ownKeys(source, true).forEach(function (key) { hero_head_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { hero_head_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function hero_head_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function hero_head_extends() { hero_head_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return hero_head_extends.apply(this, arguments); }

function hero_head_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = hero_head_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function hero_head_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }








var hero_head_HeroHead = function HeroHead(_ref) {
  var children = _ref.children,
      className = _ref.className,
      props = hero_head_objectWithoutProperties(_ref, ["children", "className"]);

  return external_react_default.a.createElement(components_element, hero_head_extends({}, props, {
    className: classnames_default()(className, 'hero-head')
  }), children);
};

hero_head_HeroHead.propTypes = hero_head_objectSpread({}, modifiers.propTypes, {
  children: external_prop_types_default.a.node,
  className: external_prop_types_default.a.string,
  style: external_prop_types_default.a.shape({}),
  renderAs: render_as
});
hero_head_HeroHead.defaultProps = hero_head_objectSpread({}, modifiers.defaultProps, {
  children: null,
  className: undefined,
  style: undefined,
  renderAs: 'div'
});
/* harmony default export */ var hero_head = (hero_head_HeroHead);
// CONCATENATED MODULE: ./src/components/hero/components/hero-body.js
function hero_body_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function hero_body_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { hero_body_ownKeys(source, true).forEach(function (key) { hero_body_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { hero_body_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function hero_body_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function hero_body_extends() { hero_body_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return hero_body_extends.apply(this, arguments); }

function hero_body_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = hero_body_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function hero_body_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }








var hero_body_HeroBody = function HeroBody(_ref) {
  var children = _ref.children,
      className = _ref.className,
      props = hero_body_objectWithoutProperties(_ref, ["children", "className"]);

  return external_react_default.a.createElement(components_element, hero_body_extends({}, props, {
    className: classnames_default()(className, 'hero-body')
  }), children);
};

hero_body_HeroBody.propTypes = hero_body_objectSpread({}, modifiers.propTypes, {
  children: external_prop_types_default.a.node,
  className: external_prop_types_default.a.string,
  style: external_prop_types_default.a.shape({}),
  renderAs: render_as
});
hero_body_HeroBody.defaultProps = hero_body_objectSpread({}, modifiers.defaultProps, {
  children: null,
  className: undefined,
  style: undefined,
  renderAs: 'div'
});
/* harmony default export */ var hero_body = (hero_body_HeroBody);
// CONCATENATED MODULE: ./src/components/hero/components/hero-footer.js
function hero_footer_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function hero_footer_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { hero_footer_ownKeys(source, true).forEach(function (key) { hero_footer_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { hero_footer_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function hero_footer_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function hero_footer_extends() { hero_footer_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return hero_footer_extends.apply(this, arguments); }

function hero_footer_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = hero_footer_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function hero_footer_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }








var hero_footer_HeroFooter = function HeroFooter(_ref) {
  var children = _ref.children,
      className = _ref.className,
      props = hero_footer_objectWithoutProperties(_ref, ["children", "className"]);

  return external_react_default.a.createElement(components_element, hero_footer_extends({}, props, {
    className: classnames_default()(className, 'hero-foot')
  }), children);
};

hero_footer_HeroFooter.propTypes = hero_footer_objectSpread({}, modifiers.propTypes, {
  children: external_prop_types_default.a.node,
  className: external_prop_types_default.a.string,
  style: external_prop_types_default.a.shape({}),
  renderAs: render_as
});
hero_footer_HeroFooter.defaultProps = hero_footer_objectSpread({}, modifiers.defaultProps, {
  children: null,
  className: undefined,
  style: undefined,
  renderAs: 'div'
});
/* harmony default export */ var hero_footer = (hero_footer_HeroFooter);
// CONCATENATED MODULE: ./src/components/hero/hero.js
function hero_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function hero_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { hero_ownKeys(source, true).forEach(function (key) { hero_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { hero_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function hero_extends() { hero_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return hero_extends.apply(this, arguments); }

function hero_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function hero_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = hero_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function hero_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }











var hero_colors = [null].concat(Object.keys(constants.COLORS).map(function (key) {
  return constants.COLORS[key];
}));

var hero_Hero = function Hero(_ref) {
  var _classnames;

  var children = _ref.children,
      className = _ref.className,
      color = _ref.color,
      gradient = _ref.gradient,
      size = _ref.size,
      hasNavbar = _ref.hasNavbar,
      props = hero_objectWithoutProperties(_ref, ["children", "className", "color", "gradient", "size", "hasNavbar"]);

  return external_react_default.a.createElement(components_element, hero_extends({}, props, {
    className: classnames_default()('hero', className, (_classnames = {}, hero_defineProperty(_classnames, "is-".concat(color), color), hero_defineProperty(_classnames, "is-".concat(size), size), hero_defineProperty(_classnames, 'is-bold', gradient), hero_defineProperty(_classnames, 'is-fullheight-with-navbar', hasNavbar), _classnames))
  }), children);
};

hero_Hero.Head = hero_head;
hero_Hero.Body = hero_body;
hero_Hero.Footer = hero_footer;
hero_Hero.propTypes = hero_objectSpread({}, modifiers.propTypes, {
  children: external_prop_types_default.a.node,
  className: external_prop_types_default.a.string,
  style: external_prop_types_default.a.shape({}),
  renderAs: render_as,
  color: external_prop_types_default.a.oneOf(hero_colors),
  gradient: external_prop_types_default.a.bool,
  size: external_prop_types_default.a.oneOf(['small', 'medium', 'large', 'fullheight']),
  hasNavbar: external_prop_types_default.a.bool
});
hero_Hero.defaultProps = hero_objectSpread({}, modifiers.defaultProps, {
  children: null,
  className: undefined,
  style: undefined,
  renderAs: 'section',
  color: undefined,
  gradient: undefined,
  size: undefined,
  hasNavbar: undefined
});
/* harmony default export */ var hero_hero = (hero_Hero);
// CONCATENATED MODULE: ./src/components/hero/index.js


// EXTERNAL MODULE: ./src/components/level/level.sass
var level = __webpack_require__(18);

// CONCATENATED MODULE: ./src/components/level/components/level-side.js
function level_side_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function level_side_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { level_side_ownKeys(source, true).forEach(function (key) { level_side_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { level_side_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function level_side_extends() { level_side_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return level_side_extends.apply(this, arguments); }

function level_side_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function level_side_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = level_side_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function level_side_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }








var level_side_LevelSide = function LevelSide(_ref) {
  var children = _ref.children,
      className = _ref.className,
      align = _ref.align,
      props = level_side_objectWithoutProperties(_ref, ["children", "className", "align"]);

  return external_react_default.a.createElement(components_element, level_side_extends({}, props, {
    className: classnames_default()(className, level_side_defineProperty({}, "level-".concat(align), align))
  }), children);
};

level_side_LevelSide.propTypes = level_side_objectSpread({}, modifiers.propTypes, {
  children: external_prop_types_default.a.node,
  className: external_prop_types_default.a.string,
  style: external_prop_types_default.a.shape({}),
  renderAs: render_as,
  align: external_prop_types_default.a.string
});
level_side_LevelSide.defaultProps = level_side_objectSpread({}, modifiers.defaultProps, {
  children: null,
  className: undefined,
  style: undefined,
  renderAs: 'div',
  align: 'left'
});
/* harmony default export */ var level_side = (level_side_LevelSide);
// CONCATENATED MODULE: ./src/components/level/components/level-item.js
function level_item_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function level_item_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { level_item_ownKeys(source, true).forEach(function (key) { level_item_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { level_item_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function level_item_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function level_item_extends() { level_item_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return level_item_extends.apply(this, arguments); }

function level_item_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = level_item_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function level_item_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }








var level_item_LevelItem = function LevelItem(_ref) {
  var children = _ref.children,
      className = _ref.className,
      props = level_item_objectWithoutProperties(_ref, ["children", "className"]);

  return external_react_default.a.createElement(components_element, level_item_extends({}, props, {
    className: classnames_default()('level-item', className, {})
  }), children);
};

level_item_LevelItem.propTypes = level_item_objectSpread({}, modifiers.propTypes, {
  children: external_prop_types_default.a.node,
  className: external_prop_types_default.a.string,
  style: external_prop_types_default.a.shape({}),
  renderAs: render_as
});
level_item_LevelItem.defaultProps = level_item_objectSpread({}, modifiers.defaultProps, {
  children: null,
  className: undefined,
  style: undefined,
  renderAs: 'div'
});
/* harmony default export */ var level_item = (level_item_LevelItem);
// CONCATENATED MODULE: ./src/components/level/level.js
function level_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function level_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { level_ownKeys(source, true).forEach(function (key) { level_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { level_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function level_extends() { level_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return level_extends.apply(this, arguments); }

function level_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function level_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = level_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function level_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }










var level_breakpoints = [null].concat(Object.keys(constants.BREAKPOINTS).map(function (key) {
  return constants.BREAKPOINTS[key];
}));

var level_Level = function Level(_ref) {
  var _classnames;

  var children = _ref.children,
      className = _ref.className,
      breakpoint = _ref.breakpoint,
      mobile = _ref.mobile,
      props = level_objectWithoutProperties(_ref, ["children", "className", "breakpoint", "mobile"]);

  return external_react_default.a.createElement(components_element, level_extends({}, props, {
    className: classnames_default()('level', className, (_classnames = {}, level_defineProperty(_classnames, "is-".concat(breakpoint), breakpoint), level_defineProperty(_classnames, 'is-mobile', mobile), _classnames))
  }), children);
};

level_Level.Side = level_side;
level_Level.Item = level_item;
level_Level.propTypes = level_objectSpread({}, modifiers.propTypes, {
  children: external_prop_types_default.a.node,
  className: external_prop_types_default.a.string,
  mobile: external_prop_types_default.a.bool,
  style: external_prop_types_default.a.shape({}),
  breakpoint: external_prop_types_default.a.oneOf(level_breakpoints),
  renderAs: render_as
});
level_Level.defaultProps = level_objectSpread({}, modifiers.defaultProps, {
  children: null,
  className: undefined,
  mobile: false,
  style: undefined,
  breakpoint: undefined,
  renderAs: 'div'
});
/* harmony default export */ var level_level = (level_Level);
// CONCATENATED MODULE: ./src/components/level/index.js


// CONCATENATED MODULE: ./src/components/list/components/list-item.js
function list_item_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function list_item_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { list_item_ownKeys(source, true).forEach(function (key) { list_item_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { list_item_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function list_item_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function list_item_extends() { list_item_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return list_item_extends.apply(this, arguments); }

function list_item_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = list_item_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function list_item_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }








var list_item_ListItem = function ListItem(_ref) {
  var children = _ref.children,
      className = _ref.className,
      active = _ref.active,
      props = list_item_objectWithoutProperties(_ref, ["children", "className", "active"]);

  return external_react_default.a.createElement(components_element, list_item_extends({}, props, {
    className: classnames_default()('list-item', className, {
      'is-active': active
    })
  }), children);
};

list_item_ListItem.propTypes = list_item_objectSpread({}, modifiers.propTypes, {
  children: external_prop_types_default.a.node,
  className: external_prop_types_default.a.string,
  style: external_prop_types_default.a.shape({}),
  renderAs: render_as
});
list_item_ListItem.defaultProps = list_item_objectSpread({}, modifiers.defaultProps, {
  children: null,
  className: undefined,
  style: undefined,
  renderAs: 'div'
});
/* harmony default export */ var list_item = (list_item_ListItem);
// CONCATENATED MODULE: ./src/components/list/list.js
function list_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function list_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { list_ownKeys(source, true).forEach(function (key) { list_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { list_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function list_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function list_extends() { list_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return list_extends.apply(this, arguments); }

function list_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = list_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function list_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }









var list_List = function List(_ref) {
  var children = _ref.children,
      className = _ref.className,
      hoverable = _ref.hoverable,
      props = list_objectWithoutProperties(_ref, ["children", "className", "hoverable"]);

  return external_react_default.a.createElement(components_element, list_extends({}, props, {
    className: classnames_default()('list', className, {
      'is-hoverable': hoverable
    })
  }), children);
};

list_List.propTypes = list_objectSpread({}, modifiers.propTypes, {
  children: external_prop_types_default.a.node,
  className: external_prop_types_default.a.string,
  style: external_prop_types_default.a.shape({}),
  renderAs: render_as
});
list_List.defaultProps = list_objectSpread({}, modifiers.defaultProps, {
  children: null,
  className: undefined,
  style: undefined,
  renderAs: 'div'
});
list_List.Item = list_item;
/* harmony default export */ var list = (list_List);
// EXTERNAL MODULE: ./src/components/list/list.sass
var list_list = __webpack_require__(19);

// CONCATENATED MODULE: ./src/components/list/index.js


/* harmony default export */ var components_list = (list);
// EXTERNAL MODULE: ./src/components/media/media.sass
var media = __webpack_require__(20);

// CONCATENATED MODULE: ./src/components/media/components/media-item.js
function media_item_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function media_item_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { media_item_ownKeys(source, true).forEach(function (key) { media_item_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { media_item_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function media_item_extends() { media_item_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return media_item_extends.apply(this, arguments); }

function media_item_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function media_item_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = media_item_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function media_item_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }








var media_item_MediaItem = function MediaItem(_ref) {
  var children = _ref.children,
      className = _ref.className,
      position = _ref.position,
      props = media_item_objectWithoutProperties(_ref, ["children", "className", "position"]);

  var p = position === 'center' ? 'content' : position;
  return external_react_default.a.createElement(components_element, media_item_extends({}, props, {
    className: classnames_default()(className, media_item_defineProperty({}, "media-".concat(p), p))
  }), children);
};

media_item_MediaItem.propTypes = media_item_objectSpread({}, modifiers.propTypes, {
  children: external_prop_types_default.a.node,
  className: external_prop_types_default.a.string,
  style: external_prop_types_default.a.shape({}),
  renderAs: render_as,
  position: external_prop_types_default.a.oneOf(['center', 'right', 'left'])
});
media_item_MediaItem.defaultProps = media_item_objectSpread({}, modifiers.defaultProps, {
  children: null,
  className: undefined,
  style: undefined,
  renderAs: 'div',
  position: 'center'
});
/* harmony default export */ var media_item = (media_item_MediaItem);
// CONCATENATED MODULE: ./src/components/media/components/media-content.js
function media_content_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function media_content_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { media_content_ownKeys(source, true).forEach(function (key) { media_content_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { media_content_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function media_content_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function media_content_extends() { media_content_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return media_content_extends.apply(this, arguments); }

function media_content_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = media_content_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function media_content_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }








var media_content_MediaContent = function MediaContent(_ref) {
  var children = _ref.children,
      className = _ref.className,
      props = media_content_objectWithoutProperties(_ref, ["children", "className"]);

  return external_react_default.a.createElement(components_element, media_content_extends({}, props, {
    className: classnames_default()(className, 'content')
  }), children);
};

media_content_MediaContent.propTypes = media_content_objectSpread({}, modifiers.propTypes, {
  children: external_prop_types_default.a.node,
  className: external_prop_types_default.a.string,
  style: external_prop_types_default.a.shape({}),
  renderAs: render_as
});
media_content_MediaContent.defaultProps = media_content_objectSpread({}, modifiers.defaultProps, {
  children: null,
  className: undefined,
  style: undefined,
  renderAs: 'div'
});
/* harmony default export */ var media_content = (media_content_MediaContent);
// CONCATENATED MODULE: ./src/components/media/media.js
function media_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function media_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { media_ownKeys(source, true).forEach(function (key) { media_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { media_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function media_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function media_extends() { media_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return media_extends.apply(this, arguments); }

function media_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = media_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function media_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }










var media_Media = function Media(_ref) {
  var children = _ref.children,
      className = _ref.className,
      props = media_objectWithoutProperties(_ref, ["children", "className"]);

  return external_react_default.a.createElement(components_element, media_extends({}, props, {
    className: classnames_default()('media', className, {})
  }), children);
};

media_Media.Item = media_item;
media_Media.Content = media_content;
media_Media.propTypes = media_objectSpread({}, modifiers.propTypes, {
  children: external_prop_types_default.a.node,
  className: external_prop_types_default.a.string,
  style: external_prop_types_default.a.shape({}),
  renderAs: render_as
});
media_Media.defaultProps = media_objectSpread({}, modifiers.defaultProps, {
  children: null,
  className: undefined,
  style: undefined,
  renderAs: 'article'
});
/* harmony default export */ var media_media = (media_Media);
// CONCATENATED MODULE: ./src/components/media/index.js


// EXTERNAL MODULE: ./src/components/notification/notification.sass
var notification_notification = __webpack_require__(21);

// CONCATENATED MODULE: ./src/components/notification/notification.js
function notification_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function notification_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { notification_ownKeys(source, true).forEach(function (key) { notification_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { notification_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function notification_extends() { notification_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return notification_extends.apply(this, arguments); }

function notification_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function notification_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = notification_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function notification_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }








var notification_colors = [null].concat(Object.keys(constants.COLORS).map(function (key) {
  return constants.COLORS[key];
}));

var notification_Notification = function Notification(_ref) {
  var children = _ref.children,
      className = _ref.className,
      color = _ref.color,
      props = notification_objectWithoutProperties(_ref, ["children", "className", "color"]);

  return external_react_default.a.createElement(components_element, notification_extends({}, props, {
    className: classnames_default()('notification', notification_defineProperty({}, "is-".concat(color), color), className)
  }), children);
};

notification_Notification.propTypes = notification_objectSpread({}, modifiers.propTypes, {
  children: external_prop_types_default.a.node,
  className: external_prop_types_default.a.string,
  style: external_prop_types_default.a.shape({}),
  renderAs: render_as,
  color: external_prop_types_default.a.oneOf(notification_colors)
});
notification_Notification.defaultProps = notification_objectSpread({}, modifiers.defaultProps, {
  children: null,
  className: undefined,
  style: undefined,
  renderAs: 'div',
  color: undefined
});
/* harmony default export */ var components_notification_notification = (notification_Notification);
// CONCATENATED MODULE: ./src/components/notification/index.js


// EXTERNAL MODULE: ./src/components/progress/progress.sass
var progress = __webpack_require__(22);

// CONCATENATED MODULE: ./src/components/progress/progress.js
function progress_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function progress_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { progress_ownKeys(source, true).forEach(function (key) { progress_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { progress_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function progress_extends() { progress_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return progress_extends.apply(this, arguments); }

function progress_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function progress_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = progress_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function progress_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }







var progress_colors = [null].concat(Object.keys(constants.COLORS).map(function (key) {
  return constants.COLORS[key];
}));

var progress_Progress = function Progress(_ref) {
  var _classnames;

  var className = _ref.className,
      value = _ref.value,
      max = _ref.max,
      color = _ref.color,
      size = _ref.size,
      props = progress_objectWithoutProperties(_ref, ["className", "value", "max", "color", "size"]);

  return external_react_default.a.createElement(components_element, progress_extends({
    renderAs: "progress"
  }, props, {
    value: value,
    max: max,
    className: classnames_default()('progress', className, (_classnames = {}, progress_defineProperty(_classnames, "is-".concat(color), color), progress_defineProperty(_classnames, "is-".concat(size), size), _classnames))
  }));
};

progress_Progress.propTypes = progress_objectSpread({}, modifiers.propTypes, {
  className: external_prop_types_default.a.string,
  style: external_prop_types_default.a.shape({}),
  color: external_prop_types_default.a.oneOf(progress_colors),
  size: external_prop_types_default.a.oneOf(['small', 'medium', 'large']),
  value: external_prop_types_default.a.number.isRequired,
  max: external_prop_types_default.a.number.isRequired
});
progress_Progress.defaultProps = progress_objectSpread({}, modifiers.defaultProps, {
  className: undefined,
  style: undefined,
  color: undefined,
  size: undefined
});
/* harmony default export */ var progress_progress = (progress_Progress);
// CONCATENATED MODULE: ./src/components/progress/index.js


// EXTERNAL MODULE: ./src/components/section/section.sass
var section = __webpack_require__(23);

// CONCATENATED MODULE: ./src/components/section/section.js
function section_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function section_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { section_ownKeys(source, true).forEach(function (key) { section_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { section_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function section_extends() { section_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return section_extends.apply(this, arguments); }

function section_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function section_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = section_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function section_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }








var section_Section = function Section(_ref) {
  var children = _ref.children,
      className = _ref.className,
      size = _ref.size,
      props = section_objectWithoutProperties(_ref, ["children", "className", "size"]);

  return external_react_default.a.createElement(components_element, section_extends({}, props, {
    className: classnames_default()('section', className, section_defineProperty({}, "is-".concat(size), size))
  }), children);
};

section_Section.propTypes = section_objectSpread({}, modifiers.propTypes, {
  children: external_prop_types_default.a.node,
  className: external_prop_types_default.a.string,
  style: external_prop_types_default.a.shape({}),
  renderAs: render_as,
  size: external_prop_types_default.a.oneOf(['medium', 'large'])
});
section_Section.defaultProps = section_objectSpread({}, modifiers.defaultProps, {
  children: null,
  className: undefined,
  style: undefined,
  renderAs: 'section',
  size: undefined
});
/* harmony default export */ var section_section = (section_Section);
// CONCATENATED MODULE: ./src/components/section/index.js


// EXTERNAL MODULE: ./src/components/table/table.sass
var table = __webpack_require__(24);

// CONCATENATED MODULE: ./src/components/table/table.js
function table_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function table_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { table_ownKeys(source, true).forEach(function (key) { table_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { table_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function table_extends() { table_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return table_extends.apply(this, arguments); }

function table_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function table_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = table_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function table_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }







var table_Table = function Table(_ref) {
  var _classnames;

  var children = _ref.children,
      className = _ref.className,
      size = _ref.size,
      striped = _ref.striped,
      bordered = _ref.bordered,
      props = table_objectWithoutProperties(_ref, ["children", "className", "size", "striped", "bordered"]);

  return external_react_default.a.createElement(components_element, table_extends({
    renderAs: "table"
  }, props, {
    className: classnames_default()('table', className, (_classnames = {}, table_defineProperty(_classnames, "is-".concat(size), size), table_defineProperty(_classnames, 'is-bordered', bordered), table_defineProperty(_classnames, 'is-striped', striped), _classnames))
  }), children);
};

table_Table.propTypes = table_objectSpread({}, modifiers.propTypes, {
  children: external_prop_types_default.a.node,
  className: external_prop_types_default.a.string,
  style: external_prop_types_default.a.shape({}),
  size: external_prop_types_default.a.oneOf(['fullwidth', 'narrow']),
  striped: external_prop_types_default.a.bool,
  bordered: external_prop_types_default.a.bool
});
table_Table.defaultProps = table_objectSpread({}, modifiers.defaultProps, {
  children: null,
  className: undefined,
  style: undefined,
  size: 'fullwidth',
  striped: true,
  bordered: false
});
/* harmony default export */ var table_table = (table_Table);
// CONCATENATED MODULE: ./src/components/table/index.js


// EXTERNAL MODULE: ./src/components/tag/tag.sass
var tag = __webpack_require__(25);

// CONCATENATED MODULE: ./src/components/tag/components/tag-group.js
function tag_group_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function tag_group_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { tag_group_ownKeys(source, true).forEach(function (key) { tag_group_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { tag_group_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function tag_group_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function tag_group_extends() { tag_group_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return tag_group_extends.apply(this, arguments); }

function tag_group_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = tag_group_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function tag_group_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }







var tag_group_TagGroup = function TagGroup(_ref) {
  var children = _ref.children,
      className = _ref.className,
      gapless = _ref.gapless,
      props = tag_group_objectWithoutProperties(_ref, ["children", "className", "gapless"]);

  return external_react_default.a.createElement(components_element, tag_group_extends({
    renderAs: "span"
  }, props, {
    className: classnames_default()('tags', className, {
      'has-addons': gapless
    })
  }), children);
};

tag_group_TagGroup.propTypes = tag_group_objectSpread({}, modifiers.propTypes, {
  children: external_prop_types_default.a.node,
  className: external_prop_types_default.a.string,
  style: external_prop_types_default.a.shape({}),
  gapless: external_prop_types_default.a.bool
});
tag_group_TagGroup.defaultProps = tag_group_objectSpread({}, modifiers.defaultProps, {
  children: null,
  className: undefined,
  style: undefined,
  gapless: false
});
/* harmony default export */ var tag_group = (tag_group_TagGroup);
// CONCATENATED MODULE: ./src/components/tag/tag.js
function tag_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function tag_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { tag_ownKeys(source, true).forEach(function (key) { tag_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { tag_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function tag_extends() { tag_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return tag_extends.apply(this, arguments); }

function tag_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function tag_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = tag_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function tag_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }









var tag_colors = [null].concat(Object.keys(constants.COLORS).map(function (key) {
  return constants.COLORS[key];
}));

var tag_Tag = function Tag(_ref) {
  var _classnames;

  var children = _ref.children,
      className = _ref.className,
      color = _ref.color,
      size = _ref.size,
      rounded = _ref.rounded,
      remove = _ref.remove,
      props = tag_objectWithoutProperties(_ref, ["children", "className", "color", "size", "rounded", "remove"]);

  return external_react_default.a.createElement(components_element, tag_extends({}, props, {
    className: classnames_default()('tag', className, (_classnames = {}, tag_defineProperty(_classnames, "is-".concat(size), size), tag_defineProperty(_classnames, "is-".concat(color), color), tag_defineProperty(_classnames, 'is-rounded', rounded), tag_defineProperty(_classnames, 'is-delete', remove), _classnames))
  }), !remove && children);
};

tag_Tag.Group = tag_group;
tag_Tag.propTypes = tag_objectSpread({}, modifiers.propTypes, {
  children: external_prop_types_default.a.node,
  className: external_prop_types_default.a.string,
  style: external_prop_types_default.a.shape({}),
  color: external_prop_types_default.a.oneOf(tag_colors),
  size: external_prop_types_default.a.oneOf(['medium', 'large']),
  rounded: external_prop_types_default.a.bool,
  remove: external_prop_types_default.a.bool,
  renderAs: render_as
});
tag_Tag.defaultProps = tag_objectSpread({}, modifiers.defaultProps, {
  children: null,
  className: undefined,
  style: undefined,
  color: undefined,
  size: undefined,
  rounded: false,
  remove: false,
  renderAs: 'span'
});
/* harmony default export */ var tag_tag = (tag_Tag);
// CONCATENATED MODULE: ./src/components/tag/index.js


// EXTERNAL MODULE: ./src/components/tile/tile.sass
var tile = __webpack_require__(26);

// CONCATENATED MODULE: ./src/components/tile/tile.js
function tile_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function tile_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { tile_ownKeys(source, true).forEach(function (key) { tile_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { tile_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function tile_extends() { tile_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return tile_extends.apply(this, arguments); }

function tile_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function tile_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = tile_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function tile_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }








var tile_colors = [null].concat(Object.keys(constants.COLORS).map(function (key) {
  return constants.COLORS[key];
}));

var tile_Tile = function Tile(_ref) {
  var _classnames;

  var children = _ref.children,
      className = _ref.className,
      kind = _ref.kind,
      vertical = _ref.vertical,
      size = _ref.size,
      color = _ref.color,
      notification = _ref.notification,
      props = tile_objectWithoutProperties(_ref, ["children", "className", "kind", "vertical", "size", "color", "notification"]);

  return external_react_default.a.createElement(components_element, tile_extends({}, props, {
    className: classnames_default()('tile', className, (_classnames = {
      notification: notification
    }, tile_defineProperty(_classnames, "is-".concat(kind), kind), tile_defineProperty(_classnames, "is-".concat(size), size), tile_defineProperty(_classnames, "is-".concat(color), color), tile_defineProperty(_classnames, 'is-vertical', vertical), _classnames))
  }), children);
};

tile_Tile.propTypes = tile_objectSpread({}, modifiers.propTypes, {
  children: external_prop_types_default.a.node,
  className: external_prop_types_default.a.string,
  style: external_prop_types_default.a.shape({}),
  renderAs: render_as,
  kind: external_prop_types_default.a.oneOf(['ancestor', 'parent', 'child']),
  vertical: external_prop_types_default.a.bool,
  size: external_prop_types_default.a.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  color: external_prop_types_default.a.oneOf(tile_colors),
  notification: external_prop_types_default.a.bool
});
tile_Tile.defaultProps = tile_objectSpread({}, modifiers.defaultProps, {
  children: null,
  className: undefined,
  style: undefined,
  renderAs: 'div',
  kind: undefined,
  vertical: false,
  size: undefined,
  color: undefined,
  notification: false
});
/* harmony default export */ var tile_tile = (tile_Tile);
// CONCATENATED MODULE: ./src/components/tile/index.js


// EXTERNAL MODULE: ./src/components/modal/modal.sass
var modal = __webpack_require__(27);

// EXTERNAL MODULE: external "react-dom"
var external_react_dom_ = __webpack_require__(4);
var external_react_dom_default = /*#__PURE__*/__webpack_require__.n(external_react_dom_);

// CONCATENATED MODULE: ./src/components/modal/components/content.js
function components_content_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function components_content_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { components_content_ownKeys(source, true).forEach(function (key) { components_content_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { components_content_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function components_content_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function components_content_extends() { components_content_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return components_content_extends.apply(this, arguments); }

function components_content_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = components_content_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function components_content_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }








var content_ModalContent = function ModalContent(_ref) {
  var children = _ref.children,
      className = _ref.className,
      props = components_content_objectWithoutProperties(_ref, ["children", "className"]);

  return external_react_default.a.createElement(components_element, components_content_extends({}, props, {
    className: classnames_default()('modal-content', className)
  }), children);
};

content_ModalContent.propTypes = components_content_objectSpread({}, modifiers.propTypes, {
  children: external_prop_types_default.a.node,
  className: external_prop_types_default.a.string,
  style: external_prop_types_default.a.shape({}),
  renderAs: render_as
});
content_ModalContent.defaultProps = components_content_objectSpread({}, modifiers.defaultProps, {
  children: null,
  className: undefined,
  style: undefined,
  renderAs: 'div'
});
/* harmony default export */ var components_content = (content_ModalContent);
// CONCATENATED MODULE: ./src/components/modal/components/card/head.js
function head_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function head_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { head_ownKeys(source, true).forEach(function (key) { head_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { head_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function head_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function head_extends() { head_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return head_extends.apply(this, arguments); }

function head_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = head_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function head_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }








var head_ModalCardHead = function ModalCardHead(_ref) {
  var children = _ref.children,
      className = _ref.className,
      showClose = _ref.showClose,
      onClose = _ref.onClose,
      props = head_objectWithoutProperties(_ref, ["children", "className", "showClose", "onClose"]);

  return external_react_default.a.createElement(components_element, head_extends({}, props, {
    className: classnames_default()('modal-card-head', className)
  }), children, showClose && external_react_default.a.createElement(components_button_button, {
    remove: true,
    onClick: onClose
  }));
};

head_ModalCardHead.propTypes = head_objectSpread({}, modifiers.propTypes, {
  children: external_prop_types_default.a.node,
  className: external_prop_types_default.a.string,
  style: external_prop_types_default.a.shape({}),
  showClose: external_prop_types_default.a.bool,
  onClose: external_prop_types_default.a.func
});
head_ModalCardHead.defaultProps = head_objectSpread({}, modifiers.defaultProps, {
  children: null,
  className: undefined,
  style: undefined,
  showClose: true,
  onClose: undefined,
  renderAs: 'header'
});
/* harmony default export */ var head = (head_ModalCardHead);
// CONCATENATED MODULE: ./src/components/modal/components/card/body.js
function body_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function body_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { body_ownKeys(source, true).forEach(function (key) { body_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { body_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function body_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function body_extends() { body_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return body_extends.apply(this, arguments); }

function body_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = body_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function body_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }








var body_ModalCardBody = function ModalCardBody(_ref) {
  var children = _ref.children,
      className = _ref.className,
      props = body_objectWithoutProperties(_ref, ["children", "className"]);

  return external_react_default.a.createElement(components_element, body_extends({}, props, {
    className: classnames_default()('modal-card-body', className)
  }), children);
};

body_ModalCardBody.propTypes = body_objectSpread({}, modifiers.propTypes, {
  children: external_prop_types_default.a.node,
  className: external_prop_types_default.a.string,
  style: external_prop_types_default.a.shape({}),
  renderAs: render_as
});
body_ModalCardBody.defaultProps = body_objectSpread({}, modifiers.defaultProps, {
  children: null,
  className: undefined,
  style: undefined,
  renderAs: 'section'
});
/* harmony default export */ var body = (body_ModalCardBody);
// CONCATENATED MODULE: ./src/components/modal/components/card/foot.js
function foot_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function foot_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { foot_ownKeys(source, true).forEach(function (key) { foot_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { foot_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function foot_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function foot_extends() { foot_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return foot_extends.apply(this, arguments); }

function foot_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = foot_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function foot_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }







var foot_ModalCardFoot = function ModalCardFoot(_ref) {
  var children = _ref.children,
      className = _ref.className,
      props = foot_objectWithoutProperties(_ref, ["children", "className"]);

  return external_react_default.a.createElement(components_element, foot_extends({}, props, {
    className: classnames_default()('modal-card-foot', className)
  }), children);
};

foot_ModalCardFoot.propTypes = foot_objectSpread({}, modifiers.propTypes, {
  children: external_prop_types_default.a.node,
  className: external_prop_types_default.a.string,
  style: external_prop_types_default.a.shape({})
});
foot_ModalCardFoot.defaultProps = foot_objectSpread({}, modifiers.defaultProps, {
  children: null,
  className: undefined,
  style: undefined,
  renderAs: 'footer'
});
/* harmony default export */ var foot = (foot_ModalCardFoot);
// CONCATENATED MODULE: ./src/components/modal/components/card/title.js
function title_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function title_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { title_ownKeys(source, true).forEach(function (key) { title_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { title_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function title_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function title_extends() { title_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return title_extends.apply(this, arguments); }

function title_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = title_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function title_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }







var title_ModalCardTitle = function ModalCardTitle(_ref) {
  var children = _ref.children,
      className = _ref.className,
      props = title_objectWithoutProperties(_ref, ["children", "className"]);

  return external_react_default.a.createElement(components_element, title_extends({}, props, {
    className: classnames_default()('modal-card-title', className)
  }), children);
};

title_ModalCardTitle.propTypes = title_objectSpread({}, modifiers.propTypes, {
  children: external_prop_types_default.a.node,
  className: external_prop_types_default.a.string,
  style: external_prop_types_default.a.shape({})
});
title_ModalCardTitle.defaultProps = title_objectSpread({}, modifiers.defaultProps, {
  children: null,
  className: undefined,
  style: undefined,
  renderAs: 'p'
});
/* harmony default export */ var card_title = (title_ModalCardTitle);
// CONCATENATED MODULE: ./src/components/modal/components/card/card.js
function card_card_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function card_card_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { card_card_ownKeys(source, true).forEach(function (key) { card_card_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { card_card_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function card_card_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function card_card_extends() { card_card_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return card_card_extends.apply(this, arguments); }

function card_card_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = card_card_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function card_card_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }











var card_ModalCard = function ModalCard(_ref) {
  var className = _ref.className,
      onClose = _ref.onClose,
      children = _ref.children,
      props = card_card_objectWithoutProperties(_ref, ["className", "onClose", "children"]);

  return external_react_default.a.createElement(components_element, card_card_extends({}, props, {
    className: classnames_default()('modal-card', className)
  }), children);
};

card_ModalCard.Head = head;
card_ModalCard.Body = body;
card_ModalCard.Foot = foot;
card_ModalCard.Title = card_title;
card_ModalCard.propTypes = card_card_objectSpread({}, modifiers.propTypes, {
  children: external_prop_types_default.a.node,
  className: external_prop_types_default.a.string,
  style: external_prop_types_default.a.shape({}),
  onClose: external_prop_types_default.a.func
});
card_ModalCard.defaultProps = card_card_objectSpread({}, modifiers.defaultProps, {
  children: null,
  className: undefined,
  style: undefined,
  onClose: undefined
});
/* harmony default export */ var components_card_card = (card_ModalCard);
// CONCATENATED MODULE: ./src/components/modal/components/card/index.js

/* harmony default export */ var components_card = (components_card_card);
// CONCATENATED MODULE: ./src/components/modal/modal.js
function modal_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { modal_typeof = function _typeof(obj) { return typeof obj; }; } else { modal_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return modal_typeof(obj); }

function modal_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function modal_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function modal_createClass(Constructor, protoProps, staticProps) { if (protoProps) modal_defineProperties(Constructor.prototype, protoProps); if (staticProps) modal_defineProperties(Constructor, staticProps); return Constructor; }

function modal_possibleConstructorReturn(self, call) { if (call && (modal_typeof(call) === "object" || typeof call === "function")) { return call; } return modal_assertThisInitialized(self); }

function modal_getPrototypeOf(o) { modal_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return modal_getPrototypeOf(o); }

function modal_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function modal_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) modal_setPrototypeOf(subClass, superClass); }

function modal_setPrototypeOf(o, p) { modal_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return modal_setPrototypeOf(o, p); }

function modal_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







var KEYCODES = {
  ESCAPE: 27
};

var modal_Modal =
/*#__PURE__*/
function (_PureComponent) {
  modal_inherits(Modal, _PureComponent);

  function Modal(props) {
    var _this;

    modal_classCallCheck(this, Modal);

    _this = modal_possibleConstructorReturn(this, modal_getPrototypeOf(Modal).call(this, props));

    modal_defineProperty(modal_assertThisInitialized(_this), "portalElement", null);

    modal_defineProperty(modal_assertThisInitialized(_this), "getDocument", function () {
      if (_this.props.document) {
        return _this.props.document;
      }

      if (typeof document !== 'undefined') {
        return document;
      }

      return null;
    });

    modal_defineProperty(modal_assertThisInitialized(_this), "handleKeydown", function (e) {
      if (e.keyCode === KEYCODES.ESCAPE && _this.props.show) {
        _this.props.onClose();
      }
    });

    _this.state = {};
    return _this;
  }

  modal_createClass(Modal, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var closeOnEsc = this.props.closeOnEsc;
      var doc = this.getDocument();
      this.portalElement = doc.createElement('div');
      this.portalElement.setAttribute('class', 'modal-container');
      doc.body.appendChild(this.portalElement); // eslint-disable-next-line

      if (closeOnEsc) {
        doc.addEventListener('keydown', this.handleKeydown);
      }

      this.forceUpdate();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var doc = this.getDocument();
      var closeOnEsc = this.props.closeOnEsc;

      if (closeOnEsc && doc) {
        doc.removeEventListener('keydown', this.handleKeydown);
      } // IE11 fix


      this.portalElement.parentNode.removeChild(this.portalElement);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          domRef = _this$props.domRef,
          closeOnBlur = _this$props.closeOnBlur,
          show = _this$props.show,
          className = _this$props.className;

      if (!this.getDocument() || !this.portalElement || !show) {
        return null;
      }

      var children = this.props.children;
      var isCard;

      try {
        isCard = external_react_default.a.Children.only(children).type.toString().indexOf('ModalCard') !== -1;
      } catch (e) {
        isCard = false;
      }

      var showClose = !isCard && this.props.showClose;

      if (isCard) {
        children = external_react_default.a.cloneElement(children, {
          onClose: this.props.onClose
        });
      }

      return external_react_dom_default.a.createPortal(external_react_default.a.createElement("div", {
        ref: domRef,
        className: classnames_default()('modal', className, {
          'is-active': show
        })
      }, external_react_default.a.createElement("div", {
        role: "presentation",
        className: "modal-background",
        onClick: closeOnBlur ? this.props.onClose : undefined
      }), children, showClose && external_react_default.a.createElement("button", {
        type: "button",
        onClick: this.props.onClose,
        className: "modal-close is-large",
        "aria-label": "close"
      })), this.portalElement);
    }
  }]);

  return Modal;
}(external_react_["PureComponent"]);

modal_Modal.Content = components_content;
modal_Modal.Card = components_card;
modal_Modal.propTypes = {
  show: external_prop_types_default.a.bool.isRequired,
  onClose: external_prop_types_default.a.func.isRequired,
  closeOnEsc: external_prop_types_default.a.bool,
  closeOnBlur: external_prop_types_default.a.bool,
  showClose: external_prop_types_default.a.bool,
  children: external_prop_types_default.a.node.isRequired,
  document: external_prop_types_default.a.object,
  className: external_prop_types_default.a.string,
  domRef: external_prop_types_default.a.object
};
modal_Modal.defaultProps = {
  closeOnEsc: true,
  showClose: true,
  closeOnBlur: false,
  className: undefined,
  domRef: external_react_default.a.createRef(),
  // Expose mount point for testing
  document: undefined
};
/* harmony default export */ var modal_modal = (modal_Modal);
// CONCATENATED MODULE: ./src/components/modal/index.js


// EXTERNAL MODULE: ./src/components/dropdown/dropdown.sass
var dropdown_dropdown = __webpack_require__(28);

// CONCATENATED MODULE: ./src/components/dropdown/components/item.js
function item_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function item_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { item_ownKeys(source, true).forEach(function (key) { item_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { item_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function item_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function item_extends() { item_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return item_extends.apply(this, arguments); }

function item_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = item_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function item_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }







var item_DropdownItem = function DropdownItem(_ref) {
  var active = _ref.active,
      children = _ref.children,
      value = _ref.value,
      props = item_objectWithoutProperties(_ref, ["active", "children", "value"]);

  return external_react_default.a.createElement(components_element, item_extends({
    title: value
  }, props, {
    role: "presentation",
    className: classnames_default()('dropdown-item', {
      'is-active': active
    })
  }), children);
};

item_DropdownItem.propTypes = item_objectSpread({}, modifiers.propTypes, {
  active: external_prop_types_default.a.bool,
  children: external_prop_types_default.a.node,
  value: external_prop_types_default.a.any.isRequired,
  onClick: external_prop_types_default.a.func
});
item_DropdownItem.defaultProps = item_objectSpread({}, modifiers.defaultProps, {
  active: false,
  onClick: undefined,
  children: null
});
/* harmony default export */ var components_item = (item_DropdownItem);
// CONCATENATED MODULE: ./src/components/dropdown/components/divider.js
function divider_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function divider_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { divider_ownKeys(source, true).forEach(function (key) { divider_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { divider_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function divider_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function divider_extends() { divider_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return divider_extends.apply(this, arguments); }

function divider_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = divider_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function divider_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }







var divider_DropdownDivider = function DropdownDivider(_ref) {
  var className = _ref.className,
      props = divider_objectWithoutProperties(_ref, ["className"]);

  return external_react_default.a.createElement(components_element, divider_extends({
    renderAs: "hr"
  }, props, {
    className: classnames_default()('dropdown-divider', className)
  }));
};

divider_DropdownDivider.propTypes = divider_objectSpread({}, modifiers.propTypes, {
  style: external_prop_types_default.a.shape({}),
  className: external_prop_types_default.a.string
});
divider_DropdownDivider.defaultProps = divider_objectSpread({}, modifiers.defaultProps, {
  style: undefined,
  className: undefined
});
/* harmony default export */ var divider = (divider_DropdownDivider);
// EXTERNAL MODULE: ./src/components/icon/icon.sass
var icon_icon = __webpack_require__(29);

// CONCATENATED MODULE: ./src/components/icon/icon.js
function icon_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function icon_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { icon_ownKeys(source, true).forEach(function (key) { icon_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { icon_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function icon_extends() { icon_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return icon_extends.apply(this, arguments); }

function icon_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function icon_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = icon_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function icon_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }







var icon_colors = [null].concat(Object.keys(constants.COLORS).map(function (key) {
  return constants.COLORS[key];
}));

var icon_Icon = function Icon(_ref) {
  var _classnames;

  var icon = _ref.icon,
      size = _ref.size,
      color = _ref.color,
      className = _ref.className,
      align = _ref.align,
      children = _ref.children,
      props = icon_objectWithoutProperties(_ref, ["icon", "size", "color", "className", "align", "children"]);

  return external_react_default.a.createElement(components_element, icon_extends({
    renderAs: "span"
  }, props, {
    className: classnames_default()('icon', className, (_classnames = {}, icon_defineProperty(_classnames, "is-".concat(size), size), icon_defineProperty(_classnames, "is-".concat(align), align), icon_defineProperty(_classnames, "has-text-".concat(color), color), _classnames))
  }), children || external_react_default.a.createElement("i", {
    className: classnames_default()('rbc', icon_defineProperty({}, "rbc-".concat(icon), icon))
  }));
};

icon_Icon.propTypes = icon_objectSpread({}, modifiers.propTypes, {
  icon: external_prop_types_default.a.string,
  children: external_prop_types_default.a.element,
  className: external_prop_types_default.a.string,
  style: external_prop_types_default.a.shape({}),
  size: external_prop_types_default.a.oneOf(['small', 'medium', 'large', 'auto']),
  align: external_prop_types_default.a.oneOf(['left', 'right']),
  color: external_prop_types_default.a.oneOf(icon_colors)
});
icon_Icon.defaultProps = icon_objectSpread({}, modifiers.defaultProps, {
  className: undefined,
  style: undefined,
  size: undefined,
  color: undefined,
  children: null,
  align: undefined,
  icon: undefined
});
/* harmony default export */ var components_icon_icon = (icon_Icon);
// CONCATENATED MODULE: ./src/components/icon/index.js


// CONCATENATED MODULE: ./src/components/dropdown/dropdown.js
function dropdown_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function dropdown_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { dropdown_ownKeys(source, true).forEach(function (key) { dropdown_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { dropdown_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function dropdown_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { dropdown_typeof = function _typeof(obj) { return typeof obj; }; } else { dropdown_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return dropdown_typeof(obj); }

function dropdown_extends() { dropdown_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return dropdown_extends.apply(this, arguments); }

function dropdown_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = dropdown_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function dropdown_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function dropdown_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function dropdown_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function dropdown_createClass(Constructor, protoProps, staticProps) { if (protoProps) dropdown_defineProperties(Constructor.prototype, protoProps); if (staticProps) dropdown_defineProperties(Constructor, staticProps); return Constructor; }

function dropdown_possibleConstructorReturn(self, call) { if (call && (dropdown_typeof(call) === "object" || typeof call === "function")) { return call; } return dropdown_assertThisInitialized(self); }

function dropdown_getPrototypeOf(o) { dropdown_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return dropdown_getPrototypeOf(o); }

function dropdown_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function dropdown_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) dropdown_setPrototypeOf(subClass, superClass); }

function dropdown_setPrototypeOf(o, p) { dropdown_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return dropdown_setPrototypeOf(o, p); }

function dropdown_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }











var dropdown_colors = [null].concat(Object.values(constants.COLORS));

var dropdown_Dropdown =
/*#__PURE__*/
function (_PureComponent) {
  dropdown_inherits(Dropdown, _PureComponent);

  function Dropdown(props) {
    var _this;

    dropdown_classCallCheck(this, Dropdown);

    _this = dropdown_possibleConstructorReturn(this, dropdown_getPrototypeOf(Dropdown).call(this, props));

    dropdown_defineProperty(dropdown_assertThisInitialized(_this), "close", function (evt) {
      // IDK yet how to test using the ref in enzime
      // istanbul ignore if
      if (_this.props.hoverable || evt && _this.domRef && _this.domRef.current && _this.domRef.current.contains(evt.target)) {
        return;
      }

      if (_this.domRef.current) {
        _this.setState({
          open: false
        });
      }
    });

    dropdown_defineProperty(dropdown_assertThisInitialized(_this), "toggle", function (evt) {
      if (_this.props.hoverable) {
        return;
      }

      if (evt) {
        evt.preventDefault();
      }

      _this.setState(function (_ref) {
        var open = _ref.open;
        return {
          open: !open
        };
      });
    });

    dropdown_defineProperty(dropdown_assertThisInitialized(_this), "select", function (value) {
      return function () {
        if (_this.props.onChange) {
          _this.props.onChange(value);
        }

        if (_this.props.closeOnSelect) {
          _this.close();
        }
      };
    });

    _this.domRef = props.domRef || external_react_default.a.createRef();
    _this.state = {
      open: false
    };
    return _this;
  }

  dropdown_createClass(Dropdown, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      document.addEventListener('click', this.close);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.removeEventListener('click', this.close);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          className = _this$props.className,
          children = _this$props.children,
          value = _this$props.value,
          color = _this$props.color,
          align = _this$props.align,
          right = _this$props.right,
          up = _this$props.up,
          hoverable = _this$props.hoverable,
          label = _this$props.label,
          onChange = _this$props.onChange,
          closeOnSelect = _this$props.closeOnSelect,
          props = dropdown_objectWithoutProperties(_this$props, ["className", "children", "value", "color", "align", "right", "up", "hoverable", "label", "onChange", "closeOnSelect"]);

      var current = label;
      var childrenArray = external_react_default.a.Children.map(children, function (child, i) {
        if (child.type === components_item && (i === 0 && !label || child.props.value === value)) {
          current = child.props.children;
        }

        return external_react_default.a.cloneElement(child, child.type === components_item ? {
          active: child.props.value === value,
          onClick: _this2.select(child.props.value)
        } : {});
      });

      if (align === 'right') {
        // eslint-disable-next-line no-console
        console.warn('react-bulma-components: "Align" prop will be replaced by "right" prop in future releases. Please update your code to avoid breaking changes.');
      }

      return external_react_default.a.createElement(components_element, dropdown_extends({}, props, {
        domRef: this.domRef,
        className: classnames_default()('dropdown', className, {
          'is-active': this.state.open,
          'is-up': up,
          'is-right': right || align === 'right',
          'is-hoverable': hoverable
        })
      }), external_react_default.a.createElement("div", {
        className: "dropdown-trigger",
        role: "presentation",
        onClick: this.toggle
      }, external_react_default.a.createElement(components_button_button, {
        color: color
      }, external_react_default.a.createElement("span", null, current), external_react_default.a.createElement(components_icon_icon, {
        icon: "angle-down",
        size: "small"
      }))), external_react_default.a.createElement("div", {
        className: "dropdown-menu",
        id: "dropdown-menu",
        role: "menu"
      }, external_react_default.a.createElement("div", {
        className: "dropdown-content"
      }, childrenArray)));
    }
  }]);

  return Dropdown;
}(external_react_["PureComponent"]);


dropdown_Dropdown.Item = components_item;
dropdown_Dropdown.Divider = divider;
dropdown_Dropdown.propTypes = dropdown_objectSpread({}, modifiers.propTypes, {
  className: external_prop_types_default.a.string,
  style: external_prop_types_default.a.shape({}),
  children: external_prop_types_default.a.node,
  value: external_prop_types_default.a.any,
  onChange: external_prop_types_default.a.func,
  color: external_prop_types_default.a.oneOf(dropdown_colors),
  right: external_prop_types_default.a.bool,
  up: external_prop_types_default.a.bool,
  align: external_prop_types_default.a.oneOf(['right']),
  hoverable: external_prop_types_default.a.bool,
  label: external_prop_types_default.a.node,
  closeOnSelect: external_prop_types_default.a.bool
});
dropdown_Dropdown.defaultProps = dropdown_objectSpread({}, modifiers.defaultProps, {
  closeOnSelect: true,
  className: undefined,
  renderAs: 'div',
  domRef: undefined,
  style: undefined,
  value: undefined,
  children: [],
  onChange: undefined,
  color: undefined,
  align: undefined,
  hoverable: undefined,
  label: undefined
});
// CONCATENATED MODULE: ./src/components/dropdown/index.js


// EXTERNAL MODULE: ./src/components/loader/loader.sass
var loader = __webpack_require__(30);

// CONCATENATED MODULE: ./src/components/loader/loader.js
function loader_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function loader_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { loader_ownKeys(source, true).forEach(function (key) { loader_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { loader_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function loader_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function loader_extends() { loader_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return loader_extends.apply(this, arguments); }

function loader_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = loader_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function loader_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }








var loader_Loader = function Loader(_ref) {
  var children = _ref.children,
      className = _ref.className,
      props = loader_objectWithoutProperties(_ref, ["children", "className"]);

  return external_react_default.a.createElement(components_element, loader_extends({}, props, {
    className: classnames_default()('loader', className)
  }), children);
};

loader_Loader.propTypes = loader_objectSpread({}, modifiers.propTypes, {
  children: external_prop_types_default.a.node,
  className: external_prop_types_default.a.string,
  style: external_prop_types_default.a.shape({}),
  renderAs: render_as
});
loader_Loader.defaultProps = loader_objectSpread({}, modifiers.defaultProps, {
  children: null,
  className: undefined,
  style: undefined,
  renderAs: 'div'
});
/* harmony default export */ var loader_loader = (loader_Loader);
// CONCATENATED MODULE: ./src/components/loader/index.js


// CONCATENATED MODULE: ./src/services/can-use-dom.js
/* harmony default export */ var can_use_dom = (!!(typeof window !== 'undefined' && window.document && window.document.createElement));
// CONCATENATED MODULE: ./src/components/navbar/components/brand.js
function brand_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function brand_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { brand_ownKeys(source, true).forEach(function (key) { brand_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { brand_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function brand_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function brand_extends() { brand_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return brand_extends.apply(this, arguments); }

function brand_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = brand_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function brand_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }







var brand_NavbarBrand = function NavbarBrand(_ref) {
  var className = _ref.className,
      children = _ref.children,
      props = brand_objectWithoutProperties(_ref, ["className", "children"]);

  return external_react_default.a.createElement(components_element, brand_extends({}, props, {
    className: classnames_default()('navbar-brand', className)
  }), children);
};

brand_NavbarBrand.propTypes = brand_objectSpread({}, modifiers.propTypes, {
  style: external_prop_types_default.a.shape({}),
  className: external_prop_types_default.a.string,
  children: external_prop_types_default.a.node
});
brand_NavbarBrand.defaultProps = brand_objectSpread({}, modifiers.defaultProps, {
  style: undefined,
  className: undefined,
  children: null
});
/* harmony default export */ var brand = (brand_NavbarBrand);
// CONCATENATED MODULE: ./src/components/navbar/context.js

var ShowContext = external_react_default.a.createContext(false);
// CONCATENATED MODULE: ./src/components/navbar/components/burger.js
function burger_extends() { burger_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return burger_extends.apply(this, arguments); }

function burger_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function burger_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { burger_ownKeys(source, true).forEach(function (key) { burger_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { burger_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function burger_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function burger_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = burger_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function burger_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }








var burger_NavbarBurger = function NavbarBurger(_ref) {
  var style = _ref.style,
      className = _ref.className,
      props = burger_objectWithoutProperties(_ref, ["style", "className"]);

  return external_react_default.a.createElement(ShowContext.Consumer, null, function (active) {
    return external_react_default.a.createElement(components_element, burger_extends({
      role: "button",
      tabIndex: "0",
      style: burger_objectSpread({
        outline: 'none'
      }, style),
      className: classnames_default()('navbar-burger', className, {
        'is-active': active
      })
    }, props), external_react_default.a.createElement("span", null), external_react_default.a.createElement("span", null), external_react_default.a.createElement("span", null));
  });
};

burger_NavbarBurger.propTypes = burger_objectSpread({}, modifiers.propTypes, {
  style: external_prop_types_default.a.shape({}),
  className: external_prop_types_default.a.string,
  onClick: external_prop_types_default.a.func
});
burger_NavbarBurger.defaultProps = burger_objectSpread({}, modifiers.defaultProps, {
  style: undefined,
  className: undefined,
  onClick: function onClick() {}
});
/* harmony default export */ var burger = (burger_NavbarBurger);
// CONCATENATED MODULE: ./src/components/navbar/components/menu.js
function menu_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function menu_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { menu_ownKeys(source, true).forEach(function (key) { menu_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { menu_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function menu_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function menu_extends() { menu_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return menu_extends.apply(this, arguments); }

function menu_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = menu_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function menu_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }








var menu_NavbarMenu = function NavbarMenu(_ref) {
  var className = _ref.className,
      children = _ref.children,
      props = menu_objectWithoutProperties(_ref, ["className", "children"]);

  return external_react_default.a.createElement(ShowContext.Consumer, null, function (active) {
    return external_react_default.a.createElement(components_element, menu_extends({}, props, {
      className: classnames_default()('navbar-menu', className, {
        'is-active': active
      })
    }), children);
  });
};

menu_NavbarMenu.propTypes = menu_objectSpread({}, modifiers.propTypes, {
  style: external_prop_types_default.a.shape({}),
  className: external_prop_types_default.a.string,
  children: external_prop_types_default.a.node
});
menu_NavbarMenu.defaultProps = menu_objectSpread({}, modifiers.defaultProps, {
  style: undefined,
  className: undefined,
  children: null
});
/* harmony default export */ var menu = (menu_NavbarMenu);
// CONCATENATED MODULE: ./src/components/navbar/components/item.js
function components_item_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function components_item_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { components_item_ownKeys(source, true).forEach(function (key) { components_item_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { components_item_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function components_item_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function components_item_extends() { components_item_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return components_item_extends.apply(this, arguments); }

function components_item_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = components_item_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function components_item_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }








var item_NavbarItem = function NavbarItem(_ref) {
  var className = _ref.className,
      active = _ref.active,
      children = _ref.children,
      dropdown = _ref.dropdown,
      dropdownUp = _ref.dropdownUp,
      hoverable = _ref.hoverable,
      renderAs = _ref.renderAs,
      arrowless = _ref.arrowless,
      props = components_item_objectWithoutProperties(_ref, ["className", "active", "children", "dropdown", "dropdownUp", "hoverable", "renderAs", "arrowless"]);

  var as = renderAs;

  if (dropdown && renderAs === 'a') {
    as = 'span';
  }

  return external_react_default.a.createElement(components_element, components_item_extends({}, props, {
    renderAs: as,
    className: classnames_default()('navbar-item', className, {
      'is-active': active,
      'has-dropdown': dropdown,
      'is-hoverable': hoverable,
      'has-dropdown-up': dropdownUp,
      'is-arrowless': arrowless
    })
  }), children);
};

item_NavbarItem.propTypes = components_item_objectSpread({}, modifiers.propTypes, {
  style: external_prop_types_default.a.shape({}),
  className: external_prop_types_default.a.string,
  active: external_prop_types_default.a.bool,
  dropdown: external_prop_types_default.a.bool,
  dropdownUp: external_prop_types_default.a.bool,
  hoverable: external_prop_types_default.a.bool,
  children: external_prop_types_default.a.node,
  arrowless: external_prop_types_default.a.bool,
  renderAs: render_as
});
item_NavbarItem.defaultProps = components_item_objectSpread({}, modifiers.defaultProps, {
  style: undefined,
  className: undefined,
  active: undefined,
  children: null,
  dropdown: undefined,
  hoverable: undefined,
  dropdownUp: undefined,
  arrowless: undefined,
  renderAs: 'a'
});
/* harmony default export */ var navbar_components_item = (item_NavbarItem);
// CONCATENATED MODULE: ./src/components/navbar/components/dropdown.js
function components_dropdown_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function components_dropdown_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { components_dropdown_ownKeys(source, true).forEach(function (key) { components_dropdown_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { components_dropdown_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function components_dropdown_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function components_dropdown_extends() { components_dropdown_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return components_dropdown_extends.apply(this, arguments); }

function components_dropdown_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = components_dropdown_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function components_dropdown_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }








var dropdown_NavbarDropdown = function NavbarDropdown(_ref) {
  var className = _ref.className,
      boxed = _ref.boxed,
      right = _ref.right,
      children = _ref.children,
      props = components_dropdown_objectWithoutProperties(_ref, ["className", "boxed", "right", "children"]);

  return external_react_default.a.createElement(components_element, components_dropdown_extends({}, props, {
    className: classnames_default()('navbar-dropdown', className, {
      'is-boxed': boxed,
      'is-right': right
    })
  }), children);
};

dropdown_NavbarDropdown.propTypes = components_dropdown_objectSpread({}, modifiers.propTypes, {
  style: external_prop_types_default.a.shape({}),
  className: external_prop_types_default.a.string,
  children: external_prop_types_default.a.node,
  renderAs: render_as,
  boxed: external_prop_types_default.a.bool,
  right: external_prop_types_default.a.bool
});
dropdown_NavbarDropdown.defaultProps = components_dropdown_objectSpread({}, modifiers.defaultProps, {
  className: undefined,
  children: null,
  renderAs: 'span',
  boxed: false,
  right: false
});
/* harmony default export */ var components_dropdown = (dropdown_NavbarDropdown);
// CONCATENATED MODULE: ./src/components/navbar/components/divider.js
function components_divider_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function components_divider_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { components_divider_ownKeys(source, true).forEach(function (key) { components_divider_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { components_divider_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function components_divider_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function components_divider_extends() { components_divider_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return components_divider_extends.apply(this, arguments); }

function components_divider_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = components_divider_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function components_divider_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }







var divider_NavbarDivider = function NavbarDivider(_ref) {
  var className = _ref.className,
      props = components_divider_objectWithoutProperties(_ref, ["className"]);

  return external_react_default.a.createElement(components_element, components_divider_extends({}, props, {
    className: classnames_default()('navbar-divider', className)
  }));
};

divider_NavbarDivider.propTypes = components_divider_objectSpread({}, modifiers.propTypes, {
  style: external_prop_types_default.a.shape({}),
  className: external_prop_types_default.a.string
});
divider_NavbarDivider.defaultProps = components_divider_objectSpread({}, modifiers.defaultProps, {
  style: undefined,
  className: undefined
});
/* harmony default export */ var components_divider = (divider_NavbarDivider);
// CONCATENATED MODULE: ./src/components/navbar/components/link.js
function link_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function link_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { link_ownKeys(source, true).forEach(function (key) { link_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { link_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function link_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function link_extends() { link_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return link_extends.apply(this, arguments); }

function link_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = link_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function link_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }








var link_NavbarLink = function NavbarLink(_ref) {
  var className = _ref.className,
      children = _ref.children,
      arrowless = _ref.arrowless,
      props = link_objectWithoutProperties(_ref, ["className", "children", "arrowless"]);

  return external_react_default.a.createElement(components_element, link_extends({}, props, {
    className: classnames_default()('navbar-link', className, {
      'is-arrowless': arrowless
    })
  }), children);
};

link_NavbarLink.propTypes = link_objectSpread({}, modifiers.propTypes, {
  style: external_prop_types_default.a.shape({}),
  className: external_prop_types_default.a.string,
  children: external_prop_types_default.a.node,
  renderAs: render_as,
  arrowless: external_prop_types_default.a.bool
});
link_NavbarLink.defaultProps = link_objectSpread({}, modifiers.defaultProps, {
  style: undefined,
  className: undefined,
  children: null,
  arrowless: undefined,
  renderAs: 'span'
});
/* harmony default export */ var components_link = (link_NavbarLink);
// CONCATENATED MODULE: ./src/components/navbar/components/container.js
function components_container_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function components_container_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { components_container_ownKeys(source, true).forEach(function (key) { components_container_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { components_container_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function components_container_extends() { components_container_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return components_container_extends.apply(this, arguments); }

function components_container_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function components_container_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = components_container_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function components_container_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }








var container_NavbarContainer = function NavbarContainer(_ref) {
  var className = _ref.className,
      children = _ref.children,
      position = _ref.position,
      props = components_container_objectWithoutProperties(_ref, ["className", "children", "position"]);

  return external_react_default.a.createElement(components_element, components_container_extends({}, props, {
    className: classnames_default()(components_container_defineProperty({}, "navbar-".concat(position), position), className)
  }), children);
};

container_NavbarContainer.propTypes = components_container_objectSpread({}, modifiers.propTypes, {
  style: external_prop_types_default.a.shape({}),
  className: external_prop_types_default.a.string,
  children: external_prop_types_default.a.node,
  renderAs: render_as,
  position: external_prop_types_default.a.oneOf(['start', 'end'])
});
container_NavbarContainer.defaultProps = components_container_objectSpread({}, modifiers.defaultProps, {
  style: undefined,
  className: undefined,
  children: null,
  renderAs: 'div',
  position: 'start'
});
/* harmony default export */ var components_container = (container_NavbarContainer);
// CONCATENATED MODULE: ./src/components/navbar/navbar.js
function navbar_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function navbar_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { navbar_ownKeys(source, true).forEach(function (key) { navbar_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { navbar_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function navbar_extends() { navbar_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return navbar_extends.apply(this, arguments); }

function navbar_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function navbar_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = navbar_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function navbar_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }


















var navbar_colors = [null].concat(Object.keys(constants.COLORS).map(function (key) {
  return constants.COLORS[key];
}));

var navbar_Navbar = function Navbar(_ref) {
  var _classnames;

  var children = _ref.children,
      className = _ref.className,
      fixed = _ref.fixed,
      transparent = _ref.transparent,
      color = _ref.color,
      active = _ref.active,
      props = navbar_objectWithoutProperties(_ref, ["children", "className", "fixed", "transparent", "color", "active"]);
  Object(external_react_["useEffect"])(function () {
    if (!can_use_dom) {
      return function () {};
    }

    var html = window.document.querySelector('html');
    html.classList.remove('has-navbar-fixed-top');
    html.classList.remove('has-navbar-fixed-bottom');

    if (fixed) {
      html.classList.add("has-navbar-fixed-".concat(fixed));
    }

    return function () {
      return window.document.querySelector('html').classList.remove("has-navbar-fixed-".concat(fixed));
    };
  }, [fixed]);
  return external_react_default.a.createElement(ShowContext.Provider, {
    value: active
  }, external_react_default.a.createElement(components_element, navbar_extends({}, props, {
    role: "navigation",
    className: classnames_default()('navbar', modifiers.classnames(props), className, (_classnames = {
      'is-transparent': transparent
    }, navbar_defineProperty(_classnames, "is-fixed-".concat(fixed), fixed), navbar_defineProperty(_classnames, "is-".concat(color), color), _classnames))
  }), children));
};

navbar_Navbar.propTypes = navbar_objectSpread({}, modifiers.propTypes, {
  children: external_prop_types_default.a.node,
  className: external_prop_types_default.a.string,
  style: external_prop_types_default.a.shape({}),
  transparent: external_prop_types_default.a.bool,
  renderAs: render_as,
  fixed: external_prop_types_default.a.oneOf(['top', 'bottom']),
  color: external_prop_types_default.a.oneOf(navbar_colors),
  active: external_prop_types_default.a.bool
});
navbar_Navbar.defaultProps = navbar_objectSpread({}, modifiers.defaultProps, {
  children: null,
  className: undefined,
  style: undefined,
  renderAs: 'nav',
  transparent: false,
  active: false,
  fixed: undefined,
  color: undefined
});
navbar_Navbar.Brand = brand;
navbar_Navbar.Burger = burger;
navbar_Navbar.Menu = menu;
navbar_Navbar.Item = navbar_components_item;
navbar_Navbar.Dropdown = components_dropdown;
navbar_Navbar.Link = components_link;
navbar_Navbar.Divider = components_divider;
navbar_Navbar.Container = components_container;
/* harmony default export */ var navbar = (navbar_Navbar);
// EXTERNAL MODULE: ./src/components/navbar/navbar.sass
var navbar_navbar = __webpack_require__(31);

// CONCATENATED MODULE: ./src/components/navbar/index.js


/* harmony default export */ var components_navbar = (navbar);

// EXTERNAL MODULE: ./src/components/tabs/tabs.sass
var tabs = __webpack_require__(32);

// CONCATENATED MODULE: ./src/components/tabs/components/tab.js
function tab_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function tab_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { tab_ownKeys(source, true).forEach(function (key) { tab_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { tab_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function tab_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function tab_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = tab_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function tab_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }








var tab_Tab = function Tab(_ref) {
  var children = _ref.children,
      className = _ref.className,
      style = _ref.style,
      active = _ref.active,
      domRef = _ref.domRef,
      props = tab_objectWithoutProperties(_ref, ["children", "className", "style", "active", "domRef"]);

  return external_react_default.a.createElement("li", {
    ref: domRef,
    style: style,
    className: classnames_default()(className, {
      'is-active': active
    })
  }, external_react_default.a.createElement(components_element, props, children));
};

tab_Tab.propTypes = tab_objectSpread({}, modifiers.propTypes, {
  children: external_prop_types_default.a.node,
  className: external_prop_types_default.a.string,
  style: external_prop_types_default.a.shape({}),
  renderAs: render_as,
  active: external_prop_types_default.a.bool
});
tab_Tab.defaultProps = tab_objectSpread({}, modifiers.defaultProps, {
  children: null,
  className: undefined,
  style: undefined,
  renderAs: 'a',
  active: false
});
/* harmony default export */ var tab = (tab_Tab);
// CONCATENATED MODULE: ./src/components/tabs/tabs.js
function tabs_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function tabs_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { tabs_ownKeys(source, true).forEach(function (key) { tabs_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { tabs_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function tabs_extends() { tabs_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return tabs_extends.apply(this, arguments); }

function tabs_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function tabs_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = tabs_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function tabs_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }









var tabs_Tabs = function Tabs(_ref) {
  var _classnames;

  var children = _ref.children,
      className = _ref.className,
      align = _ref.align,
      size = _ref.size,
      type = _ref.type,
      fullwidth = _ref.fullwidth,
      props = tabs_objectWithoutProperties(_ref, ["children", "className", "align", "size", "type", "fullwidth"]);

  return external_react_default.a.createElement(components_element, tabs_extends({}, props, {
    className: classnames_default()('tabs', className, (_classnames = {}, tabs_defineProperty(_classnames, "is-".concat(align), align), tabs_defineProperty(_classnames, "is-".concat(size), size), tabs_defineProperty(_classnames, 'is-toggle', type === 'toggle-rounded'), tabs_defineProperty(_classnames, "is-".concat(type), type), tabs_defineProperty(_classnames, 'is-fullwidth', fullwidth), _classnames))
  }), external_react_default.a.createElement("ul", null, children));
};

tabs_Tabs.Tab = tab;
tabs_Tabs.propTypes = tabs_objectSpread({}, modifiers.propTypes, {
  children: external_prop_types_default.a.node,
  className: external_prop_types_default.a.string,
  style: external_prop_types_default.a.shape({}),
  renderAs: render_as,
  align: external_prop_types_default.a.oneOf(['centered', 'right']),
  size: external_prop_types_default.a.oneOf(['small', 'medium', 'large']),

  /** This is called style on Bulma documentation */
  type: external_prop_types_default.a.oneOf(['toggle', 'boxed', 'toggle-rounded']),
  fullwidth: external_prop_types_default.a.bool
});
tabs_Tabs.defaultProps = tabs_objectSpread({}, modifiers.defaultProps, {
  children: null,
  className: undefined,
  style: undefined,
  renderAs: 'div',
  align: undefined,
  size: undefined,
  type: undefined,
  fullwidth: false
});
/* harmony default export */ var tabs_tabs = (tabs_Tabs);
// CONCATENATED MODULE: ./src/components/tabs/index.js


// EXTERNAL MODULE: ./src/components/pagination/pagination.sass
var pagination = __webpack_require__(33);

// CONCATENATED MODULE: ./src/components/pagination/pagination.js
function pagination_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function pagination_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { pagination_ownKeys(source, true).forEach(function (key) { pagination_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { pagination_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function pagination_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { pagination_typeof = function _typeof(obj) { return typeof obj; }; } else { pagination_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return pagination_typeof(obj); }

function pagination_extends() { pagination_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return pagination_extends.apply(this, arguments); }

function pagination_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = pagination_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function pagination_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function pagination_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function pagination_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function pagination_createClass(Constructor, protoProps, staticProps) { if (protoProps) pagination_defineProperties(Constructor.prototype, protoProps); if (staticProps) pagination_defineProperties(Constructor, staticProps); return Constructor; }

function pagination_possibleConstructorReturn(self, call) { if (call && (pagination_typeof(call) === "object" || typeof call === "function")) { return call; } return pagination_assertThisInitialized(self); }

function pagination_getPrototypeOf(o) { pagination_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return pagination_getPrototypeOf(o); }

function pagination_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function pagination_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) pagination_setPrototypeOf(subClass, superClass); }

function pagination_setPrototypeOf(o, p) { pagination_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return pagination_setPrototypeOf(o, p); }

function pagination_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







var pagination_Pagination =
/*#__PURE__*/
function (_React$PureComponent) {
  pagination_inherits(Pagination, _React$PureComponent);

  function Pagination() {
    var _getPrototypeOf2;

    var _this;

    pagination_classCallCheck(this, Pagination);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = pagination_possibleConstructorReturn(this, (_getPrototypeOf2 = pagination_getPrototypeOf(Pagination)).call.apply(_getPrototypeOf2, [this].concat(args)));

    pagination_defineProperty(pagination_assertThisInitialized(_this), "goToPage", function (page) {
      return function (evt) {
        evt.preventDefault();
        var onChange = _this.props.onChange;
        onChange(page);
      };
    });

    pagination_defineProperty(pagination_assertThisInitialized(_this), "firstPage", function (current, last) {
      var delta = _this.props.delta;

      if (current === 1) {
        return 1;
      }

      var minPage = last - delta * 2;
      var page = Math.min(current - delta, minPage);
      return page <= 0 ? 1 : page;
    });

    pagination_defineProperty(pagination_assertThisInitialized(_this), "lastPage", function (current, total) {
      var delta = _this.props.delta;

      if (current === total) {
        return total;
      }

      var maxPage = delta * 2 + 1;
      var page = Math.max(current + delta, maxPage);
      return page > total ? total : page;
    });

    return _this;
  }

  pagination_createClass(Pagination, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          current = _this$props.current,
          disabled = _this$props.disabled,
          total = _this$props.total,
          next = _this$props.next,
          previous = _this$props.previous,
          showPrevNext = _this$props.showPrevNext,
          delta = _this$props.delta,
          autoHide = _this$props.autoHide,
          className = _this$props.className,
          onChange = _this$props.onChange,
          props = pagination_objectWithoutProperties(_this$props, ["current", "disabled", "total", "next", "previous", "showPrevNext", "delta", "autoHide", "className", "onChange"]);

      if (total <= 1 && autoHide) {
        return null;
      }

      if (current > total) {
        return null;
      }

      var lastPage = this.lastPage(current, total);
      var firstPage = this.firstPage(current, lastPage);
      var prevDisabled = current === 1 || disabled;
      var nextDisabled = current === total || disabled;
      return external_react_default.a.createElement(components_element, pagination_extends({}, props, {
        className: classnames_default()('pagination', className),
        "aria-label": "pagination"
      }), showPrevNext && external_react_default.a.createElement(external_react_default.a.Fragment, null, external_react_default.a.createElement("a", {
        role: "button",
        tabIndex: 0,
        onClick: prevDisabled ? undefined : this.goToPage(current - 1),
        className: "pagination-previous",
        title: "This is the first page",
        disabled: prevDisabled
      }, previous), external_react_default.a.createElement("a", {
        role: "button",
        tabIndex: 0,
        onClick: nextDisabled ? undefined : this.goToPage(current + 1),
        className: "pagination-next",
        disabled: nextDisabled
      }, next)), delta > 0 && external_react_default.a.createElement(external_react_default.a.Fragment, null, external_react_default.a.createElement("ul", {
        className: "pagination-list"
      }, Array(lastPage - firstPage + 1).fill(0).map(function (_, i) {
        return (// eslint-disable-next-line react/no-array-index-key
          external_react_default.a.createElement("li", {
            key: i + firstPage
          }, external_react_default.a.createElement("a", {
            role: "button",
            tabIndex: 0,
            className: classnames_default()('pagination-link', {
              'is-current': current === i + firstPage
            }),
            onClick: current === firstPage + i ? undefined : _this2.goToPage(firstPage + i),
            "aria-label": "Page ".concat(i + firstPage),
            "aria-current": "page",
            disabled: disabled
          }, i + firstPage))
        );
      }))));
    }
  }]);

  return Pagination;
}(external_react_default.a.PureComponent);


pagination_Pagination.propTypes = pagination_objectSpread({}, modifiers.propTypes, {
  /** Current page */
  current: external_prop_types_default.a.number,

  /** whether to disable the buttons */
  disabled: external_prop_types_default.a.bool,

  /** Total pages in total */
  total: external_prop_types_default.a.number,

  /** Amount og pages to display at the left and right of the current (if delta 2 and current page is 3, the paginator will display pages from 1 to 5) */
  delta: external_prop_types_default.a.number,
  onChange: external_prop_types_default.a.func,

  /** Text of the Next button */
  next: external_prop_types_default.a.node,

  /** Text of the Previous button */
  previous: external_prop_types_default.a.node,
  showPrevNext: external_prop_types_default.a.bool,
  autoHide: external_prop_types_default.a.bool,

  /**
   * Classname of the container of the pagination, this could be used to customize the inner views
   */
  className: external_prop_types_default.a.string
});
pagination_Pagination.defaultProps = pagination_objectSpread({}, modifiers.defaultProps, {
  total: 1,
  current: 1,
  delta: 1,
  onChange: function onChange() {},
  next: 'Next',
  previous: 'Previous',
  showPrevNext: true,
  disabled: undefined,
  autoHide: true,
  className: undefined,
  renderAs: 'nav'
});
// CONCATENATED MODULE: ./src/components/pagination/index.js


// EXTERNAL MODULE: ./src/components/menu/menu.sass
var menu_menu = __webpack_require__(34);

// CONCATENATED MODULE: ./src/components/menu/components/list/components/item.js
function list_components_item_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function list_components_item_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { list_components_item_ownKeys(source, true).forEach(function (key) { list_components_item_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { list_components_item_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function list_components_item_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function list_components_item_extends() { list_components_item_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return list_components_item_extends.apply(this, arguments); }

function list_components_item_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = list_components_item_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function list_components_item_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }




/* eslint-disable-next-line import/no-cycle */






var item_MenuListItem = function MenuListItem(_ref) {
  var children = _ref.children,
      active = _ref.active,
      className = _ref.className,
      ref = _ref.domRef,
      props = list_components_item_objectWithoutProperties(_ref, ["children", "active", "className", "domRef"]);

  if (typeof children !== 'string' && external_react_default.a.Children.toArray(children).length === 1 && external_react_default.a.Children.only(children).type === components_list_list) {
    var child = external_react_default.a.Children.only(children);
    return external_react_default.a.createElement("li", {
      ref: ref
    }, external_react_default.a.createElement(components_element, list_components_item_extends({
      className: classnames_default()(className, {
        'is-active': active
      })
    }, props), child.props.title), external_react_default.a.cloneElement(child, {
      title: undefined
    }));
  }

  return external_react_default.a.createElement("li", {
    ref: ref
  }, external_react_default.a.createElement(components_element, list_components_item_extends({
    className: classnames_default()(className, {
      'is-active': active
    })
  }, props), children));
};

item_MenuListItem.propTypes = list_components_item_objectSpread({}, modifiers.propTypes, {
  className: external_prop_types_default.a.string,
  children: external_prop_types_default.a.oneOfType([external_prop_types_default.a.string, external_prop_types_default.a.element]),
  active: external_prop_types_default.a.bool,
  renderAs: render_as
});
item_MenuListItem.defaultProps = list_components_item_objectSpread({}, modifiers.defaultProps, {
  className: undefined,
  children: null,
  active: false,
  renderAs: 'a'
});
/* harmony default export */ var list_components_item = (item_MenuListItem);
// CONCATENATED MODULE: ./src/components/menu/components/list/list.js
function list_list_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function list_list_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { list_list_ownKeys(source, true).forEach(function (key) { list_list_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { list_list_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function list_list_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function list_list_extends() { list_list_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return list_list_extends.apply(this, arguments); }

function list_list_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = list_list_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function list_list_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }




/* eslint-disable-next-line import/no-cycle */





var list_MenuList = function MenuList(_ref) {
  var className = _ref.className,
      title = _ref.title,
      props = list_list_objectWithoutProperties(_ref, ["className", "title"]);

  return external_react_default.a.createElement(external_react_default.a.Fragment, null, title && external_react_default.a.createElement("p", {
    className: "menu-label"
  }, title), external_react_default.a.createElement(components_element, list_list_extends({
    renderAs: "ul",
    className: classnames_default()('menu-list', className)
  }, props)));
};

list_MenuList.Item = list_components_item;
list_MenuList.propTypes = list_list_objectSpread({}, modifiers.propTypes, {
  className: external_prop_types_default.a.string,
  title: external_prop_types_default.a.node
});
list_MenuList.defaultProps = list_list_objectSpread({}, modifiers.defaultProps, {
  className: undefined,
  title: undefined
});
/* harmony default export */ var components_list_list = (list_MenuList);
// CONCATENATED MODULE: ./src/components/menu/components/list/index.js

// CONCATENATED MODULE: ./src/components/menu/menu.js
function menu_menu_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function menu_menu_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { menu_menu_ownKeys(source, true).forEach(function (key) { menu_menu_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { menu_menu_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function menu_menu_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function menu_menu_extends() { menu_menu_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return menu_menu_extends.apply(this, arguments); }

function menu_menu_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = menu_menu_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function menu_menu_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }









var menu_Menu = function Menu(_ref) {
  var className = _ref.className,
      props = menu_menu_objectWithoutProperties(_ref, ["className"]);

  return external_react_default.a.createElement(components_element, menu_menu_extends({}, props, {
    className: classnames_default()('menu', className)
  }));
};

menu_Menu.List = components_list_list;
menu_Menu.propTypes = menu_menu_objectSpread({}, modifiers.propTypes, {
  className: external_prop_types_default.a.string,
  renderAs: render_as
});
menu_Menu.defaultProps = menu_menu_objectSpread({}, modifiers.defaultProps, {
  className: undefined,
  renderAs: 'aside'
});
/* harmony default export */ var components_menu_menu = (menu_Menu);
// CONCATENATED MODULE: ./src/components/menu/index.js


// EXTERNAL MODULE: ./src/components/message/message.sass
var message = __webpack_require__(35);

// CONCATENATED MODULE: ./src/components/message/components/body.js
function components_body_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function components_body_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { components_body_ownKeys(source, true).forEach(function (key) { components_body_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { components_body_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function components_body_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function components_body_extends() { components_body_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return components_body_extends.apply(this, arguments); }

function components_body_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = components_body_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function components_body_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }








var body_MessageBody = function MessageBody(_ref) {
  var children = _ref.children,
      className = _ref.className,
      props = components_body_objectWithoutProperties(_ref, ["children", "className"]);

  return external_react_default.a.createElement(components_element, components_body_extends({}, props, {
    className: classnames_default()('message-body', className)
  }), children);
};

body_MessageBody.propTypes = components_body_objectSpread({}, modifiers.propTypes, {
  children: external_prop_types_default.a.node,
  className: external_prop_types_default.a.string,
  renderAs: render_as
});
body_MessageBody.defaultProps = components_body_objectSpread({}, modifiers.defaultProps, {
  children: null,
  className: undefined,
  renderAs: 'div'
});
/* harmony default export */ var components_body = (body_MessageBody);
// CONCATENATED MODULE: ./src/components/message/components/header.js
function components_header_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function components_header_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { components_header_ownKeys(source, true).forEach(function (key) { components_header_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { components_header_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function components_header_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function components_header_extends() { components_header_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return components_header_extends.apply(this, arguments); }

function components_header_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = components_header_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function components_header_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }








var header_MessageHeader = function MessageHeader(_ref) {
  var children = _ref.children,
      className = _ref.className,
      props = components_header_objectWithoutProperties(_ref, ["children", "className"]);

  return external_react_default.a.createElement(components_element, components_header_extends({}, props, {
    className: classnames_default()('message-header', className)
  }), children);
};

header_MessageHeader.propTypes = components_header_objectSpread({}, modifiers.propTypes, {
  children: external_prop_types_default.a.node,
  className: external_prop_types_default.a.string,
  renderAs: render_as
});
header_MessageHeader.defaultProps = components_header_objectSpread({}, modifiers.defaultProps, {
  children: null,
  className: undefined,
  renderAs: 'div'
});
/* harmony default export */ var components_header = (header_MessageHeader);
// CONCATENATED MODULE: ./src/components/message/message.js
function message_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function message_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { message_ownKeys(source, true).forEach(function (key) { message_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { message_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function message_extends() { message_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return message_extends.apply(this, arguments); }

function message_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function message_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = message_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function message_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }










var message_colors = [null].concat(Object.keys(constants.COLORS).map(function (key) {
  return constants.COLORS[key];
}));

var message_Message = function Message(_ref) {
  var _classnames;

  var children = _ref.children,
      className = _ref.className,
      color = _ref.color,
      size = _ref.size,
      props = message_objectWithoutProperties(_ref, ["children", "className", "color", "size"]);

  return external_react_default.a.createElement(components_element, message_extends({}, props, {
    className: classnames_default()('message', className, (_classnames = {}, message_defineProperty(_classnames, "is-".concat(color), color), message_defineProperty(_classnames, "is-".concat(size), size), _classnames))
  }), children);
};

message_Message.Body = components_body;
message_Message.Header = components_header;
message_Message.propTypes = message_objectSpread({}, modifiers.propTypes, {
  children: external_prop_types_default.a.node,
  className: external_prop_types_default.a.string,
  style: external_prop_types_default.a.shape({}),
  renderAs: render_as,
  size: external_prop_types_default.a.oneOf(['small', 'medium', 'large']),
  color: external_prop_types_default.a.oneOf(message_colors)
});
message_Message.defaultProps = message_objectSpread({}, modifiers.defaultProps, {
  children: null,
  className: undefined,
  style: undefined,
  renderAs: 'article',
  color: undefined,
  size: undefined
});
/* harmony default export */ var message_message = (message_Message);
// CONCATENATED MODULE: ./src/components/message/index.js


// EXTERNAL MODULE: ./src/components/panel/panel.sass
var panel = __webpack_require__(36);

// CONCATENATED MODULE: ./src/components/panel/components/block.js
function block_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function block_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { block_ownKeys(source, true).forEach(function (key) { block_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { block_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function block_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function block_extends() { block_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return block_extends.apply(this, arguments); }

function block_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = block_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function block_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }








var block_PanelBlock = function PanelBlock(_ref) {
  var className = _ref.className,
      active = _ref.active,
      props = block_objectWithoutProperties(_ref, ["className", "active"]);

  return external_react_default.a.createElement(components_element, block_extends({}, props, {
    className: classnames_default()('panel-block', className, {
      'is-active': active
    })
  }));
};

block_PanelBlock.propTypes = block_objectSpread({}, modifiers.propTypes, {
  className: external_prop_types_default.a.string,
  renderAs: render_as,
  active: external_prop_types_default.a.bool
});
block_PanelBlock.defaultProps = block_objectSpread({}, modifiers.defaultProps, {
  className: undefined,
  renderAs: 'div',
  active: false
});
/* harmony default export */ var block = (block_PanelBlock);
// CONCATENATED MODULE: ./src/components/panel/components/header.js
function panel_components_header_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function panel_components_header_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { panel_components_header_ownKeys(source, true).forEach(function (key) { panel_components_header_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { panel_components_header_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function panel_components_header_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function panel_components_header_extends() { panel_components_header_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return panel_components_header_extends.apply(this, arguments); }

function panel_components_header_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = panel_components_header_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function panel_components_header_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }








var header_PanelHeader = function PanelHeader(_ref) {
  var className = _ref.className,
      props = panel_components_header_objectWithoutProperties(_ref, ["className"]);

  return external_react_default.a.createElement(components_element, panel_components_header_extends({}, props, {
    className: classnames_default()('panel-heading', className)
  }));
};

header_PanelHeader.propTypes = panel_components_header_objectSpread({}, modifiers.propTypes, {
  className: external_prop_types_default.a.string,
  renderAs: render_as
});
header_PanelHeader.defaultProps = panel_components_header_objectSpread({}, modifiers.defaultProps, {
  className: undefined,
  renderAs: 'div'
});
/* harmony default export */ var panel_components_header = (header_PanelHeader);
// CONCATENATED MODULE: ./src/components/panel/components/icon.js
function components_icon_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function components_icon_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { components_icon_ownKeys(source, true).forEach(function (key) { components_icon_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { components_icon_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function components_icon_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function components_icon_extends() { components_icon_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return components_icon_extends.apply(this, arguments); }

function components_icon_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = components_icon_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function components_icon_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }








var icon_PanelIcon = function PanelIcon(_ref) {
  var className = _ref.className,
      props = components_icon_objectWithoutProperties(_ref, ["className"]);

  return external_react_default.a.createElement(components_element, components_icon_extends({}, props, {
    className: classnames_default()('panel-icon', className)
  }));
};

icon_PanelIcon.propTypes = components_icon_objectSpread({}, modifiers.propTypes, {
  className: external_prop_types_default.a.string,
  renderAs: render_as
});
icon_PanelIcon.defaultProps = components_icon_objectSpread({}, modifiers.defaultProps, {
  className: undefined,
  renderAs: 'span'
});
/* harmony default export */ var components_icon = (icon_PanelIcon);
// CONCATENATED MODULE: ./src/components/panel/components/tabs/components/tab.js
function components_tab_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function components_tab_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { components_tab_ownKeys(source, true).forEach(function (key) { components_tab_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { components_tab_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function components_tab_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function tab_extends() { tab_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return tab_extends.apply(this, arguments); }

function components_tab_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = components_tab_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function components_tab_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }








var tab_PanelTabsTab = function PanelTabsTab(_ref) {
  var className = _ref.className,
      active = _ref.active,
      props = components_tab_objectWithoutProperties(_ref, ["className", "active"]);

  return external_react_default.a.createElement(components_element, tab_extends({}, props, {
    className: classnames_default()(className, {
      'is-active': active
    })
  }));
};

tab_PanelTabsTab.propTypes = components_tab_objectSpread({}, modifiers.propTypes, {
  className: external_prop_types_default.a.string,
  renderAs: render_as,
  active: external_prop_types_default.a.bool
});
tab_PanelTabsTab.defaultProps = components_tab_objectSpread({}, modifiers.defaultProps, {
  className: undefined,
  renderAs: 'a',
  active: false
});
/* harmony default export */ var components_tab = (tab_PanelTabsTab);
// CONCATENATED MODULE: ./src/components/panel/components/tabs/tabs.js
function tabs_tabs_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function tabs_tabs_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { tabs_tabs_ownKeys(source, true).forEach(function (key) { tabs_tabs_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { tabs_tabs_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function tabs_tabs_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function tabs_tabs_extends() { tabs_tabs_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return tabs_tabs_extends.apply(this, arguments); }

function tabs_tabs_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = tabs_tabs_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function tabs_tabs_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }









var tabs_PanelTabs = function PanelTabs(_ref) {
  var className = _ref.className,
      props = tabs_tabs_objectWithoutProperties(_ref, ["className"]);

  return external_react_default.a.createElement(components_element, tabs_tabs_extends({}, props, {
    className: classnames_default()('panel-tabs', className)
  }));
};

tabs_PanelTabs.Tab = components_tab;
tabs_PanelTabs.propTypes = tabs_tabs_objectSpread({}, modifiers.propTypes, {
  className: external_prop_types_default.a.string,
  renderAs: render_as
});
tabs_PanelTabs.defaultProps = tabs_tabs_objectSpread({}, modifiers.defaultProps, {
  className: undefined,
  renderAs: 'div'
});
/* harmony default export */ var components_tabs_tabs = (tabs_PanelTabs);
// CONCATENATED MODULE: ./src/components/panel/components/tabs/index.js

// CONCATENATED MODULE: ./src/components/panel/panel.js
function panel_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function panel_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { panel_ownKeys(source, true).forEach(function (key) { panel_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { panel_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function panel_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function panel_extends() { panel_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return panel_extends.apply(this, arguments); }

function panel_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = panel_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function panel_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }












var panel_Panel = function Panel(_ref) {
  var className = _ref.className,
      props = panel_objectWithoutProperties(_ref, ["className"]);

  return external_react_default.a.createElement(components_element, panel_extends({}, props, {
    className: classnames_default()('panel', className)
  }));
};

panel_Panel.Header = panel_components_header;
panel_Panel.Tabs = components_tabs_tabs;
panel_Panel.Block = block;
panel_Panel.Icon = components_icon;
panel_Panel.propTypes = panel_objectSpread({}, modifiers.propTypes, {
  className: external_prop_types_default.a.string,
  renderAs: render_as
});
panel_Panel.defaultProps = panel_objectSpread({}, modifiers.defaultProps, {
  className: undefined,
  renderAs: 'nav'
});
/* harmony default export */ var panel_panel = (panel_Panel);
// CONCATENATED MODULE: ./src/components/panel/index.js


// CONCATENATED MODULE: ./src/index.js
/* concated harmony reexport Box */__webpack_require__.d(__webpack_exports__, "Box", function() { return components_box; });
/* concated harmony reexport Button */__webpack_require__.d(__webpack_exports__, "Button", function() { return components_button_button; });
/* concated harmony reexport Breadcrumb */__webpack_require__.d(__webpack_exports__, "Breadcrumb", function() { return components_breadcrumb; });
/* concated harmony reexport Card */__webpack_require__.d(__webpack_exports__, "Card", function() { return card_card; });
/* concated harmony reexport Columns */__webpack_require__.d(__webpack_exports__, "Columns", function() { return components_columns; });
/* concated harmony reexport Container */__webpack_require__.d(__webpack_exports__, "Container", function() { return container_container; });
/* concated harmony reexport Content */__webpack_require__.d(__webpack_exports__, "Content", function() { return components_content_content; });
/* concated harmony reexport Footer */__webpack_require__.d(__webpack_exports__, "Footer", function() { return components_footer_footer; });
/* concated harmony reexport Form */__webpack_require__.d(__webpack_exports__, "Form", function() { return components_form_namespaceObject; });
/* concated harmony reexport Heading */__webpack_require__.d(__webpack_exports__, "Heading", function() { return components_heading_heading; });
/* concated harmony reexport Hero */__webpack_require__.d(__webpack_exports__, "Hero", function() { return hero_hero; });
/* concated harmony reexport Image */__webpack_require__.d(__webpack_exports__, "Image", function() { return image_Image; });
/* concated harmony reexport Level */__webpack_require__.d(__webpack_exports__, "Level", function() { return level_level; });
/* concated harmony reexport List */__webpack_require__.d(__webpack_exports__, "List", function() { return components_list; });
/* concated harmony reexport Media */__webpack_require__.d(__webpack_exports__, "Media", function() { return media_media; });
/* concated harmony reexport Notification */__webpack_require__.d(__webpack_exports__, "Notification", function() { return components_notification_notification; });
/* concated harmony reexport Progress */__webpack_require__.d(__webpack_exports__, "Progress", function() { return progress_progress; });
/* concated harmony reexport Section */__webpack_require__.d(__webpack_exports__, "Section", function() { return section_section; });
/* concated harmony reexport Table */__webpack_require__.d(__webpack_exports__, "Table", function() { return table_table; });
/* concated harmony reexport Tag */__webpack_require__.d(__webpack_exports__, "Tag", function() { return tag_tag; });
/* concated harmony reexport Tile */__webpack_require__.d(__webpack_exports__, "Tile", function() { return tile_tile; });
/* concated harmony reexport Modal */__webpack_require__.d(__webpack_exports__, "Modal", function() { return modal_modal; });
/* concated harmony reexport Dropdown */__webpack_require__.d(__webpack_exports__, "Dropdown", function() { return dropdown_Dropdown; });
/* concated harmony reexport Icon */__webpack_require__.d(__webpack_exports__, "Icon", function() { return components_icon_icon; });
/* concated harmony reexport Loader */__webpack_require__.d(__webpack_exports__, "Loader", function() { return loader_loader; });
/* concated harmony reexport Navbar */__webpack_require__.d(__webpack_exports__, "Navbar", function() { return components_navbar; });
/* concated harmony reexport Tabs */__webpack_require__.d(__webpack_exports__, "Tabs", function() { return tabs_tabs; });
/* concated harmony reexport Pagination */__webpack_require__.d(__webpack_exports__, "Pagination", function() { return pagination_Pagination; });
/* concated harmony reexport Menu */__webpack_require__.d(__webpack_exports__, "Menu", function() { return components_menu_menu; });
/* concated harmony reexport Message */__webpack_require__.d(__webpack_exports__, "Message", function() { return message_message; });
/* concated harmony reexport Panel */__webpack_require__.d(__webpack_exports__, "Panel", function() { return panel_panel; });
/* concated harmony reexport Element */__webpack_require__.d(__webpack_exports__, "Element", function() { return components_element; });



































/***/ })
/******/ ]);
});

});

var index = unwrapExports(dist);

export default index;
