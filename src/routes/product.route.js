import { 
     getAllProduct, 
     getSingleProduct,
     createProduct,
     productRating
    } from '../controllers/product.controller.js'

import express from 'express'

import { authorizeRoles } from "../middlewares/auth.middleware.js"
import { ROLES } from "../constants/role.constants.js"
import { upload } from '../utils/multer.util.js'
import { productValidator } from '../middlewares/product.middleware.js'

const router = express.Router()
const path = "/product"
const cpUpload = upload.fields([{ name: 'profile', maxCount: 1 }, { name: 'product', maxCount: 4 }])

router.get(`${path}/all`,authorizeRoles([ROLES.USER]), getAllProduct)
router.post(`${path}/create`, cpUpload, authorizeRoles([ROLES.USER]), productValidator, createProduct)
router.post(`${path}/rating/:id`, authorizeRoles([ROLES.USER]), productRating)
router.get(`${path}/single/:id`, getSingleProduct)

export default router

