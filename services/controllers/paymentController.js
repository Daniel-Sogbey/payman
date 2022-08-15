const request = require("request")
const { v4: uuidv4 } = require("uuid")
const Payment = require("../models/paymentModel.js")
const {
	generateAccessToken,
	requestPayment,
	transactionStatus
} = require("../../lib/mtn_momo_api.js")(request)

const acceptPayment = async (req, res) => {
	const { amount, phoneNumber, paymentMethod, currency } = req.body

	console.log(req.body, "Body here")

	let referenceId = uuidv4()

	const data = JSON.stringify({
		amount: amount,
		currency: currency,
		externalId: "24536475869708",
		payer: {
			partyIdType: "MSISDN",
			partyId: phoneNumber
		},
		payerMessage: "Pay for product",
		payeeNote: "Thanks"
	})

	console.log(data, "Data here")
	console.log(referenceId, "Reference Id")
	console.log(`SUBS KEY ${process.env.PRIMARY_KEY}`)

	generateAccessToken((error, response, body) => {
		if (error) {
			console.log("ERROR", error)
		} else {
			console.log("RESPONSE", JSON.parse(response.body).access_token)
			const accessToken = JSON.parse(response.body).access_token
			requestPayment(
				data,
				accessToken,
				referenceId,
				(error, response, body) => {
					if (error) {
						console.log(`ERROR 1 ${error}`)
					} else {
						console.log(
							`BODY : ${body} : RESPONSE REQUEST : ${response.statusCode}`
						)
						if (response.statusCode === 401) {
							res.status(500).json({ error: "Internal server error" })
							return
						}
						if (response.statusCode === 202) {
							console.log(`SUCCESS 202 1 ${response.body}`)
							transactionStatus(
								referenceId,
								accessToken,
								(error, response, body) => {
									if (error) {
										console.log(`ERROR 2 ${error}`)
									} else {
										console.log(
											`BODY ${body} : RESPONSE VERIFY ${response.statusCode}`
										)
										if (response.statusCode === 200) {
											console.log(
												`SUCCESS 200 2 ${JSON.parse(response.body).amount}`
											)
											let receivedResponse = JSON.parse(response.body)

											console.log(
												`RECEIVED RESPONSE ${receivedResponse.financialTransactionId}`
											)

											console.log("DATA ", {
												referenceId: referenceId,
												financialTransactionId:
													receivedResponse.financialTransactionId,
												externalId: receivedResponse.externalId,
												currency: receivedResponse.currency,
												amount: receivedResponse.amount,
												phoneNumber: phoneNumber,
												paymentMethod: paymentMethod,
												status: receivedResponse.status
											})

											new Payment({
												referenceId: referenceId,
												financialTransactionId:
													receivedResponse.financialTransactionId,
												externalId: receivedResponse.externalId,
												currency: receivedResponse.currency,
												amount: receivedResponse.amount,
												phoneNumber: phoneNumber,
												paymentMethod: paymentMethod,
												status: receivedResponse.status
											})
												.save()
												.then(transaction => {
													res.status(200).json({ transaction })
												})
										}
									}
								}
							)
						}
					}
				}
			)
		}
	})
}

module.exports = acceptPayment
