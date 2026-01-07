const User = require("../models/user.model");

const getAllUsers = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = 10;
        const skip = (page - 1) * limit;

        const users = await User.find()
        .select("-password")
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });

        const totalUsers = await User.countDocuments();

        res.status(200).json({
        success: true,
        data: users,
        pagination: {
            totalUsers,
            currentPage: page,
            totalPages: Math.ceil(totalUsers / limit),
        },
        });
    } catch (error) {
        res.status(500).json({
        success: false,
        message: error.message,
        });
    }
};

const updateUserStatus = async (req, res) => {
    try {
        const { id, action } = req.params;

        if (!["activate", "deactivate"].includes(action)) {
        return res.status(400).json({
            success: false,
            message: "Invalid action",
        });
        }

        const user = await User.findById(id).select("-password");

        if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
        }

        user.status = action === "activate" ? "active" : "inactive";
        await user.save();

        res.status(200).json({
        success: true,
        message: `User ${action}d successfully`,
        user,
        });
    } catch (error) {
        res.status(500).json({
        success: false,
        message: error.message,
        });
    }
};


module.exports = {
    getAllUsers,
    updateUserStatus
};