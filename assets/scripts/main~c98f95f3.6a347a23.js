/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded CSS chunks
/******/ 	var installedCssChunks = {
/******/ 		6: 0
/******/ 	}
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		6: 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "assets/scripts/" + ({"0":"vendors~chess~counter~home~info~noMatch~reminder~253ae210","1":"vendors~chess~reminder~253ae210","2":"chess~21833f8f","3":"counter~31ecd969","4":"home~31ecd969","5":"info~31ecd969","7":"noMatch~21833f8f","8":"reminder~21833f8f","11":"vendors~reminder~253ae210"}[chunkId]||chunkId) + "." + "6a347a23" + ".js"
/******/ 	}
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
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// mini-css-extract-plugin CSS loading
/******/ 		var cssChunks = {"2":1,"3":1,"4":1,"5":1,"7":1,"8":1};
/******/ 		if(installedCssChunks[chunkId]) promises.push(installedCssChunks[chunkId]);
/******/ 		else if(installedCssChunks[chunkId] !== 0 && cssChunks[chunkId]) {
/******/ 			promises.push(installedCssChunks[chunkId] = new Promise(function(resolve, reject) {
/******/ 				var href = "assets/stylesheets/" + ({"0":"vendors~chess~counter~home~info~noMatch~reminder~253ae210","1":"vendors~chess~reminder~253ae210","2":"chess~21833f8f","3":"counter~31ecd969","4":"home~31ecd969","5":"info~31ecd969","7":"noMatch~21833f8f","8":"reminder~21833f8f","11":"vendors~reminder~253ae210"}[chunkId]||chunkId) + "." + "6a347a23" + ".css";
/******/ 				var fullhref = __webpack_require__.p + href;
/******/ 				var existingLinkTags = document.getElementsByTagName("link");
/******/ 				for(var i = 0; i < existingLinkTags.length; i++) {
/******/ 					var tag = existingLinkTags[i];
/******/ 					var dataHref = tag.getAttribute("data-href") || tag.getAttribute("href");
/******/ 					if(tag.rel === "stylesheet" && (dataHref === href || dataHref === fullhref)) return resolve();
/******/ 				}
/******/ 				var existingStyleTags = document.getElementsByTagName("style");
/******/ 				for(var i = 0; i < existingStyleTags.length; i++) {
/******/ 					var tag = existingStyleTags[i];
/******/ 					var dataHref = tag.getAttribute("data-href");
/******/ 					if(dataHref === href || dataHref === fullhref) return resolve();
/******/ 				}
/******/ 				var linkTag = document.createElement("link");
/******/ 				linkTag.rel = "stylesheet";
/******/ 				linkTag.type = "text/css";
/******/ 				linkTag.onload = resolve;
/******/ 				linkTag.onerror = function(event) {
/******/ 					var request = event && event.target && event.target.src || fullhref;
/******/ 					var err = new Error("Loading CSS chunk " + chunkId + " failed.\n(" + request + ")");
/******/ 					err.code = "CSS_CHUNK_LOAD_FAILED";
/******/ 					err.request = request;
/******/ 					delete installedCssChunks[chunkId]
/******/ 					linkTag.parentNode.removeChild(linkTag)
/******/ 					reject(err);
/******/ 				};
/******/ 				linkTag.href = fullhref;
/******/
/******/ 				var head = document.getElementsByTagName("head")[0];
/******/ 				head.appendChild(linkTag);
/******/ 			}).then(function() {
/******/ 				installedCssChunks[chunkId] = 0;
/******/ 			}));
/******/ 		}
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
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
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([259,9,10]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ 102:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return counterInvariant; });
/* unused harmony export RESET */
/* unused harmony export INCREMENT_IF_ODD */
/* unused harmony export INCREMENT_ASYNC */
/* unused harmony export INCREMENT */
/* unused harmony export DECREMENT */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return reset; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return incrementIfOdd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return incrementAsync; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return increment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return decrement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return createCounterReducer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CounterService; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(16);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(21);
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(inversify__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7);
/* harmony import */ var _lib_boni_redux_saga_effects__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(41);
/* harmony import */ var _lib_delay__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(88);





var _dec, _class;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }





function counterInvariant(state) {
  return state.count >= 0;
} //
//                       _|      _|
//   _|_|_|    _|_|_|  _|_|_|_|        _|_|    _|_|_|
// _|    _|  _|          _|      _|  _|    _|  _|    _|
// _|    _|  _|          _|      _|  _|    _|  _|    _|
//   _|_|_|    _|_|_|      _|_|  _|    _|_|    _|    _|
//
//
//
//   _|
// _|_|_|_|  _|    _|  _|_|_|      _|_|      _|_|_|
//   _|      _|    _|  _|    _|  _|_|_|_|  _|_|
//   _|      _|    _|  _|    _|  _|            _|_|
//     _|_|    _|_|_|  _|_|_|      _|_|_|  _|_|_|
//                 _|  _|
//             _|_|    _|

var RESET = '@@react-app-prototype/counter/RESET';
var INCREMENT_IF_ODD = '@@react-app-prototype/counter/INCREMENT_IF_ODD';
var INCREMENT_ASYNC = '@@react-app-prototype/counter/INCREMENT_ASYNC';
var INCREMENT = '@@react-app-prototype/counter/INCREMENT';
var DECREMENT = '@@react-app-prototype/counter/DECREMENT';
var counterActionTypes = [RESET, INCREMENT_IF_ODD, INCREMENT_ASYNC, INCREMENT, DECREMENT];

function isCounterAction(action) {
  return counterActionTypes.includes(action.type);
} //
//                       _|      _|
//   _|_|_|    _|_|_|  _|_|_|_|        _|_|    _|_|_|
// _|    _|  _|          _|      _|  _|    _|  _|    _|
// _|    _|  _|          _|      _|  _|    _|  _|    _|
//   _|_|_|    _|_|_|      _|_|  _|    _|_|    _|    _|
//
//
//
//                                           _|
//   _|_|_|  _|  _|_|    _|_|      _|_|_|  _|_|_|_|    _|_|    _|  _|_|    _|_|_|
// _|        _|_|      _|_|_|_|  _|    _|    _|      _|    _|  _|_|      _|_|
// _|        _|        _|        _|    _|    _|      _|    _|  _|            _|_|
//   _|_|_|  _|          _|_|_|    _|_|_|      _|_|    _|_|    _|        _|_|_|
//
//


var reset = function reset() {
  return {
    type: RESET
  };
};
var incrementIfOdd = function incrementIfOdd() {
  return {
    type: INCREMENT_IF_ODD
  };
};
var incrementAsync = function incrementAsync(ms) {
  return {
    type: INCREMENT_ASYNC,
    payload: {
      ms: ms
    }
  };
};
var increment = function increment() {
  return {
    type: INCREMENT
  };
};
var decrement = function decrement() {
  return {
    type: DECREMENT
  };
}; //
//                           _|
// _|  _|_|    _|_|      _|_|_|  _|    _|    _|_|_|    _|_|    _|  _|_|
// _|_|      _|_|_|_|  _|    _|  _|    _|  _|        _|_|_|_|  _|_|
// _|        _|        _|    _|  _|    _|  _|        _|        _|
// _|          _|_|_|    _|_|_|    _|_|_|    _|_|_|    _|_|_|  _|
//
//

var createCounterReducer = function createCounterReducer(initialState) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments.length > 1 ? arguments[1] : undefined;

    if (!isCounterAction(action)) {
      return state;
    }

    switch (action.type) {
      case RESET:
        return initialState;

      case INCREMENT_IF_ODD:
      case INCREMENT_ASYNC:
        return state;

      case INCREMENT:
        return _objectSpread({}, state, {
          count: state.count + 1
        });

      case DECREMENT:
        return _objectSpread({}, state, {
          count: state.count - 1
        });
    }
  };
}; //
//                                           _|
//   _|_|_|    _|_|    _|  _|_|  _|      _|        _|_|_|    _|_|
// _|_|      _|_|_|_|  _|_|      _|      _|  _|  _|        _|_|_|_|
//     _|_|  _|        _|          _|  _|    _|  _|        _|
// _|_|_|      _|_|_|  _|            _|      _|    _|_|_|    _|_|_|
//
//

var CounterService = (_dec = Object(inversify__WEBPACK_IMPORTED_MODULE_4__["injectable"])(), _dec(_class =
/*#__PURE__*/
function () {
  function CounterService() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, CounterService);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(CounterService, [{
    key: "incrementIfOddSaga",
    value:
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function incrementIfOddSaga() {
      var _ref, count;

      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function incrementIfOddSaga$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_5__[/* select */ "e"])();

            case 2:
              _ref = _context.sent;
              count = _ref.counter.count;

              if (!(count % 2 !== 0)) {
                _context.next = 7;
                break;
              }

              _context.next = 7;
              return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_5__[/* put */ "d"])(increment());

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, incrementIfOddSaga);
    })
  }, {
    key: "incrementAsyncSaga",
    value:
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function incrementAsyncSaga(_ref2) {
      var ms;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function incrementAsyncSaga$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              ms = _ref2.payload.ms;
              _context2.next = 3;
              return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_5__[/* call */ "a"])(_lib_delay__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], ms);

            case 3:
              _context2.next = 5;
              return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_5__[/* put */ "d"])(increment());

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, incrementAsyncSaga);
    })
  }, {
    key: "rootSaga",
    value:
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function rootSaga() {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function rootSaga$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return Object(_lib_boni_redux_saga_effects__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"])(INCREMENT_IF_ODD, [this, this.incrementIfOddSaga]);

            case 2:
              _context3.next = 4;
              return Object(_lib_boni_redux_saga_effects__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"])(INCREMENT_ASYNC, [this, this.incrementAsyncSaga]);

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, rootSaga, this);
    })
  }]);

  return CounterService;
}()) || _class);

/***/ }),

/***/ 103:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__(4);
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/classCallCheck.js
var classCallCheck = __webpack_require__(12);
var classCallCheck_default = /*#__PURE__*/__webpack_require__.n(classCallCheck);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/createClass.js
var createClass = __webpack_require__(16);
var createClass_default = /*#__PURE__*/__webpack_require__.n(createClass);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/defineProperty.js
var defineProperty = __webpack_require__(20);
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty);

// EXTERNAL MODULE: ./node_modules/immutable/dist/immutable.es.js
var immutable_es = __webpack_require__(84);

// EXTERNAL MODULE: ./node_modules/inversify/lib/inversify.js
var inversify = __webpack_require__(21);

// EXTERNAL MODULE: ./node_modules/redux-saga/dist/redux-saga-effects-npm-proxy.esm.js
var redux_saga_effects_npm_proxy_esm = __webpack_require__(7);

// EXTERNAL MODULE: ./src/domain/vo/Coordinates.ts
var Coordinates = __webpack_require__(14);

// EXTERNAL MODULE: ./src/lib/boni/redux-saga/effects/takeEvery.ts
var takeEvery = __webpack_require__(41);

// EXTERNAL MODULE: ./src/lib/extensions/Eq/equalsChessmen.ts
var equalsChessmen = __webpack_require__(142);

// CONCATENATED MODULE: ./src/utils/chess/getCoordinatesAttackedBy.ts
function getCoordinatesAttackedBy(_chessman, _coord, _board) {
  return [{
    file: 1,
    rank: 1
  }]; // TODO
}
// CONCATENATED MODULE: ./src/redux/modules/chess.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return chessInvariant; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return resetBoard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return halfMove; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return pickChessman; });
/* unused harmony export putChessman */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return releaseChessman; });
/* unused harmony export removeChessman */
/* unused harmony export setTargets */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return chess_createChessReducer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return chess_ChessService; });





var _dec, _class;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { defineProperty_default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }







 //
//             _|                  _|
//   _|_|_|  _|_|_|_|    _|_|_|  _|_|_|_|    _|_|
// _|_|        _|      _|    _|    _|      _|_|_|_|
//     _|_|    _|      _|    _|    _|      _|
// _|_|_|        _|_|    _|_|_|      _|_|    _|_|_|
//
//

function chessInvariant(_ref) {
  var board = _ref.board,
      picking = _ref.picking,
      targets = _ref.targets;
  return (picking == null || !board.chessmen.has(new Coordinates["a" /* default */](picking.source)) || existsCoordinatedChessman(picking.chessman, picking.source, board)) && ( // any picking → (any chessman at picking.source on board → chessman at picking.source on board = picking.chessman)
  picking != null || targets == null) // no picking → no targets
  ;
}

function existsCoordinatedChessman(chessman, coord, board) {
  var actual = board.chessmen.get(new Coordinates["a" /* default */](coord));
  return actual !== undefined && Object(equalsChessmen["a" /* default */])(actual, chessman);
} //
//                       _|      _|
//   _|_|_|    _|_|_|  _|_|_|_|        _|_|    _|_|_|
// _|    _|  _|          _|      _|  _|    _|  _|    _|
// _|    _|  _|          _|      _|  _|    _|  _|    _|
//   _|_|_|    _|_|_|      _|_|  _|    _|_|    _|    _|
//
//
//
//   _|
// _|_|_|_|  _|    _|  _|_|_|      _|_|      _|_|_|
//   _|      _|    _|  _|    _|  _|_|_|_|  _|_|
//   _|      _|    _|  _|    _|  _|            _|_|
//     _|_|    _|_|_|  _|_|_|      _|_|_|  _|_|_|
//                 _|  _|
//             _|_|    _|


var RESET_BOARD = '@@react-app-base/chess/RESET_BOARD';
var HALF_MOVE = '@@react-app-base/chess/HALF_MOVE'; // neither castle nor capture pawn en passant

var PICK_CHESSMAN = '@@react-app-base/chess/PICK_CHESSMAN';
var PUT_CHESSMAN = '@@react-app-base/chess/PUT_CHESSMAN';
var RELEASE_CHESSMAN = '@@react-app-base/chess/RELEASE_CHESSMAN';
var REMOVE_CHESSMAN = '@@react-app-base/chess/REMOVE_CHESSMAN';
var SET_TARGETS = '@@react-app-base/chess/SET_TARGETS';
var chessActionTypes = [RESET_BOARD, HALF_MOVE, PICK_CHESSMAN, PUT_CHESSMAN, RELEASE_CHESSMAN, REMOVE_CHESSMAN, SET_TARGETS];

function isChessAction(action) {
  return chessActionTypes.includes(action.type);
} //
//                       _|      _|
//   _|_|_|    _|_|_|  _|_|_|_|        _|_|    _|_|_|
// _|    _|  _|          _|      _|  _|    _|  _|    _|
// _|    _|  _|          _|      _|  _|    _|  _|    _|
//   _|_|_|    _|_|_|      _|_|  _|    _|_|    _|    _|
//
//
//
//                                           _|
//   _|_|_|  _|  _|_|    _|_|      _|_|_|  _|_|_|_|    _|_|    _|  _|_|    _|_|_|
// _|        _|_|      _|_|_|_|  _|    _|    _|      _|    _|  _|_|      _|_|
// _|        _|        _|        _|    _|    _|      _|    _|  _|            _|_|
//   _|_|_|  _|          _|_|_|    _|_|_|      _|_|    _|_|    _|        _|_|_|
//
//


var resetBoard = function resetBoard() {
  return {
    type: RESET_BOARD
  };
};
var halfMove = function halfMove(chessman, source, target) {
  return {
    type: HALF_MOVE,
    payload: {
      chessman: chessman,
      source: source,
      target: target
    }
  };
};
var pickChessman = function pickChessman(chessman, source) {
  return {
    type: PICK_CHESSMAN,
    payload: {
      chessman: chessman,
      source: source
    }
  };
};
var putChessman = function putChessman(chessman, target) {
  return {
    type: PUT_CHESSMAN,
    payload: {
      chessman: chessman,
      target: target
    }
  };
};
var releaseChessman = function releaseChessman() {
  return {
    type: RELEASE_CHESSMAN
  };
};
var removeChessman = function removeChessman(coord) {
  return {
    type: REMOVE_CHESSMAN,
    payload: {
      coord: coord
    }
  };
};
var setTargets = function setTargets(targets) {
  return {
    type: SET_TARGETS,
    payload: {
      targets: targets
    }
  };
}; //
//                           _|
// _|  _|_|    _|_|      _|_|_|  _|    _|    _|_|_|    _|_|    _|  _|_|
// _|_|      _|_|_|_|  _|    _|  _|    _|  _|        _|_|_|_|  _|_|
// _|        _|        _|    _|  _|    _|  _|        _|        _|
// _|          _|_|_|    _|_|_|    _|_|_|    _|_|_|    _|_|_|  _|
//
//

var chess_createChessReducer = function createChessReducer(initialState) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments.length > 1 ? arguments[1] : undefined;

    if (!isChessAction(action)) {
      return state;
    }

    switch (action.type) {
      case RESET_BOARD:
        return _objectSpread({}, state, {
          board: {
            chessmen: Object(immutable_es["a" /* Map */])([[new Coordinates["a" /* default */]({
              rank: 1,
              file: 1
            }), {
              symbol: '♖'
            }], [new Coordinates["a" /* default */]({
              rank: 1,
              file: 2
            }), {
              symbol: '♘'
            }], [new Coordinates["a" /* default */]({
              rank: 1,
              file: 3
            }), {
              symbol: '♗'
            }], [new Coordinates["a" /* default */]({
              rank: 1,
              file: 4
            }), {
              symbol: '♕'
            }], [new Coordinates["a" /* default */]({
              rank: 1,
              file: 5
            }), {
              symbol: '♔'
            }], [new Coordinates["a" /* default */]({
              rank: 1,
              file: 6
            }), {
              symbol: '♗'
            }], [new Coordinates["a" /* default */]({
              rank: 1,
              file: 7
            }), {
              symbol: '♘'
            }], [new Coordinates["a" /* default */]({
              rank: 1,
              file: 8
            }), {
              symbol: '♖'
            }], [new Coordinates["a" /* default */]({
              rank: 2,
              file: 1
            }), {
              symbol: '♙',
              hasAdvancedTwoSquares: false
            }], [new Coordinates["a" /* default */]({
              rank: 2,
              file: 2
            }), {
              symbol: '♙',
              hasAdvancedTwoSquares: false
            }], [new Coordinates["a" /* default */]({
              rank: 2,
              file: 3
            }), {
              symbol: '♙',
              hasAdvancedTwoSquares: false
            }], [new Coordinates["a" /* default */]({
              rank: 2,
              file: 4
            }), {
              symbol: '♙',
              hasAdvancedTwoSquares: false
            }], [new Coordinates["a" /* default */]({
              rank: 2,
              file: 5
            }), {
              symbol: '♙',
              hasAdvancedTwoSquares: false
            }], [new Coordinates["a" /* default */]({
              rank: 2,
              file: 6
            }), {
              symbol: '♙',
              hasAdvancedTwoSquares: false
            }], [new Coordinates["a" /* default */]({
              rank: 2,
              file: 7
            }), {
              symbol: '♙',
              hasAdvancedTwoSquares: false
            }], [new Coordinates["a" /* default */]({
              rank: 2,
              file: 8
            }), {
              symbol: '♙',
              hasAdvancedTwoSquares: false
            }], [new Coordinates["a" /* default */]({
              rank: 7,
              file: 1
            }), {
              symbol: '♟',
              hasAdvancedTwoSquares: false
            }], [new Coordinates["a" /* default */]({
              rank: 7,
              file: 2
            }), {
              symbol: '♟',
              hasAdvancedTwoSquares: false
            }], [new Coordinates["a" /* default */]({
              rank: 7,
              file: 3
            }), {
              symbol: '♟',
              hasAdvancedTwoSquares: false
            }], [new Coordinates["a" /* default */]({
              rank: 7,
              file: 4
            }), {
              symbol: '♟',
              hasAdvancedTwoSquares: false
            }], [new Coordinates["a" /* default */]({
              rank: 7,
              file: 5
            }), {
              symbol: '♟',
              hasAdvancedTwoSquares: false
            }], [new Coordinates["a" /* default */]({
              rank: 7,
              file: 6
            }), {
              symbol: '♟',
              hasAdvancedTwoSquares: false
            }], [new Coordinates["a" /* default */]({
              rank: 7,
              file: 7
            }), {
              symbol: '♟',
              hasAdvancedTwoSquares: false
            }], [new Coordinates["a" /* default */]({
              rank: 7,
              file: 8
            }), {
              symbol: '♟',
              hasAdvancedTwoSquares: false
            }], [new Coordinates["a" /* default */]({
              rank: 8,
              file: 1
            }), {
              symbol: '♜'
            }], [new Coordinates["a" /* default */]({
              rank: 8,
              file: 2
            }), {
              symbol: '♞'
            }], [new Coordinates["a" /* default */]({
              rank: 8,
              file: 3
            }), {
              symbol: '♝'
            }], [new Coordinates["a" /* default */]({
              rank: 8,
              file: 4
            }), {
              symbol: '♛'
            }], [new Coordinates["a" /* default */]({
              rank: 8,
              file: 5
            }), {
              symbol: '♚'
            }], [new Coordinates["a" /* default */]({
              rank: 8,
              file: 6
            }), {
              symbol: '♝'
            }], [new Coordinates["a" /* default */]({
              rank: 8,
              file: 7
            }), {
              symbol: '♞'
            }], [new Coordinates["a" /* default */]({
              rank: 8,
              file: 8
            }), {
              symbol: '♜'
            }]])
          }
        });

      case HALF_MOVE:
        return state;

      case PICK_CHESSMAN:
        return _objectSpread({}, state, {
          picking: {
            chessman: action.payload.chessman,
            source: action.payload.source
          }
        });

      case PUT_CHESSMAN:
        return _objectSpread({}, state, {
          board: _objectSpread({}, state.board, {
            chessmen: state.board.chessmen.set(new Coordinates["a" /* default */](action.payload.target), action.payload.chessman) // TODO

          }),
          picking: null,
          targets: null
        });

      case RELEASE_CHESSMAN:
        return _objectSpread({}, state, {
          picking: null,
          targets: null
        });

      case REMOVE_CHESSMAN:
        return _objectSpread({}, state, {
          board: _objectSpread({}, state.board, {
            chessmen: state.board.chessmen["delete"](new Coordinates["a" /* default */](action.payload.coord)) // TODO

          })
        });

      case SET_TARGETS:
        return _objectSpread({}, state, {
          targets: action.payload.targets
        });
    }
  };
}; //
//                                           _|
//   _|_|_|    _|_|    _|  _|_|  _|      _|        _|_|_|    _|_|
// _|_|      _|_|_|_|  _|_|      _|      _|  _|  _|        _|_|_|_|
//     _|_|  _|        _|          _|  _|    _|  _|        _|
// _|_|_|      _|_|_|  _|            _|      _|    _|_|_|    _|_|_|
//
//

var chess_ChessService = (_dec = Object(inversify["injectable"])(), _dec(_class =
/*#__PURE__*/
function () {
  function ChessService() {
    classCallCheck_default()(this, ChessService);
  }

  createClass_default()(ChessService, [{
    key: "halfMoveSaga",
    value:
    /*#__PURE__*/
    regenerator_default.a.mark(function halfMoveSaga(_ref2) {
      var _ref2$payload, chessman, source, target;

      return regenerator_default.a.wrap(function halfMoveSaga$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _ref2$payload = _ref2.payload, chessman = _ref2$payload.chessman, source = _ref2$payload.source, target = _ref2$payload.target;
              _context.next = 3;
              return Object(redux_saga_effects_npm_proxy_esm["d" /* put */])(removeChessman(source));

            case 3:
              _context.next = 5;
              return Object(redux_saga_effects_npm_proxy_esm["d" /* put */])(putChessman(chessman, target));

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, halfMoveSaga);
    })
  }, {
    key: "pickChessmanSaga",
    value:
    /*#__PURE__*/
    regenerator_default.a.mark(function pickChessmanSaga(_ref3) {
      var _ref3$payload, chessman, source, _ref4, board, targets;

      return regenerator_default.a.wrap(function pickChessmanSaga$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _ref3$payload = _ref3.payload, chessman = _ref3$payload.chessman, source = _ref3$payload.source;
              _context2.next = 3;
              return Object(redux_saga_effects_npm_proxy_esm["e" /* select */])();

            case 3:
              _ref4 = _context2.sent;
              board = _ref4.chess.board;
              targets = getCoordinatesAttackedBy(chessman, source, board);
              _context2.next = 8;
              return Object(redux_saga_effects_npm_proxy_esm["d" /* put */])(setTargets(targets));

            case 8:
            case "end":
              return _context2.stop();
          }
        }
      }, pickChessmanSaga);
    })
  }, {
    key: "rootSaga",
    value:
    /*#__PURE__*/
    regenerator_default.a.mark(function rootSaga() {
      return regenerator_default.a.wrap(function rootSaga$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return Object(takeEvery["a" /* default */])(HALF_MOVE, [this, this.halfMoveSaga]);

            case 2:
              _context3.next = 4;
              return Object(takeEvery["a" /* default */])(PICK_CHESSMAN, [this, this.pickChessmanSaga]);

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, rootSaga, this);
    })
  }]);

  return ChessService;
}()) || _class);

/***/ }),

/***/ 109:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__(4);
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/asyncToGenerator.js
var asyncToGenerator = __webpack_require__(123);
var asyncToGenerator_default = /*#__PURE__*/__webpack_require__.n(asyncToGenerator);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/taggedTemplateLiteral.js
var taggedTemplateLiteral = __webpack_require__(10);
var taggedTemplateLiteral_default = /*#__PURE__*/__webpack_require__.n(taggedTemplateLiteral);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/typeof.js
var helpers_typeof = __webpack_require__(63);
var typeof_default = /*#__PURE__*/__webpack_require__.n(helpers_typeof);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/defineProperty.js
var defineProperty = __webpack_require__(20);
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/slicedToArray.js
var slicedToArray = __webpack_require__(23);
var slicedToArray_default = /*#__PURE__*/__webpack_require__.n(slicedToArray);

// EXTERNAL MODULE: ./node_modules/path-to-regexp/dist.es2015/index.js
var dist_es2015 = __webpack_require__(159);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/construct.js
var construct = __webpack_require__(76);
var construct_default = /*#__PURE__*/__webpack_require__.n(construct);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/toConsumableArray.js
var toConsumableArray = __webpack_require__(26);
var toConsumableArray_default = /*#__PURE__*/__webpack_require__.n(toConsumableArray);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/classCallCheck.js
var classCallCheck = __webpack_require__(12);
var classCallCheck_default = /*#__PURE__*/__webpack_require__.n(classCallCheck);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/createClass.js
var createClass = __webpack_require__(16);
var createClass_default = /*#__PURE__*/__webpack_require__.n(createClass);

// EXTERNAL MODULE: ./src/lib/guards/stringGuards.ts
var stringGuards = __webpack_require__(124);

// EXTERNAL MODULE: ./src/lib/typed.ts
var typed = __webpack_require__(11);

// CONCATENATED MODULE: ./src/lib/createUrlOrPathAbempty.ts






function _templateObject2() {
  var data = taggedTemplateLiteral_default()(["", "", ""]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = taggedTemplateLiteral_default()(["^", "(.*)$"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}



var DUMMY_ORIGIN = 'http://example.com';

function dropDummyOrigin(x) {
  var result = new RegExp(Object(typed["a" /* default */])(_templateObject(), DUMMY_ORIGIN)).exec(x);

  if (result === null) {
    throw new Error();
  }

  return result[1];
}
/**
 * URL から origin を取り除いたものを表す。
 */


var createUrlOrPathAbempty_PathAbempty =
/*#__PURE__*/
function () {
  function PathAbempty() {
    for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
      _ref[_key] = arguments[_key];
    }

    var pathAbempty = _ref[0],
        restArgs = _ref.slice(1);

    classCallCheck_default()(this, PathAbempty);

    this._url = void 0;
    this._url = construct_default()(URL, [Object(typed["a" /* default */])(_templateObject2(), DUMMY_ORIGIN, pathAbempty)].concat(toConsumableArray_default()(restArgs)));
  }

  createClass_default()(PathAbempty, [{
    key: "toJSON",
    value: function toJSON() {
      return dropDummyOrigin(this._url.toJSON());
    }
  }, {
    key: "hash",
    get: function get() {
      return this._url.hash;
    }
  }, {
    key: "href",
    get: function get() {
      return dropDummyOrigin(this._url.href);
    }
  }, {
    key: "origin",
    get: function get() {
      return dropDummyOrigin(this._url.origin);
    }
  }, {
    key: "pathname",
    get: function get() {
      return this._url.pathname;
    },
    set: function set(value) {
      // tslint:disable-next-line:no-object-mutation
      this._url.pathname = value;
    }
  }, {
    key: "search",
    get: function get() {
      return this._url.search;
    },
    set: function set(value) {
      // tslint:disable-next-line:no-object-mutation
      this._url.search = value;
    }
  }, {
    key: "searchParams",
    get: function get() {
      return this._url.searchParams;
    }
  }]);

  return PathAbempty;
}();

function createUrlOrPathAbempty() {
  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  var urlOrPathAbempty = args[0];

  if (Object(stringGuards["a" /* isUrl */])(urlOrPathAbempty)) {
    return construct_default()(URL, args);
  } else {
    return construct_default()(createUrlOrPathAbempty_PathAbempty, args);
  }
}
// CONCATENATED MODULE: ./src/lib/extensions/Record/mapValues.ts

function mapValues(object, f) {
  var result = {}; // tslint:disable-next-line:no-loop-statement

  for (var _i = 0, _Object$entries = Object.entries(object); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = slicedToArray_default()(_Object$entries[_i], 2),
        i = _Object$entries$_i[0],
        _x = _Object$entries$_i[1];

    // tslint:disable-next-line:no-object-mutation
    result[i] = f(_x);
  }

  return result;
}
// CONCATENATED MODULE: ./src/lib/fetch.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return fetch; });







function fetch_templateObject() {
  var data = taggedTemplateLiteral_default()(["", " is not a Json."]);

  fetch_templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { defineProperty_default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * src/lib/fetch.ts
 */





function isEmpty(object) {
  return Object.keys(object).length === 0;
}

function toRecord(input) {
  return Object.entries(input).reduce(function (result, _ref) {
    var _ref2 = slicedToArray_default()(_ref, 2),
        i = _ref2[0],
        x = _ref2[1];

    return _objectSpread({}, result, defineProperty_default()({}, i, x));
  }, {});
}

function toJson(input) {
  if (typeof input === 'boolean' || typeof input === 'number' || typeof input === 'string') {
    return input;
  }

  if (Array.isArray(input)) {
    return input.map(function (json) {
      return toJson(json);
    });
  }

  if (typeof_default()(input) === 'object') {
    if (input === null) {
      return input;
    }

    return mapValues(toRecord(input), function (json) {
      return toJson(json);
    });
  }

  throw new Error(Object(typed["a" /* default */])(fetch_templateObject(), String(input)));
}

function buildRequestInfo(_ref3) {
  var method = _ref3.method,
      parameterizedEndpoint = _ref3.parameterizedEndpoint,
      _ref3$params = _ref3.params,
      params = _ref3$params === void 0 ? {} : _ref3$params,
      _ref3$query = _ref3.query,
      query = _ref3$query === void 0 ? {} : _ref3$query;
  var url = createUrlOrPathAbempty(parameterizedEndpoint); // tslint:disable-next-line:no-object-mutation

  url.pathname = isEmpty(params) ? url.pathname : dist_es2015["a" /* compile */](url.pathname)(params);

  if (method === 'GET') {
    var urlSearchParams = new URLSearchParams(url.search);
    Object.entries(query).forEach(function (_ref4) {
      var _ref5 = slicedToArray_default()(_ref4, 2),
          key = _ref5[0],
          value = _ref5[1];

      urlSearchParams.append(key, value);
    }); // tslint:disable-next-line:no-object-mutation

    url.search = urlSearchParams.toString();
  }

  return url.href;
}

function buildRequestInit(_ref6) {
  var method = _ref6.method,
      _ref6$headers = _ref6.headers,
      headers = _ref6$headers === void 0 ? {} : _ref6$headers,
      _ref6$query = _ref6.query,
      query = _ref6$query === void 0 ? {} : _ref6$query;

  switch (method) {
    case 'GET':
      return {
        method: method,
        headers: headers
      };

    case 'POST':
      var formData = new FormData();
      Object.entries(query).forEach(function (_ref7) {
        var _ref8 = slicedToArray_default()(_ref7, 2),
            key = _ref8[0],
            value = _ref8[1];

        formData.append(key, value);
      });
      return {
        method: method,
        body: formData,
        headers: headers
      };
  }
}

function fetch(_x) {
  return _fetch.apply(this, arguments);
}

function _fetch() {
  _fetch = asyncToGenerator_default()(
  /*#__PURE__*/
  regenerator_default.a.mark(function _callee(request) {
    var requestInfo, requestInit, response, body;
    return regenerator_default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            requestInfo = buildRequestInfo(request);
            requestInit = buildRequestInit(request);
            _context.next = 4;
            return globalThis.fetch(requestInfo, requestInit);

          case 4:
            response = _context.sent;
            _context.t0 = toJson;
            _context.next = 8;
            return response.json();

          case 8:
            _context.t1 = _context.sent;
            body = (0, _context.t0)(_context.t1);
            return _context.abrupt("return", {
              response: response,
              body: body
            });

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _fetch.apply(this, arguments);
}

/***/ }),

/***/ 11:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return typed; });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(23);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _extensions_Iterable_zipIterables__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(77);


/**
 * Type substitutions of a template literal.  It is often used as a tag function.
 *
 * @returns a string of alternate elements of template and substitutions.
 */

function typed(template) {
  // tslint:disable-next-line:no-let
  var result = template[0]; // tslint:disable-next-line:no-loop-statement

  for (var _len = arguments.length, substitutions = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    substitutions[_key - 1] = arguments[_key];
  }

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = Object(_extensions_Iterable_zipIterables__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(substitutions, template.slice(1))[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _step$value = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_step.value, 2),
          substitution = _step$value[0],
          segment = _step$value[1];

      result += String(substitution);
      result += segment;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return result;
}

/***/ }),

/***/ 116:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__(4);
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/taggedTemplateLiteral.js
var taggedTemplateLiteral = __webpack_require__(10);
var taggedTemplateLiteral_default = /*#__PURE__*/__webpack_require__.n(taggedTemplateLiteral);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/classCallCheck.js
var classCallCheck = __webpack_require__(12);
var classCallCheck_default = /*#__PURE__*/__webpack_require__.n(classCallCheck);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/createClass.js
var createClass = __webpack_require__(16);
var createClass_default = /*#__PURE__*/__webpack_require__.n(createClass);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/toConsumableArray.js
var toConsumableArray = __webpack_require__(26);
var toConsumableArray_default = /*#__PURE__*/__webpack_require__.n(toConsumableArray);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/defineProperty.js
var defineProperty = __webpack_require__(20);
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty);

// EXTERNAL MODULE: ./node_modules/inversify/lib/inversify.js
var inversify = __webpack_require__(21);

// EXTERNAL MODULE: ./node_modules/redux-saga/dist/redux-saga-effects-npm-proxy.esm.js
var redux_saga_effects_npm_proxy_esm = __webpack_require__(7);

// EXTERNAL MODULE: ./src/lib/boni/redux-saga/effects/takeEvery.ts
var takeEvery = __webpack_require__(41);

// EXTERNAL MODULE: ./src/lib/fetch.ts + 2 modules
var fetch = __webpack_require__(109);

// EXTERNAL MODULE: ./src/lib/typed.ts
var typed = __webpack_require__(11);

// EXTERNAL MODULE: ./src/lib/validators/commonValidators.ts + 4 modules
var commonValidators = __webpack_require__(3);

// CONCATENATED MODULE: ./src/lib/validators/intlValidators.ts

var asFormats = Object(commonValidators["b" /* asObject */])('a Formats', function (input) {
  return {
    number: Object(commonValidators["g" /* optional */])(Object(commonValidators["h" /* recordOf */])(asIntlNumberFormatOptions))(input.number),
    date: Object(commonValidators["g" /* optional */])(Object(commonValidators["h" /* recordOf */])(asIntlDateTimeFormatOptions))(input.date),
    time: Object(commonValidators["g" /* optional */])(Object(commonValidators["h" /* recordOf */])(asIntlDateTimeFormatOptions))(input.time)
  };
});
var asIntlNumberFormatOptions = Object(commonValidators["b" /* asObject */])('an Intl.NumberFormatOptions', function (input) {
  return {
    localeMatcher: Object(commonValidators["g" /* optional */])(Object(commonValidators["d" /* asUnionOf */])('lookup', 'best fit'))(input.localeMatcher),
    style: Object(commonValidators["g" /* optional */])(Object(commonValidators["d" /* asUnionOf */])('decimal', 'currency', 'percent'))(input.style),
    currency: Object(commonValidators["g" /* optional */])(commonValidators["c" /* asString */])(input.currency),
    // ISO 4217 currency code
    currencyDisplay: Object(commonValidators["g" /* optional */])(Object(commonValidators["d" /* asUnionOf */])('symbol', 'code', 'name'))(input.currencyDisplay),
    useGrouping: Object(commonValidators["g" /* optional */])(commonValidators["a" /* asBoolean */])(input.useGrouping),
    minimumIntegerDigits: Object(commonValidators["g" /* optional */])(Object(commonValidators["d" /* asUnionOf */])(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21))(input.minimumIntegerDigits),
    minimumFractionDigits: Object(commonValidators["g" /* optional */])(Object(commonValidators["d" /* asUnionOf */])(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20))(input.minimumFractionDigits),
    maximumFractionDigits: Object(commonValidators["g" /* optional */])(Object(commonValidators["d" /* asUnionOf */])(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20))(input.maximumFractionDigits),
    minimumSignificantDigits: Object(commonValidators["g" /* optional */])(Object(commonValidators["d" /* asUnionOf */])(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21))(input.minimumSignificantDigits),
    maximumSignificantDigits: Object(commonValidators["g" /* optional */])(Object(commonValidators["d" /* asUnionOf */])(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21))(input.maximumSignificantDigits)
  };
});
var asIntlDateTimeFormatOptions = Object(commonValidators["b" /* asObject */])('an Intl.DateTimeFormatOptions', function (input) {
  return {
    localeMatcher: Object(commonValidators["g" /* optional */])(Object(commonValidators["d" /* asUnionOf */])('lookup', 'best fit'))(input.localeMatcher),
    weekday: Object(commonValidators["g" /* optional */])(Object(commonValidators["d" /* asUnionOf */])('narrow', 'short', 'long'))(input.weekday),
    era: Object(commonValidators["g" /* optional */])(Object(commonValidators["d" /* asUnionOf */])('narrow', 'short', 'long'))(input.era),
    year: Object(commonValidators["g" /* optional */])(Object(commonValidators["d" /* asUnionOf */])('numeric', '2-digit'))(input.year),
    month: Object(commonValidators["g" /* optional */])(Object(commonValidators["d" /* asUnionOf */])('numeric', '2-digit', 'narrow', 'short', 'long'))(input.month),
    day: Object(commonValidators["g" /* optional */])(Object(commonValidators["d" /* asUnionOf */])('numeric', '2-digit'))(input.day),
    hour: Object(commonValidators["g" /* optional */])(Object(commonValidators["d" /* asUnionOf */])('numeric', '2-digit'))(input.hour),
    minute: Object(commonValidators["g" /* optional */])(Object(commonValidators["d" /* asUnionOf */])('numeric', '2-digit'))(input.minute),
    second: Object(commonValidators["g" /* optional */])(Object(commonValidators["d" /* asUnionOf */])('numeric', '2-digit'))(input.second),
    timeZoneName: Object(commonValidators["g" /* optional */])(Object(commonValidators["d" /* asUnionOf */])('short', 'long'))(input.timeZoneName),
    formatMatcher: Object(commonValidators["g" /* optional */])(Object(commonValidators["d" /* asUnionOf */])('basic', 'best fit'))(input.formatMatcher),
    hour12: Object(commonValidators["g" /* optional */])(commonValidators["a" /* asBoolean */])(input.hour12),
    timeZone: Object(commonValidators["g" /* optional */])(Object(commonValidators["i" /* unionOf */])(Object(commonValidators["d" /* asUnionOf */])('UTC'), commonValidators["c" /* asString */]))(input.localeMatcher) // tz timezone

  };
});
// CONCATENATED MODULE: ./src/redux/modules/localeSelector.ts
/* unused harmony export SELECT_LOCALE */
/* unused harmony export SET_LOCALE */
/* unused harmony export SET_FORMATS */
/* unused harmony export SET_MESSAGES */
/* unused harmony export PUSH_ERROR */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return selectLocale; });
/* unused harmony export setLocale */
/* unused harmony export setFormats */
/* unused harmony export setMessages */
/* unused harmony export pushError */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return localeSelector_createLocaleSelectorReducer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return localeSelector_LocaleSelectorService; });







var _dec, _class;

function _templateObject3() {
  var data = taggedTemplateLiteral_default()(["", " is not an error."]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = taggedTemplateLiteral_default()(["", "/messages/:locale.json"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = taggedTemplateLiteral_default()(["", "/formats/:locale.json"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { defineProperty_default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }







 //
//             _|                  _|
//   _|_|_|  _|_|_|_|    _|_|_|  _|_|_|_|    _|_|
// _|_|        _|      _|    _|    _|      _|_|_|_|
//     _|_|    _|      _|    _|    _|      _|
// _|_|_|        _|_|    _|_|_|      _|_|    _|_|_|
//
//

//
//                       _|      _|
//   _|_|_|    _|_|_|  _|_|_|_|        _|_|    _|_|_|
// _|    _|  _|          _|      _|  _|    _|  _|    _|
// _|    _|  _|          _|      _|  _|    _|  _|    _|
//   _|_|_|    _|_|_|      _|_|  _|    _|_|    _|    _|
//
//
//
//   _|
// _|_|_|_|  _|    _|  _|_|_|      _|_|      _|_|_|
//   _|      _|    _|  _|    _|  _|_|_|_|  _|_|
//   _|      _|    _|  _|    _|  _|            _|_|
//     _|_|    _|_|_|  _|_|_|      _|_|_|  _|_|_|
//                 _|  _|
//             _|_|    _|
var SELECT_LOCALE = '@@react-app-prototype/localeSelector/SELECT_LOCALE';
var SET_LOCALE = '@@react-app-prototype/localeSelector/SET_LOCALE';
var SET_FORMATS = '@@react-app-prototype/localeSelector/SET_FORMATS';
var SET_MESSAGES = '@@react-app-prototype/localeSelector/SET_MESSAGES';
var PUSH_ERROR = '@@react-app-prototype/localeSelector/PUSH_ERROR';
var localeSelectorActionTypes = [SELECT_LOCALE, SET_LOCALE, SET_FORMATS, SET_MESSAGES, PUSH_ERROR];

function isLocaleSelectorAction(action) {
  return localeSelectorActionTypes.includes(action.type);
} //
//                       _|      _|
//   _|_|_|    _|_|_|  _|_|_|_|        _|_|    _|_|_|
// _|    _|  _|          _|      _|  _|    _|  _|    _|
// _|    _|  _|          _|      _|  _|    _|  _|    _|
//   _|_|_|    _|_|_|      _|_|  _|    _|_|    _|    _|
//
//
//
//                                           _|
//   _|_|_|  _|  _|_|    _|_|      _|_|_|  _|_|_|_|    _|_|    _|  _|_|    _|_|_|
// _|        _|_|      _|_|_|_|  _|    _|    _|      _|    _|  _|_|      _|_|
// _|        _|        _|        _|    _|    _|      _|    _|  _|            _|_|
//   _|_|_|  _|          _|_|_|    _|_|_|      _|_|    _|_|    _|        _|_|_|
//
//


var selectLocale = function selectLocale(locale) {
  return {
    type: SELECT_LOCALE,
    payload: {
      locale: locale
    }
  };
};
var setLocale = function setLocale(locale) {
  return {
    type: SET_LOCALE,
    payload: {
      locale: locale
    }
  };
};
var setFormats = function setFormats(formats) {
  return {
    type: SET_FORMATS,
    payload: {
      formats: formats
    }
  };
};
var setMessages = function setMessages(messages) {
  return {
    type: SET_MESSAGES,
    payload: {
      messages: messages
    }
  };
};
var pushError = function pushError(error) {
  return {
    type: PUSH_ERROR,
    payload: {
      error: error
    }
  };
}; //
//                           _|
// _|  _|_|    _|_|      _|_|_|  _|    _|    _|_|_|    _|_|    _|  _|_|
// _|_|      _|_|_|_|  _|    _|  _|    _|  _|        _|_|_|_|  _|_|
// _|        _|        _|    _|  _|    _|  _|        _|        _|
// _|          _|_|_|    _|_|_|    _|_|_|    _|_|_|    _|_|_|  _|
//
//

var localeSelector_createLocaleSelectorReducer = function createLocaleSelectorReducer(initialState) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments.length > 1 ? arguments[1] : undefined;

    if (!isLocaleSelectorAction(action)) {
      return state;
    }

    switch (action.type) {
      case SELECT_LOCALE:
        return state;

      case SET_LOCALE:
        return _objectSpread({}, state, {
          locale: action.payload.locale
        });

      case SET_FORMATS:
        return _objectSpread({}, state, {
          formats: action.payload.formats
        });

      case SET_MESSAGES:
        return _objectSpread({}, state, {
          messages: action.payload.messages
        });

      case PUSH_ERROR:
        return _objectSpread({}, state, {
          errors: [].concat(toConsumableArray_default()(state.errors), [action.payload.error])
        });
    }
  };
}; //
//                                           _|
//   _|_|_|    _|_|    _|  _|_|  _|      _|        _|_|_|    _|_|
// _|_|      _|_|_|_|  _|_|      _|      _|  _|  _|        _|_|_|_|
//     _|_|  _|        _|          _|  _|    _|  _|        _|
// _|_|_|      _|_|_|  _|            _|      _|    _|_|_|    _|_|_|
//
//

var localeSelector_LocaleSelectorService = (_dec = Object(inversify["injectable"])(), _dec(_class =
/*#__PURE__*/
function () {
  function LocaleSelectorService(config) {
    classCallCheck_default()(this, LocaleSelectorService);

    this.config = config;
  }

  LocaleSelectorService = Object(inversify["inject"])('EnvVarConfig')(LocaleSelectorService, undefined, 0) || LocaleSelectorService;

  createClass_default()(LocaleSelectorService, [{
    key: "selectLocaleSaga",
    value:
    /*#__PURE__*/
    regenerator_default.a.mark(function selectLocaleSaga(_ref) {
      var locale, _ref2, formats, _ref3, messages;

      return regenerator_default.a.wrap(function selectLocaleSaga$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              locale = _ref.payload.locale;
              _context.prev = 1;
              _context.next = 4;
              return Object(redux_saga_effects_npm_proxy_esm["a" /* call */])(fetch["a" /* default */], {
                method: 'GET',
                parameterizedEndpoint: Object(typed["a" /* default */])(_templateObject(), this.config.get('BASE_URL')),
                params: {
                  locale: locale
                }
              });

            case 4:
              _ref2 = _context.sent;
              formats = _ref2.body;
              _context.next = 8;
              return Object(redux_saga_effects_npm_proxy_esm["a" /* call */])(fetch["a" /* default */], {
                method: 'GET',
                parameterizedEndpoint: Object(typed["a" /* default */])(_templateObject2(), this.config.get('BASE_URL')),
                params: {
                  locale: locale
                }
              });

            case 8:
              _ref3 = _context.sent;
              messages = _ref3.body;
              _context.next = 12;
              return Object(redux_saga_effects_npm_proxy_esm["d" /* put */])(setFormats(asFormats(formats)));

            case 12:
              _context.next = 14;
              return Object(redux_saga_effects_npm_proxy_esm["d" /* put */])(setMessages(Object(commonValidators["h" /* recordOf */])(commonValidators["c" /* asString */])(messages)));

            case 14:
              _context.next = 16;
              return Object(redux_saga_effects_npm_proxy_esm["d" /* put */])(setLocale(locale));

            case 16:
              _context.next = 25;
              break;

            case 18:
              _context.prev = 18;
              _context.t0 = _context["catch"](1);

              if (!(_context.t0 instanceof Error)) {
                _context.next = 24;
                break;
              }

              _context.next = 23;
              return Object(redux_saga_effects_npm_proxy_esm["d" /* put */])(pushError(_context.t0));

            case 23:
              return _context.abrupt("return");

            case 24:
              throw new TypeError(Object(typed["a" /* default */])(_templateObject3(), String(_context.t0)));

            case 25:
            case "end":
              return _context.stop();
          }
        }
      }, selectLocaleSaga, this, [[1, 18]]);
    })
  }, {
    key: "rootSaga",
    value:
    /*#__PURE__*/
    regenerator_default.a.mark(function rootSaga() {
      return regenerator_default.a.wrap(function rootSaga$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return Object(takeEvery["a" /* default */])(SELECT_LOCALE, [this, this.selectLocaleSaga]);

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      }, rootSaga, this);
    })
  }]);

  return LocaleSelectorService;
}()) || _class);


/***/ }),

/***/ 117:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["a"] = (Object(react__WEBPACK_IMPORTED_MODULE_0__["createContext"])({
  availableLocales: null
}));

/***/ }),

/***/ 122:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export UPDATE_NOW */
/* unused harmony export START_CLOCK */
/* unused harmony export SET_NOW */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return updateNow; });
/* unused harmony export startClock */
/* unused harmony export stopClock */
/* unused harmony export setNow */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return createIoReducer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IoService; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(16);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(21);
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(inversify__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7);
/* harmony import */ var _lib_boni_redux_saga_effects__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(41);
/* harmony import */ var _lib_delay__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(88);





var _dec, _class, _temp;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }




 //
//             _|                  _|
//   _|_|_|  _|_|_|_|    _|_|_|  _|_|_|_|    _|_|
// _|_|        _|      _|    _|    _|      _|_|_|_|
//     _|_|    _|      _|    _|    _|      _|
// _|_|_|        _|_|    _|_|_|      _|_|    _|_|_|
//
//

//
//                       _|      _|
//   _|_|_|    _|_|_|  _|_|_|_|        _|_|    _|_|_|
// _|    _|  _|          _|      _|  _|    _|  _|    _|
// _|    _|  _|          _|      _|  _|    _|  _|    _|
//   _|_|_|    _|_|_|      _|_|  _|    _|_|    _|    _|
//
//
//
//   _|
// _|_|_|_|  _|    _|  _|_|_|      _|_|      _|_|_|
//   _|      _|    _|  _|    _|  _|_|_|_|  _|_|
//   _|      _|    _|  _|    _|  _|            _|_|
//     _|_|    _|_|_|  _|_|_|      _|_|_|  _|_|_|
//                 _|  _|
//             _|_|    _|
var UPDATE_NOW = '@@react-app-prototype/io/UPDATE_NOW'; // TODO: rename

var START_CLOCK = '@@react-app-prototype/io/START_CLOCK';
var STOP_CLOCK = '@@react-app-prototype/io/STOP_CLOCK';
var SET_NOW = '@@react-app-prototype/io/SET_NOW';
var ioActionTypes = [UPDATE_NOW, START_CLOCK, STOP_CLOCK, SET_NOW];

function isIoAction(action) {
  return ioActionTypes.includes(action.type);
} //
//                       _|      _|
//   _|_|_|    _|_|_|  _|_|_|_|        _|_|    _|_|_|
// _|    _|  _|          _|      _|  _|    _|  _|    _|
// _|    _|  _|          _|      _|  _|    _|  _|    _|
//   _|_|_|    _|_|_|      _|_|  _|    _|_|    _|    _|
//
//
//
//                                           _|
//   _|_|_|  _|  _|_|    _|_|      _|_|_|  _|_|_|_|    _|_|    _|  _|_|    _|_|_|
// _|        _|_|      _|_|_|_|  _|    _|    _|      _|    _|  _|_|      _|_|
// _|        _|        _|        _|    _|    _|      _|    _|  _|            _|_|
//   _|_|_|  _|          _|_|_|    _|_|_|      _|_|    _|_|    _|        _|_|_|
//
//


var updateNow = function updateNow() {
  return {
    type: UPDATE_NOW
  };
};
var startClock = function startClock() {
  return {
    type: START_CLOCK
  };
};
var stopClock = function stopClock() {
  return {
    type: STOP_CLOCK
  };
};
var setNow = function setNow(now) {
  return {
    type: SET_NOW,
    payload: {
      now: now
    }
  };
}; //
//                           _|
// _|  _|_|    _|_|      _|_|_|  _|    _|    _|_|_|    _|_|    _|  _|_|
// _|_|      _|_|_|_|  _|    _|  _|    _|  _|        _|_|_|_|  _|_|
// _|        _|        _|    _|  _|    _|  _|        _|        _|
// _|          _|_|_|    _|_|_|    _|_|_|    _|_|_|    _|_|_|  _|
//
//

var createIoReducer = function createIoReducer(initialState) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments.length > 1 ? arguments[1] : undefined;

    if (!isIoAction(action)) {
      return state;
    }

    switch (action.type) {
      case UPDATE_NOW:
        return state;

      case START_CLOCK:
        return state;

      case STOP_CLOCK:
        return state;

      case SET_NOW:
        return _objectSpread({}, state, {
          now: action.payload.now
        });
    }
  };
}; //
//                                           _|
//   _|_|_|    _|_|    _|  _|_|  _|      _|        _|_|_|    _|_|
// _|_|      _|_|_|_|  _|_|      _|      _|  _|  _|        _|_|_|_|
//     _|_|  _|        _|          _|  _|    _|  _|        _|
// _|_|_|      _|_|_|  _|            _|      _|    _|_|_|    _|_|_|
//
//

var IoService = (_dec = Object(inversify__WEBPACK_IMPORTED_MODULE_4__["injectable"])(), _dec(_class = (_temp =
/*#__PURE__*/
function () {
  function IoService() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, IoService);

    this.startClockTask = null;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(IoService, [{
    key: "updateNowSaga",
    // NOTE: Redux-Saga の型定義のバグ？（ `ForkEffect extends Task` とするか、 `cancel(task: ForkEffect): CancelEffect` とオーバーロードするかすべき）
    value:
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function updateNowSaga() {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function updateNowSaga$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_5__[/* put */ "d"])(setNow(new Date()));

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, updateNowSaga);
    })
  }, {
    key: "startClockSaga",
    value:
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function startClockSaga() {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function startClockSaga$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (false) {}

              _context2.next = 3;
              return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_5__[/* call */ "a"])(_lib_delay__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], 1000 - new Date().getMilliseconds());

            case 3:
              _context2.next = 5;
              return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_5__[/* put */ "d"])(updateNow());

            case 5:
              _context2.next = 0;
              break;

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, startClockSaga);
    })
  }, {
    key: "stopClockSaga",
    value:
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function stopClockSaga() {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function stopClockSaga$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!(this.startClockTask !== null)) {
                _context3.next = 6;
                break;
              }

              _context3.next = 3;
              return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_5__[/* cancel */ "b"])(this.startClockTask);

            case 3:
              _context3.next = 5;
              return Object(_lib_boni_redux_saga_effects__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"])(START_CLOCK, [this, this.startClockSaga]);

            case 5:
              this.startClockTask = _context3.sent;

            case 6:
            case "end":
              return _context3.stop();
          }
        }
      }, stopClockSaga, this);
    })
  }, {
    key: "rootSaga",
    value:
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function rootSaga() {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function rootSaga$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return Object(_lib_boni_redux_saga_effects__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"])(UPDATE_NOW, [this, this.updateNowSaga]);

            case 2:
              _context4.next = 4;
              return Object(_lib_boni_redux_saga_effects__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"])(START_CLOCK, [this, this.startClockSaga]);

            case 4:
              this.startClockTask = _context4.sent;
              _context4.next = 7;
              return Object(_lib_boni_redux_saga_effects__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"])(STOP_CLOCK, [this, this.stopClockSaga]);

            case 7:
            case "end":
              return _context4.stop();
          }
        }
      }, rootSaga, this);
    })
  }]);

  return IoService;
}(), _temp)) || _class);

/***/ }),

/***/ 124:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return isUrl; });
function isUrl(input) {
  try {
    // tslint:disable-next-line:no-unused-expression
    new URL(input);
    return true;
  } catch (_error) {
    return false;
  }
}

/***/ }),

/***/ 125:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export ADD_TASK_ASYNC */
/* unused harmony export CHANGE_TASK_CONTENT_ASYNC */
/* unused harmony export MARK_TASK_AS_DONE_ASYNC */
/* unused harmony export MARK_TASK_AS_UNDONE_ASYNC */
/* unused harmony export DELETE_TASK_ASYNC */
/* unused harmony export MOVE_TASK */
/* unused harmony export PUSH_TASK */
/* unused harmony export REMOVE_TASK */
/* unused harmony export CHECK_TASK */
/* unused harmony export PUSH_ERROR */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return addTaskAsync; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return changeTaskContentAsync; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return markTaskAsDoneAsync; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return markTaskAsUndoneAsync; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return deleteTaskAsync; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return moveTask; });
/* unused harmony export pushTask */
/* unused harmony export removeTask */
/* unused harmony export checkTask */
/* unused harmony export pushError */
/* unused harmony export removeError */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return createReminderReducer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return ReminderService; });
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(16);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(63);
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(42);
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(26);
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(21);
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(inversify__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(7);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(114);
/* harmony import */ var _domain_entity_Task__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(144);
/* harmony import */ var _domain_vo_TaskId__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(90);
/* harmony import */ var _lib_boni_redux_saga_effects__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(41);
/* harmony import */ var _lib_errors__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(34);
/* harmony import */ var _lib_typed__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(11);









var _dec, _class;

function _templateObject() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["", " is not an error."]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_4___default()(key) === "symbol" ? key : String(key); }

function _toPrimitive(input, hint) { if (_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_4___default()(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_4___default()(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }









//
//                       _|      _|
//   _|_|_|    _|_|_|  _|_|_|_|        _|_|    _|_|_|
// _|    _|  _|          _|      _|  _|    _|  _|    _|
// _|    _|  _|          _|      _|  _|    _|  _|    _|
//   _|_|_|    _|_|_|      _|_|  _|    _|_|    _|    _|
//
//
//
//   _|
// _|_|_|_|  _|    _|  _|_|_|      _|_|      _|_|_|
//   _|      _|    _|  _|    _|  _|_|_|_|  _|_|
//   _|      _|    _|  _|    _|  _|            _|_|
//     _|_|    _|_|_|  _|_|_|      _|_|_|  _|_|_|
//                 _|  _|
//             _|_|    _|
var ADD_TASK_ASYNC = '@@react-app-prototype/reminder/ADD_TASK_ASYNC';
var CHANGE_TASK_CONTENT_ASYNC = '@@react-app-prototype/reminder/CHANGE_TASK_CONTENT_ASYNC';
var MARK_TASK_AS_DONE_ASYNC = '@@react-app-prototype/reminder/MARK_TASK_AS_DONE_ASYNC';
var MARK_TASK_AS_UNDONE_ASYNC = '@@react-app-prototype/reminder/MARK_TASK_AS_UNDONE_ASYNC';
var DELETE_TASK_ASYNC = '@@react-app-prototype/reminder/DELETE_TASK_ASYNC';
var MOVE_TASK = '@@react-app-prototype/reminder/MOVE_TASK'; // TODO: rename?

var PUSH_TASK = '@@react-app-prototype/reminder/PUSH_TASK';
var REMOVE_TASK = '@@react-app-prototype/reminder/REMOVE_TASK';
var CHECK_TASK = '@@react-app-prototype/reminder/CHECK_TASK';
var PUSH_ERROR = '@@react-app-prototype/reminder/PUSH_ERROR';
var REMOVE_ERROR = '@@react-app-prototype/reminder/REMOVE_ERROR';
var reminderActionTypes = [ADD_TASK_ASYNC, CHANGE_TASK_CONTENT_ASYNC, MARK_TASK_AS_DONE_ASYNC, MARK_TASK_AS_UNDONE_ASYNC, DELETE_TASK_ASYNC, MOVE_TASK, PUSH_TASK, REMOVE_TASK, CHECK_TASK, PUSH_ERROR, REMOVE_ERROR];

function isReminderAction(action) {
  return reminderActionTypes.includes(action.type);
} //
//                       _|      _|
//   _|_|_|    _|_|_|  _|_|_|_|        _|_|    _|_|_|
// _|    _|  _|          _|      _|  _|    _|  _|    _|
// _|    _|  _|          _|      _|  _|    _|  _|    _|
//   _|_|_|    _|_|_|      _|_|  _|    _|_|    _|    _|
//
//
//
//                                           _|
//   _|_|_|  _|  _|_|    _|_|      _|_|_|  _|_|_|_|    _|_|    _|  _|_|    _|_|_|
// _|        _|_|      _|_|_|_|  _|    _|    _|      _|    _|  _|_|      _|_|
// _|        _|        _|        _|    _|    _|      _|    _|  _|            _|_|
//   _|_|_|  _|          _|_|_|    _|_|_|      _|_|    _|_|    _|        _|_|_|
//
//


var addTaskAsync = function addTaskAsync() {
  return {
    type: ADD_TASK_ASYNC
  };
};
var changeTaskContentAsync = function changeTaskContentAsync(taskId, content) {
  return {
    type: CHANGE_TASK_CONTENT_ASYNC,
    payload: {
      taskId: taskId,
      content: content
    }
  };
};
var markTaskAsDoneAsync = function markTaskAsDoneAsync(taskId) {
  return {
    type: MARK_TASK_AS_DONE_ASYNC,
    payload: {
      taskId: taskId
    }
  };
};
var markTaskAsUndoneAsync = function markTaskAsUndoneAsync(taskId) {
  return {
    type: MARK_TASK_AS_UNDONE_ASYNC,
    payload: {
      taskId: taskId
    }
  };
};
var deleteTaskAsync = function deleteTaskAsync(taskId) {
  return {
    type: DELETE_TASK_ASYNC,
    payload: {
      taskId: taskId
    }
  };
};
var moveTask = function moveTask(sourceIndex, targetIndex) {
  return {
    type: MOVE_TASK,
    payload: {
      sourceIndex: sourceIndex,
      targetIndex: targetIndex
    }
  };
};
var pushTask = function pushTask(task) {
  return {
    type: PUSH_TASK,
    payload: {
      task: task
    }
  };
};
var removeTask = function removeTask(taskId) {
  return {
    type: REMOVE_TASK,
    payload: {
      taskId: taskId
    }
  };
};
var checkTask = function checkTask(taskId, task) {
  return {
    type: CHECK_TASK,
    payload: {
      taskId: taskId,
      task: task
    }
  };
};
var pushError = function pushError(errorId, error) {
  return {
    type: PUSH_ERROR,
    payload: {
      errorId: errorId,
      error: error
    }
  };
};
var removeError = function removeError(errorId) {
  return {
    type: REMOVE_ERROR,
    payload: {
      errorId: errorId
    }
  };
}; //
//                           _|
// _|  _|_|    _|_|      _|_|_|  _|    _|    _|_|_|    _|_|    _|  _|_|
// _|_|      _|_|_|_|  _|    _|  _|    _|  _|        _|_|_|_|  _|_|
// _|        _|        _|    _|  _|    _|  _|        _|        _|
// _|          _|_|_|    _|_|_|    _|_|_|    _|_|_|    _|_|_|  _|
//
//

var createReminderReducer = function createReminderReducer(initialState) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments.length > 1 ? arguments[1] : undefined;

    if (!isReminderAction(action)) {
      return state;
    }

    switch (action.type) {
      case ADD_TASK_ASYNC:
        return state;

      case CHANGE_TASK_CONTENT_ASYNC:
        {
          var i = state.tasks.findIndex(function (task) {
            return task.id.equals(action.payload.taskId);
          });

          if (i === -1) {
            throw new Error(); // TODO:
          }

          return _objectSpread({}, state, {
            tasks: [].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_6___default()(state.tasks.slice(0, i)), [state.tasks[i]["with"]({
              content: action.payload.content
            })], _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_6___default()(state.tasks.slice(i + 1)))
          });
        }

      case MARK_TASK_AS_DONE_ASYNC:
        {
          var _i = state.tasks.findIndex(function (task) {
            return task.id.equals(action.payload.taskId);
          });

          if (_i === -1) {
            throw new Error(); // TODO:
          }

          return _objectSpread({}, state, {
            tasks: [].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_6___default()(state.tasks.slice(0, _i)), [state.tasks[_i]["with"]({
              done: true
            })], _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_6___default()(state.tasks.slice(_i + 1)))
          });
        }

      case MARK_TASK_AS_UNDONE_ASYNC:
        {
          var _i2 = state.tasks.findIndex(function (task) {
            return task.id.equals(action.payload.taskId);
          });

          if (_i2 === -1) {
            throw new Error(); // TODO:
          }

          return _objectSpread({}, state, {
            tasks: [].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_6___default()(state.tasks.slice(0, _i2)), [state.tasks[_i2]["with"]({
              done: false
            })], _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_6___default()(state.tasks.slice(_i2 + 1)))
          });
        }

      case DELETE_TASK_ASYNC:
        return state;

      case MOVE_TASK:
        {
          var restTasks = [].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_6___default()(state.tasks.slice(0, action.payload.sourceIndex)), _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_6___default()(state.tasks.slice(action.payload.sourceIndex + 1)));
          return _objectSpread({}, state, {
            tasks: [].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_6___default()(restTasks.slice(0, action.payload.targetIndex)), [state.tasks[action.payload.sourceIndex]], _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_6___default()(restTasks.slice(action.payload.targetIndex)))
          });
        }

      case PUSH_TASK:
        return _objectSpread({}, state, {
          tasks: [].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_6___default()(state.tasks), [action.payload.task])
        });

      case REMOVE_TASK:
        {
          var _i3 = state.tasks.findIndex(function (task) {
            return task.id.equals(action.payload.taskId);
          });

          if (_i3 === -1) {
            throw new Error(); // TODO:
          }

          return _objectSpread({}, state, {
            tasks: [].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_6___default()(state.tasks.slice(0, _i3)), _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_6___default()(state.tasks.slice(_i3 + 1)))
          });
        }

      case CHECK_TASK:
        {
          return state;
        }

      case PUSH_ERROR:
        return _objectSpread({}, state, {
          errors: _objectSpread({}, state.errors, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()({}, action.payload.errorId, action.payload.error))
        });

      case REMOVE_ERROR:
        {
          if (!(action.payload.errorId in state.errors)) {
            throw new Error(); // TODO:
          }

          var _state$errors = state.errors,
              _action$payload$error = action.payload.errorId,
              removedError = _state$errors[_action$payload$error],
              restErrors = _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_5___default()(_state$errors, [_action$payload$error].map(_toPropertyKey));

          return _objectSpread({}, state, {
            errors: restErrors
          });
        }
    }
  };
}; //
//                                           _|
//   _|_|_|    _|_|    _|  _|_|  _|      _|        _|_|_|    _|_|
// _|_|      _|_|_|_|  _|_|      _|      _|  _|  _|        _|_|_|_|
//     _|_|  _|        _|          _|  _|    _|  _|        _|
// _|_|_|      _|_|_|  _|            _|      _|    _|_|_|    _|_|_|
//
//

var ReminderService = (_dec = Object(inversify__WEBPACK_IMPORTED_MODULE_8__["injectable"])(), _dec(_class =
/*#__PURE__*/
function () {
  function ReminderService(taskRepository) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, ReminderService);

    this.taskRepository = taskRepository;
  }

  ReminderService = Object(inversify__WEBPACK_IMPORTED_MODULE_8__["inject"])('TaskRepository')(ReminderService, undefined, 0) || ReminderService;

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(ReminderService, [{
    key: "addTaskAsyncSaga",
    value:
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function addTaskAsyncSaga() {
      var task;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function addTaskAsyncSaga$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              task = new _domain_entity_Task__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"]({
                id: new _domain_vo_TaskId__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"](Object(uuid__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"])()),
                content: '',
                done: false
              });
              _context.next = 3;
              return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_9__[/* call */ "a"])(this.taskRepository.store, task);

            case 3:
              _context.next = 5;
              return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_9__[/* put */ "d"])(pushTask(task));

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, addTaskAsyncSaga, this);
    })
  }, {
    key: "changeTaskContentAsyncSaga",
    value:
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function changeTaskContentAsyncSaga(_ref) {
      var _ref$payload, taskId, content, task;

      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function changeTaskContentAsyncSaga$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _ref$payload = _ref.payload, taskId = _ref$payload.taskId, content = _ref$payload.content;
              _context2.next = 3;
              return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_9__[/* call */ "a"])(this.taskRepository.findById, taskId);

            case 3:
              task = _context2.sent;
              _context2.prev = 4;
              task.content = content; // tslint:disable-line:no-object-mutation

              _context2.next = 15;
              break;

            case 8:
              _context2.prev = 8;
              _context2.t0 = _context2["catch"](4);

              if (!(_context2.t0 instanceof Error)) {
                _context2.next = 14;
                break;
              }

              _context2.next = 13;
              return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_9__[/* put */ "d"])(pushError(Object(uuid__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"])(), _context2.t0));

            case 13:
              return _context2.abrupt("return");

            case 14:
              throw new TypeError(Object(_lib_typed__WEBPACK_IMPORTED_MODULE_15__[/* default */ "a"])(_templateObject(), String(_context2.t0)));

            case 15:
              _context2.next = 17;
              return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_9__[/* call */ "a"])(this.taskRepository.store, task);

            case 17:
              _context2.next = 19;
              return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_9__[/* put */ "d"])(checkTask(taskId, task));

            case 19:
            case "end":
              return _context2.stop();
          }
        }
      }, changeTaskContentAsyncSaga, this, [[4, 8]]);
    })
  }, {
    key: "markTaskAsDoneAsyncSaga",
    value:
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function markTaskAsDoneAsyncSaga(_ref2) {
      var taskId, task;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function markTaskAsDoneAsyncSaga$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              taskId = _ref2.payload.taskId;
              _context3.next = 3;
              return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_9__[/* call */ "a"])(this.taskRepository.findById, taskId);

            case 3:
              task = _context3.sent;
              task.done = true; // tslint:disable-line:no-object-mutation

              _context3.next = 7;
              return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_9__[/* call */ "a"])(this.taskRepository.store, task);

            case 7:
              _context3.next = 9;
              return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_9__[/* put */ "d"])(checkTask(taskId, task));

            case 9:
            case "end":
              return _context3.stop();
          }
        }
      }, markTaskAsDoneAsyncSaga, this);
    })
  }, {
    key: "markTaskAsUndoneAsyncSaga",
    value:
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function markTaskAsUndoneAsyncSaga(_ref3) {
      var taskId, task;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function markTaskAsUndoneAsyncSaga$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              taskId = _ref3.payload.taskId;
              _context4.next = 3;
              return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_9__[/* call */ "a"])(this.taskRepository.findById, taskId);

            case 3:
              task = _context4.sent;
              task.done = false; // tslint:disable-line:no-object-mutation

              _context4.next = 7;
              return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_9__[/* call */ "a"])(this.taskRepository.store, task);

            case 7:
              _context4.next = 9;
              return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_9__[/* put */ "d"])(checkTask(taskId, task));

            case 9:
            case "end":
              return _context4.stop();
          }
        }
      }, markTaskAsUndoneAsyncSaga, this);
    })
  }, {
    key: "deleteTaskAsyncSaga",
    value:
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function deleteTaskAsyncSaga(_ref4) {
      var taskId;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function deleteTaskAsyncSaga$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              taskId = _ref4.payload.taskId;
              _context5.next = 3;
              return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_9__[/* call */ "a"])(this.taskRepository.remove, taskId);

            case 3:
              _context5.next = 5;
              return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_9__[/* put */ "d"])(removeTask(taskId));

            case 5:
            case "end":
              return _context5.stop();
          }
        }
      }, deleteTaskAsyncSaga, this);
    })
  }, {
    key: "checkTaskSaga",
    value:
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function checkTaskSaga(_ref5) {
      var _ref5$payload, taskId, task, _ref6, stateTasks, stateTask;

      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function checkTaskSaga$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _ref5$payload = _ref5.payload, taskId = _ref5$payload.taskId, task = _ref5$payload.task;
              _context6.next = 3;
              return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_9__[/* select */ "e"])();

            case 3:
              _ref6 = _context6.sent;
              stateTasks = _ref6.reminder.tasks;
              stateTask = stateTasks.find(function (_ref7) {
                var id = _ref7.id;
                return id.equals(taskId);
              });

              if (!(stateTask === undefined)) {
                _context6.next = 8;
                break;
              }

              throw new Error();

            case 8:
              if (stateTask.equals(task)) {
                _context6.next = 11;
                break;
              }

              _context6.next = 11;
              return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_9__[/* put */ "d"])(pushError(Object(uuid__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"])(), new _lib_errors__WEBPACK_IMPORTED_MODULE_14__[/* LogicError */ "b"]()));

            case 11:
            case "end":
              return _context6.stop();
          }
        }
      }, checkTaskSaga);
    })
  }, {
    key: "rootSaga",
    value:
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function rootSaga() {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function rootSaga$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return Object(_lib_boni_redux_saga_effects__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"])(ADD_TASK_ASYNC, [this, this.addTaskAsyncSaga]);

            case 2:
              _context7.next = 4;
              return Object(_lib_boni_redux_saga_effects__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"])(CHANGE_TASK_CONTENT_ASYNC, [this, this.changeTaskContentAsyncSaga]);

            case 4:
              _context7.next = 6;
              return Object(_lib_boni_redux_saga_effects__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"])(MARK_TASK_AS_DONE_ASYNC, [this, this.markTaskAsDoneAsyncSaga]);

            case 6:
              _context7.next = 8;
              return Object(_lib_boni_redux_saga_effects__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"])(MARK_TASK_AS_UNDONE_ASYNC, [this, this.markTaskAsUndoneAsyncSaga]);

            case 8:
              _context7.next = 10;
              return Object(_lib_boni_redux_saga_effects__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"])(DELETE_TASK_ASYNC, [this, this.deleteTaskAsyncSaga]);

            case 10:
              _context7.next = 12;
              return Object(_lib_boni_redux_saga_effects__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"])(CHECK_TASK, [this, this.checkTaskSaga]);

            case 12:
            case "end":
              return _context7.stop();
          }
        }
      }, rootSaga, this);
    })
  }]);

  return ReminderService;
}()) || _class);


/***/ }),

/***/ 14:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Coordinates; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(16);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(18);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(17);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _lib_trait_Hashable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(68);







// tslint:disable-line:no-empty-interface
var Coordinates =
/*#__PURE__*/
function (_Hashable) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(Coordinates, _Hashable);

  function Coordinates(_ref) {
    var _this;

    var file = _ref.file,
        rank = _ref.rank;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Coordinates);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Coordinates).call(this));
    _this.file = file;
    _this.rank = rank;
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Coordinates, [{
    key: "hashCode",
    value: function hashCode() {
      // tslint:disable-next-line:no-let
      var result = this.file.hashCode();
      result = 31 * result + this.rank.hashCode();
      return result;
    }
  }]);

  return Coordinates;
}(_lib_trait_Hashable__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"]);



/***/ }),

/***/ 142:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return equalsChessmen; });
function equalsChessmen(x, y) {
  return x.symbol === y.symbol;
}

/***/ }),

/***/ 144:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/classCallCheck.js
var classCallCheck = __webpack_require__(12);
var classCallCheck_default = /*#__PURE__*/__webpack_require__.n(classCallCheck);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/createClass.js
var createClass = __webpack_require__(16);
var createClass_default = /*#__PURE__*/__webpack_require__.n(createClass);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js
var possibleConstructorReturn = __webpack_require__(18);
var possibleConstructorReturn_default = /*#__PURE__*/__webpack_require__.n(possibleConstructorReturn);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/getPrototypeOf.js
var getPrototypeOf = __webpack_require__(17);
var getPrototypeOf_default = /*#__PURE__*/__webpack_require__.n(getPrototypeOf);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/inherits.js
var inherits = __webpack_require__(19);
var inherits_default = /*#__PURE__*/__webpack_require__.n(inherits);

// EXTERNAL MODULE: ./src/domain/vo/TaskId.ts + 2 modules
var TaskId = __webpack_require__(90);

// CONCATENATED MODULE: ./src/lib/extensions/Unknown/yieldThis.ts
function yieldThis(that, decorate) {
  return decorate(that);
}
// EXTERNAL MODULE: ./src/lib/validators/commonValidators.ts + 4 modules
var commonValidators = __webpack_require__(3);

// EXTERNAL MODULE: ./src/lib/trait/Hashable.ts + 1 modules
var Hashable = __webpack_require__(68);

// CONCATENATED MODULE: ./src/domain/entity/Entity.ts




 // TODO: move?

var Entity_Entity =
/*#__PURE__*/
function (_Hashable) {
  inherits_default()(Entity, _Hashable);

  function Entity(id) {
    var _this;

    classCallCheck_default()(this, Entity);

    _this = possibleConstructorReturn_default()(this, getPrototypeOf_default()(Entity).call(this));
    _this.id = id;
    return _this;
  }

  return Entity;
}(Hashable["a" /* default */]);


// CONCATENATED MODULE: ./src/domain/entity/Task.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Task_Task; });









var asIdSerializedTask = Object(commonValidators["b" /* asObject */])('an Id-serialized Task', function (input) {
  return {
    id: Object(commonValidators["c" /* asString */])(input.id),
    content: Object(commonValidators["c" /* asString */])(input.content),
    done: Object(commonValidators["a" /* asBoolean */])(input.done)
  };
});

var Task_Task =
/*#__PURE__*/
function (_Entity) {
  inherits_default()(Task, _Entity);

  function Task(_ref) {
    var _this;

    var id = _ref.id,
        content = _ref.content,
        done = _ref.done;

    classCallCheck_default()(this, Task);

    _this = possibleConstructorReturn_default()(this, getPrototypeOf_default()(Task).call(this, id));
    _this._content = void 0;
    _this._done = void 0;
    _this._content = content;
    _this._done = done;
    return _this;
  }

  createClass_default()(Task, [{
    key: "serialize",
    value: function serialize() {
      return JSON.stringify({
        id: this.id.serialize(),
        content: this.content,
        done: this.done
      });
    }
  }, {
    key: "hashCode",
    value: function hashCode() {
      // tslint:disable-next-line:no-let
      var result = 17;
      result = 31 * result + this.id.hashCode();
      result = 31 * result + this.content.hashCode();
      result = 31 * result + this.done.hashCode();
      return result;
    }
  }, {
    key: "with",
    value: function _with(_ref2) {
      var _ref2$content = _ref2.content,
          content = _ref2$content === void 0 ? this.content : _ref2$content,
          _ref2$done = _ref2.done,
          done = _ref2$done === void 0 ? this.done : _ref2$done;
      return new Task({
        id: this.id,
        content: content,
        done: done
      });
    }
  }, {
    key: "content",
    get: function get() {
      return this._content;
    },
    set: function set(value) {
      this._content = value; // tslint:disable-line:no-object-mutation
    }
  }, {
    key: "done",
    get: function get() {
      return this._done;
    },
    set: function set(value) {
      this._done = value; // tslint:disable-line:no-object-mutation
    }
  }], [{
    key: "deserialize",
    value: function deserialize(serialized) {
      var deserialized = yieldThis(asIdSerializedTask(JSON.parse(serialized)), function (_ref3) {
        var id = _ref3.id,
            content = _ref3.content,
            done = _ref3.done;
        return {
          id: TaskId["a" /* default */].deserialize(id),
          content: content,
          done: done
        };
      });
      return new Task(deserialized);
    }
  }]);

  return Task;
}(Entity_Entity);



/***/ }),

/***/ 152:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return hashCode; });
function hashCode(x) {
  var v = doubleToLongBits(x);
  return v ^ v / Math.pow(2, 32);
} // TODO: remove

function doubleToLongBits(value) {
  var buf = Buffer.allocUnsafe(8);
  buf.writeDoubleBE(value, 0);
  return Math.pow(2, 32) * buf.readUInt32BE(0) + buf.readUInt32BE(4);
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(224).Buffer))

/***/ }),

/***/ 153:
/***/ (function(module) {

module.exports = JSON.parse("{\"number\":{\"usd\":{\"style\":\"currency\",\"currency\":\"USD\"}},\"date\":{\"medium\":{\"year\":\"numeric\",\"month\":\"short\",\"day\":\"numeric\"}},\"time\":{\"medium\":{\"hour12\":false,\"year\":\"numeric\",\"month\":\"short\",\"day\":\"numeric\",\"hour\":\"numeric\",\"minute\":\"2-digit\",\"second\":\"2-digit\"}}}");

/***/ }),

/***/ 154:
/***/ (function(module) {

module.exports = JSON.parse("{\"src.components.App.ChessPage.chess\":\"chess\",\"src.components.App.CounterPage.counter\":\"counter\",\"src.components.App.HomePage.helloWorld\":\"Hello, world!\",\"src.components.App.HomePage.home\":\"home\",\"src.components.App.InfoPage.info\":\"info\",\"src.components.App.ReminderPage.reminder\":\"reminder\",\"src.components.Counter.decrement\":\"-\",\"src.components.Counter.increment\":\"+\",\"src.components.Counter.incrementIfOdd\":\"+ if odd\",\"src.components.Counter.reset\":\"reset\",\"src.components.Counter.willIncrementInOneSecond\":\"+ in 1 second\",\"src.components.Info.fetchData\":\"Fetch data\",\"src.components.Info.fetching\":\"Fetching..\",\"src.components.Info.fetchingDoneSuccessfully\":\"Fetching done successfully.\",\"src.components.Info.fetchingFailed\":\"Fetching failed.\",\"src.components.Info.fetchingNotStarted\":\"Fetching not started.\",\"src.components.LocaleSelect.languages\":\"Languages\",\"src.components.Nav.chess\":\"chess\",\"src.components.Nav.counter\":\"counter\",\"src.components.Nav.home\":\"home\",\"src.components.Nav.info\":\"info\",\"src.components.Nav.reminder\":\"reminder\",\"src.components.Reminder.AddTaskButton.add\":\"add\",\"src.components.Reminder.TaskListItem.asBoundedLengthStringErrorMessage\":\"{ name } must be 0-{ upperBound } characters.\",\"src.components.Reminder.inputIsNotBetweenLowerBoundAndUpperBound\":\"{ input } is not between { lowerBound } and { upperBound }.\",\"src.components.SetClockButton.setTheClock\":\"Set the clock\",\"src.lib.components.FileUpload.browse\":\"Browse…\",\"src.lib.components.FileUpload.noFileSelected\":\"No file selected.\"}");

/***/ }),

/***/ 259:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/taggedTemplateLiteral.js
var taggedTemplateLiteral = __webpack_require__(10);
var taggedTemplateLiteral_default = /*#__PURE__*/__webpack_require__.n(taggedTemplateLiteral);

// EXTERNAL MODULE: ./node_modules/connected-react-router/esm/index.js + 5 modules
var esm = __webpack_require__(75);

// EXTERNAL MODULE: ./node_modules/history/esm/history.js + 2 modules
var esm_history = __webpack_require__(48);

// EXTERNAL MODULE: ./node_modules/immutable/dist/immutable.es.js
var immutable_es = __webpack_require__(84);

// EXTERNAL MODULE: ./node_modules/inversify-react/dist/index.js
var dist = __webpack_require__(126);

// EXTERNAL MODULE: ./node_modules/notistack/build/index.js
var build = __webpack_require__(145);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(0);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/react-dnd/dist/esm/common/DndProvider.js
var DndProvider = __webpack_require__(289);

// EXTERNAL MODULE: ./node_modules/react-dnd-html5-backend/dist/esm/index.js + 12 modules
var dist_esm = __webpack_require__(165);

// EXTERNAL MODULE: ./node_modules/react-dom/index.js
var react_dom = __webpack_require__(43);
var react_dom_default = /*#__PURE__*/__webpack_require__.n(react_dom);

// EXTERNAL MODULE: ./node_modules/react-helmet/lib/Helmet.js
var Helmet = __webpack_require__(118);
var Helmet_default = /*#__PURE__*/__webpack_require__.n(Helmet);

// EXTERNAL MODULE: ./node_modules/reflect-metadata/Reflect.js
var Reflect = __webpack_require__(222);

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/CssBaseline/CssBaseline.js
var CssBaseline = __webpack_require__(290);

// EXTERNAL MODULE: ./node_modules/@material-ui/styles/esm/ThemeProvider/ThemeProvider.js
var ThemeProvider = __webpack_require__(286);

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/useMediaQuery/useMediaQuery.js
var useMediaQuery = __webpack_require__(288);

// EXTERNAL MODULE: ./node_modules/react-hot-loader/root.js
var root = __webpack_require__(164);

// EXTERNAL MODULE: ./node_modules/react-router/esm/react-router.js + 1 modules
var react_router = __webpack_require__(36);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/extends.js
var helpers_extends = __webpack_require__(49);
var extends_default = /*#__PURE__*/__webpack_require__.n(helpers_extends);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/objectWithoutProperties.js
var objectWithoutProperties = __webpack_require__(42);
var objectWithoutProperties_default = /*#__PURE__*/__webpack_require__.n(objectWithoutProperties);

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/CircularProgress/CircularProgress.js
var CircularProgress = __webpack_require__(291);

// CONCATENATED MODULE: ./src/lib/components/Route/index.tsx






var Route_withSuspense = function withSuspense(Component) {
  return function (props) {
    return react_default.a.createElement(react_default.a.Suspense, {
      fallback: react_default.a.createElement(CircularProgress["a" /* default */], null)
    }, react_default.a.createElement(Component, props));
  };
};

var Route_Route = function Route(_ref) {
  var component = _ref.component,
      restProps = objectWithoutProperties_default()(_ref, ["component"]);

  if (component === undefined) {
    return react_default.a.createElement(react_router["b" /* Route */], restProps);
  }

  if ('_result' in component) {
    // FIXME: if LazyExoticComponent
    return react_default.a.createElement(react_router["b" /* Route */], extends_default()({
      component: Route_withSuspense(component)
    }, restProps));
  } else {
    return react_default.a.createElement(react_router["b" /* Route */], extends_default()({
      component: component
    }, restProps));
  }
};

/* harmony default export */ var components_Route = (Route_Route);
// CONCATENATED MODULE: ./src/components/App/index.tsx




var HomePage = react_default.a.lazy(function () {
  return Promise.all(/* import() | home */[__webpack_require__.e(0), __webpack_require__.e(4)]).then(__webpack_require__.bind(null, 382));
});
var ChessPage = react_default.a.lazy(function () {
  return Promise.all(/* import() | chess */[__webpack_require__.e(0), __webpack_require__.e(1), __webpack_require__.e(2)]).then(__webpack_require__.bind(null, 381));
});
var CounterPage = react_default.a.lazy(function () {
  return Promise.all(/* import() | counter */[__webpack_require__.e(0), __webpack_require__.e(3)]).then(__webpack_require__.bind(null, 386));
});
var InfoPage = react_default.a.lazy(function () {
  return Promise.all(/* import() | info */[__webpack_require__.e(0), __webpack_require__.e(5)]).then(__webpack_require__.bind(null, 389));
});
var ReminderPage = react_default.a.lazy(function () {
  return Promise.all(/* import() | reminder */[__webpack_require__.e(0), __webpack_require__.e(1), __webpack_require__.e(11), __webpack_require__.e(8)]).then(__webpack_require__.bind(null, 380));
});
var NoMatch = react_default.a.lazy(function () {
  return Promise.all(/* import() | noMatch */[__webpack_require__.e(0), __webpack_require__.e(7)]).then(__webpack_require__.bind(null, 379));
});

var App_App = function App() {
  var location = Object(react_router["g" /* useLocation */])();

  if (location.pathname === '/' && location.hash !== '') {
    var _$exec;

    var pathname = (_$exec = /^#(.*)$/.exec(location.hash)) === null || _$exec === void 0 ? void 0 : _$exec[1]; // TODO: shape check

    return react_default.a.createElement(react_router["a" /* Redirect */], {
      to: {
        pathname: pathname
      }
    });
  }

  return react_default.a.createElement(react_router["d" /* Switch */], null, react_default.a.createElement(components_Route, {
    exact: true,
    strict: true,
    sensitive: true,
    path: "/",
    component: HomePage
  }), react_default.a.createElement(components_Route, {
    exact: true,
    strict: true,
    sensitive: true,
    path: "/chess",
    component: ChessPage
  }), react_default.a.createElement(components_Route, {
    exact: true,
    strict: true,
    sensitive: true,
    path: "/counter",
    component: CounterPage
  }), react_default.a.createElement(components_Route, {
    exact: true,
    strict: true,
    sensitive: true,
    path: "/info",
    component: InfoPage
  }), react_default.a.createElement(components_Route, {
    exact: true,
    strict: true,
    sensitive: true,
    path: "/reminder",
    component: ReminderPage
  }), react_default.a.createElement(components_Route, {
    path: "*",
    component: NoMatch
  }));
};

/* harmony default export */ var components_App = (Object(root["hot"])(App_App));
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/objectDestructuringEmpty.js
var objectDestructuringEmpty = __webpack_require__(163);
var objectDestructuringEmpty_default = /*#__PURE__*/__webpack_require__.n(objectDestructuringEmpty);

// EXTERNAL MODULE: ./node_modules/react-redux/es/index.js + 22 modules
var es = __webpack_require__(58);

// EXTERNAL MODULE: ./node_modules/react-intl/lib/components/provider.js + 7 modules
var provider = __webpack_require__(271);

// EXTERNAL MODULE: ./src/lib/contexts/IntlProviderContext.ts
var IntlProviderContext = __webpack_require__(117);

// CONCATENATED MODULE: ./src/lib/components/IntlProvider/index.tsx






// NOTE: key が無い場合、 FormattedMessage 等は re-render されるが、 useIntl の結果は更新されない。
// TODO: intl context でない要素を re-render しないようにする。 https://github.com/formatjs/react-intl/issues/234#issuecomment-163366518 によると現時点では難しいらしい。
// cf. https://github.com/formatjs/react-intl/issues/371#issuecomment-275703796
var IntlProvider_IntlProvider = function IntlProvider(_ref) {
  var availableLocales = _ref.availableLocales,
      props = objectWithoutProperties_default()(_ref, ["availableLocales"]);

  return react_default.a.createElement(IntlProviderContext["a" /* default */].Provider, {
    value: {
      availableLocales: availableLocales
    }
  }, react_default.a.createElement(provider["a" /* default */], extends_default()({
    key: props.locale,
    textComponent: react_default.a.Fragment
  }, props)));
};

/* harmony default export */ var components_IntlProvider = (IntlProvider_IntlProvider);
// CONCATENATED MODULE: ./src/components/IntlProvider/index.tsx




var IntlProvider_mapStateToProps = function mapStateToProps(_ref, _ref2) {
  var _ref$localeSelector = _ref.localeSelector,
      locale = _ref$localeSelector.locale,
      formats = _ref$localeSelector.formats,
      messages = _ref$localeSelector.messages;

  objectDestructuringEmpty_default()(_ref2);

  return {
    locale: locale,
    formats: formats,
    messages: messages
  };
};

/* harmony default export */ var src_components_IntlProvider = (Object(es["c" /* connect */])(IntlProvider_mapStateToProps)(components_IntlProvider));
// EXTERNAL MODULE: ./node_modules/@material-ui/core/colors/indigo.js
var indigo = __webpack_require__(105);
var indigo_default = /*#__PURE__*/__webpack_require__.n(indigo);

// EXTERNAL MODULE: ./node_modules/@material-ui/core/colors/teal.js
var teal = __webpack_require__(156);
var teal_default = /*#__PURE__*/__webpack_require__.n(teal);

// EXTERNAL MODULE: ./node_modules/@material-ui/core/styles/createMuiTheme.js
var createMuiTheme = __webpack_require__(155);
var createMuiTheme_default = /*#__PURE__*/__webpack_require__.n(createMuiTheme);

// CONCATENATED MODULE: ./src/configureTheme.ts




var configureTheme_configureTheme = function configureTheme(_ref) {
  var dark = _ref.dark;
  return createMuiTheme_default()({
    typography: {
      fontFamily: 'sans-serif'
    },
    props: {
      MuiLink: {
        variant: 'body1'
      },
      MuiButton: {
        variant: 'outlined'
      },
      MuiFormControl: {
        variant: 'outlined'
      },
      MuiTextField: {
        variant: 'outlined'
      },
      MuiCheckbox: {
        color: 'primary'
      }
    },
    palette: {
      primary: teal_default.a,
      secondary: indigo_default.a,
      type: dark ? 'dark' : 'light'
    }
  });
};

/* harmony default export */ var src_configureTheme = (configureTheme_configureTheme);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/classCallCheck.js
var classCallCheck = __webpack_require__(12);
var classCallCheck_default = /*#__PURE__*/__webpack_require__.n(classCallCheck);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/createClass.js
var createClass = __webpack_require__(16);
var createClass_default = /*#__PURE__*/__webpack_require__.n(createClass);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js
var possibleConstructorReturn = __webpack_require__(18);
var possibleConstructorReturn_default = /*#__PURE__*/__webpack_require__.n(possibleConstructorReturn);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/getPrototypeOf.js
var getPrototypeOf = __webpack_require__(17);
var getPrototypeOf_default = /*#__PURE__*/__webpack_require__.n(getPrototypeOf);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/inherits.js
var inherits = __webpack_require__(19);
var inherits_default = /*#__PURE__*/__webpack_require__.n(inherits);

// EXTERNAL MODULE: ./node_modules/connected-react-router/esm/middleware.js
var middleware = __webpack_require__(143);

// EXTERNAL MODULE: ./node_modules/redux/es/redux.js
var redux = __webpack_require__(39);

// EXTERNAL MODULE: ./node_modules/redux-logger/dist/redux-logger.js
var redux_logger = __webpack_require__(161);

// EXTERNAL MODULE: ./node_modules/redux-saga/dist/redux-saga-core-npm-proxy.esm.js
var redux_saga_core_npm_proxy_esm = __webpack_require__(162);

// CONCATENATED MODULE: ./src/lib/middleware/invariantMiddleware/createInvariantMiddleware.ts
var createInvariantMiddleware = function createInvariantMiddleware(reducer, invariant) {
  return function (store) {
    return function (next) {
      return function (action) {
        var oldState = store.getState();
        var newState = reducer(oldState, action);

        if (!invariant(newState)) {
          throw new Error('Invariant Violation'); // TODO
        }

        return next(action);
      };
    };
  };
};

/* harmony default export */ var invariantMiddleware_createInvariantMiddleware = (createInvariantMiddleware);
// CONCATENATED MODULE: ./src/configureStore.ts
var _window$__REDUX_DEVTO;






var logger = Object(redux_logger["createLogger"])({
  diff: true
});
var composeEnhancers =  false ? undefined : redux["d" /* compose */];
function configureStore(history, reducer, invariant, sagaMiddlewareOptions) {
  var sagaMiddleware = Object(redux_saga_core_npm_proxy_esm["a" /* default */])(sagaMiddlewareOptions);
  var invariantMiddleware = invariantMiddleware_createInvariantMiddleware(reducer, invariant);
  var storeEnhancers = [Object(redux["a" /* applyMiddleware */])(sagaMiddleware), Object(redux["a" /* applyMiddleware */])(invariantMiddleware), Object(redux["a" /* applyMiddleware */])(Object(middleware["a" /* default */])(history))];

  if (false) {}

  var store = Object(redux["e" /* createStore */])(reducer, composeEnhancers.apply(void 0, storeEnhancers));
  return {
    store: store,
    sagaMiddleware: sagaMiddleware // applied

  };
}
// EXTERNAL MODULE: ./src/lib/errors.ts
var errors = __webpack_require__(34);

// CONCATENATED MODULE: ./src/createProvider.tsx









var MAXIMUM_RECURSION_DEPTH = 100;
function createProvider(history, reducer, invariant, saga) {
  var _class, _temp;

  var recursionDepth = 0; // tslint:disable-line:no-let

  return _temp = _class =
  /*#__PURE__*/
  function (_React$Component) {
    inherits_default()(Provider, _React$Component);

    // NOTE: https://github.com/DefinitelyTyped/DefinitelyTyped/blob/826ce0f1ce1d1887d199986283630d6f63075ad5/types/react/index.d.ts#L419 にも関わらず、初期化されていない state は null であるため、初期化を強制するためにプロパティ宣言を行う。
    function Provider(props) {
      var _this;

      classCallCheck_default()(this, Provider);

      _this = possibleConstructorReturn_default()(this, getPrototypeOf_default()(Provider).call(this, props));
      _this.store = void 0;
      _this.state = {
        hasError: false
      };

      _this.handleError = function (error, cause) {
        _this.setState({
          hasError: true,
          error: error,
          cause: cause
        });
      };

      var exceptionNeutralReducer = function exceptionNeutralReducer(state, action) {
        try {
          return reducer(state, action);
        } catch (error) {
          _this.handleError(error, 'reducer');

          if (state === undefined) {
            throw new errors["c" /* UnreachableError */]();
          }

          return state;
        }
      };

      var _configureStore = configureStore(history, exceptionNeutralReducer, invariant, {
        onError: function onError(error) {
          return _this.handleError(error, 'saga');
        }
      }),
          store = _configureStore.store,
          sagaMiddleware = _configureStore.sagaMiddleware;

      _this.store = store;
      sagaMiddleware.run(saga).toPromise()["catch"](function (error) {
        return _this.handleError(error, 'rootSaga');
      });
      return _this;
    }

    createClass_default()(Provider, [{
      key: "render",
      value: function render() {
        var _this$props = this.props,
            renderError = _this$props.renderError,
            children = _this$props.children;
        var _this$state = this.state,
            hasError = _this$state.hasError,
            error = _this$state.error,
            cause = _this$state.cause;

        if (hasError) {
          ++recursionDepth;

          if (recursionDepth > MAXIMUM_RECURSION_DEPTH) {
            throw new Error('Maximum recursion depth exceeded');
          }

          if (cause === undefined) {
            throw new Error(); // TODO
          }

          return renderError(error, children, this.store, cause);
        }

        return react_default.a.createElement(es["a" /* Provider */], {
          store: this.store
        }, children);
      }
    }]);

    return Provider;
  }(react_default.a.Component), _class.getDerivedStateFromError = function (error) {
    return {
      hasError: true,
      error: error,
      cause: 'component'
    };
  }, _temp;
}
// CONCATENATED MODULE: ./src/lib/extensions/Boolean/hashCode.ts
function hashCode(b) {
  return b ? 1 : 0;
}
// CONCATENATED MODULE: ./src/lib/extensions/Boolean/Boolean.prototype.hashCode.ts


Object.defineProperty(Boolean.prototype, 'hashCode', {
  value: function value() {
    return hashCode(this);
  }
});
// EXTERNAL MODULE: ./src/lib/extensions/Number/hashCode.ts
var Number_hashCode = __webpack_require__(152);

// CONCATENATED MODULE: ./src/lib/extensions/Number/Number.prototype.hashCode.ts


Object.defineProperty(Number.prototype, 'hashCode', {
  value: function value() {
    return Object(Number_hashCode["a" /* default */])(this);
  }
});
// CONCATENATED MODULE: ./src/lib/extensions/String/hashCode.ts
function hashCode_hashCode(s) {
  // tslint:disable-next-line:no-let
  var result = 0; // tslint:disable-next-line:no-loop-statement

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = s[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var c = _step.value;
      result = 31 * result + c.charCodeAt(0);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return result;
}
// CONCATENATED MODULE: ./src/lib/extensions/String/String.prototype.hashCode.ts


Object.defineProperty(String.prototype, 'hashCode', {
  value: function value() {
    return hashCode_hashCode(this);
  }
});
// EXTERNAL MODULE: ./src/lib/typed.ts
var typed = __webpack_require__(11);

// EXTERNAL MODULE: ./src/redux/index.ts + 1 modules
var src_redux = __webpack_require__(91);

// CONCATENATED MODULE: ./src/types/globalTypes.ts
// TODO: remove

// EXTERNAL MODULE: ./public/formats/en.json
var en = __webpack_require__(153);

// EXTERNAL MODULE: ./public/messages/en.json
var messages_en = __webpack_require__(154);

// CONCATENATED MODULE: ./src/index.tsx


function _templateObject2() {
  var data = taggedTemplateLiteral_default()(["", " is not an error."]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = taggedTemplateLiteral_default()(["", ""]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

/* tslint:disable:no-import-side-effect */
























 // tslint:disable-line:no-relative-imports

 // tslint:disable-line:no-relative-imports

var containerImport =  true ? __webpack_require__.e(/* import() */ 12).then(__webpack_require__.bind(null, 384)) : undefined;
var initialState = {
  chess: {
    board: {
      chessmen: Object(immutable_es["a" /* Map */])()
    }
  },
  counter: {
    count: 0
  },
  io: {
    now: new Date()
  },
  localeSelector: {
    locale: 'en',
    formats: en,
    messages: messages_en,
    errors: []
  },
  reminder: {
    tasks: [],
    errors: {}
  }
};

/**
 * The entry point component.
 */
var src_Main = function Main(_ref) {
  var history = _ref.history,
      container = _ref.container;
  var dark = Object(useMediaQuery["a" /* default */])('(prefers-color-scheme: dark)');
  var theme = Object(react["useMemo"])(function () {
    return src_configureTheme({
      dark: dark
    });
  }, [dark]);
  var renderError = Object(react["useCallback"])(function (error) {
    if (error instanceof Error) {
      // NOTE: `rootSaga` とそれに attach された saga から error が投げられた場合、 Maximum recursion depth exceeded が発生する。
      return react_default.a.createElement(Provider, {
        renderError: renderError
      }, react_default.a.createElement("div", null, Object(typed["a" /* default */])(_templateObject(), String(error))));
    }

    throw new TypeError(Object(typed["a" /* default */])(_templateObject2(), String(error)));
  }, []);
  var reducer = Object(react["useMemo"])(function () {
    return Object(src_redux["a" /* createReducer */])(history, initialState);
  }, [history]);
  var rootSaga = Object(react["useCallback"])(function () {
    var service = container.resolve(src_redux["b" /* default */]); // TODO: DI

    return service.rootSaga.call(service);
  }, [container]);
  var Provider = createProvider(history, reducer, src_redux["c" /* invariant */], rootSaga);
  return react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement(Helmet_default.a, {
    titleTemplate: "%s - react-app-prototype",
    defaultTitle: "react-app-prototype"
  }), react_default.a.createElement(Provider, {
    renderError: renderError
  }, react_default.a.createElement(src_components_IntlProvider, {
    availableLocales: ['en', 'ja']
  }, react_default.a.createElement(DndProvider["a" /* DndProvider */], {
    backend: dist_esm["a" /* default */]
  }, react_default.a.createElement(esm["a" /* ConnectedRouter */], {
    history: history
  }, react_default.a.createElement(dist["Provider"], {
    container: container
  }, react_default.a.createElement(ThemeProvider["a" /* default */], {
    theme: theme
  }, react_default.a.createElement(CssBaseline["a" /* default */], null), react_default.a.createElement(build["SnackbarProvider"], null, react_default.a.createElement(components_App, null)))))))));
};

containerImport.then(function (_ref2) {
  var container = _ref2["default"];

  // TODO: DI BASE_URL
  if ("https://sueka.github.io/react-app-prototype" === undefined || !"https://sueka.github.io/react-app-prototype".startsWith(window.location.origin)) {
    throw new Error(); // TODO
  }

  var basename = "https://sueka.github.io/react-app-prototype".slice(window.location.origin.length);
  var history = Object(esm_history["a" /* createBrowserHistory */])({
    basename: basename
  });
  react_dom_default.a.render(react_default.a.createElement(src_Main, {
    history: history,
    container: container
  }), document.getElementById('root'));
});

/***/ }),

/***/ 28:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ValidationError; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(17);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _lib_errors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(34);





/**
 * @param key of results of defineMessages from react-intl
 * @param values for react-intl
 */

var ValidationError =
/*#__PURE__*/
function (_AbstractError) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(ValidationError, _AbstractError);

  function ValidationError(message, key, values) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, ValidationError);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default()(ValidationError).call(this, message));
    _this.key = key;
    _this.values = values;
    return _this;
  }

  return ValidationError;
}(_lib_errors__WEBPACK_IMPORTED_MODULE_4__[/* AbstractError */ "a"]);



/***/ }),

/***/ 3:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/slicedToArray.js
var slicedToArray = __webpack_require__(23);
var slicedToArray_default = /*#__PURE__*/__webpack_require__.n(slicedToArray);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/taggedTemplateLiteral.js
var taggedTemplateLiteral = __webpack_require__(10);
var taggedTemplateLiteral_default = /*#__PURE__*/__webpack_require__.n(taggedTemplateLiteral);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/defineProperty.js
var defineProperty = __webpack_require__(20);
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty);

// EXTERNAL MODULE: ./node_modules/fp-ts/lib/Either.js
var Either = __webpack_require__(52);

// EXTERNAL MODULE: ./src/lib/errors.ts
var errors = __webpack_require__(34);

// EXTERNAL MODULE: ./src/lib/typed.ts
var typed = __webpack_require__(11);

// CONCATENATED MODULE: ./src/lib/extensions/Array/conj.ts


function _templateObject2() {
  var data = taggedTemplateLiteral_default()(["", "", "", ""]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = taggedTemplateLiteral_default()(["The size of ", " is less than two."]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}



/**
 * @throw {TypeError} if the size of {xs} is less than two.
 *
 * @example
 * conj(', ', ' or ', ['A', 'B', 'C']) // 'A, B or C'
 */

function conj(xs, separator, lastSeparator) {
  if (xs.length < 2) {
    throw new TypeError(Object(typed["a" /* default */])(_templateObject(), xs.toString()));
  }

  var lastX = xs.pop(); // tslint:disable-line:no-array-mutation

  if (lastX === undefined) {
    throw new errors["c" /* UnreachableError */]();
  }

  return Object(typed["a" /* default */])(_templateObject2(), xs.join(separator), lastSeparator, lastX);
}
// EXTERNAL MODULE: ./src/lib/extensions/Iterable/zipIterables.ts + 1 modules
var zipIterables = __webpack_require__(77);

// CONCATENATED MODULE: ./src/lib/extensions/Eq/equalsJsons.ts


function equalsJsons(x, y) {
  if (x === null && y === null) {
    return true;
  }

  if (typeof x === 'boolean' && typeof y === 'boolean' || typeof x === 'number' && typeof y === 'number' || typeof x === 'string' && typeof y === 'string') {
    return x === y;
  }

  if (Array.isArray(x) && Array.isArray(y)) {
    return equalsJsonArrays(x, y);
  }

  if (x === null || typeof x === 'boolean' || typeof x === 'number' || typeof x === 'string' || Array.isArray(x) || y === null || typeof y === 'boolean' || typeof y === 'number' || typeof y === 'string' || Array.isArray(y)) {
    return false;
  }

  return equalsJsonObjects(x, y);
}

function equalsJsonArrays(xs, ys) {
  if (xs.length !== ys.length) {
    return false;
  } // tslint:disable-next-line:no-loop-statement


  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = Object(zipIterables["a" /* default */])(xs, ys)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _step$value = slicedToArray_default()(_step.value, 2),
          x = _step$value[0],
          y = _step$value[1];

      if (!equalsJsons(x, y)) {
        return false;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return true;
}

function equalsJsonObjects(iXMap, jYMap) {
  var is = Object.keys(iXMap);
  var js = Object.keys(jYMap);

  if (is.length !== js.length) {
    return false;
  }

  is.sort(); // tslint:disable-line:no-array-mutation

  js.sort(); // tslint:disable-line:no-array-mutation
  // tslint:disable-next-line:no-loop-statement

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = Object(zipIterables["a" /* default */])(is, js)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var _step2$value = slicedToArray_default()(_step2.value, 2),
          i = _step2$value[0],
          j = _step2$value[1];

      if (i !== j) {
        return false;
      }

      var x = iXMap[i];
      var y = jYMap[j];

      if (!equalsJsons(x, y)) {
        return false;
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
        _iterator2["return"]();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return true;
}
// EXTERNAL MODULE: ./node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__(4);
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);

// CONCATENATED MODULE: ./src/lib/extensions/String/stripMargin.ts



var _marked =
/*#__PURE__*/
regenerator_default.a.mark(generateLineWithEolIterator);

function _templateObject4() {
  var data = taggedTemplateLiteral_default()(["^(?:[\\t ]*(?<marginChar>.))?(?<stripped>(?:.|", ")*", "?)$"], ["^(?:[\\\\t ]*(?<marginChar>.))?(?<stripped>(?:.|", ")*", "?)$"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = taggedTemplateLiteral_default()(["[", "]"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function stripMargin_templateObject2() {
  var data = taggedTemplateLiteral_default()(["(?:", ")"]);

  stripMargin_templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function stripMargin_templateObject() {
  var data = taggedTemplateLiteral_default()(["(?:", ")"]);

  stripMargin_templateObject = function _templateObject() {
    return data;
  };

  return data;
}


var eols = ['\n', '\r\n'];
var eolPattern = new RegExp(Object(typed["a" /* default */])(stripMargin_templateObject(), eols.join('|')));
var eolCharPattern = new RegExp(Object(typed["a" /* default */])(stripMargin_templateObject2(), eols.map(function (eol) {
  return Object(typed["a" /* default */])(_templateObject3(), eol);
}).join('|')));
function stripMargin(that, marginChar) {
  if (marginChar === undefined) {
    return stripMargin1(that);
  }

  return stripMargin2(that, marginChar);
}

function stripMargin1(that) {
  return stripMargin2(that, '|');
}

function stripMargin2(that, marginChar) {
  var result = ''; // tslint:disable-line:no-let
  // tslint:disable-next-line:no-loop-statement

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = generateLineWithEolIterator(that)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var line = _step.value;
      var matches = new RegExp(Object(typed["a" /* default */])(_templateObject4(), eolCharPattern.source, eolPattern.source), 'u').exec(line);
      var groups = matches === null || matches === void 0 ? void 0 : matches.groups; // TODO

      if (groups === undefined) {
        throw new Error(); // TODO
      }

      var marginCharCandidate = groups.marginChar,
          stripped = groups.stripped;

      if (marginCharCandidate === marginChar) {
        result += stripped;
      } else {
        result += line;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return result;
}

function generateLineWithEolIterator(cs) {
  var lineBuffer, eolBuffer, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _loop, _iterator2, _step2;

  return regenerator_default.a.wrap(function generateLineWithEolIterator$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          lineBuffer = ''; // tslint:disable-line:no-let

          eolBuffer = ''; // tslint:disable-line:no-let
          // tslint:disable-next-line:no-loop-statement

          _iteratorNormalCompletion2 = true;
          _didIteratorError2 = false;
          _iteratorError2 = undefined;
          _context2.prev = 5;
          _loop =
          /*#__PURE__*/
          regenerator_default.a.mark(function _loop() {
            var c;
            return regenerator_default.a.wrap(function _loop$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    c = _step2.value;
                    lineBuffer += c;

                    if (eols.some(function (eol) {
                      return eol.startsWith(eolBuffer + c);
                    })) {
                      eolBuffer += c;
                    }

                    if (!eols.includes(eolBuffer)) {
                      _context.next = 8;
                      break;
                    }

                    _context.next = 6;
                    return lineBuffer;

                  case 6:
                    lineBuffer = '';
                    eolBuffer = '';

                  case 8:
                  case "end":
                    return _context.stop();
                }
              }
            }, _loop);
          });
          _iterator2 = cs[Symbol.iterator]();

        case 8:
          if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
            _context2.next = 13;
            break;
          }

          return _context2.delegateYield(_loop(), "t0", 10);

        case 10:
          _iteratorNormalCompletion2 = true;
          _context2.next = 8;
          break;

        case 13:
          _context2.next = 19;
          break;

        case 15:
          _context2.prev = 15;
          _context2.t1 = _context2["catch"](5);
          _didIteratorError2 = true;
          _iteratorError2 = _context2.t1;

        case 19:
          _context2.prev = 19;
          _context2.prev = 20;

          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }

        case 22:
          _context2.prev = 22;

          if (!_didIteratorError2) {
            _context2.next = 25;
            break;
          }

          throw _iteratorError2;

        case 25:
          return _context2.finish(22);

        case 26:
          return _context2.finish(19);

        case 27:
          if (!(lineBuffer !== '')) {
            _context2.next = 30;
            break;
          }

          _context2.next = 30;
          return lineBuffer;

        case 30:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked, null, [[5, 15, 19, 27], [20,, 22, 26]]);
}
// CONCATENATED MODULE: ./src/lib/extensions/String/trimEols.ts


function trimEols_templateObject2() {
  var data = taggedTemplateLiteral_default()(["", "*$"]);

  trimEols_templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function trimEols_templateObject() {
  var data = taggedTemplateLiteral_default()(["^", "*"]);

  trimEols_templateObject = function _templateObject() {
    return data;
  };

  return data;
}


function trimEols(s) {
  return trimTrailingEols(trimLeadingEols(s));
}
var trimEols_eolPattern = /(?:\r?\n)/;

function trimLeadingEols(s) {
  return s.replace(new RegExp(Object(typed["a" /* default */])(trimEols_templateObject(), trimEols_eolPattern.source)), '');
}

function trimTrailingEols(s) {
  return s.replace(new RegExp(Object(typed["a" /* default */])(trimEols_templateObject2(), trimEols_eolPattern.source)), '');
}
// EXTERNAL MODULE: ./src/lib/validators/ValidationError.ts
var ValidationError = __webpack_require__(28);

// CONCATENATED MODULE: ./src/lib/validators/commonValidators.ts
/* unused harmony export failSafe */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return commonValidators_leftOnly; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return commonValidators_named; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return optional; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return commonValidators_unionOf; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return commonValidators_recordOf; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return asUnionOf; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return commonValidators_asObject; });
/* unused harmony export asConstant */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return asBoolean; });
/* unused harmony export asNumber */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return asString; });
/* unused harmony export asJson */




function _templateObject14() {
  var data = taggedTemplateLiteral_default()(["", " is not an error."]);

  _templateObject14 = function _templateObject14() {
    return data;
  };

  return data;
}

function _templateObject13() {
  var data = taggedTemplateLiteral_default()(["", " is not a Json."]);

  _templateObject13 = function _templateObject13() {
    return data;
  };

  return data;
}

function _templateObject12() {
  var data = taggedTemplateLiteral_default()(["\n        |", " is not a Json.\n        |", "\n        |"]);

  _templateObject12 = function _templateObject12() {
    return data;
  };

  return data;
}

function _templateObject11() {
  var data = taggedTemplateLiteral_default()(["", " is not a string."]);

  _templateObject11 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10() {
  var data = taggedTemplateLiteral_default()(["", " is not a number."]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = taggedTemplateLiteral_default()(["", " is not a boolean."]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = taggedTemplateLiteral_default()(["", " is not ", "."]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = taggedTemplateLiteral_default()(["", " is not an error."]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = taggedTemplateLiteral_default()(["", " is not ", "."]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = taggedTemplateLiteral_default()(["\n        |", " is not ", ".\n        |", "\n        |"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function commonValidators_templateObject4() {
  var data = taggedTemplateLiteral_default()(["", " is not an object."]);

  commonValidators_templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function commonValidators_templateObject3() {
  var data = taggedTemplateLiteral_default()(["", " is neigher ", ""]);

  commonValidators_templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function commonValidators_templateObject2() {
  var data = taggedTemplateLiteral_default()(["", " is not an array."]);

  commonValidators_templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function commonValidators_templateObject() {
  var data = taggedTemplateLiteral_default()(["", " AND ", ""]);

  commonValidators_templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { defineProperty_default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }









/**
 * @callback Validator
 * @throws {ValidationError} if the validation fails.
 */

/**
 * @param asT {Validator}
 * @throws {never}
 */

var commonValidators_failSafe = function failSafe(asT) {
  return function (input) {
    try {
      return Object(Either["right"])(asT(input));
    } catch (error) {
      if (error instanceof ValidationError["a" /* default */]) {
        return Object(Either["left"])(error);
      }

      throw new errors["c" /* UnreachableError */]();
    }
  };
};
var commonValidators_leftOnly = function leftOnly(asT) {
  return function (input) {
    var t = commonValidators_failSafe(asT)(input);

    if (Object(Either["isLeft"])(t)) {
      return t.left;
    } else {
      return undefined;
    }
  };
}; // TODO: refactor

var commonValidators_named = function named(name, asT) {
  return function (input) {
    var t = commonValidators_failSafe(asT)(input);

    if (Object(Either["isLeft"])(t)) {
      if (t.left.values === undefined) {
        throw t.left;
      }

      if (t.left.key === undefined) {
        throw new errors["c" /* UnreachableError */]();
      }

      throw new ValidationError["a" /* default */](t.left.message, t.left.key, _objectSpread({
        name: name
      }, t.left.values));
    }

    return t.right; // TODO
  };
};
var optional = function optional(asT) {
  return function (input) {
    if (input === undefined) {
      return;
    }

    return asT(input);
  };
};
var commonValidators_unionOf = function unionOf(asT, asU) {
  return function (input) {
    var t = commonValidators_failSafe(asT)(input);
    var u = commonValidators_failSafe(asU)(input);

    if (Object(Either["isLeft"])(t) && Object(Either["isLeft"])(u)) {
      throw new ValidationError["a" /* default */](Object(typed["a" /* default */])(commonValidators_templateObject(), t.left.message, u.left.message));
    }

    if (Object(Either["isRight"])(t)) {
      return t.right;
    }

    if (Object(Either["isRight"])(u)) {
      return u.right;
    }

    throw new errors["c" /* UnreachableError */]();
  };
};

var commonValidators_listOf = function listOf(asT) {
  return function (input) {
    if (!Array.isArray(input)) {
      throw new ValidationError["a" /* default */](Object(typed["a" /* default */])(commonValidators_templateObject2(), JSON.stringify(input)));
    }

    return input.map(asT);
  };
};

var commonValidators_recordOf = function recordOf(asT) {
  return commonValidators_asObject('a Record', function (input) {
    return Object.entries(input).map(function (_ref) {
      var _ref2 = slicedToArray_default()(_ref, 2),
          key = _ref2[0],
          value = _ref2[1];

      return [key, asT(value)];
    }).reduce(function (output, _ref3) {
      var _ref4 = slicedToArray_default()(_ref3, 2),
          key = _ref4[0],
          value = _ref4[1];

      return _objectSpread({}, output, defineProperty_default()({}, key, value));
    }, {});
  });
};
function asUnionOf() {
  for (var _len = arguments.length, options = new Array(_len), _key = 0; _key < _len; _key++) {
    options[_key] = arguments[_key];
  }

  return function (input) {
    if (!options.some(function (option) {
      return option === input;
    })) {
      throw new ValidationError["a" /* default */](Object(typed["a" /* default */])(commonValidators_templateObject3(), JSON.stringify(input), conj(options.map(String), ', ', ' nor ')));
    }

    return input;
  };
}
/**
 * Ascribe the given JSON object to a specific type.
 *
 * @callback ObjectTyper
 * @throws {Error} if {input} is invalid as {T}.
 */

/**
 * @param className name of {T} with indefinite article
 * @param asT {ObjectTyper}
 */

var commonValidators_asObject = function asObject(className, asT) {
  return function (input) {
    // tslint:disable-line:no-any
    if (input == null) {
      throw new ValidationError["a" /* default */](Object(typed["a" /* default */])(commonValidators_templateObject4(), JSON.stringify(input)));
    }

    try {
      return asT(input);
    } catch (error) {
      if (error instanceof ValidationError["a" /* default */]) {
        throw new ValidationError["a" /* default */](trimEols(stripMargin(Object(typed["a" /* default */])(_templateObject5(), JSON.stringify(input), className, error.message))));
      }

      if (error instanceof Error) {
        console.error(error); // tslint:disable-line:no-console

        throw new ValidationError["a" /* default */](Object(typed["a" /* default */])(_templateObject6(), JSON.stringify(input), className));
      }

      throw new TypeError(Object(typed["a" /* default */])(_templateObject7(), String(error)));
    }
  };
}; // TODO: undefined, symbol, bigint, bigdecimal 等に拡張する

function asConstant(a) {
  return function (input) {
    var inputAsJson = asJson(input);

    if (!equalsJsons(inputAsJson, a)) {
      throw new ValidationError["a" /* default */](Object(typed["a" /* default */])(_templateObject8(), JSON.stringify(inputAsJson), JSON.stringify(a)));
    }

    return inputAsJson;
  };
}
function asBoolean(input) {
  if (typeof input !== 'boolean') {
    throw new ValidationError["a" /* default */](Object(typed["a" /* default */])(_templateObject9(), JSON.stringify(input)));
  }

  return input;
}
function asNumber(input) {
  if (typeof input !== 'number') {
    throw new ValidationError["a" /* default */](Object(typed["a" /* default */])(_templateObject10(), JSON.stringify(input)));
  }

  return input;
}
function asString(input) {
  if (typeof input !== 'string') {
    throw new ValidationError["a" /* default */](Object(typed["a" /* default */])(_templateObject11(), JSON.stringify(input)));
  }

  return input;
}
function asJson(input) {
  if (input === null || typeof input === 'boolean' || typeof input === 'number' || typeof input === 'string') {
    return input;
  }

  if (Array.isArray(input)) {
    return commonValidators_listOf(asJson)(input);
  }

  try {
    return commonValidators_recordOf(asJson)(input);
  } catch (error) {
    if (error instanceof ValidationError["a" /* default */]) {
      throw new ValidationError["a" /* default */](trimEols(stripMargin(Object(typed["a" /* default */])(_templateObject12(), JSON.stringify(input), error.message))));
    }

    if (error instanceof Error) {
      console.error(error); // tslint:disable-line:no-console

      throw new ValidationError["a" /* default */](Object(typed["a" /* default */])(_templateObject13(), JSON.stringify(input)));
    }

    throw new TypeError(Object(typed["a" /* default */])(_templateObject14(), String(error)));
  }
}

/***/ }),

/***/ 34:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AbstractError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return LogicError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return UnreachableError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return ValidationError; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(17);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(100);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(160);
/* harmony import */ var _babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_5__);






var AbstractError =
/*#__PURE__*/
function (_Error) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(AbstractError, _Error);

  function AbstractError() {
    var _this;

    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, AbstractError);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default()(AbstractError).call(this, message));
    _this.message = message;
    _this.name = (this instanceof AbstractError ? this.constructor : void 0).name;
    Object.setPrototypeOf(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), (this instanceof AbstractError ? this.constructor : void 0).prototype);
    return _this;
  }

  return AbstractError;
}(_babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_5___default()(Error)); // tslint:disable:max-classes-per-file

var LogicError =
/*#__PURE__*/
function (_AbstractError) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(LogicError, _AbstractError);

  function LogicError() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, LogicError);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default()(LogicError).apply(this, arguments));
  }

  return LogicError;
}(AbstractError);
var UnreachableError =
/*#__PURE__*/
function (_AbstractError2) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(UnreachableError, _AbstractError2);

  function UnreachableError() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, UnreachableError);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default()(UnreachableError).apply(this, arguments));
  }

  return UnreachableError;
}(AbstractError);
var ValidationError =
/*#__PURE__*/
function (_AbstractError3) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(ValidationError, _AbstractError3);

  function ValidationError() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, ValidationError);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default()(ValidationError).apply(this, arguments));
  }

  return ValidationError;
}(AbstractError);

/***/ }),

/***/ 41:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return takeEvery; });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(23);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);


/**
 * Same as `takeEvery(pattern, worker)` but supports passing a `this` context to `worker`.
 * This is useful to invoke object methods.
 *
 * derived from https://github.com/redux-saga/redux-saga/blob/0668e9149c8aa847cbfad9f03883b6b5b2946042/packages/core/effects.d.ts#L630-L633
 */

function takeEvery(pattern, _ref) {
  var _ref2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_ref, 2),
      ctx = _ref2[0],
      worker = _ref2[1];

  return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__[/* takeEvery */ "f"])(pattern, function (action) {
    return worker.call(ctx, action);
  });
}

/***/ }),

/***/ 68:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/classCallCheck.js
var classCallCheck = __webpack_require__(12);
var classCallCheck_default = /*#__PURE__*/__webpack_require__.n(classCallCheck);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/createClass.js
var createClass = __webpack_require__(16);
var createClass_default = /*#__PURE__*/__webpack_require__.n(createClass);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js
var possibleConstructorReturn = __webpack_require__(18);
var possibleConstructorReturn_default = /*#__PURE__*/__webpack_require__.n(possibleConstructorReturn);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/getPrototypeOf.js
var getPrototypeOf = __webpack_require__(17);
var getPrototypeOf_default = /*#__PURE__*/__webpack_require__.n(getPrototypeOf);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/inherits.js
var inherits = __webpack_require__(19);
var inherits_default = /*#__PURE__*/__webpack_require__.n(inherits);

// CONCATENATED MODULE: ./src/lib/trait/Eq.ts



/**
 * 同値関係を持つ。
 *
 * TODO: PartialEq, Congruence 等検討
 */
var Eq_Eq =
/*#__PURE__*/
function () {
  function Eq() {
    classCallCheck_default()(this, Eq);
  }

  createClass_default()(Eq, [{
    key: "isNotEqualTo",
    value: function isNotEqualTo(that) {
      return !this.equals(that);
    }
  }]);

  return Eq;
}();


// CONCATENATED MODULE: ./src/lib/trait/Hashable.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Hashable_Hashable; });






/**
 * Eq であり、さらに a.equals(b) → a.hashCode() === b.hashCode() な hashCode を持つ。
 */

var Hashable_Hashable =
/*#__PURE__*/
function (_Eq) {
  inherits_default()(Hashable, _Eq);

  function Hashable() {
    classCallCheck_default()(this, Hashable);

    return possibleConstructorReturn_default()(this, getPrototypeOf_default()(Hashable).apply(this, arguments));
  }

  createClass_default()(Hashable, [{
    key: "equals",
    value: function equals(that) {
      return this.hashCode() === that.hashCode();
    }
  }]);

  return Hashable;
}(Eq_Eq);



/***/ }),

/***/ 77:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/defineProperty.js
var defineProperty = __webpack_require__(20);
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__(4);
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);

// CONCATENATED MODULE: ./src/lib/extensions/Iterator/zipIterators.ts

function zipIterators(xs, ys) {
  var _marked =
  /*#__PURE__*/
  regenerator_default.a.mark(genIt);

  function genIt() {
    var x, y, values;
    return regenerator_default.a.wrap(function genIt$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (false) {}

            x = xs.next();
            y = ys.next();

            if (!(x.done || y.done)) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("break", 10);

          case 5:
            values = [x.value, y.value];
            _context.next = 8;
            return values;

          case 8:
            _context.next = 0;
            break;

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _marked);
  }

  return genIt();
}
// CONCATENATED MODULE: ./src/lib/extensions/Iterable/zipIterables.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return zipIterables; });


function zipIterables(xs, ys) {
  return defineProperty_default()({}, Symbol.iterator, function () {
    return zipIterators(xs[Symbol.iterator](), ys[Symbol.iterator]());
  });
}

/***/ }),

/***/ 88:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var delay = function delay(ms) {
  return new Promise(function (res) {
    setTimeout(res, ms);
  });
};

/* harmony default export */ __webpack_exports__["a"] = (delay);

/***/ }),

/***/ 90:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/classCallCheck.js
var classCallCheck = __webpack_require__(12);
var classCallCheck_default = /*#__PURE__*/__webpack_require__.n(classCallCheck);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js
var possibleConstructorReturn = __webpack_require__(18);
var possibleConstructorReturn_default = /*#__PURE__*/__webpack_require__.n(possibleConstructorReturn);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/getPrototypeOf.js
var getPrototypeOf = __webpack_require__(17);
var getPrototypeOf_default = /*#__PURE__*/__webpack_require__.n(getPrototypeOf);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/inherits.js
var inherits = __webpack_require__(19);
var inherits_default = /*#__PURE__*/__webpack_require__.n(inherits);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/createClass.js
var createClass = __webpack_require__(16);
var createClass_default = /*#__PURE__*/__webpack_require__.n(createClass);

// EXTERNAL MODULE: ./src/lib/errors.ts
var errors = __webpack_require__(34);

// EXTERNAL MODULE: ./src/lib/trait/Hashable.ts + 1 modules
var Hashable = __webpack_require__(68);

// CONCATENATED MODULE: ./src/domain/vo/ValueObject.ts







/**
 * A primitive ValueObject
 */

var ValueObject_ValueObject =
/*#__PURE__*/
function (_Hashable) {
  inherits_default()(ValueObject, _Hashable);

  function ValueObject(value) {
    var _this;

    classCallCheck_default()(this, ValueObject);

    _this = possibleConstructorReturn_default()(this, getPrototypeOf_default()(ValueObject).call(this));
    _this.value = value;

    if (!_this.checkInvariant()) {
      throw new errors["d" /* ValidationError */]('Invariant Violation: ValueObject#checkInvariant() must be a tautology.'); // TODO
    }

    return _this;
  }

  createClass_default()(ValueObject, [{
    key: "checkInvariant",
    value: function checkInvariant() {
      return true;
    }
  }]);

  return ValueObject;
}(Hashable["a" /* default */]);


// CONCATENATED MODULE: ./src/domain/vo/Id.ts





 // TODO: remove

function seemsLikeUuid(s) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(s);
}

var Id_Id =
/*#__PURE__*/
function (_ValueObject) {
  inherits_default()(Id, _ValueObject);

  function Id() {
    classCallCheck_default()(this, Id);

    return possibleConstructorReturn_default()(this, getPrototypeOf_default()(Id).apply(this, arguments));
  }

  createClass_default()(Id, [{
    key: "serialize",
    value: function serialize() {
      return this.value;
    }
  }, {
    key: "checkInvariant",
    value: function checkInvariant() {
      return seemsLikeUuid(this.value);
    }
  }, {
    key: "hashCode",
    value: function hashCode() {
      // tslint:disable-next-line:no-let
      var result = 17;
      result = 31 * result + this.value.hashCode();
      return result;
    }
  }], [{
    key: "deserialize",
    value: function deserialize(serialized) {
      return new Id(serialized);
    }
  }]);

  return Id;
}(ValueObject_ValueObject);


// CONCATENATED MODULE: ./src/domain/vo/TaskId.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TaskId_TaskId; });






var TaskId_TaskId =
/*#__PURE__*/
function (_Id) {
  inherits_default()(TaskId, _Id);

  function TaskId() {
    classCallCheck_default()(this, TaskId);

    return possibleConstructorReturn_default()(this, getPrototypeOf_default()(TaskId).apply(this, arguments));
  }

  return TaskId;
}(Id_Id);



/***/ }),

/***/ 91:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__(4);
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/classCallCheck.js
var classCallCheck = __webpack_require__(12);
var classCallCheck_default = /*#__PURE__*/__webpack_require__.n(classCallCheck);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/createClass.js
var createClass = __webpack_require__(16);
var createClass_default = /*#__PURE__*/__webpack_require__.n(createClass);

// EXTERNAL MODULE: ./node_modules/connected-react-router/esm/index.js + 5 modules
var esm = __webpack_require__(75);

// EXTERNAL MODULE: ./node_modules/inversify/lib/inversify.js
var inversify = __webpack_require__(21);

// EXTERNAL MODULE: ./node_modules/redux/es/redux.js
var redux = __webpack_require__(39);

// EXTERNAL MODULE: ./node_modules/redux-saga/dist/redux-saga-effects-npm-proxy.esm.js
var redux_saga_effects_npm_proxy_esm = __webpack_require__(7);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/slicedToArray.js
var slicedToArray = __webpack_require__(23);
var slicedToArray_default = /*#__PURE__*/__webpack_require__.n(slicedToArray);

// CONCATENATED MODULE: ./src/lib/middleware/invariantMiddleware/combineInvariants.ts


var combineInvariants_combineInvariants = function combineInvariants(invariants) {
  return function (state) {
    return Object.entries(state).every(function (_ref) {
      var _ref3, _invariants$moduleNam;

      var _ref2 = slicedToArray_default()(_ref, 2),
          moduleName = _ref2[0],
          moduleState = _ref2[1];

      return (_ref3 = (_invariants$moduleNam = invariants[moduleName]) === null || _invariants$moduleNam === void 0 ? void 0 : _invariants$moduleNam.call(invariants, moduleState)) !== null && _ref3 !== void 0 ? _ref3 : true;
    });
  };
};

/* harmony default export */ var invariantMiddleware_combineInvariants = (combineInvariants_combineInvariants);
// EXTERNAL MODULE: ./src/redux/modules/chess.ts + 1 modules
var chess = __webpack_require__(103);

// EXTERNAL MODULE: ./src/redux/modules/counter.ts
var counter = __webpack_require__(102);

// EXTERNAL MODULE: ./src/redux/modules/io.ts
var io = __webpack_require__(122);

// EXTERNAL MODULE: ./src/redux/modules/localeSelector.ts + 1 modules
var localeSelector = __webpack_require__(116);

// EXTERNAL MODULE: ./src/redux/modules/reminder.ts
var reminder = __webpack_require__(125);

// CONCATENATED MODULE: ./src/redux/index.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return redux_Service; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return redux_createReducer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return invariant; });




var _dec, _class;











var redux_Service = (_dec = Object(inversify["injectable"])(), _dec(_class =
/*#__PURE__*/
function () {
  function Service(chessService, counterService, ioService, localeSelectorService, reminderService) {
    classCallCheck_default()(this, Service);

    this.chessService = chessService;
    this.counterService = counterService;
    this.ioService = ioService;
    this.localeSelectorService = localeSelectorService;
    this.reminderService = reminderService;
  }

  Service = Object(inversify["inject"])('ReminderService')(Service, undefined, 4) || Service;
  Service = Object(inversify["inject"])('LocaleSelectorService')(Service, undefined, 3) || Service;
  Service = Object(inversify["inject"])('IoService')(Service, undefined, 2) || Service;
  Service = Object(inversify["inject"])('CounterService')(Service, undefined, 1) || Service;
  Service = Object(inversify["inject"])('ChessService')(Service, undefined, 0) || Service;

  createClass_default()(Service, [{
    key: "rootSaga",
    value:
    /*#__PURE__*/
    regenerator_default.a.mark(function rootSaga() {
      return regenerator_default.a.wrap(function rootSaga$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return Object(redux_saga_effects_npm_proxy_esm["c" /* fork */])([this.chessService, this.chessService.rootSaga]);

            case 2:
              _context.next = 4;
              return Object(redux_saga_effects_npm_proxy_esm["c" /* fork */])([this.counterService, this.counterService.rootSaga]);

            case 4:
              _context.next = 6;
              return Object(redux_saga_effects_npm_proxy_esm["c" /* fork */])([this.ioService, this.ioService.rootSaga]);

            case 6:
              _context.next = 8;
              return Object(redux_saga_effects_npm_proxy_esm["c" /* fork */])([this.localeSelectorService, this.localeSelectorService.rootSaga]);

            case 8:
              _context.next = 10;
              return Object(redux_saga_effects_npm_proxy_esm["c" /* fork */])([this.reminderService, this.reminderService.rootSaga]);

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, rootSaga, this);
    })
  }]);

  return Service;
}()) || _class);

var redux_createReducer = function createReducer(history, initialState) {
  return Object(redux["c" /* combineReducers */])({
    router: Object(esm["b" /* connectRouter */])(history),
    // TODO
    chess: Object(chess["c" /* createChessReducer */])(initialState.chess),
    counter: Object(counter["c" /* createCounterReducer */])(initialState.counter),
    io: Object(io["b" /* createIoReducer */])(initialState.io),
    localeSelector: Object(localeSelector["a" /* createLocaleSelectorReducer */])(initialState.localeSelector),
    reminder: Object(reminder["c" /* createReminderReducer */])(initialState.reminder)
  });
};
var invariant = invariantMiddleware_combineInvariants({
  chess: chess["b" /* chessInvariant */],
  counter: counter["b" /* counterInvariant */]
});

/***/ })

/******/ });
//# sourceMappingURL=main~c98f95f3.6a347a23.js.map