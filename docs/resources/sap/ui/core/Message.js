/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./Element","./library","sap/base/Log"],function(e,r,a){"use strict";var t=r.MessageType;var n=e.extend("sap.ui.core.Message",{metadata:{library:"sap.ui.core",properties:{text:{type:"string",group:"Misc",defaultValue:null},timestamp:{type:"string",group:"Misc",defaultValue:null},icon:{type:"sap.ui.core.URI",group:"Misc",defaultValue:null},level:{type:"sap.ui.core.MessageType",group:"Misc",defaultValue:t.None},readOnly:{type:"boolean",group:"Misc",defaultValue:false}}}});n.prototype.getDefaultIcon=function(e){var r=sap.ui.require.toUrl("sap/ui/core/themes/"+sap.ui.getCore().getConfiguration().getTheme());var a=r+"/img/message/";if(e&&e=="32x32"){a+="32x32/"}else{a+="16x16/"}var n="";switch(this.getProperty("level")){case t.Error:n=a+"Message_Icon_Error.png";break;case t.Information:n=a+"Message_Icon_Information.png";break;case t.Warning:n=a+"Message_Icon_Warning.png";break;case t.Success:n=a+"Message_Icon_Success.png";break;case t.None:default:n=this.getProperty("icon");break}return n};n.prototype.compareByType=function(e){return n.compareByType(this,e)};n.compareByType=function(e,r){if(!e&&!r){return 0}if(e&&!r){return 1}if(!e&&r){return-1}var n=e.getLevel();var s=r.getLevel();if(n===s){return 0}switch(n){case t.Error:return 1;case t.Warning:return s===t.Error?-1:1;case t.Success:return s===t.Error||s===t.Warning?-1:1;case t.Information:return s===t.None?1:-1;case t.None:return-1;default:a.error("Comparison error",this);return 0}};return n});