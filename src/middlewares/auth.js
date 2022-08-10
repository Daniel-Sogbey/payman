const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");

const auth = async (req, res, next) => {
	try {
		const token = req.header("Authorization").replace("Bearer ", "");
		const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
		const user = await User.findOne({ _id: decode._id, "tokens.token": token });

		if (!user) {
			throw new Error();
		}

		req.user = user;
		req.token = token;
		next();
	} catch (error) {
		res.status(401).json({ error: "Please login to continue" });
	}
};

module.exports = auth;
