/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","./library","sap/ui/core/ResizeHandler","./BlockLayoutRenderer"],function(e,t,i,n){"use strict";var r=e.extend("sap.ui.layout.BlockLayout",{metadata:{library:"sap.ui.layout",properties:{background:{type:"sap.ui.layout.BlockBackgroundType",group:"Appearance",defaultValue:"Default"},keepFontSize:{type:"boolean",group:"Behavior",defaultValue:false}},defaultAggregation:"content",aggregations:{content:{type:"sap.ui.layout.BlockLayoutRow",multiple:true}},designtime:"sap/ui/layout/designtime/BlockLayout.designtime"}});r.CONSTANTS={SIZES:{S:600,M:1024,L:1440,XL:null}};r.prototype.init=function(){this._currentBreakpoint=null};r.prototype.onBeforeRendering=function(){this._detachResizeHandler()};r.prototype.onAfterRendering=function(){this._onParentResize();this._notifySizeListeners()};r.prototype._onParentResize=function(){var e,t=this.getDomRef(),i=t.clientWidth,n=r.CONSTANTS.SIZES;this._detachResizeHandler();if(i>0){this._removeBreakpointClasses();for(e in n){if(n.hasOwnProperty(e)&&(n[e]===null||n[e]>i)){if(this._currentBreakpoint!=e){this._currentBreakpoint=e;this._notifySizeListeners()}this.addStyleClass("sapUiBlockLayoutSize"+e,true);break}}}this._attachResizeHandler()};r.prototype._notifySizeListeners=function(){var e=this;this.getContent().forEach(function(t){t._onParentSizeChange(e._currentBreakpoint)})};r.prototype._removeBreakpointClasses=function(){var e=r.CONSTANTS.SIZES;for(var t in e){if(e.hasOwnProperty(t)){this.removeStyleClass("sapUiBlockLayoutSize"+t,true)}}};r.prototype._attachResizeHandler=function(){if(!this._parentResizeHandler){this._parentResizeHandler=i.register(this,this._onParentResize.bind(this))}};r.prototype._detachResizeHandler=function(){if(this._parentResizeHandler){i.deregister(this._parentResizeHandler);this._parentResizeHandler=null}};r.prototype.exit=function(){this._detachResizeHandler()};return r});