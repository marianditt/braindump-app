(this["webpackJsonpbraindump-app"]=this["webpackJsonpbraindump-app"]||[]).push([[0],{89:function(n,t,e){},98:function(n,t,e){"use strict";e.r(t);var r=e(0),c=e.n(r),i=e(9),u=e.n(i),a=(e(89),e(32)),o=e(12),s=e(43),l=e(21),d=e(49),j=e(151),m=e(72),f="ADD_DUMP",h="SET_DUMP",b="REMOVE_DUMP",p=function(){var n=localStorage.getItem("dumps");return null===n?[]:JSON.parse(n).dumps}(),O=e(22),v=Object(j.c)(Object(j.b)({dumps:function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:p,t=arguments.length>1?arguments[1]:void 0,e=function(n,t){return[].concat(Object(s.a)(n),[t])},r=function(n,e){var r=n.findIndex((function(n){return n.id===e.id}));if(r<0)return n;var c=Object(s.a)(n);return c[r]=t.dump,c},c=function(n,t){return n.filter((function(n){return n.id!==t.id}))};switch(t.type){case f:return e(n,t.dump);case h:return r(n,t.dump);case b:return c(n,t.dump)}return n}}),Object(j.a)(m.a)),x=O.c;function g(){for(var n=arguments.length,t=new Array(n),e=0;e<n;e++)t[e]=arguments[e];return Object.keys(t.map((function(n){return n.replace("'","")})).map((function(n){return n.toLowerCase()})).flatMap((function(n){return n.split(/[^a-z0-9]/)})).filter((function(n){return n.length>0})).reduce((function(n,t){return n[t]=!0,n}),{}))}var y,S=e(27),E=e(152),C=e(128),k=e(132),D=e(153),F=e(133),w=e(134),I=e(135),N=e(136),L=e(137),M=e(139),J=e(28),P=e(131),T=e(138),z=e(2),A=Object(E.a)(Object(J.a)((function(n){var t=Object(z.jsx)(C.a,{position:"end",children:Object(z.jsx)(P.a,{})}),e=Object(z.jsxs)(k.a,{children:[Object(z.jsx)(D.a,{htmlFor:"search",children:"Search"}),Object(z.jsx)(F.a,{id:"search",autoFocus:!0,onChange:function(t){n.onSearchFilterChange(t.target.value)},endAdornment:t,autoComplete:"off"})]}),r=n.dumps.map((function(t){return Object(z.jsxs)(w.a,{button:!0,onClick:function(){return n.onDumpSelection(t)},children:[Object(z.jsx)(I.a,{primary:t.summary,secondary:new Date(t.timestamp).toLocaleString()}),Object(z.jsx)(N.a,{onClick:function(){return n.onDumpRemoval(t)},children:Object(z.jsx)(L.a,{edge:"end","aria-label":"delete",children:Object(z.jsx)(T.a,{})})})]},t.id)}));return Object(z.jsxs)(z.Fragment,{children:[e,n.dumps.length>0?Object(z.jsx)(M.a,{children:r}):null]})}))(y||(y=Object(S.a)([""]))));function B(){var n=Object(r.useState)({filter:"",selected:null}),t=Object(d.a)(n,2),e=t[0],c=t[1],i=Object(o.f)(),u=x((function(n){var t=n.dumps.map((function(n){return function(n,t){var e=g.apply(void 0,[n.summary,n.description].concat(Object(s.a)(n.tags))),r=g(t);return function(n,t){var e=n.join(";");return t.filter((function(n){return e.includes(n)})).length}(e,r)}(n,e.filter)}));return function(n,t){var e=Math.max.apply(Math,Object(s.a)(t));if(0===e)return[];return t.map((function(n,t){return n===e?t:-1})).filter((function(n){return n>=0})).map((function(t){return n[t]}))}(n.dumps,t)})),a=Object(O.b)();return Object(z.jsxs)(z.Fragment,{children:[Object(z.jsx)("h2",{children:"Find dumps"}),Object(z.jsx)(A,{dumps:u,onSearchFilterChange:function(n){c((function(t){return Object(l.a)(Object(l.a)({},t),{},{filter:n})}))},onDumpSelection:function(n){i.push("/show/dumps/".concat(n.id))},onDumpRemoval:function(n){a(function(n){var t={type:b,dump:n};return function(n,e){n(t);var r=e();localStorage.setItem("dumps",JSON.stringify(r))}}(n))}})]})}var R=e(145),U=e(146),_=e(147),V=e(149),K=e(54),W=e(148),q=e(140);var G=e(150);var H=e(141),Q=e(59),X=e(60);function Y(n){return"e"===n.key}function Z(n){return n.ctrlKey&&"s"===n.key}function $(n){return"Escape"===n.key}var nn,tn=function(){function n(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];Object(Q.a)(this,n),this.handlers=t}return Object(X.a)(n,[{key:"onEdit",value:function(n){return this.handlers.push({matcher:Y,action:n}),this}},{key:"onSave",value:function(n){return this.handlers.push({matcher:Z,action:n}),this}},{key:"onCancel",value:function(n){return this.handlers.push({matcher:$,action:n}),this}},{key:"build",value:function(){var n=this;return function(t){var e=n.handlers.filter((function(n){return n.matcher(t)}));1===e.length&&(e[0].action(),t.preventDefault())}}}]),n}(),en=Object(E.a)(Object(J.a)((function(n){var t,e,c={currentDump:n.dump||null,summary:{value:(null===(t=n.dump)||void 0===t?void 0:t.summary)||null,hasError:!1,error:null},description:{value:(null===(e=n.dump)||void 0===e?void 0:e.description)||null,hasError:!1,error:null}},i=Object(r.useState)(c),u=Object(d.a)(i,2),a=u[0],o=u[1],s=Object(r.useState)(!1),j=Object(d.a)(s,2),m=j[0],f=j[1],h=function(n,t){var e=function(n){return 0===n.trim().length}(t),r=e?"Field must not be empty":null;o((function(c){return Object(l.a)(Object(l.a)({},c),{},Object(K.a)({},n,{value:t,hasError:e,error:r}))}))},b=function(){var t,e,r,c=(null===(t=a.currentDump)||void 0===t?void 0:t.id)||null,i=(null===(e=a.summary)||void 0===e?void 0:e.value)||"",u=(null===(r=a.description)||void 0===r?void 0:r.value)||"";if(m){var s=function(n,t,e){return{id:n||Object(G.a)(),timestamp:Date.now(),summary:t.trim(),description:e,tags:[]}}(c,i,u);n.onSave(s),o((function(n){return Object(l.a)(Object(l.a)({},n),{},{summary:Object(l.a)(Object(l.a)({},n.summary),{},{value:s.summary}),description:Object(l.a)(Object(l.a)({},n.description),{},{value:s.description}),currentDump:s})}))}},p=(new tn).onSave(b).onCancel((function(){n.onCancel()})).build(),O=function(n){p(n)};return Object(r.useEffect)((function(){return document.addEventListener("keydown",O),function(){document.removeEventListener("keydown",O)}})),Object(r.useEffect)((function(){var n,t,e,r=null!==a.summary.value&&!a.summary.hasError,c=null!==a.description.value&&!a.description.hasError,i=(null===(n=a.summary.value)||void 0===n?void 0:n.trim())!==(null===(t=a.currentDump)||void 0===t?void 0:t.summary),u=a.description.value!==(null===(e=a.currentDump)||void 0===e?void 0:e.description);f(r&&c&&(i||u))}),[a]),Object(z.jsx)(z.Fragment,{children:Object(z.jsxs)("form",{className:n.className,noValidate:!0,autoComplete:"off",onSubmit:function(n){n.preventDefault()},children:[Object(z.jsx)("div",{children:Object(z.jsx)(W.a,{id:"summary",label:"Summary",variant:"outlined",value:a.summary.value||"",autoFocus:!0,onChange:function(n){return h("summary",n.target.value)},error:a.summary.hasError,helperText:a.summary.error})}),Object(z.jsx)("div",{children:Object(z.jsx)(W.a,{id:"description",label:"Description",variant:"outlined",value:a.description.value||"",multiline:!0,rows:12,onChange:function(n){return h("description",n.target.value)},error:a.description.hasError,helperText:a.description.error})}),Object(z.jsx)("div",{children:Object(z.jsx)(q.a,{disabled:!m,onClick:b,variant:"contained",color:"primary",size:"large",startIcon:Object(z.jsx)(H.a,{}),children:"Save"})})]})})}))(nn||(nn=Object(S.a)(["\n  div {\n    width: 100%;\n  }\n\n  > div {\n    margin: ",";\n  }\n\n  > div:last-child {\n    text-align: right;\n  }\n"])),(function(n){return n.theme.spacing(2,0,2)})));function rn(){var n=Object(o.f)(),t=Object(O.b)();return Object(z.jsxs)(z.Fragment,{children:[Object(z.jsx)("h2",{children:"Create new dump"}),Object(z.jsx)(en,{onSave:function(e){t(function(n){var t={type:f,dump:n};return function(n,e){n(t);var r=e();localStorage.setItem("dumps",JSON.stringify(r))}}(e)),n.push("/")},onCancel:function(){n.push("/")}})]})}var cn=e(142);function un(n){var t=n.map((function(n){return 0===n.trim().length})),e=t.indexOf(!1),r=t.lastIndexOf(!1);return n.slice(e,r+1).join("\n")}var an={headingOffset:0};var on,sn=function(){function n(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;Object(Q.a)(this,n),this.id=t}return Object(X.a)(n,[{key:"next",value:function(){var n=++this.id;return"md-element-".concat(n)}}]),n}();function ln(n,t,e){var r=n.split("```").map((function(n,r){if(r%2===0)return e(n);var c=n.split("\n");return Object(z.jsx)("pre",{children:un(c)},t.next())}));return Object(z.jsx)(z.Fragment,{children:r})}function dn(n,t,e,r){var i=function(n,t){return n.reduce((function(n,e){return t(e)?(n.push([e]),n.push([])):n[n.length-1].push(e),n}),[[]]).filter((function(n){return n.length>0})).map((function(n){return n.join("\n")}))}(n.split("\n"),(function(n){return"#"===n[0]})).filter((function(n){return n.trim().length>0})),u=i.map((function(n){return n.split("").findIndex((function(n){return"#"!==n}))})),a=i.map((function(n,c){var i,a,o,s=u[c];if(s>0){var l="h".concat((o=6,(i=s+t)<(a=1)?a:i>o?o:i));return Object(z.jsx)(l,{children:n.substr(s+1).trim()},e.next())}return r(n)}));return Object(z.jsx)(c.a.Fragment,{children:a},e.next())}function jn(n,t,e){var r=n.split("\n\n").map((function(n){return Object(z.jsx)("p",{children:e(n)},t.next())}));return Object(z.jsx)(c.a.Fragment,{children:r},t.next())}function mn(n,t){return Object(z.jsx)(c.a.Fragment,{children:n},t.next())}var fn=Object(E.a)(Object(J.a)((function(n){var t=function(n){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:an,e=new sn,r=function(n){return mn(n,e)},c=function(n){return jn(n,e,r)},i=function(n){return dn(n,t.headingOffset,e,c)};return u=n,ln(u,e,i);var u}(n.dump.description,{headingOffset:2}),e=(new tn).onEdit(n.onEdit).build(),c=function(n){e(n)};return Object(r.useEffect)((function(){return document.addEventListener("keydown",c),function(){document.removeEventListener("keydown",c)}})),Object(z.jsxs)("div",{className:n.className,children:[Object(z.jsx)("h2",{children:n.dump.summary}),t,Object(z.jsx)("div",{children:Object(z.jsx)(q.a,{onClick:n.onEdit,variant:"contained",color:"primary",size:"large",startIcon:Object(z.jsx)(cn.a,{}),children:"Edit"})})]})}))(on||(on=Object(S.a)(["\n  > div:last-child {\n    text-align: right;\n  }\n"]))));function hn(){var n=Object(o.f)(),t=Object(o.g)(),e=x((function(n){return n.dumps.filter((function(n){return n.id===t.dumpId}))}));return Object(z.jsx)(z.Fragment,{children:1===e.length?Object(z.jsx)(fn,{dump:e[0],onEdit:function(){1===e.length&&n.push("/edit/dumps/".concat(e[0].id))}}):null})}var bn,pn=e(143),On=e(144),vn=Object(E.a)(Object(J.a)((function(n){var t=n.onClick||function(){};return Object(z.jsx)(pn.a,{className:n.className,color:"primary","aria-label":"add",onClick:t,children:Object(z.jsx)(On.a,{})})}))(bn||(bn=Object(S.a)(["\n  position: fixed;\n  top: auto;\n  bottom: ","px;\n  left: auto;\n  right: 30px;\n"])),(function(n){return 30+70*(n.index||0)})));function xn(){var n=Object(o.f)(),t=Object(o.g)(),e=x((function(n){return n.dumps.filter((function(n){return n.id===t.dumpId}))})),r=Object(O.b)();return Object(z.jsxs)(z.Fragment,{children:[Object(z.jsx)("h2",{children:"Edit Dump"}),1===e.length?Object(z.jsx)(en,{onSave:function(n){r(function(n){var t={type:h,dump:n};return function(n,e){n(t);var r=e();localStorage.setItem("dumps",JSON.stringify(r))}}(n))},onCancel:function(){n.push("/")},dump:e[0]}):null]})}function gn(){return n=Object(z.jsxs)(R.a,{maxWidth:"sm",children:[Object(z.jsx)(U.a,{href:"/",color:"inherit",children:Object(z.jsx)("h1",{children:"Braindump"})}),Object(z.jsxs)(a.a,{children:[Object(z.jsx)(a.b,{to:"/create",children:Object(z.jsx)(vn,{})}),Object(z.jsxs)(o.c,{children:[Object(z.jsx)(o.a,{path:"/create",children:Object(z.jsx)(rn,{})}),Object(z.jsx)(o.a,{path:"/edit/dumps/:dumpId",children:Object(z.jsx)(xn,{})}),Object(z.jsx)(o.a,{path:"/show/dumps/:dumpId",children:Object(z.jsx)(hn,{})}),Object(z.jsx)(o.a,{path:"/",children:Object(z.jsx)(B,{})})]})]})]}),Object(z.jsxs)(r.StrictMode,{children:[Object(z.jsx)(_.a,{}),Object(z.jsx)(V.b,{injectFirst:!0,children:Object(z.jsx)(O.a,{store:v,children:n})})]});var n}var yn;u.a.render(Object(z.jsx)(gn,{}),document.getElementById("root")),yn&&e.e(3).then(e.bind(null,155)).then((function(n){var t=n.getCLS,e=n.getFID,r=n.getFCP,c=n.getLCP,i=n.getTTFB;t(yn),e(yn),r(yn),c(yn),i(yn)}))}},[[98,1,2]]]);
//# sourceMappingURL=main.2b991573.chunk.js.map