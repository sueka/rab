"use strict";(self.webpackChunkrap=self.webpackChunkrap||[]).push([[9007],{71374:function(e,n,t){t.r(n),t.d(n,{default:function(){return ce}});var l=t(66283),r=t(62822),s=t(50998),o=t(95757),a=t(8286),i=t(41120),c=t(67294),u=t(64593),d=t(31753),p=t(97127),m=t(67154),A=t.n(m),f=t(94184),E=t.n(f),v=t(20637),h=t(2804),g=t(46121),C=t(44901),b=t(99676),Z=t(17326),B=t(25665),k=t(25818),w=t(93379),F=t.n(w),S=t(7795),x=t.n(S),y=t(90569),_=t.n(y),M=t(3565),T=t.n(M),P=t(19216),R=t.n(P),U=t(44589),L=t.n(U),I=t(30964),W={};W.styleTagTransform=L(),W.setAttributes=T(),W.insert=_().bind(null,"head"),W.domAPI=x(),W.insertStyleElement=R();F()(I.Z,W);var N=I.Z&&I.Z.locals?I.Z.locals:void 0;const q=(0,i.Z)({Pre:{"&$Pre":{direction:"ltr",width:e=>{let{startAdornmentWidth:n,endAdornmentWidth:t}=e;return`calc(100% - ${(null!=n?n:0)+(null!=t?t:0)}px)`},marginLeft:e=>{let{direction:n,startAdornmentWidth:t,endAdornmentWidth:l}=e;return"rtl"===n?l:t},marginRight:e=>{let{direction:n,startAdornmentWidth:t,endAdornmentWidth:l}=e;return"rtl"===n?t:l}}},TextArea:{"&$TextArea":{direction:"ltr"}}},{flip:!1});function z(e){if(null==e)return null;const{marginLeft:n,marginRight:t}=globalThis.getComputedStyle(e);return e.offsetWidth+parseFloat(n)+parseFloat(t)}var H=e=>{let{lightTheme:n="atom-one-light",darkTheme:t="atom-one-dark",className:l,InputProps:{classes:r,ref:s,...o}={},inputProps:{spellCheck:i,ref:d,...p}={},preProps:m,value:f,onChange:w,...F}=e;const{inputMultiline:S,...x}=null!=r?r:{},{dir:y}=(0,c.useContext)(b.Z),[_]=(0,h.FV)(B.Z),{defaultDark:M}=(0,c.useContext)(C.Z),[T,P]=(0,c.useState)(null),[R,U]=(0,c.useState)(null),[L,I]=(0,c.useState)(null),W=q({direction:null!=y?y:void 0,startAdornmentWidth:null!=R?R:void 0,endAdornmentWidth:null!=L?L:void 0}),H=(0,c.useMemo)((()=>E()(l,N.Container)),[l]),Y=(0,c.useMemo)((()=>E()(W.TextArea,N.TextArea,S)),[W.TextArea,S]),D=(0,c.useMemo)((()=>E()(W.Pre,N.Pre,null==m?void 0:m.className)),[W.Pre,null==m?void 0:m.className]),O=(0,c.useRef)(null),$=(0,Z.Z)(null!=s?s:null,O),j=(0,c.useRef)(null),V=(0,Z.Z)(null!=d?d:null,j);(0,c.useEffect)((()=>{var e,n;const t=null===(e=O.current)||void 0===e?void 0:e.querySelector(':scope > [class*="MuiInputAdornment-positionStart"]'),l=null===(n=O.current)||void 0===n?void 0:n.querySelector(':scope > [class*="MuiInputAdornment-positionEnd"]');U(z(t)),I(z(l))}),[O]),(0,c.useEffect)((()=>{var e,n;P(v.Z.highlightAuto(null!==(e=null===(n=j.current)||void 0===n?void 0:n.value)&&void 0!==e?e:"").value)}),[j]);const G=(0,c.useCallback)((e=>{var n;null==w||w(e),P(v.Z.highlightAuto(null!==(n=void 0===w?f:void 0)&&void 0!==n?n:e.target.value).value)}),[f,w]);return(0,g.s)(M),c.createElement("div",{className:H},c.createElement(u.q,null,c.createElement("link",{rel:"stylesheet",href:k.Z`/assets/stylesheets/highlight.js/styles/${(null!=_?_:M)?t:n}.css`})),c.createElement("pre",{className:D,dangerouslySetInnerHTML:{__html:null!=T?T:""}}),c.createElement(a.Z,A()({fullWidth:!0,multiline:!0,value:f,onChange:G,InputProps:{classes:{inputMultiline:Y,...x},ref:$,...o},inputProps:{spellCheck:null!=i&&i,ref:V,...p}},F)))},Y=t(38606),D=t(45733),O=t(44140),$=t(13258),j=t(3380),V=t(65031),G=t(34428),J=t(94546),K=t(46458),Q=t(85315),X=(0,Q.vU)({typeWithYourVoice:{id:"src.components.MicSwitch.typeWithYourVoice",defaultMessage:"Type with your voice…"},stop:{id:"src.components.MicSwitch.stop",defaultMessage:"Stop"},speechRecognitionErrorOccurred:{id:"src.components.MicSwitch.speechRecognitionErrorOccurred",defaultMessage:"Speech recognition error occurred: { error }"}});var ee=e=>{let{inputFor:n,onResult:t,fallback:l}=e;const{formatMessage:r}=(0,d.Z)(),s=(0,K.v9)((e=>e.localeSelector.locale)),[o,a]=(0,c.useState)(!1),i=(0,c.useMemo)((()=>"SpeechRecognition"in globalThis?new SpeechRecognition:null),[]),u=(0,c.useMemo)((()=>r(o?X.stop:X.typeWithYourVoice)),[o,r]),{enqueueSnackbar:m}=(0,J.Ds)(),f=(0,c.useCallback)((()=>{a(!0)}),[]),E=(0,c.useCallback)((()=>{a(!1)}),[]),v=(0,c.useCallback)((e=>{m(c.createElement(p.Z,A()({},X.speechRecognitionErrorOccurred,{values:{error:e.error}})),{variant:"error"})}),[m]),h=(0,c.useCallback)((e=>{t(e,Array.from(e.results).map((e=>{if(void 0===e[0])throw new Error("No speech recognition result alternatives found.");return e[0].transcript})).join(""))}),[t]);(0,c.useEffect)((()=>()=>{null==i||i.stop()}),[i]),(0,c.useEffect)((()=>{if(null!==i)return i.continuous=!0,i.interimResults=!0,i.maxAlternatives=1,i.addEventListener("start",f),i.addEventListener("end",E),i.addEventListener("error",v),i.addEventListener("result",h),()=>{i.removeEventListener("start",f),i.removeEventListener("end",E),i.removeEventListener("error",v),i.removeEventListener("result",h)}}),[i,f,E,v,h]),(0,c.useEffect)((()=>{null!==i&&(i.stop(),i.lang=s)}),[i,s]);const g=(0,c.useCallback)(((e,n)=>{null!==i&&(a(n),n?i.start():i.stop())}),[i]),[C,b]=(0,c.useState)(!0);return(0,c.useEffect)((()=>{b(null===n.current||n.current.disabled)})),(0,c.useEffect)((()=>{null!==i&&C&&i.abort()}),[C,i]),null===i&&void 0!==l?l:c.createElement(j.ZP,{title:u,disableFocusListener:C,disableHoverListener:C,disableTouchListener:C},c.createElement("span",null,c.createElement($.Z,{disabled:C,color:"default",icon:c.createElement(G.Z,null),checkedIcon:c.createElement(V.Z,null),checked:o,onChange:g})))},ne=t(13833),te=t(16787),le=(0,Q.vU)({formControls:{id:"src.components.App.FormControlsPage.formControls",defaultMessage:"Form controls"}});const re=()=>{const[e,n]=(0,c.useState)(""),t=(0,c.useRef)(null),r=(0,c.useCallback)((e=>{n(e.target.value)}),[]);return c.createElement(a.Z,{label:"label",value:e,onChange:r,inputRef:t,InputProps:{endAdornment:c.createElement(l.Z,{position:"end"},c.createElement(Y.Z,{inputFor:t}))}})},se=()=>{var e,n,t,r;const{dir:s}=(0,c.useContext)(b.Z),[o,i]=(0,c.useState)(""),u=(0,c.useRef)(null),d=null===(e=u.current)||void 0===e?void 0:e.scrollWidth,p=null===(n=u.current)||void 0===n?void 0:n.scrollHeight,m=null===(t=u.current)||void 0===t?void 0:t.offsetWidth,A=null===(r=u.current)||void 0===r?void 0:r.offsetHeight,f=(0,c.useCallback)((e=>{i(e.target.value)}),[]),E=(0,c.useCallback)(((e,n)=>{if(null!==u.current)switch(i(n),(0,g.s)(d),(0,g.s)(p),(0,g.s)(m),(0,g.s)(A),u.current.scrollTop=p-A,s){case"ltr":u.current.scrollLeft=d-m;break;case"rtl":u.current.scrollLeft=-(d-m)}}),[s,u,d,p,m,A]);return c.createElement(a.Z,{label:"label",value:o,onChange:f,inputRef:u,InputProps:{endAdornment:c.createElement(l.Z,{position:"end"},c.createElement(ee,{inputFor:u,onResult:E,fallback:null}))}})},oe=()=>{var e,n,t,r;const{dir:s}=(0,c.useContext)(b.Z),[o,i]=(0,c.useState)(""),u=(0,c.useRef)(null),d=null===(e=u.current)||void 0===e?void 0:e.scrollWidth,p=null===(n=u.current)||void 0===n?void 0:n.scrollHeight,m=null===(t=u.current)||void 0===t?void 0:t.offsetWidth,A=null===(r=u.current)||void 0===r?void 0:r.offsetHeight,f=(0,c.useCallback)((e=>{i(e.target.value)}),[]),E=(0,c.useCallback)(((e,n)=>{if(null!==u.current)switch(i(n),(0,g.s)(d),(0,g.s)(p),(0,g.s)(m),(0,g.s)(A),u.current.scrollTop=p-A,s){case"ltr":u.current.scrollLeft=d-m;break;case"rtl":u.current.scrollLeft=-(d-m)}}),[s,u,d,p,m,A]);return c.createElement(a.Z,{label:"label",value:o,onChange:f,inputRef:u,InputProps:{endAdornment:c.createElement(l.Z,{position:"end"},c.createElement(ee,{inputFor:u,onResult:E,fallback:null}),c.createElement(Y.Z,{inputFor:u}))}})},ae=(0,i.Z)({Image:{maxWidth:e=>{let{width:n}=e;return null!==n?n/2:void 0},maxHeight:e=>{let{height:n}=e;return null!==n?n/2:void 0}}}),ie=e=>{let{file:n}=e;const[t,l]=(0,c.useState)(null),r=(0,c.useMemo)((()=>new FileReader),[]),{width:s,height:o}=(0,te.Z)(),a=ae({width:s,height:o}),i=(0,c.useCallback)((e=>{var n;if(null!=(null===(n=e.target)||void 0===n?void 0:n.result)){if(e.target.result instanceof ArrayBuffer)throw new Error;l(e.target.result)}}),[]);return(0,c.useEffect)((()=>(r.addEventListener("load",i),()=>{r.removeEventListener("load",i)})),[r,i]),(0,c.useEffect)((()=>{if(!/^image\/[0-9A-Za-z][!#$&+-.0-9A-Z^_a-z]*$/.test(n.type))throw new Error;r.readAsDataURL(n)}),[n,r]),c.createElement("img",{src:null!=t?t:void 0,className:a.Image})};var ce=(0,ne.D)((()=>{const{formatMessage:e}=(0,d.Z)(),[n,t]=(0,c.useState)(null),a=(0,c.useCallback)((e=>{t(null!==e.target.files?Array.from(e.target.files):e.target.files)}),[]),i=(0,c.useMemo)((()=>null===n||0===n.length?c.createElement(p.Z,O.Z.noFileSelected):Array.from(n).map(((e,n)=>c.createElement(ie,{key:n,file:e})))),[n]),[m,A]=(0,c.useState)(""),f=(0,c.useCallback)((e=>{var n;A(null===(n=e.target)||void 0===n?void 0:n.value)}),[]),E=(0,c.useRef)(null);return c.createElement(c.Fragment,null,c.createElement(u.Z,{title:e(le.formControls)}),c.createElement(r.Z,null,c.createElement(s.Z,null,c.createElement(o.Z,null,c.createElement(D.Z,{accept:"image/*",multiple:!0,resultMessage:i,onChange:a}))),c.createElement(s.Z,null,c.createElement(o.Z,null,c.createElement(re,null))),c.createElement(s.Z,null,c.createElement(o.Z,null,c.createElement(se,null))),c.createElement(s.Z,null,c.createElement(o.Z,null,c.createElement(oe,null))),c.createElement(s.Z,null,c.createElement(o.Z,null,c.createElement(H,{label:"code",value:m,onChange:f,InputProps:{endAdornment:c.createElement(l.Z,{position:"end"},c.createElement(Y.Z,{inputFor:E}))},inputProps:{ref:E}})))))}))},38606:function(e,n,t){t.d(n,{Z:function(){return v}});var l=t(67154),r=t.n(l),s=t(17812),o=t(3380),a=t(92680),i=t(20640),c=t.n(i),u=t(94546),d=t(67294),p=t(31753),m=t(97127),A=t(46121),f=(0,t(85315).vU)({textCopied:{id:"src.components.CopyTextButton.textCopied",defaultMessage:"Text copied."},copyText:{id:"src.components.CopyTextButton.copyText",defaultMessage:"Copy text"}});const E=e=>{let{style:n,...t}=e;if(void 0===n)return d.createElement(a.Z,r()({style:{transform:"scaleY(-1)"}},t));const{transform:l,...s}=n;if(void 0!==l)throw new Error;return d.createElement(a.Z,r()({style:{transform:"scaleY(-1)",...s}},t))};var v=e=>{let{inputFor:n}=e;const{formatMessage:t}=(0,p.Z)(),{enqueueSnackbar:l}=(0,u.Ds)(),r=(0,d.useCallback)((()=>{(0,A.s)(n.current),""!==n.current.value&&(c()(n.current.value),l(d.createElement(m.Z,f.textCopied)))}),[l,n]),[a,i]=(0,d.useState)(!0);return(0,d.useEffect)((()=>{i(null===n.current||""===n.current.value||n.current.disabled)})),d.createElement(o.ZP,{title:t(f.copyText),disableFocusListener:a,disableHoverListener:a,disableTouchListener:a},d.createElement("span",null,d.createElement(s.Z,{onClick:r,disabled:a},d.createElement(E,null))))}},45733:function(e,n,t){t.d(n,{Z:function(){return M}});var l=t(67154),r=t.n(l),s=t(282),o=t(96019),a=t(51206),i=t.n(a),c=t(94184),u=t.n(c),d=t(67294),p=t(97127),m=t(46121),A=t(93379),f=t.n(A),E=t(7795),v=t.n(E),h=t(90569),g=t.n(h),C=t(3565),b=t.n(C),Z=t(19216),B=t.n(Z),k=t(44589),w=t.n(k),F=t(58995),S={};S.styleTagTransform=w(),S.setAttributes=b(),S.insert=g().bind(null,"head"),S.domAPI=v(),S.insertStyleElement=B();f()(F.Z,S);var x=F.Z&&F.Z.locals?F.Z.locals:void 0,y=t(44140);const _=i().getParser(navigator.userAgent).is("Safari");var M=e=>{var n,t;let{className:l,disabled:a,multiple:i,onClick:c,onChange:A,buttonLabel:f=d.createElement(p.Z,y.Z.browse),resultMessage:E,classes:v,component:h=o.Z,ButtonProps:g,...C}=e;const b=(0,d.useMemo)((()=>u()(l,null==v?void 0:v.root,x.FileUpload,{[x.Safari]:_})),[l,null==v?void 0:v.root]),Z=(0,d.useMemo)((()=>u()(null==v?void 0:v.button,x.Button,null==g?void 0:g.className)),[null==v?void 0:v.button,null==g?void 0:g.className]),B=(0,d.useRef)(null),k=null!==(n=null===(t=B.current)||void 0===t?void 0:t.files)&&void 0!==n?n:null,w=(0,d.useMemo)((()=>{if(null==E)return null===k||0===k.length?d.createElement(p.Z,y.Z.noFileSelected):1===k.length?k[0].name:d.createElement(p.Z,r()({},y.Z.nFilesSelected,{values:{n:k.length}}))}),[E,k]),F=(0,d.useCallback)((()=>{(0,m.s)(B.current),B.current.dispatchEvent(new MouseEvent("click"))}),[B]),S=(0,d.useCallback)((e=>{null==c||c(e),e.isDefaultPrevented()||F(e)}),[c,F]);return d.createElement(h,{className:b,tabIndex:_?-1:0},d.createElement(s.Z,r()({disabled:a,onClick:S},g,{className:Z,tabIndex:-1}),f),null!=E?E:w,d.createElement("input",r()({className:x.Input,type:"file",disabled:a,multiple:i,onChange:A,ref:B},C)))}},44140:function(e,n,t){var l=t(85315);n.Z=(0,l.vU)({browse:{id:"src.components.FileUpload.browse",defaultMessage:"Browse…"},noFileSelected:{id:"src.components.FileUpload.noFileSelected",defaultMessage:"No file selected."},nFilesSelected:{id:"src.components.FileUpload.nFilesSelected",defaultMessage:"{ n } files selected."}})},30964:function(e,n,t){var l=t(87537),r=t.n(l),s=t(23645),o=t.n(s)()(r());o.push([e.id,".src-components-CodeField-classes__Container--tZbmS {\n  position: relative;\n}\n\n.src-components-CodeField-classes__Pre--hgBRY {\n  /* font-family: monospace; */\n  font-size: 16px;\n  line-height: 1.1876em;\n  margin: 0;\n  padding: 18.5px 14px;\n  position: absolute;\n  text-align: left;\n  white-space: pre-wrap;\n  /* width: 100%; */\n  word-break: break-word;\n}\n\n.src-components-CodeField-classes__TextArea--kbzwS {\n  font-family: monospace;\n  font-size: 16px;\n  /* line-height: 1.1876em; */\n  /* margin: 0; */\n  -webkit-text-fill-color: transparent;\n  white-space: pre-wrap;\n  /* width: 100%; */\n  /* word-break: break-word; */\n}\n","",{version:3,sources:["webpack://./src/components/CodeField/classes.css"],names:[],mappings:"AAAA;EACE,kBAAkB;AACpB;;AAEA;EACE,4BAA4B;EAC5B,eAAe;EACf,qBAAqB;EACrB,SAAS;EACT,oBAAoB;EACpB,kBAAkB;EAClB,gBAAgB;EAChB,qBAAqB;EACrB,iBAAiB;EACjB,sBAAsB;AACxB;;AAEA;EACE,sBAAsB;EACtB,eAAe;EACf,2BAA2B;EAC3B,eAAe;EACf,oCAAoC;EACpC,qBAAqB;EACrB,iBAAiB;EACjB,4BAA4B;AAC9B",sourcesContent:[".Container {\n  position: relative;\n}\n\n.Pre {\n  /* font-family: monospace; */\n  font-size: 16px;\n  line-height: 1.1876em;\n  margin: 0;\n  padding: 18.5px 14px;\n  position: absolute;\n  text-align: left;\n  white-space: pre-wrap;\n  /* width: 100%; */\n  word-break: break-word;\n}\n\n.TextArea {\n  font-family: monospace;\n  font-size: 16px;\n  /* line-height: 1.1876em; */\n  /* margin: 0; */\n  -webkit-text-fill-color: transparent;\n  white-space: pre-wrap;\n  /* width: 100%; */\n  /* word-break: break-word; */\n}\n"],sourceRoot:""}]),o.locals={Container:"src-components-CodeField-classes__Container--tZbmS",Pre:"src-components-CodeField-classes__Pre--hgBRY",TextArea:"src-components-CodeField-classes__TextArea--kbzwS"},n.Z=o},58995:function(e,n,t){var l=t(87537),r=t.n(l),s=t(23645),o=t.n(s)()(r());o.push([e.id,".src-components-FileUpload-classes__FileUpload--zcA60 {\n  display: inline-block; /* TODO: polyfill */\n  display: inline flow-root;\n  cursor: pointer;\n}\n\n.src-components-FileUpload-classes__FileUpload--zcA60.src-components-FileUpload-classes__Safari--xNS3H:focus {\n  outline: none;\n}\n\n.src-components-FileUpload-classes__Button--_x92h.src-components-FileUpload-classes__Button--_x92h {\n  text-transform: none;\n  cursor: unset;\n}\n\n.src-components-FileUpload-classes__Input--HY1r1 {\n  display: none;\n}\n","",{version:3,sources:["webpack://./src/components/FileUpload/classes.css"],names:[],mappings:"AAAA;EACE,qBAAqB,EAAE,mBAAmB;EAC1C,yBAAyB;EACzB,eAAe;AACjB;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,oBAAoB;EACpB,aAAa;AACf;;AAEA;EACE,aAAa;AACf",sourcesContent:[".FileUpload {\n  display: inline-block; /* TODO: polyfill */\n  display: inline flow-root;\n  cursor: pointer;\n}\n\n.FileUpload.Safari:focus {\n  outline: none;\n}\n\n.Button.Button {\n  text-transform: none;\n  cursor: unset;\n}\n\n.Input {\n  display: none;\n}\n"],sourceRoot:""}]),o.locals={FileUpload:"src-components-FileUpload-classes__FileUpload--zcA60",Safari:"src-components-FileUpload-classes__Safari--xNS3H",Button:"src-components-FileUpload-classes__Button--_x92h",Input:"src-components-FileUpload-classes__Input--HY1r1"},n.Z=o}}]);
//# sourceMappingURL=formControls.67fc574f.js.map