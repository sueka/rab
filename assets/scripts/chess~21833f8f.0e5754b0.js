(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{291:function(e,n,a){"use strict";a.d(n,"a",(function(){return t})),a.d(n,"b",(function(){return r}));var t=function(){for(var e=arguments.length,n=new Array(e),a=0;a<e;a++)n[a]=arguments[a];return function(e){return n.some((function(n){return n===e}))}},r=function(e){return function(n){return void 0===n||e(n)}}},292:function(e,n,a){var t=a(296),r=a(293);"string"==typeof(r=r.__esModule?r.default:r)&&(r=[[e.i,r,""]]);var c={insert:"head",singleton:!1},o=(t(r,c),r.locals?r.locals:{});e.exports=o},293:function(e,n,a){(n=a(297)(!1)).push([e.i,".src-components-Nav-classes__Spacer--36ovl {\n  flex-grow: 1;\n}\n\n.src-components-Nav-classes__LocaleSelectLabel--3h3DV.src-components-Nav-classes__LocaleSelectLabel--3h3DV {\n  color: currentColor\n}\n\n.src-components-Nav-classes__LocaleSelectLabel--3h3DV.src-components-Nav-classes__LocaleSelectLabel--3h3DV.Mui-focused {\n    opacity: 0.618;\n    color: currentColor;\n  }\n\n.src-components-Nav-classes__LocaleSelectInput--3oNu1.src-components-Nav-classes__LocaleSelectInput--3oNu1 {\n  color: currentColor;\n}\n\n.src-components-Nav-classes__LocaleSelectSelectIcon--2AyFk.src-components-Nav-classes__LocaleSelectSelectIcon--2AyFk {\n  color: currentColor;\n}\n\n.src-components-Nav-classes__LocaleSelectInputUnderline--2WFrx.src-components-Nav-classes__LocaleSelectInputUnderline--2WFrx::before,\n  .src-components-Nav-classes__LocaleSelectInputUnderline--2WFrx.src-components-Nav-classes__LocaleSelectInputUnderline--2WFrx:hover:not(.Mui-disabled)::before,\n  .src-components-Nav-classes__LocaleSelectInputUnderline--2WFrx.src-components-Nav-classes__LocaleSelectInputUnderline--2WFrx::after {\n    border-bottom-color: currentColor;\n  }\n",""]),n.locals={Spacer:"src-components-Nav-classes__Spacer--36ovl",LocaleSelectLabel:"src-components-Nav-classes__LocaleSelectLabel--3h3DV",LocaleSelectInput:"src-components-Nav-classes__LocaleSelectInput--3oNu1",LocaleSelectSelectIcon:"src-components-Nav-classes__LocaleSelectSelectIcon--2AyFk",LocaleSelectInputUnderline:"src-components-Nav-classes__LocaleSelectInputUnderline--2WFrx"},e.exports=n},294:function(e){e.exports=JSON.parse('{"ja":"日本語","en":"English"}')},295:function(e,n,a){"use strict";var t=a(10),r=a.n(t),c=a(0),o=a.n(c),s=a(23),l=a.n(s),i=a(327),u=a(371),m=a(373),d=a(356),p=a(372),f=a(305),v=a.n(f),h=a(48),b=a.n(h),_=a(92),g=a.n(_),C=a(58),E=a(114),S=a(376),k=a(374),O=a(375),j=a(397),N=a(396),L=a(391),y=a(57),M=a(294);var w=a(116),x=a(326),I=Object(x.defineMessages)({languages:{id:"src.components.LocaleSelect.languages",defaultMessage:"Languages"}}),F={selectLocale:w.c},T=Object(C.c)((function(e){var n=e.localeSelector;return{availableLocales:n.availableLocales,locale:n.locale}}),F)((function(e){var n,a,t=e.classes,r=e.FormControlProps,s=e.availableLocales,u=e.locale,m=e.selectLocale,d=Object(c.useState)(0),p=l()(d,2),f=p[0],v=p[1],h=Object(c.useMemo)(E.a,[]),_=Object(y.a)(),C=Object(c.useMemo)((function(){var e,n,a,t;return null!==(e=null!==(n=null==r?void 0:r.variant)&&void 0!==n?n:null==_?void 0:null===(a=_.props)||void 0===a?void 0:null===(t=a.MuiFormControl)||void 0===t?void 0:t.variant)&&void 0!==e?e:"standard"}),[null==r?void 0:r.variant,null==_?void 0:null===(n=_.props)||void 0===n?void 0:null===(a=n.MuiFormControl)||void 0===a?void 0:a.variant]),w=Object(c.useMemo)((function(){return g()(null==t?void 0:t.root,null==r?void 0:r.className)}),[null==t?void 0:t.root,null==r?void 0:r.className]),x=Object(c.useMemo)((function(){return g()(null==t?void 0:t.label)}),[null==t?void 0:t.label]),F=Object(c.useMemo)((function(){return g()(null==t?void 0:t.input)}),[null==t?void 0:t.input]),T=Object(c.useMemo)((function(){return g()(null==t?void 0:t.selectIcon)}),[null==t?void 0:t.selectIcon]),W=Object(c.useMemo)((function(){return g()(null==t?void 0:t.inputUnderline)}),[null==t?void 0:t.inputUnderline]),U=Object(c.useCallback)((function(e){null!==e&&v(e.offsetWidth)}),[]),q=Object(c.useCallback)((function(e){var n;"string"==typeof(n=e.target.value)&&n in M&&m(e.target.value)}),[]);return o.a.createElement(k.a,b()({},r,{className:w}),o.a.createElement(j.a,{className:x,ref:U,htmlFor:h},o.a.createElement(i.a,I.languages)),o.a.createElement(L.a,{classes:{icon:T},native:!0,labelWidth:f,value:u,onChange:q,id:h,inputProps:{"data-testid":"localeSelect"},input:{standard:o.a.createElement(O.a,{className:F,classes:{underline:W}}),outlined:o.a.createElement(N.a,{className:F,labelWidth:f}),filled:o.a.createElement(S.a,{className:F})}[C]},s.map((function(e,n){return o.a.createElement("option",{key:n,value:e},M[e])}))))})),W=a(49),U=a.n(W),q=a(379),D=a(12),P=a.n(D),R=a(16),A=a.n(R),B=a(18),V=a.n(B),H=a(17),Y=a.n(H),J=a(19),G=a.n(J),Q=a(308),X=a(378),Z=a(291),z=a(11);function K(){var e=r()([""," is not a Material-UI Typography color."]);return K=function(){return e},e}var $=Object(Z.b)(Object(Z.a)("initial","inherit","primary","secondary","textPrimary","textSecondary","error")),ee=o.a.forwardRef((function(e,n){return o.a.createElement(Q.a,b()({innerRef:n},e))})),ne=function(e){function n(){return P()(this,n),V()(this,Y()(n).apply(this,arguments))}return G()(n,e),A()(n,[{key:"render",value:function(){var e=this.props,n=e.color,a=U()(e,["color"]);return $(n)?o.a.createElement(X.a,b()({component:ee,color:n},a)):(console.warn(Object(z.a)(K(),n)),o.a.createElement(X.a,b()({component:ee},a)))}}]),n}(o.a.Component),ae=c.forwardRef((function(e,n){var a=e.to,t=(e.button,e.innerRef),r=U()(e,["to","button","innerRef"]),o=c.forwardRef((function(e,n){return c.createElement(ne,b()({ref:n,innerRef:t,color:"inherit",underline:"none"},e))}));return c.createElement(q.a,b()({button:!0,component:o,to:a,ref:n},r))})),te=a(292),re=a.n(te),ce=Object(x.defineMessages)({home:{id:"src.components.Nav.home",defaultMessage:"home"},chess:{id:"src.components.Nav.chess",defaultMessage:"chess"},counter:{id:"src.components.Nav.counter",defaultMessage:"counter"},info:{id:"src.components.Nav.info",defaultMessage:"info"},reminder:{id:"src.components.Nav.reminder",defaultMessage:"reminder"}}),oe=function(){var e=Object(c.useState)(null),n=l()(e,2),a=n[0],t=n[1],r=Object(c.useCallback)((function(e){t(e.currentTarget)}),[]),s=Object(c.useCallback)((function(){t(null)}),[]);return o.a.createElement(o.a.Fragment,null,o.a.createElement(u.a,{position:"sticky"},o.a.createElement(p.a,null,o.a.createElement(m.a,{edge:"start",color:"inherit",onClick:r},o.a.createElement(v.a,null)),o.a.createElement("div",{className:re.a.Spacer}),o.a.createElement(T,{classes:{label:re.a.LocaleSelectLabel,input:re.a.LocaleSelectInput,selectIcon:re.a.LocaleSelectSelectIcon,inputUnderline:re.a.LocaleSelectInputUnderline},FormControlProps:{variant:"standard"}}))),o.a.createElement(d.a,{open:null!==a,anchorEl:a,onClose:s},o.a.createElement(ae,{to:"/",onClick:s},o.a.createElement(i.a,ce.home)),o.a.createElement(ae,{to:"/chess",onClick:s},o.a.createElement(i.a,ce.chess)),o.a.createElement(ae,{to:"/counter",onClick:s},o.a.createElement(i.a,ce.counter)),o.a.createElement(ae,{to:"/info",onClick:s},o.a.createElement(i.a,ce.info)),o.a.createElement(ae,{to:"/reminder",onClick:s},o.a.createElement(i.a,ce.reminder))))},se=function(e){function n(){var e,a;P()(this,n);for(var t=arguments.length,r=new Array(t),c=0;c<t;c++)r[c]=arguments[c];return(a=V()(this,(e=Y()(n)).call.apply(e,[this].concat(r)))).state={hasError:!1},a}return G()(n,e),A()(n,[{key:"render",value:function(){var e=this.props,n=e.renderError,a=e.children,t=this.state,r=t.hasError,c=t.error;return r?n(c,a):a}}]),n}(o.a.Component);se.getDerivedStateFromError=function(e){return{hasError:!0,error:e}};var le=se;function ie(){var e=r()([""," is not an error."]);return ie=function(){return e},e}function ue(){var e=r()(["",""]);return ue=function(){return e},e}a.d(n,"a",(function(){return de}));var me=function(e){var n=e.children,a=Object(c.useCallback)((function(e){if(e instanceof Error)return Object(z.a)(ue(),String(e));throw new TypeError(Object(z.a)(ie(),String(e)))}),[]);return o.a.createElement(o.a.Fragment,null,o.a.createElement(oe,null),o.a.createElement(le,{renderError:a},n))},de=function(e){return function(n){return o.a.createElement(me,null,o.a.createElement(e,n))}}},343:function(e,n,a){var t=a(296),r=a(344);"string"==typeof(r=r.__esModule?r.default:r)&&(r=[[e.i,r,""]]);var c={insert:"head",singleton:!1},o=(t(r,c),r.locals?r.locals:{});e.exports=o},344:function(e,n,a){(n=a(297)(!1)).push([e.i,".src-components-Chessboard-classes__ChessboardTable--1YTjE {\n  border-collapse: collapse;\n}\n\n.src-components-Chessboard-classes__ChessboardTd--3hHrO {\n  padding: 0;\n}\n",""]),n.locals={ChessboardTable:"src-components-Chessboard-classes__ChessboardTable--1YTjE",ChessboardTd:"src-components-Chessboard-classes__ChessboardTd--3hHrO"},e.exports=n},345:function(e,n,a){var t=a(296),r=a(346);"string"==typeof(r=r.__esModule?r.default:r)&&(r=[[e.i,r,""]]);var c={insert:"head",singleton:!1},o=(t(r,c),r.locals?r.locals:{});e.exports=o},346:function(e,n,a){(n=a(297)(!1)).push([e.i,".src-components-Chessboard-Square-classes__Square--3eloU {\n  height: 32px;\n  width: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n\n  --white-square-color: white;\n  --black-square-color: #c0c0c0;\n}\n\n.src-components-Chessboard-Square-classes__White--7ZYQX {\n  background-color: var(--white-square-color);\n}\n\n.src-components-Chessboard-Square-classes__Black--3wDR_ {\n  background-color: var(--black-square-color);\n}\n",""]),n.locals={Square:"src-components-Chessboard-Square-classes__Square--3eloU",White:"src-components-Chessboard-Square-classes__White--7ZYQX",Black:"src-components-Chessboard-Square-classes__Black--3wDR_"},e.exports=n},347:function(e,n,a){var t=a(296),r=a(348);"string"==typeof(r=r.__esModule?r.default:r)&&(r=[[e.i,r,""]]);var c={insert:"head",singleton:!1},o=(t(r,c),r.locals?r.locals:{});e.exports=o},348:function(e,n,a){(n=a(297)(!1)).push([e.i,'.src-components-Chessboard-Chessman-classes__Chessman--1H9tu {\n  font: 20px "Apple Symbols", sans-serif;\n  color: #222;\n}\n\n.src-components-Chessboard-Chessman-classes__Dragging--3Wg1a {\n  opacity: 0.5;\n}\n\n.src-components-Chessboard-Chessman-classes__Picking--11tdl {\n  color: teal;\n}\n\n/* TODO: in a little more normal way */\n.src-components-Chessboard-Chessman-classes__Preview--2T3_G {\n  position: absolute;\n  z-index: -1;\n}\n',""]),n.locals={Chessman:"src-components-Chessboard-Chessman-classes__Chessman--1H9tu",Dragging:"src-components-Chessboard-Chessman-classes__Dragging--3Wg1a",Picking:"src-components-Chessboard-Chessman-classes__Picking--11tdl",Preview:"src-components-Chessboard-Chessman-classes__Preview--2T3_G"},e.exports=n},385:function(e,n,a){"use strict";a.r(n);var t=a(0),r=a.n(t),c=a(117),o=a.n(c),s=a(317),l=a(58),i=Object(t.createContext)({pickChessman:function(){throw new Error}}),u=a(14),m=a(100),d=a(20),p=a.n(d),f=a(23),v=a.n(f),h=a(92),b=a.n(h),_=a(393);var g=a(140),C=a(347),E=a.n(C),S=function(e){var n=e.chessman,a=e.coord,c=Object(_.a)({item:{type:"Chessman"},collect:function(e){return{dragging:e.isDragging()}},begin:function(){f(n,a)}}),o=v()(c,3),s=o[0].dragging,l=o[1],u=o[2],m=Object(t.useContext)(i),d=m.picking,f=m.pickChessman,h=Object(t.useMemo)((function(){var e,t,r;return b()(E.a.Chessman,(e={},p()(e,E.a.Dragging,s),p()(e,E.a.Picking,void 0!==d&&(t=a,r=d.coord,t.file===r.file&&t.rank===r.rank)&&Object(g.a)(n,d.chessman)),e))}),[s,a,null==d?void 0:d.coord]),C=Object(t.useMemo)((function(){return b()(E.a.Chessman,E.a.Preview)}),[]),S=Object(t.useCallback)((function(){void 0===d&&f(n,a)}),[d,f,n,a]);return r.a.createElement(r.a.Fragment,null,r.a.createElement("span",{ref:u,className:C},n.symbol),r.a.createElement("span",{ref:l,className:h,onClick:S},n.symbol))},k=a(394);var O=a(345),j=a.n(O),N=function(e){var n=e.children,a=e.coord,c=e.halfMove,o=Object(t.useContext)(i).picking,s=Object(k.a)({accept:"Chessman",drop:function(){void 0!==o&&c(o.chessman,o.coord,a)}}),l=v()(s,2)[1],u=Object(t.useMemo)((function(){return function(e){return e.file%2==e.rank%2?"black":"white"}(a)}),[a]),m=Object(t.useMemo)((function(){var e;return b()(j.a.Square,(e={},p()(e,j.a.White,"white"===u),p()(e,j.a.Black,"black"===u),e))}),[]),d=Object(t.useCallback)((function(){void 0!==o&&c(o.chessman,o.coord,a)}),[c,o,a]);return r.a.createElement("div",{ref:l,className:m,onClick:d},n)},L=a(343),y=a.n(L),M=[1,2,3,4,5,6,7,8],w=[8,7,6,5,4,3,2,1],x={resetBoard:m.f,halfMove:m.d,pickChessman:m.e},I=Object(l.c)((function(e){var n=e.chess;return{board:n.board,picking:n.picking}}),x)((function(e){var n=e.board,a=e.picking,c=e.resetBoard,o=e.halfMove,s=e.pickChessman;return Object(t.useEffect)((function(){c()}),[]),r.a.createElement(i.Provider,{value:{picking:a,pickChessman:s}},r.a.createElement("table",{className:y.a.ChessboardTable},r.a.createElement("tbody",null,w.map((function(e){return r.a.createElement("tr",{key:e},M.map((function(a){var t=new u.a({file:a,rank:e}),c=n.chessmen.get(t);return r.a.createElement("td",{key:a,className:y.a.ChessboardTd},r.a.createElement(N,{coord:t,halfMove:o},void 0!==c?r.a.createElement(S,{chessman:c,coord:t}):null))})))})))))})),F=a(295),T=a(326),W=Object(T.defineMessages)({chess:{id:"src.components.App.ChessPage.chess",defaultMessage:"chess"}});n.default=Object(F.a)((function(){var e=Object(s.a)().formatMessage;return r.a.createElement(r.a.Fragment,null,r.a.createElement(o.a,{title:e(W.chess)}),r.a.createElement(I,null))}))}}]);
//# sourceMappingURL=chess~21833f8f.0e5754b0.js.map