/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","./Button","./SplitButton","sap/ui/Device","sap/ui/core/EnabledPropagator","sap/ui/core/library","sap/ui/core/Popup","sap/ui/core/LabelEnablement","./MenuButtonRenderer","sap/ui/events/KeyCodes"],function(t,e,o,i,n,s,r,a,u,p,l){"use strict";var h=t.MenuButtonMode;var c=r.TextDirection;var d=t.ButtonType;var g=a.Dock;var f=["buttonMode","useDefaultActionOnly","width","menuPosition"];var y=e.extend("sap.m.MenuButton",{metadata:{library:"sap.m",properties:{text:{type:"string",group:"Misc",defaultValue:null},type:{type:"sap.m.ButtonType",group:"Appearance",defaultValue:d.Default},width:{type:"sap.ui.core.CSSSize",group:"Misc",defaultValue:null},enabled:{type:"boolean",group:"Behavior",defaultValue:true},icon:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:null},activeIcon:{type:"sap.ui.core.URI",group:"Misc",defaultValue:null},iconDensityAware:{type:"boolean",group:"Misc",defaultValue:true},textDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:c.Inherit},buttonMode:{type:"sap.m.MenuButtonMode",group:"Misc",defaultValue:h.Regular},menuPosition:{type:"sap.ui.core.Popup.Dock",group:"Misc",defaultValue:g.BeginBottom},useDefaultActionOnly:{type:"boolean",group:"Behavior",defaultValue:false}},aggregations:{menu:{type:"sap.m.Menu",multiple:false,singularName:"menu"},_button:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"}},associations:{ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"},ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{defaultAction:{},beforeMenuOpen:{}},defaultAggregation:"menu",designtime:"sap/m/designtime/MenuButton.designtime",dnd:{draggable:true,droppable:false}}});s.call(y.prototype);y.prototype.init=function(){this._initButtonControl()};y.prototype.exit=function(){if(this._sDefaultText){this._sDefaultText=null}if(this._sDefaultIcon){this._sDefaultIcon=null}if(this._iInitialTextBtnContentWidth){this._iInitialTextBtnContentWidth=null}if(this._lastActionItemId){this._lastActionItemId=null}if(this.getMenu()){this.getMenu().detachClosed(this._menuClosed,this)}};y.prototype.onBeforeRendering=function(){if(!this._sDefaultText){this._sDefaultText=this.getText()}if(!this._sDefaultIcon){this._sDefaultIcon=this.getIcon()}this._updateButtonControl();this._attachMenuEvents()};y.prototype._needsWidth=function(){return this._isSplitButton()&&this.getWidth()===""};y.prototype._getTextBtnContentDomRef=function(){return this._getButtonControl()._getTextButton().getDomRef("content")};y.prototype.onAfterRendering=function(){if(this._needsWidth()&&sap.ui.getCore().isThemeApplied()&&this._getTextBtnContentDomRef()&&this._getInitialTextBtnWidth()>0){this._getTextBtnContentDomRef().style.width=this._getInitialTextBtnWidth()+"px"}if(this._activeButton){this._activeButton.$().attr("aria-expanded","false");this._activeButton=null}};y.prototype.onThemeChanged=function(t){if(this._needsWidth()&&this.getDomRef()&&!this._iInitialTextBtnContentWidth&&this._getTextBtnContentDomRef()&&this._getInitialTextBtnWidth()>0){this._getTextBtnContentDomRef().style.width=this._getInitialTextBtnWidth()+"px"}};y.prototype._getInitialTextBtnWidth=function(){if(!this._iInitialTextBtnContentWidth){this._iInitialTextBtnContentWidth=Math.ceil(this._getTextBtnContentDomRef().getBoundingClientRect().width)}return this._iInitialTextBtnContentWidth};y.prototype.setButtonMode=function(t){var o=this.getTooltip(),i,n;e.prototype.setProperty.call(this,"buttonMode",t,true);this._getButtonControl().destroy();this._initButtonControl();i=this._getButtonControl();n=i.getMetadata().getAllProperties();for(var s in this.mProperties){if(this.mProperties.hasOwnProperty(s)&&f.indexOf(s)<0&&n.hasOwnProperty(s)){i.setProperty(s,this.mProperties[s],true)}}if(o){i.setTooltip(o)}if(!this._isSplitButton()&&this._sDefaultText){this.setText(this._sDefaultText)}else if(!this.getUseDefaultActionOnly()&&this._getLastSelectedItem()){this.setText(sap.ui.getCore().byId(this._getLastSelectedItem()).getText())}if(!this._isSplitButton()&&this._sDefaultIcon){this.setIcon(this._sDefaultIcon)}else if(!this.getUseDefaultActionOnly()&&this._getLastSelectedItem()){this.setIcon(sap.ui.getCore().byId(this._getLastSelectedItem()).getIcon())}this.invalidate();return this};y.prototype._initButton=function(){var t=new o(this.getId()+"-internalBtn",{width:"100%",ariaHasPopup:r.aria.HasPopup.Menu});t.attachPress(this._handleButtonPress,this);t.onkeydown=this.handleKeydown;return t};y.prototype._initSplitButton=function(){var t=new i(this.getId()+"-internalSplitBtn",{width:"100%"});t.attachPress(this._handleActionPress,this);t.attachArrowPress(this._handleButtonPress,this);t._getArrowButton().onkeydown=this.handleKeydown;return t};y.prototype._initButtonControl=function(){var t;if(this._isSplitButton()){t=this._initSplitButton()}else{t=this._initButton()}this.setAggregation("_button",t,true)};y.prototype._updateButtonControl=function(){this._getButtonControl().setText(this.getText())};y.prototype._getButtonControl=function(){return this.getAggregation("_button")};y.prototype._handleButtonPress=function(t){var e=this.getMenu(),o={zero:"0 0",plus2_right:"0 +2",minus2_right:"0 -2",plus2_left:"+2 0",minus2_left:"-2 0"};this._isSplitButton()&&this.fireBeforeMenuOpen();if(!e){return}if(this._bPopupOpen){this.getMenu().close();this._bPopupOpen=false;return}if(!e.getTitle()){e.setTitle(this.getText())}var i=[this,t];switch(this.getMenuPosition()){case g.BeginTop:i.push(g.BeginBottom,g.BeginTop,o.plus2_right);break;case g.BeginCenter:i.push(g.BeginCenter,g.BeginCenter,o.zero);break;case g.LeftTop:i.push(g.RightBottom,g.LeftBottom,o.plus2_left);break;case g.LeftCenter:i.push(g.RightCenter,g.LeftCenter,o.plus2_left);break;case g.LeftBottom:i.push(g.RightTop,g.LeftTop,o.plus2_left);break;case g.CenterTop:i.push(g.CenterBottom,g.CenterTop,o.plus2_left);break;case g.CenterCenter:i.push(g.CenterCenter,g.CenterCenter,o.zero);break;case g.CenterBottom:i.push(g.CenterTop,g.CenterBottom,o.minus2_right);break;case g.RightTop:i.push(g.LeftBottom,g.RightBottom,o.minus2_left);break;case g.RightCenter:i.push(g.LeftCenter,g.RightCenter,o.minus2_left);break;case g.RightBottom:i.push(g.LeftTop,g.RightTop,o.minus2_left);break;case g.EndTop:i.push(g.EndBottom,g.EndTop,o.plus2_right);break;case g.EndCenter:i.push(g.EndCenter,g.EndCenter,o.zero);break;case g.EndBottom:i.push(g.EndTop,g.EndBottom,o.minus2_right);break;case g.BeginBottom:default:i.push(g.BeginTop,g.BeginBottom,o.minus2_right);break}e.openBy.apply(e,i);if(this.getMenu()){this._bPopupOpen=true}this._writeAriaAttributes();if(this._isSplitButton()&&!n.system.phone){this._getButtonControl().setArrowState(true)}};y.prototype._handleActionPress=function(){var t=this._getLastSelectedItem(),e;if(!this.getUseDefaultActionOnly()&&t){e=sap.ui.getCore().byId(t);this.getMenu().fireItemSelected({item:e})}else{this.fireDefaultAction()}};y.prototype._menuClosed=function(){var t=this._getButtonControl(),e=t;this._bPopupOpen=false;if(this._isSplitButton()){t.setArrowState(false);e=t._getArrowButton()}e.$().removeAttr("aria-controls");e.$().attr("aria-expanded","false")};y.prototype._menuItemSelected=function(t){var e=t.getParameter("item");this.fireEvent("_menuItemSelected",{item:e});this._bPopupOpen=false;if(!this._isSplitButton()||this.getUseDefaultActionOnly()||!e){return}this._lastActionItemId=e.getId();!!this._sDefaultText&&this.setText(e.getText());!!this._sDefaultIcon&&this.setIcon(e.getIcon())};y.prototype._getLastSelectedItem=function(){return this._lastActionItemId};y.prototype._attachMenuEvents=function(){if(this.getMenu()){this.getMenu().attachClosed(this._menuClosed,this);this.getMenu().attachItemSelected(this._menuItemSelected,this)}};y.prototype._isSplitButton=function(){return this.getButtonMode()===h.Split};y.prototype.setProperty=function(t,o,i){function n(t){var e=[d.Up,d.Back,d.Unstyled];return e.indexOf(t)!==-1}if(t==="type"&&n(o)){return this}if(t==="text"){this._sDefaultText=o}switch(t){case"activeIcon":case"iconDensityAware":case"textDirection":case"visible":case"enabled":this._getButtonControl().setProperty(t,o);break}return e.prototype.setProperty.apply(this,arguments)};y.prototype.setTooltip=function(t){this._getButtonControl().setTooltip(t);return e.prototype.setTooltip.apply(this,arguments)};y.prototype.setText=function(t){e.prototype.setProperty.call(this,"text",t);this._getButtonControl().setText(t);return this};y.prototype.setType=function(t){e.prototype.setProperty.call(this,"type",t);this._getButtonControl().setType(t);return this};y.prototype.setIcon=function(t){e.prototype.setProperty.call(this,"icon",t);this._getButtonControl().setIcon(t);return this};y.prototype.addAriaLabelledBy=function(t){this.getAggregation("_button").addAssociation("ariaLabelledBy",t);return e.prototype.addAssociation.call(this,"ariaLabelledBy",t)};y.prototype.addAriaDescribedBy=function(t){this.getAggregation("_button").addAssociation("ariaDescribedBy",t);return e.prototype.addAssociation.call(this,"ariaDescribedBy",t)};y.prototype.removeAriaLabelledBy=function(t){this.getAggregation("_button").removeAssociation("ariaLabelledBy",t);return e.prototype.removeAssociation.call(this,"ariaLabelledBy",t)};y.prototype.removeAriaDescribedBy=function(t){this.getAggregation("_button").removeAssociation("ariaDescribedBy",t);return e.prototype.removeAssociation.call(this,"ariaDescribedBy",t)};y.prototype.removeAllAriaLabelledBy=function(t){this.getAggregation("_button").removeAllAssociation("ariaLabelledBy");return e.prototype.removeAllAssociation.call(this,"ariaLabelledBy")};y.prototype.removeAllAriaDescribedBy=function(){this.getAggregation("_button").removeAllAssociation("ariaDescribedBy");return e.prototype.removeAllAssociation.call(this,"ariaDescribedBy")};y.prototype.getFocusDomRef=function(){return this._getButtonControl().getDomRef()};y.prototype.onsapup=function(t){this.openMenuByKeyboard();t.stopPropagation()};y.prototype.onsapdown=function(t){this.openMenuByKeyboard();t.stopPropagation()};y.prototype.onsapupmodifiers=function(t){this.openMenuByKeyboard();t.stopPropagation()};y.prototype.onsapdownmodifiers=function(t){this.openMenuByKeyboard();t.stopPropagation()};y.prototype.onsapshow=function(t){this.openMenuByKeyboard();!!t&&t.preventDefault()};y.prototype.ontouchstart=function(){this._bPopupOpen=this.getMenu()&&this.getMenu()._getMenu()&&this.getMenu()._getMenu().getPopup().isOpen()};y.prototype.handleKeydown=function(t){if((t.keyCode===l.ENTER||t.keyCode===l.TAB)&&this._bPopupOpen){this.getMenu().close();this._bPopupOpen=false}o.prototype.onkeydown.call(this,t)};y.prototype.openMenuByKeyboard=function(){if(!this._isSplitButton()){this._handleButtonPress(true)}};y.prototype._writeAriaAttributes=function(){var t=this._getButtonControl(),e=this._isSplitButton()?t._getArrowButton():t,o=this.getMenu();if(o){e.$().attr("aria-controls",o.getDomRefId());e.$().attr("aria-expanded","true")}};y.prototype.getIdForLabel=function(){return this.getId()+"-internalBtn"};y.prototype._ensureBackwardsReference=function(){var t=this._getButtonControl(),e=t.getAriaLabelledBy(),o=u.getReferencingLabels(this);o.forEach(function(o){if(e&&e.indexOf(o)===-1){t.addAriaLabelledBy(o)}});return this};return y});