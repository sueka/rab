(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{1025:function(e,n,t){"use strict";t.r(n);var a=t(1),r=t.n(a),s=t(139),c=t.n(s),o=t(238),l=t(110),u=t(61),i=t(13),m=t(170),d=t(22),f=t.n(d),p=t(23),h=t.n(p),v=t(903),b=t.n(v),g=t(141),_=Object(a.createContext)({picking:null,targets:null,halfMove:null,pickChessman:null,releaseChessman:null});function C(e,n){return e.file===n.file&&e.rank===n.rank}var S=t(337),E=t(983),k=t.n(E),O=function(e){var n=e.chessman,t=e.coord,s=Object(a.useContext)(_),c=s.picking,o=s.pickChessman,l=Object(g.useDrag)({item:{type:"Chessman"},collect:function(e){return{dragging:e.isDragging()}},begin:function(){null==o||o(n,t)}}),u=h()(l,3),i=u[0].dragging,m=u[1],d=u[2],p=Object(a.useMemo)((function(){var e;return b()(k.a.Chessman,(e={},f()(e,k.a.Dragging,i),f()(e,k.a.Picking,null!=c&&C(t,c.source)&&Object(S.a)(n,c.chessman)),e))}),[i,n,t,c]),v=Object(a.useMemo)((function(){return b()(k.a.Chessman,k.a.Preview)}),[]),E=Object(a.useCallback)((function(){null==c&&(null==o||o(n,t))}),[c,o,n,t]);return r.a.createElement(r.a.Fragment,null,r.a.createElement("span",{ref:d,className:v},n.symbol),r.a.createElement("span",{ref:m,className:p,onClick:E},n.symbol))};var j=t(981),y=t.n(j),L=function(e){var n=e.children,t=e.coord,s=Object(a.useContext)(_),c=s.picking,o=s.targets,l=s.halfMove,u=s.releaseChessman,i=Object(a.useMemo)((function(){var e;return null!==(e=null==o?void 0:o.some((function(e){return C(t,e)})))&&void 0!==e&&e}),[t,o]),m=Object(g.useDrop)({accept:"Chessman",drop:function(){null!=c&&(i?null==l||l(c.chessman,c.source,t):null==u||u())}}),d=h()(m,2)[1],p=Object(a.useMemo)((function(){return function(e){return e.file%2==e.rank%2?"black":"white"}(t)}),[t]),v=Object(a.useMemo)((function(){var e;return b()(y.a.Square,(e={},f()(e,y.a.White,"white"===p),f()(e,y.a.Black,"black"===p),f()(e,y.a.Target,i),e))}),[p,i]),S=Object(a.useCallback)((function(){null!=c&&(i?null==l||l(c.chessman,c.source,t):null==u||u())}),[l,c,t,u,i]);return r.a.createElement("div",{ref:d,className:v,onClick:S},n)},M=t(979),N=t.n(M),w=[1,2,3,4,5,6,7,8],x=[8,7,6,5,4,3,2,1],F={resetBoard:m.g},I=Object(l.connect)((function(e){return{board:e.chess.board}}),F)((function(e){var n=e.board,t=e.resetBoard;return Object(a.useEffect)((function(){t()}),[t]),r.a.createElement("table",{className:N.a.ChessboardTable,dir:"ltr"},r.a.createElement("tbody",null,x.map((function(e){return r.a.createElement("tr",{key:e},w.map((function(t){var a=new i.a({file:t,rank:e}),s=n.chessmen.get(a);return r.a.createElement("td",{key:t,className:N.a.ChessboardTd},r.a.createElement(L,{coord:a},void 0!==s?r.a.createElement(O,{chessman:s,coord:a}):null))})))}))))})),D=t(900),T=Object(o.defineMessages)({chess:{id:"src.components.App.ChessPage.chess",defaultMessage:"chess"}});n.default=Object(D.a)((function(){var e=Object(o.useIntl)().formatMessage,n=Object(l.useSelector)((function(e){return e.chess.picking})),t=Object(l.useSelector)((function(e){return e.chess.targets})),a=Object(l.useDispatch)();return r.a.createElement(r.a.Fragment,null,r.a.createElement(c.a,{title:e(T.chess)}),r.a.createElement(_.Provider,{value:{picking:n,targets:t,halfMove:Object(u.compose)(a,m.d),pickChessman:Object(u.compose)(a,m.e),releaseChessman:Object(u.compose)(a,m.f)}},r.a.createElement(I,null)))}))},893:function(e,n,t){"use strict";t.d(n,"a",(function(){return a})),t.d(n,"b",(function(){return r}));var a=function(){for(var e=arguments.length,n=new Array(e),t=0;t<e;t++)n[t]=arguments[t];return function(e){return n.some((function(n){return n===e}))}},r=function(e){return function(n){return void 0===n||e(n)}}},895:function(e,n,t){var a=t(891),r=t(896);"string"==typeof(r=r.__esModule?r.default:r)&&(r=[[e.i,r,""]]);var s={insert:"head",singleton:!1};a(r,s);e.exports=r.locals||{}},896:function(e,n,t){(n=t(892)(!1)).push([e.i,".src-components-Nav-classes__Spacer--36ovl {\n  flex-grow: 1;\n}\n\n.src-components-Nav-classes__LocaleSelectLabel--3h3DV.src-components-Nav-classes__LocaleSelectLabel--3h3DV {\n  color: currentColor\n}\n\n.src-components-Nav-classes__LocaleSelectLabel--3h3DV.src-components-Nav-classes__LocaleSelectLabel--3h3DV.Mui-focused {\n    opacity: 0.618;\n    color: currentColor;\n  }\n\n.src-components-Nav-classes__LocaleSelectInput--3oNu1.src-components-Nav-classes__LocaleSelectInput--3oNu1 {\n  color: currentColor;\n}\n\n.src-components-Nav-classes__LocaleSelectSelectIcon--2AyFk.src-components-Nav-classes__LocaleSelectSelectIcon--2AyFk {\n  color: currentColor;\n}\n\n.src-components-Nav-classes__LocaleSelectInputUnderline--2WFrx.src-components-Nav-classes__LocaleSelectInputUnderline--2WFrx::before,\n  .src-components-Nav-classes__LocaleSelectInputUnderline--2WFrx.src-components-Nav-classes__LocaleSelectInputUnderline--2WFrx:hover:not(.Mui-disabled)::before,\n  .src-components-Nav-classes__LocaleSelectInputUnderline--2WFrx.src-components-Nav-classes__LocaleSelectInputUnderline--2WFrx::after {\n    border-bottom-color: currentColor;\n  }\n",""]),n.locals={Spacer:"src-components-Nav-classes__Spacer--36ovl",LocaleSelectLabel:"src-components-Nav-classes__LocaleSelectLabel--3h3DV",LocaleSelectInput:"src-components-Nav-classes__LocaleSelectInput--3oNu1",LocaleSelectSelectIcon:"src-components-Nav-classes__LocaleSelectSelectIcon--2AyFk",LocaleSelectInputUnderline:"src-components-Nav-classes__LocaleSelectInputUnderline--2WFrx"},e.exports=n},897:function(e,n,t){var a=t(891),r=t(898);"string"==typeof(r=r.__esModule?r.default:r)&&(r=[[e.i,r,""]]);var s={insert:"head",singleton:!1};a(r,s);e.exports=r.locals||{}},898:function(e,n,t){(n=t(892)(!1)).push([e.i,".src-components-LocaleSelect-classes__InputLabel--3FfW9 {\n  white-space: nowrap;\n}\n\n.src-components-LocaleSelect-classes__Select--3gHqK {\n  /* Silence is golden. */\n}\n",""]),n.locals={InputLabel:"src-components-LocaleSelect-classes__InputLabel--3FfW9",Select:"src-components-LocaleSelect-classes__Select--3gHqK"},e.exports=n},899:function(e){e.exports=JSON.parse('{"ja":"日本語","en":"English","he":"עברית"}')},900:function(e,n,t){"use strict";t.d(n,"a",(function(){return Fe}));var a=t(8),r=t.n(a),s=t(1),c=t.n(s),o=t(23),l=t.n(o),u=t(238),i=t(914),m=t.n(i),d=t(906),f=t.n(d),p=t(919),h=t.n(p),v=t(915),b=t.n(v),g=t(916),_=t.n(g),C=t(917),S=t.n(C),E=t(239),k=function(){var e=Object(s.useContext)(E.a),n=e.dark,t=e.setDark;if(null==n||null==t)throw new Error;var a=Object(s.useCallback)((function(e,n){t(n)}),[t]);return c.a.createElement(S.a,{checked:n,onChange:a})},O=t(7),j=t.n(O),y=t(903),L=t.n(y),M=t(110),N=t(140),w=t(907),x=t.n(w),F=t(902),I=t.n(F),D=t(904),T=t.n(D),q=t(909),R=t.n(q),W=t(894),P=t.n(W),U=t(908),A=t.n(U),B=t(910),H=t.n(B),V=t(97),Y=t(137),z=t(899);var J=t(178),X=t(897),G=t.n(X),K=Object(u.defineMessages)({languages:{id:"src.components.LocaleSelect.languages",defaultMessage:"Languages"}}),Q={selectLocale:J.c},Z=Object(M.connect)((function(e){return{locale:e.localeSelector.locale}}),Q)((function(e){var n,t,a=e.classes,r=e.FormControlProps,o=e.locale,i=e.selectLocale,m=Object(s.useState)(0),d=l()(m,2),f=d[0],p=d[1],h=Object(s.useMemo)(N.v4,[]),v=Object(V.useTheme)(),b=Object(s.useMemo)((function(){var e,n,t,a;return null!==(e=null!==(n=null==r?void 0:r.variant)&&void 0!==n?n:null==v||null===(t=v.props)||void 0===t||null===(a=t.MuiFormControl)||void 0===a?void 0:a.variant)&&void 0!==e?e:"standard"}),[null==r?void 0:r.variant,null==v||null===(n=v.props)||void 0===n||null===(t=n.MuiFormControl)||void 0===t?void 0:t.variant]),g=Object(s.useMemo)((function(){return L()(null==a?void 0:a.root,null==r?void 0:r.className)}),[null==a?void 0:a.root,null==r?void 0:r.className]),_=Object(s.useMemo)((function(){return L()(null==a?void 0:a.label,G.a.InputLabel)}),[null==a?void 0:a.label]),C=Object(s.useMemo)((function(){return L()(null==a?void 0:a.input)}),[null==a?void 0:a.input]),S=Object(s.useMemo)((function(){return L()(null==a?void 0:a.selectIcon)}),[null==a?void 0:a.selectIcon]),E=Object(s.useMemo)((function(){return L()(null==a?void 0:a.inputUnderline)}),[null==a?void 0:a.inputUnderline]),k=Object(s.useRef)(null),O=Object(s.useCallback)((function(e){if(null!==e){if(p(e.offsetWidth),null===k.current)return;var n=k.current.querySelector(":scope > .".concat(G.a.Select));if(null===n||!(n instanceof HTMLDivElement))return;var t=e.getBoundingClientRect();n.style.minWidth="".concat(t.width,"px")}}),[k.current]),y=Object(s.useCallback)((function(e){var n;"string"==typeof(n=e.target.value)&&n in z&&i(e.target.value)}),[i]),M=Object(s.useContext)(Y.a).availableLocales;return c.a.createElement(I.a,j()({},r,{className:g}),c.a.createElement(R.a,{className:_,ref:O,htmlFor:h},c.a.createElement(u.FormattedMessage,K.languages)),c.a.createElement(H.a,{classes:{select:G.a.Select,icon:S},ref:k,labelWidth:f,value:o,onChange:y,id:h,inputProps:{"data-testid":"localeSelect"},input:{standard:c.a.createElement(T.a,{className:C,classes:{underline:E}}),outlined:c.a.createElement(A.a,{className:C,labelWidth:f}),filled:c.a.createElement(x.a,{className:C})}[b]},null==M?void 0:M.map((function(e,n){return c.a.createElement(P.a,{key:n,value:e},z[e])}))))})),$=t(30),ee=t.n($),ne=t(10),te=t.n(ne),ae=t(14),re=t.n(ae),se=t(26),ce=t.n(se),oe=t(27),le=t.n(oe),ue=t(12),ie=t.n(ue),me=t(920),de=t(911),fe=t.n(de),pe=t(893),he=t(9);function ve(){var e=r()([""," is not a Material-UI Typography color."]);return ve=function(){return e},e}function be(e){var n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var t,a=ie()(e);if(n){var r=ie()(this).constructor;t=Reflect.construct(a,arguments,r)}else t=a.apply(this,arguments);return le()(this,t)}}var ge=Object(pe.b)(Object(pe.a)("initial","inherit","primary","secondary","textPrimary","textSecondary","error")),_e=c.a.forwardRef((function(e,n){return c.a.createElement(me.Link,j()({innerRef:n},e))})),Ce=function(e){ce()(t,e);var n=be(t);function t(){return te()(this,t),n.apply(this,arguments)}return re()(t,[{key:"render",value:function(){var e=this.props,n=e.color,t=ee()(e,["color"]);return ge(n)?c.a.createElement(fe.a,j()({component:_e,color:n},t)):(console.warn(Object(he.a)(ve(),n)),c.a.createElement(fe.a,j()({component:_e},t)))}}]),t}(c.a.Component),Se=s.forwardRef((function(e,n){var t=e.to,a=(e.button,e.innerRef),r=ee()(e,["to","button","innerRef"]),c=s.forwardRef((function(e,n){return s.createElement(Ce,j()({ref:n,innerRef:a,color:"inherit",underline:"none"},e))}));return s.createElement(P.a,j()({button:!0,component:c,to:t,ref:n},r))})),Ee=t(895),ke=t.n(Ee),Oe=Object(u.defineMessages)({home:{id:"src.components.Nav.home",defaultMessage:"home"},chess:{id:"src.components.Nav.chess",defaultMessage:"chess"},counter:{id:"src.components.Nav.counter",defaultMessage:"counter"},info:{id:"src.components.Nav.info",defaultMessage:"info"},paint:{id:"src.components.Nav.paint",defaultMessage:"paint"},reminder:{id:"src.components.Nav.reminder",defaultMessage:"reminder"}}),je=function(){var e=Object(s.useState)(null),n=l()(e,2),t=n[0],a=n[1],r=Object(s.useCallback)((function(e){a(e.currentTarget)}),[]),o=Object(s.useCallback)((function(){a(null)}),[]);return c.a.createElement(c.a.Fragment,null,c.a.createElement(m.a,{position:"sticky"},c.a.createElement(b.a,null,c.a.createElement(f.a,{edge:"start",color:"inherit",onClick:r},c.a.createElement(_.a,null)),c.a.createElement("div",{className:ke.a.Spacer}),c.a.createElement(k,null),c.a.createElement(Z,{classes:{label:ke.a.LocaleSelectLabel,input:ke.a.LocaleSelectInput,selectIcon:ke.a.LocaleSelectSelectIcon,inputUnderline:ke.a.LocaleSelectInputUnderline},FormControlProps:{variant:"filled"}}))),c.a.createElement(h.a,{open:null!==t,anchorEl:t,onClose:o},c.a.createElement(Se,{to:"/",onClick:o},c.a.createElement(u.FormattedMessage,Oe.home)),c.a.createElement(Se,{to:"/chess",onClick:o},c.a.createElement(u.FormattedMessage,Oe.chess)),c.a.createElement(Se,{to:"/counter",onClick:o},c.a.createElement(u.FormattedMessage,Oe.counter)),c.a.createElement(Se,{to:"/info",onClick:o},c.a.createElement(u.FormattedMessage,Oe.info)),c.a.createElement(Se,{to:"/paint",onClick:o},c.a.createElement(u.FormattedMessage,Oe.paint)),c.a.createElement(Se,{to:"/reminder",onClick:o},c.a.createElement(u.FormattedMessage,Oe.reminder))))};function ye(e){var n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var t,a=ie()(e);if(n){var r=ie()(this).constructor;t=Reflect.construct(a,arguments,r)}else t=a.apply(this,arguments);return le()(this,t)}}var Le=function(e){ce()(t,e);var n=ye(t);function t(){var e;te()(this,t);for(var a=arguments.length,r=new Array(a),s=0;s<a;s++)r[s]=arguments[s];return(e=n.call.apply(n,[this].concat(r))).state={hasError:!1},e}return re()(t,[{key:"render",value:function(){var e=this.props,n=e.renderError,t=e.children,a=this.state,r=a.hasError,s=a.error;return r?n(s,t):t}}]),t}(c.a.Component);Le.getDerivedStateFromError=function(e){return{hasError:!0,error:e}};var Me=Le;function Ne(){var e=r()([""," is not an error."]);return Ne=function(){return e},e}function we(){var e=r()(["",""]);return we=function(){return e},e}var xe=function(e){var n=e.children,t=Object(s.useCallback)((function(e){if(e instanceof Error)return Object(he.a)(we(),String(e));throw new TypeError(Object(he.a)(Ne(),String(e)))}),[]);return c.a.createElement(c.a.Fragment,null,c.a.createElement(je,null),c.a.createElement(Me,{renderError:t},n))},Fe=function(e){return function(n){return c.a.createElement(xe,null,c.a.createElement(e,n))}}},979:function(e,n,t){var a=t(891),r=t(980);"string"==typeof(r=r.__esModule?r.default:r)&&(r=[[e.i,r,""]]);var s={insert:"head",singleton:!1};a(r,s);e.exports=r.locals||{}},980:function(e,n,t){(n=t(892)(!1)).push([e.i,".src-components-Chessboard-classes__ChessboardTable--1YTjE {\n  border-collapse: collapse;\n}\n\n.src-components-Chessboard-classes__ChessboardTd--3hHrO {\n  padding: 0;\n}\n",""]),n.locals={ChessboardTable:"src-components-Chessboard-classes__ChessboardTable--1YTjE",ChessboardTd:"src-components-Chessboard-classes__ChessboardTd--3hHrO"},e.exports=n},981:function(e,n,t){var a=t(891),r=t(982);"string"==typeof(r=r.__esModule?r.default:r)&&(r=[[e.i,r,""]]);var s={insert:"head",singleton:!1};a(r,s);e.exports=r.locals||{}},982:function(e,n,t){(n=t(892)(!1)).push([e.i,".src-components-Chessboard-Square-classes__Square--3eloU {\n  height: 32px;\n  width: 32px;\n  font-size: 20px; /* of chessman; FIXME */\n  display: flex;\n  align-items: center;\n  justify-content: center;\n\n  --white-square-color: white;\n  --black-square-color: #c0c0c0\n\n  /* TODO: Consider Nav */\n}\n\n@media screen and (orientation: portrait) {\n\n.src-components-Chessboard-Square-classes__Square--3eloU {\n    height: 12.5vw;\n    width: 12.5vw;\n    font-size: 7.8125vw\n}\n  }\n\n.src-components-Chessboard-Square-classes__White--7ZYQX {\n  background-color: var(--white-square-color);\n}\n\n.src-components-Chessboard-Square-classes__Black--3wDR_ {\n  background-color: var(--black-square-color);\n}\n\n.src-components-Chessboard-Square-classes__Target--11gMT {\n  filter: sepia(100%);\n}\n",""]),n.locals={Square:"src-components-Chessboard-Square-classes__Square--3eloU",White:"src-components-Chessboard-Square-classes__White--7ZYQX",Black:"src-components-Chessboard-Square-classes__Black--3wDR_",Target:"src-components-Chessboard-Square-classes__Target--11gMT"},e.exports=n},983:function(e,n,t){var a=t(891),r=t(984);"string"==typeof(r=r.__esModule?r.default:r)&&(r=[[e.i,r,""]]);var s={insert:"head",singleton:!1};a(r,s);e.exports=r.locals||{}},984:function(e,n,t){(n=t(892)(!1)).push([e.i,'.src-components-Chessboard-Chessman-classes__Chessman--1H9tu {\n  font-family: "Apple Symbols", sans-serif;\n  color: #222;\n}\n\n.src-components-Chessboard-Chessman-classes__Dragging--3Wg1a {\n  opacity: 0.5;\n}\n\n.src-components-Chessboard-Chessman-classes__Picking--11tdl:not(.src-components-Chessboard-Chessman-classes__Dragging--3Wg1a) {\n  color: teal;\n}\n\n/* TODO: in a little more normal way */\n.src-components-Chessboard-Chessman-classes__Preview--2T3_G {\n  position: absolute;\n  z-index: -1;\n}\n',""]),n.locals={Chessman:"src-components-Chessboard-Chessman-classes__Chessman--1H9tu",Dragging:"src-components-Chessboard-Chessman-classes__Dragging--3Wg1a",Picking:"src-components-Chessboard-Chessman-classes__Picking--11tdl",Preview:"src-components-Chessboard-Chessman-classes__Preview--2T3_G"},e.exports=n}}]);
//# sourceMappingURL=chess~21833f8f.c1a7cd3a.js.map