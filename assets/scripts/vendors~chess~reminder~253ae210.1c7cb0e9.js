(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{364:function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var r=n(0),i="undefined"!=typeof window?r.useLayoutEffect:r.useEffect},367:function(e,t,n){"use strict";function r(e,t,n,r){var i=n?n.call(r,e,t):void 0;if(void 0!==i)return!!i;if(e===t)return!0;if("object"!=typeof e||!e||"object"!=typeof t||!t)return!1;var o=Object.keys(e),a=Object.keys(t);if(o.length!==a.length)return!1;for(var u=Object.prototype.hasOwnProperty.bind(t),c=0;c<o.length;c++){var s=o[c];if(!u(s))return!1;var l=e[s],d=t[s];if(!1===(i=n?n.call(r,l,d,s):void 0)||void 0===i&&l!==d)return!1}return!0}n.d(t,"a",(function(){return r}))},368:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var r=n(0),i=n(15),o=n(128);function a(){var e=Object(r.useContext)(o.a).dragDropManager;return Object(i.a)(null!=e,"Expected drag drop context"),e}},369:function(e,t,n){"use strict";function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function i(e){return null!==e&&"object"===r(e)&&e.hasOwnProperty("current")}n.d(t,"a",(function(){return i}))},370:function(e,t,n){"use strict";function r(e,t,n){var r=n.getRegistry(),i=r.addTarget(e,t);return[i,function(){return r.removeTarget(i)}]}function i(e,t,n){var r=n.getRegistry(),i=r.addSource(e,t);return[i,function(){return r.removeSource(i)}]}n.d(t,"b",(function(){return r})),n.d(t,"a",(function(){return i}))},371:function(e,t,n){"use strict";var r=n(364),i=n(367),o=n(0);function a(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(!(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)))return;var n=[],r=!0,i=!1,o=void 0;try{for(var a,u=e[Symbol.iterator]();!(r=(a=u.next()).done)&&(n.push(a.value),!t||n.length!==t);r=!0);}catch(e){i=!0,o=e}finally{try{r||null==u.return||u.return()}finally{if(i)throw o}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function u(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(!(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)))return;var n=[],r=!0,i=!1,o=void 0;try{for(var a,u=e[Symbol.iterator]();!(r=(a=u.next()).done)&&(n.push(a.value),!t||n.length!==t);r=!0);}catch(e){i=!0,o=e}finally{try{r||null==u.return||u.return()}finally{if(i)throw o}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function c(e,t,n){var c=u(function(e,t,n){var u=a(Object(o.useState)((function(){return t(e)})),2),c=u[0],s=u[1],l=Object(o.useCallback)((function(){var r=t(e);Object(i.a)(c,r)||(s(r),n&&n())}),[c,e,n]);return Object(r.a)(l,[]),[c,l]}(e,t,n),2),s=c[0],l=c[1];return Object(r.a)((function(){var t=e.getHandlerId();if(null!=t)return e.subscribeToStateChange(l,{handlerIds:[t]})}),[e,l]),s}n.d(t,"a",(function(){return c}))},372:function(e,t,n){"use strict";var r=n(0),i=n(15);function o(e,t){"function"==typeof e?e(t):e.current=t}function a(e,t){var n=e.ref;return Object(i.a)("string"!=typeof n,"Cannot connect React DnD to an element with an existing string ref. Please convert it to use a callback ref instead, or wrap it into a <span> or <div>. Read more: https://facebook.github.io/react/docs/more-about-refs.html#the-ref-callback-attribute"),n?Object(r.cloneElement)(e,{ref:function(e){o(n,e),o(t,e)}}):Object(r.cloneElement)(e,{ref:t})}function u(e){if("string"!=typeof e.type){var t=e.type.displayName||e.type.name||"the component";throw new Error("Only native element nodes can now be passed to React DnD connectors."+"You can either wrap ".concat(t," into a <div>, or turn it into a ")+"drag source or a drop target itself.")}}function c(e){var t={};return Object.keys(e).forEach((function(n){var i=e[n];if(n.endsWith("Ref"))t[n]=e[n];else{var o=function(e){return function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;if(!Object(r.isValidElement)(t)){var i=t;return e(i,n),i}var o=t;u(o);var c=n?function(t){return e(t,n)}:e;return a(o,c)}}(i);t[n]=function(){return o}}})),t}n.d(t,"a",(function(){return c}))},403:function(e,t,n){"use strict";var r=n(0),i=n(15),o=n(371),a=n(364),u=n(370),c=n(368),s=n(367),l=n(372),d=n(369);function f(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var g=function(){function e(t){var n=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.hooks=Object(l.a)({dropTarget:function(e,t){n.clearDropTarget(),n.dropTargetOptions=t,Object(d.a)(e)?n.dropTargetRef=e:n.dropTargetNode=e,n.reconnect()}}),this.handlerId=null,this.dropTargetRef=null,this.dropTargetOptionsInternal=null,this.lastConnectedHandlerId=null,this.lastConnectedDropTarget=null,this.lastConnectedDropTargetOptions=null,this.backend=t}var t,n,r;return t=e,(n=[{key:"reconnect",value:function(){var e=this.didHandlerIdChange()||this.didDropTargetChange()||this.didOptionsChange();e&&this.disconnectDropTarget();var t=this.dropTarget;this.handlerId&&(t?e&&(this.lastConnectedHandlerId=this.handlerId,this.lastConnectedDropTarget=t,this.lastConnectedDropTargetOptions=this.dropTargetOptions,this.unsubscribeDropTarget=this.backend.connectDropTarget(this.handlerId,t,this.dropTargetOptions)):this.lastConnectedDropTarget=t)}},{key:"receiveHandlerId",value:function(e){e!==this.handlerId&&(this.handlerId=e,this.reconnect())}},{key:"didHandlerIdChange",value:function(){return this.lastConnectedHandlerId!==this.handlerId}},{key:"didDropTargetChange",value:function(){return this.lastConnectedDropTarget!==this.dropTarget}},{key:"didOptionsChange",value:function(){return!Object(s.a)(this.lastConnectedDropTargetOptions,this.dropTargetOptions)}},{key:"disconnectDropTarget",value:function(){this.unsubscribeDropTarget&&(this.unsubscribeDropTarget(),this.unsubscribeDropTarget=void 0)}},{key:"clearDropTarget",value:function(){this.dropTargetRef=null,this.dropTargetNode=null}},{key:"connectTarget",get:function(){return this.dropTarget}},{key:"dropTargetOptions",get:function(){return this.dropTargetOptionsInternal},set:function(e){this.dropTargetOptionsInternal=e}},{key:"dropTarget",get:function(){return this.dropTargetNode||this.dropTargetRef&&this.dropTargetRef.current}}])&&f(t.prototype,n),r&&f(t,r),e}();function h(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var v=!1,p=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.targetId=null,this.internalMonitor=t.getMonitor()}var t,n,r;return t=e,(n=[{key:"receiveHandlerId",value:function(e){this.targetId=e}},{key:"getHandlerId",value:function(){return this.targetId}},{key:"subscribeToStateChange",value:function(e,t){return this.internalMonitor.subscribeToStateChange(e,t)}},{key:"canDrop",value:function(){if(!this.targetId)return!1;Object(i.a)(!v,"You may not call monitor.canDrop() inside your canDrop() implementation. Read more: http://react-dnd.github.io/react-dnd/docs/api/drop-target-monitor");try{return v=!0,this.internalMonitor.canDropOnTarget(this.targetId)}finally{v=!1}}},{key:"isOver",value:function(e){return!!this.targetId&&this.internalMonitor.isOverTarget(this.targetId,e)}},{key:"getItemType",value:function(){return this.internalMonitor.getItemType()}},{key:"getItem",value:function(){return this.internalMonitor.getItem()}},{key:"getDropResult",value:function(){return this.internalMonitor.getDropResult()}},{key:"didDrop",value:function(){return this.internalMonitor.didDrop()}},{key:"getInitialClientOffset",value:function(){return this.internalMonitor.getInitialClientOffset()}},{key:"getInitialSourceClientOffset",value:function(){return this.internalMonitor.getInitialSourceClientOffset()}},{key:"getSourceClientOffset",value:function(){return this.internalMonitor.getSourceClientOffset()}},{key:"getClientOffset",value:function(){return this.internalMonitor.getClientOffset()}},{key:"getDifferenceFromInitialOffset",value:function(){return this.internalMonitor.getDifferenceFromInitialOffset()}}])&&h(t.prototype,n),r&&h(t,r),e}();function y(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(!(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)))return;var n=[],r=!0,i=!1,o=void 0;try{for(var a,u=e[Symbol.iterator]();!(r=(a=u.next()).done)&&(n.push(a.value),!t||n.length!==t);r=!0);}catch(e){i=!0,o=e}finally{try{r||null==u.return||u.return()}finally{if(i)throw o}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function b(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(!(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)))return;var n=[],r=!0,i=!1,o=void 0;try{for(var a,u=e[Symbol.iterator]();!(r=(a=u.next()).done)&&(n.push(a.value),!t||n.length!==t);r=!0);}catch(e){i=!0,o=e}finally{try{r||null==u.return||u.return()}finally{if(i)throw o}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function O(e){var t=Object(r.useRef)(e);t.current=e,Object(i.a)(null!=e.accept,"accept must be defined");var n,s=b((n=Object(c.a)(),[Object(r.useMemo)((function(){return new p(n)}),[n]),Object(r.useMemo)((function(){return new g(n.getBackend())}),[n])]),2),l=s[0],d=s[1];!function(e,t,n){var i=Object(c.a)(),o=Object(r.useMemo)((function(){return{canDrop:function(){var n=e.current.canDrop;return!n||n(t.getItem(),t)},hover:function(){var n=e.current.hover;n&&n(t.getItem(),t)},drop:function(){var n=e.current.drop;if(n)return n(t.getItem(),t)}}}),[t]);Object(a.a)((function(){var r=y(Object(u.b)(e.current.accept,o,i),2),a=r[0],c=r[1];return t.receiveHandlerId(a),n.receiveHandlerId(a),c}),[t,n])}(t,l,d);var f=Object(o.a)(l,t.current.collect||function(){return{}},(function(){return d.reconnect()})),h=Object(r.useMemo)((function(){return d.hooks.dropTarget()}),[d]);return Object(a.a)((function(){d.dropTargetOptions=e.options||null,d.reconnect()}),[e.options]),[f,h]}n.d(t,"a",(function(){return O}))},405:function(e,t,n){"use strict";var r=n(0),i=n(15),o=n(371),a=n(364),u=n(370),c=n(368);function s(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var l=!1,d=!1,f=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.sourceId=null,this.internalMonitor=t.getMonitor()}var t,n,r;return t=e,(n=[{key:"receiveHandlerId",value:function(e){this.sourceId=e}},{key:"getHandlerId",value:function(){return this.sourceId}},{key:"canDrag",value:function(){Object(i.a)(!l,"You may not call monitor.canDrag() inside your canDrag() implementation. Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source-monitor");try{return l=!0,this.internalMonitor.canDragSource(this.sourceId)}finally{l=!1}}},{key:"isDragging",value:function(){if(!this.sourceId)return!1;Object(i.a)(!d,"You may not call monitor.isDragging() inside your isDragging() implementation. Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source-monitor");try{return d=!0,this.internalMonitor.isDraggingSource(this.sourceId)}finally{d=!1}}},{key:"subscribeToStateChange",value:function(e,t){return this.internalMonitor.subscribeToStateChange(e,t)}},{key:"isDraggingSource",value:function(e){return this.internalMonitor.isDraggingSource(e)}},{key:"isOverTarget",value:function(e,t){return this.internalMonitor.isOverTarget(e,t)}},{key:"getTargetIds",value:function(){return this.internalMonitor.getTargetIds()}},{key:"isSourcePublic",value:function(){return this.internalMonitor.isSourcePublic()}},{key:"getSourceId",value:function(){return this.internalMonitor.getSourceId()}},{key:"subscribeToOffsetChange",value:function(e){return this.internalMonitor.subscribeToOffsetChange(e)}},{key:"canDragSource",value:function(e){return this.internalMonitor.canDragSource(e)}},{key:"canDropOnTarget",value:function(e){return this.internalMonitor.canDropOnTarget(e)}},{key:"getItemType",value:function(){return this.internalMonitor.getItemType()}},{key:"getItem",value:function(){return this.internalMonitor.getItem()}},{key:"getDropResult",value:function(){return this.internalMonitor.getDropResult()}},{key:"didDrop",value:function(){return this.internalMonitor.didDrop()}},{key:"getInitialClientOffset",value:function(){return this.internalMonitor.getInitialClientOffset()}},{key:"getInitialSourceClientOffset",value:function(){return this.internalMonitor.getInitialSourceClientOffset()}},{key:"getSourceClientOffset",value:function(){return this.internalMonitor.getSourceClientOffset()}},{key:"getClientOffset",value:function(){return this.internalMonitor.getClientOffset()}},{key:"getDifferenceFromInitialOffset",value:function(){return this.internalMonitor.getDifferenceFromInitialOffset()}}])&&s(t.prototype,n),r&&s(t,r),e}(),g=n(372),h=n(369),v=n(367);function p(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var y=function(){function e(t){var n=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.hooks=Object(g.a)({dragSource:function(e,t){n.clearDragSource(),n.dragSourceOptions=t||null,Object(h.a)(e)?n.dragSourceRef=e:n.dragSourceNode=e,n.reconnectDragSource()},dragPreview:function(e,t){n.clearDragPreview(),n.dragPreviewOptions=t||null,Object(h.a)(e)?n.dragPreviewRef=e:n.dragPreviewNode=e,n.reconnectDragPreview()}}),this.handlerId=null,this.dragSourceRef=null,this.dragSourceOptionsInternal=null,this.dragPreviewRef=null,this.dragPreviewOptionsInternal=null,this.lastConnectedHandlerId=null,this.lastConnectedDragSource=null,this.lastConnectedDragSourceOptions=null,this.lastConnectedDragPreview=null,this.lastConnectedDragPreviewOptions=null,this.backend=t}var t,n,r;return t=e,(n=[{key:"receiveHandlerId",value:function(e){this.handlerId!==e&&(this.handlerId=e,this.reconnect())}},{key:"reconnect",value:function(){this.reconnectDragSource(),this.reconnectDragPreview()}},{key:"reconnectDragSource",value:function(){var e=this.dragSource,t=this.didHandlerIdChange()||this.didConnectedDragSourceChange()||this.didDragSourceOptionsChange();t&&this.disconnectDragSource(),this.handlerId&&(e?t&&(this.lastConnectedHandlerId=this.handlerId,this.lastConnectedDragSource=e,this.lastConnectedDragSourceOptions=this.dragSourceOptions,this.dragSourceUnsubscribe=this.backend.connectDragSource(this.handlerId,e,this.dragSourceOptions)):this.lastConnectedDragSource=e)}},{key:"reconnectDragPreview",value:function(){var e=this.dragPreview,t=this.didHandlerIdChange()||this.didConnectedDragPreviewChange()||this.didDragPreviewOptionsChange();this.handlerId?this.dragPreview&&t&&(this.lastConnectedHandlerId=this.handlerId,this.lastConnectedDragPreview=e,this.lastConnectedDragPreviewOptions=this.dragPreviewOptions,this.disconnectDragPreview(),this.dragPreviewUnsubscribe=this.backend.connectDragPreview(this.handlerId,e,this.dragPreviewOptions)):this.disconnectDragPreview()}},{key:"didHandlerIdChange",value:function(){return this.lastConnectedHandlerId!==this.handlerId}},{key:"didConnectedDragSourceChange",value:function(){return this.lastConnectedDragSource!==this.dragSource}},{key:"didConnectedDragPreviewChange",value:function(){return this.lastConnectedDragPreview!==this.dragPreview}},{key:"didDragSourceOptionsChange",value:function(){return!Object(v.a)(this.lastConnectedDragSourceOptions,this.dragSourceOptions)}},{key:"didDragPreviewOptionsChange",value:function(){return!Object(v.a)(this.lastConnectedDragPreviewOptions,this.dragPreviewOptions)}},{key:"disconnectDragSource",value:function(){this.dragSourceUnsubscribe&&(this.dragSourceUnsubscribe(),this.dragSourceUnsubscribe=void 0)}},{key:"disconnectDragPreview",value:function(){this.dragPreviewUnsubscribe&&(this.dragPreviewUnsubscribe(),this.dragPreviewUnsubscribe=void 0,this.dragPreviewNode=null,this.dragPreviewRef=null)}},{key:"clearDragSource",value:function(){this.dragSourceNode=null,this.dragSourceRef=null}},{key:"clearDragPreview",value:function(){this.dragPreviewNode=null,this.dragPreviewRef=null}},{key:"connectTarget",get:function(){return this.dragSource}},{key:"dragSourceOptions",get:function(){return this.dragSourceOptionsInternal},set:function(e){this.dragSourceOptionsInternal=e}},{key:"dragPreviewOptions",get:function(){return this.dragPreviewOptionsInternal},set:function(e){this.dragPreviewOptionsInternal=e}},{key:"dragSource",get:function(){return this.dragSourceNode||this.dragSourceRef&&this.dragSourceRef.current}},{key:"dragPreview",get:function(){return this.dragPreviewNode||this.dragPreviewRef&&this.dragPreviewRef.current}}])&&p(t.prototype,n),r&&p(t,r),e}();function b(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(!(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)))return;var n=[],r=!0,i=!1,o=void 0;try{for(var a,u=e[Symbol.iterator]();!(r=(a=u.next()).done)&&(n.push(a.value),!t||n.length!==t);r=!0);}catch(e){i=!0,o=e}finally{try{r||null==u.return||u.return()}finally{if(i)throw o}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function O(e){return(O="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function m(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(!(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)))return;var n=[],r=!0,i=!1,o=void 0;try{for(var a,u=e[Symbol.iterator]();!(r=(a=u.next()).done)&&(n.push(a.value),!t||n.length!==t);r=!0);}catch(e){i=!0,o=e}finally{try{r||null==u.return||u.return()}finally{if(i)throw o}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function D(e){var t=Object(r.useRef)(e);t.current=e,Object(i.a)(null!=e.item,"item must be defined"),Object(i.a)(null!=e.item.type,"item type must be defined");var n,s=m((n=Object(c.a)(),[Object(r.useMemo)((function(){return new f(n)}),[n]),Object(r.useMemo)((function(){return new y(n.getBackend())}),[n])]),2),l=s[0],d=s[1];!function(e,t,n){var o=Object(c.a)(),s=Object(r.useMemo)((function(){return{beginDrag:function(){var n=e.current,r=n.begin,o=n.item;if(r){var a=r(t);return Object(i.a)(null==a||"object"===O(a),"dragSpec.begin() must either return an object, undefined, or null"),a||o||{}}return o||{}},canDrag:function(){return"boolean"==typeof e.current.canDrag?e.current.canDrag:"function"!=typeof e.current.canDrag||e.current.canDrag(t)},isDragging:function(n,r){var i=e.current.isDragging;return i?i(t):r===n.getSourceId()},endDrag:function(){var r=e.current.end;r&&r(t.getItem(),t),n.reconnect()}}}),[]);Object(a.a)((function(){var r=b(Object(u.a)(e.current.item.type,s,o),2),i=r[0],a=r[1];return t.receiveHandlerId(i),n.receiveHandlerId(i),a}),[])}(t,l,d);var g=Object(o.a)(l,t.current.collect||function(){return{}},(function(){return d.reconnect()})),h=Object(r.useMemo)((function(){return d.hooks.dragSource()}),[d]),v=Object(r.useMemo)((function(){return d.hooks.dragPreview()}),[d]);return Object(a.a)((function(){d.dragSourceOptions=t.current.options||null,d.reconnect()}),[d]),Object(a.a)((function(){d.dragPreviewOptions=t.current.previewOptions||null,d.reconnect()}),[d]),[g,h,v]}n.d(t,"a",(function(){return D}))}}]);
//# sourceMappingURL=vendors~chess~reminder~253ae210.1c7cb0e9.js.map