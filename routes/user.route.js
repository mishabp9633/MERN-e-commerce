import express from "express";
import {
  getUserByToken,
} from "../controllers/user.controller.js";

import { authorizeRoles } from "../middlewares/auth.middleware.js";
import { ROLES } from "../constants/role.constants.js";

const router = express.Router();
const path = "/user";

//..............user..............//
router.get(`${path}/profile`, authorizeRoles([ROLES.USER]), getUserByToken)


export default router;
