(window.webpackJsonpresellerdemov2=window.webpackJsonpresellerdemov2||[]).push([[0],{24:function(e,t,a){e.exports=a(37)},35:function(e,t,a){},36:function(e,t,a){},37:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(20),l=a.n(c),s=a(5),m=a(8),i=a(3),o=Object(i.a)({basename:"/",forceRefresh:!1,keyLength:6}),d=a(23),u=a(7),E=a(1),f=a(9),p=function(e){var t=e.title,a=e.secondLine;return r.a.createElement("div",{className:"card-header main-bg"},r.a.createElement("h5",{className:"card-title"},t),a?a():null)},b=function(){return r.a.createElement("div",{className:"card-footer d-flex justify-content-around",id:"FooterIcons"},r.a.createElement(s.b,{to:"/reseller-demo/"},r.a.createElement(f.e,null)),r.a.createElement(f.d,null),r.a.createElement(f.b,null),r.a.createElement(f.c,null))},v={default:f.a};function N(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,n)}return a}var h=function(e){var t=e.walletInfo,a=t.name,n=(t.shortcut,t.price),c=t.diff,l=t.icon;return r.a.createElement("div",{className:"card",id:"list-field"},r.a.createElement("div",{className:"card-body"},r.a.createElement("div",{className:"row justify-content-between"},r.a.createElement("div",{className:"col"},r.a.createElement("h5",{className:"card-title"},r.a.createElement(l,null),a),r.a.createElement("h6",{className:"card-subtitle"},a)),r.a.createElement("div",{className:"col d-flex flex-column align-items-end"},r.a.createElement("span",{className:"card-title"},"$ ",n),r.a.createElement("span",{className:"card-subtitle"},c)))))},y=function(e){var t=window.localStorage.getItem("wallets")||JSON.stringify([{name:"Zilliqa",shortcut:"ZIL",address:"0xa823a39d2d5d2b981a10ca8f0516e6eaff78bdcf",price:"24.32",diff:"+5.90%"}]),a=Object(n.useState)(JSON.parse(t).map(function(e){return function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?N(a,!0).forEach(function(t){Object(u.a)(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):N(a).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}({},e,{icon:v.default})})),c=Object(E.a)(a,2),l=c[0],m=c[1],i=Object(n.useState)(!1),o=Object(E.a)(i,2),f=o[0],y=o[1],g=Object(n.useState)(""),w=Object(E.a)(g,2),O=w[0],j=w[1],x=Object(n.useState)(""),S=Object(E.a)(x,2),P=S[0],k=S[1],D=Object(n.useState)("0xa823a39d2d5d2b981a10ca8f0516e6eaff78bdcf"),I=Object(E.a)(D,2),C=I[0],A=I[1],F=function(){return r.a.createElement("div",{className:"row justify-content-end",id:"buttons"},r.a.createElement("button",{type:"button",className:"btn btn-dark btn-md",onClick:function(e){return y(!0)}},"Add new wallet"),r.a.createElement("button",{type:"button",className:"btn btn-dark btn-md",onClick:function(e){return H()}},"Reset"))},H=function(){window.localStorage.clear(),window.location.reload()},L=function(e){e.preventDefault();var t=[].concat(Object(d.a)(l),[{name:O,shortcut:P,address:C,diff:"-",icon:v.default,price:5}]);m(t),window.localStorage.setItem("wallets",JSON.stringify(t)),y(!1)};return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"row justify-content-md-center flex-nowrap mt-5"},r.a.createElement("div",{className:"col-lg-fluid"},r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"container-fluid"},r.a.createElement("div",{className:"card",style:{width:"45rem",minHeight:"40rem"}},r.a.createElement(p,{title:"Wallets",secondLine:F}),r.a.createElement("div",{className:"card-body"},f?r.a.createElement("div",{className:"card"},r.a.createElement("div",{className:"card-body"},r.a.createElement("form",{onSubmit:L},r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"formGroupExampleInput"},"Wallet Name"),r.a.createElement("input",{type:"text",className:"form-control",id:"formGroupExampleInput",placeholder:"Wallet Name",value:O,onChange:function(e){return j(e.target.value)}})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"formGroupExampleInput"},"Shortcut"),r.a.createElement("input",{type:"text",className:"form-control",id:"formGroupExampleInput",placeholder:"Shortcut",value:P,onChange:function(e){return k(e.target.value)}})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"formGroupExampleInput"},"Address"),r.a.createElement("input",{type:"text",className:"form-control",id:"formGroupExampleInput",placeholder:"Address",value:C,onChange:function(e){return A(e.target.value)}}))))):r.a.createElement("div",{className:"card"},l.map(function(e,t){return r.a.createElement(h,{walletInfo:e,key:t})})),f?r.a.createElement("div",{className:"row justify-content-md-center"},r.a.createElement("button",{type:"button",className:"btn btn-primary btn-md",id:"margin-top",onClick:L},"Create Wallet"),r.a.createElement("button",{type:"button",className:"btn btn-danger btn-md",id:"margin-top",onClick:function(e){return y(!1)}},"Cancel")):r.a.createElement(s.b,{to:{pathname:"/"}},r.a.createElement("button",{type:"button",className:"btn btn-primary btn-block",id:"margin-top"},"Buy .ZIL domains"))),r.a.createElement(b,null)))))))},g=a(11),w=a.n(g),O=a(13),j={reseller:"udtesting",token:"1txobsttv63p5wrfvnpjp0wfuava5cov"},x=a(17),S=a.n(x);function P(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,n)}return a}function k(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?P(a,!0).forEach(function(t){Object(u.a)(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):P(a).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}var D=function(e){var t=Object(n.useState)("reseller-test-".concat(j.reseller,"-").concat(Math.floor(502562*Math.random()),".zil")),a=Object(E.a)(t,2),c=a[0],l=a[1],m=Object(n.useState)(null),i=Object(E.a)(m,2),o=i[0],d=i[1],u=Object(n.useState)(!1),f=Object(E.a)(u,2),v=f[0],N=f[1],h=function(){var e=Object(O.a)(w.a.mark(function e(t){var a,n;return w.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),d(null),a=/[.]\w{3}$/.test(c)?c:"".concat(c,".zil"),N(!0),e.next=7,r="".concat("https://unstoppabledomains.com/api/v1/resellers","/").concat(j.reseller,"/domains/").concat(a),fetch(r,{headers:{Authentication:"Bearer ".concat(j.token)}}).then(function(e){return e.json()});case 7:n=e.sent,d(k({},n)),N(!1);case 10:case"end":return e.stop()}var r},e)}));return function(t){return e.apply(this,arguments)}}(),y=function(){if(null!=o.errors)return r.a.createElement("div",{className:"card",id:"big"},r.a.createElement("div",{className:"card-header"},r.a.createElement("h5",{className:"card-title"},"Error")),r.a.createElement("div",{className:"card-body"},o.errors.map(function(e,t){return r.a.createElement("p",{className:"card-text",key:t},e.message)})));var t=o.domain;return t&&!t.reselling?r.a.createElement("div",{className:"card",id:"big"},r.a.createElement("div",{className:"card-header"},r.a.createElement("h5",{className:"card-title"},t.name)),r.a.createElement("div",{className:"card-body"},r.a.createElement("h6",{className:"card-subtitle"},"Domain is not available"))):r.a.createElement("div",{className:"card",id:"big"},r.a.createElement("div",{className:"card-header"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-9"},r.a.createElement("h5",{className:"card-title"},t.name),r.a.createElement("h6",{className:"card-subtitle"},"Domain is available")),r.a.createElement("div",{className:"col-3 d-flex justify-content-end"},r.a.createElement("h5",{className:"card-title"},"$ ",t.reselling&&t.reselling.price)))),r.a.createElement("div",{className:"card-body"},r.a.createElement(s.b,{to:{pathname:"/email",state:k({},e.location.state,{},o,{owner:"0xa823a39d2d5d2b981a10ca8f0516e6eaff78bdcf"})}},r.a.createElement("button",{type:"button",className:"btn btn-primary btn-block"},"BUY"))))};return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"row justify-content-md-center flex-nowrap mt-5"},r.a.createElement("div",{className:"col-lg-fluid"},r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"container-fluid"},r.a.createElement("div",{className:"card",style:{width:"45rem",minHeight:"40rem"}},r.a.createElement(p,{title:"Buy Zil domain"}),r.a.createElement("div",{className:"card-body d-flex flex-column justify-content-between"},r.a.createElement("div",{className:"card-fluid"},r.a.createElement("form",{className:"form-inline ",onSubmit:h},r.a.createElement("div",{className:"form-group col-sm-12",id:"my-form"},r.a.createElement("div",{className:"container-fluid d-flex justify-content-md-center"},r.a.createElement("input",{type:"text",placeholder:"Choose your domain name, wisely",className:"form-control-lg col-11",value:c,onChange:function(e){return l(e.target.value)}}),r.a.createElement("button",{type:"submit",className:"btn btn-primary btn-lg m-0 ml-1"},"Search")),r.a.createElement("small",{id:"passwordHelpBlock",className:"form-text text-muted"},"*For the purpose of this demo use this domain namespace ",r.a.createElement("code",null,"reseller-testing-udtesting-[random number]"))))),v?r.a.createElement("div",{className:"loader"},"Searching..."):null,o?y():null,r.a.createElement("div",{className:"row justify-content-md-center align-items-end"},r.a.createElement("h4",{className:"card-subtitle"},"Learn more about .ZIL domain"))),r.a.createElement(b,null)))))),r.a.createElement("div",{className:"row justify-content-md-center flex-nowrap mt-5"},r.a.createElement("div",{className:"col-lg-fluid"},r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"container-fluid"},r.a.createElement("div",{className:"card",style:{width:"40rem",minHeight:"40rem"}},r.a.createElement("div",{className:"card-body"},r.a.createElement("h5",{className:"card-title"},"Left Hints"),r.a.createElement("div",{className:"card",id:"list-field"},r.a.createElement("div",{className:"card-header"},r.a.createElement("h5",{className:"card-title"},"Base URL")),r.a.createElement("div",{className:"card-body"},r.a.createElement("p",{className:"card-text"},"https://unstoppabledomains.com/api/v1"))),r.a.createElement("div",{className:"card",id:"list-field"},r.a.createElement("div",{className:"card-header"},r.a.createElement("h5",{className:"card-title"},"API Calls")),r.a.createElement("div",{className:"card-body"},r.a.createElement("div",{className:"card",id:"list-field"},r.a.createElement("div",{className:"card-header"},r.a.createElement("p",{className:"card-text"},"/resellers",r.a.createElement("code",null,"resseler-id"),"/domains",r.a.createElement("code",null,"/domain-name"),".zil")),r.a.createElement("div",{className:"card-body"},r.a.createElement("ul",null,r.a.createElement("li",null,"Method: GET"),r.a.createElement("li",null,"Response:",r.a.createElement(S.a,{src:{domain:{name:"bogdantest.zil",owner:"0xa823a39d2d5d2b981a10ca8f0516e6eaff78bdcf",reselling:null,auction:null}},collapsed:!0,displayDataTypes:!1,indentWidth:1,collapseStringsAfterLength:10,displayObjectSize:!1})),r.a.createElement("li",null,"Errors:",r.a.createElement(S.a,{src:{errors:[{code:"DOMAIN_NAME_INVALID",message:"Domain name is invalid"}]},collapsed:!0,displayDataTypes:!1,indentWidth:1,collapseStringsAfterLength:20,displayObjectSize:!1})))))))))))),r.a.createElement("div",{className:"col-lg-fluid"},r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"container-fluid"},r.a.createElement("div",{className:"card",style:{width:"40rem",minHeight:"40rem"}},r.a.createElement("div",{className:"card-body"},r.a.createElement("h5",{className:"card-title"},"Right Hints"),r.a.createElement("div",{className:"card",id:"list-field"},r.a.createElement("div",{className:"card-header"},r.a.createElement("p",{className:"card-text"},"You need to have a ZIL or ETH wallet in your list to  buy a domain")),r.a.createElement("div",{className:"card-body"},r.a.createElement("ul",{style:{paddingLeft:"15px"}},r.a.createElement("li",null,"Click on the add new wallet button at the top"),r.a.createElement("li",null,"Fill the form"),r.a.createElement("li",null,"Don't change the address"),r.a.createElement("li",null,"Submit is on the left")))),r.a.createElement("div",{className:"card",id:"list-field"},r.a.createElement("div",{className:"card-header"},r.a.createElement("h5",{className:"card-title"},"Test domain name space")),r.a.createElement("div",{className:"card-body"},r.a.createElement("p",{className:"card-text"},"For testing purporses please use folowing name conventions"),r.a.createElement("code",null,"[reseller-test-][reseller-ID]-[any number].zil"),r.a.createElement("p",{className:"card-text"},"Example."),r.a.createElement("code",null,"reseller-test-",j.reseller,"-",Math.floor(502562*Math.random()).zil))),r.a.createElement("div",{className:"card",id:"list-field"},r.a.createElement("div",{className:"card-header"},r.a.createElement("h5",{className:"card-title"},"Reseller ID")),r.a.createElement("div",{className:"card-body"},r.a.createElement("h5",{className:"card-title"},"Get your id and API token from UD team"),r.a.createElement("p",{className:"card-text"},"You will need to use your API ID instead of hardcoded udtesting in examples above. You can the API ID and token from UD integration team"))))))))))};function I(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,n)}return a}function C(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?I(a,!0).forEach(function(t){Object(u.a)(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):I(a).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}var A=function(e){var t=Object(n.useState)("example@example.com"),a=Object(E.a)(t,2),c=a[0],l=a[1],s=function(e){return!/.+@.+\..+/.test(e)},i=Object(n.useState)(s("")),o=Object(E.a)(i,2),d=o[0],u=o[1],f=function(){if(d)return e.history.push({pathname:"/checkout",state:C({},e.location.state,{email:c})})};return e.location.state?r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"row justify-content-md-center flex-nowrap mt-5"},r.a.createElement("div",{className:"col-lg-fluid"},r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"container-fluid"},r.a.createElement("div",{className:"card",style:{width:"45rem",minHeight:"40rem"}},r.a.createElement(p,{title:"Enter email"}),r.a.createElement("div",{className:"card-body",id:"big"},r.a.createElement("div",{className:"card"},r.a.createElement("div",{className:"card-header"},r.a.createElement("div",{className:"row justify-content-between"},r.a.createElement("div",{className:"col-9"},r.a.createElement("h5",{className:"card-title"},e.location.state.domain.name)),r.a.createElement("div",{className:"col-3 d-flex justify-content-end"},r.a.createElement("h5",{className:"card-title"},"$ ",e.location.state.domain.reselling.price))))),r.a.createElement("div",{className:"card"},r.a.createElement("div",{className:"card-body"},r.a.createElement("form",{className:"form-inline justify-content-md-center",onSubmit:f},r.a.createElement("p",{className:"card-text"},"Please provide an email address"),r.a.createElement("input",{type:"text",placeholder:"Email",className:"form-control-lg col-11",value:c,onChange:function(e){l(e.target.value),u(!s(e.target.value))}})))),r.a.createElement("div",{className:"d-flex justify-content-md-center"},r.a.createElement("button",{type:"submit",className:"btn btn-primary col-6",onClick:f,disabled:!d,id:"margin-top"},"Next"))),r.a.createElement(b,null)))))),r.a.createElement("div",{className:"row justify-content-md-center flex-nowrap mt-5 md-5"},r.a.createElement("div",{className:"col-lg-fluid"},r.a.createElement("div",{className:"container  md-5"},r.a.createElement("div",{className:"container-fluid"},r.a.createElement("div",{className:"card",style:{width:"45rem",minHeight:"40rem"}},r.a.createElement("div",{className:"card-body"},r.a.createElement("h5",{className:"card-title"},"Hints"),r.a.createElement("div",{className:"card",id:"list-field"},r.a.createElement("div",{className:"card-header"},r.a.createElement("h5",{className:"card-title"},"Add new wallet")),r.a.createElement("div",{className:"card-body"},r.a.createElement("p",{className:"card-text"},"For testing purporses you can create a mock wallet by pressing plus button on top"))),r.a.createElement("div",{className:"card",id:"list-field"},r.a.createElement("div",{className:"card-header"},r.a.createElement("h5",{className:"card-title"},"Clean the list")),r.a.createElement("div",{className:"card-body"},r.a.createElement("p",{className:"card-text"},"You can erase all wallets created earlier by pressing reset button")))))))))):r.a.createElement(m.a,{to:"/"})};function F(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,n)}return a}function H(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?F(a,!0).forEach(function(t){Object(u.a)(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):F(a).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}var L=function(e){var t=e.location.state,a=Object(n.useState)("4815821033352416"),c=Object(E.a)(a,2),l=c[0],s=c[1],i=Object(n.useState)(),o=Object(E.a)(i,2),d=o[0],u=o[1],f=Object(n.useState)(!1),v=Object(E.a)(f,2),N=v[0],h=v[1];if(!t)return r.a.createElement(m.a,{to:"/"});var y=t.domain.name,g=t.owner,w=t.email,O=function(e){u(e),e.errors||h(!0)},x=function(e){var t,a="https://unstoppabledomains.com/api/v1/resellers/udtesting/users/".concat(w,"/orders");t={order:{domains:[{name:y,owner:g,resolution:{crypto:{ZIL:{address:"0xa823a39d2d5d2b981a10ca8f0516e6eaff78bdcf"},ETH:{address:"0xa823a39d2d5d2b981a10ca8f0516e6eaff78bdcf"}}}}]}},fetch(a,{method:"POST",body:JSON.stringify(t),headers:{Authentication:"Bearer ".concat(j.token),"Content-Type":"application/json"}}).then(function(e){return e.json()}).then(O)};return N?(h(!1),e.history.push({pathname:"/finish",state:H({},e.location.state,{},d)})):r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"row justify-content-md-center flex-nowrap mt-5"},r.a.createElement("div",{className:"col-lg-fluid"},r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"container-fluid"},r.a.createElement("div",{className:"card",style:{width:"45rem",minHeight:"40rem"}},r.a.createElement(p,{title:"Payment flow"}),r.a.createElement("div",{className:"card-body"},r.a.createElement("div",{className:"card"},r.a.createElement("div",{className:"card-header"},r.a.createElement("p",{className:"card-title"},"Payment Flow Credit Card Mock")),r.a.createElement("div",{className:"card-body"},r.a.createElement("form",null,r.a.createElement("div",{className:"form-row mt-5"},r.a.createElement("label",{htmlFor:"creditCard",className:"align-self-start"},"Credit card number"),r.a.createElement("input",{id:"creditCard",type:"text",value:l,className:"form-control",onChange:function(e){return s(e.target.value)}})),r.a.createElement("div",{className:"form-row mt-5 justify-content-md-center"},r.a.createElement("button",{onClick:x,className:"btn btn-primary btn-lg mt-5"},"Buy ",y)))))),r.a.createElement(b,null)))))))},B=function(e){var t=e.location.state,a=Object(n.useState)(!1),c=Object(E.a)(a,2),l=c[0],i=c[1];Object(n.useEffect)(function(){if(t){var e=t.order.orderNumber,a=t.email,n=setInterval(function(){return r.apply(this,arguments)},5e3);return function(){return clearInterval(n)}}function r(){return(r=Object(O.a)(w.a.mark(function t(){var n,r,c;return w.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(!0!==l){t.next=2;break}return t.abrupt("return");case 2:return n="https://unstoppabledomains.com/api/v1/resellers/udtesting/users/".concat(a,"/orders/").concat(e),t.next=5,fetch(n,{method:"GET",headers:{Authentication:"Bearer ".concat(j.token),"Content-Type":"application/json"}});case 5:return r=t.sent,t.next=8,r.json();case 8:c=t.sent,200===r.status&&i("MINED"===c.order.items[0].blockchain.status);case 10:case"end":return t.stop()}},t)}))).apply(this,arguments)}},[l,i,t]);var o=function(){return r.a.createElement("div",{className:"card d-flex align-items-md-center"},r.a.createElement("div",{className:"card-header"},r.a.createElement("h3",{className:"card-title"},"Order status"),r.a.createElement("h5",{className:"card-subtitle"},"Unfortunately, transactions on blockchain are not completed instantly. Use this page as a reference to the status of your transactions")),r.a.createElement("div",{className:"card-body"},r.a.createElement("div",{className:"loader"},"Searching...")))};return t?r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"row justify-content-md-center flex-nowrap mt-5"},r.a.createElement("div",{className:"col-lg-fluid"},r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"container-fluid"},r.a.createElement("div",{className:"card",style:{width:"45rem",minHeight:"40rem"}},r.a.createElement(p,{title:"Status Check"}),r.a.createElement("div",{className:"card-body",id:"list-field"},l?r.a.createElement("div",{className:"card d-flex align-items-md-center"},r.a.createElement("img",{src:"https://www.freeiconspng.com/uploads/youtube-like-png-14.png",className:"card-img-top col-6",alt:"Ok"}),r.a.createElement("div",{className:"card-body"},r.a.createElement("h3",{className:"card-title"},"Congratulations!"),r.a.createElement("h5",{className:"card-subtitle text-center"},"You own"),t.order.items.map(function(e){return r.a.createElement("span",{key:e.name},e.name)}))):o()),r.a.createElement("div",{className:"row justify-content-md-center align-items-end"},r.a.createElement("button",{className:"btn btn-info btn-lg disabled"},"Post-configure your domain!"),r.a.createElement(s.b,{to:"/landing"},r.a.createElement("button",{className:"btn btn-success btn-lg"},"Homepage"))),r.a.createElement(b,null))))))):r.a.createElement(m.a,{to:"/"})},T=function(){return r.a.createElement("div",{className:"App"},r.a.createElement("div",{className:"container-fluid",id:"tall"},r.a.createElement("div",{className:"row justify-content-md-center"},r.a.createElement("h1",null,"Reseller buy demo")),r.a.createElement(s.a,{history:o,basename:"/"},r.a.createElement(m.d,null,r.a.createElement(m.b,{path:"/",exact:!0,component:D}),r.a.createElement(m.b,{path:"/reseller-demo/",exact:!0,component:D}),r.a.createElement(m.b,{path:"/landing",exact:!0,component:y}),r.a.createElement(m.b,{path:"/email",exact:!0,component:A}),r.a.createElement(m.b,{path:"/checkout",exact:!0,component:L}),r.a.createElement(m.b,{path:"/finish",exact:!0,component:B})))))};a(35),a(36);l.a.render(r.a.createElement(T,null),document.getElementById("root"))}},[[24,1,2]]]);
//# sourceMappingURL=main.109fa6db.chunk.js.map