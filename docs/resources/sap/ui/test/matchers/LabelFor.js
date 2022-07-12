/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/ManagedObject","sap/ui/test/matchers/Matcher","sap/ui/test/matchers/I18NText"],function(e,t,a){"use strict";var r=new a;var i=["sap.ui.comp.navpopover.SmartLink","sap.m.Link","sap.m.Label","sap.m.Text"];var n=t.extend("sap.ui.test.matchers.LabelFor",{metadata:{publicMethods:["isMatching"],properties:{text:{type:"string"},modelName:{type:"string",defaultValue:"i18n"},key:{type:"string"},parameters:{type:"any"},propertyName:{type:"string",defaultValue:"text"}}},constructor:function(a){if(a&&a.text){a.text=e.escapeSettingsValue(a.text)}t.prototype.constructor.call(this,a)},isMatching:function(e){var t;var a=this.getModelName();var n=this.getText();var s=this.getParameters();var o=this.getPropertyName();var p=this.getKey();if(n&&p){this._oLogger.error("Combination of text and key properties is not allowed");return false}if(!n&&!p){this._oLogger.error("Text and key properties are not defined but exactly one is required");return false}if(i.indexOf(e.getMetadata().getName())>-1){this._oLogger.error("Control cannot have an associated label according to HTML standard");return false}var g=this._getApplicationWindow().jQuery.sap.getObject("sap.m.Label");var l=this._getApplicationWindow().sap.ui.core.Element.registry.filter(function(e){return e instanceof g});r.applySettings({key:p,modelName:a,parameters:s,propertyName:o});t=l.some(function(t){if(p&&r.isMatching(t)){return e.getId()===t.getLabelForRendering()}else if(n&&t.getText()===n){return e.getId()===t.getLabelForRendering()}});if(!t){var c=p?"I18N text key "+p:"text "+n;this._oLogger.debug("Control '"+e+"' does not have an associated label with "+c)}return t}});return n});