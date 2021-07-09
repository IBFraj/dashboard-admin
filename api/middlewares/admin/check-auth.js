/* eslint-disable no-console */
const jwt = require("jsonwebtoken");
const ENV = require("../../static");
const { getById } = require("../../repositories/AdminQuery");
module.exports = async (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({
      error: true,
      message: "Access denied. No token provided",
    });
  }
  try {
    const decoded = jwt.verify(token, ENV.JWT_KEY);
    console.log("token est:");
    console.log(token);
    console.log("decoded est");
    console.log(decoded);
    req.user = await getById(decoded.id);
    return next();
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      error: true,
      message: "Invalid Token",
    });
  }
};
