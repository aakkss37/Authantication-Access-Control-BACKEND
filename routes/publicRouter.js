import express from "express";
const publicRouter = express.Router();
import { handleLogin, handleNewRegister } from "../controllers/authController.js";

publicRouter.post("/register", handleNewRegister)
publicRouter.post("/login", handleLogin)

export default publicRouter;