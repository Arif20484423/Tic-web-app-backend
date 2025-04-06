import jwt from "jsonwebtoken";

export function generateAccessToken(user) {
  var token = jwt.sign(user, process.env.JWT_KEY, { expiresIn: "2d" });
  return token;
}
export function generateRefreshToken(user) {
  var refreshToken = jwt.sign(user, process.env.JWT_KEY, { expiresIn: "10d" });
  return refreshToken;
}

export function getUser(token) {
  try {
    var user = jwt.verify(token, process.env.JWT_KEY);
    return { success: true, user: user };
  } catch (error) {
    return { success: false, message: "token expired" };
  }
}
