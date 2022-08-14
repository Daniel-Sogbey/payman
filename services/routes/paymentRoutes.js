const express = require("express")
const acceptPayment = require("../controllers/paymentController.js")

const router = express.Router()

router.post("/accept-payment", acceptPayment)

module.exports = router
