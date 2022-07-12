/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/Popover","sap/ui/Device","sap/ui/core/Control","sap/ui/core/Core","sap/ui/core/Locale","sap/ui/core/LocaleData","sap/ui/core/format/DateFormat","./calendar/CalendarUtils","./calendar/CustomYearPicker","./calendar/Header","./calendar/MonthsRow","./calendar/YearPicker","./calendar/CalendarDate","./CalendarMonthIntervalRenderer","sap/ui/dom/containsOrEquals","sap/base/util/deepEqual","sap/base/Log","sap/ui/thirdparty/jquery","sap/ui/unified/DateRange"],function(t,e,a,i,s,o,r,n,h,c,l,u,g,D,f,d,p,_,v){"use strict";var M=a.extend("sap.ui.unified.CalendarMonthInterval",{metadata:{library:"sap.ui.unified",properties:{width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},startDate:{type:"object",group:"Data"},intervalSelection:{type:"boolean",group:"Behavior",defaultValue:false},singleSelection:{type:"boolean",group:"Behavior",defaultValue:true},months:{type:"int",group:"Appearance",defaultValue:12},pickerPopup:{type:"boolean",group:"Appearance",defaultValue:false},minDate:{type:"object",group:"Misc",defaultValue:null},maxDate:{type:"object",group:"Misc",defaultValue:null},_currentPicker:{type:"string",group:"Appearance",defaultValue:"monthsRow",visibility:"hidden"}},aggregations:{selectedDates:{type:"sap.ui.unified.DateRange",multiple:true,singularName:"selectedDate"},specialDates:{type:"sap.ui.unified.DateTypeRange",multiple:true,singularName:"specialDate"},header:{type:"sap.ui.unified.calendar.Header",multiple:false,visibility:"hidden"},monthsRow:{type:"sap.ui.unified.calendar.MonthsRow",multiple:false,visibility:"hidden"},yearPicker:{type:"sap.ui.unified.calendar.YearPicker",multiple:false,visibility:"hidden"}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"},legend:{type:"sap.ui.unified.CalendarLegend",multiple:false}},events:{select:{},cancel:{},startDateChange:{}}},renderer:D});var y={MONTHS_ROW:"monthsRow",YEAR_PICKER:"yearPicker"};M.prototype.init=function(){this._iMode=0;this.data("sap-ui-fastnavgroup","true",true);this._oYearFormat=r.getDateInstance({format:"y"});this._oMinDate=n._minDate();this._oMaxDate=n._maxDate();this._initializeHeader();this._initializeMonthsRow();this._initilizeYearPicker();this._iDaysMonthsHead=15};M.prototype.exit=function(){if(this._sInvalidateContent){clearTimeout(this._sInvalidateContent)}if(this._oPopup){this._oPopup.destroy();this._oPopup=null}if(this._oCustomYearPicker){this._oCustomYearPicker.removeDelegate(this._oFocusCYPDelegate);this._oCustomYearPicker.destroy();this._oCustomYearPicker=null}};M.prototype.onBeforeRendering=function(){var t=this.getAggregation("monthsRow");var e=this._getFocusedDate();A.call(this);t.displayDate(e.toLocalJSDate())};M.prototype._setAriaRole=function(t){var e=this.getAggregation("monthsRow");e._setAriaRole(t);e.invalidate();return this};M.prototype._initializeHeader=function(){var t=new c(this.getId()+"--Head",{visibleButton0:false,visibleButton1:false,visibleButton2:true});t.attachEvent("pressPrevious",this._handlePrevious,this);t.attachEvent("pressNext",this._handleNext,this);t.attachEvent("pressButton2",L,this);this.setAggregation("header",t)};M.prototype._initializeMonthsRow=function(){var t=new l(this.getId()+"--MonthsRow");t.attachEvent("focus",O,this);t.attachEvent("select",J,this);t._bNoThemeChange=true;this.setAggregation("monthsRow",t)};M.prototype._initilizeYearPicker=function(){var t=this._createYearPicker();this.setAggregation("yearPicker",t);t._setSelectedDatesControlOrigin(this)};M.prototype._createYearPicker=function(){var t=new u(this.getId()+"--YP",{columns:0,years:6});t.attachEvent("select",B,this);t.attachEvent("pageChange",T,this);t._oMinDate.setYear(this._oMinDate.getYear());t._oMaxDate.setYear(this._oMaxDate.getYear());return t};M.prototype._getCalendarPicker=function(){var t;if(!this._oCustomYearPicker){t=new h(this.getId()+"--Cal");t.attachEvent("select",E,this);t.attachEvent("cancel",function(t){this._oPopup.close();var e=this.getAggregation("header").getDomRef("B2");if(e){e.focus()}},this);this._oFocusCYPDelegate={onAfterRendering:function(){this.focus()}};t.addDelegate(this._oFocusCYPDelegate,t);this._oCustomYearPicker=t}return this._oCustomYearPicker};M.prototype.setStartDate=function(t){n._checkJSDateObject(t);if(d(this.getStartDate(),t)){return this}var e=t.getFullYear();n._checkYearInValidRange(e);this.setProperty("startDate",t,true);this._oStartDate=g.fromLocalJSDate(t);this._oStartDate.setDate(1);var a=this.getAggregation("monthsRow");a.setStartDate(t);A.call(this);var i=this._getFocusedDate().toLocalJSDate();if(!a.checkDateFocusable(i)){this._setFocusedDate(this._oStartDate);a.displayDate(t)}return this};M.prototype.invalidate=function(t){if(!this._bDateRangeChanged&&(!t||!(t instanceof v))){a.prototype.invalidate.apply(this,arguments)}else if(this.getDomRef()&&this._iMode==0&&!this._sInvalidateContent){this._sInvalidateContent=setTimeout(N.bind(this),0)}};M.prototype.removeAllSelectedDates=function(){this._bDateRangeChanged=true;var t=this.removeAllAggregation("selectedDates");return t};M.prototype.destroySelectedDates=function(){this._bDateRangeChanged=true;var t=this.destroyAggregation("selectedDates");return t};M.prototype.removeAllSpecialDates=function(){this._bDateRangeChanged=true;var t=this.removeAllAggregation("specialDates");return t};M.prototype.destroySpecialDates=function(){this._bDateRangeChanged=true;var t=this.destroyAggregation("specialDates");return t};M.prototype.setLocale=function(t){if(this._sLocale!=t){this._sLocale=t;this._oLocaleData=undefined;this.invalidate()}return this};M.prototype.getLocale=function(){if(!this._sLocale){this._sLocale=sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale().toString()}return this._sLocale};M.prototype._getFocusedDate=function(){if(!this._oFocusedDate){k.call(this)}return this._oFocusedDate};M.prototype._setFocusedDate=function(t){n._checkCalendarDate(t);this._oFocusedDate=new g(t)};M.prototype.focusDate=function(t){var e=false;var a=this.getAggregation("monthsRow");if(t&&!a.checkDateFocusable(t)){H.call(this,g.fromLocalJSDate(t));e=true}b.call(this,t,false);if(e){this.fireStartDateChange()}return this};M.prototype.displayDate=function(t){b.call(this,t,true);return this};M.prototype.setMonths=function(t){this.setProperty("months",t,true);t=this._getMonths();var e=this.getAggregation("monthsRow");e.setMonths(t);if(!e.checkDateFocusable(this._getFocusedDate().toLocalJSDate())){var a=P.call(this);this._setFocusedDate(this._oStartDate);e.setDate(a.toLocalJSDate())}if(!this.getPickerPopup()){var i=this.getAggregation("yearPicker");var s=Math.floor(t/2);if(s>20){s=20}i.setYears(s)}A.call(this);if(this.getDomRef()){if(this._getShowItemHeader()){this.$().addClass("sapUiCalIntHead")}else{this.$().removeClass("sapUiCalIntHead")}}return this};M.prototype._getMonths=function(){var t=this.getMonths();if(e.system.phone&&t>6){return 6}else{return t}};M.prototype._getLocaleData=function(){if(!this._oLocaleData){var t=this.getLocale();var e=new s(t);this._oLocaleData=o.getInstance(e)}return this._oLocaleData};M.prototype.setPickerPopup=function(t){var e;this.setProperty("pickerPopup",t,true);if(t){if(this.getAggregation("yearPicker")){this.getAggregation("yearPicker").destroy()}}else{if(!this.getAggregation("yearPicker")){this.setAggregation("yearPicker",this._createYearPicker())}e=this.getAggregation("yearPicker");e.setColumns(0);e.setYears(6)}return this};M.prototype.setMinDate=function(t){if(d(t,this.getMinDate())){return this}if(!t){this._oMinDate=n._minDate()}else{n._checkJSDateObject(t);this._oMinDate=g.fromLocalJSDate(t);this._oMinDate.setDate(1);var e=this._oMinDate.getYear();n._checkYearInValidRange(e);if(this._oMaxDate.isBefore(this._oMinDate)){p.warning("minDate > maxDate -> maxDate set to end of the month",this);this._oMaxDate=g.fromLocalJSDate(t);this._oMaxDate.setDate(n._daysInMonth(this._oMaxDate));this.setProperty("maxDate",this._oMaxDate.toLocalJSDate(),true)}if(this._oFocusedDate){if(this._oFocusedDate.isBefore(this._oMinDate)){p.warning("focused date < minDate -> minDate focused",this);this.focusDate(t)}}if(this._oStartDate&&this._oStartDate.isBefore(this._oMinDate)){p.warning("start date < minDate -> minDate set as start date",this);m.call(this,new g(this._oMinDate),true,true)}}this.setProperty("minDate",t,false);if(this.getPickerPopup()){var a=this._getCalendarPicker();a.setMinDate(t)}else{var i=this.getAggregation("yearPicker");i._oMinDate.setYear(this._oMinDate.getYear())}return this};M.prototype.setMaxDate=function(t){if(d(t,this.getMaxDate())){return this}if(!t){this._oMaxDate=n._maxDate()}else{n._checkJSDateObject(t);this._oMaxDate=g.fromLocalJSDate(t);this._oMaxDate.setDate(n._daysInMonth(this._oMaxDate));var e=this._oMaxDate.getYear();n._checkYearInValidRange(e);if(this._oMinDate.isAfter(this._oMaxDate)){p.warning("maxDate < minDate -> minDate set to begin of the month",this);this._oMinDate=g.fromLocalJSDate(t);this._oMinDate.setDate(1);this.setProperty("minDate",this._oMinDate.toLocalJSDate(),true)}if(this._oFocusedDate){if(this._oFocusedDate.isAfter(this._oMaxDate)){p.warning("focused date > maxDate -> maxDate focused",this);this.focusDate(t)}}if(this._oStartDate){var a=new g(this._oStartDate);a.setDate(1);a.setMonth(a.getMonth()+this._getMonths());a.setDate(0);if(a.isAfter(this._oMaxDate)){var i=new g(this._oMaxDate);i.setDate(1);i.setMonth(i.getMonth()-this._getMonths()+1);if(i.isSameOrAfter(this._oMinDate)){p.warning("end date > maxDate -> maxDate set as end date",this);m.call(this,i,true,true)}}}}this.setProperty("maxDate",t,false);if(this.getPickerPopup()){var s=this._getCalendarPicker();s.setMaxDate(t)}else{var o=this.getAggregation("yearPicker");o._oMaxDate.setYear(this._oMaxDate.getYear())}return this};M.prototype.onclick=function(t){if(t.isMarked("delayedMouseEvent")){return}if(t.target.id==this.getId()+"-cancel"){this.onsapescape(t)}};M.prototype.onmousedown=function(t){t.preventDefault();t.setMark("cancelAutoClose")};M.prototype.onsapescape=function(t){if(this.getPickerPopup()){I.call(this);this.fireCancel()}else{switch(this._iMode){case 0:this.fireCancel();break;case 1:C.call(this);break}}};M.prototype._handlePrevious=function(t){var e,a,i,s;switch(this._iMode){case 0:e=this._getFocusedDate();a=this._getMonths();i=new g(P.call(this));i.setMonth(i.getMonth()-a);e.setMonth(e.getMonth()-a);this._setFocusedDate(e);m.call(this,i,true);break;case 1:if(!this.getPickerPopup()){s=this.getAggregation("yearPicker");s.previousPage();Y.call(this)}break}};M.prototype._handleNext=function(t){var e,a,i,s;switch(this._iMode){case 0:e=this._getFocusedDate();a=this._getMonths();i=new g(P.call(this));i.setMonth(i.getMonth()+a);e.setMonth(e.getMonth()+a);this._setFocusedDate(e);m.call(this,i,true);break;case 1:if(!this.getPickerPopup()){s=this.getAggregation("yearPicker");s.nextPage();Y.call(this)}break}};M.prototype._showOverlay=function(){this.$("contentOver").css("display","")};M.prototype._hideOverlay=function(){this.$("contentOver").css("display","none")};M.prototype._getShowItemHeader=function(){var t=this.getMonths();if(t>this._iDaysMonthsHead){return true}else{return false}};function m(t,e,a){var i=new g(this._oMaxDate);i.setDate(1);i.setMonth(i.getMonth()-this._getMonths()+1);if(i.isBefore(this._oMinDate)){i=new g(this._oMinDate);i.setMonth(i.getMonth()+this._getMonths()-1)}if(t.isBefore(this._oMinDate)){t=new g(this._oMinDate)}else if(t.isAfter(i)){t=i}t.setDate(1);var s=t.toLocalJSDate();this.setProperty("startDate",s,true);this._oStartDate=t;var o=this.getAggregation("monthsRow");o.setStartDate(s);A.call(this);if(e){var r=this._getFocusedDate().toLocalJSDate();if(!o.checkDateFocusable(r)){this._setFocusedDate(t);o.setDate(s)}else{o.setDate(r)}}if(!a){this.fireStartDateChange()}}function P(){if(!this._oStartDate){this._oStartDate=this._getFocusedDate();this._oStartDate.setDate(1)}return this._oStartDate}function S(t){var e=this._getFocusedDate();var a=this.getAggregation("monthsRow");if(!t){a.setDate(e.toLocalJSDate())}else{a.displayDate(e.toLocalJSDate())}A.call(this)}function k(){var t=this.getSelectedDates();if(t&&t[0]&&t[0].getStartDate()){this._oFocusedDate=g.fromLocalJSDate(t[0].getStartDate())}else{this._oFocusedDate=new g}this._oFocusedDate.setDate(1);if(this._oFocusedDate.isBefore(this._oMinDate)){this._oFocusedDate=new g(this._oMinDate)}else if(this._oFocusedDate.isAfter(this._oMaxDate)){this._oFocusedDate=new g(this._oMaxDate)}}function w(){var t=this._getFocusedDate();var e=this.getAggregation("yearPicker");this.setProperty("_currentPicker",y.YEAR_PICKER);this._showOverlay();e.setDate(t.toLocalJSDate());Y.call(this);this._iMode=1}function C(t){this._iMode=0;this.setProperty("_currentPicker",y.MONTHS_ROW);this._hideOverlay();if(!t){S.call(this)}}function A(){F.call(this);x.call(this)}function x(){var t=new g(P.call(this));var e=this._getMonths();var a=t.getYear();var i=this._oMaxDate.getYear();var s=this._oMinDate.getYear();var o=t.getMonth();var r=this._oMaxDate.getMonth();var n=this._oMinDate.getMonth();var h=this.getAggregation("header");if(a<s||a==s&&o<=n){h.setEnabledPrevious(false)}else{h.setEnabledPrevious(true)}t.setMonth(t.getMonth()+e-1);a=t.getYear();o=t.getMonth();if(a>i||a==i&&o>=r){h.setEnabledNext(false)}else{h.setEnabledNext(true)}}function Y(){var t=this.getAggregation("yearPicker");var e=t.getYears();var a=new g(t.getProperty("_middleDate"));a.setYear(a.getYear()+Math.floor(e/2));var i=this.getAggregation("header");var s=new g(this._oMaxDate);s.setYear(s.getYear()-Math.ceil(e/2));s.setMonth(11,31);var o=new g(this._oMinDate);o.setYear(o.getYear()+Math.floor(e/2)+1);o.setMonth(0,1);i.setEnabledNext(!a.isAfter(s));i.setEnabledPrevious(!a.isBefore(o))}function F(){var t;var e=P.call(this);var a=this._oYearFormat.format(e.toUTCJSDate(),true);var i=new g(e);i.setMonth(i.getMonth()+this._getMonths()-1);var s=this._oYearFormat.format(i.toUTCJSDate(),true);if(a!=s){var o=this._getLocaleData();var r=o.getIntervalPattern();t=r.replace(/\{0\}/,a).replace(/\{1\}/,s)}else{t=a}var n=this.getAggregation("header");n.setTextButton2(t)}function R(t,e){var a;var i=false;if(t.isBefore(this._oMinDate)){a=this._oMinDate;i=true}else if(t.isAfter(this._oMaxDate)){a=this._oMaxDate;i=true}else{a=t}this._setFocusedDate(a);if(i||e){H.call(this,a);S.call(this,false);this.fireStartDateChange()}}function b(t,e){if(!t){return}var a=g.fromLocalJSDate(t);if(this._oFocusedDate&&this._oFocusedDate.isSame(a)){return}var i=a.getYear();n._checkYearInValidRange(i);if(n._isOutside(a,this._oMinDate,this._oMaxDate)){throw new Error("Date must not be in valid range (minDate and maxDate); "+this)}this._setFocusedDate(a);if(this.getDomRef()&&this._iMode==0){S.call(this,e)}}function L(t){var e;if(this.getPickerPopup()){this._showCalendarPicker()}else{if(this._iMode!=1){e=function(){var t=this.getAggregation("yearPicker");t.focus();t.removeDelegate(e)};w.call(this);this.getAggregation("yearPicker").addDelegate({onAfterRendering:e},this)}else{C.call(this)}}}M.prototype._showCalendarPicker=function(){var t=this._getFocusedDate(true).toLocalJSDate();var e=this._getCalendarPicker();var a=new v({startDate:t});var i=g.fromLocalJSDate(t);e.displayDate(t,false);i.setMonth(0,1);e._getYearPicker().setProperty("_middleDate",i);e.removeAllSelectedDates();e.addSelectedDate(a);e.setMinDate(this.getMinDate());e.setMaxDate(this.getMaxDate());V.call(this,e);this._showOverlay()};function I(t){if(this._oPopup&&this._oPopup.isOpen()){this._oPopup.close()}this._hideOverlay();if(!t){S.call(this)}}function J(t){this.fireSelect()}function O(t){var e=g.fromLocalJSDate(t.getParameter("date"));var a=t.getParameter("notVisible");R.call(this,e,a)}function E(t){var e=new g(this._getFocusedDate());var a=this._getCalendarPicker();var i=a.getSelectedDates()[0].getStartDate();var s=g.fromLocalJSDate(i);s.setMonth(e.getMonth());s.setDate(e.getDate());R.call(this,s,true);I.call(this)}function B(t){var e=new g(this._getFocusedDate());var a=this.getAggregation("yearPicker");var i=g.fromLocalJSDate(a.getDate());var s={onAfterRendering:function(){this._oItemNavigation.focusItem(this._oItemNavigation.getFocusedIndex());this.removeDelegate(s)}};var o=this.getAggregation("monthsRow");i.setMonth(e.getMonth());i.setDate(e.getDate());e=i;R.call(this,e,true);C.call(this);o.addDelegate(s,o)}function N(){this._sInvalidateContent=undefined;var t=this.getAggregation("monthsRow");if(t){t._bDateRangeChanged=true;t._bInvalidateSync=true;t.invalidate();t._bInvalidateSync=undefined}this._bDateRangeChanged=undefined}function H(t){var e=this.getAggregation("monthsRow");var a=P.call(this);var i=e._oItemNavigation.getFocusedIndex();a=new g(t);a.setMonth(a.getMonth()-i);m.call(this,a,false,true)}function V(e){if(!this._oPopup){var a=new t({placement:"VerticalPreferredBottom",showHeader:false,showArrow:false,verticalScrolling:false});a.oPopup.setDurations(0,0);a.addEventDelegate({onsapescape:function(t){this._oCustomYearPicker.onsapescape(t);this._hideOverlay()}},this);this._oPopup=a}this._oPopup.addContent(e);this._oPopup.attachAfterClose(function(){this._hideOverlay()},this);this._oPopup.attachAfterOpen(function(){var t=s.$("B2");var e=this._oPopup.$();var a=Math.floor((e.width()-t.width())/2);this._oPopup.setOffsetX(i.getConfiguration().getRTL()?a:-a);var o=t.height();this._oPopup.setOffsetY(this._oPopup._getCalculatedPlacement()==="Top"?o:-o)},this);var s=this.getAggregation("header");this._oPopup.openBy(s.getDomRef("B2"))}function T(t){Y.call(this)}return M});