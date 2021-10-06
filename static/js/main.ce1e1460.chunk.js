(this["webpackJsonpbraindump-app"]=this["webpackJsonpbraindump-app"]||[]).push([[0],{105:function(n,e,t){},120:function(n,e,t){"use strict";t.r(e);var r=t(0),c=t(11),a=t.n(c),i=(t(105),t(50)),u=t.n(i),o=t(61),s=t(14),l=t(10),d=t(17),j=t(43),b=t(182),m=t(78),f="dumps";function p(n){var e=JSON.stringify(n);window.localStorage.setItem(f,e)}var h="SET_DUMPS",O="ADD_DUMP",v="UPDATE_DUMP",x="REMOVE_DUMP";function g(n){var e={type:h,dumps:n};return function(n,t){n(e),p(t())}}var y=function(){var n=window.localStorage.getItem(f);if(null===n)return[];try{return JSON.parse(n).dumps}catch(e){return[]}}();var k=t(28),E=Object(b.c)(Object(b.b)({dumps:function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:y,e=arguments.length>1?arguments[1]:void 0;function t(n){return Object(l.a)(n)}function r(n,e){return[].concat(Object(l.a)(n),[e])}function c(n,e){var t=n.findIndex((function(n){return n.id===e.id}));if(t<0)return n;var r=Object(l.a)(n);return r[t]=e,r}function a(n,e){return n.filter((function(n){return n.id!==e.id}))}switch(e.type){case h:var i=e;return t(i.dumps);case O:var u=e;return r(n,u.dump);case v:var o=e;return c(n,o.dump);case x:var s=e;return a(n,s.dump)}return n}}),Object(b.a)(m.a)),w=k.c;function C(){for(var n=arguments.length,e=new Array(n),t=0;t<n;t++)e[t]=arguments[t];return Object.keys(e.map((function(n){return n.replace("'","")})).map((function(n){return n.toLowerCase()})).flatMap((function(n){return n.split(/[^a-z0-9]/)})).filter((function(n){return n.length>0})).reduce((function(n,e){return n[e]=!0,n}),{}))}var S,D=t(21),F=t(183),N=t(156),I=t(160),L=t(184),M=t(161),T=t(121),B=t(162),P=t(163),A=t(164),R=t(166),U=t(22),J=t(159),_=t(165),z=t(2),V=Object(F.a)(Object(U.a)((function(n){var e=Object(z.jsx)(N.a,{position:"end",children:Object(z.jsx)(J.a,{})}),t=Object(z.jsxs)(I.a,{children:[Object(z.jsx)(L.a,{htmlFor:"search",children:"Search"}),Object(z.jsx)(M.a,{id:"search",autoFocus:!0,onChange:function(e){n.onSearchFilterChange(e.target.value)},endAdornment:e,autoComplete:"off"})]}),r=n.dumps.map((function(e){return Object(z.jsxs)(T.a,{button:!0,onClick:function(){return n.onDumpSelection(e)},children:[Object(z.jsx)(B.a,{primary:e.summary,secondary:new Date(e.timestamp).toLocaleString()}),Object(z.jsx)(P.a,{onClick:function(){return n.onDumpRemoval(e)},children:Object(z.jsx)(A.a,{edge:"end","aria-label":"delete",children:Object(z.jsx)(_.a,{})})})]},e.id)}));return Object(z.jsxs)(z.Fragment,{children:[t,n.dumps.length>0?Object(z.jsx)(R.a,{children:r}):null]})}))(S||(S=Object(D.a)([""]))));function K(){var n=Object(r.useState)({filter:"",selected:null}),e=Object(j.a)(n,2),t=e[0],c=e[1],a=Object(s.f)(),i=w((function(n){var e=n.dumps.map((function(n){return function(n,e){var t=C.apply(void 0,[n.summary,n.description].concat(Object(l.a)(n.tags))),r=C(e);return function(n,e){var t=n.join(";");return e.filter((function(n){return t.includes(n)})).length}(t,r)}(n,t.filter)}));return function(n,e){var t=Math.max.apply(Math,Object(l.a)(e));if(0===t)return[];return e.map((function(n,e){return n===t?e:-1})).filter((function(n){return n>=0})).map((function(e){return n[e]}))}(n.dumps,e)})),u=Object(k.b)();return Object(z.jsxs)(z.Fragment,{children:[Object(z.jsx)("h2",{children:"Find dumps"}),Object(z.jsx)(V,{dumps:i,onSearchFilterChange:function(n){c((function(e){return Object(d.a)(Object(d.a)({},e),{},{filter:n})}))},onDumpSelection:function(n){a.push("/show/dumps/".concat(n.id))},onDumpRemoval:function(n){u(function(n){var e={type:x,dump:n};return function(n,t){n(e),p(t())}}(n))}})]})}var W=t(177),q=t(7),G=t(180),H=t(167);var Q=t(181);var X=t(168),Y=t(26),Z=t(68);function $(n){return"e"===n.key}function nn(n){return n.ctrlKey&&"s"===n.key}function en(n){return"Escape"===n.key}var tn,rn=function(){function n(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];Object(Y.a)(this,n),this.handlers=e}return Object(Z.a)(n,[{key:"onEdit",value:function(n){return this.handlers.push({matcher:$,action:n}),this}},{key:"onSave",value:function(n){return this.handlers.push({matcher:nn,action:n}),this}},{key:"onCancel",value:function(n){return this.handlers.push({matcher:en,action:n}),this}},{key:"build",value:function(){var n=this;return function(e){var t=n.handlers.filter((function(n){return n.matcher(e)}));1===t.length&&(t[0].action(),e.preventDefault())}}}]),n}(),cn=Object(F.a)(Object(U.a)((function(n){var e,t,c={currentDump:n.dump||null,summary:{value:(null===(e=n.dump)||void 0===e?void 0:e.summary)||null,hasError:!1,error:null},description:{value:(null===(t=n.dump)||void 0===t?void 0:t.description)||null,hasError:!1,error:null}},a=Object(r.useState)(c),i=Object(j.a)(a,2),u=i[0],o=i[1],s=Object(r.useState)(!1),l=Object(j.a)(s,2),b=l[0],m=l[1],f=function(n,e){var t=function(n){return 0===n.trim().length}(e),r=t?"Field must not be empty":null;o((function(c){return Object(d.a)(Object(d.a)({},c),{},Object(q.a)({},n,{value:e,hasError:t,error:r}))}))},p=function(){var e,t,r,c=(null===(e=u.currentDump)||void 0===e?void 0:e.id)||null,a=(null===(t=u.summary)||void 0===t?void 0:t.value)||"",i=(null===(r=u.description)||void 0===r?void 0:r.value)||"";if(b){var s=function(n,e,t){return{id:n||Object(Q.a)(),timestamp:Date.now(),summary:e.trim(),description:t,tags:[]}}(c,a,i);n.onSave(s),o((function(n){return Object(d.a)(Object(d.a)({},n),{},{summary:Object(d.a)(Object(d.a)({},n.summary),{},{value:s.summary}),description:Object(d.a)(Object(d.a)({},n.description),{},{value:s.description}),currentDump:s})}))}},h=(new rn).onSave(p).onCancel((function(){n.onCancel()})).build(),O=function(n){h(n)};return Object(r.useEffect)((function(){return document.addEventListener("keydown",O),function(){document.removeEventListener("keydown",O)}})),Object(r.useEffect)((function(){var n,e,t,r=null!==u.summary.value&&!u.summary.hasError,c=null!==u.description.value&&!u.description.hasError,a=(null===(n=u.summary.value)||void 0===n?void 0:n.trim())!==(null===(e=u.currentDump)||void 0===e?void 0:e.summary),i=u.description.value!==(null===(t=u.currentDump)||void 0===t?void 0:t.description);m(r&&c&&(a||i))}),[u]),Object(z.jsx)(z.Fragment,{children:Object(z.jsxs)("form",{className:n.className,noValidate:!0,autoComplete:"off",onSubmit:function(n){n.preventDefault()},children:[Object(z.jsx)("div",{children:Object(z.jsx)(G.a,{id:"summary",label:"Summary",variant:"outlined",value:u.summary.value||"",autoFocus:!0,onChange:function(n){return f("summary",n.target.value)},error:u.summary.hasError,helperText:u.summary.error})}),Object(z.jsx)("div",{children:Object(z.jsx)(G.a,{id:"description",label:"Description",variant:"outlined",value:u.description.value||"",multiline:!0,rows:12,onChange:function(n){return f("description",n.target.value)},error:u.description.hasError,helperText:u.description.error})}),Object(z.jsx)("div",{children:Object(z.jsx)(H.a,{disabled:!b,onClick:p,variant:"contained",color:"primary",size:"large",startIcon:Object(z.jsx)(X.a,{}),children:"Save"})})]})})}))(tn||(tn=Object(D.a)(["\n  div {\n    width: 100%;\n  }\n\n  > div {\n    margin: ",";\n  }\n\n  > div:last-child {\n    text-align: right;\n  }\n\n  > div > div > div > TextArea {\n    font-family: monospace;\n  }\n"])),(function(n){return n.theme.spacing(2,0,2)})));function an(){var n=Object(s.f)(),e=Object(k.b)();return Object(z.jsxs)(z.Fragment,{children:[Object(z.jsx)("h2",{children:"Create new dump"}),Object(z.jsx)(cn,{onSave:function(t){e(function(n){var e={type:O,dump:n};return function(n,t){n(e),p(t())}}(t)),n.replace("/edit/dumps/".concat(t.id))},onCancel:function(){n.goBack()}})]})}var un,on=t(169),sn=t(91),ln=Object(F.a)(Object(U.a)((function(n){var e=(new rn).onEdit(n.onEdit).build(),t=function(n){e(n)};return Object(r.useEffect)((function(){return document.addEventListener("keydown",t),function(){document.removeEventListener("keydown",t)}})),Object(z.jsxs)("div",{className:n.className,children:[Object(z.jsx)("h2",{children:n.dump.summary}),Object(z.jsx)(sn.a,{children:n.dump.description}),Object(z.jsx)("div",{children:Object(z.jsx)(H.a,{onClick:n.onEdit,variant:"contained",color:"primary",size:"large",startIcon:Object(z.jsx)(on.a,{}),children:"Edit"})})]})}))(un||(un=Object(D.a)(["\n  > div:last-child {\n    text-align: right;\n  }\n"]))));function dn(n){var e=Object(s.g)(),t=w((function(n){return n.dumps.filter((function(n){return n.id===e.dumpId}))}));return Object(z.jsx)(z.Fragment,{children:1===t.length?Object(z.jsx)(ln,{dump:t[0],onEdit:function(){1===t.length&&n.onEdit(t[0].id)}}):null})}var jn,bn=t(170),mn=t(171),fn=Object(F.a)(Object(U.a)((function(n){var e=n.onClick||function(){};return Object(z.jsx)(bn.a,{className:n.className,color:"primary","aria-label":"add",onClick:e,children:Object(z.jsx)(mn.a,{})})}))(jn||(jn=Object(D.a)(["\n  position: fixed;\n  top: auto;\n  bottom: ","px;\n  left: auto;\n  right: 30px;\n"])),(function(n){return 30+70*(n.index||0)})));function pn(){var n=Object(s.f)(),e=Object(s.g)(),t=w((function(n){return n.dumps.filter((function(n){return n.id===e.dumpId}))})),r=Object(k.b)();return Object(z.jsxs)(z.Fragment,{children:[Object(z.jsx)("h2",{children:"Edit Dump"}),1===t.length?Object(z.jsx)(cn,{onSave:function(n){r(function(n){var e={type:v,dump:n};return function(n,t){n(e),p(t())}}(n))},onCancel:function(){n.push("/")},dump:t[0]}):null]})}var hn,On=t(172),vn=t(173),xn=t(59),gn=Object(F.a)(Object(U.a)((function(n){return Object(z.jsx)(On.a,{className:n.className,position:"static",children:Object(z.jsxs)(vn.a,{children:[n.children,Object(z.jsx)(xn.a,{variant:"h6",children:n.title})]})})}))(hn||(hn=Object(D.a)(["\n  flex-grow: 1;\n\n  & > div > h6 {\n    flex-grow: 1;\n  }\n"]))));function yn(n){return kn.apply(this,arguments)}function kn(){return(kn=Object(o.a)(u.a.mark((function n(e){return u.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.abrupt("return",new Promise((function(n){return En(e,n)})));case 1:case"end":return n.stop()}}),n)})))).apply(this,arguments)}function En(n,e){var t=new FileReader;t.onload=function(){var n=function(n){if(null===n)return"";if(n instanceof ArrayBuffer)return(new TextDecoder).decode(n);return n}(t.result),r=JSON.parse(n);e(r)},t.readAsText(n)}var wn,Cn=t(174),Sn=t(92),Dn=t(175),Fn=Object(F.a)(Object(U.a)((function(n){var e=Object(r.useState)(null),t=Object(j.a)(e,2),c=t[0],a=t[1],i=function(){a(null)},u=n.actions.map((function(n,e){return Object(z.jsx)(Cn.a,{onClick:function(){return(0,n.action)(),void i()},children:n.title},"menu-item-".concat(e))}));return Object(z.jsxs)("div",{className:n.className,children:[Object(z.jsx)(A.a,{onClick:function(n){a(n.currentTarget)},edge:"start",color:"inherit","aria-label":"menu",children:Object(z.jsx)(Dn.a,{})}),u.length>0?Object(z.jsx)(Sn.a,{id:"app-menu",anchorEl:c,keepMounted:!0,open:!!c,onClose:i,children:u}):null]})}))(wn||(wn=Object(D.a)(["\n  button {\n    margin-right: ",";\n  }\n"])),(function(n){return n.theme.spacing(2)})));var Nn,In=t(176),Ln=Object(F.a)(Object(U.a)((function(n){return Object(z.jsx)("div",{className:n.className,children:Object(z.jsx)(A.a,{onClick:n.onBack,edge:"start",color:"inherit","aria-label":"back",children:Object(z.jsx)(In.a,{})})})}))(Nn||(Nn=Object(D.a)(["\n  button {\n    margin-right: ",";\n  }\n"])),(function(n){return n.theme.spacing(2)})));function Mn(){var n=Object(k.b)(),e=Object(s.h)("/"),t=Object(s.f)(),c=Object(r.useRef)(null),a=function(){var e=Object(o.a)(u.a.mark((function e(t){var r,c,a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(null===(c=(null===(r=t.target.files)||void 0===r?void 0:r[0])||null)){e.next=6;break}return e.next=4,yn(c);case 4:a=e.sent,n(g(a.dumps));case 6:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),i=[{title:"Export",action:function(){!function(n){var e=JSON.stringify(n),t=new Blob([e],{type:"application/json"}),r=URL.createObjectURL(t),c=document.createElement("a");c.download="braindump.json",c.href=r,c.click()}(E.getState())}},{title:"Import",action:function(){var n;null===(n=c.current)||void 0===n||n.click()}}],l=function(n){(null===e||void 0===e?void 0:e.isExact)?t.push(n):t.replace(n)};return Object(z.jsxs)(z.Fragment,{children:[Object(z.jsx)(gn,{title:"Braindump",children:(null===e||void 0===e?void 0:e.isExact)?Object(z.jsx)(Fn,{actions:i}):Object(z.jsx)(Ln,{onBack:function(){t.goBack()}})}),Object(z.jsx)("input",{type:"file",ref:c,accept:"application/json, .json",onChange:a,style:{display:"none"}}),Object(z.jsxs)(W.a,{maxWidth:"xl",children:[Object(z.jsx)(fn,{onClick:function(){l("/create")}}),Object(z.jsxs)(s.c,{children:[Object(z.jsx)(s.a,{path:"/create",children:Object(z.jsx)(an,{})}),Object(z.jsx)(s.a,{path:"/edit/dumps/:dumpId",children:Object(z.jsx)(pn,{})}),Object(z.jsx)(s.a,{path:"/show/dumps/:dumpId",children:Object(z.jsx)(dn,{onEdit:function(n){l("/edit/dumps/".concat(n))}})}),Object(z.jsx)(s.a,{path:"/",children:Object(z.jsx)(K,{})})]})]})]})}var Tn,Bn,Pn=t(178),An=t(179),Rn=t(40);a.a.render((Tn=Object(z.jsx)(Mn,{}),Object(z.jsxs)(r.StrictMode,{children:[Object(z.jsx)(Pn.a,{}),Object(z.jsx)(An.b,{injectFirst:!0,children:Object(z.jsx)(k.a,{store:E,children:Object(z.jsx)(Rn.a,{basename:"/braindump-app",children:Tn})})})]})),document.getElementById("root")),Bn&&t.e(3).then(t.bind(null,185)).then((function(n){var e=n.getCLS,t=n.getFID,r=n.getFCP,c=n.getLCP,a=n.getTTFB;e(Bn),t(Bn),r(Bn),c(Bn),a(Bn)}))}},[[120,1,2]]]);
//# sourceMappingURL=main.ce1e1460.chunk.js.map