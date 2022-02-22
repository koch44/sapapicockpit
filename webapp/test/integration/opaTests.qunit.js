/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"com_msh_int/INT_DEMO_REG_1/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});