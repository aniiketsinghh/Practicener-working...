import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../config/utils/token.js"
export const SignUpController = async (req, res) => {
    const {username, email, password}=req.body;
    try {
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }   

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        if( !newUser) {
            return res.status(400).json({ message: "User creation failed" });
        }else {
            generateTokenAndSetCookie( newUser._id,res)
            await newUser.save();
            res.status(201).json({ message: "User created successfully",
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email
             });
        }


        
    } catch (error) {
        console.error("Error during signup in signup controller:", error);
        res.status(500).json({ message: "Internal server error in Signup controller" });
    }
}

export const LoginController = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Both are required field" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password"});
        }
        generateTokenAndSetCookie(user._id, res);
        res.status(200).json({
            message: "Login successful",
            _id: user._id,
            username: user.username,
            email: user.email
        });
    } catch (error) {
        console.error("Error during login in login controller:", error);
        res.status(500).json({ message: "Internal server error in Login controller" });
    }
        
}

export const LogoutController = async (req, res) => {
    try {
        res.clearCookie('jwt');
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.error("Error during logout in logout controller:", error);
        res.status(500).json({ message: "Internal server error in Logout controller" });
    }
}