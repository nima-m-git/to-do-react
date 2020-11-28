(this["webpackJsonpto-do-react"]=this["webpackJsonpto-do-react"]||[]).push([[0],{12:function(e,t,n){},13:function(e,t,n){},14:function(e,t,n){"use strict";n.r(t);var c=n(0),s=n(1),o=n.n(s),i=n(6),l=n.n(i),r=(n(12),n(2)),u=(n(13),n(3));function a(e){var t=e.addGroup,n=e.exitForm,o=Object(s.useState)(""),i=Object(r.a)(o,2),l=i[0],u=i[1];return Object(c.jsxs)("form",{onSubmit:function(){t(l),n()},children:[Object(c.jsxs)("label",{children:["Title:",Object(c.jsx)("input",{type:"text",onChange:function(e){return u(e.target.value)},value:l})]}),Object(c.jsx)("input",{type:"submit",value:"Submit"})]})}function j(e){var t=e.action,n=e.task,o=e.exitForm,i=Object(s.useState)({title:null===n||void 0===n?void 0:n.title,note:null===n||void 0===n?void 0:n.note}),l=Object(r.a)(i,2),a=l[0],j=l[1];return Object(s.useEffect)((function(){j({title:null===n||void 0===n?void 0:n.title,note:null===n||void 0===n?void 0:n.note})}),[n]),Object(c.jsxs)("form",{onSubmit:function(){t(a),o()},children:[Object(c.jsxs)("label",{children:["Title:",Object(c.jsx)("input",{type:"text",onChange:function(e){return j(Object(u.a)(Object(u.a)({},a),{},{title:e.target.value}))},value:a.title||""})]}),Object(c.jsxs)("label",{children:["Note:",Object(c.jsx)("textarea",{rows:3,cols:25,onChange:function(e){return j(Object(u.a)(Object(u.a)({},a),{},{note:e.target.value}))},value:a.note||""})]}),Object(c.jsx)("input",{type:"submit",value:"Submit"})]})}var b=n(4),d=function(e){var t=e.deleteFunc,n=e.deleteItem,s=e.closeCallback;return Object(c.jsxs)("div",{className:"confirmDelete",children:[Object(c.jsx)("p",{children:"Are you sure?"}),Object(c.jsx)("button",{onClick:function(){t(n),s()},children:"Yes"}),Object(c.jsx)("button",{onClick:function(){return s()},children:"No"})]})};var O=function(e){var t=e.group,n=e.updateGroupTasks,o=Object(b.a)(t.tasks||{}),i=Object(r.a)(o,2),l=i[0],u=i[1],a=Object(s.useState)({show:!1,action:null,selected:null}),O=Object(r.a)(a,2),h=O[0],m=O[1],f=Object(s.useState)({show:!1,item:null}),x=Object(r.a)(f,2),p=x[0],v=x[1],k=function(e){u((function(t){delete t[e]}))};return Object(s.useEffect)((function(){n({group:t,tasks:l})}),[l,n,t]),Object(c.jsxs)("div",{children:[Object(c.jsxs)("div",{className:"tasks",children:[Object(c.jsxs)("div",{className:"head-bar",children:[Object(c.jsx)("p",{style:{"text-decoration":"underline"},children:"Tasks"}),Object(c.jsx)("button",{className:"new-btn",onClick:function(){m({show:!0,action:"new"})},children:"+"})]}),Object(c.jsx)("ul",{children:Object.entries(l).map((function(e){var t=Object(r.a)(e,2),n=t[0],s=t[1];return Object(c.jsxs)("li",{children:[Object(c.jsxs)("div",{className:"task",children:[Object(c.jsx)("button",{className:"remove-btn",onClick:function(){return v({show:!0,item:n})},children:"x"}),Object(c.jsx)("p",{className:s.completed?"title crossed":"title",onClick:function(){m({show:!0,action:"update",selected:s})},children:n}),Object(c.jsx)("button",{className:"complete-btn",onClick:function(){return e=n,void u((function(t){t[e].completed=!l[e].completed}));var e},children:"\u2713"})]}),p.show&&p.item===n&&Object(c.jsx)(d,{deleteFunc:k,deleteItem:p.item,closeCallback:function(){return v({show:!1})}})]},n)}))})]}),h.show&&Object(c.jsx)(j,{action:"new"===h.action?function(e){u((function(t){t[e.title]=e}))}:function(e){u((function(t){delete t[h.selected.title],t[e.title]=e}))},task:h.selected,exitForm:function(){return m({show:!1})}})]})};function h(){var e=Object(b.a)(JSON.parse(localStorage.getItem("Groups"))||{}),t=Object(r.a)(e,2),n=t[0],o=t[1],i=Object(s.useState)({groupForm:!1,selectedGroup:null}),l=Object(r.a)(i,2),u=l[0],j=l[1],h=Object(s.useState)({show:!1,item:null}),m=Object(r.a)(h,2),f=m[0],x=m[1],p=function(e){o((function(t){t[e]={name:e,tasks:{}}}))},v=function(e){o((function(t){delete t[e]}))},k=function(e){var t=e.group,n=e.tasks;o((function(e){e[t.name].tasks=n}))};return Object(s.useEffect)((function(){0===Object.keys(n).length&&p("General"),localStorage.setItem("Groups",JSON.stringify(n))})),Object(c.jsx)("div",{children:Object(c.jsxs)("div",{className:"groups",children:[Object(c.jsxs)("div",{className:"head-bar",children:[Object(c.jsx)("h2",{children:"Groups"}),Object(c.jsx)("button",{className:"new-btn",onClick:function(){return j({groupForm:!0})},children:"+"})]}),u.groupForm&&Object(c.jsx)(a,{addGroup:p,exitForm:function(){return j({groupForm:!1})}}),Object(c.jsx)("ul",{children:Object.entries(n).map((function(e){var t=Object(r.a)(e,2),n=t[0],s=t[1];return Object(c.jsxs)("li",{className:"group",children:[Object(c.jsx)("button",{className:"remove-btn",onClick:function(){return x({show:!0,item:n})},children:"x"}),Object(c.jsx)("p",{className:"title",onClick:function(){return j({selectedGroup:u.selectedGroup===n?null:n})},children:n}),u.selectedGroup===n&&Object(c.jsx)(O,{group:s,updateGroupTasks:k}),f.show&&f.item===n&&Object(c.jsx)(d,{deleteFunc:v,deleteItem:f.item,closeCallback:function(){return x({show:!1})}})]},n)}))})]})})}var m=function(){return Object(c.jsxs)("div",{className:"App",children:[Object(c.jsx)("header",{children:Object(c.jsx)("h1",{children:"To-Do"})}),Object(c.jsx)(h,{})]})};l.a.render(Object(c.jsx)(o.a.StrictMode,{children:Object(c.jsx)(m,{})}),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.6b42a0e2.chunk.js.map