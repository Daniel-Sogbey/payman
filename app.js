require("dotenv").config();
const request = require("request");
const { v4: uuidv4 } = require("uuid");
const { initializePayment, verifyPayment } = require("./lib/mtn_momo_api")(
	request
);

var data = JSON.stringify({
	amount: "5.0",
	currency: "EUR",
	externalId: "24536475869708",
	payer: {
		partyIdType: "MSISDN",
		partyId: "2414901291"
	},
	payerMessage: "Pay for product",
	payeeNote: "Thanks"
});

let referenceId = uuidv4();

console.log(`Ref ${referenceId}`);

initializePayment(data, referenceId, (error, response, body) => {
	if (error) {
		console.log(`ERROR ${error}`);
	} else {
		console.log(`BODY ${body} : RESPONSE ${response.statusCode}`);
	}
});

verifyPayment(referenceId, (error, response, body) => {
	if (error) {
		console.log(`ERROR ${error}`);
	} else {
		console.log(`BODY ${body} : RESPONSE ${response.statusCode}`);
	}
});
