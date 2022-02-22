sap.ui.define(["sap/ui/core/mvc/Controller",
	"com_msh_int/INT_DEMO_REG_1/util/Helper",
	"sap/m/MessageBox"
], function (Controller, Helper, MessageBox) {
	"use strict";
	return Controller.extend("com_msh_int.INT_DEMO_REG_1.controller.Start", {
		Helper: Helper,
		onInit: function () {
			Helper.setState(true);
		},
		/**
		 *@memberOf com_msh_int.INT_DEMO_REG_1.controller.Start
		 */
		_check_mail_input: function (oEvent) {
			//Eingabewert lesen
			var mail = oEvent.getSource().getValue();
			var mailregex = /^\w+[\w-+\.]*\@\w+([-\.]\w+)*\.[a-zA-Z]{2,}$/;
			if (!mail.match(mailregex)) {
				//alert("Invalid Email");
				oEvent.getSource().setValueState("Error");
				oEvent.getSource().setValueStateText("E-Mail nicht valide");
				Helper.setState(false);
			} else {
				if (mail.includes("@msh.de") || mail.includes("@mppglobal.com")) {
					oEvent.getSource().setValueState("None");
					Helper.setState(true);
				} else {
					oEvent.getSource().setValueStateText("E-Mail Domain nicht zulässig");
					oEvent.getSource().setValueState("Error");
					Helper.setState(false);
				}
			}
		},
		/**
		 *@memberOf com_msh_int.INT_DEMO_REG_1.controller.Start
		 */
		register: function (oEvent) {
			//This code was generated by the layout editor.
			var isallowed = Helper.getState();
			if (isallowed === true) {
				//JSON-Model
				var oModel = new sap.ui.model.json.JSONModel({});
				//Wert der Mailadresse setzen
				oModel.setProperty("/mailreceiver", this.getView().byId("regmail").getValue());
				//Daten lesen
				var cdata = oModel.getData();
				//AJAX-Call
				jQuery.ajax({
					url: "/ucreg/zmshzug",
					data: JSON.stringify(cdata),
					contentType: "application/json",
					type: "POST",
					success: function (odata) {
						MessageBox.information("Die E-Mail mit Zugangsdaten wurde versandt");
					},
					error: function (odata) {
						MessageBox.information("Die E-Mail mit Zugangsdaten wurde NICHT versandt");
					}
				});
			}
		}
	});
});