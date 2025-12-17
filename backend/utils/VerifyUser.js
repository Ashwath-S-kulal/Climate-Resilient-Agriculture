import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    
    if (!token) return next(errorHandler(401, 'You are not authenticated!'));
    
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return next(errorHandler(403, 'Token is not valid!'));

        // req.user now contains the id, isAdmin, and email from the token
        req.user = user;
        next();
    });
};

// NEW: Admin Authorization Middleware
export const verifyAdmin = (req, res, next) => {
    // 1. Check if the user is an admin via the boolean flag
    // 2. OR Check for a specific hardcoded email for extra security
    const authorizedEmail = "ashwathkulal2004@gmail.com"; 

    if (req.user && (req.user.isAdmin || req.user.email === authorizedEmail)) {
        next();
    } else {
        return next(errorHandler(403, 'Access denied! This panel is for authorized admins only.'));
    }
};