const express = require("express")
const router = express.Router()

router.get("/verify", async (req, res) => {
	const referenceId = req.query.reference
	console.log("HERE", referenceId)
	//TODOs :
	// 1. Retrieve referenceId from GET request URL
	// 2. Search database for payment INFO
	// 3. Send payment INFO to user
	try {
	} catch (error) {}
})

module.exports = router
