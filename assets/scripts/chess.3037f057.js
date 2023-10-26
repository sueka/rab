"use strict";(self.webpackChunkrap=self.webpackChunkrap||[]).push([[5030],{70971:function(e,s,n){n.r(s),n.d(s,{default:function(){return G}});var a=n(67294),r=n(64593),o=n(31753),c=n(46458),l=n(23828),t=n(68875),i=n(31941),m=n(41120),u=n(94184),C=n.n(u),A=n(5200),h=(0,a.createContext)({picking:null,targets:null,halfMove:null,pickChessman:null,releaseChessman:null});function d(e,s){return e.file===s.file&&e.rank===s.rank}var p=n(90365),b=n(93379),g=n.n(b),E=n(7795),k=n.n(E),f=n(90569),v=n.n(f),_=n(3565),q=n.n(_),y=n(19216),B=n.n(y),S=n(44589),w=n.n(S),T=n(32425),Z={};Z.styleTagTransform=w(),Z.setAttributes=q(),Z.insert=v().bind(null,"head"),Z.domAPI=k(),Z.insertStyleElement=B();g()(T.Z,Z);var D=T.Z&&T.Z.locals?T.Z.locals:void 0;const M=(0,m.Z)((e=>({Chessman:{"&$Picking:not($Dragging)":{color:e.palette.primary.A700}},Picking:{},Dragging:{}})));var x=e=>{let{chessman:s,coord:n}=e;const{picking:r,pickChessman:o}=(0,a.useContext)(h),c=M(),[{dragging:l},t,i]=(0,A.c)({type:"Chessman",collect:e=>({dragging:e.isDragging()}),item:()=>(null==o||o(s,n),{})}),m=(0,a.useMemo)((()=>C()(c.Chessman,D.Chessman,{[c.Dragging]:l,[c.Picking]:null!=r&&d(n,r.source)&&(0,p.Z)(s,r.chessman),[D.Dragging]:l})),[c.Chessman,c.Dragging,c.Picking,l,s,n,r]),u=(0,a.useMemo)((()=>C()(c.Chessman,D.Chessman,D.Preview)),[c.Chessman]),b=(0,a.useCallback)((()=>{null==r&&(null==o||o(s,n))}),[r,o,s,n]);return a.createElement(a.Fragment,null,a.createElement("span",{ref:i,className:u},s.symbol),a.createElement("span",{ref:t,className:m,onClick:b},s.symbol))},P=n(59240);var W=n(11471),N={};N.styleTagTransform=w(),N.setAttributes=q(),N.insert=v().bind(null,"head"),N.domAPI=k(),N.insertStyleElement=B();g()(W.Z,N);var O=W.Z&&W.Z.locals?W.Z.locals:void 0;const I=(0,m.Z)((e=>({Square:{"&$Square$Target":{backgroundColor:e.palette.primary[100]}},Target:{}})));var H=e=>{let{children:s,coord:n}=e;const{picking:r,targets:o,halfMove:c,releaseChessman:l}=(0,a.useContext)(h),t=I(),i=(0,a.useMemo)((()=>{var e;return null!==(e=null==o?void 0:o.some((e=>d(n,e))))&&void 0!==e&&e}),[n,o]),[,m]=(0,P.L)({accept:"Chessman",drop(){null!=r&&(i?null==c||c(r.chessman,r.source,n):null==l||l())}}),u=(0,a.useMemo)((()=>function(e){let{file:s,rank:n}=e;return s%2==n%2?"black":"white"}(n)),[n]),A=(0,a.useMemo)((()=>C()(t.Square,O.Square,{[O.White]:"white"===u,[O.Black]:"black"===u,[t.Target]:i})),[t.Square,t.Target,u,i]),p=(0,a.useCallback)((()=>{null!=r&&(i?null==c||c(r.chessman,r.source,n):null==l||l())}),[c,r,n,l,i]);return a.createElement("div",{ref:m,className:A,onClick:p},s)},R=n(1617),U={};U.styleTagTransform=w(),U.setAttributes=q(),U.insert=v().bind(null,"head"),U.domAPI=k(),U.insertStyleElement=B();g()(R.Z,U);var Y=R.Z&&R.Z.locals?R.Z.locals:void 0;const $=[1,2,3,4,5,6,7,8],z=[8,7,6,5,4,3,2,1],F={resetBoard:i.iH};var J=(0,c.$j)((e=>{let{chess:{board:s}}=e;return{board:s}}),F)((e=>{let{board:s,resetBoard:n}=e;return(0,a.useEffect)((()=>{n()}),[n]),a.createElement("table",{className:Y.ChessboardTable,dir:"ltr"},a.createElement("tbody",null,z.map((e=>a.createElement("tr",{key:e},$.map((n=>{const r=new t.Z({file:n,rank:e}),o=s.chessmen.get(r);return a.createElement("td",{key:n,className:Y.ChessboardTd},a.createElement(H,{coord:r},void 0!==o?a.createElement(x,{chessman:o,coord:r}):null))})))))))})),j=n(13833),X=(0,n(85315).vU)({chess:{id:"src.components.App.ChessPage.chess",defaultMessage:"Chess"}});var G=(0,j.D)((()=>{const{formatMessage:e}=(0,o.Z)(),s=(0,c.v9)((e=>e.chess.picking)),n=(0,c.v9)((e=>e.chess.targets)),t=(0,c.I0)();return a.createElement(a.Fragment,null,a.createElement(r.Z,{title:e(X.chess)}),a.createElement(h.Provider,{value:{picking:s,targets:n,halfMove:(0,l.qC)(t,i.p4),pickChessman:(0,l.qC)(t,i.Ns),releaseChessman:(0,l.qC)(t,i.Yu)}},a.createElement(J,null)))}))},32425:function(e,s,n){var a=n(87537),r=n.n(a),o=n(23645),c=n.n(o)()(r());c.push([e.id,'.src-components-Chessboard-Chessman-classes__Chessman--ymJCi {\n  font-family: "Apple Symbols", sans-serif;\n  color: #222;\n}\n\n.src-components-Chessboard-Chessman-classes__Chessman--ymJCi.src-components-Chessboard-Chessman-classes__Dragging--gMG9R {\n  opacity: 0.5;\n}\n\n/* TODO: in a little more normal way */\n.src-components-Chessboard-Chessman-classes__Chessman--ymJCi.src-components-Chessboard-Chessman-classes__Preview--Dk6Zm {\n  position: absolute;\n  z-index: -1;\n}\n',"",{version:3,sources:["webpack://./src/components/Chessboard/Chessman/classes.css"],names:[],mappings:"AAAA;EACE,wCAAwC;EACxC,WAAW;AACb;;AAEA;EACE,YAAY;AACd;;AAEA,sCAAsC;AACtC;EACE,kBAAkB;EAClB,WAAW;AACb",sourcesContent:['.Chessman {\n  font-family: "Apple Symbols", sans-serif;\n  color: #222;\n}\n\n.Chessman.Dragging {\n  opacity: 0.5;\n}\n\n/* TODO: in a little more normal way */\n.Chessman.Preview {\n  position: absolute;\n  z-index: -1;\n}\n'],sourceRoot:""}]),c.locals={Chessman:"src-components-Chessboard-Chessman-classes__Chessman--ymJCi",Dragging:"src-components-Chessboard-Chessman-classes__Dragging--gMG9R",Preview:"src-components-Chessboard-Chessman-classes__Preview--Dk6Zm"},s.Z=c},11471:function(e,s,n){var a=n(87537),r=n.n(a),o=n(23645),c=n.n(o)()(r());c.push([e.id,".src-components-Chessboard-Square-classes__Square--MHD9B {\n  height: 32px;\n  width: 32px;\n  font-size: 20px; /* of chessman; FIXME */\n  display: flex;\n  align-items: center;\n  justify-content: center;\n\n  --white-square-color: white;\n  --black-square-color: #c0c0c0;\n}\n\n/* NOTE: できれば .Square.White にしたいが、そうすると postcss-css-variables がうまく動作しない。 */\n.src-components-Chessboard-Square-classes__White--fufbm.src-components-Chessboard-Square-classes__Square--MHD9B {\n  background-color: white;\n  background-color: var(--white-square-color);\n}\n\n.src-components-Chessboard-Square-classes__Black--VEuUO.src-components-Chessboard-Square-classes__Square--MHD9B {\n  background-color: #c0c0c0;\n  background-color: var(--black-square-color);\n}\n","",{version:3,sources:["webpack://./src/components/Chessboard/Square/classes.css"],names:[],mappings:"AAAA;EACE,YAAY;EACZ,WAAW;EACX,eAAe,EAAE,uBAAuB;EACxC,aAAa;EACb,mBAAmB;EACnB,uBAAuB;;EAEvB,2BAA2B;EAC3B,6BAA6B;AAC/B;;AAEA,0EAA0E;AAC1E;EACE,uBAA2C;EAA3C,2CAA2C;AAC7C;;AAEA;EACE,yBAA2C;EAA3C,2CAA2C;AAC7C",sourcesContent:[".Square {\n  height: 32px;\n  width: 32px;\n  font-size: 20px; /* of chessman; FIXME */\n  display: flex;\n  align-items: center;\n  justify-content: center;\n\n  --white-square-color: white;\n  --black-square-color: #c0c0c0;\n}\n\n/* NOTE: できれば .Square.White にしたいが、そうすると postcss-css-variables がうまく動作しない。 */\n.White.Square {\n  background-color: var(--white-square-color);\n}\n\n.Black.Square {\n  background-color: var(--black-square-color);\n}\n"],sourceRoot:""}]),c.locals={Square:"src-components-Chessboard-Square-classes__Square--MHD9B",White:"src-components-Chessboard-Square-classes__White--fufbm",Black:"src-components-Chessboard-Square-classes__Black--VEuUO"},s.Z=c},1617:function(e,s,n){var a=n(87537),r=n.n(a),o=n(23645),c=n.n(o)()(r());c.push([e.id,".src-components-Chessboard-classes__ChessboardTable--s9Dl2 {\n  border-collapse: collapse;\n}\n\n.src-components-Chessboard-classes__ChessboardTd--hTy9c {\n  padding: 0;\n}\n","",{version:3,sources:["webpack://./src/components/Chessboard/classes.css"],names:[],mappings:"AAAA;EACE,yBAAyB;AAC3B;;AAEA;EACE,UAAU;AACZ",sourcesContent:[".ChessboardTable {\n  border-collapse: collapse;\n}\n\n.ChessboardTd {\n  padding: 0;\n}\n"],sourceRoot:""}]),c.locals={ChessboardTable:"src-components-Chessboard-classes__ChessboardTable--s9Dl2",ChessboardTd:"src-components-Chessboard-classes__ChessboardTd--hTy9c"},s.Z=c}}]);
//# sourceMappingURL=chess.3037f057.js.map