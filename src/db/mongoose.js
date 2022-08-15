const mongoose = require("mongoose")

const url = process.env.MONGODB_URL

mongoose
	.connect(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => console.log("mongodb connected successfully"))
	.catch(e => console.log(e))
