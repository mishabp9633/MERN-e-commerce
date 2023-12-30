import express from "express"

import { getAllCategory,
         saveCategory,
 } from "../controllers/category.controller.js"

import { authorizeRoles } from "../middlewares/auth.middleware.js"
import { ROLES } from "../constants/role.constants.js"
import { categoryValidator } from "../middlewares/category.validator.js"


const router = express.Router()
const path = "/category"

router.post(`${path}/new`, authorizeRoles([ROLES.USER]), categoryValidator, saveCategory);
router.get(`${path}/all`,authorizeRoles([ROLES.USER]),getAllCategory)

export default router