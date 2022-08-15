/** Property of PayMan 
Author : Daniel Sogbey
Start Date : 6th August, 2022
**/

require("dotenv").config()
require("./src/db/mongoose.js")
const express = require("express")
// const request = require("request")
const auth = require("./src/middlewares/auth.js")
// const { v4: uuidv4 } = require("uuid")
// const { requestPayment, transactionStatus } = require("./lib/mtn_momo_api.js")(
// request
// )

//open api routes
const initiatePayment = require("./apis/initiate_payment.js")
const verifyPayment = require("./apis/verify_payment.js")

//close api routes
const userRoutes = require("./src/routes/userRoutes.js")
const paymentRoutes = require("./services/routes/paymentRoutes.js")

const app = express()

app.use(express.json())

//close api roues
app.use("/api/auth/users", userRoutes)

//Customer api routes
app.use("/api/services", paymentRoutes)

//open api routes
app.use("/api/payment", initiatePayment)
app.use("/api/payment", verifyPayment)

// var data = JSON.stringify({
// amount: "10",
// currency: "EUR",
// externalId: "321432131234",
// payer: {
// partyIdType: "MSISDN",
// partyId: "247502253"
// },
// payerMessage: "PAY FOR THE PRODUCT",
// payeeNote: "Thanks"
// })

// let referenceId = uuidv4()
// requestPayment(data, referenceId, (error, response, body) => {
// if (error) {
// console.log(`ERROR ${error}`)
// } else {
// console.log(`BODY : ${body} : RESPONSE ${response.statusCode}`)
// }
// })

// transactionStatus(referenceId, (error, response, body) => {
// if (error) {
// console.log(`ERROR ${error}`)
// } else {
// console.log(`BODY : ${body} : RESPONSE ${response.statusCode}`)
// }
// })

app.get("/", (req, res) => {
	res.status(200).send("Platform Status is 'Ok' ")
})

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Server running on port ${port}`))
