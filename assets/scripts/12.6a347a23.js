(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[12],{

/***/ 319:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return asBoundedLengthString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return asUrl; });
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_guards_stringGuards__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(124);
/* harmony import */ var _lib_typed__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(11);
/* harmony import */ var _ValidationError__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(28);
/* harmony import */ var _commonValidators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3);


function _templateObject2() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["", " is not a URL."]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["", " is not between ", " and ", " characters."]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}





var asBoundedLengthString = function asBoundedLengthString(_ref) {
  var _ref$lowerBound = _ref.lowerBound,
      lowerBound = _ref$lowerBound === void 0 ? -Infinity : _ref$lowerBound,
      _ref$upperBound = _ref.upperBound,
      upperBound = _ref$upperBound === void 0 ? Infinity : _ref$upperBound;
  return function (input) {
    var inputAsString = Object(_commonValidators__WEBPACK_IMPORTED_MODULE_4__[/* asString */ "c"])(input);

    if (lowerBound <= inputAsString.length && inputAsString.length <= upperBound) {
      return inputAsString;
    }

    throw new _ValidationError__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"](Object(_lib_typed__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(_templateObject(), inputAsString, lowerBound, upperBound), 'asBoundedLengthStringErrorMessage', {
      input: inputAsString.length,
      lowerBound: lowerBound,
      upperBound: upperBound
    });
  };
};
function asUrl(input) {
  var inputAsString = Object(_commonValidators__WEBPACK_IMPORTED_MODULE_4__[/* asString */ "c"])(input);

  if (!Object(_lib_guards_stringGuards__WEBPACK_IMPORTED_MODULE_1__[/* isUrl */ "a"])(inputAsString)) {
    throw new _ValidationError__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"](Object(_lib_typed__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(_templateObject2(), inputAsString));
  }

  return inputAsString;
}

/***/ }),

/***/ 384:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/inversify/lib/inversify.js
var inversify = __webpack_require__(21);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/taggedTemplateLiteral.js
var taggedTemplateLiteral = __webpack_require__(10);
var taggedTemplateLiteral_default = /*#__PURE__*/__webpack_require__.n(taggedTemplateLiteral);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/classCallCheck.js
var classCallCheck = __webpack_require__(12);
var classCallCheck_default = /*#__PURE__*/__webpack_require__.n(classCallCheck);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/createClass.js
var createClass = __webpack_require__(16);
var createClass_default = /*#__PURE__*/__webpack_require__.n(createClass);

// EXTERNAL MODULE: ./src/lib/typed.ts
var typed = __webpack_require__(11);

// CONCATENATED MODULE: ./src/infrastructure/EnvVarConfigRegistry.ts




var _dec, _class, _temp;

function _templateObject() {
  var data = taggedTemplateLiteral_default()(["The ", " environment variable does not exist."]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}



var EnvVarConfigRegistry_EnvVarConfigRegistry = (_dec = Object(inversify["injectable"])(), _dec(_class = (_temp =
/*#__PURE__*/
function () {
  function EnvVarConfigRegistry() {
    classCallCheck_default()(this, EnvVarConfigRegistry);

    this.env = {
      BASE_URL: "https://sueka.github.io/react-app-prototype",
      GITHUB_API_URL: "https://api.github.com"
    };
  }

  createClass_default()(EnvVarConfigRegistry, [{
    key: "get",

    /**
     * @throws {Error} if not found.
     */
    value: function get(name) {
      var value = this.env[name];

      if (value === undefined) {
        throw new Error(Object(typed["a" /* default */])(_templateObject(), name)); // TODO:
      }

      return value;
    }
  }]);

  return EnvVarConfigRegistry;
}(), _temp)) || _class);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__(4);
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/asyncToGenerator.js
var asyncToGenerator = __webpack_require__(123);
var asyncToGenerator_default = /*#__PURE__*/__webpack_require__.n(asyncToGenerator);

// EXTERNAL MODULE: ./src/lib/fetch.ts + 2 modules
var fetch = __webpack_require__(109);

// EXTERNAL MODULE: ./src/lib/validators/commonValidators.ts + 4 modules
var commonValidators = __webpack_require__(3);

// EXTERNAL MODULE: ./src/lib/validators/stringValidators.ts
var stringValidators = __webpack_require__(319);

// CONCATENATED MODULE: ./src/lib/validators/gitHubApiResourceValidators.ts


function asGetRepoResponse(input) {
  return asRepository(input);
}
var asRepository = Object(commonValidators["b" /* asObject */])('a Repository', function (input) {
  return {
    fullName: Object(commonValidators["c" /* asString */])(input.full_name),
    htmlUrl: Object(stringValidators["b" /* asUrl */])(input.html_url)
  };
});
var asUnsuccessfulResponse = Object(commonValidators["b" /* asObject */])('an UnsuccessfulResponse', function (input) {
  return {
    message: Object(commonValidators["c" /* asString */])(input.message),
    documentation_url: Object(commonValidators["g" /* optional */])(commonValidators["c" /* asString */])(input.documentation_url)
  };
});
// CONCATENATED MODULE: ./src/infrastructure/GetRepoImpl.ts






var GetRepoImpl_dec, GetRepoImpl_class;

function GetRepoImpl_templateObject() {
  var data = taggedTemplateLiteral_default()(["", "/repos/:owner/:repo"]);

  GetRepoImpl_templateObject = function _templateObject() {
    return data;
  };

  return data;
}





var GetRepoImpl_GetRepoImpl = (GetRepoImpl_dec = Object(inversify["injectable"])(), GetRepoImpl_dec(GetRepoImpl_class =
/*#__PURE__*/
function () {
  function GetRepoImpl(config) {
    classCallCheck_default()(this, GetRepoImpl);

    this.config = config;
  }

  GetRepoImpl = Object(inversify["inject"])('EnvVarConfig')(GetRepoImpl, undefined, 0) || GetRepoImpl;

  createClass_default()(GetRepoImpl, [{
    key: "apply",
    value: function () {
      var _apply = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee(_ref) {
        var owner, repo, gitHubApiUrl, _ref2, status, body;

        return regenerator_default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                owner = _ref.owner, repo = _ref.repo;
                gitHubApiUrl = this.config.get('GITHUB_API_URL');
                _context.next = 4;
                return Object(fetch["a" /* default */])({
                  method: 'GET',
                  parameterizedEndpoint: Object(typed["a" /* default */])(GetRepoImpl_templateObject(), gitHubApiUrl),
                  params: {
                    owner: owner,
                    repo: repo
                  },
                  headers: {
                    Accept: 'application/vnd.github.v3+json'
                  }
                });

              case 4:
                _ref2 = _context.sent;
                status = _ref2.response.status;
                body = _ref2.body;

                if (!(status === 200)) {
                  _context.next = 11;
                  break;
                }

                return _context.abrupt("return", {
                  successful: true,
                  response: {
                    status: status,
                    body: asGetRepoResponse(body)
                  }
                });

              case 11:
                return _context.abrupt("return", {
                  successful: false,
                  response: {
                    status: status,
                    body: asUnsuccessfulResponse(body)
                  }
                });

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function apply(_x) {
        return _apply.apply(this, arguments);
      }

      return apply;
    }()
  }]);

  return GetRepoImpl;
}()) || GetRepoImpl_class);

// EXTERNAL MODULE: ./src/domain/entity/Task.ts + 2 modules
var Task = __webpack_require__(144);

// CONCATENATED MODULE: ./src/infrastructure/persistence/double/TaskRepositoryFakeImpl.ts





var TaskRepositoryFakeImpl_dec, TaskRepositoryFakeImpl_class;



var TaskRepositoryFakeImpl_TaskRepositoryFakeImpl = (TaskRepositoryFakeImpl_dec = Object(inversify["injectable"])(), TaskRepositoryFakeImpl_dec(TaskRepositoryFakeImpl_class =
/*#__PURE__*/
function () {
  function TaskRepositoryFakeImpl() {
    classCallCheck_default()(this, TaskRepositoryFakeImpl);
  }

  createClass_default()(TaskRepositoryFakeImpl, [{
    key: "findById",
    value: function () {
      var _findById = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee(taskId) {
        var task;
        return regenerator_default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                task = localStorage.getItem(taskId.value);

                if (!(task === null)) {
                  _context.next = 3;
                  break;
                }

                throw new Error();

              case 3:
                return _context.abrupt("return", Task["a" /* default */].deserialize(task));

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function findById(_x) {
        return _findById.apply(this, arguments);
      }

      return findById;
    }()
  }, {
    key: "store",
    value: function () {
      var _store = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee2(task) {
        return regenerator_default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", localStorage.setItem(task.id.value, task.serialize()));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function store(_x2) {
        return _store.apply(this, arguments);
      }

      return store;
    }()
  }, {
    key: "remove",
    value: function () {
      var _remove = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee3(taskId) {
        return regenerator_default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", localStorage.removeItem(taskId.value));

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function remove(_x3) {
        return _remove.apply(this, arguments);
      }

      return remove;
    }()
  }]);

  return TaskRepositoryFakeImpl;
}()) || TaskRepositoryFakeImpl_class);

// EXTERNAL MODULE: ./src/redux/index.ts + 1 modules
var redux = __webpack_require__(91);

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

// CONCATENATED MODULE: ./src/container.ts



 // TODO:







var container = new inversify["Container"]();
container.bind('EnvVarConfig').to(EnvVarConfigRegistry_EnvVarConfigRegistry);
container.bind('GetRepo').to(GetRepoImpl_GetRepoImpl);
container.bind('TaskRepository').to(TaskRepositoryFakeImpl_TaskRepositoryFakeImpl);
container.bind('Service').to(redux["b" /* default */]);
container.bind('ChessService').to(chess["a" /* ChessService */]);
container.bind('CounterService').to(counter["a" /* CounterService */]);
container.bind('IoService').to(io["a" /* IoService */]);
container.bind('LocaleSelectorService').to(localeSelector["b" /* default */]);
container.bind('ReminderService').to(reminder["d" /* default */]);
/* harmony default export */ var src_container = __webpack_exports__["default"] = (container);

/***/ })

}]);
//# sourceMappingURL=12.6a347a23.js.map