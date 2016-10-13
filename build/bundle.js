(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){var containers=[];var styleElements=[];module.exports=function(css,options){options=options||{};var position=options.prepend===true?"prepend":"append";var container=options.container!==undefined?options.container:document.querySelector("head");var containerId=containers.indexOf(container);if(containerId===-1){containerId=containers.push(container)-1;styleElements[containerId]={}}var styleElement;if(styleElements[containerId]!==undefined&&styleElements[containerId][position]!==undefined){styleElement=styleElements[containerId][position]}else{styleElement=styleElements[containerId][position]=createStyleElement();if(position==="prepend"){container.insertBefore(styleElement,container.childNodes[0])}else{container.appendChild(styleElement)}}if(styleElement.styleSheet){styleElement.styleSheet.cssText+=css}else{styleElement.textContent+=css}return styleElement};function createStyleElement(){var styleElement=document.createElement("style");styleElement.setAttribute("type","text/css");return styleElement}},{}],2:[function(require,module,exports){(function(factory){var registeredInModuleLoader=false;if(typeof define==="function"&&define.amd){define(factory);registeredInModuleLoader=true}if(typeof exports==="object"){module.exports=factory();registeredInModuleLoader=true}if(!registeredInModuleLoader){var OldCookies=window.Cookies;var api=window.Cookies=factory();api.noConflict=function(){window.Cookies=OldCookies;return api}}})(function(){function extend(){var i=0;var result={};for(;i<arguments.length;i++){var attributes=arguments[i];for(var key in attributes){result[key]=attributes[key]}}return result}function init(converter){function api(key,value,attributes){var result;if(typeof document==="undefined"){return}if(arguments.length>1){attributes=extend({path:"/"},api.defaults,attributes);if(typeof attributes.expires==="number"){var expires=new Date;expires.setMilliseconds(expires.getMilliseconds()+attributes.expires*864e5);attributes.expires=expires}try{result=JSON.stringify(value);if(/^[\{\[]/.test(result)){value=result}}catch(e){}if(!converter.write){value=encodeURIComponent(String(value)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent)}else{value=converter.write(value,key)}key=encodeURIComponent(String(key));key=key.replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent);key=key.replace(/[\(\)]/g,escape);return document.cookie=[key,"=",value,attributes.expires?"; expires="+attributes.expires.toUTCString():"",attributes.path?"; path="+attributes.path:"",attributes.domain?"; domain="+attributes.domain:"",attributes.secure?"; secure":""].join("")}if(!key){result={}}var cookies=document.cookie?document.cookie.split("; "):[];var rdecode=/(%[0-9A-Z]{2})+/g;var i=0;for(;i<cookies.length;i++){var parts=cookies[i].split("=");var cookie=parts.slice(1).join("=");if(cookie.charAt(0)==='"'){cookie=cookie.slice(1,-1)}try{var name=parts[0].replace(rdecode,decodeURIComponent);cookie=converter.read?converter.read(cookie,name):converter(cookie,name)||cookie.replace(rdecode,decodeURIComponent);if(this.json){try{cookie=JSON.parse(cookie)}catch(e){}}if(key===name){result=cookie;break}if(!key){result[name]=cookie}}catch(e){}}return result}api.set=api;api.get=function(key){return api.call(api,key)};api.getJSON=function(){return api.apply({json:true},[].slice.call(arguments))};api.defaults={};api.remove=function(key,attributes){api(key,"",extend(attributes,{expires:-1}))};api.withConverter=init;return api}return init(function(){})})},{}],3:[function(require,module,exports){module.exports=function yoyoifyAppendChild(el,childs){for(var i=0;i<childs.length;i++){var node=childs[i];if(Array.isArray(node)){yoyoifyAppendChild(el,node);continue}if(typeof node==="number"||typeof node==="boolean"||node instanceof Date||node instanceof RegExp){node=node.toString()}if(typeof node==="string"){if(el.lastChild&&el.lastChild.nodeName==="#text"){el.lastChild.nodeValue+=node;continue}node=document.createTextNode(node)}if(node&&node.nodeType){el.appendChild(node)}}}},{}],4:[function(require,module,exports){var Cookies=require("js-cookie");var html={};var css=0;require("insert-css")('@import "https://fonts.googleapis.com/css?family=Open+Sans";');var MODAL_POPUP_DELAY=500;var hostname="https://cityofphiladelphia.github.io/beta-redirect/";var existingCookie=Cookies.get("beta");if(window.location.search.substring(1)==="opt-out"){Cookies.set("beta","opt-out",{domain:"phila.gov"})}else if(existingCookie==="opt-in"){redirectToBeta()}else if(existingCookie!=="opt-out"){window.setTimeout(function(){var modalOverlay=ModalOverlay(Modal());document.body.appendChild(modalOverlay)},MODAL_POPUP_DELAY)}function ModalOverlay(contents){var prefix=(require("insert-css")("._e799c24e {\n      position: fixed;\n      height: 100%;\n      width: 100%;\n      top: 0;\n      left: 0;\n      z-index: 99999;\n      background-color: rgba(0, 0, 0, 0.6);\n    }")||true)&&"_e799c24e";var overlay=function(){var ac=require("/Users/tim/Sites/beta-redirect/node_modules/yo-yoify/lib/appendChild.js");var bel0=document.createElement("div");bel0.setAttribute("id","beta-overlay");bel0["onclick"]=arguments[0];bel0.setAttribute("class",arguments[1]);ac(bel0,["\n      ",arguments[2],"\n    "]);return bel0}(onClickOverlay,prefix,contents);overlay.show=showOverlay;overlay.hide=hideOverlay;return overlay;function onClickOverlay(e){if(e.target===overlay){hideOverlay()}e.preventDefault();e.stopPropagation()}function showOverlay(){overlay.style.display="block"}function hideOverlay(){overlay.style.display="none"}}function Modal(){var prefix=(require("insert-css")("._9f313828 {\n      width: 60%;\n      min-height: 300px;\n      background-color: #f0f0f0;\n      margin: 0 auto;\n      margin-top: 10%;\n      padding: 1.5rem;\n      font-family: 'Open Sans', sans-serif;\n    }\n    ._9f313828 .modal-row-left,\n    ._9f313828 .modal-row-right {\n      float: left;\n      width: 50%;\n      text-align: center;\n    }\n    ._9f313828 .clearfix {\n      clear: left;\n    }\n    ._9f313828 #modal-green-arrow {\n      width: 65px;\n    }\n    ._9f313828 #computer {\n      width: 100%;\n      max-width: 279px;\n    }\n    ._9f313828 h2 {\n      font-family: 'Open Sans', sans-serif;\n      font-weight: bold !important;\n    }\n    ._9f313828 .subtext {\n      font-size: 130%;\n    }\n    ._9f313828 #accept-beta,\n    ._9f313828 #decline-beta {\n      border: none;\n      font-family: 'Open Sans', sans-serif;\n      font-weight: bold;\n      font-size: 140%;\n      text-transform: uppercase;\n      width: 90%;\n      padding: 0.5rem;\n      cursor: pointer;\n    }\n    ._9f313828 #accept-beta {\n      background-color: #04CDF9;\n      border: none;\n    }\n    ._9f313828 #decline-beta {\n      background-color: #fff;\n      border: 1px #04CDF9 solid;\n    }")||true)&&"_9f313828";var modal=function(){var ac=require("/Users/tim/Sites/beta-redirect/node_modules/yo-yoify/lib/appendChild.js");var bel13=document.createElement("div");bel13.setAttribute("id","beta-modal");bel13.setAttribute("class",arguments[4]);var bel7=document.createElement("div");bel7.setAttribute("class","modal-row");var bel1=document.createElement("div");bel1.setAttribute("class","modal-row-left");var bel0=document.createElement("img");bel0.setAttribute("src",arguments[0]+"img/beta-screen.png");bel0.setAttribute("id","computer");ac(bel1,["\n          ",bel0,"\n        "]);var bel5=document.createElement("div");bel5.setAttribute("class","modal-row-right");var bel2=document.createElement("img");bel2.setAttribute("src",arguments[1]+"img/green-arrow.png");bel2.setAttribute("id","modal-green-arrow");var bel3=document.createElement("h2");ac(bel3,["The City is in the process of redesigning phila.gov to better meet your needs."]);var bel4=document.createElement("p");bel4.setAttribute("class","subtext");ac(bel4,["Are you interested in using the site that's being worked on, which is called beta.phila.gov?"]);ac(bel5,["\n          ",bel2,"\n          ",bel3,"\n          ",bel4,"\n        "]);var bel6=document.createElement("div");bel6.setAttribute("class","clearfix");ac(bel7,["\n        ",bel1,"\n        ",bel5,"\n        ",bel6,"\n      "]);var bel12=document.createElement("div");bel12.setAttribute("class","modal-row");var bel9=document.createElement("div");bel9.setAttribute("class","modal-row-left");var bel8=document.createElement("button");bel8.setAttribute("type","button");bel8.setAttribute("id","decline-beta");bel8["onclick"]=arguments[2];ac(bel8,["\n            No, return to phila.gov\n          "]);ac(bel9,["\n          ",bel8,"\n        "]);var bel11=document.createElement("div");bel11.setAttribute("class","modal-row-right");var bel10=document.createElement("button");bel10.setAttribute("type","button");bel10.setAttribute("id","accept-beta");bel10["onclick"]=arguments[3];ac(bel10,["\n            Yes, take me to beta.phila.gov\n          "]);ac(bel11,["\n          ",bel10,"\n        "]);ac(bel12,["\n        ",bel9,"\n        ",bel11,"\n      "]);ac(bel13,["\n      ",bel7,"\n      ",bel12,"\n    "]);return bel13}(hostname,hostname,onDecline,onAccept,prefix);return modal;function onDecline(e){Cookies.set("beta","opt-out",{domain:"phila.gov"});modal.parentNode.hide();e.preventDefault()}function onAccept(e){Cookies.set("beta","opt-in",{domain:"phila.gov"});redirectToBeta();e.preventDefault()}}function redirectToBeta(){window.location.href="https://beta.phila.gov"}},{"/Users/tim/Sites/beta-redirect/node_modules/yo-yoify/lib/appendChild.js":3,"insert-css":1,"js-cookie":2}]},{},[4]);
