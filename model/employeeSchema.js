import mongoose from "mongoose";


const employeeSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
	},
	laseName: {
		type: String,
		required: true,
	},

})

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;