const mongoose = require("mongoose")

const paymentSchema = mongoose.Schema({
	referenceId: {
		type: String,
		required: true
	},
	financialTransactionId: {
		type: String,
		required: true
	},
	externalId: {
		type: String,
		required: true
	},
	currency: {
		type: String,
		required: true
	},
	amount: {
		type: Number,
		required: true
	},
	phoneNumber: {
		type: String,
		required: true
	},
	paymentMethod: {
		type: String,
		required: true
	},
	status: {
		type: String,
		required: true
	}
})

//response from MTN when verify transaction is successful;

// {
// "financialTransactionId": "477245270",
// "externalId": "24536475869708",
// "amount": "5",
// "currency": "EUR",
// "payer": {
// "partyIdType": "MSISDN",
// "partyId": "2414901291"
// },
// "payerMessage": "Pay for product",
// "payeeNote": "Thanks",
// "status": "SUCCESSFUL"
// }

const Payment = mongoose.model("Payment", paymentSchema)

module.exports = Payment
