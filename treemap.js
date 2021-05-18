!function(t){var e={};function n(r){if(e[r])return e[r].exports;var i=e[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(r,i,function(e){return t[e]}.bind(null,i));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";n.r(e);n(1);const r=n(5),i={showSubHeaders:{section:"Data",type:"boolean",label:"Show Sub Headers",default:"true"},cellColor:{section:"Data",type:"array",display:"colors",label:"Color Palette - Razorhorse",default:["#aa4336","#b04f43","#b4574c","#b86157","#bc6960","#c07169","#c47b73","#c8837c","#cc8c86","#d09590","#d59f9b","#daaaa8"]},breadcrumbs:{type:"array",default:[]}},o=function(t){return parseInt(t)},a={options:i,create:function(t,e){this.style=document.createElement("style"),document.head.appendChild(this.style),this.container=r.select(t).append("div").attr("id","treemapContainer"),this.tooltip=r.select(t).append("div").attr("class","hidden").attr("id","tooltip")},updateAsync:function(t,e,n,u,s,c){this.clearErrors(),console.log("data",t),console.log("config",n),console.log("queryResponse",u);const l=e.clientWidth,f=e.clientHeight-16,h=e.getBoundingClientRect(),p=h.x+h.width/2,d=h.y+h.height/2,v=u.fields.dimension_like,y=u.fields.measure_like,g=function(t,e){for(var n=i,r=[],o=0;o<e.length;o++){(u={})[e[o].label]=e[o].name,r.push(u)}r.push({"Count of Rows (TBD)":"count_of_rows"}),n.sizeBy={section:"Data",type:"string",label:"Size By",display:"select",values:r,default:"0"};var a=[];for(o=0;o<t.length;o++){var u;(u={})[t[o].label]=t[o].name,a.push(u)}return n.colorBy={section:"Data",type:"string",label:"Color By",display:"select",values:a,default:"0"},n}(v,y);a.trigger("registerOptions",g);const m=function(t,e){var n=[];return t.forEach(t=>{var r={},i=0;for(var[o,a]of(r.metadata={},Object.entries(t))){if(r[o]=a.value,i<e.fields.dimension_like.length)var u=e.fields.dimension_like[i].label_short;else u=e.fields.measure_like[i-e.fields.dimension_like.length].label_short;if(void 0!==a.rendered)var s=a.rendered;else s=a.value;r.metadata[o]={label:u,rendered:s,links:a.links},i+=1}n.push(r)}),n}(t,u),_=function(t){var e=[];return t.fields.dimension_like.forEach(t=>{e.push(t.name)}),e}(u),b=function(t){var e=[];return t.fields.measure_like.forEach(t=>{e.push(t.name)}),e}(u),w=r.scaleOrdinal().range(n.cellColor);var x,A=r.treemap().size([l,f]).padding(t=>1===t.depth?2:0).paddingTop(t=>n.showSubHeaders?t.depth<2?16:0:0===t.depth?16:0).round(!0);const k=function(t,e){if(0===e.length)x=t;else{var n=e.shift();for(var r in t.values)void 0!==t&&t.values[r].key===n&&(t=k(t.values[r],e))}},S=function(t){if("count_of_rows"==n.sizeBy)return t.key?0:1;{let e=n.sizeBy;return parseFloat(t[e])}};!function(t){var e=r.nest();v.forEach(t=>e=e.key(e=>e[t.name])),e={key:"root",values:e=e.entries(t)};var i=A(r.hierarchy(e,t=>t.values).sum(t=>S(t)).sort((function(t,e){return e.height-t.height||S(e)-S(t)})));const a=function(t){r.select("#treemapSVG").remove();var u=r.select("#treemapContainer").append("svg").attr("id","treemapSVG").attr("width",l).attr("height",f).append("g").datum(t).attr("class","treemapArea").selectAll("g").data(i.descendants()).enter();u.append("rect").attr("x",t=>t.x0).attr("y",t=>t.y0).attr("width",t=>Math.max(0,t.x1-t.x0)).attr("height",t=>Math.max(0,t.y1-t.y0)).attr("fill",t=>function(t){return 0===t.height?n.takeColorFromCellValue?t.data[n.colorBy]:w(t.data[n.colorBy]):0===t.depth?"#edd0ce":"white"}(t)).attr("stroke","white").on("mouseover",(function(t){console.log("mouseover",r.event);parseFloat(r.select(this).attr("x")),parseFloat(r.select(this).attr("y"));var e=r.event.pageX,n=r.event.pageY;r.select("#tooltip").style("left",e+"px").style("top",n+"px").html(function(t){var e="";if(0===t.height){for(var n in _){e+="<p><em>"+(i=t.data.metadata[_[n]]).label+":</em> "+i.rendered+"</p>"}for(var r in e+="<br>",y){var i;e+="<p><em>"+(i=t.data.metadata[b[r]]).label+":</em> "+i.rendered+"</p>"}}else e+=t.data.key;return e}(t)),r.select("#tooltip").classed("hidden",!1)})).on("mousemove",(function(){var t=r.event.pageX<p?r.event.pageX:r.event.pageX-210,e=r.event.pageY<d?r.event.pageY:r.event.pageY-120;t&&r.select("#tooltip").style("left",t+"px").style("top",e+"px")})).on("mouseout",(function(){r.select("#tooltip").classed("hidden",!0)})).on("click",(function(t){if(0===t.depth)0===n.breadcrumbs.length||(n.breadcrumbs.pop(),k(e,n.breadcrumbs.slice(0)),i=A(r.hierarchy(x,t=>t.values).sum(t=>S(t))),a(i));else{for(;t.depth>1;)t=t.parent;void 0!==t.data.key&&(n.breadcrumbs.push(t.data.key),i=A(r.hierarchy(t.data,t=>t.values).sum(t=>S(t))),a(i))}})),u.append("foreignObject").attr("x",t=>t.x0+3).attr("y",t=>t.y0).attr("width",t=>Math.max(0,t.x1-t.x0-3)).attr("height",t=>Math.max(0,t.y1-t.y0)).attr("fill","#bbbbbb").attr("class","foreignobj").attr("pointer-events","none").attr("white-space","nowrap").append("xhtml:div").html(t=>function(t){var e="";if(0===t.depth){var r=o(t.value);e=0===n.breadcrumbs.length?"Top Level ("+r+"). Click on cells to zoom in, or click on this bar to zoom out":"&#171; "+n.breadcrumbs.join(" – ")+" ("+r+")"}else t.depth<2&&n.showSubHeaders?(r=o(t.value),e=void 0===t.data.key?"":"&#187; "+t.data.key+" ("+r+")"):0===t.height&&(e="count_of_rows"===n.sizeBy?"1":t.data.metadata[n.sizeBy].rendered);return e}(t)).attr("class","textdiv")};a(i)}(m),c()}};looker.plugins.visualizations.add(a)},function(t,e,n){var r=n(2),i=n(3);"string"==typeof(i=i.__esModule?i.default:i)&&(i=[[t.i,i,""]]);var o={insert:"head",singleton:!1};r(i,o);t.exports=i.locals||{}},function(t,e,n){"use strict";var r,i=function(){return void 0===r&&(r=Boolean(window&&document&&document.all&&!window.atob)),r},o=function(){var t={};return function(e){if(void 0===t[e]){var n=document.querySelector(e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(t){n=null}t[e]=n}return t[e]}}(),a=[];function u(t){for(var e=-1,n=0;n<a.length;n++)if(a[n].identifier===t){e=n;break}return e}function s(t,e){for(var n={},r=[],i=0;i<t.length;i++){var o=t[i],s=e.base?o[0]+e.base:o[0],c=n[s]||0,l="".concat(s," ").concat(c);n[s]=c+1;var f=u(l),h={css:o[1],media:o[2],sourceMap:o[3]};-1!==f?(a[f].references++,a[f].updater(h)):a.push({identifier:l,updater:y(h,e),references:1}),r.push(l)}return r}function c(t){var e=document.createElement("style"),r=t.attributes||{};if(void 0===r.nonce){var i=n.nc;i&&(r.nonce=i)}if(Object.keys(r).forEach((function(t){e.setAttribute(t,r[t])})),"function"==typeof t.insert)t.insert(e);else{var a=o(t.insert||"head");if(!a)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");a.appendChild(e)}return e}var l,f=(l=[],function(t,e){return l[t]=e,l.filter(Boolean).join("\n")});function h(t,e,n,r){var i=n?"":r.media?"@media ".concat(r.media," {").concat(r.css,"}"):r.css;if(t.styleSheet)t.styleSheet.cssText=f(e,i);else{var o=document.createTextNode(i),a=t.childNodes;a[e]&&t.removeChild(a[e]),a.length?t.insertBefore(o,a[e]):t.appendChild(o)}}function p(t,e,n){var r=n.css,i=n.media,o=n.sourceMap;if(i?t.setAttribute("media",i):t.removeAttribute("media"),o&&btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(o))))," */")),t.styleSheet)t.styleSheet.cssText=r;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(r))}}var d=null,v=0;function y(t,e){var n,r,i;if(e.singleton){var o=v++;n=d||(d=c(e)),r=h.bind(null,n,o,!1),i=h.bind(null,n,o,!0)}else n=c(e),r=p.bind(null,n,e),i=function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(n)};return r(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;r(t=e)}else i()}}t.exports=function(t,e){(e=e||{}).singleton||"boolean"==typeof e.singleton||(e.singleton=i());var n=s(t=t||[],e);return function(t){if(t=t||[],"[object Array]"===Object.prototype.toString.call(t)){for(var r=0;r<n.length;r++){var i=u(n[r]);a[i].references--}for(var o=s(t,e),c=0;c<n.length;c++){var l=u(n[c]);0===a[l].references&&(a[l].updater(),a.splice(l,1))}n=o}}}},function(t,e,n){(e=n(4)(!1)).push([t.i,'rect:hover {\n    fill: #edd0ce;\n}\n\n\n#tooltip {\n    position: absolute;\n    width: auto;\n    height: auto;\n    padding: 5px;\n    background-color: white;\n    -webkit-border-radius: 4px;\n    -moz-border-radius: 4px;\n    border-radius: 4px;\n    -webkit-box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.4);\n    -moz-box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.4);\n    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.4);\n    pointer-events: none;\n    font-family: sans-serif;\n    font-size: 12px;\n}\n\n#tooltip:hover {\n    background-color: #aa4336;\n}\n\n\n#tooltip.hidden {\n    display: none;\n}\n\n#tooltip p {\n    margin: 0;\n    font-family: sans-serif;\n    font-size: 12px;\n    line-height: 15px;\n}\n\n.textdiv {\n    font-family: "Open Sans",Helvetica,Arial,sans-serif;\n    font-size: 12px;\n    pointer-events: none;\n    overflow: none;\n    white-space: nowrap;\n}\n\n.foreignobj{\n    padding: 5px\n}',""]),t.exports=e},function(t,e,n){"use strict";t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var n=function(t,e){var n=t[1]||"",r=t[3];if(!r)return n;if(e&&"function"==typeof btoa){var i=(a=r,u=btoa(unescape(encodeURIComponent(JSON.stringify(a)))),s="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(u),"/*# ".concat(s," */")),o=r.sources.map((function(t){return"/*# sourceURL=".concat(r.sourceRoot||"").concat(t," */")}));return[n].concat(o).concat([i]).join("\n")}var a,u,s;return[n].join("\n")}(e,t);return e[2]?"@media ".concat(e[2]," {").concat(n,"}"):n})).join("")},e.i=function(t,n,r){"string"==typeof t&&(t=[[null,t,""]]);var i={};if(r)for(var o=0;o<this.length;o++){var a=this[o][0];null!=a&&(i[a]=!0)}for(var u=0;u<t.length;u++){var s=[].concat(t[u]);r&&i[s[0]]||(n&&(s[2]?s[2]="".concat(n," and ").concat(s[2]):s[2]=n),e.push(s))}},e}},function(t,e,n){"use strict";function r(){}n.r(e),n.d(e,"select",(function(){return lt})),n.d(e,"event",(function(){return Q})),n.d(e,"hierarchy",(function(){return ht})),n.d(e,"treemap",(function(){return kt})),n.d(e,"nest",(function(){return Bt})),n.d(e,"scaleOrdinal",(function(){return Dt}));var i=function(t){return null==t?r:function(){return this.querySelector(t)}};function o(){return[]}var a=function(t){return new Array(t.length)};function u(t,e){this.ownerDocument=t.ownerDocument,this.namespaceURI=t.namespaceURI,this._next=null,this._parent=t,this.__data__=e}u.prototype={constructor:u,appendChild:function(t){return this._parent.insertBefore(t,this._next)},insertBefore:function(t,e){return this._parent.insertBefore(t,e)},querySelector:function(t){return this._parent.querySelector(t)},querySelectorAll:function(t){return this._parent.querySelectorAll(t)}};function s(t,e,n,r,i,o){for(var a,s=0,c=e.length,l=o.length;s<l;++s)(a=e[s])?(a.__data__=o[s],r[s]=a):n[s]=new u(t,o[s]);for(;s<c;++s)(a=e[s])&&(i[s]=a)}function c(t,e,n,r,i,o,a){var s,c,l,f={},h=e.length,p=o.length,d=new Array(h);for(s=0;s<h;++s)(c=e[s])&&(d[s]=l="$"+a.call(c,c.__data__,s,e),l in f?i[s]=c:f[l]=c);for(s=0;s<p;++s)(c=f[l="$"+a.call(t,o[s],s,o)])?(r[s]=c,c.__data__=o[s],f[l]=null):n[s]=new u(t,o[s]);for(s=0;s<h;++s)(c=e[s])&&f[d[s]]===c&&(i[s]=c)}function l(t,e){return t<e?-1:t>e?1:t>=e?0:NaN}var f="http://www.w3.org/1999/xhtml",h={svg:"http://www.w3.org/2000/svg",xhtml:f,xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"},p=function(t){var e=t+="",n=e.indexOf(":");return n>=0&&"xmlns"!==(e=t.slice(0,n))&&(t=t.slice(n+1)),h.hasOwnProperty(e)?{space:h[e],local:t}:t};function d(t){return function(){this.removeAttribute(t)}}function v(t){return function(){this.removeAttributeNS(t.space,t.local)}}function y(t,e){return function(){this.setAttribute(t,e)}}function g(t,e){return function(){this.setAttributeNS(t.space,t.local,e)}}function m(t,e){return function(){var n=e.apply(this,arguments);null==n?this.removeAttribute(t):this.setAttribute(t,n)}}function _(t,e){return function(){var n=e.apply(this,arguments);null==n?this.removeAttributeNS(t.space,t.local):this.setAttributeNS(t.space,t.local,n)}}var b=function(t){return t.ownerDocument&&t.ownerDocument.defaultView||t.document&&t||t.defaultView};function w(t){return function(){this.style.removeProperty(t)}}function x(t,e,n){return function(){this.style.setProperty(t,e,n)}}function A(t,e,n){return function(){var r=e.apply(this,arguments);null==r?this.style.removeProperty(t):this.style.setProperty(t,r,n)}}function k(t,e){return t.style.getPropertyValue(e)||b(t).getComputedStyle(t,null).getPropertyValue(e)}function S(t){return function(){delete this[t]}}function C(t,e){return function(){this[t]=e}}function M(t,e){return function(){var n=e.apply(this,arguments);null==n?delete this[t]:this[t]=n}}function B(t){return t.trim().split(/^|\s+/)}function E(t){return t.classList||new O(t)}function O(t){this._node=t,this._names=B(t.getAttribute("class")||"")}function j(t,e){for(var n=E(t),r=-1,i=e.length;++r<i;)n.add(e[r])}function N(t,e){for(var n=E(t),r=-1,i=e.length;++r<i;)n.remove(e[r])}function z(t){return function(){j(this,t)}}function T(t){return function(){N(this,t)}}function L(t,e){return function(){(e.apply(this,arguments)?j:N)(this,t)}}O.prototype={add:function(t){this._names.indexOf(t)<0&&(this._names.push(t),this._node.setAttribute("class",this._names.join(" ")))},remove:function(t){var e=this._names.indexOf(t);e>=0&&(this._names.splice(e,1),this._node.setAttribute("class",this._names.join(" ")))},contains:function(t){return this._names.indexOf(t)>=0}};function P(){this.textContent=""}function R(t){return function(){this.textContent=t}}function D(t){return function(){var e=t.apply(this,arguments);this.textContent=null==e?"":e}}function $(){this.innerHTML=""}function H(t){return function(){this.innerHTML=t}}function I(t){return function(){var e=t.apply(this,arguments);this.innerHTML=null==e?"":e}}function q(){this.nextSibling&&this.parentNode.appendChild(this)}function U(){this.previousSibling&&this.parentNode.insertBefore(this,this.parentNode.firstChild)}function V(t){return function(){var e=this.ownerDocument,n=this.namespaceURI;return n===f&&e.documentElement.namespaceURI===f?e.createElement(t):e.createElementNS(n,t)}}function F(t){return function(){return this.ownerDocument.createElementNS(t.space,t.local)}}var X=function(t){var e=p(t);return(e.local?F:V)(e)};function Y(){return null}function G(){var t=this.parentNode;t&&t.removeChild(this)}function J(){var t=this.cloneNode(!1),e=this.parentNode;return e?e.insertBefore(t,this.nextSibling):t}function K(){var t=this.cloneNode(!0),e=this.parentNode;return e?e.insertBefore(t,this.nextSibling):t}var W={},Q=null;"undefined"!=typeof document&&("onmouseenter"in document.documentElement||(W={mouseenter:"mouseover",mouseleave:"mouseout"}));function Z(t,e,n){return t=tt(t,e,n),function(e){var n=e.relatedTarget;n&&(n===this||8&n.compareDocumentPosition(this))||t.call(this,e)}}function tt(t,e,n){return function(r){var i=Q;Q=r;try{t.call(this,this.__data__,e,n)}finally{Q=i}}}function et(t){return t.trim().split(/^|\s+/).map((function(t){var e="",n=t.indexOf(".");return n>=0&&(e=t.slice(n+1),t=t.slice(0,n)),{type:t,name:e}}))}function nt(t){return function(){var e=this.__on;if(e){for(var n,r=0,i=-1,o=e.length;r<o;++r)n=e[r],t.type&&n.type!==t.type||n.name!==t.name?e[++i]=n:this.removeEventListener(n.type,n.listener,n.capture);++i?e.length=i:delete this.__on}}}function rt(t,e,n){var r=W.hasOwnProperty(t.type)?Z:tt;return function(i,o,a){var u,s=this.__on,c=r(e,o,a);if(s)for(var l=0,f=s.length;l<f;++l)if((u=s[l]).type===t.type&&u.name===t.name)return this.removeEventListener(u.type,u.listener,u.capture),this.addEventListener(u.type,u.listener=c,u.capture=n),void(u.value=e);this.addEventListener(t.type,c,n),u={type:t.type,name:t.name,value:e,listener:c,capture:n},s?s.push(u):this.__on=[u]}}function it(t,e,n){var r=b(t),i=r.CustomEvent;"function"==typeof i?i=new i(e,n):(i=r.document.createEvent("Event"),n?(i.initEvent(e,n.bubbles,n.cancelable),i.detail=n.detail):i.initEvent(e,!1,!1)),t.dispatchEvent(i)}function ot(t,e){return function(){return it(this,t,e)}}function at(t,e){return function(){return it(this,t,e.apply(this,arguments))}}var ut=[null];function st(t,e){this._groups=t,this._parents=e}function ct(){return new st([[document.documentElement]],ut)}st.prototype=ct.prototype={constructor:st,select:function(t){"function"!=typeof t&&(t=i(t));for(var e=this._groups,n=e.length,r=new Array(n),o=0;o<n;++o)for(var a,u,s=e[o],c=s.length,l=r[o]=new Array(c),f=0;f<c;++f)(a=s[f])&&(u=t.call(a,a.__data__,f,s))&&("__data__"in a&&(u.__data__=a.__data__),l[f]=u);return new st(r,this._parents)},selectAll:function(t){var e;"function"!=typeof t&&(t=null==(e=t)?o:function(){return this.querySelectorAll(e)});for(var n=this._groups,r=n.length,i=[],a=[],u=0;u<r;++u)for(var s,c=n[u],l=c.length,f=0;f<l;++f)(s=c[f])&&(i.push(t.call(s,s.__data__,f,c)),a.push(s));return new st(i,a)},filter:function(t){var e;"function"!=typeof t&&(e=t,t=function(){return this.matches(e)});for(var n=this._groups,r=n.length,i=new Array(r),o=0;o<r;++o)for(var a,u=n[o],s=u.length,c=i[o]=[],l=0;l<s;++l)(a=u[l])&&t.call(a,a.__data__,l,u)&&c.push(a);return new st(i,this._parents)},data:function(t,e){if(!t)return y=new Array(this.size()),h=-1,this.each((function(t){y[++h]=t})),y;var n,r=e?c:s,i=this._parents,o=this._groups;"function"!=typeof t&&(n=t,t=function(){return n});for(var a=o.length,u=new Array(a),l=new Array(a),f=new Array(a),h=0;h<a;++h){var p=i[h],d=o[h],v=d.length,y=t.call(p,p&&p.__data__,h,i),g=y.length,m=l[h]=new Array(g),_=u[h]=new Array(g);r(p,d,m,_,f[h]=new Array(v),y,e);for(var b,w,x=0,A=0;x<g;++x)if(b=m[x]){for(x>=A&&(A=x+1);!(w=_[A])&&++A<g;);b._next=w||null}}return(u=new st(u,i))._enter=l,u._exit=f,u},enter:function(){return new st(this._enter||this._groups.map(a),this._parents)},exit:function(){return new st(this._exit||this._groups.map(a),this._parents)},join:function(t,e,n){var r=this.enter(),i=this,o=this.exit();return r="function"==typeof t?t(r):r.append(t+""),null!=e&&(i=e(i)),null==n?o.remove():n(o),r&&i?r.merge(i).order():i},merge:function(t){for(var e=this._groups,n=t._groups,r=e.length,i=n.length,o=Math.min(r,i),a=new Array(r),u=0;u<o;++u)for(var s,c=e[u],l=n[u],f=c.length,h=a[u]=new Array(f),p=0;p<f;++p)(s=c[p]||l[p])&&(h[p]=s);for(;u<r;++u)a[u]=e[u];return new st(a,this._parents)},order:function(){for(var t=this._groups,e=-1,n=t.length;++e<n;)for(var r,i=t[e],o=i.length-1,a=i[o];--o>=0;)(r=i[o])&&(a&&4^r.compareDocumentPosition(a)&&a.parentNode.insertBefore(r,a),a=r);return this},sort:function(t){function e(e,n){return e&&n?t(e.__data__,n.__data__):!e-!n}t||(t=l);for(var n=this._groups,r=n.length,i=new Array(r),o=0;o<r;++o){for(var a,u=n[o],s=u.length,c=i[o]=new Array(s),f=0;f<s;++f)(a=u[f])&&(c[f]=a);c.sort(e)}return new st(i,this._parents).order()},call:function(){var t=arguments[0];return arguments[0]=this,t.apply(null,arguments),this},nodes:function(){var t=new Array(this.size()),e=-1;return this.each((function(){t[++e]=this})),t},node:function(){for(var t=this._groups,e=0,n=t.length;e<n;++e)for(var r=t[e],i=0,o=r.length;i<o;++i){var a=r[i];if(a)return a}return null},size:function(){var t=0;return this.each((function(){++t})),t},empty:function(){return!this.node()},each:function(t){for(var e=this._groups,n=0,r=e.length;n<r;++n)for(var i,o=e[n],a=0,u=o.length;a<u;++a)(i=o[a])&&t.call(i,i.__data__,a,o);return this},attr:function(t,e){var n=p(t);if(arguments.length<2){var r=this.node();return n.local?r.getAttributeNS(n.space,n.local):r.getAttribute(n)}return this.each((null==e?n.local?v:d:"function"==typeof e?n.local?_:m:n.local?g:y)(n,e))},style:function(t,e,n){return arguments.length>1?this.each((null==e?w:"function"==typeof e?A:x)(t,e,null==n?"":n)):k(this.node(),t)},property:function(t,e){return arguments.length>1?this.each((null==e?S:"function"==typeof e?M:C)(t,e)):this.node()[t]},classed:function(t,e){var n=B(t+"");if(arguments.length<2){for(var r=E(this.node()),i=-1,o=n.length;++i<o;)if(!r.contains(n[i]))return!1;return!0}return this.each(("function"==typeof e?L:e?z:T)(n,e))},text:function(t){return arguments.length?this.each(null==t?P:("function"==typeof t?D:R)(t)):this.node().textContent},html:function(t){return arguments.length?this.each(null==t?$:("function"==typeof t?I:H)(t)):this.node().innerHTML},raise:function(){return this.each(q)},lower:function(){return this.each(U)},append:function(t){var e="function"==typeof t?t:X(t);return this.select((function(){return this.appendChild(e.apply(this,arguments))}))},insert:function(t,e){var n="function"==typeof t?t:X(t),r=null==e?Y:"function"==typeof e?e:i(e);return this.select((function(){return this.insertBefore(n.apply(this,arguments),r.apply(this,arguments)||null)}))},remove:function(){return this.each(G)},clone:function(t){return this.select(t?K:J)},datum:function(t){return arguments.length?this.property("__data__",t):this.node().__data__},on:function(t,e,n){var r,i,o=et(t+""),a=o.length;if(!(arguments.length<2)){for(u=e?rt:nt,null==n&&(n=!1),r=0;r<a;++r)this.each(u(o[r],e,n));return this}var u=this.node().__on;if(u)for(var s,c=0,l=u.length;c<l;++c)for(r=0,s=u[c];r<a;++r)if((i=o[r]).type===s.type&&i.name===s.name)return s.value},dispatch:function(t,e){return this.each(("function"==typeof e?at:ot)(t,e))}};var lt=function(t){return"string"==typeof t?new st([[document.querySelector(t)]],[document.documentElement]):new st([[t]],ut)};function ft(t){var e=0,n=t.children,r=n&&n.length;if(r)for(;--r>=0;)e+=n[r].value;else e=1;t.value=e}function ht(t,e){var n,r,i,o,a,u=new yt(t),s=+t.value&&(u.value=t.value),c=[u];for(null==e&&(e=pt);n=c.pop();)if(s&&(n.value=+n.data.value),(i=e(n.data))&&(a=i.length))for(n.children=new Array(a),o=a-1;o>=0;--o)c.push(r=n.children[o]=new yt(i[o])),r.parent=n,r.depth=n.depth+1;return u.eachBefore(vt)}function pt(t){return t.children}function dt(t){t.data=t.data.data}function vt(t){var e=0;do{t.height=e}while((t=t.parent)&&t.height<++e)}function yt(t){this.data=t,this.depth=this.height=0,this.parent=null}yt.prototype=ht.prototype={constructor:yt,count:function(){return this.eachAfter(ft)},each:function(t){var e,n,r,i,o=this,a=[o];do{for(e=a.reverse(),a=[];o=e.pop();)if(t(o),n=o.children)for(r=0,i=n.length;r<i;++r)a.push(n[r])}while(a.length);return this},eachAfter:function(t){for(var e,n,r,i=this,o=[i],a=[];i=o.pop();)if(a.push(i),e=i.children)for(n=0,r=e.length;n<r;++n)o.push(e[n]);for(;i=a.pop();)t(i);return this},eachBefore:function(t){for(var e,n,r=this,i=[r];r=i.pop();)if(t(r),e=r.children)for(n=e.length-1;n>=0;--n)i.push(e[n]);return this},sum:function(t){return this.eachAfter((function(e){for(var n=+t(e.data)||0,r=e.children,i=r&&r.length;--i>=0;)n+=r[i].value;e.value=n}))},sort:function(t){return this.eachBefore((function(e){e.children&&e.children.sort(t)}))},path:function(t){for(var e=this,n=function(t,e){if(t===e)return t;var n=t.ancestors(),r=e.ancestors(),i=null;t=n.pop(),e=r.pop();for(;t===e;)i=t,t=n.pop(),e=r.pop();return i}(e,t),r=[e];e!==n;)e=e.parent,r.push(e);for(var i=r.length;t!==n;)r.splice(i,0,t),t=t.parent;return r},ancestors:function(){for(var t=this,e=[t];t=t.parent;)e.push(t);return e},descendants:function(){var t=[];return this.each((function(e){t.push(e)})),t},leaves:function(){var t=[];return this.eachBefore((function(e){e.children||t.push(e)})),t},links:function(){var t=this,e=[];return t.each((function(n){n!==t&&e.push({source:n.parent,target:n})})),e},copy:function(){return ht(this).eachBefore(dt)}};var gt=function(t){t.x0=Math.round(t.x0),t.y0=Math.round(t.y0),t.x1=Math.round(t.x1),t.y1=Math.round(t.y1)},mt=function(t,e,n,r,i){for(var o,a=t.children,u=-1,s=a.length,c=t.value&&(r-e)/t.value;++u<s;)(o=a[u]).y0=n,o.y1=i,o.x0=e,o.x1=e+=o.value*c},_t=function(t,e,n,r,i){for(var o,a=t.children,u=-1,s=a.length,c=t.value&&(i-n)/t.value;++u<s;)(o=a[u]).x0=e,o.x1=r,o.y0=n,o.y1=n+=o.value*c};var bt=function t(e){function n(t,n,r,i,o){!function(t,e,n,r,i,o){for(var a,u,s,c,l,f,h,p,d,v,y,g=[],m=e.children,_=0,b=0,w=m.length,x=e.value;_<w;){s=i-n,c=o-r;do{l=m[b++].value}while(!l&&b<w);for(f=h=l,y=l*l*(v=Math.max(c/s,s/c)/(x*t)),d=Math.max(h/y,y/f);b<w;++b){if(l+=u=m[b].value,u<f&&(f=u),u>h&&(h=u),y=l*l*v,(p=Math.max(h/y,y/f))>d){l-=u;break}d=p}g.push(a={value:l,dice:s<c,children:m.slice(_,b)}),a.dice?mt(a,n,r,i,x?r+=c*l/x:o):_t(a,n,r,x?n+=s*l/x:i,o),x-=l,_=b}}(e,t,n,r,i,o)}return n.ratio=function(e){return t((e=+e)>1?e:1)},n}((1+Math.sqrt(5))/2);function wt(t){if("function"!=typeof t)throw new Error;return t}function xt(){return 0}var At=function(t){return function(){return t}},kt=function(){var t=bt,e=!1,n=1,r=1,i=[0],o=xt,a=xt,u=xt,s=xt,c=xt;function l(t){return t.x0=t.y0=0,t.x1=n,t.y1=r,t.eachBefore(f),i=[0],e&&t.eachBefore(gt),t}function f(e){var n=i[e.depth],r=e.x0+n,l=e.y0+n,f=e.x1-n,h=e.y1-n;f<r&&(r=f=(r+f)/2),h<l&&(l=h=(l+h)/2),e.x0=r,e.y0=l,e.x1=f,e.y1=h,e.children&&(n=i[e.depth+1]=o(e)/2,r+=c(e)-n,l+=a(e)-n,(f-=u(e)-n)<r&&(r=f=(r+f)/2),(h-=s(e)-n)<l&&(l=h=(l+h)/2),t(e,r,l,f,h))}return l.round=function(t){return arguments.length?(e=!!t,l):e},l.size=function(t){return arguments.length?(n=+t[0],r=+t[1],l):[n,r]},l.tile=function(e){return arguments.length?(t=wt(e),l):t},l.padding=function(t){return arguments.length?l.paddingInner(t).paddingOuter(t):l.paddingInner()},l.paddingInner=function(t){return arguments.length?(o="function"==typeof t?t:At(+t),l):o},l.paddingOuter=function(t){return arguments.length?l.paddingTop(t).paddingRight(t).paddingBottom(t).paddingLeft(t):l.paddingTop()},l.paddingTop=function(t){return arguments.length?(a="function"==typeof t?t:At(+t),l):a},l.paddingRight=function(t){return arguments.length?(u="function"==typeof t?t:At(+t),l):u},l.paddingBottom=function(t){return arguments.length?(s="function"==typeof t?t:At(+t),l):s},l.paddingLeft=function(t){return arguments.length?(c="function"==typeof t?t:At(+t),l):c},l};function St(){}function Ct(t,e){var n=new St;if(t instanceof St)t.each((function(t,e){n.set(e,t)}));else if(Array.isArray(t)){var r,i=-1,o=t.length;if(null==e)for(;++i<o;)n.set(i,t[i]);else for(;++i<o;)n.set(e(r=t[i],i,t),r)}else if(t)for(var a in t)n.set(a,t[a]);return n}St.prototype=Ct.prototype={constructor:St,has:function(t){return"$"+t in this},get:function(t){return this["$"+t]},set:function(t,e){return this["$"+t]=e,this},remove:function(t){var e="$"+t;return e in this&&delete this[e]},clear:function(){for(var t in this)"$"===t[0]&&delete this[t]},keys:function(){var t=[];for(var e in this)"$"===e[0]&&t.push(e.slice(1));return t},values:function(){var t=[];for(var e in this)"$"===e[0]&&t.push(this[e]);return t},entries:function(){var t=[];for(var e in this)"$"===e[0]&&t.push({key:e.slice(1),value:this[e]});return t},size:function(){var t=0;for(var e in this)"$"===e[0]&&++t;return t},empty:function(){for(var t in this)if("$"===t[0])return!1;return!0},each:function(t){for(var e in this)"$"===e[0]&&t(this[e],e.slice(1),this)}};var Mt=Ct,Bt=function(){var t,e,n,r=[],i=[];function o(n,i,a,u){if(i>=r.length)return null!=t&&n.sort(t),null!=e?e(n):n;for(var s,c,l,f=-1,h=n.length,p=r[i++],d=Mt(),v=a();++f<h;)(l=d.get(s=p(c=n[f])+""))?l.push(c):d.set(s,[c]);return d.each((function(t,e){u(v,e,o(t,i,a,u))})),v}return n={object:function(t){return o(t,0,Et,Ot)},map:function(t){return o(t,0,jt,Nt)},entries:function(t){return function t(n,o){if(++o>r.length)return n;var a,u=i[o-1];return null!=e&&o>=r.length?a=n.entries():(a=[],n.each((function(e,n){a.push({key:n,values:t(e,o)})}))),null!=u?a.sort((function(t,e){return u(t.key,e.key)})):a}(o(t,0,jt,Nt),0)},key:function(t){return r.push(t),n},sortKeys:function(t){return i[r.length-1]=t,n},sortValues:function(e){return t=e,n},rollup:function(t){return e=t,n}}};function Et(){return{}}function Ot(t,e,n){t[e]=n}function jt(){return Mt()}function Nt(t,e,n){t.set(e,n)}function zt(){}var Tt=Mt.prototype;function Lt(t,e){var n=new zt;if(t instanceof zt)t.each((function(t){n.add(t)}));else if(t){var r=-1,i=t.length;if(null==e)for(;++r<i;)n.add(t[r]);else for(;++r<i;)n.add(e(t[r],r,t))}return n}zt.prototype=Lt.prototype={constructor:zt,has:Tt.has,add:function(t){return this["$"+(t+="")]=t,this},remove:Tt.remove,clear:Tt.clear,values:Tt.keys,size:Tt.size,empty:Tt.empty,each:Tt.each};function Pt(t,e){switch(arguments.length){case 0:break;case 1:this.range(t);break;default:this.range(e).domain(t)}return this}const Rt=Symbol("implicit");function Dt(){var t=new Map,e=[],n=[],r=Rt;function i(i){var o=i+"",a=t.get(o);if(!a){if(r!==Rt)return r;t.set(o,a=e.push(i))}return n[(a-1)%n.length]}return i.domain=function(n){if(!arguments.length)return e.slice();e=[],t=new Map;for(const r of n){const n=r+"";t.has(n)||t.set(n,e.push(r))}return i},i.range=function(t){return arguments.length?(n=Array.from(t),i):n.slice()},i.unknown=function(t){return arguments.length?(r=t,i):r},i.copy=function(){return Dt(e,n).unknown(r)},Pt.apply(i,arguments),i}}]);
//# sourceMappingURL=treemap.js.map