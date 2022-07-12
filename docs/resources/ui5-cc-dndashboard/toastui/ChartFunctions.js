sap.ui.define(["ui5-cc-dndashboard/library","sap/ui/core/Control","@toast-ui/chart/dist/toastui-chart.min.js","ui5-cc-dndashboard/toastui/ChartFunction/BubbleChart","ui5-cc-dndashboard/toastui/ChartFunction/PieChart","ui5-cc-dndashboard/toastui/ChartFunction/AreaChart","ui5-cc-dndashboard/toastui/ChartFunction/BarChart","ui5-cc-dndashboard/toastui/ChartFunction/LineChart","ui5-cc-dndashboard/toastui/ChartFunction/ColumnChart","ui5-cc-dndashboard/toastui/ChartFunction/RadarChart","ui5-cc-dndashboard/toastui/ChartFunction/RadarBarChart","ui5-cc-dndashboard/toastui/ChartFunction/HeatMapChart","ui5-cc-dndashboard/toastui/ChartFunction/NestedPieChart","ui5-cc-dndashboard/toastui/ChartFunction/ScatterChart","sap/ui/dom/includeStylesheet"],function(t,a,e,r,o,i,n,s,c,u,l,d,h,g,b){"use strict";b(sap.ui.require.toUrl("@toast-ui/chart/dist/toastui-chart.min.css"));return{createChart:function(t){const a=document.getElementById(t.getId());const r={exportMenu:{visible:false},theme:this.createTheme(t),chart:{width:"auto",height:"auto",title:t.getTitle()},xAxis:{title:t.getXAxisLabel(),label:{formatter:a=>t.smartNumberFormat(a,1,t.getSmartNumberFormat())+t.getXAxisUOM()}},yAxis:{title:t.getYAxisLabel(),label:{formatter:a=>t.smartNumberFormat(a,1,t.getSmartNumberFormat())+t.getYAxisUOM()}},circularAxis:{title:t.getXAxisLabel()},tooltip:{},legend:{visible:t.getShowLegend(),align:t.getLegendPosition()},series:{stack:t.getStacked(),dataLabels:{visible:t.getShowDataPoints(),formatter:a=>t.smartNumberFormat(a,1,t.getSmartNumberFormat())},showArea:t.getEnableFilledLine()},plot:{type:"circle"},circleLegend:{visible:t.getShowLegend()}};const o=this.formatData[t.getChartType()](t,r);const i=e[t.getChartType()]({el:a,data:o,options:r});this.postChartRendering()},postChartRendering:function(){var t=document.getElementsByClassName("toastui-chart-tooltip-container");t[0].style.position="fixed";return t},createTheme:function(t){var a=t.getDarkMode()?"white":"#000000";var e="#cecece1c";return{chart:{backgroundColor:"rgba(0,0,0,0)"},title:{color:a},yAxis:{label:{color:t.getEnableAxisLabels()?a:"rgba(0,0,0,0)"},color:a},xAxis:{label:{color:t.getEnableAxisLabels()?a:"rgba(0,0,0,0)"},color:a},circularAxis:{strokeStyle:t.getXGrid()?e:"rgba(0,0,0,0)",dotColor:e,label:{color:t.getEnableAxisLabels()?a:"rgba(0,0,0,0)"}},verticalAxis:{strokeStyle:e,dotColor:e,label:{color:t.getShowDataPoints()?a:"rgba(0,0,0,0)",textBubble:{visible:false,borderRadius:5,backgroundColor:"rgba(7, 59, 76, .01)",paddingX:5,paddingY:6}}},series:{colors:t.getMeasureColour(),startColor:t.getMeasureColour()[0],endColor:t.getMeasureColour()[1],borderWidth:1,borderColor:"#ffffff00",dataLabels:{color:t.getDataPointColor(),useSeriesColor:false,formatter:a=>t.smartNumberFormat(a,1,t.getSmartNumberFormat())},iconTypes:["rect","triangle","pentagon","star","diamond","cross","hexagon"]},legend:{label:{color:a}},plot:{vertical:{lineColor:t.getYGrid()?e:"rgba(0,0,0,0)"},horizontal:{lineColor:t.getXGrid()?e:"rgba(0,0,0,0)"}}}},formatData:{heatmapChart:function(t,a){return d.getData(t,a)},bubbleChart:function(t,a){return r.getData(t,a)},pieChart:function(t,a){return o.getData(t,a)},areaChart:function(t,a){return i.getData(t,a)},barChart:function(t,a){return n.getData(t,a)},lineChart:function(t,a){return s.getData(t,a)},columnChart:function(t,a){return c.getData(t,a)},radarChart:function(t,a){return u.getData(t,a)},radialBarChart:function(t,a){return l.getData(t,a)},nestedPieChart:function(t,a){return h.getData(t,a)},scatterChart:function(t,a){return g.getData(t,a)}}}});