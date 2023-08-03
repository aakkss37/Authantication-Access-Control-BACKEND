import express from "express";
const privateRouter = express.Router();
import employeeController from "../controllers/employeeController.js"

privateRouter.route('/employee')
	.get(employeeController.getEmployees)
	.post(employeeController.createEmployee)
	.put(employeeController.updateEmployee)
	.delete(employeeController.deleteEmployee);

privateRouter.route('/employee:id')
	.get(employeeController.getEmployeeById);

export default privateRouter;