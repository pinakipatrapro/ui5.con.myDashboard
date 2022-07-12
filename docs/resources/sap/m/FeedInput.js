/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","sap/ui/core/IconPool","sap/m/TextArea","sap/m/Button","./FeedInputRenderer","sap/ui/thirdparty/jquery","sap/base/security/URLListValidator","sap/base/security/sanitizeHTML","sap/m/Avatar","sap/m/AvatarShape","sap/m/AvatarSize"],function(t,e,s,i,a,r,o,n,l,u,p,h){"use strict";var g=t.ButtonType;var c=15,d=2,y=0;var f=e.extend("sap.m.FeedInput",{metadata:{library:"sap.m",designtime:"sap/m/designtime/FeedInput.designtime",properties:{enabled:{type:"boolean",group:"Behavior",defaultValue:true},rows:{type:"int",group:"Appearance",defaultValue:2},showExceededText:{type:"boolean",group:"Behavior",defaultValue:false},maxLength:{type:"int",group:"Behavior",defaultValue:0},growing:{type:"boolean",group:"Behavior",defaultValue:false},growingMaxLines:{type:"int",group:"Behavior",defaultValue:0},placeholder:{type:"string",group:"Appearance",defaultValue:"Post something here"},value:{type:"string",group:"Data",defaultValue:null},icon:{type:"sap.ui.core.URI",group:"Data",defaultValue:null},iconDisplayShape:{type:"sap.m.AvatarShape",defaultValue:p.Circle},iconInitials:{type:"string",defaultValue:""},iconSize:{type:"sap.m.AvatarSize",defaultValue:h.M},showIcon:{type:"boolean",group:"Behavior",defaultValue:true},iconDensityAware:{type:"boolean",group:"Appearance",defaultValue:true},buttonTooltip:{type:"sap.ui.core.TooltipBase",group:"Accessibility",defaultValue:"Submit"},ariaLabelForPicture:{type:"string",group:"Accessibility",defaultValue:null}},aggregations:{_avatar:{type:"sap.m.Avatar",multiple:false,visibility:"hidden"}},events:{post:{parameters:{value:{type:"string"}}}}}});var T={ATTRIBS:{style:1,class:1,"a::href":1,"a::target":1},ELEMENTS:{a:{cssClass:"sapMLnk"},abbr:1,blockquote:1,br:1,cite:1,code:1,em:1,h1:{cssClass:"sapMTitle sapMTitleStyleH1"},h2:{cssClass:"sapMTitle sapMTitleStyleH2"},h3:{cssClass:"sapMTitle sapMTitleStyleH3"},h4:{cssClass:"sapMTitle sapMTitleStyleH4"},h5:{cssClass:"sapMTitle sapMTitleStyleH5"},h6:{cssClass:"sapMTitle sapMTitleStyleH6"},p:1,pre:1,strong:1,span:1,u:1,dl:1,dt:1,dd:1,ol:1,ul:1,li:1}};f.prototype._renderingRules=T;function v(t,e){var s,i,a=t==="a";var r=this._renderingRules.ELEMENTS[t]&&this._renderingRules.ELEMENTS[t].cssClass?this._renderingRules.ELEMENTS[t].cssClass:"";for(var o=0;o<e.length;o+=2){s=e[o];i=e[o+1];if(!this._renderingRules.ATTRIBS[s]&&!this._renderingRules.ATTRIBS[t+"::"+s]){e[o+1]=null;continue}if(s=="href"){if(!n.validate(i)){e[o+1]="#";a=false}}if(s=="target"){a=false}if(r&&s.toLowerCase()=="class"){e[o+1]=r+" "+i;r=""}}if(a){e.push("target");e.push("_blank")}if(r){e.push("class");e.push(r)}return e}function x(t,e){return v.call(this,t,e)}f.prototype._sanitizeHTML=function(t){return l(t,{tagPolicy:x.bind(this),uriRewriter:function(t){if(n.validate(t)){return t}}})};f.prototype.init=function(){var t=sap.ui.getCore().getLibraryResourceBundle("sap.m");this.setProperty("placeholder",t.getText("FEEDINPUT_PLACEHOLDER"),true);this.setProperty("buttonTooltip",t.getText("FEEDINPUT_SUBMIT"),true)};f.prototype.exit=function(){if(this._oTextArea){this._oTextArea.destroy()}if(this._oButton){this._oButton.destroy()}if(this.oAvatar){this.oAvatar.destroy()}};f.prototype.setRows=function(t){var e=this.getProperty("growingMaxLines");if(t>c){t=c}else if(t<d){t=d}if(t>e&&e!==0){this.setProperty("growingMaxLines",t,true);this._getTextArea().setGrowingMaxLines(t)}this.setProperty("rows",t,true);this._getTextArea().setRows(t);return this};f.prototype.setShowExceededText=function(t){this.setProperty("showExceededText",t,true);this._getTextArea().setShowExceededText(t);return this};f.prototype.setMaxLength=function(t){this.setProperty("maxLength",t,true);this._getTextArea().setMaxLength(t);return this};f.prototype.setGrowing=function(t){this.setProperty("growing",t,true);this._getTextArea().setGrowing(t);return this};f.prototype.setGrowingMaxLines=function(t){var e=this.getProperty("rows");if(t!==y){if(t<e){t=e}else if(t>c){t=c}}this.setProperty("growingMaxLines",t,true);this._getTextArea().setGrowingMaxLines(t);return this};f.prototype.setValue=function(t){this.setProperty("value",t,true);this._getTextArea().setValue(t);this._enablePostButton();return this};f.prototype.setPlaceholder=function(t){this.setProperty("placeholder",t,true);this._getTextArea().setPlaceholder(t);return this};f.prototype.setEnabled=function(t){this.setProperty("enabled",t,true);if(this.getDomRef("outerContainer")){if(t){this.getDomRef("outerContainer").classList.remove("sapMFeedInDisabled")}else{this.getDomRef("outerContainer").classList.add("sapMFeedInDisabled")}}this._getTextArea().setEnabled(t);this._enablePostButton();return this};f.prototype.setButtonTooltip=function(t){this.setProperty("buttonTooltip",t,true);this._getPostButton().setTooltip(t);return this};f.prototype._getTextArea=function(){var t=this;if(!this._oTextArea){this._oTextArea=new i(this.getId()+"-textArea",{value:this.getValue(),maxLength:this.getMaxLength(),placeholder:this.getPlaceholder(),growing:this.getGrowing(),growingMaxLines:this.getGrowingMaxLines(),showExceededText:this.getShowExceededText(),rows:this.getRows(),liveChange:o.proxy(function(t){var e=t.getParameter("value");this.setProperty("value",e,true);this._enablePostButton()},this)});this._oTextArea.setParent(this);this._oTextArea.addEventDelegate({onAfterRendering:function(){t.$("counterContainer").empty();t.$("counterContainer").html(t._oTextArea.getAggregation("_counter").$())}})}return this._oTextArea};f.prototype._getPostButton=function(){if(!this._oButton){this._oButton=new a(this.getId()+"-button",{enabled:false,type:g.Default,icon:"sap-icon://feeder-arrow",tooltip:this.getButtonTooltip(),press:o.proxy(function(){this._oTextArea.focus();this.firePost({value:this._sanitizeHTML(this.getValue())});this.setValue(null)},this)});this._oButton.setParent(this)}return this._oButton};f.prototype._enablePostButton=function(){var t=this._isControlEnabled();var e=this._getPostButton();e.setEnabled(t)};f.prototype._isControlEnabled=function(){var t=this.getValue();return this.getEnabled()&&(typeof t==="string"||t instanceof String)&&t.trim().length>0};f.prototype._getAvatar=function(){var t=this.getIcon();var e=this.getId()+"-icon";this.oAvatar=this.getAggregation("_avatar");if(!this.oAvatar){this.oAvatar=new u({id:e,src:t,displayShape:this.getIconDisplayShape(),initials:this.getIconInitials(),displaySize:this.getIconSize()}).addStyleClass("sapMFeedInImage");if(t){this.oAvatar.addStyleClass("sapMFeedInImageBgColor")}}else{this.oAvatar.setSrc(t).setDisplayShape(this.getIconDisplayShape()).setInitials(this.getIconInitials()).setDisplaySize(this.getIconSize())}this.setAggregation("_avatar",this.oAvatar);return this.oAvatar};return f});