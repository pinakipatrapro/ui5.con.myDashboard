/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/ManagedObject","sap/ui/test/actions/Action","sap/ui/events/KeyCodes","sap/ui/thirdparty/jquery"],function(t,e,r,i){"use strict";var n=e.extend("sap.ui.test.actions.EnterText",{metadata:{properties:{text:{type:"string"},clearTextFirst:{type:"boolean",defaultValue:true},keepFocus:{type:"boolean",defaultValue:false},pressEnterKey:{type:"boolean",defaultValue:false}},publicMethods:["executeOn"]},constructor:function(r){if(r&&r.text){r.text=t.escapeSettingsValue(r.text)}e.prototype.constructor.call(this,r)},init:function(){e.prototype.init.apply(this,arguments);this.controlAdapters=i.extend(this.controlAdapters,n.controlAdapters)},executeOn:function(t){var e=this.$(t),i=e[0];if(!i){return}if(this.getText()===undefined||!this.getClearTextFirst()&&!this.getText()){this.oLogger.error("Please provide a text for this EnterText action");return}if(i.readOnly){this.oLogger.debug("Cannot enter text in control "+t+": control is not editable!");return}if(i.disabled){this.oLogger.debug("Cannot enter text in control "+t+": control is not enabled!");return}var n=this.getUtils();this.oLogger.timestamp("opa.actions.enterText");this.oLogger.debug("Enter text in control "+t);this._tryOrSimulateFocusin(e,t);if(this.getClearTextFirst()){n.triggerKeydown(i,r.DELETE);n.triggerKeyup(i,r.DELETE);e.val("");n.triggerEvent("input",i)}var s=e.val();this.getText().split("").forEach(function(t){s+=t;n.triggerCharacterInput(i,t,s);n.triggerEvent("input",i)});if(this.getPressEnterKey()){n.triggerKeydown(i,r.ENTER);n.triggerKeyup(i,r.ENTER);n.triggerEvent("input",i);n.triggerEvent("search",i)}else if(!this.getKeepFocus()){this._simulateFocusout(i);n.triggerEvent("search",i)}}});n.controlAdapters={};n.controlAdapters["sap.m.StepInput"]="input-inner";return n});