export default function protect(req, res, next) {
  const { user } = req.session;
  if (!user) {
    return res
      .status(401)
      .json({ status: "fail", message: "Unauthorized request." });
  }
  req.user = user;
  next();
}
