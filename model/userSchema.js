import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		User: {type: Number, default: 2001},
		Editor: Number,
		Admin: Number,
	},
	refreshToken: String,
})

const User = mongoose.model('User', userSchema);

export default User;