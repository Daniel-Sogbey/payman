const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema({
	amount: {
		type: Number,
		required: true
	},
	paymentMethod: {
		type: String,
		required: true
	}
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
