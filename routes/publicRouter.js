import express from "express";
const publicRouter = express.Router();
import employeeController from "../controllers/employeeController.js"
import { handleNewRegister } from "../controllers/authController.js";

publicRouter.post("/register", handleNewRegister)

export default publicRouter;