import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyToken = (req, res, next) => {
  let token = null;

  // 1️⃣ Check cookie
  if (req.cookies?.access_token) {
    token = req.cookies.access_token;
  }

  // 2️⃣ Check Authorization header
  if (!token && req.headers.authorization) {
    const authHeader = req.headers.authorization;
    if (authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }
  }

  if (!token) {
    return res.status(401).json({ message: "You are not authenticated!" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token is not valid!" });
    }
    req.user = user;
    next();
  });
};


export const verifyAdmin = (req, res, next) => {
    const authorizedEmail = "ashwathkulal2004@gmail.com"; 

    if (req.user && (req.user.isAdmin || req.user.email === authorizedEmail)) {
        next();
    } else {
        return next(errorHandler(403, 'Access denied! This panel is for authorized admins only.'));
    }
};