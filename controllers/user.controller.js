import {
  getAllData,
  getSingleData,
  update,
  Delete,
  save,
  getDataAdminByToken,
} from "../services/user.service.js";

import { deleteUserProduct } from "../services/product.service.js";

export async function userData(req, res, next) {
  try {
    const userdata = req.body;

    const result = await save(userdata);
    res.send(result);
  } catch (err) {
    console.log("err", err.statusCode);
    if (err.statusCode) {
      res.send(err.statusCode, err);
    } else {
      next(err);
    }
  }
}

export async function getusers(req, res, next) {
  try {
    const query = req.query;
    const userId = req.body.user._id;
    const page = req.query.page;
    const limit = req.query.limit || "10";
    const result = await getAllData(userId, page, limit, query);
    res.send(result);
  } catch (err) {
    next(err);
  }
}

export async function getUserByToken(req, res, next) {
  try {
    const user = req.body.user;
    if (!user) {
      res.status(404).send({ message: "user not found" });
    }

    // const result = await getDataUserByToken(userId)

    res.send(user);
  } catch (err) {
    next(err);
  }
}

export async function getAdminByToken(req, res, next) {
  try {
    const userId = req.body.user._id;
    const result = await getDataAdminByToken(userId);

    res.send(result);
  } catch (err) {
    next(err);
  }
}

export async function getuser(req, res, next) {
  try {
    const result = await getSingleData(req.params.id);
    res.send(result);
  } catch (err) {
    next(err);
  }
}

export async function updateData(req, res, next) {
  try {
    const userId = req.params.id;
    const userdata = req.body;

    const result = await update(userId, userdata);
    res.send(result);
  } catch (err) {
    next(err);
  }
}

export async function updateUserByToken(req, res, next) {
  try {
    const userId = req.body.user._id;
    const userdata = req.body;

    const result = await update(userId, userdata);
    res.send(result);
  } catch (err) {
    next(err);
  }
}

export async function deleteUserByToken(req, res, next) {
  try {
    const userId = req.body.user._id;

    await deleteUserProduct(userId);
    const result = await Delete(userId);
    res.send(result);
  } catch (err) {
    next(err);
  }
}

export async function deleteUserByAdminData(req, res, next) {
  try {
    const userId = req.params.id;

    await deleteUserProduct(userId);
    const result = await Delete(userId);
    res.send({ message: "Deleted user" });
  } catch (err) {
    next(err);
  }
}
