import jwt from "jsonwebtoken";
const { JsonWebTokenError } = jwt;
import UserModel from "../models/userModel.js";

async function isUser(req, res, next) {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);

    const user = await UserModel.findById(verified.userId).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
}

export default isUser;
