const mongoose = require("mongoose")

const url = `mongodb+srv://DanielSogbey:${process.env
	.MONGODB_PASSWORD}@cluster0.kvkui.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(
	url,
	{
		useNewUrlParser: true
	},
	() => console.log("database connected successfully")
)
