const express = require("express");
const router = express.Router();

router.post("/verify/:ref", async (req, res) => {
	const referenceId = req.params.ref;
	console.log(referenceId);

	try {
	} catch (error) {}
});

module.exports = router;
