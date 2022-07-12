/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(function(){"use strict";var i=function(){};i.mergeSections=function(i,e){var t=[];for(var r=0;r<i.length;r++){var n=i[r];var s=n.startIndex+n.length;var a=e.startIndex+e.length;if(e.startIndex<=s&&a>=s&&e.startIndex>=n.startIndex){e.startIndex=n.startIndex;e.length=a-n.startIndex}else if(e.startIndex<=n.startIndex&&a>=n.startIndex&&a<=s){e.length=s-e.startIndex}else if(e.startIndex>=n.startIndex&&a<=s){e.startIndex=n.startIndex;e.length=n.length}else if(a<n.startIndex||e.startIndex>s){t.push(n)}}t.push(e);return t};i._determineRequestDelta=function(i,e){var t=i.iSkip+i.iTop;var r=e.iSkip+e.iTop;if(i.iSkip===e.iSkip&&i.iTop===e.iTop){return false}else if(i.iSkip<e.iSkip&&t>e.iSkip&&t<=r){i.iTop=e.iSkip-i.iSkip;if(i.iThreshold){i.iTop=i.iTop+i.iThreshold;i.iSkip=Math.max(0,i.iSkip-i.iThreshold);i.iThreshold=0}}else if(i.iSkip<r&&t>r&&i.iSkip>=e.iSkip){i.iSkip=r;i.iTop=t-i.iSkip;if(i.iThreshold){i.iTop+=i.iThreshold;i.iThreshold=0}}else if(i.iSkip>=e.iSkip&&t<=r){return false}else if(i.iSkip<=e.iSkip&&t>=r){e.oRequestHandle.abort()}else if(t<=e.iSkip||i.iSkip>=r){}return undefined};return i});