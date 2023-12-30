import categoryModel from '../models/category.model.js'
import lodash from 'lodash';
const { toNumber } = lodash


export async function save(data){
   const category = await categoryModel.create({...data})
   return{category}
}

export async function getAll(page, limit){
    const category = await categoryModel.find()
    .limit(toNumber(limit))
    .skip((toNumber(page ? page : 1) - 1) * toNumber(limit))
    const total = await categoryModel.find().countDocuments()
    return{category,total }
 }



