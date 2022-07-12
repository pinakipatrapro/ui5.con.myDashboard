/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/ManagedObject","sap/base/Log","sap/base/assert"],function(e,t,n){"use strict";function i(i,r){if(typeof i!=="function"||!(i.prototype instanceof e)){throw new TypeError("ManagedObjectRegistry mixin can only be applied to subclasses of sap.ui.base.ManagedObject")}r=r||{};var o=r.onDuplicate||function(e,n,r){var o=i.getMetadata().getStereotype();t.error('adding object "'+o+"\" with duplicate id '"+e+"'");throw new Error('Error: adding object "'+o+"\" with duplicate id '"+e+"'")};var a=r.onDeregister||null;var s=Object.create(null);var f=0;i.prototype.register=function e(){var t=this.getId(),n=s[t];if(n&&n!==this){o(t,n,this);f--}s[t]=this;f++};i.prototype.deregister=function e(){if(s[this.sId]){if(a){a(this.sId)}delete s[this.sId];f--}};i["registry"]=Object.freeze({get size(){return f},all:function(){var e=Object.create(null);return Object.assign(e,s)},get:function(e){n(e==null||typeof e==="string","id must be a string when defined");return e==null?undefined:s[e]},forEach:function(e,t){if(typeof e!=="function"){throw new TypeError(e+" is not a function")}if(t!=null){e=e.bind(t)}for(var n in s){e(s[n],n)}},filter:function(e,t){if(typeof e!=="function"){throw new TypeError(e+" is not a function")}if(t!=null){e=e.bind(t)}var n=[],i;for(i in s){if(e(s[i],i)){n.push(s[i])}}return n}})}return{apply:i}});