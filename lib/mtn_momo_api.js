//initialization and verification of payment with the MTN MOMO API
// require("dotenv").config()s
const mtnMomo = request => {
	const generateAccessToken = myCallback => {
		const options = {
			method: "POST",
			url: "https://sandbox.momodeveloper.mtn.com/collection/token/",
			headers: {
				"Ocp-Apim-Subscription-Key": "c2f6de2706d041d2951188376a359a5e",
				Authorization:
					"Basic NWZkYzY3YWItMDYxYy00YzUyLWFiOWEtNDNlYzU1ODM0YTg5OmIwOTFiYWIzZmNiMjQ4MDY4ZTU1ZjdiMDFjODYzZjUy"
			}
		}

		const callback = (error, response, body) => {
			return myCallback(error, response, body)
		}

		request(options, callback)
	}

	const requestPayment = (data, accessToken, referenceId, myCallback) => {
		let options = {
			method: "POST",
			url: "https://sandbox.momodeveloper.mtn.com/collection/v1_0/requesttopay",
			headers: {
				"X-Reference-Id": referenceId,
				"Ocp-Apim-Subscription-Key": process.env.PRIMARY_KEY,
				"X-Target-Environment": "sandbox",
				"Content-Type": "application/json",
				Authorization: `Bearer ${accessToken}`
			},
			body: data
		}

		const callback = (error, response, body) => {
			console.log(`RES ${response.statusCode} : ERROR :${error}`)

			return myCallback(error, response, body)
		}

		request.post(options, callback)
	}

	const transactionStatus = (ref, accessToken, myCallback) => {
		let options = {
			method: "GET",
			url: `https://sandbox.momodeveloper.mtn.com/collection/v1_0/requesttopay/${encodeURIComponent(
				ref
			)}`,
			headers: {
				"Ocp-Apim-Subscription-Key": process.env.PRIMARY_KEY,
				"X-Target-Environment": "sandbox",
				Authorization: `Bearer ${accessToken}`
			}
		}

		const callback = (error, response, body) => {
			return myCallback(error, response, body)
		}

		request(options, callback)
	}

	return { generateAccessToken, requestPayment, transactionStatus }
}

module.exports = mtnMomo
