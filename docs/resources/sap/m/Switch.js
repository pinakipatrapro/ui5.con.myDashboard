/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","sap/ui/core/EnabledPropagator","sap/ui/core/IconPool","sap/ui/core/theming/Parameters","sap/ui/events/KeyCodes","./SwitchRenderer","sap/base/assert"],function(t,e,i,s,o,n,a,r){"use strict";var p=t.touch;var u=t.SwitchType;var h=e.extend("sap.m.Switch",{metadata:{interfaces:["sap.ui.core.IFormContent","sap.m.IOverflowToolbarContent"],library:"sap.m",properties:{state:{type:"boolean",group:"Misc",defaultValue:false},customTextOn:{type:"string",group:"Misc",defaultValue:""},customTextOff:{type:"string",group:"Misc",defaultValue:""},enabled:{type:"boolean",group:"Data",defaultValue:true},name:{type:"string",group:"Misc",defaultValue:""},type:{type:"sap.m.SwitchType",group:"Appearance",defaultValue:u.Default}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{change:{parameters:{state:{type:"boolean"}}}},designtime:"sap/m/designtime/Switch.designtime"}});s.insertFontFaceStyle();i.apply(h.prototype,[true]);h.prototype._slide=function(t){if(t>h._OFFPOSITION){t=h._OFFPOSITION}else if(t<h._ONPOSITION){t=h._ONPOSITION}if(t>this._iNoLabelFix){t=this._iNoLabelFix}if(this._iCurrentPosition===t){return}this._iCurrentPosition=t;this.getDomRef("inner").style[sap.ui.getCore().getConfiguration().getRTL()?"right":"left"]=t+"px";this._setTempState(Math.abs(t)<h._SWAPPOINT)};h.prototype._resetSlide=function(){this.getDomRef("inner").style.cssText=""};h.prototype._setTempState=function(t){if(this._bTempState===t){return}this._bTempState=t;this.getDomRef("handle").setAttribute("data-sap-ui-swt",t?this._sOn:this._sOff)};h.prototype._getInvisibleElement=function(){return this.$("invisible")};h.prototype.getInvisibleElementId=function(){return this.getId()+"-invisible"};h.prototype.getInvisibleElementText=function(t){var e=sap.ui.getCore().getLibraryResourceBundle("sap.m");var i="";switch(this.getType()){case u.Default:if(t){i=this.getCustomTextOn().trim()||e.getText("SWITCH_ON")}else{i=this.getCustomTextOff().trim()||e.getText("SWITCH_OFF")}break;case u.AcceptReject:if(t){i=e.getText("SWITCH_ARIA_ACCEPT")}else{i=e.getText("SWITCH_ARIA_REJECT")}break}return i};var c=Object.assign({_sap_m_Switch_OnPosition:-32,_sap_m_Switch_OffPosition:0},o.get({name:["_sap_m_Switch_OnPosition","_sap_m_Switch_OffPosition"],callback:function(t){h._ONPOSITION=Number(t["_sap_m_Switch_OnPosition"]);h._OFFPOSITION=Number(t["_sap_m_Switch_OffPosition"]);h._SWAPPOINT=Math.abs((h._ONPOSITION-h._OFFPOSITION)/2)}}));h._ONPOSITION=Number(c["_sap_m_Switch_OnPosition"]);h._OFFPOSITION=Number(c["_sap_m_Switch_OffPosition"]);h._SWAPPOINT=Math.abs((h._ONPOSITION-h._OFFPOSITION)/2);h.prototype.onBeforeRendering=function(){var t=sap.ui.getCore().getLibraryResourceBundle("sap.m");this._sOn=this.getCustomTextOn()||t.getText("SWITCH_ON");this._sOff=this.getCustomTextOff()||t.getText("SWITCH_OFF")};h.prototype.ontouchstart=function(t){var e=t.targetTouches[0],i=this.getRenderer().CSS_CLASS,s=this.$("inner");t.setMarked();if(p.countContained(t.touches,this.getId())>1||!this.getEnabled()||t.button){return}this._iActiveTouchId=e.identifier;this._bTempState=this.getState();this._iStartPressPosX=e.pageX;this._iPosition=s.position().left;this._bDragging=false;setTimeout(this["focus"].bind(this),0);this.$("switch").addClass(i+"Pressed");this._iNoLabelFix=parseInt(getComputedStyle(this.getDomRef("switch")).outlineOffset)};h.prototype.ontouchmove=function(t){t.setMarked();t.preventDefault();var e,i,s=p;if(!this.getEnabled()||t.button){return}r(s.find(t.touches,this._iActiveTouchId),"missing touchend");e=s.find(t.changedTouches,this._iActiveTouchId);if(!e||Math.abs(e.pageX-this._iStartPressPosX)<6){return}this._bDragging=true;i=(this._iStartPressPosX-e.pageX)*-1+this._iPosition;if(sap.ui.getCore().getConfiguration().getRTL()){i=-i}this._slide(i)};h.prototype.ontouchend=function(t){t.setMarked();var e,i=p;if(!this.getEnabled()||t.button){return}r(this._iActiveTouchId!==undefined,"expect to already be touching");e=i.find(t.changedTouches,this._iActiveTouchId);if(e){r(!i.find(t.touches,this._iActiveTouchId),"touchend still active");if(!this._updateStateAndNotify()){this.$("switch").removeClass(this.getRenderer().CSS_CLASS+"Pressed");this._resetSlide()}}};h.prototype.ontouchcancel=h.prototype.ontouchend;h.prototype._handleSpaceOrEnter=function(t){if(this.getEnabled()){t.setMarked();if(!this._bDragging){this._updateStateAndNotify()}}};h.prototype.onsapspace=function(t){t.preventDefault()};h.prototype.onkeyup=function(t){if(t.which===n.SPACE){this._handleSpaceOrEnter(t)}};h.prototype.onsapenter=h.prototype._handleSpaceOrEnter;h.prototype._updateStateAndNotify=function(){var t=this.getState(),e;this.setState(this._bDragging?this._bTempState:!t);e=t!==this.getState();if(e){this.fireChange({state:this.getState()})}this._bDragging=false;return e};h.prototype.getAccessibilityInfo=function(){var t=sap.ui.getCore().getLibraryResourceBundle("sap.m"),e=this.getState(),i=this.getInvisibleElementText(e);return{role:"switch",type:t.getText("ACC_CTR_TYPE_SWITCH"),description:i,focusable:this.getEnabled(),enabled:this.getEnabled()}};h.prototype.getOverflowToolbarConfig=function(){return{propsUnrelatedToSize:["enabled","state"]}};return h});