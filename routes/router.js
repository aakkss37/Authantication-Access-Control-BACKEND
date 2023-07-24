import express from "express";
const router = express.Router();
// import path from "path"
// const __dirname = path.resolve();
import employeeController from "../controllers/employeeController.js"

// router.get('^/$|/subdir/index(.html)?', (req, res) => {
// 	res.sendFile(path.join(__dirname, 'view', 'subdir', 'index.html'));
// });

// router.get('/subdir/test(.html)?', (req, res) => {
// 	res.sendFile(path.join(__dirname, 'view', 'subdir', 'test.html'));
// });

// router.get('^/$|/index(.html)', (req, res) => {
// 	res.sendFile(path.join(__dirname, 'view', 'index.html'));
// });


router.route('/employee')
	.get(employeeController.getEmployees)
	.post(employeeController.createEmployee)
	.put(employeeController.updateEmployee)
	.delete(employeeController.deleteEmployee);

router.route('/employee:id')
	.get(employeeController.getEmployeeById);

export default router;