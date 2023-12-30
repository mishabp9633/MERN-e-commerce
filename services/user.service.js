import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import createError from "http-errors";
import { HttpException } from "../exceptions/exceptions.js";
import lodash from "lodash";
const { toNumber } = lodash;

export async function save(userdata) {
  const user = await userModel.findOne({ username: userdata.username });
  if (user) {
    throw createError(
      400,
      `User already registerd with the username ${user.username}`
    );
  }
  const password = userdata.password;
  const confirmPassword = userdata.confirmPassword;

  const salt = await bcrypt.genSalt(10);
  const Password = await bcrypt.hash(password, salt);
  const ConfirmPassword = await bcrypt.hash(confirmPassword, salt);

  userdata.password = Password;
  userdata.confirmPassword = ConfirmPassword;
  const result = new userModel(userdata);
  await result.save();
  return { result };
}

export async function getAllData(userId, page, limit, query) {
  let queryData = { role: "seller", _id: { $ne: userId } };

  if (query?.search) {
    queryData["$or"] = [
      { name: { $regex: query?.search ? query?.search : "", $options: "i" } },
      {
        username: { $regex: query?.search ? query?.search : "", $options: "i" },
      },
    ];
  }

  const result = await userModel
    .find(queryData)
    .limit(toNumber(limit))
    .skip((toNumber(page ? page : 1) - 1) * toNumber(limit));
  const total = await userModel.find().countDocuments();

  return { result, total };
}

export async function getDataUserByToken(id) {
  const result = await userModel.find({ _id: id });
  if (!result)
    throw new HttpException(404, "User not found by the given Token");
  return { result };
}

export async function getDataAdminByToken(id) {
  const result = await userModel.find({ _id: id });
  if (!result)
    throw new HttpException(404, "Admin not found by the given Token");
  return { result };
}

export async function getSingleData(id) {
  const result = await userModel.findById(id);
  return { result };
}

export async function update(userId, userdata) {
  const result = await userModel.findByIdAndUpdate(
    userId,
    userdata,

    {
      new: true,
    }
  );
  return { result };
}

export async function Delete(id) {
  const result = await userModel.findByIdAndDelete(id);
  return { result };
}

