import {isValidEmail} from "../utils/email.regex.js";



export function userMiddleware(req, res, next) {
  // check if the "user" collection is present in the request body
  if (req.body) {
    let { password, name, email } = req.body;

  if (!password) {
    res.send({message:"password is required"});
    return
  }

  if (!name) {
    res.send({message:"name is required"});
    return
  }

  if (!email) {
    res.send({message:"email is required"});
    return
  }

  if (!isValidEmail(email)) {
    res.send({message:"your email address not match required format"});
    return
  }

  }
  next();
}
