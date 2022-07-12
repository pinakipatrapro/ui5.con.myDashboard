/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
(function(){"use strict";var r=window.sap&&window.sap.ui&&window.sap.ui.loader,e=window["sap-ui-config"]||{},i,t,a,s,u,p,o,d=false;function n(r,e){var a=r&&r.getAttribute("src"),s=e.exec(a);if(s){i=s[1]||"";p=r;o=a;t=/sap-ui-core-nojQuery\.js(?:[?#]|$)/.test(a);return true}}function y(r){return r&&r[r.length-1]!=="/"?r+"/":r}if(r==null){throw new Error("ui5loader-autoconfig.js: ui5loader is needed, but could not be found")}if(!n(document.querySelector("SCRIPT[src][id=sap-ui-bootstrap]"),/^((?:[^?#]*\/)?resources\/)/)){s=/^([^?#]*\/)?(?:sap-ui-(?:core|custom|boot|merged)(?:-[^?#/]*)?|jquery.sap.global|ui5loader(?:-autoconfig)?)\.js(?:[?#]|$)/;a=document.scripts;for(u=0;u<a.length;u++){if(n(a[u],s)){break}}}if(typeof e==="object"&&typeof e.resourceRoots==="object"&&typeof e.resourceRoots[""]==="string"){i=e.resourceRoots[""]}if(i==null){throw new Error("ui5loader-autoconfig.js: could not determine base URL. No known script tag and no configuration found!")}(function(){var r;try{r=window.localStorage.getItem("sap-ui-reboot-URL")}catch(r){}if(/sap-bootstrap-debug=(true|x|X)/.test(location.search)){debugger}if(r){var e=y(i)+"sap/ui/core/support/debugReboot.js";document.write('<script src="'+e+'"><\/script>');var t=new Error("This is not a real error. Aborting UI5 bootstrap and rebooting from: "+r);t.name="Restart";throw t}})();(function(){var e=/(?:^|\?|&)sap-ui-debug=([^&]*)(?:&|$)/.exec(window.location.search),t=e&&decodeURIComponent(e[1]);try{t=t||window.localStorage.getItem("sap-ui-debug")}catch(r){}t=t||p&&p.getAttribute("data-sap-ui-debug");if(typeof t==="string"){if(/^(?:false|true|x|X)$/.test(t)){t=t!=="false"}}else{t=!!t}if(/-dbg\.js([?#]|$)/.test(o)){window["sap-ui-loaddbg"]=true;t=t||true}window["sap-ui-debug"]=t;window["sap-ui-optimized"]=window["sap-ui-optimized"]||/\.location/.test(l)&&!/oBootstrapScript/.test(l);if(window["sap-ui-optimized"]&&t){window["sap-ui-loaddbg"]=true;if(t===true&&!window["sap-ui-debug-no-reboot"]){var a;if(o!=null){a=o.replace(/\/(?:sap-ui-cachebuster\/)?([^\/]+)\.js/,"/$1-dbg.js")}else{a=y(i)+"sap-ui-core.js"}r.config({amd:false});window["sap-ui-optimized"]=false;if(r.config().async){var s=document.createElement("script");s.src=a;document.head.appendChild(s)}else{document.write('<script src="'+a+'"><\/script>')}var u=new Error("This is not a real error. Aborting UI5 bootstrap and restarting from: "+a);u.name="Restart";throw u}}function d(r){if(!/\/\*\*\/$/.test(r)){r=r.replace(/\/$/,"/**/")}return r.replace(/\*\*\/|\*|[[\]{}()+?.\\^$|]/g,function(r){switch(r){case"**/":return"(?:[^/]+/)*";case"*":return"[^/]*";default:return"\\"+r}})}var n;if(typeof t==="string"){var c="^(?:"+t.split(/,/).map(d).join("|")+")",h=new RegExp(c);n=function(r){return h.test(r)};r._.logger.debug("Modules that should be excluded from preload: '"+c+"'")}else if(t===true){n=function(){return true};r._.logger.debug("All modules should be excluded from preload")}r.config({debugSources:!!window["sap-ui-loaddbg"],ignoreBundledResources:n})})();function l(r,i,t){var a=window.location.search.match(new RegExp("(?:^\\??|&)sap-ui-"+r+"=([^&]*)(?:&|$)"));if(a&&(t==null||t.test(a[1]))){return a[1]}var s=p&&p.getAttribute("data-sap-ui-"+r.toLowerCase());if(s!=null&&(t==null||t.test(s))){return s}if(Object.prototype.hasOwnProperty.call(e,r)&&(t==null||t.test(e[r]))){return e[r]}if(r.slice(0,3)!=="xx-"){return l("xx-"+r,i,t)}return i}function c(r,e){return/^(?:true|x|X)$/.test(l(r,e,/^(?:true|x|X|false)$/))}if(c("async",false)){r.config({async:true})}d=c("amd",!c("noLoaderConflict",true));r.config({baseUrl:i,amd:d,map:{"*":{blanket:"sap/ui/thirdparty/blanket",crossroads:"sap/ui/thirdparty/crossroads",d3:"sap/ui/thirdparty/d3",handlebars:"sap/ui/thirdparty/handlebars",hasher:"sap/ui/thirdparty/hasher",IPv6:"sap/ui/thirdparty/IPv6",jquery:"sap/ui/thirdparty/jquery",jszip:"sap/ui/thirdparty/jszip",less:"sap/ui/thirdparty/less",OData:"sap/ui/thirdparty/datajs",punycode:"sap/ui/thirdparty/punycode",SecondLevelDomains:"sap/ui/thirdparty/SecondLevelDomains",sinon:"sap/ui/thirdparty/sinon",signals:"sap/ui/thirdparty/signals",URI:"sap/ui/thirdparty/URI",URITemplate:"sap/ui/thirdparty/URITemplate",esprima:"sap/ui/documentation/sdk/thirdparty/esprima"}},shim:{"sap/ui/thirdparty/bignumber":{amd:true,exports:"BigNumber"},"sap/ui/thirdparty/blanket":{amd:true,exports:"blanket"},"sap/ui/thirdparty/caja-html-sanitizer":{amd:false,exports:"html"},"sap/ui/thirdparty/crossroads":{amd:true,exports:"crossroads",deps:["sap/ui/thirdparty/signals"]},"sap/ui/thirdparty/d3":{amd:true,exports:"d3"},"sap/ui/thirdparty/datajs":{amd:true,exports:"OData"},"sap/ui/thirdparty/handlebars":{amd:true,exports:"Handlebars"},"sap/ui/thirdparty/hasher":{amd:true,exports:"hasher",deps:["sap/ui/thirdparty/signals"]},"sap/ui/thirdparty/IPv6":{amd:true,exports:"IPv6"},"sap/ui/thirdparty/iscroll-lite":{amd:false,exports:"iScroll"},"sap/ui/thirdparty/iscroll":{amd:false,exports:"iScroll"},"sap/ui/thirdparty/jquery":{amd:true,exports:"jQuery",deps:["sap/ui/thirdparty/jquery-compat"]},"sap/ui/thirdparty/jqueryui/jquery-ui-datepicker":{deps:["sap/ui/thirdparty/jqueryui/jquery-ui-core"],exports:"jQuery"},"sap/ui/thirdparty/jqueryui/jquery-ui-draggable":{deps:["sap/ui/thirdparty/jqueryui/jquery-ui-mouse"],exports:"jQuery"},"sap/ui/thirdparty/jqueryui/jquery-ui-droppable":{deps:["sap/ui/thirdparty/jqueryui/jquery-ui-mouse","sap/ui/thirdparty/jqueryui/jquery-ui-draggable"],exports:"jQuery"},"sap/ui/thirdparty/jqueryui/jquery-ui-effect":{deps:["sap/ui/thirdparty/jquery"],exports:"jQuery"},"sap/ui/thirdparty/jqueryui/jquery-ui-mouse":{deps:["sap/ui/thirdparty/jqueryui/jquery-ui-core","sap/ui/thirdparty/jqueryui/jquery-ui-widget"],exports:"jQuery"},"sap/ui/thirdparty/jqueryui/jquery-ui-position":{deps:["sap/ui/thirdparty/jquery"],exports:"jQuery"},"sap/ui/thirdparty/jqueryui/jquery-ui-resizable":{deps:["sap/ui/thirdparty/jqueryui/jquery-ui-mouse"],exports:"jQuery"},"sap/ui/thirdparty/jqueryui/jquery-ui-selectable":{deps:["sap/ui/thirdparty/jqueryui/jquery-ui-mouse"],exports:"jQuery"},"sap/ui/thirdparty/jqueryui/jquery-ui-sortable":{deps:["sap/ui/thirdparty/jqueryui/jquery-ui-mouse"],exports:"jQuery"},"sap/ui/thirdparty/jqueryui/jquery-ui-widget":{deps:["sap/ui/thirdparty/jquery"],exports:"jQuery"},"sap/ui/thirdparty/jquery-mobile-custom":{amd:true,deps:["sap/ui/thirdparty/jquery","sap/ui/Device"],exports:"jQuery.mobile"},"sap/ui/thirdparty/jszip":{amd:true,exports:"JSZip"},"sap/ui/thirdparty/less":{amd:true,exports:"less"},"sap/ui/thirdparty/mobify-carousel":{amd:false,exports:"Mobify"},"sap/ui/thirdparty/qunit-2":{amd:false,exports:"QUnit"},"sap/ui/thirdparty/punycode":{amd:true,exports:"punycode"},"sap/ui/thirdparty/RequestRecorder":{amd:true,exports:"RequestRecorder",deps:["sap/ui/thirdparty/URI","sap/ui/thirdparty/sinon"]},"sap/ui/thirdparty/require":{exports:"define"},"sap/ui/thirdparty/SecondLevelDomains":{amd:true,exports:"SecondLevelDomains"},"sap/ui/thirdparty/signals":{amd:true,exports:"signals"},"sap/ui/thirdparty/sinon":{amd:true,exports:"sinon"},"sap/ui/thirdparty/sinon-4":{amd:true,exports:"sinon"},"sap/ui/thirdparty/sinon-server":{amd:true,exports:"sinon"},"sap/ui/thirdparty/URI":{amd:true,exports:"URI"},"sap/ui/thirdparty/URITemplate":{amd:true,exports:"URITemplate",deps:["sap/ui/thirdparty/URI"]},"sap/ui/thirdparty/vkbeautify":{amd:false,exports:"vkbeautify"},"sap/ui/thirdparty/zyngascroll":{amd:false,exports:"Scroller"},"sap/ui/demokit/js/esprima":{amd:true,exports:"esprima"},"sap/ui/documentation/sdk/thirdparty/esprima":{amd:true,exports:"esprima"},"sap/viz/libs/canvg":{deps:["sap/viz/libs/rgbcolor"]},"sap/viz/libs/rgbcolor":{},"sap/viz/libs/sap-viz":{deps:["sap/viz/library","sap/ui/thirdparty/jquery","sap/ui/thirdparty/d3","sap/viz/libs/canvg"]},"sap/viz/libs/sap-viz-info-charts":{deps:["sap/viz/libs/sap-viz-info-framework"]},"sap/viz/libs/sap-viz-info-framework":{deps:["sap/ui/thirdparty/jquery","sap/ui/thirdparty/d3"]},"sap/viz/ui5/container/libs/sap-viz-controls-vizcontainer":{deps:["sap/viz/libs/sap-viz","sap/viz/ui5/container/libs/common/libs/rgbcolor/rgbcolor_static"]},"sap/viz/ui5/controls/libs/sap-viz-vizframe/sap-viz-vizframe":{deps:["sap/viz/libs/sap-viz-info-charts"]},"sap/viz/ui5/controls/libs/sap-viz-vizservices/sap-viz-vizservices":{deps:["sap/viz/libs/sap-viz-info-charts"]},"sap/viz/resources/chart/templates/standard_fiori/template":{deps:["sap/viz/libs/sap-viz-info-charts"]}}});var h=r._.defineModuleSync;h("ui5loader.js",null);h("ui5loader-autoconfig.js",null);if(t&&typeof jQuery==="function"){h("sap/ui/thirdparty/jquery.js",jQuery);if(jQuery.ui&&jQuery.ui.position){h("sap/ui/thirdparty/jqueryui/jquery-ui-position.js",jQuery)}}var m=p&&p.getAttribute("data-sap-ui-main");if(m){sap.ui.require(m.trim().split(/\s*,\s*/))}})();