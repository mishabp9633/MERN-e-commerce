import { userLogin, userSignUp } from "../services/auth.service.js";

//...........sign-up...............//
export async function signUp(req, res, next) {
  try {
    const userdata = req.body;

    const result = await userSignUp(userdata);
    res.send(result);
  } catch (err) {
      next(err);
  }
}

//...........login...............//
export async function login(req, res, next) {
  const loginData = req.body;

  try {
    const response = await userLogin(loginData);
    res.status(200).send(response);
  } catch (err) {
    next(err);
  }
}
