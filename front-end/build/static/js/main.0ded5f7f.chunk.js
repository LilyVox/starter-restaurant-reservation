(this["webpackJsonpstarter-restaurant-reservation-front-end"]=this["webpackJsonpstarter-restaurant-reservation-front-end"]||[]).push([[0],{41:function(e,t,n){},42:function(e,t,n){"use strict";n.r(t);var r=n(1),a=n.n(r),c=n(24),s=n.n(c),i=n(6),o=n(8),u=n(0),l=function(e){var t=e.to,n=void 0===t?"/":t,r=e.icon,a=void 0===r?"":r,c=e.text,s=void 0===c?"":c;return Object(u.jsx)("li",{className:"nav-item",children:Object(u.jsxs)(o.b,{className:"nav-link",to:"".concat(n),children:[Object(u.jsx)("span",{className:"oi ".concat(a)}),"\xa0","".concat(s)]})})};var b=function(){return Object(u.jsx)("nav",{className:"navbar navbar-dark align-items-start p-0",children:Object(u.jsxs)("div",{className:"container-fluid d-flex flex-column p-0",children:[Object(u.jsx)(o.b,{className:"navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0",to:"/",children:Object(u.jsx)("div",{className:"sidebar-brand-text mx-3",children:Object(u.jsx)("span",{children:"Periodic Tables"})})}),Object(u.jsx)("hr",{className:"sidebar-divider my-0"}),Object(u.jsxs)("ul",{className:"nav navbar-nav text-light",id:"accordionSidebar",children:[Object(u.jsx)(l,{to:"/dashboard",icon:"oi-dashboard",text:"Dashboard"}),Object(u.jsx)(l,{to:"/search",icon:"oi-magnifying-glass",text:"Search"}),Object(u.jsx)(l,{to:"/reservations/new",icon:"oi-plus",text:"New Reservation"}),Object(u.jsx)(l,{to:"/tables/new",icon:"oi-layers",text:"New Table"})]}),Object(u.jsx)("div",{className:"text-center d-none d-md-inline",children:Object(u.jsx)("button",{className:"btn rounded-circle border-0",id:"sidebarToggle",type:"button"})})]})})},d=n(3),j=n.n(d),h=n(4),m=n(5),p=/\d\d\d\d-\d\d-\d\d/;function f(e){return"".concat(e.getFullYear().toString(10),"-").concat((e.getMonth()+1).toString(10).padStart(2,"0"),"-").concat(e.getDate().toString(10).padStart(2,"0"))}function v(){return f(new Date)}function x(e){return e?(e.reservation_date=e.reservation_date.match(p)[0],e):e}function O(e){return Array.isArray(e)?e.map(x):x(e)}var g="http://localhost:5000",N=new Headers;function y(e,t,n){return w.apply(this,arguments)}function w(){return(w=Object(h.a)(j.a.mark((function e(t,n,r){var a,c;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch(t,n);case 3:if(204!==(a=e.sent).status){e.next=6;break}return e.abrupt("return",null);case 6:return e.next=8,a.json();case 8:if(!(c=e.sent).error){e.next=11;break}return e.abrupt("return",Promise.reject({message:c.error}));case 11:return e.abrupt("return",c.data);case 14:if(e.prev=14,e.t0=e.catch(0),"AbortError"===e.t0.name){e.next=19;break}throw console.error(e.t0.stack),e.t0;case 19:return e.abrupt("return",Promise.resolve(r));case 20:case"end":return e.stop()}}),e,null,[[0,14]])})))).apply(this,arguments)}function _(){return(_=Object(h.a)(j.a.mark((function e(t,n){var r;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=new URL("".concat(g,"/reservations")),Object.entries(t).forEach((function(e){var t=Object(m.a)(e,2),n=t[0],a=t[1];return r.searchParams.append(n,a.toString())})),e.next=4,y(r,{headers:N,signal:n},[]).then(O).then(O);case 4:return e.abrupt("return",e.sent);case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}N.append("Content-Type","application/json");var k=function(e){var t=e.res,n=e.index,r=e.suppressSeat,a=void 0===r?null:r,c=e.cancelHandler,s=void 0===c?null:c,i=e.showWhenFinished,o=function(){return Object(u.jsx)("a",{className:"btn btn-success",href:"/reservations/".concat(t.reservation_id,"/seat"),children:"Seat"})},l=function(){return Object(u.jsx)("a",{className:"btn btn-primary",href:"/reservations/".concat(t.reservation_id,"/edit"),children:"Edit"})},b=function(){return null===s?null:Object(u.jsx)("button",{className:"btn btn-primary",onClick:function(){return s(t.reservation_id)},"data-reservation-id-cancel":t.reservation_id,children:"Cancel"})},d="finished"===t.status,j=!i||d||i,h=!a&&"booked"===t.status;return j&&Object(u.jsxs)("div",{className:"card text-center bg-transparent border-warning border-bottom rounded-3 border-0 m-2 shadow",children:[Object(u.jsx)("div",{className:"card-header",children:"Reservation ID: ".concat(t.reservation_id)}),Object(u.jsxs)("div",{className:"card-body",children:["".concat(t.first_name,", ").concat(t.last_name),Object(u.jsx)("br",{}),"Reservation for ".concat(t.people)]}),Object(u.jsx)("div",{className:"card-body","data-reservation-id-status":t.reservation_id,children:"".concat(t.status)}),Object(u.jsxs)("div",{className:"card-footer",children:[!d&&Object(u.jsx)(b,{})," ".concat(t.reservation_time," "),Object(u.jsx)(l,{})]}),!d&&h&&Object(u.jsx)(o,{})]},n)},S=n(16),C=function(e){var t=e.reservations,n=e.cancelHandler,r=e.showWhenFinished,a=void 0!==r&&r,c=S.a.isEmpty(t),s="row m-1 gx-0";return Array.isArray(t)&&!c?Object(u.jsx)("div",{className:s,children:t.map((function(e){return Object(u.jsx)(k,{res:e,index:e.reservation_id,cancelHandler:n,showWhenFinished:a},e.reservation_id)}))}):"object"!==typeof t||c?Object(u.jsx)("div",{className:"row m-3",children:"No reservations were found."}):Object(u.jsx)("div",{className:s,children:Object(u.jsx)(k,{res:t,index:t.reservation_id,cancelHandler:n,showWhenFinished:a})})};var H=function(e){var t=e.error,n=(null===t||void 0===t?void 0:t.error)||(null===t||void 0===t?void 0:t.message);return!!n&&Object(u.jsxs)("div",{className:"alert alert-danger m-2",children:["Error: ",n]})};var D=function(e){var t=e.errors,n=void 0===t?[]:t,r=n.length>1;if(!r)return Object(u.jsx)(H,{error:{error:n[0]}});var a=n.map((function(e,t){return Object(u.jsx)(H,{error:{error:e}},t)}));return!!r&&Object(u.jsx)("div",{className:"alert alert-danger m-2",children:a})},T=function(e){var t=e.table,n=e.finishHandler,r="occupied"===t.status;return Object(u.jsxs)("div",{className:"card flex-4 text-center bg-transparent border-bottom rounded-3 border-0 m-2 shadow",style:{width:"16EM"},children:[Object(u.jsx)("div",{className:"card-header border-secondary",children:"".concat(t.table_name," Seats up to ").concat(t.capacity)}),Object(u.jsxs)("div",{className:"card-body ".concat(r?"bg-warning":"bg-success"),"data-table-id-status":t.table_id,children:[t.status," ",t.reservation_id&&" with ".concat(t.reservation_id)]}),r&&Object(u.jsx)("button",{className:"btn btn-danger","data-table-id-finish":t.table_id,onClick:function(){return n(t.table_id)},children:"Finish"})]})};var F=function(e){var t=e.tables,n=e.finishHandler,r=null;return t.length>0&&(r=t.map((function(e){return Object(u.jsx)(T,{table:e,finishHandler:n},e.table_id)}))),Object(u.jsxs)("div",{className:"flex row m-3 gx-0 ",children:[Object(u.jsx)("h2",{className:"px-5",children:Object(u.jsx)("b",{children:"Tables"})}),r]})},E=(n(19),"http://localhost:5000"),M=new Headers;function P(e){return A.apply(this,arguments)}function A(){return(A=Object(h.a)(j.a.mark((function e(t){var n,r;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=JSON.stringify({data:t}),r={method:"POST",headers:M,body:n},e.next=4,fetch("".concat(E,"/tables/"),r);case 4:return e.abrupt("return",e.sent);case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function R(e,t){return X.apply(this,arguments)}function X(){return(X=Object(h.a)(j.a.mark((function e(t,n){var r,a,c;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r={reservation_id:t},a=JSON.stringify({data:r}),c={method:"PUT",headers:M,body:a},e.next=5,fetch("".concat(E,"/tables/").concat(n,"/seat"),c);case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function J(e){return q.apply(this,arguments)}function q(){return(q=Object(h.a)(j.a.mark((function e(t){var n;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={method:"DELETE",headers:M},e.next=3,fetch("".concat(E,"/tables/").concat(t,"/seat"),n);case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function W(e){return $.apply(this,arguments)}function $(){return($=Object(h.a)(j.a.mark((function e(t){var n;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={method:"GET",headers:M,signal:t},e.next=3,fetch("".concat(E,"/tables/"),n).then((function(e){return e.json()})).then((function(e){return e.data}));case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}M.append("Content-Type","application/json");var L=function(e){var t=e.date,n=e.cancelHandler,a=Object(r.useState)([]),c=Object(m.a)(a,2),s=c[0],o=c[1],l=Object(r.useState)([]),b=Object(m.a)(l,2),d=b[0],p=b[1],x=Object(r.useState)([]),O=Object(m.a)(x,2),g=O[0],N=O[1],y=Object(i.g)();Object(r.useEffect)((function(){var e=new AbortController,n=new AbortController;return function(e,t){return _.apply(this,arguments)}({date:t},e.signal).then(o).catch(N),W(n.signal).then(p).catch(N),function(){e.abort(),n.abort()}}),[t]);var w=function(){var e=Object(h.a)(j.a.mark((function e(t){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!window.confirm("Is this table ready to seat new guests?")){e.next=4;break}return e.next=4,J(t).then((function(e){e.ok&&y.push("/tables")})).catch(N);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(u.jsxs)("main",{className:" d-flex row justify-content-center",children:[Object(u.jsxs)("div",{className:"mb-3 text-center shadow",children:[Object(u.jsx)("h1",{className:"m-1",children:"Dashboard"}),Object(u.jsxs)("h4",{className:"",children:["Reservations for ",t]})]}),Object(u.jsx)(D,{errors:g}),Object(u.jsx)("div",{className:"col-6",children:Object(u.jsx)(C,{showWhenFinished:!1,cancelHandler:n,reservations:s})}),Object(u.jsx)("div",{className:"col-6",children:Object(u.jsx)(F,{finishHandler:w,tables:d})}),Object(u.jsxs)("div",{className:"text-center",children:[Object(u.jsx)("button",{className:"btn btn-dark",type:"button",onClick:function(){return y.push("/dashboard?date=".concat(function(e){var t=e.split("-"),n=Object(m.a)(t,3),r=n[0],a=n[1],c=n[2],s=new Date(r,a-=1,c);return s.setMonth(s.getMonth()),s.setDate(s.getDate()-1),f(s)}(t)))},children:"Previous Day"}),Object(u.jsx)("button",{className:"btn btn-dark",type:"button",onClick:function(){return y.push("/dashboard?date=".concat(v()))},children:"Today"}),Object(u.jsx)("button",{className:"btn btn-dark",type:"button",onClick:function(){return y.push("/dashboard?date=".concat(function(e){var t=e.split("-"),n=Object(m.a)(t,3),r=n[0],a=n[1],c=n[2],s=new Date(r,a-=1,c);return s.setMonth(s.getMonth()),s.setDate(s.getDate()+1),f(s)}(t)))},children:"Next Day"})]})]})};var U=function(){return Object(u.jsx)("div",{className:"NotFound",children:Object(u.jsx)("h1",{children:"Not Found"})})},B=n(14),G=n(12);var I=function(e){var t=e.reservation,n=void 0===t?{}:t,r=e.submitHandler,a=e.changeHandler,c=null===n||void 0===n?void 0:n.reservation_date.slice(0,10);return Object(u.jsxs)("form",{onSubmit:r,onChange:a,className:"",id:"reservation_form",name:"reservation_form",children:[Object(u.jsxs)("div",{className:"row-auto",children:[Object(u.jsxs)("div",{className:"col-auto",children:[Object(u.jsx)("label",{className:"form-label",htmlFor:"first_name",children:"First Name"}),Object(u.jsx)("input",{name:"first_name",className:"form-control",type:"text",id:"first_name",placeholder:"First Name",value:n.first_name,onChange:a,required:!0,autoFocus:!0}),Object(u.jsx)("label",{className:"form-label",htmlFor:"last_name",children:"Last Name"}),Object(u.jsx)("input",{className:"form-control",type:"text",name:"last_name",id:"last_name",placeholder:"Last Name",value:n.last_name,onChange:a,required:!0})]}),Object(u.jsxs)("div",{className:"col-auto",children:[Object(u.jsx)("label",{className:"form-label",htmlFor:"mobile_number",children:"Mobile Number"}),Object(u.jsx)("input",{name:"mobile_number",id:"mobile_number",className:"form-control",type:"tel",onChange:a,value:n.mobile_number,placeholder:"XXX-XXX-XXXX",required:!0}),Object(u.jsx)("label",{htmlFor:"people",children:"People"}),Object(u.jsx)("input",{className:"form-control",type:"number",name:"people",id:"people",required:!0,value:n.people,onChange:a})]}),Object(u.jsxs)("div",{className:"col-auto",children:[Object(u.jsx)("label",{className:"form-label",htmlFor:"reservation_time",children:"Reservation Time"}),Object(u.jsx)("input",{className:"form-control",type:"time",name:"reservation_time",placeholder:"HH:MM",value:n.reservation_time,onChange:a,required:!0}),Object(u.jsx)("label",{className:"form-label",htmlFor:"reservation_date",children:"Reservation Date"}),Object(u.jsx)("input",{className:"form-control",type:"date",id:"reservation_date",name:"reservation_date",value:c,onChange:a,required:!0})]})]}),Object(u.jsx)("div",{className:"row m-4",children:Object(u.jsx)("button",{type:"submit",className:"btn btn-warning",children:"Submit Reservation"})})]})},V="http://localhost:5000",Y=new Headers;function z(){return(z=Object(h.a)(j.a.mark((function e(t){var n,r;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=JSON.stringify({data:t}),r={method:"POST",headers:Y,body:n},e.next=4,fetch("".concat(V,"/reservations/"),r);case 4:return e.abrupt("return",e.sent);case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function K(e,t){return Q.apply(this,arguments)}function Q(){return(Q=Object(h.a)(j.a.mark((function e(t,n){var r;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r={method:"GET",headers:Y,signal:n},e.next=3,fetch("".concat(V,"/reservations/").concat(t),r).then((function(e){return e.json()})).then((function(e){return e.data}));case 3:return e.abrupt("return",e.sent);case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function Z(e,t){return ee.apply(this,arguments)}function ee(){return(ee=Object(h.a)(j.a.mark((function e(t,n){var r,a,c;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r={status:n},a=JSON.stringify({data:r}),c={method:"PUT",headers:Y,body:a},e.next=5,fetch("".concat(V,"/reservations/").concat(t,"/status"),c);case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function te(e,t){return ne.apply(this,arguments)}function ne(){return(ne=Object(h.a)(j.a.mark((function e(t,n){var r,a,c;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=n,a=JSON.stringify({data:r}),c={method:"PUT",headers:Y,body:a},e.next=5,fetch("".concat(V,"/reservations/").concat(t),c);case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}Y.append("Content-Type","application/json");var re=function(e){return z.apply(this,arguments)},ae={first_name:"",last_name:"",mobile_number:"",reservation_time:"",reservation_date:"",people:0};var ce=function(){var e=Object(i.h)(),t=Object(r.useState)(ae),n=Object(m.a)(t,2),a=n[0],c=n[1],s=Object(r.useState)([{}]),o=Object(m.a)(s,2),l=o[0],b=o[1],d=Object(i.g)(),p=[],f=e.pathname.split("/"),v=f[2],x="edit"===f[3];Object(r.useEffect)((function(){if(x){var e=new AbortController;return K(v,e.signal).then(c).catch(b),function(){e.abort()}}c(ae)}),[x,v]);var O=function(){var e=Object(h.a)(j.a.mark((function e(t){var n;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.next=3,g().then((function(e){return!(e.length>0)}));case 3:if(!e.sent){e.next=13;break}if(!x){e.next=11;break}return n=Object(G.a)(Object(G.a)({},a),{},{reservation_date:a.reservation_date.slice(0,10)}),e.next=9,te(v,n).then((function(e){if(e.ok)return d.push("/dashboard?date=".concat(y(a.reservation_date))),e.json()})).catch((function(e){return p.push(e)}));case 9:e.next=13;break;case 11:return e.next=13,re(a).then((function(e){if(e.ok)return d.push("/dashboard?date=".concat(a.reservation_date)),e.json()}));case 13:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();function g(){return N.apply(this,arguments)}function N(){return(N=Object(h.a)(j.a.mark((function e(){var t,n;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=x?new Date("".concat(a.reservation_date.slice(0,10),"T").concat(a.reservation_time,":00.000")):new Date("".concat(a.reservation_date,"T").concat(a.reservation_time,":00.000")),n=new Date,2===t.getDay()&&p.push("'reservation_date' field: restaurant is closed on tuesday"),t<n&&p.push("'reservation_date' and 'reservation_time' field must be in the future"),(t.getHours()<10||10===t.getHours()&&t.getMinutes()<30)&&p.push("'reservation_time' field: restaurant is not open until 10:30AM"),(t.getHours()>22||22===t.getHours()&&t.getMinutes()>=30)&&p.push("'reservation_time' field: restaurant is closed after 10:30PM"),(t.getHours()>21||21===t.getHours()&&t.getMinutes()>30)&&p.push("'reservation_time' field: reservation must be made at least an hour before closing (10:30PM)"),p.length>0?b([].concat(p)):b([]),e.abrupt("return",p);case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function y(e){return e.match(/\d{4}-\d{2}-\d{2}/)?e:e.match(/\d{8}/)?e.replace(/(\d{4})-?(\d{2})-?(\d{2})/,"$1-$2-$3"):e.slice(0,10)}return Object(u.jsxs)("main",{className:"container-fluid justify-content-center",children:[Object(u.jsxs)("h1",{className:"my-0",children:[x?"Edit":"Create"," Reservation"]}),Object(u.jsx)(D,{error:{reservationsError:l}}),Object(u.jsx)(I,{reservation:a,submitHandler:O,changeHandler:function(e){var t=e.target,n=t.name,r="people"===n?Number(t.value):"mobile_number"===n?function(e){if(e.match(/[0-9]{3}-[0-9]{3}-[0-9]{4}/))return e;if(e.match(/\d{9}/))return e.replace(/(\d{3})-?(\d{3})-?(\d{4})/,"$1-$2-$3")}(t.value):"reservation_date"===n?y(t.value):t.value;c(Object(G.a)(Object(G.a)({},a),{},Object(B.a)({},n,r)))}}),Object(u.jsx)("button",{className:"btn btn-primary",onClick:function(){d.goBack()},children:"Cancel"})]})},se=function(){var e=Object(r.useState)({}),t=Object(m.a)(e,2),n=t[0],a=t[1],c=Object(i.i)().reservation_id,s=Object(r.useState)({}),o=Object(m.a)(s,2),l=o[0],b=o[1],d=Object(i.g)(),p=Object(r.useState)([]),f=Object(m.a)(p,2),v=f[0],x=f[1],O=Object(r.useState)([]),g=Object(m.a)(O,2),N=g[0],y=g[1],w=0;Object(r.useEffect)((function(){var e=new AbortController,t=new AbortController;return K(c,e.signal).then(a).catch(b),W(t.signal).then(x).catch(y),function(){t.abort(),e.abort()}}),[c]);var _=function(){var e=Object(h.a)(j.a.mark((function e(t){var r;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),!(r=v[w])||!r.hasOwnProperty("capacity")){e.next=11;break}if(!(r.capacity>=n.people)){e.next=8;break}return e.next=6,R(c,r.table_id).then((function(e){e.ok&&d.push("/dashboard")})).catch(y);case 6:e.next=9;break;case 8:b({error:"".concat(r.table_name," cannot seat ").concat(n.people)});case 9:e.next=12;break;case 11:b({error:"Please select an option below."});case 12:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),S=function(e){w=e.target.value};function C(){if(Array.isArray(v)){var e=v.map((function(e,t){return Object(u.jsxs)("option",{disabled:"occupied"===e.status,value:t,children:[e.table_name," - ",e.capacity]},e.table_id)}));return Object(u.jsx)("select",{name:"table_id",className:"form-select",defaultValue:w,onSubmit:_,onChange:S,children:e})}}return Object(u.jsxs)("div",{className:"d-flex flex-column justify-content-center bg-transparent m-2 shadow",children:[Object(u.jsx)(H,{error:l}),Object(u.jsx)(D,{errors:N}),Object(u.jsx)(k,{suppressSeat:!0,res:n,index:n.reservation_id}),Object(u.jsx)(C,{}),Object(u.jsx)("button",{className:"btn btn-success",type:"submit",onClick:_,children:"Submit"}),Object(u.jsx)("button",{className:"btn btn-primary",onClick:function(){return d.goBack()},children:"Cancel"})]})},ie=function(e){var t=e.changeHandler,n=e.submitHandler;return Object(u.jsx)("div",{className:"container",children:Object(u.jsxs)("form",{name:"new_table_form",onSubmit:n,onChange:t,className:"flex-col bg-transparent m-2 p-2",children:[Object(u.jsx)("label",{className:"form-label",htmlFor:"table_name",children:"Table Name"}),Object(u.jsx)("input",{className:"form-control",name:"table_name"}),Object(u.jsx)("label",{className:"form-label",htmlFor:"capacity",children:"Capacity"}),Object(u.jsx)("input",{className:"form-control",name:"capacity"}),Object(u.jsx)("button",{type:"submit",className:"btn btn-warning",children:"Submit"})]})})},oe={table_name:"",capacity:0};var ue=function(){var e=Object(r.useState)(oe),t=Object(m.a)(e,2),n=t[0],a=t[1],c=Object(r.useState)([]),s=Object(m.a)(c,2),o=s[0],l=s[1],b=Object(i.g)(),d=[],p=function(){var e=Object(h.a)(j.a.mark((function e(t){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.next=3,f().then((function(e){return!(e.length>0)}));case 3:if(!e.sent){e.next=7;break}return e.next=7,P(n).then((function(e){e.ok&&b.push("/dashboard")}));case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();function f(){return v.apply(this,arguments)}function v(){return(v=Object(h.a)(j.a.mark((function e(){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.table_name.length<2&&d.push("table_name must be at least 2 characters long"),n.capacity<1&&d.push("capacity must be greater than 0"),d.length>0?l([].concat(d)):l([]),e.abrupt("return",d);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var x=o.length>0?o.map((function(e,t){return Object(u.jsx)(H,{error:{error:e}},t)})):null;return Object(u.jsxs)("main",{className:"container-fluid justify-content-center",children:[Object(u.jsx)("h1",{className:"my-0",children:"Create a new Table"}),x,Object(u.jsx)(ie,{submitHandler:p,changeHandler:function(e){var t=e.target;a(Object(G.a)(Object(G.a)({},n),{},Object(B.a)({},t.name,"capacity"===t.name?Number(t.value):t.value)))}}),Object(u.jsx)("button",{className:"btn btn-primary",onClick:function(){b.goBack()},children:"Cancel"})]})},le="http://localhost:5000",be=new Headers;function de(e,t){return je.apply(this,arguments)}function je(){return(je=Object(h.a)(j.a.mark((function e(t,n){var r;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r={method:"GET",headers:be,signal:n},e.next=3,fetch("".concat(le,"/reservations?mobile_number=").concat(t),r).then((function(e){return e.json()})).then((function(e){return e.data}));case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}be.append("Content-Type","application/json");var he=function(e){var t=e.cancelHandler,n=Object(r.useState)([]),a=Object(m.a)(n,2),c=a[0],s=a[1],i=Object(r.useState)({}),o=Object(m.a)(i,2),l=o[0],b=o[1],d=S.a.isEmpty(c),p=function(){var e=Object(h.a)(j.a.mark((function e(t){var n,r,a;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),n=new AbortController,r=new FormData(t.target),a=r.get("mobile_number"),e.next=6,de(a,n.signal).then(s).catch(b);case 6:return e.abrupt("return",(function(){n.abort()}));case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(u.jsxs)("main",{className:"text-center bg-transparent m-2",children:[Object(u.jsx)("header",{className:"row shadow",children:Object(u.jsx)("h1",{children:Object(u.jsx)("b",{children:"Search"})})}),Object(u.jsx)(H,{error:l}),Object(u.jsxs)("section",{className:"d-flex bg-transparent row m-2",children:[Object(u.jsx)("div",{className:"col-6",children:Object(u.jsxs)("form",{className:"",onSubmit:p,children:[Object(u.jsx)("label",{htmlFor:"mobile_number",className:"form-label",children:"Mobile Number"}),Object(u.jsx)("input",{className:"form-control",name:"mobile_number",id:"mobile_number",type:"tel",placeholder:"Enter a customer's phone number"}),Object(u.jsx)("button",{type:"submit",className:"btn btn-warning",children:"submit"})]})}),Object(u.jsx)("div",{className:"col-6",children:d?"No reservations found":Object(u.jsx)(C,{showWhenFinished:!0,cancelHandler:t,reservations:c})})]})]})};var me=function(){return new URLSearchParams(Object(i.h)().search)};var pe=function(){var e=me(),t=Object(i.g)(),n=e.get("date"),r=function(){var e=Object(h.a)(j.a.mark((function e(n){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!window.confirm("Do you want to cancel this reservation? This cannot be undone.")){e.next=3;break}return e.next=3,Z(n,"cancelled").then((function(e){e.ok&&t.replace("/reservations")}));case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(u.jsxs)(i.d,{children:[Object(u.jsx)(i.b,{exact:!0,path:"/",children:Object(u.jsx)(i.a,{to:"/dashboard"})}),Object(u.jsx)(i.b,{exact:!0,path:"/reservations/new",children:Object(u.jsx)(ce,{})}),Object(u.jsx)(i.b,{exact:!0,path:"/reservations",children:Object(u.jsx)(i.a,{to:"/dashboard"})}),Object(u.jsx)(i.b,{exact:!0,path:"/search",children:Object(u.jsx)(he,{cancelHandler:r})}),Object(u.jsx)(i.b,{exact:!0,path:"/reservations/:reservation_id/seat",children:Object(u.jsx)(se,{})}),Object(u.jsx)(i.b,{exact:!0,path:"/reservations/:reservation_id/edit",children:Object(u.jsx)(ce,{})}),Object(u.jsx)(i.b,{exact:!0,path:"/tables/new",children:Object(u.jsx)(ue,{})}),Object(u.jsx)(i.b,{exact:!0,path:"/tables",children:Object(u.jsx)(i.a,{to:"/dashboard"})}),Object(u.jsx)(i.b,{path:"/dashboard",children:Object(u.jsx)(L,{date:n||v(),cancelHandler:r})}),Object(u.jsx)(i.b,{children:Object(u.jsx)(U,{})})]})};n(41);var fe=function(){return Object(u.jsxs)("div",{className:"container-fluid text-white bg-dark bg-gradient",children:[Object(u.jsxs)("div",{className:"row h-100 ",children:[Object(u.jsx)("div",{className:"col-md-2 side-bar bg-dark bg-gradient rounded-1 shadow-lg",children:Object(u.jsx)(b,{})}),Object(u.jsx)("div",{className:"col",children:Object(u.jsx)(pe,{})})]}),Object(u.jsx)("footer",{className:" bg-warning"})]})};var ve=function(){return Object(u.jsx)(i.d,{children:Object(u.jsx)(i.b,{path:"/",children:Object(u.jsx)(fe,{})})})};s.a.render(Object(u.jsx)(a.a.StrictMode,{children:Object(u.jsx)(o.a,{children:Object(u.jsx)(ve,{})})}),document.getElementById("root"))}},[[42,1,2]]]);
//# sourceMappingURL=main.0ded5f7f.chunk.js.map