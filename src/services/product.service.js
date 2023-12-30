import productModel from "../models/product.model.js"
import {HttpException} from '../exceptions/exceptions.js';
import { v4 as uuidv4 } from 'uuid';
import lodash from 'lodash';
import { findcategory } from "./subcategory.service.js";
const { toNumber } = lodash


export async function saveProduct(productData, files){
   const productImages = [];

   for (const fileType in files) {
      if (Object.prototype.hasOwnProperty.call(files, fileType)) {
         const fileList = files[fileType]; // Get the array of files for the current type

         for (const file of fileList) {
            let url = `http://localhost:4000/uploads/products/${file.filename}`;
            let public_id = `product/${uuidv4().split('-')[0]}`;

            let productImage = {
               public_id: public_id,
               url: url
            };
            productImages.push(productImage); // Store each processed file
         }
      }
   }
    if(!productData.totalProductCount) {
      productData.totalPrice = productData.price
    }else{
      productData.totalPrice = productData.price * productData.totalProductCount
    }

    const categoryId = await findcategory(productData.subcategoryId)
    const product = await productModel.create({...productData, productImages, categoryId})
    return {product}
}

export async function ratingProduct(productId, productRating){
   const product = await productModel.findOne({_id: productId})
   if(!product) throw new HttpException(404, "product not found")
   product.rating = productRating.rating
   await product.save({validateBeforeSave: false})
   return {product}
}

export async function getAll(page,limit,query){

    const product = await productModel.find({
      $or:[
         {title : { $regex: query?.search ? query?.search : '', $options: 'i' }}, 
       ]
    }   
    )
    .limit(toNumber(limit))
    .skip((toNumber(page ? page : 1) - 1) * toNumber(limit))
    .populate("categoryId","categoryName")
    .populate("subcategoryId","subcategoryName")
    .sort({createdAt:-1})

    const total = await productModel.find().countDocuments()
    return{product,total}
 }

 export async function findSingleProduct(id){
   const product = await productModel.findById(id)
   .populate("categoryId","categoryName")
   .populate("subcategoryId","subcategoryName")
   if(!product) throw new HttpException(404, "product not found")
   return{product}
}




