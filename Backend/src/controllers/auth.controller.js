const User = require("../models/user.model");
const generateToken = require("../utils/generateToken");
const { validationResult } = require("express-validator");


const signup = async (req,res) =>{
    try {
        const { fullName, email, password } = req.body;

        if (!fullName || !email || !password) {
        return res.status(400).json({
            success: false,
            message: 'All fields are required',
        });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
        return res.status(409).json({
            success: false,
            message: 'Email already in use',
        });
        }

        const user = await User.create({
        fullName,
        email,
        password,
        });

        const token = generateToken(user._id);

        res.status(201).json({
        success: true,
        token,
        user: {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            role: user.role,
            status: user.status,
        },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
        success: false,
        message: 'Server error',
        });
    }
}


const login = async (req,res) =>{
        try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
            success: false,
            message: "Email and password are required",
            });
        }

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(401).json({
            success: false,
            message: "Invalid credentials",
            });
        }

        if (user.status === "inactive") {
            return res.status(403).json({
            success: false,
            message: "Account is inactive",
            });
        }

        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(401).json({
            success: false,
            message: "Invalid credentials",
            });
        }

        user.lastLogin = new Date();
        await user.save();

        const token = generateToken(user._id);

        res.status(200).json({
            success: true,
            token,
            user: {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            role: user.role,
            },
        });
        } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
        }
}


const getMe = async(req,res) =>{
    res.status(200).json({
            success: true,
            user: req.user,
    });
}

module.exports = {signup,login,getMe};



