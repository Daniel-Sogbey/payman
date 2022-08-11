const request = require("request")
const Payment = require("../models/paymentModel.js")
const { v4: uuidv4 } = require("uuid")
const {
	requestPayment,
	transactionStatus
} = require("../../lib/mtn_momo_api.js")(request)

const acceptPayment = async (req, res) => {
	const { amount, phoneNumber, paymentMethod, currency } = req.body

	console.log(req.body, "Body here")

	let referenceId = uuidv4()

	const data = JSON.stringify({
		amount: "5.0",
		currency: "EUR",
		externalId: "24536475869708",
		payer: {
			partyIdType: "MSISDN",
			partyId: "2414901291"
		},
		payerMessage: "Pay for product",
		payeeNote: "Thanks"
	})

	console.log(data, "Data here")
	console.log(referenceId, "Reference Id")
	console.log(`SUBS KEY ${process.env.PRIMARY_KEY}`)

	requestPayment(data, referenceId, (error, response, body) => {
		if (error) {
			console.log(`ERROR ${error}`)
		} else {
			console.log(`BODY : ${body} : RESPONSE REQUEST : ${response.statusCode}`)
			if (response.statusCode === 202) {
				transactionStatus(referenceId, (error, response, body) => {
					if (error) {
						console.log(`ERROR ${error}`)
					} else {
						console.log(`BODY ${body} : RESPONSE VERIFY ${response.statusCode}`)

						if (response.statusCode === 200) {
							console.log(`SUCCESS ${response.body}`)
						}
					}
				})
			}
		}
	})
}

module.exports = acceptPayment
