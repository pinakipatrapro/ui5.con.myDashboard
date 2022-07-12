/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/support/library","sap/ui/model/BindingMode"],function(e,i){"use strict";var t=e.Categories,n=e.Severity,o=e.Audiences;var r={id:"facetFilterGrowingOneWayBinding",audiences:[o.Control],categories:[t.Usage],enabled:true,minversion:"1.28",title:"FacetFilter: growing is set along with two-way binding",description:"Growing works only with one-way binding",resolution:"Growing works only with one-way binding",resolutionurls:[{text:"SAP Fiori Design Guidelines: FacetFilter",href:"https://experience.sap.com/fiori-design-web/facet-filter/"}],check:function(e,t,o){o.getElementsByClassName("sap.m.FacetFilterList").forEach(function(t){if(t.getGrowing()&&t.getModel()&&t.getModel().getDefaultBindingMode()===i.TwoWay){var o=t.getId(),r=t.getMetadata().getElementName();e.addIssue({severity:n.High,details:"FacetFilter '"+r+"' ("+o+") growing property is set to true, when binding mode is two-way",context:{id:o}})}})}};return[r]},true);