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
		return res.status(201).json({ msg: `New user created.`, user: newUser });
	} catch (error) {
		console.log(error)
		return res.status(500).json({ msg: "Error while signing up" })
	}

}

export const handleSignin = async (req, res) => {
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
			res.status(200).json({ role, accessToken, user: foundUser.email });
		} else {
			return res.status(401).json(({ msg: "Incorrect password" }))
		}
	} catch (error) {
		res.status(500).json({ msg: "Internal server error" })
	}
}

export const handleSignout = async (req, res) => {
	// On client, also delete the accessToken

	const cookies = req.cookies;
	if (!cookies?.jwt) return res.sendStatus(204); //No content
	const refreshToken = cookies.jwt;

	// Is refreshToken in db?
	const foundUser = await User.findOne({ refreshToken }).exec();
	if (!foundUser) {
		res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
		return res.sendStatus(204);
	}

	// Delete refreshToken in db
	foundUser.refreshToken = '';
	const result = await foundUser.save();
	console.log(result);

	res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
	res.sendStatus(204);
}