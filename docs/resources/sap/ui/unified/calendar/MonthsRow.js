/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/ui/core/LocaleData","sap/ui/core/delegate/ItemNavigation","sap/ui/unified/calendar/CalendarUtils","sap/ui/unified/calendar/CalendarDate","sap/ui/unified/library","sap/ui/core/format/DateFormat","sap/ui/core/library","sap/ui/core/Locale","./MonthsRowRenderer","sap/ui/dom/containsOrEquals","sap/ui/thirdparty/jquery","sap/ui/unified/DateRange"],function(e,t,a,i,o,r,s,n,l,h,g,c,u){"use strict";var f=n.CalendarType;var p=e.extend("sap.ui.unified.calendar.MonthsRow",{metadata:{library:"sap.ui.unified",properties:{date:{type:"object",group:"Data"},startDate:{type:"object",group:"Data"},months:{type:"int",group:"Appearance",defaultValue:12},intervalSelection:{type:"boolean",group:"Behavior",defaultValue:false},singleSelection:{type:"boolean",group:"Behavior",defaultValue:true},showHeader:{type:"boolean",group:"Appearance",defaultValue:false}},aggregations:{selectedDates:{type:"sap.ui.unified.DateRange",multiple:true,singularName:"selectedDate"},specialDates:{type:"sap.ui.unified.DateTypeRange",multiple:true,singularName:"specialDate"}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"},legend:{type:"sap.ui.unified.CalendarLegend",multiple:false}},events:{select:{},focus:{parameters:{date:{type:"object"},notVisible:{type:"boolean"}}}}},renderer:h});p.prototype.init=function(){this._oFormatYyyymm=s.getInstance({pattern:"yyyyMMdd",calendarType:f.Gregorian});this._oFormatLong=s.getInstance({pattern:"MMMM y"});this._mouseMoveProxy=c.proxy(this._handleMouseMove,this);this._rb=sap.ui.getCore().getLibraryResourceBundle("sap.ui.unified")};p.prototype.exit=function(){if(this._oItemNavigation){this.removeDelegate(this._oItemNavigation);this._oItemNavigation.destroy();delete this._oItemNavigation}if(this._sInvalidateMonths){clearTimeout(this._sInvalidateMonths)}};p.prototype.onAfterRendering=function(){d.call(this);L.call(this)};p.prototype.onsapfocusleave=function(e){if(!e.relatedControlId||!g(this.getDomRef(),sap.ui.getCore().byId(e.relatedControlId).getFocusDomRef())){if(this._bMouseMove){I.call(this,true);b.call(this,this._getDate());this._bMoveChange=false;this._bMousedownChange=false;M.call(this)}if(this._bMousedownChange){this._bMousedownChange=false;M.call(this)}}};p.prototype.removeAllSelectedDates=function(){this._bDateRangeChanged=true;var e=this.removeAllAggregation("selectedDates");return e};p.prototype.destroySelectedDates=function(){this._bDateRangeChanged=true;var e=this.destroyAggregation("selectedDates");return e};p.prototype.removeAllSpecialDates=function(){this._bDateRangeChanged=true;var e=this.removeAllAggregation("specialDates");return e};p.prototype.destroySpecialDates=function(){this._bDateRangeChanged=true;var e=this.destroyAggregation("specialDates");return e};p.prototype.setDate=function(e){if(e){var t=o.fromLocalJSDate(e);this._oDate=t;y.call(this,t,false)}return this.setProperty("date",e)};p.prototype._getDate=function(){if(!this._oDate){this._oDate=new o}return this._oDate};p.prototype.setStartDate=function(e){i._checkJSDateObject(e);var t,a,r;a=e.getFullYear();i._checkYearInValidRange(a);t=o.fromLocalJSDate(e);this.setProperty("startDate",e,true);this._oStartDate=t;this._oStartDate.setDate(1);if(this.getDomRef()){r=this._getDate().toLocalJSDate();this._bNoRangeCheck=true;this.displayDate(e);this._bNoRangeCheck=false;if(r&&this.checkDateFocusable(r)){this.setDate(r)}}return this};p.prototype._getStartDate=function(){if(!this._oStartDate){this._oStartDate=new o;this._oStartDate.setDate(1)}return this._oStartDate};p.prototype.displayDate=function(e){y.call(this,o.fromLocalJSDate(e),true);return this};p.prototype._getLocale=function(){var e=this.getParent();if(e&&e.getLocale){return e.getLocale()}else if(!this._sLocale){this._sLocale=sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale().toString()}return this._sLocale};p.prototype._getLocaleData=function(){var e=this.getParent();if(e&&e._getLocaleData){return e._getLocaleData()}else if(!this._oLocaleData){var a=this._getLocale();var i=new l(a);this._oLocaleData=t.getInstance(i)}return this._oLocaleData};p.prototype._getFormatLong=function(){var e=this._getLocale();if(this._oFormatLong.oLocale.toString()!=e){var t=new l(e);this._oFormatLong=s.getInstance({style:"long"},t)}return this._oFormatLong};p.prototype.getIntervalSelection=function(){var e=this.getParent();if(e&&e.getIntervalSelection){return e.getIntervalSelection()}else{return this.getProperty("intervalSelection")}};p.prototype.getSingleSelection=function(){var e=this.getParent();if(e&&e.getSingleSelection){return e.getSingleSelection()}else{return this.getProperty("singleSelection")}};p.prototype.getSelectedDates=function(){var e=this.getParent();if(e&&e.getSelectedDates){return e.getSelectedDates()}else{return this.getAggregation("selectedDates",[])}};p.prototype.getSpecialDates=function(){var e=this.getParent();if(e&&e.getSpecialDates){return e.getSpecialDates()}else{return this.getAggregation("specialDates",[])}};p.prototype._getShowHeader=function(){var e=this.getParent();if(e&&e._getShowItemHeader){return e._getShowItemHeader()}else{return this.getProperty("showHeader")}};p.prototype.getAriaLabelledBy=function(){var e=this.getParent();if(e&&e.getAriaLabelledBy){return e.getAriaLabelledBy()}else{return this.getAssociation("ariaLabelledBy",[])}};p.prototype._setLegendControlOrigin=function(e){this._oLegendControlOrigin=e};p.prototype.getLegend=function(){var e=this.getParent();if(this._oLegendControlOrigin){return this._oLegendControlOrigin.getLegend()}if(e&&e.getLegend){return e.getLegend()}else{return this.getAssociation("ariaLabelledBy",[])}};p.prototype._setAriaRole=function(e){this._ariaRole=e;return this};p.prototype._getAriaRole=function(){return this._ariaRole?this._ariaRole:"gridcell"};p.prototype._checkDateSelected=function(e){var t,a,r,s,n=0,l=0,h=0,g,c,u;i._checkCalendarDate(e);c=this.getSelectedDates();u=new o(e);u.setDate(1);s=u.toUTCJSDate().getTime();for(g=0;g<c.length;g++){t=c[g];a=t.getStartDate();n=0;if(a){a=o.fromLocalJSDate(a);a.setDate(1);n=a.toUTCJSDate().getTime()}r=t.getEndDate();l=0;if(r){r=o.fromLocalJSDate(r);r.setDate(1);l=r.toUTCJSDate().getTime()}if(s==n&&!r){h=1;break}else if(s==n&&r){h=2;if(r&&s==l){h=5}break}else if(r&&s==l){h=3;break}else if(r&&s>n&&s<l){h=4;break}if(this.getSingleSelection()){break}}return h};p.prototype._getDateType=function(e){i._checkCalendarDate(e);var t,a,r,s,n=0,l,h=0,g,c=this.getSpecialDates(),u=new o(e);u.setDate(1);g=u.toUTCJSDate().getTime();for(r=0;r<c.length;r++){a=c[r];s=a.getStartDate();n=0;if(s){s=o.fromLocalJSDate(s);s.setDate(1);n=s.toUTCJSDate().getTime()}l=a.getEndDate();h=0;if(l){l=o.fromLocalJSDate(l);l.setDate(i._daysInMonth(l));h=l.toUTCJSDate().getTime()}if(g==n&&!l||g>=n&&g<=h){t={type:a.getType(),tooltip:a.getTooltip_AsString()};break}}return t};p.prototype._checkMonthEnabled=function(e){i._checkCalendarDate(e);var t=this.getParent();if(t&&t._oMinDate&&t._oMaxDate){if(i._isOutside(e,t._oMinDate,t._oMaxDate)){return false}}return true};p.prototype._handleMouseMove=function(e){if(!this.$().is(":visible")){I.call(this,true)}var t=c(e.target);if(t.hasClass("sapUiCalItemText")){t=t.parent()}if(t.hasClass("sapUiCalItem")){var a=this._getDate();var i=o.fromLocalJSDate(this._oFormatYyyymm.parse(t.attr("data-sap-month")));i.setDate(1);if(!i.isSame(a)){this.setDate(i.toLocalJSDate());b.call(this,i,true);this._bMoveChange=true}}};p.prototype.onmouseup=function(e){if(this._bMouseMove){I.call(this,true);var t=this._getDate();var a=this._oItemNavigation.getItemDomRefs();for(var i=0;i<a.length;i++){var r=c(a[i]);if(r.attr("data-sap-month")==this._oFormatYyyymm.format(t.toUTCJSDate(),true)){r.trigger("focus");break}}if(this._bMoveChange){var s=c(e.target);if(s.hasClass("sapUiCalItemText")){s=s.parent()}if(s.hasClass("sapUiCalItem")){t=o.fromLocalJSDate(this._oFormatYyyymm.parse(s.attr("data-sap-month")));t.setDate(1)}b.call(this,t);this._bMoveChange=false;this._bMousedownChange=false;M.call(this)}}if(this._bMousedownChange){this._bMousedownChange=false;M.call(this)}};p.prototype.onsapselect=function(e){var t=b.call(this,this._getDate());if(t){M.call(this)}e.stopPropagation();e.preventDefault()};p.prototype.onsapselectmodifiers=function(e){this.onsapselect(e)};p.prototype.onsappageupmodifiers=function(e){var t=new o(this._getDate());var a=t.getYear();if(e.metaKey||e.ctrlKey){t.setYear(a-10)}else{var i=this.getMonths();if(i<=12){t.setYear(a-1)}else{t.setMonth(t.getMonth()-i)}}this.fireFocus({date:t.toLocalJSDate(),notVisible:true});e.preventDefault()};p.prototype.onsappagedownmodifiers=function(e){var t=new o(this._getDate());var a=t.getYear();if(e.metaKey||e.ctrlKey){t.setYear(a+10)}else{var i=this.getMonths();if(i<=12){t.setYear(a+1)}else{t.setMonth(t.getMonth()+i)}}this.fireFocus({date:t.toLocalJSDate(),notVisible:true});e.preventDefault()};p.prototype.onThemeChanged=function(){if(this._bNoThemeChange){return}this._bNamesLengthChecked=undefined;this._bLongWeekDays=undefined;var e=this._getLocaleData();var t=e.getMonthsStandAlone("wide");var a=this.$("months").children();var i=this._getStartDate().getMonth();for(var o=0;o<a.length;o++){var r=c(c(a[o]).children(".sapUiCalItemText"));r.text(t[(o+i)%12])}L.call(this)};p.prototype.checkDateFocusable=function(e){i._checkJSDateObject(e);if(this._bNoRangeCheck){return false}var t=this._getStartDate();var a=new o(t);a.setDate(1);a.setMonth(a.getMonth()+this.getMonths());var r=o.fromLocalJSDate(e);return r.isSameOrAfter(t)&&r.isBefore(a)};p.prototype.applyFocusInfo=function(e){this._oItemNavigation.focusItem(this._oItemNavigation.getFocusedIndex());return this};function d(){var e=this._getDate();var t=this._oFormatYyyymm.format(e.toUTCJSDate(),true);var i=0;var o=this.$("months").get(0);var r=this.$("months").children(".sapUiCalItem");for(var s=0;s<r.length;s++){var n=c(r[s]);if(n.attr("data-sap-month")===t){i=s;break}}if(!this._oItemNavigation){this._oItemNavigation=new a;this._oItemNavigation.attachEvent(a.Events.AfterFocus,D,this);this._oItemNavigation.attachEvent(a.Events.FocusAgain,v,this);this._oItemNavigation.attachEvent(a.Events.BorderReached,m,this);this.addDelegate(this._oItemNavigation);this._oItemNavigation.setDisabledModifiers({sapnext:["alt"],sapprevious:["alt"],saphome:["alt"],sapend:["alt"]});this._oItemNavigation.setCycling(false);this._oItemNavigation.setColumns(1,true)}this._oItemNavigation.setRootDomRef(o);this._oItemNavigation.setItemDomRefs(r);this._oItemNavigation.setFocusedIndex(i);this._oItemNavigation.setPageSize(r.length)}function D(e){var t=e.getParameter("index");var a=e.getParameter("event");if(!a){return}var i=this._getDate();var r=new o(i);var s=this._oItemNavigation.getItemDomRefs();var n=c(s[t]);r=o.fromLocalJSDate(this._oFormatYyyymm.parse(n.attr("data-sap-month")));r.setDate(1);this.setDate(r.toLocalJSDate());this.fireFocus({date:r.toLocalJSDate(),notVisible:false});if(a.type=="mousedown"){_.call(this,a,r,t)}}function v(e){var t=e.getParameter("index");var a=e.getParameter("event");if(!a){return}if(a.type=="mousedown"){var i=this._getDate();_.call(this,a,i,t)}}function m(e){var t=e.getParameter("event");var a=this.getMonths();var i=this._getDate();var r=new o(i);if(t.type){switch(t.type){case"sapnext":case"sapnextmodifiers":r.setMonth(r.getMonth()+1);break;case"sapprevious":case"sappreviousmodifiers":r.setMonth(r.getMonth()-1);break;case"sappagedown":r.setMonth(r.getMonth()+a);break;case"sappageup":r.setMonth(r.getMonth()-a);break;default:break}this.fireFocus({date:r.toLocalJSDate(),notVisible:true})}}function _(e,t,a){if(e.button){return}var i=b.call(this,t);if(i){this._bMousedownChange=true}if(this._bMouseMove){I.call(this,true);this._bMoveChange=false}else if(i&&this.getIntervalSelection()&&this.$().is(":visible")){C.call(this,true)}e.preventDefault();e.setMark("cancelAutoClose")}function y(e,t){i._checkCalendarDate(e);var a=e.getYear();i._checkYearInValidRange(a);var r=true;if(!this.getDate()||!e.isSame(o.fromLocalJSDate(this.getDate()))){var s=new o(e);s.setDate(1);r=this.checkDateFocusable(e.toLocalJSDate());if(!this._bNoRangeCheck&&!r){throw new Error("Date must be in visible date range; "+this)}this.setProperty("date",e.toLocalJSDate());this._oDate=s}if(this.getDomRef()){if(r){S.call(this,this._oDate,t)}}}function S(e,t){var a=this._oFormatYyyymm.format(e.toUTCJSDate(),true);var i=this._oItemNavigation.getItemDomRefs();var o;for(var r=0;r<i.length;r++){o=c(i[r]);if(o.attr("data-sap-month")==a){if(document.activeElement!=i[r]){if(t){this._oItemNavigation.setFocusedIndex(r)}else{this._oItemNavigation.focusItem(r)}}break}}}function b(e,t){if(!this._checkMonthEnabled(e)){return false}var a=this.getSelectedDates();var i;var r=0;var s=this.getParent();var n=this;var l;if(s&&s.getSelectedDates){n=s}if(this.getSingleSelection()){if(a.length>0){i=a[0];l=i.getStartDate();if(l){l=o.fromLocalJSDate(l);l.setDate(1)}}else{i=new u;n.addAggregation("selectedDates",i)}if(this.getIntervalSelection()&&(!i.getEndDate()||t)&&l){var h;if(e.isBefore(l)){h=l;l=e;if(!t){i.setProperty("startDate",l.toLocalJSDate());i.setProperty("endDate",h.toLocalJSDate())}}else if(e.isSameOrAfter(l)){h=e;if(!t){i.setProperty("endDate",h.toLocalJSDate())}}}else{i.setProperty("startDate",e.toLocalJSDate());i.setProperty("endDate",undefined)}}else{if(this.getIntervalSelection()){throw new Error("Calender don't support multiple interval selection")}else{var g=this._checkDateSelected(e);if(g>0){for(r=0;r<a.length;r++){l=a[r].getStartDate();if(l){l=o.fromLocalJSDate(l);l.setDate(1);if(e.isSame(l)){n.removeAggregation("selectedDates",r);break}}}}else{i=new u({startDate:e.toLocalJSDate()});n.addAggregation("selectedDates",i)}}}return true}function M(){if(this._bMouseMove){I.call(this,true)}this.fireSelect()}function L(){if(!this._bNamesLengthChecked){var e=0;var t=this.$("months").children();var a=false;var i=this.getMonths();var o=Math.ceil(12/i);var r=0;var s=this._getLocaleData();var n=s.getMonthsStandAlone("wide");var l;for(var h=0;h<o;h++){if(i<12){for(e=0;e<t.length;e++){l=c(c(t[e]).children(".sapUiCalItemText"));l.text(n[(e+r)%12])}r=r+i;if(r>11){r=11}}for(e=0;e<t.length;e++){var g=t[e];if(Math.abs(g.clientWidth-g.scrollWidth)>1){a=true;break}}if(a){break}}if(i<12){r=this._getStartDate().getMonth();for(e=0;e<t.length;e++){l=c(c(t[e]).children(".sapUiCalItemText"));l.text(n[(e+r)%12])}}if(a){this._bLongMonth=false;var u=s.getMonthsStandAlone("abbreviated");r=this._getStartDate().getMonth();for(e=0;e<t.length;e++){l=c(c(t[e]).children(".sapUiCalItemText"));l.text(u[(e+r)%12])}}else{this._bLongMonth=true}this._bNamesLengthChecked=true}}function C(){c(window.document).on("mousemove",this._mouseMoveProxy);this._bMouseMove=true}function I(){c(window.document).off("mousemove",this._mouseMoveProxy);this._bMouseMove=undefined}return p});