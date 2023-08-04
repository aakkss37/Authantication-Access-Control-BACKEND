import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
	},
	laseName: {
		type: String,
		required: true,
	},

})

const User = mongoose.model('User', userSchema);

export default User;