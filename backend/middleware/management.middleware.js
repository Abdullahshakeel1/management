import jwt from "jsonwebtoken";
import { errorHAndler } from "../utils/auth.error.js"; 
export const isAuthenticate = async (req, res, next) => {
    try {
        if (!req.cookies) {
            return next(errorHAndler(400, "Cookies not found"));
        }
        const token = req.cookies.token;
        console.log("Token received:", token); 
        if (!token) {
            return next(errorHAndler(401, "Not authorized"));
        }

          jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return next(errorHAndler(403, "Forbidden"));
            }
            if (!user._id) {
                return next(errorHAndler(500, "Invalid token: user ID not found"));
            }
            req.user = user;
            next(); 
        });
    } catch (error) {
           next(error);
    }
};
