import express from "express";
const publicRouter = express.Router();
import { handleLogin, handleLogout, handleNewRegister } from "../controllers/authController.js";
import { handleRefreshToken } from "../controllers/RefreshTokenController.js";

publicRouter.get("/refresh-token", handleRefreshToken)
publicRouter.post("/register", handleNewRegister)
publicRouter.post("/login", handleLogin)
publicRouter.get("/logout", handleLogout)

export default publicRouter;