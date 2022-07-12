/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log","sap/base/util/extend","sap/ui/core/Component"],function(e,t,i){"use strict";return{_routeMatched:function(o,a,r){var n=this._oRouter,s,h,g,u,_=null,f=null,l,c,d,p,T=n._oMatchedRoute===this;n._stopWaitingTitleChangedFromChild();if(n._oMatchedRoute){delete n._oMatchedRoute._oConfig.dynamicTarget}n._oMatchedRoute=this;n._bMatchingProcessStarted=true;g=t({},n._oConfig,this._oConfig);h=n.getTargets();var C;if(h){C=h._getTitleTargetName(g.target,g.titleTarget);if(C&&n._oPreviousTitleChangedRoute!==this){n._bFireTitleChanged=true;if(n._oOwner&&n._oOwner._bRoutingPropagateTitle){var v=i.getOwnerComponentFor(n._oOwner);var R=v&&v.getRouter();if(R){R._waitForTitleChangedOn(n)}}}else{n._bFireTitleChanged=false}if(this._oConfig.target){p=h._alignTargetsInfo(this._oConfig.target);p.forEach(function(e){e.propagateTitle=e.hasOwnProperty("propagateTitle")?e.propagateTitle:n._oConfig.propagateTitle;e.routeRelevant=true;e.repeatedRoute=T})}}else{p=this._oConfig.target}if(!a||a===true){l=true;a=Promise.resolve()}if(this._oParent){a=this._oParent._routeMatched(o,a)}else if(this._oNestingParent){this._oNestingParent._routeMatched(o,a,this)}c=Object.assign({},o);c.routeConfig=g;u={name:g.name,arguments:o,config:g};if(r){u.nestedRoute=r}this.fireBeforeMatched(u);n.fireBeforeRouteMatched(u);if(this._oTarget){s=this._oTarget;s._updateOptions(this._convertToTargetOptions(g));a=s._place(a,{legacy:true});if(this._oRouter._oTargetHandler&&this._oRouter._oTargetHandler._chainNavigation){d=a;a=this._oRouter._oTargetHandler._chainNavigation(function(){return d})}}else{a=n._oTargets._display(p,c,this._oConfig.titleTarget,a)}return a.then(function(t){n._bMatchingProcessStarted=false;var i,a,r;if(Array.isArray(t)){i=t;t=i[0]}t=t||{};_=t.view;f=t.control;u.view=_;u.targetControl=f;if(i){a=[];r=[];i.forEach(function(e){a.push(e.view);r.push(e.control)});u.views=a;u.targetControls=r}if(g.callback){g.callback(this,o,g,f,_)}this.fireEvent("matched",u);n.fireRouteMatched(u);if(l){e.info("The route named '"+g.name+"' did match with its pattern",this);this.fireEvent("patternMatched",u);n.fireRoutePatternMatched(u)}return t}.bind(this))}}});