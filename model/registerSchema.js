import mongoose from "mongoose";


const registerSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},

})

const Register = mongoose.model('Register', registerSchema);

export default Register;