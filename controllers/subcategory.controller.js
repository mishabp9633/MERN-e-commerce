import {save,getAll, Delete, update} from '../services/subcategory.service.js'

export async function saveSubcategory(req,res,next){
    try{
        const subcategoryData = req.body
        const result = await save(subcategoryData)
        res.status(200).send({message:"successfully added subcategory"})
    }catch(err){
        next(err)
    }    
}

export async function getAllSubcategory(req,res,next){
    try{
        const page = req.query.page
        const limit = req.query.limit || '10'
        const categoryId = req.query.categoryId
        const result = await getAll(categoryId, page, limit)
        res.status(200).send(result)
    }catch(err){
        next(err)
    }    
}

