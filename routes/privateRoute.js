import express from "express";
const privateRouter = express.Router();
import employeeController from "../controllers/employeeController.js"
import verifyRoles from "../middleware/verifyRole.js";
import { ROLES_LIST } from "../config/roleList.js";
import userController from "../controllers/userController.js";

privateRouter.route('/employee')
	.get(employeeController.getAllEmployees)
	.post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employeeController.createNewEmployee)
	.put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employeeController.updateEmployee)
	.delete(verifyRoles(ROLES_LIST.Admin), employeeController.deleteEmployee);

privateRouter.route('/employee:id')
	.get(employeeController.getEmployeeByID);

privateRouter.route("/user")
	.get(verifyRoles(ROLES_LIST.Admin), userController.getAllUsers)
	.delete(verifyRoles(ROLES_LIST.Admin), userController.deleteUser)
privateRouter.route("/user:id")
	.get(verifyRoles(ROLES_LIST.Admin), userController.getUserByID)
	
export default privateRouter;