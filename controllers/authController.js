import bcrypt from "bcrypt"
import User from "../model/userSchema.js"


export const handleNewRegister = async (req, res) => {
	const { email, password } = req.body;
	try {
		if (!email || !password) return res.status(400).json({ msg: "Email and Password required" });
		const userExist = await User.findOne({ email: req.body.email })
		if (userExist) return res.status(409).json({ msg: "Email already exist." });
		const hashedPassword = await bcrypt.hash(password, 10)
		const newUser = await User.create({ email: email, password: hashedPassword });
		newUser.save();
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
		const foundUser = await User.findOne({ email: email })
		if(!foundUser) return res.status(401).json({msg: "Email not found"})
		const passwordMatch = await bcrypt.compare(password, foundUser.password)
		if(passwordMatch){
			return res.status(200).json({user: foundUser})
		}else{
			return res.status(401).json(({msg: "Incorrect password"}))
		}
	} catch (error) {
		res.status(500).json({msg: "Internal server error"})
	}
}