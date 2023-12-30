import express from "express";

import {
  getAllSubcategory,
  saveSubcategory,
} from "../controllers/subcategory.controller.js"

import { subcategoryValidator } from "../middlewares/subcategory.validator.js"
import { authorizeRoles } from "../middlewares/auth.middleware.js"
import { ROLES } from "../constants/role.constants.js";

const router = express.Router();
const path = "/subcategory";

// ..........admin............//
router.post(`${path}/new`,authorizeRoles([ROLES.USER]), subcategoryValidator, saveSubcategory);
router.get(`${path}/all`, authorizeRoles([ROLES.USER]), getAllSubcategory);

export default router;
