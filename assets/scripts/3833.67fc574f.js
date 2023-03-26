"use strict";(self.webpackChunkrap=self.webpackChunkrap||[]).push([[3833],{95929:function(e,t,n){const l=(0,n(2804).cn)({key:"bannersState",default:[]});t.Z=l},32975:function(e,t,n){var l=n(18394),a=n.n(l);const o=(0,n(2804).cn)({key:"notificationsState",default:[],effects_UNSTABLE:[e=>{let{onSet:t}=e;t((e=>{if(!Array.isArray(e))throw new Error;0!==e.length?a().add():a().remove()}))}]});t.Z=o},93796:function(e,t,n){n.d(t,{Z:function(){return F}});var l=n(67154),a=n.n(l),o=n(59446),r=n(64436),s=n(38799),c=n(96394),i=n(66718),p=n(110),u=n(41120),m=n(8920),d=n(94184),g=n.n(d),E=n(35369),A=n(67294),f=n(31753),h=n(97127),Z=n(46458),v=n(44586),b=n(99676),C=JSON.parse('{"en":"English","he":"עברית","ja":"日本語"}');var T=n(53638),S=n(93379),L=n.n(S),k=n(7795),y=n.n(k),_=n(90569),B=n.n(_),I=n(3565),w=n.n(I),P=n(19216),N=n.n(P),M=n(44589),O=n.n(M),D=n(44974),R={};R.styleTagTransform=O(),R.setAttributes=w(),R.insert=B().bind(null,"head"),R.domAPI=y(),R.insertStyleElement=N();L()(D.Z,R);var x=D.Z&&D.Z.locals?D.Z.locals:void 0,U=(0,n(85315).vU)({language:{id:"src.components.LocaleSelect.language",defaultMessage:"Language"},en:{id:"src.components.LocaleSelect.en",defaultMessage:"English"},he:{id:"src.components.LocaleSelect.he",defaultMessage:"Hebrew"},ja:{id:"src.components.LocaleSelect.ja",defaultMessage:"Japanese"}});const z=(0,u.Z)((e=>({Select:{minWidth:e=>{let{selectMinWidth:t}=e;return t}},Option:{color:e.palette.text.primary}}))),H={selectLocale:T.fN};var F=(0,Z.$j)((e=>{let{localeSelector:{locale:t}}=e;return{locale:t}}),H)((e=>{var t,n;let{hiddenLabel:l=!1,classes:u,FormControlProps:d,locale:Z,selectLocale:T}=e;const{formatMessage:S}=(0,f.Z)(),[L,k]=(0,A.useState)(null),[y,_]=(0,A.useState)(null),B=(0,A.useMemo)(v.Z,[]),I=(0,m.Z)(),{dir:w}=(0,A.useContext)(b.Z),P=z({selectMinWidth:null!=y?y:void 0}),N=(0,A.useMemo)((()=>{var e,t,n,l;return null!==(e=null!==(t=null==d?void 0:d.variant)&&void 0!==t?t:null==I||null===(n=I.props)||void 0===n||null===(l=n.MuiFormControl)||void 0===l?void 0:l.variant)&&void 0!==e?e:"standard"}),[null==d?void 0:d.variant,null==I||null===(t=I.props)||void 0===t||null===(n=t.MuiFormControl)||void 0===n?void 0:n.variant]),M=(0,A.useMemo)((()=>g()(null==u?void 0:u.root,null==d?void 0:d.className)),[null==u?void 0:u.root,null==d?void 0:d.className]),O=(0,A.useMemo)((()=>g()(null==u?void 0:u.label,x.InputLabel)),[null==u?void 0:u.label]),D=(0,A.useMemo)((()=>g()(P.Select,x.Select)),[P.Select]),R=(0,A.useMemo)((()=>g()(null==u?void 0:u.input)),[null==u?void 0:u.input]),H=(0,A.useMemo)((()=>g()(null==u?void 0:u.selectIcon)),[null==u?void 0:u.selectIcon]),F=(0,A.useMemo)((()=>g()(null==u?void 0:u.inputUnderline)),[null==u?void 0:u.inputUnderline]),W=(0,A.useRef)(null),G=(0,A.useRef)(null);(0,A.useEffect)((()=>{if(null===W.current)return;if(k(W.current.offsetWidth),null===G.current)return;const e=G.current.querySelector(`:scope > .${x.Select}`);if(null===e||!(e instanceof HTMLDivElement))return;const t=W.current.getBoundingClientRect(),n=globalThis.getComputedStyle(e),l=parseFloat("ltr"===w?n.paddingLeft:n.paddingRight),a=parseFloat("ltr"===w?n.paddingRight:n.paddingLeft);_(t.width+l-a)}),[Z,w]);const q=(0,A.useCallback)((e=>{var t;"string"==typeof(t=e.target.value)&&t in C&&T(e.target.value)}),[T]),{availableLocales:V}=(0,A.useContext)(b.Z);return A.createElement(r.Z,a()({},d,{hiddenLabel:l,className:M}),!l&&A.createElement(c.Z,{className:O,ref:W,htmlFor:B},A.createElement(h.Z,U.language)),A.createElement(p.Z,{native:!0,classes:{select:D,icon:H},ref:G,labelWidth:l?void 0:null!=L?L:void 0,value:Z,onChange:q,id:B,inputProps:{"data-testid":"localeSelect"},input:{standard:A.createElement(s.Z,{className:R,classes:{underline:F}}),outlined:A.createElement(i.Z,{className:R,labelWidth:null!=L?L:void 0}),filled:A.createElement(o.Z,{className:R})}[N]},null==V?void 0:V.map(((e,t)=>{const n=(0,E.hU)([S(U[e]),(l=e,C[l])]).join(" - ");var l;return A.createElement("option",{key:t,className:P.Option,value:e},n)}))))}))},13833:function(e,t,n){n.d(t,{D:function(){return tt}});var l=n(67294),a=n(66037),o=n(55517),r=n(41120),s=n(8920),c=n(94184),i=n.n(c),p=n(2804);var u=(0,p.cn)({key:"bannerOpenState",default:!1}),m=n(49527),d=n(78607),g=n(93379),E=n.n(g),A=n(7795),f=n.n(A),h=n(90569),Z=n.n(h),v=n(3565),b=n.n(v),C=n(19216),T=n.n(C),S=n(44589),L=n.n(S),k=n(94403),y={};y.styleTagTransform=L(),y.setAttributes=b(),y.insert=Z().bind(null,"head"),y.domAPI=f(),y.insertStyleElement=T();E()(k.Z,y);var _=k.Z&&k.Z.locals?k.Z.locals:void 0;const B=(0,r.Z)({Collapse:{top:e=>{let{topAppbarHeight:t}=e;return t}}});var I=e=>{let{topAppbarHeight:t}=e;const n=(0,p.sJ)(d.Z),[r,c]=(0,p.FV)(u),g=B({topAppbarHeight:t}),E=(0,l.useMemo)((()=>i()(g.Collapse,_.Collapse)),[g]),[A,f]=(0,l.useState)(null),h=(0,s.Z)();return(0,l.useEffect)((()=>{(async()=>{null!==n?(null!==A&&n.key!==A.key&&(c(!1),await(0,m.Z)(h.transitions.duration.standard)),f(n),c(!0)):(c(!1),await(0,m.Z)(h.transitions.duration.standard),f(null))})()}),[n,A,h,c]),l.createElement(a.Z,{in:r,mountOnEnter:!0,unmountOnExit:!0,classes:{root:E}},l.createElement("div",null,null==A?void 0:A.banner,l.createElement(o.Z,null)))};class w extends l.Component{constructor(){super(...arguments),this.state={hasError:!1}}render(){const{renderError:e,children:t}=this.props,{hasError:n,error:l}=this.state;return n?e(l,t):t}}w.getDerivedStateFromError=e=>({hasError:!0,error:e});var P=w,N=n(16787),M=n(25818),O=n(67154),D=n.n(O),R=n(96834),x=n(43927),U=n(85699),z=n(34892),H=n(8984),F=n(1954),W=n(31958),G=n(17812),q=n(62822),V=n(46869),j=n(95757),J=n(96837),$=n(94775),Y=n(92448),X=n(24849),K=n(18362),Q=n(24960),ee=n(48884),te=n(9969),ne=n(79313),le=n(97127),ae=n(46121),oe=n(50998),re=n(89659),se=n(76),ce=n(43587);const ie=(0,ce.jt)((0,ce.gB)("initial","inherit","primary","secondary","textPrimary","textSecondary","error")),pe=l.forwardRef(((e,t)=>l.createElement(se.rU,D()({innerRef:t},e))));class ue extends l.Component{render(){const{color:e,...t}=this.props;return ie(e)?l.createElement(re.Z,D()({component:pe,color:e},t)):(console.warn(M.Z`${e} is not a Material-UI Typography color.`),l.createElement(re.Z,D()({component:pe},t)))}}var me=l.forwardRef(((e,t)=>{let{to:n,button:a,innerRef:o,...r}=e;const s=l.forwardRef(((e,t)=>l.createElement(ue,D()({ref:t,innerRef:o,color:"inherit",underline:"none"},e))));return l.createElement(oe.Z,D()({button:!0,component:s,to:n,ref:t},r))})),de=n(99676),ge=n(70043),Ee={};Ee.styleTagTransform=L(),Ee.setAttributes=b(),Ee.insert=Z().bind(null,"head"),Ee.domAPI=f(),Ee.insertStyleElement=T();E()(ge.Z,Ee);var Ae=ge.Z&&ge.Z.locals?ge.Z.locals:void 0,fe=n(85315),he=(0,fe.vU)({home:{id:"src.components.PageTemplate.Nav.home",defaultMessage:"Home"},components:{id:"src.components.PageTemplate.Nav.components",defaultMessage:"Components"},formControls:{id:"src.components.PageTemplate.Nav.formControls",defaultMessage:"Form controls"},table:{id:"src.components.PageTemplate.Nav.table",defaultMessage:"Table"},apps:{id:"src.components.PageTemplate.Nav.apps",defaultMessage:"Apps"},chess:{id:"src.components.PageTemplate.Nav.chess",defaultMessage:"Chess"},clock:{id:"src.components.PageTemplate.Nav.clock",defaultMessage:"Clock"},counter:{id:"src.components.PageTemplate.Nav.counter",defaultMessage:"Counter"},imageDataUrlEnDecoder:{id:"src.components.PageTemplate.Nav.imageDataUrlEnDecoder",defaultMessage:"Image–data URL en-/decoder"},info:{id:"src.components.PageTemplate.Nav.info",defaultMessage:"Info"},paint:{id:"src.components.PageTemplate.Nav.paint",defaultMessage:"Paint"},qrCodeTools:{id:"src.components.PageTemplate.Nav.qrCodeTools",defaultMessage:"QR code tools"},reminder:{id:"src.components.PageTemplate.Nav.reminder",defaultMessage:"Reminder"},settings:{id:"src.components.PageTemplate.Nav.settings",defaultMessage:"Settings"}});const Ze=(0,r.Z)((e=>({DrawerHeader:{paddingLeft:e.spacing(2),paddingRight:e.spacing(2),[e.breakpoints.up("sm")]:{paddingLeft:e.spacing(3),paddingRight:e.spacing(3)},height:e=>{let{topAppbarHeight:t}=e;return void 0!==t?M.Z`${t}px`:void 0},display:"grid",alignItems:"center",justifyContent:"start"}})),{name:"Nav"}),ve=e=>{let{style:t,...n}=e;if(void 0===t)return l.createElement(Q.Z,D()({style:{transform:"scaleX(-1)"}},n));const{transform:a,...o}=t;if(void 0!==a)throw new Error;return l.createElement(Q.Z,D()({style:{transform:"scaleX(-1)",...o}},n))};var be=l.forwardRef(((e,t)=>{let{open:n,onClose:a,topAppbarHeight:r}=e;const{dir:s}=(0,l.useContext)(de.Z),c=(0,l.useMemo)((()=>{switch((0,ae.s)(s),s){case"ltr":return Q.Z;case"rtl":return ve}}),[s]),i=Ze({topAppbarHeight:r});return l.createElement(W.ZP,{anchor:"left",open:n,onClose:a,PaperProps:{ref:t}},l.createElement("div",{className:i.DrawerHeader},l.createElement(G.Z,{edge:"start",color:"inherit",onClick:a},l.createElement(ee.Z,null))),l.createElement(o.Z,null),l.createElement(q.Z,{className:Ae.List},l.createElement(me,{to:"/",onClick:a},l.createElement(V.Z,null,l.createElement(Y.Z,null)),l.createElement(j.Z,null,l.createElement(le.Z,he.home))),l.createElement(J.Z,{disableSticky:!0},l.createElement(le.Z,he.components)),l.createElement(me,{to:"/form-controls",onClick:a},l.createElement(V.Z,null,l.createElement(ne.Z,null)),l.createElement(j.Z,null,l.createElement(le.Z,he.formControls))),l.createElement(me,{to:"/table",onClick:a},l.createElement(V.Z,null,l.createElement(F.JO,{icon:H.Z,width:"24",height:"24"})),l.createElement(j.Z,null,l.createElement(le.Z,he.table))),l.createElement(J.Z,{disableSticky:!0},l.createElement(le.Z,he.apps)),l.createElement(me,{to:"/chess",onClick:a},l.createElement(V.Z,null,l.createElement(F.JO,{icon:R.Z,width:"24",height:"24"})),l.createElement(j.Z,null,l.createElement(le.Z,he.chess))),l.createElement(me,{to:"/clock",onClick:a},l.createElement(V.Z,null,l.createElement(F.JO,{icon:x.Z,width:"24",height:"24"})),l.createElement(j.Z,null,l.createElement(le.Z,he.clock))),l.createElement(me,{to:"/counter",onClick:a},l.createElement(V.Z,null,l.createElement(F.JO,{icon:U.Z,width:"24",height:"24"})),l.createElement(j.Z,null,l.createElement(le.Z,he.counter))),l.createElement(me,{to:"/image-data-url-en-decoder",onClick:a},l.createElement(V.Z,null,l.createElement(X.Z,null)),l.createElement(j.Z,null,l.createElement(le.Z,he.imageDataUrlEnDecoder))),l.createElement(me,{to:"/info",onClick:a},l.createElement(V.Z,null,l.createElement(K.Z,null)),l.createElement(j.Z,null,l.createElement(le.Z,he.info))),l.createElement(me,{to:"/paint",onClick:a},l.createElement(V.Z,null,l.createElement($.Z,null)),l.createElement(j.Z,null,l.createElement(le.Z,he.paint))),l.createElement(me,{to:"/qr-code-tools",onClick:a},l.createElement(V.Z,null,l.createElement(F.JO,{icon:z.Z,width:"24",height:"24"})),l.createElement(j.Z,null,l.createElement(le.Z,he.qrCodeTools))),l.createElement(me,{to:"/reminder",onClick:a},l.createElement(V.Z,null,l.createElement(c,null)),l.createElement(j.Z,null,l.createElement(le.Z,he.reminder))),l.createElement(me,{to:"/settings",onClick:a},l.createElement(V.Z,null,l.createElement(te.Z,null)),l.createElement(j.Z,null,l.createElement(le.Z,he.settings)))))})),Ce=n(45258),Te=n(59009),Se=n(28889),Le=n(52387),ke=n(28358),ye=n(3380),_e=n(48825),Be=n(32975),Ie=n(93796);var we=(0,p.cn)({key:"notificationsSortState",default:{by:"timestamp",in:"desc"}});var Pe=(0,p.nZ)({key:"sortedNotificationsState",get(e){let{get:t}=e;const n=t(Be.Z),l=t(we),a=n.map((e=>({notification:e,by:e[l.by]}))).sort(((e,t)=>{let{by:n}=e,{by:l}=t;return n-l})).map((e=>{let{notification:t}=e;return t}));return"desc"===l.in&&a.reverse(),a}}),Ne=n(81860),Me=n(28428);var Oe=e=>{let{notification:t}=e;const n=(0,l.useCallback)((()=>{t.close()}),[t]);return l.createElement(oe.Z,null,l.createElement(j.Z,{primary:t.title,secondary:l.createElement(fe.qN,{value:t.timestamp,format:"medium"})}),l.createElement(Ne.Z,null,l.createElement(G.Z,{edge:"end",onClick:n},l.createElement(Me.Z,null))))};var De=()=>{const e=(0,p.sJ)(Pe);return l.createElement(q.Z,null,e.map((e=>l.createElement(Oe,{key:e.timestamp,notification:e}))))},Re=n(31826),xe=n(73521),Ue=n(3320),ze=n(44901),He=n(25665),Fe=n(46328),We={};We.styleTagTransform=L(),We.setAttributes=b(),We.insert=Z().bind(null,"head"),We.domAPI=f(),We.insertStyleElement=T();E()(Fe.Z,We);var Ge=Fe.Z&&Fe.Z.locals?Fe.Z.locals:void 0,qe=(0,fe.vU)({toggleLightDarkTheme:{id:"src.components.ToggleDarkButton.toggleLightDarkTheme",defaultMessage:"Toggle light/dark theme"}});var Ve=()=>{const[e,t]=(0,p.FV)(He.Z),{defaultDark:n}=(0,l.useContext)(ze.Z);(0,ae.s)(n);const a=(0,l.useCallback)((()=>{t(!0)}),[t]),o=(0,l.useCallback)((()=>{t(!1)}),[t]);return l.createElement(ye.ZP,{title:l.createElement(le.Z,qe.toggleLightDarkTheme)},l.createElement("span",{className:Ge.TooltipWrapper},(null!=e?e:n)?l.createElement(G.Z,{onClick:o},l.createElement(Ue.Z,null)):l.createElement(G.Z,{onClick:a,color:"inherit"},l.createElement(xe.Z,null))))},je=n(17326),Je=n(20284),$e={};$e.styleTagTransform=L(),$e.setAttributes=b(),$e.insert=Z().bind(null,"head"),$e.domAPI=f(),$e.insertStyleElement=T();E()(Je.Z,$e);var Ye=Je.Z&&Je.Z.locals?Je.Z.locals:void 0,Xe=(0,fe.vU)({showNotifications:{id:"src.components.PageTemplate.TopAppbar.showNotifications",defaultMessage:"Show notifications"}});const Ke=(0,r.Z)({Offset:{height:e=>{let{topAppbarHeight:t}=e;return t}}});var Qe=l.forwardRef(((e,t)=>{let{onMenuIconButtonClick:n}=e;const{width:a}=(0,N.Z)(),{dir:o}=(0,l.useContext)(de.Z),[r,s]=(0,l.useState)(null),c=(0,l.useCallback)((e=>{if(null===a)return;const t=null==e?void 0:e.getBoundingClientRect();void 0!==t&&s(t.height)}),[a]),i=(0,je.Z)(t,c),u=Ke({topAppbarHeight:null!=r?r:void 0}),[m]=(0,p.FV)(Be.Z),[d,g]=(0,l.useState)(!1),E=l.useRef(null),A=(0,l.useCallback)((()=>{0!==m.length&&g(!0)}),[m]),f=(0,l.useCallback)((()=>{g(!1)}),[]);return(0,l.useEffect)((()=>{0===m.length&&g(!1)}),[m]),l.createElement(l.Fragment,null,l.createElement(Ce.Z,{position:"fixed",ref:i},l.createElement(ke.Z,null,l.createElement(G.Z,{edge:"start",color:"inherit",onClick:n},l.createElement(ee.Z,null)),l.createElement(Re.Z,null),l.createElement(Se.Z,{mx:1},l.createElement(Ve,null),"Notification"in globalThis&&l.createElement(l.Fragment,null,l.createElement(ye.ZP,{title:l.createElement(le.Z,Xe.showNotifications),disableFocusListener:0===m.length,disableHoverListener:0===m.length,disableTouchListener:0===m.length},l.createElement("span",{className:Ye.TooltipWrapper},l.createElement(G.Z,{color:"inherit",onClick:A,ref:E,disabled:0===m.length},l.createElement(Te.Z,{color:"secondary",badgeContent:m.length},l.createElement(_e.Z,null))))),0!==m.length&&l.createElement(Le.ZP,{open:d,onClose:f,anchorEl:E.current,anchorOrigin:{horizontal:"ltr"===o?"right":"left",vertical:"bottom"},transformOrigin:{horizontal:"ltr"===o?"right":"left",vertical:"top"}},l.createElement(De,null)))),l.createElement(Ie.Z,{classes:{label:Ye.LocaleSelectLabel,input:Ye.LocaleSelectInput,selectIcon:Ye.LocaleSelectSelectIcon,inputUnderline:Ye.LocaleSelectInputUnderline},FormControlProps:{variant:"filled"}}))),l.createElement("div",{className:u.Offset}))}));const et=e=>{let{children:t}=e;const n=(0,l.useCallback)((e=>{if(e instanceof Error)return M.Z`${String(e)}`;throw new TypeError(M.Z`${String(e)} is not an error.`)}),[]),[a,o]=(0,l.useState)(!1),r=(0,l.useRef)(null),{width:s}=(0,N.Z)(),[c,i]=(0,l.useState)(null),p=(0,l.useCallback)((e=>{if(null===s)return;const t=null==e?void 0:e.getBoundingClientRect();void 0!==t&&i(t.height)}),[s]),u=(0,l.useCallback)((()=>{o(!0)}),[]),m=(0,l.useCallback)((()=>{o(!1)}),[]);return l.createElement(l.Fragment,null,l.createElement(Qe,{ref:p,onMenuIconButtonClick:u}),l.createElement(I,{topAppbarHeight:null!=c?c:void 0}),l.createElement(be,{ref:r,open:a,onClose:m,topAppbarHeight:null!=c?c:void 0}),l.createElement(P,{renderError:n},t))},tt=e=>t=>l.createElement(et,null,l.createElement(e,t))},31826:function(e,t,n){n.d(t,{Z:function(){return Z}});var l=n(67294),a=n(93379),o=n.n(a),r=n(7795),s=n.n(r),c=n(90569),i=n.n(c),p=n(3565),u=n.n(p),m=n(19216),d=n.n(m),g=n(44589),E=n.n(g),A=n(30894),f={};f.styleTagTransform=E(),f.setAttributes=u(),f.insert=i().bind(null,"head"),f.domAPI=s(),f.insertStyleElement=d();o()(A.Z,f);var h=A.Z&&A.Z.locals?A.Z.locals:void 0;var Z=()=>l.createElement("div",{className:h.Spacer})},43587:function(e,t,n){n.d(t,{gB:function(){return l},jt:function(){return a}});const l=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return e=>t.some((t=>t===e))},a=e=>t=>void 0===t||e(t)},17326:function(e,t,n){n.d(t,{Z:function(){return a}});var l=n(67294);function a(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return(0,l.useCallback)((e=>{for(const n of t)if(null!==n)if("function"==typeof n)n(e);else{n.current=e}}),[t])}},16787:function(e,t,n){n.d(t,{Z:function(){return a}});var l=n(67294);function a(){const[e,t]=(0,l.useState)(null),[n,a]=(0,l.useState)(null),[o,r]=(0,l.useState)(null),s=(0,l.useCallback)((()=>{t(globalThis.innerWidth),a(globalThis.innerHeight)}),[]),c=(0,l.useCallback)((()=>{r(globalThis.devicePixelRatio)}),[]);return(0,l.useEffect)((()=>(s(),c(),globalThis.addEventListener("resize",s),globalThis.addEventListener("change",c),()=>{globalThis.removeEventListener("resize",s),globalThis.removeEventListener("change",c)})),[s,c]),{width:e,height:n,dpr:o}}},78607:function(e,t,n){var l=n(2804),a=n(95929);const o=(0,l.nZ)({key:"currentBannerState",get(e){let{get:t}=e;const n=t(a.Z);return n.length>=1?n[0]:null},set(e,t){let{get:n,set:r}=e;if(t instanceof l.nY)throw new Error("DefaultValue not supported.");r(a.Z,(e=>{if(null===t){const[t,...n]=e;return n}{const l=n(o),a=(()=>{if(null!==l&&l.replaceable){const t=e.findIndex((e=>e.key===l.key));return[...e.slice(0,t),...e.slice(t+1)]}return e})(),r=a.findIndex((e=>e.key===t.key));return-1!==r?[t,...a.slice(0,r),...a.slice(r+1)]:[t,...a]}}))}});t.Z=o},94403:function(e,t,n){var l=n(87537),a=n.n(l),o=n(23645),r=n.n(o)()(a());r.push([e.id,".src-components-BannerContainer-classes__Collapse--nLcf_ {\n  position: sticky;\n  z-index: 1075; /* NOTE: Behind an app bar, ahead speed dials; cf. https://material-ui.com/customization/z-index/ */\n}\n","",{version:3,sources:["webpack://./src/components/BannerContainer/classes.css"],names:[],mappings:"AAAA;EACE,gBAAgB;EAChB,aAAa,EAAE,mGAAmG;AACpH",sourcesContent:[".Collapse {\n  position: sticky;\n  z-index: 1075; /* NOTE: Behind an app bar, ahead speed dials; cf. https://material-ui.com/customization/z-index/ */\n}\n"],sourceRoot:""}]),r.locals={Collapse:"src-components-BannerContainer-classes__Collapse--nLcf_"},t.Z=r},44974:function(e,t,n){var l=n(87537),a=n.n(l),o=n(23645),r=n.n(o)()(a());r.push([e.id,".src-components-LocaleSelect-classes__InputLabel--Xrt2I {\n  white-space: nowrap;\n}\n\n.src-components-LocaleSelect-classes__Select--C6EsG {\n  /* Silence is golden. */\n}\n","",{version:3,sources:["webpack://./src/components/LocaleSelect/classes.css"],names:[],mappings:"AAAA;EACE,mBAAmB;AACrB;;AAEA;EACE,uBAAuB;AACzB",sourcesContent:[".InputLabel {\n  white-space: nowrap;\n}\n\n.Select {\n  /* Silence is golden. */\n}\n"],sourceRoot:""}]),r.locals={InputLabel:"src-components-LocaleSelect-classes__InputLabel--Xrt2I",Select:"src-components-LocaleSelect-classes__Select--C6EsG"},t.Z=r},70043:function(e,t,n){var l=n(87537),a=n.n(l),o=n(23645),r=n.n(o)()(a());r.push([e.id,".src-components-PageTemplate-Nav-classes__List--BipOY {\n  overflow-y: auto;\n}\n","",{version:3,sources:["webpack://./src/components/PageTemplate/Nav/classes.css"],names:[],mappings:"AAAA;EACE,gBAAgB;AAClB",sourcesContent:[".List {\n  overflow-y: auto;\n}\n"],sourceRoot:""}]),r.locals={List:"src-components-PageTemplate-Nav-classes__List--BipOY"},t.Z=r},20284:function(e,t,n){var l=n(87537),a=n.n(l),o=n(23645),r=n.n(o)()(a());r.push([e.id,".src-components-PageTemplate-TopAppbar-classes__LocaleSelectLabel--ezBHw.src-components-PageTemplate-TopAppbar-classes__LocaleSelectLabel--ezBHw {\n  color: currentColor\n}\n\n.src-components-PageTemplate-TopAppbar-classes__LocaleSelectLabel--ezBHw.src-components-PageTemplate-TopAppbar-classes__LocaleSelectLabel--ezBHw.Mui-focused {\n    opacity: 0.618;\n    color: currentColor;\n  }\n\n.src-components-PageTemplate-TopAppbar-classes__LocaleSelectInput--mDhy1.src-components-PageTemplate-TopAppbar-classes__LocaleSelectInput--mDhy1 {\n  color: currentColor;\n}\n\n.src-components-PageTemplate-TopAppbar-classes__LocaleSelectSelectIcon--u7KyI.src-components-PageTemplate-TopAppbar-classes__LocaleSelectSelectIcon--u7KyI {\n  color: currentColor;\n}\n\n.src-components-PageTemplate-TopAppbar-classes__LocaleSelectInputUnderline--lzuVo.src-components-PageTemplate-TopAppbar-classes__LocaleSelectInputUnderline--lzuVo::before,\n  .src-components-PageTemplate-TopAppbar-classes__LocaleSelectInputUnderline--lzuVo.src-components-PageTemplate-TopAppbar-classes__LocaleSelectInputUnderline--lzuVo:hover:not(.Mui-disabled)::before,\n  .src-components-PageTemplate-TopAppbar-classes__LocaleSelectInputUnderline--lzuVo.src-components-PageTemplate-TopAppbar-classes__LocaleSelectInputUnderline--lzuVo::after {\n    border-bottom-color: currentColor;\n  }\n\n/* TODO: Remove */\n/* NOTE: https://material-ui.com/components/tooltips/#disabled-elements のように <span> を差し込む場合、ツールチップの位置を <span> が無い場合と揃えるために <span> の高さを保持する。 */\n/* NOTE: <Tooltip> の親の内側のレイアウトが flex な場合も <span> の高さが保持されるので、 <InputAdornment> 等で使う場合はこのルールセットは不要。 */\n.src-components-PageTemplate-TopAppbar-classes__TooltipWrapper--G73AS {\n  display: inline flow-root;\n  display: inline-block; /* TODO: Delete this line */\n}\n","",{version:3,sources:["webpack://./src/components/PageTemplate/TopAppbar/classes.css"],names:[],mappings:"AAAA;EACE;AAMF;;AAJE;IACE,cAAc;IACd,mBAAmB;EACrB;;AAGF;EACE,mBAAmB;AACrB;;AAEA;EACE,mBAAmB;AACrB;;AAGE;;;IAGE,iCAAiC;EACnC;;AAGF,iBAAiB;AACjB,6IAA6I;AAC7I,oGAAoG;AACpG;EACE,yBAAyB;EACzB,qBAAqB,EAAE,2BAA2B;AACpD",sourcesContent:[".LocaleSelectLabel.LocaleSelectLabel {\n  color: currentColor;\n\n  &:global(.Mui-focused) {\n    opacity: 0.618;\n    color: currentColor;\n  }\n}\n\n.LocaleSelectInput.LocaleSelectInput {\n  color: currentColor;\n}\n\n.LocaleSelectSelectIcon.LocaleSelectSelectIcon {\n  color: currentColor;\n}\n\n.LocaleSelectInputUnderline.LocaleSelectInputUnderline {\n  &::before,\n  &:hover:not(:global(.Mui-disabled))::before,\n  &::after {\n    border-bottom-color: currentColor;\n  }\n}\n\n/* TODO: Remove */\n/* NOTE: https://material-ui.com/components/tooltips/#disabled-elements のように <span> を差し込む場合、ツールチップの位置を <span> が無い場合と揃えるために <span> の高さを保持する。 */\n/* NOTE: <Tooltip> の親の内側のレイアウトが flex な場合も <span> の高さが保持されるので、 <InputAdornment> 等で使う場合はこのルールセットは不要。 */\n.TooltipWrapper {\n  display: inline flow-root;\n  display: inline-block; /* TODO: Delete this line */\n}\n"],sourceRoot:""}]),r.locals={LocaleSelectLabel:"src-components-PageTemplate-TopAppbar-classes__LocaleSelectLabel--ezBHw",LocaleSelectInput:"src-components-PageTemplate-TopAppbar-classes__LocaleSelectInput--mDhy1",LocaleSelectSelectIcon:"src-components-PageTemplate-TopAppbar-classes__LocaleSelectSelectIcon--u7KyI",LocaleSelectInputUnderline:"src-components-PageTemplate-TopAppbar-classes__LocaleSelectInputUnderline--lzuVo",TooltipWrapper:"src-components-PageTemplate-TopAppbar-classes__TooltipWrapper--G73AS"},t.Z=r},30894:function(e,t,n){var l=n(87537),a=n.n(l),o=n(23645),r=n.n(o)()(a());r.push([e.id,".src-components-Spacer-classes__Spacer--F44wg {\n  flex-grow: 1;\n}\n","",{version:3,sources:["webpack://./src/components/Spacer/classes.css"],names:[],mappings:"AAAA;EACE,YAAY;AACd",sourcesContent:[".Spacer {\n  flex-grow: 1;\n}\n"],sourceRoot:""}]),r.locals={Spacer:"src-components-Spacer-classes__Spacer--F44wg"},t.Z=r},46328:function(e,t,n){var l=n(87537),a=n.n(l),o=n(23645),r=n.n(o)()(a());r.push([e.id,"/* TODO: Remove */\n/* NOTE: https://material-ui.com/components/tooltips/#disabled-elements のように <span> を差し込む場合、ツールチップの位置を <span> が無い場合と揃えるために <span> の高さを保持する。 */\n/* NOTE: <Tooltip> の親の内側のレイアウトが flex な場合も <span> の高さが保持されるので、 <InputAdornment> 等で使う場合はこのルールセットは不要。 */\n.src-components-ToggleDarkButton-classes__TooltipWrapper--uqSks {\n  display: inline flow-root;\n  display: inline-block; /* TODO: Delete this line */\n}\n","",{version:3,sources:["webpack://./src/components/ToggleDarkButton/classes.css"],names:[],mappings:"AAAA,iBAAiB;AACjB,6IAA6I;AAC7I,oGAAoG;AACpG;EACE,yBAAyB;EACzB,qBAAqB,EAAE,2BAA2B;AACpD",sourcesContent:["/* TODO: Remove */\n/* NOTE: https://material-ui.com/components/tooltips/#disabled-elements のように <span> を差し込む場合、ツールチップの位置を <span> が無い場合と揃えるために <span> の高さを保持する。 */\n/* NOTE: <Tooltip> の親の内側のレイアウトが flex な場合も <span> の高さが保持されるので、 <InputAdornment> 等で使う場合はこのルールセットは不要。 */\n.TooltipWrapper {\n  display: inline flow-root;\n  display: inline-block; /* TODO: Delete this line */\n}\n"],sourceRoot:""}]),r.locals={TooltipWrapper:"src-components-ToggleDarkButton-classes__TooltipWrapper--uqSks"},t.Z=r}}]);
//# sourceMappingURL=3833.67fc574f.js.map