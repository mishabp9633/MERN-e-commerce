import {save,getAll} from '../services/category.service.js'

export async function saveCategory(req,res,next){
    try{
        const categoryData = req.body
        const result = await save(categoryData)
        res.status(200).send({message:"successfully added category"})
    }catch(err){
        next(err)
    }    
}

export async function getAllCategory(req,res,next){
    try{
        const page = req.query.page
        const limit = req.query.limit || '10'
        const result = await getAll(page, limit)
        res.status(200).send(result)
    }catch(err){
        next(err)
    }    
}