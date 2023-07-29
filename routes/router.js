import express from "express";
const router = express.Router();
import employeeController from "../controllers/employeeController.js"

router.route('/employee')
	.get(employeeController.getEmployees)
	.post(employeeController.createEmployee)
	.put(employeeController.updateEmployee)
	.delete(employeeController.deleteEmployee);

router.route('/employee:id')
	.get(employeeController.getEmployeeById);

export default router;