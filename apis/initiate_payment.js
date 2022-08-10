const express = require("express");

const router = express.Router();

// TODO -> middleware to verify user

router.get("/initiate", (req, res) => {
	const { amount } = req.body;

	if (!amount) {
		res.status(400).send("Provide an amount to continue with the request");
		return;
	}

	res
		.status(200)
		.json({ checkoutUrl: "https://www.google.com", amount: amount });
});

module.exports = router;
