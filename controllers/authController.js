import bcrypt from "bcrypt"
import User from "../model/userSchema.js"
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();


export const handleNewRegister = async (req, res) => {
	const { email, password } = req.body;
	try {
		if (!email || !password) return res.status(400).json({ msg: "Email and Password required" });
		const userExist = await User.findOne({ email: req.body.email }).exec();
		if (userExist) return res.status(409).json({ msg: "Email already exist." }); // -> 409 conflict
		const hashedPassword = await bcrypt.hash(password, 10)
		const newUser = await User.create({ email: email, password: hashedPassword });
		return res.status(201).json({ msg: `New user "${newUser}" created.` });
	} catch (error) {
		console.log(error)
		return res.status(500).json({ msg: "Error while signing up" })
	}

}

export const handleLogin = async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(400).json({ msg: "Email and Password are required." })
	}
	try {
		const foundUser = await User.findOne({ email: email }).exec();
		if (!foundUser) return res.status(401).json({ msg: "Email not found" })
		const passwordMatch = await bcrypt.compare(password, foundUser.password)
		if (passwordMatch) {
			const role = Object.values(foundUser.role).filter(Boolean)
			const accessToken = jwt.sign(
				{ "email": foundUser.email },
				process.env.ACCESS_TOKEN_SECRET,
				{ expiresIn: "30s" }
			)
			const refreshToken = jwt.sign(
				{ "email": foundUser.email },
				process.env.REFRESH_TOKEN_SECRET,
				{ expiresIn: "1d" }
			)
			// Saving refreshToken with current user
			foundUser.refreshToken = refreshToken;
			foundUser.save();

			// Creates Secure Cookie with refresh token
			res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
			// Send authorization role and access token to user
			res.json({ role, accessToken });
		} else {
			return res.status(401).json(({ msg: "Incorrect password" }))
		}
	} catch (error) {
		res.status(500).json({ msg: "Internal server error" })
	}
}