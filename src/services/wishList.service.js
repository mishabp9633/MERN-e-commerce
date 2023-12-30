import wishlistModel from "../models/wishList.model.js"
import {HttpException} from '../exceptions/exceptions.js';
import lodash from 'lodash';
const { toNumber } = lodash


export async function saveWhishList(userId, wishListData){
   const findWishList = await wishlistModel.findOne({productId: wishListData.productId})
   if(findWishList){
      await wishlistModel.findByIdAndDelete(findWishList._id)
      return { message:"Product removed from your Wishlist" }
   }
    const wishList = await wishlistModel.create({...wishListData, userId})
    return { message:"Product added into your Wishlist" }
}

export async function findAllUserWishList(userId){

    const wishList = await wishlistModel.find({userId})
    .populate("productId")
    .sort({createdAt:-1})
    return{wishList}
 }



