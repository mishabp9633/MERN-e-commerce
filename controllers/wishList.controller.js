import {
  saveWhishList,
  findAllUserWishList,
} from "../services/wishList.service.js";

export async function createWhishList(req, res, next) {
  try {
    const wishListData = req.body;
    const userId = req.body.user._id
    const wishList = await saveWhishList(userId, wishListData);

    res.status(200).send(wishList);
  } catch (err) {
    next(err);
  }
}


export async function getAllUserWishList(req, res, next) {
  try {
    const userId = req.body.user._id
    const result = await findAllUserWishList(userId);

    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
}



