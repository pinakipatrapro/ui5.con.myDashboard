sap.ui.define(["ui5-cc-dndashboard/DashboardTile","ui5-cc-dndashboard/DashboardChart","ui5-cc-dndashboard/FunnelChart"],function(e,t,a){"use strict";function s(e,t){return Math.floor(Math.random()*(t-e+1)+e)}var i=function(e){var t=e.getSource().getModel().getProperty("/tiles");t.forEach(e=>{if(e.cardType!=="dndChart"){return}e.data.forEach(e=>{Object.keys(e).forEach(t=>{if(typeof e[t]=="number"){e[t]=e[t]*s(90,110)/100}})})});sap.ui.getCore().byId("__dashboard0").rerender()};return function(s,r){if(r.getProperty("cardType")==="dndChart"){return new e({posx:"{posx}",posy:"{posy}",width:"{width}",height:"{height}",content:new t({title:"{title}",chartType:"{chartType}",darkMode:sap.ui.getCore().getConfiguration().getTheme().indexOf("dark")>0?true:false,measure:"{measure}",dimension:"{dimension}",data:"{data}",measureColour:"{measureColour}",xGrid:"{xGrid}",yGrid:"{yGrid}",xAxisLabel:"{xAxisLabel}",yAxisLabel:"{yAxisLabel}",showLegend:"{showLegend}",legendPosition:"{legendPosition}",enableFilledLine:"{enableFilledLine}",enableAxisLabels:"{enableAxisLabels}",label:"{label}",scatterLabel:"{scatterLabel}",smartNumberFormat:"{smartNumberFormat}",xAxisUOM:"{xAxisUOM}",yAxisUOM:"{yAxisUOM}",showDataPoints:"{showDataPoints}",dataPointColor:"{dataPointColor}",y2AxisUOM:"{y2AxisUOM}",y2AxisLabel:"{y2AxisLabel}",stacked:"{stacked}"})})}else if(r.getProperty("cardType")==="image"){return new e({posx:"{posx}",posy:"{posy}",width:"{width}",height:"{height}",content:new sap.m.Image({height:"3rem",src:"{url}"})})}else if(r.getProperty("cardType")==="select"){return new e({posx:"{posx}",posy:"{posy}",width:"{width}",height:"{height}",content:new sap.m.VBox({items:[new sap.m.Label({text:"{text}"}),new sap.m.ComboBox({width:"100%",change:function(e){i(e)},items:{path:"items",template:new sap.ui.core.Item({text:"{name}"})}})]})})}else if(r.getProperty("cardType")==="list"){return new e({posx:"{posx}",posy:"{posy}",width:"{width}",height:"{height}",content:new sap.m.VBox({items:[new sap.m.Label({text:"{text}"}),new sap.m.List({selectionChange:function(e){i(e)},mode:"MultiSelect",items:{path:"items",template:new sap.m.StandardListItem({title:"{name}",selected:"{selected}"})}})]})})}else if(r.getProperty("cardType")==="funnel"){return new e({posx:"{posx}",posy:"{posy}",width:"{width}",height:"{height}",content:new a({measure:"{measure}",dimension:"{dimension}",data:"{data}",measureColour:"{measureColour}"})})}}});