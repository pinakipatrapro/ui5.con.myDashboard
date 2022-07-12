/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";function t(){this.mCache={}}t.prototype.addContext=function(t,e,n,r){var i,o;o=this.mCache[e];if(!o){o=this.mCache[e]={}}i=o[n];if(!i){i=o[n]=[];i.bAtEnd=r}if(r){i.push(t)}else{i.unshift(t)}};t.prototype.findAndRemoveContext=function(t){var e=this.getCacheInfo(t);if(e){this.removeContext(t,e.cachePath,e.listID)}};t.prototype.findCreatedContext=function(t){var e;Object.values(this.mCache).some(function(n){return Object.values(n).some(function(n){return n.some(function(n){if(t.startsWith(n.getPath())){e=n;return true}return false})})});return e};t.prototype.getCacheInfo=function(t){var e,n=this;Object.keys(this.mCache).some(function(r){var i=n.mCache[r];return Object.keys(i).some(function(i){var o=n.mCache[r][i];if(o.includes(t)){e={cachePath:r,listID:i};return true}return false})});return e};t.prototype.getContexts=function(t,e){var n=this.mCache[t],r=n&&n[e];return r?r.slice():[]};t.prototype.isAtEnd=function(t,e){var n=this.mCache[t],r=n&&n[e];return r&&r.bAtEnd};t.prototype.removeContext=function(t,e,n){var r=this.mCache[e],i=r[n];i.splice(i.indexOf(t),1);if(!i.length){delete r[n];if(!Object.keys(r).length){delete this.mCache[e]}}};t.prototype.removePersistedContexts=function(t,e){var n=this.getContexts(t,e).filter(function(t){return t.isTransient()===false}),r=this;n.forEach(function(n){n.resetCreatedPromise();r.removeContext(n,t,e)});return n};return t});