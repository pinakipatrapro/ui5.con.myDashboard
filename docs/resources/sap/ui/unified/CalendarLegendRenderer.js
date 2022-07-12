/*
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/InvisibleText"],function(e){"use strict";var t={apiVersion:2};t.render=function(e,t){var i=t.getAggregation("_standardItems"),n=t.getItems(),d=this.defineItemsLength(t,n.length),r,s,o;e.openStart("div",t);e.class("sapUiUnifiedLegend");e.openEnd();this.renderItemsHeader(e,t);if(i||n){e.openStart("div");e.class("sapUiUnifiedLegendItems");o=t.getColumnWidth();e.style("column-width",o);e.style("-moz-column-width",o);e.style("-webkit-column-width",o);e.openEnd();if(i){s=t.getId().length+1;for(r=0;r<i.length;++r){var a="sapUiUnifiedLegend"+i[r].getId().slice(s);this.renderLegendItem(e,a,i[r],["sapUiUnifiedLegendSquareColor"])}}if(n){for(r=0;r<d;r++){this.renderLegendItem(e,"sapUiCalLegDayType"+t._getItemType(n[r],n).slice(4),n[r],["sapUiUnifiedLegendSquareColor"])}}this.renderAdditionalItems(e,t);e.close("div")}this.renderAdditionalContent(e,t);e.close("div")};t.renderLegendItem=function(e,t,i,n){var d=i.getText();var r=i.getTooltip_AsString();e.openStart("div",i);if(r){e.attr("title",r)}e.class("sapUiUnifiedLegendItem");e.class(t);e.openEnd();e.openStart("div");e.class("sapUiUnifiedLegendSquare");e.openEnd();this.renderColor(e,i.getColor(),n);e.close("div");e.openStart("div",i.getId()+"-Text");e.class("sapUiUnifiedLegendDescription");e.openEnd();e.text(d);e.close("div");e.close("div")};t.renderItemsHeader=function(e,t){};t.renderAdditionalContent=function(e,t){};t.defineItemsLength=function(e,t){return t};t.renderAdditionalItems=function(e,t){};t.renderColor=function(e,t,i){e.openStart("div");for(var n=0;n<i.length;n++){e.class(i[n])}if(t){e.style("background-color",t)}e.openEnd();e.close("div")};t.addCalendarTypeAccInfo=function(e,i,n){var d,r;if(n){var s=n._getItemByType(i);if(s){d=s.getText()}}if(d){e["label"]=e["label"]?e["label"]+"; "+d:d}else{r=t.getTypeAriaText(i);if(r){e["describedby"]=e["describedby"]?e["describedby"]+" "+r.getId():r.getId()}}};t.typeARIATexts={};t.getTypeAriaText=function(i){var n,d;if(i.indexOf("Type")!==0){return}if(!t.typeARIATexts[i]){n=sap.ui.getCore().getLibraryResourceBundle("sap.ui.unified");d=n.getText("LEGEND_UNNAMED_TYPE",parseInt(i.slice(4)).toString());t.typeARIATexts[i]=new e({text:d});t.typeARIATexts[i].toStatic()}return t.typeARIATexts[i]};return t},true);