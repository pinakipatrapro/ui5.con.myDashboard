/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","./InputBase","sap/ui/Device","sap/ui/core/library","sap/ui/core/IconPool","sap/ui/events/KeyCodes","sap/base/Log","sap/ui/thirdparty/jquery","sap/m/MaskInputRule","sap/ui/dom/jquery/cursorPos"],function(t,e,i,s,n,o,r,a,l){"use strict";var h=s.TextDirection;var u=function(){var s="^";this.init=u.init=function(){e.prototype.init.call(this);this._iCaretTimeoutId=null;this._iUserInputStartPosition=null;this._iMaskLength=null;this._sOldInputValue=null;this._oRules=null;this._oTempValue=null;this._bSkipSetupMaskVariables=null;this._oRb=sap.ui.getCore().getLibraryResourceBundle("sap.m");this._setDefaultRules();this._setupMaskVariables()};this.exit=u.exit=function(){this._iCaretTimeoutId=null;this._iUserInputStartPosition=null;this._iMaskLength=null;this._sOldInputValue=null;this._oRules=null;this._oTempValue=null;this._bSkipSetupMaskVariables=null};this.onBeforeRendering=function(){if(this._isMaskEnabled()){var t=this._validateDependencies();if(t){r.warning("Invalid mask input: "+t)}}e.prototype.onBeforeRendering.apply(this,arguments);this.getShowClearIcon&&this.getShowClearIcon()&&this._getClearIcon().setVisible(this.getProperty("effectiveShowClearIcon"))};this.onAfterRendering=function(){e.prototype.onAfterRendering.apply(this,arguments)};this.onfocusin=u.onfocusin=function(t){this._sOldInputValue=this._getInputValue();e.prototype.onfocusin.apply(this,arguments);if(this._isMaskEnabled()){if(!this._oTempValue.differsFromOriginal()||!this._isValidInput(this._sOldInputValue)){this._applyMask()}this._positionCaret(true)}};this.onfocusout=function(t){if(this._isMaskEnabled()){this.bFocusoutDueRendering=this.bRenderingPhase;this.removeStyleClass("sapMFocus");a(document).off(".sapMIBtouchstart");if(this.bRenderingPhase){return}this.closeValueStateMessage();this._inputCompletedHandler()}else{this._inputCompletedHandlerNoMask();e.prototype.onfocusout.apply(this,arguments)}};this.oninput=function(t){if(this._isChromeOnAndroid()){this._onInputForAndroidHandler(t);return}e.prototype.oninput.apply(this,arguments);if(this._isMaskEnabled()){this._applyMask();this._positionCaret(false)}};this.onkeypress=function(t){if(this._isMaskEnabled()){this._keyPressHandler(t)}if(this.getDOMValue()!==""){this._setClearIconVisibility()}};this.onkeydown=u.onkeydown=function(t){if(this._isMaskEnabled()){var i=this._parseKeyBoardEvent(t);e.prototype.onkeydown.apply(this,arguments);this._keyDownHandler(t,i);if(this.getDOMValue()!==""){this._setClearIconVisibility()}}else{var i=this._parseKeyBoardEvent(t);if(i.bEnter){this._inputCompletedHandlerNoMask()}e.prototype.onkeydown.apply(this,arguments)}};this.onsapenter=function(t){};this.onsapfocusleave=function(t){};this.onsapescape=function(t){if(this._oTempValue._aContent.join("")!==this._oTempValue._aInitial.join("")){e.prototype.onsapescape.call(this,t)}};this._setClearIconVisibility=function(t){var e=t!==undefined?t:!this._isValueEmpty();if(this.getShowClearIcon&&this.getShowClearIcon()){this.setProperty("effectiveShowClearIcon",e);this._getClearIcon().setVisible(this.getProperty("effectiveShowClearIcon"))}};this._getClearIcon=function(){if(this._oClearButton){return this._oClearButton}this._oClearButton=this.addEndIcon({src:n.getIconURI("decline"),noTabStop:true,visible:false,alt:this._oRb.getText("INPUT_CLEAR_ICON_ALT"),useIconTooltip:false,press:function(){if(!this._isValueEmpty()){this.fireChange({value:""});this.setValue("");this.setProperty("effectiveShowClearIcon",false);this._getClearIcon().setVisible(false);setTimeout(function(){if(i.system.desktop){this.focus()}},0)}}.bind(this)});return this._oClearButton};this._isValueEmpty=function(){var t=this.getDOMValue(),e=this._oTempValue._aInitial.join("");return t==e};this.getDOMValue=function(){return this._$input.val()};this.setValue=u.setValue=function(t){t=this.validateProperty("value",t);e.prototype.setValue.call(this,t);this._sOldInputValue=t;if(this._isMaskEnabled()){if(!this._oTempValue){this._setupMaskVariables()}if(this._oTempValue._aInitial.join("")!==t){this._applyRules(t)}}this._setClearIconVisibility(t!=="");return this};this.addAggregation=function(e,i,s){if(e==="rules"){if(!this._validateRegexAgainstPlaceHolderSymbol(i)){return this}this._removeRuleWithSymbol(i.getMaskFormatSymbol());t.prototype.addAggregation.apply(this,arguments);if(!this._bSkipSetupMaskVariables){this._setupMaskVariables()}return this}return t.prototype.addAggregation.apply(this,arguments)};this.insertAggregation=function(e,i,s,n){if(e==="rules"){if(!this._validateRegexAgainstPlaceHolderSymbol(i)){return this}this._removeRuleWithSymbol(i.getMaskFormatSymbol());t.prototype.insertAggregation.apply(this,arguments);this._setupMaskVariables();return this}return t.prototype.insertAggregation.apply(this,arguments)};this._validateRegexAgainstPlaceHolderSymbol=function(t){if(new RegExp(t.getRegex()).test(this.getPlaceholderSymbol())){r.error("Rejecting input mask rule because it includes the currently set placeholder symbol.");return false}return true};this.setPlaceholderSymbol=function(t){var e;if(!/^.$/i.test(t)){r.error("Invalid placeholder symbol string given");return this}e=this.getRules().some(function(e){return new RegExp(e.getRegex()).test(t)});if(e){r.error("Rejecting placeholder symbol because it is included as a regex in an existing mask input rule.")}else{this.setProperty("placeholderSymbol",t);this._setupMaskVariables()}return this};this.setMask=function(t){if(!t){var e="Setting an empty mask is pointless. Make sure you set it with a non-empty value.";r.warning(e);return this}this.setProperty("mask",t,true);this._setupMaskVariables();return this};this._isCharAllowed=function(t,e){return this._oRules.applyCharAt(t,e)};this._feedReplaceChar=function(t,e,i){return t};this._inputCompletedHandlerNoMask=function(){var t=this._getInputValue();if(this._sOldInputValue!==t){e.prototype.setValue.call(this,this._getAlteredUserInputValue?this._getAlteredUserInputValue(t):t);this._sOldInputValue=t;if(this.onChange&&!this.onChange({value:t})){this.fireChangeEvent(t)}}};var p=function(t){this._aInitial=t.slice(0);this._aContent=t};p.prototype.setCharAt=function(t,e){this._aContent[e]=t};p.prototype.charAt=function(t){return this._aContent[t]};p.prototype.toString=function(){return this._aContent.join("")};p.prototype.differsFromOriginal=function(){return this.differsFrom(this._aInitial)};p.prototype.differsFrom=function(t){var e=0;if(t.length!==this._aContent.length){return true}for(;e<t.length;e++){if(t[e]!==this._aContent[e]){return true}}return false};p.prototype.getSize=function(){return this._aContent.length};var f=function(t){this._aRules=t};f.prototype.nextTo=function(t){if(typeof t==="undefined"){t=-1}do{t++}while(t<this._aRules.length&&!this._aRules[t]);return t};f.prototype.previousTo=function(t){do{t--}while(!this._aRules[t]&&t>0);return t};f.prototype.hasRuleAt=function(t){return!!this._aRules[t]};f.prototype.applyCharAt=function(t,e){return this._aRules[e].test(t)};this._setDefaultRules=function(){this._bSkipSetupMaskVariables=true;this.addRule(new l({maskFormatSymbol:"a",regex:"[A-Za-z]"}),true);this.addRule(new l({maskFormatSymbol:"9",regex:"[0-9]"}),true);this._bSkipSetupMaskVariables=false};this._validateDependencies=function(){var t=this.getPlaceholderSymbol(),e=this.getRules(),i=[],s=[];if(!this.getMask()){s.push("Empty mask")}if(e.length){i=[];e.every(function(e){var n=e.getMaskFormatSymbol(),o=n!==t,r;r=!i.some(function(t){return n===t});i.push(n);if(!o){s.push("Placeholder symbol is the  same as the existing rule's mask format symbol")}if(!r){s.push("Duplicated rule's maskFormatSymbol ["+n+"]")}return o&&r})}return s.length?s.join(". "):null};this._removeRuleWithSymbol=function(t){var e=this._findRuleBySymbol(t,this.getRules());if(e){this.removeAggregation("rules",e.oRule);e.oRule.destroy()}};this._findRuleBySymbol=function(t,e){var i=null;if(typeof t!=="string"||t.length!==1){r.error(t+" is not a valid mask rule symbol");return null}a.each(e,function(e,s){if(s.getMaskFormatSymbol()===t){i={oRule:s,iIndex:e};return false}});return i};this._getTextSelection=function(){var t=a(this.getFocusDomRef());if(!t&&(t.length===0||t.is(":hidden"))){return{}}return{iFrom:t[0].selectionStart,iTo:t[0].selectionEnd,bHasSelection:t[0].selectionEnd-t[0].selectionStart!==0}};this._setCursorPosition=function(t){if(t<0){t=0}a(this.getFocusDomRef()).cursorPos(t);return this};this._getCursorPosition=function(){return a(this.getFocusDomRef()).cursorPos()};this._setupMaskVariables=function(){var t=this.getRules(),e=this.getMask(),i=this._getSkipIndexes(e),s=this._getMaskArray(e,i),n=this.getPlaceholderSymbol(),o=this._buildMaskValueArray(s,n,t,i),r=this._buildRules(s,t,i);this._oTempValue=new p(o);this._iMaskLength=r.length;this._oRules=new f(r);this._iUserInputStartPosition=this._oRules.nextTo()};this._getMaskArray=function(t,e){var i=Array.isArray(e)?e.length:0,s=t?t.split(""):[],n;for(n=0;n<i;n++){s.splice(e[n],1)}return s};this._getSkipIndexes=function(t){var e=t?t.length:0,i,n=[],o=0,r=false;for(i=0;i<e;i++){if(t[i]===s&&!r){n.push(i-o);r=true;o++}else{r=false}}return n};this._applyMask=function(){var t=this._getInputValue();if(!this.getEditable()){return}this._applyAndUpdate(t)};this._resetTempValue=function(t,e){var i,s=this.getPlaceholderSymbol();if(typeof t==="undefined"||t===null){t=0;e=this._oTempValue.getSize()-1}for(i=t;i<=e;i++){if(this._oRules.hasRuleAt(i)){this._oTempValue.setCharAt(s,i)}}};this._applyAndUpdate=function(t){this._applyRules(t);this.updateDomValue(this._oTempValue.toString())};this._findFirstPlaceholderPosition=function(){return this._oTempValue.toString().indexOf(this.getPlaceholderSymbol())};this._applyRules=function(t){var e,i=0,s,n=this.getPlaceholderSymbol(),o;if(this._oTempValue.toString()===t){return}for(s=0;s<this._iMaskLength;s++){if(this._oRules.hasRuleAt(s)){this._oTempValue.setCharAt(n,s);o=false;if(t.length){do{e=t.charAt(i);i++;if(this._oRules.applyCharAt(e,s)){this._oTempValue.setCharAt(e,s);o=true}}while(!o&&i<t.length)}if(!o){this._resetTempValue(s+1,this._iMaskLength-1);break}}else{if(this._oTempValue.charAt(s)===t.charAt(i)){i++}}}};this._keyPressHandler=function(t,e){var i,s,n;if(!this.getEditable()){return}e=e||this._parseKeyBoardEvent(t);if(e.bCtrlKey||e.bAltKey||e.bMetaKey||e.bBeforeSpace){return}i=this._getTextSelection();if(!e.bEnter&&!e.bShiftLeftOrRightArrow&&!e.bHome&&!e.bEnd&&!(e.bShift&&e.bDelete)&&!(e.bCtrlKey&&e.bInsert)&&!(e.bShift&&e.bInsert)){if(i.bHasSelection){this._resetTempValue(i.iFrom,i.iTo-1);this.updateDomValue(this._oTempValue.toString());this._setCursorPosition(Math.max(this._iUserInputStartPosition,i.iFrom))}s=this._oRules.nextTo(i.iFrom-1);if(s<this._iMaskLength){n=this._feedReplaceChar(e.sChar,s,this._getInputValue());this._feedNextString(n,s)}t.preventDefault()}};this.oncut=function(t){var i=this._getTextSelection(),s=this._getMinBrowserDelay(),n=i.iFrom,o=i.iTo;e.prototype.oncut(t);if(!i.bHasSelection||!this._isMaskEnabled()){return}o=o-1;this._resetTempValue(n,o);setTimeout(function t(e,i,n){this._oTempValue._aContent=n;this.updateDomValue(e);setTimeout(this._setCursorPosition.bind(this,i),s)}.bind(this,this._oTempValue.toString(),Math.max(this._iUserInputStartPosition,n),this._oTempValue._aContent.slice(0)),s)};this._keyDownHandler=function(t,i){var s,n,o,r,i=i||this._parseKeyBoardEvent(t);if(!this.getEditable()){return}if(!i.bShift&&(i.bArrowRight||i.bArrowLeft)){o=this._getCursorPosition();n=this._getTextSelection();s=this._determineArrowKeyDirection(i,n);if(this._isRtlMode()&&n.bHasSelection){r=this._determineRtlCaretPositionFromSelection(s)}else{r=this._oRules[s](o)}if(this._isWebkitProblematicCase()){r=this._fixWebkitBorderPositions(r,s)}this._setCursorPosition(r);t.preventDefault()}else if(i.bEscape){this._applyAndUpdate(this._sOldInputValue);this._positionCaret(true);t.preventDefault()}else if(i.bEnter){this._inputCompletedHandler(t)}else if(i.bCtrlKey&&i.bInsert||i.bShift&&i.bInsert){e.prototype.onkeydown.apply(this,arguments)}else if(!i.bShift&&i.bDelete||i.bBackspace){this._revertKey(i);t.preventDefault()}else if(this._isChromeOnAndroid()){this._oKeyDownStateAndroid={sValue:this._oTempValue.toString(),iCursorPosition:this._getCursorPosition(),oSelection:this._getTextSelection()}}};this._revertKey=function(t,e){e=e||this._getTextSelection();var i=e.iFrom,s=e.iTo;if(!e.bHasSelection){if(t.bBackspace){i=this._oRules.previousTo(i)}}if(t.bBackspace||t.bDelete&&e.bHasSelection){s=s-1}this._resetTempValue(i,s);this.updateDomValue(this._oTempValue.toString());this._setCursorPosition(Math.max(this._iUserInputStartPosition,i))};this._feedNextString=function(t,e){var i,s=false,n=t.split(""),o;while(n.length){o=n.splice(0,1)[0];if(this._oRules.applyCharAt(o,e)){s=true;this._oTempValue.setCharAt(o,e);e=this._oRules.nextTo(e)}}if(s){i=e;this.updateDomValue(this._oTempValue.toString());this._setCursorPosition(i)}};this._inputCompletedHandler=function(){var t=this._getInputValue(),i,s,n,o;if(this._oTempValue.differsFrom(t)){this._applyAndUpdate(t)}i=this._oTempValue.differsFromOriginal();s=i?this._oTempValue.toString():"";n=!this._sOldInputValue||!this.getValue();o=!t;if(n&&(o||!i)){this.updateDomValue("");return}if(this._sOldInputValue!==this._oTempValue.toString()){e.prototype.setValue.call(this,this._getAlteredUserInputValue?this._getAlteredUserInputValue(s):s);this._sOldInputValue=s;if(this.onChange&&!this.onChange({value:s})){this.fireChangeEvent(s)}}};this._buildMaskValueArray=function(t,e,i,s){return t.map(function(t,n){var o=s.indexOf(n)===-1,r=this._findRuleBySymbol(t,i);return o&&r?e:t},this)};this._buildRules=function(t,e,i){var s=[],n,o=t.length,r=0;for(;r<o;r++){if(i.indexOf(r)===-1){n=this._findRuleBySymbol(t[r],e);s.push(n?new RegExp(n.oRule.getRegex()):null)}else{s.push(null)}}return s};this._parseKeyBoardEvent=function(t){var e=t.which||t.keyCode,s=o,n=e===s.ARROW_RIGHT,r=e===s.ARROW_LEFT,a=t.shiftKey;return{iCode:e,sChar:String.fromCharCode(e),bCtrlKey:t.ctrlKey,bAltKey:t.altKey,bMetaKey:t.metaKey,bShift:a,bInsert:e===o.INSERT,bBackspace:e===s.BACKSPACE,bDelete:e===s.DELETE,bEscape:e===s.ESCAPE,bEnter:e===s.ENTER,bIphoneEscape:i.system.phone&&i.os.ios&&e===127,bArrowRight:n,bArrowLeft:r,bHome:e===o.HOME,bEnd:e===o.END,bShiftLeftOrRightArrow:a&&(r||n),bBeforeSpace:e<s.SPACE}};this._positionCaret=function(t){var e=this.getMask(),i=this._getMinBrowserDelay(),s;clearTimeout(this._iCaretTimeoutId);s=this._findFirstPlaceholderPosition();if(s<0){s=e.length}this._iCaretTimeoutId=setTimeout(function(){if(this.getFocusDomRef()!==document.activeElement){return}if(t&&s===e.length){this.selectText(0,s)}else{this._setCursorPosition(s)}}.bind(this),i);this._setClearIconVisibility()};this._getMinBrowserDelay=function(){return 4};this._isValidInput=function(t){var e=t.length,i=0,s;for(;i<e;i++){s=t[i];if(this._oRules.hasRuleAt(i)&&(!this._oRules.applyCharAt(s,i)&&s!==this.getPlaceholderSymbol())){return false}if(!this._oRules.hasRuleAt(i)&&s!==this._oTempValue.charAt(i)){return false}}return true};this._isRtlChar=function(t){var e="A-Za-zÀ-ÖØ-öø-ʸ̀-֐ࠀ-῿"+"Ⰰ-﬜﷾-﹯﻽-￿",i="֑-߿יִ-﷽ﹰ-ﻼ",s=new RegExp("^[^"+e+"]*["+i+"]");return s.test(t)};this._fixWebkitBorderPositions=function(t,e){var i=this._oTempValue.toString().length;if(e==="nextTo"){if(t===0||t===i||t===1){t=0}else if(t===i+1){t=1}}else{if(t===0||t===i-1){t=i}else if(t===-1||t===i){t=i-1}}return t};this._containsRtlChars=function(){var t=this._oTempValue.toString(),e=false;for(var i=0;i<t.length;i++){e=this._isRtlChar(t[i])}return e};this._isRtlMode=function(){return sap.ui.getCore().getConfiguration().getRTL()||this.getTextDirection()===h.RTL};this._isWebkitProblematicCase=function(){return i.browser.webkit&&this._isRtlMode()&&!this._containsRtlChars()};this._determineArrowKeyDirection=function(t,e){var i;if(!this._isRtlMode()||!this._containsRtlChars()||e.bHasSelection){if(t.bArrowRight){i="nextTo"}else{i="previousTo"}}else{if(t.bArrowRight){i="previousTo"}else{i="nextTo"}}return i};this._determineRtlCaretPositionFromSelection=function(t,e){var i,s=this._getTextSelection();if(e){if(t==="nextTo"){if(!this._containsRtlChars()){i=s.iFrom}else{i=s.iTo}}else{if(!this._containsRtlChars()){i=s.iTo}else{i=s.iFrom}}}else{if(t==="nextTo"){if(!this._containsRtlChars()){i=s.iTo}else{i=s.iFrom}}else{if(!this._containsRtlChars()){i=s.iFrom}else{i=s.iTo}}}return i};this._onInputForAndroidHandler=function(t){var e;if(!this._oKeyDownStateAndroid){return}e=this._buildKeyboardEventInfo(this._oKeyDownStateAndroid.sValue,this._getInputValue(),this._oKeyDownStateAndroid.oSelection);this.updateDomValue(this._oKeyDownStateAndroid.sValue);setTimeout(function(t,e,i){this._setCursorPosition(e.iCursorPosition);if(i.bBackspace){this._revertKey(i,e.oSelection);if(e.oSelection.bHasSelection&&i.sChar){this._keyPressHandler(t,i)}}else{this._keyPressHandler(t,i)}}.bind(this,t,this._oKeyDownStateAndroid,e),0);delete this._oKeyDownStateAndroid;t.preventDefault()};this._buildKeyboardEventInfo=function(t,e,i){var s="",n,o={},r;if(!t&&!e){return{}}if(t&&e&&e.length<t.length){o.bBackspace=true}for(n=0;n<e.length;n++){r=i.bHasSelection&&i.iFrom===n;if(r||t[n]!==e[n]){s=e[n];break}}o.sChar=s;return o};this._isChromeOnAndroid=function(){return i.browser.chrome&&i.os.android}};return u},true);