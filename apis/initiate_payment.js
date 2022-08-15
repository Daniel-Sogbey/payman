const express = require("express")

const router = express.Router()

//TODO -> middleware to verify user
router.get("/initiate", (req, res) => {
	const { amount } = req.body

	if (!amount) {
		res.status(400).send("Provide an amount to continue with the request")
		return
	}

	//TODO -> send user a link to redirect to checkout page
	res.status(200).json({ data: "www.google.com" })
})

module.exports = router
