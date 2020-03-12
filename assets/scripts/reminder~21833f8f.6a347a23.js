(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[8],{

/***/ 293:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./src/lib/identity.ts
var identity = function identity(it) {
  return it;
};

/* harmony default export */ var lib_identity = (identity);
// CONCATENATED MODULE: ./src/lib/guards/commonGuards.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return isOneOf; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return optional; });
/* unused harmony export isObject */

var isOneOf = function isOneOf() {
  for (var _len = arguments.length, options = new Array(_len), _key = 0; _key < _len; _key++) {
    options[_key] = arguments[_key];
  }

  return function (input) {
    return options.some(function (option) {
      return option === input;
    });
  };
};
var optional = function optional(isT) {
  return function (input) {
    if (input === undefined) {
      return true;
    }

    return isT(input);
  };
};
var commonGuards_isObject = function isObject(isT) {
  return function (input) {
    return Object.values(isT(input)).every(lib_identity);
  };
};

/***/ }),

/***/ 294:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"Spacer":"src-components-Nav-classes__Spacer--36ovl","LocaleSelectLabel":"src-components-Nav-classes__LocaleSelectLabel--3h3DV","LocaleSelectInput":"src-components-Nav-classes__LocaleSelectInput--3oNu1","LocaleSelectSelectIcon":"src-components-Nav-classes__LocaleSelectSelectIcon--2AyFk","LocaleSelectInputUnderline":"src-components-Nav-classes__LocaleSelectInputUnderline--2WFrx"};
    if(false) { var cssReload; }
  

/***/ }),

/***/ 295:
/***/ (function(module) {

module.exports = JSON.parse("{\"ja\":\"日本語\",\"en\":\"English\"}");

/***/ }),

/***/ 296:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/taggedTemplateLiteral.js
var taggedTemplateLiteral = __webpack_require__(10);
var taggedTemplateLiteral_default = /*#__PURE__*/__webpack_require__.n(taggedTemplateLiteral);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(0);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/slicedToArray.js
var slicedToArray = __webpack_require__(23);
var slicedToArray_default = /*#__PURE__*/__webpack_require__.n(slicedToArray);

// EXTERNAL MODULE: ./node_modules/react-intl/lib/components/message.js
var message = __webpack_require__(327);

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/AppBar/AppBar.js
var AppBar = __webpack_require__(367);

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/IconButton/IconButton.js
var IconButton = __webpack_require__(369);

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/Menu/Menu.js + 9 modules
var Menu = __webpack_require__(352);

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/Toolbar/Toolbar.js
var Toolbar = __webpack_require__(368);

// EXTERNAL MODULE: ./node_modules/@material-ui/icons/Menu.js
var icons_Menu = __webpack_require__(305);
var Menu_default = /*#__PURE__*/__webpack_require__.n(icons_Menu);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/extends.js
var helpers_extends = __webpack_require__(49);
var extends_default = /*#__PURE__*/__webpack_require__.n(helpers_extends);

// EXTERNAL MODULE: ./node_modules/classnames/index.js
var classnames = __webpack_require__(92);
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);

// EXTERNAL MODULE: ./node_modules/react-redux/es/index.js + 22 modules
var es = __webpack_require__(58);

// EXTERNAL MODULE: ./node_modules/uuid/dist/esm-browser/v4.js + 2 modules
var v4 = __webpack_require__(114);

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/FilledInput/FilledInput.js
var FilledInput = __webpack_require__(372);

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/FormControl/FormControl.js
var FormControl = __webpack_require__(370);

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/Input/Input.js
var Input = __webpack_require__(371);

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/InputLabel/InputLabel.js + 1 modules
var InputLabel = __webpack_require__(393);

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/OutlinedInput/OutlinedInput.js + 1 modules
var OutlinedInput = __webpack_require__(392);

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/Select/Select.js + 4 modules
var Select = __webpack_require__(385);

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/styles/useTheme.js
var useTheme = __webpack_require__(57);

// EXTERNAL MODULE: ./src/lib/contexts/IntlProviderContext.ts
var IntlProviderContext = __webpack_require__(117);

// EXTERNAL MODULE: ./src/lib/languageNameSolver/__data__/tagNativeNameMap.json
var tagNativeNameMap = __webpack_require__(295);

// CONCATENATED MODULE: ./src/lib/languageNameSolver/index.ts

function isTag(tag) {
  return typeof tag === 'string' && tag in tagNativeNameMap;
}
function getNativeNameByTag(tag) {
  return tagNativeNameMap[tag];
}
// EXTERNAL MODULE: ./src/redux/modules/localeSelector.ts + 1 modules
var localeSelector = __webpack_require__(116);

// EXTERNAL MODULE: ./node_modules/@formatjs/macro/dist/index.js
var dist = __webpack_require__(326);

// CONCATENATED MODULE: ./src/components/LocaleSelect/messages.ts

/* harmony default export */ var messages = (Object(dist["defineMessages"])({
  languages: {
    "id": "src.components.LocaleSelect.languages",
    "defaultMessage": 'Languages'
  }
}));
// CONCATENATED MODULE: ./src/components/LocaleSelect/index.tsx


















var LocaleSelect_LocaleSelect = function LocaleSelect(_ref) {
  var _theme$props2, _theme$props2$MuiForm;

  var classes = _ref.classes,
      FormControlProps = _ref.FormControlProps,
      locale = _ref.locale,
      selectLocale = _ref.selectLocale;

  var _useState = Object(react["useState"])(0),
      _useState2 = slicedToArray_default()(_useState, 2),
      labelWidth = _useState2[0],
      setLabelWidth = _useState2[1];

  var inputId = Object(react["useMemo"])(v4["a" /* default */], []);
  var theme = Object(useTheme["a" /* default */])(); // NOTE: Fortunately, FormControl is nothing but FormControl.

  var variant = Object(react["useMemo"])(function () {
    var _ref2, _ref3, _theme$props, _theme$props$MuiFormC;

    return (_ref2 = (_ref3 = FormControlProps === null || FormControlProps === void 0 ? void 0 : FormControlProps.variant) !== null && _ref3 !== void 0 ? _ref3 : theme === null || theme === void 0 ? void 0 : (_theme$props = theme.props) === null || _theme$props === void 0 ? void 0 : (_theme$props$MuiFormC = _theme$props.MuiFormControl) === null || _theme$props$MuiFormC === void 0 ? void 0 : _theme$props$MuiFormC.variant) !== null && _ref2 !== void 0 ? _ref2 : 'standard';
  }, [FormControlProps === null || FormControlProps === void 0 ? void 0 : FormControlProps.variant, theme === null || theme === void 0 ? void 0 : (_theme$props2 = theme.props) === null || _theme$props2 === void 0 ? void 0 : (_theme$props2$MuiForm = _theme$props2.MuiFormControl) === null || _theme$props2$MuiForm === void 0 ? void 0 : _theme$props2$MuiForm.variant]);
  var rootClassName = Object(react["useMemo"])(function () {
    return classnames_default()(classes === null || classes === void 0 ? void 0 : classes.root, FormControlProps === null || FormControlProps === void 0 ? void 0 : FormControlProps.className);
  }, [classes === null || classes === void 0 ? void 0 : classes.root, FormControlProps === null || FormControlProps === void 0 ? void 0 : FormControlProps.className]);
  var labelClassName = Object(react["useMemo"])(function () {
    return classnames_default()(classes === null || classes === void 0 ? void 0 : classes.label);
  }, [classes === null || classes === void 0 ? void 0 : classes.label]);
  var inputClassName = Object(react["useMemo"])(function () {
    return classnames_default()(classes === null || classes === void 0 ? void 0 : classes.input);
  }, [classes === null || classes === void 0 ? void 0 : classes.input]);
  var selectIconClassName = Object(react["useMemo"])(function () {
    return classnames_default()(classes === null || classes === void 0 ? void 0 : classes.selectIcon);
  }, [classes === null || classes === void 0 ? void 0 : classes.selectIcon]);
  var inputUnderlineClassName = Object(react["useMemo"])(function () {
    return classnames_default()(classes === null || classes === void 0 ? void 0 : classes.inputUnderline);
  }, [classes === null || classes === void 0 ? void 0 : classes.inputUnderline]);
  var inputLabel = Object(react["useCallback"])(function (node) {
    // TODO: type
    if (node !== null) {
      setLabelWidth(node.offsetWidth);
    }
  }, []);
  var handleChange = Object(react["useCallback"])(function (event) {
    if (isTag(event.target.value)) {
      selectLocale(event.target.value);
    }
  }, []);

  var _useContext = Object(react["useContext"])(IntlProviderContext["a" /* default */]),
      availableLocales = _useContext.availableLocales;

  return react_default.a.createElement(FormControl["a" /* default */], extends_default()({}, FormControlProps, {
    className: rootClassName // NOTE: override FormControlProps.className

  }), react_default.a.createElement(InputLabel["a" /* default */], {
    className: labelClassName,
    ref: inputLabel,
    htmlFor: inputId
  }, react_default.a.createElement(message["a" /* default */], messages.languages)), react_default.a.createElement(Select["a" /* default */], {
    classes: {
      icon: selectIconClassName
    },
    "native": true,
    labelWidth: labelWidth,
    value: locale,
    onChange: handleChange,
    id: inputId,
    inputProps: {
      'data-testid': 'localeSelect'
    },
    input: {
      standard: react_default.a.createElement(Input["a" /* default */], {
        className: inputClassName,
        classes: {
          underline: inputUnderlineClassName
        }
      }),
      outlined: react_default.a.createElement(OutlinedInput["a" /* default */], {
        className: inputClassName,
        labelWidth: labelWidth
      }),
      filled: react_default.a.createElement(FilledInput["a" /* default */], {
        className: inputClassName
      })
    }[variant]
  }, availableLocales === null || availableLocales === void 0 ? void 0 : availableLocales.map(function (availableLocale, i) {
    return react_default.a.createElement("option", {
      key: i,
      value: availableLocale
    }, getNativeNameByTag(availableLocale));
  })));
}; // connect

var mapStateToProps = function mapStateToProps(_ref4) {
  var locale = _ref4.localeSelector.locale;
  return {
    locale: locale
  };
};

var mapDispatchToProps = {
  selectLocale: localeSelector["c" /* selectLocale */]
};
/* harmony default export */ var components_LocaleSelect = (Object(es["c" /* connect */])(mapStateToProps, mapDispatchToProps)(LocaleSelect_LocaleSelect));
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/objectWithoutProperties.js
var objectWithoutProperties = __webpack_require__(42);
var objectWithoutProperties_default = /*#__PURE__*/__webpack_require__.n(objectWithoutProperties);

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/MenuItem/MenuItem.js
var MenuItem = __webpack_require__(375);

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

// EXTERNAL MODULE: ./node_modules/react-router-dom/esm/react-router-dom.js
var react_router_dom = __webpack_require__(308);

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/Link/Link.js
var Link_Link = __webpack_require__(374);

// EXTERNAL MODULE: ./src/lib/guards/commonGuards.ts + 1 modules
var commonGuards = __webpack_require__(293);

// EXTERNAL MODULE: ./src/lib/typed.ts
var typed = __webpack_require__(11);

// CONCATENATED MODULE: ./src/lib/components/Link/index.tsx









function _templateObject() {
  var data = taggedTemplateLiteral_default()(["", " is not a Material-UI Typography color."]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}






var isTypographyColor = Object(commonGuards["b" /* optional */])(Object(commonGuards["a" /* isOneOf */])('initial', 'inherit', 'primary', 'secondary', 'textPrimary', 'textSecondary', 'error')); // TODO: delete this; See also https://material-ui.com/guides/composition/#link

var RouterLinkWithRef = react_default.a.forwardRef(function (props, ref) {
  return react_default.a.createElement(react_router_dom["a" /* Link */], extends_default()({
    innerRef: ref
  }, props));
});

var components_Link_Link =
/*#__PURE__*/
function (_React$Component) {
  inherits_default()(Link, _React$Component);

  function Link() {
    classCallCheck_default()(this, Link);

    return possibleConstructorReturn_default()(this, getPrototypeOf_default()(Link).apply(this, arguments));
  }

  createClass_default()(Link, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          color = _this$props.color,
          restProps = objectWithoutProperties_default()(_this$props, ["color"]);

      if (!isTypographyColor(color)) {
        console.warn(Object(typed["a" /* default */])(_templateObject(), color)); // tslint:disable-line:no-console

        return react_default.a.createElement(Link_Link["a" /* default */], extends_default()({
          component: RouterLinkWithRef
        }, restProps));
      }

      return react_default.a.createElement(Link_Link["a" /* default */], extends_default()({
        component: RouterLinkWithRef,
        color: color
      }, restProps));
    }
  }]);

  return Link;
}(react_default.a.Component);


// CONCATENATED MODULE: ./src/lib/components/MenuItemLink/index.tsx





var MenuItemLink = react["forwardRef"](function (_ref, menuItem) {
  var to = _ref.to,
      button = _ref.button,
      innerRef = _ref.innerRef,
      menuItemProps = objectWithoutProperties_default()(_ref, ["to", "button", "innerRef"]);

  // See https://material-ui.com/guides/composition/#link
  var LinkWithRef = react["forwardRef"](function (linkProps, link) {
    return react["createElement"](components_Link_Link, extends_default()({
      ref: link,
      innerRef: innerRef,
      color: "inherit",
      underline: "none"
    }, linkProps));
  });
  return react["createElement"](MenuItem["a" /* default */], extends_default()({
    button: true,
    component: LinkWithRef,
    to: to,
    ref: menuItem
  }, menuItemProps));
});
/* harmony default export */ var components_MenuItemLink = (MenuItemLink);
// EXTERNAL MODULE: ./src/components/Nav/classes.css
var Nav_classes = __webpack_require__(294);
var classes_default = /*#__PURE__*/__webpack_require__.n(Nav_classes);

// CONCATENATED MODULE: ./src/components/Nav/messages.ts

/* harmony default export */ var Nav_messages = (Object(dist["defineMessages"])({
  home: {
    "id": "src.components.Nav.home",
    "defaultMessage": 'home'
  },
  chess: {
    "id": "src.components.Nav.chess",
    "defaultMessage": 'chess'
  },
  counter: {
    "id": "src.components.Nav.counter",
    "defaultMessage": 'counter'
  },
  info: {
    "id": "src.components.Nav.info",
    "defaultMessage": 'info'
  },
  reminder: {
    "id": "src.components.Nav.reminder",
    "defaultMessage": 'reminder'
  }
}));
// CONCATENATED MODULE: ./src/components/Nav/index.tsx

// import classnames from 'classnames'





 // import { createStyles, makeStyles } from '@material-ui/core/styles'


 // TODO





var Nav_Nav = function Nav() {
  var _useState = Object(react["useState"])(null),
      _useState2 = slicedToArray_default()(_useState, 2),
      anchorEl = _useState2[0],
      setAnchorEl = _useState2[1];

  var openMenu = Object(react["useCallback"])(function (event) {
    setAnchorEl(event.currentTarget);
  }, []);
  var closeMenu = Object(react["useCallback"])(function () {
    setAnchorEl(null);
  }, []);
  return react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement(AppBar["a" /* default */], {
    position: "sticky"
  }, react_default.a.createElement(Toolbar["a" /* default */], null, react_default.a.createElement(IconButton["a" /* default */], {
    edge: "start",
    color: "inherit",
    onClick: openMenu
  }, react_default.a.createElement(Menu_default.a, null)), react_default.a.createElement("div", {
    className: classes_default.a.Spacer
  }), react_default.a.createElement(components_LocaleSelect, {
    classes: {
      label: classes_default.a.LocaleSelectLabel,
      input: classes_default.a.LocaleSelectInput,
      selectIcon: classes_default.a.LocaleSelectSelectIcon,
      inputUnderline: classes_default.a.LocaleSelectInputUnderline
    },
    FormControlProps: {
      variant: 'filled'
    }
  }))), react_default.a.createElement(Menu["a" /* default */], {
    open: anchorEl !== null,
    anchorEl: anchorEl,
    onClose: closeMenu
  }, react_default.a.createElement(components_MenuItemLink, {
    to: "/",
    onClick: closeMenu
  }, react_default.a.createElement(message["a" /* default */], Nav_messages.home)), react_default.a.createElement(components_MenuItemLink, {
    to: "/chess",
    onClick: closeMenu
  }, react_default.a.createElement(message["a" /* default */], Nav_messages.chess)), react_default.a.createElement(components_MenuItemLink, {
    to: "/counter",
    onClick: closeMenu
  }, react_default.a.createElement(message["a" /* default */], Nav_messages.counter)), react_default.a.createElement(components_MenuItemLink, {
    to: "/info",
    onClick: closeMenu
  }, react_default.a.createElement(message["a" /* default */], Nav_messages.info)), react_default.a.createElement(components_MenuItemLink, {
    to: "/reminder",
    onClick: closeMenu
  }, react_default.a.createElement(message["a" /* default */], Nav_messages.reminder))));
};

/* harmony default export */ var components_Nav = (Nav_Nav);
// CONCATENATED MODULE: ./src/lib/components/ErrorBoundary/index.ts







var ErrorBoundary_ErrorBoundary =
/*#__PURE__*/
function (_React$Component) {
  inherits_default()(ErrorBoundary, _React$Component);

  function ErrorBoundary() {
    var _getPrototypeOf2;

    var _this;

    classCallCheck_default()(this, ErrorBoundary);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = possibleConstructorReturn_default()(this, (_getPrototypeOf2 = getPrototypeOf_default()(ErrorBoundary)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      hasError: false
    };
    return _this;
  }

  createClass_default()(ErrorBoundary, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          renderError = _this$props.renderError,
          children = _this$props.children;
      var _this$state = this.state,
          hasError = _this$state.hasError,
          error = _this$state.error;

      if (hasError) {
        return renderError(error, children);
      }

      return children;
    }
  }]);

  return ErrorBoundary;
}(react_default.a.Component);

ErrorBoundary_ErrorBoundary.getDerivedStateFromError = function (error) {
  return {
    hasError: true,
    error: error
  };
};

/* harmony default export */ var components_ErrorBoundary = (ErrorBoundary_ErrorBoundary);
// CONCATENATED MODULE: ./src/templates/PageTemplate/index.tsx
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PageTemplate_createPage; });


function _templateObject2() {
  var data = taggedTemplateLiteral_default()(["", " is not an error."]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function PageTemplate_templateObject() {
  var data = taggedTemplateLiteral_default()(["", ""]);

  PageTemplate_templateObject = function _templateObject() {
    return data;
  };

  return data;
}






var PageTemplate_PageTemplate = function PageTemplate(_ref) {
  var children = _ref.children;
  var renderError = Object(react["useCallback"])(function (error) {
    if (error instanceof Error) {
      return Object(typed["a" /* default */])(PageTemplate_templateObject(), String(error));
    }

    throw new TypeError(Object(typed["a" /* default */])(_templateObject2(), String(error)));
  }, []);
  return react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement(components_Nav, null), react_default.a.createElement(components_ErrorBoundary, {
    renderError: renderError
  }, children));
};

var PageTemplate_createPage = function createPage(Body) {
  return function (props) {
    return react_default.a.createElement(PageTemplate_PageTemplate, null, react_default.a.createElement(Body, props));
  };
};
/* harmony default export */ var templates_PageTemplate = (PageTemplate_PageTemplate);

/***/ }),

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

/***/ 350:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"TaskListItemContainer":"src-components-Reminder-TaskListItem-classes__TaskListItemContainer--3F5ef","Dragging":"src-components-Reminder-TaskListItem-classes__Dragging--1TtFC","ListItemSecondaryAction":"src-components-Reminder-TaskListItem-classes__ListItemSecondaryAction--3QycB"};
    if(false) { var cssReload; }
  

/***/ }),

/***/ 380:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(0);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/react-helmet/lib/Helmet.js
var Helmet = __webpack_require__(118);
var Helmet_default = /*#__PURE__*/__webpack_require__.n(Helmet);

// EXTERNAL MODULE: ./node_modules/react-intl/lib/components/useIntl.js
var useIntl = __webpack_require__(316);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/extends.js
var helpers_extends = __webpack_require__(49);
var extends_default = /*#__PURE__*/__webpack_require__.n(helpers_extends);

// EXTERNAL MODULE: ./node_modules/react-redux/es/index.js + 22 modules
var es = __webpack_require__(58);

// CONCATENATED MODULE: ./src/lib/curry.ts
var curry = function curry(f) {
  return function (x) {
    return function () {
      for (var _len = arguments.length, xs = new Array(_len), _key = 0; _key < _len; _key++) {
        xs[_key] = arguments[_key];
      }

      return f.apply(void 0, [x].concat(xs));
    };
  };
};

/* harmony default export */ var lib_curry = (curry);
// EXTERNAL MODULE: ./src/lib/validators/commonValidators.ts + 4 modules
var commonValidators = __webpack_require__(3);

// EXTERNAL MODULE: ./src/lib/validators/stringValidators.ts
var stringValidators = __webpack_require__(319);

// EXTERNAL MODULE: ./src/redux/modules/reminder.ts
var reminder = __webpack_require__(125);

// EXTERNAL MODULE: ./node_modules/react-intl/lib/components/message.js
var message = __webpack_require__(327);

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/Button/Button.js
var Button = __webpack_require__(320);

// EXTERNAL MODULE: ./node_modules/@formatjs/macro/dist/index.js
var dist = __webpack_require__(326);

// CONCATENATED MODULE: ./src/components/Reminder/AddTaskButton/messages.ts

/* harmony default export */ var messages = (Object(dist["defineMessages"])({
  add: {
    "id": "src.components.Reminder.AddTaskButton.add",
    "defaultMessage": 'add'
  }
}));
// CONCATENATED MODULE: ./src/components/Reminder/AddTaskButton/index.tsx





var AddTaskButton_AddTaskButton = function AddTaskButton(_ref) {
  var addTask = _ref.addTask;
  return react_default.a.createElement(Button["a" /* default */], {
    onClick: addTask,
    variant: "contained",
    color: "secondary"
  }, react_default.a.createElement(message["a" /* default */], messages.add));
};

/* harmony default export */ var Reminder_AddTaskButton = (AddTaskButton_AddTaskButton);
// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/List/List.js
var List = __webpack_require__(373);

// CONCATENATED MODULE: ./src/components/Reminder/TaskList/index.tsx



var TaskList_TaskList = function TaskList(_ref) {
  var children = _ref.children;
  return react_default.a.createElement(List["a" /* default */], null, children);
};

/* harmony default export */ var Reminder_TaskList = (TaskList_TaskList);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/toConsumableArray.js
var toConsumableArray = __webpack_require__(26);
var toConsumableArray_default = /*#__PURE__*/__webpack_require__.n(toConsumableArray);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/defineProperty.js
var defineProperty = __webpack_require__(20);
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/slicedToArray.js
var slicedToArray = __webpack_require__(23);
var slicedToArray_default = /*#__PURE__*/__webpack_require__.n(slicedToArray);

// EXTERNAL MODULE: ./node_modules/case/dist/Case.js
var Case = __webpack_require__(349);
var Case_default = /*#__PURE__*/__webpack_require__.n(Case);

// EXTERNAL MODULE: ./node_modules/classnames/index.js
var classnames = __webpack_require__(92);
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);

// EXTERNAL MODULE: ./node_modules/react-dnd/dist/esm/hooks/useDrag.js + 3 modules
var useDrag = __webpack_require__(390);

// EXTERNAL MODULE: ./node_modules/react-dnd/dist/esm/hooks/useDrop.js + 3 modules
var useDrop = __webpack_require__(388);

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/Checkbox/Checkbox.js + 4 modules
var Checkbox = __webpack_require__(387);

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/ListItem/ListItem.js
var ListItem = __webpack_require__(376);

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/ListItemIcon/ListItemIcon.js
var ListItemIcon = __webpack_require__(377);

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/ListItemSecondaryAction/ListItemSecondaryAction.js
var ListItemSecondaryAction = __webpack_require__(378);

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/TextField/TextField.js + 1 modules
var TextField = __webpack_require__(391);

// EXTERNAL MODULE: ./src/lib/guards/commonGuards.ts + 1 modules
var commonGuards = __webpack_require__(293);

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/IconButton/IconButton.js
var IconButton = __webpack_require__(369);

// EXTERNAL MODULE: ./node_modules/@material-ui/icons/Delete.js
var Delete = __webpack_require__(351);
var Delete_default = /*#__PURE__*/__webpack_require__.n(Delete);

// CONCATENATED MODULE: ./src/components/Reminder/TaskListItem/DeleteTaskButton/index.tsx




var DeleteTaskButton_TaskListItem = function TaskListItem(_ref) {
  var onClick = _ref.onClick;
  return react_default.a.createElement(IconButton["a" /* default */], {
    onClick: onClick
  }, react_default.a.createElement(Delete_default.a, null));
};

/* harmony default export */ var DeleteTaskButton = (DeleteTaskButton_TaskListItem);
// EXTERNAL MODULE: ./src/components/Reminder/TaskListItem/classes.css
var classes = __webpack_require__(350);
var classes_default = /*#__PURE__*/__webpack_require__.n(classes);

// CONCATENATED MODULE: ./src/components/Reminder/TaskListItem/messages.ts

/* harmony default export */ var TaskListItem_messages = (Object(dist["defineMessages"])({
  asBoundedLengthStringErrorMessage: {
    "id": "src.components.Reminder.TaskListItem.asBoundedLengthStringErrorMessage",
    "defaultMessage": '{ name } must be 0-{ upperBound } characters.'
  }
}));
// CONCATENATED MODULE: ./src/components/Reminder/TaskListItem/index.tsx


















var TaskListItem_TaskListItem = function TaskListItem(_ref) {
  var id = _ref.id,
      value = _ref.value,
      index = _ref.index,
      onChange = _ref.onChange,
      onDelete = _ref.onDelete,
      moveTask = _ref.moveTask,
      validate = _ref.validate;
  var ref = Object(react["useRef"])(null);

  var _useDrag = Object(useDrag["a" /* useDrag */])({
    item: {
      type: 'TaskListItem',
      id: id,
      index: index
    },
    collect: function collect(monitor) {
      return {
        dragging: monitor.isDragging()
      };
    }
  }),
      _useDrag2 = slicedToArray_default()(_useDrag, 2),
      dragging = _useDrag2[0].dragging,
      drag = _useDrag2[1];

  var _useDrop = Object(useDrop["a" /* useDrop */])({
    accept: 'TaskListItem',
    hover: function hover(item) {
      var targetIndex = index;

      if (item.index === targetIndex) {
        return;
      }

      moveTask(item.index, targetIndex); // tslint:disable-next-line:no-object-mutation

      item.index = targetIndex;
    }
  }),
      _useDrop2 = slicedToArray_default()(_useDrop, 2),
      drop = _useDrop2[1];

  drop(drag(ref));
  var className = Object(react["useMemo"])(function () {
    return classnames_default()(classes_default.a.TaskListItemContainer, defineProperty_default()({}, classes_default.a.Dragging, dragging));
  }, [dragging]);
  var handleContentChange = Object(react["useCallback"])(function (event) {
    onChange({
      content: event.target.value
    });
  }, [onChange]);
  var handleDoneChange = Object(react["useCallback"])(function (event, _checked) {
    onChange({
      done: event.target.checked
    });
  }, [onChange]);

  var _useIntl = Object(useIntl["a" /* default */])(),
      formatMessage = _useIntl.formatMessage;

  var errors = Object(react["useMemo"])(function () {
    return validate(value);
  }, [value, validate]);
  var helperText = Object(react["useMemo"])(function () {
    if (errors.content === undefined) {
      return null;
    }

    if (commonGuards["a" /* isOneOf */].apply(void 0, toConsumableArray_default()(Object.keys(TaskListItem_messages)))(errors.content.key)) {
      return Case_default.a.sentence(formatMessage(TaskListItem_messages[errors.content.key], errors.content.values));
    }

    return null; // TODO
  }, [errors.content]);
  return react_default.a.createElement("div", {
    ref: ref
  }, react_default.a.createElement(ListItem["a" /* default */], {
    classes: {
      container: className,
      secondaryAction: classes_default.a.ListItemSecondaryAction
    }
  }, react_default.a.createElement(ListItemIcon["a" /* default */], null, react_default.a.createElement(Checkbox["a" /* default */], {
    checked: value.done,
    onChange: handleDoneChange
  })), react_default.a.createElement(TextField["a" /* default */], {
    fullWidth: true,
    value: value.content,
    onChange: handleContentChange,
    disabled: value.done,
    error: errors.content !== undefined,
    helperText: helperText
  }), react_default.a.createElement(ListItemSecondaryAction["a" /* default */], null, react_default.a.createElement(DeleteTaskButton, {
    onClick: onDelete
  }))));
};

/* harmony default export */ var Reminder_TaskListItem = (TaskListItem_TaskListItem);
// CONCATENATED MODULE: ./src/components/Reminder/index.tsx










var Reminder_validate = Object(commonValidators["b" /* asObject */])('a Task for presentation', function (input) {
  return {
    content: Object(commonValidators["e" /* leftOnly */])(Object(commonValidators["f" /* named */])('content', Object(stringValidators["a" /* asBoundedLengthString */])({
      upperBound: 140
    })))(input.content),
    done: Object(commonValidators["e" /* leftOnly */])(commonValidators["a" /* asBoolean */])(input.done)
  };
});

var Reminder_Reminder = function Reminder(_ref) {
  var tasks = _ref.tasks,
      addTask = _ref.addTask,
      changeTaskContent = _ref.changeTaskContent,
      markTaskAsDone = _ref.markTaskAsDone,
      markTaskAsUndone = _ref.markTaskAsUndone,
      deleteTask = _ref.deleteTask,
      moveTask = _ref.moveTask;
  var changeTask = Object(react["useCallback"])(function (taskId, _ref2) {
    var content = _ref2.content,
        done = _ref2.done;

    if (content !== undefined) {
      changeTaskContent(taskId, content);
    }

    if (done !== undefined) {
      if (done) {
        markTaskAsDone(taskId);
      } else {
        markTaskAsUndone(taskId);
      }
    }
  }, [changeTaskContent, markTaskAsDone, markTaskAsUndone]);
  return react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement(Reminder_TaskList, null, tasks.map(function (task, index) {
    return react_default.a.createElement(Reminder_TaskListItem, extends_default()({
      key: task.id.value,
      id: task.id,
      value: task,
      validate: Reminder_validate,
      onChange: lib_curry(changeTask)(task.id),
      onDelete: lib_curry(deleteTask)(task.id)
    }, {
      index: index,
      moveTask: moveTask
    }));
  })), react_default.a.createElement(Reminder_AddTaskButton, {
    addTask: addTask
  }));
}; // connect


var mapStateToProps = function mapStateToProps(_ref3) {
  var tasks = _ref3.reminder.tasks;
  return {
    tasks: tasks
  };
};

var mapDispatchToProps = {
  addTask: reminder["a" /* addTaskAsync */],
  changeTaskContent: reminder["b" /* changeTaskContentAsync */],
  markTaskAsDone: reminder["f" /* markTaskAsDoneAsync */],
  markTaskAsUndone: reminder["g" /* markTaskAsUndoneAsync */],
  deleteTask: reminder["e" /* deleteTaskAsync */],
  moveTask: reminder["h" /* moveTask */]
};
/* harmony default export */ var components_Reminder = (Object(es["c" /* connect */])(mapStateToProps, mapDispatchToProps)(Reminder_Reminder));
// EXTERNAL MODULE: ./src/templates/PageTemplate/index.tsx + 8 modules
var PageTemplate = __webpack_require__(296);

// CONCATENATED MODULE: ./src/components/App/ReminderPage/messages.ts

/* harmony default export */ var ReminderPage_messages = (Object(dist["defineMessages"])({
  reminder: {
    "id": "src.components.App.ReminderPage.reminder",
    "defaultMessage": 'reminder'
  }
}));
// CONCATENATED MODULE: ./src/components/App/ReminderPage/index.tsx







var ReminderPage_ReminderPage = function ReminderPage() {
  var _useIntl = Object(useIntl["a" /* default */])(),
      formatMessage = _useIntl.formatMessage;

  return react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement(Helmet_default.a, {
    title: formatMessage(ReminderPage_messages.reminder)
  }), react_default.a.createElement(components_Reminder, null));
};

/* harmony default export */ var App_ReminderPage = __webpack_exports__["default"] = (Object(PageTemplate["a" /* createPage */])(ReminderPage_ReminderPage));

/***/ })

}]);
//# sourceMappingURL=reminder~21833f8f.6a347a23.js.map