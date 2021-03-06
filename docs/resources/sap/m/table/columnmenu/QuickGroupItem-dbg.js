/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

sap.ui.define([
	"./QuickActionItem"
], function (
	QuickActionItem
) {
	"use strict";

	/**
	 * Constructor for a new QuickGroupItem.
	 *
	 * @param {string} [sId] ID for the new QuickGroupItem, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new QuickGroupItem
	 *
	 * @class
	 * This element serves as a quick group item.
	 * It can be used to specify control- and application specific quick group items.
	 *
	 * @extends sap.m.table.columnmenu.QuickActionItem
	 *
	 * @author SAP SE
	 * @version 1.102.1
	 *
	 * @private
	 * @experimental
	 *
	 * @alias sap.m.table.columnmenu.QuickGroupItem
	 */
	var QuickGroupItem = QuickActionItem.extend("sap.m.table.columnmenu.QuickGroupItem", {
		metadata: {
			library: "sap.m",
			properties: {
				/**
				 * Specifies whether the respective column is grouped.
				 */
				grouped: { type: "boolean", defaultValue: false }
			}
		}
	});

	return QuickGroupItem;
});