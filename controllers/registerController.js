import bcrypt from "bcrypt"
import Register from "../model/registerSchema.js"


export const handleNewRegister = async (req, res) => {
	const { email, password } = req.body;
	try {
		console.log(email, password)
		if (!email || !password) return res.status(400).json({ msg: "Email and Password required" });
		const userExist = await Register.findOne({ email: req.body.email })
		if (userExist) return res.status(409).json({ msg: "Email already exist." });
		const hashedPassword = await bcrypt.hash(password, 10)
		const newUser = await Register.create({email: email, password: hashedPassword});
		newUser.save();
		return res.status(201).json({msg: `New user "${newUser}" created.`});
	} catch (error) {
		console.log(error)
		return res.status(500).json({ msg: "Error while signing up" })
	}

}