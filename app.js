require("dotenv").config();
const express = require("express");
const request = require("request");
const { v4: uuidv4 } = require("uuid");
const { requestPayment, transactionStatus } = require("./lib/mtn_momo_api")(
	request
);
const auth = require("./src/middlewares/auth.js");

//open api routes
const initiatePayment = require("./apis/initiate_payment.js");
const verifyPayment = require("./apis/verify_payment.js");

//close api routes
const userRoutes = require("./src/routes/userRoutes.js");

const app = express();

app.use(express.json());

//open api routes
app.use("/api", auth, initiatePayment);
app.use("/api", verifyPayment);

//close api roues
app.use("/api/auth/users", userRoutes);

var data = JSON.stringify({
	amount: "5.0",
	currency: "EUR",
	externalId: "24536475869708",
	payer: {
		partyIdType: "MSISDN",
		partyId: "2414901291"
	},
	payerMessage: "Pay for product",
	payeeNote: "Thanks"
});

let referenceId = uuidv4();

// requestPayment(data, referenceId, (error, response, body) => {
// if (error) {
// console.log(`ERROR ${error}`);
// } else {
// console.log(`BODY ${body} : RESPONSE ${response.statusCode}`);
// }
// });

// transactionStatus(referenceId, (error, response, body) => {
// if (error) {
// console.log(`ERROR ${error}`);
// } else {
// console.log(`BODY ${body} : RESPONSE ${response.statusCode}`);
// }
// });

app.get("/", (req, res) => {
	res.status(200).send("Platform Status is 'Ok' ");
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on port ${port}`));
