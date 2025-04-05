import jwt from "jsonwebtoken";

export function generateAccessToken(user) {
  var token = jwt.sign(user, process.env.JWT_KEY, { expiresIn: "1d" });
  return token;
}

export function getUser(token) {
  var user = jwt.verify(token, process.env.JWT_KEY);
  return user;
}
