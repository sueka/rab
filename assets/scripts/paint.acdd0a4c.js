(self.webpackChunkreact_app_prototype=self.webpackChunkreact_app_prototype||[]).push([[962],{71289:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return ee}});var a=t(67294),l=t(64593),r=t(31753),u=t(72152),c=t(63038),o=t.n(c),s=t(282),i=t(64436),f=t(30553),v=t(96019),h=t(40074),p=t(67162),d=t(97127),C=t(9192),m=t(41120),E=t(94184),g=t.n(E),b=t(17109),y=t(88001),Z=t(30677),k=t(34575),x=t.n(k),w=t(93913),A=t.n(w),P=t(2205),R=t.n(P),_=t(78585),O=t.n(_),S=t(29754),B=t.n(S);function Y(e){var n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var t,a=B()(e);if(n){var l=B()(this).constructor;t=Reflect.construct(a,arguments,l)}else t=a.apply(this,arguments);return O()(this,t)}}var D=function(e){R()(t,e);var n=Y(t);function t(e){var a,l=e.red,r=e.green,u=e.blue,c=e.alpha;return x()(this,t),(a=n.call(this)).red=l,a.green=r,a.blue=u,a.alpha=c,a}return A()(t,[{key:"hashCode",value:function(){var e=0;return e=31*(e=31*(e=31*(e=31*e+this.red.hashCode())+this.green.hashCode())+this.blue.hashCode())+this.alpha.hashCode()}}]),t}(t(18982).Z);function M(e,n){var t=e.x,a=e.y,l=n.getImageData(t,a,1,1),r=o()(l.data,4),u=r[0],c=r[1],s=r[2],i=r[3];return new D({red:u,green:c,blue:s,alpha:i})}var q=t(93379),T=t.n(q),X=t(14830),I={insert:"head",singleton:!1},U=(T()(X.Z,I),X.Z.locals||{}),W=(0,m.Z)({Canvas:function(e){return{width:e.width,height:e.height}}}),F=(0,a.forwardRef)((function(e,n){var t=e.width,l=e.height,r=e.lineWidth,u=e.context,c=e.tool,s=(0,a.useState)(!1),i=o()(s,2),f=i[0],v=i[1],h=(0,a.useState)(null),p=o()(h,2),d=p[0],C=p[1],m=(0,a.useRef)(null),E=(0,Z.Z)(n,m),k=W({width:t,height:l}),x=(0,a.useMemo)((function(){return g()(k.Canvas,U.Canvas)}),[k.Canvas]),w=(0,y.Z)().dpr;(0,a.useEffect)((function(){null!=u&&null!==m.current&&null!==w&&(m.current.width=w*t,m.current.height=w*l,u.scale(w,w))}),[t,l,u,m,w]);var A=(0,a.useCallback)((function(e){"pen"===c&&((0,b.N)(d),v(!0),C({x:e.nativeEvent.offsetX,y:e.nativeEvent.offsetY}))}),[c,d]),P=(0,a.useCallback)((function(e){f&&((0,b.s)(u),(0,b.s)(d),u.lineWidth=r*e.pressure,u.lineJoin="round",u.beginPath(),u.moveTo(d.x,d.y),u.lineTo(e.nativeEvent.offsetX,e.nativeEvent.offsetY),u.stroke(),C({x:e.nativeEvent.offsetX,y:e.nativeEvent.offsetY}))}),[r,u,f,d]),R=(0,a.useCallback)((function(){v(!1),C(null)}),[]),_=(0,a.useCallback)((function(){v(!1),C(null)}),[]),O=(0,a.useCallback)((function(e){"bucket"===c&&((0,b.s)(u),function(e,n,t,a){(0,b.s)(a);var l=[],r=M(e,a);for(l.push(e);0!==l.length;){var u=l.shift();(0,b.s)(u);var c=M(u,a);r.equals(c)&&(a.fillRect(u.x,u.y,1,1),u.x>0&&l.push({x:u.x-1,y:u.y}),u.y>0&&l.push({x:u.x,y:u.y-1}),u.x<n-1&&l.push({x:u.x+1,y:u.y}),u.y<t-1&&l.push({x:u.x,y:u.y+1}))}}({x:e.nativeEvent.offsetX,y:e.nativeEvent.offsetY},t,l,u))}),[t,l,u,c]);return a.createElement("canvas",{ref:E,className:x,width:t,height:l,onPointerDown:A,onPointerMove:P,onPointerUp:R,onPointerLeave:_,onClick:O})})),N=t(74540),J=t(20590),L=t(5391),j=t(26663),z=function(e){var n=e.value,t=e.onChange;return a.createElement(j.Z,{orientation:"vertical",exclusive:!0,value:n,onChange:t},a.createElement(L.Z,{value:"pen"},a.createElement(N.Z,null)),a.createElement(L.Z,{value:"bucket"},a.createElement(J.Z,null)))},G=t(85315),H=(0,G.vU)({clear:{id:"src.components.Paint.clear",defaultMessage:"Clear"}}),K=(0,C.gB)("butt","round","square"),Q=(0,C.gB)("pen","bucket"),V=function(){var e=(0,a.useState)(),n=o()(e,2),t=n[0],l=n[1],r=(0,a.useState)("round"),u=o()(r,2),c=u[0],C=u[1],m=(0,a.useState)("pen"),E=o()(m,2),g=E[0],b=E[1],y=(0,a.useCallback)((function(e){l(null==e?void 0:e.getContext("2d"))}),[]),Z=(0,a.useCallback)((function(){null==t||t.clearRect(0,0,320,320)}),[t]),k=(0,a.useCallback)((function(e,n){Q(n)&&b(n)}),[]),x=(0,a.useCallback)((function(e){K(e.target.value)&&C(e.target.value)}),[]);return(0,a.useEffect)((function(){null!=t&&(t.lineCap=c)}),[t,c]),a.createElement(a.Fragment,null,a.createElement(F,{width:320,height:320,lineWidth:10,ref:y,context:t,tool:g}),a.createElement(s.Z,{onClick:Z},a.createElement(d.Z,H.clear)),a.createElement(z,{value:g,onChange:k}),a.createElement(i.Z,{disabled:"pen"!==g},a.createElement(v.Z,null,"line cap"),a.createElement(p.Z,{name:"lineCap",value:c,onChange:x},a.createElement(f.Z,{value:"butt",label:"butt",control:a.createElement(h.Z,null)}),a.createElement(f.Z,{value:"round",label:"round",control:a.createElement(h.Z,null)}),a.createElement(f.Z,{value:"square",label:"square",control:a.createElement(h.Z,null)}))))},$=(0,G.vU)({paint:{id:"src.components.App.PaintPage.paint",defaultMessage:"Paint"}}),ee=(0,u.D)((function(){var e=(0,r.Z)().formatMessage;return a.createElement(a.Fragment,null,a.createElement(l.Z,{title:e($.paint)}),a.createElement(V,null))}))},14830:function(e,n,t){"use strict";var a=t(94015),l=t.n(a),r=t(23645),u=t.n(r)()(l());u.push([e.id,".src-components-Paint-Canvas-classes__Canvas--10YIO {\n  background-color: white; /* TODO */\n}\n","",{version:3,sources:["webpack://./src/components/Paint/Canvas/classes.css"],names:[],mappings:"AAAA;EACE,uBAAuB,EAAE,SAAS;AACpC",sourcesContent:[".Canvas {\n  background-color: white; /* TODO */\n}\n"],sourceRoot:""}]),u.locals={Canvas:"src-components-Paint-Canvas-classes__Canvas--10YIO"},n.Z=u}}]);
//# sourceMappingURL=paint.acdd0a4c.js.map