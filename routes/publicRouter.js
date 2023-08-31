import express from "express";
const publicRouter = express.Router();
import { handleSignin, handleSignout, handleNewRegister } from "../controllers/authController.js";
import { handleRefreshToken } from "../controllers/RefreshTokenController.js";

publicRouter.get("/refresh-token", handleRefreshToken)
publicRouter.post("/register", handleNewRegister)
publicRouter.post("/sign-in", handleSignin)
publicRouter.get("/sign-out", handleSignout)

export default publicRouter;