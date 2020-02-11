(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{382:function(e,n,t){var a=t(195),s=t(383);"string"==typeof(s=s.__esModule?s.default:s)&&(s=[[e.i,s,""]]);var r={insert:"head",singleton:!1},o=(a(s,r),s.locals?s.locals:{});e.exports=o},383:function(e,n,t){(n=t(196)(!1)).push([e.i,".src-components-Reminder-TaskList-TaskListItem-classes__TaskListItemContainer--35K4R.src-components-Reminder-TaskList-TaskListItem-classes__Dragging--3jj2t {\n  opacity: 0;\n}\n\n.src-components-Reminder-TaskList-TaskListItem-classes__ListItemSecondaryAction--3soUG {\n  padding-right: 72px; /* TODO */\n}\n",""]),n.locals={TaskListItemContainer:"src-components-Reminder-TaskList-TaskListItem-classes__TaskListItemContainer--35K4R",Dragging:"src-components-Reminder-TaskList-TaskListItem-classes__Dragging--3jj2t",ListItemSecondaryAction:"src-components-Reminder-TaskList-TaskListItem-classes__ListItemSecondaryAction--3soUG"},e.exports=n},394:function(e,n,t){"use strict";t.r(n);var a=t(0),s=t.n(a),r=t(58),o=t(141),c=t(307),i=t(362),d=t(308),l=Object(d.defineMessages)({add:{id:"src.components.Reminder.AddTaskButton.add",defaultMessage:"add"}}),u=function(e){var n=e.addTask;return s.a.createElement(i.a,{onClick:n,variant:"contained",color:"secondary"},s.a.createElement(c.a,l.add))},k=t(29),m=t.n(k),g=t(352),T=function(e){return function(n){return function(){for(var t=arguments.length,a=new Array(t),s=0;s<t;s++)a[s]=arguments[s];return e.apply(void 0,[n].concat(a))}}},f=t(6),v=t(13),p=t.n(v),b=t(14),h=t(38);function L(){var e=p()([""," is not between "," and "," characters."]);return L=function(){return e},e}var j=t(36),O=t.n(j),E=t(28),C=t.n(E),I=t(30),y=t.n(I),A=t(381),_=t.n(A),w=t(62),D=t.n(w),M=t(399),R=t(401),x=t(306),B=t(398),S=t(298),U=t(391),F=t(392),G=t(403),J=t(129),K=t(348),W=t(384),q=t.n(W),z=function(e){var n=e.onClick;return s.a.createElement(K.a,{onClick:n},s.a.createElement(q.a,null))},H=t(382),N=t.n(H),P=Object(d.defineMessages)({asBoundedLengthStringErrorMessage:{id:"src.components.Reminder.TaskList.TaskListItem.asBoundedLengthStringErrorMessage",defaultMessage:"{ name } must be 0-{ upperBound } characters."}}),Q=function(e){var n=e.id,t=e.value,r=e.index,o=e.onChange,c=e.onDelete,i=e.moveTask,d=e.validate,l=Object(a.useRef)(null),u=Object(M.a)({item:{type:"TaskListItem",id:n,index:r},collect:function(e){return{dragging:e.isDragging()}}}),k=y()(u,2),m=k[0].dragging,g=k[1],T=Object(R.a)({accept:"TaskListItem",hover:function(e){var n=r;e.index!==n&&(i(e.index,n),e.index=n)}});(0,y()(T,2)[1])(g(l));var f=Object(a.useMemo)((function(){return D()(N.a.TaskListItemContainer,C()({},N.a.Dragging,m))}),[m]),v=Object(a.useCallback)((function(e){o({content:e.target.value})}),[o]),p=Object(a.useCallback)((function(e,n){o({done:e.target.checked})}),[o]),b=Object(x.a)().formatMessage,h=Object(a.useMemo)((function(){return d(t)}),[t,d]),L=Object(a.useMemo)((function(){return void 0===h.content?null:J.a.apply(void 0,O()(Object.keys(P)))(h.content.key)?_.a.sentence(b(P[h.content.key],h.content.values)):null}),[h.content]);return s.a.createElement("div",{ref:l},s.a.createElement(S.a,{classes:{container:f,secondaryAction:N.a.ListItemSecondaryAction}},s.a.createElement(U.a,null,s.a.createElement(B.a,{checked:t.done,onChange:p})),s.a.createElement(G.a,{fullWidth:!0,value:t.content,onChange:v,disabled:t.done,error:void 0!==h.content,helperText:L}),s.a.createElement(F.a,null,s.a.createElement(z,{onClick:c}))))},V=Object(f.b)("a Task for presentation",(function(e){return{content:Object(f.e)(Object(f.f)("content",(n={upperBound:140},t=n.lowerBound,a=void 0===t?-1/0:t,s=n.upperBound,r=void 0===s?1/0:s,function(e){var n=Object(f.c)(e);if(a<=n.length&&n.length<=r)return n;throw new h.a(Object(b.a)(L(),n,a,r),"asBoundedLengthStringErrorMessage",{input:n.length,lowerBound:a,upperBound:r})})))(e.content),done:Object(f.e)(f.a)(e.done)};var n,t,a,s,r})),X=function(e){var n=e.tasks,t=e.changeTaskContent,r=e.markTaskAsDone,o=e.markTaskAsUndone,c=e.deleteTask,i=e.moveTask,d=Object(a.useCallback)((function(e,n){var a=n.content,s=n.done;void 0!==a&&t(e,a),void 0!==s&&(s?r(e):o(e))}),[t,r,o]);return s.a.createElement(g.a,null,n.map((function(e,n){return s.a.createElement(Q,m()({key:e.id.value,id:e.id,value:e,validate:V,onChange:T(d)(e.id),onDelete:T(c)(e.id)},{index:n,moveTask:i}))})))},Y={addTask:o.a,changeTaskContent:o.b,markTaskAsDone:o.f,markTaskAsUndone:o.g,deleteTask:o.e,moveTask:o.h},Z=Object(r.c)((function(e){return{tasks:e.reminder.tasks}}),Y)((function(e){var n=e.tasks,t=e.addTask,a=e.changeTaskContent,r=e.markTaskAsDone,o=e.markTaskAsUndone,c=e.deleteTask,i=e.moveTask;return s.a.createElement(s.a.Fragment,null,s.a.createElement(X,{tasks:n,changeTaskContent:a,markTaskAsDone:r,markTaskAsUndone:o,deleteTask:c,moveTask:i}),s.a.createElement(u,{addTask:t}))}));n.default=function(){return s.a.createElement(s.a.Fragment,null,s.a.createElement(Z,null))}}}]);
//# sourceMappingURL=reminder~21833f8f.6d4cbcb7.js.map