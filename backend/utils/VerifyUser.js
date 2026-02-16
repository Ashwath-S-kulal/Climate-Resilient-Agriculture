import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  let token = null;

  // 1️⃣ From cookie
  if (req.cookies?.access_token) {
    token = req.cookies.access_token;
  }

  // 2️⃣ From Authorization header
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
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.status(403).json({ message: "Admin access only" });
  }
};
