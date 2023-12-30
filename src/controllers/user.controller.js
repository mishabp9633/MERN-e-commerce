export async function getUserByToken(req, res, next) {
  try {
    const user = req.body.user;
    if (!user) {
      res.status(404).send({ message: "user not found" });
    }
    res.send(user);
  } catch (err) {
    next(err);
  }
}

