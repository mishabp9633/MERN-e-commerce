import { 
    getAllUserWishList, 
    createWhishList,
    } from '../controllers/wishList.controller.js'

import express from 'express'

import { authorizeRoles } from "../middlewares/auth.middleware.js"
import { ROLES } from "../constants/role.constants.js"

const router = express.Router()
const path = "/wishList"

router.get(`${path}/all`,authorizeRoles([ROLES.USER]), getAllUserWishList)
router.post(`${path}/new`, authorizeRoles([ROLES.USER]), createWhishList)


export default router

