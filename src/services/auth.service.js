import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { HttpException } from "../exceptions/exceptions.js";

export async function userSignUp(userData) {
  const findUser = await userModel.findOne({ email: userData.email })
  if (findUser) throw new HttpException(400, `User already registerd with the email ${findUser.email}`);

  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(userData.password, salt);

  userData.password = password;
  const user = await userModel.create({...userData})

  return { message: `user registered successfully with email ${user.email}` };
}

export async function userLogin(loginData) {
  const findUser = await userModel.findOne({ email: loginData.email });
  if (!findUser) throw new HttpException(404, "username or password is invalid");

  const validpassword = await bcrypt.compare(loginData.password, findUser.password);

  if (!validpassword)
    throw new HttpException(404, "username or password is invalid");

  const token = jwt.sign({ _id: findUser._id }, process.env.TOKEN_KEY);
  return { token };
}
