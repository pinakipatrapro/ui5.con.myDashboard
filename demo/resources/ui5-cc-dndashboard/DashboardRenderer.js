sap.ui.define(["sap/ui/core/Core","ui5-cc-dndashboard/library"],function(e,t){"use strict";var i={apiVersion:2};i.render=function(e,t){e.openStart("div",t);e.style("height",t.getHeight());e.openEnd();if(!!t.getAggregation("header")){e.renderControl(t.getAggregation("header"))}e.openStart("div");e.class("grid-stack");e.openEnd();if(!!t.getAggregation("tiles")){t.getAggregation("tiles").map(i=>{i.setEditable(t.getEditable());e.renderControl(i)})}e.close("div");e.close("div")};return i});