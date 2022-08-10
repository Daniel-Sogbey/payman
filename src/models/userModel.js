const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
			validate(value) {
				if (!validator.isEmail(value)) {
					throw new Error("Email is invalid");
				}
			}
		},
		password: {
			type: String,
			required: true,
			minLength: 7,
			validate(value) {
				if (value.toLowerCase().contains("password")) {
					throw new Error(`Password cannot contain the word '${value}' `);
				}
			}
		},
		tokens: [
			{
				type: String,
				required: true
			}
		]
	},
	{
		timeStamps: true
	}
);

userSchema.pre("save", async function(next) {
	const user = this;

	if (user.isModified("password")) {
		user.password = await bcrypt.hash(user.password, 8);
	}
	next();
});

userSchema.methods.toJSON = function() {
	const user = this;

	const userObject = user.toObject();

	delete userObject.password;
	delete userObject.tokens;

	return userObject;
};

userSchema.methods.generateAuthToken = async function() {
	const user = this;

	const token = await jwt.sign(
		{ _id: user._id.toString() },
		process.env.JWT_SECRET_KEY
	);
	user.tokens = user.tokens.concat({ token });
	await user.save();
	return token;
};

userSchema.statics.findByCredentials = async ({ email, password }) => {
	const user = await User.findOne({ email });

	if (!user) {
		throw new Error("Unable to login");
	}

	const isMatch = await bcrypt.compare(password, user.password);

	if (!isMatch) {
		throw new Error("Unable to login ");
	}

	return user;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
