import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    let token = req.cookies?.access_token;

    if (!token && authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
    }

    // Vercel Debug Logs - Important!
    console.log("--- Auth Debug ---");
    console.log("Has Cookie:", !!req.cookies?.access_token);
    console.log("Has Auth Header:", !!authHeader);
    console.log("Final Token Extracted:", token ? "YES" : "NO");

    if (!token) {
        return next(errorHandler(401, 'You are not authenticated!'));
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.log("JWT Verify Error:", err.message);
            return next(errorHandler(403, 'Token is not valid!'));
        }
        req.user = user;
        next();
    });
};