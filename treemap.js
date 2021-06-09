!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";n.r(e);n(1);const r=n(5),o={showSubHeaders:{section:"Data",type:"boolean",label:"Show Sub Headers",default:"true"},cellColor:{section:"Data",type:"array",display:"colors",label:"Color Palette - Razorhorse",default:["#aa4336","#b04f43","#b4574c","#b86157","#bc6960","#c07169","#c47b73","#c8837c","#cc8c86","#d09590","#d59f9b","#daaaa8"]},breadcrumbs:{type:"array",default:[]}},i=function(t){return parseInt(t)},a={options:o,create:function(t,e){this.style=document.createElement("style"),document.head.appendChild(this.style),this.container=r.select(t).append("div").attr("id","treemapContainer"),this.tooltip=r.select(t).append("div").attr("class","hidden").attr("id","tooltip")},updateAsync:function(t,e,n,u,s,c){this.clearErrors(),console.log("data",t),console.log("config",n),console.log("queryResponse",u);const l=e.clientWidth,f=e.clientHeight-16,h=e.getBoundingClientRect(),p=h.x+h.width/2,d=h.y+h.height/2,v=u.fields.dimension_like,g=u.fields.measure_like,y=function(t,e){for(var n=o,r=[],i=0;i<e.length;i++){(u={})[e[i].label]=e[i].name,r.push(u)}n.sizeBy={section:"Data",type:"string",label:"Size By",display:"select",values:r,default:"0"};var a=[];for(i=0;i<t.length;i++){var u;(u={})[t[i].label]=t[i].name,a.push(u)}return n.colorBy={section:"Data",type:"string",label:"Color By",display:"select",values:a,default:"0"},n}(v,g);a.trigger("registerOptions",y);const m=function(t,e){var n=[];return t.forEach(t=>{var r={},o=0;for(var[i,a]of(r.metadata={},Object.entries(t))){if(r[i]=a.value,o<e.fields.dimension_like.length)var u=e.fields.dimension_like[o].label_short;else u=e.fields.measure_like[o-e.fields.dimension_like.length].label_short;if(void 0!==a.rendered)var s=a.rendered;else s=a.value;r.metadata[i]={label:u,rendered:s,links:a.links},o+=1}n.push(r)}),n}(t,u),_=function(t){var e=[];return t.fields.dimension_like.forEach(t=>{e.push(t.name)}),e}(u),b=function(t){var e=[];return t.fields.measure_like.forEach(t=>{e.push(t.name)}),e}(u),w=r.scaleOrdinal().range(n.cellColor);var x,k=r.treemap().size([l,f]).padding(t=>1===t.depth?2:0).paddingTop(t=>n.showSubHeaders?t.depth<2?16:0:0===t.depth?16:0).round(!0);const A=function(t,e){if(0===e.length)x=t;else{var n=e.shift();for(var r in t.values)void 0!==t&&t.values[r].key===n&&(t=A(t.values[r],e))}},S=function(t){if("count_of_rows"==n.sizeBy)return t.key?0:1;{let e=n.sizeBy;return parseFloat(t[e])}},C=function(t){var e="";if(0===t.height){for(var n in _){null!=(o=t.data.metadata[_[n]]).rendered&&(e+=" "+o.rendered)}for(var r in e+="<br>",g){var o;(o=t.data.metadata[b[r]]).rendered}}else"null"==t.data.key?e+="":e+=t.data.key;return e};!function(t){var e=r.nest();v.forEach(t=>e=e.key(e=>e[t.name])),e={key:"root",values:e=e.entries(t)};var o=k(r.hierarchy(e,t=>t.values).sum(t=>S(t)).sort((function(t,e){return e.height-t.height||S(e)-S(t)})));const a=function(t){r.select("#treemapSVG").remove();var u=r.select("#treemapContainer").append("svg").attr("id","treemapSVG").attr("width",l).attr("height",f).append("g").datum(t).attr("class","treemapArea").selectAll("g").data(o.descendants()).enter();function c(t){if(0===t.depth)0===n.breadcrumbs.length||(n.breadcrumbs.pop(),A(e,n.breadcrumbs.slice(0)),o=k(r.hierarchy(x,t=>t.values).sum(t=>S(t))),a(o));else{for(;t.depth>1;)t=t.parent;null!=t.data.key&&(n.breadcrumbs.push(t.data.key),o=k(r.hierarchy(t.data,t=>t.values).sum(t=>S(t))),a(o))}}u.append("rect").attr("x",t=>t.x0).attr("y",t=>t.y0).attr("width",t=>Math.max(0,t.x1-t.x0)).attr("height",t=>Math.max(0,t.y1-t.y0)).attr("fill",t=>function(t){return 0===t.height?n.takeColorFromCellValue?t.data[n.colorBy]:w(t.data[n.colorBy]):0===t.depth?"#edd0ce":"white"}(t)).attr("stroke","white").on("mouseover",(function(t){console.log("mouseover",r.event);parseFloat(r.select(this).attr("x")),parseFloat(r.select(this).attr("y"));var e=r.event.pageX,n=r.event.pageY;r.select("#tooltip").style("left",e+"px").style("top",n+"px").html(function(t){var e="";if(0===t.height){for(var n in _){null!=(o=t.data.metadata[_[n]]).rendered&&(e+=" "+o.rendered)}for(var r in e+="<br>",g){var o;null!=(o=t.data.metadata[b[r]]).rendered&&(e+="<p><em>"+o.label+":</em> <b>"+o.rendered+"</b></p>")}}else"null"==t.data.key?e+="":e+=t.data.key;return e}(t)),r.select("#tooltip").classed("hidden",!1)})).on("mousemove",(function(){var t=r.event.pageX<p?r.event.pageX:r.event.pageX-210,e=r.event.pageY<d?r.event.pageY:r.event.pageY-120;t&&r.select("#tooltip").style("left",t+"px").style("top",e+"px")})).on("mouseout",(function(){r.select("#tooltip").classed("hidden",!0)})).on("click",(function(t){console.log("d",t),console.log("d.row",r.event),console.log("details.crossfilterEnabled",s.crossfilterEnabled),console.log("d.row",t.data["taxonomy.sub_sector_level_2"]),console.log("d.row",r.event);let e="";4===t.depth&&(e=1),3===t.depth&&(e=2),2===t.depth&&(e=3),console.log("filterLevel",e);let n={"taxonomy.sub_sector_level_2":"Integrated GRC","taxonomy.sub_sector_level_3":"Horizontal","taxonomy.sub_sector_level_4":null,"account.total_revenue":15213.7};if(s.crossfilterEnabled){let e=delete t.data;LookerCharts.Utils.toggleCrossfilter({row:n}),console.log("filter",e),c(t)}else c(t)})),u.append("foreignObject").attr("x",t=>t.x0+3).attr("y",t=>t.y0).attr("width",t=>Math.max(0,t.x1-t.x0-3)).attr("height",t=>Math.max(0,t.y1-t.y0)).attr("fill","#bbbbbb").attr("class","foreignobj").attr("pointer-events","none").attr("white-space","nowrap").append("xhtml:div").html(t=>function(t){var e="";if(0===t.depth){var r=i(t.value);e=0===n.breadcrumbs.length?"Top Level. Click on cells to zoom IN, or click on this bar to zoom OUT.":"null"==t.value?"":"&#171; "+n.breadcrumbs.join(" – ")+" ("+r+")"}else t.depth<2&&n.showSubHeaders?(r=i(t.value),e=null==t.data.key||"null"==t.data.key?"":"<div class='navigation'>&#187; "+t.data.key+" ("+r+")</div>"):0===t.height&&(e="count_of_rows"===n.sizeBy?"1":C(t));return e}(t)).attr("class","textdiv")};a(o)}(m),c()}};looker.plugins.visualizations.add(a)},function(t,e,n){var r=n(2),o=n(3);"string"==typeof(o=o.__esModule?o.default:o)&&(o=[[t.i,o,""]]);var i={insert:"head",singleton:!1};r(o,i);t.exports=o.locals||{}},function(t,e,n){"use strict";var r,o=function(){return void 0===r&&(r=Boolean(window&&document&&document.all&&!window.atob)),r},i=function(){var t={};return function(e){if(void 0===t[e]){var n=document.querySelector(e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(t){n=null}t[e]=n}return t[e]}}(),a=[];function u(t){for(var e=-1,n=0;n<a.length;n++)if(a[n].identifier===t){e=n;break}return e}function s(t,e){for(var n={},r=[],o=0;o<t.length;o++){var i=t[o],s=e.base?i[0]+e.base:i[0],c=n[s]||0,l="".concat(s," ").concat(c);n[s]=c+1;var f=u(l),h={css:i[1],media:i[2],sourceMap:i[3]};-1!==f?(a[f].references++,a[f].updater(h)):a.push({identifier:l,updater:g(h,e),references:1}),r.push(l)}return r}function c(t){var e=document.createElement("style"),r=t.attributes||{};if(void 0===r.nonce){var o=n.nc;o&&(r.nonce=o)}if(Object.keys(r).forEach((function(t){e.setAttribute(t,r[t])})),"function"==typeof t.insert)t.insert(e);else{var a=i(t.insert||"head");if(!a)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");a.appendChild(e)}return e}var l,f=(l=[],function(t,e){return l[t]=e,l.filter(Boolean).join("\n")});function h(t,e,n,r){var o=n?"":r.media?"@media ".concat(r.media," {").concat(r.css,"}"):r.css;if(t.styleSheet)t.styleSheet.cssText=f(e,o);else{var i=document.createTextNode(o),a=t.childNodes;a[e]&&t.removeChild(a[e]),a.length?t.insertBefore(i,a[e]):t.appendChild(i)}}function p(t,e,n){var r=n.css,o=n.media,i=n.sourceMap;if(o?t.setAttribute("media",o):t.removeAttribute("media"),i&&btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),t.styleSheet)t.styleSheet.cssText=r;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(r))}}var d=null,v=0;function g(t,e){var n,r,o;if(e.singleton){var i=v++;n=d||(d=c(e)),r=h.bind(null,n,i,!1),o=h.bind(null,n,i,!0)}else n=c(e),r=p.bind(null,n,e),o=function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(n)};return r(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;r(t=e)}else o()}}t.exports=function(t,e){(e=e||{}).singleton||"boolean"==typeof e.singleton||(e.singleton=o());var n=s(t=t||[],e);return function(t){if(t=t||[],"[object Array]"===Object.prototype.toString.call(t)){for(var r=0;r<n.length;r++){var o=u(n[r]);a[o].references--}for(var i=s(t,e),c=0;c<n.length;c++){var l=u(n[c]);0===a[l].references&&(a[l].updater(),a.splice(l,1))}n=i}}}},function(t,e,n){(e=n(4)(!1)).push([t.i,"rect {\n    border: 1px solid transparent;\n    pointer-events: all;\n}\nrect:hover {\n    border: 1px solid black;\n}\n\n#tooltip {\n    position: absolute;\n    width: auto;\n    height: auto;\n    padding: 5px;\n    background-color: white;\n    -webkit-border-radius: 4px;\n    -moz-border-radius: 4px;\n    border-radius: 4px;\n    -webkit-box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.4);\n    -moz-box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.4);\n    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.4);\n    pointer-events: none;\n    font-family: sans-serif;\n    font-size: 12px;\n}\n\n#tooltip:hover {\n    background-color: #aa4336;\n}\n\n\n#tooltip.hidden {\n    display: none;\n}\n\n#tooltip p {\n    margin: 0;\n    font-family: sans-serif;\n    font-size: 12px;\n    line-height: 15px;\n}\n\n.textdiv {\n    border: 1px solid transparent;\n    font-family: 'Roboto', \"Open Sans\",Helvetica,Arial,sans-serif;\n    font-size: 11px;\n    pointer-events: none;\n    overflow: none;    \n    word-wrap: break-word;\n    \n}\n\n.textdiv:hover {\n    border: 1px solid #000\n}\n\n\n.foreignobj{  \n    padding-left: 5px;\n    padding-top: 2px;\n    margin-top: 5px;\n    word-wrap: break-word;\n}\n\n.navigation{\n    white-space: nowrap;\n}",""]),t.exports=e},function(t,e,n){"use strict";t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var n=function(t,e){var n=t[1]||"",r=t[3];if(!r)return n;if(e&&"function"==typeof btoa){var o=(a=r,u=btoa(unescape(encodeURIComponent(JSON.stringify(a)))),s="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(u),"/*# ".concat(s," */")),i=r.sources.map((function(t){return"/*# sourceURL=".concat(r.sourceRoot||"").concat(t," */")}));return[n].concat(i).concat([o]).join("\n")}var a,u,s;return[n].join("\n")}(e,t);return e[2]?"@media ".concat(e[2]," {").concat(n,"}"):n})).join("")},e.i=function(t,n,r){"string"==typeof t&&(t=[[null,t,""]]);var o={};if(r)for(var i=0;i<this.length;i++){var a=this[i][0];null!=a&&(o[a]=!0)}for(var u=0;u<t.length;u++){var s=[].concat(t[u]);r&&o[s[0]]||(n&&(s[2]?s[2]="".concat(n," and ").concat(s[2]):s[2]=n),e.push(s))}},e}},function(t,e,n){"use strict";function r(){}n.r(e),n.d(e,"select",(function(){return lt})),n.d(e,"event",(function(){return Q})),n.d(e,"hierarchy",(function(){return ht})),n.d(e,"treemap",(function(){return At})),n.d(e,"nest",(function(){return Et})),n.d(e,"scaleOrdinal",(function(){return It}));var o=function(t){return null==t?r:function(){return this.querySelector(t)}};function i(){return[]}var a=function(t){return new Array(t.length)};function u(t,e){this.ownerDocument=t.ownerDocument,this.namespaceURI=t.namespaceURI,this._next=null,this._parent=t,this.__data__=e}u.prototype={constructor:u,appendChild:function(t){return this._parent.insertBefore(t,this._next)},insertBefore:function(t,e){return this._parent.insertBefore(t,e)},querySelector:function(t){return this._parent.querySelector(t)},querySelectorAll:function(t){return this._parent.querySelectorAll(t)}};function s(t,e,n,r,o,i){for(var a,s=0,c=e.length,l=i.length;s<l;++s)(a=e[s])?(a.__data__=i[s],r[s]=a):n[s]=new u(t,i[s]);for(;s<c;++s)(a=e[s])&&(o[s]=a)}function c(t,e,n,r,o,i,a){var s,c,l,f={},h=e.length,p=i.length,d=new Array(h);for(s=0;s<h;++s)(c=e[s])&&(d[s]=l="$"+a.call(c,c.__data__,s,e),l in f?o[s]=c:f[l]=c);for(s=0;s<p;++s)(c=f[l="$"+a.call(t,i[s],s,i)])?(r[s]=c,c.__data__=i[s],f[l]=null):n[s]=new u(t,i[s]);for(s=0;s<h;++s)(c=e[s])&&f[d[s]]===c&&(o[s]=c)}function l(t,e){return t<e?-1:t>e?1:t>=e?0:NaN}var f="http://www.w3.org/1999/xhtml",h={svg:"http://www.w3.org/2000/svg",xhtml:f,xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"},p=function(t){var e=t+="",n=e.indexOf(":");return n>=0&&"xmlns"!==(e=t.slice(0,n))&&(t=t.slice(n+1)),h.hasOwnProperty(e)?{space:h[e],local:t}:t};function d(t){return function(){this.removeAttribute(t)}}function v(t){return function(){this.removeAttributeNS(t.space,t.local)}}function g(t,e){return function(){this.setAttribute(t,e)}}function y(t,e){return function(){this.setAttributeNS(t.space,t.local,e)}}function m(t,e){return function(){var n=e.apply(this,arguments);null==n?this.removeAttribute(t):this.setAttribute(t,n)}}function _(t,e){return function(){var n=e.apply(this,arguments);null==n?this.removeAttributeNS(t.space,t.local):this.setAttributeNS(t.space,t.local,n)}}var b=function(t){return t.ownerDocument&&t.ownerDocument.defaultView||t.document&&t||t.defaultView};function w(t){return function(){this.style.removeProperty(t)}}function x(t,e,n){return function(){this.style.setProperty(t,e,n)}}function k(t,e,n){return function(){var r=e.apply(this,arguments);null==r?this.style.removeProperty(t):this.style.setProperty(t,r,n)}}function A(t,e){return t.style.getPropertyValue(e)||b(t).getComputedStyle(t,null).getPropertyValue(e)}function S(t){return function(){delete this[t]}}function C(t,e){return function(){this[t]=e}}function M(t,e){return function(){var n=e.apply(this,arguments);null==n?delete this[t]:this[t]=n}}function E(t){return t.trim().split(/^|\s+/)}function B(t){return t.classList||new O(t)}function O(t){this._node=t,this._names=E(t.getAttribute("class")||"")}function N(t,e){for(var n=B(t),r=-1,o=e.length;++r<o;)n.add(e[r])}function j(t,e){for(var n=B(t),r=-1,o=e.length;++r<o;)n.remove(e[r])}function z(t){return function(){N(this,t)}}function L(t){return function(){j(this,t)}}function T(t,e){return function(){(e.apply(this,arguments)?N:j)(this,t)}}O.prototype={add:function(t){this._names.indexOf(t)<0&&(this._names.push(t),this._node.setAttribute("class",this._names.join(" ")))},remove:function(t){var e=this._names.indexOf(t);e>=0&&(this._names.splice(e,1),this._node.setAttribute("class",this._names.join(" ")))},contains:function(t){return this._names.indexOf(t)>=0}};function R(){this.textContent=""}function P(t){return function(){this.textContent=t}}function I(t){return function(){var e=t.apply(this,arguments);this.textContent=null==e?"":e}}function $(){this.innerHTML=""}function D(t){return function(){this.innerHTML=t}}function H(t){return function(){var e=t.apply(this,arguments);this.innerHTML=null==e?"":e}}function U(){this.nextSibling&&this.parentNode.appendChild(this)}function q(){this.previousSibling&&this.parentNode.insertBefore(this,this.parentNode.firstChild)}function V(t){return function(){var e=this.ownerDocument,n=this.namespaceURI;return n===f&&e.documentElement.namespaceURI===f?e.createElement(t):e.createElementNS(n,t)}}function F(t){return function(){return this.ownerDocument.createElementNS(t.space,t.local)}}var X=function(t){var e=p(t);return(e.local?F:V)(e)};function Y(){return null}function G(){var t=this.parentNode;t&&t.removeChild(this)}function J(){var t=this.cloneNode(!1),e=this.parentNode;return e?e.insertBefore(t,this.nextSibling):t}function K(){var t=this.cloneNode(!0),e=this.parentNode;return e?e.insertBefore(t,this.nextSibling):t}var W={},Q=null;"undefined"!=typeof document&&("onmouseenter"in document.documentElement||(W={mouseenter:"mouseover",mouseleave:"mouseout"}));function Z(t,e,n){return t=tt(t,e,n),function(e){var n=e.relatedTarget;n&&(n===this||8&n.compareDocumentPosition(this))||t.call(this,e)}}function tt(t,e,n){return function(r){var o=Q;Q=r;try{t.call(this,this.__data__,e,n)}finally{Q=o}}}function et(t){return t.trim().split(/^|\s+/).map((function(t){var e="",n=t.indexOf(".");return n>=0&&(e=t.slice(n+1),t=t.slice(0,n)),{type:t,name:e}}))}function nt(t){return function(){var e=this.__on;if(e){for(var n,r=0,o=-1,i=e.length;r<i;++r)n=e[r],t.type&&n.type!==t.type||n.name!==t.name?e[++o]=n:this.removeEventListener(n.type,n.listener,n.capture);++o?e.length=o:delete this.__on}}}function rt(t,e,n){var r=W.hasOwnProperty(t.type)?Z:tt;return function(o,i,a){var u,s=this.__on,c=r(e,i,a);if(s)for(var l=0,f=s.length;l<f;++l)if((u=s[l]).type===t.type&&u.name===t.name)return this.removeEventListener(u.type,u.listener,u.capture),this.addEventListener(u.type,u.listener=c,u.capture=n),void(u.value=e);this.addEventListener(t.type,c,n),u={type:t.type,name:t.name,value:e,listener:c,capture:n},s?s.push(u):this.__on=[u]}}function ot(t,e,n){var r=b(t),o=r.CustomEvent;"function"==typeof o?o=new o(e,n):(o=r.document.createEvent("Event"),n?(o.initEvent(e,n.bubbles,n.cancelable),o.detail=n.detail):o.initEvent(e,!1,!1)),t.dispatchEvent(o)}function it(t,e){return function(){return ot(this,t,e)}}function at(t,e){return function(){return ot(this,t,e.apply(this,arguments))}}var ut=[null];function st(t,e){this._groups=t,this._parents=e}function ct(){return new st([[document.documentElement]],ut)}st.prototype=ct.prototype={constructor:st,select:function(t){"function"!=typeof t&&(t=o(t));for(var e=this._groups,n=e.length,r=new Array(n),i=0;i<n;++i)for(var a,u,s=e[i],c=s.length,l=r[i]=new Array(c),f=0;f<c;++f)(a=s[f])&&(u=t.call(a,a.__data__,f,s))&&("__data__"in a&&(u.__data__=a.__data__),l[f]=u);return new st(r,this._parents)},selectAll:function(t){var e;"function"!=typeof t&&(t=null==(e=t)?i:function(){return this.querySelectorAll(e)});for(var n=this._groups,r=n.length,o=[],a=[],u=0;u<r;++u)for(var s,c=n[u],l=c.length,f=0;f<l;++f)(s=c[f])&&(o.push(t.call(s,s.__data__,f,c)),a.push(s));return new st(o,a)},filter:function(t){var e;"function"!=typeof t&&(e=t,t=function(){return this.matches(e)});for(var n=this._groups,r=n.length,o=new Array(r),i=0;i<r;++i)for(var a,u=n[i],s=u.length,c=o[i]=[],l=0;l<s;++l)(a=u[l])&&t.call(a,a.__data__,l,u)&&c.push(a);return new st(o,this._parents)},data:function(t,e){if(!t)return g=new Array(this.size()),h=-1,this.each((function(t){g[++h]=t})),g;var n,r=e?c:s,o=this._parents,i=this._groups;"function"!=typeof t&&(n=t,t=function(){return n});for(var a=i.length,u=new Array(a),l=new Array(a),f=new Array(a),h=0;h<a;++h){var p=o[h],d=i[h],v=d.length,g=t.call(p,p&&p.__data__,h,o),y=g.length,m=l[h]=new Array(y),_=u[h]=new Array(y);r(p,d,m,_,f[h]=new Array(v),g,e);for(var b,w,x=0,k=0;x<y;++x)if(b=m[x]){for(x>=k&&(k=x+1);!(w=_[k])&&++k<y;);b._next=w||null}}return(u=new st(u,o))._enter=l,u._exit=f,u},enter:function(){return new st(this._enter||this._groups.map(a),this._parents)},exit:function(){return new st(this._exit||this._groups.map(a),this._parents)},join:function(t,e,n){var r=this.enter(),o=this,i=this.exit();return r="function"==typeof t?t(r):r.append(t+""),null!=e&&(o=e(o)),null==n?i.remove():n(i),r&&o?r.merge(o).order():o},merge:function(t){for(var e=this._groups,n=t._groups,r=e.length,o=n.length,i=Math.min(r,o),a=new Array(r),u=0;u<i;++u)for(var s,c=e[u],l=n[u],f=c.length,h=a[u]=new Array(f),p=0;p<f;++p)(s=c[p]||l[p])&&(h[p]=s);for(;u<r;++u)a[u]=e[u];return new st(a,this._parents)},order:function(){for(var t=this._groups,e=-1,n=t.length;++e<n;)for(var r,o=t[e],i=o.length-1,a=o[i];--i>=0;)(r=o[i])&&(a&&4^r.compareDocumentPosition(a)&&a.parentNode.insertBefore(r,a),a=r);return this},sort:function(t){function e(e,n){return e&&n?t(e.__data__,n.__data__):!e-!n}t||(t=l);for(var n=this._groups,r=n.length,o=new Array(r),i=0;i<r;++i){for(var a,u=n[i],s=u.length,c=o[i]=new Array(s),f=0;f<s;++f)(a=u[f])&&(c[f]=a);c.sort(e)}return new st(o,this._parents).order()},call:function(){var t=arguments[0];return arguments[0]=this,t.apply(null,arguments),this},nodes:function(){var t=new Array(this.size()),e=-1;return this.each((function(){t[++e]=this})),t},node:function(){for(var t=this._groups,e=0,n=t.length;e<n;++e)for(var r=t[e],o=0,i=r.length;o<i;++o){var a=r[o];if(a)return a}return null},size:function(){var t=0;return this.each((function(){++t})),t},empty:function(){return!this.node()},each:function(t){for(var e=this._groups,n=0,r=e.length;n<r;++n)for(var o,i=e[n],a=0,u=i.length;a<u;++a)(o=i[a])&&t.call(o,o.__data__,a,i);return this},attr:function(t,e){var n=p(t);if(arguments.length<2){var r=this.node();return n.local?r.getAttributeNS(n.space,n.local):r.getAttribute(n)}return this.each((null==e?n.local?v:d:"function"==typeof e?n.local?_:m:n.local?y:g)(n,e))},style:function(t,e,n){return arguments.length>1?this.each((null==e?w:"function"==typeof e?k:x)(t,e,null==n?"":n)):A(this.node(),t)},property:function(t,e){return arguments.length>1?this.each((null==e?S:"function"==typeof e?M:C)(t,e)):this.node()[t]},classed:function(t,e){var n=E(t+"");if(arguments.length<2){for(var r=B(this.node()),o=-1,i=n.length;++o<i;)if(!r.contains(n[o]))return!1;return!0}return this.each(("function"==typeof e?T:e?z:L)(n,e))},text:function(t){return arguments.length?this.each(null==t?R:("function"==typeof t?I:P)(t)):this.node().textContent},html:function(t){return arguments.length?this.each(null==t?$:("function"==typeof t?H:D)(t)):this.node().innerHTML},raise:function(){return this.each(U)},lower:function(){return this.each(q)},append:function(t){var e="function"==typeof t?t:X(t);return this.select((function(){return this.appendChild(e.apply(this,arguments))}))},insert:function(t,e){var n="function"==typeof t?t:X(t),r=null==e?Y:"function"==typeof e?e:o(e);return this.select((function(){return this.insertBefore(n.apply(this,arguments),r.apply(this,arguments)||null)}))},remove:function(){return this.each(G)},clone:function(t){return this.select(t?K:J)},datum:function(t){return arguments.length?this.property("__data__",t):this.node().__data__},on:function(t,e,n){var r,o,i=et(t+""),a=i.length;if(!(arguments.length<2)){for(u=e?rt:nt,null==n&&(n=!1),r=0;r<a;++r)this.each(u(i[r],e,n));return this}var u=this.node().__on;if(u)for(var s,c=0,l=u.length;c<l;++c)for(r=0,s=u[c];r<a;++r)if((o=i[r]).type===s.type&&o.name===s.name)return s.value},dispatch:function(t,e){return this.each(("function"==typeof e?at:it)(t,e))}};var lt=function(t){return"string"==typeof t?new st([[document.querySelector(t)]],[document.documentElement]):new st([[t]],ut)};function ft(t){var e=0,n=t.children,r=n&&n.length;if(r)for(;--r>=0;)e+=n[r].value;else e=1;t.value=e}function ht(t,e){var n,r,o,i,a,u=new gt(t),s=+t.value&&(u.value=t.value),c=[u];for(null==e&&(e=pt);n=c.pop();)if(s&&(n.value=+n.data.value),(o=e(n.data))&&(a=o.length))for(n.children=new Array(a),i=a-1;i>=0;--i)c.push(r=n.children[i]=new gt(o[i])),r.parent=n,r.depth=n.depth+1;return u.eachBefore(vt)}function pt(t){return t.children}function dt(t){t.data=t.data.data}function vt(t){var e=0;do{t.height=e}while((t=t.parent)&&t.height<++e)}function gt(t){this.data=t,this.depth=this.height=0,this.parent=null}gt.prototype=ht.prototype={constructor:gt,count:function(){return this.eachAfter(ft)},each:function(t){var e,n,r,o,i=this,a=[i];do{for(e=a.reverse(),a=[];i=e.pop();)if(t(i),n=i.children)for(r=0,o=n.length;r<o;++r)a.push(n[r])}while(a.length);return this},eachAfter:function(t){for(var e,n,r,o=this,i=[o],a=[];o=i.pop();)if(a.push(o),e=o.children)for(n=0,r=e.length;n<r;++n)i.push(e[n]);for(;o=a.pop();)t(o);return this},eachBefore:function(t){for(var e,n,r=this,o=[r];r=o.pop();)if(t(r),e=r.children)for(n=e.length-1;n>=0;--n)o.push(e[n]);return this},sum:function(t){return this.eachAfter((function(e){for(var n=+t(e.data)||0,r=e.children,o=r&&r.length;--o>=0;)n+=r[o].value;e.value=n}))},sort:function(t){return this.eachBefore((function(e){e.children&&e.children.sort(t)}))},path:function(t){for(var e=this,n=function(t,e){if(t===e)return t;var n=t.ancestors(),r=e.ancestors(),o=null;t=n.pop(),e=r.pop();for(;t===e;)o=t,t=n.pop(),e=r.pop();return o}(e,t),r=[e];e!==n;)e=e.parent,r.push(e);for(var o=r.length;t!==n;)r.splice(o,0,t),t=t.parent;return r},ancestors:function(){for(var t=this,e=[t];t=t.parent;)e.push(t);return e},descendants:function(){var t=[];return this.each((function(e){t.push(e)})),t},leaves:function(){var t=[];return this.eachBefore((function(e){e.children||t.push(e)})),t},links:function(){var t=this,e=[];return t.each((function(n){n!==t&&e.push({source:n.parent,target:n})})),e},copy:function(){return ht(this).eachBefore(dt)}};var yt=function(t){t.x0=Math.round(t.x0),t.y0=Math.round(t.y0),t.x1=Math.round(t.x1),t.y1=Math.round(t.y1)},mt=function(t,e,n,r,o){for(var i,a=t.children,u=-1,s=a.length,c=t.value&&(r-e)/t.value;++u<s;)(i=a[u]).y0=n,i.y1=o,i.x0=e,i.x1=e+=i.value*c},_t=function(t,e,n,r,o){for(var i,a=t.children,u=-1,s=a.length,c=t.value&&(o-n)/t.value;++u<s;)(i=a[u]).x0=e,i.x1=r,i.y0=n,i.y1=n+=i.value*c};var bt=function t(e){function n(t,n,r,o,i){!function(t,e,n,r,o,i){for(var a,u,s,c,l,f,h,p,d,v,g,y=[],m=e.children,_=0,b=0,w=m.length,x=e.value;_<w;){s=o-n,c=i-r;do{l=m[b++].value}while(!l&&b<w);for(f=h=l,g=l*l*(v=Math.max(c/s,s/c)/(x*t)),d=Math.max(h/g,g/f);b<w;++b){if(l+=u=m[b].value,u<f&&(f=u),u>h&&(h=u),g=l*l*v,(p=Math.max(h/g,g/f))>d){l-=u;break}d=p}y.push(a={value:l,dice:s<c,children:m.slice(_,b)}),a.dice?mt(a,n,r,o,x?r+=c*l/x:i):_t(a,n,r,x?n+=s*l/x:o,i),x-=l,_=b}}(e,t,n,r,o,i)}return n.ratio=function(e){return t((e=+e)>1?e:1)},n}((1+Math.sqrt(5))/2);function wt(t){if("function"!=typeof t)throw new Error;return t}function xt(){return 0}var kt=function(t){return function(){return t}},At=function(){var t=bt,e=!1,n=1,r=1,o=[0],i=xt,a=xt,u=xt,s=xt,c=xt;function l(t){return t.x0=t.y0=0,t.x1=n,t.y1=r,t.eachBefore(f),o=[0],e&&t.eachBefore(yt),t}function f(e){var n=o[e.depth],r=e.x0+n,l=e.y0+n,f=e.x1-n,h=e.y1-n;f<r&&(r=f=(r+f)/2),h<l&&(l=h=(l+h)/2),e.x0=r,e.y0=l,e.x1=f,e.y1=h,e.children&&(n=o[e.depth+1]=i(e)/2,r+=c(e)-n,l+=a(e)-n,(f-=u(e)-n)<r&&(r=f=(r+f)/2),(h-=s(e)-n)<l&&(l=h=(l+h)/2),t(e,r,l,f,h))}return l.round=function(t){return arguments.length?(e=!!t,l):e},l.size=function(t){return arguments.length?(n=+t[0],r=+t[1],l):[n,r]},l.tile=function(e){return arguments.length?(t=wt(e),l):t},l.padding=function(t){return arguments.length?l.paddingInner(t).paddingOuter(t):l.paddingInner()},l.paddingInner=function(t){return arguments.length?(i="function"==typeof t?t:kt(+t),l):i},l.paddingOuter=function(t){return arguments.length?l.paddingTop(t).paddingRight(t).paddingBottom(t).paddingLeft(t):l.paddingTop()},l.paddingTop=function(t){return arguments.length?(a="function"==typeof t?t:kt(+t),l):a},l.paddingRight=function(t){return arguments.length?(u="function"==typeof t?t:kt(+t),l):u},l.paddingBottom=function(t){return arguments.length?(s="function"==typeof t?t:kt(+t),l):s},l.paddingLeft=function(t){return arguments.length?(c="function"==typeof t?t:kt(+t),l):c},l};function St(){}function Ct(t,e){var n=new St;if(t instanceof St)t.each((function(t,e){n.set(e,t)}));else if(Array.isArray(t)){var r,o=-1,i=t.length;if(null==e)for(;++o<i;)n.set(o,t[o]);else for(;++o<i;)n.set(e(r=t[o],o,t),r)}else if(t)for(var a in t)n.set(a,t[a]);return n}St.prototype=Ct.prototype={constructor:St,has:function(t){return"$"+t in this},get:function(t){return this["$"+t]},set:function(t,e){return this["$"+t]=e,this},remove:function(t){var e="$"+t;return e in this&&delete this[e]},clear:function(){for(var t in this)"$"===t[0]&&delete this[t]},keys:function(){var t=[];for(var e in this)"$"===e[0]&&t.push(e.slice(1));return t},values:function(){var t=[];for(var e in this)"$"===e[0]&&t.push(this[e]);return t},entries:function(){var t=[];for(var e in this)"$"===e[0]&&t.push({key:e.slice(1),value:this[e]});return t},size:function(){var t=0;for(var e in this)"$"===e[0]&&++t;return t},empty:function(){for(var t in this)if("$"===t[0])return!1;return!0},each:function(t){for(var e in this)"$"===e[0]&&t(this[e],e.slice(1),this)}};var Mt=Ct,Et=function(){var t,e,n,r=[],o=[];function i(n,o,a,u){if(o>=r.length)return null!=t&&n.sort(t),null!=e?e(n):n;for(var s,c,l,f=-1,h=n.length,p=r[o++],d=Mt(),v=a();++f<h;)(l=d.get(s=p(c=n[f])+""))?l.push(c):d.set(s,[c]);return d.each((function(t,e){u(v,e,i(t,o,a,u))})),v}return n={object:function(t){return i(t,0,Bt,Ot)},map:function(t){return i(t,0,Nt,jt)},entries:function(t){return function t(n,i){if(++i>r.length)return n;var a,u=o[i-1];return null!=e&&i>=r.length?a=n.entries():(a=[],n.each((function(e,n){a.push({key:n,values:t(e,i)})}))),null!=u?a.sort((function(t,e){return u(t.key,e.key)})):a}(i(t,0,Nt,jt),0)},key:function(t){return r.push(t),n},sortKeys:function(t){return o[r.length-1]=t,n},sortValues:function(e){return t=e,n},rollup:function(t){return e=t,n}}};function Bt(){return{}}function Ot(t,e,n){t[e]=n}function Nt(){return Mt()}function jt(t,e,n){t.set(e,n)}function zt(){}var Lt=Mt.prototype;function Tt(t,e){var n=new zt;if(t instanceof zt)t.each((function(t){n.add(t)}));else if(t){var r=-1,o=t.length;if(null==e)for(;++r<o;)n.add(t[r]);else for(;++r<o;)n.add(e(t[r],r,t))}return n}zt.prototype=Tt.prototype={constructor:zt,has:Lt.has,add:function(t){return this["$"+(t+="")]=t,this},remove:Lt.remove,clear:Lt.clear,values:Lt.keys,size:Lt.size,empty:Lt.empty,each:Lt.each};function Rt(t,e){switch(arguments.length){case 0:break;case 1:this.range(t);break;default:this.range(e).domain(t)}return this}const Pt=Symbol("implicit");function It(){var t=new Map,e=[],n=[],r=Pt;function o(o){var i=o+"",a=t.get(i);if(!a){if(r!==Pt)return r;t.set(i,a=e.push(o))}return n[(a-1)%n.length]}return o.domain=function(n){if(!arguments.length)return e.slice();e=[],t=new Map;for(const r of n){const n=r+"";t.has(n)||t.set(n,e.push(r))}return o},o.range=function(t){return arguments.length?(n=Array.from(t),o):n.slice()},o.unknown=function(t){return arguments.length?(r=t,o):r},o.copy=function(){return It(e,n).unknown(r)},Rt.apply(o,arguments),o}}]);
//# sourceMappingURL=treemap.js.map