(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{1021:function(e,n,t){"use strict";t.r(n);var r=t(8),c=t.n(r),a=t(9),o=t(900);function l(){var e=c()(["No route matches ","."]);return l=function(){return e},e}n.default=Object(o.a)((function(e){var n=e.location.pathname;throw new Error(Object(a.a)(l(),n))}))},893:function(e,n,t){"use strict";t.d(n,"a",(function(){return r})),t.d(n,"b",(function(){return c}));var r=function(){for(var e=arguments.length,n=new Array(e),t=0;t<e;t++)n[t]=arguments[t];return function(e){return n.some((function(n){return n===e}))}},c=function(e){return function(n){return void 0===n||e(n)}}},895:function(e,n,t){var r=t(891),c=t(896);"string"==typeof(c=c.__esModule?c.default:c)&&(c=[[e.i,c,""]]);var a={insert:"head",singleton:!1};r(c,a);e.exports=c.locals||{}},896:function(e,n,t){(n=t(892)(!1)).push([e.i,".src-components-Nav-classes__Spacer--36ovl {\n  flex-grow: 1;\n}\n\n.src-components-Nav-classes__LocaleSelectLabel--3h3DV.src-components-Nav-classes__LocaleSelectLabel--3h3DV {\n  color: currentColor\n}\n\n.src-components-Nav-classes__LocaleSelectLabel--3h3DV.src-components-Nav-classes__LocaleSelectLabel--3h3DV.Mui-focused {\n    opacity: 0.618;\n    color: currentColor;\n  }\n\n.src-components-Nav-classes__LocaleSelectInput--3oNu1.src-components-Nav-classes__LocaleSelectInput--3oNu1 {\n  color: currentColor;\n}\n\n.src-components-Nav-classes__LocaleSelectSelectIcon--2AyFk.src-components-Nav-classes__LocaleSelectSelectIcon--2AyFk {\n  color: currentColor;\n}\n\n.src-components-Nav-classes__LocaleSelectInputUnderline--2WFrx.src-components-Nav-classes__LocaleSelectInputUnderline--2WFrx::before,\n  .src-components-Nav-classes__LocaleSelectInputUnderline--2WFrx.src-components-Nav-classes__LocaleSelectInputUnderline--2WFrx:hover:not(.Mui-disabled)::before,\n  .src-components-Nav-classes__LocaleSelectInputUnderline--2WFrx.src-components-Nav-classes__LocaleSelectInputUnderline--2WFrx::after {\n    border-bottom-color: currentColor;\n  }\n",""]),n.locals={Spacer:"src-components-Nav-classes__Spacer--36ovl",LocaleSelectLabel:"src-components-Nav-classes__LocaleSelectLabel--3h3DV",LocaleSelectInput:"src-components-Nav-classes__LocaleSelectInput--3oNu1",LocaleSelectSelectIcon:"src-components-Nav-classes__LocaleSelectSelectIcon--2AyFk",LocaleSelectInputUnderline:"src-components-Nav-classes__LocaleSelectInputUnderline--2WFrx"},e.exports=n},897:function(e,n,t){var r=t(891),c=t(898);"string"==typeof(c=c.__esModule?c.default:c)&&(c=[[e.i,c,""]]);var a={insert:"head",singleton:!1};r(c,a);e.exports=c.locals||{}},898:function(e,n,t){(n=t(892)(!1)).push([e.i,".src-components-LocaleSelect-classes__InputLabel--3FfW9 {\n  white-space: nowrap;\n}\n\n.src-components-LocaleSelect-classes__Select--3gHqK {\n  /* Silence is golden. */\n}\n",""]),n.locals={InputLabel:"src-components-LocaleSelect-classes__InputLabel--3FfW9",Select:"src-components-LocaleSelect-classes__Select--3gHqK"},e.exports=n},899:function(e){e.exports=JSON.parse('{"ja":"日本語","en":"English","he":"עברית"}')},900:function(e,n,t){"use strict";t.d(n,"a",(function(){return we}));var r=t(8),c=t.n(r),a=t(1),o=t.n(a),l=t(23),s=t.n(l),u=t(238),i=t(914),f=t.n(i),m=t(906),p=t.n(m),d=t(919),v=t.n(d),h=t(915),b=t.n(h),S=t(916),E=t.n(S),g=t(917),_=t.n(g),L=t(239),N=function(){var e=Object(a.useContext)(L.a),n=e.dark,t=e.setDark;if(null==n||null==t)throw new Error;var r=Object(a.useCallback)((function(e,n){t(n)}),[t]);return o.a.createElement(_.a,{checked:n,onChange:r})},y=t(7),M=t.n(y),j=t(903),C=t.n(j),O=t(110),F=t(140),I=t(907),k=t.n(I),w=t(902),x=t.n(w),R=t(904),U=t.n(R),W=t(909),D=t.n(W),P=t(894),A=t.n(P),T=t(908),V=t.n(T),q=t(910),H=t.n(q),J=t(97),K=t(137),B=t(899);var z=t(178),G=t(897),Q=t.n(G),X=Object(u.defineMessages)({languages:{id:"src.components.LocaleSelect.languages",defaultMessage:"Languages"}}),Y={selectLocale:z.c},Z=Object(O.connect)((function(e){return{locale:e.localeSelector.locale}}),Y)((function(e){var n,t,r=e.classes,c=e.FormControlProps,l=e.locale,i=e.selectLocale,f=Object(a.useState)(0),m=s()(f,2),p=m[0],d=m[1],v=Object(a.useMemo)(F.v4,[]),h=Object(J.useTheme)(),b=Object(a.useMemo)((function(){var e,n,t,r;return null!==(e=null!==(n=null==c?void 0:c.variant)&&void 0!==n?n:null==h||null===(t=h.props)||void 0===t||null===(r=t.MuiFormControl)||void 0===r?void 0:r.variant)&&void 0!==e?e:"standard"}),[null==c?void 0:c.variant,null==h||null===(n=h.props)||void 0===n||null===(t=n.MuiFormControl)||void 0===t?void 0:t.variant]),S=Object(a.useMemo)((function(){return C()(null==r?void 0:r.root,null==c?void 0:c.className)}),[null==r?void 0:r.root,null==c?void 0:c.className]),E=Object(a.useMemo)((function(){return C()(null==r?void 0:r.label,Q.a.InputLabel)}),[null==r?void 0:r.label]),g=Object(a.useMemo)((function(){return C()(null==r?void 0:r.input)}),[null==r?void 0:r.input]),_=Object(a.useMemo)((function(){return C()(null==r?void 0:r.selectIcon)}),[null==r?void 0:r.selectIcon]),L=Object(a.useMemo)((function(){return C()(null==r?void 0:r.inputUnderline)}),[null==r?void 0:r.inputUnderline]),N=Object(a.useRef)(null),y=Object(a.useCallback)((function(e){if(null!==e){if(d(e.offsetWidth),null===N.current)return;var n=N.current.querySelector(":scope > .".concat(Q.a.Select));if(null===n||!(n instanceof HTMLDivElement))return;var t=e.getBoundingClientRect();n.style.minWidth="".concat(t.width,"px")}}),[N.current]),j=Object(a.useCallback)((function(e){var n;"string"==typeof(n=e.target.value)&&n in B&&i(e.target.value)}),[i]),O=Object(a.useContext)(K.a).availableLocales;return o.a.createElement(x.a,M()({},c,{className:S}),o.a.createElement(D.a,{className:E,ref:y,htmlFor:v},o.a.createElement(u.FormattedMessage,X.languages)),o.a.createElement(H.a,{classes:{select:Q.a.Select,icon:_},ref:N,labelWidth:p,value:l,onChange:j,id:v,inputProps:{"data-testid":"localeSelect"},input:{standard:o.a.createElement(U.a,{className:g,classes:{underline:L}}),outlined:o.a.createElement(V.a,{className:g,labelWidth:p}),filled:o.a.createElement(k.a,{className:g})}[b]},null==O?void 0:O.map((function(e,n){return o.a.createElement(A.a,{key:n,value:e},B[e])}))))})),$=t(30),ee=t.n($),ne=t(10),te=t.n(ne),re=t(14),ce=t.n(re),ae=t(26),oe=t.n(ae),le=t(27),se=t.n(le),ue=t(12),ie=t.n(ue),fe=t(920),me=t(911),pe=t.n(me),de=t(893),ve=t(9);function he(){var e=c()([""," is not a Material-UI Typography color."]);return he=function(){return e},e}function be(e){var n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var t,r=ie()(e);if(n){var c=ie()(this).constructor;t=Reflect.construct(r,arguments,c)}else t=r.apply(this,arguments);return se()(this,t)}}var Se=Object(de.b)(Object(de.a)("initial","inherit","primary","secondary","textPrimary","textSecondary","error")),Ee=o.a.forwardRef((function(e,n){return o.a.createElement(fe.Link,M()({innerRef:n},e))})),ge=function(e){oe()(t,e);var n=be(t);function t(){return te()(this,t),n.apply(this,arguments)}return ce()(t,[{key:"render",value:function(){var e=this.props,n=e.color,t=ee()(e,["color"]);return Se(n)?o.a.createElement(pe.a,M()({component:Ee,color:n},t)):(console.warn(Object(ve.a)(he(),n)),o.a.createElement(pe.a,M()({component:Ee},t)))}}]),t}(o.a.Component),_e=a.forwardRef((function(e,n){var t=e.to,r=(e.button,e.innerRef),c=ee()(e,["to","button","innerRef"]),o=a.forwardRef((function(e,n){return a.createElement(ge,M()({ref:n,innerRef:r,color:"inherit",underline:"none"},e))}));return a.createElement(A.a,M()({button:!0,component:o,to:t,ref:n},c))})),Le=t(895),Ne=t.n(Le),ye=Object(u.defineMessages)({home:{id:"src.components.Nav.home",defaultMessage:"home"},chess:{id:"src.components.Nav.chess",defaultMessage:"chess"},counter:{id:"src.components.Nav.counter",defaultMessage:"counter"},info:{id:"src.components.Nav.info",defaultMessage:"info"},paint:{id:"src.components.Nav.paint",defaultMessage:"paint"},reminder:{id:"src.components.Nav.reminder",defaultMessage:"reminder"}}),Me=function(){var e=Object(a.useState)(null),n=s()(e,2),t=n[0],r=n[1],c=Object(a.useCallback)((function(e){r(e.currentTarget)}),[]),l=Object(a.useCallback)((function(){r(null)}),[]);return o.a.createElement(o.a.Fragment,null,o.a.createElement(f.a,{position:"sticky"},o.a.createElement(b.a,null,o.a.createElement(p.a,{edge:"start",color:"inherit",onClick:c},o.a.createElement(E.a,null)),o.a.createElement("div",{className:Ne.a.Spacer}),o.a.createElement(N,null),o.a.createElement(Z,{classes:{label:Ne.a.LocaleSelectLabel,input:Ne.a.LocaleSelectInput,selectIcon:Ne.a.LocaleSelectSelectIcon,inputUnderline:Ne.a.LocaleSelectInputUnderline},FormControlProps:{variant:"filled"}}))),o.a.createElement(v.a,{open:null!==t,anchorEl:t,onClose:l},o.a.createElement(_e,{to:"/",onClick:l},o.a.createElement(u.FormattedMessage,ye.home)),o.a.createElement(_e,{to:"/chess",onClick:l},o.a.createElement(u.FormattedMessage,ye.chess)),o.a.createElement(_e,{to:"/counter",onClick:l},o.a.createElement(u.FormattedMessage,ye.counter)),o.a.createElement(_e,{to:"/info",onClick:l},o.a.createElement(u.FormattedMessage,ye.info)),o.a.createElement(_e,{to:"/paint",onClick:l},o.a.createElement(u.FormattedMessage,ye.paint)),o.a.createElement(_e,{to:"/reminder",onClick:l},o.a.createElement(u.FormattedMessage,ye.reminder))))};function je(e){var n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var t,r=ie()(e);if(n){var c=ie()(this).constructor;t=Reflect.construct(r,arguments,c)}else t=r.apply(this,arguments);return se()(this,t)}}var Ce=function(e){oe()(t,e);var n=je(t);function t(){var e;te()(this,t);for(var r=arguments.length,c=new Array(r),a=0;a<r;a++)c[a]=arguments[a];return(e=n.call.apply(n,[this].concat(c))).state={hasError:!1},e}return ce()(t,[{key:"render",value:function(){var e=this.props,n=e.renderError,t=e.children,r=this.state,c=r.hasError,a=r.error;return c?n(a,t):t}}]),t}(o.a.Component);Ce.getDerivedStateFromError=function(e){return{hasError:!0,error:e}};var Oe=Ce;function Fe(){var e=c()([""," is not an error."]);return Fe=function(){return e},e}function Ie(){var e=c()(["",""]);return Ie=function(){return e},e}var ke=function(e){var n=e.children,t=Object(a.useCallback)((function(e){if(e instanceof Error)return Object(ve.a)(Ie(),String(e));throw new TypeError(Object(ve.a)(Fe(),String(e)))}),[]);return o.a.createElement(o.a.Fragment,null,o.a.createElement(Me,null),o.a.createElement(Oe,{renderError:t},n))},we=function(e){return function(n){return o.a.createElement(ke,null,o.a.createElement(e,n))}}}}]);
//# sourceMappingURL=noMatch~21833f8f.c1a7cd3a.js.map