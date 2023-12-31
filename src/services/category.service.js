import categoryModel from '../models/category.model.js'
import { HttpException } from "../exceptions/exceptions.js";
import lodash from 'lodash';
const { toNumber } = lodash


export async function save(data){
   const category = await categoryModel.create({...data})
   return{category}
}

export async function getAll(page, limit){
    const category = await categoryModel.find()
    .skip((toNumber(page) - 1) * toNumber(limit))
    .limit(toNumber(limit))
    const total = await categoryModel.find().countDocuments()
    return{category,total }
 }

 //....for finding category using category id to the product service...//
export async function findcategoryData(categoryId){
   const category = await categoryModel.findOne({_id: categoryId})
   if(!category) throw new HttpException(404, "subcategory not found")

   return category
}



