/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Element","sap/ui/base/ManagedObjectObserver","sap/ui/core/theming/Parameters","sap/ui/layout/library","sap/base/Log"],function(e,t,i,n,o){"use strict";var r=e.extend("sap.ui.layout.form.FormContainer",{metadata:{library:"sap.ui.layout",properties:{expanded:{type:"boolean",group:"Misc",defaultValue:true},expandable:{type:"boolean",group:"Misc",defaultValue:false},visible:{type:"boolean",group:"Misc",defaultValue:true},_editable:{type:"boolean",group:"Misc",defaultValue:false,visibility:"hidden"}},defaultAggregation:"formElements",aggregations:{formElements:{type:"sap.ui.layout.form.FormElement",multiple:true,singularName:"formElement"},title:{type:"sap.ui.core.Title",altTypes:["string"],multiple:false},toolbar:{type:"sap.ui.core.Toolbar",multiple:false},_expandButton:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},designtime:"sap/ui/layout/designtime/form/FormContainer.designtime"}});r.prototype.init=function(){this._rb=sap.ui.getCore().getLibraryResourceBundle("sap.ui.layout");this._oObserver=new t(this._observeChanges.bind(this));this._oObserver.observe(this,{properties:["expanded","expandable"],aggregations:["formElements"]})};r.prototype.exit=function(){if(this._oExpandButton){delete this._oExpandButton}this._rb=undefined;this._oObserver.disconnect();this._oObserver=undefined};function a(e){if(e){if(!this._oExpandButton){if(!this._bExpandButtonRequired){this._bExpandButtonRequired=true;n.form.FormHelper.createButton.call(this,this.getId()+"--Exp",p,s)}}else{u.call(this)}}}function s(e){if(!this._bIsBeingDestroyed){this._oExpandButton=e;this.setAggregation("_expandButton",this._oExpandButton);u.call(this)}}function l(e){u.call(this);var t=this.getParent();if(t&&t.toggleContainerExpanded){t.toggleContainerExpanded(this)}}r.prototype.setToolbar=function(e){e=n.form.FormHelper.setToolbar.call(this,e);this.setAggregation("toolbar",e);return this};r.prototype.contentOnAfterRendering=function(e,t){var i=this.getParent();if(i&&i.contentOnAfterRendering){i.contentOnAfterRendering(e,t)}};r.prototype.onLayoutDataChange=function(e){var t=this.getParent();if(t&&t.onLayoutDataChange){t.onLayoutDataChange(e)}};r.prototype._checkProperties=function(){var e=0;if(this.getExpandable()&&(!this.getTitle()||this.getToolbar())){o.warning("Expander only displayed if title is set",this.getId(),"FormContainer");e=1}return e};r.prototype.getRenderedDomRef=function(){var e=this;var t=this.getParent();if(t&&t.getContainerRenderedDomRef){return t.getContainerRenderedDomRef(e)}else{return null}};r.prototype.getElementRenderedDomRef=function(e){var t=this.getParent();if(t&&t.getElementRenderedDomRef){return t.getElementRenderedDomRef(e)}else{return null}};r.prototype.getVisibleFormElements=function(){var e=this.getFormElements();var t=[];for(var i=0;i<e.length;i++){var n=e[i];if(n.isVisible()){t.push(n)}}return t};r.prototype._setEditable=function(e){var t=this.getProperty("_editable");this.setProperty("_editable",e,true);if(e!==t){var i=this.getFormElements();for(var n=0;n<i.length;n++){var o=i[n];o._setEditable(e)}}};r.prototype.isVisible=function(){return this.getVisible()};function u(){if(!this._oExpandButton){return}var e,t,o,r;if(this.getExpanded()){e=i._getThemeImage("_sap_ui_layout_Form_FormContainerColImageURL");t=i._getThemeImage("_sap_ui_layout_Form_FormContainerColImageDownURL");o="-";r=this._rb.getText("FORM_COLLAPSE")}else{e=i._getThemeImage("_sap_ui_layout_Form_FormContainerExpImageURL");t=i._getThemeImage("_sap_ui_layout_Form_FormContainerExpImageDownURL");o="+";r=this._rb.getText("FORM_EXPAND")}if(e){o=""}n.form.FormHelper.setButtonContent(this._oExpandButton,o,r,e,t)}function p(e){this.setExpanded(!this.getExpanded())}r.prototype._observeChanges=function(e){if(e.name=="formElements"){d.call(this,e.mutation,e.child)}else if(e.name=="expanded"){l.call(this,e.current)}else if(e.name=="expandable"){a.call(this,e.current)}};function d(e,t){if(e==="insert"){var i=this.getProperty("_editable");t._setEditable(i)}}return r});