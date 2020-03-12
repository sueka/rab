(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[7],{

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

/***/ 379:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_typed__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11);
/* harmony import */ var _templates_PageTemplate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(296);


function _templateObject() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["No route matches ", "."]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}




var NoMatch = function NoMatch(_ref) {
  var pathname = _ref.location.pathname;
  throw new Error(Object(_lib_typed__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(_templateObject(), pathname));
};

/* harmony default export */ __webpack_exports__["default"] = (Object(_templates_PageTemplate__WEBPACK_IMPORTED_MODULE_2__[/* createPage */ "a"])(NoMatch));

/***/ })

}]);
//# sourceMappingURL=noMatch~21833f8f.6a347a23.js.map