import express from "express";
import {
  signIn,
  logoutUser,
} from "../controllers/auth.controller.js";
import { loginValidator } from "../middlewares/login.validation.middleware.js";


const router = express.Router();
const path = "/auth";

//........user login and log out...........//
router.post(`${path}/user-signin`, loginValidator, signIn);
router.post(`${path}/user-logout`, logoutUser);


export default router;
