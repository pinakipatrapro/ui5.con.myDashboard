/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/ManagedObject","sap/ui/test/_OpaLogger","sap/ui/thirdparty/jquery","sap/ui/test/selectors/_ControlSelectorValidator","sap/ui/test/selectors/_selectors"],function(e,t,n,r,o){"use strict";var i=e.extend("sap.ui.test.selectors._ControlSelectorGenerator");var a=t.getLogger("sap.ui.test.selectors._ControlSelectorGenerator");i._generate=function(e){var t=i._getOrderedGenerators(e.settings);var n=e.includeAll?i._executeAllPlainGenerators(t,e):i._executeTopPlainGenerator(t,e);return n.catch(function(t){if(e.shallow){return Promise.reject(t)}else{return i._generateHierarchicalUp(e).catch(function(){return i._generateHierarchicalDown(e)}).catch(function(){return i._generateWithSibling(e)}).then(function(e){return e})}})};var l=20;var u=10;i.setParams=function(e){if(e.maxDepth&&Number.isInteger(e.maxDepth)&&e.maxDepth>0){i._maxDepth=e.maxDepth}if(e.maxWidth&&Number.isInteger(e.maxWidth)&&e.maxWidth>0){i._maxWidth=e.maxWidth}};i.resetParams=function(e){i._maxDepth=l;i._maxWidth=u};i.resetParams();i._executeAllPlainGenerators=function(e,t){return Promise.all(e.map(function(e){return i._executeGenerator(e,t)})).then(function(e){e=e.filter(function(e){return e&&!n.isEmptyObject(e)&&(!Array.isArray(e)||e.length)});if(e.length){a.debug("The matching "+(t.multiple?"non-unique":"unique")+" selectors are: "+JSON.stringify(e));return e}else{return Promise.reject(new Error("Could not generate a selector for control "+t.control))}})};i._executeTopPlainGenerator=function(e,t,n){n=n||0;if(n===e.length){return Promise.reject(new Error("Could not generate a selector for control "+t.control))}return i._executeGenerator(e[n],t).then(function(r){if(r.length){a.debug("The top priority "+(t.multiple?"non-unique":"unique")+" selector is: "+JSON.stringify(r[0]));return r[0]}else{return i._executeTopPlainGenerator(e,t,n+1)}})};i._executeGenerator=function(e,t){var n={};return i._getValidationRootSelector(e,t).then(function(r){n.relative=r;return i._getAncestorSelector(e,t)}).then(function(r){n.ancestor=r;var o=e.generate(t.control,n);return i._filterUnique(o,t)})};i._getValidationRootSelector=function(e,t){t=t||{};return new Promise(function(n,r){if(t.shallow||!e._isValidationRootRequired()){n(null)}else{var o=e._getValidationRoot(t.control);if(o){i._generateUniqueSelectorInSubtree(t.control,o).then(function(e){n(e)}).catch(function(e){r(e)})}else{n(null)}}})};i._getAncestorSelector=function(e,t){t=t||{};return new Promise(function(n,r){if(t.shallow||!e._isAncestorRequired()){n(null)}else{var o=e._getAncestor(t.control);if(o){i._generate({control:o}).then(function(e){n(e)}).catch(function(e){a.debug("Could not generate selector for ancestor "+o+". Error: "+e);n(null)})}else{n(null)}}})};i._generateHierarchicalUp=function(e){return i._generateUniqueAncestorSelector(e.control).then(function(t){return i._generateUniqueSelectorInSubtree(e.control,t.ancestor).then(function(e){return n.extend({},e,{ancestor:t.selector})}).then(i._filterUniqueHierarchical(e))})};i._generateHierarchicalDown=function(e){return i._generate({control:e.control,shallow:true,multiple:true}).then(function(t){return i._generateUniqueDescendantSelector(e.control).then(function(e){return n.extend({},t,{descendant:e})}).then(i._filterUniqueHierarchical(e))})};i._generateWithSibling=function(e){return i._generate({control:e.control,shallow:true,multiple:true}).then(function(t){return i._generateSelectorWithUniqueSibling(e,t)})};i._generateUniqueDescendantSelector=function(e,t){return new Promise(function(n,r){t=t||0;if(t>=i._maxDepth){r(new Error("Could not generate selector for descendant of "+e+". Exceeded limit of "+i._maxDepth+" levels"))}else{var o=i._getAggregatedControls(e.mAggregations);i._generateUniqueSelectorForChild(o).then(function(e){n(e)}).catch(function(){return i._callGenerateUniqueDescendant(o,t+1).then(function(e){n(e)}).catch(function(e){r(e)})})}})};i._callGenerateUniqueDescendant=function(e,t,n){n=n||0;if(n>=e.length){return Promise.reject(new Error("Could not generate unique selector for descendant at level "+t))}return i._generateUniqueDescendantSelector(e[n],t).catch(function(){return i._callGenerateUniqueDescendant(e,t,n+1)})};i._generateUniqueSelectorForChild=function(e,t){t=t||0;if(t>=e.length){return Promise.reject()}return i._generate({control:e[t],shallow:true}).then(function(e){return e}).catch(function(n){return i._generateUniqueSelectorForChild(e,t+1)})};i._generateUniqueAncestorSelector=function(e,t,n){t=t||e.getParent();n=n||0;var r=n>=i._maxDepth;if(!t||r){return Promise.reject(new Error("Could not generate unique selector for ancestor of "+e+(r?". Exceeded limit of "+i._maxDepth+" levels":"")))}return i._generate({control:t,shallow:true}).then(function(e){return{ancestor:t,selector:e}}).catch(function(r){a.debug("Could not generate selector for ancestor "+t+". Error: "+r);return i._generateUniqueAncestorSelector(e,t.getParent(),n+1)})};i._generateUniqueSelectorInSubtree=function(e,t){return i._generate({control:e,validationRoot:t,shallow:true})};i._generateSelectorWithUniqueSibling=function(e,t){return new Promise(function(n,r){var o;var l=-1;var u=function(){o=o&&o.getParent()||e.control.getParent();l+=1;if(o&&l<i._maxDepth){var c=[];var s=i._getAggregatedControls(o.mAggregations);s.forEach(function(t){if(t!==e.control){c.push(t);c=c.concat(i._getAggregatedControls(t.mAggregations))}});a.debug("Found "+c.length+" siblings at level "+l+" with ancestor "+o);return i._generateSelectorWithUniqueSiblingAtLevel({options:e,targetMultiSelector:t,level:{siblings:c,number:l,width:i._maxWidth}}).then(function(e){n(e)}).catch(function(){return u()})}else{r(new Error("Could not generate unique sibling selector at level "+l))}};u()})};i._generateSelectorWithUniqueSiblingAtLevel=function(e){e.index=e.index||0;if(e.index>=e.level.width||e.index>=e.level.siblings.length){return Promise.reject(new Error("Could not generate unique selector for the first "+e.index+" siblings"))}return i._generate({control:e.level.siblings[e.index],shallow:true}).then(function(t){var r=n.extend({},e.targetMultiSelector,{sibling:[t,{level:e.level.number}]});return i._filterUniqueHierarchical(e.options)(r)}).catch(function(){return i._generateSelectorWithUniqueSiblingAtLevel(n.extend(e,{index:e.index+1}))})};i._getAggregatedControls=function(e){var t=[];for(var n in e){var r=e[n];if(Array.isArray(r)){t=t.concat(r.slice(0,i._maxWidth))}else if(r){t.push(r)}}t=t.filter(function(e){return e.getMetadata&&e.getMetadata().getName()&&e.$().length});return t};i._filterUnique=function(e,t){t=t||{};var n=[];var o=new r(t.validationRoot,t.multiple);if(Array.isArray(e)){e.forEach(function(e){if(Array.isArray(e)){e.forEach(function(e){if(o._validate(e)){n.push(e)}})}else if(o._validate(e)){n.push(e)}})}else if(o._validate(e)){n.push(e)}return n};i._filterUniqueHierarchical=function(e){return function(t){a.debug("Found hierarchical selector '"+JSON.stringify(t)+"'. Checking for uniqueness");var n=i._filterUnique(t,e);if(n.length){a.debug("The matching unique selectors are: "+JSON.stringify(n));return Promise.resolve(n[0])}else{return Promise.reject(new Error("Could not generate a selector for control "+e.control))}}};i._getOrderedGenerators=function(e){var t=["globalID","viewID","labelFor","bindingPath","properties","dropdownItem","tableRowItem","controlType"];if(e&&e.preferViewId){var n=t[0];t[0]=t[1];t[1]=n}return t.map(function(e){return o[e]})};return i});