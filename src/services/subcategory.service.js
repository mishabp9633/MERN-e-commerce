import subcategoryModel from '../models/subcategory.model.js'
import { HttpException } from "../exceptions/exceptions.js";
import lodash from 'lodash';
import { findcategoryData } from './category.service.js';
const { toNumber } = lodash


export async function save(data){
   const subcategory = await subcategoryModel.create({...data})
   return {subcategory}
}

export async function getAll(categoryId, page, limit){
   let queryData = {}

   if (categoryId){
      queryData["categoryId"]= categoryId
    }
    const subcategory = await subcategoryModel.find(queryData)
    .skip((toNumber(page) - 1) * toNumber(limit))
    .limit(toNumber(limit))
    .populate('categoryId',"categoryName")
    const total = await subcategoryModel.find().countDocuments()

    return{subcategory, total}
 }

//....for finding category using subcategory id to the product service...//
export async function findSubcategory(subcategoryId){
   const subcategory = await subcategoryModel.findOne({_id: subcategoryId})
   if(!subcategory) throw new HttpException(404, "subcategory not found")
   const category = await findcategoryData(subcategory.categoryId)

   return category
}
