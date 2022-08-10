//initialization and verification of payment with the MTN MOMO API

const mtnMomo = request => {
	const accessToken = `Bearer ${process.env.ACCESS_TOKEN}`;

	const requestPayment = (data, referenceId, myCallback) => {
		let options = {
			method: "POST",
			url: "https://sandbox.momodeveloper.mtn.com/collection/v1_0/requesttopay",
			headers: {
				"X-Reference-Id": referenceId,
				"Ocp-Apim-Subscription-Key": process.env.PRIMARY_KEY,
				"X-Target-Environment": "sandbox",
				"Content-Type": "application/json",
				Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
			},
			body: data
		};

		const callback = (error, response, body) => {
			console.log(`RES ${response.statusCode}`);

			return myCallback(error, response, body);
		};

		request.post(options, callback);
	};

	const transactionStatus = (ref, myCallback) => {
		let options = {
			method: "GET",
			url: `https://sandbox.momodeveloper.mtn.com/collection/v1_0/requesttopay/${encodeURIComponent(
				ref
			)}`,
			headers: {
				"Ocp-Apim-Subscription-Key": process.env.PRIMARY_KEY,
				"X-Target-Environment": "sandbox",
				Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
			}
		};

		const callback = (error, response, body) => {
			return myCallback(error, response, body);
		};

		request(options, callback);
	};

	return { requestPayment, transactionStatus };
};

module.exports = mtnMomo;
