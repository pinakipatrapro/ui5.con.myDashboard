/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/unified/calendar/CalendarDate","sap/ui/unified/calendar/CalendarUtils","sap/ui/core/date/UniversalDate","sap/ui/core/IconPool","sap/ui/core/InvisibleText","./PlanningCalendarLegend","sap/ui/unified/library"],function(e,t,a,l,n,r,i){"use strict";var o=.125;var s=.125;var p=.0625;var d=i.CalendarDayType;var c={apiVersion:2};c.render=function(e,t){e.openStart("div",t);e.class("sapMSinglePCGrid");e.openEnd();e.renderControl(t.getAggregation("_columnHeaders"));this.renderBlockersContainer(e,t);e.openStart("div");e.attr("role","grid");e.class("sapMSinglePCGridContent");e.openEnd();this.renderRowHeaders(e,t);this.renderNowMarker(e,t);this.renderColumns(e,t);e.close("div");e.close("div")};c.renderBlockersContainer=function(a,l){var i=l._getColumns(),o=l._getBlockersToRender().iMaxlevel,s=l.getStartDate(),p=(o+1)*l._getBlockerRowHeight()+.1875,d=l._getDateFormatter(),c=l._getSpecialDates(),g=e.fromLocalJSDate(s),u=l._getColumnHeaders()._getDateTypes(g),f,S;a.openStart("div");a.attr("role","grid");a.class("sapMSinglePCBlockersRow");a.openEnd();a.openStart("div");a.attr("role","row");a.class("sapMSinglePCBlockersColumns");if(c&&l._getColumns()===1){if(u&&u[0]){f=u[0];a.class("sapUiCalItem"+f.type);S=r.findLegendItemForItem(sap.ui.getCore().byId(l._sLegendId),f)}a.class("sapMSpecialDaysInDayView")}a.style("height",p+"rem");a.openEnd();this.renderDndPlaceholders(a,l,l.getAggregation("_blockersPlaceholders"));for(var C=0;C<i;C++){var v=new e(s.getFullYear(),s.getMonth(),s.getDate()+C);a.openStart("div");a.attr("role","gridcell");a.attr("data-sap-start-date",d.format(v.toLocalJSDate()));a.attr("data-sap-end-date",d.format(v.toLocalJSDate()));a.attr("aria-labelledby",n.getStaticId("sap.m","SPC_BLOCKERS")+" "+"fullDay-"+d.format(v.toLocalJSDate())+"-Descr");a.class("sapMSinglePCBlockersColumn");a.attr("tabindex",-1);if(v.isSame(new e)){a.class("sapMSinglePCBlockersColumnToday")}if(t._isWeekend(v,l._getCoreLocaleData())){a.class("sapMSinglePCBlockersColumnWeekend")}a.openEnd();a.openStart("span","fullDay-"+d.format(v.toLocalJSDate())+"-Descr");a.class("sapUiInvisibleText");a.openEnd();a.text(l._getCellStartEndInfo(v.toLocalJSDate()));if(l._sLegendId&&S){a.text(S)}a.close("span");a.close("div")}this.renderBlockers(a,l);a.close("div");a.close("div")};c.renderBlockers=function(e,t){var a=this,l=t._getBlockersToRender().oBlockersList;e.openStart("div");e.attr("role","list");e.attr("aria-labelledby",n.getStaticId("sap.m","SPC_BLOCKERS"));e.class("sapMSinglePCBlockers");e.class("sapUiCalendarRowVisFilled");e.openEnd();l.getIterator().forEach(function(l){a.renderBlockerAppointment(e,t,l)});e.close("div")};c.renderBlockerAppointment=function(a,l,r){var i=e.fromLocalJSDate(l.getStartDate()),o=r.getData(),s=e.fromLocalJSDate(o._getStartDateWithTimezoneAdaptation()),p=e.fromLocalJSDate(o._getEndDateWithTimezoneAdaptation()),c=t._daysBetween(s,i),g=t._daysBetween(p,i),u=l._getColumns(),f=l._getBlockerRowHeight(),S=r.level,C=r.width,v=o.getTooltip_AsString(),m=o.getType(),b=o.getColor(),A=o.getTitle(),T=o.getText(),_=o.getIcon(),y=o.getId(),M={role:"listitem",labelledby:{value:n.getStaticId("sap.ui.unified","APPOINTMENT"),append:true},selected:null},P=l.getAriaLabelledBy(),w=c*(100/u),h=(u-g-1)*(100/u),E=sap.ui.getCore().getConfiguration().getRTL(),D;if(P.length>0){M["labelledby"].value=M["labelledby"].value+" "+P.join(" ")}if(A){M["labelledby"].value=M["labelledby"].value+" "+y+"-Title"}M["labelledby"].value=M["labelledby"].value+" "+y+"-Descr";if(T){M["labelledby"].value=M["labelledby"].value+" "+y+"-Text"}if(o.getTentative()){M["labelledby"].value=M["labelledby"].value+" "+n.getStaticId("sap.ui.unified","APPOINTMENT_TENTATIVE")}if(o.getSelected()){M["labelledby"].value=M["labelledby"].value+" "+n.getStaticId("sap.ui.unified","APPOINTMENT_SELECTED")}a.openStart("div",o);a.attr("data-sap-level",S);a.attr("data-sap-width",C);a.attr("tabindex",0);if(v){a.attr("title",v)}a.accessibilityState(o,M);a.class("sapMSinglePCAppointmentWrap");a.class("sapUiCalendarRowApps");if(!b&&m!==d.None){a.class("sapUiCalendarApp"+m)}if(b){if(sap.ui.getCore().getConfiguration().getRTL()){a.style("border-right-color",b)}else{a.style("border-left-color",b)}}a.style("top",f*S+.0625+"rem");a.style(E?"right":"left",Math.max(w,0)+"%");a.style(E?"left":"right",Math.max(h,0)+"%");a.openEnd();a.openStart("div");a.class("sapUiCalendarApp");if(o.getSelected()){a.class("sapUiCalendarAppSel")}if(o.getTentative()){a.class("sapUiCalendarAppTent")}if(_){a.class("sapUiCalendarAppWithIcon")}a.openEnd();a.openStart("div");a.class("sapUiCalendarAppCont");if(b){a.style("background-color",o._getCSSColorForBackground(b))}a.openEnd();if(w<0){D=["sapUiCalendarAppArrowIconLeft","sapUiCalendarAppArrowIcon"];a.icon("sap-icon://arrow-left",D,{title:null,role:"img"})}if(_){D=["sapUiCalendarAppIcon"];var I={};I["id"]=y+"-Icon";I["title"]=null;I["role"]="img";a.icon(_,D,I)}if(A){a.openStart("span",y+"-Title");a.class("sapUiCalendarAppTitle");a.openEnd();a.text(A,true);a.close("span")}if(h<0){D=["sapUiCalendarAppArrowIconRight","sapUiCalendarAppArrowIcon"];a.icon("sap-icon://arrow-right",D,{title:null,role:"img"})}a.openStart("span",y+"-Descr");a.class("sapUiInvisibleText");a.openEnd();a.text(l._getAppointmentAnnouncementInfo(o));a.close("span");a.close("div");a.close("div");a.close("div")};c.renderRowHeaders=function(e,t){var a=t._getVisibleStartHour(),l=t._getVisibleEndHour(),n=new Date,r=t._getHoursFormat(),i=t._getAMPMFormat();e.openStart("div");e.class("sapMSinglePCRowHeaders");e.openEnd();for(var o=a;o<=l;o++){n.setUTCHours(o);e.openStart("span");e.class("sapMSinglePCRowHeader");e.class("sapMSinglePCRowHeader"+o);if(t._shouldHideRowHeader(o)){e.class("sapMSinglePCRowHeaderHidden")}e.openEnd();e.text(r.format(n,true));if(t._hasAMPM()){e.openStart("span");e.class("sapMSinglePCRowHeaderAMPM");e.openEnd();e.text(" "+i.format(n,true));e.close("span")}e.close("span")}e.close("div")};c.renderColumns=function(a,l){var r=l._getColumns(),i=l.getStartDate(),o=l._getAppointmentsToRender();a.openStart("div");a.attr("role","grid");a.attr("aria-labelledby",n.getStaticId("sap.m","SPC_APPOINTMENTS"));a.class("sapMSinglePCColumns");a.openEnd();for(var s=0;s<r;s++){var p=new e(i.getFullYear(),i.getMonth(),i.getDate()+s),d=l._getDateFormatter(),c=d.format(p.toLocalJSDate());a.openStart("div");a.attr("role","row");a.attr("data-sap-day",c);a.class("sapMSinglePCColumn");if(p.isSame(new e)){a.class("sapMSinglePCColumnToday")}if(t._isWeekend(p,l._getCoreLocaleData())){a.class("sapMSinglePCColumnWeekend")}a.openEnd();this.renderDndPlaceholders(a,l,l._dndPlaceholdersMap[p]);this.renderRows(a,l,c);this.renderAppointments(a,l,o[c],p,s);a.close("div")}a.close("div")};c.renderDndPlaceholders=function(e,t,a){e.openStart("div");e.class("sapMSinglePCOverlay");e.openEnd();a.forEach(e.renderControl,e);e.close("div")};c.renderRows=function(e,t,a){var l=t._getVisibleStartHour(),n=t._getVisibleEndHour(),r=t._getDateFormatter(),i,o;for(var s=l;s<=n;s++){i=t._parseDateStringAndHours(a,s);o=new Date(i.getFullYear(),i.getMonth(),i.getDate(),i.getHours()+1);e.openStart("div");e.attr("role","gridcell");e.class("sapMSinglePCRow");e.style("height",t._getRowHeight()+"rem");if(!t._isVisibleHour(s)){e.class("sapMSinglePCNonWorkingRow")}e.attr("data-sap-hour",s);e.attr("data-sap-start-date",r.format(i));e.attr("data-sap-end-date",r.format(o));e.attr("aria-labelledby",r.format(i)+"-Descr");e.attr("tabindex",-1);e.openEnd();e.openStart("span",r.format(i)+"-Descr");e.class("sapUiInvisibleText");e.openEnd();e.text(t._getCellStartEndInfo(i,o));e.close("span");e.close("div")}};c.renderAppointments=function(e,t,a,l,n){var r=this,i=0;if(a){e.openStart("div");e.attr("role","list");e.class("sapMSinglePCAppointments");e.class("sapUiCalendarRowVisFilled");e.openEnd();a.oAppointmentsList.getIterator().forEach(function(o){var s=a.iMaxLevel,p=o.level,d=o.width,c=o.getData();r.renderAppointment(e,t,s,p,d,c,l,n,i);i++});e.close("div")}};c.renderAppointment=function(l,r,i,c,g,u,f,S,C){var v=e.fromLocalJSDate(r.getStartDate()),m=new e(v),b=r._getRowHeight(),A=new a(f.getYear(),f.getMonth(),f.getDate(),r._getVisibleStartHour()),T=new a(f.getYear(),f.getMonth(),f.getDate(),r._getVisibleEndHour(),59,59),_=u._getStartDateWithTimezoneAdaptation(),y=u._getEndDateWithTimezoneAdaptation(),M=e.fromLocalJSDate(_),P=e.fromLocalJSDate(y),w=u.getTooltip_AsString(),h=u.getType(),E=u.getColor(),D=u.getTitle(),I=u.getText(),U=u.getIcon(),L=u.getId(),R=this._getLineClamp(_,y),k={role:"listitem",labelledby:{value:n.getStaticId("sap.ui.unified","APPOINTMENT"),append:true},selected:null},H=r.getAriaLabelledBy(),x=A.getTime()>_.getTime(),B=T.getTime()<y.getTime(),N=x?0:r._calculateTopPosition(_),F=B?0:r._calculateBottomPosition(y),V=100/(i+1),W=u.getParent().getEnableAppointmentsDragAndDrop(),J=r.getProperty("scaleFactor"),O=2*J,z,Y,j,G,K;m.setDate(m.getDate()+r._getColumns()-1);z=t._daysBetween(M,v);Y=t._daysBetween(m,P);j=f.isSame(v);G=f.isSame(m);if(H.length>0){k["labelledby"].value=k["labelledby"].value+" "+H.join(" ")}if(D){k["labelledby"].value=k["labelledby"].value+" "+L+"-Title"}k["labelledby"].value=k["labelledby"].value+" "+L+"-Descr";if(I){k["labelledby"].value=k["labelledby"].value+" "+L+"-Text"}if(u.getTentative()){k["labelledby"].value=k["labelledby"].value+" "+n.getStaticId("sap.ui.unified","APPOINTMENT_TENTATIVE")}if(u.getSelected()){k["labelledby"].value=k["labelledby"].value+" "+n.getStaticId("sap.ui.unified","APPOINTMENT_SELECTED")}l.openStart("div",u.getId()+"-"+S+"_"+C);l.attr("draggable",W);l.attr("data-sap-ui-draggable",W);l.attr("data-sap-ui-related",u.getId());l.attr("data-sap-level",c);l.attr("data-sap-width",g);l.attr("tabindex",0);if(w){l.attr("title",w)}l.accessibilityState(u,k);l.class("sapMSinglePCAppointmentWrap");l.class("sapUiCalendarRowApps");if(!E&&h!==d.None){l.class("sapUiCalendarApp"+h)}if(E){if(sap.ui.getCore().getConfiguration().getRTL()){l.style("border-right-color",E)}else{l.style("border-left-color",E)}}l.style("top",N+"rem");l.style("bottom",F+"rem");l.style(sap.ui.getCore().getConfiguration().getRTL()?"right":"left",V*c+"%");l.style("width",V*g+"%");l.openEnd();l.openStart("div");l.class("sapUiCalendarApp");l.style("min-height",(b-(o+s+p)*J)/O+"rem");if(u.getSelected()){l.class("sapUiCalendarAppSel")}if(u.getTentative()){l.class("sapUiCalendarAppTent")}if(U){l.class("sapUiCalendarAppWithIcon")}l.openEnd();l.openStart("div");l.class("sapUiCalendarAppCont");if(E){l.style("background-color",u._getCSSColorForBackground(E))}l.openEnd();if(j&&z<0){K=["sapUiCalendarAppArrowIconLeft","sapUiCalendarAppArrowIcon"];l.icon("sap-icon://arrow-left",K,{title:null,role:"img"})}if(U){K=["sapUiCalendarAppIcon"];var q={};q["id"]=L+"-Icon";q["title"]=null;q["role"]="img";l.icon(U,K,q)}l.openStart("div");l.class("sapUiCalendarAppTitleWrapper");l.class("sapUiSPCAppLineClamp"+R);l.openEnd();if(D){l.openStart("span",L+"-Title");l.class("sapUiCalendarAppTitle");l.openEnd();l.text(D,true);l.close("span")}if(I){l.openStart("span",L+"-Text");l.class("sapUiCalendarAppText");l.openEnd();l.text(I,true);l.close("span")}l.close("div");if(G&&Y<0){K=["sapUiCalendarAppArrowIconRight","sapUiCalendarAppArrowIcon"];l.icon("sap-icon://arrow-right",K,{title:null,role:"img"})}l.openStart("span",L+"-Descr");l.class("sapUiInvisibleText");l.openEnd();l.text(r._getAppointmentAnnouncementInfo(u));l.close("span");l.close("div");if(r.getEnableAppointmentsResize()){this.renderResizeHandles(l,!x,!B)}l.close("div");l.close("div")};c.renderNowMarker=function(e,t){var a=new Date;e.openStart("div",t.getId()+"-nowMarker");e.style("top",t._calculateTopPosition(a)+"rem");e.class("sapMSinglePCNowMarker");if(!t._isVisibleHour(a.getHours())){e.class("sapMSinglePCNowMarkerHidden")}e.openEnd();e.openStart("span",t.getId()+"-nowMarkerText");e.class("sapMSinglePCNowMarkerText");e.openEnd();e.text(t._formatTimeAsString(a));if(t._hasAMPM()){e.openStart("span",t.getId()+"-nowMarkerAMPM");e.class("sapMSinglePCNowMarkerAMPM");e.openEnd();e.text(t._addAMPM(a));e.close("span")}e.close("span");e.close("div")};c.renderResizeHandles=function(e,t,a){if(a){e.openStart("span");e.class("sapMSinglePCAppResizeHandleBottom");e.openEnd();e.close("span")}if(t){e.openStart("span");e.class("sapMSinglePCAppResizeHandleTop");e.openEnd();e.close("span")}};c._getLineClamp=function(e,a){var l=t._minutesBetween(e,a);if(l>=51&&l<69){return"2"}else if(l>=69&&l<90){return"3"}else if(l>=90&&l<110){return"4"}else if(l>=110&&l<130){return"5"}else if(l>=130&&l<150){return"6"}else if(l>=150&&l<170){return"7"}else if(l>=170&&l<190){return"8"}else if(l>=190){return"9"}else{return"1"}};return c},true);