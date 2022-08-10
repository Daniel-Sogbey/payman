const User = require("../models/userModel.js");

const signup = async (req, res) => {
	const user = new User(req.body);

	try {
		const token = await User.generateAuthToken();
		await user.save();
		res.status(201).json({ user, token });
	} catch (error) {
		res.status(400).json({ error });
	}
};

const login = async (req, res) => {};

module.exports = { signup, login };
