import subcategoryModel from '../models/subcategory.model.js'
import lodash from 'lodash';
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
    .limit(toNumber(limit))
    .skip((toNumber(page ? page : 1) - 1) * toNumber(limit))
    .populate('categoryId',"categoryName")
    const total = await subcategoryModel.find().countDocuments()

    return{subcategory, total}
 }
