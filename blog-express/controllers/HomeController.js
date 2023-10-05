import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import RegisterSchema from "../Models/RegisterModel.js";

dotenv.config();

export const HomeGet = async (req, res) => {
  const token = req.headers["x-access-token"];

  try {
    if (!token) {
      return res.status(401).json({ status: 'error', message: 'Token is missing' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const email = decoded.email;

    if (!email) {
      return res.status(401).json({ status: 'error', message: 'Invalid token' });
    }

    const user = await RegisterSchema.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ status: 'error', message: 'User not found' });
    }

    return res.status(200).json({ status: 'ok', firstName: user.firstName });
  } catch (error) {
    console.error('JWT verification error:', error);
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ status: 'error', message: 'Token has expired' });
    }
    return res.status(401).json({ status: 'error', message: 'Invalid token' });
  }
};
