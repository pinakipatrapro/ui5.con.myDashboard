sap.ui.define([
    "ui5-cc-dndashboard/DashboardTile",
    "ui5-cc-dndashboard/DashboardChart",
    "ui5-cc-dndashboard/FunnelChart"
  ],
    function (DashboardTile, DashboardChart, FunnelChart) {
        "use strict";
  
        return function (sId, oContext) {
  
            if (oContext.getProperty("cardType") === 'dndChart') {
                return new DashboardTile({
                    "posx": "{posx}",
                    "posy": "{posy}",
                    "width": "{width}",
                    "height": "{height}",
                    "content": new DashboardChart({
                        title: "{title}",
                        chartType: "{chartType}",
                        darkMode: sap.ui.getCore().getConfiguration().getTheme().indexOf('dark') > 0 ? true : false,
                        measure: "{measure}",
                        dimension: "{dimension}",
                        data: "{data}",
                        measureColour: "{measureColour}",
                        xGrid: "{xGrid}",
                        yGrid: "{yGrid}",
                        xAxisLabel: "{xAxisLabel}",
                        yAxisLabel: "{yAxisLabel}",
                        showLegend: "{showLegend}",
                        legendPosition: "{legendPosition}",
                        enableFilledLine: "{enableFilledLine}",
                        enableAxisLabels: "{enableAxisLabels}",
                        label: "{label}",
                        scatterLabel: "{scatterLabel}",
                        smartNumberFormat: "{smartNumberFormat}",
                        xAxisUOM: "{xAxisUOM}",
                        yAxisUOM: "{yAxisUOM}",
                        showDataPoints: "{showDataPoints}",
                        dataPointColor: "{dataPointColor}",
                        y2AxisUOM: "{y2AxisUOM}",
                        y2AxisLabel: "{y2AxisLabel}",
                        stacked: "{stacked}"
  
                    })
                })
            } else if (oContext.getProperty("cardType") === 'image') {
                return new DashboardTile({
                    "posx": "{posx}",
                    "posy": "{posy}",
                    "width": "{width}",
                    "height": "{height}",
                    "content": new sap.m.Image({
                        height: "3rem",
                        src: "{url}"
                    })
                })
            } else if (oContext.getProperty("cardType") === 'select') {
                return new DashboardTile({
                    "posx": "{posx}",
                    "posy": "{posy}",
                    "width": "{width}",
                    "height": "{height}",
                    "content": new sap.m.VBox({
                        items: [
                            new sap.m.Label({
                                text: "{text}"
                            }),
                            new sap.m.ComboBox({
                                width: "100%",
                                items: {
                                    path: "items",
                                    template: new sap.ui.core.Item({
                                        text: "{name}"
                                    })
                                }
                            })
                        ]
                    })
                })
            } else if (oContext.getProperty("cardType") === 'list') {
                return new DashboardTile({
                    "posx": "{posx}",
                    "posy": "{posy}",
                    "width": "{width}",
                    "height": "{height}",
                    "content": new sap.m.List({
                        mode: "MultiSelect",
                        items: {
                            path: "items",
                            template: new sap.m.StandardListItem({
                                title: "{name}"
                            })
                        }
                    })
                })
            } else if (oContext.getProperty("cardType") === 'funnel') {
                return new DashboardTile({
                    "posx": "{posx}",
                    "posy": "{posy}",
                    "width": "{width}",
                    "height": "{height}",
                    "content": new FunnelChart({
                        measure: "{measure}",
                        dimension: "{dimension}",
                        data: "{data}",
                        measureColour: "{measureColour}"
                    })
                })
            }
        }
    });