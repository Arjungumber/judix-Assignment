const User = require('../models/user.model');

const getMyProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');

        res.status(200).json({
        success: true,
        user,
        });
    } catch (error) {
        res.status(500).json({
        success: false,
        message: 'Server error',
        });
    }
};

const updateMyProfile = async (req, res) => {
    try {
        const { fullName, email } = req.body;

        if (!fullName || !email) {
        return res.status(400).json({
            success: false,
            message: 'Full name and email are required',
        });
        }
        const emailExists = await User.findOne({
        email,
        _id: { $ne: req.user.id },
        });

        if (emailExists) {
        return res.status(409).json({
            success: false,
            message: 'Email already in use',
        });
        }

        const user = await User.findById(req.user.id);
        user.fullName = fullName;
        user.email = email;

        await user.save();

        res.status(200).json({
        success: true,
        message: 'Profile updated successfully',
        user: {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            role: user.role,
        },
        });
    } catch (error) {
        res.status(500).json({
        success: false,
        message: error.message,
        });
    }
};

const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
        return res.status(400).json({
            success: false,
            message: 'Both passwords are required',
        });
        }

        const user = await User.findById(req.user.id).select('+password');

        const isMatch = await user.matchPassword(currentPassword);
        if (!isMatch) {
        return res.status(401).json({
            success: false,
            message: 'Current password is incorrect',
        });
        }

        user.password = newPassword;
        await user.save();

        res.status(200).json({
        success: true,
        message: 'Password changed successfully',
        });
    } catch (error) {
        res.status(500).json({
        success: false,
        message: 'Server error',
        });
    }
};

module.exports = {
    getMyProfile,
    updateMyProfile,
    changePassword,
};
