import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const protectRoute = async(req, res, next) => {
    const token = req.cookies.jwt;
    try{
    if (!token) {
        return res.status(401).json({ message: "Unauthorized access" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user=await User.findById(decoded.userId).select("-password");
    if (!user) {
        return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();

    }catch (error) {
        console.error("Error in auth middleware:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
