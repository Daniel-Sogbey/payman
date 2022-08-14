const express = require("express")
const Payment = require("../services/models/paymentModel.js")

const router = express.Router()

router.get("/verify/:reference", async (req, res) => {
	const referenceId = req.params.reference
	console.log("HERE", referenceId)
	//TODOs :
	// 1. Retrieve referenceId from GET request URL
	// 2. Search database for payment INFO
	// 3. Send payment INFO to user
	try {
		const transactionInfo = await Payment.findOne({ referenceId })
		if (!transactionInfo) {
			res.status(400).json({
				error:
					"Invalid request from client. Make sure you are sending the right referenceId"
			})
			return
		}
		res.status(200).json({ transactionInfo })
	} catch (error) {
		res.status(500).json({ error: "Internal server error" })
	}
})

module.exports = router
