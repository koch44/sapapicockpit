sap.ui.define([], function () {
	"use strict";
	var regstate;
	return {
		//Variable zum Check
		setState: function (value) {
			regstate = value;
		},
		getState: function(){ return regstate; }
	};
});